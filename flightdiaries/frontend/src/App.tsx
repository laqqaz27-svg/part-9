import { useEffect, useState } from 'react'

interface DiaryEntry {
  id: number
  date: string
  weather: string
  visibility: string
}

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    fetch('/api/diaries')
      .then((response) => response.json() as Promise<DiaryEntry[]>)
      .then((data) => setDiaries(data))
  }, [])

  return (
    <main>
      <h1>Flight diaries</h1>

      {diaries.map((diary) => (
        <article key={diary.id}>
          <h2>{diary.date}</h2>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>
        </article>
      ))}
    </main>
  )
}

export default App