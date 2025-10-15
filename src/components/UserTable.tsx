'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { User, UserStatus } from '@/types/user'
import { mockUsers } from '@/utils/mockData'
import Loader from './Loader'

interface FilterState {
  organization: string
  username: string
  email: string
  date: string
  phoneNumber: string
  status: string
}

interface PaginationState {
  currentPage: number
  itemsPerPage: number
}

interface TableHeader {
  label: string
  key: keyof FilterState
  width: string
}

const TABLE_HEADERS: TableHeader[] = [
  { label: 'ORGANIZATION', key: 'organization', width: '18%' },
  { label: 'USERNAME', key: 'username', width: '16%' },
  { label: 'EMAIL', key: 'email', width: '22%' },
  { label: 'PHONE NUMBER', key: 'phoneNumber', width: '18%' },
  { label: 'DATE JOINED', key: 'date', width: '20%' },
  { label: 'STATUS', key: 'status', width: '16%' }
]

const UserTable: React.FC = () => {
  const router = useRouter()
  const [users] = useState<User[]>(mockUsers)
  const [filterState, setFilterState] = useState<FilterState>({
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: ''
  })
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 10
  })
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesOrganization = !filterState.organization || 
        user.organization.toLowerCase().includes(filterState.organization.toLowerCase())
      const matchesUsername = !filterState.username || 
        user.username.toLowerCase().includes(filterState.username.toLowerCase())
      const matchesEmail = !filterState.email || 
        user.email.toLowerCase().includes(filterState.email.toLowerCase())
      const matchesPhone = !filterState.phoneNumber || 
        user.phoneNumber.includes(filterState.phoneNumber)
      const matchesStatus = !filterState.status || user.status === filterState.status
      const matchesDate = !filterState.date || 
        user.dateJoined.toLowerCase().includes(filterState.date.toLowerCase())

      return matchesOrganization && matchesUsername && matchesEmail && 
             matchesPhone && matchesStatus && matchesDate
    })
  }, [users, filterState])

  const paginatedUsers = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage
    const endIndex = startIndex + pagination.itemsPerPage
    return filteredUsers.slice(startIndex, endIndex)
  }, [filteredUsers, pagination])

  const totalPages = Math.ceil(filteredUsers.length / pagination.itemsPerPage)

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    setFilterState(prev => ({ ...prev, [field]: value }))
    setPagination(prev => ({ ...prev, currentPage: 1 }))
  }

  const resetFilters = () => {
    setFilterState({
      organization: '',
      username: '',
      email: '',
      date: '',
      phoneNumber: '',
      status: ''
    })
    setPagination(prev => ({ ...prev, currentPage: 1 }))
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPagination(prev => ({ ...prev, currentPage: page }))
    }
  }

  const changeItemsPerPage = (items: number) => {
    setPagination({ currentPage: 1, itemsPerPage: items })
  }

  const handleAction = (action: string, userId: string) => {
    setActiveDropdown(null)
    
    if (action === 'view') {
      setIsLoading(true)
      setTimeout(() => {
        router.push(`/users/user-details/${userId}`)
      }, 500)
    } else {
      console.log(`${action} user: ${userId}`)
    }
  }

  const getStatusClass = (status: UserStatus): string => {
    switch (status) {
      case 'Active': return 'status-badge status-active'
      case 'Inactive': return 'status-badge status-inactive'
      case 'Pending': return 'status-badge status-pending'
      case 'Blacklisted': return 'status-badge status-blacklisted'
      default: return 'status-badge'
    }
  }

  if (isLoading) {
    return <Loader size="large" text="Loading user details..." />
  }

  return (
    <div>
    <div className="user-table-container">
      {activeFilter && (
        <div className="filter-dropdown">
            <div className="filter-form">
              <div className="filter-field">
                <label>Organization</label>
                <select 
                  value={filterState.organization}
                  onChange={(e) => handleFilterChange('organization', e.target.value)}
                >
                  <option value="">Select</option>
                  {Array.from(new Set(users.map(u => u.organization))).map(org => (
                    <option key={org} value={org}>{org}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-field">
                <label>Username</label>
                <input 
                  type="text" 
                  placeholder="User"
                  value={filterState.username}
                  onChange={(e) => handleFilterChange('username', e.target.value)}
                />
              </div>
              
              <div className="filter-field">
                <label>Email</label>
                <input 
                  type="text" 
                  placeholder="Email"
                  value={filterState.email}
                  onChange={(e) => handleFilterChange('email', e.target.value)}
                />
              </div>
              
              <div className="filter-field">
                <label>Date</label>
                <div className="date-input">
                  <input 
                    type="text" 
                    placeholder="Date"
                    value={filterState.date}
                    onChange={(e) => handleFilterChange('date', e.target.value)}
                  />
                  <Image src="/icons/calender.svg" alt="Calendar" width={16} height={16} />
                </div>
              </div>
              
              <div className="filter-field">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  placeholder="Phone Number"
                  value={filterState.phoneNumber}
                  onChange={(e) => handleFilterChange('phoneNumber', e.target.value)}
                />
              </div>
              
              <div className="filter-field">
                <label>Status</label>
                <select 
                  value={filterState.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                  <option value="Blacklisted">Blacklisted</option>
                </select>
              </div>
              
              <div className="filter-actions">
                <button className="reset-btn" onClick={resetFilters}>Reset</button>
                <button className="filter-btn-submit" onClick={() => setActiveFilter(null)}>Filter</button>
              </div>
            </div>
        </div>
      )}

      <table className="user-table">
        <thead>
          <tr className="table-header">
            {TABLE_HEADERS.map((header, index) => (
              <th key={header.key} className={`table-header-cell column-${index + 1}`} style={{ width: header.width }}>
                <span>{header.label}</span>
                <button 
                  className="filter-btn"
                  onClick={() => setActiveFilter(activeFilter === header.key ? null : header.key)}
                >
                  <Image src="/icons/filter.svg" alt="Filter" width={16} height={10} />
                </button>
              </th>
            ))}
            <th className="table-header-cell" style={{ width: '6%' }}>
              <span></span>
            </th>
          </tr>
        </thead>

        <tbody className="table-body">
          {paginatedUsers.map((user, index) => (
            <tr key={user.id} className="table-row">
              <td className="table-cell column-1" style={{ width: TABLE_HEADERS[0].width }}>
                <span className="cell-content">{user.organization}</span>
              </td>
              <td className="table-cell column-2" style={{ width: TABLE_HEADERS[1].width }}>
                <span className="cell-content">{user.username}</span>
              </td>
              <td className="table-cell column-3" style={{ width: TABLE_HEADERS[2].width }}>
                <span className="cell-content">{user.email}</span>
              </td>
              <td className="table-cell column-4" style={{ width: TABLE_HEADERS[3].width }}>
                <span className="cell-content">{user.phoneNumber}</span>
              </td>
              <td className="table-cell column-5" style={{ width: TABLE_HEADERS[4].width }}>
                <span className="cell-content">{user.dateJoined}</span>
              </td>
              <td className="table-cell column-6" style={{ width: TABLE_HEADERS[5].width }}>
                <span className={getStatusClass(user.status)}>{user.status}</span>
              </td>
              <td className="table-cell column-7" style={{ width: '6%' }}>
                <button 
                  className="more-btn"
                  onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                >
                  <Image src="/icons/more.svg" alt="More" width={16} height={16} />
                </button>
                
                {activeDropdown === index && (
                  <div className="more-styles">
                    <button 
                      className="dropdown-item"
                      onClick={() => handleAction('view', user.id)}
                    >
                      <Image src="/icons/eye.svg" alt="View" width={16} height={16} />
                      <span>View Details</span>
                    </button>
                    <button 
                      className="dropdown-item"
                      onClick={() => handleAction('blacklist', user.id)}
                    >
                      <Image src="/icons/blacklist-icon.svg" alt="Blacklist" width={16} height={16} />
                      <span>Blacklist User</span>
                    </button>
                    <button 
                      className="dropdown-item"
                      onClick={() => handleAction('activate', user.id)}
                    >
                      <Image src="/icons/activate-user.svg" alt="Activate" width={16} height={16} />
                      <span>Activate User</span>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      <div className="pagination-container">
        <div className="pagination-info">
          <span>Showing</span>
          <div className="custom-select-wrapper">
            <select 
              value={pagination.itemsPerPage}
              onChange={(e) => changeItemsPerPage(Number(e.target.value))}
              className="items-per-page"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <Image 
              src="/icons/arrow-vector.svg" 
              alt="Dropdown arrow" 
              width={12} 
              height={8} 
              className="select-arrow"
            />
          </div>
          <span>out of {filteredUsers.length}</span>
        </div>
        
        <div className="pagination-controls">
          <button 
            className="pagination-btn"
            onClick={() => goToPage(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            <Image src="/icons/arrow-left.svg" alt="Previous" width={10} height={10} />
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
              const pageNum = i + 1
              return (
                <button
                  key={pageNum}
                  className={`page-btn ${pagination.currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </button>
              )
            })}
            {totalPages > 5 && (
              <>
                <span>...</span>
                <button
                  className={`page-btn ${pagination.currentPage === totalPages - 1 ? 'active' : ''}`}
                  onClick={() => goToPage(totalPages - 1)}
                >
                  {totalPages - 1}
                </button>
                <button
                  className={`page-btn ${pagination.currentPage === totalPages ? 'active' : ''}`}
                  onClick={() => goToPage(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
          
          <button 
            className="pagination-btn"
            onClick={() => goToPage(pagination.currentPage + 1)}
            disabled={pagination.currentPage === totalPages}
          >
            <Image src="/icons/arrow-right.svg" alt="Next" width={10} height={10} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserTable
