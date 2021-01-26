type primitive = boolean | number | string | bigint | symbol | null | undefined;

export type DeepFrozen<T> = T extends primitive
  ? T
  : T extends Array<infer V>
  ? DeepFrozenArray<V>
  : T extends Set<infer V>
  ? DeepFrozenSet<V>
  : T extends Map<infer K, infer V>
  ? DeepFrozenMap<K, V>
  : DeepFrozenObject<T>;

export type DeepFrozenArray<V> = ReadonlyArray<DeepFrozen<V>>;
export type DeepFrozenSet<V> = ReadonlySet<DeepFrozen<V>>;
export type DeepFrozenMap<K, V> = ReadonlyMap<DeepFrozen<K>, DeepFrozen<V>>;
export type DeepFrozenObject<T> = {
  readonly [K in keyof T]: DeepFrozen<T[K]>;
};

/**
 * Apply `Object.freeze()` recursively.
 *
 * @param target Object to freeze deeply.
 */
export const deepFreeze = <T extends object>(target: T): DeepFrozen<T> => {
  for (const propertyName of Object.getOwnPropertyNames(target)) {
    const value = (target as Record<string | number, unknown>)[propertyName];

    if (typeof value !== "object" && typeof value !== "function") continue;
    if (value === null) continue;
    deepFreeze(value);
  }

  const frozen = Object.isFrozen(target) ? target : Object.freeze(target);
  return frozen as DeepFrozen<T>;
};

export default deepFreeze;
