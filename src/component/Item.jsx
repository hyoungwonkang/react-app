
import { useEffect, useState } from 'react';
import { getItems } from '../api/itemApi';
import { createSearchParams, useNavigate } from 'react-router-dom';

function Item() {

    const [items, setItems] = useState([]);

    const navigate = useNavigate();
    
    useEffect(() => {
        getItems().then(data => {
            console.log("data:", data);
            setItems(data);
        })
        .catch(ex => {
            const errorMsg = ex.response.data.error; // REQUIRED_LOGIN
            const searchParams = createSearchParams({error: errorMsg}).toString();
            if (errorMsg === "REQUIRED_LOGIN") {
                alert("로그인이 필요합니다.");
                navigate({ pathname: '/login', search: searchParams }); 
            }
        })
    }, []);

    return (
        <>
            <h1>상품 목록 조회</h1>
            {
                items.length > 0 ? items.map(item => (
                    <div key={item.id} id={item.id}>
                        <span>{item.id}</span>
                        <span>-</span>
                        <span>{item.name}</span>
                    </div>
                )) : <>비어있음</>
            }
        </>
    )
}

export default Item;