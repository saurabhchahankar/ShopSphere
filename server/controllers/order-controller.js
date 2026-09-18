import Cart from "../models/cart.model.js";
import Product from "../models/products.model.js";
import Order from "../models/order.model.js";
import mongoose from "mongoose";

export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const userId = req.user.userId;
    const { shippingAddress, paymentMethod } = req.body;
    const cart = await Cart.findOne({
      user: userId,
    });

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

    let createdOrder;

    await session.withTransaction(async () => {
      const cart = await Cart.findOne({
        user: userId,
      }).session(session);

      if (!cart) {
        const error = new Error("Cart not found");
        error.statusCode = 404;
        throw error;
      }

      if (cart.items.length === 0) {
        const error = new Error("Cart is empty");
        error.statusCode = 400;
        throw error;
      }

      const orderItems = [];
      let totalAmount = 0;

      for (const item of cart.items) {
        const product = await Product.findById(item.product).session(session);

        if (!product) {
          const error = new Error("Product not found");
          error.statusCode = 404;
          throw error;
        }

        const updatedProduct = await Product.findOneAndUpdate(
          {
            _id: product._id,
            stock: { $gte: item.quantity },
          },
          {
            $inc: {
              stock: -item.quantity,
            },
          },
          {
            returnDocument: "after",
            session,
          },
        );

        if (!updatedProduct) {
          const error = new Error(`${product.name} does not have enough stock`);
          error.statusCode = 400;
          throw error;
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

      const orders = await Order.create(
        [
          {
            user: userId,
            items: orderItems,
            totalAmount,
            shippingAddress,
            paymentMethod,
          },
        ],
        { session },
      );

      createdOrder = orders[0];

      cart.items = [];

      await cart.save({ session });
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: createdOrder,
    });
  } catch (error) {
    console.error("Create Order Error ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating order",
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.find({
      user: userId,
    })
      .populate("items.product", "name image")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get my Order Error: ", error);
    return res.status(500).json({
      success: false,
      message: "some thing went wrong while getting Orders",
    });
  }
};

export const getSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.userId;
    
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message:'Order Id is required'
      })
    };

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    };

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
    }).populate("items.product", "name image");

    if (!order) {
      return res.status(404).json({
        success: false,
        message:"Order is not Found"
      })
    };

     return res.status(200).json({
      success: true,
      order,
    });
    
  } catch (error) {
    console.error("Get Single Order Error: ", error)
   return res.status(500).json({
      success: false,
      message:"some thing went wrong while getting single order"
    })
  }
}

