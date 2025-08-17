import { NumberInput as ChackraNumberInput } from "@chakra-ui/react";
import * as React from "react"

export interface InputValorProps extends ChackraNumberInput.RootProps{
  name?: string
  placeholder?: string
}

export const InputValor = React.forwardRef<HTMLDivElement, InputValorProps>(
  function InputValor(props, ref){
    const {children, ...rest} = props

    return(
      <ChackraNumberInput.Root
        ref={ref}
        variant={'outline'}
        direction={'revert'}
        step={0.01}
        min={0}
        {...rest}
      >
        <ChackraNumberInput.Input placeholder={props.placeholder || ''} name={props.name}/>
      </ChackraNumberInput.Root>
    )
  }
)
