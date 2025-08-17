import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/auth";


type ProdutoInput = {
  nome: string
  precoUnitario: number
  categoriaIds: number[]
}

export async function CreateProdutoService({nome, precoUnitario, categoriaIds}: ProdutoInput){
  const data: Prisma.ProdutoCreateInput = {
    nome,
    precoUnitario,
    categorias:{
      connect: categoriaIds.map(id =>({id}))
    }
  }

  return await prisma.produto.create({data})
}

export async function getAllProdutosService(){
  const produtos = await prisma.produto.findMany({
    orderBy:{
      nome: 'asc'
    },
    include:{
      categorias: true
    }
  })
  
  return produtos
}

type ProdutoUpdateInput = {
  nome?: string
  precoUnitario?: number
  categoriaIds?: number[]
}

export async function UpDateProdutoService(id: string, data: ProdutoUpdateInput){

  const {categoriaIds, ...rest} = data
  try{
    if(categoriaIds !== undefined){
      const update = await prisma.produto.update({
        where:{
          id: id,
        },
        data:{
          ...rest,
          categorias:{
            set: categoriaIds.map((id)=>({id}))
          }
        }
      })
      return update
    }else{
      const update = await prisma.produto.update({
        where:{
          id: id,
        },
        data
      })
      return update
    }
  }catch (error){
    throw new Error('Erro ao atualizar: '+ error)
  }
}