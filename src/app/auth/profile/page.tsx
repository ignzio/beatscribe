'use client'
import React, { useState, useEffect } from 'react';
import PlaylistCard from '../../components/PlaylistCard';
import { useDispatch } from 'react-redux';
import { logout } from '@/lib/features/auth/authSlice';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

interface Playlist {
    id: string;
    name: string;
    description: string;
    label: string;
    labelColor: string;
    imageUrl: string;
}

const ProfilePage: React.FC = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [showProfileSettings, setShowProfileSettings] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPlaylists = async () => {
            const response = await fetch('/api/playlists');
            const data = await response.json();
            setPlaylists(data);
        };

        fetchPlaylists();
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        // Redirect to login page or home page
    };

    const toggleProfileSettings = () => {
        setShowProfileSettings(!showProfileSettings);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto md:p-4 sm:p-0">
                <div className="bg-white p-2 md:p-6 sm:p-4 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <Image src="https://randomuser.me/api/portraits/men/1.jpg" 
                             alt="Profile Picture" width={100} height={100} className="rounded-full w-20" />
                            <div className="ml-4">
                                <h1 className="md:text-3xl font-bold">John Doe</h1>
                                <p className="text-gray-700 text-sm md:text-lg">johndoe@example.com</p>
                            </div>
                        </div>
                        <button onClick={toggleProfileSettings} className="text-gray-500 hover:text-gray-700">
                            <FontAwesomeIcon icon={faPencilAlt} className="text-2xl" />
                        </button>
                    </div>
                   
                    {showProfileSettings && (
                        <div className="bg-white p-6 sm:p-4 rounded-lg shadow-lg mt-6">
                            <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Username</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email</label>
                                    <input type="email" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Password</label>
                                    <input type="password" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
                            </form>
                        </div>
                    )}
                    <div className="bg-white p-6 sm:p-4 rounded-lg shadow-lg mt-6 min-h-[50vh]">
                        <h2 className="text-2xl font-semibold mb-4">Playlists</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {playlists.map((playlist) => (
                                <PlaylistCard key={playlist.id} playlist={playlist} />
                            ))}
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;