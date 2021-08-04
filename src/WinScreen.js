import { Component } from "react";
import './WinScreen.css';
import { Button } from "react-bootstrap";


class WinScreen extends Component
{

    constructor (props)
    {
        super (props);
        this.state = {onClick: props.onClick};
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
            </div>
        )
    }
}


export default WinScreen;
