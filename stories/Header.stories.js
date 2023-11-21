import React from "react";

import { withJotai, atomsForStorybook } from "../dist/esm";
import { userAtom } from "./constants";

import { Header } from "./Header";

export default {
  title: "Example/Header",
  component: Header,
  decorators: [withJotai],
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
        name: "John Doe",
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
        name: "Jane Doe",
      },
    },
  }),
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
