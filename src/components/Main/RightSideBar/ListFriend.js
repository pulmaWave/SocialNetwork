import * as React from 'react';
import { Box } from '@mui/material';
import UserInfo from '../../UserInfo/UserInfo';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../config/firebase';

const ListFriend = () => {
  const [users, setUsers] = React.useState();
  // React.useEffect(() => {
  //   getDocs(collection(db, 'users')).then((res) => {
  //     console.log(res);
  //     // let arr = [];
  //     // res.forEach((doc) => {
  //     //   // doc.data() is never undefined for query doc snapshots
  //     //   arr.push({
  //     //     id: doc.id,
  //     //     ...doc.data()
  //     //   });
  //     // });
  //     // setUsers(arr);
  //     // console.log('arr: ', arr)
  //   });
  // }, []);
  return (
    <Box>
      {/* {users.length > 0 &&
        users.maps((user) => {
          return (
            <UserInfo
              key={user.uid}
              displayName={user.userName}
              image={user.image}
            />
          );
        })} */}
    </Box>
  );
};

export default ListFriend;
