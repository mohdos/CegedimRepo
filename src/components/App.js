import '../styling/App.css';
import Block from './Block';
import {Container, Row, Col} from 'react-bootstrap';
import { Component } from 'react';
import {getTranslationString, isInCorrectPostion, shuffleArray} from '../utils/Helper';
import { Button } from 'react-bootstrap';
import WinScreen from './WinScreen';
import Game from './Game';

class App extends Component
{
  constructor (props)
  {
    super (props);
  }

  render()
  { 
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;

