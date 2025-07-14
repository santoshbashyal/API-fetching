"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type User = {
  id: number;
  firstName: string;
  image: string;
  email: string;
};

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`https://dummyjson.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Failed to fetch user:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading Users... ... </p>;
  if (!user) return <p>User not found </p>;

  return (
    <>
      <div>
        <div className="max-w-md mx-auto bg-white shadow rounded p-6">
          <Image
            unoptimized
            src={user.image}
            alt="User"
            width={128}
            height={128}
            className="rounded-full mx-auto"
          />
          <h2 className="text-2xl font-bold text-center">{user.firstName}</h2>
        </div>
      </div>
    </>
  );
};

export default UserPage;
