import { useAppDispatch } from "../store/hooks"
import { setCurrentUser } from "../store/user"
import { useNavigate } from "react-router-dom"
// 登出操作
export default function useLogout () {
  const dispatch = useAppDispatch()
  localStorage.removeItem('token')
  dispatch(setCurrentUser(null))

  const navigate = useNavigate()
  navigate('/login')
}