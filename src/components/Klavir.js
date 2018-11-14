import React, { Component } from 'react';
import Pizzicato from 'Pizzicato';
import dirke from '../data/dirke.json';
import frekvence from '../data/frekvence.json';
import Oktava from '../components/Oktava';


class Klavir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            klikno: false
        };
        this.sviraj = this.sviraj.bind(this);
        this.sirinaOktave = 330; 
        this.visinaKlavijature = 270;
        this.dirkiPoOktavi = 12;             
        this.belihDirkiPoOktavi = 7; 
        this.sirinaDirke = this.sirinaOktave / this.belihDirkiPoOktavi;
        this.donja = 24;
        this.brojOktava = 5;
        this.dirkiPosle = 5;
        this.belihDirkiPosle = 3;
        this.sirinaKlavira = (this.brojOktava * this.belihDirkiPoOktavi + this.belihDirkiPosle) * this.sirinaDirke;
        
    }
    
    sviraj(nota){
        let frekvenca = frekvence[nota + this.donja];
        var zvuk = new Pizzicato.Sound({
            source: 'wave',
            options: {
                type: 'sine',
                release: 1,
                volume: 0.2,
                frequency: frekvenca
            }
        });
        zvuk.play();
        this.setState({
            frekvenca: frekvenca
        })
    }
    
    render() {
        var viewBox = "0 0 " + this.sirinaKlavira + " " + this.visinaKlavijature;
        if(this.dirkiPosle > 0){
            this.brojOktava++;
        }
        var klavijatura = [];
        for(var o = 0; o < this.brojOktava; o++) {
            let transform = "translate(" + (this.sirinaOktave * o) + " 0)";
            var dokle = (o < this.brojOktava - 1) ? this.dirkiPoOktavi : this.dirkiPosle;

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
            <div>
                <svg id="klavir"
                    className="sviraj"
                    width={ this.sirinaKlavira }
                    viewBox={ viewBox }
                    version="1.1"
                >

                    <g id="klavijatura">
                        { klavijatura }
                    </g>
                </svg>
                <div>{ this.state.frekvenca }</div>
            </div>
        );
    }
}

export default Klavir;
