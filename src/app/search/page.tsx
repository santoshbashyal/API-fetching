"use client";
import React, { useEffect, useState } from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  gender: string;
};

const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Failed to fetch users", err);
        setLoading(false);
      });
  }, []);

  //   filter users by search input
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const searchTerm = search.toLowerCase();
    const gender = user.gender.toLowerCase();

    return (
      fullName.includes(searchTerm) ||
      email.includes(searchTerm) ||
      gender.includes(searchTerm)
    );
  });

  return (
    <>
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-4">User List</h1>

        <input
          type="text"
          placeholder="Search by name or email...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-6 border border-gray-100 rounded-2xl"
        />

        {loading ? (
          <p>Loading Users ...</p>
        ) : filteredUsers.length === 0 ? (
          <p>No Users Found</p>
        ) : (
          <div>
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-4 text-center shadow-md rounded-2xl p-6"
              >
                <img
                  src={user.image}
                  alt={user.firstName}
                  className="w-24 h-24 object-cover rounded-full"
                />
                <h2 className="underline text-2xl font-bold">
                  {user.firstName}
                </h2>
                <p className="p-4   "> {user.email}</p>
                <p className="font-semibold text-center "> {user.gender}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
