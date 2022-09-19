/**
 * Personal information, customize as per need
 */
const INFO = {
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
  resumeLink:
    "https://drive.google.com/file/d/1qLlfsaOC6vwpM5ZjZi67grcQ_oEbFBZJ/view",
  githubLink: "https://github.com/shubhamdhingra38",
  linkedinLink: "https://www.linkedin.com/in/shubham-dhingra-33372819b/",
  employeeAt: "Amazon",
  designation: "SDE1",
  yoe: "1.5",
  age: "23",
};

/**
 * Directory structure, customize as per need
 */

/**
 * Personal projects
 */
const quickGraderProject = new Directory("QuickGrader/");
quickGraderProject.addElement(new SimpleFile("info.txt", `Info about project`));
quickGraderProject.addElement(
  new ProjectFile(
    "quickGrader.bin",
    (contents =
      "Uses NLP for making the process of grading short answer quizzes in a largely automated fashion. Also includes plagiarism detection."),
    (projectTitle = "Quick Grader"),
    (projectTags = [
      "Django",
      "Django Rest Framework",
      "ReactJS",
      "MaterialUI",
      "Natural Language Processing",
    ]),
    (projectYoutubeLink = "https://www.youtube.com/embed/PfjNndQzO3c"),
    (projectGithubLink = "https://github.com/shubhamdhingra38/Quick-Grader")
  )
);

const visualAlgorithmsProject = new Directory("VisualAlgorithms/");
visualAlgorithmsProject.addElement(
  new SimpleFile("info.txt", `Info about project`)
);
visualAlgorithmsProject.addElement(
  new ProjectFile(
    "visualAlgorithms.bin",
    (contents =
      "This project provides an intuitive view of how algorithms works, which is by visualizing them and looking at what operations are performed at every step."),
    (projectTitle = "Visual Algorithms"),
    (projectTags = ["HTML/CSS", "JavaScript", "p5.js", "Bootstrap"]),
    (projectYoutubeLink = "https://www.youtube.com/embed/6L2p9XwU7K0"),
    (projectGithubLink =
      "https://github.com/shubhamdhingra38/Visual-Algorithms")
  )
);

const collaborativeCodeEditingProject = new Directory(
  "Collaborative_Code_Editing/"
);
collaborativeCodeEditingProject.addElement(
  new SimpleFile("info.txt", `Info about project`)
);
collaborativeCodeEditingProject.addElement(
  new ProjectFile(
    "collabCodeEditing.bin",
    (contents =
      "A web application which uses sockets to enable real-time code sharing, chatting and canvas sketching all at once."),
    (projectTitle = "Collaborative Code Editing"),
    (projectTags = [
      "Django",
      "Django Channels",
      "Django Rest Framework",
      "HTML/CSS",
      "Boostrap",
    ]),
    (projectYoutubeLink = "https://www.youtube.com/embed/Tez2jAOlcM8"),
    (projectGithubLink =
      "https://github.com/shubhamdhingra38/Live-Collaborative-Code-Editing")
  )
);

const qFictionProject = new Directory("QFiction");
qFictionProject.addElement(new SimpleFile("info.txt", `Info about project`));
qFictionProject.addElement(
  new ProjectFile(
    "qFiction.bin",
    (contents =
      "Used a pre-trained BERT model on SQuAD and performed fine-tuning on several fiction novels corpus. It allows searching for an answer to a given question in the reference text."),
    (projectTitle = "QFiction"),
    (projectTags = ["HTML/CSS", "Bootstrap", "Python", "Flask", "NLP"]),
    (projectYoutubeLink = "https://www.youtube.com/embed/N6OQ2bsTO2c"),
    (projectGithubLink = "https://github.com/shubhamdhingra38/QFiction")
  )
);

const projectsDirectory = new Directory("projects/");
projectsDirectory.addElement(quickGraderProject);
projectsDirectory.addElement(visualAlgorithmsProject);
projectsDirectory.addElement(collaborativeCodeEditingProject);
projectsDirectory.addElement(qFictionProject);
projectsDirectory.addElement(
  new SimpleFile("about.txt", `These are some of the projects I worked on while in the past, you're welcome to take a look.
I have included the showcase video 📹 and links to GitHub ⭐.
To view, click on the project name and execute that binary file!`)
);

/**
 * Contacts: LinkedIn, email, etc.
 */
const contactDirectory = new Directory("contact/");
contactDirectory.addElement(
  new LinkFile(
    "linkedin.txt",
    `You can reach out to me on LinkedIn, feel free to send a connection request and join my 🕸️ network.
My LinkedIn is: ${INFO.linkedinLink}. Don't worry, opened this for you in a new tab 🙌!`,
    INFO.linkedinLink
  )
);
contactDirectory.addElement(
  new SimpleFile(
    "email.txt",
    'Email me at: `dhingra.shubham38@gmail.com`'
  )
)


/**
 * Root directory as home, because home directory is difficult to code :(
 */
const mainDirectory = new Directory("/");
mainDirectory.addElement(
  new SimpleFile(
    "about.txt",
    `
          Name: ${INFO.firstName} ${INFO.lastName}
          Contact: ${INFO.contact}
          Location: ${INFO.location}
          `
  )
);
mainDirectory.addElement(
  new SimpleFile(
    "script.py",
    `
#!/usr/bin/env python3
 
#How to make people mad at you

import numpy as pd
import pandas as np
def foo():
    print("bar")
`
  )
);
mainDirectory.addElement(projectsDirectory);
mainDirectory.addElement(contactDirectory);
