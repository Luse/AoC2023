import { fetchAndReturnInput } from '../inputs/fetcher.ts';

class Cardstack {
  cards: Card[] = [];
  constructor() {
  }
  addCard(card: Card) {
    this.cards.push(card);
  }
}

class Card {
  name: string;
  id = 0;
  actualNumbers: number[] = [];
  winningNumbers: number[] = [];
  wins = 0;
  constructor(name: string) {
    this.name = name;
    this.id = parseInt(name.split(' ')[1]);

  }
  setWinningNumbers(numbers: number[]) {
    this.winningNumbers = numbers.filter((e) => !isNaN(e));
  }
  setActualNumbers(numbers: number[]) {
    this.actualNumbers = numbers.filter((e) => !isNaN(e));
  }
  setWins(wins: number) {
    this.wins = wins;
  }
  getScore(): number {
    // count occurences of winning numbers in actual numbers
    let occurences = 0;
    let score = 0;
    this.winningNumbers.forEach((winningNumber) => {
      if (this.actualNumbers.includes(winningNumber)) {
        if(score === 0) {
          score = 1;
        }
        else{
          score = score * 2;
        }
        occurences++;
      }
    });
    this.setWins(occurences);
    return score;
  }
}

const parseIntoCards = (input: string): Card[] => {
  const parsed = input.split('\n');
  const cards: Card[] = [];
  parsed.map((line) => line.split(' | ')).forEach((line) => {
    const cardName = line[0].split(':')[0]
    const card = new Card(cardName);

    const winningNumbers = line[0].split(':')[1].split(' ').map((e) => {
      return parseInt(e)
    }).filter((e) => !isNaN(e))
    const actualNumbers = line[1].split(' ').map((e) => parseInt(e));
    card.setWinningNumbers(winningNumbers);
    card.setActualNumbers(actualNumbers);
    cards.push(card);
  });
  return cards;
};

export function solvePart1(input: string): number {
  const cards = parseIntoCards(input);

  const score = cards.reduce((acc, card) => {
    return acc + card.getScore();
  } , 0);

  return score;
}

export function solvePart2 (input: string): number {
  const cards = parseIntoCards(input);

  const cardsStack = new Cardstack();
  cards.forEach((card) => {
    card.getScore();
    cardsStack.addCard(card);
  });
    
  return cardsStack.cards.length;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = await fetchAndReturnInput();
  console.log(solvePart1(input!));
}
