import React from 'react';
import { getIataData } from '../../utils/parser'
import styled from 'styled-components';
import Ribbon from '../Ribbon'
import './App.css';

const Container = styled.div`
  max-width: 768px;
  margin: auto;
  padding:0 1em;
`;

const Title = styled.h1`
  font-size: 2.2em;
  text-align: center;
  margin-top: 1.2em;
  color: #375368;
`;

const Input = styled.input.attrs({
  type: 'text',
  name: 'barcode',
  placeholder: 'Insert your iata barcode'
})`
  border-radius: .4em;
  border-width: 1px;
  padding: 1em;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  &:focus {
    outline: none;
    box-shadow: 2px 4px 9px 0px #00000047;
  }
`;

const IataItem = styled.li`
  text-align: ${props => props.title ? "center" : "left"};
  color: ${props => props.title ? "#375368" : "black"};
  width: ${props => props.title ? "100%" : "49%"};
  padding: ${props => props.title ? ".5em 0" : ".4em 3px"};
  font-size: ${props => props.title ? "2em" : "1em"};
  display: inline-grid;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const IataItemKey = styled.span`
  font-weight: bold;
  display: contents;
`;

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

    if (barcode?.length <= this.max_standard_iata) {
      this.setState({
        elements: getIataData(barcode),
        errorMessage: ''
      })
    } else {
      this.setState({
        elements: [],
        errorMessage: 'The correct barcode length is between 1 - 158 characters'
      })
    }
  }

  iterateElements () {
    return this.state.elements.map((obj) =>
      <IataItem key={obj.key} {...{ title: obj.isTitle?.toString() }}>
        <IataItemKey>{obj.key}</IataItemKey>
          { obj.isTitle ? '' : ':' }
          &nbsp;
          {obj.value}
      </IataItem>
    );
  }

  render() {
    return (
      <Container>
        <Ribbon />

        <form onSubmit={(e) => { e.preventDefault(); }} className="App">
          <Title>
            IATA Barcode Javascript Parser
          </Title>

          <Input
            value={ this.state.barcode }
            onChange={ this.handleInputChange.bind(this) }
          />
        </form>

        <ul style={{ 'listStyleType': 'none' }}> {this.iterateElements()} </ul>

        <p className="error">
          {this.state.errorMessage}
        </p>
      </Container>
    );
  }
}

export default App;
