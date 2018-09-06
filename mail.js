// 1、auth 中的 pass，是指“邮箱第三方登录授权码”，如何获取授权码，以QQ邮箱为例，请点击：http://jingyan.baidu.com/article/fedf0737af2b4035ac8977ea.html
// 2、若message中的text和html同时存在，收件方只显示html内容。
// 3、message.html 中可以嵌套图片，配置cid作为图片的唯一引用地址，指的是发送邮箱附件时设置的cid，如下例中，上传的两张图片cid分别设置为0001和0002，在message.html中img标签scr属性分别指向这两个cid。
// 4、支持国内的QQ、163等邮箱，具体还支持哪些邮箱服务，请点击：https://github.com/nodemailer/nodemailer-wellknown/blob/master/services.json
var bunyan = require('bunyan');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'QQ',
    auth: {
        user: '@qq.com',//发送者邮箱
        pass: 'fdfdsfdsf' //邮箱第三方登录授权码
    },
    logger: bunyan.createLogger({
        name: 'nodemailer'
    }),//打印日志
    debug: true
},{
    from: '@qq.com',//发送者邮箱
    headers: {
        'X-Laziness-level': 1000
    }
});

console.log('SMTP Configured');

var message = {
    // Comma separated lsit of recipients 收件人用逗号间隔
    to: '@qq.com',

    // Subject of the message 信息主题
    subject:  '邮件主题',

    // plaintext body
    text: 'Hello to myself~',

    // Html body
    html: '<p><b>Hello</b> to myself <img src= "cid:00001"/></p>' +
    '<p>Here\'s a nyan car for you as embedded attachment:<br/><img src="cid:00002"/></p>',

    // Apple Watch specific HTML body 苹果手表指定HTML格式
    watchHtml: '<b>Hello</b> to myself',

    // An array of attachments 附件
    attachments: [
        // String attachment
        {
            filename: 'notes.txt',
            content: 'Some notes about this e-mail',
            contentType: 'text/plain' // optional,would be detected from the filename 可选的，会检测文件名
        },
        // Binary Buffer attchment
        {
            filename: 'image.png',
            content: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC', 'base64'),
            cid: '00001'  // should be as unique as possible 尽可能唯一
        },
        // File Stream attachment
        {
            filename: 'nyan cat.gif',
            path: 'http://pic21.photophoto.cn/20111106/0020032891433708_b.jpg',
            cid: '00002'  // should be as unique as possible 尽可能唯一
        }
    ]

};

console.log('发送邮件');
transporter.sendMail(message, (error, info) => {
    if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return;
    }
    console.log('Message sent successfully!');
    console.log('Server responded with "%s"', info.response);
    transporter.close();
});