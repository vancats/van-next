// import { use } from "react";

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    message: "Hello, About!",
  };
}

export default async function Page() {
  const { message } = await getData();
  // const { message } = use(getData());
  return <h1>{message}</h1>;
}
