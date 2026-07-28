import test from "node:test";
import assert from "node:assert/strict";
import { add } from "../src/calculator.js";

test("adds two positive numbers", () => {
  assert.equal(add(12, 30), 42);
});

test("adds decimals and negative numbers", () => {
  assert.equal(add(-1.5, 2.25), 0.75);
});

test("accepts numeric strings from HTML inputs", () => {
  assert.equal(add("5", "7"), 12);
});

test("rejects invalid values", () => {
  assert.throws(() => add("not-a-number", 2), TypeError);
});
