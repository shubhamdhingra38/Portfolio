let info = {
    "firstName": "Shubham",
    "lastName": "Dhingra",
    "contact": "dhingra.shubham38@gmail.com",
    "location": "Delhi",
    "skills": ["Python", "JavaScript", "Java", "Django", "ReactJS", "Web Scraping",
        "Machine Learning", "Deep Learning", "Natural Language Processing", "Full Stack Web Development", "Data Structures And Algorithms"],
}

let resumeLink = "https://drive.google.com/file/d/1qLlfsaOC6vwpM5ZjZi67grcQ_oEbFBZJ/view"
let githubLink = "https://github.com/shubhamdhingra38"


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
        name: 'contact/',
        isLink: true
    },
    {    
        name: 'resume.pdf',
        isLink: true,
        link: resumeLink
    },
    {
        name: 'github',
        isLink: true,
        link: githubLink
    },
    {
        name: 'shubham.pkl',
        isLink: false,
        accessDenied: true
    }
]


let projectsDirectory = [
    {    
        name: 'QuickGrader',
        desc: 'Uses NLP for making the process of grading short answer quizzes in a largely automated fashion. Also includes plagiarism detection.',
        isLink: true,
        link: "https://github.com/shubhamdhingra38/Quick-Grader",
        image: "https://github.com/shubhamdhingra38/Quick-Grader/blob/master/screenshots/addques.png?raw=true"
    },
    {    
        name: 'Collaborative_Code_Editing',
        desc: 'A web application which uses sockets to enable real-time code sharing, chatting and canvas sketching all at once.',
        isLink: true,
        link: "https://github.com/shubhamdhingra38/Live-Collaborative-Code-Editing",
        image: "https://raw.githubusercontent.com/shubhamdhingra38/Live-Collaborative-Code-Editing/master/Screenshots/Screenshot.png"
    },
    {    
        name: 'QFiction',
        isLink: true,
        desc: 'Used a pre-trained BERT model on SQuAD and performed fine-tuning on several fiction novels corpus. It allows searching for an answer to a given question in the reference text.', 
        link: "https://github.com/shubhamdhingra38/QFiction",
        image: "https://raw.githubusercontent.com/shubhamdhingra38/QFiction/master/screenshots/Screenshot%202020-09-23%20at%207.07.21%20AM.png"

    },
    {    
        name: 'Visual_Algorithms',
        desc: 'This project provides an intuitive view of how algorithms works, which is by visualizing them and looking at what operations are performed at every step.',
        techStack: ['JavaScript', 'p5.js', 'Bootstrap'],
        isLink: true,
        link: "https://github.com/shubhamdhingra38/Visual-Algorithms",
        image: "https://raw.githubusercontent.com/shubhamdhingra38/Visual-Algorithms/master/main/static/main/images/TSP.png"

    },
]



let contactDirectory = [
    {
        name: 'LinkedIn',
        isLink: true,
        link: "https://www.linkedin.com/in/shubham-dhingra-33372819b/"
    },
]

let aboutText = `
Name: ${info.firstName} ${info.lastName}
Contact: ${info.contact}
Location: ${info.location}
`

let scriptText = `
#How to make people mad at you

import numpy as pd
import pandas as np
def foo():
    print("bar")
`


let pythonClassBody = `
#------------------------------------

class Person:
    def __init__(self, firstName, lastName,
            age, location, skills, contact):
        self.firstName = firstName
        self.lastName = lastName
        self.age = age
        self.location = location
        self.skills = skills
        self.__contact = contact
    
    def __str__(self):
        return f'{self.firstName} {self.lastName}'
    
    def getContactDetails(self):
        return f'Feel free to reach me out at {self.__contact}'
    
    def getLocationDetails(self):
        return f'I current reside in {location}, India'
    
    def getSkills(self):
        print("Following are my skills")
        for skill in self.skills:
            print('•', skill)

import pickle
shubham = pickle.loads('./shubham.pkl')

#------------------------------------


`

