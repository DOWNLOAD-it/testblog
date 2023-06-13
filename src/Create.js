import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleAddBlog(e) {
    e.preventDefault();
    setIsLoading(true);
    const blog = { title, body, author };
    fetch("http://192.168.1.4:8000/api/blogs/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 2000);
    });
  }

  return (
    <div className="form">
      <h2>Add a new blog</h2>
      <form onSubmit={handleAddBlog}>
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
        {!isLoading && <button>Add blog</button>}
        {isLoading && <button disabled>Adding blog</button>}
      </form>
    </div>
  );
};

export default Create;
