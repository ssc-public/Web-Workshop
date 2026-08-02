class BilliardBall {
    constructor(x, y, r, boundary, number) {
        this.radius = r;
        this.msVector = new Point(0, 0);
        this.boundary = boundary;
        this.m = 0.01 * this.radius ** 3;
        this.shape = null;
        this.number = number;
        this.existent = true;
        let shape = ImageLoader.loadBall(number);
        shape.scale(r * 2 / shape.bounds.width);
        shape.position = new Point(x, y);
        this.shape = shape;
    }

    get x() {
        return this.shape.position.x;
    }

    get y() {
        return this.shape.position.y;
    }

    set x(val) {
        this.shape.position.x = val;
    }

    set y(val) {
        this.shape.position.y = val;
    }

    collides(b) {
        let dx = this.x - b.x;
        let dy = this.y - b.y;
        let r = this.radius + b.radius;
        return dx * dx + dy * dy <= r * r;
    }
}

class BallContainer {
    constructor(r, x, y) {
        this.r = r;
        this.x = x;
        this.y = y;
        let shape = new Raster();
        shape.image = images.ballContainerImage;
        shape.scale(this.r * 2.26 / shape.bounds.width);
        shape.position += new Point(x, shape.bounds.height / 2 + r + y);
        this.ballsIn = 0;
        this.ballsNumbers = new Array(8);
        this.ballsShapes = new Array(8);
        this.shape = shape;
    }

    insertBall(num) {
        let shape = ImageLoader.loadBall(num);
        shape.scale(2 * this.r / shape.bounds.width);
        shape.position.x = this.x;
        let dh = (8 - this.ballsIn) * 0.125 * this.shape.bounds.height;
        shape.position.y = this.y + dh - 2;
        this.ballsNumbers[this.ballsIn] = num;
        this.ballsShapes[this.ballsIn] = shape;
        ++this.ballsIn;
    }

    removeBallAt(idx) {

    }

    clear() {
        for (let i = 0; i < this.ballsIn; i++) {
            this.ballsShapes[i].remove();
        }
        this.ballsIn = 0;
        this.ballsNumbers = new Array(8);
        this.ballsShapes = new Array(8);
    }
}


let ImageLoader = new function () {
    function ImageLoader() {
        return this;
    }

    let img = new window.Image();
    img.src = 'res/balls/cue.png';
    let ballsImages = new Map([
        [0, img]
    ]);
    for (let i = 1; i <= 8; ++i) {
        img = new window.Image();
        img.src = `res/balls/solid${i}.png`;
        ballsImages.set(i, img);
    }
    for (let i = 9; i <= 15; ++i) {
        img = new window.Image();
        img.src = `res/balls/stripes${i}.png`;
        ballsImages.set(i, img);
    }
    ImageLoader.loadBall = function (number) {
        if (number < 0 || number > 15)
            throw "wrong number";
        let res = new Raster();
        res.image = ballsImages.get(number);
        return res;
    };
    return ImageLoader;
};

class StickPowerIndicator {
    constructor(x, y, w, h) {
        this.shape = this.createStickPowerIndicator(x, y, w, h);
        this.state = false;
        this.animation = this.createAnimation();
    }

    toggleState() {
        if (this.state === false) {
            this.animation.reset();
            animationRequests.add(this.animation);
        } else {
            this.animation.remove = true;
        }
        this.state = !this.state;
        return this.state;
    }

    createStickPowerIndicator(x, y, w, h) {
        let back = new Path.Rectangle(new Point(x, y), w, h);
        back.fillColor = 'white';
        this.hasActiveAnimation = false;
        this.maxP = h * 0.9;
        this._m = 1;
        this.powerIndicator = new Path.Rectangle(new Point(x + 0.25 * w, y + 0.05 * h), w / 2, this.maxP);
        this.powerIndicator.fillColor = new Color(this.m, 1 - this.m, 0);
        return new Group([back, this.powerIndicator]);
    }

