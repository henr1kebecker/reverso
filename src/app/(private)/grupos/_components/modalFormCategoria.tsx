'use client'
import { Button, Dialog, Field, Input, Portal } from "@chakra-ui/react";
import z from "zod";
import { useState } from "react";

import { LuPlus } from "react-icons/lu";
import { revalidatePath } from "next/cache";
import { CreateCategoriaAction } from "@/actions/categorias";
import { Categoria, GrupoCategoria } from "@/generated/prisma";

const schema = z.object({
  nome: z.string({error: 'Nome é obrigatório'}).min(4, {error: 'Mínimo de 4 dígitos'})

})

type GrupoProps = GrupoCategoria & {
  categorias: Categoria
}


export default function ModalFormCategoria({item}:{item : GrupoCategoria}){

  console.log(item)
  const [isLoading, setIsLoading] = useState(false)

  const action = async (data: FormData)=>{
    data.append('grupoId', `${item.id}`)
    setIsLoading(true)
    const creating = await CreateCategoriaAction(data)
    setIsLoading(false)
  }

  return(
    <Dialog.Root size={'md'} placement={'center'} motionPreset={'slide-in-bottom'}>
      <Dialog.Trigger asChild>
        <Button colorPalette={'orange'} variant={'outline'}>
          <LuPlus/> Criar Categoria
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop/>
        <Dialog.Positioner>
          <Dialog.Content p={5}>
            <Dialog.Header>
              <Dialog.Title>
                Crie uma nova Categoria
              </Dialog.Title>
            </Dialog.Header>
            <form action={action}>
              <Dialog.Body>
                <Field.Root>
                  <Field.Label>Nome da Categoria</Field.Label>
                  <Input name="nome" />
                  {/* {errors.nome && <Field.ErrorText>{errors.nome.message}</Field.ErrorText>} */}
                </Field.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant={'outline'}>Cancelar</Button>
                </Dialog.ActionTrigger>
                <Button colorPalette={'orange'} type="submit" loading={isLoading}>Salvar</Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>

    </Dialog.Root>
  )
}