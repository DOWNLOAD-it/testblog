import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const Edit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [updateButtonIsLoading, setUpdateButtonIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    data: blog,
    err,
    isLoading,
  } = useFetch("http://192.168.1.4:8000/api/blogs/" + id);
  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
      setAuthor(blog.author);
    }
  }, [blog]);

  function handleUpdateClick(e) {
    e.preventDefault();
    setUpdateButtonIsLoading(true);
    const blog = { title, body, author };
    fetch("http://192.168.1.4:8000/api/blogs/" + id, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      setTimeout(() => {
        setUpdateButtonIsLoading(false);
        navigate("/");
      }, 2000);
    });
  }

  return (
    <div className="form">
      {err && <div>{err}</div>}
      {isLoading && <div>the content is loading . . .</div>}
      {blog && (
        <div>
          <h2>Update blog</h2>
          <form onSubmit={handleUpdateClick}>
            <label>Blog title :</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
            <label>Blog body :</label>
            <textarea
              value={body}
              rows="10"
              cols="50"
              onChange={(e) => {
                setBody(e.target.value);
              }}
              required
            ></textarea>
            <label>Blog author :</label>
            <input
              type="text"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              required
            />
            {!updateButtonIsLoading && <button>Update blog</button>}
            {updateButtonIsLoading && <button disabled>Updating ...</button>}
          </form>
        </div>
      )}
    </div>
  );
};

export default Edit;
