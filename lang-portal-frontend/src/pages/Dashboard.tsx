import { useQuery } from '@tanstack/react-query'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ProgressRadial } from '@/components/ProgressRadial'
import { api } from '../api/client'

interface Stats {
  totalWords: number;
  overallAccuracy: number;
  activeSessions: number;
}

interface Activity {
  id: string;
  name: string;
  description: string;
  url: string;
}

export default function Dashboard() {
  const { data: stats } = useQuery<Stats>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const { data } = await api.get('/stats') // Assume backend endpoint
      return data
    }
  })

  const { data: activities } = useQuery<Activity[]>({
    queryKey: ['activities'],
    queryFn: async () => {
      const { data } = await api.get('/study_activities')
      return data
    }
  })

  return (
    <div className="p-6 grid gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Words</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalWords || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Overall Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressRadial percentage={stats?.overallAccuracy || 0} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.activeSessions || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Apps Launchpad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activities?.map((activity: Activity) => (
          <Card 
            key={activity.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => window.open(activity.url, '_blank')}
          >
            <CardHeader>
              <CardTitle>{activity.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500">{activity.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}