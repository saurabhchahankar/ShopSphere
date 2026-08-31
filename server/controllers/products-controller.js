
export const getProducts = (req,res) => {
  res.json({
    success: true,
    message:'All Products'
  })
}

export const createProduct = async (req, res) => {
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    user: req.user,
  });
};