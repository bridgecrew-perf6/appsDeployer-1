import { useState } from 'react';
import { sendMail } from '../actions/auth';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { verificationStatus } from '../actions/auth';

let res = {};

const Otp = () => {
    const [click, setClick] = useState(false);
    const [otp, setOtp] = useState(0);
    const auth = JSON.parse(window.localStorage.getItem('auth'));
    const { token, user } = auth;
    const history = useHistory();

    const otpSend = async () => {
        setClick(true);
        try {
            res = await sendMail(user, token);
            console.log(res.data.otp);
            if(res.data) {
                toast.success('OTP send. Check you email.');
            }
        } catch (err) {
            console.log(err);
            if(err.response.status === 400) toast.error(err.response.data);
        }
   }

   const verify = (e) => {
        e.preventDefault();
        // console.log(res, " ", `${otp}`);
        if(`${res.data.otp}` === `${otp}`) {
            toast.success('Verification Successful. Login again.');
            verificationStatus(user, token);
            window.localStorage.removeItem('auth');
            history.push('/login');
        } else {
            toast.success('Incorrect OTP. Try again.');
        }
   }

    return (
        <>
            { !click ? 
                <a className="nav-link pointer" onClick={otpSend}>Send OTP for verification.</a> :
                <form onSubmit={verify} className='mt-3'>
                    <div className='form-group mb-3'>
                        <label className='form-label'>OTP</label>
                        <input
                            type='number'
                            className='form-control'
                            placeholder='Enter OTP.'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-primary'>Verify</button>
                </form>
                }
        </>
    );
};

export default Otp;