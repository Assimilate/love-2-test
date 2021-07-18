import React from 'react';
import { idText } from 'typescript';
import { Greet, isName, isNames, isUpperCaseName, hasUpperCaseName } from './util/common';

type Name = string | null | undefined;

describe('Function Greet takes a parameter name and', () => {
  it('returns Hello, name', () => {
    const name = 'Daniel';
    const greeting: string = Greet(name);
    expect(greeting).toBe(`Hello, ${name}.`);
  })
});

describe('Function Greet takes a null or undefined parameter and', () => {
  it('should return Hello, friend when argument name is null', () => {
    const name: Name = null;
    const defaultPlaceholderName: Name = 'friend';
    const greeting: string = Greet(name);
    expect(greeting).toBe(`Hello, ${defaultPlaceholderName}.`);
  })
});

describe('Function Greet takes an uppercase name as an argument and', () => {
  it('should return an uppercase, "shouting", greeting', () => {
    const uppercaseName: Name = 'DANIEL';
    const greeting: string = Greet(uppercaseName);
    expect(greeting).toBe(`HELLO, ${uppercaseName}!`);
  })
});

describe('Function Greet takes an array of names and', () => {
  it('should be able to greet two names', () => {
    const name1: Name = 'Daniel';
    const name2: Name = 'Sandra';
    const namesToGreet = [name1, name2];
    const greeting: string = Greet(namesToGreet);
    expect(greeting).toBe(`Hello, ${name1} and ${name2}.`);
  })
  it('should be able to greet one name', () => {
    const name1: Name = 'Daniel';
    const namesToGreet = [name1];
    const greeting: string = Greet(namesToGreet);
    expect(greeting).toBe(`Hello, ${name1}.`);
  })
  it('should be able to greet two names, where one is uppercase and in which case the greeting should be uppercase, "shouted"', () => {
    const name1: Name = 'Daniel';
    const name2: Name = 'SANDRA';
    const namesToGreet = [name1, name2];
    const greeting: string = Greet(namesToGreet);
    expect(greeting).toBe(`Hello, ${name1}. AND HELLO, ${name2}!`);
  })
})

describe('Function Greet takes an argument of array with several names', () => {
  it('should separate them with commas and close with an and', () => {
    const name1: Name = 'Daniel';
    const name2: Name = 'Sandra';
    const name3: Name = 'Erika';
    const names = [name1, name2, name3];
    const greeting: string = Greet(names);
    expect(greeting).toBe('Hello, Daniel, Sandra and Erika.');
  })
})

describe('Function Greet takes an argument of array with several names where', () => {
  it('should separate the greeting into two, one for uppercase names and one for lowercase names', () => {
    const name1: Name = 'Daniel';
    const name2: Name = 'SANDRA';
    const name3: Name = 'Erika';
    const names = [name1, name2, name3];
    const greeting: string = Greet(names);
    expect(greeting).toBe(`Hello, ${name1} and ${name3}. AND HELLO, ${name2}!`);
  })
})

describe('Function Greet takes an argument of an array of strings and', () => {
  it('should be able to take a string argument that has comma separated values and greet them as individual names', () => {
    const name1: Name = 'Daniel';
    const name2: Name = 'Sandra';
    const name3: Name = 'Erika';
    const commaSeparatedNames: Name = `${name2}, ${name3}`;
    const name4: Name = 'Niklas';
    const names = [name1, commaSeparatedNames, name4];
    const greeting: string = Greet(names);
    expect(greeting).toBe(`Hello, ${name1}, ${name2}, ${name3} and ${name4}.`);
  })
  it('should be able to take a string argument that has comma separated values and greet them as individual names when some of the names are null or undefined', () => {
    const name1: Name = 'Daniel';
    const name2: Name = 'Sandra';
    const name3: Name = null;
    const commaSeparatedNames: Name = `${name2}, ${name3}`;
    const name4: Name = undefined;
    const names = [name1, commaSeparatedNames, name4];
    const greeting: string = Greet(names);
    expect(greeting).toBe(`Hello, ${name1}, ${name2}, friend and friend.`);
  })
  it('should be able to take a string argument that has comma separated values and greet them as individual names when some of the names are null, undefined or uppercase', () => {
    const name1: Name = 'Daniel';
    const name2: Name = null;
    const name3: Name = 'SANDRA';
    const commaSeparatedNames: Name = `${name2}, ${name3}`;
    const name4: Name = undefined;
    const names = [name1, commaSeparatedNames, name4];
    const greeting: string = Greet(names);
    expect(greeting).toBe(`Hello, ${name1}, friend and friend. AND HELLO, ${name3}!`);
  })
})

// Test helper functions

describe('Function isName', () => {
  it('should return true if passed in an argument of type Name', () => {
    const name: Name = 'Daniel';
    expect(isName(name)).toBe(true);
  }) 
  it('should return true if passed in an argument of type null', () => {
    const name: any = null;
    expect(isName(name)).toBe(true);
  }) 
  it('should return true if passed in an argument of type undefined', () => {
    const name: Name = undefined;
    expect(isName(name)).toBe(true);
  }) 
  it('should return false if passed in an argument of type object', () => {
    const name: any = { name: 'Daniel' };
    expect(isName(name)).toBe(false);
  }) 
  it('should return false if passed in an argument of type number', () => {
    const name: any = 100;
    expect(isName(name)).toBe(false);
  }) 
})

describe('Function isUpperCase', () => {
  it('should return false when given a value that is a string and that is not uppercase', () => {
    const name: Name = 'Daniel';
    expect(isUpperCaseName(name)).toBe(false);
  })
  it('should return true when given a value that is a string and that is uppercase', () => {
    const name: Name = 'DANIEL';
    expect(isUpperCaseName(name)).toBe(true);
  })
  it('should return false when given a value that is a string and that is only partly uppercase', () => {
    const name: Name = 'DANiel';
    expect(isUpperCaseName(name)).toBe(false);
  })
  it('should return false when given any value that is not a string', () => {
    const name: Name = undefined;
    expect(isUpperCaseName(name)).toBe(false);
    const name2: any = {};
    expect(isUpperCaseName(name2)).toBe(false);
  })
})
