import React, { useState, useEffect } from 'react';

import axios from 'axios';

const GitHubIssues = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repositories/1296269/issues?page=${currentPage}&per_page=5`);
        setIssues(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIssues();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>Page number {currentPage}</h1>
      <button onClick={handlePreviousPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
      <ol>
        {issues.map((issue) => (
          <li key={issue.id}>{issue.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default GitHubIssues;