    set m(m) {
        let h = m * this.maxP;
        this.powerIndicator.position.y += (this._m - m) * this.maxP;
        this.powerIndicator.bounds.height = h + 0.0001; // TODO: h wont work (why?????), had to manipulate it
        this.powerIndicator.fillColor = new Color(1, 1 - m, 0);
        this._m = m;
    }

    get m() {
        return this._m;
    }

    remove() {
        this.shape.remove();
        this.animation = null;
    }

    createAnimation() {
        if (this.hasActiveAnimation)
            return null;
        this.hasActiveAnimation = true;
        let indicator = this;
        return {
            remove: false,
            deltaM: 0.01,
            reset: function () {
                indicator.m = 0;
                this.remove = false;
                this.deltaM = 0.01;
            },
            progress: function () {
                let m = indicator.m;
                if (m + this.deltaM > 1 || m + this.deltaM < 0)
                    this.deltaM = -this.deltaM;
                indicator.m += this.deltaM;
                return this.remove;
            },
            onFinish: function () {
            }
        };
    }
}

class Stick {
    constructor(x, y, width) {
        this.x = x;
        this.y = y;
        let shape = new Raster();
        shape.image = images.stickImage;
        shape.scale(width / shape.bounds.width);
        this.width = shape.bounds.width;
        this.height = shape.bounds.height;
        this.shape = shape;
        this.draggable = true;
    }

    setRotation(angle) {
        this.shape.rotate(angle - this.shape.rotation);
    }
}

let init = false;

