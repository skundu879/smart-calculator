export const isEmpty = (value) => {
  // Check if value is null or undefined
  if (value === null || value === undefined) {
    return true;
  }

  // Check if value is an array and has a length of 0
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  // Check if value is an object with no own properties
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }

  return false;
};
