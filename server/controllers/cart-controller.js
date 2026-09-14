import Cart from "../models/cart-model.js";
import Product from "../models/products.model.js";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    let cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      if (quantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} items are available in stock`,
        });
      }
      cart = new Cart({
        user: userId,
        items: [
          {
            product: productId,
            quantity: quantity,
          },
        ],
      });

      await cart.save();

      return res.status(201).json({
        success: true,
        message: "Product added to cart",
        cart,
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex !== -1) {
      const currentQuantity = cart.items[itemIndex].quantity;
      const newQuantity = currentQuantity + quantity;

      // Check final quantity against stock
      if (newQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} items are available in stock`,
        });
      }
      cart.items[itemIndex].quantity = newQuantity;
    } else {
      if (quantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} items are available in stock`,
        });
      }
      cart.items.push({
        product: productId,
        quantity: quantity,
      });
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.error("Add to Cart Error: ", error.message);
    res.status(500).json({
      success: false,
      message: "something Went wrong while add to cart",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({
      user: userId,
    }).populate("items.product");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("getCart Error: ", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong to get cart",
    });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer",
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items are available in stock`,
      });
    }

    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart quantity updated successfully",
      cart,
    });
  } catch (error) {
    console.error("updateCartQuantity Error: ", error.message);

    res.status(500).json({
      success: false,
      message: "Something Went Wrong while Updating Cart Quantity",
    });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;
   
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

     const cart = await Cart.findOne({
      user: userId,
     });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "cart Not Found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found in Cart",
      });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    return res
      .status(200)
      .json({ success: true, message: "Product removed from cart", cart });
  } catch (error) {
    console.log("Delete Cart error: ", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while cart delete",
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({
      user: userId,
    });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    cart.items = [];
    await cart.save();
    return res
      .status(200)
      .json({ success: true, message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error("clearCart Error: ", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while clearing Cart ",
    });
  }
};
