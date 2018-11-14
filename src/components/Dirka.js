import React, { Component } from 'react';


class Dirka extends Component {
    constructor(props) {
        super(props);
        this.sviraj = this.sviraj.bind(this);
    }
    
    sviraj(dd){
        this.props.sviraj(dd);
    }
    
    render() {        
        return (
            <path className={ this.props.klasa }
                d={ this.props.d }
                onClick={ () => this.sviraj(this.props.dd) }>
                <bx-title>{ this.props.dirka }</bx-title>
            </path>
        );
    }
}

export default Dirka;