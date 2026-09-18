import Cart from "../models/cart.model.js";
import Product from "../models/products.model.js";
import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { shippingAddress, paymentMethod } = req.body;
    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.satus(404).json({
        success: false,
        message: "cart not found",
      });
    }

    if (cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "cart is empty",
      });
    }

    if (!["COD", "ONLINE"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    if (
      !shippingAddress ||
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.addressLine ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "Complete shipping address is required",
      });
    }

    let orderItems = [];
    let totalAmount = 0;

    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (item.quantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `${product.name} does not have enough stock`,
        });
      }

      const subTotal = product.price * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
        subTotal,
      });
      totalAmount += subTotal;
    }

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    cart.items = [];
    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
    
  } catch (error) {
    console.error("Create Order Error ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating order",
    });
  }
};
