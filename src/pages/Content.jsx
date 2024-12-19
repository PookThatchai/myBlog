import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

const removeHTMLTags = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc.body.textContent || "";
};

export default function Content({ post }) {
  if (!post) {
    return <div>Loading...</div>;
  }

  const { _id, title, summary, cover, createAt, author, content } = post;

  return (
    <>
      <div className="mt-5 w-full px-4">
        <div className="flex flex-col md:flex-row mx-auto py-3 border-8 border-blue-200 rounded-lg">
          <Link
            to={`/post/${_id}`}
            className="mb-5 md:mb-0 md:w-1/3 h-auto flex items-center justify-center mr-0 md:mr-6"
          >
            <img
              src={cover}
              alt="cover"
              className="w-full h-auto max-h-60 object-cover rounded-lg"
            />
          </Link>
          <div className="w-full">
            <Link to={`/post/${_id}`}>
              <h2 className="font-extrabold text-2xl md:text-3xl lg:text-4xl text-gray-800">
                {title}
              </h2>
            </Link>
            <p className="text-sm md:text-base text-gray-500">
              {author ? (
                <span className="mr-2 font-bold">{author.username}</span>
              ) : (
                <span className="mr-2 font-bold">Unknown Author</span>
              )}
              /<time>{formatISO9075(new Date(createAt))}</time>
            </p>
            <p className="mt-2 text-base md:text-lg lg:text-xl text-gray-700">
              {summary}
            </p>
            <p className="mt-2 text-sm md:text-base text-gray-600">
              {removeHTMLTags(content).slice(0, 150)}...
              <Link
                to={`/post/${_id}`}
                className="text-blue-500 hover:underline ml-2"
              >
                อ่านต่อ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
