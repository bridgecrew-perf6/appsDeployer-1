import { Card, Avatar} from 'antd';
import Update from "../components/Update";
import moment from 'moment';
import Otp from './Otp';

const { Meta } = Card;

const Dashboard = ({ history }) => {

    const auth = JSON.parse(window.localStorage.getItem('auth'));
    const { token, user } = auth;
    const { verified } = user;

    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                <div className="d-flex justify-content-around">
                    <Card>
                        <Meta 
                            avatar={<Avatar>{user.name[0]}</Avatar>}
                            title={user.name}
                            description={`Joined ${moment(user.createdAt).fromNow()}`}
                        />
                    </Card>
                </div>
                <div className="d-flex justify-content-around">
                    {!verified ? <Otp /> : <div className="checkmark"></div>}
                </div>
            </div>  
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <Update />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;