import TitleHeader from '@/components/shared/TitleHeader'
import StatsGrid from '@/components/StatsGrid'
import UserTable from '@/components/UserTable'
import React from 'react'

const UsersPage = () => {
  return (
    <>
      <TitleHeader title="Users" />
      <StatsGrid />
      <UserTable />
    </>
  )
}

export default UsersPage