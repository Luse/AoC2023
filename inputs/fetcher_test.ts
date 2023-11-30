import { assertEquals, assertThrows } from "https://deno.land/std@0.207.0/assert/mod.ts";
import { removeLeadingZero } from "./fetcher.ts";


Deno.test('removeLeadingZero', () => {
    assertEquals(removeLeadingZero('01'), '1');
    assertEquals(removeLeadingZero('001'), '1');
    assertEquals(removeLeadingZero('000'), '');
    assertEquals(removeLeadingZero('02'), '2');
    assertEquals(removeLeadingZero('10'), '10');
    assertEquals(removeLeadingZero(''), '');
    assertEquals(removeLeadingZero('0'), '');
    assertThrows(() => removeLeadingZero(null!))
    assertThrows(() => removeLeadingZero(undefined));

});
