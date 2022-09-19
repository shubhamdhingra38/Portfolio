class TouchElementCommand extends CreateElementCommand {
  getNewElement(elementName) {
    return new SimpleFile(elementName);
  }
}
