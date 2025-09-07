
import { useState } from "react"

const NoHistory = () => {
  return (
    <p className="text-xs">No History</p>
  )
}

const ChatSidebar = (props) => {
  const { chats, selectedChat, setSelectedChat } = props

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>  
        <aside className={`fixed md:static z-10 ${isSidebarOpen ? 'left-0' : 'left-[-280px]'} md:block  transition-all transition-discrete`}>
          <div className="w-70 p-3 flex flex-col h-dvh bg-[#25292e]">
              <h2 className="text-xl">Yubisaki</h2>
              <p className="text-sm">App made by kureichi</p>

              <button className="mt-2 mb-9 p-2 text-sm rounded-full bg-white text-black cursor-pointer hover:opacity-80 transition-all" onClick={() => {setSelectedChat(-1); setIsSidebarOpen(false)}}>New Chat</button>

              <h2 className="text-xl">Chat History</h2>

              <div className="overflow-auto flex flex-col text-left">
                  {/* Perulangannya disini. */}
                  {/* <button className="mt-2 p-2 text-sm rounded-sm border border-white cursor-pointer text-left"><p className="text-ellipsis text-nowrap overflow-hidden"></p></button> */}
                  {chats ? chats.map((chat, index) => {
                    return (
                      <button onClick={() => {setSelectedChat(index); setIsSidebarOpen(false)}} className={`mt-2 py-2 px-4 text-sm rounded-full hover:bg-[#393e45] cursor-pointer text-left ${selectedChat == index ? 'bg-[#393e45]' : null} transition-all`}><p className="text-ellipsis text-nowrap overflow-hidden">{chat.name}</p></button>
                    )
                  }): <NoHistory />}
              </div>


              <div className="p-3 mt-5">
                  <p className="text-xs text-center">Frontend build with React.</p>
              </div>
          </div>
        </aside>
        { isSidebarOpen ? <div className="fixed h-screen w-screen opacity-100 backdrop-blur transition-all" onClick={e => {setIsSidebarOpen(!isSidebarOpen)}}></div> : null}
        
        { !isSidebarOpen ? <button className="md:hidden m-5 fixed cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button> : null}
        
    </>
  )
}

export default ChatSidebar