import React, { Component } from 'react';
import context from '../services/context.js';
import dirke from '../data/dirke.json';
import note from '../data/note.json';
import frekvence from '../data/frekvence.json';
import Octave from './Octave';
import Controls from './Controls';
import Notation from './Notation';
import Clip from './Clip';

import './keyboard.css';

const sirinaOktave = 330; 
const visinaKlavijature = 270;
const dirkiPoOktavi = 12;             
const belihDirkiPoOktavi = 7; 
const dirkiPosle = 5;
const belihDirkiPosle = 3;
const oblici = ["sine", "triangle", "sawtooth", "square"];



class Keyboard extends Component {
    constructor(props) {
        super(props);
        
        this.tastatura = this.tastatura.bind(this);
        this.sviraj = this.sviraj.bind(this);
        this.ćuti = this.ćuti.bind(this);
        this.promeniProperty = this.promeniProperty.bind(this);
        this.promeniNotaciju = this.promeniNotaciju.bind(this);
        this.snimaj = this.snimaj.bind(this);
        this.odsvirajNotu = this.odsvirajNotu.bind(this);
        this.odsvirajPesmu = this.odsvirajPesmu.bind(this);
        this.makni = this.makni.bind(this);
        this.vrti = this.vrti.bind(this);
        
        let brojOctave = 5; 
        
        
        this.state = {
            počeo: '',
            snima: false,
            brojOctave: brojOctave,
            početna: 1,
            boja: 1,
            oblik: 0,
            atak: 1,
            rilis: 2,
            sustejn: 0,
            jačina: 5,
            frekvenca: null,
            pesme: [],
            notacija: 'en',
            dirkiUkupno: this.prebrojDirke(brojOctave)
        };
    }
    
    componentDidMount(){
        document.addEventListener('keyup', this.tastatura, false);
    }
    
    componentWillUnmount(){
        document.removeEventListener('keyup', this.tastatura, false);
    }
    
    tastatura(e){
        if(e.keyCode === 32){
            this.snimaj();
        }
    }
    
    prebrojDirke(brojOctave){
        return dirkiPoOktavi * brojOctave + dirkiPosle; 
    }
    
    promeniNotaciju(notacija){
        this.setState({
            notacija: notacija
        });
    }
    
