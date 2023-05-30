import { Navigate } from "react-router-dom"
import { useAPI } from "../libs/api"

export const RootPage: React.FC = () => {
  const { isValid } = useAPI()

  if (isValid()) {
    return <Navigate to={'/home'} />
  } else {
    return <Navigate to={'/sign_in'} />
  }
}