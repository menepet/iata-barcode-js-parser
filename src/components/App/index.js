import React from 'react';
import { getIataData } from '../../utils/parser'
import Ribbon from '../Ribbon'
import IataItem from '../Iata-item'
import './App.css';

class App extends React.Component {
  // the max standard iata input length and after that
  max_standard_iata = 158;

  constructor(props) {
    super(props);

    this.state = {
      barcode: '',
      elements: [],
      errorMessage: ''
    };
  }

  handleInputChange (event) {
    const barcode = event.target.value
    this.setState({ barcode })

    if (barcode && barcode.length <= this.max_standard_iata) {
      this.setState({
        elements: getIataData(barcode),
        errorMessage: ''
      })
    } else {
      this.setState({
        elements: [],
        errorMessage: 'The correct barcode length is between 0 - 158 characters'
      })
    }
  }

  iterateElements () {
    return this.state.elements.map((obj) =>
      <IataItem key={obj.key} item={obj} />
    );
  }

  render() {
    return (
      <div>
        <Ribbon />

        <form onSubmit={(e) => { e.preventDefault(); }} className="App">
          <h1>
            IATA Barcode Javascript Parser
          </h1>

          <input
            type="text"
            name="barcode"
            value={this.state.barcode}
            onChange={this.handleInputChange.bind(this)}
            placeholder="Insert your iata barcode"
          />
        </form>

        <p> {this.state.barcode} </p>

        <ul> {this.iterateElements()} </ul>

        <p className="error">
          {this.state.errorMessage}
        </p>
      </div>
    );
  }
}

export default App;
