let terminalText = document.getElementById("terminal-text");
var i = 0;

let emailDetails = {
  senderName: "",
  subject: "",
  body: "",
};

class Terminal {
  constructor(commands) {
    this.terminal = $("#terminal");
    this.terminalTexts = document.getElementsByClassName("command-text");
    this.commands = commands;
    this.active = true;
    this.currentDirectory = "~";
    this.path = "~";
    this.directoryContents = mainDirectory;
    this.lastEnteredText = "";
    this.inputMode = false;
  }

  createNextLine() {
    console.log("Creating a new line");
    let ele = $("#terminal-text-active");
    let textEntered = ele.val();
    console.log("Entered text is:", textEntered);
    ele.remove();

    //create new node and append as child
    console.log(this.terminalTexts);
    if (this.inputMode) {
      this.addLine(textEntered);
      this.lastEnteredText = textEntered;
      this.commands["./"].call(this);

      if (this.commands["./"].ptr !== mailInputInfo.length + 1)
        terminal.createNextCursor();
      return;
    }

    this.terminalTexts[
      this.terminalTexts.length - 1
    ].innerText = `> ${textEntered}`;

    textEntered = textEntered.trimRight();

    if (textEntered.startsWith("cat ")) {
      let name = textEntered.split(" ")[1];
      this.commands["cat"].call(this, name);
    } else if (textEntered == "python") {
      this.active = false;
      this.commands["python"].call(this);
    } else if (textEntered.startsWith("./")) {
      let fileName = textEntered.split(" ")[0].slice(2);
      if (fileName === "email_me.sh" && this.currentDirectory === "contact") {
        this.commands["./"].call(this);
        this.inputMode = true;
      } else {
        this.showInvalid(textEntered);
      }
    } else if (this.commands[textEntered]) {
      this.commands[textEntered].call(this);
    } else if (textEntered.startsWith("cd ")) {
      let dir = textEntered.split(" ")[1];
      this.commands["cd"].call(terminal, dir);
    } else if (textEntered.trim(" ") == "") {
      //allow empty line
    } else {
      this.showInvalid(textEntered);
    }

    this.path = "~";
    if (this.currentDirectory != "~") {
      this.path = `~/${this.currentDirectory}`;
    }

    this.createNextCursor();
  }

  createNextCursor() {
    if (this.inputMode) {
      alert("yes input mode");
      this.terminal.append(`
      <input id="terminal-text-active" autocapitalize="off" autocomplete="off" type="text" value="" style="width: 100%; text-decoration: none>">`);
      document.getElementById("terminal-text-active").focus();

      document
        .getElementById("terminal-text-active")
        .addEventListener("keyup", inputKeyUp);
    } else if (this.active) {
      this.terminal.append(`
            <div class="terminal-line">
                <p class="command-text">user@terminal:<span class="terminal-path">${this.path}</span>&nbsp;>&nbsp;</p>
                <input autocapitalize="off" autocomplete="off" type="text" value="" style="width: 100%; text-decoration: none" id="terminal-text-active" class="terminal-text">
            </div>`);

      document
        .getElementById("terminal-text-active")
        .addEventListener("keyup", inputKeyUp);
      this.terminalTexts = document.getElementsByClassName("command-text");
      document.getElementById("terminal-text-active").focus();
    }
  }

  showInvalid(name) {
    this.terminal.append(`<p>\n${name}: Command not found</p>`);
  }

  addLine(lineText) {
    this.terminal.append(`<pre class='pre-terminal'>${lineText}</pre>`);
  }

  addLineInput(lineText) {
    this.terminal.append(`<pre class='terminal-text-active'>${lineText}</pre>`);
  }

  addDiv(divText) {
    this.terminal.append(divText);
  }

  reset() {
    console.log("Clearing terminal...");
    this.terminal.empty();
  }

  changeDirectory(directoryName, directoryContents) {
    this.currentDirectory = directoryName;
    this.directoryContents = directoryContents;
  }

  addChar(char) {
    if (char == "\n") {
      this.terminal.append("<br>");
    }
    this.terminal.append(char);
  }
}

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

