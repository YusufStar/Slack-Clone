import React, { useEffect, useState} from 'react'
import "./Header.css"
import { Avatar } from "@material-ui/core"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import SearchIcon from "@material-ui/icons/Search"
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import { useStateValue } from './StateProvider'
import SidebarOption from "./SidebarOption"
import {db} from "./firebase"

const sidebaroptioncss = {
    width: "100%"
}

function Header() {
    const [searchTerm, setSearchTerm] = useState('')
    const [focused, setFocused] = React.useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)
    const [{ user }] = useStateValue();
    const [channels, setChannels] = useState([]);
    
    useEffect(() => {
        db.collection("rooms").onSnapshot((snapshot) => (
        setChannels(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
            }))
            )
            )
            );
        }, []);
        
        return (
    <>
    <div className='header'>
        <div className="header__left">
            <Avatar
                className='header__avatar'
                alt={user?.displayName}
                src={user?.photoURL}
            />
            <AccessTimeIcon />            
        </div>
        <div className="header__search">
            <SearchIcon />
            <input placeholder='Search Clever Programmer'id='searchbar' onFocus={onFocus} onBlur={onBlur} onChange={event => {setSearchTerm(event.target.value)}}/>
        </div>
        <div className="header__right">
            <HelpOutlineIcon />
        </div>
    </div>
    <div className='search-div'>
            <ul style={!focused ? {display: "none"}:{display: "block"}}>
                {channels.filter((val) => {
                    if(searchTerm == "") {
                        return val
                    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                }).map((val) => (
                    <li key={val.id}>
                        <SidebarOption style={sidebaroptioncss} title={val.name} id={val.id} key={val.name}/>
                    </li>
                ))}
            </ul>
    </div>
    </>
  )
}

export default Header