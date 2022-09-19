class HelpCommand extends Command {
  constructor(terminal, command, description, expectedArgumentsCount, listOfCommands) {
    super(terminal, command, description, expectedArgumentsCount);
    this.commands = listOfCommands;
  }

  getHelpText() {
    let text = 'Here is a list of available commands:\n\n';
    this.commands.forEach(command => {
      text += `\t${command.command}:\n\t\t ${command.description}\n`;
    })
    return text;
  }

  execute() {
    const text = this.getHelpText();
    this.terminal.addLine(text);
    this.terminal.addLine('\n');
  }
}
