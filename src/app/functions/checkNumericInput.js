function checkNumericInput(event, updateState) {
  const { name, value, selectionStart, selectionEnd } = event.target;
  const nonDigits = /\D+/g;

  if (!nonDigits.test(value) || value === "") {
    // Call the passed updateState function to update the state.
    // If the state is an object, the caller will pass a function that handles the object update logic.
    // For simple state variables, the caller can pass a simple setter function.
    updateState((prev) => {
      // If `prev` is not an object, this will simply return the new value.
      // If it is an object, it assumes a function is used to update a specific field within that object.
      return typeof prev === "object" && prev !== null
        ? { ...prev, [name]: value }
        : value;
    });
  } else {
    // Optionally handle reverting to old value if needed
    // This part needs you to maintain and pass the old value, which might require adjustments
    // based on how your state and components are structured.

    // Reset cursor position after React re-renders the component
    setTimeout(() => {
      event.target.setSelectionRange(selectionStart - 1, selectionEnd - 1);
    }, 0);
  }
}

export default checkNumericInput;
