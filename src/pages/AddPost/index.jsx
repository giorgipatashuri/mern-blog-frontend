import React, { useRef, useState, useMemo, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { SelectIsAuth } from '../../redux/slices/auth';
import axios from '../../axios';
export const AddPost = () => {
  const isAuth = useSelector(SelectIsAuth);
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const useFileRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const addTags = (event) => {
    if (event.key === 'Enter') {
      setTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('./upload', formData);
      setImageUrl(data.url);
    } catch (error) {}
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };
  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        text,
        title,
        tags,
        imageUrl,
      };
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);
      console.log(data);
      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Enter text...',
      status: false,
    }),
    [],
  );
  useEffect(() => {
    if (id) {
      axios.get(`posts/${id}`).then(({ data }) => {
        setTitle(data.title);
        setImageUrl(data.imageUrl);
        setText(data.text);
        setTags(data.tags);
      });
    }
  }, []);
  if (!isAuth) {
    return <Navigate to='/' />;
  }
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => useFileRef.current.click()} variant='outlined' size='large'>
        Upload photo
      </Button>
      <input ref={useFileRef} type='file' onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant='contained' color='error' onClick={onClickRemoveImage}>
          Delete
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt='Uploaded' />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant='standard'
        placeholder='Title'
        fullWidth
      />
      <ul className={styles.taggs}>
        {tags.map((name) => (
          <li key={name}>#{name}</li>
        ))}
      </ul>
      <input
        type='text'
        onKeyPress={addTags}
        className={styles.tagsAddInput}
        placeholder={'tags'}
      />

      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size='large' variant='contained'>
          {isEditing ? 'Save' : 'Post'}
        </Button>
        <Link to='/'>
          <Button size='large'>Cancel</Button>
        </Link>
      </div>
    </Paper>
  );
};
