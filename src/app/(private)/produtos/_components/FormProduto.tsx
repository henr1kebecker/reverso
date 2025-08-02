'use client'
import { GetAllCategoriaAction } from "@/actions/categorias";
import { CreateProdutoAction } from "@/actions/produto";
import { Button, CloseButton, createListCollection, Dialog, Field, Fieldset, HStack, Input, InputGroup, NumberInput, Portal, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuDollarSign } from "react-icons/lu";
import { withMask } from "use-mask-input";


type CategoriaItem = {
  value: number, label: string
}

export default function ModalFormCreateProduto(){

  const [cates, setValue] = useState<string[]>([])
  const listCat = createListCollection<CategoriaItem>({items:[]})
  const [categoriasList, setCategoriasList] = useState(()=>listCat)

  
  const action = async (data: FormData)=>{
    data.append('categoriaIds', JSON.stringify(cates))
    const creating = await CreateProdutoAction(data)
    console.log(creating) 
  }
  
  useEffect(()=>{
    const fetchCate = async ()=>{
      const categoriasDB =  await GetAllCategoriaAction(null)
      
      const newList = createListCollection({
        items: categoriasDB.map((item)=>({
          value: item.id,
          label: item.nome
        }))
      })
      setCategoriasList(newList)
    }
    fetchCate()

  },[])


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
              <form action={action}>
                <Dialog.Header>
                  <Dialog.Title>Cadastre o Produto</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Fieldset.Root>
                    <Fieldset.Content>
                      <Field.Root>
                        <Field.Label>Nome</Field.Label>
                        <Input name="nome"/>
                      </Field.Root>

                      <Field.Root>
                        <Field.Label>Categoria</Field.Label>
                        <Select.Root multiple collection={categoriasList} 
                          name="categoriaIds" 
                          onValueChange={(e)=> setValue(e.value)}
                        >
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
                                {categoriasList.items.map((cat) => (
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
                        >                       
                          <InputGroup startElement={<LuDollarSign/>}>
                            <NumberInput.Input name="preco" ref={withMask('decimal')}/>
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
                  <Button variant={'surface'} colorPalette={'orange'} type="submit">Salvar</Button>
                </Dialog.Footer>
              </form>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </HStack>
  )
}