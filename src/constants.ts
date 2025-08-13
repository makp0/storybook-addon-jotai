export const ADDON_ID = '@alexgorbatchev/jotai';
export const PANEL_ID = `${ADDON_ID}/panel`;
export const PANEL_TITLE = 'Jotai';

export const EVENTS = {
  SET_CURRENT_VALUES: `${ADDON_ID}/set_current_values`,
  SET_INITIAL_VALUES: `${ADDON_ID}/set_initial_values`,
  UPDATE_ATOM_VALUE: `${ADDON_ID}/update_atom_value`,
};

// can't use a Symbol here because values are passed around via postMessage
export const NOTE = '_________note****';
