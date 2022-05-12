import { React, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import UserInfo from '../../UserInfo/UserInfo';
import Friend from './Friend';
import Save from './Save';
import ListAds from './ListAds';
import colors from '../../../assets/style/GlobalStyles';
import Male from '../../../assets/images/avtdefault.jpg';
import Female from '../../../assets/images/girl.png';
import { getDocById } from '../../../utilities/utilities';
import Loading from '../../../layout/loadingUser';

const SideBar = () => {
  const uid = localStorage.getItem('uid');
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getDocById('users', uid).then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, [uid]);
  return (
    <Box
      sx={{
        p: '40px 10px 10px 15px',
        height: 'calc(100vh - 112px)',
        overflow: 'auto',
        visibility: 'hidden',
        overscrollBehaviorY: 'contain',
        ':hover': {
          visibility: 'visible'
        },
        '::-webkit-scrollbar': {
          width: '10px'
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: `${colors.colors.gray[200]}`
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: `${colors.colors.gray[400]}`,
          borderRadius: '10px'
        }
      }}
    >
      <Box sx={{ visibility: 'visible' }}>
        {loading ? (
          <Loading />
        ) : (
          <UserInfo
            image={user?.image || Male}
            displayName={user.userName}
            link={`/profile=${uid}`}
          />
        )}
      </Box>
      <Box sx={{ visibility: 'visible' }}>
        <Friend />
      </Box>
      <Box sx={{ visibility: 'visible' }}>
        <Save />
      </Box>
      <Divider
        sx={{
          m: '5px 0',
          visibility: 'visible'
        }}
      />
      <Box sx={{ visibility: 'visible' }}>
        <ListAds />
      </Box>
    </Box>
  );
};

export default SideBar;
