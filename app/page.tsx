"use client"
import { Layers } from "lucide-react";
import Wrapper from "./components/Wrapper";
import { useEffect, useState } from "react";
import { createEmpyInvoice } from "./actions";
import { useUser } from "@clerk/nextjs";
import confetti from "canvas-confetti"

export default function Home() {
      const [invoiceName,setInvoiceName] = useState("")
      const [isNameValide,setIsNameVAlid]= useState(true)
      const {user} = useUser()
      const email = user?.primaryEmailAddress?.emailAddress as string

      useEffect(() =>{
        setIsNameVAlid(invoiceName.length <= 60)
      },[invoiceName])

      const handleCreateInvoice = async () =>{
            try {
                  if(email){
                        await createEmpyInvoice(email,invoiceName)
                  }
                  setInvoiceName("")
                  const modal = document.getElementById('my_modal_3') as HTMLDialogElement
                  if(modal){
                        modal.close()
                  }
                  confetti({
                        particleCount:100,
                        spread: 70,
                        origin: {y:0.6},
                        zIndex:99999
                  })

                 
                  
                  
            } catch (error) {
                  console.error("Erreur lors de la création de la facture")
            }
      }
  return (
<Wrapper>
      <div className="flex flex-col space-y-4">
          <h1 className="text-lg font-bold ">Mes factures</h1>
          <div className="grid md:grid-cols-3 gap-3">
             <div className="cursor-pointer border border-accent p-5 rounded-xl flex flex-col justify-center items-center" 
             onClick={()=>(document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>
                  <div className="text-accent">
                        Créer une facture
                  </div>
                  <div className='bg-accent-content text-accent rounded-full p-2 mt-2'>
                   <Layers className='w-6 h-6'/> 
                 </div>
                  
            {/* Liste des factures */}
            </div>
          </div> 
         

      <dialog id="my_modal_3" className="modal">
           <div className="modal-box">
                  <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-bold text-lg">Nouvelle Facture</h3>
                  <input
                     type="text"
                     id=""
                     placeholder="Nom de la facture"
                     className="input input-bordered w-full my-4"
                     value={invoiceName}
                     onChange={(e) => setInvoiceName(e.target.value)}
                     />

                     {!isNameValide && <p className="mb-4 text-sm">le nom ne peut pas depasser 60 caractères</p>}
                  
                     <button className="btn btn-accent"
                     disabled={!isNameValide || invoiceName.length === 0}
                     onClick={handleCreateInvoice}
                     >
                       Créer
                     </button>
                  </div>
            </dialog> 
</div>



</Wrapper>
      );
}
