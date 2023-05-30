import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAPI } from '../libs/api'

export const SignUpPage: React.FC = () => {
  const nav = useNavigate()
  const { isValid } = useAPI()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    classes: '',
  })
  const { signUpWithPassword } = useAPI()
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
      await signUpWithPassword({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        name: formData.name,
        classes: formData.classes,
      })
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
  const toSignIn = () => {
    nav('/sign_in')
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
              注册你的账号
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <input
                name="username"
                type="text"
                placeholder="用户名"
                autoComplete="off"
                onChange={handleChange}
                value={formData.username}
                required
                className="bg-gray-50 rounded-lg p-3 border border-gray-300 sm:text-sm block w-full outline-teal-500"
              />
              <input
                name="email"
                type="email"
                placeholder="邮箱"
                autoComplete="off"
                onChange={handleChange}
                value={formData.email}
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
              <input
                name="name"
                id="name"
                type="text"
                placeholder="姓名：王多鱼"
                autoComplete="off"
                onChange={handleChange}
                value={formData.name}
                required
                className="bg-gray-50 rounded-lg p-3 border border-gray-300 sm:text-sm block w-full outline-teal-500"
              />

              <input
                name="classes"
                id="classes"
                type="text"
                placeholder="班级：22软件13班"
                autoComplete="off"
                onChange={handleChange}
                value={formData.classes}
                required
                className="bg-gray-50 rounded-lg p-3 border border-gray-300 sm:text-sm block w-full outline-teal-500"
              />
              <button className="w-full bg-teal-500 text-white rounded-lg py-2 text-lg">
                注册
              </button>
            </form>
          </div>
        </div>
        <div className="text-right mt-4">
          <span>已有账号? </span>
          <span
            onClick={toSignIn}
            className="text-teal-500 font-semibold cursor-pointer">
            我要登录
          </span>
        </div>
        <div className="mt-2 text-red-400 text-left text-sm font-black">
          温馨提示：请各位同学填写真实的个人信息！
        </div>
      </div>
    </div>
  )
}
