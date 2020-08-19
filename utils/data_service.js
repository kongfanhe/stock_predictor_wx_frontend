

const url_base = "https://oe0608.com:2256"
// const url_base = "http://127.0.0.1:8856"

async function time_out(miliseconds) {
  await new Promise(function (resolve, reject) {
    setTimeout(() => resolve(), miliseconds);
  });
  return
}


async function http_post(url, data) {
  let resp = await new Promise((resolve, reject) => wx.request({
    url: url,
    method: "POST",
    data: data,
    success(r) {
      resolve(r)
    }
  }));
  let resp_data = resp.data
  return resp_data
}


async function weixin_code() {
  let code = await new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve(res.code)
        }
      }
    });
  });
  return code
}


async function stocks() {
  const url = url_base + "/stocks"
  let stock_dict = await http_post(url)
  return stock_dict
}


async function user_info() {
  const url = url_base + "/user_info"
  let wxcode = await weixin_code()
  let user_info = await http_post(url, { wxcode })
  return user_info
}


async function stock_predict(code) {
  const url = url_base + "/stock_predict"
  let data = await http_post(url, { code })
  return data
}


async function market_predict() {
  const url = url_base + "/market_predict"
  let data = await http_post(url)
  return data
}


async function toggle_favorite(code) {
  const url = url_base + "/toggle_favorite"
  let wxcode = await weixin_code()
  let user_info = await http_post(url, { code, wxcode })
  return user_info
}


module.exports = {
  user_info,
  stocks,
  stock_predict,
  market_predict,
  toggle_favorite,
  time_out,
}
