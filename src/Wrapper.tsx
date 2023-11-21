import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

import { addons } from '@storybook/addons';

import { EVENTS } from './constants';
import { AtomHash } from './types';

export const Wrapper = ({
  atoms,
  children,
}: {
  atoms: AtomHash<any>;
  children: any;
}) => {
  const channel = addons.getChannel();
  const useAtoms: AtomHash<any> = {};

  Object.entries(atoms).forEach(([key, value]) => {
    useAtoms[key] = useAtomValue(value) as any;
  });

  const atomValues = Object.values(atoms);

  useEffect(() => {
    channel.emit(EVENTS.ATOMS_CHANGED, useAtoms);
  }, [atoms, useAtoms, atomValues]);

  return children;
};
