/* eslint-disable */
import {
    LOGIN_REQUEST,
    LOGIN_SUCCES,
    LOGIN_FAIL
} from '../constants/User'

export function handleLogin() {

    return function(dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });

        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                    debugger;
                    console.log('Good to see you, ' + response.name + '.');
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });

        // FB.getLoginStatus(function(response) {
        //     if (response.status === 'connected') {
        //         debugger;
        //
        //         dispatch({
        //             type: LOGIN_SUCCES,
        //             payload: 'username'
        //         })
        //     }
        //
        //     else {
        //         FB.login();
        //
        //         dispatch({
        //             type: LOGIN_FAIL,
        //             error: true,
        //             payload: new Error('Ошибка авторизации')
        //         });
        //     }
        // });

        // FB.getLoginStatus(function(response) { // eslint-disable-line
        //     if (response.status === 'connected') {
        //         console.log('Logged in.');
        //         dispatch({
        //             type: LOGIN_SUCCES,
        //             payload: 'username'
        //         })
        //
        //     }
        //     else {
        //         FB.login();
        //
        //         dispatch({
        //             type: LOGIN_FAIL,
        //             error: true,
        //             payload: new Error('Ошибка авторизации')
        //         });
        //     }
        // });

        // FB.Auth.login((r) => { // eslint-disable-line no-undef
        //     if (r.session) {
        //         let username = r.session.user.first_name;
        //
        //         dispatch({
        //             type: LOGIN_SUCCES,
        //             payload: username
        //         })
        //
        //     } else {
        //         dispatch({
        //             type: LOGIN_FAIL,
        //             error: true,
        //             payload: new Error('Ошибка авторизации')
        //         })
        //     }
        // },4);
    }
}