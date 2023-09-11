import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import './NewRoom.css'
import Layout from '../../components/Layout/Layout'
import Axios from '../../api/Axios'
import { toastNoti, validateRoom } from '../../utils/utils';

const initState = {
    title: "",
    desc: "",
    price: "",
    maxPeople: "",
    roomNumbers: "",
    hotel: "default"
}

const NewRoom = () => {
    const [data, setData] = useState(initState)
    const [hotelsId, setHotelsId] = useState([])
    const location = useLocation()
    const navigate = useNavigate()

    const getHotels = async () => {
        try {
            const res = await Axios.get('/hotels/list-select')
            if (res.status === 200) {
                setHotelsId(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const getRoomById = async (id) => {
        try {
            const res = await Axios.get(`/rooms/detail/${id}`)
            if (res.status === 200) {
                const newData = { ...res.data }
                delete newData['createdAt']
                delete newData['updatedAt']
                delete newData['__v']
                delete newData['_id']
                newData.hotel = newData.hotel._id
                newData.roomNumbers = newData.roomNumbers.join(',')
                setData(newData)
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (!location?.state?.isEdit) return;
        getRoomById(location?.state?.id)
        // eslint-disable-next-line
    }, [])

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        getHotels()
    }, [])

    const submit = async () => {
        try {
            const validate = validateRoom(data)
            data.roomNumbers = data.roomNumbers.split(",")
            if (validate) {
                if (!location?.state?.isEdit) {
                    const res = await Axios.post('/rooms/create', data)
                    if (res.status === 200) {
                        const newData = { ...initState }
                        setData(newData)
                        toastNoti("Add success!", 'success')
                    }
                } else {
                    const res = await Axios.put(`/rooms/update/${location?.state?.id}`, data)
                    if (res.status === 200) {
                        const newData = { ...initState }
                        setData(newData)
                        toastNoti(res.data.message, 'success')
                        navigate('/list/rooms')
                    }
                }

            }
        } catch (e) {
            toastNoti(e.response?.data?.message, 'error')
            console.error(e);
        }
    }

    const NewHotelComponent = (
        <div className='new-form'>
            <div className='card title'>
                <h5>{location?.state?.isEdit ? "UPDATE ROOM" : "ADD NEW ROOM"}</h5>
            </div>
            <div className='card form'>
                <Form>
                    <div className='form-layout'>
                        <Form.Group className="mb-3 w-45" >
                            <Form.Label>Title </Form.Label>
                            <Form.Control type="text" placeholder="Title" name='title' value={data.title} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3 w-45" >
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" name='desc' value={data.desc} onChange={onChange} />
                        </Form.Group>
                    </div>

                    <div className='form-layout'>
                        <Form.Group className="mb-3 w-45" >
                            <Form.Label>Price </Form.Label>
                            <Form.Control type="number" placeholder="Price" name='price' value={data.price} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3 w-45" >
                            <Form.Label>Max People</Form.Label>
                            <Form.Control type="number" placeholder="Max People" name='maxPeople' value={data.maxPeople} onChange={onChange} />
                        </Form.Group>
                    </div>

                    <div className='form-layout'>
                        <Form.Group className="mb-3 w-25" >
                            <Form.Label>Rooms</Form.Label>
                            <Form.Control as="textarea" rows={3} name='roomNumbers' placeholder='Give comma between room number' value={data.roomNumbers} onChange={onChange} />
                        </Form.Group>

                        <Form.Group className="mb-3 w-25" >
                            <Form.Label>Choose a hotel</Form.Label>
                            <Form.Select name='hotel' onChange={onChange} value={data.hotel}>
                                <option value="default">Please choose a hotel</option>
                                {hotelsId.map((item, index) => {
                                    return (
                                        <option key={index} value={item.value}>{item.name}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Button className="mb-3 w-25" variant="success" onClick={submit}>{location?.state?.isEdit ? "Update" : "Create"}</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
    return (
        <div>
            <Layout children={NewHotelComponent} />
        </div>
    )
}

export default NewRoom