import { Link, useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const albums = await fetch(
      "https://jsonplaceholder.typicode.com/albums",
    ).then((r) => r.json());

    return { albums };
  } catch (error) {
    throw error;
  }
};

export default function Albums() {
  const { albums } = useLoaderData();

  return (
    <div>
      {albums.map((album) => (
        <Link key={album.id} to={`/albums/${album.id}`} className="album_url">
          <div>{album.title}</div>
        </Link>
      ))}
    </div>
  );
}
