// class Command {
//     constructor(terminal, description) {
//       this.terminal = terminal;
//       this.description = description;
//     }
    
//     /**
//      * Abstract method
//      */
//     execute() {
//       throw new Error('You have to implement the method!');
//     }

// }

class Command {
  constructor(desc, func) {
    this.desc = desc;
    this.func = func;
    this.ptr = 0;
  }

  call(...args) {
    this.func(...args, this.ptr);
    this.ptr += 1;
  }
}
