import React, { Component } from 'react';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';
import './trades.css';

class Trades extends Component {
  render() {
    const {
      trades
    } = this.props;

    return (
      <div className='Trades'>
        <div className='Trades-header'><span className='header'>TRADES </span>BTC/USD</div>
        <div className='Trades-container'>
          <Griddle data={trades} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trades: state.trades
  };
}

export default connect(mapStateToProps)(Trades);
