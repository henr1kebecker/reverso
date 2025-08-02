'use client'
import { Box, Button, Container, createListCollection, Heading, HStack, Input, InputGroup, Portal, Select, Separator, Stack, Text } from "@chakra-ui/react";
import { LuEye, LuPencil, LuSearchCode } from "react-icons/lu";
import ModalFormCreateProduto from "./FormProduto";
import { getAllProdutosService } from "@/services/produto";
import { useEffect, useState } from "react";
import { Categoria, Produto } from "@/generated/prisma";
import { GetAllProdutosActions } from "@/actions/produto";


const dados = createListCollection({
  items:[
  { value: 1, label: 'Carne' },
  { value: 2, label: 'Fruta' },
  { value: 3, label: 'Verdura' },
  ]
})

type ProdutoProps = Produto & {
  categorias: Categoria[]
}


export default function ProdutoListComponent(){

  const [produtos, setProdutos] = useState<ProdutoProps[]>([])
  const [search, setSearch] = useState<string>('')

  useEffect(()=>{
    const fetchProdutos = async ()=>{
      const data = await GetAllProdutosActions()
      setProdutos(data)
    }
    fetchProdutos()
  },[])

  const onSearch = (busca:string)=>{
    if(busca.length >= 1){
      const filterProd = produtos.filter((item) => item.nome.toLowerCase().includes(busca.toLowerCase()))
      setProdutos(filterProd)
    }
  }

  return(
    <Container fluid h={'90%'} p={'10px 0'}>
      <Box h={'100%'} display={'flex'} p={2} flexWrap={'wrap'} rounded={'md'} borderWidth={1} alignContent={'start'} gap={2}>
        <InputGroup endElement={<LuSearchCode/>} colorPalette={'orange'} >
          <Input placeholder="Pesquise pelo produto" onChange={(e)=>onSearch(e.target.value)}></Input>
        </InputGroup>
        <Button colorPalette={'orange'}>Importar XML</Button>
        <ModalFormCreateProduto/>
        <Text fontSize={'md'} alignSelf={'center'}>Filtros:</Text>
        <Select.Root collection={dados} width={'200px'}>
          <Select.HiddenSelect/>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Categoria"/>  
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.ClearTrigger/>
              <Select.Indicator/>
            </Select.IndicatorGroup>

          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {dados.items.map((cat) => (
                  <Select.Item item={cat} key={cat.value}>
                    {cat.label}
                    <Select.ItemIndicator/>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
        <Separator w={'100%'} size={'lg'} color={'orange.solid'}/>
        <Box display={'flex'} flexWrap={'wrap'} overflowY={'scroll'} w={'100%'} maxH={'80%'} gap={5}>
          {produtos.map((item)=>(
            <HStack display={'flex'} p={2} w={'100%'} h={'100px'} key={item.id}  rounded={'md'} bg={'gray.subtle'} justifyContent={'space-between'}>
              <Stack display={'flex'} minW={'20%'} h={'100%'} gap={0} justifyContent={'center'}>
                <Text fontSize={'sm'}>
                  Produto
                </Text>
                <Heading>{item.nome}</Heading>
              </Stack>
              <Stack display={'flex'} h={'100%'} minW={'20%'} gap={0} justifyContent={'center'}>
                <Text fontSize={'sm'}>
                  Categotia
                </Text>
                {item.categorias.map((cat)=>(
                  <Heading key={cat.nome}>{cat.nome}</Heading>
                ))}
              </Stack>
              <Stack display={'flex'} h={'100%'} minW={'20%'} gap={0} justifyContent={'center'}>
                <Text fontSize={'sm'}>
                  Preço
                </Text>
                <Heading>{item.precoUnitario.toFixed(2)}</Heading>
              </Stack>
              <Stack display={'flex'} h={'100%'} minW={'20%'} gap={0} justifyContent={'center'}>
                <Text fontSize={'sm'}>
                  Ações
                </Text>
                <Box gap={2} display={'flex'}>
                  <Button variant={'surface'} colorPalette={'orange'}>
                    <LuEye/>
                  </Button>
                  <Button variant={'surface'} colorPalette={'orange'}>
                    <LuPencil/>
                  </Button>
                  
                </Box>
              </Stack>
              
            </HStack>
          ))}
        </Box>
      </Box>
    </Container>
  )
}