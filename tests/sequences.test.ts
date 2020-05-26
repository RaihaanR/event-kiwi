import { expect } from 'chai';
import Sequences from '../src/sequences';

describe('fibonacci', function() {
  it('fib(0) should be 0', function() {
    let result = Sequences.fibonacci(0);
    expect(result).equal(0);
  });

  it('fib(3) should be 2', function() {
    let result = Sequences.fibonacci(3);
    expect(result).equal(2);
  });
});

describe('factorial', function() {
  it('0! should be 1', function() {
    let result = Sequences.factorial(0);
    expect(result).equal(1);
  });

  it('4! should be 24', function() {
    let result = Sequences.factorial(4);
    expect(result).equal(24);
  });
});

