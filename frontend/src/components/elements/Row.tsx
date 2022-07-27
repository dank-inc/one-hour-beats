import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

type Props = BoxProps

export const Row = (props: Props) => {
  return (
    <Box
      justifyContent="space-between"
      alignItems="middle"
      display="flex"
      flexDirection="row"
      {...props}
    />
  )
}
