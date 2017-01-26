const  multer = require('multer');

const storagec = multer.diskStorage({
        //  destination用于设置文件的存储目录  uploads自动会创建
        destination:'www/uploads',
        // filename用于设置文件名
        filename:function(req,file,cb){
            console.log('fffff' + req)
            console.log('ccc' + file.originalname)
            console.log('ddd' +　cb)
            var petname = req.cookies.petname
            console.log(petname)
            console.log('fffff')
            // cb(null,file.fieldname  + '.jpg')
            cb(null,`${petname}.jpg`)

        }
    })
module.exports = multer({storage:storagec}) //    添加配置文件到multer对象
