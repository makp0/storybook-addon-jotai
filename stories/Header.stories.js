import React from 'react';

import { atomsForStorybook } from '../dist/esm';
import { userAtom } from './constants';

import { Header } from './Header';

export default {
  title: 'Example/Header',
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const JohnLoggedIn = Template.bind({});

JohnLoggedIn.parameters = {
  jotai: atomsForStorybook({
    atoms: {
      user: userAtom,
    },
    values: {
      user: {
        name: 'John Doe',
      },
    },
  }),
};

export const JaneLoggedIn = Template.bind({});

JaneLoggedIn.parameters = {
  jotai: atomsForStorybook({
    atoms: {
      user: userAtom,
    },
    values: {
      user: {
        name: 'Jane Doe',
      },
    },
  }),
};

export const JaneLoggedInDeferred = Template.bind({});
JaneLoggedInDeferred.parameters = {
  jotai: () =>
    atomsForStorybook({
      atoms: {
        user: userAtom,
      },
      values: {
        user: {
          name: 'Jane Doe',
        },
      },
    }),
};

export const NoJotaiParameter = Template.bind({});

export const MissingAtomsParameter = Template.bind({});
MissingAtomsParameter.parameters = {
  jotai: atomsForStorybook({
    values: {
      user: {
        name: 'Jane Doe',
      },
    },
  }),
};

export const MissingValuesParameter = Template.bind({});
MissingValuesParameter.parameters = {
  jotai: atomsForStorybook({
    atoms: {
      user: userAtom,
    },
  }),
};
