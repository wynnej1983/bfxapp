import React, { Component } from 'react';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';
import './orderBook.css';

class OrderBook extends Component {
  render() {
    const { bids, asks } = this.props;

    return (
      <div className="OrderBook">
        <div className="OrderBook-header">
          <span className="header">ORDER BOOK </span>BTC/USD
        </div>
        <div className="OrderBook-container">
          <div className="bidsGrid">
            <Griddle data={bids} />
          </div>
          <div className="asksGrid">
            <Griddle data={asks} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ orderBook }) => {
  return {
    bids: orderBook.bids,
    asks: orderBook.asks,
  };
};

export default connect(mapStateToProps)(OrderBook);
