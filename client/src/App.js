  import React from 'react';
  // import logo from '/bigByte.png';
  import Modal from './Components/Modal/Modal';
  import HamburgerNavbar from './Components/HamburgerNavbar/HamburgerNavbar';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         
          <h1 className="App-title"> hi </h1>
        </header>
        <Modal />
      </div>
     
    );
    
  }
}

export default App;
