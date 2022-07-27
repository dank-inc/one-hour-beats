import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

type Props = BoxProps

export const Col = (props: Props) => {
  return (
    <Box alignItems="middle" display="flex" flexDirection="column" {...props} />
  )
}
