'use client'
import { GetAllGrupoActions } from "@/actions/grupoCategoria";
import { Categoria, GrupoCategoria } from "@/generated/prisma";
import { AbsoluteCenter, Accordion, Badge, Box, Button, Container, HStack, Input, InputGroup, Skeleton, Span, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuBadge, LuFilePenLine, LuPlus, LuSearch, LuSun } from "react-icons/lu";
import ModalFormGrupo from "./modalFormGrupo";
import ModalFormCategoria from "./modalFormCategoria";

type GrupoProps = GrupoCategoria & {
  categorias: Categoria[]
}

export default function ListViewComponent(){

  const [isLoading, setIsLoading]= useState<boolean>(false)
  const [grupos, setGrupos] = useState<GrupoProps[]>([])


  useEffect(()=>{
    setIsLoading(true)
    const getGrupos = async ()=>{
      const response = await GetAllGrupoActions(null)
      setGrupos(response)
    }
    getGrupos().finally(()=>{
      setIsLoading(false)
    })
    
  },[])

  return (
    <Container display={'block'} minH={'70vh'} boxShadow={'1px 1px 5px var(--chakra-colors-orange-800)'} rounded={'md'} p={4}>
      <HStack>
        <InputGroup endElement={<LuSearch color={'var(--chakra-colors-orange-600)'}/>} colorPalette={'orange'}>
          <Input/>
        </InputGroup>
        <ModalFormGrupo />
      </HStack>
      <Stack display={'flex'} h={'95%'} p={'10px 0'}>
        {isLoading ? (
          <Box gap={10} display={'flex'} flexWrap={'wrap'} w={'100%'} h={'95%'}>
            <HStack w={'100%'} gap={5}>
              <Stack flex={1} >
                <Skeleton height='10' w={'100%'} variant={'shine'} css={{"--start-color": "colors.orange.500",}}></Skeleton>
                <Skeleton height='20' w={'100%'} variant={'shine'} css={{"--start-color": "colors.orange.500",}}></Skeleton>
              </Stack>
              <Stack flex={2}>
                <Skeleton height='10' w={'100%'} variant={'shine'} css={{"--start-color": "colors.orange.500",}}></Skeleton>
                <Skeleton height='20' w={'100%'} variant={'shine'} css={{"--start-color": "colors.orange.500",}}></Skeleton>
              </Stack>
            </HStack>
            <HStack w={'100%'} gap={5}>
              <Stack flex={1}>
                <Skeleton height='10' w={'100%'} variant={'shine'} css={{"--start-color": "colors.orange.500",}}></Skeleton>
                <Skeleton height='100px' w={'100%'} variant={'shine'} css={{"--start-color": "colors.orange.500",}}></Skeleton>
              </Stack>
              <Stack flex={2}>
                <Skeleton height='10' w={'100%'} variant={'shine'} css={{"--start-color": "colors.orange.500",}}></Skeleton>
                <Skeleton height='100px' w={'100%'} variant={'shine'} css={{"--start-color": "colors.orange.500",}}></Skeleton>
              </Stack>
            </HStack>
            
          </Box>
        ):(
          <Box display={'flex'} flexWrap={'wrap'} gap={5} w={'100%'} h={'100%'}>
            {grupos.map((grupo, index) => (
              <Box p={2} _hover={{borderTopWidth:'2px', borderTopColor:'orange.focusRing'}} minW={'350px'} key={index}>
                <Accordion.Root key={index} size={'lg'} collapsible>
                  <Accordion.Item key={index} value={String(grupo.id)}>
                    <Box position={'relative'}>
                      <Accordion.ItemTrigger>
                        <Span flex={1}>{grupo.nome}</Span>
                      </Accordion.ItemTrigger>
                      <AbsoluteCenter axis={'vertical'} insetEnd={0} gap={2}>
                        <Button variant={'surface'} colorPalette={'orange'}>
                          <LuFilePenLine />
                        </Button>
                        <ModalFormCategoria item={grupo} />
                      </AbsoluteCenter>
                    </Box>
                    <Accordion.ItemContent display={'flex'} flexWrap={'wrap'} gap={2}>
                      {grupo.categorias.map((categoria, id)=>(
                        <Accordion.ItemBody key={id}>
                          <Badge variant={'solid'} key={id} colorPalette={'orange'}>
                            {categoria.nome}
                          </Badge>
                        </Accordion.ItemBody>
                      ))}
                    </Accordion.ItemContent>
                  </Accordion.Item>
                </Accordion.Root>
              </Box>
            ))}
          </Box>
        )}
      </Stack>
    </Container>
  )
}