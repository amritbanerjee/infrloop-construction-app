import { Building2, Calendar, Users, Plus } from '@tamagui/lucide-icons'
import { Button, Card, H1, H4, Paragraph, ScrollView, XStack, YStack } from 'tamagui'

export default function ProjectsScreen() {
  const projects = [
    {
      id: 1,
      name: 'Downtown Office Complex',
      status: 'In Progress',
      progress: 67,
      dueDate: 'Dec 15, 2024',
      budget: '$2.4M',
      team: 12,
    },
    {
      id: 2,
      name: 'Residential Tower A',
      status: 'At Risk',
      progress: 23,
      dueDate: 'Nov 30, 2024',
      budget: '$1.8M',
      team: 8,
    },
    {
      id: 3,
      name: 'Shopping Mall Renovation',
      status: 'Planning',
      progress: 5,
      dueDate: 'Jan 20, 2025',
      budget: '$950K',
      team: 4,
    },
  ]

  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack flex={1} padding="$4" gap="$4">
        {/* Header */}
        <XStack alignItems="center" justifyContent="space-between">
          <H1 color="$color12">Projects</H1>
          <Button
            size="$3"
            backgroundColor="$green8"
            color="white"
            icon={Plus}
          >
            New Project
          </Button>
        </XStack>

        {/* Projects List */}
        <YStack gap="$3">
          {projects.map((project) => (
            <Card
              key={project.id}
              padding="$4"
              backgroundColor="$color2"
              borderColor="$color5"
              borderWidth={1}
            >
              <YStack gap="$3">
                {/* Project Header */}
                <XStack alignItems="center" gap="$3">
                  <Building2 size={20} color="$color10" />
                  <H4 color="$color12" flex={1}>
                    {project.name}
                  </H4>
                  <Paragraph 
                    fontSize="$2" 
                    color="$green11"
                    backgroundColor="$green5"
                    paddingHorizontal="$2"
                    paddingVertical="$1"
                    borderRadius="$2"
                  >
                    {project.status}
                  </Paragraph>
                </XStack>

                {/* Progress */}
                <YStack gap="$1">
                  <XStack alignItems="center" justifyContent="space-between">
                    <Paragraph color="$color11">Progress</Paragraph>
                    <Paragraph color="$color12" fontWeight="500">
                      {project.progress}%
                    </Paragraph>
                  </XStack>
                  <XStack 
                    height={6} 
                    backgroundColor="$color4" 
                    borderRadius="$1" 
                    overflow="hidden"
                  >
                    <XStack 
                      width={`${project.progress}%`} 
                      backgroundColor="$green8" 
                      height="100%"
                    />
                  </XStack>
                </YStack>

                {/* Project Details */}
                <XStack alignItems="center" gap="$4" flexWrap="wrap">
                  <XStack alignItems="center" gap="$2">
                    <Calendar size={16} color="$color10" />
                    <Paragraph color="$color11">
                      Due: {project.dueDate}
                    </Paragraph>
                  </XStack>
                  
                  <Paragraph color="$color11">
                    Budget: {project.budget}
                  </Paragraph>
                  
                  <XStack alignItems="center" gap="$1">
                    <Users size={16} color="$color10" />
                    <Paragraph color="$color11">
                      {project.team} members
                    </Paragraph>
                  </XStack>
                </XStack>
              </YStack>
            </Card>
          ))}
        </YStack>
      </YStack>
    </ScrollView>
  )
}
