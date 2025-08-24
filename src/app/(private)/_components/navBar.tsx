import { Box, Container, Image, Link as ChakraLink, Menu, Button, Portal } from "@chakra-ui/react";
import Link from "next/link";

type SubLink = {
  nome: string
  url: string
}

type LinkProps ={
  nome: string
  subLinks: SubLink[]
}

const LinkURL: SubLink[] = [
  {nome: 'Produtos', url: '/produtos'},
  {nome: 'Grupos / Categorias', url: '/grupos'},
  {nome: 'Iventários', url: '/inventarios'},
  {nome: 'Compras', url: '/compras'},
  {nome: 'Usuário / Perfil', url: '/perfil'},
]

const MenuLinks: LinkProps[] = [
  {
    nome: 'Estoque',
    subLinks: [
      {nome: 'Produtos', url: '/produtos'},
      {nome: 'Compras', url: '/compras'},
      {nome: 'Categorias e Grupo', url: '/grupos'},
      {nome: 'Invetário', url: '/inventario'},
    ]
  },
  {
    nome: 'Financeiro',
    subLinks: [
      {nome: 'Vendas', url: '/recebiveis'},
      {nome: 'A Pagar', url: '/duplicatas'},
      {nome: 'Relatórios', url: '/relatorios'},
      {nome: 'Fluxo de Caixa', url: '/fluxo-caixa'},
      {nome: 'Bancos', url: '/bancos'},
    ]
  },
  {
    nome: 'Usuário',
    subLinks: [
      {nome: 'Perfil', url: '/perfil'},
      
    ]
  },
  {
    nome: 'Controle de Produção',
    subLinks: [
      {nome: 'Perfil', url: '/perfil'},
      
    ]
  },

]


export function NavBarComponent(){
  return(
    <Container display={'flex'} fluid p={1}  justifyContent={'center'} flexWrap={'wrap'} borderBottom={'2px solid'} borderBottomColor={'orange.solid'}>
      <Image src={'/logo-laranja.png'} w={'200px'}/>
      <Box w={'100%'} p={2} display={'flex'} justifyContent={'space-evenly'}>
        <ChakraLink p={'0 10px'} href='/' textDecoration={'none'} cursor={'pointer'} focusRing={'none'}
          colorPalette={'orange'} color={'orange.solid'} _hover={{bgColor: 'orange.emphasized'}}
        >Início</ChakraLink>
        {MenuLinks.map((link)=>(
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant={'plain'} colorPalette={'orange'} color={'orange.solid'} focusRing={'none'} _hover={{bgColor: 'orange.emphasized'}}>
                {link.nome}
              </Button>
            </Menu.Trigger>
            <Portal >
              <Menu.Positioner>
                <Menu.Content colorPalette={'orange'}>
                  {link.subLinks.map((subItem)=>(
                    <Menu.Item value={subItem.nome} asChild >
                      <ChakraLink  href={subItem.url} textDecoration={'none'} color={'orange.solid'} cursor={'pointer'}>{subItem.nome}</ChakraLink>
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        ))}
      </Box>
    </Container>
  )
}