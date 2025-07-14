"use client";
import React, { useEffect, useState } from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

const PaginatedUserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 10;

  const fetchUsers = async () => {
    setLoading(true);
    const skip = page * LIMIT;

    try {
      const res = await fetch(
        `https://dummyjson.com/users?limit=${LIMIT}&skip=${skip}`
      );

      const data = await res.json();

      //add new users to the existing list
      setUsers((prevUsers) => [...prevUsers, ...data.users]);

      //If fewer users returned than limit, no more data
      if (data.users.length < LIMIT) {
        setHasMore(false);
      }
    } catch (err) {
      console.log("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <>
      <div className="p-9">
        <h1 className="text-3xl font-bold">Paginated Users</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {users.map((data) => (
            <div key={data.id} className="rounded-2xl shadow-amber-50 p-4">
              <img
                src={data.image}
                alt={`${data.firstName} ${data.lastName}`}
                className="w-24 h-24 object-cover rounded-full mb-4 mx-auto"
              />
              <h2 className="text-xl font-semibold text-center">
                {data.firstName} {data.lastName}
              </h2>
              <p className="text-gray-600 text-center">{data.email}</p>
            </div>
          ))}
        </div>

        {/* load more button */}

        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={loading}
              className="bg-blue-200 text-gray-800 px-8 py-2 rounded hover:bg-blue-300"
            >
              {loading ? "Loading...." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PaginatedUserList;
