import React from 'react'

export const Span = ({ onClick, content }) => {
  let newContent = content.replace(/</g, "&lt;").replace(/>/g, "&gt;")
  let className = content.replace(/<|>/g, "").split(' ')[0]
  if (className[0] === "/") className = className.substr(1, className.length) 
  return (
    <span className={className} onClick={onClick}>{content}</span>
  )
}
