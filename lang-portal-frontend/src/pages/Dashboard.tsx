import { useStats } from '@/hooks/useStats'
import { useStudyActivities } from '@/hooks/useStudyActivities'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'

export default function Dashboard() {
  const { data: stats, isLoading } = useStats()
  const { data: activities } = useStudyActivities()

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Total Words</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-3xl font-bold text-primary">
                {stats?.totalWords.toLocaleString()}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Overall Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <div className="flex items-center gap-4">
                <Progress 
                  value={stats?.overallAccuracy || 0}
                  className="h-3 w-[200px]"
                />
                <span className="text-primary font-medium">
                  {Math.round(stats?.overallAccuracy || 0)}%
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-3xl font-bold text-primary">
                {stats?.activeSessions}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Launchpad Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Learning Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities?.map(activity => (
            <Card 
              key={activity.id}
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => window.open(activity.url, '_blank')}
            >
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {activity.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">
                  {activity.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}