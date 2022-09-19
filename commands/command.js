class Command {
    constructor(terminal, command, description, expectedArgumentsCount) {
      this.terminal = terminal;
      this.command = command;
      this.description = description;
      this.expectedArgumentsCount = expectedArgumentsCount;
    }
    
    static isCurrentDirectoryRelativeCommand(command) {
      return command.startsWith('./');
    }

    static isRootRelativeCommand(command) {
      return command.startsWith('/');
    }

    checkIfValidThenExecute(...args) {
      if(!this.expectedArgumentsCount.includes(args.length)) {
        throw new InvalidArgsException(`Invalid usage, this command does not expect ${args.length} number of arguments!`);
      }
      this.execute(...args);
    }

    /**
     * Abstract method
     */
    execute() {
      throw new Error('You have to implement the method!');
    }
    
    /**
     * Abstract method
     */
    execute(...args) {
      throw new Error('You have to implement the method!');
    }

    /**
     * Abstract method
     */
    generateHelp() {
      throw new Error('You have to implement the method!');
    }

    // cd ..
    // cd ..
    // cd ../projects/
    // cd ../../

    getDirectoryRelativeToCurrent(directoryName) {
      if (Command.isCurrentDirectoryRelativeCommand(directoryName)) {
        directoryName = directoryName.slice(2);
      }
      // if (Command.isPreviousDirectoryRelativeCommand(directoryName)) {
      //   return 
      // }
      return this.terminal.currentDirectory.getNestedChildElementWhichShouldNotBeAFile(directoryName);
    }

    getFileRelativeToCurrent(fileName) {
      if (Command.isCurrentDirectoryRelativeCommand(fileName)) {
        fileName = fileName.slice(2);
      }
      return this.terminal.currentDirectory.getNestedChildElementWhichShouldBeAFile(fileName);
    }
  
    getDirectoryRelativeToRoot(directoryName) {
      if (directoryName === '/') {
        return mainDirectory;
      } else {
        directoryName = directoryName.slice(1);
        return mainDirectory.getNestedChildElementWhichShouldNotBeAFile(directoryName);
      }
    }

    getFileRelativeToRoot(fileName) {
      fileName = fileName.slice(1);
      return mainDirectory.getNestedChildElementWhichShouldBeAFile(fileName);
    }
    

    getDirectory(directoryName) {
      let directory;
      if (!Command.isRootRelativeCommand(directoryName)) {
        directory = this.getDirectoryRelativeToCurrent(directoryName);
      } else {
        directory = this.getDirectoryRelativeToRoot(directoryName);
      }
      return directory;
    }

    getFile(fileName) {
      let file;
      if (!Command.isRootRelativeCommand(fileName)) {
        file = this.getFileRelativeToCurrent(fileName);
      } else {
        file = this.getFileRelativeToRoot(fileName);
      }
      return file;
    }
}
