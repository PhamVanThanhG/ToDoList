import * as React from 'react';
import MainContainer from './app/MainContainer';
import store from './app/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  persistStore,
} from 'redux-persist';

export default function App() {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainContainer />
      </PersistGate>
    </Provider>
  );
}
