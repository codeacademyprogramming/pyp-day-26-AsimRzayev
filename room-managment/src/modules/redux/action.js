import { typeConst } from "./constants";
import axios from "axios";
export function addReserv(reserv) {
    return {
        type: typeConst.ADD_RESERV,
        payload: reserv,
    };
}

export const getReserv = (id) =>dispatch=> {

        axios
            .get(`http://localhost:5000/reservations/${id}`)
            .then((response) => {
               
                dispatch({type: typeConst.GET_RESERV,payload:response.data})
            });
};
