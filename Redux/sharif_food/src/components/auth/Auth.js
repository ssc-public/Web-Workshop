import React from 'react';
import { TextField, Button } from '@material-ui/core';

import styles from './styles.module.scss';
import { verifyCode, checkUsername, setToken } from '../../actions/authActions';
import { useDispatch } from 'react-redux';

const PAGE_TYPES = {
    auth: 'auth',
    register: 'register',
};

const Auth = React.memo(() => {
    let [page, setPage] = React.useState(PAGE_TYPES.auth);

    let [username, setUsername] = React.useState('');
    let [value, setValue] = React.useState('');
    let [loading, setLoading] = React.useState(false);

    const handleChange = React.useCallback(({ target: { value: _value } }) => {
        setValue(_value);
    });

    const dispatch = useDispatch();

    React.useEffect(() => {
        setValue('');
    }, [username]);

    const onSubmit = React.useCallback(
        event => {
            event.preventDefault();

            setLoading(true);

            if (page === PAGE_TYPES.auth) {
                checkUsername(value.trim())
                    .then(() => {
                        setPage(PAGE_TYPES.register);
                        setUsername(value);
                    })
                    .finally(() => setLoading(false));
            } else {
                verifyCode(value.trim())
                    .then(res => {
                        dispatch(setToken(res.token));
                        localStorage.setItem('token', res.token);
                    })
                    .finally(() => setLoading(false));
            }
        },
        [page, value, username],
    );

    const onButtonClicked = React.useCallback(
        event => {
            if (!value.trim().length) event.preventDefault();
        },
        [value],
    );

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={onSubmit} action="/" method="post">
                    <TextField
                        value={value}
                        className={styles.input}
                        onChange={handleChange}
                        label={page === PAGE_TYPES.auth ? 'username' : 'verification code'}
                        fullWidth
                    />

                    <Button
                        className={styles['submit-button']}
                        variant="outlined"
                        type="submit"
                        onClick={onButtonClicked}
                        disabled={loading}>
                        {page === PAGE_TYPES.auth ? 'Check' : 'Login'}
                    </Button>
                </form>
            </div>
        </div>
    );
});
export default Auth;
