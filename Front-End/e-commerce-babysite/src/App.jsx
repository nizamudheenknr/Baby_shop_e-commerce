import React from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Mainshop from './Component/Mainshop'

import { useBootstrapPrefix } from 'react-bootstrap/esm/ThemeProvider';
// import { Toaster } from 'react-hot-toast';
import toast, { Toaster } from 'react-hot-toast';

function App() {
 

  return (
    <>
    <div>
        <Mainshop/>
        <Toaster/>
      </div>
    </>
  )
}

export default App
