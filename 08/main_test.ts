import { assertEquals } from "https://deno.land/std@0.207.0/assert/mod.ts";
import { solvePart1, solvePart2 } from "./main.ts";

Deno.test(function solvePart1Test() {
  assertEquals(solvePart1(`RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`), 2);
});
Deno.test(function solvePart1Test() {
  assertEquals(solvePart1(`LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`), 6);
});

Deno.test(function solvePart2Test() {
  assertEquals(solvePart2(`LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`), 6);
});
