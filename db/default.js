import { Admin } from "../models/admin/admin.model.js";



async function defaultData() {
    try {
        const check = await Admin.countDocuments({})
        if(!check) {
            await Admin.create({
                username:'mongodb',
                email:'mongo@gmail.com',
                password:'mongo123',
                role:'admin'
            })
            console.log('Create default admin successfully')
        }
    } catch (error) {
        console.error(error)
    }
}

export default defaultData