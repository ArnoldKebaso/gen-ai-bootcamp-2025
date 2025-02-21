import { useMutation } from '@tanstack/react-query'
import { api } from '../api/client'

export const useStudySessions = () => {
  const createSession = useMutation({
    mutationFn: (data: { group_id: number; study_activity_id: number }) => 
      api.post('/study_sessions', data)
  })

  const logReview = useMutation({
    mutationFn: (data: { sessionId: number; wordId: number; correct: boolean }) =>
      api.post(`/study_sessions/${data.sessionId}/review`, {
        word_id: data.wordId,
        correct: data.correct
      })
  })

  return { createSession, logReview }
}