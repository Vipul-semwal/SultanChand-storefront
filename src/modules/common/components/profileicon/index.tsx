import React from 'react'
import { Mail, Phone, Users } from 'lucide-react';
function ProfileIcons({email="",phone="",para="",heading=""}) {
  return (
    <div className="bg-white p-3 shadow-md rounded-lg flex flex-col justify-center items-center">
    <div className="text-[#EA5900] text-4xl mb-4">
      <Users color='red' size={32} />
    </div>
    <div>
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{heading}</h3>
      <p className="text-sm sm:text-base text-gray-600">{para}</p>
      <div className="flex items-center space-x-2 text-sm sm:text-base text-gray-500">
        <Mail color='red' size={16} />
        <span>{email}</span>
      </div>
      <div className="flex items-center space-x-2 text-sm sm:text-base text-gray-500">
        <Phone color='red' size={16} />
        <span>{phone}</span>
      </div>
    </div>
  </div>
  )
}

export default ProfileIcons;