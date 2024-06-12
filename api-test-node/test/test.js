const request = require('supertest');
const { describeApi } = require('./describeApi');
const expect = require('chai').expect;
require('dotenv').config()
const fs = require('fs');

const baseUrl = process.env.BASE_URL
const orgId = process.env.TEST_ORG_ID
const proId = process.env.TEST_PRO_ID
const deployId = process.env.TEST_DEPLOY_ID

describe('login', function () {
    const loginInfo = {
        username: "username",
        password: "pwd!",
    }
    it('/api/account/login', function (done) {
        request(baseUrl)
            .post('/api/account/login')
            .send(loginInfo)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.have.property('tokenType')
                expect(res.body).to.have.property('accessToken')
                expect(res.body).to.have.property('expiresIn')
                expect(res.body).to.have.property('refreshToken')
                expect(res.body).to.have.property('refreshExpiresIn')
                expect(res.body).to.have.property('admin')
                return done();
            });
    });
});

describe('get manifest', function (done) {
    describeApi('/api/manifest.json', 'get', (response) => {
        expect(response.body).to.have.any.keys('version', 'modules', 'license', 'userManagement', 'uiCustomization', 'system')
    }, {
        _t: new Date().getTime()
    })
});

describe('get profile', function (done) {
    describeApi('/api/profile', 'get', (response) => {
        expect(response.body).to.have.any.keys('admin', 'email', 'mobile', 'name', 'userId')
        expect(response.body.admin).to.be.a('boolean')
    })
});

describe('get roles', function (done) {
    describeApi('/api/roles', 'get', (response) => {
        expect(response.body.roles).to.be.an('array')
    })
});

describe('get orgs', function (done) {
    describeApi('/api/orgs', 'get', (response) => {
        expect(response.body).to.have.any.keys('total', 'data')
        expect(response.body.total).to.be.a('number')
        expect(response.body.data).to.be.an('array')
    }, {
        size: 30,
        offset: 0,
    })
});

describe('get users search in org', function (done) {
    describeApi('/api/search', 'get', (response) => {
        expect(response.body).to.have.any.keys('total', 'data')
        expect(response.body.total).to.be.a('number')
        expect(response.body.data).to.be.an('array')
    }, {
        size: -1,
        enabled: true,
        verified: true
    })
});

describe('get users search in org', function (done) {
    describeApi('/api/search', 'get', (response) => {
        expect(response.body).to.have.any.keys('total', 'data')
        expect(response.body.total).to.be.a('number')
        expect(response.body.data).to.be.an('array')
    }, {
        size: -1,
        enabled: true,
        verified: true
    })
});

describe('get users search in org', function (done) {
    describeApi('/api/names', 'get', (response) => {
        expect(response.body).to.have.any.keys('data')
        expect(response.body.data).to.be.an('array')
    })
});

describe('edit org', function (done) {
    describeApi('/api/orgs', 'get', (response) => {
        expect(response.body).to.have.any.keys('total', 'data')
        expect(response.body.total).to.be.a('number')
        expect(response.body.data).to.be.an('array')
        const editOrgId = response.body.data.length && response.body.data[0].id
        const members = response.body.data.length && response.body.data[0].members
        describe('update org', function (done) {
            describeApi(`/api/orgs/${editOrgId}`, 'put', (response) => {  
                expect(response.body).to.have.any.keys('createdAt', 'id', 'members', 'name', 'updatedAt')
                expect(response.body.members).to.be.an('array')
                expect(response.body.id).to.equal(editOrgId)
            }, {
               name: 'test',
               members 
            })
        });
    }, {
        size: 30,
        offset: 0,
    })
});

// describe('get alarms current', function (done) {
//     describeApi(`/api/orgs/${orgId}/projects/${proId}/alarms/current`, 'get', (response) => {
//         expect(response.body.data).to.be.an('array') 
//         expect(response.body.total).to.be.a('number')
//     }, { size: 30 })
// })

// fs.readFile(__dirname + '/json/swagger.json', 'utf-8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return
//     }
//     // data is string
//     const r = JSON.parse(data)
//     const { paths } = r
//     // console.log(Object.keys(paths))
//     const pathsKeys = Object.keys(paths)
//     pathsKeys.forEach(item => {
//         const url = item
//         const method = Object.keys(paths[item])[0]
//         // console.log(url, method)
//     })
// })

// formData
// describe('upload avatar', function (done) {
//     describeApi(`/api/account/avatar`, 'post-form', (response) => {
//         // console.log(response.body)
//         expect(response.body.avatar).to.be.a('string')
//     }, { fileName: 'file', path: __dirname + '/testData/ekuiper.png'})
// })

