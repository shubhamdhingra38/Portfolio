class FileElement {
  constructor(name, parent = null) {
    this.name = name;
    this.parent = parent;
  }

  getFullPathFromRoot() {
    if (this.parent === null) {
      return "";
    }
    return this.parent.getFullPathFromRoot() + "/" + this.name;
  }
}
