export class UserNotFoundException extends Error {
  constructor() {
    super('User not found');
    this.name = 'UserNotFoundException';
  }
}

export class PasswordIncorrectException extends Error {
  constructor() {
    super('Password incorrect');
    this.name = 'PasswordIncorrectException';
  }
}

export class UserAlreadyExistsException extends Error {
  constructor() {
    super('User already exists');
    this.name = 'UserAlreadyExistsException';
  }
}

export class InvalidPasswordException extends Error {
  constructor() {
    super('Invalid password');
    this.name = 'InvalidPasswordException';
  }
}

export class BadRequestException extends Error {
  constructor() {
    super('Bad request');
    this.name = 'BadRequestException';
  }
}

export class UnauthorizedException extends Error {
  constructor() {
    super('Unauthorized');
    this.name = 'UnauthorizedException';
  }
}

export class NotFoundException extends Error {
  constructor() {
    super('Not found');
    this.name = 'NotFoundException';
  }
}

export class InternalServerErrorException extends Error {
  constructor() {
    super('Internal server error');
    this.name = 'InternalServerErrorException';
  }
}
