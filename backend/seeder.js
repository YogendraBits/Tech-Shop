import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import Address from './models/addressModel.js'
import Cart from './models/cartModel.js'
import Wishlist from './models/wishlistModel.js'
import connectDB from './config/db.js'
import { log } from 'winston'
import Log from './models/logModel.js'

dotenv.config()
connectDB()

const importData = async ()=>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        
        const createdUsers = await User.insertMany(users) 
        const adminUser = createdUsers[0]._id 
        const sampleProducts=products.map(product =>{
            return{...product, user: adminUser}
        }) 

        await Product.insertMany(sampleProducts)
        console.log('Data Imported !'.green.inverse);
        process.exit()
    } catch (error) {

        console.error(`${error}`.red.inverse);
        process.exit(1)
    }

}

const destroyData = async ()=>{
    
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        await Address.deleteMany()
        await Cart.deleteMany()
        await Wishlist.deleteMany()
        await Log.deleteMany()
        process.exit()
    } catch (error) {

        console.error(`${error}`.red.inverse);
        process.exit(1)
    }

}
if (process.argv[2] === '-d') {
    destroyData()
}else{
    importData()
}