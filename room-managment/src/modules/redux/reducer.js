import axios from "axios";
import { typeConst } from "./constants";
export let reducer = (state = [], action) => {
   
    switch (action.type) {
        case typeConst.ADD_RESERV:
            axios
                .post(
                    `http://localhost:5000/reservations/${action.payload.id}/add`,
                    action.payload.reserv
                )
                .then((res) => console.log(res.data));
          return action.payload.reserv
        case typeConst.GET_RESERV:
          
            return [...action.payload];
        case typeConst.GET_ALL_RESERV:
            return [...action.payload];
        default:
            return state;
    }
};
