import { RouteComponentProps, withRouter } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import firebase from "firebase/app";
import "firebase/auth";

import { useAppDispatch } from '../../hooks/redux';
import { auth, logIn } from '../../redux/reducers/userSlice';

const Login = (props: RouteComponentProps) => {
  const dispatch = useAppDispatch();
  
  const onClick = async () => {
    console.log('button clicked');
    dispatch(logIn());
  }

  return (
      <button 
          onClick={onClick} 
          style={{ 
              border:'none',background:'white',fontSize:'16px',
              display:'flex',cursor:'pointer',outline:'none',margin:'0 auto'
          }}
      ><FcGoogle size={36}/><span style={{ padding: '0.5rem' }}>Login with Google</span></button>
    );
};

export default withRouter(Login);