import React, { Component } from 'react';
import { connect } from 'react-redux';
import Websocket from 'react-websocket';

import Ticker from './components/ticker';
import OrderBook from './components/orderBook';
import Trades from './components/trades';
import { onTickerData, onBookData, onTradesData } from './actions';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.refWebSocket = React.createRef();
    this.channels = [];
  }

  subscribeChannel = (channel) => {
    const ws = this.refWebSocket.current.state.ws;
    ws.send(
      JSON.stringify({
        event: 'subscribe',
        channel,
        symbol: 'tBTCUSD',
        // frequency: 'F1',
      })
    );
  };

  handleMessage = (msg) => {
    const message = JSON.parse(msg);
    if (Array.isArray(message)) {
      const chanId = message[0];
      const channel = this.channels[chanId];
      if (channel === 'ticker') {
        const data = message[1];
        if (Array.isArray(data)) {
          this.props.dispatch(onTickerData(data));
        }
      } else if (channel === 'book') {
        const data = message[1];
        if (Array.isArray(data)) {
          this.props.dispatch(onBookData(data));
        }
      } else if (channel === 'trades') {
        console.log(message);
        const data =
          message[1] === 'te' || message[1] === 'tu'
            ? [message[2]]
            : message[1];
        if (Array.isArray(data) && message[1] !== 'tu') {
          this.props.dispatch(onTradesData(data));
        }
      }
    } else {
      const { event, channel, chanId } = message;
      if (event === 'subscribed') {
        this.channels[chanId] = channel;
      }
    }
  };

  handleOpen = () => {
    console.log('connected:)');
    this.subscribeChannel('ticker');
    this.subscribeChannel('book');
    this.subscribeChannel('trades');
  };

  handleClose = () => {
    console.log('disconnected:(');
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Websocket
            url="wss://api.bitfinex.com/ws/2"
            onMessage={this.handleMessage}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            reconnect={true}
            debug={true}
            ref={this.refWebSocket}
          />
          <Ticker />
          <div className="App-container">
            <OrderBook />
            <Trades />
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {};

export default connect(mapStateToProps)(App);
