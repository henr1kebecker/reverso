'use client'
import { GrupoCategoria } from "@/generated/prisma";
import { Box, Button, Icon, Input, InputGroup, Separator, Stack, Text } from "@chakra-ui/react";
import {  useState } from "react";
import { LuBrush, LuPen, LuSearch } from "react-icons/lu";


export default function ListaGrupoComponent( data: {data: GrupoCategoria[]}){

  const grupos = data.data
  const [dataSearch, setDataSearch] = useState<GrupoCategoria[]>(grupos)

  const onSearch = (search:string | '')=>{
    if(search.length >= 1 ){
      const filterGrupos = grupos.filter( item => item.nome.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      setDataSearch(filterGrupos)
    }
    else{
      setDataSearch(grupos)
    }
  }

  return(
    <Box display={'block'} p={2}>
      <InputGroup endElement={<LuSearch/>} colorPalette={'orange'}> 
        <Input onChange={(e)=>onSearch(e.target.value)} placeholder="Digite para buscar..."/>
      </InputGroup>
      <Box display={'block'} mt={5}>
        {dataSearch.map((item, index)=>(
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