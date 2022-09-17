class Command {
    constructor(terminal, description) {
      this.terminal = terminal;
      this.description = description;
    }
    
    /**
     * Abstract method
     */
    execute() {
      throw new Error('You have to implement the method!');
    }
    
    /**
     * Abstract method
     */
    execute(...args) {
      throw new Error('You have to implement the method!');
    }

    /**
     * Abstract method
     */
    generateHelp() {
      throw new Error('You have to implement the method!');
    }

}
