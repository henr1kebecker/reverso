import { Box, Button, Container, Field, Fieldset, Text } from "@chakra-ui/react";
import ListaGrupoComponent from "./_components/listaGrupo";
import { prisma } from "@/lib/auth";
import ModalFormGrupo from "./_components/modalFormGrupo";



export default async function GruposPage(){

  const response = await prisma.grupoCategoria.findMany({
    orderBy:{
      nome: 'asc'
    }
  })
  

  return(
    <Container fluid p={5} display={'flex'} flexWrap={'wrap'} justifyContent={'space-around'} gap={10}>
      <Box display={'block'} w={{base:'90%', md:'40%'}} shadow={'2px 2px 10px var(--chakra-colors-orange-emphasized)'} 
       minH={'70vh'} rounded={'md'}
      >
        <Box display={'flex'}  justifyContent={'space-between'} p={2} alignItems={'center'}>
          <Text fontSize={'lg'}>Gerencie os Grupos</Text>
          {/* <Button colorPalette={'orange'} >Novo Grupo</Button> */}
          <ModalFormGrupo/>
        </Box>
        <ListaGrupoComponent data={response}/>
      </Box>
      <Box display={'block'} w={{base:'90%', md:'40%'}} shadow={'2px 2px 10px var(--chakra-colors-orange-emphasized)'} 
       minH={'70vh'} rounded={'md'}
      >
        <Box display={'flex'}  justifyContent={'space-between'} p={2} alignItems={'center'}>
          <Box display={'block'}>
            <Text fontSize={'lg'}>Gerencie as Categorias</Text>
            <Field.Root>
              <Field.HelperText>Certifique-se de criar um grupo caso necessário para a nova categoria. </Field.HelperText>
            </Field.Root>
          </Box>
          <Button colorPalette={'orange'} >Nova Categoria</Button>
        </Box>
      </Box>
      
    </Container>
  )
}