import React from 'react';
import { Store } from 'redux';
import { render } from 'react-dom';
import DevTools from '../containers/DevTools';

export const showDevTools = (store: Store) => {
  const popup = window.open(
    undefined,
    'Redux DevTools',
    'menubar=no,location=no,resizable=yes,scrollbars=no,status=no'
  );
  
  if (popup) {
    popup.location.reload();

    setTimeout(() => {
      popup.document.write('<div id="react-devtools-root"></div>');
      render(
        <DevTools store={store} />,
        popup.document.getElementById('react-devtools-root')
      );
    }, 10);
  }
}