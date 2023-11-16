import { useLoaderData, Link } from "react-router-dom";

export const loader = async ({ params: { id } }) => {
  try {
    const userPromise = fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    ).then((r) => r.json());

    const albumPromise = fetch(
      `https://jsonplaceholder.typicode.com/albums?userId=${id}`,
    ).then((r) => r.json());

    const [user, albums] = await Promise.all([userPromise, albumPromise]);

    return { user, albums };
  } catch (error) {
    throw error;
  }
};

export default function User() {
  const { user, albums } = useLoaderData();

  return (
    <div>
      {user && (
        <div>
          <h3>{user.name}</h3>
          <div>Username: {user.username}</div>
          <div>Email: {user.email}</div>
          <div>Phone: {user.phone}</div>
          <div>Website: {user.website}</div>

          <div>
            <h4>Albums:</h4>
            {albums.map((album) => (
              <Link
                key={album.id}
                to={`/albums/${album.id}`}
                className="album_url"
              >
                <div>{album.title}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
