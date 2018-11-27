import React, { Component } from 'react';
import Dirka from '../components/Dirka';


class Oktava extends Component {
    constructor(props) {
        super(props);
        this.sviraj = this.sviraj.bind(this);
        this.ćuti = this.ćuti.bind(this);
    }
    
    sviraj(nota){
        this.props.sviraj(nota);
    }
    
    ćuti(nota){
        this.props.ćuti(nota);
    }
    
    render() {        
        var oktava = [];
        for(var d = 0; d < this.props.dokle; d++) {

            let p = this.props.dirke[d][1].split(' ');
            var path = "M " + p[0] + " " + p[1] + " ";
            for(var i = 2; i < p.length; i+=2){
                path += "L " + p[i] + " " + p[i + 1] + " ";
            } 
            path += " Z";
            var dd = this.props.koja * this.props.dirkiPoOktavi + d;
            var jelCrna = ([1, 3, 6, 8, 10].indexOf(d) !== -1) ? 'crna' : 'bela';
            var klasa = "dirka " + jelCrna + " nije";
            var dirka = 
                <Dirka 
                    key={ 'd-' + d }
                    klasa={ klasa }
                    d={ path }
                    dd={ dd }
                    sviraj={ this.sviraj }
                    ćuti={ this.ćuti }
                    dirka={ this.props.dirke[this.props.koja][0] }
                />
            oktava.push(dirka);
            dd++;
        }
        return (
            <g className="oktava" transform={ this.props.transform }>
                { oktava }
            </g>
        );
    }
}

export default Oktava;
