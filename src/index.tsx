// import * as React from 'react'
// import * as ReactDOM from 'react-dom'
//
// function App ({greeting}) {
//   return (
//     <div>{greeting}</div>
//   )
// }
//
// ReactDOM.render(
//   <App greeting={'hello world'} />,
//   document.getElementById('root')
// )

import {sayHello} from './greeter'

export type User = {
  first_name: string
  last_name: string
}

let user = {
  first_name: "AA",
  last_name: "BB",
}

function logUser(user: User) {
  console.log(user)
}

logUser(user)
sayHello()

export {logUser, sayHello}
