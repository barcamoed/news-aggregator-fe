import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const MAX_DESCRIPTION_LENGTH = 80;

const ArticleCard = ({ article }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const renderDescription = () => {
    if (expanded) {
      return article.description;
    } else {
      return article.description.length > MAX_DESCRIPTION_LENGTH
        ? `${article.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
        : article.description;
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        border: "1px solid #ccc",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2">
          {article.title}
        </Typography>
        <Typography color="textSecondary">{article.source}</Typography>
        <Typography variant="body2" component="p">
          {renderDescription()}
        </Typography>
      </CardContent>
      {article.description.length > MAX_DESCRIPTION_LENGTH && (
        <CardContent>
          <Button size="small" onClick={handleExpandClick}>
            {expanded ? "Show less" : "Show more"}
          </Button>
        </CardContent>
      )}
      <CardContent>
        <Typography color="textSecondary">
          {new Date(article.publishedAt).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
