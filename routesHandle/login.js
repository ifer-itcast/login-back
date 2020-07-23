const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const config = require('../config');

module.exports = (req, res) => {
    // 1. 查询用户是否存在
    const sql = 'SELECT * from user WHERE username=?';
    db(sql, req.body.username, result => {
        if (result.length !== 1) {
            return res.send({
                status: 1,
                msg: '此用户不存在'
            });
        }
        // 2. 如果存在就进行密码比较
        const psRes = bcrypt.compareSync(req.body.password, result[0].password);
        if (!psRes) {
            return res.send({
                status: 1,
                msg: '密码错误'
            });
        }
        // 3. 根据用户信息生成 token
        const token = jwt.sign({ username: req.body.username }, config.jwtKey, {
            expiresIn: '1h'
        });
        res.send({
            status: 0,
            msg: '登录成功',
            token
        });
    });
    
};