import '../styling/Game.css';
import Block from './Block';
import {Container, Row, Col} from 'react-bootstrap';
import React, { Component } from 'react';
import {getTranslationString, isInCorrectPostion, shuffleArray} from '../utils/Helper';
import { Button } from 'react-bootstrap';
import WinScreen from './WinScreen';

class Game extends React.Component
{
  constructor (props)
  {
    super (props);
    let numGrids = 15;
    if (props.numGrids)
    {
      numGrids = props.numGrids;
    }
    
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
      const isCorrectPos = isInCorrectPostion(value, rowEmpty, colEmpty);
      const element = document.getElementsByClassName("colClass")[rowValue * 4 + colValue].children[0].children[0];

      element.style.transform = getTranslationString(rowValue, colValue, rowEmpty, colEmpty);
      element.style.backgroundColor = (isCorrectPos) ? "green" : "red";
      element.style.boxShadow = "0px 0px";

      const emptyElement = document.getElementsByClassName("colClass")[rowEmpty * 4 + colEmpty].children[0].children[0];
      emptyElement.style.opacity = "0";

      document.getElementsByClassName("colClass")[rowEmpty * 4 + colEmpty].children[0].style.backgroundColor = "#e6ac4100";

      setTimeout(() => {
        let arr2DModified = [...this.state.arr2D];
        const temp = this.state.arr2D[rowEmpty][colEmpty]
        arr2DModified[rowEmpty][colEmpty] = this.state.arr2D[rowValue][colValue];
        arr2DModified[rowValue][colValue] = temp;

        this.setState({
          arr2D: arr2DModified,
          numMoves: this.state.numMoves + 1
        }, () => {
          if (this.checkSolution(this.state.arr2D))
          {
            setTimeout(() => {
              this.setState({didWin: true});
            }, 600);
          }
        })
      }, 500);
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
      <div className="Game">
        {this.state.didWin && <WinScreen time={this.state.time} numMoves={this.state.numMoves} onClick={this.handleReplay.bind(this)}/>}
        {!this.state.didWin && 
          <div>
            <Container className='gameContainer' style={{maxWidth: "800px"}}>
              {
                this.state.arr2D.map((rowArr, rowInd) => {
                  return (
                    <Row>
                      {rowArr.map((value, index) => {
                        return (<Col className="colClass" key={value} md={share} xs={share} lg={share} xl={share}>
                                  <div style={{backgroundColor: "wheat", borderRadius: "10px", marginLeft: "10px", marginRight: "10px", marginTop: "10px"}} className="BlockParent">
                                    <Block value={value} row={rowInd} col={index} key={index} isEmpty={value===this.state.numGrids} onClick={this.handleSelection.bind(this)}/>
                                  </div>
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
              <h5 style={{color: "white"}}>Number of moves: {this.state.numMoves} - Time taken: {this.state.time}s</h5>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Game;

