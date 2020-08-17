
const data_service = require('../../utils/data_service.js');

function valid_keyword(keyword) {
    const re = /(\w|\d|[\u4e00-\u9fa5])+/g
    if (keyword.match(re)) {
        if (keyword.match(re)[0] === keyword) {
            return true
        }
    }
    return false
}

Page({
    data: {
        active: false,
        stock_dict: {},
        candidate_codes: [],
        keyword: "",
        name_str: "",
        code_str: "",
        codes: []
    },
    onLoad: async function (e) {
        let stock_dict = await data_service.stocks()
        let codes = Object.keys(stock_dict)
        let names = Object.values(stock_dict)
        let code_str = codes.join(",")
        let names_fix = []
        for(let i=0;i<names.length;i++){
          // if (names[i].length > 6) {
          //   console.log(names[i].length, names[i])
          // }
          names_fix.push(names[i].padStart(9, ","))
        }
        let name_str = names_fix.join(",")
        this.setData({ stock_dict: stock_dict, name_str:name_str, code_str:code_str, codes: codes })
    },
    focus() {
        console.log("focus")
        this.setData({ active: true })
    },
    blur() {
        console.log("blur")
        this.setData({ active: this.data.keyword != "" })
    },
    input(e) {
        let keyword = e.detail.value
        let candidate_codes = []
        if (valid_keyword(keyword)) {
            let code_str = this.data.code_str
            let codes = this.data.codes
            let name_str = this.data.name_str
            let re =  new RegExp(keyword, "g")
            let m = 0
            while(match = re.exec(code_str)){
                candidate_codes.push(codes[Math.floor(match.index / 7)])
                m += 1
                if (m >= 5) {
                    break
                }
            }
            while(match = re.exec(name_str)){
                candidate_codes.push(codes[Math.floor(match.index / 10)])
                m += 1
                if (m >= 5) {
                    break
                }
            }
        }
        this.setData({ candidate_codes: candidate_codes, keyword: keyword })
    },
    to_detail(e) {
        let code = e.currentTarget.dataset.code
        let url = "/pages/stock-detail/stock-detail?code=" + code
        let that = this
        wx.navigateTo({
            url: url, success: function () {
                setTimeout(function () {
                    that.clear()
                    console.log("navigate to ", code)
                }, 1000)
            }
        })
    },
    clear() {
        this.setData({ keyword: "", candidate_codes: [], active: false })
        console.log("clear")
    }
});
