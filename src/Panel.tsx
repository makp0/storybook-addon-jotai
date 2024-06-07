import React, { useState } from 'react';

import { TabsState } from '@storybook/components';
import { useChannel } from '@storybook/manager-api';

import { EVENTS, NOTE } from './constants';

type PanelProps = {
  active?: boolean;
};

type PanelContentProps = {
  initialValues: any;
  currentValues: any;
};

const PanelContent: React.FC<PanelContentProps> = ({ initialValues, currentValues }) => (
  <TabsState initial="initialValues">
    <div id="initialValues" title="Initial Values">
      <pre>{JSON.stringify(initialValues, null, 2)}</pre>
    </div>
    <div id="currentValues" title="Current Values">
      <pre>{JSON.stringify(currentValues, null, 2)}</pre>
    </div>
  </TabsState>
);

export const Panel: React.FC<PanelProps> = ({ active }) => {
  const [currentValues, setCurrentValues] = useState();
  const [initialValues, setInitialValues] = useState();
  const note = initialValues && initialValues[NOTE];

  useChannel({
    [EVENTS.SET_INITIAL_VALUES]: (values: any) => {
      setInitialValues(values);
      setCurrentValues(values);
    },
    [EVENTS.SET_CURRENT_VALUES]: (values: any) => {
      setCurrentValues(values);
    },
  });

  if (!active) return null;

  return (
    <>
      {note && <code style={{ padding: '1em' }}>{note}</code>}
      {!note && <PanelContent currentValues={currentValues} initialValues={initialValues} />}
    </>
  );
};
