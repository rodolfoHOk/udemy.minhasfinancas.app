import React from 'react';
import Rotas from './rotas';
import Navbar from '../components/navbar';

// eslint-disable-next-line import/extensions
import 'toastr/build/toastr.min.js';

import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';
import 'toastr/build/toastr.css';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
