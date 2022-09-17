class ClearCommand extends Command {
    execute() {
        this.terminal.reset();
    }
}
