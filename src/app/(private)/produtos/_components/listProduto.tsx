'use client'
import { Box, Button, Container, createListCollection, type ListCollection, Heading, HStack, Input, InputGroup, Portal, Select, Separator, Stack, Text } from "@chakra-ui/react";
import { LuEye, LuPencil, LuSearchCode } from "react-icons/lu";
import ModalFormCreateProduto from "./FormProduto";
import { useEffect, useState } from "react";
import { Categoria, Produto } from "@/generated/prisma";


type ProdutoProps = Produto & {
  categorias: Categoria[]
}

type CategoriaProps = Categoria

type DataProps = {
  produtosItens: ProdutoProps[]
  categorias: CategoriaProps[]
}

type CategoriaItem = {
  value: number, label: string
}

export default function ProdutoListComponent(data:DataProps){

  const [produtos, setProdutos] = useState<ProdutoProps[]>(data.produtosItens || [])
  const listCat = createListCollection<CategoriaItem>({items:[]})
  const [categoriasList, setCategoriasList] = useState(()=>listCat)
  const [filter, setFilter] = useState<string[]>([])
  const [busca, setBusca] = useState<string>('')

  useEffect(()=>{
    const newList = createListCollection({
      items: data.categorias.map((item)=>({
        value: item.id,
        label: item.nome
      }))
    })
    setCategoriasList(newList)
  },[data])

  useEffect(()=>{
    if(filter.length >0){
      if(busca.trim().length > 0){
        const newData = data.produtosItens.filter(item => 
          item.categorias.some(cat => cat.id === Number(filter[0]))
        )
        setProdutos(newData.filter(item => item.nome.toLocaleLowerCase().includes(busca.trim().toLocaleLowerCase())))

      }else{
        const newData = data.produtosItens.filter(item => 
          item.categorias.some(cat => cat.id === Number(filter[0]))
        )
        setProdutos(newData)
      }
    }else{
      if(busca.trim().length > 0){
        const newData = data.produtosItens.filter(item => item.nome.toLocaleLowerCase().includes(busca.trim().toLocaleLowerCase()))
        setProdutos(newData)
      }else{
        setProdutos(data.produtosItens)
      }
    }
  },[filter, busca])

  return(
    <Container fluid h={'90%'} p={'10px 0'}>
      <Box h={'100%'} display={'flex'} p={2} flexWrap={'wrap'} rounded={'md'} borderWidth={1} alignContent={'start'} gap={2}>
        <InputGroup endElement={<LuSearchCode/>} colorPalette={'orange'} >
          <Input placeholder="Pesquise pelo produto" onChange={(e)=>setBusca(e.target.value)}></Input>
        </InputGroup>
        <Button colorPalette={'orange'}>Importar XML</Button>
        <ModalFormCreateProduto categorias={categoriasList}/>
        <Text fontSize={'md'} alignSelf={'center'}>Filtros:</Text>
        <Select.Root collection={categoriasList} width={'200px'}
          onValueChange={(e)=> setFilter(e.value)}
        >
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
              <Select.Content >
                {categoriasList.items.map((cat) => (
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
                <Heading>R$ {item.precoUnitario.toFixed(2)}</Heading>
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