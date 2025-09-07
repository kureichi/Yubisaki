const ChatCompletions =  async (messages, stream=false, callback) => {
    console.log(`Fetching messages : ${JSON.stringify(messages)}`)

    const apiUrl = import.meta.env.YUBI_OPENAICOMPATIBLE_API_URL
    const appKey = import.meta.env.YUBI_OPENAICOMPATIBLE_API_KEY

    let response
    try {
        response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${appKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "gemini-2.0-flash",
                "stream": stream, 
                "messages": messages
            })
            })
    } catch (error) {
        callback(Error(error))
        return
    }
    
    if (!response?.ok) {
        callback(Error(JSON.stringify(await response.json())))
        return
    }


    if (!stream) {
        const responseJson = await response.json()
        console.log(responseJson)

        callback(responseJson.choices[0].message.content)
        
        return
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    
    console.log('Reading response stream...')
    
    let finalWords = ''
    let updateInterval = 50
    let lastUpdate = 0

    while (true) {
        const { value, done } = await reader.read()

        // berhentiin while klo udh selesai
        if (done) break

        const decoded = decoder.decode(value)

        const rows = decoded.split('\n')
        for (let data of rows) {
            console.log(data)

            if (data.length == 0) continue

            if (data.startsWith(':')) continue

            if (data === 'data: [DONE]') {
                console.log('Done!')
                continue
            }

            try {
                const dataParsed = JSON.parse(data.substring(6))

                const choice = dataParsed.choices[0]

                const content = choice.delta.content

                const now = performance.now()

                finalWords += content
                if (now - lastUpdate > updateInterval) {
                    lastUpdate = now
                    callback(finalWords)
                    console.log('Updated message...')
                }

                if (choice.finish_reason) {
                    console.log("Finished.")
                    callback(finalWords)
                    continue
                }
            } catch (error) {
                console.error(`Skipping unexpected object : ${data}`)
                console.error(error)
            }
        }
    }
}

// For developer.
async function dummyChatCompletion(messages, stream, callback) {
    let finalString = ''
    let index = 0
    let updateInterval = 50
    let lastUpdate = 0

    while(index <= 10) {
        index += 1
        finalString += String(index)

        const now = performance.now()
        if (now - lastUpdate > updateInterval) {
            console.log('Performance is great.')
            lastUpdate = now
            callback(finalString)
        }
    }
    callback(finalString)
}

export default ChatCompletions