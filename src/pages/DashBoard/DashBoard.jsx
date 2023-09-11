import { useEffect, useState } from 'react'
import { faUser, faCartShopping, faSackDollar, faBalanceScale } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './DashBoard.css'
import Layout from '../../components/Layout/Layout'
import Axios from '../../api/Axios'
import TransactionList from '../../components/TransactionList/TransactionList'

const DashBoard = () => {
    const [data, setData] = useState([])
    const [transactions, setTransactions] = useState([])

    const getData = async () => {
        try {
            const res = await Axios.get('/dashboard')
            if (res.status === 200) {
                setData(res.data)
            }
        } catch (e) {
            console.error(e);
        }
    }

    const getTransactions = async () => {
        try {
            const res = await Axios.get(`/transactions/latest?page=1&limit=8`)
            if (res.status === 200) {
                setTransactions(res.data.results)
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getData()
        getTransactions()
        // eslint-disable-next-line
    }, [])

    const DashboardComponent = (
        <div>
            <div className='dashboard-header d-flex justify-content-between gap-2'>
                <div className='card'>
                    <div className="card-body">
                        <h6 className="card-title">USERS</h6>
                        <p>{data.totalUsers}</p>
                        <div className='d-flex justify-content-end'>
                            <FontAwesomeIcon icon={faUser} style={{ color: '#E95972', backgroundColor: "#FFCCCC", borderRadius: "5px", padding: '6px' }} />
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <div className="card-body">
                        <h6 className="card-title">ORDERS</h6>
                        <p>{data.totalTransaction}</p>
                        <div className='d-flex justify-content-end'>
                            <FontAwesomeIcon icon={faCartShopping} style={{ color: '#E3BA56', backgroundColor: "#F8EDD2", borderRadius: "5px", padding: '6px' }} />
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <div className="card-body">
                        <h6 className="card-title">EARNING</h6>
                        <p>$ {data.totalEarning}</p>
                        <div className='d-flex justify-content-end'>
                            <FontAwesomeIcon icon={faSackDollar} style={{ color: '#1A8D1A', backgroundColor: "#CCE6CC", borderRadius: "5px", padding: '6px' }} />
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <div className="card-body">
                        <h6 className="card-title">BALANCE</h6>
                        <p>$ {data.totalBalance}</p>
                        <div className='d-flex justify-content-end'>
                            <FontAwesomeIcon icon={faBalanceScale} style={{ color: '#993399', backgroundColor: "#E5CCE6", borderRadius: "5px", padding: '6px' }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='dashboard-body'>
                <TransactionList title="Latest Transactions" data={transactions} />
            </div>
        </div>

    )
    return (
        <div>
            <Layout children={DashboardComponent} />
        </div>
    )
}

export default DashBoard