const { Client } = require('../dist/index')
const { expect, assert } = require('chai')

const log = msg => console.log(`      ${msg}`)

describe('msg store client', function () {
    let client
    before(function () {
        client = new Client({ host: 'localhost', port: 8080 })
    })
    describe('msg handling', function () {
        it('should add,update,get, and delete msgs', async function () {
            const msg = JSON.stringify({
                topic: 'my-topic',
                group: 'my-group',
                value: 'foo'
            })

            let priority = 1

            let id = await client.addMsg(priority, msg)
            log(`POST /msg: ${id}`);
            expect(id).to.be.a('number')
            
            let data = await client.getMsg()
            log(`GET /msg: ${JSON.stringify(data)}`)

            data = await client.getMsg({ id })
            log(`GET /msg?id=${id}: ${JSON.stringify(data)}`)

            data = await client.getMsg({ priority })
            log(`GET /msg?priority=${priority}: ${JSON.stringify(data)}`)

            await client.updateMsg(id, { newPriority: 1000 });
            log(`UPDATE /msg?id=${id} OK`)

            data = await client.getMsg({ id })
            log(`GET /msg?id=${id}: ${JSON.stringify(data)}`)

            await client.deleteMsg(id)
            log(`DELETE /msg?id=${id} OK`)
        })
    })
    describe("group defaults handling", function () {
        it('should add, update, get, and delete group defaults', async function () {
            let priority = 2000
            await client.setGroupDefaults(priority, { maxByteSize: 12345 })
            log(`POST /group_defaults OK`)
            
            let data = await client.getGroupDefaults(priority)
            log(`GET /group_defaults?priority=${priority} OK ${JSON.stringify(data)}`)

            await client.setGroupDefaults(priority, { maxByteSize: 54321 })
            log(`POST /group_defaults OK`)

            data = await client.getGroupDefaults(priority)
            log(`GET /group_defaults?priority=${priority} OK ${JSON.stringify(data)}`)

            await client.deleteGroupDefaults(priority)
            log(`DELETE /group_defaults OK`)

            data = await client.getGroupDefaults(priority)
            log(`GET /group_defaults?priority=${priority} OK ${JSON.stringify(data)}`)
        })
    })
    describe('group handling', function () {
        it('should get, and delete groups', async function () {
            let priority = 3000
            let id = await client.addMsg(priority, JSON.stringify({ topic: 'foo', msg: 'bar' }))
            log(`POST /msg OK id=${id}`)

            let group = await client.getGroup(priority)
            log(`GET /group?priority=${priority} OK ${JSON.stringify(group)}`)

            group = await client.getGroup(priority, { includeMsgData: true })
            log(`GET /group?priority=${priority} OK ${JSON.stringify(group)}`)

            await client.deleteGroup(priority)
            log(`DELETE /group?priority=${priority} OK`)

            group = await client.getGroup(priority)
            log(`GET /group?priority=${priority} OK ${JSON.stringify(group)}`)

        })
    })
    describe('store handling', function () {
        it('should handle getting the store and updating the config', async function () {
            let store = await client.getStoreData()
            log(`GET /store OK ${JSON.stringify(store)}`)

            await client.updateStoreConfig({ maxByteSize: 10_000 })
            log(`UPDATE /store?maxByteSize=?${10_000} OK`)

            store = await client.getStoreData()
            log(`GET /store OK ${JSON.stringify(store)}`)

        })
    })
})
