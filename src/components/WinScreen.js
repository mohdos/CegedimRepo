import { Component } from "react";
import '../styling/WinScreen.css';
import { Button } from "react-bootstrap";
import { Transition } from 'react-transition-group';
import { getRandomElement } from "../utils/Helper";


class WinScreen extends Component
{

    constructor (props)
    {
        super (props);
        const colors = ["orange", "teal", "blue", "purple", "yellow"];
        this.state = {onClick: props.onClick, time: props.time, numMoves: props.numMoves, currentPos: 0, scale: 1.0, colorLeft: getRandomElement(colors), colorRight: getRandomElement(colors), colorMiddle: getRandomElement(colors)};
    }

    componentDidMount() {
        const self = this;
        let colors = ["orange", "teal", "blue", "purple", "yellow"];
        setInterval( () =>
                self.setState({
                    currentPos: 1000 - self.state.currentPos,
                    scale: 3.0 - self.state.scale,
                    colorLeft: getRandomElement(colors),
                    colorRight: getRandomElement(colors),
                    colorMiddle: getRandomElement(colors)
                }),
        1000);
    }

    render()
    {

        return (
            <div className="WinScreen" style={{minHeight: "100vh", minWidth: "100vw", marginLeft: "0px", paddingTop: "20px", marginTop: "-20px"}}>
                <h1 style={{margin: "auto", color: "white"}}>
                    You Win!
                </h1>
                <Button onClick={() => this.state.onClick()} variant='primary' style={{margin: "auto", marginTop: "20px"}}>
                    Replay
                </Button>

                <div style={{marginTop: "20px"}}>
                    <h6 style={{color: "white"}}>Number of moves: {this.state.numMoves} - Time taken: {this.state.time} seconds</h6>
                </div>

                <div className="circleLeft" style={{background: `${this.state.colorLeft}`, transform: `translate(0px, ${this.state.currentPos}%)`}}>
                </div>

                <div className="circleRight" style={{background: `${this.state.colorRight}`, transform: `translate(0px, ${1000-this.state.currentPos}%)`}}>
                </div>

                <div className="circleMiddle" style={{background: `${this.state.colorMiddle}`, transform: `scale(${this.state.scale}, ${this.state.scale})`}}>
                </div>
                

                
            </div>
        )
    }
}


export default WinScreen;
