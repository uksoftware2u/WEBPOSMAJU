import test from "node:test";
import assert from "node:assert/strict";
import { createDownloadCounter, DOWNLOAD_COUNT_KEY } from "../src/download-counter.js";

function storage() {
  const values = new Map();
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), clear: () => values.clear() };
}
test("starts at 1000, increments once and persists across page instances", () => {
  const local = storage();
  const a = createDownloadCounter(() => local);
  assert.equal(a.read(), 1000);
  assert.equal(a.increment(), 1001);
  const b = createDownloadCounter(() => local);
  assert.equal(b.read(), 1001);
  assert.equal(b.increment(), 1002);
  assert.equal(a.increment(), 1003);
  assert.equal(local.getItem(DOWNLOAD_COUNT_KEY), "1003");
  local.clear();
  assert.equal(a.read(), 1000);
});
test("invalid storage is recovered without corrupting the count", () => {
  const local = storage();
  for (const invalid of ["NaN", "999", "-1", "1000.5", "Infinity", "9007199254740992", ""]) {
    local.setItem(DOWNLOAD_COUNT_KEY, invalid);
    assert.equal(createDownloadCounter(() => local).increment(), 1001);
  }
});
test("blocked storage never blocks download activation", () => {
  const counter = createDownloadCounter(() => { throw new Error("blocked"); });
  assert.equal(counter.read(), 1000);
  assert.equal(counter.increment(), 1001);
  assert.equal(counter.increment(), 1002);
});
