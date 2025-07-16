"use client"
import { getInvoiceById } from '@/app/actions'
import Wrapper from '@/app/components/Wrapper'
import { Invoice } from '@/app/generated/prisma'
import React, { useEffect, useState } from 'react'

function page({params} : {params : Promise<{invoiceId:string}>}) {
  
  const [invoice,setIvoice] = useState<Invoice | null>(null)
  const [initialInvoce,seInitialInvoce] = useState<Invoice | null>(null)
  const fetchInvoice = async () => {
    try {
      const {invoiceId} = await params
      const fetchInvoice = await getInvoiceById(invoiceId)
      if(fetchInvoice){
        setIvoice(fetchInvoice)
        seInitialInvoce(fetchInvoice)
      }  
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() =>{
    fetchInvoice();

  },[])
  
  return ( 
    <Wrapper>
      <div>
      <div> 
        
        <p className='badge badge-ghost badge-lg uppercase'>
          <span>Facture-</span>{invoice?.id}
        </p>
        <div className='flex md:mt-0 mt-4'>
          <select className='select select-sm select-bordered w-full'
          value={invoice?.status}>
              <option value={1}>Brouillon</option>
              <option value={2}>En attente</option>
              <option value={3}>Payée</option>
              <option value={4}>Annulée</option>
              <option value={5}>Impayée</option>
          </select>
        </div>
        <button className='btn btn-sm btn-accent ml-4'>
           Sauvegarder
        </button>
      </div>
      <div></div>
    </div>
    </Wrapper>
  )
}

export default page 