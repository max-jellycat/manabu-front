import React from 'react';
import './App.scss';

const App = () => (
  <section className="App">
    <main className="section">
      <h1 className="title">Hello World!</h1>
      <h2 className="subtitle">What will we build today?</h2>
      <button className="button is-primary is-outlined">
        <span className="icon">
          <i className="fas fa-user" />
        </span>
        <span>Hello</span>
      </button>
    </main>
  </section>
);

export default App;
