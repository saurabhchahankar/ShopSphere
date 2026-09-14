import mongoose from "mongoose";
import Product from "../models/products.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, image } =
      req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      brand,
      stock,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating product",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort, page, limit } =
      req.query;
    let filter = {};
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }
    let sortOptions = {};

    if (sort === "price_asc") {
      sortOptions.price = 1;
    }
    if (sort === "price_desc") {
      sortOptions.price = -1;
    }
    if (sort === "newest") {
      sortOptions.createdAt = -1;
    }
    if (sort === "oldest") {
      sortOptions.createdAt = 1;
    }

    let pageNumber = Number(page || Number(1));
    let limitNumber = Number(limit || Number(10));

    if (Number.isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid page number",
      });
    }

    if (Number.isNaN(limitNumber) || limitNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid limit",
      });
    }

    if (limitNumber > 50) {
      return res.status(400).json({
        success: false,
        message: "Limit cannot be greater than 50",
      });
    }

    let skip = (pageNumber - 1) * limitNumber;

    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber);

    const totalPages = Math.ceil(totalProducts / limitNumber);

    res.status(200).json({
      success: true,
      currentPage: pageNumber,
      totalPages,
      totalProducts,
      count: products.length,
      products,
    });
  } catch (error) {
    console.log("Get Products Error", error.message);

    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching products",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get product by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the product",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product Id",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product: updateProduct,
    });
  } catch (error) {
    console.log("Update Product Error: ", error);
    res.status(500).json({
      success: false,
      message: "something went Wrong while updating the product",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product Id",
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.log("Delete Product Error: ", error);
    res.status(500).json({
      success: false,
      message: "something went Wrong while deleting the product",
    });
  }
};

export const getRelatedProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)

      if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    const reletedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    });


    res.staus(200).json({
      success:true,
      count:reletedProducts.length,
      reletedProducts
    })
  

    
  } catch (error) {
    console.log(" getRelatedProduct Error: ", error.message);
    res.status(500).json({
      success: false,
      message: "something went Wrong while fetching related Products",
    });
  }
};
