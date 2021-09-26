import React, { Component } from "react";
import PropTypes from "prop-types";

class AddFishForm extends Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  static propTypes = {
    addFish: PropTypes.func,
  };

  createFish = (event) => {
    // stop the form from submitting
    event.preventDefault();
    // get all the fish form data and
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value) || 0,
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    };
    // pass the data to the main state at App.js
    this.props.addFish(fish);
  };
  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input type="text" name="name" placeholder="name" ref={this.nameRef} />
        <input
          type="text"
          name="price"
          placeholder="price"
          ref={this.priceRef}
        />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" placeholder="desc" ref={this.descRef}></textarea>
        <input
          type="text"
          name="image"
          placeholder="image"
          ref={this.imageRef}
        />
        <button>+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
