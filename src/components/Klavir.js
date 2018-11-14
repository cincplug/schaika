import React, { Component } from 'react';


class Klavir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            klikno: false
        };
        // this.sviraj = this.sviraj.bind(this);
        this.note = [
            ['c', '0 0 25.443 0 25.443 144.641 47.178 144.641 47.178 257.885 0 257.885'],
            ['cis', '25.443 0 59.035 0 59.035 144.641 25.443 144.641'],
            ['d', '94.356 257.885 47.178 257.885 47.178 144.641 59.035 144.641 59.035 0 82.56 0 82.56 144.641 94.356 144.641'],
            ['dis', '82.56 0 116.152 0 116.152 144.641 82.56 144.641'],
            ['e', '141.534 0 141.534 257.885 94.356 257.885 94.356 144.641 116.152 144.641 116.152 0'],
            ['f', '141.534 0 166.916 0 166.916 144.641 188.712 144.641 188.712 257.885 141.534 257.885'],
            ['fis', '166.916 0 199.508 0 199.508 144.641 166.916 144.641'],
            ['g', '235.89 257.885 188.712 257.885 188.712 144.641 197.464 144.641 197.464 0 219.094 0 219.094 144.641 235.89 144.641'],
            ['gis', '219.094 0 252.686 0 252.686 144.641 219.094 144.641'],
            ['a', '283.068 257.885 235.89 257.885 235.89 144.641 252.686 144.641 252.686 0 271.272 0 271.272 144.641 283.068 144.641'],
            ['b', '304.864 0 304.864 144.641 271.272 144.641 271.272 0'],
            ['h', '330.246 0 330.246 257.885 283.068 257.885 283.068 144.641 304.864 144.641 304.864 0']
        ];
        this.sirinaOktave = 330; 
        this.visinaKlavijature = 270;
        this.dirki = 12;             
        this.belihDirki = 7; 
        this.sirinaDirke = this.sirinaOktave / this.belihDirki;
        
        this.brojOktava = 5;
        this.dirkiPosle = 5;
        this.belihDirkiPosle = 3;
        this.sirinaKlavira = (this.brojOktava * this.belihDirki + this.belihDirkiPosle) * this.sirinaDirke;
        
    }
    
    render() {
        var viewBox = "0 0 " + this.sirinaKlavira + " " + this.visinaKlavijature;
        var dd = 0; 
        if(this.dirkiPosle > 0){
            this.brojOktava++;
        }
        var klavijatura = [];
        for(var o = 0; o < this.brojOktava; o++) {
            var oktava = [];
            let transform = "translate(" + (this.sirinaOktave * o) + " 0)";
            var dokle = (o < this.brojOktava - 1) ? this.dirki : this.dirkiPosle;

            for(var d = 0; d < dokle; d++) {

                let p = this.note[d][1].split(' ');
                var path = "M " + p[0] + " " + p[1] + " ";
                for(var i = 2; i < p.length; i+=2){
                    path += "L " + p[i] + " " + p[i + 1] + " ";
                } 
                path += " Z";
                var jelCrna = ([1, 3, 6, 8, 10].indexOf(d) !== -1) ? 'crna' : 'bela';
                var klasa = "dirka " + jelCrna + " nije";
                var dirka = 
                    <path data-dirka={ dd } key={ 'd-' + d } className={ klasa } d={ path }>
                        <bx-title>{ this.note[o][0] }</bx-title>
                    </path>;
                    
                oktava.push(dirka);
                dd++;
            }

            klavijatura.push(
                <g className="oktava" key={ 'o-' + o } transform={ transform }>
                    { oktava }
                </g>
            );
        }
        
        
        return (
            <svg id="klavir"
                className="sviraj"
                width={ this.sirinaKlavira }
                viewBox={ viewBox }
            version="1.1">

                <g id="klavijatura">
                    { klavijatura }
                </g>
            </svg>
        );
    }
}

export default Klavir;
