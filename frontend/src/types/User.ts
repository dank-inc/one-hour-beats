import { ColorName } from 'constants/ColorPalette'
import { VoteToken } from 'types/VoteToken'

export type User = {
  id: string
  username: string
  password: string
  name: string // full name
  email: string
  color: ColorName
  created_at?: string
  updated_at?: string
}

export type UserView = User & {
  vote_tokens: VoteToken[]
}
