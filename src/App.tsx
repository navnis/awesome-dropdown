import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import DropDown from './component/dropDown/dropDown';

const colors = ["Red", "Yellow", "Green", "Blue", "Pink", "Black", "Brown", "Silver", "Grey"];
const colors2 = [{ title: "Red", id: "red" }, { title: "Yellow", id: "yellow" }, { title: "Green", id: "green" }, { title: "Blue", id: "blue" }, { title: "Pink", id: "pink" }, { title: "Black", id: "black" },]


function App() {
  return (
    <div className="App">
      <DropDown optionsData={colors} />
    </div>
  );
}

export default App;
