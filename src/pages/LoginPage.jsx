import { useState } from "react"
import Loading from "@/components/Loading"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"

const Loader = ({loading}) => {
    return(
        <>
        <div className="flex w-fit gap-2 mt-6 transition-all" style={{opacity: loading ? '100%' : '0%'}}>
            <Loading />
            <p className="text-xs">Cooldown...</p>
        </div>
        </>
    )
}

function LoginPage() {
    const navigate = useNavigate()
    const auth = useAuth()
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {
        if (username == '') {
            setLoading(false)
            return
        }

        setLoading(true)

        setTimeout(() => {auth.login(username); navigate('/chat')}, 1000)
    }

    return (
        <>
        <div className="flex flex-col items-center justify-center h-dvh transition-all">
            <div className="h-fit p-6 md:w-100 w-full px-20">
                <div className="flex flex-col items-center text-center text-white">
                    <h1 className=" text-white text-4xl">Yubisaki AI</h1>
                    <p className="text-sm mt-5">Enter your username below to log in</p>
                    <input className="w-full mt-7 text-sm opacity-70 border border-white rounded-full px-5 py-3 outline-none transition-all hover:opacity-100" type="text" placeholder="my username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    <button style={{opacity: username== '' ? "50%" : null}} className="w-full mt-3 text-sm text-black cursor-pointer bg-white rounded-full p-3 transition-all hover:opacity-65" type="submit" onClick={handleSubmit}>Let's Play</button>
                    <p className="mt-6 text-sm opacity-50">data is saved into localStorage.</p>
                    <Loader loading={loading} />
                </div>
            </div>
        </div>
        </>
    )
}

export default LoginPage