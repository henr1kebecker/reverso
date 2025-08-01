'use client'
import { Box, Button, Container, createListCollection, Heading, HStack, Input, InputGroup, Portal, Select, Separator, Stack, Text } from "@chakra-ui/react";
import { LuEye, LuPencil, LuSearchCode } from "react-icons/lu";
import ModalFormCreateProduto from "./FormProduto";


const dados = createListCollection({
  items:[
  { value: 1, label: 'Carne' },
  { value: 2, label: 'Fruta' },
  { value: 3, label: 'Verdura' },
  ]
})

const produtos = [
  { id: 1, nome: "Filé de Frango", categoria: "Carnes", preco: 22.50 },
  { id: 2, nome: "Arroz Agulhinha", categoria: "Grãos", preco: 4.90 },
  { id: 3, nome: "Alho", categoria: "Temperos", preco: 12.00 },
  { id: 4, nome: "Tomate Italiano", categoria: "Hortifruti", preco: 6.30 },
  { id: 5, nome: "Cebola Roxa", categoria: "Hortifruti", preco: 5.20 },
  { id: 6, nome: "Óleo de Soja", categoria: "Óleos e Gorduras", preco: 7.90 },
  { id: 7, nome: "Feijão Carioca", categoria: "Grãos", preco: 6.80 },
  { id: 8, nome: "Carne Moída Bovina", categoria: "Carnes", preco: 28.70 },
  { id: 9, nome: "Queijo Muçarela", categoria: "Laticínios", preco: 34.90 },
  { id: 10, nome: "Farinha de Trigo", categoria: "Panificação", preco: 3.50 },
  { id: 11, nome: "Leite Integral", categoria: "Laticínios", preco: 4.60 },
  { id: 12, nome: "Pimentão Verde", categoria: "Hortifruti", preco: 4.00 },
  { id: 13, nome: "Manteiga Sem Sal", categoria: "Laticínios", preco: 19.80 },
  { id: 14, nome: "Açúcar Cristal", categoria: "Doces e Sobremesas", preco: 3.90 },
  { id: 15, nome: "Sal Refinado", categoria: "Temperos", preco: 2.20 }
]


export default function ProdutoListComponent(){

  return(
    <Container fluid h={'90%'} p={'10px 0'}>
      <Box h={'100%'} display={'flex'} p={2} flexWrap={'wrap'} rounded={'md'} borderWidth={1} alignContent={'start'} gap={2}>
        <InputGroup endElement={<LuSearchCode/>} colorPalette={'orange'} >
          <Input placeholder="Pesquise pelo produto"></Input>
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
                <Heading>{item.categoria}</Heading>
              </Stack>
              <Stack display={'flex'} h={'100%'} minW={'20%'} gap={0} justifyContent={'center'}>
                <Text fontSize={'sm'}>
                  Preço
                </Text>
                <Heading>{item.preco.toFixed(2)}</Heading>
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