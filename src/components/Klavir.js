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
        // this.zvuci = new Pizzicato.Group();
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
            boja: 1,
            dirkiUkupno: this.prebrojDirke(brojOktava)
        };
    }
    
    prebrojDirke(brojOktava){
        return this.dirkiPoOktavi * brojOktava + this.dirkiPosle; 
    }
    
    promeniSvojstvo(svojstvo, akcija){
        var zaKoliko = (akcija === 'povecaj') ? 1 : -1;
        var vrednost = this.state[svojstvo] + zaKoliko
        this.setState({
            [svojstvo]: vrednost
        });
        if(svojstvo === 'brojOktava') {
            this.setState({
                dirkiUkupno: this.prebrojDirke(vrednost)
            });
        }
    }
    
    sviraj(nota){

        for(var i = 0; i < this.state.boja; i++){
            let frekvenca = frekvence[nota + i * this.dirkiPoOktavi + this.donja];
            let jacina = (1 - nota / this.state.dirkiUkupno) / (i + 1) / this.state.boja;
            console.log(jacina);
            let zvuk = new Pizzicato.Sound({
                source: 'wave',
                options: {
                    type: 'sine',
                    release: 1,
                    volume: jacina,
                    frequency: frekvenca
                }
            });
            // this.zvuci.addSound(zvuk);
            zvuk.play();
        }
        // var kolkoZvuka = this.zvuci.sounds.length;
        // for(var i = 0; i < kolkoZvuka; i++){
        //     this.zvuci.sounds[i].volume /= i / 2;
        // }
    }
    
    render() {
        let brojOktava = this.state.brojOktava;
        let sirinaKlavira = (brojOktava * this.belihDirkiPoOktavi + this.belihDirkiPosle) * this.sirinaDirke;
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
                    boja={ this.state.boja }
                    promeniSvojstvo={ this.promeniSvojstvo }
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
