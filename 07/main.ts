import { fetchAndReturnInput } from '../inputs/fetcher.ts'

enum HandTypes {
  HighCard,
  OnePair,
  TwoPairs,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  fiveOfAKind
}

const CardValues = new Map<string, number>([
  ['2', 1],
  ['3', 2],
  ['4', 3],
  ['5', 4],
  ['6', 5],
  ['7', 6],
  ['8', 7],
  ['9', 8],
  ['T', 9],
  ['J', 10],
  ['Q', 11],
  ['K', 12],
  ['A', 13],
]);

const UpdatedCardValues = new Map<string, number>([
  ['J', 1],
  ['2', 2],
  ['3', 3],
  ['4', 4],
  ['5', 5],
  ['6', 6],
  ['7', 7],
  ['8', 8],
  ['9', 9],
  ['T', 10],
  ['Q', 11],
  ['K', 12],
  ['A', 13],
]);

class CardHand {
  public rank: number|undefined;
  public cards: string[] = [];
  public cardsAsNumbers:number[] = []
  public cardsAsNumbersPart2:number[] = []
  public type: HandTypes = HandTypes.HighCard;
  public typeHumanReadable: string = '';
  public bid: number;
  constructor(_cards: string[], bid: number, jokersAreWild = false) {
    this.bid = bid;
    this.cards = _cards;
    this.parseCardsAsNumbers(_cards);
    this.setType(_cards, jokersAreWild);
  }
  private setType (_cards: string[], jokersAreWild = false) {
    const cardCount = new Map<string, number>();
    let jokers = 0;
    _cards.forEach(card => {
      if (cardCount.has(card)) {
        cardCount.set(card, cardCount.get(card)! + 1);
      } else {
        cardCount.set(card, 1);
      }
      if (card === 'J') {
        jokers++;
      }
    });
    console.log('before joker', cardCount)

    if (jokersAreWild) {
      //Replace Jokers with the most common card
      let mostCommonCard = Array.from(cardCount.entries()).sort((a, b) => b[1] - a[1])[0][0];
      const jokerCount = (mostCommonCard === 'J' && jokers === 5) ? 0 : jokers;
     
      if(mostCommonCard === 'J' && jokers !== 5) {
        mostCommonCard = Array.from(cardCount.entries()).sort((a, b) => b[1] - a[1])[1][0];
        
        console.log('mostCommonCard', mostCommonCard)
      }
      cardCount.set(mostCommonCard, cardCount.get(mostCommonCard)! + jokerCount );
      //delete jokerCount amount of jokers
      for(let i = 0; i < jokerCount; i++) {
        cardCount.delete('J');
      }
      console.log('after joker', cardCount)
    }
    
    const cardCountArray = Array.from(cardCount.values()).sort((a, b) => b - a);
    console.log('cardCountArray', cardCountArray)
    


    if (cardCountArray.filter(count => count === 2).length === 2) {
      if(this.type > HandTypes.TwoPairs) return;
      this.type = HandTypes.TwoPairs;
      this.typeHumanReadable = HandTypes[HandTypes.TwoPairs];
    }
    if (cardCountArray.filter(count => count === 2).length === 1) {
      if(this.type > HandTypes.OnePair) return;
      this.type = HandTypes.OnePair;
      this.typeHumanReadable = HandTypes[HandTypes.OnePair];
    }
    if (cardCountArray.filter(count => count === 1).length === 5) {
      this.type = HandTypes.HighCard;
      this.typeHumanReadable = HandTypes[HandTypes.HighCard];
    }
    if(cardCountArray.includes(5)) {
      this.type = HandTypes.fiveOfAKind;
      this.typeHumanReadable = HandTypes[HandTypes.fiveOfAKind];
    }
    if (cardCountArray.includes(4)) {
      if(this.type > HandTypes.FourOfAKind) return;
      this.type = HandTypes.FourOfAKind;
      this.typeHumanReadable = HandTypes[HandTypes.FourOfAKind];
    }
    if (cardCountArray.includes(3) && !cardCountArray.includes(2)) {
      if(this.type > HandTypes.ThreeOfAKind) return;
      this.type = HandTypes.ThreeOfAKind;
      this.typeHumanReadable = HandTypes[HandTypes.ThreeOfAKind];
    }
    if (cardCountArray.includes(3) && cardCountArray.includes(2)) {
      if(this.type > HandTypes.FullHouse) return;
      this.type = HandTypes.FullHouse;
      this.typeHumanReadable = HandTypes[HandTypes.FullHouse];
    }




  }
  public setRank(rank: number) {
    this.rank = rank;
  }
  private parseCardsAsNumbers(_cards: string[]) {
    _cards.forEach(card => {
      this.cardsAsNumbers.push(CardValues.get(card)!);
      this.cardsAsNumbersPart2.push(UpdatedCardValues.get(card)!);
    });
  }

}



const parseInput = (input: string, jokersAreWild:boolean):CardHand[] => {
  return input.split('\n').map(line => {
    const [cards, bid] = line.split(' ');
    return new CardHand(cards.split(''), parseInt(bid), jokersAreWild);
  });
}

export const solvePart1 = (input:string) => {
  const hands = parseInput(input, false);
  const rankedHandsByTypeAndPower = hands.sort((a, b) => {
    if (a.type < b.type) {
      return -1;
    }
    if (a.type > b.type) {
      return 1;
    }
    if (a.type === b.type) {
      for(let i = 0; i < a.cardsAsNumbers.length; i++) {
        if (a.cardsAsNumbers[i] === b.cardsAsNumbers[i]) {
          continue;
        }
        if (a.cardsAsNumbers[i] < b.cardsAsNumbers[i]) {
          return -1;
        }
        if (a.cardsAsNumbers[i] > b.cardsAsNumbers[i]) {
          return 1;
        }
      }
    }
    return 0;
  });

  
  rankedHandsByTypeAndPower.forEach((hand, index) => {
    hand.setRank(index + 1);
  });
  return rankedHandsByTypeAndPower.reduce((acc, hand) => {
      return acc += hand.bid * hand.rank! 
  } , 0);
    
}
export const solvePart2 = (input:string) => {
  const hands = parseInput(input, true);
  const rankedHandsByTypeAndPower = hands.sort((a, b) => {
    if (a.type < b.type) {
      return -1;
    }
    if (a.type > b.type) {
      return 1;
    }
    if (a.type === b.type) {
      for(let i = 0; i < a.cardsAsNumbersPart2.length; i++) {
        if (a.cardsAsNumbersPart2[i] === b.cardsAsNumbersPart2[i]) {
          continue;
        }
        if (a.cardsAsNumbersPart2[i] < b.cardsAsNumbersPart2[i]) {
          return -1;
        }
        if (a.cardsAsNumbersPart2[i] > b.cardsAsNumbersPart2[i]) {
          return 1;
        }
      }
    }
    return 0;
  });

  rankedHandsByTypeAndPower.forEach((hand, index) => {
    hand.setRank(index + 1);
  });
  console.log(rankedHandsByTypeAndPower)

  return rankedHandsByTypeAndPower.reduce((acc, hand) => {
      return acc += hand.bid * hand.rank! 
  } , 0);
    
}
// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = await fetchAndReturnInput();

  console.log('part 1: ',solvePart1(input!))
  console.log('part 2', solvePart2(input!))
}
