import { Suspense } from "react";
import { useLoaderData, Link } from "react-router-dom";
import albumStyles from "./album.module.css";

export const loader = async ({ params: { id } }) => {
  try {
    const albumPromise = fetch(
      `https://jsonplaceholder.typicode.com/albums/${id}`,
    ).then((r) => r.json());

    const [album] = await Promise.allSettled([albumPromise]);

    if (album.status === "fulfilled") {
      const { userId } = album.value;

      const userPromise = fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
      ).then((r) => r.json());

      const photosPromise = fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${id}`,
      ).then((r) => r.json());

      const [user, photos] = await Promise.all([userPromise, photosPromise]);

      return { album: album.value, user, photos };
    } else {
      throw new Error("Failed to fetch album");
    }
  } catch (error) {
    throw error;
  }
};

export default function Album() {
  const { album, user, photos } = useLoaderData();

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="info">
        <h3>{album.title}</h3>
        <p>
          Created by:{" "}
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            className={albumStyles.link}
          >
            {user.name}
          </Link>
        </p>
      </div>
      <Suspense fallback={<div>Loading photos...</div>}>
        <div className={albumStyles.album}>
          {photos.map((photo) => (
            <div key={photo.id}>
              <img src={photo.url} alt={photo.title} className="photo" />
            </div>
          ))}
        </div>
      </Suspense>
    </div>
  );
}
