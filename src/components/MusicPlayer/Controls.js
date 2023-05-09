import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrSongIndex } from "../../state";
import back from "../../assets/images/back.svg";
import dots from "../../assets/images/dots.svg";
import playbtn from "../../assets/images/playbtn.svg";
import pausebtn from "../../assets/images/pausebtn.svg";
import forward from "../../assets/images/forward.svg";
import speaker from "../../assets/images/speaker.svg";
import mute from "../../assets/images/mute.png";
import "../../styles/customize-progress-bar.css";

const Controls = ({
    audioRef,
    progressBarRef,
    duration,
    setTimeProgress,
    tracks,
    trackIndex,
    setTrackIndex,
    setCurrentTrack,
    handleNext,
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(60);
    const [muteVolume, setMuteVolume] = useState(false);

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const playAnimationRef = useRef();
    const dispatch = useDispatch();

    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
            "--range-progress",
            `${(progressBarRef.current.value / duration) * 100}%`
        );

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef, repeat]);

    const handlePrevious = () => {
        if (trackIndex === 0) {
            let lastTrackIndex = tracks.length - 1;
            setTrackIndex(lastTrackIndex);
            setCurrentTrack(tracks[lastTrackIndex]);
            dispatch(
                setCurrSongIndex({
                    currSongIndex: lastTrackIndex,
                })
            );
        } else {
            setTrackIndex((prev) => prev - 1);
            setCurrentTrack(tracks[trackIndex - 1]);
            dispatch(
                setCurrSongIndex({
                    currSongIndex: trackIndex - 1,
                })
            );
        }
    };

    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volume / 100;
            audioRef.current.muted = muteVolume;
        }
    }, [volume, audioRef, muteVolume]);

    return (
        <div className="controls-wrapper">
            <div className="controls">
                <div className="circle">
                    <img src={dots} />
                </div>
                <div className="control-middle-div">
                    <img onClick={handlePrevious} src={back} />
                    <div onClick={togglePlayPause}>{isPlaying ? <img src={playbtn} /> : <img src={pausebtn} />}</div>
                    <img onClick={handleNext} src={forward} />
                </div>
                <div onClick={() => setMuteVolume((prev) => !prev)} className="circle">
                    <img
                        src={muteVolume ? mute : speaker}
                        style={{ height: "16px", width: "20px" }}
                        alt="mute/unmute"
                    />
                </div>
            </div>
        </div>
    );
};

export default Controls;
