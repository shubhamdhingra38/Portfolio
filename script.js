let terminalText = document.getElementById('terminal-text')
let terminal = document.getElementById('terminal')

class Command{
    constructor(desc, func){
        this.desc = desc
        this.func = func
    }

    call(){
        if(terminal.lastElementChild.innerText.length != 2)
            createNewLine()
        this.func()
        createNewLine()
        
    }
}

let help = new Command("Get a list of available commands", showHelp)
// help.call()
let ls = new Command("Get a list of available directories", function() {
    terminal.lastElementChild.innerText += 'ls command'
})

let commands = ['help', 'ls', 'tree', 'pip list', 'pip freeze', 'python', 'python3']

function createNewLine(){
    terminal.lastElementChild.id = ''
    var para = document.createElement("p");
    para.classList = ['terminal-text']
    para.id = 'terminal-text-active'
    para.innerText += ">\xa0"
    terminal.appendChild(para)
    terminal.scrollTop = terminal.scrollHeight;
    // terminal.scrollTop = "500px"
    scrollSmoothToBottom('terminal')
}

function scrollSmoothToBottom (id) {
    var div = document.getElementById(id);
    console.log(div.scrollHeight)
    $('#terminal').animate({
        scrollTop: $('#terminal').get(0).scrollHeight}, 2000);
 }

document.onkeydown = function(evt) {
    evt = evt || window.event;
    // console.log(evt)
    let key = evt.key
    console.log(terminal.lastElementChild)
    if(key.length == 1){
        if(evt.code == 'Space')
            terminal.lastElementChild.textContent += '\xa0'
        else
            terminal.lastElementChild.textContent += evt.key
    }
    else if(key == 'Enter'){
        createNewLine()
    }
    else if(evt.code == 'Backspace' && terminal.lastElementChild.innerText.length != 2){
        terminal.lastElementChild.innerText = terminal.lastElementChild.innerText.slice(0, -1)
    }
};

function showHelp(){

    terminal.lastElementChild.innerText += 'help over here\n'
    commands.forEach(cmdName => {
        terminal.lastElementChild.innerText += `${cmdName}\n`
    })
    createNewLine()
}


