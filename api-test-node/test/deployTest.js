const request = require('supertest');
const { describeApi } = require('./describeApi');
const expect = require('chai').expect;
require('dotenv').config()

const baseUrl = process.env.BASE_URL
const orgId = process.env.TEST_ORG_ID
const proId = process.env.TEST_PRO_ID
const deployId = process.env.TEST_DEPLOY_ID

// 测试数据
const deployData = require('./testData/deploy.json')

// describe('PUT update deployName', function (done) {
//     const params = deployData.updateDeployName
//     describeApi(`/api/orgs/${orgId}/projects/${proId}/deployments/${deployId}/update`, 'put', (response) => {
//         describe('GET /alarms/current', function (done) {
//             describeApi(`/api/orgs/${orgId}/projects/${proId}/deployments/85916dd5`, 'get', (response) => {
//                 // console.log('是否修改成功',response.body.data)
//                 expect(response.body.data.deployName).to.be.equal(params.deployName)
//             })
//         });
//     }, params)
// });







