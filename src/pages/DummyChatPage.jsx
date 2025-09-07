import { useState } from "react"

const DummyChatPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)


    return (
        <div className="flex h-screen">
      {/* Sidebar - hidden on small screens, visible on medium and up */}
      <aside className={`w-64 fixed bg-gray-100 p-4 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        {/* Contact list goes here */}
        <h2 className="text-xl font-semibold mb-4">Contacts</h2>
        {/* ... contact list items ... */}
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header - for current chat partner */}
        <header className="bg-white p-4 border-b flex items-center">
          {/* Hamburger menu for small screens */}
          <button className="md:hidden mr-4" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            ☰
          </button>
          <h2 className="text-xl font-semibold">Chat Partner Name</h2>
        </header>

        {/* Message Display Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {/* ... individual message components ... */}
        </div>

        {/* Message Input */}
        <div className="bg-white p-4 border-t flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
        </div>
      </main>
    </div>
    )
}

export default DummyChatPage