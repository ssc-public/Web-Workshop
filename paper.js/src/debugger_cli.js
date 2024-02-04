function CLIHandler(inputElement, logElement = null, cli = null, logs = []) {
    this.cli = cli;
    this._logs = logs;
    this._prevCommands = [''];
    this._prevCommandIndex = 0;
    this.inputElement = inputElement;
    this.logElement = logElement;
    this.active = false;

    this.clearLog = function () {
        this.logs = [];
        if (this.logElement !== null) {
            this.logElement.innerText = "";
        }
    };
    this.log = function (s) {
        this._logs.push(s);
        this.logElement.innerText += s + '\n';
    };
    this.toggle = function () {
        this.logElement.readOnly = this.active;
        this.active = !this.active;
        if (this.active) {
            this.cli.style.visibility = 'visible';
            inputElement.focus();
        } else
            this.cli.style.visibility = 'hidden';
    };
    this.processCommand = function () {
        let command = this.getCommand().toLowerCase();
        if (command === '')
            return;
        this._prevCommandIndex = this._prevCommands.length;
        this._prevCommands.push(this.getCommand());
        this.inputElement.value = "";
        if (command === 'clear') {
            this.clearLog();
            return;
        } else if(command === 'help'){
            for(let cmd of Debugger._commandsMap.keys()){
                this.log(cmd);
            }
            return;
        }
        let args = command.split(" ");
        console.log(`processing "${command}"`);
        let ans = Debugger.runCommand(args[0], args.slice(1));
        this.log(command);
        this.log(ans);
    };
    this.getPrevCommand = function () {
        if (this._prevCommandIndex < 0)
            return '';
        return this._prevCommands[this._prevCommandIndex--];
    };

    this.getNextCommand = function () {
        if (this._prevCommandIndex === this._prevCommands.length - 1)
            return '';
        return this._prevCommands[++this._prevCommandIndex];
    };

    this.setInput = function (s) {
        this.inputElement.value = s;
    };
    this.getCommand = function () {
        return this.inputElement.value;
    };
}