import { useEffect, useState } from "react";
import UserForm from "@/components/userform";
import UserCard from "@/components/userCard";
import userFilter from "@/components/userFilter";
import api from "@/services/api";

interface UserProps {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function Home() {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const response = await api.get("/user/get");
    setUsers(response.data.user);
    setFilteredUsers(response.data.user);
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <div className="my-10 w-1/2">
        <h1 className="text-2xl font-medium text-white">Contatos</h1>
        <UserForm setUsers={setUsers} setFilteredUsers={setFilteredUsers} />
        <Filter users={users} setFilteredUsers={setFilteredUsers} />
        <section className="flex flex-col gap-4">
          {filteredUsers.map((user) => (
            <UserCard
              key={user._id}
              id={user._id}
              name={user.name}
              email={user.email}
              createdAt={user.createdAt}
              users={users}
              setUsers={setUsers}
              setFilteredUsers={setFilteredUsers}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
