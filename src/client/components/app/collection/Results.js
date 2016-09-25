import React, { PropTypes } from 'react';
import Pagination from './results/Pagination';
import ResultsAsJson from './results/ResultsAsJson';
import ResultsAsTable from './results/ResultsAsTable';

export default function Results({ viewMode, selectedDb, selectedCollection, results, rpp, total, currentPage, onPageLoadRequest }) {
  let resultsComponent;
  if (viewMode == 'table') {
    resultsComponent =
      <ResultsAsTable selectedDb={selectedDb} selectedCollection={selectedCollection} results={results} />;
  } else {
    resultsComponent =
      <ResultsAsJson selectedDb={selectedDb} selectedCollection={selectedCollection} results={results} />;
  }
  return (
    <section className={viewMode}>
      <Pagination total={total} currentPage={currentPage} rpp={rpp} onPageLoadRequest={onPageLoadRequest} />
      {resultsComponent}
      <Pagination total={total} currentPage={currentPage} rpp={rpp} onPageLoadRequest={onPageLoadRequest} />
    </section>
  );
}

Results.propTypes = {
  viewMode: PropTypes.string.isRequired,
  selectedDb: PropTypes.string.isRequired,
  selectedCollection: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  rpp: PropTypes.number.isRequired,
  results: PropTypes.array.isRequired,
  onPageLoadRequest: PropTypes.func.isRequired,
};
