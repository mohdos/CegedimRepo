import '../styling/App.css';
import Block from './Block';
import {Container, Row, Col} from 'react-bootstrap';
import { Component } from 'react';
import {shuffleArray} from '../utils/Helper';
import { Button } from 'react-bootstrap';
import WinScreen from './WinScreen';

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

    // this.handleSelection = this.handleSelection.bind(this);
    // this.getPositionOfValue = this.getPositionOfValue.bind(this);
    
    const arr = shuffleArray([...Array(numGrids+1).keys()]);
    const blocksPerRow = Math.floor(Math.sqrt(numGrids + 1));
    let arr2D = [];
    for (let i=0; i<blocksPerRow; i++)
    {
      arr2D.push(arr.slice(i*blocksPerRow, i*blocksPerRow+blocksPerRow));
    }
    this.state = {numGrids, arr2D: arr2D, didWin: false, numMoves: 0, time: 0};

    this.timer = setInterval(() => {this.setState({time: this.state.time + 1})}, 1000);
  }

  handleReplay()
  {
    const arr = shuffleArray([...Array(this.state.numGrids+1).keys()]);
    const blocksPerRow = Math.floor(Math.sqrt(this.state.numGrids + 1));
    let arr2D = [];
    for (let i=0; i<blocksPerRow; i++)
    {
      arr2D.push(arr.slice(i*blocksPerRow, i*blocksPerRow+blocksPerRow));
    }
    this.setState({
      arr2D: arr2D, didWin: false, numMoves: 0, time: 0
    })

    clearInterval(this.timer);
    this.timer = setInterval(() => {this.setState({time: this.state.time + 1})}, 1000);
  }

  handleSelection(value)
  {
    
    // if this is empty, do nothing
    if (value == this.state.numGrids)
    {
      return;
    }

    // get position of empty
    const emptyArr = this.getPositionOfValue(this.state.numGrids);
    const valArr = this.getPositionOfValue(value);
    const rowEmpty = emptyArr[0];
    const colEmpty = emptyArr[1];

    const rowValue = valArr[0];
    const colValue = valArr[1];
    if (this.isValidMove(rowEmpty, colEmpty, rowValue, colValue))
    {
      console.log("Is valid");
      let arr2DModified = [...this.state.arr2D];
      const temp = this.state.arr2D[rowEmpty][colEmpty]
      arr2DModified[rowEmpty][colEmpty] = this.state.arr2D[rowValue][colValue];
      arr2DModified[rowValue][colValue] = temp;
      this.setState({
        arr2D: arr2DModified,
        numMoves: this.state.numMoves + 1
      }, () => {
        console.log(this.state.arr2D);
        if (this.checkSolution(this.state.arr2D))
        {
          setTimeout(() => {
            this.setState({didWin: true});
          }, 500);
        }
      });
    }

  }

  isValidMove(rowEmpty, colEmpty, rowValue, colValue)
  {
    if (rowValue == rowEmpty)
    {
      if (Math.abs(colEmpty - colValue) == 1)
      {
        // valid move
        return true;
      }
      else
      {
        // invalid move
        return false;
      }
    }
    else
    {
      if (Math.abs(rowEmpty - rowValue) == 1 && colEmpty == colValue)
      {
        // valid move
        return true;
      }
      else
      {
        // invalid move
        return false;
      }
    }

  }

  getPositionOfValue(value)
  {
    for (let i=0; i<this.state.arr2D.length; i++)
    {
      const rowArr = this.state.arr2D[i];
      for (let j=0; j<rowArr.length; j++)
      {
        const val = rowArr[j];
        if (val == value)
        {
          return [i, j];
        }
      }
    }
  }

  checkSolution(arr2D)
  {
    const arr1D = [].concat(...arr2D);
    for (let i=1; i<arr1D.length; i++)
    {
      if (arr1D[i] - arr1D[i-1] !== 1)
      {
        return false;
      }
    }
    return true;
  }

  render()
  {
    const blocksPerRow = Math.floor(Math.sqrt(this.state.numGrids + 1));
    const share = Math.floor(12 / blocksPerRow);
    
    return (
      <div className="App">
        {this.state.didWin && <WinScreen time={this.state.time} numMoves={this.state.numMoves} onClick={this.handleReplay.bind(this)}/>}
        {!this.state.didWin && 
          <div>
            <Container className='appContainer'>
              {
                this.state.arr2D.map((rowArr, rowInd) => {
                  return (
                    <Row>
                      {rowArr.map((value, index) => {
                        return (<Col key={value} md={share} xs={share} lg={share} xl={share}>
                                  <Block value={value} row={rowInd} col={index} key={index} isEmpty={value===this.state.numGrids} onClick={this.handleSelection.bind(this)}/>
                                </Col>
                              )
                        })
                      }
                    </Row>
                  )
                })
              }
            </Container>
            <Button onClick={() => this.handleReplay()} variant='primary' style={{padding: "8px 20px", margin: "auto", marginTop: "20px"}}>
                Shuffle
            </Button>
            <div style={{marginTop: "20px"}}>
              <h6>Number of moves: {this.state.numMoves} - Time taken: {this.state.time}</h6>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;

