import { fetchAndReturnInput } from '../inputs/fetcher.ts'

class metaNumber {
  number: string;
  positions: number[];
  constructor(number: string, position: number) {
    this.number = number;
    this.positions = [position];
  }
  addNumber(number: string) {
    this.number = this.number + number;
  }
  addPosition(position: number) {
    this.positions.push(position);
  }
}

class confimedPartNumber {
  number: number;
  partCharacter: string;
  partPosition: [number, number];
  constructor(number: number, partCharacter: string, partPosition: [number, number]) {
    this.number = number;
    this.partCharacter = partCharacter;
    this.partPosition = partPosition;
  }
}

class partSymbol {
  symbol: string;
  position: [number, number];
  isNumber = false;
  isPart = false;
  isAdjacent = false;
  adjacentCharacter: string | undefined;
  adjacentCharacterPosition: [number, number] | undefined;
  constructor(symbol: string, position: [number, number]) {
    this.symbol = symbol;
    this.position = position;
  }
  setNumber() {
    this.isNumber = true;
  }
  setPart() {
    this.isPart = true;
  }
  setAdjacent(adjacentCharacter: string, adjacentCharacterPosition: [number, number]) {
    this.isAdjacent = true;
    this.adjacentCharacter = adjacentCharacter;
    this.adjacentCharacterPosition = adjacentCharacterPosition;
  }
}

class partRow {
  index: number;
  symbols: partSymbol[];
  constructor(index: number) {
    this.index = index;
    this.symbols = [];
  }
  addSymbol(symbol: partSymbol) {
    this.symbols.push(symbol);
  }
}

const findPartNumbers = (input: string): partRow[] => {
  const parsedParts: partRow[] = [];
  const row = input
    .split('\n').map((line) => line.split(''));
  row.forEach((line, index) => {
    const _row = new partRow(index);
    line.forEach((char, position) => {
      const symbol = new partSymbol(char, [index, position]);
      _row.addSymbol(symbol);
    });
    parsedParts.push(_row);
  }
  );
  parsedParts.forEach((row) => {
    row.symbols.forEach((e) => {
      if (!isNaN(parseInt(e.symbol)) && e.symbol !== '.') {
        e.setNumber();
      }
      if (isNaN(parseInt(e.symbol)) && e.symbol !== '.') {
        e.setPart();
      }
    });
    row.symbols.forEach((e, index) => {
      if (e.isNumber) {
        if (index > 0) {
          if (row.symbols[index - 1].isPart) {
            e.setAdjacent(row.symbols[index - 1].symbol, row.symbols[index - 1].position);
          }
        }
        if (index < row.symbols.length - 1) {
          if (row.symbols[index + 1].isPart) {
            e.setAdjacent(row.symbols[index + 1].symbol, row.symbols[index + 1].position);
          }
        }
      }
    });
  }

  );
  parsedParts.forEach((row, index) => {
    row.symbols.forEach((e, position) => {
      if (e.isNumber) {
        if (index > 0) {
          if (parsedParts[index - 1].symbols[position].isPart) {
            e.setAdjacent(
              parsedParts[index - 1].symbols[position].symbol, parsedParts[index - 1].symbols[position].position
            );
          }
        }
        if (index < parsedParts.length - 1) {
          if (parsedParts[index + 1].symbols[position].isPart) {
            e.setAdjacent(
              parsedParts[index + 1].symbols[position].symbol, parsedParts[index + 1].symbols[position].position
            );
          }
        }
      }
    });
  });

  parsedParts.forEach((row, index) => {
    row.symbols.forEach((e, position) => {
      if (e.isNumber) {
        if (index > 0) {
          if (position > 0) {
            if (parsedParts[index - 1].symbols[position - 1].isPart) {
              e.setAdjacent(
                parsedParts[index - 1].symbols[position - 1].symbol,
                parsedParts[index - 1].symbols[position - 1].position
              );
            }
          }
          if (position < row.symbols.length - 1) {
            if (parsedParts[index - 1].symbols[position + 1].isPart) {
              e.setAdjacent(
                parsedParts[index - 1].symbols[position + 1].symbol,
                parsedParts[index - 1].symbols[position + 1].position
              );
            }
          }
        }
        if (index < parsedParts.length - 1) {
          if (position > 0) {
            if (parsedParts[index + 1].symbols[position - 1].isPart) {
              e.setAdjacent(
                parsedParts[index + 1].symbols[position - 1].symbol,
                parsedParts[index + 1].symbols[position - 1].position
              );
            }
          }
          if (position < row.symbols.length - 1) {
            if (parsedParts[index + 1].symbols[position + 1].isPart) {
              e.setAdjacent(
                parsedParts[index + 1].symbols[position + 1].symbol,
                parsedParts[index + 1].symbols[position + 1].position
              );
            }
          }
        }
      }
    });
  });
  return parsedParts;
}



