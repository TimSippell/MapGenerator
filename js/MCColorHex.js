function MCColor(num) {
  if (num <= 0.4 * size) {
    return new THREE.Color(0x007996);
  } else if (num <= 0.5 * size) {
    return new THREE.Color(0x00C2F4);
  } else if (num <= 0.6 * size) {
    return new THREE.Color(0xE0E4B5);
  } else if (num <= 0.8 * size) {
    return new THREE.Color(0x668D3C);
  } else if (num <= 0.9 * size) {
    return new THREE.Color(0x867851);
  } else if (num > 0.9 * size) {
    return new THREE.Color(0xFFFFFF);
  }
};
