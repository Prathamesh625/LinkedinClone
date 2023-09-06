class ErrorHandler extends Error {
  constructor(message, name, statusCode) {
    super();
    this.message = message;
    this.name = name;
    this.statusCode = statusCode;
  }
}
export default ErrorHandler;
