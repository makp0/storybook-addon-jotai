import { Provider, useStore } from 'jotai';
import React from 'react';

import { addons, makeDecorator } from '@storybook/addons';

import { EVENTS } from './constants';
import { Parameters } from './types';
import { Wrapper } from './Wrapper';

export const withJotai = makeDecorator({
  name: 'withJotai',
  parameterName: 'jotai',
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context, { parameters }) => {
    const channel = addons.getChannel();
    const store = useStore();

    if (!parameters) {
      channel.emit(EVENTS.RENDERED, { note: 'withJotai decorator not used' });
      return storyFn(context);
    }

    const { atoms, values } = parameters as Parameters<any>;

    Object.entries(atoms).map(([key, atom]) => store.set(atom, values[key]));

    channel.emit(EVENTS.RENDERED, values);

    return (
      <Provider store={store}>
        <Wrapper atoms={atoms}>{storyFn(context)}</Wrapper>
      </Provider>
    );
  },
});
