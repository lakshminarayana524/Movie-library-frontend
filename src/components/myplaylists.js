import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/public_playlist.css';
import Loader from './loader';

const Myplaylist = ({setIsLoggedIn }) => {
    const [playlists, setPlaylists] = useState([]);
    const [load ,setload] = useState(false);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    

    useEffect(() => {
        const fetchPlaylists = async () => {
            setload(true);
            try {
                // const res = await axios.get("http://localhost:5000/publiclibget");
                  const res = await axios.get("https://movie-library-backend-kxe0.onrender.com/publiclibget");
                if (res.data.msg === 'Successfully fetched') {
                    const userId = localStorage.getItem('userId');
                    const filteredPlaylists = res.data.playlists.filter(playlist => playlist.uid === userId);
                    setPlaylists(filteredPlaylists);
                    console.log("Data fetched and filtered");
                    setload(false);
                }
            } catch (error) {
                setload(false);
                console.error('Error fetching playlists:', error);
            }
        };

        fetchPlaylists();
    }, []);

    const handleBack = () => {
        window.history.back();
    };

    const handleChange =() =>{
      navigate('/public_playlist/Allplaylists');
    }

    if(load){
        return <Loader />
    }

    return (
        <div className='publicplaylist-body'>
            <button className='back-button' onClick={handleBack}>
                <span className="back-arrow">&#8249;</span> Back
            </button>
            <div className='publicplaylist-content'>
                <h3>Public Playlists </h3>
                <button className='all-playlists' onClick={handleChange}>All Public playlists</button>
                <div className='publicplaylist-container'>
                    {playlists.length > 0 ? playlists.map((playlist, index) => (
                        <div key={index} className='publicplaylist-card' onClick={() => navigate(`/public_playlist/${playlist.playlistname}`)}>
                            <div className='publicplaylist-title'>
                                <strong>{playlist.playlistname}</strong>
                            </div>
                        </div>
                    )) : <p>No playlists found.</p>}
                </div>
            </div>
        </div>
    );
};

export default Myplaylist;
