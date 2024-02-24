import React from "react";
import commentsAxios from "../axios/comments";
import postsAxios from "../axios/posts";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const isLogin = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [posts, setPosts] = React.useState([]);
  const [comments, setComments] = React.useState([]);

  const handleGetPostButtonClick = async () => {
    try {
      const { data } = await postsAxios.get();
      setPosts(data);
      setComments([]);
    } catch (error) {
      console.log(error);
      alert("포스팅 가져오는 도중 에러가 발생했습니다.");
    }
  };

  const handleGetCommentsButtonClick = async () => {
    try {
      if (isLogin) {
        const { data } = await commentsAxios.get();
        setPosts([]);
        setComments(data);
      } else {
        alert("로그인이 필요합니다.");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("코멘트 가져오는 도중 에러가 발생했습니다.");
    }
  };

  return (
    <div>
      <h1>Test Page</h1>
      <p>api 테스트를 진행합니다.</p>
      <button onClick={handleGetPostButtonClick}>
        posts가져오기 테스트(로그인필요없음)
      </button>
      <button onClick={handleGetCommentsButtonClick}>
        comments가져오기 테스트(로그인필요)
      </button>

      {posts?.map((post) => (
        <div key={post.id}>
          <p>
            {post.id} : {post.title}
          </p>
        </div>
      ))}

      {comments?.map((comment) => (
        <div key={comment.id}>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default TestPage;
