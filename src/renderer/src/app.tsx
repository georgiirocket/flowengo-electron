import { useEffect } from 'react'

function App(): React.JSX.Element {
  useEffect(() => {
    const unSubscribe = window.api.on('test', (data) => {
      console.log({ data })
    })

    return () => {
      unSubscribe()
    }
  }, [])

  return <div>Hello</div>
}

export default App
