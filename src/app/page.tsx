"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type User = {
  id: number;
  firstName: string;
  lastname: string;
  email: string;
  image: string;
  height: number;
  hair: {
    color: string;
  };
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Failed to fetch users:", error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 my-2">User List</h1>
      {loading ? (
        <p>Loading Users...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {users.map((user) => (
            <div className="p-4 rounded" key={user.id}>
              <Image
                unoptimized
                src={user.image}
                alt={`${user.firstName} ${user.lastname}`}
                height={150}
                width={150}
                className="object-cover rounded-full mb-4 mx-auto"
              />
              <div className="flex flex-col items-center gap-3">
                <div>hair-Color: {user.hair.color}</div>
                <div>{user.firstName}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
