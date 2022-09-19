class ExecCommand extends Command {
  execute(...args) {
    const fullPath = args[0];
    let ok = false;
    try {
      let file = this.getFile(fullPath);
      if (file && file instanceof ProjectFile) {
        file.showWindow();
        ok = true;
      }
    } catch (error) {
      console.error(error);
    }
    if (!ok) {
      this.terminal.showError(`exec: No executable file found at path "${fullPath}"`);
    }
  }
}
