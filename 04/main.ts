import { fetchAndReturnInput } from '../inputs/fetcher.ts';

class Card {
  name: string;
  id;
  actualNumbers: number[] = [];
  winningNumbers: number[] = [];
  actualWinningNumbers: number[] = [];
  cardsToCopy: number[] = [];
  copies = 1;
  constructor(name: string) {
    this.name = name;
    this.id = parseInt(name.split(' ').filter((e) => !isNaN(parseInt(e)))[0]);

  }
  setWinningNumbers(numbers: number[]) {
    this.winningNumbers = numbers.filter((e) => !isNaN(e));
  }
  setActualNumbers(numbers: number[]) {
    this.actualNumbers = numbers.filter((e) => !isNaN(e));
  }

  addActualWinningNumber(number: number) {
    this.actualWinningNumbers.push(number);
  }
  addCardsToCopy(cards: number[]) {
    this.cardsToCopy = this.cardsToCopy.concat(cards);
  }
  getCardsToCopy(): number[] {
    const cardsToCopy = this.actualWinningNumbers.map((_e, i) => this.id + i + 1)
    this.addCardsToCopy(cardsToCopy)
    return cardsToCopy;
  }
  getScore(): number {
    let score = 0;
    this.winningNumbers.forEach((winningNumber) => {
      if (this.actualNumbers.includes(winningNumber)) {
        if (score === 0) {
          score = 1;
        }
        else {
          score = score * 2;
        }
        this.addActualWinningNumber(winningNumber);
      }
    });

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
  }, 0);

  return score;
}
export const solvePart2 = (input: string): number => {
  const cards = parseIntoCards(input);

  cards.forEach((card) => {
    card.getScore();
  });

  cards.forEach((card) => {
    const _cardsToCopy = card.getCardsToCopy();
    _cardsToCopy.forEach((cardId) => {
      const cardToCopy = cards.find(card => card.id === cardId)
      if (cardToCopy) {
        cardToCopy.copies = cardToCopy.copies + card.copies;
      }}
    )});
    console.log(cards)
  const sumOfCopies = cards.reduce((total, card) => total + card.copies, 0)
  return sumOfCopies;
};

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = await fetchAndReturnInput();
  console.log(solvePart1(input!));
  console.log(solvePart2(input!));
}


