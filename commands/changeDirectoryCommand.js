class ChangeDirectoryCommand extends Command {

  execute(...args) {
    const directoryName = args[0];
    try {
      directoryName = Directory.removeTrailingSlash(directoryName);
      const directory = this.getDirectory(directoryName);
      this.terminal.setCurrentDirectory(directory);
    }
    catch (error) {
      this.terminal.showError(error);
    }
  }
}
