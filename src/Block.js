import { Component } from "react";
import './Block.css';


class Block extends Component
{
    constructor (props)
    {
        super (props);
        this.state = {value: props.value, isEmpty: props.isEmpty};
    }

    render()
    {
        return (
            <div className='Block' style={{backgroundColor: this.state.isEmpty ? "wheat":"red"}}>
                {!this.state.isEmpty && <h1 className='valueHeader'>{this.state.value}</h1>}
            </div>
        )
    }
}


export default Block;
