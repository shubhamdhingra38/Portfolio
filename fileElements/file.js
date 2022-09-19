class SimpleFile extends FileElement {
  constructor(fileName, contents) {
    super(fileName);
    this.contents = contents;
  }
  render() {
    let span = document.createElement("span");
    span.innerText = this.name;
    span.className = "ls-result";
    span.style = `cursor: pointer`;

    span.onclick = () => {
      this.handleClick();
    };
    return span;
  }
  getContents() {
    return this.contents;
  }
  handleClick() {
    $("#terminal-text-active").val(`cat ${this.getFullPathFromRoot()}`);
    terminal.createNextLine();
  }
  getFileNameWithoutExtension() {
    return this.name.split(".")[0];
  }
}
