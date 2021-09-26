import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func,
  };
  renderOrder = (key) => {
    // get the fish object from the order key
    const fish = this.props.fishes[key];
    // get count of the order from the order object by the key
    const count = this.props.order[key];
    // check is the fish and fish status available or not
    const isAvailable = fish && fish.status === "available";
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 },
    };
    // Make sure the fish is loaded before we continue!
    if (!fish) {
      return null;
    }
    // return the output
    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry '{fish ? fish.name : "fish"}' is not available
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}{" "}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
          <span className="price">{formatPrice(fish.price)}</span>
        </li>
      </CSSTransition>
    );
  };
  render() {
    // get order keys from the order object
    const orderIds = Object.keys(this.props.order);
    // loop (reduce) over the order keys to get total order price
    const total = orderIds.reduce((prevTotal, key) => {
      // get the fish object from the order key
      const fish = this.props.fishes[key];
      // get count of the order from the order object by the key
      const count = this.props.order[key];
      // check is the fish and fish status available or not
      const isAvailable = fish && fish.status === "available";
      // calculate the fish price by the total order
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          <strong>Total: {formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
