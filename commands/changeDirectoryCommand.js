class ChangeDirectoryCommand extends Command {

  execute(directoryName) {
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
