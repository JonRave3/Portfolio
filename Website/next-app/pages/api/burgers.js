// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const data = [
  {
    "name": "Regular",
    "price": 5.00,
    "caption": null
  },
  {
    "name": "Cheese",
    "price": "Add .50",
    "caption": null
  }
];

export default function handler(req, res) {

  res.status(200).json(data);
};