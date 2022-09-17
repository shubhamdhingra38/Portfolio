class ChangeDirectoryCommand extends Command {

  getDirectoryRelativeToCurrent(directoryName) {
    if (Command.isCurrentDirectoryRelativeCommand(directoryName)) {
      directoryName = directoryName.slice(2);
    }
    return this.terminal.currentDirectory.getChildDirectory(directoryName);
  }

  getDirectoryRelativeToRoot(directoryName) {
    if (directoryName === '/') {
      return mainDirectory;
    } else {
      directoryName = directoryName.slice(1);
      return mainDirectory.getNestedChildDirectory(directoryName);
    }
  }

  execute(directoryName) {
    let directory;
    try {
      directoryName = Directory.removeTrailingSlash(directoryName);
      if (!Command.isRootRelativeCommand(directoryName)) {
        directory = this.getDirectoryRelativeToCurrent(directoryName);
      } else {
        directory = this.getDirectoryRelativeToRoot(directoryName);
      }
      this.terminal.setCurrentDirectory(directory);
    }
    catch (error) {
      this.terminal.showError(error);
    }
  }
}
