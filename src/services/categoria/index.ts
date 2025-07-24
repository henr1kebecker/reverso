'use server'
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/auth";


export async function CreateCategoriaService(data: Prisma.CategoriaUncheckedCreateInput){
  const created = await prisma.categoria.create({
    data:{
      nome: data.nome,
      grupoCategoria:{
        connect: {
          id:Number(data.grupoCategoriaId)
        }
      }
    }
  })
  return created
}

export async function GetAllCategoriaService(busca: string | null){
  if(busca !== null){
    const categorias = await prisma.categoria.findMany({
      where:{
        nome: {
          contains: busca,
          mode: 'insensitive'
        }
      },
      include:{
        grupoCategoria: true
      }
    })
    return categorias
  }else {
    const categorias = await prisma.categoria.findMany({
      orderBy:{
        nome: 'asc'
      },
      include:{
        grupoCategoria: true
      }
    })
    return categorias
  }
}