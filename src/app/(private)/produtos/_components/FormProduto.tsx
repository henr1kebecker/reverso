'use client'
import { Button, CloseButton, createListCollection, Dialog, Field, Fieldset, HStack, Input, InputGroup, NumberInput, NumberInputContext, Portal, Select } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { LuDollarSign } from "react-icons/lu";


const categorias = createListCollection({
  items: [
    { value: 1, label: "Carnes" },
  { value: 2, label: "Grãos" },
  { value: 3, label: "Temperos" },
  { value: 4, label: "Hortifruti" },
  { value: 5, label: "Óleos e Gorduras" },
  { value: 6, label: "Laticínios" },
  { value: 7, label: "Panificação" },
  { value: 8, label: "Doces e Sobremesas" },
  { value: 9, label: "Bebidas" },
  { value: 10, label: "Congelados" },
  { value: 11, label: "Enlatados" },
  { value: 12, label: "Limpeza" },
  { value: 13, label: "Higiene" },
  { value: 14, label: "Descartáveis" },
  { value: 15, label: "Outros" }
  ]
})


export default function ModalFormCreateProduto(){
  
  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues:{
      nome: '',
      categoria: [],
      preco: 0
    }
  })

  return(
    <HStack>
      <Dialog.Root key={'center'} placement={'center'} motionPreset={'slide-in-bottom'}>
        <Dialog.Trigger asChild>
          <Button colorPalette={'orange'}>Cadastrar</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop/>
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Cadastre o Produto</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Fieldset.Root>
                  <Fieldset.Content>
                    <Field.Root>
                      <Field.Label>Nome</Field.Label>
                      <Input name="Produto"/>
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Categoria</Field.Label>
                      <Select.Root multiple collection={categorias}>
                        <Select.HiddenSelect/>
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Categoria"/>  
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.ClearTrigger/>
                            <Select.Indicator/>
                          </Select.IndicatorGroup>
              
                        </Select.Control>
                        <Portal>
                          <Select.Positioner >
                            <Select.Content zIndex={15000}>
                              {categorias.items.map((cat) => (
                                <Select.Item item={cat} key={cat.value}>
                                  {cat.label}
                                  <Select.ItemIndicator/>
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Preço</Field.Label>
                      <NumberInput.Root locale="pt-BR"
                        formatOptions={{
                          style: "currency",
                          currency: "BRL",
                          currencyDisplay: "code",
                          currencySign: "accounting",
                        }}
                      >                       
                        <InputGroup startElement={<LuDollarSign/>}>
                          <NumberInput.Input />
                        </InputGroup>
                      </NumberInput.Root>
                    </Field.Root>

                  </Fieldset.Content>
                </Fieldset.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
                <Dialog.ActionTrigger asChild>
                  <Button variant={'outline'}>Voltar</Button>
                </Dialog.ActionTrigger>
                <Button variant={'surface'} colorPalette={'orange'}>Salvar</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </HStack>
  )
}