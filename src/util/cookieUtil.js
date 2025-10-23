import { Cookies } from "react-cookie"; 

const cookie = new Cookies();

// 쿠키 생성
export const setCookies = (name, value, days) => {
    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days);
    // 모든 요청 경로에 쿠키 정보 포함하여 전달
    cookie.set(name, value, {expires: expires, path: '/'});
}

// 쿠키 정보 조회
export const getCookies = (name) => {
    return cookie.get(name);
}

// 쿠키 삭제
export const removeCookie = (name, path='/') => {
    cookie.remove(name, { path: path });
}
