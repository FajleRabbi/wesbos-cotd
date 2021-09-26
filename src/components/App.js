import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  static propTypes = {
    match: PropTypes.object,
  };
  state = {
    fishes: {},
    order: {},
  };
  // life cycle method
  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }
  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  addFish = (fish) => {
    // take the older data of the state
    const fishes = { ...this.state.fishes };
    // include the new value into the state
    fishes[`fish${Date.now()}`] = fish;
    // update the state with setState API
    this.setState({ fishes });
  };
  updateFish = (key, updatedFish) => {
    // take a copy of the current state of fishes
    const fishes = { ...this.state.fishes };
    // update the fishes object with the new updated fish
    fishes[key] = updatedFish;
    //update the state by the new object
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    // take a copy of the current state
    const fishes = { ...this.state.fishes };
    // update state by removed fishes object
    fishes[key] = null;
    // update the state with setState
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    // take a clone of the order state
    const order = { ...this.state.order };
    // add fish to order or update the fish by 1
    order[key] = order[key] + 1 || 1;
    // update order state
    this.setState({ order });
  };
  removeFromOrder = (key) => {
    // take a copy of the order state
    const order = { ...this.state.order };
    // remove the item from the order
    delete order[key];
    // update the order state with new order object
    this.setState({ order });
  };

  render() {
    const fishObjKeys = Object.keys(this.state.fishes);
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood market" />
          <ul className="list-of-fishes">
            {fishObjKeys.map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          order={this.state.order}
          fishes={this.state.fishes}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
