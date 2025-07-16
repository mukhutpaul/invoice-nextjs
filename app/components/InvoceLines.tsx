import { Invoice } from '@/type'
import { Plus, Trash } from 'lucide-react'
import React from 'react'

interface Props {
    invoice : Invoice | null | any,
    setInvoice : (invoice:Invoice) => void
}

const InvoceLines: React.FC<Props> =({invoice,setInvoice}) => {
     
  return (
    <div className='h-fit bg-base-200 p-5 rounded-xl w-full'>
        <div className='flex justify-between items-center mb-4'>
            <h2 className='badge badge-accent'>Produit / Service</h2>
            <button className='btn btn-sm btn-accent'>
                <Plus className='w-4'/>
            </button>
        </div>

        <div className='scrollable'>
            <table className='table w-full'>
                <thead className='uppercase'>
                    <th>Quantité</th>
                    <th>Description</th>
                    <th>Prix unitaire (HT)</th>
                    <th>Montant HT</th>
                    <th></th>
                </thead>
                <tbody>
                    {invoice.lines.map((line:any,index:any) =>(
                        <tr key={line.id}>
                          <td>
                            <input type="number" 
                           value={line.quantity}
                           className='input input-sm input-bordered w-full'
                           min={0}
                           />
                           </td>
                           <td>
                            <input type="text" 
                           value={line.descriptin}
                           className='input input-sm input-bordered w-full'
                           min={0}
                           />
                          </td>
                         <td>
                           <input type="number" 
                           value={line.unitPrice}
                           className='input input-sm input-bordered w-full'
                           min={0}
                           step={0.91}
                           />
                          </td>
                          <td className='font-bold'>
                            {line.quantity * line.unitPrice.toFixed(2)} $

                          </td>
                          <td>
                            <button className='btn btn-sm btn-circle btn-accent'>
                                <Trash />
                            </button>
                          </td>
                        </tr>

                    ))}
                </tbody>

            </table>

        </div>
        
    </div>
  )
}

export default InvoceLines