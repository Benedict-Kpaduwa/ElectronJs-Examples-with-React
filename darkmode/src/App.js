import React from 'react';
import './App.css';

const {ipcRenderer} = window.require('electron')

function App() {
  const toggle =(darkMode)=>{
    ipcRenderer.invoke('dark-mode:toggle', darkMode)
  }
  const system=(darkMode)=>{
    ipcRenderer.invoke('dark-mode:system', darkMode)
  }
  return (
    <div>
      <h1>Hello World</h1>
      <p>Current theme source:</p>
      <button onClick={()=>toggle()}>Toggle Light Mode</button>
      <button onClick={()=>system()}>Reset to System Theme</button> 
    </div>
  );
}

export default App;