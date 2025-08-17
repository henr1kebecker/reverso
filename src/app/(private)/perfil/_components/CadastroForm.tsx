'use client'

import { PasswordInput } from "@/components/ui/password-input"
import { authClient } from "@/lib/auth-client"
import { Box, Button, Field, Fieldset, Heading, Image, Input, Text, VStack } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from 'zod'



const CadastroProps = z.object({
  nome: z.string({error:'Nome é obrigatório'}).min(3,{error: "Precisa ter no mínimo 3 digítos"}),
  email: z.email({error:'Insira um email válido para entrar'}),
  tipo: z.enum(['admin', 'user'],{error: 'Valor ausente ou inválido. Digite apenas admin ou user."'}),
  senha: z.string({error:'Insira sua senha para entrar'}).min(4, {error:'Senha deve conter no mínimo 4 digitos'}),
})

type ContaForm = z.infer<typeof CadastroProps>

export function CadastroForm(){

  const [loading, setLoading] = useState(false)
  const {register, handleSubmit, formState:{errors}, setError, reset} = useForm<ContaForm>({
    resolver: zodResolver(CadastroProps),
    defaultValues:{
      nome: '',
      email: '',
      tipo: 'user',
      senha: '',
    }
  })

  async function onSubmit(dataForm: ContaForm){
    setLoading(true)
    console.log(dataForm)
    const {data, error} = await authClient.admin.createUser({
      name: dataForm.nome,
      email: dataForm.email,
      password: dataForm.senha,
      role: dataForm.tipo,

      fetchOptions:{
        onSuccess(ctx){
          console.log(ctx)
          reset()
        },
        onRequest(ctx){
          console.log('requeste')
        },
        onError(ctx){
          console.log(ctx)
        }
      }
    })
    setLoading(false)
  }

  return (
    <Box display={'block'} w={'450px'} minH={'500px'} bg={'bg.muted'} rounded={10} p={10}>
      <Fieldset.Root>
        <Fieldset.Content>
          <VStack w={'100%'} p={2} justifyContent={'left'}>
            <Field.Root invalid={!!errors.nome}>
              <Field.Label w={'100%'}>Nome</Field.Label>
              <Input {...register('nome')} />
              {errors.nome && <Field.ErrorText>{errors.nome.message}</Field.ErrorText>}
            </Field.Root>
            <Field.Root invalid={!!errors.email}>
              <Field.Label w={'100%'}>Email</Field.Label>
              <Input {...register('email')}/>
              {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
            </Field.Root>
            <Field.Root invalid={!!errors.tipo}>
              <Field.Label w={'100%'}>Tipo</Field.Label>
              <Input {...register('tipo')} />
              {errors.tipo && <Field.ErrorText>{errors.tipo.message}</Field.ErrorText>}
            </Field.Root>
          </VStack>
          <VStack p={2} w={'100%'} justifyContent={'left'} >
            <Field.Root invalid={!!errors.senha}>
              <Field.Label w={'100%'}>Senha</Field.Label>
              <PasswordInput size="lg" {...register('senha')} />
              {errors.senha && <Field.ErrorText>{errors.senha.message}</Field.ErrorText>}
            </Field.Root>
          </VStack>
        </Fieldset.Content>
        <VStack p={2} w={'100%'} justifyContent={'left'} >
          <Button type='submit' loading={loading} bg={'orange.solid'} size={'lg'} onClick={handleSubmit(onSubmit)} 
            alignSelf={'center'}
          >
            CRIAR CONTA
          </Button>
        </VStack>

      </Fieldset.Root>
    </Box>
  )
}