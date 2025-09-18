import { 
  Building2, 
  Users, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Plus,
  BarChart3,
  HardHat
} from '@tamagui/lucide-icons'
import { 
  Anchor, 
  Button, 
  Card, 
  H1, 
  H3, 
  H4, 
  Paragraph, 
  ScrollView, 
  Separator, 
  XStack, 
  YStack 
} from 'tamagui'

export default function HomeScreen() {
  return (
    <ScrollView flex={1} bg="$background">
      <YStack flex={1} px="$4" pt="$6" pb="$4" gap="$6">
        {/* Header Section */}
        <YStack gap="$2">
          <XStack items="center" gap="$3">
            <HardHat size="$2" color="$color10" />
            <H1 color="$color12" fontSize="$9" fontWeight="600">
              Infrloop
            </H1>
          </XStack>
          <Paragraph color="$color11" fontSize="$4" opacity={0.8}>
            Construction Management Made Simple
          </Paragraph>
        </YStack>

        {/* Quick Stats Cards */}
        <YStack gap="$3">
          <H3 color="$color12" fontSize="$6" fontWeight="500">
            Project Overview
          </H3>
          
          <XStack gap="$3" flexWrap="wrap">
            <Card 
              flex={1} 
              minWidth={160} 
              p="$4" 
              bg="$color2" 
              borderColor="$color5" 
              borderWidth={1}
              hoverStyle={{ bg: '$color3' }}
              pressStyle={{ bg: '$color4' }}
            >
              <YStack gap="$2">
                <XStack items="center" justify="space-between">
                  <Building2 size="$1.5" color="$green10" />
                  <Paragraph fontSize="$7" fontWeight="700" color="$color12">
                    12
                  </Paragraph>
                </XStack>
                <Paragraph color="$color11" fontSize="$3">
                  Active Projects
                </Paragraph>
              </YStack>
            </Card>

            <Card 
              flex={1} 
              minWidth={160} 
              p="$4" 
              bg="$color2" 
              borderColor="$color5" 
              borderWidth={1}
              hoverStyle={{ bg: '$color3' }}
              pressStyle={{ bg: '$color4' }}
            >
              <YStack gap="$2">
                <XStack items="center" justify="space-between">
                  <Users size="$1.5" color="$blue10" />
                  <Paragraph fontSize="$7" fontWeight="700" color="$color12">
                    47
                  </Paragraph>
                </XStack>
                <Paragraph color="$color11" fontSize="$3">
                  Team Members
                </Paragraph>
              </YStack>
            </Card>
          </XStack>

          <XStack gap="$3" flexWrap="wrap">
            <Card 
              flex={1} 
              minWidth={160} 
              p="$4" 
              bg="$color2" 
              borderColor="$color5" 
              borderWidth={1}
              hoverStyle={{ bg: '$color3' }}
              pressStyle={{ bg: '$color4' }}
            >
              <YStack gap="$2">
                <XStack items="center" justify="space-between">
                  <Clock size="$1.5" color="$yellow10" />
                  <Paragraph fontSize="$7" fontWeight="700" color="$color12">
                    8
                  </Paragraph>
                </XStack>
                <Paragraph color="$color11" fontSize="$3">
                  Tasks Due Today
                </Paragraph>
              </YStack>
            </Card>

            <Card 
              flex={1} 
              minWidth={160} 
              p="$4" 
              bg="$color2" 
              borderColor="$color5" 
              borderWidth={1}
              hoverStyle={{ bg: '$color3' }}
              pressStyle={{ bg: '$color4' }}
            >
              <YStack gap="$2">
                <XStack items="center" justify="space-between">
                  <CheckCircle size="$1.5" color="$green10" />
                  <Paragraph fontSize="$7" fontWeight="700" color="$color12">
                    94%
                  </Paragraph>
                </XStack>
                <Paragraph color="$color11" fontSize="$3">
                  Safety Score
                </Paragraph>
              </YStack>
            </Card>
          </XStack>
        </YStack>

        {/* Recent Projects */}
        <YStack gap="$3">
          <XStack items="center" justify="space-between">
            <H3 color="$color12" fontSize="$6" fontWeight="500">
              Recent Projects
            </H3>
            <Button 
              size="$3" 
              variant="outlined" 
              borderColor="$color6"
              color="$color11"
              icon={Plus}
            >
              New Project
            </Button>
          </XStack>

          <Card 
            p="$4" 
            bg="$color2" 
            borderColor="$color5" 
            borderWidth={1}
            hoverStyle={{ bg: '$color3' }}
            pressStyle={{ bg: '$color4' }}
          >
            <YStack gap="$3">
              <XStack items="center" justify="space-between">
                <H4 color="$color12" fontSize="$5" fontWeight="500">
                  Downtown Office Complex
                </H4>
                <XStack items="center" gap="$2" bg="$green5" px="$2" py="$1" rounded="$2">
                  <CheckCircle size="$0.75" color="$green10" />
                  <Paragraph fontSize="$2" color="$green11" fontWeight="500">
                    On Track
                  </Paragraph>
                </XStack>
              </XStack>
              
              <Paragraph color="$color11" fontSize="$3">
                Progress: 67% • Due: Dec 15, 2024
              </Paragraph>
              
              <XStack gap="$2">
                <Paragraph fontSize="$2" color="$color10">
                  Budget: $2.4M
                </Paragraph>
                <Separator vertical />
                <Paragraph fontSize="$2" color="$color10">
                  Team: 12 members
                </Paragraph>
              </XStack>
            </YStack>
          </Card>

          <Card 
            p="$4" 
            bg="$color2" 
            borderColor="$color5" 
            borderWidth={1}
            hoverStyle={{ bg: '$color3' }}
            pressStyle={{ bg: '$color4' }}
          >
            <YStack gap="$3">
              <XStack items="center" justify="space-between">
                <H4 color="$color12" fontSize="$5" fontWeight="500">
                  Residential Tower A
                </H4>
                <XStack items="center" gap="$2" bg="$yellow5" px="$2" py="$1" rounded="$2">
                  <AlertTriangle size="$0.75" color="$yellow10" />
                  <Paragraph fontSize="$2" color="$yellow11" fontWeight="500">
                    At Risk
                  </Paragraph>
                </XStack>
              </XStack>
              
              <Paragraph color="$color11" fontSize="$3">
                Progress: 23% • Due: Nov 30, 2024
              </Paragraph>
              
              <XStack gap="$2">
                <Paragraph fontSize="$2" color="$color10">
                  Budget: $1.8M
                </Paragraph>
                <Separator vertical />
                <Paragraph fontSize="$2" color="$color10">
                  Team: 8 members
                </Paragraph>
              </XStack>
            </YStack>
          </Card>
        </YStack>

        {/* Quick Actions */}
        <YStack gap="$3">
          <H3 color="$color12" fontSize="$6" fontWeight="500">
            Quick Actions
          </H3>
          
          <XStack gap="$3" flexWrap="wrap">
            <Button 
              flex={1} 
              minWidth={140}
              size="$4" 
              bg="$green8" 
              color="white"
              icon={Plus}
              hoverStyle={{ bg: '$green9' }}
              pressStyle={{ bg: '$green7' }}
            >
              Create Task
            </Button>
            
            <Button 
              flex={1} 
              minWidth={140}
              size="$4" 
              variant="outlined"
              borderColor="$color6"
              color="$color11"
              icon={Users}
            >
              Manage Team
            </Button>
            
            <Button 
              flex={1} 
              minWidth={140}
              size="$4" 
              variant="outlined"
              borderColor="$color6"
              color="$color11"
              icon={BarChart3}
            >
              View Reports
            </Button>
            
            <Button 
              flex={1} 
              minWidth={140}
              size="$4" 
              bg="$red8" 
              color="white"
              icon={AlertTriangle}
              hoverStyle={{ bg: '$red9' }}
              pressStyle={{ bg: '$red7' }}
            >
              Report Issue
            </Button>
          </XStack>
        </YStack>
      </YStack>
    </ScrollView>
  )
}
