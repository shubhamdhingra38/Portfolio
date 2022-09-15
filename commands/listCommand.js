// class ListCommand extends Command {
//   resetLastElementID() {
//     if (this.terminal.lastElementChild) {
//       this.terminal.lastElementChild.id = "";
//     }
//   }

//   renderLinkElement(ele) {
//     let a = document.createElement("a");
//     a.style = "cursor: pointer;  font-weight: bold;";
//     a.className = "fancy";

//     var link = document.createTextNode(ele.name + "\t");
//     a.appendChild(link);
//     a.title = ele.name;
//     a.href = "#";

//     let span = document.createElement("span");
//     span.appendChild(a);
//     span.className = "ls-result";

//     a.onclick = ele.handleClick;
//     this.terminal.addDiv(span);
//   }

//   renderNormalElement(ele) {
//     this.terminal.addDiv(
//       `<span class='ls-result' style='color: rgba(200, 200, 200, 1) !important;'>${ele.name}\t</span>`
//     );
//   }

//   execute() {
//     this.resetLastElementID();

//     this.terminal.directoryContents.forEach((ele) => {
//       if (ele.isLink) {
//         this.renderLinkElement(ele);
//       } else {
//         this.renderNormalElement(ele);
//       }
//     });
    
//     this.terminal.addLine("\n");
//   }
// }
