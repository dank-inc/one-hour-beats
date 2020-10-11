import { ColorName } from 'constants/ColorPalette'

export type Chat = {
  jam_id: string
  user_id: string
  message: string
  created_at?: string
  updated_at?: string
}

export type ChatView = Chat & {
  id: string
  username?: string
  color: ColorName
}
