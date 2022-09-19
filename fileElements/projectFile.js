class ProjectFile extends SimpleFile {
  constructor(fileName, contents, projectTitle, projectTags, projectYoutubeLink, projectGithubLink) {
    super(fileName, contents);
    this.title = projectTitle;
    this.tags = projectTags;
    this.youtubeLink = projectYoutubeLink;
    this.githubLink = projectGithubLink;
  }

  renderTags() {
    const tags = this.tags.map((tag) => {
      return `<p class="tag">${tag}</p>`;
    });
    const tagsElement = tags.join("\n");
    return tagsElement;
  }

  static alreadyExists(id) {
    return document.getElementById(id) !== null;
  }

  

  handleClick() {
    const id = `showcase-${this.getFileNameWithoutExtension()}`
    if(ProjectFile.alreadyExists(id)) {
      return;
    }

    $("#terminal-text-active").val(`.${this.getFullPathFromRoot()}`);
    terminal.createNextLine();

    terminal.addDiv(
      `<div class="project-container">
        <div class="project" id=${id}>
            <div class="project-header">
              <p class="project-title">${this.title}</p>
              <div class="menu-btns" >
                <span class="min-btn">-</span>
                <span class="max-btn">□</span>
                <span class="close-btn" id="${id}-close-btn">X</span>
              </div>
            </div>
            <p class="project-desc">${this.contents}</p>
            <iframe width="100%" height="315"
                src="${this.youtubeLink}">
            </iframe>
            <p>Tech stack:</p>
            <div class="tags">
              ${this.renderTags()}
            </div>
            <p>Check it out on <span><a class="github-link" target='_blank'href="${this.githubLink}">GitHub</a></span></p>
        </div>
      </div>`
    );


    $(function () {
      $(`#${id}`).draggable();
      $(`#${id}-close-btn`).click(function() {
        console.log("Destroying...");
        $(`#${id}`).remove();
      });
    });
  }

  render() {
    let span = document.createElement("span");
    span.innerText = this.name;
    span.className = "ls-result interactable-file";
    span.style = `cursor: pointer`;

    span.onclick = () => {
      this.handleClick();
    };
    return span;
  }

  static destroy(e) {
    let id = e.target.id;
    id = id.split("-").splice(-1);
    let element = document.getElementById(`showcase-${id}`);
    element.parentNode.removeChild(element);
  }
}
