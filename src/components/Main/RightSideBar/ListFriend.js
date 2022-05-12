import { React, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import UserInfo from '../../UserInfo/UserInfo';
import { getDocById } from '../../../utilities/utilities';
import { useDispatch } from 'react-redux';
import { addFriends } from '../../../redux/action/actions';

const ListFriend = () => {
  const dispatch = useDispatch();
  const [friends, setFriends] = useState([]);
  // const [loaded, setLoaded] = useState(false);
  const uidLogged = localStorage.getItem('uid');

  useEffect(() => {
    // get all users in list add friend requests of one user
    const getUsersFriend = async (uidLogged) => {
      let arr = [];
      const data = await getDocById('users', uidLogged);
      let i = 0;
      const length = data.friends.length;
      for (i; i < length; i++) {
        let users = await getDocById('users', data.friends[i].uid); // get information of user
        arr.push(users);
      }

      // add list friend to redux
      dispatch(addFriends(arr));
      setFriends(arr);
    };
    getUsersFriend(uidLogged);
    return () => {
      getUsersFriend(uidLogged);
    };
  }, [uidLogged, dispatch]);
  return (
    <Box>
      {friends.length > 0 &&
        friends.map((friend) => {
          return (
            <UserInfo
              key={friend.uid}
              displayName={friend.userName}
              image={friend.image}
              uid={friend.uid}
              link=""
            />
          );
        })}
    </Box>
  );
};

export default ListFriend;
