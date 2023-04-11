import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/MainStore';

const RecomendUsers = observer(() => {

  const { RequestsStore, ConfigStore } = useStores();

  const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
      new Promise((resolve, rejects) => {
        resolve();
      })
      .then(() => {
        return RequestsStore.doGet(ConfigStore.url + "/users")
      })
      .then((users) => {
        if(users === "Forbidden"){
          ConfigStore.setErr("Token has been burned");
          ConfigStore.setIsShow(true);
        } else {
          setUsers(users);
        }
      })
    },[])

  return (
    <List dense sx={{ width: '360px', maxWidth: 360, bgcolor: 'background.paper', height: 'fit-content', paddingTop: '32px'}}>
      {users.map((person) => {
        const labelId = `checkbox-list-secondary-label-${person._id}`;
        return (
          <ListItem
            key={person._id}
             secondaryAction={
                <Button id={person.username}>Follow</Button>
            //   <Checkbox
            //     edge="end"
            //     onChange={handleToggle(value)}
            //     checked={checked.indexOf(value) !== -1}
            //     inputProps={{ 'aria-labelledby': labelId }}
            //   />
             }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt=""
                  src={person.avatar}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={person.username} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
});

export default RecomendUsers;