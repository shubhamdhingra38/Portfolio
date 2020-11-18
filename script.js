let terminalText = document.getElementById('terminal-text')
let terminal = document.getElementById('terminal')
let pythonActive = false
var i = 0

let directory = mainDirectory



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

#------------------------------------
import pickle
shubham = pickle.loads('./myself.pkl')


`

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
function removeAllChildNodes(parent) {
    let cnt = parent.childElementCount
    for (let i=0; i<cnt; ++i) {
        parent.removeChild(parent.lastElementChild);
    }
}

let clear = new Command("Clear the screen", function() {
    removeAllChildNodes(terminal)
})


let help = new Command("Get a list of available commands", showHelp)

let ls = new Command("Get a list of available directories", function() {
    if(terminal.lastElementChild)
        terminal.lastElementChild.id = ''
    directory.forEach(ele => {
        let val = ele.name
        if(ele.isLink){
            let node = document.createElement("span")
            node.style = 'cursor: pointer;  font-weight: bold; color: yellow !important; margin-left: 10px; margin-right: 10px'
            node.addEventListener('click', (e) => {
                    if(ele.link)
                        window.open(ele.link);
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

let cat = new Command("List file contents", function(fName) {
    if(!fName || fName.length == 0){
        console.log('bad')
    }
    else{
        let directoryList = []
        directory.forEach(ele => directoryList.push(ele.name))
        let name = fName.trimRight()
        if(directoryList.includes(name)){ //file in CURRENT directory
            if(name == 'about.txt'){
                terminal.lastElementChild.innerText += '\n' + aboutText
            }
            else if(name == 'script.py'){
                terminal.lastElementChild.innerText += '\n' + scriptText    
            }
        }
    }
})

let python = new Command("Python shell", function() {
    i = 0
    terminal.lastElementChild.innerText += '\nPython 3.8.6\n'
    terminal.lastElementChild.innerText += 'Type "help" for more information or "exit" to quit the Python shell.\n'
    terminal.lastElementChild.innerText += pythonClassBody
    // typeWriter(terminal.lastElementChild, pythonClassObject, 50)
    typeWriter(terminal.lastElementChild, pythonInfo, 15)
    pythonActive = true
})

let cd = new Command("Change Directory", function(dirName) {
    // terminal.lastElementChild.innerHTML += '\nChange directory'
    if(dirName == 'projects' || dirName == 'projects/'){
        alert('yes')
        directory = projectsDirectory
    }

})


let invalid = new Command("Command not found", function(name) {
    terminal.lastElementChild.innerText += `\n${name}: Command not found`
})


function typeWriter(element, txt, speed) {
    console.log(txt)
    if (i < txt.length) {
      element.innerText += txt.charAt(i);
      i++;
      setTimeout(function(){
          typeWriter(element, txt, speed)
      }, speed);
    }
    $(document).scrollTop($(document).height()); 
}


let commands = ['help', 'ls', 'cd', 'python', 'clear', 'cat']

function createNewLine(){
    if(terminal.lastElementChild)
        terminal.lastElementChild.id = ''
    var para = document.createElement("p")
    console.log(para)
    para.classList = ['terminal-text']
    para.id = 'terminal-text-active'
    if(pythonActive)
        para.innerText += ">>>\xa0"
    else
        para.innerText += ">\xa0"
    terminal.appendChild(para)
    $(document).scrollTop($(document).height()); 

}
$(document).ready(() => {

    $('#terminal-text-active').click(function(e){
        $(this).focus();
        alert('clicked')
    });


    document.onkeydown = function(evt) {
        evt = evt || window.event
        console.log(evt)
        let key = evt.key
        // console.log(terminal.lastElementChild)
        if(key.length == 1){
            if(evt.code == 'Space')
                terminal.lastElementChild.textContent += '\xa0'
            else
                terminal.lastElementChild.textContent += evt.key
        }
        else if(key == 'Enter'){
            let validCommand = true
            if(pythonActive){
                let enteredText = terminal.lastElementChild.textContent.slice(4)
                if(enteredText == "exit"){
                    pythonActive = false
                    // validCommand = true
                }
                validCommand = false
                // alert(enteredText)
            }
            else{
                let enteredText = terminal.lastElementChild.textContent.slice(2)
                enteredText = enteredText.trimRight()
                console.log(enteredText)
                if(enteredText == "python" || enteredText == "python3"){
                    python.call()
                }
                else if(enteredText == "ls" || enteredText == "dir"){
                    ls.call()
                }
                else if(enteredText == "help"){
                    help.call()
                }
                else if(enteredText == "clear"){
                    clear.call()
                }
                else if(enteredText.startsWith("cd")){
                    if(enteredText.split('\xa0').length == 2){
                        let dir = enteredText.split('\xa0')[1];
                        cd.call(dir)
                    }
                    else //reset to home dir
                        cd.call()
                }
                else if(enteredText.startsWith("cat")){
                    if(enteredText.split('\xa0').length == 2){
                        let fName = enteredText.split('\xa0')[1]  
                        cat.call(fName)
                    }
                    else{
                        cat.call()
                    }
                }
                else if(enteredText.length != 0){
                    invalid.call(enteredText)
                }
                else{
                    validCommand = false
                }
            }
            if(!validCommand)
                createNewLine()
        }
        else if(evt.code == 'Backspace'){
            if((!pythonActive && terminal.lastElementChild.innerText.length != 2) || (pythonActive && terminal.lastElementChild.innerText.length != 4)){
                terminal.lastElementChild.textContent = terminal.lastElementChild.innerText.slice(0, -1)
              }
        }
    }
    
})

function showHelp(){
    terminal.lastElementChild.innerText += '\nHere is a list of available commands:\n'
    commands.forEach(cmdName => {
        terminal.lastElementChild.innerText += `\xa0\xa0${cmdName}\n`
    })
}



// $(document).ready(function() {
//     $('#terminal').click(function(e){
//         $(this).focus();
//     });
//     $('#button').click(function(e) {
//         $('#field').trigger('click');
//     });
// });