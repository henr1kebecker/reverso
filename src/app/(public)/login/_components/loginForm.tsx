'use client'

import { PasswordInput } from "@/components/ui/password-input"
import { Box, Button, Field, Fieldset, Heading, Image, Input, Text, VStack } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { authClient } from "@/lib/auth-client"


const loginProps = z.object({
  email: z.email({error:'Insira um email válido para entrar'}),
  senha: z.string({error:'Insira sua senha para entrar'}).min(4, {error:'Senha deve conter no mínimo 4 digitos'}),
})

type LoginForm = z.infer<typeof loginProps>

export function LoginForm(){

  const [loading, setLoading] = useState(false)
  const {register, handleSubmit, formState:{errors}, setError} = useForm<LoginForm>({
    resolver: zodResolver(loginProps),
    defaultValues:{
      email: '',
      senha: '',
    }
  })

  async function onSubmit(dataform: LoginForm){
    setLoading(true)

    await authClient.signIn.email({
      email: dataform.email,
      password: dataform.senha,
      callbackURL:'/',
      fetchOptions:{
        onSuccess(ctx){
          console.log('sucesso!!!')
        },
        onRequest(ctx) {
          console.log('Request!')  
        },
        onError(error){
          console.log('error')
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
          <Text>Faça login</Text>
        </VStack>
        <Fieldset.Content>
          <VStack w={'100%'} p={2} justifyContent={'left'}>
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
            ENTRAR
          </Button>
        </VStack>

      </Fieldset.Root>
    </Box>
  )
}