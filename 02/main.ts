import { fetchAndReturnInput } from '../inputs/fetcher.ts'


class Game {
  public id: number;
  public largestBlue = 0;
  public largestGreen = 0;
  public largestRed = 0;
  public power = 0;
  public possibleForPart1 = false;
  constructor(id: number) {
    this.id = id;
  }
  updateMembers(blue: number, green: number, red: number) {
    this.largestBlue = blue > this.largestBlue ? blue : this.largestBlue;
    this.largestGreen = green > this.largestGreen ? green : this.largestGreen;
    this.largestRed = red > this.largestRed ? red : this.largestRed;
    this.updatePossibility();
  }
  updatePossibility() {
    this.possibleForPart1 = this.largestBlue <= 14 && this.largestGreen <= 13 && this.largestRed <= 12;
  }
  calculatePower() {
    this.power = this.largestBlue * this.largestGreen * this.largestRed;
  }
}


const extractGame = (game: string): Game => {
  const _game = game.split(':');
  const id = parseInt(_game[0].match(/\d+/)![0]);
  const _rounds = _game[1].split(';');
  const parsedGame = new Game(id);
  _rounds.forEach((round) => {
    const _round = round.split(',');
    _round.forEach((cube) => {
      const _cube = cube.trim().split(' ');
      const number = parseInt(_cube[0]);
      const color = _cube[1];
      switch (color) {
        case 'blue':
          parsedGame.updateMembers(number, 0, 0);
          break;
        case 'green':
          parsedGame.updateMembers(0, number, 0);
          break;
        case 'red':
          parsedGame.updateMembers(0, 0, number);
          break;
      }
    })
  })
  return parsedGame;
}

export function SolvePart1(input: string): number {
  const parsedTxtInput = input.split('\n');
  const games = parsedTxtInput.map((game) => extractGame(game));
  const filteredGames = games.filter((game) => game.possibleForPart1);
  const combinedIds = filteredGames.reduce((acc: number, curr: Game) => {
    acc += curr.id;
    return acc;
  } , 0);
  return combinedIds;
}

export function SolvePart2(input: string): number {
  const parsedTxtInput = input.split('\n');
  const games = parsedTxtInput.map((game) => extractGame(game));
  games.forEach((game) => game.calculatePower());
  const combinedPower = games.reduce((acc: number, curr: Game) => {
    acc += curr.power;
    return acc;
  } , 0);
  return combinedPower;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = await fetchAndReturnInput();
  console.log(SolvePart1(input!));
  console.log(SolvePart2(input!));
}
