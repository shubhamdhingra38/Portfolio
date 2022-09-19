class InvalidArgsException extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidArgsException";
  }
}
