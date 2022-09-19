class CatCommand extends Command {
  
  execute(...args) {
    const fullPath = args[0];
    let ok = false;
    try {
      let file = this.getFile(fullPath);
      if (file) {
        if (file.accessDenied) {
          this.terminal.showError("Permission denied!");
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
