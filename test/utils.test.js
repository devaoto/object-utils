const { deepClone, merge, isEqual, toArray, flatten } = require("../dist");

describe("object-utils", () => {
  describe("deepClone", () => {
    it("should deep clone an object", () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = deepClone(obj1);
      expect(obj2).toEqual(obj1);
      expect(obj2).not.toBe(obj1);
      expect(obj2.b).not.toBe(obj1.b);
    });
  });

  describe("merge", () => {
    it("should merge two objects", () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { b: 3, c: 4 };
      const obj3 = merge(obj1, obj2);
      expect(obj3).toEqual({ a: 1, b: 3, c: 4 });
      expect(obj1).toEqual({ a: 1, b: 2 });
      expect(obj2).toEqual({ b: 3, c: 4 });
    });
  });

  describe("isEqual", () => {
    it("should return true for equal objects", () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { a: 1, b: { c: 2 } };
      expect(isEqual(obj1, obj2)).toBe(true);
    });

    it("should return false for unequal objects", () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { a: 1, b: { c: 3 } };
      expect(isEqual(obj1, obj2)).toBe(false);
    });
  });

  describe("toArray", () => {
    it("should convert an object to an array of values", () => {
      const obj = { a: 1, b: 2, c: 3 };
      const arr = toArray(obj);
      expect(arr).toEqual([1, 2, 3]);
    });
  });

  describe("flatten", () => {
    it("should flatten an object", () => {
      const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
      const flatObj = flatten(obj);
      expect(flatObj).toEqual({ a: 1, "b.c": 2, "b.d.e": 3 });
    });

    it("should flatten an object with a prefix", () => {
      const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
      const flatObj = flatten(obj, "prefix");
      expect(flatObj).toEqual({
        "prefix.a": 1,
        "prefix.b.c": 2,
        "prefix.b.d.e": 3,
      });
    });
  });
});
