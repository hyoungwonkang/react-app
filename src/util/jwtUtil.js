import axios from "axios";
import { getCookies, setCookies } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/memberApi";

// JWT 인증 토큰 재발급 요청
const refreshJWT = async (accessToken, refreshToken) => {
    const host = API_SERVER_HOST;

    const header = {headers: {'Authorization': `Bearer ${accessToken}`}};

    const res = await axios.get(`${host}/api/v1/refresh?refreshToken=${refreshToken}`, header);
    
    console.log('res: ', res);
    
    return res.data; // 응답 데이터 반환 추가
}

const jwtAxios = axios.create();

const beforeReq = (config) => {
    console.log('------------------------------- before req');

    const member = getCookies("member");

    console.log("jwtUtil beforeReq member:", member);

    if (!member) {
        console.log("No member cookie found");
        return Promise.reject({
            response: { data: { error: "REQUIRED_LOGIN" } }
        })
    }

    const { accessToken } = member;

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
}

// then과 catch에서 Promise.reject 시 에러 핸들링위한 함수
const requestFail = (error) => {

    console.log('requestFail', error);

    return Promise.reject(error);
}

// 서버에서 응답된 데이터
const beforeRes = async (res) => {

    console.log('------------------------- before res:', res);
    const data = res.data;

    if (data && data.error == "ERROR_ACCESS_TOKEN") { // 토큰이 만료된 경우

        console.log('----------------------------call before res');
        
        const member = getCookies("member");

        console.log('old accessToken:', member.accessToken); // result -> member로 수정

        const result = await refreshJWT(member.accessToken, member.refreshToken);

        console.log('new accessToken:', result.accessToken);

        console.log('result: ', result);
        
        member.accessToken = result.accessToken;
        member.refreshToken = result.refreshToken;

        setCookies("member", JSON.stringify(member), 1); // 1일
    
        const originalRequest = res.config;

        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`

        return await axios(originalRequest);

    }

    return data; // 정상적인 응답인 경우 그대로 반환

}

const responseFail = (error) => {
    
    return Promise.reject(error);
}

jwtAxios.interceptors.request.use(beforeReq, requestFail);

jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;