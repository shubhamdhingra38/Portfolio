class InfoFetchCommand extends Command {
  constructor(terminal, command, description, expectedArgumentsCount, personalInfo) {
    super(terminal, command, description, expectedArgumentsCount);
    this.info = personalInfo;
  }

  execute() {
    const div = `
      <div class='infofetch'>
        <img class='infofetch-img' src='./images/PHOTO.jpeg'/>
        <div class='infofetch-info'>
          <p><span>Name:</span> ${this.info.firstName}</p>
          <p><span>Email:</span> ${this.info.contact}</p>
          <p><span>Age:</span> ${this.info.age}</p>
          <p><span>Location:</span> ${this.info.location}</p>
          <p><span>Professional Experience:</span> ${this.info.yoe}</p>
          <p><span>Current employed at:</span> ${this.info.employeeAt}</p>
          <p><span>Designation:</span> ${this.info.designation}</p>
          <p><span>Skills: </span>${this.info.skills.join(", ")}</p>
          <p><span>
        </div>
      </div>
    `
    this.terminal.addDiv(div);
  }
}
