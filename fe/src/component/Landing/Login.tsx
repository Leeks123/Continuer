import { FcGoogle } from 'react-icons/fc';

import { useAppDispatch } from '../../hooks/redux';
import { logIn } from '../../redux/reducers/userSlice';

const Login = () => {
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

export default Login;