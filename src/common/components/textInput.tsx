import React, {FC} from 'react'
import styled from 'styled-components'

type Props = {
  type?: 'text' | 'password'
  value?: string
  margin?: string
  placeholder?: string
  onChange(value: string): void
}

export const TextInput: FC<Props> = (props) => {

  return (
    <Input
      onChange={({target}) => props.onChange(target.value)}
      placeholder={props.placeholder}
      margin={props.margin}
      value={props.value}
      type={props.type ?? 'text'}/>
  )
}

const Input = styled.input<{
  margin?: string
}>`
  width: 100%;
  border: 1px solid #1A1A1A;
  border-radius: 6px;
  padding: 6px;
  box-sizing: border-box;
  margin: ${({margin}) => margin};
  outline: none;
  background: #1F1F1F;
  &:focus {
    border: 1px solid rgb(0, 95, 204);
    box-shadow: 0 0 0 1px rgb(0, 95, 204);
  }
`
