let info = {
  firstName: "Shubham",
  lastName: "Dhingra",
  contact: "dhingra.shubham38@gmail.com",
  location: "Delhi",
  skills: [
    "Python",
    "JavaScript",
    "Java",
    "Django",
    "ReactJS",
    "Web Scraping",
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Full Stack Web Development",
    "Data Structures And Algorithms",
  ],
};

let resumeLink =
  "https://drive.google.com/file/d/1qLlfsaOC6vwpM5ZjZi67grcQ_oEbFBZJ/view";
let githubLink = "https://github.com/shubhamdhingra38";

let mainDirectory = [
  {
    name: "about.txt",
    isLink: false,
  },
  {
    name: "script.py",
    isLink: false,
  },
  {
    name: "projects/",
    isLink: true,
  },
  {
    name: "contact/",
    isLink: true,
  },
  {
    name: "resume.pdf",
    isLink: true,
    link: resumeLink,
  },
  {
    name: "github",
    isLink: true,
    link: githubLink,
  },
  {
    name: "shubham.pkl",
    isLink: false,
    accessDenied: true, //read permission
  },
];

let projectsDirectory = [
  {
    name: "QuickGrader",
    desc:
      "Uses NLP for making the process of grading short answer quizzes in a largely automated fashion. Also includes plagiarism detection.",
    isLink: true,
    link: "https://github.com/shubhamdhingra38/Quick-Grader",
    images: ['./static/quickgrader0.png', './static/quickgrader1.png', './static/quickgrader2.png', './static/quickgrader3.png',],
    tags: [
        'ReactJS', 'Django', 'Django Rest Framework', 'MaterialUI', 'Machine Learning', 'NLP'
    ],
    video: 'https://www.youtube.com/embed/PfjNndQzO3c'
  },
  {
    name: "Collaborative_Code_Editing",
    desc:
      "A web application which uses sockets to enable real-time code sharing, chatting and canvas sketching all at once.",
    isLink: true,
    link: "https://github.com/shubhamdhingra38/Live-Collaborative-Code-Editing",
    images: ['./static/collab.png'],
    tags: [
        'Django', 'Django Channels', 'Django Rest Framework', 'HTML/CSS', 'Boostrap'
    ],

    video: "https://www.youtube.com/embed/Tez2jAOlcM8"
  },
  {
    name: "QFiction",
    isLink: true,
    desc:
      "Used a pre-trained BERT model on SQuAD and performed fine-tuning on several fiction novels corpus. It allows searching for an answer to a given question in the reference text.",
    link: "https://github.com/shubhamdhingra38/QFiction",
    images: ['./static/qfiction0.png', './static/qfiction1.png', './static/qfiction2.png', './static/qfiction3.png', './static/qfiction4.png'],
    tags: [
        'HTML/CSS', 'Bootstrap', 'Python', 'Flask', 'NLP'
    ],
    video: 'https://www.youtube.com/embed/N6OQ2bsTO2c'
  },

  {
    name: "Visual_Algorithms",
    desc:
      "This project provides an intuitive view of how algorithms works, which is by visualizing them and looking at what operations are performed at every step.",
    techStack: ["JavaScript", "p5.js", "Bootstrap"],
    isLink: true,
    link: "https://github.com/shubhamdhingra38/Visual-Algorithms",
    images: ['./static/dijkstra_ssp.png', './static/graph_traversal.png'],
    tags: [
        'HTML/CSS', 'JavaScript', 'p5.js', 'Bootstrap'
    ],
    video: 'https://www.youtube.com/embed/6L2p9XwU7K0'
  },
];

let contactDirectory = [
  {
    name: "LinkedIn",
    isLink: true,
    link: "https://www.linkedin.com/in/shubham-dhingra-33372819b/",
  },
  {
    name: "email_me.sh",
    isLink: false,
    accessDenied: true, //read permission
    isExecutable: true,
  },
];

let aboutText = `
Name: ${info.firstName} ${info.lastName}
Contact: ${info.contact}
Location: ${info.location}
`;

let scriptText = `
#How to make people mad at you

import numpy as pd
import pandas as np
def foo():
    print("bar")
`;

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


`;

let skills = "";
info.skills.forEach((skill) => {
  skills += "• " + skill + "\n";
});

let pythonInfo = `
>>> print(shubham)
${info.firstName} ${info.lastName}

>>> shubham.getContactDetails()
Feel free to reach me out at ${info.contact}

>>> shubham.getLocationDetails()
I current reside in ${info.location}, India

>>> shubham.getSkills()
Following are my skills
${skills}
`;

let mailInputInfo = [
  "Hello world! What is your name?",
  "Enter the subject of the email:",
  "Enter the body of the email",
];

let mailInputFields = ["senderName", "subject", "body"];
