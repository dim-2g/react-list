import React from "react";
import ReactPlayer from "react-player";
import { useInView } from "react-intersection-observer";

const VideoPleer = (props) => {
    const [ref, inView] = useInView({
        threshold: 1
    });
    return (
        <div ref={ref}>
            <ReactPlayer
                url={`/static/videos/${props.video}.mp4`}
                playing={inView}
                width="100%"
                height="250px"
            />
        </div>
    );
};

export default VideoPleer;
