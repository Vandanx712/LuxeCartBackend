import path from 'path'


export const AwsStorePath = (sellerName,options={}) =>{
    const {
        includeSellerName = false,
        includeuserprofilepic = true,
        includeproductspic = false
    } = options

    const folderPath = [
        ...(includeuserprofilepic ? ['userprofilepic'] :[]),
        ...(includeproductspic ? ['productpic'] : []),
        ...(includeSellerName ? [sellerName] : []) 
    ]

    return path.posix.join(...folderPath)
}