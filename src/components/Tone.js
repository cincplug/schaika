import React, { Component } from 'react';


class Tone extends Component {
    constructor(props) {
        super(props);
        this.play = this.play.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        
        this.state = {
            sound: null
        }
    }
    
    play(e){
        if(e.buttons){
            var sound = this.props.play(this.props.nota);

            this.setState({
                sound: sound
            });
        }
    }
    
    handleMouseUp(){
        if(this.state.sound){
            this.props.stop(this.state.sound);
        }
    }
    
    handleMouseOut(){
        if(this.state.sound){
            this.props.stop(this.state.sound);
        }
    }
    
    render() {        
        return (
            <path className={ this.props.class }
                d={ this.props.path }
                onMouseDown={ this.play }
                onMouseOver={ this.play }
                onMouseOut={ this.handleMouseOut }
                onMouseUp={ this.handleMouseUp }
            >
                <bx-title>{ this.props.tone }</bx-title>
            </path>
        );
    }
}

export default Tone;