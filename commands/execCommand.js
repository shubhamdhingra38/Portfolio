class ExecCommand extends Command {
  execute(...args) {
    const fullPath = args[0];
    console.log("path", fullPath);
    let ok = false;
    try {
      let file = this.getFile(fullPath);
      console.log("file", file);
      if (file && file instanceof ProjectFile) {
        console.log("showing window...");
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
