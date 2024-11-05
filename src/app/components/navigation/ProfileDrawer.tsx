import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserCog, faBell, faUserFriends, faGlobe, faDownload, faHistory, faShieldAlt, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
//toggleProfileSettings
import { toggleProfileSettings } from '@/lib/features/navigation/navigationSlice'


const items = [
    { icon: faUser, text: "Account Settings" },
    { icon: faUserCog, text: "Manage Playlists" },
    { icon: faBell, text: "Notification Settings" },
    { icon: faUserFriends, text: "Connected Accounts" },
    { icon: faGlobe, text: "Language Preferences" },
    { icon: faDownload, text: "Download Data" },
    { icon: faHistory, text: "Activity Log" },
    { icon: faShieldAlt, text: "Security Settings" },
    { icon: faCreditCard, text: "Billing Information" },
    { icon: faShieldAlt, text: "Two-Factor Authentication" },
]

const ListItem = ({ icon, text }: { icon: JSX.Element, text: string }) => (
    <li className="mb-2 flex items-center space-x-2">
        {icon}
        <button className="text-blue-500 hover:text-blue-600">{text}</button>
    </li>
)

function ProfileDrawer() {
    //drawer reducer
    const dispatch = useDispatch()
    const drawer = useSelector((state: RootState) => state.navigation);

    const handleToggleProfileSettings = () => {
        //dispatch action to show/hide profile settings
        dispatch(toggleProfileSettings())
        
    }

    return ( 
        <div className={`fixed top-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${drawer.showProfileSettings ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center p-2">
                <Image src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="Profile Picture" width={64} height={64} className="rounded-full w-12" />
                <div className="ml-4">
                    <h1 className="md:text-3xl font-bold">John Doe</h1>
                    <p className="text-gray-700 text-sm md:text-lg">johndoe@example.com</p>
                </div>
                <button className="ml-auto" onClick={handleToggleProfileSettings}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <h2 className="text-2xl font-semibold p-2">Account Settings</h2>
            <ul className="space-y-2 p-2">
                {items.map((item, index) => (
                    <ListItem key={index} icon={<FontAwesomeIcon icon={item.icon} />} text={item.text} />
                ))}
            </ul>
        </div>
    )
}

export default ProfileDrawer
