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
        <div className="relative md:p-4 bg-gray-100 dark:bg-gray-700 md:rounded-lg shadow-md">
            <span className={`absolute  rounded-b-sm ${labelColor}  text-[10px] font-semibold  bg-gray-300 text-black`
        }>{label}</span>
            <Image src={imageUrl} alt={title} className="w-full md:h-32 object-cover md:rounded-md" width={150} height={238} />
            <h3 className=" text-[10px] 
             text-gray-800 dark:text-white">{title}</h3>
            <p className="text-[12px] text-gray-600 dark:text-gray-300 font-semibold">{description}</p>
            <div className="md:mt-2 flex justify-between items-center">
                 
                <button className="text-blue-500 hover:text-blue-600 text-xs">❤️</button>
                <button className="text-blue-500 hover:text-blue-600 text-xs">▶️</button>
            </div>
        </div>
    );
};

export default PlaylistCard;