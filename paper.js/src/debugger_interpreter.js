let Debugger = function () {
    Debugger._singleCommandsHelp = ['Win as current player.'];
    // Debugger._commands = new Set(['win', 'lose', 'pocket', 'ball-in-hand', 'table-state']);
    Debugger._ballsOrder = [15, 14, 13, 11, 8, 0, 3, 6, 10, 12, 9, 5, 4, 1, 7, 2];

    function Debugger() {
    }

    Debugger.debugWin = function () {
        table.declareWin(table.currPlayerIdx);
        return `${table.currPlayer.name} Won`
    };

    Debugger.debugLoss = function () {
        table.declareLoss(table.currPlayerIdx);
        return `${table.currPlayer.name} Lost`
    };
    Debugger.debugBallInHand = function () {
        table.setBallInHand();
        return "Ball In Hand";
    };
    Debugger.debugPocket = function (args) {
        if (table.removeBall(Debugger._ballsOrder[args[0]], args[1])) {
            return `Pocket Ball #${args[0]}`;
        } else
            return "Wrong Ball Number";
    };
    Debugger.clear = function () {
    };
    Debugger.runCommand = function (command, args) {
        if (!Debugger._commandsMap.has(command))
            return `Error: Command "${command}" not found`;
        return Debugger._commandsMap.get(command)(args);
    };
    Debugger.printTableState = function () {
        return stateStrings[table.state];
    };
    Debugger.setGTM = function (val = DEFAULT_GLOBAL_TIME_MULTIPLIER) {
        if (typeof val[0] === 'undefined')
            val = DEFAULT_GLOBAL_TIME_MULTIPLIER;
        if (val <= 0 || val > MAX_GTM)
            return "GTM out of bounds";
        PREF_GLOBAL_TIME_MULTIPLIER = Number(val);
        return `GTM= ${val}`;
    };
    Debugger._commandsMap = new Map([
        ['ball-in-hand', Debugger.debugBallInHand],
        ['table-state', Debugger.printTableState],
        ['pocket', Debugger.debugPocket],
        ['lose', Debugger.debugLoss],
        ['set-gtm', Debugger.setGTM],
        ['clear', Debugger.clear],
        ['win', Debugger.debugWin]
    ]);
    return Debugger;
}();