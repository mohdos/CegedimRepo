import { Component } from "react";
import './Block.css';


class Block extends Component
{
    constructor (props)
    {
        super (props);
        this.state = {value: props.value, isEmpty: props.isEmpty, handleSelection: props.onClick};
    }

    render()
    {
        const className = 'Block ' + (this.state.isEmpty ? "empty":"shad");
        return (
            <div className={className} onClick={() => this.state.handleSelection(this.state.value)} style={{backgroundColor: this.state.isEmpty ? "wheat":"red"}}>
                {!this.state.isEmpty && <h1 className='valueHeader'>{this.state.value}</h1>}
            </div>
        )
    }
}


export default Block;
