import React, { Component } from 'react';


class Dirka extends Component {
    constructor(props) {
        super(props);
        this.sviraj = this.sviraj.bind(this);
        this.pustio = this.pustio.bind(this);
        this.otišo = this.otišo.bind(this);
    }
    
    sviraj(e){
        if(e.buttons){
            this.props.sviraj(this.props.dd);
        }
    }
    
    pustio(e){
        this.props.ćuti(this.props.dd);
    }
    
    otišo(e){
        this.props.ćuti(this.props.dd);
    }
    
    render() {        
        return (
            <path className={ this.props.klasa }
                d={ this.props.d }
                onMouseDown={ this.sviraj }
                onMouseOver={ this.sviraj }
                onMouseOut={ this.otišo }
                onMouseUp={ this.pustio }
            >
                <bx-title>{ this.props.dirka }</bx-title>
            </path>
        );
    }
}

export default Dirka;