import { Router } from "express";


const indexRoute = Router()

indexRoute.route('/buyer')
indexRoute.route('/deliveryboy')
indexRoute.route('seller')

export default indexRoute