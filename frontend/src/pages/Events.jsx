import React, { useState } from 'react'
import CreateEvents from '../components/CreateEvents'
import Sidebar from '../components/Sidebar';
import Navbars from '../components/Navbars';

const Events = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
    <div className="layout d-flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="layout-content flex-grow-1">
        <Navbars />
        <main className="p-3">
              <CreateEvents />
        </main>
      </div>
    </div>
    </>
  )
}

export default Events