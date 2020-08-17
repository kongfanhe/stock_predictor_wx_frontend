
const data_service = require('../../utils/data_service.js');

Page({
    data: {
        sectors: [],
        rankings: [],
        date: "",
        hov: 500,
    },
    onLoad: async function (e) {
        let mp = await data_service.market_predict()
        this.setData({sectors: mp.sectors, rankings: mp.rankings, date: mp.date})
        wx.setNavigationBarTitle({
          title: this.data.date + " 收盘行情预测"
        })
    },
    to_detail: function(e){
        let code = e.currentTarget.dataset.code
        let url = "/pages/stock-detail/stock-detail?code=" + code
        wx.navigateTo({url: url})
    }
});
