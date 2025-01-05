import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { Poppins } from 'next/font/google'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
} 
// WIP font problem in all !

// Correct the variable name to `poppins`
const poppins = Poppins({
  weight: "200", // Font weight as per your requirement
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={`${poppins.className} bg-white`}>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
