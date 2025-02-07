export default function Page({ data }: { data: object }) {
  return <p>{JSON.stringify(data)}</p>;
}

export async function getServerSideProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  const data = await res.json();

  return { props: { data } };
}
