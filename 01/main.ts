import { fetchAndReturnInput } from '../inputs/fetcher.ts'

export function SolvePart1(input: string | string[]): number {
  const parsedTxtInput = typeof input === 'string' ? input.split('\n') : input;
  const sum = parsedTxtInput.reduce((acc:number, curr:string) => {
    if (curr === '') return acc;
    const numbers:string[] = (curr.match(/\d/g) || []);
    console.log(numbers)
    acc += parseInt(numbers[0]+numbers[numbers.length-1])
    return acc;
  }, 0);
  return sum;
}

const wordToNumber: { [key: string]: string } = {
  one: "one1one",
  two: "two2two",
  three: "three3three",
  four: "four4four",
  five: "five5five",
  six: "six6six",
  seven: "seven7seven",
  eight: "eight8eight",
  nine: "nine9nine"
}

export function SolvePart2(input: string): number {
  for (const num in wordToNumber) {
    input = input.replaceAll(num, wordToNumber[num]);
  }

  return SolvePart1(input);
}

if (import.meta.main) {
  const input = await fetchAndReturnInput();
  
  console.log(SolvePart1(input!));
  console.log(SolvePart2(input!));
}