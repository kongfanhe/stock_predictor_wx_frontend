
const data_service = require('../../utils/data_service.js');
const app = getApp()


Page({
    data: {
        ready: false,
        favorite: false,
        predict: {},
    },
    onLoad: async function (options) {
        let code = options.code
        let predict = await data_service.stock_predict(code)
        this.setData({ ready: true, predict: predict })
        let user_info = await data_service.user_info()
        this.update_favorite(user_info, predict.code)
    },
    toggle_favorite: async function(){
        let user_info = await data_service.toggle_favorite(this.data.predict.code)
        this.update_favorite(user_info, this.data.predict.code)
    },
    update_favorite: async function(user_info, code){
        let my_codes = user_info.my_codes
        this.setData({favorite: my_codes.includes(code)})
    }
})
