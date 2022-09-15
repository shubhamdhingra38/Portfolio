let clear = new Command("Clear the screen", function (terminal) {
  terminal.reset();
});

let help = new Command("Get a list of available commands", (terminal) => {
  terminal.addLine("\nHere is a list of available commands:\n");
  Object.entries(commands).forEach((cmd) => {
    terminal.addLine(`\xa0\xa0${cmd[0]}\n`);
  });
});

let ls = new Command("Get a list of available directories", function (
  terminal
) {
  if (terminal.lastElementChild) terminal.lastElementChild.id = "";
  terminal.directoryContents.forEach((ele) => {
    let val = ele.name;
    if (ele.isLink) {
      let a = document.createElement("a");
      a.style = "cursor: pointer;  font-weight: bold;";
      a.className = "fancy";
      // a.classList = ['fancy', 'ls-result']
      var link = document.createTextNode(val + "\t");
      a.appendChild(link);
      a.title = val;
      a.href = "#";
      let span = document.createElement("span");
      span.appendChild(a);
      // span.appendChild(link)
      span.className = "ls-result";
      a.onclick = ele.handleClick;
      terminal.addDiv(span);
    } else {
      terminal.addDiv(
        `<span class='ls-result' style='color: rgba(200, 200, 200, 1) !important;'>${val}\t</span>`
      );
    }
  });
  terminal.addLine("\n");
});

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
          terminal.addLine(ABOUT_TEXT);
        } else if (name == "script.py") {
          terminal.addLine(SCRIPT_TEXT);
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
  terminal.addLine(PYTHON_CLASS_BODY);

  typeWriter(terminal, PYTHON_INFO, 20);
  pythonActive = true;
});

let cd = new Command("Change Directory", function (terminal, dirName) {
  console.log("Changing directory to:", dirName);
  if (dirName == "projects" || dirName == "projects/") {
    terminal.changeDirectory("projects", PROJECTS_DIRECTORY);
  } else if (dirName == "contact" || dirName == "contact/") {
    terminal.changeDirectory("contact", CONTACT_DIRECTORY);
  } else if (
    dirName == "" ||
    dirName == "/" ||
    dirName == "~" ||
    dirName == ".."
  ) {
    terminal.changeDirectory("~", MAIN_DIRECTORY);
  } else if (dirName == "resume.pdf") {
    window.open(RESUME_LINK, "_blank");
  } else if (dirName == "github") {
    window.open(GITHUB_LINK, "_blank");
  } else {
    let found = false;

    if (terminal.currentDirectory.startsWith("projects")) {
      //search if it is a project
      PROJECTS_DIRECTORY.forEach((project) => {
        if (project.name == dirName) {
          found = true;

          index += 1;

          let tags = project.tags.map((tag) => {
            return `<p class="tag">${tag}</p>`;
          });
          let tagsElement = tags.join("\n");

          let imageElements = project.images.map((imageSrc, index) => {
            return `
            <img class="showcase-img" src="${imageSrc}" alt="Project Demo">
            `;
          });

          imageElements = imageElements.join("");
          console.log(imageElements);

          $("#terminal").append(
            `<div class="project-container" id="showcase-${index}">
            
            <div class="project">
                <div class="project-header">
                    <p class="project-title">${project.name}</p>
                    <div class="menu-btns" >
                    <span class="min-btn">-</span>
                    <span class="max-btn">□</span>
                    <span class="close-btn" id="showcase-close-${index}">X</span>
                    </div>
                </div>
                <p class="project-desc">${project.desc}</p>
                
                <div class="showcase-div">
                    <div class="showcase siema${index}">
                    ${imageElements}
                    </div>
                    <div class="video-showcase">
                    <iframe width="420" height="315"
                        src="${project.video}">
                    </iframe>
                    </div>
                </div>


                <button class="prev-btn prev${index}"><i class="fas fa-arrow-left"></i></button>
                <button class="next-btn next${index}"><i class="fas fa-arrow-right"></i></button>
                <p>Tech stack:</p>
                <div class="tags">
                    ${tagsElement}
                </div>
                <p>Check it out on <span><a class="github-link" target='_blank'href=${project.link}>GitHub</a></span></p>
            </div>
            </div>`
          );

          document.getElementById(`showcase-close-${index}`).onclick = destroy;

          const mySiema = new Siema({
            selector: `.siema${index}`,
            loop: true,
            duration: 500,
          });
          document
            .querySelector(`.prev${index}`)
            .addEventListener("click", () => mySiema.prev());
          document
            .querySelector(`.next${index}`)
            .addEventListener("click", () => mySiema.next());
        }
      });
    }
    //invalid dir
    if (!found) {
      terminal.addLine(`cd: no such directory: ${dirName}`);
    }
  }
});


let exec = new Command("Execute file", function (terminal, ptr) {
    let terminalText = terminal.lastEnteredText;
  
    let text = MAIL_INPUT_INFO[ptr];
    if (ptr !== 0) {
      let key = MAIL_INPUT_FIELDS[ptr - 1];
      emailDetails[key] = terminalText;
    }
    if (ptr == MAIL_INPUT_INFO.length) {
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
