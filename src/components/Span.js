import React from 'react'

export const Span = ({ onClick, content }) => {
  let newContent = content.replace(/</g, "&lt;").replace(/>/g, "&gt;")
  return (
    <span className={className} onClick={onClick}>{content}</span>
  )
}
