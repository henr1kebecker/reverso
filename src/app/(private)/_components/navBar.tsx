import { Box, Container, Image, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

type linkprops = {
  nome: string
  url: string
}

const LinkURL: linkprops[] = [
  {nome: 'Produtos', url: '/produtos'},
  {nome: 'Grupos / Categorias', url: '/grupos'},
  {nome: 'Iventários', url: '/inventarios'},
  {nome: 'Compras', url: '/compras'},
  {nome: 'Usuário / Perfil', url: '/perfil'},
]


export function NavBarComponent(){
  return(
    <Container display={'flex'} fluid p={1}  justifyContent={'center'} flexWrap={'wrap'} borderBottom={'2px solid'} borderBottomColor={'orange.solid'}>
      <Image src={'/logo-laranja.png'} w={'200px'}/>
      <Box w={'100%'} p={2} display={'flex'} justifyContent={'space-evenly'}>
        {LinkURL.map((item, index)=>(
          <ChakraLink key={index} href={item.url} p={2} _hover={{bg:'orange.solid'}} outline={'none'} textDecoration={'none'}>
            {item.nome}
          </ChakraLink>
        ))}
      </Box>
    </Container>
  )
}