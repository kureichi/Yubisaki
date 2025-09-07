import ChatCompletions from "@/api/ChatCompletions"
import { createContext, useContext, useEffect, useState } from "react"


const ChatContext = createContext(null)

export const ChatProvider = ({children}) => {
    const [chats, setChats] = useState(Array)
    const [selectedChat, setSelectedChat] = useState(-1)

    useEffect(() => {
        //localStorage.clear()
        const savedChats = localStorage.getItem('chats')

        if (savedChats) {
            setChats(JSON.parse(savedChats))
        } else {
            setChats([])
        }
    }, [])

    // Log if selectedChat Change
    useEffect(() => {
        console.log(`Selected Chat with Index : ${selectedChat}`)
        selectedChat != -1 ? console.log(chats[selectedChat]) : null
    }, [selectedChat])

    const updateChats = updater => {
        setChats(prevChats => {
            const newChats = updater(prevChats)
            localStorage.setItem('chats', JSON.stringify(newChats)) 
            return newChats
        })
    }

    // finally gw dapet cara ngatasin race condition
    // gw tau ini bakalan lag, tapi gw udh nyerah nyari cara lain
    const getChat = () => {
        let chat
        let chatId

        if (selectedChat == -1) {
            chatId = Date.now().toString()
            chat = {
                id: chatId,
                name: 'Processing...',
                messages: [
                    {
                        role: 'system',
                        content: 'Your name is yubisaki, you are a multilingual assistant who is smart in everything, you can explain user questions completely and clearly.'
                    }
                ]
            }
            updateChats(prevChats => {
                const newChats = [chat, ...prevChats]

                return newChats
            })
            
        } else {
            let chatsCopy = [...chats]

            chatId = chatsCopy[selectedChat].id
            let messagesCopy = [...chatsCopy[selectedChat].messages]

            if (messagesCopy[messagesCopy.length - 1].content == null) {
                messagesCopy.pop()
                messagesCopy.pop()
            }
            chatsCopy[selectedChat].messages = messagesCopy

            const newChats = [...chatsCopy]

            updateChats(() => {
                return newChats
            })

            chat = {...newChats[selectedChat]}
        }

        // semua dicari berdasarkan id, jadi alurnya adalah :
        // ambil previous data yang didapetin dari setChats -> map() -> ketemu object dengan id yang sama -> update
        return {
            messages: [...chat.messages],
            updateName: (name) => {
                updateChats(prevChats => {
                    return prevChats.map(c => {
                        if (c.id == chatId) {
                            return { ...c, name: name }
                        }
                        return c
                    })
                })
            },
            addMessage: (role) => {
                const messageObj = { role: role, content: null }
                updateChats(prevChats => {
                    return prevChats.map(c => {
                        if (c.id == chatId) {
                            return { ...c, messages: [...c.messages, messageObj] }
                        }
                        return c
                    })
                })
                return {
                    updateContent: (content) => {
                        updateChats(prevChats => {
                            return prevChats.map(c => {
                                if (c.id == chatId) {
                                    const messagesCopy = [...c.messages]
                                    messagesCopy[messagesCopy.length - 1] = {...messagesCopy[messagesCopy.length - 1], content: content}
                                    return { ...c, messages: [...messagesCopy] }
                                }
                                return c
                            })
                        })
                    }
                }
            }
        }
    }

    const getTitle = (userInput, callback) => {
        const messages = [
            { role: 'system', content: 'You are a multilingual title creator assistant for chat, you can create titles from user messages, your output is only the title you created, nothing else.' },
            { role: 'user', content: `User Send : ${userInput}`}
        ]

        ChatCompletions(messages, false, (content) => callback(content))
    }

    const getAnswer = async (messages, callback) => {
        console.log('Getting response from AI')
        await ChatCompletions(messages, true, (content) => callback(content))
    }


    return (
        <ChatContext.Provider value={{chats, getChat, selectedChat, setSelectedChat, getTitle, getAnswer}}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => {
    return useContext(ChatContext)
}