import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PathfinderProvider } from './pathfinder';

const App = () => {
  return (
    <PathfinderProvider>
      <div>your app</div>
    </PathfinderProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
