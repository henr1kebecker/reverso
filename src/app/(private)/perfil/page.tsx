import { auth } from "@/lib/auth";
import { Avatar, Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CadastroForm } from "./_components/CadastroForm";



export default async function PerfilPage(){

  const session = await auth.api.getSession({
    headers: await headers()
  })
  if(!session){
    redirect('/login')
  }
  
  return(
    <Container display={'flex'} flexWrap={'wrap'} minH={'80%'} p={10} justifyContent={'center'} gap={20}>
      <Box w={'450px'} h={'300px'} p={4} spaceY={10}
        display={'block'} bg={'bg.emphasized'} rounded={'md'}
      >
        <Stack d={'flex'} w={'100%'} alignItems={'center'}>
          <Avatar.Root size={'2xl'} key={'2xl'}>
            <Avatar.Fallback name={session.user.name} />
            <Avatar.Image src={session.user.image ? session.user.image : "https://bit.ly/sage-adebayo"}/>
          </Avatar.Root>
        </Stack>
        <Stack d={'flex'} w={'100%'} alignItems={'center'}>
          <Heading>{session.user.name}</Heading>
          <Text>{session.user.email}</Text>
        </Stack>
        <Stack d={'flex'} w={'100%'} justifyContent={'center'} gap={10} flexDirection={'row'}>
          <Button variant={'solid'}  colorPalette={'orange'}>Editar</Button>
          <Button variant={'subtle'} colorPalette={'orange'}>Mudar Senha</Button>
        </Stack>
      </Box>
      {session.user.role === 'admin' ? 
        <CadastroForm/>
        :
        <></>
      }
      
    </Container>
  )
}