import dbConnect from '../../../util/mongo'
import Order from '../../../models/Order'

const handler = async (req, res) => {
    const { method, query:{id} } = req;

    await dbConnect()

    if ( method ==="GET"){
        try {
            const order = await Order.findById(id)
            res.status(200).json(order)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    if ( method ==="PUT"){
        try {
            const updated = await Order.findByIdAndUpdate(id, req.body, {new: true} )
            console.log(updated);
            res.status(201).json(updated)
        } catch (err) {
            console.log(err);
        }
    }
    if ( method ==="DELETE"){
        try {
            await Order.findByIdAndDelete(id)
            res.status(200).json("Order")
        } catch (err) {
            console.log(err);
        }
    }
}

export default handler;