import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { atomsForStorybook } from '../src/atomsForStorybook';
import { Header } from './Header';
import { userAtom } from './constants';

const meta: Meta<typeof Header> = {
  title: 'Example/Header',
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const JohnLoggedIn: Story = {
  parameters: {
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
  },
};

export const JaneLoggedIn: Story = {
  parameters: {
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
  },
};

export const JaneLoggedInDeferred: Story = {
  parameters: {
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
  },
};

export const NoJotaiParameter: Story = {};

export const MissingAtomsParameter = {
  parameters: {
    // @ts-expect-error
    jotai: atomsForStorybook({
      values: {
        user: {
          name: 'Jane Doe',
        },
      },
    }),
  },
};

export const MissingValuesParameter: Story = {
  parameters: {
    // @ts-expect-error
    jotai: atomsForStorybook({
      atoms: {
        user: userAtom,
      },
    }),
  },
};
