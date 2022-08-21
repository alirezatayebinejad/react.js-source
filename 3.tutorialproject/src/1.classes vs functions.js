import React from 'react'

export default function App() {
  return (
    <div>function</div>
  )
}

import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>class</div>
    )
  }
}

//functions are much better than classes unless we have to use classes sometimes

//fragments
function frag() {
  return (
    <React.Fragment>
      <p>with this we dont need to use useless div tag for container</p>
    </React.Fragment>
    //instead of fragment we can use empty html taq like: <> </>
  )
}
