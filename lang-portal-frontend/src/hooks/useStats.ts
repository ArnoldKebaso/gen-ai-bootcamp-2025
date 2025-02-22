import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'

export const useStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data } = await api.get('/stats')
      return data as {
        totalWords: number
        overallAccuracy: number
        activeSessions: number
      }
    },
  })
}