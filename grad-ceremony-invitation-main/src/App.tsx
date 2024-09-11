import React from 'react';
import MatrixEffect from './components/MatrixEffect';
import Invite from './components/Invite';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <canvas className="matrix"></canvas>
            <Invite />
            <MatrixEffect />
        </div>
    );
};

export default App;
