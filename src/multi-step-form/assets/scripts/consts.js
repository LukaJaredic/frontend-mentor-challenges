const priceMap = {
  plan: {
    arcade: 9,
    advanced: 12,
    pro: 15,
  },
  addOns: {
    "online-service": 1,
    "larger-storage": 2,
    "customizable-profile": 2,
  },
};

const billingTypes = [
  {
    value: "monthly",
    label: "Monthly",
  },
  {
    value: "yearly",
    label: "Yearly",
    isDefault: true,
  },
];

const plans = [
  {
    value: "arcade",
    name: "Arcade",
    monthlyPrice: priceMap.plan.arcade,
    yearlyPrice: priceMap.plan.arcade * 10,
    isDefault: true,
  },
  {
    value: "advanced",
    name: "Advanced",
    monthlyPrice: priceMap.plan.advanced,
    yearlyPrice: priceMap.plan.advanced * 10,
  },
  {
    value: "pro",
    name: "Pro",
    monthlyPrice: priceMap.plan.pro,
    yearlyPrice: priceMap.plan.pro * 10,
  },
];

const addOns = [
  {
    name: "Online service",
    description: "Access to multiplayer games",
    priceMonthly: priceMap.addOns["online-service"],
    priceYearly: priceMap.addOns["online-service"] * 10,
    value: "online-service",
  },
  {
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    priceMonthly: priceMap.addOns["larger-storage"],
    priceYearly: priceMap.addOns["larger-storage"] * 10,
    value: "larger-storage",
  },
  {
    name: "Customizable Profile",
    description: "Custom theme on your profile",
    priceMonthly: priceMap.addOns["customizable-profile"],
    priceYearly: priceMap.addOns["customizable-profile"] * 10,
    value: "customizable-profile",
  },
];

export { billingTypes, plans, addOns, priceMap };
