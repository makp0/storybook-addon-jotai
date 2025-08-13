import React, { useState, useCallback } from 'react';

import { TabsState } from 'storybook/internal/components';
import { useChannel } from 'storybook/manager-api';

import { EVENTS, NOTE } from './constants';

type PanelProps = {
  active?: boolean;
};

type PanelContentProps = {
  initialValues: any;
  currentValues: any;
  onUpdateAtomValue: (atomKey: string, newValue: any) => void;
};

const EditableAtomValue: React.FC<{
  atomKey: string;
  value: any;
  onUpdate: (atomKey: string, newValue: any) => void;
}> = ({ atomKey, value, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState('');

  const handleEdit = useCallback(() => {
    setEditValue(JSON.stringify(value, null, 2));
    setEditMode(true);
  }, [value]);

  const handleSave = useCallback(() => {
    try {
      const parsedValue = JSON.parse(editValue);
      onUpdate(atomKey, parsedValue);
      setEditMode(false);
    } catch (error) {
      alert('Invalid JSON format. Please check your input.');
    }
  }, [editValue, atomKey, onUpdate]);

  const handleCancel = useCallback(() => {
    setEditMode(false);
    setEditValue('');
  }, []);

  if (editMode) {
    return (
      <div style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
        <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>{atomKey}:</div>
        <textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          style={{ 
            width: '100%', 
            height: '100px', 
            fontFamily: 'monospace',
            fontSize: '12px',
            resize: 'vertical'
          }}
        />
        <div style={{ marginTop: '5px' }}>
          <button 
            onClick={handleSave}
            style={{ 
              marginRight: '5px', 
              padding: '5px 10px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Save
          </button>
          <button 
            onClick={handleCancel}
            style={{ 
              padding: '5px 10px', 
              backgroundColor: '#6c757d', 
              color: 'white', 
              border: 'none', 
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      style={{ 
        marginBottom: '10px', 
        border: '1px solid #e9ecef', 
        padding: '10px', 
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8f9fa'; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
      onClick={handleEdit}
      title="Click to edit"
    >
      <div style={{ marginBottom: '5px', fontWeight: 'bold', color: '#495057' }}>{atomKey}:</div>
      <pre style={{ margin: '0', fontSize: '12px', color: '#6c757d' }}>
        {JSON.stringify(value, null, 2)}
      </pre>
    </div>
  );
};

const PanelContent: React.FC<PanelContentProps> = ({ initialValues, currentValues, onUpdateAtomValue }) => (
  <TabsState initial="currentValues">
    <div id="initialValues" title="Initial Values">
      <div style={{ padding: '10px' }}>
        <div style={{ marginBottom: '10px', fontSize: '14px', color: '#6c757d' }}>
          Initial values (read-only)
        </div>
        {initialValues && Object.entries(initialValues).map(([key, value]) => (
          <div key={key} style={{ 
            marginBottom: '10px', 
            border: '1px solid #e9ecef', 
            padding: '10px', 
            borderRadius: '4px',
            backgroundColor: '#f8f9fa'
          }}>
            <div style={{ marginBottom: '5px', fontWeight: 'bold', color: '#495057' }}>{key}:</div>
            <pre style={{ margin: '0', fontSize: '12px', color: '#6c757d' }}>
              {JSON.stringify(value, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
    <div id="currentValues" title="Current Values">
      <div style={{ padding: '10px' }}>
        <div style={{ marginBottom: '10px', fontSize: '14px', color: '#28a745' }}>
          Current values (click to edit)
        </div>
        {currentValues && Object.entries(currentValues).map(([key, value]) => (
          <EditableAtomValue
            key={key}
            atomKey={key}
            value={value}
            onUpdate={onUpdateAtomValue}
          />
        ))}
      </div>
    </div>
  </TabsState>
);

export const Panel: React.FC<PanelProps> = ({ active }) => {
  const [currentValues, setCurrentValues] = useState();
  const [initialValues, setInitialValues] = useState();
  const note = initialValues && initialValues[NOTE];
  const emit = useChannel({
    [EVENTS.SET_INITIAL_VALUES]: (values: any) => {
      setInitialValues(values);
      setCurrentValues(values);
    },
    [EVENTS.SET_CURRENT_VALUES]: (values: any) => {
      setCurrentValues(values);
    },
  });

  const handleUpdateAtomValue = useCallback((atomKey: string, newValue: any) => {
    emit(EVENTS.UPDATE_ATOM_VALUE, { atomKey, newValue });
  }, [emit]);

  if (!active) return null;

  return (
    <>
      {note && <code style={{ padding: '1em' }}>{note}</code>}
      {!note && (
        <PanelContent 
          currentValues={currentValues} 
          initialValues={initialValues} 
          onUpdateAtomValue={handleUpdateAtomValue}
        />
      )}
    </>
  );
};
