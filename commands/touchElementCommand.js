class TouchElementCommand extends CrateElementCommand {
    getNewElement(elementName) {
        return new SimpleFile(elementName);
    }
}
