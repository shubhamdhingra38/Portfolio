class CatCommand extends Command {
  
  execute(fName) {
    let ok = false;
    if (fName && fName !== "") {
      let name = fName.trimRight();
      let info = null;
      this.terminal.getElementsInCurrentDirectory().forEach((ele) => {
        if (ele.name === name) {
          info = ele;
        }
      });
      if (info) {
        //file in CURRENT directory
        if (info.accessDenied) {
          this.terminal.addDiv("<p class='unauth'>Permission denied</p>");
        } else {
          if (name == "about.txt") {
            this.terminal.addLine(ABOUT_TEXT);
          } else if (name == "script.py") {
            this.terminal.addLine(SCRIPT_TEXT);
          }
        }
        ok = true;
      }
    }
    let name = fName || "";
    if (!ok) {
      //nothing found
      this.terminal.showError(`cat: ${name}: No such file`);
    }
  }
}
