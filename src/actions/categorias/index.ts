'use server'


import z from "zod"
import { revalidatePath } from "next/cache"
import { CreateCategoriaService, GetAllCategoriaService } from "@/services/categoria"


const schemaCategoria = z.object({
  nome: z.string({error: 'Nome é obrigatório'}).min(4, {error: 'Palavra muito curta, mínimo 4 caracteres.'}),
  grupoCategoriaId: z.number({error:'Grupo é obrigatório'})
})

export async function CreateCategoriaAction(formData: FormData){
  const validatedField = schemaCategoria.safeParse({
    nome: formData.get('nome'),
    grupoCategoria: Number(formData.get('grupoId'))
  })

  if(!validatedField.success){
    return {
      errors: validatedField.error.message
    }
  }
  const created = await CreateCategoriaService(
    validatedField.data
  )
  revalidatePath('/grupos')
  return created
}

export async function GetAllCategoriaAction(busca: string | null){
  const categorias = await GetAllCategoriaService(busca)
  return categorias
}