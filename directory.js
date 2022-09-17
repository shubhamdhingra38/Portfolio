class Directory extends FileElement {
  constructor(directoryName) {
    directoryName = Directory.removeTrailingSlash(directoryName);
    super(directoryName);
    console.log("name", this.name);
    this.elements = [];
  }

  static removeTrailingSlash(directoryName) {
    if (directoryName === '/') {
      return directoryName; 
    }
    if (directoryName.endsWith('/')) {
      return directoryName.slice(0, -1);
    }
    return directoryName;
  }

  static removeLeadingSlash(directoryName) {
    if (directoryName === '/') {
      return directoryName; 
    }
    if (directoryName.startsWith('/')) {
      return directoryName.slice(1);
    }
    return directoryName;
  }

  addElement(element) {
    this.elements.push(element);
    element.parent = this;
  }

  removeElement(element) {
  }

  listDirectory() {
    return this.elements;
  }

  getChildElement(elementName) {
    const indexOfElement = this.elements.map(element => element.name).indexOf(elementName);
    if (indexOfElement === -1) {
      throw Error(`Directory "${this.name}/" does not have a child directory/file called "${elementName}"!`)
    }
    const element = this.elements[indexOfElement];
    return element;
  }
  
  getChildElementWhichShouldNotBeAFile(directoryName) {
    const element = this.getChildElement(directoryName);
    if (!(element instanceof Directory)) {
      throw new Error(`${directoryName} is a file, not a directory!`);
    }
    return element;
  }

  getChildElementWhichShouldBeAFile(fileName) {
    const element = this.getChildElement(fileName);
    if (!(element instanceof SimpleFile)) {
      throw new Error(`${fileName} is a directory, not a file!`);
    }
    return element;
  }

  getNestedChildElement(fullPath) {
    fullPath = Directory.removeLeadingSlash(fullPath);
    if (!fullPath) {
      return this;
    }
    const elementsList = fullPath.split('/');
    const immediateNextElementName = elementsList[0];
    const immediateNextElement = this.getChildElement(immediateNextElementName);
    if (immediateNextElement instanceof SimpleFile) {
      return immediateNextElement;
    }
    return immediateNextElement.getNestedChildElement(elementsList.slice(1).join("/"));
  }

  getNestedChildElementWhichShouldNotBeAFile(fullPath) {
    const element = this.getNestedChildElement(fullPath);
    if (!(element instanceof Directory)) {
      throw Error(`No directory found with path "${fullPath}"!`)
    }
    return element;
  }

  getNestedChildElementWhichShouldBeAFile(fullPath) {
    const element = this.getNestedChildElement(fullPath);
    if (!(element instanceof SimpleFile)) {
      throw Error(`No file found with path "${fullPath}"!`)
    }
    return element;
  }

  /**
   * Override method for custom click behaviour
   */
  handleClick(fullPath) {
    console.log(fullPath);
    $("#terminal-text-active").val(`ls ${fullPath}`);
    terminal.createNextLine();
  }

  render() {
    let a = document.createElement("a");
    a.style = "cursor: pointer;  font-weight: bold;";
    a.className = "fancy";

    var link = document.createTextNode(this.name + '/' + "\t");
    a.appendChild(link);
    a.title = this.name;
    a.href = "#";

    let span = document.createElement("span");
    span.appendChild(a);
    span.className = "ls-result";

    a.onclick = () => this.handleClick(this.getFullPathFromRoot());
    return span;
  }
}


// class ProjectDirectory extends Directory {
  
// }
