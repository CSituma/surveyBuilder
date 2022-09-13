import {
    FaPencilAlt,
    FaUserAlt,
    FaRegEye,
    FaBookReader
} from "react-icons/fa";

export const menuItem = [

    {
        path: "/home",
        name: "Home",
        icon: <FaUserAlt />
    },
    {
        path: "/createQuestion",
        name: "Create Question",
        icon: <FaPencilAlt/>
    },
    {
        path: "/preview",
        name: "Preview",
        icon: <FaRegEye />
    },
    {
        path: "/questionnairesList",
        name: "My Questionnaires",
        icon: <FaBookReader />
    }
]