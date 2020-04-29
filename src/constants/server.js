const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? ''
    : 'https://puzzle-party.herokuapp.com/'
export default PAYMENT_SERVER_URL
