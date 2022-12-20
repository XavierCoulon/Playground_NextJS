import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import Router from "next/router";

function EditBook({ props }) {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation(
    (data) =>
      axios.put(`http://localhost:5000/api/v1/book/${data.id}`, {
        title: data.title,
        content: data.content,
        picture: data.picture,
        categoryId: data.categoryId,
        authorId: data.authorId,
      }),
    {
      onSuccess: () => {
        Router.push("/books");
      },
    }
  );

  const onSubmit = (data) => {
    // console.log(data);
    mutate(data);
  };

  const fetchCategories = async () => {
    await axios.get("http://localhost:5000/api/v1/category").then((result) => {
      setCategories(result.data);
    });
  };

  const fetchAuthors = async () => {
    await axios
      .get("http://localhost:5000/api/v1/user")
      .then((result) => setAuthors(result.data));
  };

  useEffect(() => {
    fetchCategories();
    fetchAuthors();
  }, []);

  useEffect(() => {
    setValue("categoryId", props.categoryId);
    setValue("authorId", props.authorId);
  }, [categories]);

  return (
    <>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="block text-gray-700 text-lg font-bold mb-2">
          Edit the book: {props.title}
        </h1>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          defaultValue={props.title}
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
          defaultValue={props.content}
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
          defaultValue={props.picture}
          {...register("picture", { required: "Picture is required..." })}
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="author-select"
        >
          Author:
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="author-select"
            {...register("authorId")}
          >
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
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
            // value={props.categoryId}
            {...register("categoryId")}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          label="Save"
          type="submit"
        >
          Save
        </button>
      </form>
    </>
  );
}

export default EditBook;
