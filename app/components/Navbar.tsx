"use client"
import { UserButton, useUser } from '@clerk/nextjs';
import { Layers } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { checkAndAddUser } from '../actions';

function Navbar() {
    const pathname = usePathname()
    const {user} = useUser()
    const navLink = [
        {
           href:"/",
           label: "Facture" 
        },
    ]

    useEffect(()=>{
        if(user?.primaryEmailAddress?.emailAddress && user.fullName){
            checkAndAddUser(user?.primaryEmailAddress?.emailAddress,user.fullName)
        }

     },
     [user])

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
        <div className='border-b border-base-300 px-5 md:px-[10%] py-4'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                <div className='bg-accent-content text-accent rounded-full p-2'>
                   <Layers className='w-6 h-6'/> 
                </div>
                <span className='ml-3 font-bold text-2xl italic'>
                    In <span className='text-accent'>Voice</span>
                </span>
                </div>
                
                <div className='flex space-x-4 items-center'>
                    {renderLiks("btn")}
                    <UserButton/>
                </div>

            </div>
            <div></div>
        </div>
    </div>
  )
}

export default Navbar