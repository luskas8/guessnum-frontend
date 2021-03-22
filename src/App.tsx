import React from 'react';
import QuestionProvider from './contexts/QuestionContext';
import Routes from './Routes';

import './styles/global.css'

function App() {
  return (
    <QuestionProvider>
      <Routes />
    </QuestionProvider>
  );
}

export default App;
