class Directory {
  constructor(directoryName) {
    this.name = Directory.removeTrailingSlash(directoryName);
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

  addElement(element) {
    this.elements.push(element);
  }

  removeElement(element) {
  }

  listDirectory() {
    return this.elements;
  }

  getChildDirectory(directoryName) {
    const indexOfDirectory = this.elements.map(element => element.name).indexOf(directoryName);
    if (indexOfDirectory === -1) {
      throw Error(`Directory "${this.name}/" does not have a child directory called "${directoryName}"!`)
    }
    const directory = this.elements[indexOfDirectory];
    console.log("directory is", directory);
    if (!(directory instanceof Directory)) {
      throw new Error(`${directoryName} is a file, not a directory!`)
    }
    return directory;
  }

  getNestedChildDirectory(fullPath) {
    if (!fullPath) {
      return this;
    }
    console.log(fullPath, "fullpath");
    const directoriesList = fullPath.split('/');
    const immediateNextDirectoryName = directoriesList[0];
    console.log("immediateNextDirectoryName", immediateNextDirectoryName);
    const immediateNextDirectory = this.getChildDirectory(immediateNextDirectoryName);
    console.log("immediateNextDirectory", immediateNextDirectory);
    return immediateNextDirectory.getNestedChildDirectory(directoriesList.slice(1).join("/"));
  }

  /**
   * Override method for custom click behaviour
   */
  handleClick(e) {
    $("#terminal-text-active").val(`ls ${e.target.title}`);
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

    a.onclick = this.handleClick;
    return span;
  }
}


// class ProjectDirectory extends Directory {
  
// }
