const generateRandomNumber = (min, max, decimals = 0) => {
  if (min < 0 || max < 0) {
    return 'Значения не могут быть меньше 0';
  }

  if (max < min) {
    const change = max;
    max = min;
    min = change;
  }
  return (Math.random() * (max - min) + min).toFixed(decimals);
};

generateRandomNumber(1, 1, 7);
