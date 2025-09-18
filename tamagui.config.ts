import { themes } from './themes'
import { createTamagui } from '@tamagui/core'
import { defaultConfig } from '@tamagui/config/v4'

export const config = createTamagui({
  ...defaultConfig,
  themes,
})
