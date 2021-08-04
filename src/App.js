import logo from './logo.svg';
import './App.css';
import Block from './Block';
import {Container, Row, Col} from 'react-bootstrap';
import { Component } from 'react';
import {shuffleArray} from './Helper';

class App extends Component
{
  constructor (props)
  {
    super (props);
    let numGrids = 15;
    if (props.numGrids)
    {
      numGrids = props.numGrids;
    }

    this.handleSelection = this.handleSelection.bind(this);
    const arr = shuffleArray([...Array(numGrids+1).keys()]);
    this.state = {numGrids, arr: arr};
  }

  handleSelection()
  {
    
  }

  render()
  {
    const blocksPerRow = Math.sqrt(this.state.numGrids);
    const share = Math.floor(12 / blocksPerRow);
    return (
      <div className="App">
        <Container className='appContainer'>
          <Row>
            {
              this.state.arr.map((value, index) => {
                const row = Math.floor(index / blocksPerRow);
                const col = index % 4;
                const key = `${row},${col}`;
                return (
                  <Col key={index} md={share} xs={share} lg={share} xl={share}>
                    <Block value={value+1} key={index} isEmpty={value===this.state.numGrids} onClick={this.handleSelection}/>
                  </Col>
                )
              })
            }
          </Row>
        </Container>
        {/* <Block /> */}
      </div>
    );
  }
}

export default App;
