import { addons, makeDecorator } from 'storybook/preview-api';
import { Provider as JotaiProvider, useAtomValue, useSetAtom } from 'jotai';
import React, { useMemo, useState } from 'react';

import { EVENTS, NOTE } from './constants';
import { Parameters } from './types';

(JotaiProvider as any).displayName = 'JotaiProvider';

type Props = {
  children: React.ReactElement;
  parameters: any;
};

const StorybookAddonJotaiInContext = ({ parameters, children }: Props) => {
  const setters: Record<string, Function> = {};
  const parametersValue: Parameters<any> = useMemo(
    () => (typeof parameters === 'function' ? parameters() : parameters || {}),
    [],
  );
  const { atoms: atomsFuncOrValue, values: valuesFuncOrValue } = parametersValue;
  const atoms = typeof atomsFuncOrValue === 'function' ? atomsFuncOrValue() : atomsFuncOrValue;
  const initialValues = typeof valuesFuncOrValue === 'function' ? valuesFuncOrValue() : valuesFuncOrValue;
  const channel = addons.getChannel();
  const currentAtomValues: Record<string, any> = {};
  const [initalized, setInitialized] = useState(false);

  const userNote = (note: string) => {
    channel.emit(EVENTS.SET_INITIAL_VALUES, { [NOTE]: note });
    return children;
  };

  if (!parametersValue) return userNote('parameters.jotai not defined');
  if (!atoms) return userNote('parameters.jotai.atoms not defined');
  if (!initialValues) return userNote('parameters.jotai.values not defined');

  // Collect all the atom setters, must be done outside of any hooks and ifs.
  // This value will not change between renders because we momoized the parameters.
  Object.keys(atoms).forEach((key) => {
    setters[key] = useSetAtom(atoms[key]);
  });

  // Set initial values to our atom setters, doing this outside of any hooks
  // helps us avoid original atom values from being picked up by chilren.
  if (!initalized) {
    setInitialized(true);

    // Will be triggered when setters are known, this is where we assign initial
    // values to atoms.
    Object.entries(setters).forEach(([key, setter]) => {
      setter(initialValues[key]);
    });

    // Listen for atom value updates from the panel
    channel.on(EVENTS.UPDATE_ATOM_VALUE, ({ atomKey, newValue }: { atomKey: string; newValue: any }) => {
      const setter = setters[atomKey];
      if (setter) {
        setter(newValue);
      }
    });
  }

  // We are looping through the atoms to get their values, so the expectation
  // here is that the number of atoms doesn't change between renders,
  // otherwise things will explode.
  Object.entries(atoms).forEach(([key, value]) => {
    currentAtomValues[key] = useAtomValue(value);
  });

  // Update on every render to keep things simple.
  channel.emit(EVENTS.SET_INITIAL_VALUES, initialValues);
  channel.emit(EVENTS.SET_CURRENT_VALUES, currentAtomValues);

  return children;
};

const StorybookAddonJotai = (props: Props) => (
  <JotaiProvider>
    <StorybookAddonJotaiInContext {...props} />
  </JotaiProvider>
);

export const withJotai = makeDecorator({
  name: 'withJotai',
  parameterName: 'jotai',
  wrapper: (getStory, context, { parameters }) => (
    <StorybookAddonJotai parameters={parameters}>{getStory(context) as any}</StorybookAddonJotai>
  ),
});
