import React from 'react'
import { Box, BoxProps, Heading } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = BoxProps & {
  title?: string
  extra?: ReactNode
  hoverable?: boolean
}
export const Card = ({ title, extra, hoverable, ...props }: Props) => {
  return (
    <Box {...props}>
      <Heading size="sm">{title}</Heading>
      <Box>{extra}</Box>
    </Box>
  )
}