class Table {
    constructor(x, y, width) {
        this.playGround = new Rectangle(new Point(x, y), width, width / 2);
        this.x = x;
        this.y = y;
        this.width = width;
        this.ballRadius = width / 60;
        this.muek = 0.005;
        this.g = 9.8;
        this.players = [];
        this.eventListeners = [];
        this.pockets = [];
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 3; i++) {
                this.pockets.push(new Point(i * (width / 2) + x, j * (width / 2) + y));
                //new Path.Circle(this.holes[j], 10).fillColor = 'red';
            }
        }

        let img = images.tableImage;
        let shape = new Raster();
        shape.image = img;
        shape.scale(this.totalWidth / shape.bounds.width);
        shape.position += new Point(shape.bounds.width / 2 + x - this.outerWidth, shape.bounds.height / 2 + y - this.outerWidth);
        this.shape = shape;
        this.stick = new Stick(500, 500, width / 1.5);

        this.events = new LinkedList();

        this.ruleHandler = new GameEventHandler(this);
        this.ballContainers = [
            new BallContainer(this.ballRadius, x - 2 * this.outerWidth, y),
            new BallContainer(this.ballRadius, x + this.totalWidth, y)
        ];
        this.resetStateVars();
        init = true;
    }

    resetStateVars() {
        this.balls = [];
        this.ballsEnteringPocket = 0;
        this.currMatch = null;
        this.state = null;
        this.prevState = null;
        this.analyzedTurnEvents = true;
        this.breakShotDone = false;
        this.stick.shape.visible = false;
        this.stick.draggable = true;
        this.events.clear();
        this.ballContainers.forEach(bc => bc.clear());
        this.ballInHand = false;
        this.unassignedBalls = [];
        this.freezeRequests = 0;
    }

    get currPlayer() {
        return this.players[this.currPlayerIdx];
    }

    get footSpot() {
        return new Point(this.x + this.playGround.width * 3 / 4, this.y + this.playGround.height / 2);
    }

    get centerSpot() {
        return new Point(this.x + this.playGround.width / 2, this.y + this.playGround.height / 2);
    }

    get headSpot() {
        return new Point(this.x + this.playGround.width / 4, this.y + this.playGround.height / 2);
    }

    initPlayers(p1, p2) {
        this.players = [p1, p2];
    }

    removeBall(idx, pocketIndex) {
        this.balls[idx].existent = false;
        return this.pocketBall(idx, pocketIndex);
    }

    fadeout(g) {
        animationRequests.add({
            type: 'fade-out', node: g, duration: 30, curr: 0, progress: function () {
                this.node.opacity = (this.duration - this.curr) / this.duration;
                ++this.curr;
                return this.curr > this.duration;
            }
        });
    }

    pocketBall(ballIndex, pocketIndex = 0) {
        if (this.balls.length <= ballIndex || ballIndex < 0)
            return false;
        let ball = this.balls[ballIndex];
        let pocketPosition = this.pockets[pocketIndex];
        let l = Math.min(60, Math.max(Math.round((ball.shape.position - pocketPosition).length * 3 / ball.msVector.length), 20));
        ++this.ballsEnteringPocket;
        if (ball.number === 0)
            this.removeCueListeners();
        let outer = this;
        ball.msVector = 0;
        this.events.add(['pocket', ball.number]);

        // this animation translates and scales the ball to mimic ball entering pocket
        let animation = new PaperAnimation('transcale', l, ball.shape);
        animation.progress = function () {
            let c = (this.duration - this._curr) / this.duration;
            this.node.position += (pocketPosition - this.node.position) * (1 - c);
            this.node.scale(c);
            ++this._curr;
            // if (animation is finished)
            if (this._curr > this.duration) {
                this.node = null;
                return true;
            }
            return false;
        };
        animation.onFinish = function () {
            ball.shape.remove();
            --outer.ballsEnteringPocket;
        };
        animationRequests.add(animation);
        return true;
    }

    get pocketRadius() {
        return this.playGround.width * 0.0333;
    }

    get railWidth() {
        return this.playGround.width * 0.02;
    }

    get outerWidth() {
        return this.playGround.width * 0.05;
    }

    get totalWidth() {
        return 1.1 * this.playGround.width;
    }

    get totalHeight() {
        return 0.6 * this.playGround.width;
    }

    init8BallPoolMatch(currPlayerIdx) {
        // check if there is a match going on
        if (this.currMatch !== null)
            return;
        this.currPlayerIdx = currPlayerIdx;
        this.togglePlayer();
        this.currMatch = "8ballpool";
        this.prevState = null;

        this.state = AWAITING_SHOT;
        this.breakShotDone = false;
        this.balls = this.make8BallPoolBalls(this.ballRadius);

        this.physicsHandler = new PhysicsHandler(this, this.muek, this.g);
        let cueBall = this.balls[this.balls.length - 1];
        this.phantomCueBall = new Path.Circle(new Point(-100, -100), cueBall.radius);
        this.trackingLine = new Path.Line(new Point(0, 0), new Point(0, 0));
        this.trackingLine.strokeColor = 'white';
        this.trackingLine.strokeWidth = 1.5;
        this.trackingLine.dashArray = [10, 12];
        this.phantomCueBall.fillColor = 'white';

        this.phantomCueBall.opacity = 0.5;
        this.stickPowerIndicator = new StickPowerIndicator(100, 200, 20, 300);

        this.ballInHand = true;
        this.draggingCue = false;

        let mouseMoved;
        let mouseDown;
        let container = document.getElementById('container');

        this.addCueListeners();
        let downListener = () => {
            if (this.frozen)
                return;
            mouseMoved = false;
            mouseDown = true;
        };
        let moveListener = e => {
            if (this.frozen)
                return;
            let dx = mouseX - e.pageX;
            let dy = mouseY - e.pageY;
            // if it moved more than a bit
            if (dx * dx + dy * dy > 0.1) {
                mouseMoved = true;
                if (!this.draggingCue && mouseDown && this.state === AWAITING_SHOT && this.stick.draggable && cueBall.existent) {
                    this.repositionStickBehindCue();
                }
                mouseX = e.pageX;
                mouseY = e.pageY;
            }
        };
        let upListener = () => {
            if (this.frozen)
                return;
            mouseDown = false;
        };
        let e1 = e => {
            if (this.frozen)
                return;
            if (e.code === 'Space' && cueBall.existent && this.stick.draggable && this.physicsHandler.isStatic()) {
                if (!this.stickPowerIndicator.toggleState()) {
                    let dx = cueBall.x - this.stick.shape.position.x;
                    let dy = cueBall.y - this.stick.shape.position.y;
                    let d2 = (dx * dx + dy * dy) ** 0.5;
                    let sup = this;
                    this.ballInHand = false;
                    this.stick.draggable = false;
                    let animation = new PaperAnimation('translate', 40, this.stick.shape);
                    let delta = (cueBall.shape.position - this.stick.shape.position) * 0.05 * this.stickPowerIndicator.m;
                    animation.progress = function () {
                        let c = (this._curr) / this.duration;
                        let sgn = c < 0.5 ? 1 : -2;
                        this.node.position = this.node.position - delta * sgn;
                        this._curr += c < 0.5 ? 1.5 * GLOBAL_TIME_MULTIPLIER : 3 * GLOBAL_TIME_MULTIPLIER;
                        if (this._curr > this.duration) {
                            this.node = null;
                            return true;
                        }
                        return false;
                    };
                    animation.onFinish = function () {
                        ballHitAudio.play();
                        sup.physicsHandler.injectMS(sup.balls.length - 1, new Point({
                            angle: getAngle(dy, dx),
                            length: sup.stickPowerIndicator.m * 30 * tableWidth / 890
                        }));
                    };
                    animationRequests.add(animation);
                }
            }
        };

        //track mouse position as it is not possible to get it without an event
        this.eventListeners = [];
        this.eventListeners.push(['mousedown', downListener]);
        this.eventListeners.push(['mousemove', moveListener]);
        this.eventListeners.push(['mouseup', upListener]);
        this.eventListeners.push(['keydown', e1]);
        container.addEventListener('mousedown', downListener);
        container.addEventListener('mousemove', moveListener);
        container.addEventListener('mouseup', upListener);
        document.addEventListener('keydown', e1);
    }

    play() {
        appState = 'play';
        this.enableStick();
        this.repositionStickBehindCue();
        this.unfreeze();
    }

    pause() {
        appState = 'pause';
        this.disableStick();
        this.freeze();
    }

    removeCueListeners() {
        let cueBall = this.balls[15];
        cueBall.shape.onMouseDrag = null;
        cueBall.shape.onMouseUp = null;
        this.draggingCue = false;
        this.ballInHand = false;
    }

    addCueListeners() {
        let cueBall = this.balls[15];
        this.draggingCue = false;
        cueBall.shape.onMouseDrag = () => {
            if (this.frozen)
                return;
            if (this.ballInHand && this.state !== BALLS_MOVING) {
                this.draggingCue = true;
                this.repositionCueToMousePosition();
            } else {
                console.log("not able to drag cue");
            }
        };
        cueBall.shape.onMouseUp = () => {
            if (this.frozen)
                return;
            this.draggingCue = false;
        };
    }

    recreateCueShape() {
        let hs = this.headSpot;
        let cueBall = this.balls[15];
        let shape = ImageLoader.loadBall(0);
        shape.scale(cueBall.radius * 2 / shape.bounds.width);
        shape.position = hs;
        cueBall.shape = shape;
    }

    reset() {
        if (this.currMatch === "8ballpool") {
            appState = 'resetting_match';
            let l = this.eventListeners.length - 1;
            for (let i = 0; i < l; i++) {
                document.getElementById('container').removeEventListener(this.eventListeners[i][0], this.eventListeners[i][1]);
            }
            document.removeEventListener(this.eventListeners[l][0], this.eventListeners[l][1]);

            this.physicsHandler.destruct();
            this.removeCueListeners();
            for (let ball of this.balls) {
                ball.shape.remove();
            }
            this.phantomCueBall.remove();
            this.trackingLine.remove();
            this.stickPowerIndicator.remove();
            this.ruleHandler.reset();
            appState = 'pause';
            animationRequests.clear();
            this.players.forEach(p => p.reset());
            this.resetStateVars();
        }
    }

    isInside(x, y) {
        return x >= this.x + this.ballRadius && x <= this.x - this.ballRadius + this.playGround.width
            && y >= this.y + this.ballRadius && y <= this.y - this.ballRadius + this.playGround.height;

    }

    isOnOtherBall(x, y) {
        let r = this.ballRadius * 2;
        r *= r;
        for (let i = 0; i < 15; i++) {
            let ball = this.balls[i];
            if (ball.existent) {
                let dx = ball.x - x;
                let dy = ball.y - y;

                if (dx * dx + dy * dy <= r)
                    return true;
            }
        }
        return false;
    }

    repositionCueToMousePosition() {
        let cue = this.balls[this.balls.length - 1];
        if (this.isInside(mouseX, mouseY) && !this.isOnOtherBall(mouseX, mouseY)) {
            cue.shape.position.x = mouseX;
            cue.shape.position.y = mouseY;
        }
    }

    repositionStickBehindCue() {
        let cueBall = this.balls[this.balls.length - 1];
        if (!cueBall.existent)
            return;
        let dx = cueBall.x - mouseX;
        let dy = cueBall.y - mouseY;
        let angle = getAngle(dy, dx);
        let mouseLocation = new Point({
            angle: angle,
            length: this.stick.width / 2 + 30
        });
        this.stick.shape.position.x = cueBall.shape.position.x - mouseLocation.x;
        this.stick.shape.position.y = cueBall.shape.position.y - mouseLocation.y;
        this.stick.setRotation(angle);

        let points = this.getNextCollisionPoint(mouseLocation, cueBall.shape.position);
        let phPoint = points[0];
        this.trackingLine.segments[0].point = cueBall.shape.position;
        if (phPoint !== null && !isNaN(phPoint.x)) {
            this.phantomCueBall.position = phPoint;
            this.phantomCueBall.visible = true;
            this.phantomCueBall.bringToFront();
            if (this.currPlayer.canHit(points[1])) {
                this.phantomCueBall.fillColor = 'white';
            } else {
                this.phantomCueBall.fillColor = 'red';
            }
            this.trackingLine.segments[1].point = phPoint;
        } else {
            let pt = this.getBoundaryCollisionPoint(mouseLocation, cueBall.shape.position);
            this.phantomCueBall.visible = false;
            this.trackingLine.segments[1].point = pt;
        }
    }

    disableStick() {
        this.stick.draggable = false;
        this.trackingLine.visible = false;
        this.phantomCueBall.visible = false;
        this.stick.shape.visible = false;
    }

    get frozen() {
        return this.freezeRequests > 0;
    }

    freeze() {
        this.freezeRequests++;
    }

    unfreeze() {
        if (this.freezeRequests > 0)
            this.freezeRequests--;
    }

    enableStick() {
        this.stick.draggable = true;
        this.stick.shape.visible = true;
        this.trackingLine.visible = true;
        this.stick.shape.bringToFront();
    }

    applyState() {
        switch (this.state) {
            case AWAITING_SHOT:
                this.togglePlayer();
                this.enableStick();
                this.repositionStickBehindCue();
                break;
            case BALLS_MOVING:
                this.disableStick();
                break;
        }
    }

    getBoundaryCollisionPoint(v, p0) {
        let w = this.playGround.width;
        let h = this.playGround.height;
        let x1 = this.playGround.x;
        let x2 = this.playGround.x + w;
        let y1 = this.playGround.y;
        let y2 = this.playGround.y + h;

        let t, y, x;

        if (v.x !== 0) {
            if (v.x < 0) {
                x = x1;
                t = (x - p0.x) / v.x;
                y = t * v.y + p0.y;
                if (y >= y1 && y <= y2)
                    return new Point(x, y);
            } else {
                x = x2;
                t = (x - p0.x) / v.x;
                y = t * v.y + p0.y;
                if (y >= y1 && y <= y2)
                    return new Point(x, y);
            }
        }
        if (v.y !== 0) {
            if (v.y < 0) {
                y = y1;
                t = (y - p0.y) / v.y;
                x = t * v.x + p0.x;
                if (x >= x1 && x <= x2)
                    return new Point(x, y);
            } else {
                y = y2;
                t = (y - p0.y) / v.y;
                x = t * v.x + p0.x;
                if (x >= x1 && x <= x2)
                    return new Point(x, y);
            }
        }
        return null;
    }

    getNextCollisionPoint(vector, p0) {
        let chosenPoint = null;
        let neighborBall = null;
        for (let i = 0; i < this.balls.length - 1; i++) {
            let ball = this.balls[i];
            if (!ball.existent)
                continue;
            let dp = new Point(ball.x - p0.x, ball.y - p0.y);

            let cos = PhysicsHandler.innerProduct(vector, dp) / (vector.length * dp.length);
            let angle = Math.acos(cos);
            let t;
            if (angle < Math.PI / 2 && dp.length * Math.sin(angle) < 2 * ball.radius) {
                let a = vector.length * vector.length;
                let b = -2 * PhysicsHandler.innerProduct(vector, dp);
                let c = dp.length * dp.length - 4 * ball.radius * ball.radius;
                t = PhysicsHandler.solveDeg2PolyEquation(a, b, c)[0];
            } else
                continue;
            if (isNaN(t)) continue;
            let chosenCandidate = new Point(t * vector.x + p0.x, t * vector.y + p0.y);
            if (chosenPoint == null) {
                chosenPoint = chosenCandidate;
                neighborBall = ball.number;
                continue;
            }
            if ((chosenCandidate - p0).length < (chosenPoint - p0).length) {
                chosenPoint = chosenCandidate;
                neighborBall = ball.number;
            }
        }
        return [chosenPoint, neighborBall];
    }

    // triangular
    make8BallPoolBalls() {
        let eps = 0.01;
        let balls = [];
        let dx = 3 ** 0.5;
        let d = this.ballRadius + eps;
        //TODO SOOOOOON
        let ballsOrder = [4, 12, 14, 5, 11, 10, 6, 13, 3, 9, 7, 2, 8, 1, 0];
        //let colors = ['pink', 'blueviolet', '#ccac00', '#0000cc', '#cc0000', '#3c0068', '#cc3700', '#1b6f1b', '#660000', '#000000'];
        let footSpot = this.footSpot;
        let x0 = footSpot.x;
        let y0 = footSpot.y;
        let c = 0;
        for (let i = 0; i < 5; ++i) {
            let ballNum = ballsOrder[i];
            let ball = new BilliardBall(x0 + 4 * dx * d, y0 - 4 * d + i * 2 * d, this.ballRadius, this.playGround, ballNum + 1);
            balls.push(ball);
        }
        c = 5;
        for (let i = 0; i < 4; ++i) {
            let ballNum = ballsOrder[i + c];
            let ball = new BilliardBall(x0 + 3 * dx * d, y0 - 3 * d + i * 2 * d, this.ballRadius, this.playGround, ballNum + 1);
            balls.push(ball);
        }
        c = 9;
        for (let i = 0; i < 3; ++i) {
            let ballNum = ballsOrder[i + c];
            let ball = new BilliardBall(x0 + 2 * dx * d, y0 - 2 * d + i * 2 * d, this.ballRadius, this.playGround, ballNum + 1);
            balls.push(ball);
        }
        c = 12;
        for (let i = 0; i < 2; i++) {
            let ballNum = ballsOrder[i + c];
            let ball = new BilliardBall(x0 + dx * d, y0 - d + i * 2 * d, this.ballRadius, this.playGround, ballNum + 1);
            balls.push(ball);
        }
        let ballNum = ballsOrder[14];
        let meta = ballsColorMeta[ballNum];

        let ball = new BilliardBall(x0, y0, this.ballRadius, this.playGround, ballNum + 1);
        balls.push(ball);
        let cueBall = new BilliardBall(x0 - this.playGround.width / 2, y0, this.ballRadius, this.playGround, 0);
        balls.push(cueBall);

        return balls;
    }

    updateState() {
        if (this.state === ANALYZING_EVENTS && !this.analyzedTurnEvents)
            return;
        let state;
        if (this.physicsHandler.isStatic()) {
            if ((this.prevState === BALLS_MOVING || this.prevState === BALLS_ENTERING_POCKET) && this.state !== ANALYZING_EVENTS) {
                this.analyzedTurnEvents = false;
            }
            if (this.ballsEnteringPocket === 0) {
                if (!this.analyzedTurnEvents)
                    state = ANALYZING_EVENTS;
                else if (this.state !== BALLS_MOVING)
                    state = AWAITING_SHOT;
            } else {
                state = BALLS_ENTERING_POCKET;
            }
        } else {
            state = BALLS_MOVING;
        }
        if (this.state === state)
            return;
        this.prevState = this.state;
        this.state = state;
        this.applyState();
    }

    togglePlayer() {
        this.currPlayerIdx = -this.currPlayerIdx + 1;
        document.getElementById(`p${this.currPlayerIdx + 1}-div`).style.backgroundColor = '#da0606';
        document.getElementById(`p${-this.currPlayerIdx + 2}-div`).style.backgroundColor = '#343a40';
    }

    updateScoreBoard() {
        document.getElementById("score").innerHTML = `${this.players[0].wins} - ${this.players[1].wins}`;

    }

    declareLoss(p) {
        this.announce(`${this.players[-p + 1].name} Wins.`, 3000);
        console.log(this.players[1 - p].wins);
        this.players[1 - p].wins++;
        console.log(this.players[1 - p].wins);
        this.updateScoreBoard();
        this.reset();
        this.init8BallPoolMatch(Math.random() < 0.5 ? 0 : 1);
        this.play();
    }

    declareWin(p) {
        this.announce(`${this.players[p].name} Wins.`, 3000);
        console.log(this.players[p].wins);
        this.players[p].wins++;
        console.log(this.players[p].wins);
        this.updateScoreBoard();
        this.reset();
        this.init8BallPoolMatch(Math.random() < 0.5 ? 0 : 1);
        this.play();
    }

    declareFouls(fouls) {
        let t = 100;
        let dt = 1000;
        for (const foul of fouls) {
            setTimeout(() => {
                this.announce(foulsMessages[foul], dt);
            }, t);
            t += dt + 30;
        }
    }

    setBallInHand(val = true) {
        this.ballInHand = val;
    }

    announce(msg, timeout) {
        document.getElementById('game-events-announcer').style.visibility = "visible";
        document.getElementById('game-event-text').innerText = msg;
        setTimeout(() => {
            document.getElementById('game-events-announcer').style.visibility = "hidden";
        }, timeout);
    }

    scoreBall(ball) {
        if (ball === 0)
            return false;
        let currPlayer = this.currPlayer;
        let otherPlayer = this.players[-this.currPlayerIdx + 1];
        if (currPlayer.ballGroup === SOLID) {
            if (ball <= 8) {
                currPlayer.score(ball);
                this.ballContainers[this.currPlayerIdx].insertBall(ball);
                return true;
            } else {
                otherPlayer.score(ball);
                this.ballContainers[-this.currPlayerIdx + 1].insertBall(ball);
            }
        } else if (currPlayer.ballGroup === STRIPES) {
            if (ball >= 8) {
                currPlayer.score(ball);
                this.ballContainers[this.currPlayerIdx].insertBall(ball);
                return true;
            } else {
                otherPlayer.score(ball);
                this.ballContainers[-this.currPlayerIdx + 1].insertBall(ball);
            }
        } else {
            this.unassignedBalls.push(ball);
            return true;
        }
        return false;
    }

    update() {
        this.updateState();
        if (this.state === ANALYZING_EVENTS) {
            let detectedEvents = this.ruleHandler.handleEvents(this.events);

            let currPlayer = this.currPlayer;
            let otherPlayer = this.players[-this.currPlayerIdx + 1];
            let scoredBalls = 0;

            if (this.breakShotDone && currPlayer.ballGroup !== null) {
                for (const ball of detectedEvents.pocketedBalls) {
                    if (this.scoreBall(ball))
                        ++scoredBalls;
                }
            } else if (this.breakShotDone && currPlayer.ballGroup === null) {
                if (detectedEvents.pocketedBalls.length > 0) {
                    for (const ball of detectedEvents.pocketedBalls) {
                        if (ball === 0)
                            continue;
                        if (ball > 8) {
                            currPlayer.ballGroup = STRIPES;
                            otherPlayer.ballGroup = SOLID;
                        } else if (ball < 8) {
                            currPlayer.ballGroup = SOLID;
                            otherPlayer.ballGroup = STRIPES;
                        } else {
                            this.declareLoss(this.currPlayerIdx);
                            return;
                        }
                    }
                    if (currPlayer.ballGroup !== null) {
                        for (const ball of detectedEvents.pocketedBalls) {
                            if (this.scoreBall(ball))
                                ++scoredBalls;
                        }
                        for (const ball of this.unassignedBalls) {
                            if (this.scoreBall(ball))
                                ++scoredBalls;
                        }
                        this.unassignedBalls = null;
                    }
                }
            } else if (!this.breakShotDone) {
                for (const ball of detectedEvents.pocketedBalls) {
                    if (ball === 0)
                        continue;
                    this.unassignedBalls.push(ball);
                    ++scoredBalls;
                }
            }

            if (detectedEvents.fouls.has(POCKET_8)) {
                if (this.currPlayer.scoredBalls.length < 8) {
                    this.declareLoss(this.currPlayerIdx);
                } else {
                    this.declareWin(this.currPlayerIdx);
                }
                return;
            }
            if (detectedEvents.fouls.size > 0) {
                this.declareFouls(detectedEvents.fouls);
                this.setBallInHand();
            } else if (scoredBalls !== 0) {
                this.currPlayerIdx = -this.currPlayerIdx + 1;
            }
            this.events.clear();
            this.analyzedTurnEvents = true;
            this.breakShotDone = true;
            return;
        } else if (this.state === AWAITING_SHOT) {
            // if cue was pocketed
            if (!this.balls[15].existent) {
                this.balls[15].existent = true;
                this.recreateCueShape();
                this.addCueListeners();
                this.repositionStickBehindCue();
                return;
            }
        }
        this.physicsHandler.handleBallNearPocket();
        this.physicsHandler.handleBallCollision();
        this.physicsHandler.updateBallsPosition();
    }
}

function getAngle(dy, dx) {
    let angle = Math.atan2(dy, dx) * 180 / Math.PI;   //radians
    angle = 360 + angle;
    return angle;
}

let animationRequests = new LinkedList();
let table;
let appState = null;
let fpsMeter = new FPSMeter(document.getElementById("fps"), 15);

function main() {
    let x = (windowWidth - tableWidth) / 2;
    let y = 0.25 * windowHeight;
    appState = 'pause';
    table = new Table(x, y, tableWidth);
    window.table = table;
    // table.freeze();
    fpsMeter.start();
}

function onFrame() {
    frame = (frame + 1) % 60;
    fpsMeter.update();
    if (appState !== 'play') {
        return;
    }
    if (table.frozen) {
        return;
    }
    table.update();
    if (animationRequests.size > 0) {
        let it = animationRequests.iterator();
        while (it.hasNext()) {
            let animation = it.next();
            if (animation.progress()) {
                animation.onFinish();
                it.remove();
            }
        }
    }
}

globals.main = main;

