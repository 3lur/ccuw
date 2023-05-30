import { ClientResponseError } from 'pocketbase'
import { useNavigate } from 'react-router-dom'
import { pb } from '../libs/pocketbase'

export const usePocketBase = () => {
  const nav = useNavigate()
  const table: Record<string, undefined | (() => void)> = {
    401: () => {
      nav('/sign_in')
    },
  }
  const onError = (error: ClientResponseError) => {
    if (error.response) {
      const { status } = error
      const fn = table[status]
      fn?.()
    }
    throw error
  }

  const fetchGameList = async () => {
    return await pb.collection('games').getList<Game>()
  }

  const getRecordById = async <T>(name: string, id: string) => {
    return await pb.collection(name).getOne<T>(id).catch(onError)
  }

  const getRecordList = async <T>(name: string) => {
    return await pb.collection(name).getList<T>()
  }

  const subGameRealtime = async (id: string) => {
    return await pb.collection('*').subscribe(id, async ({ action, record }) => {
      if (action !== 'create') {

      }
    })
  }

  const unSubGameRealTime = async (id: string) => {
    return await pb.collection('games').unsubscribe(id)
  }

  const logout = () => {
    return pb.authStore.clear()
  }

  return {
    getRecordById,
    getRecordList,
    fetchGameList,
    subGameRealtime,
    unSubGameRealTime,
    logout,
  }
}
