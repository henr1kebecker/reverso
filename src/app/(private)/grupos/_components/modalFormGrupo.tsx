'use client'
import { Button, Dialog, Field, Input, Portal } from "@chakra-ui/react";
import z from "zod";
import { useState } from "react";
import { CreateCategoriaAction } from "@/actions/grupoCategoria";

const schema = z.object({
  nome: z.string({error: 'Nome é obrigatório'}).min(4, {error: 'Mínimo de 4 dígitos'})
})

type formSchema = z.infer<typeof schema>

export default function ModalFormGrupo(){

  const [isLoading, setIsLoading] = useState(false)

  const action = async (data: FormData)=>{
    console.log(data)
    setIsLoading(true)
    const creating = await CreateCategoriaAction(data)
    console.log(creating)
    setIsLoading(false)
  }

  return(
    <Dialog.Root size={'md'} placement={'center'} motionPreset={'slide-in-bottom'}>
      <Dialog.Trigger asChild>
        <Button colorPalette={'orange'} >Novo Grupo</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop/>
        <Dialog.Positioner>
          <Dialog.Content p={5}>
            <Dialog.Header>
              <Dialog.Title>
                Crie um novo Grupo
              </Dialog.Title>
            </Dialog.Header>
            <form action={action}>
              <Dialog.Body>
                <Field.Root>
                  <Field.Label>Nome do Grupo</Field.Label>
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