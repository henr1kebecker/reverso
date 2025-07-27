import { Box, Button, Container, Field, Fieldset, Text } from "@chakra-ui/react";
import ListaGrupoComponent from "./_components/listaGrupo";
import ModalFormGrupo from "./_components/modalFormGrupo";
import { GetAllGrupoActions } from "@/actions/grupoCategoria";
import ListaCategoriasComponent from "./_components/listaCategorias";
import { GetAllCategoriaAction } from "@/actions/categorias";
import ListViewComponent from "./_components/ListView";



export default async function GruposPage(){

  // const response = await GetAllGrupoActions(null);
  // const responseCategorias = await GetAllCategoriaAction(null)
  

  return(
    <Container fluid p={5} display={'flex'} flexWrap={'wrap'} justifyContent={'center'} gap={10}>
      <ListViewComponent />
      
    </Container>
  )
}