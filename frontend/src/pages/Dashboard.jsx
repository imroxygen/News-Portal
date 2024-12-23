import BottomNavBar from '@/components/shared/BottomNavBar';
import DashboardComments from '@/components/shared/DashboardComments';
import DashboardPost from '@/components/shared/DashboardPost';
import DashboardProfile from '@/components/shared/DashboardProfile';
import DashboardSidebar from '@/components/shared/DashboardSidebar'
import DashboardUser from '@/components/shared/DashboardUser';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Dashboard = () => {
  const location=useLocation();
  const [tab,setTab]=useState("");

  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const tabFromUrl=urlParams.get("tab");

    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row w-full'>
      <div className='hidden md:block'>
        <DashboardSidebar/>
      </div>
      <BottomNavBar/>

      <div className='w-full' >
        {tab==="profile" && <DashboardProfile/>}
        {tab==="posts" && <DashboardPost/>}
        {tab==="users" && <DashboardUser/> }
        {tab==="comments" && <DashboardComments/>}
      </div>

    </div>
  )
}

export default Dashboard