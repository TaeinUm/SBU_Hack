import User from '../models/User.js';

export const updateProductInfo = async (req, res) => {
    const { userId, productIndex } = req.params; // Assuming you pass the userId and the index of the product in the URL
    const { productName, expdate, donatable } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the product information in the user's products array
        if (productName !== undefined) user.products[productIndex].productName = productName;
        if (expdate !== undefined) user.products[productIndex].expdate = expdate;
        if (donatable !== undefined) user.products[productIndex].donatable = donatable;

        // Save the user document with updated product information
        const updatedUser = await user.save();
        res.status(200).json(updatedUser.products[productIndex]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { userId, productIndex } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the product exists
        if (productIndex >= user.products.length || productIndex < 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Remove the product from the user's products array
        user.products.splice(productIndex, 1);

        // Save the updated user document
        await user.save();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};
