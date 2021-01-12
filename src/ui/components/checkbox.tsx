import React, { ChangeEvent } from 'react'
import {
  Box,
  FormControl,
  FormControlLabel,
  Checkbox as MCheckbox,
  CheckboxProps as MCheckboxProps,
  FormControlLabelProps,
  makeStyles,
} from '@material-ui/core'
import { noop } from 'lodash'

interface ExtraProps<T>{
  errMsg?: string
  onChange?: (name: T, value: any) => void
}

export type CheckboxProps<K> =
  Omit<MCheckboxProps, 'onChange'> &
  Pick<FormControlLabelProps, 'label'> &
  ExtraProps<K> &
  { labelCls: string, name: string }

const useStyles = makeStyles({
  checkbox__container: { alignItems: 'center', margin: '0' },
  checkbox__label: { paddingLeft: '2px' },
})

export function Checkbox<F>(props: CheckboxProps<F>) {
  const { name, label, checked, onChange = noop } = props
  const styles = useStyles()
  const handleChange = (_evt: ChangeEvent, status: boolean) => { onChange(name, status) }
  const checkbox = <MCheckbox size='small' name={name} color='primary' checked={checked} onChange={handleChange} />
  const labelElm = <Box fontSize='12px'>{label}</Box>

  return (
    <Box>
      <FormControl className={`${styles.checkbox__container}`}>
        <FormControlLabel control={checkbox} label={labelElm} className={props.labelCls} checked={checked} />
      </FormControl>
    </Box>
  )
}
