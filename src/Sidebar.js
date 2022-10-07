import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import CreateIcon from '@material-ui/icons/Create'
import SidebarOption from './SidebarOption'
import InsertCommentIcon from '@material-ui/icons/InsertComment'
import { Add, Apps, BookmarkBorder, Drafts, ExpandLess, FileCopy, Inbox, PeopleAlt } from '@material-ui/icons'
import {db} from "./firebase"
import { useStateValue } from './StateProvider'

function Sidebar() {
  const [channels, setChannels] = useState([]);
  const [{ user }] = useStateValue();

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
    <div className='sidebar'>
        <div className="sidebar__header">
                <div className="sidebar__info">
                <h2>Clever Programmer</h2>
                <h3>
                    <FiberManualRecordIcon />
                    {user?.displayName}
                </h3>
            </div>
            <CreateIcon />
        </div>
        <SidebarOption Icon={InsertCommentIcon} title="Threads"/>
        <SidebarOption Icon={Inbox} title="Mentions & reactions"/>
        <SidebarOption Icon={Drafts} title="Saved items"/>
        <SidebarOption Icon={BookmarkBorder} title="Channel browser"/>
        <SidebarOption Icon={PeopleAlt} title="People ? user groups"/>
        <SidebarOption Icon={Apps} title="Apps"/>
        <SidebarOption Icon={FileCopy} title="File browser"/>
        <SidebarOption Icon={ExpandLess} title="Show less"/>
        <hr />
        <SidebarOption Icon={Add} title="Add Channel" addChannelOption/>
        
        {channels.map((channel) => (
          <SidebarOption title={channel.name} id={channel.id} key={channel.id}/>
        ))}
    </div>
  )
}

export default Sidebar;
