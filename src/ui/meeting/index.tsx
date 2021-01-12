import React, { useState } from 'react'

export default function Meeting() {
  const [count, setCount] = useState(0)
  return (
    <div>
      meeting
      <button type='button' onClick={() => setCount((prev) => prev + 1)}>click</button>
      { count }
    </div>
  )
}
