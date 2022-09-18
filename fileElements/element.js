class FileElement {
  constructor(name) {
    this.name = name;
    this.parent = null;
  }

  getFullPathFromRoot() {
    if (this.parent === null) {
      return "";
    }
    return this.parent.getFullPathFromRoot() + "/" + this.name;
  }
}
