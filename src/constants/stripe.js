const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_live_MY_PUBLISHABLE_KEY'
    : 'pk_test_1sycucQETJ4F56X6ipqKRHJh00d68vN98Y'
export default STRIPE_PUBLISHABLE
