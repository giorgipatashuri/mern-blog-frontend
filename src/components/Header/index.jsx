import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux';
import { logout, SelectIsAuth } from '../../redux/slices/auth';
export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(SelectIsAuth);

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
  };

  return (
    <div className={styles.root}>
      <Container maxWidth='lg'>
        <div className={styles.inner}>
          <Link className={styles.logo} to='/'>
            <div>Giorgi Blog</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to='/add-post'>
                  <Button variant='contained'>Write a post</Button>
                </Link>
                <Button onClick={onClickLogout} variant='contained' color='error'>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to='/login'>
                  <Button variant='outlined'>Log in</Button>
                </Link>
                <Link to='/register'>
                  <Button variant='contained'>Create account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
