import axios from "axios";
import Link from "next/link";
import React from "react";
import { Book } from "../../types/global";

function Books({ data }) {
  return (
    <>
      <h1 className="block text-gray-700 text-lg font-bold mb-2">
        List of books
      </h1>
      <ul className="px-8 pt-6 pb-8 mb-4">
        {data.map((book: Book) => (
          <li key={book.id}>
            <Link href={`/book/${book.id}`}>{book.title}</Link> -{" "}
            {book.category.name} -{" "}
            <Link href={`/books/${book.id}/edit`}>EDIT</Link>
          </li>
        ))}
      </ul>
      <Link href="/">Revenir accueil</Link>
    </>
  );
}

export default Books;

export async function getServerSideProps() {
  const { data } = await axios.get<Book[]>("http://localhost:5000/api/v1/book");
  return { props: { data } };
}
