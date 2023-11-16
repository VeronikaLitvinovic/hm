import { Link, useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const users = await fetch(
      "https://jsonplaceholder.typicode.com/users",
    ).then((r) => r.json());

    return { users };
  } catch (error) {
    throw error;
  }
};

export default function Users() {
  const { users } = useLoaderData();

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {users.map((user) => (
        <Link key={user.id} to={`/users/${user.id}`}>
          <div>{user.name}</div>
        </Link>
      ))}
    </div>
  );
}