//---------------------------COMMANDS----------------------------
let clear = new Command("Clear the screen", function (terminal) {
  terminal.reset();
});

let help = new Command("Get a list of available commands", (terminal) => {
  terminal.addLine("\nHere is a list of available commands:\n");
  Object.entries(commands).forEach((cmd) => {
    terminal.addLine(`\xa0\xa0${cmd[0]}\n`);
  });
});

let ls = new Command(
  "Get a list of available directories",
  function (terminal) {
    if (terminal.lastElementChild) terminal.lastElementChild.id = "";
    terminal.directoryContents.forEach((ele) => {
      let val = ele.name;
      if (ele.isLink) {
        terminal.addDiv(`
            <a href="${ele.link}" target="_blank" style='cursor: pointer;  font-weight: bold;' class='fancy ls-result'>
            ${val}\t</a>`);
      } else {
        terminal.addDiv(
          `<span class='ls-result style='color: rgba(200, 200, 200, 1) !important;'>${val}\t</span>`
        );
      }
    });
    terminal.addLine("\n");
  }
);

//returns true if successful operation otherwise false
let cat = new Command("List file contents", function (terminal, fName) {
  let ok = false;
  if (fName && fName != "") {
    let name = fName.trimRight();
    let info = null;
    terminal.directoryContents.forEach((ele) => {
      if (ele.name === name) {
        info = ele;
      }
    });
    if (info) {
      //file in CURRENT directory
      if (info.accessDenied) {
        terminal.addDiv("<p class='unauth'>Permission denied</p>");
      } else {
        if (name == "about.txt") {
          terminal.addLine(aboutText);
        } else if (name == "script.py") {
          terminal.addLine(scriptText);
        }
      }
      ok = true;
    }
  }
  let name = fName || "";
  if (!ok) {
    //nothing found
    terminal.addLine(`cat: ${name}: No such file`);
  }
});

let python = new Command("Python shell", function (terminal) {
  i = 0;
  terminal.addLine("Python 3.8.6");
  terminal.addLine(
    'Type "help" for more information or "exit" to quit the Python shell.\n'
  );
  terminal.addLine(pythonClassBody);

  typeWriter(terminal, pythonInfo, 20);
  pythonActive = true;
});

let cd = new Command("Change Directory", function (terminal, dirName) {
  console.log("Changed directory to:", dirName);
  if (dirName == "projects" || dirName == "projects/") {
    terminal.changeDirectory("projects", projectsDirectory);
  } else if (dirName == "contact" || dirName == "contact/") {
    terminal.changeDirectory("contact", contactDirectory);
  } else if (
    dirName == "" ||
    dirName == "/" ||
    dirName == "~" ||
    dirName == ".."
  ) {
    terminal.changeDirectory("~", mainDirectory);
  } else if (dirName == "resume.pdf") {
    window.open(resumeLink, "_blank");
  } else if (dirName == "github") {
    window.open(githubLink, "_blank");
  } else {
    let found = false;

    if (terminal.currentDirectory.startsWith("projects")) {
      //search if it is a project
      projectsDirectory.forEach((project) => {
        if (project.name == dirName) {
          found = true;
          // window.open(project.link, "_blank")

          let tags = project.tags.map((tag) => {
            return `<p class="tag">${tag}</p>`;
          });
          let tagsElement = tags.join("\n");

          let imageElements = project.images.map((imageSrc, index) => {
            return `
                <img class="showcase-img" style="z-index:${
                  project.images.length - index
                }; left:${index * 20}px; bottom:${
              index * 30
            }px;" src="${imageSrc}" alt=""></img>
              `;
          });

          $("#terminal").append(
            `<div class="project-container">
              
              <a href="${project.link}" target="_blank" style="text-decoration:none">
              <div class="project">
                  <div class="project-header">
                    <p class="project-title">${project.name}</p>
                    <div class="menu-btns">
                      <span class="min-btn">-</span>
                      <span class="max-btn">□</span>
                      <span class="close-btn">X</span>
                    </div>
                  </div>
                  <p class="project-desc">${project.desc}</p>
                  
                  <div class="showcase-div">
                    <div class="showcase">
                      ${imageElements}
                    </div>
                    <div class="video-showcase">
                      <iframe width="420" height="315"
                          src="${project.video}">
                      </iframe>
                    </div>
                  </div>
                  <p>Tech stack:</p>
                  <div class="tags">
                    ${tagsElement}
                  </div>
              </div>
              </a>
            </div>`
          );
        }
      });
    }
    //invalid dir
    if (!found) {
      terminal.addLine(`cd: no such directory: ${dirName}`);
    }
  }
});

