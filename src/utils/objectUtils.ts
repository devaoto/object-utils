type AnyObject = Record<string, any>;

/**
 * Deep clone an object using JSON parse/stringify
 * @param obj The object to clone
 * @returns The cloned object
 */
export function deepClone<T extends AnyObject>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Merge two objects into a new object
 * @param target The target object
 * @param source The source object to merge into the target object
 * @returns A new object that is a merge of the target and source objects
 */
export function merge<T extends AnyObject, U extends Partial<T>>(
  target: T,
  source: U
): T {
  return Object.assign({}, target, source);
}

/**
 * Check if two objects are equal by comparing their JSON representation
 * @param obj1 The first object to compare
 * @param obj2 The second object to compare
 * @returns true if the objects are equal, false otherwise
 */
export function isEqual<T extends AnyObject>(obj1: T, obj2: T): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Convert an object into an array of its values
 * @param obj The object to convert
 * @returns An array of the values in the object
 */
export function toArray<T extends AnyObject>(obj: T): Array<T[keyof T]> {
  return Object.values(obj);
}

/**
 * Flatten an object into a one-level deep object with dot notation keys
 * @param obj The object to flatten
 * @param prefix The prefix to add to keys in the flattened object (optional)
 * @returns A new object with the same values as the original object, but with one-level deep keys
 */
export function flatten<T extends AnyObject>(
  obj: T,
  prefix = ""
): Record<string, T[keyof T]> {
  let result: Record<string, T[keyof T]> = {};
  for (const [key, value] of Object.entries(obj)) {
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null) {
      result = { ...result, ...flatten(value, prefixedKey) };
    } else {
      result[prefixedKey] = value;
    }
  }
  return result;
}
