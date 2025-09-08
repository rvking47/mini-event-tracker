import React, { useState } from 'react'
import Navbars from '../components/Navbars';
import Sidebar from '../components/Sidebar';
import "../Css/Events.css";
import Countevents from '../components/Countevents';



const Dashboard = () => {
   const [collapsed, setCollapsed] = useState(false);

  return (
    <>
<div className="layout d-flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="layout-content flex-grow-1">
        <Navbars />
        <main className="p-3">
          <Countevents />
        </main>
      </div>
    </div>
    </>
  )
}

export default Dashboard