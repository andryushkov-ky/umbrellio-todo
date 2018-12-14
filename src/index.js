import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './css/index.css';

import App from './js/containers/App';


class Main {
    constructor () {
        this.renderApp()
    }

    renderApp() {
        const container = document.getElementById("root");

        ReactDOM.unmountComponentAtNode(container);
        ReactDOM.render(<App />, container);
    }
}

new Main();

serviceWorker.unregister();
