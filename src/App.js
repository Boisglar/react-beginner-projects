import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [serch, setSerch] = useState('');

  async function usersFetch() {
    setIsLoading(true);
    let res = await fetch('https://reqres.in/api/users');
    if (res.ok) {
      res = await res.json();
      setUsers(res.data);
    } else {
      console.error('Ошибка при получении пользователей');
    }
    setIsLoading(false);
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvites = () => {
    setSuccess(true);
  };

  useEffect(() => {
    usersFetch();
  }, []);

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          items={users}
          search={serch}
          setSearch={setSerch}
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
