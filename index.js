const nodemailer = require("nodemailer");
const { default: axios } = require("axios");
const schedule = require("node-schedule");

// 发送邮件函数
async function sendMail (text) {
    var user = "xxx@qq.com"; // 自己的邮箱
    var pass = "xxx"; // qq邮箱授权码
    var to = "xxx@qq.com"; // 对方的邮箱
    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        port: 587,
        secure: false,
        auth: {
            user: user, // 用户账号
            pass: pass // 授权码，通过QQ获取
        }
    })
    let info = await transporter.sendMail({
        from: `from：测试<${user}>`,
        to: `to：测试<${to}>`,
        subject: "subject：测试",
        text: text
    })
    console.log("发送成功");
}

// 获取情话
function getHoneyeWords() {
    var url = "https://chp.shadiao.app/api.php";
    // 获取这个接口的信息
    return axios.get(url);
}

// 每天14点20分发送
schedule.scheduleJob({ hour: 14, minute: 20 }, function () {
    console.log("启动任务：" + new Date());
    getHoneyeWords().then(res => {
        console.log(res.data);
        sendMail(res.data);
    });
});

