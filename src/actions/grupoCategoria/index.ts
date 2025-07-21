'use server'

import { createGrupoCategoriaService, getAllGrupoCategoriaService } from '@/services/grupoCategoria'
import { revalidatePath } from 'next/cache'
import z from 'zod'


const grupoForm = z.object({
  nome: z.string({error:'Nome é obrigatório'}).min(4,{error:"Mínimo de 4 letras"})
})


export async function CreateCategoriaAction(formData:FormData){
  const validatedField = grupoForm.safeParse({
    nome: formData.get('nome')
  })

  if(!validatedField.success){
    return{
      errors: validatedField.error.message,
    }
  }
  const created = await createGrupoCategoriaService(
    validatedField.data
  )
  revalidatePath('/grupos')
  return created
}


export async function GetAllGrupoActions(busca: string | null){

  const grupos = await getAllGrupoCategoriaService(busca)
  
  return grupos

}