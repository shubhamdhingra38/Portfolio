class MakeDirectoryCommand extends Command {
  doesDirectoryExist(directoryName) {
    try {
      this.getDirectory(directoryName);
      return true;
    } catch (error) {
      console.warn(error);
      return false;
    }
  }

  createNewDirectory(directoryName) {
    if (directoryName == '/') {
      return;
    }

    let fullDirectoryPath;
    if (Command.isRootRelativeCommand(directoryName)) {
      fullDirectoryPath = directoryName;
    } else {
      if (Command.isCurrentDirectoryRelativeCommand(directoryName)) {
        directoryName = directoryName.slice(2);
      }
      fullDirectoryPath = this.terminal.currentDirectory.getFullPathFromRoot() + '/' + directoryName;
    }
    fullDirectoryPath = Directory.removeTrailingSlash(fullDirectoryPath);
    fullDirectoryPath = Directory.removeLeadingSlash(fullDirectoryPath);

    const directories = fullDirectoryPath.split('/');
    let currentDirectory = mainDirectory;
    for(let i=0; i<directories.length; ++i) {
      let directory;
      if (currentDirectory.hasElement(directories[i])) {
        directory = currentDirectory.getChildElement(directories[i]);
      } else {
        directory = new Directory(directories[i]);
        currentDirectory.addElement(directory);
      }
      currentDirectory = directory;
    }
  }

  
  execute(directoryName) {
    this.createNewDirectory(directoryName);
  }
}
