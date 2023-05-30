interface Resource {
  id: string
  created: string
  updated: string
}

interface Question {
}

interface User { }

interface Game extends Resource {
  name: string
  questions: Question[]
  users: User[]
}

type SignUp = {
  email: string
  username: string
  password: string
  name: string
  classes: string
}