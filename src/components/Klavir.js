import React, { Component } from 'react';
import Pizzicato from 'Pizzicato';
import dirke from '../data/dirke.json';
import note from '../data/note.json';
import frekvence from '../data/frekvence.json';
import Oktava from '../components/Oktava';
import Tabla from '../components/Tabla';
import Notacija from '../components/Notacija';
import Pesma from '../components/Pesma';

import './klavir.css'

const sirinaOktave = 330; 
const visinaKlavijature = 270;
const dirkiPoOktavi = 12;             
const belihDirkiPoOktavi = 7; 
const dirkiPosle = 5;
const belihDirkiPosle = 3;
const oblici = ["sine", "square", "sawtooth", "triangle"];

class Klavir extends Component {
    constructor(props) {
        super(props);
        
        this.sviraj = this.sviraj.bind(this);
        this.ćuti = this.ćuti.bind(this);
        this.promeniSvojstvo = this.promeniSvojstvo.bind(this);
        this.promeniNotaciju = this.promeniNotaciju.bind(this);
        this.snimaj = this.snimaj.bind(this);
        this.odsvirajPesmu = this.odsvirajPesmu.bind(this);
        this.makni = this.makni.bind(this);
        this.vrti = this.vrti.bind(this);
                
        let brojOktava = 5; 
        
        this.state = {
            počeo: '',
            svira: [],
            snima: false,
            brojOktava: brojOktava,
            početna: 1,
            boja: 1,
            oblik: 0,
            kontinuitet: 6,
            jačina: 5,
            frekvenca: null,
            pesme: [],
            notacija: 'en',
            dirkiUkupno: this.prebrojDirke(brojOktava)
        };
    }
    
    prebrojDirke(brojOktava){
        return dirkiPoOktavi * brojOktava + dirkiPosle; 
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
            let frekvenca = frekvence[nota + i * dirkiPoOktavi + this.state.početna * dirkiPoOktavi];
            // let jačina = (1 - nota / this.state.dirkiUkupno) / (i + 1) / this.state.boja;
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
                    // audioFunction: function(e) {
                    //     var output = e.outputBuffer.getChannelData(0);
                    //     for (var i = 0; i < e.outputBuffer.length; i++){
                    //         let h = i;
                    //         output[i] = h / 2;
                    //     }
                    // },
                    release: 0.7,
                    volume: this.state.jačina,
                    frequency: frekvenca,
                    type: oblici[this.state.oblik]
                }
            });
            this.zvuci.addSound(zvuk);
            zvuk.play();
            var s = this.state.svira;
            s.push({
                nota: nota,
                zvuk: zvuk
            });
            
            this.setState({
                svira: s,
                frekvenca: frekvenca,
                nota: note[this.state.notacija][nota % 12],
                oktava: Math.floor((nota + this.state.početna * dirkiPoOktavi) / dirkiPoOktavi)
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
                kad,
                0
            ])
        }
    }
    
    ćuti(nota){
        var s = this.state.svira;
        var n = s.find(ss => ss.nota === nota);
        s.splice(n, 1);
        this.setState({
            svira: s
        });
        if(n && n.zvuk){
            n.zvuk.stop();
        }
        
        if(this.state.snima && this.pesma && this.pesma.note.length > 0){
            var kad = Date.now() - this.otkad;
            this.pesma.note[this.pesma.note.length - 1][2] = kad;
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
            console.log(JSON.stringify(this.pesma.note, null, 4));
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
                    t.sviraj(pesma.note[ii][0]); 
                }, Math.floor(pesma.note[ii][1]));
                setTimeout(function() { 
                    t.ćuti(pesma.note[ii][0]); 
                }, Math.floor(pesma.note[ii][2]));
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
        let sirinaDirke = sirinaOktave / belihDirkiPoOktavi;
        let sirinaKlavira = (brojOktava * belihDirkiPoOktavi + belihDirkiPosle) * this.sirinaDirke;
        let viewBox = "0 0 " + sirinaKlavira + " " + visinaKlavijature;
        if(dirkiPosle > 0){
            brojOktava++;
        }
        var klavijatura = [];
        for(var o = 0; o < brojOktava; o++) {
            let transform = "translate(" + (sirinaOktave * o) + " 0)";
            var dokle = (o < brojOktava - 1) ? dirkiPoOktavi : dirkiPosle;

            klavijatura.push(
                <Oktava key={ 'o-' + o }
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
                        oblici={ oblici }
                        oblik={ this.state.oblik }
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
