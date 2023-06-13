import Blog from "./Blog";
import useFetch from "./useFetch";

const Home = () => {
  const {
    data: blogs,
    err,
    isLoading,
  } = useFetch("http://192.168.1.4:8000/api/blogs");

  return (
    <div className="home">
      {err && <div>{err}</div>}
      {isLoading && <div>the content is loading . . .</div>}
      {blogs && <Blog blogs={blogs} title={"All Blogs!"} />}
    </div>
  );
};

export default Home;
