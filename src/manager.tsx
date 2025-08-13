import React from 'react';

import { STORY_CHANGED } from 'storybook/internal/core-events';
import { addons, types, useAddonState, useChannel } from 'storybook/manager-api';
import { ADDON_ID, EVENTS, PANEL_ID, PANEL_TITLE } from './constants';
import { Badge, Spaced } from 'storybook/internal/components';
import { Panel } from './Panel';

function Title() {
  const [{ count }, setCount] = useAddonState(ADDON_ID, { count: 0 });

  useChannel({
    [EVENTS.SET_CURRENT_VALUES]: () => setCount((c) => ({ ...c, count: c.count + 1 })),
    [EVENTS.SET_INITIAL_VALUES]: () => setCount((c) => ({ ...c, count: 0 })),
    [STORY_CHANGED]: () => setCount((c) => ({ ...c, count: 0 })),
  });

  const suffix = count === 0 ? '' : <Badge status="neutral">{count}</Badge>;

  return (
    <div>
      <Spaced col={1}>
        <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>{PANEL_TITLE}</span>
        {suffix}
      </Spaced>
    </div>
  );
}

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: Title,
    render: ({ active }) => <Panel active={active} />,
  });
});
