import { assertEquals } from "https://deno.land/std@0.207.0/assert/mod.ts";
import { SolvePart1, SolvePart2 } from "./main.ts";

Deno.test('SolverPart1 should return 4361', () => {
  assertEquals(SolvePart1(`467..114..
...*......
..35...633
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`), 4361);
});

Deno.test('SolverPart1 should be able to handle single digits', () => {
  assertEquals(SolvePart1(`467..114..
...*......
..35...633
......#5..
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`), 4366);
});

Deno.test('SolverPart2 should return 467835', () => {
  assertEquals(SolvePart2(`467..114..
...*......
..35...633
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`), 467835);
});