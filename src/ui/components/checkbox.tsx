import React from 'react'
import { FormControl, FormControlLabel, Checkbox as MCheckbox, CheckboxProps as MCheckboxProps, FormControlLabelProps } from '@material-ui/core'

export type CheckboxProps = MCheckboxProps & Pick<FormControlLabelProps, 'label'>

export function Checkbox(props: CheckboxProps) {
  const { name, label, checked, onChange } = props
  const checkbox = <MCheckbox name={name} color='primary' checked={checked} onChange={onChange} />

  return (
    <FormControl>
      <FormControlLabel control={checkbox} label={label} />
    </FormControl>
  )
}
