
const data_service = require('../../utils/data_service.js');


Page({
    data: {
        my_codes: [],
        stocks: {},
        hov: 500,
    },
    onShow: async function (e) {
        let stocks = await data_service.stocks()
        let info = await data_service.user_info()
        let my_codes = info.my_codes
        // console.log(my_codes, stocks)
        this.setData({ my_codes: my_codes, stocks: stocks })
    },
    to_detail: function (e) {
        let i = parseInt(e.currentTarget.dataset.i)
        console.log(i)
        let code = this.data.my_codes[i]
        let url = "/pages/stock-detail/stock-detail?code=" + code
        wx.navigateTo({ url: url })
    },
    add_stock: function(){
        wx.switchTab({url: '/pages/stock-search/stock-search'})
    }
});
