'use client'

import { Categoria, Produto } from "@/generated/prisma";
import { Button, CloseButton, createListCollection, type ListCollection, Dialog, Field, Fieldset, HStack, Input, InputGroup, NumberInput, Portal, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { LuDollarSign, LuPencil } from "react-icons/lu";
import { withMask } from "use-mask-input";
import { InputValor } from "./InputMask";
import { UpDateProdutoAction } from "@/actions/produto";


type Props = {
  produto: ItemProps
  cats: ListCollection<{ value: number; label: string }>
}

type ItemProps = Produto & {
  categorias: Categoria[]
}

export default function ModalFormUpdateProduto({produto, cats}: Props){

  const defaultSelectedIds  = produto.categorias.map(c => String(c.id))
  const [selectedCats, setSelectedCats] = useState<string[]>(defaultSelectedIds)
  

  const { handleSubmit, formState: {errors, dirtyFields}, control} = useForm({
    defaultValues:{
      nome: produto.nome,
      categoriaIds: produto.categorias.map(cat => String(cat.id)),
      preco: produto.precoUnitario.toFixed(2)
    }
  })

  const catsString = createListCollection<{ value: string; label: string }>({
    items: cats.items.map(item => ({
      value: String(item.value),
      label: item.label
    }))
  })

  function arraysIguais<T>(a: T[], b: T[]){
    if(a.length !== b.length) return false
    const ordA = [...a].sort()
    const ordB = [...b].sort()
    return ordA.every((valor, index)=> valor === ordB[index])
  }
  
  const action = handleSubmit  (async(data) =>{
    const formData = new FormData()
    const dataUp = dirtyFields
    if(dirtyFields.nome){
      formData.append('nome', data.nome)
    }
    if(dirtyFields.categoriaIds){
      formData.append('categoriasIds', JSON.stringify(data.categoriaIds))
    }
    if(dirtyFields.preco){
      formData.append('preco', data.preco)
    }
    if([...formData.entries()].length === 0){
      
    }else{
      formData.append('id', produto.id)
      const prod = await UpDateProdutoAction(formData)
      console.log(prod)
    }


  })

  const decimalMask = (value: string) => {
  // Sempre termina com vírgula e 2 decimais
  const length = value.replace(/\D/g, "").length;
  const intPart = Math.max(length - 2, 1); // pelo menos 1 dígito antes da vírgula
  return "9".repeat(intPart) + ",99";
  };

  return(
    <HStack>
      <Dialog.Root key={'center'} placement={'center'} motionPreset={'slide-in-bottom'}>
        <Dialog.Trigger asChild>
          <Button variant={'surface'} colorPalette={'orange'}>
            <LuPencil/>
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop/>
          <Dialog.Positioner>
            <Dialog.Content>
              <form onSubmit={action}>
                <Dialog.Header>
                  <Dialog.Title>Cadastre o Produto</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Fieldset.Root>
                    <Fieldset.Content>
                      <Field.Root>
                        <Field.Label>Nome</Field.Label>
                        <Controller 
                          control={control}
                          name="nome"
                          render={({field})=>(
                            <Input name={field.name} value={field.value}
                              onChange={(e)=> field.onChange(e.target.value)}
                            />
                          )}
                        />
                      </Field.Root>

                      <Field.Root>
                        <Field.Label>Categoria</Field.Label>
                        <Controller
                          control={control}
                          name='categoriaIds'
                          render={(({field})=>(
                            <Select.Root multiple collection={catsString} 
                              name={field.name}
                              value={field.value} 
                              onValueChange={({value})=> field.onChange(value)}
                              
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
                                    {catsString.items.map((item) => (
                                      <Select.Item item={item} key={item.value}>
                                        {item.label}
                                        <Select.ItemIndicator/>
                                      </Select.Item>
                                    ))}
                                  </Select.Content>
                                </Select.Positioner>
                              </Portal>
                            </Select.Root>
                          ))}
                        />
                      </Field.Root>

                      <Field.Root>
                        <Field.Label>Preço</Field.Label>
                        <Controller 
                          control={control}
                          name='preco'
                          render={({field})=>(
                            <NumberInput.Root locale="pt-BR"
                            >                       
                              <InputGroup startElement={<LuDollarSign/>}>
                                <NumberInput.Input {...field}
                                  onChange={(e)=>{
                                    let valor = e.target.value.replace(/\D/g, "")
                                    valor = (Number(valor)/100).toFixed(2)
                                    field.onChange(valor)
                                  }}
                                  textAlign={'right'}
                                />
                              </InputGroup>
                            </NumberInput.Root>
                          )}
                        />
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
                  <Button variant={'surface'} colorPalette={'orange'} type="submit">Atualizar</Button>
                </Dialog.Footer>
              </form>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </HStack>
  )
}