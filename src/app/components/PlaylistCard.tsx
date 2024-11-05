'use client';

import React from 'react';
import Image from 'next/image';

interface PlaylistCardProps {
    label: string;
    labelColor: string;
    imageUrl: string;
    title: string;
    description: string;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ label, labelColor, imageUrl, title, description }) => {
    return (
        <div className="relative p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
            <span className={`absolute top-2 left-2 ${labelColor} text-white text-xs font-semibold px-2 py-1 rounded`}>{label}</span>
            <Image src={imageUrl} alt={title} className="w-full h-32 object-cover rounded-md" width={150} height={150} />
            <h3 className="mt-4 text-lg text-gray-800 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
            <div className="mt-2 flex justify-between items-center">
                <button className="text-blue-500 hover:text-blue-600">❤️</button>
                <button className="text-blue-500 hover:text-blue-600">▶️</button>
            </div>
        </div>
    );
};

export default PlaylistCard;