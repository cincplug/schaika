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
            this.props.sviraj(this.props.nota);
        }
    }
    
    pustio(e){
        this.props.ćuti();
    }
    
    otišo(e){
        this.props.ćuti();
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
                <bx-title>{ this.props.dirka }</bx-title>
            </path>
        );
    }
}

export default Dirka;