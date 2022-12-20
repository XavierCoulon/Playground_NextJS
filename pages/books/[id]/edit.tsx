import axios from "axios";
import { GetStaticProps } from "next";
import EditBook from "../../../components/EditBook";
import { Book } from "../../../types/global";

type TProps = {
  data: Book[];
};

export default function BookDetails({ data }: TProps) {
  return (
    <>
      <EditBook props={data} />
    </>
  );
}

// getServerSideProps or getStaticProps
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/v1/book/${params.id}`
  );
  return { props: { data } };
};

export async function getStaticPaths() {
  const { data } = await axios.get<Book[]>("http://localhost:5000/api/v1/book");
  return {
    paths: data.map((book) => ({
      params: {
        id: book.id.toString(),
      },
    })),
    fallback: false,
  };
}
