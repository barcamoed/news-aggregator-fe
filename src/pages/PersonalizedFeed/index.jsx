import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography } from '@mui/material';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import Preferences from '../../components/Preferences/Preferences';
import {API_KEYS} from '../../constants/constants'


const fetchArticlesFromSource = async (source, preferences) => {
  let url;
  const { preferredCategories, preferredAuthors } = preferences;
  const categoryQuery = preferredCategories.length ? `&categories=${preferredCategories.join(',')}` : '';
  const authorQuery = preferredAuthors.length ? `&authors=${preferredAuthors.join(',')}` : '';

  switch (source) {
    case 'nytimes':
      url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${categoryQuery}&fq=source:("The New York Times")&api-key=${API_KEYS.nytimes}`;
      break;
    case 'guardian':
      url = `https://content.guardianapis.com/search?q=${categoryQuery}${authorQuery}&api-key=${API_KEYS.guardian}`;
      break;
    case 'verge':
      url = `https://newsapi.org/v2/everything?q=${categoryQuery}&sources=the-verge&apiKey=${API_KEYS.verge}`;
      break;
    default:
      return [];
  }

  const response = await axios.get(url);
  switch (source) {
    case 'nytimes':
      return response.data.response.docs.map((doc) => ({
        title: doc.headline.main,
        description: doc.abstract,
        source: 'New York Times',
        publishedAt: doc.pub_date,
        url: doc.web_url,
      }));
    case 'guardian':
      return response.data.response.results.map((result) => ({
        title: result.webTitle,
        description: result.webTitle,
        source: 'The Guardian',
        publishedAt: result.webPublicationDate,
        url: result.webUrl,
      }));
    case 'verge':
      return response.data.articles.map((article) => ({
        title: article.title,
        description: article.description,
        source: 'The Verge',
        publishedAt: article.publishedAt,
        url: article.url,
      }));
    default:
      return [];
  }
};

const PersonalizedNewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [preferences, setPreferences] = useState({
    preferredSources: ['nytimes', 'guardian', 'verge'],
    preferredCategories: [],
    preferredAuthors: [],
  });

  const fetchArticles = async () => {
    const sources = preferences.preferredSources;
    const articlesFromSources = await Promise.all(
      sources.map((source) => fetchArticlesFromSource(source, preferences))
    );
    setArticles(articlesFromSources.flat());
  };

  const savePreferences = () => {
    fetchArticles();
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Preferences
      </Typography>
      <Preferences preferences={preferences} setPreferences={setPreferences} savePreferences={savePreferences} />
      <Typography variant="h4" gutterBottom>
        Personalized News Feed
      </Typography>
      <Grid container spacing={3}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PersonalizedNewsFeed;
