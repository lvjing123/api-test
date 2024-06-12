const fs = require('fs')
const request = require('supertest')
require('dotenv').config()
const baseUrl = process.env.BASE_URL

class DescripbeApi {
    constructor(url, method, responseCallback, params) {
        this.url = url
        this.method = method
        this.responseCallback = responseCallback
        this.params = params
        this.apiMethod = {
            'get': this.__apiRequestGet,
            'post': this.__apiRequestPost,
            'put': this.__apiRequestPut,
            'delete': this.__apiRequestDelete,
            'post-form': this.__apiRequestPostFormData,
        }
        this.token = ''
    }

    describeApiMethod = () => {
        const self = this
        const loginInfo = {
            username: "name",
            password: "pwd!",
        }
        before(function(done) {
            // console.log("before 函数");
            request(baseUrl)
                .post('/api/account/login')
                .send(loginInfo)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    self.token = res.body.accessToken;
                    return done();
                });
        });

        it(self.url, function(done){
            self.apiMethod[self.method] && self.apiMethod[self.method](done)
        })
    }
    // 内部方法
    __apiRequestPost = (done) => {
        const self = this
        request(baseUrl)
            .post(this.url)
            .set('Authorization', `Bearer ${self.token}`)
            .send(this.params)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect([200, 400])
            .end(function (err, res) {
               if (err) return done(err);
               self.responseCallback(res);
               return done()
            });
    }

    __apiRequestPostFormData = (done) => {
        const self = this
        request(baseUrl)
            .post(this.url)
            .set('Authorization', `Bearer ${self.token}`)
            .set("Content-Type", "multipart/form-data")
            .attach(this.params.fileName, this.params.path)
            .expect(200)
            .end(function (err, res) {
               if (err) return done(err);
               self.responseCallback(res);
               return done()
            });
    }

    __apiRequestGet = (done) => {
        // get 请求可能有query 请求
        const self = this
        request(baseUrl)
            .get(this.url)
            .query(this.params)
            .set('Authorization', `Bearer ${self.token}`)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                // responseCallback 处理额外的逻辑，例如增加另外一个接口的内容
                self.responseCallback(res)
                return done()
            });
    }

    __apiRequestPut = (done) => {
        const self = this
        request(baseUrl)
            .put(this.url)
            .set('Authorization', `Bearer ${self.token}`)
            .send(this.params)
            .expect(200)
            .end(function (err, res) {
                // 报错
                if (err) return done(err);
                // 校验结果 或者有其他后续处理
                self.responseCallback(res)
                return done()
            });
    }

    //204 400
    __apiRequestDelete = (done) => {
        const self = this
        request(baseUrl)
            .delete(this.url)
            .set('Authorization', `Bearer ${self.token}`)
            .expect([204, 400])
            .end(function (err, res) {
                // 报错
                if (err) return done(err);
                self.responseCallback(res);
                return done()
            });
    }
}

function describeApi(url, method, responseCallback, params) {
    const instance = new DescripbeApi(url, method, responseCallback, params)
    instance.describeApiMethod()
}

module.exports = { describeApi };
