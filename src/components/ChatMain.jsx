import Loading from "@/components/Loading"
import { useEffect, useRef, useState } from "react"
import Markdown from "react-markdown"

const NoSelectedChat = () => {
    return (
        <>
        <div className="w-full h-full flex flex-col justify-center text-center">
            <h2 className="text-4xl">Start sending messages</h2>
            <p>Have a good time</p>
        </div>
        </>
    )
}

const ErrorComponent = () => {
    return (
        <>
        <p className="text-red-500">A problem occurred, check your internet connection and try sending again.</p>
        </>
    )
}

const ChatMain = (props) => {
    const { chats, selectedChat, setSelectedChat, getChat, getTitle, getAnswer } = props

    const bottomRef = useRef()
    const [input, setInput] = useState('')
    const [isAnswering, setIsAnswering] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [isAnswering, selectedChat])
    
    const handleForm = (formData) => {
        setIsLoading(true)
        setIsAnswering(true)
        setIsError(false)
        setInput('')

        const userInput = formData.get('input')

        const chat = getChat()
        
        const messageUser = chat.addMessage('user')
        messageUser.updateContent(userInput)

        const messageAI = chat.addMessage('assistant')

        const messages = [
            ...chat.messages,
            {
                role: 'user',
                content: userInput
            },
            {
                role: 'assistant',
                content: ''
            }
        ]
        getAnswer(messages, (content) => {
            if (content instanceof Error) {
                setIsError(true)
                setInput(userInput)

                console.log(content.message)
                return
            }
            
            messageAI.updateContent(content)
        }).then(() => {
            setIsAnswering(false)
            setIsLoading(false)
        })

        if (selectedChat == -1) {
            getTitle(userInput, (title) => {
                if (title instanceof Error) {
                    console.log(title.message)
                    chat.updateName(userInput)
                    return
                }
                chat.updateName(title)
            })
            setSelectedChat(0)
        }
    }

  return (
    <>
        <div className="flex flex-col h-dvh w-full justify-center items-center overflow-hidden">
            <div className="text-center h-fit gap-3 py-5 truncate w-[50%]">
                {selectedChat != -1 ? chats[selectedChat].name : 'New Chat'}
            </div>
            <div className="flex-1 flex justify-center pb-20 overflow-auto w-full">
                <div className="flex flex-col gap-5 md:w-[60%] w-[95%]">
                    {selectedChat != -1 ? chats[selectedChat].messages.map((message) => {
                        if (message.role == 'user') {
                            return (
                                <div className=" w-fit max-w-[80%] p-2 pl-4 pr-4 ml-auto rounded-2xl bg-[#393e45]">{<Markdown>{message.content}</Markdown>}</div>
                            )
                        } else if (message.role == 'assistant') {
                            return (
                                <div className=" w-fit max-w-full p-2 pl-4 pr-4 rounded-full">{<Markdown>{message.content}</Markdown>}</div>
                            )
                        }
                    }) : <NoSelectedChat />}
                    {isLoading ? <Loading /> : null}
                    {isError ? <ErrorComponent /> : null}
                    <div ref={bottomRef}></div>
                </div>
            </div>
            <div style={{opacity: isAnswering ? '30%' : '100%'}} className="flex justify-center p-10 pt-5 pb-10 w-full transition-all">
                <form action={handleForm} className="flex items-center justify-center gap-5 py-3 px-5 rounded-full text-sm w-full md:w-[50%] border border-white">
                    <input onChange={e => setInput(e.target.value)} value={input} name="input" type="text" placeholder="Write your message here" className="w-full outline-none" />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default ChatMain