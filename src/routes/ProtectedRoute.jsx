import { Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

const ProtectedRoute = ({ children }) => {
    const { username } = useAuth()

    if (!username) {
        return (
            <Navigate to='/login' />
        )
    }

    return children
}

export default ProtectedRoute