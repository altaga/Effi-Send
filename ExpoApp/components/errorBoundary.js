import React, { Component } from "react";
import { Text } from "react-native";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render any custom fallback UI
      return <Text>Something went wrong.</Text>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
