import { useState } from "react";

const userFilter = ({ users, setFilteredUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.createdAt.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="Buscar por nome, email ou data de criação"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 rounded-md border border-gray-300"
      />
    </div>
  );
};

export default userFilter;
