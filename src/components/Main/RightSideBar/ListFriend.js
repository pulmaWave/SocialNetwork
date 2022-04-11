import * as React from 'react';
import { Box } from '@mui/material';
import UserInfo from '../../UserInfo/UserInfo';
import { getCollection } from '../../../utilities/utilities';

const ListFriend = () => {
  const listFriend = getCollection('users');
  return (
    <Box>
      {listFriend.length > 0 &&
        listFriend.maps((friend) => {
          return (
            <UserInfo
              key={friend.uid}
              displayName={friend.displayName}
              image={friend.image}
            />
          );
        })}
    </Box>
  );
};

export default ListFriend;
