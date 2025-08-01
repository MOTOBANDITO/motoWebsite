import { useEffect } from "react";

// This custom hook takes a CSS class name as an argument.
const useBodyClass = (className) => {
  useEffect(() => {
    // When the component that uses this hook mounts (appears on screen),
    // it adds the class to the <body> tag.
    document.body.classList.add(className);

    // When the component unmounts (disappears), this cleanup function runs.
    // It removes the class from the <body> tag.
    return () => {
      document.body.classList.remove(className);
    };
  }, [className]); // The effect re-runs if the className ever changes.
};

export default useBodyClass;
