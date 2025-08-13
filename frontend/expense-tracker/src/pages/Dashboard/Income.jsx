import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import toast from 'react-hot-toast'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'
import { useUserAuth } from '../../hooks/useUserAuth'

const Income = () => {
  useUserAuth()

  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  // ✅ Fetch All Incomes
  const fetchIncomeDetails = async () => {
    if (loading) return
    setLoading(true)

    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`)
      if (response.data) {
        setIncomeData(response.data)
      }
    } catch (error) {
      console.error('Failed to fetch income data:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ✅ Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income

    if (!source.trim()) {
      toast.error('Source is required')
      return
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount should be a valid number greater than 0')
      return
    }

    if (!date) {
      toast.error('Date is required')
      return
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      })
      setOpenAddIncomeModal(false)
      toast.success('Income added successfully')
      fetchIncomeDetails()
    } catch (error) {
      // console.error('Error adding income:', error)
      // toast.error('Failed to add income. Please try again.')
      "Error adding income:",
        error.response?.data?.message || error.message
    }
  }

  // ✅ Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success('Income deleted successfully')
      fetchIncomeDetails()
    } catch (error) {
      // console.error('Error deleting income:', error)
      // toast.error('Failed to delete income. Please try again.')
      "Error deleting income:",
        error.response?.data?.message || error.message
    }
  }

  // ✅ Download Income as Excel
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: 'blob'
        }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'income_details.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading income:', error)
      toast.error('Failed to download income details')
    }
  }

  // ✅ Initial Fetch
  useEffect(() => {
    fetchIncomeDetails()
    return () => { };
  }, [])

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {/* Overview Section */}
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />

          {/* Income List */}
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id })
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        {/* Add Income Modal */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null }) }
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income detail?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income
