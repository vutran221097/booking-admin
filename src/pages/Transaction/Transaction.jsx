import Layout from '../../components/Layout/Layout'
import { useEffect, useState } from 'react'
import Axios from '../../api/Axios'
import TransactionList from '../../components/TransactionList/TransactionList'

const Transaction = () => {
    const [transactions, setTransactions] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState()

    const getTransactions = async (page) => {
        try {
            const res = await Axios.get(`/transactions/latest?page=${page}`)
            if (res.status === 200) {
                setTransactions(res.data.results)
                setTotalPage(res.data.total_pages)
            }
        } catch (e) {
            console.error(e);
        }
    }

    const onHandlePage = (e) => {
        if (page === 0) return;
        let newPage
        if (e === 'next') {
            newPage = page + 1
            setPage(newPage)
        } else {
            newPage = page - 1
            setPage(newPage)
        }
        getTransactions(newPage)
    }

    useEffect(() => {
        getTransactions(page)
        // eslint-disable-next-line
    }, [])

    const TransactionComponent = (
        <div>
            <div className='transaction-page'>
                <TransactionList title="Transactions List" data={transactions} onHandlePage={(e) => onHandlePage(e)} page={page} totalPage={totalPage} />
            </div>
        </div>

    )
    return (
        <div>
            <Layout children={TransactionComponent} />
        </div>
    )
}

export default Transaction