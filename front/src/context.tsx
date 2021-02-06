import React, { createContext, useContext, useReducer, Dispatch } from 'react';

type DisplayType = {
  txsCompact: boolean;
};

type DisplayContextType = [DisplayType, Dispatch<DisplayActionType>];

type DisplayActionType = {
  type: 'txs';
  compact: boolean;
};

const defaultDisplay: DisplayType = {
  txsCompact: true,
};

const DisplayContext = createContext<DisplayContextType>([defaultDisplay, () => undefined]);

const displayReducer = (state: DisplayType, action: DisplayActionType): DisplayType => {
  console.log({ state, action });

  switch (action.type) {
    case 'txs':
      return {
        ...state,
        txsCompact: action.compact,
      };
    default:
      return state;
  }
};

export const DisplayProvider: React.FC = ({ children }) => (
  <DisplayContext.Provider value={useReducer(displayReducer, defaultDisplay)}>{children}</DisplayContext.Provider>
);

export const useDisplay = (): DisplayContextType => useContext(DisplayContext);
