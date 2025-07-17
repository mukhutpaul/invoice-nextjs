"use client"
import { getInvoiceById } from '@/app/actions'
import InvoceLines from '@/app/components/InvoceLines'
import InvoiceInfo from '@/app/components/InvoiceInfo'
import VATControl from '@/app/components/VATControl'
import Wrapper from '@/app/components/Wrapper'
import { Invoice } from '@/app/generated/prisma'
import { Totals } from '@/type'
import { Trash } from 'lucide-react'

import React, { useEffect, useState } from 'react'

function page({params} : {params : Promise<{invoiceId:string}>}) {
  
  const [invoice,setIvoice] = useState<Invoice | null>(null)
  const [initialInvoce,seInitialInvoce] = useState<Invoice | null>(null)
  const [totale,setTotale] = useState<Totals | null>(null)
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
    useEffect(() => {
    if (!invoice) return;
    const ht = invoice.lines.reduce((acc, { quantity, unitPrice }) =>
      acc + quantity * unitPrice, 0
    )
    const vat = invoice.vatActive ? ht * (invoice.vatRate / 100) : 0
    setTotale({ totalHT: ht, totalVAT: vat, totalTTC: ht + vat })

  }, [invoice])

  if(!invoice || !totale) return (
    <div className='flex justify-center items-center h-screen w-full'>
      <span className='font-bold'>Facture non trouvée</span>
    </div>
  )

  
  return ( 
    <Wrapper>
      <div>
      <div className='flex flex-col md:flex flex-row md:justify-between md:items-center mb-4'> 
        
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
          <button className='btn btn-sm btn-accent ml-4'>
           Sauvegarder
         </button>
         <button className='btn btn-sm btn-accent ml-4'>
           <Trash className='w-4'/>
         </button>
        </div>
         
      </div>
     
      <div className='flex flex-col md:flex flex-row w-full'>

        <div className='flex w-full md:w-1/3 flex-col'>
            <div className='mb-4 bg-base-200 rounded-xl p-5'>

               <div className='flex justify-between items-center mb-4'>
                   <div className='badge badge-accent'>Résumé de totaux</div>
                   <VATControl invoice={invoice} setInvoice={setIvoice} />
                 </div>
                 <div>
                  <span>TVA ({invoice?.vatRate})</span>
                  <span></span>
                 </div>
            </div>
            <InvoiceInfo invoice={invoice} setInvoice={setIvoice}/>

        </div>

        <div className='flex w-full md:w-2/3 flex-col md:ml-4'>

         <InvoceLines invoice={invoice} setInvoice={setIvoice}/>
        </div>
      </div>

    </div>
    </Wrapper>
  )
}

export default page 