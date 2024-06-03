import { atom } from 'jotai';

type User = { name: string };

export const userAtom = atom<User | null>({ name: 'John' });
