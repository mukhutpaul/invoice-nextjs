import { Invoice } from '@/type'
import { CheckCircle, Clock, FileText, SquareArrowDownRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type InvoiceComponentProps = {
    invoice: Invoice;
    index: number
}

const getStatusBadge = (status:number)=>{
  switch(status){
    case 1:
      return (
        <div className='badge badge-lg  flex items-center gap-2'>
          <FileText className='w-4'/>
          Brouille
        </div>
      )
    
    case 2:
      return (
        <div className='badge badge-lg badge-warning flex items-center gap-2'>
          <Clock className='w-4'/>
          En Attente
        </div>
      )

    case 3:
      return (
        <div className='badge badge-lg badge-success flex items-center gap-2'>
          <CheckCircle className='w-4'/>
          Payée
        </div>
      )
  }
}

const InvoiceComponent: React.FC<InvoiceComponentProps> = ({invoice,index})=> {
  return (
    <div className="bg-base-200/90 p-5 rounded-xl space-y-2 shadow">
      <div className="flex justify-between items-center w-full">
        <div>{getStatusBadge(invoice.status)}</div>
        <Link href={`/invoice/${invoice.id}`}
        className='btn btn-accent btn-sm'
        >
        Plus
        <SquareArrowDownRight className='w-4'/>
        </Link>
      </div>
      <div>

      </div>
    </div>
  )
}

export default InvoiceComponent