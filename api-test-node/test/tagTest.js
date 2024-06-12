const request = require('supertest');
const { describeApi } = require('./describeApi');
const expect = require('chai').expect;
require('dotenv').config()

const baseUrl = process.env.BASE_URL
const orgId = process.env.TEST_ORG_ID
const proId = process.env.TEST_PRO_ID
const deployId = process.env.TEST_DEPLOY_ID
// 测试数据
const tagData = require('./testData/tag.json')

// describe('POST Create tag', function (done) {
//     describeApi(`/api/orgs/${orgId}/projects/${proId}/tags`, 'post', (response) => {
//         // console.log(response.body, 'post')
//         if(response.status === 400){
//             console.log(response.body)
//         } else {
//             expect(response.body.name).to.be.a('string')
//             expect(response.body.createdAt).to.be.a('string')
//             expect(response.body.id).to.be.a('number')
//             expect(response.body.tagged).to.be.a('number')
//         }
//     }, tagData.createTag)
// });


// describe('GET tag list ', function (done) {
//     // 先查询tag 列表
//     describeApi(`/api/orgs/${orgId}/projects/${proId}/tags`, 'get', (response) => {
//         expect(response.body.data).to.be.an('array')
//         expect(response.body.total).to.be.a('number')
//         // 如果有tag 删除其中之一
//         const deleteTagId = response.body.data.length && response.body.data[0].id
//         describe(' delete Tag', function (done) {
//             describeApi(`/api/orgs/${orgId}/projects/${proId}/tags/${deleteTagId}`, 'delete', (response) => {
//                 if (response.status === 400) {
//                     // 便签已被使用
//                     expect(response.body).to.include({code: 20005});
//                 }
//             })
//         });
//     }, tagData.getTag)
// });






