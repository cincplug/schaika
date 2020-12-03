import React, { Component } from 'react';
import Tone from './Tone';


class Octave extends Component {
    constructor(props) {
        super(props);
        this.sviraj = this.sviraj.bind(this);
        this.ćuti = this.ćuti.bind(this);
    }
    
    sviraj(nota){
        return this.props.sviraj(nota);
    }
    
    ćuti(zvuk){
        this.props.ćuti(zvuk);
    }
    
    render() {        
        var oktava = [];
        for(var polustepen = 0; polustepen < this.props.dokle; polustepen++) {

            let p = this.props.dirke[polustepen][1].split(' ');
            var path = "M " + p[0] + " " + p[1] + " ";
            for(var i = 2; i < p.length; i+=2){
                path += "L " + p[i] + " " + p[i + 1] + " ";
            } 
            path += " Z";
            var nota = this.props.koja * this.props.dirkiPoOktavi + polustepen;
            var jelCrna = ([1, 3, 6, 8, 10].indexOf(polustepen) !== -1) ? 'crna' : 'bela';
            var klasa = "tone " + jelCrna + " nije";

            var tone = 
                <Tone 
                    key={ 'd-' + polustepen }
                    klasa={ klasa }
                    path={ path }
                    nota={ nota }
                    sviraj={ this.sviraj }
                    ćuti={ this.ćuti }
                    tone={ this.props.dirke[this.props.koja][0] }
                />
            oktava.push(tone);
            nota++;
        }
        return (
            <g className="oktava" transform={ this.props.transform }>
                { oktava }
            </g>
        );
    }
}

export default Octave;
