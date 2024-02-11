import User from "../models/User.js";

export const updateProductInfo = async (req, res) => {
  const { userId } = req.params;
  const productsUpdates = req.body; // This should be an array of product updates

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Iterate over each product update request
      productsUpdates.forEach(update => {
          // Assuming each update object contains an identifier `_id` to find the product
          const product = user.products.id(update._id);
          if (product) {
              // Apply the updates to the product
              Object.entries(update).forEach(([key, value]) => {
                  if (key === "expdate" && value) {
                      // Convert expdate from string to Date type
                      product[key] = new Date(value);
                  } else if (key !== "_id") { // Avoid attempting to update the _id field
                      product[key] = value;
                  }
              });
          }
      });

      await user.save();
      res.status(200).json({ message: "Products updated successfully" });
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
      return res.status(404).json({ message: "User not found" });
    }

    // Find and remove the product from the user's products array
    const product = user.products.id(productId); // Find the subdocument
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.remove(); // Remove the subdocument

    // Save the updated user document
    await user.save();
    res.status(200).json({ message: "Product deleted successfully" });
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
    res.status(500).json({
      message: "Error retrieving user's products",
      error: error.message,
    });
  }
};
