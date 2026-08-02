class GameEventHandler {
    constructor(table) {
        this.numRe = /^[0-9]+$/;
        this.foulsMeta = [
            'cue_collide_no_ball', 'pocket_8', 'cue_collide_no_target_ball_first', 'no_ball_collide_rail_or_pocket',
            'pocket_cue', 'pocket_no_ball_and_less_than_4_collide_rail'];
        this.ballsCollidedWithRail = new Set();
        this.table = table;
    }

    cue_collide_no_ball(e) {
        if (e[1] === 'collide') {
            if (e[0] === 0) {
                if (this.numRe.test(e[2]))
                    return false;
            } else if (e[2] === 0)
                if (this.numRe.test(e[0]))
                    return false;
        }
        return null;
    }

    cue_collide_no_target_ball_first(e) {
        if (this.table.currPlayer.ballGroup === null)
            return false;
        if (e[1] === 'collide') {
            if (e[0] === 0 && this.numRe.test(e[2])) {
                return this.isOtherGroup(e[2]);
            } else if (e[2] === 0 && this.numRe.test(e[0])) {
                return this.isOtherGroup(e[0]);
            }
        }
        return null;
    }

    no_ball_collide_rail_or_pocket(e) {
        if (e[1] === 'collide' && e[2] === 'rail') {
            return false;
        } else if (e[0] === 'pocket') {
            return false;
        }
        return null;
    }

    pocket_no_ball_and_less_than_4_collide_rail(e) {
        if (e[1] === 'collide') {
            if (e[2] === 'rail') {
                if (e[0] !== 0) {
                    this.ballsCollidedWithRail.add(e[0]);
                    if (this.ballsCollidedWithRail.size > 3)
                        return false;
                }
            }
        } else if (e[0] === 'pocket' && e[1] !== 0)
            return false;
        return null;
    }

    pocket_8(e) {
        if (e[0] === 'pocket')
            if (e[1] === 8)
                return true;
        return null;
    }

    pocket_cue(e) {
        if (e[0] === 'pocket')
            if (e[1] === 0)
                return true;
        return null;
    }

    isOtherGroup(num) {
        let oneRemaining = this.table.currPlayer.scoredBalls.length === 7;
        if (this.playerGroup === STRIPES)
            return oneRemaining ? num < 8 : num <=8;
        else
            return oneRemaining ? num > 8 : num >=8;
    }

    detectPocketedBalls(events) {
        let it = events.iterator();
        let pocketedBalls = [];
        while (it.hasNext()) {
            let e = it.next();
            if (e[0] === 'pocket')
                pocketedBalls.push(e[1]);
        }
        return pocketedBalls;
    }

    detectFouls(events, playerGroup) {
        this.playerGroup = playerGroup;
        let rulesToCheck =
            [
                [this.cue_collide_no_ball.bind(this), CUE_COLLIDE_NO_BALL],
                [this.pocket_8.bind(this), POCKET_8],
                [this.cue_collide_no_target_ball_first.bind(this), CUE_COLLIDE_NO_TARGET_BALL_FIRST],
                [this.no_ball_collide_rail_or_pocket.bind(this), NO_BALL_COLLIDE_RAIL_OR_POCKET],
                [this.pocket_cue.bind(this), POCKET_CUE]
            ];
        if (!this.table.breakShotDone) {
            rulesToCheck.push([this.pocket_no_ball_and_less_than_4_collide_rail.bind(this), 5])
        }

        let fLen = this.table.breakShotDone ? this.foulsMeta.length - 1 : this.foulsMeta.length;

        let answers = new Array(this.foulsMeta.length);
        let default_answers = [true, false, true, true, false, true];

        let it = events.iterator();
        while (it.hasNext()) {
            let e = it.next();
            for (const f of rulesToCheck) {
                if (answers[f[1]] != null)
                    continue;
                let ans = f[0](e);
                if (ans !== null) {
                    answers[f[1]] = ans;
                }
            }
        }
        let fouls = new Set();
        for (let i = 0; i < fLen; i++) {
            if (answers[i] === true)
                fouls.add(i);
            else if (answers[i] == null) {
                if (default_answers[i]) {
                    fouls.add(i);
                }
            }
        }
        return fouls;
    }

    handleEvents(events) {
        let fouls = this.detectFouls(events, this.table.currPlayer.ballGroup);
        return {fouls: fouls, pocketedBalls: this.detectPocketedBalls(events)};
    }

    reset() {
        this.ballsCollidedWithRail.clear();
    }
}
