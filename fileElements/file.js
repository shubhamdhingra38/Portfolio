class SimpleFile extends FileElement {
    constructor(fileName, contents) {
        super(fileName);
        this.contents = contents;
    }
    render() {
        return `<span class='ls-result' style='color: rgba(200, 200, 200, 1) !important;'>${this.name}\t</span>`
    }
    getContents() {
       return this.contents; 
    }
    getFileNameWithoutExtension() {
        return this.name.split('.')[0];
    }
}
