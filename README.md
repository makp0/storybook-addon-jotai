# Storybook Jotai Addon

A [Storybook](https://storybook.js.org/) addon and decorator for [Jotai](https://jotai.org) mocking and displaying current values in a Storybook panel.

![](./screenshot.png)

## Compatibility

This addon supports both Storybook v8 and v9.

## Install

```sh
npm i --save-dev @alexgorbatchev/storybook-addon-jotai
```

Register the addon in `.storybook/main.js`:

```js
export default {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@alexgorbatchev/storybook-addon-jotai'],
};
```

## Important

Please keep in mind that the addon wraps everything with `Provider` from `jotai` package. It's important
that your story components don't include the `Provider`, otherwise the addon won't be able to see and set
atom values.

## Usage

Given a simple component:

```tsx
import { useAtom, atom } from 'jotai';

const userAtom = atom(null);

export const Header = () => {
  const [user] = useAtom(userAtom);

  return (
    <div>
      {user ? (
        <div>
          <div>{`Logged in as ${user.name}`}</div>
          <Button size="small" label="Log out" onClick={() => setUser(null)} />
        </div>
      ) : (
        <div>
          <div>No one is signed in</div>
          <Button size="small" label="Log in" onClick={() => setUser({ name: 'John' })} />
        </div>
      )}
    </div>
  );
};
```

You can write a story as:

```tsx
import { atomsForStorybook } from '@alexgorbatchev/storybook-addon-jotai';
import { Meta, StoryObj } from '@storybook/react';

import { Header, userAtom } from './Header';

const meta = {
  title: 'Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

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

// `jotai`, `atoms`, and `values` each can be a function for deferred evaluation.
export const JaneLoggedIn: Story = {
  parameters: {
    jotai: () => atomsForStorybook({
      atoms: () => ({
        user: userAtom,
      }),
      values: () => ({
        user: {
          name: 'Jane Doe',
        },
      }),
    }),
  },
};

export const LoggedOut: Story = {};
```

## Features

### Interactive Panel

The addon provides an interactive panel in Storybook that displays both initial and current atom values.
You can edit current atom values directly in the panel to see how your components react to state changes.

### Strongly Typed Usage

For strongly typed usage with TypeScript:

```tsx
import { Meta, StoryObj } from '@storybook/react';
import { JotaiParameters } from '@alexgorbatchev/storybook-addon-jotai';

import { Header, userAtom } from './Header';

interface StoryParameters extends JotaiParameters {}

const meta = {
  title: 'Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const JohnLoggedIn: Story = {
  parameters: {
    // `jotai` is strongly typed
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
```

## Development Scripts

- `npm run storybook` starts Storybook
- `npm run build` builds the addon with tsup
