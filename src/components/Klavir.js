import React, { Component } from 'react';
import Pizzicato from 'Pizzicato';
import dirke from '../data/dirke.json';
import frekvence from '../data/frekvence.json';
import Oktava from '../components/Oktava';
import Tabla from '../components/Tabla';
import Notacija from '../components/Notacija';
import Pesma from '../components/Pesma';

import './klavir.css'


class Klavir extends Component {
    constructor(props) {
        super(props);
        
        this.sviraj = this.sviraj.bind(this);
        this.promeniSvojstvo = this.promeniSvojstvo.bind(this);
        this.promeniNotaciju = this.promeniNotaciju.bind(this);
        this.snimaj = this.snimaj.bind(this);
        this.odsvirajPesmu = this.odsvirajPesmu.bind(this);
        this.makni = this.makni.bind(this);
        this.vrti = this.vrti.bind(this);
        
        this.sirinaOktave = 330; 
        this.visinaKlavijature = 270;
        this.dirkiPoOktavi = 12;             
        this.belihDirkiPoOktavi = 7; 
        this.sirinaDirke = this.sirinaOktave / this.belihDirkiPoOktavi;
        this.donja = 12;
        this.dirkiPosle = 5;
        this.belihDirkiPosle = 3;
        this.note = {
            'en': ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'],
            'ger': ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'b', 'h'],
            'lat': ['do', 'do#', 're', 're#', 'mi', 'fa', 'fa#', 'sol', 'sol#', 'la', 'la#', 'si'],
        };
                
        let brojOktava = 5; 
        
