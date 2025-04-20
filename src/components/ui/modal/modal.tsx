import { PropsWithChildren } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Fade,
  Grid,
  IconButton,
  ModalProps,
  Modal as MuiModal,
  Stack,
  Typography,
} from '@mui/material'

type TProps = PropsWithChildren &
  ModalProps & {
    open: boolean
    onClose: () => void
    title?: string
    withClose?: boolean
  }

const Modal = ({ open, onClose, title, withClose = true, children, ...rest }: TProps) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: { background: 'var(--backdrop)' },
          transitionDuration: 200,
        },
      }}
      {...rest}
    >
      <Fade
        in={open}
        style={{
          transitionDuration: '0.2s',
        }}
      >
        <Stack
          sx={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            width: { xs: '100%', sm: '600px' },
            maxWidth: `calc(100vw - ${withClose ? 24 : 16}px)`,
            overflow: 'visible',
            maxHeight: `calc(100dvh - ${withClose ? 24 : 16}px)`,
            padding: 2,
            borderRadius: 3,
            backgroundColor: 'var(--color-l1)',
          }}
          padding={2}
        >
          <Stack width="100%" alignItems="center" gap={2}>
            <Grid container width="100%" justifyContent="center" sx={{ position: 'relative' }}>
              {!!title && (
                <Typography fontSize="text-2xl" fontWeight="medium" component="h2" align="center">
                  {title}
                </Typography>
              )}
              {withClose && (
                <IconButton
                  onClick={onClose}
                  sx={{ position: 'absolute', right: -26, top: -26, padding: 0.5 }}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Grid>

            <Box overflow="auto" width="100%">
              {children}
            </Box>
          </Stack>
        </Stack>
      </Fade>
    </MuiModal>
  )
}

export { Modal }
