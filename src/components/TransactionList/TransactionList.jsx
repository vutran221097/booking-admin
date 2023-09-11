import './TransactionList.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const TransactionList = (props) => {
    const { title, data, totalPage, onHandlePage, page } = props

    return (
        <div className="transaction-list p-3">
            <div className="card p-3">
                <h5 style={{ color: 'grey' }}>{title}</h5>
                <table>
                    <thead>
                        <tr>
                            <th><FontAwesomeIcon icon={faSquare} /></th>
                            <th>ID</th>
                            <th>User</th>
                            <th>Hotel</th>
                            <th>Room</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Payment Method</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            const rooms = item.room.map(item => {
                                return item.room
                            })
                            return (
                                <tr key={index} className="transaction-items">
                                    <td><FontAwesomeIcon icon={faSquare} /></td>
                                    <td>{item._id}</td>
                                    <td>{item.user}</td>
                                    <td>{item.hotelName}</td>
                                    <td>{rooms.join(",")}</td>
                                    <td>{`${new Date(item.dateStart).toLocaleDateString("vn-VN")} - ${new Date(item.dateEnd).toLocaleDateString("vn-VN")}`}</td>
                                    <td>{item.price}</td>
                                    <td className="payment">{item.payment.replace("-", " ")}</td>
                                    <td><div className={`${item.status?.toLowerCase()} status`}>{item.status}</div></td>
                                </tr>
                            )
                        })}
                    </tbody>
                    {title !== "Latest Transactions" && 
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
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
                    }
                </table>
            </div>
        </div>
    )
}

export default TransactionList