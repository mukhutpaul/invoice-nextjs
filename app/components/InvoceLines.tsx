import { Invoice } from '@/type'
import { Plus, Trash } from 'lucide-react'
import React from 'react'
import { InvoiceLine } from '../generated/prisma'

interface Props {
    invoice : Invoice | null | any,
    setInvoice : (invoice:Invoice) => void
}

const InvoceLines: React.FC<Props> =({invoice,setInvoice}) => {

const handleAddline = () =>{
  const newLine : InvoiceLine = {
    id: `${Date.now()}`,
    description:"",
    quantity:1,
    unitPrice:0,
    invoiceId: invoice.id
  }

  setInvoice({
    ...invoice,
    lines: [...invoice.lines,newLine]
  })

}

 const handleQuantityChange = (index:number, value:string) =>{
    const updatedLines = [...invoice.lines]
    updatedLines[index].quantity = value === "" ? 0 : parseInt(value)
    setInvoice({...invoice,lines: updatedLines})
  }

  const handleDescriptionChange = (index:number, value:string) =>{
    const updatedLines = [...invoice.lines]
    updatedLines[index].description = value
    setInvoice({...invoice,lines: updatedLines})
  }

  const handleUnitPriceChange = (index:number, value:string) =>{
    const updatedLines = [...invoice.lines]
    updatedLines[index].unitPrice = value === "" ? 0 : parseFloat(value)
    setInvoice({...invoice,lines: updatedLines})
  }

  const handleRemoveLine = (index:number) => {
    const updatedLines = invoice.lines.filter((_ : any, i:any) => i !== index)
    setInvoice({...invoice,lines: updatedLines})

  }

     
  return (
    <div className='h-fit bg-base-200 p-5 rounded-xl w-full'>
        <div className='flex justify-between items-center mb-4'>
            <h2 className='badge badge-accent'>Produit / Service</h2>
            <button className='btn btn-sm btn-accent'
            onClick={handleAddline}>
                <Plus className='w-4'/>
            </button>
        </div>

        <div className='scrollable'>
            <table className='table w-full'>
                <thead className='uppercase'>
                  <tr>
                    <th>Quantité</th>
                    <th>Description</th>
                    <th>Prix unitaire (HT)</th>
                    <th>Montant HT</th>
                    <th></th>
                  </tr>  
                </thead>
                <tbody>
                    {invoice.lines.map((line:any,index:any) =>(
                        <tr key={line.id}>
                          <td>
                          <input type="number" 
                           value={line.quantity}
                           className='input input-sm input-bordered w-full'
                           min={0}
                          onChange={(e)=>handleQuantityChange(index,e.target.value)}
                           />
                           </td>
                           <td>
                            <input type="text" 
                           value={line.descriptin}
                           className='input input-sm input-bordered w-full'
                           min={0}
                           onChange={(e)=>handleDescriptionChange(index,e.target.value)}
                           />
                          </td>
                         <td>
                           <input type="number" 
                           value={line.unitPrice}
                           className='input input-sm input-bordered w-full'
                           min={0}
                          step={0.91}
                          onChange={(e)=>handleUnitPriceChange(index,e.target.value)}
                           />
                          </td>
                          <td className='font-bold'>
                            {line.quantity * line.unitPrice.toFixed(2)} $
                          </td>
                          <td>
                            <button
                            onClick={() => handleRemoveLine(index)}
                             className='btn btn-sm btn-circle btn-accent'>
                                <Trash className='w-4'/>
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