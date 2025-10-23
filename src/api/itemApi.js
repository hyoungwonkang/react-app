
import jwtAxios from '../util/jwtUtil';

export const API_SERVER_HOST = "http://localhost:9000"

export const prefix = `${API_SERVER_HOST}/api/v1`;

export const getItems = async () => {
    const res = await jwtAxios.get(`${prefix}/items`);

    console.log("getItems res:", res);

    return res;
}
