function projectHandleClick(name) {
  $("#terminal-text-active").val(`cd ${name}`);
  terminal.createNextLine();
}

function generateBulletPoints(contents) {
  let result = "";
  contents.forEach((text) => {
    result += "• " + text + "\n";
  });
  return result;
}

const resetTerminalInput = (terminal) => {
  terminal.commands["./"].ptr = 0;
  terminal.inputMode = false;
  terminal.createNextCursor();
};

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

function destroy(e) {
  let id = e.target.id;
  id = id.split("-").splice(-1);
  let element = document.getElementById(`showcase-${id}`);
  element.parentNode.removeChild(element);
}

function inputKeyUp(event) {
  if (event.keyCode == ENTER_KEY_VALUE) {
    console.log("Enter");
    terminal.createNextLine();
  }
}
