import { useColorScheme } from 'react-native'
import { TamaguiProvider } from 'tamagui'
import { PortalProvider } from '@tamagui/portal'
import { ToastProvider, ToastViewport } from '@tamagui/toast'
import { CurrentToast } from './CurrentToast'
import { config } from '../tamagui.config'

interface ProviderProps {
  children: React.ReactNode
}

export function Provider({ children }: ProviderProps) {
  const colorScheme = useColorScheme()

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
    >
      <PortalProvider shouldAddRootHost>
        <ToastProvider swipeDirection="horizontal" duration={6000}>
          {children}
          <CurrentToast />
          <ToastViewport flexDirection="column-reverse" top="$8" left={0} right={0} />
        </ToastProvider>
      </PortalProvider>
    </TamaguiProvider>
  )
}