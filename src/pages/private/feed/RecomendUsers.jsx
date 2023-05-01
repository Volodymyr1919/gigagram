import * as React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Avatar, ListItemAvatar, Button, TextField, InputAdornment } from '@mui/material/';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/MainStore';
import { useNavigate } from "react-router-dom/dist";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const RecomendUsers = observer(() => {

  const { RequestsStore, ConfigStore } = useStores();
  const [users, setUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();

    React.useEffect(() => {
      new Promise((resolve, rejects) => {
        resolve();
      })
      .then(() => {
        return RequestsStore.doGet(ConfigStore.url + "/users")
      })
      .then((users) => {
        if (users === "Forbidden") {
          ConfigStore.setErr("Token has been burned");
          ConfigStore.setIsShow(true);
        } else {
          setUsers(users);
        }
      })
    },[]);

    const toUser = (username) => {
      navigate(`/user/${username}`);
    };

  const filteredUsers = users.filter((person) => {
    return (
      person.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (person.fullName &&
        person.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  };

  return (
    <List className='usersList' dense sx={{
        width: '700px',
        maxWidth: 360,
        bgcolor: 'background.paper',
        height: 'fit-content',
        padding: '10px',
        paddingTop: '32px',
        borderRadius: '5px',
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        borderRadius: "25px"
      }}>
      <TextField 
          onChange={handleSearch}
          size='small'
          fullWidth
          id="input-with-icon-textfield"
          placeholder="Username"
          multiline
          variant="filled"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ margin: 0, marginRight: "5px" }}>
                <PersonSearchIcon />
              </InputAdornment>
            ),
          }}
          style={{
            marginBottom: "10px"
          }}
        />
      {filteredUsers.map((person) => {
        const labelId = `checkbox-list-secondary-label-${person._id}`;
        return (
          <ListItem
            key={person._id}
             secondaryAction={
                <Button onClick={() => toUser(person.username)}>go to</Button>
             }
            disablePadding
          >
            <ListItemButton onClick={() => toUser(person.username)}>
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