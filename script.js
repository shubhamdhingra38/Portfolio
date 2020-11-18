let terminalText = document.getElementById('terminal-text')
let terminal = document.getElementById('terminal')
let pythonActive = false

class Command{
    constructor(desc, func){
        this.desc = desc
        this.func = func
    }

    call(){
        this.func()
        createNewLine()
    }
}

let help = new Command("Get a list of available commands", showHelp)
// help.call()
let ls = new Command("Get a list of available directories", function() {
    terminal.lastElementChild.innerText += '\nls command'
})
let python = new Command("Python shell", function() {
    terminal.lastElementChild.innerText += '\nPython 3.8.6\n'
    terminal.lastElementChild.innerText += 'Type "help" for more information or "exit" to quit the Python shell.\n'
    pythonActive = true
})
// python.call()

let commands = ['help', 'ls', 'tree', 'pip list', 'python']

function createNewLine(){
    terminal.lastElementChild.id = ''
    var para = document.createElement("p")
    para.classList = ['terminal-text']
    para.id = 'terminal-text-active'
    if(pythonActive)
        para.innerText += ">>>\xa0"
    else
        para.innerText += ">\xa0"
    terminal.appendChild(para)
    $(document).scrollTop($(document).height()); 

}


document.onkeydown = function(evt) {
    evt = evt || window.event
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
        let validCommand = false
        if(pythonActive){
            let enteredText = terminal.lastElementChild.textContent.slice(4)
            if(enteredText == "exit"){
                pythonActive = false
                // validCommand = true
            }
            // alert(enteredText)
        }
        else{
            let enteredText = terminal.lastElementChild.textContent.slice(2)
            if(enteredText == "python" || enteredText == "python3"){
                python.call()
                validCommand = true
            }
            else if(enteredText == "ls" || enteredText == "dir"){
                ls.call()
                validCommand = true
            }
            else if(enteredText == "help"){
                help.call()
                validCommand = true
            }
        }
        if(!validCommand)
            createNewLine()
    }
    else if(evt.code == 'Backspace' && terminal.lastElementChild.innerText.length != 2){
        terminal.lastElementChild.textContent = terminal.lastElementChild.innerText.slice(0, -1)
    }

}

function showHelp(){
    terminal.lastElementChild.innerText += '\nhelp over here\n'
    commands.forEach(cmdName => {
        terminal.lastElementChild.innerText += `${cmdName}\n`
    })
}


