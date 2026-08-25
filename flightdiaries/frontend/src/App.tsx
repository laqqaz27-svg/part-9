import { useEffect, useState, type FormEvent } from 'react'

type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy'
type Visibility = 'great' | 'good' | 'ok' | 'poor'

interface DiaryEntry {
  id: number
  date: string
  weather: Weather
  visibility: Visibility
}

interface NewDiaryEntry {
  date: string
  weather: Weather
  visibility: Visibility
  comment: string
}

interface BackendError {
  error?: Array<{ message: string }>
}

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [error, setError] = useState<string | null>(null)
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: '',
    weather: 'sunny',
    visibility: 'good',
    comment: '',
  })

  useEffect(() => {
    fetch('/api/diaries')
      .then((response) => response.json() as Promise<DiaryEntry[]>)
      .then((data) => setDiaries(data))
  }, [])

  const addDiary = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    try {
      const response = await fetch('/api/diaries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDiary),
      })

      if (!response.ok) {
        const errorData = (await response.json()) as BackendError
        const reason = errorData.error?.map((issue) => issue.message).join(', ')
        throw new Error(reason ?? 'Adding diary failed')
      }

      const addedDiary = (await response.json()) as DiaryEntry
      setDiaries((currentDiaries) => currentDiaries.concat(addedDiary))
      setNewDiary({
        date: '',
        weather: 'sunny',
        visibility: 'good',
        comment: '',
      })
    } catch (caughtError: unknown) {
      setError(
        caughtError instanceof Error ? caughtError.message : 'Adding diary failed',
      )
    }
  }

  return (
    <main>
      <h1>Add new entry</h1>

      {error && (
        <p role="alert" style={{ color: 'red' }}>
          Error: {error}
        </p>
      )}

      <form onSubmit={addDiary}>
        <div>
          date
          <input
            value={newDiary.date}
            onChange={(event) =>
              setNewDiary({ ...newDiary, date: event.target.value })
            }
          />
        </div>

        <div>
          visibility
          <input
            value={newDiary.visibility}
            onChange={(event) =>
              setNewDiary({
                ...newDiary,
                visibility: event.target.value as Visibility,
              })
            }
          />
        </div>

        <div>
          weather
          <input
            value={newDiary.weather}
            onChange={(event) =>
              setNewDiary({
                ...newDiary,
                weather: event.target.value as Weather,
              })
            }
          />
        </div>

        <div>
          comment
          <input
            value={newDiary.comment}
            onChange={(event) =>
              setNewDiary({ ...newDiary, comment: event.target.value })
            }
          />
        </div>

        <button type="submit">add</button>
      </form>

      <h2>Diary entries</h2>

      {diaries.map((diary) => (
        <article key={diary.id}>
          <h2>{diary.date}</h2>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </article>
      ))}
    </main>
  )
}

export default App