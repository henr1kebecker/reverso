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
  senha: z.string({error:'Insira sua senha para entrar'}).min(4, {error:'Senha deve conter no mínimo 4 digitos'}),
})

type ContaForm = z.infer<typeof CadastroProps>

export function CadastroForm(){

  const [loading, setLoading] = useState(false)
  const {register, handleSubmit, formState:{errors}, setError} = useForm<ContaForm>({
    resolver: zodResolver(CadastroProps),
    defaultValues:{
      nome: '',
      email: '',
      senha: '',
    }
  })

  async function onSubmit(dataForm: ContaForm){
    setLoading(true)
    const {data, error} = await authClient.signUp.email({
      name: dataForm.nome,
      email: dataForm.email,
      password: dataForm.senha,
      callbackURL: '/',
      fetchOptions:{
        onSuccess(ctx){
          console.log(ctx)
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
    <Box display={'block'} w={'400px'} minH={'500px'} boxShadow={'5px 5px 7px rgb(255, 94, 0)'} rounded={10} p={10}>
      <Fieldset.Root>

        <VStack p={2} >
          <Image src={'/logo-laranja.png'} alt="Logo Santo Grão" />
          <Text>Crie sua conta.</Text>
        </VStack>
        <Fieldset.Content>
          <VStack w={'100%'} p={2} justifyContent={'left'}>
            <Field.Root invalid={!!errors.nome}>
              <Field.Label w={'100%'}>Nome</Field.Label>
              <Input {...register('nome')} />
              {errors.nome && <Field.ErrorText>{errors.nome.message}</Field.ErrorText>}
            </Field.Root>
            <Field.Root invalid={!!errors.email}>
              <Field.Label w={'100%'}>Email</Field.Label>
              <Input {...register('email')} />
              {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
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