function getPercentage(fraction, total) {
  return `${((fraction / total) * 100).toFixed(2)}%`;
}

module.exports = getPercentage;
