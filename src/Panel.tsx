import React, { useState } from 'react';

import { useChannel } from '@storybook/api';
import { AddonPanel } from '@storybook/components';

import { PanelContent } from './components/PanelContent';
import { EVENTS, NOTE } from './constants';

interface PanelProps {
  active: boolean;
  key: string;
}

const { SET_INITIAL_VALUES, SET_CURRENT_VALUES } = EVENTS;

export const Panel: React.FC<PanelProps> = (props) => {
  const [currentValues, setCurrentValues] = useState();
  const [initialValues, setInitialValues] = useState();
  const note = initialValues && initialValues[NOTE];

  useChannel({
    [SET_INITIAL_VALUES]: (values) => {
      setInitialValues(values);
      setCurrentValues(values);
    },
    [SET_CURRENT_VALUES]: (values) => {
      setCurrentValues(values);
    },
  });

  return (
    <AddonPanel {...props}>
      {note && <code style={{ padding: '1em' }}>{note}</code>}
      {!note && <PanelContent currentValues={currentValues} initialValues={initialValues} />}
    </AddonPanel>
  );
};
