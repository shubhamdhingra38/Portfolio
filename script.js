let terminalText = document.getElementById('terminal-text')
let terminal = document.getElementById('terminal')
let pythonActive = false

let directory = ['about.txt', 'script.py', 'projects/', 'something', 'contact/']
  


let pythonClassBody = `
class Person:
    def __init__(self, firstName, lastName, age, location, skills, contact):
        self.firstName = firstName
        self.lastName = lastName
        self.age = age
        self.location = location
        self.skills = skills
        self.__contact = contact
    
    def __str__(self):
        return f'{self.firstName} {self.lastName}'
    
    def getContactDetails(self):
        return f'Feel free to reach me out at +91-{self.__contact}'
    
    def getLocationDetails(self):
        return f'I current reside in {location}, India'
    
    def getSkills(self):
        print("Following are my skills")
        for skill in self.skills:
            print('•', skill)
    
`

class Command{
    constructor(desc, func){
        this.desc = desc
        this.func = func
    }

    call(args){
        this.func(args)
        createNewLine()
    }
}



let help = new Command("Get a list of available commands", showHelp)
// help.call()
let ls = new Command("Get a list of available directories", function() {
    terminal.lastElementChild.id = ''
    directory.forEach(val => {
        if(val.endsWith('/')){
            let node = document.createElement("span")
            node.style = 'cursor: pointer; font-weight: bold; color: yellow !important; margin-left: 10px; margin-right: 10px'
            node.addEventListener('click', (e) => {
                let name = val.slice(0, -1)
                eval(name).call()
            })
            terminal.appendChild(node)
            terminal.lastElementChild.innerHTML += `${val}\t`
        }
        else{
            let node = document.createElement("span")
            node.style = 'color: rgba(200, 200, 200, 1) !important; margin-left: 10px; margin-right: 10px'
            terminal.appendChild(node)
            terminal.lastElementChild.innerText += `${val}\t`
        }
    })
    terminal.lastElementChild.innerText += '\n'
})
let python = new Command("Python shell", function() {
    terminal.lastElementChild.innerText += '\nPython 3.8.6\n'
    terminal.lastElementChild.innerText += 'Type "help" for more information or "exit" to quit the Python shell.\n'
    terminal.lastElementChild.innerText += pythonClassBody
    pythonActive = true
})
let invalid = new Command("Command not found", function(name) {
    terminal.lastElementChild.innerText += `\n${name}: Command not found`
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
    // console.log(terminal.lastElementChild)
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
            else{
                invalid.call(enteredText)
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
    terminal.lastElementChild.innerText += '\nHere is a list of available commands:\n'
    commands.forEach(cmdName => {
        terminal.lastElementChild.innerText += `\xa0\xa0${cmdName}\n`
    })
}


