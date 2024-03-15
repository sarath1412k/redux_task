import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrescriptionFrom from './components/PrescriptionForm';
import { Provider } from 'react-redux';
import { store } from './store'
import MedicineList from './components/PrescriptionList';

function App() {
  return (
    <Provider store={store}>
    <div className='content-layout'>
      <div className='content-title'>Add Prescription</div>
    <PrescriptionFrom />
    <MedicineList />
    </div>
    </Provider>
  );
}

export default App;
