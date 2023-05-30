import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAPI } from '../libs/api'

export const SignInPage: React.FC = () => {
  const nav = useNavigate()
  const loc = useLocation()
  const from = encodeURIComponent(`${loc.pathname}${loc.search}`)
  const { isValid } = useAPI()
  const [formData, setFormData] = useState({
    identity: '',
    password: '',
  })
  const { signInWithPassword } = useAPI()
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const { identity, password } = formData
    try {
      await signInWithPassword({
        identity: identity,
        password: password,
      })
      window.location.reload()
    } catch (error) {
      throw error
    }
  }
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (isValid()) nav('/home')
  }, [])
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 md:h-screen mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl-p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:tet-2xl">
              登录
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <input
                name="identity"
                type="text"
                placeholder="用户名或密码"
                autoComplete="off"
                onChange={handleChange}
                value={formData.identity}
                required
                className="bg-gray-50 rounded-lg p-3 border border-gray-300 sm:text-sm block w-full outline-teal-500"
              />
              <input
                name="password"
                type="password"
                placeholder="密码"
                autoComplete="off"
                onChange={handleChange}
                value={formData.password}
                required
                className="bg-gray-50 rounded-lg p-3 border border-gray-300 sm:text-sm block w-full outline-teal-500"
              />
              <button className="w-full bg-teal-500 text-white rounded-lg py-2 text-lg">
                登录
              </button>
            </form>
          </div>
        </div>
        <div className="text-right mt-4">
          <span>还没有账号？</span>
          <Link to={'/sign_up'} className='text-teal-500 font-semibold'>我要注册</Link>
        </div>
      </div>
    </div>
  )
}
