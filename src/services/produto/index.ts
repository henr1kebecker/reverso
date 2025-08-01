import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/auth";


export async function CreateProdutoService(data: Prisma.ProdutoUncheckedCreateInput){
  const created = await prisma.produto.create({
    data,
  })
  return created
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
