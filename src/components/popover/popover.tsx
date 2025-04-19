import { PropsWithChildren } from 'react'

import { BoxProps, Popover as MuiPopover, PopoverProps, Stack, Zoom } from '@mui/material'

type TProps = PropsWithChildren &
  Omit<PopoverProps, 'open' | 'anchorEl' | 'onClose'> & {
    anchorEl: HTMLElement | null
    onClose: () => void
    maxWidth?: number
    fixedWidth?: boolean
    fitContent?: boolean
    cardProps?: BoxProps
    withBackdrop?: boolean
  }

const Popover = ({
  anchorEl,
  onClose,
  cardProps,
  children,
  fixedWidth,
  fitContent,
  ...rest
}: TProps) => {
  return (
    <MuiPopover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transitionDuration={100}
      TransitionComponent={Zoom}
      TransitionProps={{
        easing: {
          enter: 'cubic-bezier(0.02,0.56,0.39,0.98)',
          exit: 'cubic-bezier(0.66,0.01,0.99,0.38)',
        },
      }}
      {...rest}
    >
      <Stack padding={2}>{children}</Stack>
    </MuiPopover>
  )
}

export { Popover }
