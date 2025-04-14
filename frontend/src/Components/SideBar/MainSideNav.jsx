import React from 'react'
import SideBarCanvas from './SideBarCanvas/SideBarCanvas'
import SiedBar from './SideBar/SiedBar'
import { useAuth } from '../../Context/AuthContext'
import LocalStore from '../../Store/LocalStore'

export default function MainSideNav() {
  const { logout } = useAuth()
  return (
      <>
          <SiedBar  logout={logout}/>
          <SideBarCanvas logout={logout}/>
    </>
  )
}
