// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const data = [
    {
        "name": "Fries",
        "price": 2.00
    },
    {
        "name": "Chips",
        "price": 1.00
    },
    {
        "name": "Cookie",
        "price": 1.00
    },
    {
        "name": "Side Salad",
        "price": 2.50
    },
    {
        "name": "Soup",
        "price": 3.00
    }
]

export default function handler(req, res) {
    res.status(200).json(data)
}