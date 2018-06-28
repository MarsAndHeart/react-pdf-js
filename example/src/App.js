import React, { Component } from 'react';
import Pdf from 'react-pdf-js';

export default class App extends Component {
  state = { page: 1, addWidth: 0 };

  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  }

  doReduce = () => {
    if (this.state.addWidth >= 200) {
      this.setState({
        addWidth: this.state.addWidth - 200,
      });
    }
  }

  doEnlarge = () => {
    console.log(this.state.addWidth);
    if (this.state.addWidth < 1000) {
      this.setState({
        addWidth: this.state.addWidth + 200,
      });
    }
  }

  renderPagination = (page, pages) => {
    let previousButton = (
      <li className="previous">
        <button onClick={this.handlePrevious} className="btn btn-link">
          Previous
        </button>
      </li>
    );
    if (page === 1) {
      previousButton = (
        <li className="previous disabled">
          <button className="btn btn-link">
            Previous
          </button>
        </li>
      );
    }
    let nextButton = (
      <li className="next">
        <button onClick={this.handleNext} className="btn btn-link">
          Next
        </button>
      </li>
    );
    if (page === pages) {
      nextButton = (
        <li className="next disabled">
          <button className="btn btn-link">
            Next
          </button>
        </li>
      );
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  }

  render() {
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    return (
      <div>
        <Pdf canvscaleasWidth={375 + this.state.addWidth} file="test.pdf" onDocumentComplete={this.onDocumentComplete} page={this.state.page} />
        {pagination}
        <div>
          <button onClick={this.doReduce}>-</button>
          <button onClick={this.doEnlarge}>+</button>
        </div>
      </div>
    );
  }
}
