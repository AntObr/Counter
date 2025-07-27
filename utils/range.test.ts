import { mapToRange, range } from "./range";

describe("range function", () => {
    test("should create basic range with step 1", () => {
        const result = range(0, 5, 1);
        expect(result).toEqual([0, 1, 2, 3, 4, 5]);
    });

    test("should create range with step 2", () => {
        const result = range(0, 10, 2);
        expect(result).toEqual([0, 2, 4, 6, 8, 10]);
    });

    test("should create range with negative step", () => {
        const result = range(5, 0, -1);
        expect(result).toEqual([5, 4, 3, 2, 1, 0]);
    });

    test("should return empty array when start >= end with positive step", () => {
        const result = range(5, 5, 1);
        expect(result).toEqual([5]);
    });

    test("should return empty array when start <= end with negative step", () => {
        const result = range(0, 5, -1);
        expect(result).toEqual([]);
    });

    test("should create range with decimal step", () => {
        const result = range(0, 1, 0.2);
        // Account for floating point precision
        expect(result).toHaveLength(6);
        expect(result[0]).toBe(0);
        expect(result[1]).toBeCloseTo(0.2);
        expect(result[2]).toBeCloseTo(0.4);
        expect(result[3]).toBeCloseTo(0.6);
        expect(result[4]).toBeCloseTo(0.8);
        expect(result[5]).toBeCloseTo(1);
    });

    test("should create large range", () => {
        const result = range(100, 105, 1);
        expect(result).toEqual([100, 101, 102, 103, 104, 105]);
    });

    test("should handle zero step", () => {
        const result = range(0, 5, 0);
        expect(result).toEqual([]);
    });

    test("should handle negative start and end", () => {
        const result = range(-3, 0, 1);
        expect(result).toEqual([-3, -2, -1, 0]);
    });
});

describe("mapToRange function", () => {
    test("should map value to range", () => {
        const result = mapToRange(50, range(0, 100, 1));
        expect(result).toBe(50);
    });
    test("should map value to range if out of range", () => {
        const result = mapToRange(101, range(0, 100, 1));
        expect(result).toBe(100);
    });
    test("should map value to range if out of range", () => {
        const result = mapToRange(-1, range(0, 100, 1));
        expect(result).toBe(0);
    });
    test("should map value to range if within but not present in range", () => {
        const result = mapToRange(50.5, range(0, 100, 1));
        expect(result).toBe(50);
    });
    test("should map value to range if within bounds but not present in range", () => {
        const result = mapToRange(5, [0, 1, 2, 3, 4, 5, 10]);
        expect(result).toBe(5);
    });
    test("should map value to range if within bounds but not present in range", () => {
        const result = mapToRange(6, [0, 1, 2, 3, 4, 5, 10]);
        expect(result).toBe(5);
    });
    test("should map value to range if within bounds but not present in range", () => {
        const result = mapToRange(7, [0, 1, 2, 3, 4, 5, 10]);
        expect(result).toBe(5);
    });
    test("should map value to range if within bounds but not present in range", () => {
        const result = mapToRange(8, [0, 1, 2, 3, 4, 5, 10]);
        expect(result).toBe(5);
    });
    test("should map value to range if within bounds but not present in range", () => {
        const result = mapToRange(9, [0, 1, 2, 3, 4, 5, 10]);
        expect(result).toBe(5);
    });
    test("should map value to range if within bounds but not present in range", () => {
        const result = mapToRange(10, [0, 1, 2, 3, 4, 5, 10]);
        expect(result).toBe(10);
    });
});
