export interface Options {
    host: string;
    port: number;
}
export interface GetMsgOptions {
    priority?: number;
    id?: number;
}
export interface GetMsgReply {
    id: number;
    priority: number;
    msg: string;
}
export interface UpdateMsgOptions {
    newPriority: number;
}
export interface GroupDefaultsOptions {
    maxByteSize: number | null;
    prune?: boolean;
    updateConfig?: boolean;
}
export interface GroupDefaultsReply {
    max_byte_size: number | null;
}
export interface GetGroupOptions {
    includeMsgData?: boolean;
}
export interface GetGroupMsgData {
    id: number;
    byte_size: number;
}
export interface GetGroupReply {
    priority: number;
    byte_size: number;
    max_byte_size: number | null;
    msg_count: number;
    msg_data: GetGroupMsgData[] | null;
}
export interface GetStoreGroupDefaults {
    priority: number;
    max_byte_size: number;
}
export interface GetStoreGroupData {
    priority: number;
    byte_size: number;
    max_byte_size: number | null;
    msg_count: number;
}
export interface GetStoreDataReply {
    byte_size: number;
    max_byte_size: number | null;
    msg_count: number;
    group_count: number;
    groups: GetStoreGroupData[];
    group_defaults: GetStoreGroupDefaults[];
}
export interface UpdateStoreReq {
    maxByteSize?: number;
    prune?: boolean;
    updateConfig?: boolean;
}
export declare class Client {
    url: string;
    groupDefaultsPath: string;
    groupPath: string;
    msgPath: string;
    storePath: string;
    constructor(options: Options);
    addMsg(priority: number, msg: string): Promise<number>;
    deleteMsg(id: number): Promise<void>;
    updateMsg(id: number, options: UpdateMsgOptions): Promise<void>;
    getMsg(options?: GetMsgOptions): Promise<GetMsgReply | null>;
    setGroupDefaults(priority: number, options: GroupDefaultsOptions): Promise<void>;
    getGroupDefaults(priority: number): Promise<GroupDefaultsReply | null>;
    deleteGroupDefaults(priority: number): Promise<void>;
    getGroup(priority: number, options?: GetGroupOptions): Promise<GetGroupReply | null>;
    deleteGroup(priority: number): Promise<void>;
    getStoreData(): Promise<GetStoreDataReply>;
    updateStoreConfig(options: UpdateStoreReq): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map