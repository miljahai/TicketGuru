import { useEffect, useState } from "react";

// 
function useLocalState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    // Use the "localStorage" object to get the value associated with the specified key
    const localStorageValue = localStorage.getItem(key);

    // If a value is found, parse it from a JSON string to an object and return it as the initial value for "value"
    return localStorageValue !== null
      ? JSON.parse(localStorageValue)
      : defaultValue;
  });

  useEffect(() => {
    // Store the current value of "value" in "localStorage" as a JSON string under the specified key
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Return an array containing the current value of the state variable and a function to update it
  return [value, setValue];
}

export { useLocalState };