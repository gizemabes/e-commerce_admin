// ** React Imports
import { useState, SyntheticEvent, Fragment, useEffect } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'
// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import baseApi from '../../../../configs/baseApi'

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'

import LogoutVariant from 'mdi-material-ui/LogoutVariant'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [user, setUser] = useState<any>();


  // ** Hooks
  const router = useRouter()

  useEffect(() => {
  const storedUser = localStorage.getItem('user');
  console.log(storedUser)
  if (storedUser) {
    try {
      const userObj = JSON.parse(storedUser);
      if (Array.isArray(userObj) && userObj.length > 0) {
        setUser(userObj[0]); // Set the first user object if it's an array
      } else {
        setUser(userObj); // Set the user object directly
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    }
  }
}, []);


  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = async () => {
  
    setAnchorEl(null)
    deleteCookie('token')
    router.push('auth/login')
}

const goToAccountSetting = () => {
   router.push('/pages/account-settings')
}


  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          alt='Gizem Abeş'
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src=''
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() =>  setAnchorEl(null)}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar alt='Gizem Abeş' src='' sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              
              <Typography sx={{ fontWeight: 600 }}>{user ? user.name : ''}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                Admin
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        
        <MenuItem sx={{ p: 0 }} onClick={() => goToAccountSetting()}>
          <Box sx={styles}>
            <CogOutline sx={{ marginRight: 2 }} />
            Settings
          </Box>
        </MenuItem>
        
        <MenuItem sx={{ py: 2 }} onClick={() => handleDropdownClose()}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
