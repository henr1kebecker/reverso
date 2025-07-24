'use server'
import { prisma } from "@/lib/auth";
import { Prisma } from "@/generated/prisma";


export async function createGrupoCategoriaService(data: Prisma.GrupoCategoriaCreateInput){
  const created = await prisma.grupoCategoria.create({
    data,
  })
  return created
}

export async function getAllGrupoCategoriaService(busca: string | null) {
  
  if(busca !== null){
    const grupos = await prisma.grupoCategoria.findMany({
      where:{
        nome: {
          contains: busca,
          mode: 'insensitive'
        }
      },
      include:{
        categorias: true
      }
    })
    return grupos
  }else {
    const grupos = await prisma.grupoCategoria.findMany({
      orderBy:{
        nome: 'asc'
      },
      include:{
        categorias: true
      }
    })
    console.log(grupos)
    return grupos
  }
}