import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import styles from './Pagination.css';

const countOut = 2;
const countIn = 2;

export class Pagination extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    rpp: PropTypes.number.isRequired,
    onPageLoadRequest: PropTypes.func.isRequired,
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  onPageClick = (pageNum) => (e) => {
    e.preventDefault();
    this.props.onPageLoadRequest(pageNum);
  };

  render() {
    const { total, rpp, currentPage } = this.props;

    if (!total) {
      return false;
    }
    const totalPages = Math.ceil(total / rpp);
    // Beginning group of pages: n1...n2
    const n1 = 1;
    const n2 = Math.min(countOut, totalPages - 1);

    // Ending group of pages: n7...n8
    const n7 = Math.max(2, totalPages - countOut + 1);
    const n8 = totalPages;

    // Middle group of pages: n4...n5
    const n4 = Math.max(n2 + 1, currentPage + 1 - countIn);
    const n5 = Math.min(n7 - 1, currentPage + 1 + countIn);
    const useMiddle = (n5 >= n4);

    // Point n3 between n2 and n4
    const n3 = parseInt((n2 + n4) / 2, 10);
    const useN3 = (useMiddle && ((n4 - n2) > 1));

    // Point n6 between n5 and n7
    const n6 = parseInt((n5 + n7) / 2, 10);
    const useN6 = (useMiddle && ((n7 - n5) > 1));
    const links = [];

    if (currentPage == 0) {
      links.push(<span key="prev" className={styles.previous}>&lt;</span>);
    } else {
      links.push(
        <a href="" key="prev" className={styles.previous} onClick={this.onPageClick(currentPage - 1)}>&lt;</a>);
    }

    // Generate links data in accordance with calculated numbers
    for (let i = n1; i <= n2; i++) {
      if (currentPage === i - 1) {
        links.push(<span key={`pag_${i}`}>{i}</span>);
      } else {
        links.push(<a href="" key={`pag_${i}`} onClick={this.onPageClick(i - 1)}>{i}</a>);
      }
    }
    if (useN3) {
      links.push(<span key={`pag_${n3}`}>...</span>);
    }
    for (let i = n4; i <= n5; i++) {
      if (currentPage === i - 1) {
        links.push(<span key={`pag_${i}`}>{i}</span>);
      } else {
        links.push(<a href="" key={`pag_${i}`} onClick={this.onPageClick(i - 1)}>{i}</a>);
      }
    }
    if (useN6) {
      links.push(<span key={`pag_${n6}`}>...</span>);
    }
    for (let i = n7; i <= n8; i++) {
      if (currentPage === i - 1) {
        links.push(<span key={`pag_${i}`}>{i}</span>);
      } else {
        links.push(<a href="" key={`pag_${i}`} onClick={this.onPageClick(i - 1)}>{i}</a>);
      }
    }

    if (currentPage == totalPages - 1) {
      links.push(<span key="next">&gt;</span>);
    } else {
      links.push(
        <a href="" key="next" className={styles.next} onClick={this.onPageClick(currentPage + 1)}>&gt;</a>);
    }

    return (
      <div className={styles.pagination}>
        {links}
      </div>
    );
  }
}

export default Pagination;
