import "./App.css";
import Playlist from "./components/Playlist/Playlist";
import Sidebar from "./components/Sidebar/Sidebar";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const App = () => {
    const backgroundColor = useSelector((state) => state.slice.backgroundColor);
    const dispatch = useDispatch();

    return (
        <div
            className="App bcRegularFont"
            style={{
                backgroundImage: `linear-gradient(to right,rgba(${backgroundColor.r / 4}, ${backgroundColor.g / 4}, ${
                    backgroundColor.b * (1 / 4)
                }, 1),rgba(0, 0, 0, 1))`,
            }}
        >
            <Sidebar />
            <Playlist />
            <MusicPlayer />
        </div>
    );
};

export default App;
