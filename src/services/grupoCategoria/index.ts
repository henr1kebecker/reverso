'use server'

import { prisma } from "@/lib/auth";
import { Prisma } from "@/generated/prisma";

export const grupoCategoriaService = {

  async create(data: Prisma.GrupoCategoriaCreateInput ){
    const created =await prisma.grupoCategoria.create({
      data,
    })
    return created
  },

  async getAll(){
    await prisma.grupoCategoria.findMany({
      orderBy:{
        nome: 'asc'
      }
    })
  }
}