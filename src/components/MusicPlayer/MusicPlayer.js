import AudioPlayer from "./AudioPlayer";
import { useSelector } from "react-redux";
import MenuDrawer from "../Menu";
import CircularLoader from "../Loader/index";
import "./MusicPlayer.css";

const MusicPlayer = () => {
    const data = useSelector((state) => state.slice.listOfSongs);
    const currIndex = useSelector((state) => state.slice.currSongIndex);

    return (
        <div className="player">
            <MenuDrawer />
            {data.length != 0 ? (
                <div>
                    <p className="music-name bcBoldFont">{data[currIndex].title}</p>
                    <p className="artist-name">{data[currIndex].artist}</p>
                    <div className="controls">
                        <AudioPlayer />
                    </div>
                </div>
            ) : (
                <div className="loader-div">
                    <CircularLoader />
                </div>
            )}
        </div>
    );
};

export default MusicPlayer;
