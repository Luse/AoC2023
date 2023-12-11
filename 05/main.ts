import { fetchAndReturnInput } from '../inputs/fetcher.ts'

type MapEntry = {
  sourceRangeStart: number,
  targetRangeStart: number,
  rangeLength: number
}
type GardenMap = MapEntry[];

type InputData = { seeds: number[]; maps: GardenMap[] };

const parseInput = (input: string): InputData => {
  const lines = input.split('\n');
  const [seedsLine, ...otherLines] = lines;
  const seeds: number[] = parseNumbers(seedsLine.split(':')[1]);

  const maps: GardenMap[] = [];

  for(const line of otherLines) {
    console.log('line', line);
    if (line.trim() === '') {
      continue;
    }
    if(line.includes("map")){
      maps.push([]);
      continue;
    }
    const currentMap = maps[maps.length - 1];
    console.log('currentMap', currentMap);
    const [targetRangeStart, sourceRangeStart, rangeLength] = parseNumbers(line);
    currentMap.push({
      targetRangeStart,
      sourceRangeStart,
      rangeLength,
    });
  }

  function parseNumbers(line: string) {
    return line
      .trim()
      .split(' ')
      .map((x) => parseInt(x, 10));
  }

  return { seeds, maps };
}

function getLocationBySeed(seed: number, maps: GardenMap[]) {
  return maps.reduce((dst, map) => getTargetLocation(dst, map), seed);
}

function getTargetLocation(src: number, map: GardenMap) {
  const mapEntry = map.find(
    ({ sourceRangeStart, rangeLength }) =>
      src >= sourceRangeStart && src <= sourceRangeStart + rangeLength
  );

  if (!mapEntry) {
    return src;
  }

  const offset = src - mapEntry.sourceRangeStart;
  const dst = mapEntry.targetRangeStart + offset;
  return dst;
}

export const solvePart1 = (input: string): number => {
  const { seeds, maps } = parseInput(input);
  const locations = seeds.map((seed) => getLocationBySeed(seed, maps));
  return Math.min(...locations);
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = await fetchAndReturnInput();
  console.log(solvePart1(input!));
}
