import { auth } from "@/lib/auth";
import { Container, Heading } from "@chakra-ui/react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function Home() {

  const session = await auth.api.getSession({
      headers: await headers()
    })
    if(!session){
      redirect('/login')
    }

  return (
    <Container>
      <Heading>
        Olá mundo, {session.user.name}
      </Heading>
    </Container>
  );
}
