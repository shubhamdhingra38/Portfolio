let terminalText = document.getElementById('terminal-text')



//parsing some data
//------------------------------------------------

let skills = ''
info.skills.forEach(skill => {
    skills += '• ' + skill + '\n'
})

let pythonInfo = `
>>> print(shubham)
${info.firstName} ${info.lastName}
>>> shubham.getContactDetails()
Feel free to reach me out at +91-${info.contact}
>>> shubham.getLocationDetails()
I current reside in ${info.location}, India
>>> shubham.getSkills()
Following are my skills
${skills}
`
//------------------------------------------------



class Terminal {

    constructor(commands) {
        this.terminal = $("#terminal")
        this.terminalTexts = document.getElementsByClassName('command-text')
        this.commands = commands
        this.pythonActive = false
        this.currentDirectory = '~'
        this.directoryContents = mainDirectory
    }

    createNextLine() {
        //TODO when command is executed, create a new line for input
        console.log('Creating a new line')
        let ele = $('#terminal-text-active')
        let textEntered = ele.val()
        console.log('Entered text is:', textEntered)
        ele.remove()

        //create new node and append as child
        console.log(this.terminalTexts)
        this.terminalTexts[this.terminalTexts.length - 1].innerText += `${textEntered}`


        if (this.commands[textEntered]) {
            this.commands[textEntered].call(this)
        }
        else if(textEntered.startsWith('cd ')){
            let dir = textEntered.split(' ')[1]
            this.commands['cd'].call(terminal, dir)
        }
        else if(textEntered.trim(' ')==''){
            //allow empty line
        }
        else{
            this.showInvalid(textEntered)
        }



        this.terminal.append(`
        <div class="terminal-line">
            <p class="command-text">>&nbsp;</p>
            <input autocomplete="off" type="text" value="" style="width: 100%;" id="terminal-text-active" class="terminal-text">
        </div>`)


        document.getElementById('terminal-text-active').addEventListener('keyup', inputKeyUp)

        this.terminalTexts = document.getElementsByClassName('command-text')
        document.getElementById('terminal-text-active').focus()
    }

    showInvalid(name) {
        this.terminal.append(`<p>\n${name}: Command not found</p>`)
    }

    addLine(lineText) {
        this.terminal.append(`<p>${lineText}</p>`)
    }

    addDiv(divText){
        this.terminal.append(divText)
    }


    reset(){
        console.log("Clearing terminal...")
        this.terminal.empty()
    }

    changeDirectory(directoryName, directoryContents){
        this.currentDirectory = directoryName
        this.directoryContents = directoryContents
    }

}


class Command {
    constructor(desc, func) {
        this.desc = desc
        this.func = func
    }

    call(...args) {
        this.func(...args)
    }
}


// function removeAllChildNodes(parent) {
// }



//---------------------------COMMANDS----------------------------
let clear = new Command("Clear the screen", function (terminal) {
    terminal.reset()
})


let help = new Command("Get a list of available commands", (terminal) => {
    terminal.addLine('\nHere is a list of available commands:\n')
    Object.entries(commands).forEach(cmd => {
        terminal.addLine(`\xa0\xa0${cmd[0]}\n`)
    })
}
)

let ls = new Command("Get a list of available directories", function (terminal) {
    if (terminal.lastElementChild)
        terminal.lastElementChild.id = ''
    terminal.directoryContents.forEach(ele => {
        let val = ele.name
        if (ele.isLink) {
            terminal.addDiv(`
            <a href="${ele.link}" target="_blank" style='cursor: pointer;  font-weight: bold; margin-left: 10px; margin-right: 10px' class='fancy'>
            ${val}\t</a>`)
        }
        else {
            terminal.addDiv(`<span style='color: rgba(200, 200, 200, 1) !important; margin-left: 10px; margin-right: 10px'>${val}\t</span>`)
        }
    })
    terminal.addLine('\n')
})

let cat = new Command("List file contents", function (fName) {
    if (!fName || fName.length == 0) {
        console.log('bad')
    }
    else {
        let directoryList = []
        directory.forEach(ele => directoryList.push(ele.name))
        let name = fName.trimRight()
        if (directoryList.includes(name)) { //file in CURRENT directory
            if (name == 'about.txt') {
                terminal.lastElementChild.innerText += '\n' + aboutText
            }
            else if (name == 'script.py') {
                terminal.lastElementChild.innerText += '\n' + scriptText
            }
        }
    }
})

let python = new Command("Python shell", function () {
    i = 0
    terminal.lastElementChild.innerText += '\nPython 3.8.6\n'
    terminal.lastElementChild.innerText += 'Type "help" for more information or "exit" to quit the Python shell.\n'
    terminal.lastElementChild.innerText += pythonClassBody
    // typeWriter(terminal.lastElementChild, pythonClassObject, 50)
    typeWriter(terminal.lastElementChild, pythonInfo, 15)
    pythonActive = true
})

let cd = new Command("Change Directory", function (terminal, dirName) {
    console.log('Changed directory to:', dirName)
    if (dirName == 'projects' || dirName == 'projects/') {
        terminal.changeDirectory('projects', projectsDirectory)
    }
    else if (dirName == 'contact' || dirName == 'contact/'){
        terminal.changeDirectory('contact', contactDirectory)
    }
    else if (dirName == '' || dirName == '/' || dirName == '~' || dirName == '..') {
        terminal.changeDirectory('~', mainDirectory)
    }
    else{
        //invalid dir
        terminal.addLine(`cd: no such file or directory: ${dirName}`)
    }
})




//----------------------------------------------------------------




//helper functions
function typeWriter(element, txt, speed) {
    console.log(txt)
    if (i < txt.length) {
        element.innerText += txt.charAt(i);
        i++;
        setTimeout(function () {
            typeWriter(element, txt, speed)
        }, speed);
    }
    $(document).scrollTop($(document).height());
}


let commands = {
    'ls': ls, 'help': help, 'clear': clear, 'cd': cd
}


const terminal = new Terminal(
    commands
)

function inputKeyUp(e) {
    if (e.keyCode == 13) {
        console.log('Enter')
        terminal.createNextLine()
    }
}


//jquery stuff
$(document).ready(() => {
    document.getElementById('terminal-text-active').addEventListener('keyup', inputKeyUp)
    document.getElementById('terminal-text-active').focus()
})

