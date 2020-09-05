import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toDisplayName } from '../../utils';

import './ticker.css';

class Ticker extends Component {
  render() {
    const {
      symbol,
      low,
      high,
      dailyChange,
      dailyChangePerc,
      isPriceDown,
      volume,
      lastPrice,
    } = this.props;
    return (
      <div className="Ticker">
        <table>
          <tbody>
            <tr>
              <td rowSpan="3">
                <span className="Ticker-logo"></span>
              </td>
              <td>
                <h5><span>{symbol}</span></h5>
              </td>
              <td>
                <h5><span>{lastPrice}</span></h5>
              </td>
            </tr>
            <tr className='Ticker-row'>
              <td>
                <span>VOL </span>
                <span>{volume}</span>
                <span> USD</span>
              </td>
              <td>
                <span className={isPriceDown ? 'redText' : 'greenText'}>{dailyChange}</span>
                <span className={isPriceDown ? 'redText' : 'greenText'}> ({dailyChangePerc})</span>
              </td>
            </tr>
            <tr className='Ticker-row'>
              <td>
                <span>LOW </span>
                <span>{low}</span>
              </td>
              <td>
                <span>HIGH </span>
                <span>{high}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    symbol,
    low,
    high,
    dailyChange,
    dailyChangePerc,
    volume,
    lastPrice,
  } = state.ticker;

  return {
    symbol: toDisplayName(symbol),
    low: Number(low).toFixed(1),
    high: Number(high).toFixed(1),
    dailyChange: Math.abs(dailyChange).toFixed(2),
    dailyChangePerc: `${Math.abs(dailyChangePerc * 100).toFixed(2)}%`,
    isPriceDown: dailyChangePerc < 0,
    volume: Number(volume * lastPrice).toFixed(0),
    lastPrice: Number(lastPrice).toFixed(1),
  }
}

export default connect(mapStateToProps)(Ticker);
