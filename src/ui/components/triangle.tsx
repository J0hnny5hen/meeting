import React from 'react'
import { Tooltip as MTooltip, TooltipProps as MTooltipProps, withStyles } from '@material-ui/core'

export type TriangleProps = MTooltipProps

export function Triangle(props: TriangleProps) {
  const CustomTooltip = withStyles((theme) => ({
    arrow: { color: theme.palette.common.white },
    tooltip: {
      maxWidth: '241px',
      backgroundColor: theme.palette.common.white,
      color: '#323C47',
      boxShadow: theme.shadows[1],
      fontSize: '12px',
      border: '1px solid #E9EFF4',
      borderRadius: '8px',
      fontWeight: 400,
    },
  }))(MTooltip)
  return <CustomTooltip {...props} arrow />
}
