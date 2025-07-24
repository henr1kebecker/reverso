'use client'

import { Categoria, GrupoCategoria, Prisma } from "@/generated/prisma"
import { Box, Button, Icon, Input, InputGroup, Separator, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { LuBrush, LuSearch } from "react-icons/lu"



type CategotiasGruposProps = Categoria & {
  grupoCategoria: GrupoCategoria
}

type ListaCategoriasProps = {
  categorias: CategotiasGruposProps[]
}



export default function ListaCategoriasComponent( {categorias}: ListaCategoriasProps){
  
  const [cateSearch, setCatSearch] = useState(categorias)

  return (
    <Box display={'block'} p={2}>
      <InputGroup endElement={<LuSearch/>} colorPalette={'orange'}>
        <Input placeholder="Digite para buscar..."/>
      </InputGroup>
      <Box display={'block'} mt={5}>
        {cateSearch.map((item, index)=>(
          <Stack key={index} >
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Text>{item.nome}</Text>
              <Box p={2}>
                <Button variant={'ghost'}>
                  <Icon size={'md'} fill={'orange.solid'} color={'orange.solid'}>
                    <LuBrush/>
                  </Icon>
                </Button>
              </Box>
            </Box>
            <Separator />
          </Stack>
        ))}
      </Box>
    </Box>
  )
}