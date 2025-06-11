import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const RecoverItem = () => {
  const [items, setItem] = useState([]);
const { users } = useContext(AuthContext);
console.log(items);


useEffect(() => {
  if (users?.email) {
    fetch(`http://localhost:3000/my-recoversItems?email=${users.email}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        console.log(data);
      });
  }
}, [users?.email]);
    return (
        <div>
            
        </div>
    );
};

export default RecoverItem;