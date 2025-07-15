"use client";
import axios from "axios";
import React, { useState } from "react";

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://dummyjson.com/users/add", formData);
      console.log("Response:", res.data);
      setMessage("User Created Successfully!");
    } catch (err) {
      console.log("Error creating user:", err);
      setMessage("Failed to create user");
    }
  };

  return (
    <>
      <div className="p-4 max-w-md ">
        <h2 className="text-xl font-bold mb-4">Create User</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 py-2 px-4 rounded hover:bg-blue-700"
          >
            {" "}
            Create Users
          </button>
        </form>

        {message && <p className="py-3">{message}</p>}
      </div>
    </>
  );
};

export default CreateUserForm;
