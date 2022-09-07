const data = [
    {
        "name": "Poutine on the Ritz Burger",
        "caption": "Comes with Poutine Fries",
        "price": 9
    },
    {
        "name": "She's super Leek Burger",
        "caption": "Comes with braised leeks",
        "price": 7
    },
    {
        "name": "Fuh-gouda-bout-it Burger",
        "caption": "comes with I'm-wok'n-here fries (gouda and wok fried potatoes)",
        "price": 7
    },
    {
        "name": "The Final Kraut Down Burger",
        "caption": "Comes with sauerkraut",
        "price": 6
    },
    {
        "name": "Shake Your Honeymaker Burger",
        "caption": "Comes with Honey Mustard",
        "price": 6
    }
];

export default function handler(req, res) {

    res.status(200).json(data);
};



