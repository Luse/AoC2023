import { assertEquals } from "https://deno.land/std@0.207.0/assert/mod.ts";
import { SolvePart1, SolvePart2 } from "./main.ts";

Deno.test('SolvePart1 should return 142', () => {
  const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`
  assertEquals(SolvePart1(input), 142);
});

Deno.test('SolvePart1 should return 77', () => {
  const input = `ggrbl5cthnzlsbjssixpt`
  assertEquals(SolvePart1(input), 55);
});

Deno.test('SolvePart1 should return 61', () => {
  const input = `foursixfour61nrseven`
  assertEquals(SolvePart1(input), 61);
});

Deno.test('SolvePart2 should return 281', () => {
  const input = `two1nine
  eightwothree
  abcone2threexyz
  xtwone3four
  4nineeightseven2
  zoneight234
  7pqrstsixteen`
  assertEquals(SolvePart2(input), 281);
});

Deno.test('SolvePart2 should return 29', () => {
  const input = `two1nine`
  assertEquals(SolvePart2(input), 29);
});

Deno.test('SolvePart2 should return 83', () => {
  const input = `eightwothree`
  assertEquals(SolvePart2(input), 83);
});

Deno.test('SolvePart2 should return 13', () => {
  const input = `abcone2threexyz`
  assertEquals(SolvePart2(input), 13);
});
Deno.test('SolvePart2 should return 24', () => {
  const input = `xtwone3four`
  assertEquals(SolvePart2(input), 24);
});
Deno.test('SolvePart2 should return 42', () => {
  const input = `4nineeightseven2`
  assertEquals(SolvePart2(input), 42);
});
Deno.test('SolvePart2 should return 14', () => {
  const input = `zoneight234`
  assertEquals(SolvePart2(input), 14);
});
Deno.test('SolvePart2 should return 76', () => {
  const input = `7pqrstsixteen`
  assertEquals(SolvePart2(input), 76);
});

Deno.test('SolvePart2 should return 98', () => {
  const input = `nineight`
  assertEquals(SolvePart2(input), 98);
});