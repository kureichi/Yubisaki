import ChatMain from "@/components/ChatMain"
import ChatSidebar from "@/components/ChatSidebar"
import { useChat } from "@/context/ChatContext"

const ChatPage = () => {
    const { chats, getChat, selectedChat, setSelectedChat, getTitle, getAnswer } = useChat()

    return (
        <>
        <div className="flex">
            <ChatSidebar chats={chats} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
            <ChatMain chats={chats} selectedChat={selectedChat} setSelectedChat={setSelectedChat} getChat={getChat} getTitle={getTitle} getAnswer={getAnswer} />
        </div>
        </>
    )
}

export default ChatPage