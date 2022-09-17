class CrateElementCommand extends Command {
  createNewDirectory(directoryName) {
    if (directoryName == "/") {
      return;
    }

    let fullDirectoryPath;
    if (Command.isRootRelativeCommand(directoryName)) {
      fullDirectoryPath = directoryName;
    } else {
      if (Command.isCurrentDirectoryRelativeCommand(directoryName)) {
        directoryName = directoryName.slice(2);
      }
      fullDirectoryPath =
        this.terminal.currentDirectory.getFullPathFromRoot() +
        "/" +
        directoryName;
    }
    fullDirectoryPath = Directory.removeTrailingSlash(fullDirectoryPath);
    fullDirectoryPath = Directory.removeLeadingSlash(fullDirectoryPath);

    const directories = fullDirectoryPath.split("/");
    let currentDirectory = mainDirectory;
    for (let i = 0; i < directories.length; ++i) {
      let element;
      if (currentDirectory.hasElement(directories[i])) {
        element = currentDirectory.getChildElement(directories[i]);
      } else {
        if (i === directories.length - 1) {
          // Could be either a directory or a file, depending on mkdir or touch
          element = this.getNewElement(directories[i]);
        } else {
          element = new Directory(directories[i]);
        }
        currentDirectory.addElement(element);
      }
      currentDirectory = element;
    }
  }

  execute(directoryName) {
    this.createNewDirectory(directoryName);
  }
  
  /**
   * Abstract method
   */
  getNewElement(elementName) {
    throw Error('Not implemented!')
  }
}
