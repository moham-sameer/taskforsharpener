const db = require('../db');

const getAllProducts = async (req, res, next) =>{
    try {
       const data = await db.query(' SELECT * FROM products') ;
       if(!data){
          res.status(404).send({
            success: false,
            message: 'No products found',
          });
       }
       res.status(200).send({
        success: true,
        message: 'Products fetched successfully',
        data,
       })
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success:false,
        message: 'error in getting all products data',
        error,
      });  
    }
}
const deleteProduct = async (req, res, next) =>{
    try {
       const data = await db.query(' DELETE FROM products WHERE id =1');
       if(!data){
          res.status(404).send({
            success: false,
            message: 'No products found',
          });
       }
       res.status(200).send({
        success: true,
        message: 'Products deleted successfully',
        data,
       })
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success:false,
        message: 'error in getting all products data',
        error,
      });  
    }
}

module.exports =  {getAllProducts,deleteProduct};