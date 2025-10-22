// loginSlice.js

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: ''
}

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            console.log("------------------- call login reducer");
            console.log("action: ", action);
            console.log("action.payload: ", action.payload);
            console.log("action.payload.email: ", action.payload.email);
            // 쿠키에 사용자 정보 저장
            // email 상태를 업데이트한다.
            // email = action.payload.email; 상태 정보는 불변
            return { email: action.payload.email };

        }
    }
});


export const { login } = loginSlice.actions;

export default loginSlice.reducer; // 리듀서