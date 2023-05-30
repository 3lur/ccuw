import PB from 'pocketbase'

const baseUrl = import.meta.env.VITE_APP_API_URL
const pb = new PB(baseUrl)

type SignInParams = {
  identity: string
  password: string
}

type SignUpParams = {
  email: string
  username: string
  password: string
  name: string
  classes: string
}

export const useAPI = () => {
  return {
    signInWithPassword: async (params: SignInParams) => {
      const { identity, password } = params
      const response = await pb
        .collection('users')
        .authWithPassword(identity, password)

      console.log(response.meta)
    },
    signUpWithPassword: async (params: SignUpParams) => {
      const data = {
        ...params,
        emailVisibility: true,
        passwordConfirm: params.password,
        score: 0,
      }
      return await pb.collection('users').create(data)
    },
    getGameView: async (id: string) => {
      return await pb.collection('games').getOne<Game>(id)
    },
    isValid: () => {
      return pb.authStore.isValid
    },
    logout: () => {
      pb.authStore.clear()
    },
    getList: async () => {
      try {
        const list = await pb.collection('games').getFullList<Game>()
        console.log(list)
      } catch (error) { }
    },
    getUserInfo: () => {
      return pb.authStore.model
    },
  }
}


