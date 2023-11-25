const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
// const phonePattern = /^[(]\d{3}[)]\s\d{3}[-]\d{4}$/;
const phonePattern = /^\+\d{12}$/;

module.exports = { emailPattern, phonePattern };
