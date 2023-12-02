import { assertEquals } from "https://deno.land/std@0.207.0/assert/mod.ts";
import { SolvePart1, SolvePart2 } from "./main.ts";

Deno.test('SolvePart1 should return 8', () => {
  assertEquals(SolvePart1(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`), 8);
});

Deno.test('SolvePart1 should return 80', () => {
  assertEquals(SolvePart1(`Game 10: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  Game 20: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  Game 30: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  Game 40: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  Game 50: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`), 80);
});

Deno.test('SolvePart2 should return 2286', () => {
  assertEquals(SolvePart2(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`), 2286);
});