const resetTerminalInput = (terminal) => {
  terminal.commands["./"].ptr = 0;
  terminal.inputMode = false;
  terminal.createNextCursor();
};

let exec = new Command("Execute file", function (terminal, ptr) {
  let terminalText = terminal.lastEnteredText;

  let text = mailInputInfo[ptr];
  if (ptr !== 0) {
    let key = mailInputFields[ptr - 1];
    emailDetails[key] = terminalText;
  }
  if (ptr == mailInputInfo.length) {
    console.log("Details are:", emailDetails);

    let formData = new FormData();
    formData.append("service_id", "service_7f04whc");
    formData.append("template_id", "template_ud54ccf");
    formData.append("user_id", "user_PVfFPcFv9TqO6mBtcMQfe");
    formData.append("from_name", emailDetails.senderName);
    formData.append("to_name", "Shubham");
    formData.append("subject", emailDetails.subject);
    formData.append("message", emailDetails.body);

    $.ajax("https://api.emailjs.com/api/v1.0/email/send-form", {
      type: "POST",
      data: formData,
      contentType: false, // auto-detection
      processData: false, // no need to parse formData to string
    })
      .done(function () {
        terminal.addLine("Successfully sent an e-mail!");
        resetTerminalInput(terminal);
      })
      .fail(function (error) {
        terminal.addLine("Oops! Could not send the e-mail.");
        resetTerminalInput(terminal);
      });
    return;
  }
  terminal.addLine(text);
});

//----------------------------------------------------------------

class Project {
  constructor(info) {
    this.name = info.name;
    this.desc = info.desc;
    this.link = info.link;
    this.images = info.images;
  }
}

//helper functions
function makeUL(array) {
  let list = document.createElement("ul");
  for (let i = 0; i < array.length; i++) {
    let item = document.createElement("li");
    item.appendChild(document.createTextNode(array[i]));
    list.appendChild(item);
  }

  // Finally, return the constructed list:
  return list;
}

function typeWriter(terminal, txt, speed) {
  console.log(txt);
  if (i < txt.length) {
    terminal.active = false;
    terminal.addChar(txt.charAt(i));
    i++;
    setTimeout(function () {
      typeWriter(terminal, txt, speed);
    }, speed);
  } else {
    terminal.active = true;
    terminal.createNextCursor();
    i = 0; //reset global variable
  }
  $(document).scrollTop($(document).height());
}

let commands = {
  ls: ls,
  help: help,
  clear: clear,
  cd: cd,
  cat: cat,
  python: python,
  python3: python,
  "./": exec,
};

const terminal = new Terminal(commands);

const project = new Project(projectsDirectory[3]);

function inputKeyUp(e) {
  if (e.keyCode == 13) {
    console.log("Enter");
    terminal.createNextLine();
  }
}

var data = {
  service_id: "service_7f04whc",
  template_id: "template_ud54ccf",
};

$(document).ready(() => {
  document
    .getElementById("terminal-text-active")
    .addEventListener("keyup", inputKeyUp);
  document.getElementById("terminal-text-active").focus();
});

window.onload = () => {
  // var formData = new FormData();
  // formData.append("service_id", "service_7f04whc");
  // formData.append("template_id", "template_ud54ccf");
  // formData.append("user_id", "user_PVfFPcFv9TqO6mBtcMQfe");
  // formData.append("from_name", "XYZ")
  // formData.append("to_name", "ABC")
  // formData.append("message", "lorem ipsum dolor")
};
