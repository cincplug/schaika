import React, { Component } from 'react';
import Pizzicato from 'Pizzicato';
import dirke from '../data/dirke.json';
import frekvence from '../data/frekvence.json';
import Oktava from '../components/Oktava';
import Tabla from '../components/Tabla';

import './klavir.css'


class Klavir extends Component {
    constructor(props) {
        super(props);

        this.sviraj = this.sviraj.bind(this);
        this.promeniSvojstvo = this.promeniSvojstvo.bind(this);
        
        
        this.sirinaOktave = 330; 
        this.visinaKlavijature = 270;
        this.dirkiPoOktavi = 12;             
        this.belihDirkiPoOktavi = 7; 
        this.sirinaDirke = this.sirinaOktave / this.belihDirkiPoOktavi;
        this.donja = 12;
        this.dirkiPosle = 5;
        this.belihDirkiPosle = 3;
        
        let brojOktava = 5;
        this.state = {
            brojOktava: brojOktava,
            dirkiUkupno: this.prebrojDirke(brojOktava)
        };
    }
    
    prebrojDirke(brojOktava){
        return this.dirkiPoOktavi * brojOktava + this.dirkiPosle; 
    }
    
    promeniSvojstvo(akcija){
        var zaKoliko = (akcija === 'povecaj') ? 1 : -1;
        var brojOktava = this.state.brojOktava + zaKoliko
        this.setState({
            brojOktava: brojOktava,
            dirkiUkupno: this.prebrojDirke(brojOktava)
        });
    }
    
    sviraj(nota){
        let frekvenca = frekvence[nota + this.donja];
        let jacina = 0.7 - nota / this.state.dirkiUkupno;
        console.log(jacina);
        let zvuk = new Pizzicato.Sound({
            source: 'wave',
            options: {
                type: 'sine',
                release: 1,
                volume: 1 - nota / this.state.dirkiUkupno,
                frequency: frekvenca
            }
        });
        zvuk.play();
        this.setState({
            frekvenca: frekvenca
        });
    }
    
    render() {
        let brojOktava = this.state.brojOktava;
        let sirinaKlavira = (this.state.brojOktava * this.belihDirkiPoOktavi + this.belihDirkiPosle) * this.sirinaDirke;
        let viewBox = "0 0 " + sirinaKlavira + " " + this.visinaKlavijature;
        if(this.dirkiPosle > 0){
            brojOktava++;
        }
        var klavijatura = [];
        for(var o = 0; o < brojOktava; o++) {
            let transform = "translate(" + (this.sirinaOktave * o) + " 0)";
            var dokle = (o < brojOktava - 1) ? this.dirkiPoOktavi : this.dirkiPosle;

            klavijatura.push(
                <Oktava key={ 'o-' + o }
                    koja={ o }
                    transform={ transform }
                    dokle={ dokle }
                    dirke={ dirke }
                    sviraj={ this.sviraj }
                    dirkiPoOktavi={ this.dirkiPoOktavi } 
                />
            );
        }
        
        
        
        return (
            <div id="klavir">
                <Tabla
                    brojOktava={ this.state.brojOktava }
                    promeniSvojstvo={ this.promeniSvojstvo }
                    limit={{
                        donji: 1,
                        gornji: 7
                    }}
                />
                <div className="klavir-auter">
                    <svg id="klavijatura"
                        className="sviraj"
                        width={ sirinaKlavira }
                        viewBox={ viewBox }
                        version="1.1"
                    >
                        <g>
                            { klavijatura }
                        </g>
                    </svg>
                </div>

            </div>
        );
    }
}

export default Klavir;
