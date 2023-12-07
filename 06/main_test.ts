import { assertEquals } from "https://deno.land/std@0.207.0/assert/mod.ts";
import { SolvePart1, SolvePart2 } from "./main.ts";

Deno.test('Should solve the example', () => {
  assertEquals(SolvePart1(`Time:      7  15   30
Distance:  9  40  200`), 288);
});

Deno.test('Should solve the example for part 2', () => {
  assertEquals(SolvePart2(`Time:      7  15   30
Distance:  9  40  200`), 71503);
});