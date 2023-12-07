import { fetchAndReturnInput } from '../inputs/fetcher.ts'

class Race {
  raceLength: number | undefined;
  recordTimeToBeat: number | undefined;
  constructor() {
  }
  setRecordTimeToBeat(recordTimeToBeat: number) {
    this.recordTimeToBeat = recordTimeToBeat;
  }
  setRaceLenght(raceLength: number) {
    this.raceLength = raceLength;
  }
}

const parseInput = (input: string, fixKerning: boolean): Race[] => {
  const lines = input.split('\n');
  const Races: Race[] = [];
  lines.forEach((line, lIndex) => {

    let numbers = line.match(/\d+/g)!.map((num) => parseInt(num));
    if (fixKerning) {
      numbers = [parseInt(line.match(/\d+/g)!.toString().replaceAll(',', ''))]

    }
    numbers.forEach((_num) => {
      if (lIndex === 0) {
        Races.push(new Race());
      }
    })

    numbers.forEach((num, index) => {
      const race = Races[index];
      if (lIndex === 0) {
        race.setRaceLenght(num);
      } else {
        race.setRecordTimeToBeat(num);
      }
    })

  });

  return Races;
}

const findOptimalTimeForRace = (race: Race): number[] => {
  const wayToWin = []

  for (let i = 0; i <= race.raceLength!; i++) {
    if (i * (race.raceLength! - i) > race.recordTimeToBeat!) {
      wayToWin.push(i)
    }
  }

  return wayToWin;
}

const getMarginOfErrorForRaces = (races: Race[]): number => {
  const times: number[] = [];
  races.forEach((race) => {
    const _race = findOptimalTimeForRace(race);
    times.push(_race.length)
  })

  return times.reduce((acc, curr) => acc * curr, 1);
}

export const SolvePart1 = (input: string): number => {
  const races = parseInput(input, false);
  const t = getMarginOfErrorForRaces(races);

  return t;
}

export const SolvePart2 = (input: string): number => {
  const races = parseInput(input, true);
  const t = getMarginOfErrorForRaces(races);

  return t;
}
// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = await fetchAndReturnInput();
  console.log(SolvePart1(input!));
  performance.mark('start')
  console.log(SolvePart2(input!));
  performance.mark('end')
  performance.measure('execTime', 'start', 'end');
  const measure = performance.getEntriesByName('execTime')[0].toJSON();
  // {
  //   name: "execTime",
  //   entryType: "measure",
  //   startTime: 718,
  //   duration: 812,
  //   detail: null
  // }
}
