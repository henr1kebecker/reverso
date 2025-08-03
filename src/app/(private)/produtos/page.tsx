import { Box, Container, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import ProdutoListComponent from "./_components/listProduto";
import { getAllProdutosService } from "@/services/produto";
import { GetAllCategoriaService } from "@/services/categoria";


export default async function ProdutosPage(){

  const produtosList = await getAllProdutosService()
  const categoriasList = await GetAllCategoriaService(null)

  return (
    <Container display={'flex'} flexWrap={'wrap'} h={'80vh'} justifyContent={'center'} alignItems={'start'}>
      <HStack display={'block'} w={'100%'} minH={'100px'} maxH={'140px'} mt={2} borderWidth={1} borderColor={'orange.subtle'} rounded={'md'} p={2}>
        <Heading color={'orange.500'}>Gerenciamento de Produtos</Heading>
        <Text fontSize={'sm'}>Tenha controle sobre os seus produtos de forma fácil. Cadastre através da importação do XML da nota fiscal ou preencha 
          manualmente os dados do produto.
        </Text>
      </HStack>
      <ProdutoListComponent produtosItens={produtosList} categorias={categoriasList}/>

    </Container>
  )
}