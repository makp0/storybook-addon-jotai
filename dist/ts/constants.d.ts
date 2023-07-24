import type { Atom } from "jotai";
export declare const ADDON_ID = "storybook/jotai-addon";
export declare const PANEL_ID: string;
export declare const PARAM_KEY = "jotai";
export declare const EVENTS: {
    ATOMS_CHANGED: string;
    RENDERED: string;
};
export declare const createInitialValues: () => {
    get: () => (readonly [Atom<unknown>, unknown])[];
    set: <Value>(anAtom: Atom<Value>, value: Value) => void;
};
export declare const userAtom: Atom<unknown>;
