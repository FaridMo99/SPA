import React from 'react'
import { User } from 'lucide-react'

function UserImage({img, noImg = false, size, userSize}) {
  return (
            <div className={`w-${size} h-${size} flex justify-center items-center rounded-full border-green-300 border-4 overflow-hidden  bg-gray-600`}>
     { noImg ? <User size={userSize} className="text-green-300" /> : <img src={img} alt="User Avatar" className="w-full h-full object-cover"/> }
        </div>
  )
}

export default UserImage