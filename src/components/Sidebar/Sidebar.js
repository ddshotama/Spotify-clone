import { useQuery } from "@apollo/client";
import spotify from "../../assets/images/spotifyLogo.svg";
import { GET_PLAYLISTS } from "../../utils/apolloClient/queries";
import userpic from "../../assets/images/userpic.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylistIndex, setListOfPlaylists } from "../../state";
import CircularIndeterminate from "../Loader";
import "./Sidebar.css";
const Sidebar = () => {
    const { loading, error, data } = useQuery(GET_PLAYLISTS);

    const [selectedPlaylist, setSelectedPlaylist] = useState(0);

    const currSelectedPlaylist = useSelector((state) => {
        return state.slice.playlist;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (data != null) {
            dispatch(setListOfPlaylists(data.getPlaylists));
        }
    }, [data, dispatch]);

    function updateSelectedPlaylist(index) {
        setSelectedPlaylist(index);
        dispatch(
            setPlaylistIndex({
                playlist: index + 1,
            })
        );
    }

    return (
        <div className="sidebar">
            <div>
                <img src={spotify} />
            </div>
            {data != null ? (
                <div className="nav-items">
                    {data.getPlaylists.map((item, index) => (
                        <p
                            className="nav"
                            style={{ opacity: index === selectedPlaylist ? "1" : "0.4" }}
                            onClick={() => updateSelectedPlaylist(index)}
                            key={item.id}
                        >
                            {item.title}
                        </p>
                    ))}
                </div>
            ) : (
                <div className="loader-div">
                    <CircularIndeterminate />
                </div>
            )}
            <img className="user-pic" src={userpic} />
        </div>
    );
};

export default Sidebar;
