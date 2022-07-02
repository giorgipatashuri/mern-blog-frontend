import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';
import axios from '../axios';

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    axios.get(`posts/${params.id}`).then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={{
          avatarUrl: data.user.imageURL,
          fullName: data.user.fullName,
        }}
        createdAt={data.user.createdAt}
        commentsCount={3}
        tags={data.tags}
        isFullPost>
        <p>{data.text}</p>
      </Post>
    </>
  );
};
