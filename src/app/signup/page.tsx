import React, { useState } from 'react'
import axios from 'axios'
import { Toast } from 'react-hot-toast'

export default function signupPage() {
  const [user , setUser] = useState({
    username : "" , 
    email : "" ,
    password : ""
  })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading , setLoading] = useState(false)

    const onSingnup = async ()=> {
      try {
        setLoading(true)
        
        
      } catch (error:any) {
        console.log("Singup failed");
      }
    }
  return (
    <div>page</div>
  )
}

