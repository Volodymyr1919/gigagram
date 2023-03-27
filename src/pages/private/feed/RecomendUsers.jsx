import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export default function RecomendUsers() {

    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        function getAllUsers() {
            fetch('http://65.109.13.139:9191/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                }
            })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                setUsers(data);
                console.log(data);
            })
        }
        getAllUsers();
    },[])

  return (
    <List dense sx={{ width: '360px', maxWidth: 360, bgcolor: 'background.paper', height: 'fit-content' }}>
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
}