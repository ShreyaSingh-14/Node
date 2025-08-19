const buyService = require('../service/buyService');
const buyProduct=async(req,res)=>
{
    try {
        const productId=req.params.id;
        const userId=req.params.userId;

        if(!productId || !userId) {
            return res.status(400).json({message: 'Product ID and User ID are required'});
        }

        await buyService(productId, userId);

        res.status(200).json({
            success: true,
            message: `product with ID ${productId} purchased by user with ID ${userId}`
        })
    } catch (error) {
        console.error('Error in buyProduct controller:', error);
        requestAnimationFrame.status(500).json({
            success: false,
            message: 'Failed to purchase product',
            error: error.message
        });
    }
}