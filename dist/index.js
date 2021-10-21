"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var axios = require('axios').default;
var Client = /** @class */ (function () {
    function Client(options) {
        this.url = "http://" + options.host + ":" + options.port + "/api";
        this.groupDefaultsPath = this.url + "/group_defaults";
        this.groupPath = this.url + "/group";
        this.msgPath = this.url + "/msg";
        this.storePath = this.url + "/store";
    }
    Client.prototype.addMsg = function (priority, msg) {
        return __awaiter(this, void 0, void 0, function () {
            var reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.post(this.msgPath, { priority: priority, msg: msg })];
                    case 1:
                        reply = _a.sent();
                        return [2 /*return*/, reply.data.id];
                }
            });
        });
    };
    Client.prototype.deleteMsg = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.delete(this.msgPath, { params: { id: id } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.updateMsg = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = { id: id, new_priority: options.newPriority };
                        return [4 /*yield*/, axios.put(this.msgPath, body)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.getMsg = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.get(this.msgPath, { params: options })];
                    case 1:
                        reply = _a.sent();
                        return [2 /*return*/, reply.data];
                }
            });
        });
    };
    Client.prototype.setGroupDefaults = function (priority, options) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            priority: priority,
                            max_byte_size: options.maxByteSize,
                            prune: options.prune,
                            update_config: options.updateConfig
                        };
                        return [4 /*yield*/, axios.post(this.groupDefaultsPath, body)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.getGroupDefaults = function (priority) {
        return __awaiter(this, void 0, void 0, function () {
            var reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.get(this.groupDefaultsPath, { params: { priority: priority } })];
                    case 1:
                        reply = _a.sent();
                        return [2 /*return*/, reply.data.data];
                }
            });
        });
    };
    Client.prototype.deleteGroupDefaults = function (priority) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.delete(this.groupDefaultsPath, { params: { priority: priority } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.getGroup = function (priority, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params, reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            priority: priority,
                            include_msg_data: options === null || options === void 0 ? void 0 : options.includeMsgData
                        };
                        return [4 /*yield*/, axios.get(this.groupPath, { params: params })];
                    case 1:
                        reply = _a.sent();
                        return [2 /*return*/, reply.data.data];
                }
            });
        });
    };
    Client.prototype.deleteGroup = function (priority) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.delete(this.groupPath, { params: { priority: priority } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.getStoreData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.get(this.storePath)];
                    case 1:
                        reply = _a.sent();
                        return [2 /*return*/, reply.data.data];
                }
            });
        });
    };
    Client.prototype.updateStoreConfig = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            max_byte_size: options === null || options === void 0 ? void 0 : options.maxByteSize,
                            prune: options === null || options === void 0 ? void 0 : options.prune,
                            update_config: options === null || options === void 0 ? void 0 : options.updateConfig
                        };
                        return [4 /*yield*/, axios.put(this.storePath, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=index.js.map