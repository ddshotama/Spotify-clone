import { gql } from "@apollo/client";

export const GET_PLAYLISTS = gql`
    query {
        getPlaylists {
            id
            title
        }
    }
`;

export const GET_SONGS = gql`
    query ($playlistId: Int!, $search: String) {
        getSongs(playlistId: $playlistId, search: $search) {
            _id
            artist
            duration
            photo
            title
            url
        }
    }
`;
