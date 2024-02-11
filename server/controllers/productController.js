import User from '../models/User.js';

export const updateProductInfo = async (req, res) => {
    const { userId, productId } = req.params; // Use productId instead of productIndex
    const { productName, expdate, donatable } = req.body;

    try {
        // Find the user and the product by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the specific product to update
        const product = user.products.id(productId); // Mongoose's id method to find a subdocument by its _id
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update the product information
        if (productName !== undefined) product.productName = productName;
        if (expdate !== undefined) product.expdate = expdate;
        if (donatable !== undefined) product.donatable = donatable;

        // Save the user document with updated product information
        await user.save();
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { userId, productId } = req.params; // Use productId for deletion

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find and remove the product from the user's products array
        const product = user.products.id(productId); // Find the subdocument
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.remove(); // Remove the subdocument

        // Save the updated user document
        await user.save();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// Get all the products
export const getUserProducts = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).exec();

        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        // Respond with the user's products
        res.status(200).json(user.products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving user's products", error: error.message });
    }
};
