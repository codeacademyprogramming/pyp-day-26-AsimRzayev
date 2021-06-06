import {typeConst} from './constants'

export function addReserv(id,reserv){
    return {
        type:typeConst.ADD_RESERV,
        payload:{reserv,id}
    }
}
