import dbConnect from '../../../util/mongo'
import Product from '../../../models/Product'

export default async function handler(req, res) {
    const { method, query:{id} } = req

    dbConnect()

    if(method === "GET") {
        try {
            const product = await Product.findById(id)
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json(err)
            console.error(err);
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
    if(method === "DELETE") {
        try {
            await Product.findByIdAndDelete(id)
            res.status(201).json("The product has been deleted!")
        } catch (err) {
            res.status(500).json(err)
            console.error(err);
        }
    }
}