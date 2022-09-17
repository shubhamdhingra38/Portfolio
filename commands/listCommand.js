class ListCommand extends Command {

  resetLastElementID() {
    if (this.terminal.lastElementChild) {
      this.terminal.lastElementChild.id = "";
    }
  }

  execute(directoryName) {
    this.resetLastElementID();

    let elementsInDirectory;
    try {
      if (directoryName) {
        elementsInDirectory = this.terminal.getElementsInDirectory(directoryName);
      } else {
        elementsInDirectory = this.terminal.currentDirectory.listDirectory();
      }
      elementsInDirectory.forEach((ele) => {
        const renderDiv = ele.render();
        this.terminal.addDiv(renderDiv);
      });
    }
    catch (err) {
      console.error(err);
      this.terminal.showError(err.message);
    }
    this.terminal.addLine("\n");
  }
}
