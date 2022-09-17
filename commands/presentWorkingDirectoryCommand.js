class PresentWorkingDirectoryCommand extends Command {
    execute() {
        this.terminal.addLine(this.terminal.currentDirectory.name + '/');
        this.terminal.addLine("\n");
    }
}
