import { Container } from "@chakra-ui/react";
import ListViewComponent from "./_components/ListView";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";



export default async function GruposPage(){


  return(
    <Container fluid p={5} display={'flex'} flexWrap={'wrap'} justifyContent={'center'} gap={10}>
      <ListViewComponent />
      
    </Container>
  )
}