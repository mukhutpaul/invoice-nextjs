"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

function Navbar() {
    const pathname = usePathname()
    const navLink = [
        {
           href:"/",
           label: "Facture" 
        },
    ]

    const isActiveLink = (href:string) =>  
        pathname.replace(/\/$/,"") === href.replace(/\/$/,"");

    const renderLiks = (className:string) =>
        navLink.map(({href,label}) =>{

            return <Link href={href} key={href} className={`btn-sm ${className}
            ${isActiveLink(href) ? 'btn-accent':''}`}>
                {label}
            </Link>

        }) 

    
  return (
    <div>
        <div className=''>
            <div>
                <div>
                    {renderLiks("btn")}
                </div>

            </div>
            <div></div>
        </div>
    </div>
  )
}

export default Navbar