import React from "react";
import { useForm } from "react-hook-form";
import api from "@/services/api";

const UserForm = ({ setUsers, setFilteredUsers }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: { name: string; email: string }) => {
    try {
      if (!data.name || !data.email) {
        return;
      }
      const response = await api.post("/user/create", {
        name: data.name,
        email: data.email,
      });

      setUsers((allUsers) => [...allUsers, response.data.user]);
      setFilteredUsers((allUsers) => [...allUsers, response.data.user]);
      reset();
    } catch (error) {
      console.error("Failed to create user", error);
    }
  };

  return (
    <div className="my-10 w-full md:max-w-2x1">
      <form className="flex flex-col my-6" onSubmit={handleSubmit(onSubmit)}>
        <label className="font-medium text-white">Nome:</label>
        <input
          type="text"
          placeholder="Digite seu nome"
          {...register("name", { required: "Nome é obrigatório" })}
          className="wfull mb-5 p-2 rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <label className="font-medium text-white">Email:</label>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email é obrigatório" })}
          className="wfull mb-5 p-2 rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <button
          className="cursor-pointer w-full p2 bg-green-500 rounded font-medium"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default UserForm;
