class LinkFile extends SimpleFile {
  constructor(fileName, contents, fileLink) {
    super(fileName, contents);
    this.fileLink = fileLink;
  }
  handleClick() {
    super.handleClick();
    window.open(this.fileLink);
  }
}
