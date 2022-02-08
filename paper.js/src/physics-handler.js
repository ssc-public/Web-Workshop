class PhysicsHandler {
    constructor(table, muek, g) {
        this.table = table;
        this.balls = table.balls;
        this.movingBalls = new LinkedList();
        this.movingBallsIds = [];
        for (let i = 0; i < this.balls.length; i++) {
            this.movingBallsIds.push(false);
        }
        this.muek = muek;
        this.g = g;
        this.maxBallMS = 0;
    }

    injectMS(i, msVector) {
        console.log(`IN injectMS`);
        if (this.balls[i].msVector !== null && this.balls[i].msVector.length > 0) {
            console.log(`\tStat: msVector=${this.balls[i].msVector}, len=${this.balls[i].msVector.length}, shape=${this.balls[i].shape}`);
            console.log("\tRETURN");
            return;
        }
        let ball = this.balls[i];
        ball.msVector = msVector;
        console.log(`\tinjected ${msVector.length} ms to ball with shape ${ball.shape}, number ${ball.number}`);

        if (!this.movingBallsIds[ball.number]) {
            this.movingBalls.add(i);
            this.movingBallsIds[ball.number] = true;
        }
        console.log(`OUT injectMS`);
    }

    updateBallPosition(ball) {
        if (!ball.existent)
            return;
        let min_x = ball.boundary.x;
        let min_y = ball.boundary.y;
        let max_x = ball.boundary.x + ball.boundary.width;
        let max_y = ball.boundary.y + ball.boundary.height;
        let eps = 0.01;
        let r = ball.radius;
        let dx = ball.msVector.x;
        let dy = ball.msVector.y;
        let collidedWithRail = true;
        if (ball.shape.position.x + ball.msVector.x + r > max_x) {
            ball.msVector.x = -ball.msVector.x;
            ball.x = max_x - eps - r;
        } else if (ball.shape.position.x + ball.msVector.x - r < min_x) {
            ball.msVector.x = -ball.msVector.x;
            ball.x = min_x + eps + r;
        } else if (ball.shape.position.y + ball.msVector.y + r > max_y) {
            ball.msVector.y = -ball.msVector.y;
            ball.y = max_y - eps - r;
        } else if (ball.shape.position.y + ball.msVector.y - r < min_y) {
            ball.msVector.y = -ball.msVector.y;
            ball.y = min_y + eps + r;
        } else
            collidedWithRail = false;
        if (collidedWithRail) {
            dx -= ball.msVector.x;
            dy -= ball.msVector.y;
            let volume = ((dx * dx + dy * dy) ** 0.5) / 40;
            let audio = ballHitRailAudio.cloneNode();
            audio.volume = volume > 1 ? 1: volume;
            audio.play();
            this.table.events.add([ball.number, 'collide', 'rail']);
        }

        ball.shape.position.x += ball.msVector.x * GLOBAL_TIME_MULTIPLIER;
        ball.shape.position.y += ball.msVector.y * GLOBAL_TIME_MULTIPLIER;
        //let vp2 = ball.msVector.length * ball.msVector.length - 2 * this.muek * this.g * ball.msVector.length * GLOBAL_TIME_MULTIPLIER;
        let v2 = ball.msVector.length - this.muek * this.g * GLOBAL_TIME_MULTIPLIER;
        if (v2 > 0.001)
            ball.msVector.length = v2;
        else
            ball.msVector.length = 0;
    }

    static solveDeg2PolyEquation(a, b, c) {
        let d = (b * b - 4 * a * c) ** 0.5;
        return [(-b - d) / (2 * a), (-b + d) / (2 * a)];
    }

    static innerProduct(v, w) {
        return v.x * w.x + v.y * w.y;
    }

    isStatic() {
        return this.movingBalls.size === 0;
    }

    handleBallNearPocket() {
        let it = this.movingBalls.iterator();
        while (it.hasNext()) {
            let idx = it.next();
            let ball = this.balls[idx];
            for (let i = 0; i < this.table.pockets.length; i++) {
                let pocket = this.table.pockets[i];
                let a = (ball.x - pocket.x);
                let b = (ball.y - pocket.y);
                // TODO: handle corner holes better than this
                let c = i % 3 === 1 ? this.table.pocketRadius : this.table.pocketRadius * 1.25;
                if (a * a + b * b <= c * c) {
                    it.remove();
                    this.movingBallsIds[ball.number] = false;
                    this.table.removeBall(idx, i);
                    break;
                }
            }
        }
    }

    handleBallCollision() {
        // TODO: seek n log(n) impl;
        if (this.movingBalls.size === 0) {
            return;
        }
        let it = this.movingBalls.iterator();
        this.maxBallMS = 0;
        while (it.hasNext()) {
            let curr = it.next();
            //this.movingBalls.checkIntegrity();
            let b1 = this.balls[curr];

            if (b1.msVector.length > this.maxBallMS) {
                this.maxBallMS = b1.msVector.length;
            }
            if (b1.msVector.length === 0 || !b1.existent) {
                it.remove();
                this.movingBallsIds[b1.number] = false;
                continue;
            }
            for (let i = 0; i < this.balls.length; i++) {
                let b2 = this.balls[i];
                if (!b2.existent)
                    continue;
                if (b1 !== b2) {
                    if (b1.collides(b2)) {
                        this.table.events.add([b1.number, 'collide', b2.number]);

                        let mss = PhysicsHandler.getBallsMSAfterCollision(b1, b2);
                        let dx = b1.msVector.x, dy = b1.msVector.y;
                        b1.msVector.x = mss[0];
                        b1.msVector.y = mss[1];
                        b2.msVector.x = mss[2];
                        b2.msVector.y = mss[3];
                        if(ballHitAudiosPlaying < 6) {
                            ballHitAudiosPlaying++;
                            let volume = ((dx - mss[0]) ** 2 + (dy - mss[1]) ** 2) ** 0.5;
                            volume /= 40;
                            let audio = ballHitAudio.cloneNode();
                            audio.volume = volume;
                            audio.play();
                            audio.onended = ()=>--ballHitAudiosPlaying;
                        }
                        PhysicsHandler.resolveCollision(b1, b2);
                        if (b2.msVector.length < 0.01) {
                            b2.msVector.length = 0;
                        } else {
                            if (!this.movingBallsIds[b2.number]) {
                                this.movingBallsIds[b2.number] = true;
                                it.add(i);
                            }
                        }
                    }
                }
            }
        }
    }

    // resolve colliding objects that are inside each other
    static resolveCollision(o1, o2) {
        let eps = 0.01;
        let dx = o1.x - o2.x;
        let dy = o1.y - o2.y;
        let d = (dx * dx + dy * dy) ** 0.5;
        let r = o1.radius + o2.radius;
        dx = (dx / d) * (r + eps);
        dy = (dy / d) * (r + eps);
        o1.x = dx + o2.x;
        o1.y = dy + o2.y;
    }

    updateBallsPosition() {
        // dynamic global time multiplier
        if (this.isStatic()) {
            if (DYNAMIC_GTM)
                GLOBAL_TIME_MULTIPLIER = PREF_GLOBAL_TIME_MULTIPLIER;
            return;
        }
        if (DYNAMIC_GTM) {
            if (this.maxBallMS > MAX_MOVEMENT_PER_FRAME) {
                GLOBAL_TIME_MULTIPLIER = MAX_MOVEMENT_PER_FRAME / this.maxBallMS;
            } else if (this.maxBallMS < MIN_MOVEMENT_PER_FRAME) {
                let val = this.maxBallMS < 0.3 ? 0.3 : this.maxBallMS;
                GLOBAL_TIME_MULTIPLIER = MIN_MOVEMENT_PER_FRAME / val;
            }
        } else {
            GLOBAL_TIME_MULTIPLIER = PREF_GLOBAL_TIME_MULTIPLIER;
        }
        document.getElementById('GTM').innerText = GLOBAL_TIME_MULTIPLIER.toFixed(3);

        let it = this.movingBalls.iterator();
        while (it.hasNext()) {
            let ballIndex = it.next();
            this.updateBallPosition(this.balls[ballIndex]);
        }
    }

    static getBallsMSAfterCollision(b1, b2) {
        let dx = b1.x - b2.x;
        let dy = b1.y - b2.y;

        let v1_x = b1.msVector.x;
        let v1_y = b1.msVector.y;
        let v2_x = b2.msVector.x;
        let v2_y = b2.msVector.y;
        let m1 = b1.m;
        let m2 = b2.m;

        let a = (2 * ((v1_x - v2_x) * dx + (v1_y - v2_y) * dy)) / ((m1 + m2) * (dx * dx + dy * dy));
        let v1_x_p = v1_x - a * m2 * dx;
        let v1_y_p = v1_y - a * m2 * dy;
        let v2_x_p = v2_x + a * m1 * dx;
        let v2_y_p = v2_y + a * m1 * dy;
        return [v1_x_p, v1_y_p, v2_x_p, v2_y_p];
    }

    destruct() {
        this.table = null;
        this.balls = null;
        this.movingBallsIds = null;
        this.movingBalls.clear();
        this.movingBalls = null;
    }
}

// returns new ms vectors of balls after collision
// must not be inside each other
