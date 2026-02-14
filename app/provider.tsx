'use client'
import { UserDetailContext } from '@/hooks/UserDetailContext'
import React, { useEffect, useState } from 'react'

function Provider({children}: {children: React.ReactNode}) {

  const[userDetail,setUserDetail]=useState(null)

  useEffect(()=>{
    CreateNewUser()
  },[])

  const CreateNewUser = async () => {
    const res = await fetch('/api/user', {method:'POST'});
    if (!res.ok) {
      const errorText = await res.text(); // Read as text to avoid the JSON crash
      console.error("Server Error:", errorText);
      return;
  }
    const data = await res.json();
    // console.log(data);
    setUserDetail(data)
  }

  return (
    <div>
      <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
      {children}
      </UserDetailContext.Provider>
      </div>
  )
}

export default Provider