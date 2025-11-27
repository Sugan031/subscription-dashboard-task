/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Delete existing entries
  await knex('plans').del();

  // Insert plans
  await knex('plans').insert([
    {
      name: 'Basic',
      price: 9.99,
      duration: 30,
      features: JSON.stringify([
        'Access to basic features',
        'Email support',
        '5 GB storage',
        'Single user account'
      ])
    },
    {
      name: 'Pro',
      price: 29.99,
      duration: 30,
      features: JSON.stringify([
        'All Basic features',
        'Priority email support',
        '50 GB storage',
        'Up to 5 user accounts',
        'Advanced analytics',
        'Custom branding'
      ])
    },
    {
      name: 'Enterprise',
      price: 99.99,
      duration: 30,
      features: JSON.stringify([
        'All Pro features',
        '24/7 phone support',
        'Unlimited storage',
        'Unlimited user accounts',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee'
      ])
    }
  ]);
};
