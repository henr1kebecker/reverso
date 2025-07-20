'use server'
import { grupoCategoriaService } from '@/services/grupoCategoria'
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
  await grupoCategoriaService.create(
    validatedField.data
  )
}