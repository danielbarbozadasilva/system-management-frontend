import React, {Component} from 'react';
import videoMeu from './videoMeu'

class Video extends Component {
    constructor (props) {
        super(props);

        this.state = {
            videoURL={videoMeu}
        }
    }

    render () {
        return (
          <div id="divVideoYoga" className="row pb-5">
          <header id="topo" className="col-md-12 p-0">
              <div className="fullscreen-video-wrap">
                  <video id="background-video" loop autoPlay >
                      <source src={this.state.videoURL} type="video/mp4" />
                      <source src={this.state.videoURL} type="video/ogg" />
                  </video>
            </div>
                <div className="header-overlay">
                    <p id="tyMaquina" className="line typing-animation">Descubra <br />o seu lado 'ZEN'</p>
                </div>
            </header>
            </div>

        )
    }
};

export default Video;