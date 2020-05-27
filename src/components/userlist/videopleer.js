import React, {Component} from "react";
import ReactPlayer from "react-player";
import { useInView } from "react-intersection-observer";
import { connect } from 'react-redux';

import { playVideo, setNowVideoPlay } from '../../actions/video';

class VideoPleer extends Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
        this.state = {
            autoplay: false,
            canPLay: false
        }
        this.handlePause = this.handlePause.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
    }
    handleScroll() {
        this.changeStatusVideo();
        this.canPlayThisVideo();
    }
    changeStatusVideo() {
        //когда у нас проигрывается это видео
        if (this.props.nowPlayVideo == this.props.id) {
            //и когда вышла за область видимости посылаем null значение
            if (!this.inView()) {
                this.props.setNowVideoPlayAction(null);
            }
        }
        //когда свободно значение проигрываемого видео
        if (this.props.nowPlayVideo === null) {
            if (this.inView()) {
                this.props.setNowVideoPlayAction(this.props.id);
            }
        }
    }
    canPlayThisVideo() {
        this.setState({
            canPlay: this.props.nowPlayVideo == this.props.id
        });
        return false;
    }
    inView() {
        const videoBounding = this.videoRef.current.getBoundingClientRect();
        const centerVideo = videoBounding.y + videoBounding.height / 2;
        const centerScreen = document.documentElement.clientHeight / 2;
        const rootMargin = 100;
        const topRange = centerScreen - rootMargin - videoBounding.height / 2;
        const bottomRange = centerScreen + rootMargin + videoBounding.height / 2;

        return (topRange < centerVideo && centerVideo < bottomRange);
    }
    componentDidMount() {
        //следим за скролом
        window.addEventListener('scroll', () => this.handleScroll(), true);
        //то же что в скроле
        setTimeout(() => {
            this.handleScroll();
        }, 100);
    }
    handlePause() {
        //если пауза произошла в области видимости,
        //будем считать, что вызвана вручную
        if (this.inView()) {
            this.props.playVideoAction(false)
        }
    }
    handlePlay() {
        //если Play произошел НЕ в области видимости,
        //будем считать, что вызвана вручную
        if (!this.inView()) {
            this.props.playVideoAction(true)
        }
    }
    render() {
        const { canAllVideoPlaying, nowPlayVideo, video, id } = this.props;
        const { autoplay } = this.state;
        const canPlayThisVideo = canAllVideoPlaying && this.state.canPlay;
        return (
            <div className="videoplayer" ref={this.videoRef}>
                <ReactPlayer
                    url={`/static/videos/${video}.mp4`}
                    playing={canPlayThisVideo}
                    loop={true}
                    width="100%"
                    height="250px"
                    controls={true}
                    onPause={() => this.handlePause()}
                    onPlay={() => this.handlePlay()}
                />
            </div>
        );
    }
}

export const mapStateToProps = state => {
    return {
        canAllVideoPlaying: state.canAllVideoPlaying,
        nowPlayVideo: state.nowPlayVideo,
        lang: state.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        playVideoAction: (result) => dispatch(playVideo(result)),
        setNowVideoPlayAction: (id) => dispatch(setNowVideoPlay(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPleer);

