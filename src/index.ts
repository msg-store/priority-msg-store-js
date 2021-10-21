const axios = require('axios').default

export interface Options {
    host: string,
    port: number
}

export interface GetMsgOptions {
    priority?: number
    id?: number
}

export interface GetMsgReply {
    id: number,
    priority: number,
    msg: string
}

export interface UpdateMsgOptions {
    newPriority: number
}

export interface GroupDefaultsOptions {
    maxByteSize: number | null,
    prune?: boolean,
    updateConfig?: boolean
}

export interface GroupDefaultsReply {
    max_byte_size: number | null
}

interface UpdateGroupDefaultReq {
    priority: number,
    max_byte_size: number | null,
    prune?: boolean,
    update_config?: boolean
}

export interface GetGroupOptions {
    includeMsgData?: boolean
}

export interface GetGroupMsgData {
    id: number,
    byte_size: number
}

export interface GetGroupReply {
    priority: number,
    byte_size: number,
    max_byte_size: number | null,
    msg_count: number,
    msg_data: GetGroupMsgData[] | null
}

export interface GetStoreGroupDefaults {
    priority: number,
    max_byte_size: number
}

export interface GetStoreGroupData {
    priority: number,
    byte_size: number,
    max_byte_size: number | null,
    msg_count: number
}

export interface GetStoreDataReply {
    byte_size: number,
    max_byte_size: number | null,
    msg_count: number,
    group_count: number,
    groups: GetStoreGroupData[],
    group_defaults: GetStoreGroupDefaults[]
}

export interface UpdateStoreReq {
    maxByteSize?: number,   // default = null
    prune?: boolean,        // default = true
    updateConfig?: boolean  // default = true
}

export class Client {
    url: string
    groupDefaultsPath: string
    groupPath: string
    msgPath: string
    storePath: string
    constructor(options: Options) {
        this.url = `http://${options.host}:${options.port}/api`
        this.groupDefaultsPath = `${this.url}/group_defaults`
        this.groupPath = `${this.url}/group`
        this.msgPath = `${this.url}/msg`
        this.storePath = `${this.url}/store`
    }
    async addMsg(priority: number, msg: string): Promise<number> {
        let reply = await axios.post(this.msgPath, { priority, msg })
        return reply.data.id
    }
    async deleteMsg(id: number): Promise<void> {
        await axios.delete(this.msgPath, { params: { id } })
    }
    async updateMsg(id: number, options: UpdateMsgOptions): Promise<void> {
        const body = { id, new_priority: options.newPriority }
        await axios.put(this.msgPath, body)
    }
    async getMsg(options?: GetMsgOptions): Promise<GetMsgReply | null> {
        let reply = await axios.get(this.msgPath, { params: options })
        return reply.data
    }
    async setGroupDefaults(priority: number, options: GroupDefaultsOptions): Promise<void> {
        const body: UpdateGroupDefaultReq = {
            priority,
            max_byte_size: options.maxByteSize,
            prune: options.prune,
            update_config: options.updateConfig
        }
        await axios.post(this.groupDefaultsPath, body)
    }
    async getGroupDefaults(priority: number): Promise<GroupDefaultsReply | null> {
        let reply = await axios.get(this.groupDefaultsPath, { params: { priority } })
        return reply.data.data
    }
    async deleteGroupDefaults(priority: number): Promise<void> {
        await axios.delete(this.groupDefaultsPath, { params: { priority } })
    }
    async getGroup(priority: number, options?: GetGroupOptions): Promise<GetGroupReply | null> {
        const params = {
            priority,
            include_msg_data: options?.includeMsgData
        }
        const reply = await axios.get(this.groupPath, { params })
        return reply.data.data
    }
    async deleteGroup(priority: number): Promise<void> {
        await axios.delete(this.groupPath, { params: { priority } })
    }
    async getStoreData(): Promise<GetStoreDataReply> {
        let reply = await axios.get(this.storePath)
        return reply.data.data
    }
    async updateStoreConfig(options: UpdateStoreReq): Promise<void> {
        const data = {
            max_byte_size: options?.maxByteSize,
            prune: options?.prune,
            update_config: options?.updateConfig
        }
        await axios.put(this.storePath, data)
    }
}
