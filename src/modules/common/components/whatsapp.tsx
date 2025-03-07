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
    <div className="fixed bottom-4 right-4 z-50 flex  flex-col">
      {/* Timing Label */}
      <div className="p-2 bg-blue-900 text-white mb-1 text-xs font-sm rounded-full shadow-md">
         10AM - 6PM
      </div>
<div className="flex justify-center">
    <a
        href="https://wa.me/+919818163966" // Replace with your WhatsApp number or API URL
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 inline-block bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300"
      >
        <FaWhatsapp size={30} />
      </a>
</div>
    
    </div>
  )
}
