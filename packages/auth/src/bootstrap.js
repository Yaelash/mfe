import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if (onNavigate) {
        history.listen(onNavigate);
    }

    ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

    return {
        onParentNavigate(location) {
            const { pathname } = history.location;
            const nextPathname = location.pathname;

            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }

        }
  }
};

// In dev isolation
if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#_auth-dev-root');

    if (el) {
        mount(el, { defaultHistory: createBrowserHistory() });
    }
};

// Through container
export { mount };