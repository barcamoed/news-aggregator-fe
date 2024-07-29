import axios from 'axios';

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;
const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;

const fetchFromNYTAPI = async (query) => {
  const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${NYT_API_KEY}`);
  return transformArticles(response.data.response.docs, 'nyt');
};

const fetchFromGuardianAPI = async (query) => {
  const response = await axios.get(`https://content.guardianapis.com/search?q=${query}&api-key=${GUARDIAN_API_KEY}`);
  return transformArticles(response.data.response.results, 'guardian');
};

const fetchFromNewsAPI = async (query) => {
  const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`);
  return transformArticles(response.data.articles, 'theverge'); // assuming you treat this as theverge source
};

const fetchNewsApiSources = async () => {
  const response = await axios.get(`https://newsapi.org/v2/top-headlines/sources?apiKey=${NEWS_API_KEY}`);
  return response.sources;
};


export { fetchFromNYTAPI, fetchFromGuardianAPI, fetchFromNewsAPI, fetchNewsApiSources };



const transformNYTArticle = (article) => ({
    title: article.headline.main,
    description: article.abstract || article.snippet || article.lead_paragraph,
    url: article.web_url,
    source: article.source,
    publishedAt: article.pub_date,
  });
  
  const transformGuardianArticle = (article) => ({
    title: article.webTitle,
    description: article.fields?.trailText || '',
    url: article.webUrl,
    source: "The Guardian",
    publishedAt: article.webPublicationDate,
  });
  
  const transformTheVergeArticle = (article) => ({
    title: article.title,
    description: article.description || article.content,
    url: article.url,
    source: article.source.name,
    publishedAt: article.publishedAt,
  });
  
  const transformArticles = (articles, source) => {
    if (source === 'nyt') {
      return articles.map(transformNYTArticle);
    } else if (source === 'guardian') {
      return articles.map(transformGuardianArticle);
    } else if (source === 'theverge') {
      return articles.map(transformTheVergeArticle);
    } else {
      return articles;
    }
  };
  
  export { transformArticles };
  