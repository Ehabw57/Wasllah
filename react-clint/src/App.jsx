import { useState } from 'react'

function App() {
  const [connected, setConnected] = useState(false)

  return (
    <button onClick={() => setConnected(!connected)}
    className='px-4 py-2 bg-amber-400'>
      {connected ? 'Disconnect' : 'Connect'}
    </button>
  )
}

export default App
