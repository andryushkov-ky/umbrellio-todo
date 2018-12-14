import React, { Component } from 'react';

import Main from './Main'

class App extends Component {
    render() {
        return (
            <div className="app">
                <header className="header">
                    TODOs
                </header>

                <Main/>

                <footer/>
            </div>
        );
    }
}

export default App;
