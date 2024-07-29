import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ArticleCard from '../ArticleCard/ArticleCard';
import { Link,useLocation } from 'react-router-dom';

const ArticleList = ({articles,title}) => {
  const location = useLocation()
  return (
    <Container>
      <Grid container mb={1.5} sx={{border:'1px solid gray', borderRadius:'4px'}} display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
        <Typography variant="h5" >{title}</Typography>
        {!location?.pathname?.includes('/my-newsfeed') && <Typography  variant='h6'><Link to={'/my-newsfeed'}>Go to my preferences</Link></Typography>}
      </Grid>
      <Grid container spacing={3}>
        {articles.map((article, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ArticleList;
