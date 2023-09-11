import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './User.css'
import Layout from '../../components/Layout/Layout'
import Axios from '../../api/Axios'

const User = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState()

    const getData = async (page) => {
        try {
            const res = await Axios.get(`/users?page=${page}`)
            if (res.status === 200) {
                setData(res.data.results)
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
        getData(newPage)
    }

    useEffect(() => {
        getData(page)
        // eslint-disable-next-line
    }, [])

    const UserComponent = (
        <div>
            <div className='user-page'>
                <div className="user-list p-3">
                    <div className="card p-3">
                        <div className='d-flex justify-content-between align-items-center mb-3'>
                            <h5 style={{ color: 'grey' }}>Users List</h5>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th><FontAwesomeIcon icon={faSquare} /></th>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    return (
                                        <tr key={index} className="user-items">
                                            <td><FontAwesomeIcon icon={faSquare} /></td>
                                            <td>{item._id}</td>
                                            <td>{item.username}</td>
                                            <td>{item.isAdmin ? "Admin" : "User"}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        {page + "-" + totalPage + " of " + totalPage}
                                    </td>
                                    <td>
                                        <div className='d-flex justify-content-evenly action'>
                                            {page !== 1 && <FontAwesomeIcon className='icon' onClick={() => onHandlePage('back')} icon={faChevronLeft} />}
                                            {page !== totalPage && <FontAwesomeIcon className='icon' onClick={() => onHandlePage('next')} icon={faChevronRight} />}
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
    return (
        <div>
            <Layout children={UserComponent} />
        </div>
    )
}

export default User