import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [buttonIsLoading, setButtonIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    data: blog,
    err,
    isLoading,
  } = useFetch("http://192.168.1.4:8000/api/blogs/" + id);

  function handleBlogDelete(e) {
    e.preventDefault();
    setButtonIsLoading(true);
    fetch("http://192.168.1.4:8000/api/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      setButtonIsLoading(false);
      navigate("/");
    });
  }
  return (
    <div className="blog-details">
      {err && <div>{err}</div>}
      {isLoading && <div>the content is loading . . .</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          {!buttonIsLoading && (
            <button onClick={handleBlogDelete}>Delete</button>
          )}
          {buttonIsLoading && <button disabled>Deleting . . .</button>}

          <Link to={`/blogs/${blog.id}/edit`}>
            <button>Edit</button>
          </Link>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
