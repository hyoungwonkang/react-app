
import { useSelector } from 'react-redux';

function Item() {
    const email = useSelector((state) => state.loginSlice.email);

    console.log("email: ", email);

    return (
        <>
            <h1>Welcome to the Item Page</h1>
        </>
    )
}

export default Item;