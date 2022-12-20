import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import Router from "next/router";

function CreateBook() {
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation(
    (data) =>
      axios.post("http://localhost:5000/api/v1/book", {
        title: data.title,
        content: data.content,
        picture: data.picture,
        categoryId: data.category,
        authorId: data.author,
      }),
    {
      onSuccess: () => {
        Router.push("/books");
      },
    }
  );

  const onSubmit = (data) => {
    mutate(data);
  };

  const fetchCategories = async () => {
    await axios
      .get("http://localhost:5000/api/v1/category")
      .then((result) => setCategories(result.data));
  };

  const fetchUsers = async () => {
    await axios
      .get("http://localhost:5000/api/v1/user")
      .then((result) => setUsers(result.data));
  };

  useEffect(() => {
    fetchCategories();
    fetchUsers();
  }, []);

  return (
    <>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="block text-gray-700 text-lg font-bold mb-2">
          Create a book
        </h1>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          {...register("title", { required: "Title is required..." })}
        />
        {errors.title && (
          <p className="text-red-600 my-2 italic" role="alert">
            {errors.title?.message}
          </p>
        )}
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Content
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="content"
          type="text"
          {...register("content", { required: "Content is required..." })}
        />
        {errors.content && (
          <p className="text-red-600 my-2 italic" role="alert">
            {errors.content?.message}
          </p>
        )}
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Image
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image"
          type="text"
          {...register("picture")}
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="user-select"
        >
          Author:
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="user-select"
            {...register("author", { required: true })}
          >
            <option value="">...</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="category-select"
        >
          Category:
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category-select"
            {...register("category")}
          >
            <option value="">...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          label="Create"
          type="submit"
        >
          CREATE
        </button>
      </form>
    </>
  );
}

export default CreateBook;
