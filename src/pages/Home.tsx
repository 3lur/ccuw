import { useMount } from 'ahooks'
import { usePocketBase } from '../hooks'
import { useState } from 'react'
import { Footer } from '../layouts/Footer'
import { Header } from '../layouts/Header'

export const HomePage: React.FC = () => {
  const [gameList, setGameList] = useState<Game[]>([])
  const { fetchGameList } = usePocketBase()

  useMount(async () => {
    const list = await fetchGameList()
    setGameList(list.items)
  })

  if (!gameList) {
    return <div>no data ...</div>
  }

  return (
    <>
      <Header />
      <Footer />
    </>
  )
}
