const data = [
    {
        "name": "Coffee",
        "price": 2.00
    },
    {
        "name": "Tea",
        "price": 1.50
    },
    {
        "name": "Juice",
        "price": 1.00
    },
    {
        "name": "Soft-Drink",
        "price": 2.00
    },
    {
        "name": "Beer",
        "price": 4.00
    }
];

export default function handler(req, res) {

    res.status(200).json(data);
};