let INFO = {
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
    "Full Stack Web Development",
    "AWS",
    "Web Scraping",
    "Data Structures And Algorithms",
  ],
};

let RESUME_LINK =
  "https://drive.google.com/file/d/1qLlfsaOC6vwpM5ZjZi67grcQ_oEbFBZJ/view";
let GITHUB_LINK = "https://github.com/shubhamdhingra38";

let MAIN_DIRECTORY = [
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
    handleClick() {
      $("#terminal-text-active").val('cd projects/');
      terminal.createNextLine();
      $("#terminal-text-active").val('ls');
      terminal.createNextLine();
    },
    isLink: true,
  },
  {
    name: "contact/",
    handleClick() {
      $("#terminal-text-active").val('cd contact/');
      terminal.createNextLine();
    },
    isLink: true,
  },
  {
    name: "resume.pdf",
    isLink: true,
    link: RESUME_LINK,
    handleClick() {
      window.open(RESUME_LINK);
    },
  },
  {
    name: "github",
    isLink: true,
    link: GITHUB_LINK,
    handleClick() {
      window.open(GITHUB_LINK);
    },
  },
  {
    name: `${INFO.firstName.toLowerCase()}_info.pkl`,
    isLink: false,
    accessDenied: true, //read permission
  },
];


let PROJECTS_DIRECTORY = [
  {
    name: "QuickGrader",
    desc: "Uses NLP for making the process of grading short answer quizzes in a largely automated fashion. Also includes plagiarism detection.",
    isLink: true,
    link: "https://github.com/shubhamdhingra38/Quick-Grader",
    images: [
      "./static/grade_manual.png",
      "./static/home.png",
      "./static/account.png",
      "./static/register0.png",
      "./static/create_test1.png",
      "./static/create_test2.png",
      "./static/plagiarism1.png",
      "./static/plagiarism2.png",
    ],
    tags: [
      "ReactJS",
      "Django",
      "Django Rest Framework",
      "MaterialUI",
      "Machine Learning",
      "NLP",
    ],
    video: "https://www.youtube.com/embed/PfjNndQzO3c",
    handleClick: function() {
      projectHandleClick("QuickGrader")
    }
  },
  {
    name: "Collaborative_Code_Editing",
    desc: "A web application which uses sockets to enable real-time code sharing, chatting and canvas sketching all at once.",
    isLink: true,
    link: "https://github.com/shubhamdhingra38/Live-Collaborative-Code-Editing",
    images: ["./static/collab.png"],
    tags: [
      "Django",
      "Django Channels",
      "Django Rest Framework",
      "HTML/CSS",
      "Boostrap",
    ],
    video: "https://www.youtube.com/embed/Tez2jAOlcM8",
    handleClick: function() {
      projectHandleClick("Collaborative_Code_Editing")
    }
  },
  {
    name: "QFiction",
    isLink: true,
    desc: "Used a pre-trained BERT model on SQuAD and performed fine-tuning on several fiction novels corpus. It allows searching for an answer to a given question in the reference text.",
    link: "https://github.com/shubhamdhingra38/QFiction",
    images: [
      "./static/qfiction0.png",
      "./static/qfiction1.png",
      "./static/qfiction2.png",
      "./static/qfiction3.png",
      "./static/qfiction4.png",
    ],
    tags: ["HTML/CSS", "Bootstrap", "Python", "Flask", "NLP"],
    video: "https://www.youtube.com/embed/N6OQ2bsTO2c",
    handleClick: function() {
      projectHandleClick("QFiction")
    }
  },

  {
    name: "Visual_Algorithms",
    desc: "This project provides an intuitive view of how algorithms works, which is by visualizing them and looking at what operations are performed at every step.",
    techStack: ["JavaScript", "p5.js", "Bootstrap"],
    isLink: true,
    link: "https://github.com/shubhamdhingra38/Visual-Algorithms",
    images: [
      "./static/TSP.png",
      "./static/dijkstra_ssp.png",
      "./static/graph_traversal.png",
      "./static/Genetic.png",
    ],
    tags: ["HTML/CSS", "JavaScript", "p5.js", "Bootstrap"],
    video: "https://www.youtube.com/embed/6L2p9XwU7K0",
    handleClick: function() {
      projectHandleClick("Visual_Algorithms")
    }
  },
];

let CONTACT_DIRECTORY = [
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

let ABOUT_TEXT = `
Name: ${INFO.firstName} ${INFO.lastName}
Contact: ${INFO.contact}
Location: ${INFO.location}
`;

let SCRIPT_TEXT = `
#How to make people mad at you

import numpy as pd
import pandas as np
def foo():
    print("bar")
`;

let PYTHON_CLASS_BODY = `
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



let PYTHON_INFO = `
>>> print(shubham)
${INFO.firstName} ${INFO.lastName}

>>> shubham.getContactDetails()
Feel free to reach me out at ${INFO.contact}

>>> shubham.getLocationDetails()
I current reside in ${INFO.location}, India

>>> shubham.getSkills()
Following are my skills
${generateBulletPoints(INFO.skills)}
`;

let MAIL_INPUT_INFO = [
  "Hello world! What is your name?",
  "Enter the subject of the email:",
  "Enter the body of the email",
];

let MAIL_INPUT_FIELDS = ["senderName", "subject", "body"];
