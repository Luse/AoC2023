import { fetchAndReturnInput } from '../inputs/fetcher.ts'

// seeds: 79 14 55 13 

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4

type puzzleMap = {
  sourceCategory: number,
  destinationCategory: number,
  range: number
}

class SeedToSoilMap {
  totalSourceMap = new Map<number, number>;
  totalDestinationMap = new Map<number, number>;
  unfoldedSourceMap: number[] = [];
  unfoldedDestinationMap: number[] = [];
  actualSeedMap = new Map<number, number>;
  constructor() {
  }
  addMap(map: puzzleMap) {
    this.totalSourceMap.set(map.sourceCategory, map.range);
    this.totalDestinationMap.set(map.destinationCategory, map.range);
  }
  unfoldMap() {
    this.totalSourceMap.forEach((value, key) => {
      console.log(key, value)
      for (let i = 0; i < value; i++) {
        this.unfoldedSourceMap.push(key+i)
      }
    })
    this.totalDestinationMap.forEach((value, key) => {
      for (let i = 0; i < value; i++) {
        this.unfoldedDestinationMap.push(key+i)
      }
    })
    
    for (let i = 0; i < this.unfoldedSourceMap.length; i++) {
      this.actualSeedMap.set(this.unfoldedDestinationMap[i], this.unfoldedSourceMap[i])
    }
  }
}

class Seed {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

}

enum types {
  seeds,
  "soil-to-fertilizer",
  "fertilizer-to-water",
  "water-to-light",
  "light-to-temperature",
  "temperature-to-humidity",
  "humidity-to-location"
}

const parseInput = (input: string): Seed[] => {
  const seeds: Seed[] = [];
  const seedToSoilMap: SeedToSoilMap = new SeedToSoilMap();
  const lines = input.split('\n');
  let nowParsing = types.seeds;

  lines.forEach((line) => {
    if (!line.includes(':') && !line.match(/\d+/g)) {
      nowParsing += 1;
      return;
    }
    if (nowParsing === types.seeds) {
      const seedIds = line.split(' ').map((id) => parseInt(id)).filter((id) => !isNaN(id));
      seedIds.forEach((id) => seeds.push(new Seed(id)));
      return;
    }
    if (nowParsing === types["soil-to-fertilizer"]) {
      const [sourceCategory, destinationCategory, range] = line.split(' ').map((id) => parseInt(id)).filter((id) => !isNaN(id));
      if (sourceCategory && destinationCategory && range) {
        seedToSoilMap.addMap({ sourceCategory, destinationCategory, range });
      }
      return;
    }

  })
  seedToSoilMap.unfoldMap()
  console.log(seedToSoilMap);

  console.log(seeds)
  return seeds

}


export const solvePart1 = (input: string): number => {
  parseInput(input)
  return 0;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = await fetchAndReturnInput();
  console.log(solvePart1(input!));
}
