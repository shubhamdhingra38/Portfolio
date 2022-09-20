function inputKeyUp(event) {
  if (event.keyCode == ENTER_KEY_VALUE) {
    console.log("Enter");
    terminal.createNextLine();
  }
}
