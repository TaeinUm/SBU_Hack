import Product from '../models/Product.js';

export const updateInfo = async (req, res) => {
    const { id } = req.params;
    const { productName, expdate, donatable } = req.body;

    // Build an update object, only including fields that were provided
    let updateFields = {
        ...(expdate && { expdate }),
        ...(donatable !== undefined && { donatable }), // Check for undefined since donatable is a Boolean
    };
    
    if (productName) {
        updateFields.productName = productName; // Only add productName if provided
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
