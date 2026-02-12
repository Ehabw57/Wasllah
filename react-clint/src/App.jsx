import { useState } from 'react'
import { DeviceCard } from './components/DeviceCard'

function App() {
  const [connected, setConnected] = useState(false)

  return (
    <DeviceCard device={{ name: 'Xiaomi C67', platform: 'Android' }} onConnect={() => setConnected(true)} />
  )
}

export default App
