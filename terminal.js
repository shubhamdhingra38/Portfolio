class Terminal {
 
  constructor() {
    this.terminal = $("#terminal");
    this.terminalTexts = document.getElementsByClassName("command-text");
    this.active = true;
    this.currentDirectory = mainDirectory;
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
    this.terminalTexts[
      this.terminalTexts.length - 1
    ].innerText = `> ${textEntered}`;
  }

  executeCommand(command) {
    const tokens = command.split(' ').slice(1);
    try {
      if (command.startsWith("cat ") || command === 'cat') {
        cat.checkIfValidThenExecute(...tokens);
      } else if (command.startsWith("ls ") || command === "ls") {
        ls.checkIfValidThenExecute(...tokens);
      } else if (command.startsWith("cd ") || command === 'cd') {
        cd.checkIfValidThenExecute(...tokens);
      } else if (command.startsWith("pwd ") || command === "pwd") {
        pwd.checkIfValidThenExecute(...tokens);
      } else if(command.startsWith("mkdir ") || command === 'mkdir') {
        mkdir.checkIfValidThenExecute(...tokens);
      } else if(command.startsWith("touch ") || command === 'touch') {
        touch.checkIfValidThenExecute(...tokens);
      } else if(command.startsWith("clear") || command === 'clear') {
        clear.checkIfValidThenExecute(...tokens);
      } else if(command.startsWith("help ") || command === 'help') {
        help.checkIfValidThenExecute(...tokens);
      } else if(command.startsWith("exec ") || command === 'exec') {
        exec.checkIfValidThenExecute(...tokens);
      }
      else if (command === '' || command.startsWith('./')) {
          //TODO: with ./ command check if binary in current directory
      }
      else {
        this.showError(`${command} is not a valid command! Type "help" to see a list of valid commands.`)
      }
    } catch (e) {
      console.error(e);
      if (e instanceof InvalidArgsException) {
        this.showError(e.message);
      } else {
        this.showError(`Something broke 😔`)
      }
    }
  }

  createNextLine() {
    let textEntered = this.renderCommandAndGoToNextLine();
    console.log("The Entered text is:", textEntered);

    this.addTextToLine(textEntered);

    let command = textEntered.trim();
    this.executeCommand(command);

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
                  <p class="command-text">user@terminal:<span class="terminal-path">${this.currentDirectory.getFullPathFromRoot()}/</span>&nbsp;>&nbsp;</p>
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

  addChar(char) {
    if (char == "\n") {
      this.terminal.append("<br>");
    }
    this.terminal.append(char);
  }

  getElementsInCurrentDirectory() {
    return this.currentDirectory.listDirectory();
  }

  setCurrentDirectory(directory) {
    this.currentDirectory = directory;
  }

  showError(errorMessage) {
    this.terminal.append(`<pre class='error-terminal'>${errorMessage}</pre>`);
  }
}
