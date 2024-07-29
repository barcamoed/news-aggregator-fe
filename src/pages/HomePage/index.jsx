import React, { useState, useEffect } from 'react';
import { fetchFromNewsAPI, fetchFromGuardianAPI, fetchFromNYTAPI } from '../../services/requests';
import SearchBar from '../../components/SearchBar/SearchBar';
import ArticleList from '../../components/ArticleList/ArticleList';
import { CircularProgress,Box } from '@mui/material';
import Filters from '../../components/Filters/Filters';
import {API_KEYS} from '../../constants/constants'
import axios from 'axios';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInitialArticles = async () => {
    setLoading(true);
    try {
      const nytArticles = await fetchFromNYTAPI('latest');
      const guardianArticles = await fetchFromGuardianAPI('latest');
      const newsAPIArticles = await fetchFromNewsAPI('latest');
      setArticles([...nytArticles, ...guardianArticles, ...newsAPIArticles].filter((item)=>item?.title!=="[Removed]"));
    } catch (error) {
      console.error('Error fetching initial articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialArticles();
  }, []);

  const handleSearch = async (query='latest') => {

    try {
      const [newsAPI, guardianAPI, nytAPI] = await Promise.all([
        fetchFromNewsAPI(query),
        fetchFromGuardianAPI(query),
        fetchFromNYTAPI(query),
      ]);
  
      // Ensure correct data structure and handle possible undefined data
      const searchedArticles = [
        ...newsAPI,
        ...guardianAPI,
        ...nytAPI,
      ].filter((item) => item?.title !== '[Removed]');
      setArticles(searchedArticles);
    } catch (error) {
      console.error(error);
    }
  };

  const [filters, setFilters] = useState({
    source: 'all',
    category: '',
    dateFrom: '',
    dateTo: '',
  });
  
  const fetchArticlesFromSource = async (source, filters) => {
    // Example function to fetch articles from a specific source based on filters
    let url;
    switch (source) {
      case 'nytimes':
        url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${filters.category}&fq=source:("The New York Times")&begin_date=${filters.dateFrom.replaceAll(
          '-',
          ''
        )}&end_date=${filters.dateTo.replaceAll(
          '-',
          ''
        )}&api-key=${API_KEYS.nytimes}`;
        break;
      case 'guardian':
        url = `https://content.guardianapis.com/search?q=${filters.category}&from-date=${filters.dateFrom}&to-date=${filters.dateTo}&api-key=${API_KEYS.guardian}`;
        break;
      case 'verge':
        // Note: Verge API is not provided; using NewsAPI as a placeholder
        url = `https://newsapi.org/v2/everything?q=${filters.category}&from=${filters.dateFrom}&to=${filters.dateTo}&sources=the-verge&apiKey=${API_KEYS.verge}`;
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
  

  const fetchArticles = async () => {
    const sources = filters.source === 'all' ? ['nytimes', 'guardian', 'verge'] : [filters.source];
    const articlesFromSources = await Promise.all(
      sources.map((source) => fetchArticlesFromSource(source, filters))
    );
    setArticles(articlesFromSources.flat());
  };

  return (
    <div>
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      )}
      <SearchBar onSearch={handleSearch} />
      <Filters filters={filters} setFilters={setFilters} fetchArticles={fetchArticles} fetchInitialArticles={fetchInitialArticles} />
      <ArticleList articles={articles} title="Newsfeed" />
    </div>
  );
};

export default HomePage;
