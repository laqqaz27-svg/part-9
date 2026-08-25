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

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
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

  const addDiary = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    fetch('/api/diaries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDiary),
    })
      .then((response) => response.json() as Promise<DiaryEntry>)
      .then((addedDiary) => {
        setDiaries(diaries.concat(addedDiary))
        setNewDiary({
          date: '',
          weather: 'sunny',
          visibility: 'good',
          comment: '',
        })
      })
  }

  return (
    <main>
      <h1>Flight diaries</h1>

      <form onSubmit={addDiary}>
        <div>
          <label>
            Date
            <input
              type="date"
              value={newDiary.date}
              onChange={(event) =>
                setNewDiary({ ...newDiary, date: event.target.value })
              }
            />
          </label>
        </div>

        <div>
          <label>
            Weather
            <select
              value={newDiary.weather}
              onChange={(event) =>
                setNewDiary({
                  ...newDiary,
                  weather: event.target.value as Weather,
                })
              }
            >
              <option value="sunny">Sunny</option>
              <option value="rainy">Rainy</option>
              <option value="cloudy">Cloudy</option>
              <option value="stormy">Stormy</option>
              <option value="windy">Windy</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Visibility
            <select
              value={newDiary.visibility}
              onChange={(event) =>
                setNewDiary({
                  ...newDiary,
                  visibility: event.target.value as Visibility,
                })
              }
            >
              <option value="great">Great</option>
              <option value="good">Good</option>
              <option value="ok">Okay</option>
              <option value="poor">Poor</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Comment
            <textarea
              value={newDiary.comment}
              onChange={(event) =>
                setNewDiary({ ...newDiary, comment: event.target.value })
              }
            />
          </label>
        </div>

        <button type="submit">Add diary</button>
      </form>

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