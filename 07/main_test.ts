import { assertEquals } from "https://deno.land/std@0.207.0/assert/mod.ts";
import { solvePart1, solvePart2 } from "./main.ts";

Deno.test('solvePart1 should return 6440', () => {
  assertEquals(solvePart1(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`), 6440);
});

Deno.test('should sort cards into every possible type', () => {
  assertEquals(solvePart1(`23456 1
22345 2
22334 3
22234 4
22233 5
22223 6
22222 7`), 140);
});

Deno.test('solvePart2 should return 5905', () => {
  assertEquals(solvePart2(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`), 5905);
});

Deno.test('solvePart2 should handle five jokers', () => {
  assertEquals(solvePart2(`32T3K 765
JJJJJ 684
JJJJK 28
JJ345 220
JJKKK 483`), 5330);
});