import React, { useEffect, useState } from 'react';
import Styles from './Login.gage.module.css';
import history from 'services/history.service';
import swal from 'sweetalert';
import { Button, Input } from 'components';
import { Helmet } from 'react-helmet';
import { Login } from 'api/userLogin.api';
import { setUserDataWhenLogin } from 'redux/actions';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { userLoginValidationSchema } from 'validations';

export const LoginPage = (props) => {

    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        if (searchParams.get('expired') == 'true') {
            history.push('/login');
        }
    }, [searchParams]);


    const customDispatch = useDispatch();
    const Navigate = useNavigate();

    const [userNameError, setUserNameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [disableFormStatus, setDisableFormStatus] = useState(false);

    const loginUser = async (event) => {
        event.preventDefault();

        const form = new FormData(event.target);
        const data = Object.fromEntries(form);
        
        setUserNameError(null);
        setPasswordError(null);

        const validData = await userLoginValidationSchema.validate(data).catch(err => {
            err.message.type == 'username' ? setUserNameError(err.message) : setUserNameError(null);
            err.message.type == 'password' ? setPasswordError(err.message) : setPasswordError(null);
            return false;
        });

        if(validData != false) {
            setDisableFormStatus(true);

            try {
                const response = await Login(data);

                customDispatch(setUserDataWhenLogin(response));

                if(response.token) {
                    setTimeout(() => {
                        Navigate('/dashboard');
                    }, 1000);
                }
            } catch (e) {
                console.log(e);
                setDisableFormStatus(false);
                e.response.status == 400 ? swal('خطا', "کاربر مورد نظر یافت نشد", 'error') : swal('خطا', "خطایی رخ داده است", 'error');
            }
        }
    }
    
    return (
        <div className={Styles.loginPage}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>ورود | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="ورود به پنل کاربری" />
            </Helmet>

            <div className={Styles.backToHomeBox}>
                <Button
                    className={Styles.backToHomeButton}
                    click={() => { Navigate('/'); }}
                    type='primary'
                    size='small'
                    text="بازگشت به صفحه اصلی"

                />
            </div>

            <div className={Styles.loginBox}>
                <h2>ورود به پنل کاربری</h2>
                <form onSubmit={loginUser}>
                    <div>
                        <Input type="text" id="username" name='username' placeholder='نام کاربری' disabled={disableFormStatus} />
                        {userNameError && <p className={Styles.errorMessage}>{userNameError.message}</p>}
                        <Input type="password" id="password" name='password' placeholder='رمز عبور' disabled={disableFormStatus} />
                        {passwordError && <p className={Styles.errorMessage}>{passwordError.message}</p>}
                        <Button type="success" size='large' text='ورود' borderRadius={true} disabled={disableFormStatus} />
                    </div>
                </form>
            </div>
        </div>
    );
};
