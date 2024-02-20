import api from "@/services/api";
import React, { useState } from "react";
import { FiTrash, FiEdit, FiX, FiCheck } from "react-icons/fi";

const UserCard: any = ({
  id,
  name,
  email,
  createdAt,
  users,
  setUsers,
  setFilteredUsers,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    name,
    email,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    await api.put(`/user/update/${id}`, editedUserData);
    const updatedUsers = users.map((user) =>
      user._id === id ? { ...user, ...editedUserData } : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setIsEditing(false);
  };

  const handleDeleteClick = async (id: string) => {
    try {
      await api.delete(`/user/delete/${id}`);
      const allUsers = users.filter((user) => user._id !== id);
      setUsers(allUsers);
      setFilteredUsers(allUsers);
    } catch (error) {}
  };

  const handleCancelClick = () => {
    setEditedUserData(users);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <article className="w-full bg-white rounded p-2 relative hover:scale-105 gap-4">
      <p>
        Nome:{" "}
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedUserData.name}
            onChange={handleInputChange}
          />
        ) : (
          name
        )}
      </p>
      <p>
        <span>
          Email:{" "}
          {isEditing ? (
            <input
              type="text"
              name="email"
              value={editedUserData.email}
              onChange={handleInputChange}
            />
          ) : (
            email
          )}
        </span>
      </p>
      <p>
        <span>Data de Cadastro:</span>
        {new Date(createdAt).toLocaleDateString("pt-BR")}
      </p>
      {!isEditing && (
        <>
          <button
            onClick={() => handleDeleteClick(id)}
            className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
          >
            <FiTrash size={18} color="#FFF" />
          </button>
          <button
            className="bg-yellow-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-8 -top-2"
            onClick={handleEditClick}
          >
            <FiEdit size={18} color="#FFF" />
          </button>
        </>
      )}
      {isEditing && (
        <>
          <button
            className="bg-green-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
            onClick={handleSaveClick}
          >
            <FiCheck size={18} color="black" />
          </button>
          <button
            className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-8 -top-2"
            onClick={handleCancelClick}
          >
            <FiX size={18} color="black" />
          </button>
        </>
      )}
    </article>
  );
};

export default UserCard;
