import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { api } from '../api/client'
import { Word } from '../api/types'

const PAGE_SIZE = 20

export default function Words() {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('kanji')
  const [order, setOrder] = useState('asc')

  const { data: words, isLoading } = useQuery({
    queryKey: ['words', page, sortBy, order],
    queryFn: async () => {
      const { data } = await api.get('/words', {
        params: { page, sort_by: sortBy, order }
      })
      return data
    }
  })

  const handleSortChange = (value: string) => {
    const [newSort, newOrder] = value.split('-')
    setSortBy(newSort)
    setOrder(newOrder)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Vocabulary Inventory</h1>
        <Select onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kanji-asc">Kanji (A-Z)</SelectItem>
            <SelectItem value="kanji-desc">Kanji (Z-A)</SelectItem>
            <SelectItem value="correct_count-desc">Most Correct</SelectItem>
            <SelectItem value="wrong_count-desc">Most Mistakes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table className="border rounded-lg bg-card">
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-muted/50">
            <TableHead>Kanji</TableHead>
            <TableHead>Romaji</TableHead>
            <TableHead>English</TableHead>
            <TableHead className="text-right">Correct</TableHead>
            <TableHead className="text-right">Incorrect</TableHead>
            <TableHead className="text-right">Accuracy</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {words?.map((word: Word) => (
            <TableRow key={word.id}>
              <TableCell className="font-medium">{word.kanji}</TableCell>
              <TableCell>{word.romaji}</TableCell>
              <TableCell>{word.english}</TableCell>
              <TableCell className="text-right">{word.correct_count}</TableCell>
              <TableCell className="text-right">{word.wrong_count}</TableCell>
              <TableCell className="text-right">
                {Math.round(
                  (word.correct_count / 
                  (word.correct_count + word.wrong_count)) * 100 || 0
                )}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-4 flex justify-end gap-2">
        <Button 
          variant="outline"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="px-4 py-2">Page {page}</span>
        <Button
          variant="outline"
          onClick={() => setPage(p => p + 1)}
          disabled={words?.length < PAGE_SIZE}
        >
          Next
        </Button>
      </div>
    </div>
  )
}