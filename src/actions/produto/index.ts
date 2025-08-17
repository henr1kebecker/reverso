'use server'

import { CreateProdutoService, getAllProdutosService, UpDateProdutoService } from '@/services/produto'
import z, { success } from 'zod'


const schema = z.object({
  nome: z.string({error: 'Nome do Produto é obrigatório'}).min(4,{error: 'Mínimo de 4 letras'}),
  precoUnitario: z.number({error: 'Obrigatório ter um Preço'}).positive(),
  categoriaIds: z.array(z.number(), {error: 'Selecione ao menos 1 Categoria'}).min(1, 'Selecione ao menos 1 Categoria')
})


export async function CreateProdutoAction(formData: FormData){
  const precoFormat = Number(formData.get('preco'))
  const raw = JSON.parse(formData.get('categoriaIds') as string) as unknown[]

  const validatedField = schema.safeParse({
    nome: formData.get('nome'),
    categoriaIds: raw.map((id) => Number(id)),
    precoUnitario: precoFormat
  })

  if(!validatedField.success){
    return{
      errors: validatedField.error.message,
    }
  }
  const created = await CreateProdutoService(
    validatedField.data
  )
  return created
}


export async function GetAllProdutosActions() {
  const produtos = getAllProdutosService()

  return produtos
}

type dataProps = {
  nome?: string,
  precoUnitario?: number,
  categoriaIds?: number[]
}


export async function UpDateProdutoAction(formData: FormData){
  
  const data: dataProps = {}
  const nome = String(formData.get('nome'))
  const preco = Number(formData.get('preco'))
  const categoriaIds = formData.get('categoriasIds')

  if (nome !== 'null'){
    data.nome = nome
  }
  if(preco !== 0){
    data.precoUnitario = preco
  }
  if(categoriaIds !== null){
    const raw = JSON.parse(categoriaIds as string) as unknown[]
    const newRaw = raw.map((id) => Number(id))
    data.categoriaIds = newRaw
  }


  try {
    const id = formData.get('id') as string
    const produtoUpdated = await UpDateProdutoService(id, data)
    return {
      success: true
    }
  } catch (erro){
    return {
      error: erro
    }
  }

}