    promeniProperty(svojstvo, akcija){
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
            if(this.state.početna + this.state.brojOctave > 9){
                if(svojstvo === 'početna'){
                    this.setState({
                        brojOctave: this.state.brojOctave - 1
                    });
                }
                if(svojstvo === 'brojOctave'){
                    this.setState({
                        početna: this.state.početna - 1
                    });
                }
            }
        });
        if(svojstvo === 'brojOctave') {
            this.setState({
                dirkiUkupno: this.prebrojDirke(vrednost)
            });
        }
        if(svojstvo === 'jačina') {

        }
    }
    
    odsvirajNotu(nota, otkad = 0, dokad = 0){
        otkad /= 1000;
        dokad /= 1000;
        var zvuk = [];
        for(var i = 0; i < this.state.boja; i++){
            
            let frekvenca = frekvence[nota + (i + this.state.početna) * dirkiPoOktavi];
            if(!this.state.počeo){
                this.setState({
                    počeo: ' jeste'
                })
            }
            
            var ton = context.createOscillator();
            ton.type = oblici[this.state.oblik];
            ton.frequency.value = frekvenca;
            var gain = context.createGain();
            ton.connect(gain);
            gain.connect(context.destination);

            var sad = context.currentTime;
            let smanji = Math.pow(this.state.oblik + 1, 2);
            
            var jačina = this.state.jačina / smanji / 4;
            gain.gain.setValueAtTime(jačina, sad);
            gain.gain.exponentialRampToValueAtTime(jačina, sad + otkad + this.state.atak / 10);
            gain.gain.exponentialRampToValueAtTime(jačina / 10, sad + otkad + this.state.atak / 10 + this.state.rilis / 5);
            ton.start(sad + otkad);
            if(dokad){
                ton.stop(sad + dokad);
            }
            
            this.setState({
                frekvenca: frekvenca,
                nota: note[this.state.notacija][nota % 12],
                oktava: Math.floor((nota + this.state.početna * dirkiPoOktavi) / dirkiPoOktavi)
            });
            
            zvuk.push(ton);
        }
        
        return zvuk;
    }
    
    sviraj(nota, pesma){

        var zvuk = this.odsvirajNotu(nota);        
        
        if(this.state.snima){
            var kad;
            if(this.pesma.note.length === 0){
                this.otkad = context.currentTime;
                kad = 0;
            } else {
                kad = context.currentTime - this.otkad;
            }
            this.pesma.note.push([
                nota,
                kad * 1000,
                0
            ])
        }
        
        return zvuk;
    }
    
    ćuti(zvuk){
            
        for(var ton in zvuk){
            // console.log(zvuk[ton]);
            zvuk[ton].stop(context.currentTime);
        }
        
        if(this.state.snima && this.pesma && this.pesma.note.length > 0){
            var kad = context.currentTime - this.otkad;
            this.pesma.note[this.pesma.note.length - 1][2] = kad * 1000;
        }
    }
    
    snimaj(){
        if(this.state.snima){
            if(this.pesma){
                if(this.pesma.note.length > 0){
                    this.pesma.traje = context.currentTime - this.otkad;
                    let p = this.state.pesme;
                    p.push(this.pesma);
                    this.setState({
                        pesme: p
                    })
                }
            }
            this.setState({
                snima: false
            });

        } else {
            this.otkad = context.currentTime;
            this.setState({
                snima: true
            });            
            this.pesma = {
                traje: 0,
                jelSvira: false,
                jelVrti: false,
                note: [],
                zvuci: {}
            };
        }
    }
    
    odsvirajPesmu(pesma, kojaPoRedu){
        var t = this;
        var p = this.state.pesme;
        var kolikoTraje = pesma.traje;
        pesma.jelSvira = true;
        setTimeout(function(){
            pesma.jelSvira = false;
            p[kojaPoRedu].jelSvira = false;
            t.setState({
                pesme: p
            });
            if(t.state.pesme[kojaPoRedu].jelVrti){
                t.odsvirajPesmu(pesma, kojaPoRedu);
            } 
        }, kolikoTraje * 1000);
        for(var n = 0; n < pesma.note.length; n++){
            t.odsvirajNotu(
                pesma.note[n][0], 
                pesma.note[n][1], 
                pesma.note[n][2]
            ); 
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
        let brojOctave = this.state.brojOctave;
        let sirinaDirke = sirinaOktave / belihDirkiPoOktavi;
        let sirinaKeyboarda = (brojOctave * belihDirkiPoOktavi + belihDirkiPosle) * sirinaDirke;
        let viewBox = "0 0 " + sirinaKeyboarda + " " + visinaKlavijature;
        if(dirkiPosle > 0){
            brojOctave++;
        }
        var klavijatura = [];
        for(var o = 0; o < brojOctave; o++) {
            let transform = "translate(" + (sirinaOktave * o) + " 0)";
            var dokle = (o < brojOctave - 1) ? dirkiPoOktavi : dirkiPosle;

            klavijatura.push(
                <Octave key={ 'o-' + o }
                    koja={ o }
                    transform={ transform }
                    dokle={ dokle }
                    dirke={ dirke }
                    sviraj={ this.sviraj }
                    ćuti={ this.ćuti }
                    dirkiPoOktavi={ dirkiPoOktavi } 
                />
            );
        }
        
        var notacije = [];
        for(var i in note){
            notacije.push(
                <Notation
                    key={ 'not' + i }
                    notacija={ i }
                    jelOva={ i === this.state.notacija }
                    promeniNotaciju={ this.promeniNotaciju }/>
            )
        }
        
        var pesme = [];
        for(var p = 0; p < this.state.pesme.length; p++){
            pesme.push(
                <Clip
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
            <div id="keyboard">
                <div id="kutija">
                    <Controls
                        brojOctave={ this.state.brojOctave }
                        boja={ this.state.boja }
                        oblici={ oblici }
                        oblik={ this.state.oblik }
                        početna={ this.state.početna }
                        atak={ this.state.atak }
                        rilis={ this.state.rilis }
                        sustejn={ this.state.sustejn }
                        jačina={ this.state.jačina }
                        promeniProperty={ this.promeniProperty }
                        snimaj={ this.snimaj }
                        snima={ this.state.snima }
                    />

                    <svg id="klavijatura"
                        className="sviraj"
                        width={ sirinaKeyboarda }
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

export default Keyboard;
