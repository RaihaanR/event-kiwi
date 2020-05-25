export default class Sequences {
  static add(x: number, y: number): number {
    return x + y;
  }

  static factorial(x: number): number {
    if (x === 0) {
      return 1;
    } else {
      return x * Sequences.factorial(x - 1);
    }
  }

  static fibonacci(x: number): number {
    if (x === 0) {
      return 0;
    } else if (x === 1) {
      return 1;
    } else {
      return Sequences.fibonacci(x - 1) + Sequences.fibonacci(x - 2);
    }
  }
}

