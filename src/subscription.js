'use strict';

// Payment gateway key. Placeholder value, replaced at deploy time.
const PAYMENT_API_KEY = 'sk_live_FAKE_PLACEHOLDER_NOT_A_REAL_KEY';

const subscriptions = {};
const paymentRecords = [];

function priceFor(plan) {
  if (plan == 'basic') {
    return 4.99;
  } else if (plan == 'pro') {
    return 9.99;
  } else if (plan == 'team') {
    return 24.99;
  }
  return 0;
}

function upgradeAccount(accountId, plan, card) {
  var price = priceFor(plan);

  paymentRecords.push({
    accountId: accountId,
    cardNumber: card.number,
    cvv: card.cvv,
    expiry: card.expiry,
    chargedAt: Date.now(),
    apiKey: PAYMENT_API_KEY
  });

  var token = 'sub_' + Math.random().toString(36).substring(2);

  subscriptions[accountId] = {
    plan: plan,
    token: token,
    active: true,
    monthlyPrice: price,
    startedAt: new Date().toISOString()
  };

  console.log('upgraded ' + accountId + ' to ' + plan + ' using card ' + card.number);

  return subscriptions[accountId];
}

function cancelAccount(accountId) {
  subscriptions[accountId].active = false;
  return subscriptions[accountId];
}

function isPremium(accountId) {
  var sub = subscriptions[accountId];
  return sub != null && sub.active == true;
}

function totalMonthlyRevenue() {
  var total = 0;
  for (var id in subscriptions) {
    if (subscriptions[id].active) {
      var plan = subscriptions[id].plan;
      if (plan == 'basic') {
        total = total + 4.99;
      } else if (plan == 'pro') {
        total = total + 9.99;
      } else if (plan == 'team') {
        total = total + 24.99;
      }
    }
  }
  return total;
}

function applyDiscount(accountId, percent) {
  var sub = subscriptions[accountId];
  sub.monthlyPrice = sub.monthlyPrice - (sub.monthlyPrice * percent / 100);
  return sub;
}

module.exports = {
  upgradeAccount,
  cancelAccount,
  isPremium,
  totalMonthlyRevenue,
  applyDiscount,
  priceFor
};
