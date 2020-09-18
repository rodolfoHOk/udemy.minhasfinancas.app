import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';
import Rotas from './rotas';
import Navbar from '../components/navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Rotas />
      </div>
    </>
  );
}

export default App;