        this.state = {
            počeo: '',
            snima: false,
            brojOktava: brojOktava,
            početna: 1,
            boja: 2,
            kontinuitet: 6,
            jačina: 5,
            frekvenca: null,
            pesme: [],
            notacija: 'en',
            dirkiUkupno: this.prebrojDirke(brojOktava)
        };
    }
    
    prebrojDirke(brojOktava){
        return this.dirkiPoOktavi * brojOktava + this.dirkiPosle; 
    }
    
    promeniNotaciju(notacija){
        this.setState({
            notacija: notacija
        });
    }
    
    promeniSvojstvo(svojstvo, akcija){
        var vrednost;
        switch(akcija){
            case 'povecaj':
                vrednost = this.state[svojstvo] + 1;
                break;
            case 'smanji':
                vrednost = this.state[svojstvo] - 1;
                break;
            case 'nula':
                vrednost = 0;
                if(svojstvo === 'jačina' && this.state.jačina === 0) {
                    vrednost = 1;
                }
                break;
            default:
                break;
        }
        this.setState({
            [svojstvo]: vrednost
        }, function(){
            if(this.state.početna + this.state.brojOktava > 9){
                if(svojstvo === 'početna'){
                    this.setState({
                        brojOktava: this.state.brojOktava - 1
                    });
                }
                if(svojstvo === 'brojOktava'){
                    this.setState({
                        početna: this.state.početna - 1
                    });
                }
            }
        });
        if(svojstvo === 'brojOktava') {
            this.setState({
                dirkiUkupno: this.prebrojDirke(vrednost)
            });
        }
        if(svojstvo === 'jačina') {
            Pizzicato.volume = vrednost / 10;
        }
    }
    
    sviraj(nota){

        for(var i = 0; i < this.state.boja; i++){
            let frekvenca = frekvence[nota + i * this.dirkiPoOktavi + this.state.početna * this.dirkiPoOktavi];
            let jačina = (1 - nota / this.state.dirkiUkupno) / (i + 1) / this.state.boja;
            if(typeof this.zvuci === 'undefined'){
                Pizzicato.volume = this.state.jačina / 10;
                this.zvuci = new Pizzicato.Group();
                this.setState({
                    počeo: ' jeste'
                })
            }
            
            let zvuk = new Pizzicato.Sound({
                source: 'wave',
                options: {
                    type: 'triangle',
                    release: 1,
                    volume: jačina,
                    frequency: frekvenca
                }
            });
            this.zvuci.addSound(zvuk);
            zvuk.play();
            this.setState({
                frekvenca: frekvenca,
                nota: this.note[this.state.notacija][nota % 12],
                oktava: Math.floor((nota + this.state.početna * this.dirkiPoOktavi) / this.dirkiPoOktavi)
            })
        }
        var kolkoZvuka = this.zvuci.sounds.length;
        
        if(kolkoZvuka > this.state.kontinuitet * this.state.boja){
            for(var ii = 0; ii < this.state.boja; ii++){
                this.zvuci.sounds[ii].stop();
                this.zvuci.removeSound(this.zvuci.sounds[ii]);
            }
        }
        
        if(this.state.snima){
            var kad;
            if(this.pesma.note.length === 0){
                this.otkad = Date.now();
                kad = 0;
            } else {
                kad = Date.now() - this.otkad;
            }
            this.pesma.note.push([
                nota,
                kad
            ])
        }
    }
    
    snimaj(){
        if(this.state.snima){
            if(this.pesma && this.pesma.note.length > 0){
                this.pesma.traje = Date.now() - this.otkad;
                let p = this.state.pesme;
                p.push(this.pesma);
                this.setState({
                    pesme: p
                })
            }
            if(this.zvuci){
                this.zvuci.stop();
                this.zvuci.sounds = [];
            }
            this.setState({
                snima: false
            });
        } else {
            this.otkad = 0;
            this.setState({
                snima: true
            });            
            this.pesma = {
                traje: 0,
                jelSvira: false,
                jelVrti: false,
                note: []
            };
        }
    }
    
    odsvirajPesmu(pesma, kojaPoRedu){
        var t = this;
        var p = this.state.pesme;
        var sviraj = this.sviraj;
        var kolikoTraje = pesma.traje;
        var z = this.zvuci;
        pesma.jelSvira = true;
        setTimeout(function(){
            z.stop();
            z.sounds = [];
            pesma.jelSvira = false;
            p[kojaPoRedu].jelSvira = false;
            t.setState({
                pesme: p
            });
            if(t.state.pesme[kojaPoRedu].jelVrti){
                t.odsvirajPesmu(pesma, kojaPoRedu);
            } 
        }, kolikoTraje);
        for(var n = 0; n < pesma.note.length; n++){
            (function(ii) {
                setTimeout(function() { 
                    sviraj(pesma.note[ii][0]); 
                }, Math.floor(pesma.note[ii][1]));
            })(n);
        }
    }
    
    makni(pesma){
        let p = this.state.pesme;
        p.splice(pesma, 1);
        this.setState({
            pesme: p
        });
    }
    
    vrti(pesma){
        let p = this.state.pesme;
        p[pesma].jelVrti = !p[pesma].jelVrti;
        this.setState({
            pesme: p
        });
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
        
        var notacije = [];
        for(var i in this.note){
            notacije.push(
                <Notacija
                    key={ 'not' + i }
                    notacija={ i }
                    jelOva={ i === this.state.notacija }
                    promeniNotaciju={ this.promeniNotaciju }/>
            )
        }
        
        var pesme = [];
        for(var p = 0; p < this.state.pesme.length; p++){
            pesme.push(
                <Pesma
                    key={ "pesma-" + p }
                    kojaPoRedu={ p }
                    pesma={ this.state.pesme[p] }
                    dirkiUkupno={ this.state.dirkiUkupno }
                    jelSvira={ this.state.pesme[p].jelSvira }
                    jelVrti={ this.state.pesme[p].jelVrti }
                    odsvirajPesmu={ this.odsvirajPesmu }
                    makni={ this.makni }
                    vrti={ this.vrti }
                />
            )
        }
        
        
        return (
            <div id="klavir">
                <div id="kutija">
                    <Tabla
                        brojOktava={ this.state.brojOktava }
                        boja={ this.state.boja }
                        početna={ this.state.početna }
                        kontinuitet={ this.state.kontinuitet }
                        jačina={ this.state.jačina }
                        promeniSvojstvo={ this.promeniSvojstvo }
                        snimaj={ this.snimaj }
                        snima={ this.state.snima }
                    />

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

                    <div className={"autput" + this.state.počeo}>
                        <div className="stavka">
                            <span className="label">Base note: </span>
                            <span>{ this.state.nota }</span>
                            <div className="notacije">
                                <span className="label">Notation:</span> { notacije }
                            </div>
                        </div>
                        <div className="stavka">
                            <span className="label">Base octave: </span>
                            <span>{ this.state.oktava }</span>
                        </div>
                        <div className="stavka">
                            <span className="label">Base frequency: </span>
                            <span>{ this.state.frekvenca } Hz</span>
                        </div>
                    </div>
                </div>
                <div className="pesme">
                    { pesme }
                </div>

            </div>
        );
    }
}

export default Klavir;
