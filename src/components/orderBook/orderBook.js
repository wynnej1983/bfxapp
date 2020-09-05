import React, { Component } from 'react';
import { connect } from 'react-redux';
import Griddle, { RowDefinition, ColumnDefinition } from 'griddle-react';
import './orderBook.css';

class OrderBook extends Component {
  render() {
    let { bids, asks } = this.props;
    asks = asks.map((ask) => ({
      ...ask,
      amount: Math.abs(ask.amount),
      total: Math.abs(ask.total),
    }));
    const maxBidTotal = Math.max(...bids.map((bid) => bid.total));
    const maxAskTotal = Math.max(...asks.map((ask) => ask.total));
    const percent = (total, maxTotal) => (100 * total) / maxTotal;
    const bidCss = bids.map(
      (bid) => `
      .bidRow${bid.total
        .toString()
        .replace(
          '.',
          ''
        )} { background: -webkit-gradient(linear, left top, right top, color-stop(${100 -
        percent(bid.total, maxBidTotal)}%,transparent), color-stop(${100 -
        percent(bid.total, maxBidTotal)}%,rgba(40,65,54,1))); }
      `
    );
    const askCss = asks.map(
      (ask) => `
      .askRow${ask.total
        .toString()
        .replace(
          '.',
          ''
        )} { background: -webkit-gradient(linear, left top, right top, color-stop(${percent(
        ask.total,
        maxAskTotal
      )}%,rgba(67,49,54,1)), color-stop(${percent(
        ask.total,
        maxAskTotal
      )}%,transparent)); } `
    );

    return (
      <div>
        <style type="text/css">
          {bidCss} {askCss}
        </style>
        <div className="OrderBook">
          <div className="OrderBook-header">
            <span className="header">ORDER BOOK </span>BTC/USD
          </div>
          <div className="OrderBook-container">
            <div className="bidsGrid">
              <Griddle data={bids}>
                <RowDefinition
                  cssClassName={({ rowData: d }) =>
                    `bidRow${d.total.toString().replace('.', '')}`
                  }
                >
                  <ColumnDefinition id="count" />
                  <ColumnDefinition id="amount" />
                  <ColumnDefinition id="total" />
                  <ColumnDefinition id="price" />
                </RowDefinition>
              </Griddle>
            </div>
            <div className="asksGrid">
              <Griddle data={asks}>
                <RowDefinition
                  cssClassName={({ rowData: d }) =>
                    `askRow${d.total.toString().replace('.', '')}`
                  }
                >
                  <ColumnDefinition id="price" />
                  <ColumnDefinition id="total" />
                  <ColumnDefinition id="amount" />
                  <ColumnDefinition id="count" />
                </RowDefinition>
              </Griddle>
            </div>
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
