import { useState } from "react";
import UpdateForm from "./UpdateForm";
import { update } from '../actions/auth';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const Update = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const auth = JSON.parse(window.localStorage.getItem('auth'));
    const { token } = auth;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await update(token, { name, email, password });
            console.log(res);
            if(res.data) {
                toast.success('Update Successful');
                window.localStorage.removeItem('auth');
                history.push('/login');
            }
        } catch (err) {
            console.log(err);
            if(err.response.status === 400) toast.error(err.response.data);
        }
    };
    return (
        <>
            <UpdateForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
            />
        </>
    )
}

export default Update;