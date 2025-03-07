import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { Poppins } from 'next/font/google'
import ReactQueryProvider from '../provider/index'
import {Toaster} from "@medusajs/ui"
import PopUpBanner from "../modules/popup"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),  
} 
// WIP font problem in all !

// Correct the variable name to `poppins`
const poppins = Poppins({
  weight: "400", // Font weight as per your requirement
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout(props: { children: React.ReactNode }) {
  // console.log('publsihkey:', "pk_ecce647272761283e5915729e0269ad39cffb3b48559a8990eebc150169be6e8")
  return (
    <html lang="en" data-mode="light" className={`${poppins.className} bg-white`}>
      <body>
        <main className="relative"><ReactQueryProvider>
        <Toaster />
        {props.children}
        <PopUpBanner/>
          </ReactQueryProvider></main>
      </body>
    </html>
  )
}
