class Terminal {
    /**
     * Instantiate terminal with given valid commands
     * @param {*} commands: list of valid commands
     */
    constructor(commands) {
      this.commands = commands;
      
      this.terminal = $("#terminal");
      this.terminalTexts = document.getElementsByClassName("command-text");
      this.active = true;
      this.currentDirectory = "~";
      this.path = "~";
      this.directoryContents = MAIN_DIRECTORY;
      this.lastEnteredText = "";
      this.inputMode = false;
      this.intervalRemoval = null;
      this.windowID = 0;
    }
    
    renderCommandAndGoToNextLine() {
      let terminalInputEle = $("#terminal-text-active");
      let textEntered = terminalInputEle.val();
      terminalInputEle.remove();
      return textEntered;
    }

    addTextToLine(textEntered) {
      if (this.inputMode) {
        this.addLine(textEntered);
        this.lastEnteredText = textEntered;
        this.commands["./"].call(this);
  
        if (this.commands["./"].ptr !== MAIL_INPUT_INFO.length + 1)
          terminal.createNextCursor();
        return;
      }
    }

    //TODO: What the hell does this do
    whatDoesThisDo(textEntered) {
      this.terminalTexts[
        this.terminalTexts.length - 1
      ].innerText = `> ${textEntered}`;
    }

    executeCommand(command) {

  
      if (command.startsWith("cat ")) {
        let name = command.split(" ")[1];
        this.commands["cat"].call(this, name);
      } else if (command == "python") {
        this.active = false;
        this.commands["python"].call(this);
      } else if (command.startsWith("./")) {
        let fileName = command.split(" ")[0].slice(2);
        if (fileName === "email_me.sh" && this.currentDirectory === "contact") {
          this.commands["./"].call(this);
          this.inputMode = true;
        } else {
          this.showInvalidCommand(command);
        }
      } else if (this.commands[command]) {
        this.commands[command].call(this);
      } else if (command.startsWith("cd ")) {
        let dir = command.split(" ").splice(1).join(" ");
        this.commands["cd"].call(terminal, dir);
      } else if (command.trim(" ") == "") {
        //allow empty line
      } else {
        this.showInvalidCommand(command);
      }
    }

    renderCurrentDirectory() {
      this.path = "~";
      if (this.currentDirectory != "~") {
        this.path = `~/${this.currentDirectory}`;
      }
    }

    createNextLine() {
      let textEntered = this.renderCommandAndGoToNextLine();      
      console.log("The Entered text is:", textEntered);
      
      this.addTextToLine(textEntered);
      //this.whatDoesThisDo(textEntered);
      
      let command = textEntered.trim();
      this.executeCommand(command);
      
      this.renderCurrentDirectory();
      this.createNextCursor();
    }
  
    createNextCursor() {
      if (this.inputMode) {
        this.terminal.append(`
        <input id="terminal-text-active" autocapitalize="off" autocomplete="off" type="text" value="" style="width: 100%; text-decoration: none>">`);
        document.getElementById("terminal-text-active").focus();
  
        document
          .getElementById("terminal-text-active")
          .addEventListener("keyup", inputKeyUp);
      } else if (this.active) {
        this.terminal.append(`
              <div class="terminal-line">
                  <p class="command-text">user@terminal:<span class="terminal-path">${this.path}</span>&nbsp;>&nbsp;</p>
                  <input autocapitalize="off" autocomplete="off" type="text" value="" style="width: 100%; text-decoration: none" id="terminal-text-active" class="terminal-text">
              </div>`);
  
        document
          .getElementById("terminal-text-active")
          .addEventListener("keyup", inputKeyUp);
        this.terminalTexts = document.getElementsByClassName("command-text");
        document.getElementById("terminal-text-active").focus();
      }
    }
  
    showInvalidCommand(name) {
      this.terminal.append(`<p>\n${name}: Command not found</p>`);
    }
  
    addLine(lineText) {
      this.terminal.append(`<pre class='pre-terminal'>${lineText}</pre>`);
    }
  
    addLineInput(lineText) {
      this.terminal.append(`<pre class='terminal-text-active'>${lineText}</pre>`);
    }
  
    addDiv(divText) {
      this.terminal.append(divText);
    }
  
    reset() {
      console.log("Clearing terminal...");
      this.terminal.empty();
    }
  
    changeDirectory(directoryName, directoryContents) {
      this.currentDirectory = directoryName;
      this.directoryContents = directoryContents;
    }
  
    addChar(char) {
      if (char == "\n") {
        this.terminal.append("<br>");
      }
      this.terminal.append(char);
    }
}
