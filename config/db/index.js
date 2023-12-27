import mongoose from 'mongoose'
import { change_one_toObject, change_Mutil_data_toOBject } from './changeToObject'

async function connect() {
    try {
        await mongoose.connect(process.env.CONNECTION_URL)
        console.log('Success')
    } catch (err) {
        console.log(err)
    }
}

export { connect, change_Mutil_data_toOBject, change_one_toObject }
