import { Container } from "@chakra-ui/react";
import { CadastroForm } from "./_components/CadastroForm";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Reverso | Crie sua conta',
  description: 'Crie sua conta para usar o sistema'
}

export default async function CadastroPage() {

  return (
    <Container h={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <CadastroForm/>
    </Container>
  )
}