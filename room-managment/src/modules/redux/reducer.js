import axios from "axios";
import { typeConst } from "./constants";
export let reducer = (state = [], action) => {
    let newReserv;
    switch (action.type) {
        case typeConst.ADD_RESERV:
            axios
                .post(
                    `http://localhost:5000/reservations/${action.payload.id}/add`,
                    action.payload.reserv
                )
                .then((res) => console.log(res.data));
            return newReserv;
        case typeConst.GET_RESERV:
            newReserv=action.payload;         
            return newReserv;
        default:
            return state;
    }
};
