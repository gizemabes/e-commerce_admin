import { useState, useEffect, SyntheticEvent, Fragment, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiMenu, { MenuProps } from '@mui/material/Menu';
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar';
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import Typography, { TypographyProps } from '@mui/material/Typography';
import BellOutline from 'mdi-material-ui/BellOutline';
import PerfectScrollbarComponent from 'react-perfect-scrollbar';
import baseApi from 'src/configs/baseApi';

const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  '& .MuiMenu-list': {
    padding: 0,
  },
}));

const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0,
  },
};

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles,
});

const Avatar = styled(MuiAvatar)<AvatarProps>({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem',
});

const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75),
}));

const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

const NotificationDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await baseApi.get('/notification');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>;
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
      );
    }
  
  };

  function formatDate (isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0-11 arası olduğu için 1 ekliyoruz
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <BellOutline />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
            <Chip
              size='small'
              label={notifications.length}
              color='primary'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {notifications.map(notification => (
            <MenuItem key={notification.id} onClick={handleDropdownClose}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Avatar alt='User' src='' />
                <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                  <MenuItemTitle>{notification.message}</MenuItemTitle>
                  <MenuItemSubtitle variant='body2'>{`Customer Name: ${notification.name}`}</MenuItemSubtitle>
                </Box>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  {formatDate(notification.date)}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Button fullWidth variant='contained' onClick={handleDropdownClose}>
            Read All Notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default NotificationDropdown;
