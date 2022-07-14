import dbConnect from '../../../util/mongo'
import Product from '../../../models/Product'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    if(method === "GET") {
        try {
            const products = await Product.find()
            res.status(200).json(products)
        } catch (err) {
            res.status(500).json(err)
            console.error(product.config);
            if (err.response) {
                // The client was given an error response (5xx, 4xx)
                console.error(err.response);
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else if (err.request) {
                console.error(err.request.data);
                console.error(err.request);
                console.error(err.request.message);
                // The client never received a response, and the request was never left
            } else {
                // Anything else
            }   
        }

    }
    if(method === "POST") {
        try {
            const product = await Product.create(req.body)
            res.status(201).json(product)
        } catch (err) {
            res.status(500).json(err)
            console.error(err);
        }
    }
}