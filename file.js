class SimpleFile {
    constructor(fileName) {
        this.name = fileName;
    }

    render() {
        return `<span class='ls-result' style='color: rgba(200, 200, 200, 1) !important;'>${this.name}\t</span>`
    }
}
