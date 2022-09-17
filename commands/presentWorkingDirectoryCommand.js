class PresentWorkingDirectoryCommand extends Command {
    execute() {
        const pathFromRoot = this.terminal.currentDirectory.getFullPathFromRoot();
        this.terminal.addLine(pathFromRoot + '/');
        this.terminal.addLine("\n");
    }
}
