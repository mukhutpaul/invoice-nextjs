"use client"
import { deleteInvoice, getInvoiceById, updateInvoice } from '@/app/actions'
import InvoceLines from '@/app/components/InvoceLines'
import InvoiceInfo from '@/app/components/InvoiceInfo'
import InvoicePdf from '@/app/components/InvoicePdf'
import VATControl from '@/app/components/VATControl'
import Wrapper from '@/app/components/Wrapper'
import { Invoice } from '@/app/generated/prisma'
import { Totals } from '@/type'
import { Save, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'

function page({params} : {params : Promise<{invoiceId:string}>}) {
  
  const [invoice,setIvoice] = useState<Invoice | null>(null)
  const [initialInvoce,seInitialInvoce] = useState<Invoice | null>(null)
  const [totale,setTotale] = useState<Totals | null>(null)
  const [isSaveDisabled,setIsSaveDisabled] = useState(true)
  const [isLoaling,setIsLoading] = useState(false)
  const router =useRouter()

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

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
    const newStatus = parseInt(e.target.value)

    if(invoice){
      const updatedInvoice = {...invoice,status : newStatus}
      setIvoice(updatedInvoice)
    }
  }

  useEffect(() =>{
    setIsSaveDisabled(
      JSON.stringify(invoice) === JSON.stringify(initialInvoce))

  },[invoice,initialInvoce])

  const handleSave = async () => {
    if(!invoice) return;
    setIsLoading(true)

    try {
      await updateInvoice(invoice)
      const updatedInvoice = await getInvoiceById(invoice.id)
      if(updatedInvoice){
        setIvoice(updatedInvoice)
        seInitialInvoce(updatedInvoice)
      }
      setIsLoading(false)
      
    } catch (error) {
      console.log("Error lors de la sauvegarde de la facture",error)
    }
  }

  const handleDelete = async() => {
     const confirmed = window.confirm("Etes-vous sûr de vouloir supprimer cette facture")

     if(confirmed){
        try {
          await deleteInvoice(invoice?.id as string)
          router.push('/')
          
        } catch (error) {
          console.error("Erreur lors de la sauvegarde de la facture",error)
        }
     }
  }

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
          <select
          onChange={handleStatusChange}
           className='select select-sm select-bordered w-full'
          value={invoice?.status}>
              <option value={1}>Brouillon</option>
              <option value={2}>En attente</option>
              <option value={3}>Payée</option>
              <option value={4}>Annulée</option>
              <option value={5}>Impayée</option>
          </select>
          <button 
          onClick={handleSave}
          disabled={isSaveDisabled || isLoaling}
          className='btn btn-sm btn-accent ml-4'>
            {isLoaling ? (
              <span className='loading loading-spinner lading-sm'></span>

            ):(
             
                 <>
                Sauvegarder
                <Save className='w-4 ml-2' />

              </>

            )}
           
         </button>
         <button 
         onClick={handleDelete}
         className='btn btn-sm btn-accent ml-4'>
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

                <div className='flex justify-between'>
                  <span>Total Hors Taxes</span>
                  <span>  {totale.totalHT.toFixed(2)} $</span>
                 
                 </div>


                 <div className='flex justify-between'>
                  <span>TVA {invoice?.vatActive ? `${invoice?.vatRate}` : '0'}</span>
                  <span>  {totale.totalVAT.toFixed(2)} $</span>
 
                 </div>

                 
                <div className='flex justify-between font-bold'>
                  <span>Total TTC</span>
                  <span>  {totale.totalTTC.toFixed(2)} $</span>
                 
                 </div>
            </div>
            <InvoiceInfo invoice={invoice} setInvoice={setIvoice}/>

        </div>

        <div className='flex w-full md:w-2/3 flex-col md:ml-4'>

         <InvoceLines invoice={invoice} setInvoice={setIvoice}/>
        
        <InvoicePdf invoice={invoice} totals={totale}/>
        
        </div>
      </div>

    </div>
    </Wrapper>
  )
}

export default page 