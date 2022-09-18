let terminalText = document.getElementById("terminal-text");
var i = 0;
var index = 0;

let emailDetails = {
  senderName: "",
  subject: "",
  body: "",
};

const terminal = new Terminal([]);
let ls = new ListCommand(terminal, "ls command description");
let cat = new CatCommand(terminal, "cat command description");
let cd = new ChangeDirectoryCommand(terminal, "cd command description");
let pwd = new PresentWorkingDirectoryCommand(terminal, "pwd description");
let mkdir = new MakeDirectoryCommand(terminal, "mkdir command description");
let touch = new TouchElementCommand(terminal, "touch command description");
let clear = new ClearCommand(terminal, "clear command description");


$(document).ready(() => {
  document
    .getElementById("terminal-text-active")
    .addEventListener("keyup", inputKeyUp);
  document.getElementById("terminal-text-active").focus();
});

window.onload = () => {};
