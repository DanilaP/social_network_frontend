import { IUser } from '@/models/user/model';
import { createStore } from 'redux';

export interface UserStore {
    user: IUser | null,
}
const stateInitial: UserStore = {
    user: null,
}

function reducer(state = stateInitial, action: { type: string, payload: any }) {
    switch(action.type) {
        case "SET_USER": return { ...state, user: action.payload }
        default: return state;
    }
}

const userStore = createStore(reducer);

export default userStore;