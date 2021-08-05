import { Component } from "react";
import '../styling/WinScreen.css';
import { Button } from "react-bootstrap";


class WinScreen extends Component
{

    constructor (props)
    {
        super (props);
        this.state = {onClick: props.onClick, time: props.time, numMoves: props.numMoves};
    }

    render()
    {
        return (
            <div className="WinScreen" style={{minHeight: "100vh", paddingTop: "20px"}}>
                <h1 style={{margin: "auto", color: "white"}}>
                    You Win!
                </h1>
                <Button onClick={() => this.state.onClick()} variant='primary' style={{margin: "auto", marginTop: "20px"}}>
                    Replay
                </Button>

                <div style={{marginTop: "20px"}}>
                    <h6 style={{color: "white"}}>Number of moves: {this.state.numMoves} - Time taken: {this.state.time} seconds</h6>
                </div>
            </div>
        )
    }
}


export default WinScreen;
