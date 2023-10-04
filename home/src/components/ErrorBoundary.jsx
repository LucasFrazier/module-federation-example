import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("error :>> ", error);
    console.log("errorInfo :>> ", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center">
          <h1>Something went wrong.</h1>
          <br />
          <h2 className="text-2xl">
            (This is the Home Error Boundary component.)
          </h2>
          <br />
          <a
            href="/"
            className="bg-black hover:bg-blue-700 text-white text-sm font-bold py-3 px-14"
          >
            Back to Home
          </a>
        </div>
      );
    }

    return <React.Suspense>{this.props.children}</React.Suspense>;
  }
}
