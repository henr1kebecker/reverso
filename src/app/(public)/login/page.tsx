
import { Container } from "@chakra-ui/react";
import { LoginForm } from "./_components/loginForm";
import { Metadata } from "next";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Reverso | Faça Login',
  description: 'Faça login para usar o sistema'
}




export default async function LoginPage(){

  const session = await auth.api.getSession({
    headers: await headers()
  })
  if(session){
    redirect('/')
  }

  return(
    <Container h={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <LoginForm/>
    </Container>
  )
}