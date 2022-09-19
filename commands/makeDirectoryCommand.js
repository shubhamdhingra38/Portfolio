class MakeDirectoryCommand extends CreateElementCommand {
  getNewElement(elementName) {
    return new Directory(elementName);
  }
}
