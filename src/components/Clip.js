import React, { Component } from 'react';

const widthRatio = 10;
const heightRatio = 1;

class Clip extends Component {
    
    playClip(){
        this.props.playClip(this.props.clip, this.props.index);
    }
    
    remove(){
        this.props.remove(this.props.index);
    }
    
    repeat(){
        this.props.repeat(this.props.index);
    }
    
    
    
    render() {
        var className = "clip clip-" + this.props.index.toString() +
            " isPlaying-" + this.props.clip.isPlaying.toString() +  
            " isRepeat-" + this.props.clip.isRepeat.toString();  
        var tones = [];
        var clip = this.props.clip;
        for(var n in clip.tones){
            tones.push(
                <rect
                    className="nota"
                    key={ "rec-" + n + '-' + this.props.index }
                    x={ Math.floor(clip.tones[n][1] / widthRatio) } 
                    y={ Math.floor((this.props.tonesCount - clip.tones[n][0]) / heightRatio) } 
                    width={ Math.floor((clip.tones[n][2] - clip.tones[n][1]) / widthRatio) } 
                    height="1" 
                />
            );
        }
        var width = Math.floor(clip.duration * 1000 / widthRatio);
        var height = this.props.tonesCount / heightRatio;
        
        var where;
        if(this.props.clip.isPlaying){
            where = <div 
                className="where"
                style={{ animationDuration: clip.duration * 1000 + 'ms' }}
            ></div>;
        }
        
        return (
            <div className={ className }>

                <div className="block name-clips">
                    Pattern { this.props.index + 1 }
                </div>

                <div className="block tones">
                    <svg 
                        height={ height }
                        width={ width }
                        viewBox={"0 0 " + width + " " + height}
                    >
                        <g>
                            { tones }
                        </g>
                    </svg>
                </div>

                <div className="overlay">

                    <div 
                        className="play"
                        onClick={ ()=>this.playClip() }
                    ></div>

                    <div
                        className="repeat"
                        onClick={ ()=>this.repeat() }
                    ></div>

                    <div
                        className="move"
                        onClick={ ()=>this.remove() }
                    ></div>

                </div>

                { where }

            </div>
        );
    }
}

export default Clip;
