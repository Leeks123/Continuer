import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Login = () => {
  
  const onSuccess = async (response:any) => {
    //   const { googleId, name, email } = response.profileObj;
      const { tokenId, accessToken } = response;
      console.log(response);
      console.log(tokenId, accessToken);
    //   console.log(googleId, name, email);
      const res = await axios.post('/users/auth',{
          token: tokenId
      });
      console.log(res);
  }
  const onFailure = (error:any) => {
      console.error(error);
  }
  return (
    <div >
      <GoogleLogin
        clientId={clientId as string}
        render={renderProps => (
            <button 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled}
                style={{ 
                    border:'none',background:'white',fontSize:'16px',
                    display:'flex',cursor:'pointer',outline:'none',margin:'0 auto'
                }}
            ><FcGoogle size={36}/><span style={{ padding: '0.5rem' }}>Login with Google</span></button>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        style={{ boxShadow: 'none' }}
      />
    </div>
  );
};

export default Login;