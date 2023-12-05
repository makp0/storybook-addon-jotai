import type { WritableAtom } from 'jotai';

export type AtomHash<T extends Record<string, unknown>> = {
  [K in keyof T]: WritableAtom<T[K], any, any>;
};

export type AtomValues<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
};

export type Parameters<T extends Record<string, unknown>> = {
  atoms: AtomHash<T>;
  values: AtomValues<T>;
};

export type JotaiParameters = {
  jotai?: Partial<Parameters<any>>;
};
