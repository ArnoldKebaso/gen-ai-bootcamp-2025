import { useQuery } from '@tanstack/react-query'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api } from '../api/client'

interface Group {
  id: string;
  name: string;
  words_count: number;
  last_session: string | null;
}

export default function Groups() {
  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data } = await api.get('/groups')
      return data
    }
  })

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Word Groups</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Group Name</TableHead>
            <TableHead className="text-right">Word Count</TableHead>
            <TableHead className="text-right">Last Session</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups?.map((group: Group) => (
            <TableRow key={group.id} className="hover:bg-gray-50 cursor-pointer">
              <TableCell className="font-medium">{group.name}</TableCell>
              <TableCell className="text-right">{group.words_count}</TableCell>
              <TableCell className="text-right text-sm text-gray-500">
                {group.last_session || 'Never'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}