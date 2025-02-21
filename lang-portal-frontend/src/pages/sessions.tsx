// src/pages/Sessions.tsx
import { useQuery, useMutation } from '@tanstack/react-query'
import { useStudySessions } from '@/hooks/useStudySessions'
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
  Card, CardHeader, CardTitle, CardContent,
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
  Button 
} from '@/components/ui'
import { api } from '@/api/client'
import { Group, StudyActivity } from '@/api/types'

export default function Sessions() {
  const { data: sessions } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const { data } = await api.get('/study_sessions')
      return data
    }
  })

  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data } = await api.get('/groups')
      return data
    }
  })

  const { data: activities } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const { data } = await api.get('/study_activities')
      return data
    }
  })

  const { createSession } = useStudySessions()

  const handleCreateSession = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await createSession.mutateAsync({
      group_id: Number(formData.get('group_id')),
      study_activity_id: Number(formData.get('activity_id'))
    })
  }

  return (
    <div className="p-6 grid gap-6">
      {/* New Session Form */}
      <Card>
        <CardHeader>
          <CardTitle>Start New Study Session</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateSession} className="flex gap-4">
            <Select name="group_id" required>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Group" />
              </SelectTrigger>
              <SelectContent>
                {groups?.map((group: Group) => (
                  <SelectItem key={group.id} value={String(group.id)}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select name="activity_id" required>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Activity" />
              </SelectTrigger>
              <SelectContent>
                {activities?.map((activity: StudyActivity) => (
                  <SelectItem key={activity.id} value={String(activity.id)}>
                    {activity.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button type="submit" disabled={createSession.isPending}>
              {createSession.isPending ? 'Starting...' : 'Begin Session'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Active Sessions List */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Group</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead>Started</TableHead>
            <TableHead>Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions?.map((session: any) => (
            <TableRow key={session.id}>
              <TableCell>
                {groups?.find(g => g.id === session.group_id)?.name}
              </TableCell>
              <TableCell>
                {activities?.find(a => a.id === session.study_activity_id)?.name}
              </TableCell>
              <TableCell>
                {new Date(session.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button 
                  variant="link" 
                  onClick={() => window.open(
                    activities?.find(a => a.id === session.study_activity_id)?.url,
                    '_blank'
                  )}
                >
                  Continue Activity
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}