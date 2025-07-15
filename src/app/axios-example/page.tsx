"use client";

type Users = {
  firstName: string;
  id: number;
};

import axios from "axios";
import { useEffect, useState } from "react";

const AxiosExample = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((res) => {
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error Fetching data", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Users........</p>;

  return (
    <>
      <div className="p-9">
        <h1 className="text-3xl">Users (by axios)</h1>
        <div className="grid grid-cols-3 gap-5">
          {users.map((user) => (
            <div key={user.id}>{user.firstName}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AxiosExample;
