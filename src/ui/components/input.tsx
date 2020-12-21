import React, { ChangeEvent } from 'react'
import { TextField, TextFieldProps } from '@material-ui/core'
import { noop } from 'lodash'

export type InputProps = Omit<TextFieldProps, 'onChange'> & { onChange?: (name: string, evt: React.ChangeEvent<HTMLInputElement>) => void }

export function Input(props: InputProps) {
  const { onChange = noop, name, error = null, ...rest } = props
  const handleChange = (evt: ChangeEvent) => onChange(name, evt)
  return <TextField variant='outlined' onChange={handleChange} {...(error && { error: true, helperText: error })} {...rest} />
}
