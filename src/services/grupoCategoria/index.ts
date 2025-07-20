'use server'

import { prisma } from "@/lib/auth";
import { Prisma } from "@/generated/prisma";

export const grupoCategoriaService = {

  async create(data: Prisma.GrupoCategoriaCreateInput ){
    await prisma.grupoCategoria.create({
      data,
    })
  },

  async getAll(){
    await prisma.grupoCategoria.findMany({
      orderBy:{
        nome: 'asc'
      }
    })
  }
}