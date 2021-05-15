import React from 'react'

// 提供给子组件item组件一个改变rightType值得方法。 因为跨了很多层级，所以用context
const chatContext = React.createContext()

export {
    chatContext,
}