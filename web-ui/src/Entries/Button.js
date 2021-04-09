// ###########################
// IGNORE THIS FILE FOR NOW
// ###########################

import React, { Component } from "react";

class Demo2 extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  formSubmit(event) {
    event.preventDefault();
    console.log(this.state.selectedOption)
  }

  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <h4>Were you drug tested for your co-op?</h4>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="true"
              checked={this.state.selectedOption === "true"}
              onChange={this.onValueChange}
            />
            Yes
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="false"
              checked={this.state.selectedOption === "false"}
              onChange={this.onValueChange}
            />
            No
          </label>
        </div>
        <div>
          Selected option is : {this.state.selectedOption}
        </div>
        <button className="btn btn-default" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default Demo2;