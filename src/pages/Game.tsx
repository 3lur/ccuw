import { useState } from "react"
import { useMount, useUnmount } from 'ahooks'
import { pb } from "../libs/pocketbase"

interface Message {
  content: string
  from: string
}


export const GamePage: React.FC = () => {
  const [msg, setMsg] = useState('')
  const [msgs, setMsgs] = useState<any[]>([])
  const sendMsg = async () => {
    if (msg.trim() === "") return
    const data = {
      content: msg,
      from: pb.authStore.model?.id,
    }
    await pb.collection('messages').create(data)
    setMsg('')
  }

  let fn: () => void

  useMount(async () => {
    console.log(msgs)
    const list = await pb.collection('messages').getList<Message>(1, 50, { sort: 'created', expand: 'from' })
    setMsgs(list.items)

    fn = await pb.collection('messages').subscribe<Message>('*', async ({ action, record }) => {
      if (action === 'create') {
        console.log(msgs)
      }
    })
  })

  useUnmount(() => fn())
  return (
    <>
      <div className="bg-stone-300 h-screen flex flex-col justify-center items-center">
        <div>
          {
            msgs.map(m => (
              <div>
                {m.content}
              </div>
            ))
          }
        </div>
        <div>
          <div>
            <input type="text" className="px-5 py-3 rounded-lg" value={msg} onChange={e => setMsg(e.target.value)} />
          </div>
          <button onClick={sendMsg} className="mt-3 px-3 p-2 bg-teal-500 rounded-lg text-white">Send</button>
        </div>
      </div>
    </>
  )
}