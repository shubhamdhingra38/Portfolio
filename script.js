let terminalText = document.getElementById("terminal-text");
var i = 0;
var index = 0;

let emailDetails = {
  senderName: "",
  subject: "",
  body: "",
};

const terminal = new Terminal([]);
const ls = new ListCommand(terminal, "ls", "ls command description", [0, 1]);
const cat = new CatCommand(terminal, "cat", "cat command description", [1]);
const cd = new ChangeDirectoryCommand(terminal, "cd", "cd command description", [1]);
const pwd = new PresentWorkingDirectoryCommand(terminal, "pwd", "pwd description", [0]);
const mkdir = new MakeDirectoryCommand(terminal, "mkdir", "mkdir command description", [1]);
const touch = new TouchElementCommand(terminal, "touch", "touch command description", [1]);
const clear = new ClearCommand(terminal, "clear", "clear command description", [0]);

const commands = [ls, cat, cd, pwd, mkdir, touch, clear];
const help = new HelpCommand(terminal, "help", "help command description", [0, 1], commands);


$(document).ready(() => {
  document
    .getElementById("terminal-text-active")
    .addEventListener("keyup", inputKeyUp);
  document.getElementById("terminal-text-active").focus();
});

window.onload = () => {};
