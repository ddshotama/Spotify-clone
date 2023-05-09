import "./MenuPlaylist.css";
import { GET_SONGS } from "../../utils/apolloClient/queries";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { setListOfSongs, setCurrSongIndex } from "../../state";
import { useEffect, useState } from "react";

const MenuPlaylist = () => {
    const [responseData, setResponseData] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedSong, setSelectedSong] = useState(1);
    const selectedPlaylistIndex = useSelector((state) => state.slice.playlist);
    const curInd = useSelector((state) => state.slice.currSongIndex);

    const { loading, error, data } = useQuery(GET_SONGS, {
        variables: {
            playlistId: selectedPlaylistIndex,
            search: search,
        },
    });
    const dispatch = useDispatch();

    const handlePlayerDate = (index) => {
        setSelectedSong(index + 1);

        dispatch(
            setCurrSongIndex({
                currSongIndex: index,
            })
        );
        dispatch(
            setListOfSongs({
                listOfSongs: responseData,
            })
        );
    };

    useEffect(() => {
        if (data) {
            setResponseData(data.getSongs);
        }
    }, [data, search]);
    return (
        <div className="playlistt">
            <div className="music-list">
                {responseData &&
                    responseData.map((item, index) => {
                        return (
                            <div
                                onClick={() => handlePlayerDate(index)}
                                style={{
                                    background: index == curInd ? "rgba(255, 255, 255, 0.08)" : "",
                                }}
                                key={item._id}
                                className="music-div"
                            >
                                <div className="logo-name">
                                    <img className="photo" src={item.photo} />
                                    <div className="music-name">
                                        <p className="music-text">{item.title}</p>
                                        <p className="artist-name">{item.artist}</p>
                                    </div>
                                </div>
                                <p className="time">
                                    {Math.floor(item.duration / 60)}:{item.duration % 60}
                                </p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default MenuPlaylist;
