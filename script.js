// TODO: global bad!
const terminal = new Terminal();
const ls = new ListCommand(
  terminal,
  "ls",
  "List contents of directory. Type 'ls' to list contents of current directory or 'ls DIRECTORY_NAME' to list contents of a specific directory.",
  [0, 1]
);
const cat = new CatCommand(
  terminal,
  "cat",
  "Use 'cat FILE_NAME' to view contents of a file.",
  [1]
);
const cd = new ChangeDirectoryCommand(
  terminal,
  "cd",
  "Use 'cd DIRECTORY_NAME' to change the current directory to a specific directory.",
  [1]
);
const pwd = new PresentWorkingDirectoryCommand(
  terminal,
  "pwd",
  "Use 'pwd' to know the present working directory.",
  [0]
);
const mkdir = new MakeDirectoryCommand(
  terminal,
  "mkdir",
  "Use 'mkdir DIRECTORY_NAME' to create a new directory.",
  [1]
);
const touch = new TouchElementCommand(
  terminal,
  "touch",
  "Use 'touch FILE_NAME' to create a new file.",
  [1]
);
const clear = new ClearCommand(
  terminal,
  "clear",
  "Use 'clear' to clear the terminal.",
  [0]
);
const exec = new ExecCommand(
  terminal,
  "exec",
  "Use 'exec FILE_NAME.bin' to execute a binary file.",
  [1]
);
const infofetch = new InfoFetchCommand(
  terminal,
  "infofetch",
  "List information about me.",
  [0],
  INFO
);

const commands = [ls, cat, cd, pwd, mkdir, touch, clear, exec, infofetch];
const help = new HelpCommand(
  terminal,
  "help",
  "help command",
  [0, 1],
  commands
);

$(document).ready(() => {
  document
    .getElementById("terminal-text-active")
    .addEventListener("keyup", inputKeyUp);
  document.getElementById("terminal-text-active").focus();
});

window.onload = () => {};
