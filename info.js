let info = {
    "firstName": "Shubham",
    "lastName": "Dhingra",
    "contact": "9582510066",
    "location": "Delhi",
    "skills": ["Python", "JavaScript", "Java", "Django", "ReactJS", "Web Scraping",
        "Machine Learning", "Deep Learning", "Natural Language Processing", "Full Stack Web Development", "Data Structures And Algorithms"],
}


let mainDirectory = [
    {    
        name: 'about.txt',
        isLink: false
    },
    {    
        name: 'script.py',
        isLink: false
    },
    {    
        name: 'projects/',
        isLink: true
    },
    {    
        name: 'something',
        isLink: false
    }, 
    {    
        name: 'contact/',
        isLink: true
    },
    {    
        name: 'resume.pdf',
        isLink: true,
        link: "https://drive.google.com/file/d/1qLlfsaOC6vwpM5ZjZi67grcQ_oEbFBZJ/view"
    },
    {
        name: 'github',
        isLink: true,
        link: "https://github.com/shubhamdhingra38"
    }
]
let projectsDirectory = [
    {    
        name: 'QuickGrader',
        isLink: true,
        link: "https://github.com/shubhamdhingra38/Quick-Grader"
    },
    {    
        name: 'Collaborative_Code_Editing',
        isLink: true,
        link: "https://github.com/shubhamdhingra38/Live-Collaborative-Code-Editing"
    },
    {    
        name: 'QFiction',
        isLink: true,
        link: "https://github.com/shubhamdhingra38/QFiction"
    },
    {    
        name: 'Visual_Algorithms',
        isLink: true,
        link: "https://github.com/shubhamdhingra38/Visual-Algorithms"
    },
]

let aboutText = `
Name: ${info.firstName} ${info.lastName}
Contact: ${info.contact}
Location: ${info.location}
`

let scriptText = `
def foo():
    print("bar")
`


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