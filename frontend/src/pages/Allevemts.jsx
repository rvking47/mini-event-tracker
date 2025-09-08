import React, { useState } from 'react'
import Navbars from '../components/Navbars';
import Sidebar from '../components/Sidebar';
import "../Css/Events.css";
import GetEvents from '../components/GetEvents';


const Allevemts = () => {
       const [collapsed, setCollapsed] = useState(false);
  return (
    <>
    <div className="layout d-flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="layout-content flex-grow-1">
        <Navbars />
        <main className="p-3">
          <GetEvents />
        </main>
      </div>
    </div>
    </>
  )
}

export default Allevemts