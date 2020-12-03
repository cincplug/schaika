import React, { Component } from 'react';


class Tone extends Component {
    constructor(props) {
        super(props);
        this.sviraj = this.sviraj.bind(this);
        this.pustio = this.pustio.bind(this);
        this.otišo = this.otišo.bind(this);
        
        this.state = {
            zvuk: null
        }
    }
    
    sviraj(e){
        if(e.buttons){
            var zvuk = this.props.sviraj(this.props.nota);

            this.setState({
                zvuk: zvuk
            });
        }
    }
    
    pustio(e){
        if(this.state.zvuk){
            this.props.ćuti(this.state.zvuk);
        }
    }
    
    otišo(e){
        if(this.state.zvuk){
            this.props.ćuti(this.state.zvuk);
        }
    }
    
    render() {        
        return (
            <path className={ this.props.klasa }
                d={ this.props.path }
                onMouseDown={ this.sviraj }
                onMouseOver={ this.sviraj }
                onMouseOut={ this.otišo }
                onMouseUp={ this.pustio }
            >
                <bx-title>{ this.props.tone }</bx-title>
            </path>
        );
    }
}

export default Tone;