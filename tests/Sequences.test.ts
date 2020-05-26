import { expect } from 'chai';
import Sequences from '../src/Sequences';

describe('fibonacci', () => {
  it('fib(0) should be 0', () => {
    let result = Sequences.fibonacci(0);
    expect(result).equal(0);
  });

  it('fib(3) should be 2', () => {
    let result = Sequences.fibonacci(3);
    expect(result).equal(2);
  });
});

describe('factorial', () => {
  it('0! should be 1', () => {
    let result = Sequences.factorial(0);
    expect(result).equal(1);
  });

  it('4! should be 24', () => {
    let result = Sequences.factorial(4);
    expect(result).equal(24);
  });
});

