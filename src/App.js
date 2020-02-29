import React, { useState } from 'react'
import Routes from './components/Routes'
import NavBar from './components/Navbar'

const App = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const doSetCurrentUser = currentUser => {
    setCurrentUser(currentUser)
    let isLoggedIn = currentUser ? true : false
    setisLoggedIn(isLoggedIn)
  }
  return (
    <div>
      <NavBar
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        doSetCurrentUser={doSetCurrentUser}
      />
      <Routes doSetCurrentUser={doSetCurrentUser} />
    </div>
  )
}
export default App