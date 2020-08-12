class PasswordScheme {
  constructor() {
    this.letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  generatePassword() {
    return this.gRCL() + this.gRL() + this.gRL() + this.gRL() + this.gRN() + this.gRN() + this.gRN() + this.gRN();
  }

  gRL() {
    return this.letters[Math.floor(Math.random() * this.letters.length)];
  }

  gRCL() {
    return this.gRL().toUpperCase();
  }

  gRN() {
    return this.numbers[Math.floor(Math.random() * this.numbers.length)];
  }
}

var passwordScheme = new PasswordScheme();
