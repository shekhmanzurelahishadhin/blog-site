import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AdminLayouts() {
  return (
    <div>
    <h1>AdminLayouts</h1>
    <Outlet/>
    </div>
  )
}
