import React, { ChangeEvent } from 'react'
import { TextField, TextFieldProps } from '@material-ui/core'
import { noop } from 'lodash'

interface ExtraProps<T>{
  errMsg?: string
  onChange?: (name: T, value: any) => void
}

export type InputProps<K> =
  Omit<TextFieldProps, 'onChange'> &
  ExtraProps<K>

export function Input<F>(props: InputProps<F>) {
  const { onChange = noop, name, errMsg = '', ...rest } = props
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => onChange(name, evt.target.value)
  return <TextField variant='outlined' onChange={handleChange} {...(errMsg && { error: true, helperText: errMsg })} {...rest} />
}
