import axios from "axios";
import EditBook from "../../../components/EditBook";

export default function BookDetails({ data }) {
  return (
    <>
      <EditBook props={data} />
    </>
  );
}

// getServerSideProps or getStaticProps
export async function getStaticProps({ params }) {
  const { data } = await axios.get(
    `http://localhost:5000/api/v1/book/${params.id}`
  );
  return { props: { data } };
}

export async function getStaticPaths() {
  const { data } = await axios.get("http://localhost:5000/api/v1/book");
  return {
    paths: data.map((book) => ({
      params: {
        id: book.id.toString(),
      },
    })),
    fallback: false,
  };
}
