import {typeConst} from "./constants";
import { roomsInital} from './states'

export let reducer = (state=roomsInital, action) => {
    let newReserv
    switch (action.type) {
        case typeConst.ADD_RESERV:
          
            state.find(x=>x.dataId===action.payload.id).reservation.push(action.payload.reserv)
            newReserv=[...state]
            return newReserv;
            
        default:
            return state;
    }
};
