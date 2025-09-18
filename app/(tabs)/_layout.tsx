import { Link, Tabs } from 'expo-router'
import { Button, useTheme, Theme } from 'tamagui'
import { Home, FolderOpen } from '@tamagui/lucide-icons'

function TabLayoutContent() {
  const theme = useTheme()

  // Early return if theme is not ready
  if (!theme) {
    return null
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.green10?.val || '#6b8e23',
        tabBarInactiveTintColor: theme.color9?.val || '#8b7355',
        tabBarStyle: {
          backgroundColor: theme.color1?.val || '#f5f5dc',
          borderTopColor: theme.color6?.val || '#d2b48c',
          paddingBottom: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: theme.color1?.val || '#f5f5dc',
          borderBottomColor: theme.color6?.val || '#d2b48c',
        },
        headerTintColor: theme.color12?.val || '#2f1b14',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Home color={color as any} size={24} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Button marginRight="$4" size="$3" variant="outlined">
                Profile
              </Button>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Projects',
          tabBarIcon: ({ color }) => <FolderOpen color={color as any} size={24} />,
        }}
      />
    </Tabs>
  )
}

export default function TabLayout() {
  return (
    <Theme name="light">
      <TabLayoutContent />
    </Theme>
  )
}
