import { Invoice, Totals } from '@/type'
import { ArrowDownFromLine, Layers } from 'lucide-react'
import React from 'react'

interface FacturePDFProps {
    invoice: Invoice,
    totals: Totals
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}


const InvoicePdf: React.FC<FacturePDFProps> = ({invoice,totals}) => {
  return (
    <div className='mt-4 hidden lg:block'>
        <div className='border-base-300 border-2 border-dashed 
        rounded-xl p-5'>
            <button className='btn btn-accent  mb-4 btn btn-sm' >
                Facture PDF 
                <ArrowDownFromLine 
                className='w-4'/>
            </button>

            <div className='p-8'>
                <div className='flex justify-between items-center text-sm'>
                    <div className='flex flex-col'>
                        <div>
                           <div className='flex items-center'>
                             
                                <div className='bg-accent-content text-accent rounded-full p-2'>
                                    <Layers className='w-6 h-6'/> 
                                </div>
                            
                               <span className='ml-3 font-bold text-2xl italic'>
                                    In <span className='text-accent'>Voice</span>
                               </span>

                           </div>
                        </div>
                        <h1 className='text-7xl font-bold uppercase'>Facture</h1>
                    </div>

                    <div className='text-right uppercase'>
                        <p className='badge badge-ghost'>
                            Facture ° [invoice.id]
                        </p>

                        <p className='my-2'>
                            <strong>Date</strong>
                            {formatDate(invoice.invoiceDate)}

                        </p>

                        <p className='my-2'>
                            <strong>Date d'échéance</strong>
                            {formatDate(invoice.dueDate)}

                        </p>

                    </div>
                </div>
                <div className='p-8'>
                <div className='my-6 flex justify-between'>
                        <div>
                            <p className='badge badge-ghost mb-2'>Emetteur</p>
                            <p className='text-sm font-bold italic'>{invoice.issuerName}</p>
                            <p className='text-sm text-gray-500 w-52 break-words'>{invoice.issuerAddress}</p>
                        </div>
                         <div className='text-right'>
                            <p className='badge badge-ghost mb-2'>Client</p>
                            <p className='text-sm font-bold italic'>{invoice.clientName}</p>
                            <p className='text-sm text-gray-500 w-52 break-words'>{invoice.clientAddress}</p>
                        </div>

                        <div className='overflow-x-auto'>
                            <table className='table table-zebra'>
                                 <thead>
                                  <tr>
                                    <th></th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Prix Unitaire</th>
                                    <th>Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                    {invoice.lines.map((line,index) =>(
                                        <tr>
                                            <td>{index+1}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                </div>
                </div>

            </div>
        </div>


    </div>
  )
}

export default InvoicePdf