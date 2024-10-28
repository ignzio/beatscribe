'use client'
import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faUser,faBars } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'


const search = <FontAwesomeIcon icon={faSearch} />
const person = <FontAwesomeIcon icon={faUser} />
const hamburger = <FontAwesomeIcon icon={faBars} />

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="-ml-2 mr-2 flex items-center md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center m-2 text-2xl  rounded-md text-gray-500 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900"
                                aria-expanded={isOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                {isOpen ? '❌' : hamburger}
                            </button>
                        </div>
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">BeatScribe</Link>
                        </div>
                        <div className="hidden md:ml-6 md:flex md:space-x-8 self-center">
                            <DesktopNav />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="#" className="text-lg font-medium text-gray-500 hover:text-gray-700 dark:text-gray-200 dark:hover:text-white"> {search} </Link> {/* change to some other tag */}
                        </div>
                        <div className="ml-4 flex-shrink-0">
                            <Link href="/auth/login"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
                            >
                                {person}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <MobileNav />
            </div>
        </div>
    )
}



const DesktopNav = () => {
    return (
        <nav className="flex space-x-4">
            {NAV_ITEMS.map((navItem) => (
                <div key={navItem.label} className="relative group">
                    <a
                        href={navItem.href ?? '#'}
                        className="text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                        {navItem.label}
                    </a>
                    {navItem.children && (
                        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                            <div className="py-1">
                                {navItem.children.map((child) => (
                                    <a
                                        key={child.label}
                                        href={child.href}
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        {child.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </nav>
    )
}

const MobileNav = () => {
    return (
        <nav className="px-2 pt-2 pb-3 sm:px-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {NAV_ITEMS.map((navItem) => (
                    <button key={navItem.label}
                        className='w-full text-center px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 flex flex-col items-center'>
                        <img src={navItem.image} alt={navItem.label} className='w-12 h-12 mb-2' />
                        {navItem.label}
                    </button>
                ))}
            </div>
        </nav>
    )
}

const NAV_ITEMS = [
    {
        label: 'Trending',
        image: 'https://via.placeholder.com/150',
        children: [
            {
                label: 'Top 10',
                href: '#',
            },
            {
                label: 'New Releases',
                href: '#',
            },
        ],
        href: '#',
    },
    {
        label: 'Playlists',
        image: 'https://via.placeholder.com/150',
        children: [
            {
                label: 'Top 10',
                href: '#',
            },
            {
                label: 'New Releases',
                href: '#',
            },
        ],
        href: '#',
    },
    {
        label: 'Discover',
        image: 'https://via.placeholder.com/150',
        children: [
            {
                label: 'Top 10',
                href: '#',
            },
            {
                label: 'New Releases',
                href: '#',
            },
        ],
        href: '#',
    }

]


export default Navigation
