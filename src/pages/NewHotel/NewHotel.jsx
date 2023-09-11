import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import './NewHotel.css'
import Layout from '../../components/Layout/Layout'
import Axios from '../../api/Axios'
import { toastNoti, validateHotel } from '../../utils/utils'
import { HOTEL_TYPE, FEATURED } from '../../constants/hotelType';

const initState = {
    name: "",
    type: "default",
    city: "",
    address: "",
    distance: "",
    photos: "",
    desc: "",
    rating: "",
    featured: "no",
}

const NewHotel = () => {
    const [data, setData] = useState(initState)
    const location = useLocation()
    const navigate = useNavigate()

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const getHotelById = async (id) => {
        try {
            const res = await Axios.get(`/hotels/detail/${id}`)
            if (res.status === 200) {
                const newData = { ...res.data }
                delete newData['img']
                delete newData['rooms']
                delete newData['createdAt']
                delete newData['updatedAt']
                delete newData['__v']
                delete newData['_id']
                setData(newData)
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (!location?.state?.isEdit) return;
        getHotelById(location?.state?.id)
        // eslint-disable-next-line
    }, [])


    const submit = async () => {
        try {
            const validate = validateHotel(data)
            if (validate) {
                if (!location?.state?.isEdit) {
                    const res = await Axios.post(`/hotels/create`, data)
                    if (res.status === 200) {
                        const newData = { ...initState }
                        setData(newData)
                        toastNoti("Add success!", 'success')
                    }
                } else {
                    const res = await Axios.put(`/hotels/update/${location?.state?.id}`, data)
                    if (res.status === 200) {
                        const newData = { ...initState }
                        setData(newData)
                        toastNoti(res.data.message, 'success')
                        navigate('/list/hotels')
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
                <h5>{location?.state?.isEdit ? "UPDATE HOTEL" : "ADD NEW HOTEL"}</h5>
            </div>
            <div className='card form'>
                <Form>
                    <div className='form-layout'>
                        <Form.Group className="mb-3 w-45" >
                            <Form.Label>Name </Form.Label>
                            <Form.Control type="text" placeholder="Name" name='name' value={data.name} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3 w-45" >
                            <Form.Label>Type</Form.Label>
                            <Form.Select name='type' onChange={onChange} value={data.type}>
                                <option value="default">Please choose type for hotel</option>
                                {HOTEL_TYPE.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
                    </div>

                    <div className='form-layout'>
                        <Form.Group className="mb-3 w-45" >
                            <Form.Label>City </Form.Label>
                            <Form.Control type="text" placeholder="City" name='city' value={data.city} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3 w-45" >
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address" name='address' value={data.address} onChange={onChange} />
                        </Form.Group>
                    </div>

                    <div className='form-layout'>
                        <Form.Group className="mb-3 w-45" >
                            <Form.Label>Distance from city center </Form.Label>
                            <Form.Control type="number" placeholder="Distance" name='distance' value={data.distance} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3 w-45" >
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type="number" placeholder="Rating" name='rating' value={data.rating} onChange={onChange} />
                        </Form.Group>
                    </div>

                    <div className='form-layout'>
                        <Form.Group className="mb-3 w-45" >
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" name='desc' value={data.desc} onChange={onChange} />
                        </Form.Group>
                        {/* <Form.Group className="mb-3 w-45" >
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Price" name='price' value={data.price} onChange={onChange} />
                        </Form.Group> */}
                    </div>

                    <div className='form-layout'>
                        <Form.Group className="mb-3 w-45" >
                            <Form.Label>Images</Form.Label>
                            <Form.Control type="text" placeholder="Images url" name='photos' value={data.photos} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3 w-45" >
                            <Form.Label>Featured</Form.Label>
                            <Form.Select name='featured' onChange={onChange} value={data.featured}>
                                <option value="no">No</option>
                                {FEATURED.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
                    </div>

                    <div className='form-layout'>
                        <Form.Group className="mb-3 w-50" >
                            <Form.Label>Rooms</Form.Label>
                            <Form.Control as="textarea" rows={3} name='rooms' placeholder='Down the line between room' />
                        </Form.Group>

                    </div>

                    <div>
                        <Button className="mb-3" variant="success" onClick={submit}>{location?.state?.isEdit ? "Update" : "Create"}</Button>
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

export default NewHotel