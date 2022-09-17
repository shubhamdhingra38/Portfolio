class MakeDirectoryCommand extends CrateElementCommand {
  getNewElement(elementName) {
    return new Directory(elementName);
  }
}
