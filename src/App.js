import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

function App() {
  const [users, setUsers] = useState([]);
  const [serch, setSerch] = useState('');

  async function usersFetch() {
    let res = await fetch('https://reqres.in/api/users');
    if (res.ok) {
      res = await res.json();
      setUsers(res.data);
    } else {
      console.error('Ошибка при получении пользователей');
    }
  }

  useEffect(() => {
    usersFetch();
  }, []);

  return (
    <div className="App">
      <Users items={users} search={serch} setSearch={setSerch} />
      {/* <Success /> */}
    </div>
  );
}

export default App;