const combineAdjacentNumbers = (parsedParts: partRow[]): confimedPartNumber[] => {
  const confirmedParts: confimedPartNumber[] = [];

  parsedParts.forEach((row) => {
    let rowAsString = '';
    row.symbols.forEach((e) => {
      rowAsString = rowAsString + e.symbol;
    });

    const metaNumberArray = Array.from(rowAsString).map((e, index) => {
      if (isNaN(parseInt(e))) {
        return e;
      }
      else {
        return new metaNumber(e, index);
      }
    });

    const parsedMeta: (string | metaNumber)[] = [];
    metaNumberArray.forEach((e, index) => {
      if (typeof e === 'object') {
        if (index > 0) {
          if (typeof metaNumberArray[index - 1] === 'object') {
            const adjacentNumber = metaNumberArray[index - 1] as metaNumber;
            adjacentNumber.addNumber(e.number);
            adjacentNumber.addPosition(index);
            metaNumberArray[index] = metaNumberArray[index - 1];
            if (parsedMeta.find((e) => e === adjacentNumber) === undefined) {
              parsedMeta.push(adjacentNumber);
            }
          }
          else {
            parsedMeta.push(e);
          }
        }
      }
    });

    parsedMeta.forEach((e) => {
      if (typeof e === 'object') {
        const metaNumber = e as metaNumber;
        const _part = e.positions.map((e) => row.symbols[e]);
        const partCharacter = e.positions.map((e) => row.symbols[e].adjacentCharacter).find((e) => e !== undefined);
        const partPosition = e.positions.map((e) => row.symbols[e].adjacentCharacterPosition).find((e) => e !== undefined);
        confirmedParts.push(new confimedPartNumber(parseInt(metaNumber.number), partCharacter as string, partPosition!));
      }
    })
  });
  return confirmedParts.filter((e) => e.partCharacter !== undefined);

}



const findNumbersWithSharedSymbols = (input: partRow[]): confimedPartNumber[] => {
  const confirmedParts = combineAdjacentNumbers(input)
  const sharedSymbols = confirmedParts.filter((e) => e.partCharacter === '*');
  return sharedSymbols;
}

export function SolvePart2(input: string): number {
  const partNumbers = findPartNumbers(input);
  const confirmedParts = findNumbersWithSharedSymbols(partNumbers);

  const map: { [key: string]: typeof confirmedParts[0][] } = {};
  confirmedParts.forEach((obj) => {
    const key = obj.partPosition.join(',');
    if (!map[key]) {
      map[key] = [];
    }
    map[key].push(obj);
  });

  const gears = Object.values(map).map((e) => {
    if (e.length === 2) {
      return {
        gearOne: e[0].number,
        gearTwo: e[1].number,
        ratio: e[0].number * e[1].number
      }
    }
  });

  let gearRatios = 0;
  gears.filter((e) => e !== undefined).forEach((e) => {
    gearRatios = gearRatios + e!.ratio;
  });

  return gearRatios;
}

export function SolvePart1(input: string): number {
  const partNumbers = findPartNumbers(input);
  const confirmedParts = combineAdjacentNumbers(partNumbers)
  let sumOfPartNumbers = 0;
  confirmedParts.forEach((e) => {
    sumOfPartNumbers = sumOfPartNumbers + e.number;
  });
  return sumOfPartNumbers;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = await fetchAndReturnInput();
  console.log(SolvePart1(input!));
  console.log(SolvePart2(input!));
}



