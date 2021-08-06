import { Component } from "react";
import '../styling/Block.css';
import { isInCorrectPostion } from "../utils/Helper";


class Block extends Component
{
    constructor (props)
    {
        super (props);
        this.state = {value: props.value, isEmpty: props.isEmpty, handleSelection: props.onClick, isCorrectPos: isInCorrectPostion(props.value, props.row, props.col)};
    }

    

    render()
    {
        const className = 'Block ' + (this.state.isEmpty ? "empty":"shad");
        return (
            <div className={className} onClick={() => this.state.handleSelection(this.state.value)} style={{backgroundColor: this.state.isEmpty ? "wheat": (this.state.isCorrectPos ? "green":"red")}}>
                {!this.state.isEmpty && <h1 className='valueHeader'>{this.state.value}</h1>}
            </div>
        )
    }
}


export default Block;
