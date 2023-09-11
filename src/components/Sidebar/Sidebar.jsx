import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faHotel,
    faBed,
    faCreditCard,
    faRightFromBracket,
    faBorderAll
} from "@fortawesome/free-solid-svg-icons";

import './Sidebar.css'
import { logOut } from "../../reducer/authReducer";

// add icon to library to use icon by "string"
fontawesome.library.add(faUser, faHotel, faBed, faCreditCard, faRightFromBracket, faBorderAll);


const SideBarData = [{
    title: "MAIN",
    data: [{ name: "Dashboard", path: "/dashboard", icon: "border-all" }]
}, {
    title: "LISTS",
    data: [
        { name: "Users", path: "/list/users", icon: "user" },
        { name: "Hotels", path: "/list/hotels", icon: "hotel" },
        { name: "Rooms", path: "/list/rooms", icon: "bed" },
        {
            name: "Transactions",
            path: "/list/transactions",
            icon: "credit-card"
        }
    ]
}, {
    title: "NEW",
    data: [
        { name: "New Hotel", path: "/create/hotel", icon: "hotel" },
        { name: "New Room", path: "/create/room", icon: "bed" }
    ]
}, {
    title: "USER",
    data: [{ name: "Logout", path: "/", icon: "right-from-bracket" }]
}]




const Sidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div className="side-bar">
            {SideBarData.map((item, index) => {
                return (
                    <div className="mb-3" key={index}>
                        <h6>{item.title}</h6>
                        <div className="side-bar-item d-flex flex-column gap-2">
                            {item.data.map((v, i) => {
                                return (
                                    <div key={i} onClick={() => {
                                        if (v.name === "Logout") {
                                            dispatch(logOut())
                                        }
                                        navigate(v.path)
                                    }}>
                                        <FontAwesomeIcon className="side-bar-icon" icon={v.icon} /> &nbsp; {v.name}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )

}

export default Sidebar