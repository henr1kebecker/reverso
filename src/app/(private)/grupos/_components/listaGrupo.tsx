'use client'

import { GrupoCategoria } from "@/generated/prisma";
import { Box, Input, InputGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { prisma } from "@/lib/auth";

export default function ListaGrupoComponent( data: {data: GrupoCategoria[]}){

  
  return(
    <Box display={'block'} p={2}>
      <InputGroup endElement={<LuSearch/>} colorPalette={'orange'}> 
        <Input/>
      </InputGroup>
      <Box display={'block'}>

      </Box>
    </Box>
  )
}