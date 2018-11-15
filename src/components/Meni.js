import React, { Component } from 'react';
import BrojOktava from '../components/BrojOktava';


class Meni extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brojOktava: 5
        };
        this.sviraj = this.sviraj.bind(this);
        this.promeniBrojOktava = this.promeniBrojOktava.bind(this);
        
    }
    
    promeniBrojOktava(akcija){
        this.promeniBrojOktava();
    }
    
    sviraj(nota){
        let frekvenca = frekvence[nota + this.donja];
        let jacina = 1 - nota / this.dirkiUkupno;
        console.log(jacina);
        let zvuk = new Pizzicato.Sound({
            source: 'wave',
            options: {
                type: 'sine',
                release: 1,
                volume: 1 - nota / this.dirkiUkupno,
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
            <div>

                <BrojOktava
                    brojOktava={ this.state.brojOktava }
                    promeniBrojOktava={ this.promeniBrojOktava }
                />

            </div>
        );
    }
}

export default Meni;
