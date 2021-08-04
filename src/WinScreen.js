import { Component } from "react";
import './WinScreen.css';
import {} from 'react-transition-group';
import { Button } from "bootstrap";


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
            <div className="WinScreen">
                <label style={{margin: "auto"}}>
                    You Win!
                </label>
                <Button onClick={() => this.state.onClick} variant='primary' style={{margin: "auto", marginTop: "20px"}}>
                    Replay
                </Button>
            </div>
        )
    }
}


export default WinScreen;
