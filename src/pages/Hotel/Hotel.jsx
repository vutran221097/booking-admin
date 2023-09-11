import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import './Hotel.css'
import Layout from '../../components/Layout/Layout'
import Axios from '../../api/Axios'
import CustomModal from '../../components/CustomModal/CustomModal'
import { toastNoti } from '../../utils/utils'

const Hotel = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState()
    const [showModal, setShowModal] = useState(false)
    const [deleteHotelId, setDeleteHotelId] = useState("")
    const navigate = useNavigate()

    const getData = async (page) => {
        try {
            const res = await Axios.get(`/hotels/all?page=${page}`)
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



    const onDeleteHotel = async (id) => {
        try {
            setShowModal(false)
            const res = await Axios.delete(`/hotels/delete/${id}`)
            if (res.status === 200) {
                toastNoti(res.data.message, 'success')
                getData(page)
            }
        } catch (e) {
            toastNoti(e.response?.data?.message, 'error')
            console.error(e);
        }
    }

    const HotelComponent = (
        <div>
            <div className='hotel-page'>
                <div className="hotel-list p-3">
                    <div className="card p-3">
                        <div className='d-flex justify-content-between align-items-center mb-3'>
                            <h5 style={{ color: 'grey' }}>Hotels List</h5>
                            <div className='add-btn' onClick={() => navigate('/create/hotel')}>
                                Add new
                            </div>
                        </div>
                        <CustomModal
                            show={showModal}
                            title="Delete Hotel"
                            content={`Are you sure you want to delete hotel id = ${deleteHotelId} ?`}
                            onClose={() => setShowModal(false)}
                            onSubmit={() => onDeleteHotel(deleteHotelId)}
                        />
                        <table>
                            <thead>
                                <tr>
                                    <th><FontAwesomeIcon icon={faSquare} /></th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Title</th>
                                    <th>City</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    return (
                                        <tr key={index} className="hotel-items">
                                            <td><FontAwesomeIcon icon={faSquare} /></td>
                                            <td>{item._id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.type}</td>
                                            <td>{item.name}</td>
                                            <td>{item.city}</td>
                                            <th className='d-flex gap-2'>
                                                <div className='edit-btn' onClick={() => navigate('/create/hotel', { state: { isEdit: true, id: item._id } })}>
                                                    Edit
                                                </div>
                                                <div className='delete-btn' onClick={() => { setShowModal(true); setDeleteHotelId(item._id) }}>
                                                    Delete
                                                </div>
                                            </th>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
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
            <Layout children={HotelComponent} />
        </div>
    )
}

export default Hotel