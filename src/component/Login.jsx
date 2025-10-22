import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../api/memberApi';
import { useDispatch } from 'react-redux';
import { login } from '../slices/loginSlice';

const initialState = {
    email: '',
    password: ''
};

function Login() {
    const [loginParam, setLoginParam] = useState({ ...initialState });

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value;
        setLoginParam({ ...loginParam });
    }

    const handleClick = (e) => {
        postLogin(loginParam).then((data) => {
            if (!data.error) {
                console.log('data:', data);
                dispatch(login(loginParam));
                setLoginParam({ ...loginParam });
                navigate('/', { replace: true });
            } else {
                alert("아이디 비밀번호 정확히 입력하세요");
                setLoginParam({ ...initialState });
            }
        }).catch((error) => {
            console.error('error:', error);
            });
    }

    return (
        <>
            <div className="login-container">
                <div className="login-box">
                    <h2>Login</h2>          
                    <form>
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" value={loginParam.email} placeholder="Enter your email" onChange={handleChange} />  
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" value={loginParam.password} placeholder="Enter your Password" onChange={handleChange} />  
                        <button type="button" onClick={handleClick}>Login</button>
                    </form>
                </div>
        
                {/* <style jsx>{`
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f5f5f5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
        
                .login-container {
                    width: 100%;
                    max-width: 400px;
                }
        
                .login-box {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    text-align: center;
                }
        
                h2 {
                    margin-bottom: 20px;
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                }
        
                label {
                    display: block;
                    margin: 10px 0 5px;
                    font-size: 14px;
                    text-align: left;
                    color: #555;
                }
        
                input {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 15px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    font-size: 14px;
                }
        
                input:focus {
                    border-color: #007bff;
                    outline: none;
                }
        
                button {
                    width: 100%;
                    padding: 10px;
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                }
        
                button:hover {
                    background-color: #0056b3;
                }
                `}</style> */}
            </div>
        </>
    )
}

export default Login;