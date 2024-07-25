// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import baseApi from 'src/configs/baseApi'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Styled Components

import { useRouter } from 'next/router';

interface User {
  id: number;
  name: string;
  email: string;
}

interface State {
  currentPassword: string;
  showCurrentPassword: boolean;
}

const TabAccount = () => {
  const [user , setUser] = useState<any>()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')


  // ** State
  const [values, setValues] = useState<State>({
    currentPassword: '',
    showCurrentPassword: false
  });



  // ** Event Handlers
  const handlePasswordChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = (prop: keyof State) => () => {
    setValues({ ...values, [prop]: !values[prop] });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {

    const token: any = localStorage.getItem('token')

    const tokenObj = JSON.parse(token);

    setToken(tokenObj)

    if(tokenObj){
      const fetch = async () => {
        const response = await baseApi.get('users/admin-account', {
          headers: {
            Authorization: tokenObj
          }
        })
  

        setUser(response.data[0])
  
      }
      fetch()
    }
    
    
  }, [])

  useEffect(() => {

    if(user){
      setEmail(user.email)
      setName(user.name)
    }

    
    
  }, [user])

  const handleSave = async () => {
    try {
    
      const body = {
        name: name,
        email: email,
        current_password: values.currentPassword
      }
      const response = await baseApi.put(`/users/`, body, {
        headers: {
          Authorization: token
        }
      });
      console.log('User saved:', response);
      window.location.reload();
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Failed to save user');
    }
  };


  return (
    <CardContent>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField variant='filled' name='name' onChange={(e) => setName(e.target.value)} fullWidth label="Username" placeholder=""  value={name} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField variant='filled' fullWidth type="email" onChange={(e) => setEmail(e.target.value)} label="Email" placeholder=""  value={email} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="account-settings-current-password">Current Password</InputLabel>
              <OutlinedInput
                label="Current Password"
                value={values.currentPassword}
                id="account-settings-current-password"
                type={values.showCurrentPassword ? 'text' : 'password'}
                onChange={handlePasswordChange('currentPassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword('showCurrentPassword')}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSave} sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};


export const getServerSideProps = async (context: any) => {
  // Kullanıcı girişi kontrolü
  if (!context.req.headers.cookie || !context.req.headers.cookie.includes('token')) {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }


  return {
    props: { },
  };
};



export default TabAccount;
