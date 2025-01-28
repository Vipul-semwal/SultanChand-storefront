"use client"

import { usePathname } from "next/navigation"
import { FaWhatsapp } from "react-icons/fa"
import { BsChatDots } from "react-icons/bs"

export default function WhatsAppIcon() {
  const pathname = usePathname()

  // Check if "product" is part of the path
  if (pathname.includes("/product")) {
    return null // Hide the icon if the path includes "product"
  }

  console.log("Current Path:", pathname) // Debugging: Log current path
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center space-y-2">
      {/* Timing Label */}
      <div className="p-2 bg-red-500 text-white text-sm font-medium rounded-full shadow-md">
        <BsChatDots size={20} className="inline mr-1" /> 10 AM – 6 PM
      </div>

      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/8178710398" // Replace with your WhatsApp number or API URL
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300"
      >
        <FaWhatsapp size={30} />
      </a>
    </div>
  )
}
