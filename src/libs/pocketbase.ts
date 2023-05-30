import PB from 'pocketbase'

export const pb = new PB(import.meta.env.VITE_APP_API_URL)

export const currentUser = pb.authStore.model
