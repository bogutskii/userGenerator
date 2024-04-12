import React, { useState } from 'react';
import "./styles.css";
import { namesMale, namesFemale, lastNames } from './nameData';

export default function App() {
  const [userCount, setUserCount] = useState(1);
  const [selectedFields, setSelectedFields] = useState(new Set());
  const [sampleUser, setSampleUser] = useState({});
  const [generatedUsers, setGeneratedUsers] = useState([]);

  const list = {
    id: null,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: ""
    },
    phone: "",
    website: "",
    company: {
      name: "Romaguera-Crona"
    }
  };

  const adjustUserCount = (amount) => {
    setUserCount(Math.max(1, userCount + amount));
  };

  const handleCheckboxChange = (field) => {
    console.log(namesMale, namesFemale, lastNames);
    const newFields = new Set(selectedFields);
    if (newFields.has(field)) {
      newFields.delete(field);
    } else {
      newFields.add(field);
    }
    setSelectedFields(newFields);
    setSampleUser(generateRandomUser(newFields)); // Обновляем пример с новыми полями
  };

  const generateRandomUser = (selectedFields) => {
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const user = {};

    Object.keys(list).forEach(key => {
      if (selectedFields.has(key)) {
        if (key === 'address') {
          user[key] = {
            street: "Main St",
            suite: "Apt. " + Math.floor(Math.random() * 1000),
            city: "Anytown",
            zipcode: "12345"
          };
        } else if (key === 'company') {
          user[key] = { name: "Romaguera-Crona" };
        } else if (key === 'id') {
          user[key] = Math.floor(Math.random() * 10000);
        } else if (key === 'name') {
          const firstName = Math.random() < 0.5 ? rand(namesMale) : rand(namesFemale);
          const lastName = rand(lastNames);
          user[key] = `${firstName} ${lastName}`;
        } else if (key === 'username') {
          user[key] = user.name ? user.name.replace(/\s+/g, '').toLowerCase() : 'user' + user.id;
        } else if (key === 'email') {
          user[key] = user.username ? `${user.username}@example.com` : null;
        } else if (key === 'phone') {
          user[key] = `${Math.floor(100 + Math.random() * 900)}-555-${Math.floor(1000 + Math.random() * 9000)}`;
        } else if (key === 'website') {
          user[key] = user.username ? `www.${user.username}.com` : null;
        }
      }
    });

    return user;
  };

  const handleGenerate = () => {
    const users = [];
    for (let i = 0; i < userCount; i++) {
      users.push(generateRandomUser(selectedFields));
    }
    setGeneratedUsers(users); // Сохраняем массив сгенерированных пользователей
  };

  return (
    <div className="App">
      <div>
        <input type="number" value={userCount} onChange={(e) => setUserCount(Number(e.target.value))} />
        <button onClick={() => adjustUserCount(1)}>+1</button>
        <button onClick={() => adjustUserCount(10)}>+10</button>
        <button onClick={() => adjustUserCount(50)}>+50</button>
        <button onClick={() => adjustUserCount(100)}>+100</button>
        <label> how many users </label>
      </div>
      <ul className="checkbox-list">
        {Object.keys(list).map((key, index) => (
          <li key={index}>
            <input type="checkbox" checked={selectedFields.has(key)} onChange={() => handleCheckboxChange(key)} />
            <label>{key}</label>
          </li>
        ))}
      </ul>
      <button onClick={handleGenerate}>Generate</button>
      <h2>Example User</h2>
      <pre>{JSON.stringify(sampleUser, null, 2)}</pre>
      <h2>Generated Users</h2>
      <pre>{JSON.stringify(generatedUsers, null, 2)}</pre>
    </div>
  );
}
