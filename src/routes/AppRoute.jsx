import { Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from '@/context/AuthContext'

import ProtectedRoute from '@/routes/ProtectedRoute'

import LoginPage from '@/pages/LoginPage'
import ChatPage from '@/pages/ChatPage'
import { ChatProvider } from '@/context/ChatContext'
import ChatMain from '@/components/ChatMain'

function AppRoute() {
  //const [count, setCount] = useState(0)
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={ 
            <Navigate to="/chat" />
           } />

          <Route path='/chat' element={ 
            <ProtectedRoute>
              <ChatProvider>
                <ChatPage />
              </ChatProvider>
            </ProtectedRoute>
           } />

          <Route path='/login' element={ 
             <LoginPage /> 
            } />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default AppRoute
