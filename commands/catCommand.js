class CatCommand extends Command {
  
  execute(fullPath) {
    let ok = false;
    try {
      let file = this.terminal.getFileInDirectory(fullPath);
      if (file) {
        if (file.accessDenied) {
          this.terminal.addDiv("<p class='unauth'>Permission denied</p>");
        } else {
          const contents = file.getContents();
          this.terminal.addLine(contents);
        }
        ok = true;
      }
    }
    catch (error) {
      console.error(error);
    }
    if (!ok) {
      this.terminal.showError(`cat: No such file found at path "${fullPath}"`);
    }
  }
}
