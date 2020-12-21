import React, { PropsWithChildren } from 'react'
import { Button as MButton, ButtonProps as MButtonProps } from '@material-ui/core'

const defaultProps: Partial<MButtonProps> = {
  variant: 'contained',
  className: 'custom-button',
  color: 'primary',
}

export type ButtonProps = MButtonProps

export const Button = (props: PropsWithChildren<MButtonProps>) => <MButton {...defaultProps} {...props}>{props.children}</MButton>
