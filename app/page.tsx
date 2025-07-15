"use client"
import { Layers } from "lucide-react";
import Wrapper from "./components/Wrapper";

export default function Home() {
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
                     />
                  
                  </div>
            </dialog> 
</div>



</Wrapper>
      );
}
