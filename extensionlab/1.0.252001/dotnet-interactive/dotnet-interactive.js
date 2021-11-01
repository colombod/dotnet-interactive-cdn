(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.interactive = {}));
})(this, (function (exports) { 'use strict';

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    // Licensed under the MIT license. See LICENSE file in the project root for full license information.
    class DotnetInteractiveScopeContainer {
    }
    class DotnetInteractiveScope {
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter$7(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    // Licensed under the MIT license. See LICENSE file in the project root for full license information.
    class Guid {
        constructor(guid) {
            if (!guid) {
                throw new TypeError("Invalid argument; `value` has no value.");
            }
            this.value = Guid.EMPTY;
            if (guid && Guid.isGuid(guid)) {
                this.value = guid;
            }
        }
        static isGuid(guid) {
            const value = guid.toString();
            return guid && (guid instanceof Guid || Guid.validator.test(value));
        }
        static create() {
            return new Guid([Guid.gen(2), Guid.gen(1), Guid.gen(1), Guid.gen(1), Guid.gen(3)].join("-"));
        }
        static createEmpty() {
            return new Guid("emptyguid");
        }
        static parse(guid) {
            return new Guid(guid);
        }
        static raw() {
            return [Guid.gen(2), Guid.gen(1), Guid.gen(1), Guid.gen(1), Guid.gen(3)].join("-");
        }
        static gen(count) {
            let out = "";
            for (let i = 0; i < count; i++) {
                // tslint:disable-next-line:no-bitwise
                out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }
            return out;
        }
        equals(other) {
            // Comparing string `value` against provided `guid` will auto-call
            // toString on `guid` for comparison
            return Guid.isGuid(other) && this.value === other.toString();
        }
        isEmpty() {
            return this.value === Guid.EMPTY;
        }
        toString() {
            return this.value;
        }
        toJSON() {
            return {
                value: this.value,
            };
        }
    }
    Guid.validator = new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$", "i");
    Guid.EMPTY = "00000000-0000-0000-0000-000000000000";
    class TokenGenerator {
        constructor() {
            this._seed = Guid.create().toString();
            this._counter = 0;
        }
        GetNewToken() {
            this._counter++;
            return `${this._seed}::${this._counter}`;
        }
    }

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    var __extends$3 = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    /** Error thrown when an HTTP request fails. */
    var HttpError = /** @class */ (function (_super) {
        __extends$3(HttpError, _super);
        /** Constructs a new instance of {@link @microsoft/signalr.HttpError}.
         *
         * @param {string} errorMessage A descriptive error message.
         * @param {number} statusCode The HTTP status code represented by this error.
         */
        function HttpError(errorMessage, statusCode) {
            var _newTarget = this.constructor;
            var _this = this;
            var trueProto = _newTarget.prototype;
            _this = _super.call(this, errorMessage) || this;
            _this.statusCode = statusCode;
            // Workaround issue in Typescript compiler
            // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
            _this.__proto__ = trueProto;
            return _this;
        }
        return HttpError;
    }(Error));
    /** Error thrown when a timeout elapses. */
    var TimeoutError = /** @class */ (function (_super) {
        __extends$3(TimeoutError, _super);
        /** Constructs a new instance of {@link @microsoft/signalr.TimeoutError}.
         *
         * @param {string} errorMessage A descriptive error message.
         */
        function TimeoutError(errorMessage) {
            var _newTarget = this.constructor;
            if (errorMessage === void 0) { errorMessage = "A timeout occurred."; }
            var _this = this;
            var trueProto = _newTarget.prototype;
            _this = _super.call(this, errorMessage) || this;
            // Workaround issue in Typescript compiler
            // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
            _this.__proto__ = trueProto;
            return _this;
        }
        return TimeoutError;
    }(Error));
    /** Error thrown when an action is aborted. */
    var AbortError = /** @class */ (function (_super) {
        __extends$3(AbortError, _super);
        /** Constructs a new instance of {@link AbortError}.
         *
         * @param {string} errorMessage A descriptive error message.
         */
        function AbortError(errorMessage) {
            var _newTarget = this.constructor;
            if (errorMessage === void 0) { errorMessage = "An abort occurred."; }
            var _this = this;
            var trueProto = _newTarget.prototype;
            _this = _super.call(this, errorMessage) || this;
            // Workaround issue in Typescript compiler
            // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
            _this.__proto__ = trueProto;
            return _this;
        }
        return AbortError;
    }(Error));

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    var __assign$7 = (undefined && undefined.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    /** Represents an HTTP response. */
    var HttpResponse = /** @class */ (function () {
        function HttpResponse(statusCode, statusText, content) {
            this.statusCode = statusCode;
            this.statusText = statusText;
            this.content = content;
        }
        return HttpResponse;
    }());
    /** Abstraction over an HTTP client.
     *
     * This class provides an abstraction over an HTTP client so that a different implementation can be provided on different platforms.
     */
    var HttpClient = /** @class */ (function () {
        function HttpClient() {
        }
        HttpClient.prototype.get = function (url, options) {
            return this.send(__assign$7({}, options, { method: "GET", url: url }));
        };
        HttpClient.prototype.post = function (url, options) {
            return this.send(__assign$7({}, options, { method: "POST", url: url }));
        };
        HttpClient.prototype.delete = function (url, options) {
            return this.send(__assign$7({}, options, { method: "DELETE", url: url }));
        };
        /** Gets all cookies that apply to the specified URL.
         *
         * @param url The URL that the cookies are valid for.
         * @returns {string} A string containing all the key-value cookie pairs for the specified URL.
         */
        // @ts-ignore
        HttpClient.prototype.getCookieString = function (url) {
            return "";
        };
        return HttpClient;
    }());

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    // These values are designed to match the ASP.NET Log Levels since that's the pattern we're emulating here.
    /** Indicates the severity of a log message.
     *
     * Log Levels are ordered in increasing severity. So `Debug` is more severe than `Trace`, etc.
     */
    var LogLevel$1;
    (function (LogLevel) {
        /** Log level for very low severity diagnostic messages. */
        LogLevel[LogLevel["Trace"] = 0] = "Trace";
        /** Log level for low severity diagnostic messages. */
        LogLevel[LogLevel["Debug"] = 1] = "Debug";
        /** Log level for informational diagnostic messages. */
        LogLevel[LogLevel["Information"] = 2] = "Information";
        /** Log level for diagnostic messages that indicate a non-fatal problem. */
        LogLevel[LogLevel["Warning"] = 3] = "Warning";
        /** Log level for diagnostic messages that indicate a failure in the current operation. */
        LogLevel[LogLevel["Error"] = 4] = "Error";
        /** Log level for diagnostic messages that indicate a failure that will terminate the entire application. */
        LogLevel[LogLevel["Critical"] = 5] = "Critical";
        /** The highest possible log level. Used when configuring logging to indicate that no log messages should be emitted. */
        LogLevel[LogLevel["None"] = 6] = "None";
    })(LogLevel$1 || (LogLevel$1 = {}));

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    /** A logger that does nothing when log messages are sent to it. */
    var NullLogger = /** @class */ (function () {
        function NullLogger() {
        }
        /** @inheritDoc */
        // tslint:disable-next-line
        NullLogger.prototype.log = function (_logLevel, _message) {
        };
        /** The singleton instance of the {@link @microsoft/signalr.NullLogger}. */
        NullLogger.instance = new NullLogger();
        return NullLogger;
    }());

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    var __assign$6 = (undefined && undefined.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    var __awaiter$6 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$6 = (undefined && undefined.__generator) || function (thisArg, body) {
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
    // Version token that will be replaced by the prepack command
    /** The version of the SignalR client. */
    var VERSION = "5.0.9";
    /** @private */
    var Arg = /** @class */ (function () {
        function Arg() {
        }
        Arg.isRequired = function (val, name) {
            if (val === null || val === undefined) {
                throw new Error("The '" + name + "' argument is required.");
            }
        };
        Arg.isNotEmpty = function (val, name) {
            if (!val || val.match(/^\s*$/)) {
                throw new Error("The '" + name + "' argument should not be empty.");
            }
        };
        Arg.isIn = function (val, values, name) {
            // TypeScript enums have keys for **both** the name and the value of each enum member on the type itself.
            if (!(val in values)) {
                throw new Error("Unknown " + name + " value: " + val + ".");
            }
        };
        return Arg;
    }());
    /** @private */
    var Platform = /** @class */ (function () {
        function Platform() {
        }
        Object.defineProperty(Platform, "isBrowser", {
            get: function () {
                return typeof window === "object";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Platform, "isWebWorker", {
            get: function () {
                return typeof self === "object" && "importScripts" in self;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Platform, "isNode", {
            get: function () {
                return !this.isBrowser && !this.isWebWorker;
            },
            enumerable: true,
            configurable: true
        });
        return Platform;
    }());
    /** @private */
    function getDataDetail(data, includeContent) {
        var detail = "";
        if (isArrayBuffer(data)) {
            detail = "Binary data of length " + data.byteLength;
            if (includeContent) {
                detail += ". Content: '" + formatArrayBuffer(data) + "'";
            }
        }
        else if (typeof data === "string") {
            detail = "String data of length " + data.length;
            if (includeContent) {
                detail += ". Content: '" + data + "'";
            }
        }
        return detail;
    }
    /** @private */
    function formatArrayBuffer(data) {
        var view = new Uint8Array(data);
        // Uint8Array.map only supports returning another Uint8Array?
        var str = "";
        view.forEach(function (num) {
            var pad = num < 16 ? "0" : "";
            str += "0x" + pad + num.toString(16) + " ";
        });
        // Trim of trailing space.
        return str.substr(0, str.length - 1);
    }
    // Also in signalr-protocol-msgpack/Utils.ts
    /** @private */
    function isArrayBuffer(val) {
        return val && typeof ArrayBuffer !== "undefined" &&
            (val instanceof ArrayBuffer ||
                // Sometimes we get an ArrayBuffer that doesn't satisfy instanceof
                (val.constructor && val.constructor.name === "ArrayBuffer"));
    }
    /** @private */
    function sendMessage(logger, transportName, httpClient, url, accessTokenFactory, content, logMessageContent, withCredentials, defaultHeaders) {
        return __awaiter$6(this, void 0, void 0, function () {
            var _a, headers, token, _b, name, value, responseType, response;
            return __generator$6(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        headers = {};
                        if (!accessTokenFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, accessTokenFactory()];
                    case 1:
                        token = _c.sent();
                        if (token) {
                            headers = (_a = {},
                                _a["Authorization"] = "Bearer " + token,
                                _a);
                        }
                        _c.label = 2;
                    case 2:
                        _b = getUserAgentHeader(), name = _b[0], value = _b[1];
                        headers[name] = value;
                        logger.log(LogLevel$1.Trace, "(" + transportName + " transport) sending data. " + getDataDetail(content, logMessageContent) + ".");
                        responseType = isArrayBuffer(content) ? "arraybuffer" : "text";
                        return [4 /*yield*/, httpClient.post(url, {
                                content: content,
                                headers: __assign$6({}, headers, defaultHeaders),
                                responseType: responseType,
                                withCredentials: withCredentials,
                            })];
                    case 3:
                        response = _c.sent();
                        logger.log(LogLevel$1.Trace, "(" + transportName + " transport) request complete. Response status: " + response.statusCode + ".");
                        return [2 /*return*/];
                }
            });
        });
    }
    /** @private */
    function createLogger(logger) {
        if (logger === undefined) {
            return new ConsoleLogger(LogLevel$1.Information);
        }
        if (logger === null) {
            return NullLogger.instance;
        }
        if (logger.log) {
            return logger;
        }
        return new ConsoleLogger(logger);
    }
    /** @private */
    var SubjectSubscription = /** @class */ (function () {
        function SubjectSubscription(subject, observer) {
            this.subject = subject;
            this.observer = observer;
        }
        SubjectSubscription.prototype.dispose = function () {
            var index = this.subject.observers.indexOf(this.observer);
            if (index > -1) {
                this.subject.observers.splice(index, 1);
            }
            if (this.subject.observers.length === 0 && this.subject.cancelCallback) {
                this.subject.cancelCallback().catch(function (_) { });
            }
        };
        return SubjectSubscription;
    }());
    /** @private */
    var ConsoleLogger = /** @class */ (function () {
        function ConsoleLogger(minimumLogLevel) {
            this.minimumLogLevel = minimumLogLevel;
            this.outputConsole = console;
        }
        ConsoleLogger.prototype.log = function (logLevel, message) {
            if (logLevel >= this.minimumLogLevel) {
                switch (logLevel) {
                    case LogLevel$1.Critical:
                    case LogLevel$1.Error:
                        this.outputConsole.error("[" + new Date().toISOString() + "] " + LogLevel$1[logLevel] + ": " + message);
                        break;
                    case LogLevel$1.Warning:
                        this.outputConsole.warn("[" + new Date().toISOString() + "] " + LogLevel$1[logLevel] + ": " + message);
                        break;
                    case LogLevel$1.Information:
                        this.outputConsole.info("[" + new Date().toISOString() + "] " + LogLevel$1[logLevel] + ": " + message);
                        break;
                    default:
                        // console.debug only goes to attached debuggers in Node, so we use console.log for Trace and Debug
                        this.outputConsole.log("[" + new Date().toISOString() + "] " + LogLevel$1[logLevel] + ": " + message);
                        break;
                }
            }
        };
        return ConsoleLogger;
    }());
    /** @private */
    function getUserAgentHeader() {
        var userAgentHeaderName = "X-SignalR-User-Agent";
        if (Platform.isNode) {
            userAgentHeaderName = "User-Agent";
        }
        return [userAgentHeaderName, constructUserAgent(VERSION, getOsName(), getRuntime(), getRuntimeVersion())];
    }
    /** @private */
    function constructUserAgent(version, os, runtime, runtimeVersion) {
        // Microsoft SignalR/[Version] ([Detailed Version]; [Operating System]; [Runtime]; [Runtime Version])
        var userAgent = "Microsoft SignalR/";
        var majorAndMinor = version.split(".");
        userAgent += majorAndMinor[0] + "." + majorAndMinor[1];
        userAgent += " (" + version + "; ";
        if (os && os !== "") {
            userAgent += os + "; ";
        }
        else {
            userAgent += "Unknown OS; ";
        }
        userAgent += "" + runtime;
        if (runtimeVersion) {
            userAgent += "; " + runtimeVersion;
        }
        else {
            userAgent += "; Unknown Runtime Version";
        }
        userAgent += ")";
        return userAgent;
    }
    function getOsName() {
        if (Platform.isNode) {
            switch (process.platform) {
                case "win32":
                    return "Windows NT";
                case "darwin":
                    return "macOS";
                case "linux":
                    return "Linux";
                default:
                    return process.platform;
            }
        }
        else {
            return "";
        }
    }
    function getRuntimeVersion() {
        if (Platform.isNode) {
            return process.versions.node;
        }
        return undefined;
    }
    function getRuntime() {
        if (Platform.isNode) {
            return "NodeJS";
        }
        else {
            return "Browser";
        }
    }

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    var __extends$2 = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign$5 = (undefined && undefined.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    var __awaiter$5 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$5 = (undefined && undefined.__generator) || function (thisArg, body) {
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
    var FetchHttpClient = /** @class */ (function (_super) {
        __extends$2(FetchHttpClient, _super);
        function FetchHttpClient(logger) {
            var _this = _super.call(this) || this;
            _this.logger = logger;
            if (typeof fetch === "undefined") {
                // In order to ignore the dynamic require in webpack builds we need to do this magic
                // @ts-ignore: TS doesn't know about these names
                var requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
                // Cookies aren't automatically handled in Node so we need to add a CookieJar to preserve cookies across requests
                _this.jar = new (requireFunc("tough-cookie")).CookieJar();
                _this.fetchType = requireFunc("node-fetch");
                // node-fetch doesn't have a nice API for getting and setting cookies
                // fetch-cookie will wrap a fetch implementation with a default CookieJar or a provided one
                _this.fetchType = requireFunc("fetch-cookie")(_this.fetchType, _this.jar);
                // Node needs EventListener methods on AbortController which our custom polyfill doesn't provide
                _this.abortControllerType = requireFunc("abort-controller");
            }
            else {
                _this.fetchType = fetch.bind(self);
                _this.abortControllerType = AbortController;
            }
            return _this;
        }
        /** @inheritDoc */
        FetchHttpClient.prototype.send = function (request) {
            return __awaiter$5(this, void 0, void 0, function () {
                var abortController, error, timeoutId, msTimeout, response, e_1, content, payload;
                var _this = this;
                return __generator$5(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Check that abort was not signaled before calling send
                            if (request.abortSignal && request.abortSignal.aborted) {
                                throw new AbortError();
                            }
                            if (!request.method) {
                                throw new Error("No method defined.");
                            }
                            if (!request.url) {
                                throw new Error("No url defined.");
                            }
                            abortController = new this.abortControllerType();
                            // Hook our abortSignal into the abort controller
                            if (request.abortSignal) {
                                request.abortSignal.onabort = function () {
                                    abortController.abort();
                                    error = new AbortError();
                                };
                            }
                            timeoutId = null;
                            if (request.timeout) {
                                msTimeout = request.timeout;
                                timeoutId = setTimeout(function () {
                                    abortController.abort();
                                    _this.logger.log(LogLevel$1.Warning, "Timeout from HTTP request.");
                                    error = new TimeoutError();
                                }, msTimeout);
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, this.fetchType(request.url, {
                                    body: request.content,
                                    cache: "no-cache",
                                    credentials: request.withCredentials === true ? "include" : "same-origin",
                                    headers: __assign$5({ "Content-Type": "text/plain;charset=UTF-8", "X-Requested-With": "XMLHttpRequest" }, request.headers),
                                    method: request.method,
                                    mode: "cors",
                                    redirect: "manual",
                                    signal: abortController.signal,
                                })];
                        case 2:
                            response = _a.sent();
                            return [3 /*break*/, 5];
                        case 3:
                            e_1 = _a.sent();
                            if (error) {
                                throw error;
                            }
                            this.logger.log(LogLevel$1.Warning, "Error from HTTP request. " + e_1 + ".");
                            throw e_1;
                        case 4:
                            if (timeoutId) {
                                clearTimeout(timeoutId);
                            }
                            if (request.abortSignal) {
                                request.abortSignal.onabort = null;
                            }
                            return [7 /*endfinally*/];
                        case 5:
                            if (!response.ok) {
                                throw new HttpError(response.statusText, response.status);
                            }
                            content = deserializeContent(response, request.responseType);
                            return [4 /*yield*/, content];
                        case 6:
                            payload = _a.sent();
                            return [2 /*return*/, new HttpResponse(response.status, response.statusText, payload)];
                    }
                });
            });
        };
        FetchHttpClient.prototype.getCookieString = function (url) {
            var cookies = "";
            if (Platform.isNode && this.jar) {
                // @ts-ignore: unused variable
                this.jar.getCookies(url, function (e, c) { return cookies = c.join("; "); });
            }
            return cookies;
        };
        return FetchHttpClient;
    }(HttpClient));
    function deserializeContent(response, responseType) {
        var content;
        switch (responseType) {
            case "arraybuffer":
                content = response.arrayBuffer();
                break;
            case "text":
                content = response.text();
                break;
            case "blob":
            case "document":
            case "json":
                throw new Error(responseType + " is not supported.");
            default:
                content = response.text();
                break;
        }
        return content;
    }

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    var __extends$1 = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var XhrHttpClient = /** @class */ (function (_super) {
        __extends$1(XhrHttpClient, _super);
        function XhrHttpClient(logger) {
            var _this = _super.call(this) || this;
            _this.logger = logger;
            return _this;
        }
        /** @inheritDoc */
        XhrHttpClient.prototype.send = function (request) {
            var _this = this;
            // Check that abort was not signaled before calling send
            if (request.abortSignal && request.abortSignal.aborted) {
                return Promise.reject(new AbortError());
            }
            if (!request.method) {
                return Promise.reject(new Error("No method defined."));
            }
            if (!request.url) {
                return Promise.reject(new Error("No url defined."));
            }
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open(request.method, request.url, true);
                xhr.withCredentials = request.withCredentials === undefined ? true : request.withCredentials;
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                // Explicitly setting the Content-Type header for React Native on Android platform.
                xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
                var headers = request.headers;
                if (headers) {
                    Object.keys(headers)
                        .forEach(function (header) {
                        xhr.setRequestHeader(header, headers[header]);
                    });
                }
                if (request.responseType) {
                    xhr.responseType = request.responseType;
                }
                if (request.abortSignal) {
                    request.abortSignal.onabort = function () {
                        xhr.abort();
                        reject(new AbortError());
                    };
                }
                if (request.timeout) {
                    xhr.timeout = request.timeout;
                }
                xhr.onload = function () {
                    if (request.abortSignal) {
                        request.abortSignal.onabort = null;
                    }
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(new HttpResponse(xhr.status, xhr.statusText, xhr.response || xhr.responseText));
                    }
                    else {
                        reject(new HttpError(xhr.statusText, xhr.status));
                    }
                };
                xhr.onerror = function () {
                    _this.logger.log(LogLevel$1.Warning, "Error from HTTP request. " + xhr.status + ": " + xhr.statusText + ".");
                    reject(new HttpError(xhr.statusText, xhr.status));
                };
                xhr.ontimeout = function () {
                    _this.logger.log(LogLevel$1.Warning, "Timeout from HTTP request.");
                    reject(new TimeoutError());
                };
                xhr.send(request.content || "");
            });
        };
        return XhrHttpClient;
    }(HttpClient));

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    /** Default implementation of {@link @microsoft/signalr.HttpClient}. */
    var DefaultHttpClient = /** @class */ (function (_super) {
        __extends(DefaultHttpClient, _super);
        /** Creates a new instance of the {@link @microsoft/signalr.DefaultHttpClient}, using the provided {@link @microsoft/signalr.ILogger} to log messages. */
        function DefaultHttpClient(logger) {
            var _this = _super.call(this) || this;
            if (typeof fetch !== "undefined" || Platform.isNode) {
                _this.httpClient = new FetchHttpClient(logger);
            }
            else if (typeof XMLHttpRequest !== "undefined") {
                _this.httpClient = new XhrHttpClient(logger);
            }
            else {
                throw new Error("No usable HttpClient found.");
            }
            return _this;
        }
        /** @inheritDoc */
        DefaultHttpClient.prototype.send = function (request) {
            // Check that abort was not signaled before calling send
            if (request.abortSignal && request.abortSignal.aborted) {
                return Promise.reject(new AbortError());
            }
            if (!request.method) {
                return Promise.reject(new Error("No method defined."));
            }
            if (!request.url) {
                return Promise.reject(new Error("No url defined."));
            }
            return this.httpClient.send(request);
        };
        DefaultHttpClient.prototype.getCookieString = function (url) {
            return this.httpClient.getCookieString(url);
        };
        return DefaultHttpClient;
    }(HttpClient));

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    // Not exported from index
    /** @private */
    var TextMessageFormat = /** @class */ (function () {
        function TextMessageFormat() {
        }
        TextMessageFormat.write = function (output) {
            return "" + output + TextMessageFormat.RecordSeparator;
        };
        TextMessageFormat.parse = function (input) {
            if (input[input.length - 1] !== TextMessageFormat.RecordSeparator) {
                throw new Error("Message is incomplete.");
            }
            var messages = input.split(TextMessageFormat.RecordSeparator);
            messages.pop();
            return messages;
        };
        TextMessageFormat.RecordSeparatorCode = 0x1e;
        TextMessageFormat.RecordSeparator = String.fromCharCode(TextMessageFormat.RecordSeparatorCode);
        return TextMessageFormat;
    }());

    // Copyright (c) .NET Foundation. All rights reserved.
    /** @private */
    var HandshakeProtocol = /** @class */ (function () {
        function HandshakeProtocol() {
        }
        // Handshake request is always JSON
        HandshakeProtocol.prototype.writeHandshakeRequest = function (handshakeRequest) {
            return TextMessageFormat.write(JSON.stringify(handshakeRequest));
        };
        HandshakeProtocol.prototype.parseHandshakeResponse = function (data) {
            var responseMessage;
            var messageData;
            var remainingData;
            if (isArrayBuffer(data) || (typeof Buffer !== "undefined" && data instanceof Buffer)) {
                // Format is binary but still need to read JSON text from handshake response
                var binaryData = new Uint8Array(data);
                var separatorIndex = binaryData.indexOf(TextMessageFormat.RecordSeparatorCode);
                if (separatorIndex === -1) {
                    throw new Error("Message is incomplete.");
                }
                // content before separator is handshake response
                // optional content after is additional messages
                var responseLength = separatorIndex + 1;
                messageData = String.fromCharCode.apply(null, binaryData.slice(0, responseLength));
                remainingData = (binaryData.byteLength > responseLength) ? binaryData.slice(responseLength).buffer : null;
            }
            else {
                var textData = data;
                var separatorIndex = textData.indexOf(TextMessageFormat.RecordSeparator);
                if (separatorIndex === -1) {
                    throw new Error("Message is incomplete.");
                }
                // content before separator is handshake response
                // optional content after is additional messages
                var responseLength = separatorIndex + 1;
                messageData = textData.substring(0, responseLength);
                remainingData = (textData.length > responseLength) ? textData.substring(responseLength) : null;
            }
            // At this point we should have just the single handshake message
            var messages = TextMessageFormat.parse(messageData);
            var response = JSON.parse(messages[0]);
            if (response.type) {
                throw new Error("Expected a handshake response from the server.");
            }
            responseMessage = response;
            // multiple messages could have arrived with handshake
            // return additional data to be parsed as usual, or null if all parsed
            return [remainingData, responseMessage];
        };
        return HandshakeProtocol;
    }());

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    /** Defines the type of a Hub Message. */
    var MessageType;
    (function (MessageType) {
        /** Indicates the message is an Invocation message and implements the {@link @microsoft/signalr.InvocationMessage} interface. */
        MessageType[MessageType["Invocation"] = 1] = "Invocation";
        /** Indicates the message is a StreamItem message and implements the {@link @microsoft/signalr.StreamItemMessage} interface. */
        MessageType[MessageType["StreamItem"] = 2] = "StreamItem";
        /** Indicates the message is a Completion message and implements the {@link @microsoft/signalr.CompletionMessage} interface. */
        MessageType[MessageType["Completion"] = 3] = "Completion";
        /** Indicates the message is a Stream Invocation message and implements the {@link @microsoft/signalr.StreamInvocationMessage} interface. */
        MessageType[MessageType["StreamInvocation"] = 4] = "StreamInvocation";
        /** Indicates the message is a Cancel Invocation message and implements the {@link @microsoft/signalr.CancelInvocationMessage} interface. */
        MessageType[MessageType["CancelInvocation"] = 5] = "CancelInvocation";
        /** Indicates the message is a Ping message and implements the {@link @microsoft/signalr.PingMessage} interface. */
        MessageType[MessageType["Ping"] = 6] = "Ping";
        /** Indicates the message is a Close message and implements the {@link @microsoft/signalr.CloseMessage} interface. */
        MessageType[MessageType["Close"] = 7] = "Close";
    })(MessageType || (MessageType = {}));

    // Copyright (c) .NET Foundation. All rights reserved.
    /** Stream implementation to stream items to the server. */
    var Subject = /** @class */ (function () {
        function Subject() {
            this.observers = [];
        }
        Subject.prototype.next = function (item) {
            for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
                var observer = _a[_i];
                observer.next(item);
            }
        };
        Subject.prototype.error = function (err) {
            for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
                var observer = _a[_i];
                if (observer.error) {
                    observer.error(err);
                }
            }
        };
        Subject.prototype.complete = function () {
            for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
                var observer = _a[_i];
                if (observer.complete) {
                    observer.complete();
                }
            }
        };
        Subject.prototype.subscribe = function (observer) {
            this.observers.push(observer);
            return new SubjectSubscription(this, observer);
        };
        return Subject;
    }());

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    var __awaiter$4 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$4 = (undefined && undefined.__generator) || function (thisArg, body) {
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
    var DEFAULT_TIMEOUT_IN_MS = 30 * 1000;
    var DEFAULT_PING_INTERVAL_IN_MS = 15 * 1000;
    /** Describes the current state of the {@link HubConnection} to the server. */
    var HubConnectionState;
    (function (HubConnectionState) {
        /** The hub connection is disconnected. */
        HubConnectionState["Disconnected"] = "Disconnected";
        /** The hub connection is connecting. */
        HubConnectionState["Connecting"] = "Connecting";
        /** The hub connection is connected. */
        HubConnectionState["Connected"] = "Connected";
        /** The hub connection is disconnecting. */
        HubConnectionState["Disconnecting"] = "Disconnecting";
        /** The hub connection is reconnecting. */
        HubConnectionState["Reconnecting"] = "Reconnecting";
    })(HubConnectionState || (HubConnectionState = {}));
    /** Represents a connection to a SignalR Hub. */
    var HubConnection = /** @class */ (function () {
        function HubConnection(connection, logger, protocol, reconnectPolicy) {
            var _this = this;
            this.nextKeepAlive = 0;
            Arg.isRequired(connection, "connection");
            Arg.isRequired(logger, "logger");
            Arg.isRequired(protocol, "protocol");
            this.serverTimeoutInMilliseconds = DEFAULT_TIMEOUT_IN_MS;
            this.keepAliveIntervalInMilliseconds = DEFAULT_PING_INTERVAL_IN_MS;
            this.logger = logger;
            this.protocol = protocol;
            this.connection = connection;
            this.reconnectPolicy = reconnectPolicy;
            this.handshakeProtocol = new HandshakeProtocol();
            this.connection.onreceive = function (data) { return _this.processIncomingData(data); };
            this.connection.onclose = function (error) { return _this.connectionClosed(error); };
            this.callbacks = {};
            this.methods = {};
            this.closedCallbacks = [];
            this.reconnectingCallbacks = [];
            this.reconnectedCallbacks = [];
            this.invocationId = 0;
            this.receivedHandshakeResponse = false;
            this.connectionState = HubConnectionState.Disconnected;
            this.connectionStarted = false;
            this.cachedPingMessage = this.protocol.writeMessage({ type: MessageType.Ping });
        }
        /** @internal */
        // Using a public static factory method means we can have a private constructor and an _internal_
        // create method that can be used by HubConnectionBuilder. An "internal" constructor would just
        // be stripped away and the '.d.ts' file would have no constructor, which is interpreted as a
        // public parameter-less constructor.
        HubConnection.create = function (connection, logger, protocol, reconnectPolicy) {
            return new HubConnection(connection, logger, protocol, reconnectPolicy);
        };
        Object.defineProperty(HubConnection.prototype, "state", {
            /** Indicates the state of the {@link HubConnection} to the server. */
            get: function () {
                return this.connectionState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HubConnection.prototype, "connectionId", {
            /** Represents the connection id of the {@link HubConnection} on the server. The connection id will be null when the connection is either
             *  in the disconnected state or if the negotiation step was skipped.
             */
            get: function () {
                return this.connection ? (this.connection.connectionId || null) : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HubConnection.prototype, "baseUrl", {
            /** Indicates the url of the {@link HubConnection} to the server. */
            get: function () {
                return this.connection.baseUrl || "";
            },
            /**
             * Sets a new url for the HubConnection. Note that the url can only be changed when the connection is in either the Disconnected or
             * Reconnecting states.
             * @param {string} url The url to connect to.
             */
            set: function (url) {
                if (this.connectionState !== HubConnectionState.Disconnected && this.connectionState !== HubConnectionState.Reconnecting) {
                    throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");
                }
                if (!url) {
                    throw new Error("The HubConnection url must be a valid url.");
                }
                this.connection.baseUrl = url;
            },
            enumerable: true,
            configurable: true
        });
        /** Starts the connection.
         *
         * @returns {Promise<void>} A Promise that resolves when the connection has been successfully established, or rejects with an error.
         */
        HubConnection.prototype.start = function () {
            this.startPromise = this.startWithStateTransitions();
            return this.startPromise;
        };
        HubConnection.prototype.startWithStateTransitions = function () {
            return __awaiter$4(this, void 0, void 0, function () {
                var e_1;
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.connectionState !== HubConnectionState.Disconnected) {
                                return [2 /*return*/, Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."))];
                            }
                            this.connectionState = HubConnectionState.Connecting;
                            this.logger.log(LogLevel$1.Debug, "Starting HubConnection.");
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.startInternal()];
                        case 2:
                            _a.sent();
                            this.connectionState = HubConnectionState.Connected;
                            this.connectionStarted = true;
                            this.logger.log(LogLevel$1.Debug, "HubConnection connected successfully.");
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            this.connectionState = HubConnectionState.Disconnected;
                            this.logger.log(LogLevel$1.Debug, "HubConnection failed to start successfully because of error '" + e_1 + "'.");
                            return [2 /*return*/, Promise.reject(e_1)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        HubConnection.prototype.startInternal = function () {
            return __awaiter$4(this, void 0, void 0, function () {
                var handshakePromise, handshakeRequest, e_2;
                var _this = this;
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.stopDuringStartError = undefined;
                            this.receivedHandshakeResponse = false;
                            handshakePromise = new Promise(function (resolve, reject) {
                                _this.handshakeResolver = resolve;
                                _this.handshakeRejecter = reject;
                            });
                            return [4 /*yield*/, this.connection.start(this.protocol.transferFormat)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, , 7]);
                            handshakeRequest = {
                                protocol: this.protocol.name,
                                version: this.protocol.version,
                            };
                            this.logger.log(LogLevel$1.Debug, "Sending handshake request.");
                            return [4 /*yield*/, this.sendMessage(this.handshakeProtocol.writeHandshakeRequest(handshakeRequest))];
                        case 3:
                            _a.sent();
                            this.logger.log(LogLevel$1.Information, "Using HubProtocol '" + this.protocol.name + "'.");
                            // defensively cleanup timeout in case we receive a message from the server before we finish start
                            this.cleanupTimeout();
                            this.resetTimeoutPeriod();
                            this.resetKeepAliveInterval();
                            return [4 /*yield*/, handshakePromise];
                        case 4:
                            _a.sent();
                            // It's important to check the stopDuringStartError instead of just relying on the handshakePromise
                            // being rejected on close, because this continuation can run after both the handshake completed successfully
                            // and the connection was closed.
                            if (this.stopDuringStartError) {
                                // It's important to throw instead of returning a rejected promise, because we don't want to allow any state
                                // transitions to occur between now and the calling code observing the exceptions. Returning a rejected promise
                                // will cause the calling continuation to get scheduled to run later.
                                throw this.stopDuringStartError;
                            }
                            return [3 /*break*/, 7];
                        case 5:
                            e_2 = _a.sent();
                            this.logger.log(LogLevel$1.Debug, "Hub handshake failed with error '" + e_2 + "' during start(). Stopping HubConnection.");
                            this.cleanupTimeout();
                            this.cleanupPingTimer();
                            // HttpConnection.stop() should not complete until after the onclose callback is invoked.
                            // This will transition the HubConnection to the disconnected state before HttpConnection.stop() completes.
                            return [4 /*yield*/, this.connection.stop(e_2)];
                        case 6:
                            // HttpConnection.stop() should not complete until after the onclose callback is invoked.
                            // This will transition the HubConnection to the disconnected state before HttpConnection.stop() completes.
                            _a.sent();
                            throw e_2;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        /** Stops the connection.
         *
         * @returns {Promise<void>} A Promise that resolves when the connection has been successfully terminated, or rejects with an error.
         */
        HubConnection.prototype.stop = function () {
            return __awaiter$4(this, void 0, void 0, function () {
                var startPromise;
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            startPromise = this.startPromise;
                            this.stopPromise = this.stopInternal();
                            return [4 /*yield*/, this.stopPromise];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            // Awaiting undefined continues immediately
                            return [4 /*yield*/, startPromise];
                        case 3:
                            // Awaiting undefined continues immediately
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        HubConnection.prototype.stopInternal = function (error) {
            if (this.connectionState === HubConnectionState.Disconnected) {
                this.logger.log(LogLevel$1.Debug, "Call to HubConnection.stop(" + error + ") ignored because it is already in the disconnected state.");
                return Promise.resolve();
            }
            if (this.connectionState === HubConnectionState.Disconnecting) {
                this.logger.log(LogLevel$1.Debug, "Call to HttpConnection.stop(" + error + ") ignored because the connection is already in the disconnecting state.");
                return this.stopPromise;
            }
            this.connectionState = HubConnectionState.Disconnecting;
            this.logger.log(LogLevel$1.Debug, "Stopping HubConnection.");
            if (this.reconnectDelayHandle) {
                // We're in a reconnect delay which means the underlying connection is currently already stopped.
                // Just clear the handle to stop the reconnect loop (which no one is waiting on thankfully) and
                // fire the onclose callbacks.
                this.logger.log(LogLevel$1.Debug, "Connection stopped during reconnect delay. Done reconnecting.");
                clearTimeout(this.reconnectDelayHandle);
                this.reconnectDelayHandle = undefined;
                this.completeClose();
                return Promise.resolve();
            }
            this.cleanupTimeout();
            this.cleanupPingTimer();
            this.stopDuringStartError = error || new Error("The connection was stopped before the hub handshake could complete.");
            // HttpConnection.stop() should not complete until after either HttpConnection.start() fails
            // or the onclose callback is invoked. The onclose callback will transition the HubConnection
            // to the disconnected state if need be before HttpConnection.stop() completes.
            return this.connection.stop(error);
        };
        /** Invokes a streaming hub method on the server using the specified name and arguments.
         *
         * @typeparam T The type of the items returned by the server.
         * @param {string} methodName The name of the server method to invoke.
         * @param {any[]} args The arguments used to invoke the server method.
         * @returns {IStreamResult<T>} An object that yields results from the server as they are received.
         */
        HubConnection.prototype.stream = function (methodName) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a = this.replaceStreamingParams(args), streams = _a[0], streamIds = _a[1];
            var invocationDescriptor = this.createStreamInvocation(methodName, args, streamIds);
            var promiseQueue;
            var subject = new Subject();
            subject.cancelCallback = function () {
                var cancelInvocation = _this.createCancelInvocation(invocationDescriptor.invocationId);
                delete _this.callbacks[invocationDescriptor.invocationId];
                return promiseQueue.then(function () {
                    return _this.sendWithProtocol(cancelInvocation);
                });
            };
            this.callbacks[invocationDescriptor.invocationId] = function (invocationEvent, error) {
                if (error) {
                    subject.error(error);
                    return;
                }
                else if (invocationEvent) {
                    // invocationEvent will not be null when an error is not passed to the callback
                    if (invocationEvent.type === MessageType.Completion) {
                        if (invocationEvent.error) {
                            subject.error(new Error(invocationEvent.error));
                        }
                        else {
                            subject.complete();
                        }
                    }
                    else {
                        subject.next((invocationEvent.item));
                    }
                }
            };
            promiseQueue = this.sendWithProtocol(invocationDescriptor)
                .catch(function (e) {
                subject.error(e);
                delete _this.callbacks[invocationDescriptor.invocationId];
            });
            this.launchStreams(streams, promiseQueue);
            return subject;
        };
        HubConnection.prototype.sendMessage = function (message) {
            this.resetKeepAliveInterval();
            return this.connection.send(message);
        };
        /**
         * Sends a js object to the server.
         * @param message The js object to serialize and send.
         */
        HubConnection.prototype.sendWithProtocol = function (message) {
            return this.sendMessage(this.protocol.writeMessage(message));
        };
        /** Invokes a hub method on the server using the specified name and arguments. Does not wait for a response from the receiver.
         *
         * The Promise returned by this method resolves when the client has sent the invocation to the server. The server may still
         * be processing the invocation.
         *
         * @param {string} methodName The name of the server method to invoke.
         * @param {any[]} args The arguments used to invoke the server method.
         * @returns {Promise<void>} A Promise that resolves when the invocation has been successfully sent, or rejects with an error.
         */
        HubConnection.prototype.send = function (methodName) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a = this.replaceStreamingParams(args), streams = _a[0], streamIds = _a[1];
            var sendPromise = this.sendWithProtocol(this.createInvocation(methodName, args, true, streamIds));
            this.launchStreams(streams, sendPromise);
            return sendPromise;
        };
        /** Invokes a hub method on the server using the specified name and arguments.
         *
         * The Promise returned by this method resolves when the server indicates it has finished invoking the method. When the promise
         * resolves, the server has finished invoking the method. If the server method returns a result, it is produced as the result of
         * resolving the Promise.
         *
         * @typeparam T The expected return type.
         * @param {string} methodName The name of the server method to invoke.
         * @param {any[]} args The arguments used to invoke the server method.
         * @returns {Promise<T>} A Promise that resolves with the result of the server method (if any), or rejects with an error.
         */
        HubConnection.prototype.invoke = function (methodName) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a = this.replaceStreamingParams(args), streams = _a[0], streamIds = _a[1];
            var invocationDescriptor = this.createInvocation(methodName, args, false, streamIds);
            var p = new Promise(function (resolve, reject) {
                // invocationId will always have a value for a non-blocking invocation
                _this.callbacks[invocationDescriptor.invocationId] = function (invocationEvent, error) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    else if (invocationEvent) {
                        // invocationEvent will not be null when an error is not passed to the callback
                        if (invocationEvent.type === MessageType.Completion) {
                            if (invocationEvent.error) {
                                reject(new Error(invocationEvent.error));
                            }
                            else {
                                resolve(invocationEvent.result);
                            }
                        }
                        else {
                            reject(new Error("Unexpected message type: " + invocationEvent.type));
                        }
                    }
                };
                var promiseQueue = _this.sendWithProtocol(invocationDescriptor)
                    .catch(function (e) {
                    reject(e);
                    // invocationId will always have a value for a non-blocking invocation
                    delete _this.callbacks[invocationDescriptor.invocationId];
                });
                _this.launchStreams(streams, promiseQueue);
            });
            return p;
        };
        /** Registers a handler that will be invoked when the hub method with the specified method name is invoked.
         *
         * @param {string} methodName The name of the hub method to define.
         * @param {Function} newMethod The handler that will be raised when the hub method is invoked.
         */
        HubConnection.prototype.on = function (methodName, newMethod) {
            if (!methodName || !newMethod) {
                return;
            }
            methodName = methodName.toLowerCase();
            if (!this.methods[methodName]) {
                this.methods[methodName] = [];
            }
            // Preventing adding the same handler multiple times.
            if (this.methods[methodName].indexOf(newMethod) !== -1) {
                return;
            }
            this.methods[methodName].push(newMethod);
        };
        HubConnection.prototype.off = function (methodName, method) {
            if (!methodName) {
                return;
            }
            methodName = methodName.toLowerCase();
            var handlers = this.methods[methodName];
            if (!handlers) {
                return;
            }
            if (method) {
                var removeIdx = handlers.indexOf(method);
                if (removeIdx !== -1) {
                    handlers.splice(removeIdx, 1);
                    if (handlers.length === 0) {
                        delete this.methods[methodName];
                    }
                }
            }
            else {
                delete this.methods[methodName];
            }
        };
        /** Registers a handler that will be invoked when the connection is closed.
         *
         * @param {Function} callback The handler that will be invoked when the connection is closed. Optionally receives a single argument containing the error that caused the connection to close (if any).
         */
        HubConnection.prototype.onclose = function (callback) {
            if (callback) {
                this.closedCallbacks.push(callback);
            }
        };
        /** Registers a handler that will be invoked when the connection starts reconnecting.
         *
         * @param {Function} callback The handler that will be invoked when the connection starts reconnecting. Optionally receives a single argument containing the error that caused the connection to start reconnecting (if any).
         */
        HubConnection.prototype.onreconnecting = function (callback) {
            if (callback) {
                this.reconnectingCallbacks.push(callback);
            }
        };
        /** Registers a handler that will be invoked when the connection successfully reconnects.
         *
         * @param {Function} callback The handler that will be invoked when the connection successfully reconnects.
         */
        HubConnection.prototype.onreconnected = function (callback) {
            if (callback) {
                this.reconnectedCallbacks.push(callback);
            }
        };
        HubConnection.prototype.processIncomingData = function (data) {
            this.cleanupTimeout();
            if (!this.receivedHandshakeResponse) {
                data = this.processHandshakeResponse(data);
                this.receivedHandshakeResponse = true;
            }
            // Data may have all been read when processing handshake response
            if (data) {
                // Parse the messages
                var messages = this.protocol.parseMessages(data, this.logger);
                for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                    var message = messages_1[_i];
                    switch (message.type) {
                        case MessageType.Invocation:
                            this.invokeClientMethod(message);
                            break;
                        case MessageType.StreamItem:
                        case MessageType.Completion:
                            var callback = this.callbacks[message.invocationId];
                            if (callback) {
                                if (message.type === MessageType.Completion) {
                                    delete this.callbacks[message.invocationId];
                                }
                                callback(message);
                            }
                            break;
                        case MessageType.Ping:
                            // Don't care about pings
                            break;
                        case MessageType.Close:
                            this.logger.log(LogLevel$1.Information, "Close message received from server.");
                            var error = message.error ? new Error("Server returned an error on close: " + message.error) : undefined;
                            if (message.allowReconnect === true) {
                                // It feels wrong not to await connection.stop() here, but processIncomingData is called as part of an onreceive callback which is not async,
                                // this is already the behavior for serverTimeout(), and HttpConnection.Stop() should catch and log all possible exceptions.
                                // tslint:disable-next-line:no-floating-promises
                                this.connection.stop(error);
                            }
                            else {
                                // We cannot await stopInternal() here, but subsequent calls to stop() will await this if stopInternal() is still ongoing.
                                this.stopPromise = this.stopInternal(error);
                            }
                            break;
                        default:
                            this.logger.log(LogLevel$1.Warning, "Invalid message type: " + message.type + ".");
                            break;
                    }
                }
            }
            this.resetTimeoutPeriod();
        };
        HubConnection.prototype.processHandshakeResponse = function (data) {
            var _a;
            var responseMessage;
            var remainingData;
            try {
                _a = this.handshakeProtocol.parseHandshakeResponse(data), remainingData = _a[0], responseMessage = _a[1];
            }
            catch (e) {
                var message = "Error parsing handshake response: " + e;
                this.logger.log(LogLevel$1.Error, message);
                var error = new Error(message);
                this.handshakeRejecter(error);
                throw error;
            }
            if (responseMessage.error) {
                var message = "Server returned handshake error: " + responseMessage.error;
                this.logger.log(LogLevel$1.Error, message);
                var error = new Error(message);
                this.handshakeRejecter(error);
                throw error;
            }
            else {
                this.logger.log(LogLevel$1.Debug, "Server handshake complete.");
            }
            this.handshakeResolver();
            return remainingData;
        };
        HubConnection.prototype.resetKeepAliveInterval = function () {
            if (this.connection.features.inherentKeepAlive) {
                return;
            }
            // Set the time we want the next keep alive to be sent
            // Timer will be setup on next message receive
            this.nextKeepAlive = new Date().getTime() + this.keepAliveIntervalInMilliseconds;
            this.cleanupPingTimer();
        };
        HubConnection.prototype.resetTimeoutPeriod = function () {
            var _this = this;
            if (!this.connection.features || !this.connection.features.inherentKeepAlive) {
                // Set the timeout timer
                this.timeoutHandle = setTimeout(function () { return _this.serverTimeout(); }, this.serverTimeoutInMilliseconds);
                // Set keepAlive timer if there isn't one
                if (this.pingServerHandle === undefined) {
                    var nextPing = this.nextKeepAlive - new Date().getTime();
                    if (nextPing < 0) {
                        nextPing = 0;
                    }
                    // The timer needs to be set from a networking callback to avoid Chrome timer throttling from causing timers to run once a minute
                    this.pingServerHandle = setTimeout(function () { return __awaiter$4(_this, void 0, void 0, function () {
                        return __generator$4(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!(this.connectionState === HubConnectionState.Connected)) return [3 /*break*/, 4];
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.sendMessage(this.cachedPingMessage)];
                                case 2:
                                    _b.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    _b.sent();
                                    // We don't care about the error. It should be seen elsewhere in the client.
                                    // The connection is probably in a bad or closed state now, cleanup the timer so it stops triggering
                                    this.cleanupPingTimer();
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); }, nextPing);
                }
            }
        };
        HubConnection.prototype.serverTimeout = function () {
            // The server hasn't talked to us in a while. It doesn't like us anymore ... :(
            // Terminate the connection, but we don't need to wait on the promise. This could trigger reconnecting.
            // tslint:disable-next-line:no-floating-promises
            this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."));
        };
        HubConnection.prototype.invokeClientMethod = function (invocationMessage) {
            var _this = this;
            var methods = this.methods[invocationMessage.target.toLowerCase()];
            if (methods) {
                try {
                    methods.forEach(function (m) { return m.apply(_this, invocationMessage.arguments); });
                }
                catch (e) {
                    this.logger.log(LogLevel$1.Error, "A callback for the method " + invocationMessage.target.toLowerCase() + " threw error '" + e + "'.");
                }
                if (invocationMessage.invocationId) {
                    // This is not supported in v1. So we return an error to avoid blocking the server waiting for the response.
                    var message = "Server requested a response, which is not supported in this version of the client.";
                    this.logger.log(LogLevel$1.Error, message);
                    // We don't want to wait on the stop itself.
                    this.stopPromise = this.stopInternal(new Error(message));
                }
            }
            else {
                this.logger.log(LogLevel$1.Warning, "No client method with the name '" + invocationMessage.target + "' found.");
            }
        };
        HubConnection.prototype.connectionClosed = function (error) {
            this.logger.log(LogLevel$1.Debug, "HubConnection.connectionClosed(" + error + ") called while in state " + this.connectionState + ".");
            // Triggering this.handshakeRejecter is insufficient because it could already be resolved without the continuation having run yet.
            this.stopDuringStartError = this.stopDuringStartError || error || new Error("The underlying connection was closed before the hub handshake could complete.");
            // If the handshake is in progress, start will be waiting for the handshake promise, so we complete it.
            // If it has already completed, this should just noop.
            if (this.handshakeResolver) {
                this.handshakeResolver();
            }
            this.cancelCallbacksWithError(error || new Error("Invocation canceled due to the underlying connection being closed."));
            this.cleanupTimeout();
            this.cleanupPingTimer();
            if (this.connectionState === HubConnectionState.Disconnecting) {
                this.completeClose(error);
            }
            else if (this.connectionState === HubConnectionState.Connected && this.reconnectPolicy) {
                // tslint:disable-next-line:no-floating-promises
                this.reconnect(error);
            }
            else if (this.connectionState === HubConnectionState.Connected) {
                this.completeClose(error);
            }
            // If none of the above if conditions were true were called the HubConnection must be in either:
            // 1. The Connecting state in which case the handshakeResolver will complete it and stopDuringStartError will fail it.
            // 2. The Reconnecting state in which case the handshakeResolver will complete it and stopDuringStartError will fail the current reconnect attempt
            //    and potentially continue the reconnect() loop.
            // 3. The Disconnected state in which case we're already done.
        };
        HubConnection.prototype.completeClose = function (error) {
            var _this = this;
            if (this.connectionStarted) {
                this.connectionState = HubConnectionState.Disconnected;
                this.connectionStarted = false;
                try {
                    this.closedCallbacks.forEach(function (c) { return c.apply(_this, [error]); });
                }
                catch (e) {
                    this.logger.log(LogLevel$1.Error, "An onclose callback called with error '" + error + "' threw error '" + e + "'.");
                }
            }
        };
        HubConnection.prototype.reconnect = function (error) {
            return __awaiter$4(this, void 0, void 0, function () {
                var reconnectStartTime, previousReconnectAttempts, retryError, nextRetryDelay, e_4;
                var _this = this;
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            reconnectStartTime = Date.now();
                            previousReconnectAttempts = 0;
                            retryError = error !== undefined ? error : new Error("Attempting to reconnect due to a unknown error.");
                            nextRetryDelay = this.getNextRetryDelay(previousReconnectAttempts++, 0, retryError);
                            if (nextRetryDelay === null) {
                                this.logger.log(LogLevel$1.Debug, "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt.");
                                this.completeClose(error);
                                return [2 /*return*/];
                            }
                            this.connectionState = HubConnectionState.Reconnecting;
                            if (error) {
                                this.logger.log(LogLevel$1.Information, "Connection reconnecting because of error '" + error + "'.");
                            }
                            else {
                                this.logger.log(LogLevel$1.Information, "Connection reconnecting.");
                            }
                            if (this.onreconnecting) {
                                try {
                                    this.reconnectingCallbacks.forEach(function (c) { return c.apply(_this, [error]); });
                                }
                                catch (e) {
                                    this.logger.log(LogLevel$1.Error, "An onreconnecting callback called with error '" + error + "' threw error '" + e + "'.");
                                }
                                // Exit early if an onreconnecting callback called connection.stop().
                                if (this.connectionState !== HubConnectionState.Reconnecting) {
                                    this.logger.log(LogLevel$1.Debug, "Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");
                                    return [2 /*return*/];
                                }
                            }
                            _a.label = 1;
                        case 1:
                            if (!(nextRetryDelay !== null)) return [3 /*break*/, 7];
                            this.logger.log(LogLevel$1.Information, "Reconnect attempt number " + previousReconnectAttempts + " will start in " + nextRetryDelay + " ms.");
                            return [4 /*yield*/, new Promise(function (resolve) {
                                    _this.reconnectDelayHandle = setTimeout(resolve, nextRetryDelay);
                                })];
                        case 2:
                            _a.sent();
                            this.reconnectDelayHandle = undefined;
                            if (this.connectionState !== HubConnectionState.Reconnecting) {
                                this.logger.log(LogLevel$1.Debug, "Connection left the reconnecting state during reconnect delay. Done reconnecting.");
                                return [2 /*return*/];
                            }
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.startInternal()];
                        case 4:
                            _a.sent();
                            this.connectionState = HubConnectionState.Connected;
                            this.logger.log(LogLevel$1.Information, "HubConnection reconnected successfully.");
                            if (this.onreconnected) {
                                try {
                                    this.reconnectedCallbacks.forEach(function (c) { return c.apply(_this, [_this.connection.connectionId]); });
                                }
                                catch (e) {
                                    this.logger.log(LogLevel$1.Error, "An onreconnected callback called with connectionId '" + this.connection.connectionId + "; threw error '" + e + "'.");
                                }
                            }
                            return [2 /*return*/];
                        case 5:
                            e_4 = _a.sent();
                            this.logger.log(LogLevel$1.Information, "Reconnect attempt failed because of error '" + e_4 + "'.");
                            if (this.connectionState !== HubConnectionState.Reconnecting) {
                                this.logger.log(LogLevel$1.Debug, "Connection moved to the '" + this.connectionState + "' from the reconnecting state during reconnect attempt. Done reconnecting.");
                                // The TypeScript compiler thinks that connectionState must be Connected here. The TypeScript compiler is wrong.
                                if (this.connectionState === HubConnectionState.Disconnecting) {
                                    this.completeClose();
                                }
                                return [2 /*return*/];
                            }
                            retryError = e_4 instanceof Error ? e_4 : new Error(e_4.toString());
                            nextRetryDelay = this.getNextRetryDelay(previousReconnectAttempts++, Date.now() - reconnectStartTime, retryError);
                            return [3 /*break*/, 6];
                        case 6: return [3 /*break*/, 1];
                        case 7:
                            this.logger.log(LogLevel$1.Information, "Reconnect retries have been exhausted after " + (Date.now() - reconnectStartTime) + " ms and " + previousReconnectAttempts + " failed attempts. Connection disconnecting.");
                            this.completeClose();
                            return [2 /*return*/];
                    }
                });
            });
        };
        HubConnection.prototype.getNextRetryDelay = function (previousRetryCount, elapsedMilliseconds, retryReason) {
            try {
                return this.reconnectPolicy.nextRetryDelayInMilliseconds({
                    elapsedMilliseconds: elapsedMilliseconds,
                    previousRetryCount: previousRetryCount,
                    retryReason: retryReason,
                });
            }
            catch (e) {
                this.logger.log(LogLevel$1.Error, "IRetryPolicy.nextRetryDelayInMilliseconds(" + previousRetryCount + ", " + elapsedMilliseconds + ") threw error '" + e + "'.");
                return null;
            }
        };
        HubConnection.prototype.cancelCallbacksWithError = function (error) {
            var callbacks = this.callbacks;
            this.callbacks = {};
            Object.keys(callbacks)
                .forEach(function (key) {
                var callback = callbacks[key];
                callback(null, error);
            });
        };
        HubConnection.prototype.cleanupPingTimer = function () {
            if (this.pingServerHandle) {
                clearTimeout(this.pingServerHandle);
                this.pingServerHandle = undefined;
            }
        };
        HubConnection.prototype.cleanupTimeout = function () {
            if (this.timeoutHandle) {
                clearTimeout(this.timeoutHandle);
            }
        };
        HubConnection.prototype.createInvocation = function (methodName, args, nonblocking, streamIds) {
            if (nonblocking) {
                if (streamIds.length !== 0) {
                    return {
                        arguments: args,
                        streamIds: streamIds,
                        target: methodName,
                        type: MessageType.Invocation,
                    };
                }
                else {
                    return {
                        arguments: args,
                        target: methodName,
                        type: MessageType.Invocation,
                    };
                }
            }
            else {
                var invocationId = this.invocationId;
                this.invocationId++;
                if (streamIds.length !== 0) {
                    return {
                        arguments: args,
                        invocationId: invocationId.toString(),
                        streamIds: streamIds,
                        target: methodName,
                        type: MessageType.Invocation,
                    };
                }
                else {
                    return {
                        arguments: args,
                        invocationId: invocationId.toString(),
                        target: methodName,
                        type: MessageType.Invocation,
                    };
                }
            }
        };
        HubConnection.prototype.launchStreams = function (streams, promiseQueue) {
            var _this = this;
            if (streams.length === 0) {
                return;
            }
            // Synchronize stream data so they arrive in-order on the server
            if (!promiseQueue) {
                promiseQueue = Promise.resolve();
            }
            var _loop_1 = function (streamId) {
                streams[streamId].subscribe({
                    complete: function () {
                        promiseQueue = promiseQueue.then(function () { return _this.sendWithProtocol(_this.createCompletionMessage(streamId)); });
                    },
                    error: function (err) {
                        var message;
                        if (err instanceof Error) {
                            message = err.message;
                        }
                        else if (err && err.toString) {
                            message = err.toString();
                        }
                        else {
                            message = "Unknown error";
                        }
                        promiseQueue = promiseQueue.then(function () { return _this.sendWithProtocol(_this.createCompletionMessage(streamId, message)); });
                    },
                    next: function (item) {
                        promiseQueue = promiseQueue.then(function () { return _this.sendWithProtocol(_this.createStreamItemMessage(streamId, item)); });
                    },
                });
            };
            // We want to iterate over the keys, since the keys are the stream ids
            // tslint:disable-next-line:forin
            for (var streamId in streams) {
                _loop_1(streamId);
            }
        };
        HubConnection.prototype.replaceStreamingParams = function (args) {
            var streams = [];
            var streamIds = [];
            for (var i = 0; i < args.length; i++) {
                var argument = args[i];
                if (this.isObservable(argument)) {
                    var streamId = this.invocationId;
                    this.invocationId++;
                    // Store the stream for later use
                    streams[streamId] = argument;
                    streamIds.push(streamId.toString());
                    // remove stream from args
                    args.splice(i, 1);
                }
            }
            return [streams, streamIds];
        };
        HubConnection.prototype.isObservable = function (arg) {
            // This allows other stream implementations to just work (like rxjs)
            return arg && arg.subscribe && typeof arg.subscribe === "function";
        };
        HubConnection.prototype.createStreamInvocation = function (methodName, args, streamIds) {
            var invocationId = this.invocationId;
            this.invocationId++;
            if (streamIds.length !== 0) {
                return {
                    arguments: args,
                    invocationId: invocationId.toString(),
                    streamIds: streamIds,
                    target: methodName,
                    type: MessageType.StreamInvocation,
                };
            }
            else {
                return {
                    arguments: args,
                    invocationId: invocationId.toString(),
                    target: methodName,
                    type: MessageType.StreamInvocation,
                };
            }
        };
        HubConnection.prototype.createCancelInvocation = function (id) {
            return {
                invocationId: id,
                type: MessageType.CancelInvocation,
            };
        };
        HubConnection.prototype.createStreamItemMessage = function (id, item) {
            return {
                invocationId: id,
                item: item,
                type: MessageType.StreamItem,
            };
        };
        HubConnection.prototype.createCompletionMessage = function (id, error, result) {
            if (error) {
                return {
                    error: error,
                    invocationId: id,
                    type: MessageType.Completion,
                };
            }
            return {
                invocationId: id,
                result: result,
                type: MessageType.Completion,
            };
        };
        return HubConnection;
    }());

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    // 0, 2, 10, 30 second delays before reconnect attempts.
    var DEFAULT_RETRY_DELAYS_IN_MILLISECONDS = [0, 2000, 10000, 30000, null];
    /** @private */
    var DefaultReconnectPolicy = /** @class */ (function () {
        function DefaultReconnectPolicy(retryDelays) {
            this.retryDelays = retryDelays !== undefined ? retryDelays.concat([null]) : DEFAULT_RETRY_DELAYS_IN_MILLISECONDS;
        }
        DefaultReconnectPolicy.prototype.nextRetryDelayInMilliseconds = function (retryContext) {
            return this.retryDelays[retryContext.previousRetryCount];
        };
        return DefaultReconnectPolicy;
    }());

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    // This will be treated as a bit flag in the future, so we keep it using power-of-two values.
    /** Specifies a specific HTTP transport type. */
    var HttpTransportType;
    (function (HttpTransportType) {
        /** Specifies no transport preference. */
        HttpTransportType[HttpTransportType["None"] = 0] = "None";
        /** Specifies the WebSockets transport. */
        HttpTransportType[HttpTransportType["WebSockets"] = 1] = "WebSockets";
        /** Specifies the Server-Sent Events transport. */
        HttpTransportType[HttpTransportType["ServerSentEvents"] = 2] = "ServerSentEvents";
        /** Specifies the Long Polling transport. */
        HttpTransportType[HttpTransportType["LongPolling"] = 4] = "LongPolling";
    })(HttpTransportType || (HttpTransportType = {}));
    /** Specifies the transfer format for a connection. */
    var TransferFormat;
    (function (TransferFormat) {
        /** Specifies that only text data will be transmitted over the connection. */
        TransferFormat[TransferFormat["Text"] = 1] = "Text";
        /** Specifies that binary data will be transmitted over the connection. */
        TransferFormat[TransferFormat["Binary"] = 2] = "Binary";
    })(TransferFormat || (TransferFormat = {}));

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    // Rough polyfill of https://developer.mozilla.org/en-US/docs/Web/API/AbortController
    // We don't actually ever use the API being polyfilled, we always use the polyfill because
    // it's a very new API right now.
    // Not exported from index.
    /** @private */
    var AbortController$1 = /** @class */ (function () {
        function AbortController() {
            this.isAborted = false;
            this.onabort = null;
        }
        AbortController.prototype.abort = function () {
            if (!this.isAborted) {
                this.isAborted = true;
                if (this.onabort) {
                    this.onabort();
                }
            }
        };
        Object.defineProperty(AbortController.prototype, "signal", {
            get: function () {
                return this;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbortController.prototype, "aborted", {
            get: function () {
                return this.isAborted;
            },
            enumerable: true,
            configurable: true
        });
        return AbortController;
    }());

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    var __assign$4 = (undefined && undefined.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$3 = (undefined && undefined.__generator) || function (thisArg, body) {
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
    // Not exported from 'index', this type is internal.
    /** @private */
    var LongPollingTransport = /** @class */ (function () {
        function LongPollingTransport(httpClient, accessTokenFactory, logger, logMessageContent, withCredentials, headers) {
            this.httpClient = httpClient;
            this.accessTokenFactory = accessTokenFactory;
            this.logger = logger;
            this.pollAbort = new AbortController$1();
            this.logMessageContent = logMessageContent;
            this.withCredentials = withCredentials;
            this.headers = headers;
            this.running = false;
            this.onreceive = null;
            this.onclose = null;
        }
        Object.defineProperty(LongPollingTransport.prototype, "pollAborted", {
            // This is an internal type, not exported from 'index' so this is really just internal.
            get: function () {
                return this.pollAbort.aborted;
            },
            enumerable: true,
            configurable: true
        });
        LongPollingTransport.prototype.connect = function (url, transferFormat) {
            return __awaiter$3(this, void 0, void 0, function () {
                var _a, _b, name, value, headers, pollOptions, token, pollUrl, response;
                return __generator$3(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            Arg.isRequired(url, "url");
                            Arg.isRequired(transferFormat, "transferFormat");
                            Arg.isIn(transferFormat, TransferFormat, "transferFormat");
                            this.url = url;
                            this.logger.log(LogLevel$1.Trace, "(LongPolling transport) Connecting.");
                            // Allow binary format on Node and Browsers that support binary content (indicated by the presence of responseType property)
                            if (transferFormat === TransferFormat.Binary &&
                                (typeof XMLHttpRequest !== "undefined" && typeof new XMLHttpRequest().responseType !== "string")) {
                                throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
                            }
                            _b = getUserAgentHeader(), name = _b[0], value = _b[1];
                            headers = __assign$4((_a = {}, _a[name] = value, _a), this.headers);
                            pollOptions = {
                                abortSignal: this.pollAbort.signal,
                                headers: headers,
                                timeout: 100000,
                                withCredentials: this.withCredentials,
                            };
                            if (transferFormat === TransferFormat.Binary) {
                                pollOptions.responseType = "arraybuffer";
                            }
                            return [4 /*yield*/, this.getAccessToken()];
                        case 1:
                            token = _c.sent();
                            this.updateHeaderToken(pollOptions, token);
                            pollUrl = url + "&_=" + Date.now();
                            this.logger.log(LogLevel$1.Trace, "(LongPolling transport) polling: " + pollUrl + ".");
                            return [4 /*yield*/, this.httpClient.get(pollUrl, pollOptions)];
                        case 2:
                            response = _c.sent();
                            if (response.statusCode !== 200) {
                                this.logger.log(LogLevel$1.Error, "(LongPolling transport) Unexpected response code: " + response.statusCode + ".");
                                // Mark running as false so that the poll immediately ends and runs the close logic
                                this.closeError = new HttpError(response.statusText || "", response.statusCode);
                                this.running = false;
                            }
                            else {
                                this.running = true;
                            }
                            this.receiving = this.poll(this.url, pollOptions);
                            return [2 /*return*/];
                    }
                });
            });
        };
        LongPollingTransport.prototype.getAccessToken = function () {
            return __awaiter$3(this, void 0, void 0, function () {
                return __generator$3(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.accessTokenFactory) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.accessTokenFactory()];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2: return [2 /*return*/, null];
                    }
                });
            });
        };
        LongPollingTransport.prototype.updateHeaderToken = function (request, token) {
            if (!request.headers) {
                request.headers = {};
            }
            if (token) {
                // tslint:disable-next-line:no-string-literal
                request.headers["Authorization"] = "Bearer " + token;
                return;
            }
            // tslint:disable-next-line:no-string-literal
            if (request.headers["Authorization"]) {
                // tslint:disable-next-line:no-string-literal
                delete request.headers["Authorization"];
            }
        };
        LongPollingTransport.prototype.poll = function (url, pollOptions) {
            return __awaiter$3(this, void 0, void 0, function () {
                var token, pollUrl, response, e_1;
                return __generator$3(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, , 8, 9]);
                            _a.label = 1;
                        case 1:
                            if (!this.running) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.getAccessToken()];
                        case 2:
                            token = _a.sent();
                            this.updateHeaderToken(pollOptions, token);
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            pollUrl = url + "&_=" + Date.now();
                            this.logger.log(LogLevel$1.Trace, "(LongPolling transport) polling: " + pollUrl + ".");
                            return [4 /*yield*/, this.httpClient.get(pollUrl, pollOptions)];
                        case 4:
                            response = _a.sent();
                            if (response.statusCode === 204) {
                                this.logger.log(LogLevel$1.Information, "(LongPolling transport) Poll terminated by server.");
                                this.running = false;
                            }
                            else if (response.statusCode !== 200) {
                                this.logger.log(LogLevel$1.Error, "(LongPolling transport) Unexpected response code: " + response.statusCode + ".");
                                // Unexpected status code
                                this.closeError = new HttpError(response.statusText || "", response.statusCode);
                                this.running = false;
                            }
                            else {
                                // Process the response
                                if (response.content) {
                                    this.logger.log(LogLevel$1.Trace, "(LongPolling transport) data received. " + getDataDetail(response.content, this.logMessageContent) + ".");
                                    if (this.onreceive) {
                                        this.onreceive(response.content);
                                    }
                                }
                                else {
                                    // This is another way timeout manifest.
                                    this.logger.log(LogLevel$1.Trace, "(LongPolling transport) Poll timed out, reissuing.");
                                }
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            e_1 = _a.sent();
                            if (!this.running) {
                                // Log but disregard errors that occur after stopping
                                this.logger.log(LogLevel$1.Trace, "(LongPolling transport) Poll errored after shutdown: " + e_1.message);
                            }
                            else {
                                if (e_1 instanceof TimeoutError) {
                                    // Ignore timeouts and reissue the poll.
                                    this.logger.log(LogLevel$1.Trace, "(LongPolling transport) Poll timed out, reissuing.");
                                }
                                else {
                                    // Close the connection with the error as the result.
                                    this.closeError = e_1;
                                    this.running = false;
                                }
                            }
                            return [3 /*break*/, 6];
                        case 6: return [3 /*break*/, 1];
                        case 7: return [3 /*break*/, 9];
                        case 8:
                            this.logger.log(LogLevel$1.Trace, "(LongPolling transport) Polling complete.");
                            // We will reach here with pollAborted==false when the server returned a response causing the transport to stop.
                            // If pollAborted==true then client initiated the stop and the stop method will raise the close event after DELETE is sent.
                            if (!this.pollAborted) {
                                this.raiseOnClose();
                            }
                            return [7 /*endfinally*/];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        LongPollingTransport.prototype.send = function (data) {
            return __awaiter$3(this, void 0, void 0, function () {
                return __generator$3(this, function (_a) {
                    if (!this.running) {
                        return [2 /*return*/, Promise.reject(new Error("Cannot send until the transport is connected"))];
                    }
                    return [2 /*return*/, sendMessage(this.logger, "LongPolling", this.httpClient, this.url, this.accessTokenFactory, data, this.logMessageContent, this.withCredentials, this.headers)];
                });
            });
        };
        LongPollingTransport.prototype.stop = function () {
            return __awaiter$3(this, void 0, void 0, function () {
                var headers, _a, name_1, value, deleteOptions, token;
                return __generator$3(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.logger.log(LogLevel$1.Trace, "(LongPolling transport) Stopping polling.");
                            // Tell receiving loop to stop, abort any current request, and then wait for it to finish
                            this.running = false;
                            this.pollAbort.abort();
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, , 5, 6]);
                            return [4 /*yield*/, this.receiving];
                        case 2:
                            _b.sent();
                            // Send DELETE to clean up long polling on the server
                            this.logger.log(LogLevel$1.Trace, "(LongPolling transport) sending DELETE request to " + this.url + ".");
                            headers = {};
                            _a = getUserAgentHeader(), name_1 = _a[0], value = _a[1];
                            headers[name_1] = value;
                            deleteOptions = {
                                headers: __assign$4({}, headers, this.headers),
                                withCredentials: this.withCredentials,
                            };
                            return [4 /*yield*/, this.getAccessToken()];
                        case 3:
                            token = _b.sent();
                            this.updateHeaderToken(deleteOptions, token);
                            return [4 /*yield*/, this.httpClient.delete(this.url, deleteOptions)];
                        case 4:
                            _b.sent();
                            this.logger.log(LogLevel$1.Trace, "(LongPolling transport) DELETE request sent.");
                            return [3 /*break*/, 6];
                        case 5:
                            this.logger.log(LogLevel$1.Trace, "(LongPolling transport) Stop finished.");
                            // Raise close event here instead of in polling
                            // It needs to happen after the DELETE request is sent
                            this.raiseOnClose();
                            return [7 /*endfinally*/];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        LongPollingTransport.prototype.raiseOnClose = function () {
            if (this.onclose) {
                var logMessage = "(LongPolling transport) Firing onclose event.";
                if (this.closeError) {
                    logMessage += " Error: " + this.closeError;
                }
                this.logger.log(LogLevel$1.Trace, logMessage);
                this.onclose(this.closeError);
            }
        };
        return LongPollingTransport;
    }());

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    var __assign$3 = (undefined && undefined.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$2 = (undefined && undefined.__generator) || function (thisArg, body) {
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
    /** @private */
    var ServerSentEventsTransport = /** @class */ (function () {
        function ServerSentEventsTransport(httpClient, accessTokenFactory, logger, logMessageContent, eventSourceConstructor, withCredentials, headers) {
            this.httpClient = httpClient;
            this.accessTokenFactory = accessTokenFactory;
            this.logger = logger;
            this.logMessageContent = logMessageContent;
            this.withCredentials = withCredentials;
            this.eventSourceConstructor = eventSourceConstructor;
            this.headers = headers;
            this.onreceive = null;
            this.onclose = null;
        }
        ServerSentEventsTransport.prototype.connect = function (url, transferFormat) {
            return __awaiter$2(this, void 0, void 0, function () {
                var token;
                var _this = this;
                return __generator$2(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            Arg.isRequired(url, "url");
                            Arg.isRequired(transferFormat, "transferFormat");
                            Arg.isIn(transferFormat, TransferFormat, "transferFormat");
                            this.logger.log(LogLevel$1.Trace, "(SSE transport) Connecting.");
                            // set url before accessTokenFactory because this.url is only for send and we set the auth header instead of the query string for send
                            this.url = url;
                            if (!this.accessTokenFactory) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.accessTokenFactory()];
                        case 1:
                            token = _a.sent();
                            if (token) {
                                url += (url.indexOf("?") < 0 ? "?" : "&") + ("access_token=" + encodeURIComponent(token));
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                                var opened = false;
                                if (transferFormat !== TransferFormat.Text) {
                                    reject(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
                                    return;
                                }
                                var eventSource;
                                if (Platform.isBrowser || Platform.isWebWorker) {
                                    eventSource = new _this.eventSourceConstructor(url, { withCredentials: _this.withCredentials });
                                }
                                else {
                                    // Non-browser passes cookies via the dictionary
                                    var cookies = _this.httpClient.getCookieString(url);
                                    var headers = {};
                                    headers.Cookie = cookies;
                                    var _a = getUserAgentHeader(), name_1 = _a[0], value = _a[1];
                                    headers[name_1] = value;
                                    eventSource = new _this.eventSourceConstructor(url, { withCredentials: _this.withCredentials, headers: __assign$3({}, headers, _this.headers) });
                                }
                                try {
                                    eventSource.onmessage = function (e) {
                                        if (_this.onreceive) {
                                            try {
                                                _this.logger.log(LogLevel$1.Trace, "(SSE transport) data received. " + getDataDetail(e.data, _this.logMessageContent) + ".");
                                                _this.onreceive(e.data);
                                            }
                                            catch (error) {
                                                _this.close(error);
                                                return;
                                            }
                                        }
                                    };
                                    eventSource.onerror = function (e) {
                                        var error = new Error(e.data || "Error occurred");
                                        if (opened) {
                                            _this.close(error);
                                        }
                                        else {
                                            reject(error);
                                        }
                                    };
                                    eventSource.onopen = function () {
                                        _this.logger.log(LogLevel$1.Information, "SSE connected to " + _this.url);
                                        _this.eventSource = eventSource;
                                        opened = true;
                                        resolve();
                                    };
                                }
                                catch (e) {
                                    reject(e);
                                    return;
                                }
                            })];
                    }
                });
            });
        };
        ServerSentEventsTransport.prototype.send = function (data) {
            return __awaiter$2(this, void 0, void 0, function () {
                return __generator$2(this, function (_a) {
                    if (!this.eventSource) {
                        return [2 /*return*/, Promise.reject(new Error("Cannot send until the transport is connected"))];
                    }
                    return [2 /*return*/, sendMessage(this.logger, "SSE", this.httpClient, this.url, this.accessTokenFactory, data, this.logMessageContent, this.withCredentials, this.headers)];
                });
            });
        };
        ServerSentEventsTransport.prototype.stop = function () {
            this.close();
            return Promise.resolve();
        };
        ServerSentEventsTransport.prototype.close = function (e) {
            if (this.eventSource) {
                this.eventSource.close();
                this.eventSource = undefined;
                if (this.onclose) {
                    this.onclose(e);
                }
            }
        };
        return ServerSentEventsTransport;
    }());

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    var __assign$2 = (undefined && undefined.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
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
    /** @private */
    var WebSocketTransport = /** @class */ (function () {
        function WebSocketTransport(httpClient, accessTokenFactory, logger, logMessageContent, webSocketConstructor, headers) {
            this.logger = logger;
            this.accessTokenFactory = accessTokenFactory;
            this.logMessageContent = logMessageContent;
            this.webSocketConstructor = webSocketConstructor;
            this.httpClient = httpClient;
            this.onreceive = null;
            this.onclose = null;
            this.headers = headers;
        }
        WebSocketTransport.prototype.connect = function (url, transferFormat) {
            return __awaiter$1(this, void 0, void 0, function () {
                var token;
                var _this = this;
                return __generator$1(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            Arg.isRequired(url, "url");
                            Arg.isRequired(transferFormat, "transferFormat");
                            Arg.isIn(transferFormat, TransferFormat, "transferFormat");
                            this.logger.log(LogLevel$1.Trace, "(WebSockets transport) Connecting.");
                            if (!this.accessTokenFactory) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.accessTokenFactory()];
                        case 1:
                            token = _a.sent();
                            if (token) {
                                url += (url.indexOf("?") < 0 ? "?" : "&") + ("access_token=" + encodeURIComponent(token));
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                                url = url.replace(/^http/, "ws");
                                var webSocket;
                                var cookies = _this.httpClient.getCookieString(url);
                                var opened = false;
                                if (Platform.isNode) {
                                    var headers = {};
                                    var _a = getUserAgentHeader(), name_1 = _a[0], value = _a[1];
                                    headers[name_1] = value;
                                    if (cookies) {
                                        headers["Cookie"] = "" + cookies;
                                    }
                                    // Only pass headers when in non-browser environments
                                    webSocket = new _this.webSocketConstructor(url, undefined, {
                                        headers: __assign$2({}, headers, _this.headers),
                                    });
                                }
                                if (!webSocket) {
                                    // Chrome is not happy with passing 'undefined' as protocol
                                    webSocket = new _this.webSocketConstructor(url);
                                }
                                if (transferFormat === TransferFormat.Binary) {
                                    webSocket.binaryType = "arraybuffer";
                                }
                                // tslint:disable-next-line:variable-name
                                webSocket.onopen = function (_event) {
                                    _this.logger.log(LogLevel$1.Information, "WebSocket connected to " + url + ".");
                                    _this.webSocket = webSocket;
                                    opened = true;
                                    resolve();
                                };
                                webSocket.onerror = function (event) {
                                    var error = null;
                                    // ErrorEvent is a browser only type we need to check if the type exists before using it
                                    if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
                                        error = event.error;
                                    }
                                    else {
                                        error = new Error("There was an error with the transport.");
                                    }
                                    reject(error);
                                };
                                webSocket.onmessage = function (message) {
                                    _this.logger.log(LogLevel$1.Trace, "(WebSockets transport) data received. " + getDataDetail(message.data, _this.logMessageContent) + ".");
                                    if (_this.onreceive) {
                                        try {
                                            _this.onreceive(message.data);
                                        }
                                        catch (error) {
                                            _this.close(error);
                                            return;
                                        }
                                    }
                                };
                                webSocket.onclose = function (event) {
                                    // Don't call close handler if connection was never established
                                    // We'll reject the connect call instead
                                    if (opened) {
                                        _this.close(event);
                                    }
                                    else {
                                        var error = null;
                                        // ErrorEvent is a browser only type we need to check if the type exists before using it
                                        if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
                                            error = event.error;
                                        }
                                        else {
                                            error = new Error("There was an error with the transport.");
                                        }
                                        reject(error);
                                    }
                                };
                            })];
                    }
                });
            });
        };
        WebSocketTransport.prototype.send = function (data) {
            if (this.webSocket && this.webSocket.readyState === this.webSocketConstructor.OPEN) {
                this.logger.log(LogLevel$1.Trace, "(WebSockets transport) sending data. " + getDataDetail(data, this.logMessageContent) + ".");
                this.webSocket.send(data);
                return Promise.resolve();
            }
            return Promise.reject("WebSocket is not in the OPEN state");
        };
        WebSocketTransport.prototype.stop = function () {
            if (this.webSocket) {
                // Manually invoke onclose callback inline so we know the HttpConnection was closed properly before returning
                // This also solves an issue where websocket.onclose could take 18+ seconds to trigger during network disconnects
                this.close(undefined);
            }
            return Promise.resolve();
        };
        WebSocketTransport.prototype.close = function (event) {
            // webSocket will be null if the transport did not start successfully
            if (this.webSocket) {
                // Clear websocket handlers because we are considering the socket closed now
                this.webSocket.onclose = function () { };
                this.webSocket.onmessage = function () { };
                this.webSocket.onerror = function () { };
                this.webSocket.close();
                this.webSocket = undefined;
            }
            this.logger.log(LogLevel$1.Trace, "(WebSockets transport) socket closed.");
            if (this.onclose) {
                if (this.isCloseEvent(event) && (event.wasClean === false || event.code !== 1000)) {
                    this.onclose(new Error("WebSocket closed with status code: " + event.code + " (" + event.reason + ")."));
                }
                else if (event instanceof Error) {
                    this.onclose(event);
                }
                else {
                    this.onclose();
                }
            }
        };
        WebSocketTransport.prototype.isCloseEvent = function (event) {
            return event && typeof event.wasClean === "boolean" && typeof event.code === "number";
        };
        return WebSocketTransport;
    }());

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    var __assign$1 = (undefined && undefined.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
    var MAX_REDIRECTS = 100;
    /** @private */
    var HttpConnection = /** @class */ (function () {
        function HttpConnection(url, options) {
            if (options === void 0) { options = {}; }
            this.stopPromiseResolver = function () { };
            this.features = {};
            this.negotiateVersion = 1;
            Arg.isRequired(url, "url");
            this.logger = createLogger(options.logger);
            this.baseUrl = this.resolveUrl(url);
            options = options || {};
            options.logMessageContent = options.logMessageContent === undefined ? false : options.logMessageContent;
            if (typeof options.withCredentials === "boolean" || options.withCredentials === undefined) {
                options.withCredentials = options.withCredentials === undefined ? true : options.withCredentials;
            }
            else {
                throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");
            }
            var webSocketModule = null;
            var eventSourceModule = null;
            if (Platform.isNode && typeof require !== "undefined") {
                // In order to ignore the dynamic require in webpack builds we need to do this magic
                // @ts-ignore: TS doesn't know about these names
                var requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
                webSocketModule = requireFunc("ws");
                eventSourceModule = requireFunc("eventsource");
            }
            if (!Platform.isNode && typeof WebSocket !== "undefined" && !options.WebSocket) {
                options.WebSocket = WebSocket;
            }
            else if (Platform.isNode && !options.WebSocket) {
                if (webSocketModule) {
                    options.WebSocket = webSocketModule;
                }
            }
            if (!Platform.isNode && typeof EventSource !== "undefined" && !options.EventSource) {
                options.EventSource = EventSource;
            }
            else if (Platform.isNode && !options.EventSource) {
                if (typeof eventSourceModule !== "undefined") {
                    options.EventSource = eventSourceModule;
                }
            }
            this.httpClient = options.httpClient || new DefaultHttpClient(this.logger);
            this.connectionState = "Disconnected" /* Disconnected */;
            this.connectionStarted = false;
            this.options = options;
            this.onreceive = null;
            this.onclose = null;
        }
        HttpConnection.prototype.start = function (transferFormat) {
            return __awaiter(this, void 0, void 0, function () {
                var message, message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            transferFormat = transferFormat || TransferFormat.Binary;
                            Arg.isIn(transferFormat, TransferFormat, "transferFormat");
                            this.logger.log(LogLevel$1.Debug, "Starting connection with transfer format '" + TransferFormat[transferFormat] + "'.");
                            if (this.connectionState !== "Disconnected" /* Disconnected */) {
                                return [2 /*return*/, Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."))];
                            }
                            this.connectionState = "Connecting" /* Connecting */;
                            this.startInternalPromise = this.startInternal(transferFormat);
                            return [4 /*yield*/, this.startInternalPromise];
                        case 1:
                            _a.sent();
                            if (!(this.connectionState === "Disconnecting" /* Disconnecting */)) return [3 /*break*/, 3];
                            message = "Failed to start the HttpConnection before stop() was called.";
                            this.logger.log(LogLevel$1.Error, message);
                            // We cannot await stopPromise inside startInternal since stopInternal awaits the startInternalPromise.
                            return [4 /*yield*/, this.stopPromise];
                        case 2:
                            // We cannot await stopPromise inside startInternal since stopInternal awaits the startInternalPromise.
                            _a.sent();
                            return [2 /*return*/, Promise.reject(new Error(message))];
                        case 3:
                            if (this.connectionState !== "Connected" /* Connected */) {
                                message = "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
                                this.logger.log(LogLevel$1.Error, message);
                                return [2 /*return*/, Promise.reject(new Error(message))];
                            }
                            _a.label = 4;
                        case 4:
                            this.connectionStarted = true;
                            return [2 /*return*/];
                    }
                });
            });
        };
        HttpConnection.prototype.send = function (data) {
            if (this.connectionState !== "Connected" /* Connected */) {
                return Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State."));
            }
            if (!this.sendQueue) {
                this.sendQueue = new TransportSendQueue(this.transport);
            }
            // Transport will not be null if state is connected
            return this.sendQueue.send(data);
        };
        HttpConnection.prototype.stop = function (error) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.connectionState === "Disconnected" /* Disconnected */) {
                                this.logger.log(LogLevel$1.Debug, "Call to HttpConnection.stop(" + error + ") ignored because the connection is already in the disconnected state.");
                                return [2 /*return*/, Promise.resolve()];
                            }
                            if (this.connectionState === "Disconnecting" /* Disconnecting */) {
                                this.logger.log(LogLevel$1.Debug, "Call to HttpConnection.stop(" + error + ") ignored because the connection is already in the disconnecting state.");
                                return [2 /*return*/, this.stopPromise];
                            }
                            this.connectionState = "Disconnecting" /* Disconnecting */;
                            this.stopPromise = new Promise(function (resolve) {
                                // Don't complete stop() until stopConnection() completes.
                                _this.stopPromiseResolver = resolve;
                            });
                            // stopInternal should never throw so just observe it.
                            return [4 /*yield*/, this.stopInternal(error)];
                        case 1:
                            // stopInternal should never throw so just observe it.
                            _a.sent();
                            return [4 /*yield*/, this.stopPromise];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        HttpConnection.prototype.stopInternal = function (error) {
            return __awaiter(this, void 0, void 0, function () {
                var e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Set error as soon as possible otherwise there is a race between
                            // the transport closing and providing an error and the error from a close message
                            // We would prefer the close message error.
                            this.stopError = error;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.startInternalPromise];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 4:
                            if (!this.transport) return [3 /*break*/, 9];
                            _a.label = 5;
                        case 5:
                            _a.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, this.transport.stop()];
                        case 6:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            e_2 = _a.sent();
                            this.logger.log(LogLevel$1.Error, "HttpConnection.transport.stop() threw error '" + e_2 + "'.");
                            this.stopConnection();
                            return [3 /*break*/, 8];
                        case 8:
                            this.transport = undefined;
                            return [3 /*break*/, 10];
                        case 9:
                            this.logger.log(LogLevel$1.Debug, "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.");
                            _a.label = 10;
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        HttpConnection.prototype.startInternal = function (transferFormat) {
            return __awaiter(this, void 0, void 0, function () {
                var url, negotiateResponse, redirects, _loop_1, this_1, e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = this.baseUrl;
                            this.accessTokenFactory = this.options.accessTokenFactory;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 12, , 13]);
                            if (!this.options.skipNegotiation) return [3 /*break*/, 5];
                            if (!(this.options.transport === HttpTransportType.WebSockets)) return [3 /*break*/, 3];
                            // No need to add a connection ID in this case
                            this.transport = this.constructTransport(HttpTransportType.WebSockets);
                            // We should just call connect directly in this case.
                            // No fallback or negotiate in this case.
                            return [4 /*yield*/, this.startTransport(url, transferFormat)];
                        case 2:
                            // We should just call connect directly in this case.
                            // No fallback or negotiate in this case.
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3: throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");
                        case 4: return [3 /*break*/, 11];
                        case 5:
                            negotiateResponse = null;
                            redirects = 0;
                            _loop_1 = function () {
                                var accessToken_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this_1.getNegotiationResponse(url)];
                                        case 1:
                                            negotiateResponse = _a.sent();
                                            // the user tries to stop the connection when it is being started
                                            if (this_1.connectionState === "Disconnecting" /* Disconnecting */ || this_1.connectionState === "Disconnected" /* Disconnected */) {
                                                throw new Error("The connection was stopped during negotiation.");
                                            }
                                            if (negotiateResponse.error) {
                                                throw new Error(negotiateResponse.error);
                                            }
                                            if (negotiateResponse.ProtocolVersion) {
                                                throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");
                                            }
                                            if (negotiateResponse.url) {
                                                url = negotiateResponse.url;
                                            }
                                            if (negotiateResponse.accessToken) {
                                                accessToken_1 = negotiateResponse.accessToken;
                                                this_1.accessTokenFactory = function () { return accessToken_1; };
                                            }
                                            redirects++;
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            _a.label = 6;
                        case 6: return [5 /*yield**/, _loop_1()];
                        case 7:
                            _a.sent();
                            _a.label = 8;
                        case 8:
                            if (negotiateResponse.url && redirects < MAX_REDIRECTS) return [3 /*break*/, 6];
                            _a.label = 9;
                        case 9:
                            if (redirects === MAX_REDIRECTS && negotiateResponse.url) {
                                throw new Error("Negotiate redirection limit exceeded.");
                            }
                            return [4 /*yield*/, this.createTransport(url, this.options.transport, negotiateResponse, transferFormat)];
                        case 10:
                            _a.sent();
                            _a.label = 11;
                        case 11:
                            if (this.transport instanceof LongPollingTransport) {
                                this.features.inherentKeepAlive = true;
                            }
                            if (this.connectionState === "Connecting" /* Connecting */) {
                                // Ensure the connection transitions to the connected state prior to completing this.startInternalPromise.
                                // start() will handle the case when stop was called and startInternal exits still in the disconnecting state.
                                this.logger.log(LogLevel$1.Debug, "The HttpConnection connected successfully.");
                                this.connectionState = "Connected" /* Connected */;
                            }
                            return [3 /*break*/, 13];
                        case 12:
                            e_3 = _a.sent();
                            this.logger.log(LogLevel$1.Error, "Failed to start the connection: " + e_3);
                            this.connectionState = "Disconnected" /* Disconnected */;
                            this.transport = undefined;
                            // if start fails, any active calls to stop assume that start will complete the stop promise
                            this.stopPromiseResolver();
                            return [2 /*return*/, Promise.reject(e_3)];
                        case 13: return [2 /*return*/];
                    }
                });
            });
        };
        HttpConnection.prototype.getNegotiationResponse = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                var headers, token, _a, name, value, negotiateUrl, response, negotiateResponse, e_4;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            headers = {};
                            if (!this.accessTokenFactory) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.accessTokenFactory()];
                        case 1:
                            token = _b.sent();
                            if (token) {
                                headers["Authorization"] = "Bearer " + token;
                            }
                            _b.label = 2;
                        case 2:
                            _a = getUserAgentHeader(), name = _a[0], value = _a[1];
                            headers[name] = value;
                            negotiateUrl = this.resolveNegotiateUrl(url);
                            this.logger.log(LogLevel$1.Debug, "Sending negotiation request: " + negotiateUrl + ".");
                            _b.label = 3;
                        case 3:
                            _b.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.httpClient.post(negotiateUrl, {
                                    content: "",
                                    headers: __assign$1({}, headers, this.options.headers),
                                    withCredentials: this.options.withCredentials,
                                })];
                        case 4:
                            response = _b.sent();
                            if (response.statusCode !== 200) {
                                return [2 /*return*/, Promise.reject(new Error("Unexpected status code returned from negotiate '" + response.statusCode + "'"))];
                            }
                            negotiateResponse = JSON.parse(response.content);
                            if (!negotiateResponse.negotiateVersion || negotiateResponse.negotiateVersion < 1) {
                                // Negotiate version 0 doesn't use connectionToken
                                // So we set it equal to connectionId so all our logic can use connectionToken without being aware of the negotiate version
                                negotiateResponse.connectionToken = negotiateResponse.connectionId;
                            }
                            return [2 /*return*/, negotiateResponse];
                        case 5:
                            e_4 = _b.sent();
                            this.logger.log(LogLevel$1.Error, "Failed to complete negotiation with the server: " + e_4);
                            return [2 /*return*/, Promise.reject(e_4)];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        HttpConnection.prototype.createConnectUrl = function (url, connectionToken) {
            if (!connectionToken) {
                return url;
            }
            return url + (url.indexOf("?") === -1 ? "?" : "&") + ("id=" + connectionToken);
        };
        HttpConnection.prototype.createTransport = function (url, requestedTransport, negotiateResponse, requestedTransferFormat) {
            return __awaiter(this, void 0, void 0, function () {
                var connectUrl, transportExceptions, transports, negotiate, _i, transports_1, endpoint, transportOrError, ex_1, ex_2, message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            connectUrl = this.createConnectUrl(url, negotiateResponse.connectionToken);
                            if (!this.isITransport(requestedTransport)) return [3 /*break*/, 2];
                            this.logger.log(LogLevel$1.Debug, "Connection was provided an instance of ITransport, using that directly.");
                            this.transport = requestedTransport;
                            return [4 /*yield*/, this.startTransport(connectUrl, requestedTransferFormat)];
                        case 1:
                            _a.sent();
                            this.connectionId = negotiateResponse.connectionId;
                            return [2 /*return*/];
                        case 2:
                            transportExceptions = [];
                            transports = negotiateResponse.availableTransports || [];
                            negotiate = negotiateResponse;
                            _i = 0, transports_1 = transports;
                            _a.label = 3;
                        case 3:
                            if (!(_i < transports_1.length)) return [3 /*break*/, 13];
                            endpoint = transports_1[_i];
                            transportOrError = this.resolveTransportOrError(endpoint, requestedTransport, requestedTransferFormat);
                            if (!(transportOrError instanceof Error)) return [3 /*break*/, 4];
                            // Store the error and continue, we don't want to cause a re-negotiate in these cases
                            transportExceptions.push(endpoint.transport + " failed: " + transportOrError);
                            return [3 /*break*/, 12];
                        case 4:
                            if (!this.isITransport(transportOrError)) return [3 /*break*/, 12];
                            this.transport = transportOrError;
                            if (!!negotiate) return [3 /*break*/, 9];
                            _a.label = 5;
                        case 5:
                            _a.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, this.getNegotiationResponse(url)];
                        case 6:
                            negotiate = _a.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            ex_1 = _a.sent();
                            return [2 /*return*/, Promise.reject(ex_1)];
                        case 8:
                            connectUrl = this.createConnectUrl(url, negotiate.connectionToken);
                            _a.label = 9;
                        case 9:
                            _a.trys.push([9, 11, , 12]);
                            return [4 /*yield*/, this.startTransport(connectUrl, requestedTransferFormat)];
                        case 10:
                            _a.sent();
                            this.connectionId = negotiate.connectionId;
                            return [2 /*return*/];
                        case 11:
                            ex_2 = _a.sent();
                            this.logger.log(LogLevel$1.Error, "Failed to start the transport '" + endpoint.transport + "': " + ex_2);
                            negotiate = undefined;
                            transportExceptions.push(endpoint.transport + " failed: " + ex_2);
                            if (this.connectionState !== "Connecting" /* Connecting */) {
                                message = "Failed to select transport before stop() was called.";
                                this.logger.log(LogLevel$1.Debug, message);
                                return [2 /*return*/, Promise.reject(new Error(message))];
                            }
                            return [3 /*break*/, 12];
                        case 12:
                            _i++;
                            return [3 /*break*/, 3];
                        case 13:
                            if (transportExceptions.length > 0) {
                                return [2 /*return*/, Promise.reject(new Error("Unable to connect to the server with any of the available transports. " + transportExceptions.join(" ")))];
                            }
                            return [2 /*return*/, Promise.reject(new Error("None of the transports supported by the client are supported by the server."))];
                    }
                });
            });
        };
        HttpConnection.prototype.constructTransport = function (transport) {
            switch (transport) {
                case HttpTransportType.WebSockets:
                    if (!this.options.WebSocket) {
                        throw new Error("'WebSocket' is not supported in your environment.");
                    }
                    return new WebSocketTransport(this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || false, this.options.WebSocket, this.options.headers || {});
                case HttpTransportType.ServerSentEvents:
                    if (!this.options.EventSource) {
                        throw new Error("'EventSource' is not supported in your environment.");
                    }
                    return new ServerSentEventsTransport(this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || false, this.options.EventSource, this.options.withCredentials, this.options.headers || {});
                case HttpTransportType.LongPolling:
                    return new LongPollingTransport(this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || false, this.options.withCredentials, this.options.headers || {});
                default:
                    throw new Error("Unknown transport: " + transport + ".");
            }
        };
        HttpConnection.prototype.startTransport = function (url, transferFormat) {
            var _this = this;
            this.transport.onreceive = this.onreceive;
            this.transport.onclose = function (e) { return _this.stopConnection(e); };
            return this.transport.connect(url, transferFormat);
        };
        HttpConnection.prototype.resolveTransportOrError = function (endpoint, requestedTransport, requestedTransferFormat) {
            var transport = HttpTransportType[endpoint.transport];
            if (transport === null || transport === undefined) {
                this.logger.log(LogLevel$1.Debug, "Skipping transport '" + endpoint.transport + "' because it is not supported by this client.");
                return new Error("Skipping transport '" + endpoint.transport + "' because it is not supported by this client.");
            }
            else {
                if (transportMatches(requestedTransport, transport)) {
                    var transferFormats = endpoint.transferFormats.map(function (s) { return TransferFormat[s]; });
                    if (transferFormats.indexOf(requestedTransferFormat) >= 0) {
                        if ((transport === HttpTransportType.WebSockets && !this.options.WebSocket) ||
                            (transport === HttpTransportType.ServerSentEvents && !this.options.EventSource)) {
                            this.logger.log(LogLevel$1.Debug, "Skipping transport '" + HttpTransportType[transport] + "' because it is not supported in your environment.'");
                            return new Error("'" + HttpTransportType[transport] + "' is not supported in your environment.");
                        }
                        else {
                            this.logger.log(LogLevel$1.Debug, "Selecting transport '" + HttpTransportType[transport] + "'.");
                            try {
                                return this.constructTransport(transport);
                            }
                            catch (ex) {
                                return ex;
                            }
                        }
                    }
                    else {
                        this.logger.log(LogLevel$1.Debug, "Skipping transport '" + HttpTransportType[transport] + "' because it does not support the requested transfer format '" + TransferFormat[requestedTransferFormat] + "'.");
                        return new Error("'" + HttpTransportType[transport] + "' does not support " + TransferFormat[requestedTransferFormat] + ".");
                    }
                }
                else {
                    this.logger.log(LogLevel$1.Debug, "Skipping transport '" + HttpTransportType[transport] + "' because it was disabled by the client.");
                    return new Error("'" + HttpTransportType[transport] + "' is disabled by the client.");
                }
            }
        };
        HttpConnection.prototype.isITransport = function (transport) {
            return transport && typeof (transport) === "object" && "connect" in transport;
        };
        HttpConnection.prototype.stopConnection = function (error) {
            var _this = this;
            this.logger.log(LogLevel$1.Debug, "HttpConnection.stopConnection(" + error + ") called while in state " + this.connectionState + ".");
            this.transport = undefined;
            // If we have a stopError, it takes precedence over the error from the transport
            error = this.stopError || error;
            this.stopError = undefined;
            if (this.connectionState === "Disconnected" /* Disconnected */) {
                this.logger.log(LogLevel$1.Debug, "Call to HttpConnection.stopConnection(" + error + ") was ignored because the connection is already in the disconnected state.");
                return;
            }
            if (this.connectionState === "Connecting" /* Connecting */) {
                this.logger.log(LogLevel$1.Warning, "Call to HttpConnection.stopConnection(" + error + ") was ignored because the connection is still in the connecting state.");
                throw new Error("HttpConnection.stopConnection(" + error + ") was called while the connection is still in the connecting state.");
            }
            if (this.connectionState === "Disconnecting" /* Disconnecting */) {
                // A call to stop() induced this call to stopConnection and needs to be completed.
                // Any stop() awaiters will be scheduled to continue after the onclose callback fires.
                this.stopPromiseResolver();
            }
            if (error) {
                this.logger.log(LogLevel$1.Error, "Connection disconnected with error '" + error + "'.");
            }
            else {
                this.logger.log(LogLevel$1.Information, "Connection disconnected.");
            }
            if (this.sendQueue) {
                this.sendQueue.stop().catch(function (e) {
                    _this.logger.log(LogLevel$1.Error, "TransportSendQueue.stop() threw error '" + e + "'.");
                });
                this.sendQueue = undefined;
            }
            this.connectionId = undefined;
            this.connectionState = "Disconnected" /* Disconnected */;
            if (this.connectionStarted) {
                this.connectionStarted = false;
                try {
                    if (this.onclose) {
                        this.onclose(error);
                    }
                }
                catch (e) {
                    this.logger.log(LogLevel$1.Error, "HttpConnection.onclose(" + error + ") threw error '" + e + "'.");
                }
            }
        };
        HttpConnection.prototype.resolveUrl = function (url) {
            // startsWith is not supported in IE
            if (url.lastIndexOf("https://", 0) === 0 || url.lastIndexOf("http://", 0) === 0) {
                return url;
            }
            if (!Platform.isBrowser || !window.document) {
                throw new Error("Cannot resolve '" + url + "'.");
            }
            // Setting the url to the href propery of an anchor tag handles normalization
            // for us. There are 3 main cases.
            // 1. Relative path normalization e.g "b" -> "http://localhost:5000/a/b"
            // 2. Absolute path normalization e.g "/a/b" -> "http://localhost:5000/a/b"
            // 3. Networkpath reference normalization e.g "//localhost:5000/a/b" -> "http://localhost:5000/a/b"
            var aTag = window.document.createElement("a");
            aTag.href = url;
            this.logger.log(LogLevel$1.Information, "Normalizing '" + url + "' to '" + aTag.href + "'.");
            return aTag.href;
        };
        HttpConnection.prototype.resolveNegotiateUrl = function (url) {
            var index = url.indexOf("?");
            var negotiateUrl = url.substring(0, index === -1 ? url.length : index);
            if (negotiateUrl[negotiateUrl.length - 1] !== "/") {
                negotiateUrl += "/";
            }
            negotiateUrl += "negotiate";
            negotiateUrl += index === -1 ? "" : url.substring(index);
            if (negotiateUrl.indexOf("negotiateVersion") === -1) {
                negotiateUrl += index === -1 ? "?" : "&";
                negotiateUrl += "negotiateVersion=" + this.negotiateVersion;
            }
            return negotiateUrl;
        };
        return HttpConnection;
    }());
    function transportMatches(requestedTransport, actualTransport) {
        return !requestedTransport || ((actualTransport & requestedTransport) !== 0);
    }
    /** @private */
    var TransportSendQueue = /** @class */ (function () {
        function TransportSendQueue(transport) {
            this.transport = transport;
            this.buffer = [];
            this.executing = true;
            this.sendBufferedData = new PromiseSource();
            this.transportResult = new PromiseSource();
            this.sendLoopPromise = this.sendLoop();
        }
        TransportSendQueue.prototype.send = function (data) {
            this.bufferData(data);
            if (!this.transportResult) {
                this.transportResult = new PromiseSource();
            }
            return this.transportResult.promise;
        };
        TransportSendQueue.prototype.stop = function () {
            this.executing = false;
            this.sendBufferedData.resolve();
            return this.sendLoopPromise;
        };
        TransportSendQueue.prototype.bufferData = function (data) {
            if (this.buffer.length && typeof (this.buffer[0]) !== typeof (data)) {
                throw new Error("Expected data to be of type " + typeof (this.buffer) + " but was of type " + typeof (data));
            }
            this.buffer.push(data);
            this.sendBufferedData.resolve();
        };
        TransportSendQueue.prototype.sendLoop = function () {
            return __awaiter(this, void 0, void 0, function () {
                var transportResult, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.sendBufferedData.promise];
                        case 1:
                            _a.sent();
                            if (!this.executing) {
                                if (this.transportResult) {
                                    this.transportResult.reject("Connection stopped.");
                                }
                                return [3 /*break*/, 6];
                            }
                            this.sendBufferedData = new PromiseSource();
                            transportResult = this.transportResult;
                            this.transportResult = undefined;
                            data = typeof (this.buffer[0]) === "string" ?
                                this.buffer.join("") :
                                TransportSendQueue.concatBuffers(this.buffer);
                            this.buffer.length = 0;
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.transport.send(data)];
                        case 3:
                            _a.sent();
                            transportResult.resolve();
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            transportResult.reject(error_1);
                            return [3 /*break*/, 5];
                        case 5: return [3 /*break*/, 0];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        TransportSendQueue.concatBuffers = function (arrayBuffers) {
            var totalLength = arrayBuffers.map(function (b) { return b.byteLength; }).reduce(function (a, b) { return a + b; });
            var result = new Uint8Array(totalLength);
            var offset = 0;
            for (var _i = 0, arrayBuffers_1 = arrayBuffers; _i < arrayBuffers_1.length; _i++) {
                var item = arrayBuffers_1[_i];
                result.set(new Uint8Array(item), offset);
                offset += item.byteLength;
            }
            return result.buffer;
        };
        return TransportSendQueue;
    }());
    var PromiseSource = /** @class */ (function () {
        function PromiseSource() {
            var _this = this;
            this.promise = new Promise(function (resolve, reject) {
                var _a;
                return _a = [resolve, reject], _this.resolver = _a[0], _this.rejecter = _a[1], _a;
            });
        }
        PromiseSource.prototype.resolve = function () {
            this.resolver();
        };
        PromiseSource.prototype.reject = function (reason) {
            this.rejecter(reason);
        };
        return PromiseSource;
    }());

    // Copyright (c) .NET Foundation. All rights reserved.
    var JSON_HUB_PROTOCOL_NAME = "json";
    /** Implements the JSON Hub Protocol. */
    var JsonHubProtocol = /** @class */ (function () {
        function JsonHubProtocol() {
            /** @inheritDoc */
            this.name = JSON_HUB_PROTOCOL_NAME;
            /** @inheritDoc */
            this.version = 1;
            /** @inheritDoc */
            this.transferFormat = TransferFormat.Text;
        }
        /** Creates an array of {@link @microsoft/signalr.HubMessage} objects from the specified serialized representation.
         *
         * @param {string} input A string containing the serialized representation.
         * @param {ILogger} logger A logger that will be used to log messages that occur during parsing.
         */
        JsonHubProtocol.prototype.parseMessages = function (input, logger) {
            // The interface does allow "ArrayBuffer" to be passed in, but this implementation does not. So let's throw a useful error.
            if (typeof input !== "string") {
                throw new Error("Invalid input for JSON hub protocol. Expected a string.");
            }
            if (!input) {
                return [];
            }
            if (logger === null) {
                logger = NullLogger.instance;
            }
            // Parse the messages
            var messages = TextMessageFormat.parse(input);
            var hubMessages = [];
            for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                var message = messages_1[_i];
                var parsedMessage = JSON.parse(message);
                if (typeof parsedMessage.type !== "number") {
                    throw new Error("Invalid payload.");
                }
                switch (parsedMessage.type) {
                    case MessageType.Invocation:
                        this.isInvocationMessage(parsedMessage);
                        break;
                    case MessageType.StreamItem:
                        this.isStreamItemMessage(parsedMessage);
                        break;
                    case MessageType.Completion:
                        this.isCompletionMessage(parsedMessage);
                        break;
                    case MessageType.Ping:
                        // Single value, no need to validate
                        break;
                    case MessageType.Close:
                        // All optional values, no need to validate
                        break;
                    default:
                        // Future protocol changes can add message types, old clients can ignore them
                        logger.log(LogLevel$1.Information, "Unknown message type '" + parsedMessage.type + "' ignored.");
                        continue;
                }
                hubMessages.push(parsedMessage);
            }
            return hubMessages;
        };
        /** Writes the specified {@link @microsoft/signalr.HubMessage} to a string and returns it.
         *
         * @param {HubMessage} message The message to write.
         * @returns {string} A string containing the serialized representation of the message.
         */
        JsonHubProtocol.prototype.writeMessage = function (message) {
            return TextMessageFormat.write(JSON.stringify(message));
        };
        JsonHubProtocol.prototype.isInvocationMessage = function (message) {
            this.assertNotEmptyString(message.target, "Invalid payload for Invocation message.");
            if (message.invocationId !== undefined) {
                this.assertNotEmptyString(message.invocationId, "Invalid payload for Invocation message.");
            }
        };
        JsonHubProtocol.prototype.isStreamItemMessage = function (message) {
            this.assertNotEmptyString(message.invocationId, "Invalid payload for StreamItem message.");
            if (message.item === undefined) {
                throw new Error("Invalid payload for StreamItem message.");
            }
        };
        JsonHubProtocol.prototype.isCompletionMessage = function (message) {
            if (message.result && message.error) {
                throw new Error("Invalid payload for Completion message.");
            }
            if (!message.result && message.error) {
                this.assertNotEmptyString(message.error, "Invalid payload for Completion message.");
            }
            this.assertNotEmptyString(message.invocationId, "Invalid payload for Completion message.");
        };
        JsonHubProtocol.prototype.assertNotEmptyString = function (value, errorMessage) {
            if (typeof value !== "string" || value === "") {
                throw new Error(errorMessage);
            }
        };
        return JsonHubProtocol;
    }());

    // Copyright (c) .NET Foundation. All rights reserved.
    // Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
    var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    // tslint:disable:object-literal-sort-keys
    var LogLevelNameMapping = {
        trace: LogLevel$1.Trace,
        debug: LogLevel$1.Debug,
        info: LogLevel$1.Information,
        information: LogLevel$1.Information,
        warn: LogLevel$1.Warning,
        warning: LogLevel$1.Warning,
        error: LogLevel$1.Error,
        critical: LogLevel$1.Critical,
        none: LogLevel$1.None,
    };
    function parseLogLevel(name) {
        // Case-insensitive matching via lower-casing
        // Yes, I know case-folding is a complicated problem in Unicode, but we only support
        // the ASCII strings defined in LogLevelNameMapping anyway, so it's fine -anurse.
        var mapping = LogLevelNameMapping[name.toLowerCase()];
        if (typeof mapping !== "undefined") {
            return mapping;
        }
        else {
            throw new Error("Unknown log level: " + name);
        }
    }
    /** A builder for configuring {@link @microsoft/signalr.HubConnection} instances. */
    var HubConnectionBuilder = /** @class */ (function () {
        function HubConnectionBuilder() {
        }
        HubConnectionBuilder.prototype.configureLogging = function (logging) {
            Arg.isRequired(logging, "logging");
            if (isLogger(logging)) {
                this.logger = logging;
            }
            else if (typeof logging === "string") {
                var logLevel = parseLogLevel(logging);
                this.logger = new ConsoleLogger(logLevel);
            }
            else {
                this.logger = new ConsoleLogger(logging);
            }
            return this;
        };
        HubConnectionBuilder.prototype.withUrl = function (url, transportTypeOrOptions) {
            Arg.isRequired(url, "url");
            Arg.isNotEmpty(url, "url");
            this.url = url;
            // Flow-typing knows where it's at. Since HttpTransportType is a number and IHttpConnectionOptions is guaranteed
            // to be an object, we know (as does TypeScript) this comparison is all we need to figure out which overload was called.
            if (typeof transportTypeOrOptions === "object") {
                this.httpConnectionOptions = __assign({}, this.httpConnectionOptions, transportTypeOrOptions);
            }
            else {
                this.httpConnectionOptions = __assign({}, this.httpConnectionOptions, { transport: transportTypeOrOptions });
            }
            return this;
        };
        /** Configures the {@link @microsoft/signalr.HubConnection} to use the specified Hub Protocol.
         *
         * @param {IHubProtocol} protocol The {@link @microsoft/signalr.IHubProtocol} implementation to use.
         */
        HubConnectionBuilder.prototype.withHubProtocol = function (protocol) {
            Arg.isRequired(protocol, "protocol");
            this.protocol = protocol;
            return this;
        };
        HubConnectionBuilder.prototype.withAutomaticReconnect = function (retryDelaysOrReconnectPolicy) {
            if (this.reconnectPolicy) {
                throw new Error("A reconnectPolicy has already been set.");
            }
            if (!retryDelaysOrReconnectPolicy) {
                this.reconnectPolicy = new DefaultReconnectPolicy();
            }
            else if (Array.isArray(retryDelaysOrReconnectPolicy)) {
                this.reconnectPolicy = new DefaultReconnectPolicy(retryDelaysOrReconnectPolicy);
            }
            else {
                this.reconnectPolicy = retryDelaysOrReconnectPolicy;
            }
            return this;
        };
        /** Creates a {@link @microsoft/signalr.HubConnection} from the configuration options specified in this builder.
         *
         * @returns {HubConnection} The configured {@link @microsoft/signalr.HubConnection}.
         */
        HubConnectionBuilder.prototype.build = function () {
            // If httpConnectionOptions has a logger, use it. Otherwise, override it with the one
            // provided to configureLogger
            var httpConnectionOptions = this.httpConnectionOptions || {};
            // If it's 'null', the user **explicitly** asked for null, don't mess with it.
            if (httpConnectionOptions.logger === undefined) {
                // If our logger is undefined or null, that's OK, the HttpConnection constructor will handle it.
                httpConnectionOptions.logger = this.logger;
            }
            // Now create the connection
            if (!this.url) {
                throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");
            }
            var connection = new HttpConnection(this.url, httpConnectionOptions);
            return HubConnection.create(connection, this.logger || NullLogger.instance, this.protocol || new JsonHubProtocol(), this.reconnectPolicy);
        };
        return HubConnectionBuilder;
    }());
    function isLogger(logger) {
        return logger.log !== undefined;
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    function signalTransportFactory(rootUrl) {
        return __awaiter$7(this, void 0, void 0, function* () {
            let hubUrl = rootUrl;
            if (hubUrl.endsWith("/")) {
                hubUrl = `${hubUrl}kernelhub`;
            }
            else {
                hubUrl = `${hubUrl}/kernelhub`;
            }
            let connection = new HubConnectionBuilder()
                .withUrl(hubUrl)
                .withAutomaticReconnect()
                .build();
            let tokenGenerator = new TokenGenerator();
            let eventObservers = {};
            let commandHandlers = {};
            // deprecated
            connection.on("kernelEvent", (message) => {
                let eventEnvelope = JSON.parse(message);
                let keys = Object.keys(eventObservers);
                for (let key of keys) {
                    let observer = eventObservers[key];
                    observer(eventEnvelope);
                }
            });
            // deprecated
            connection.on("submitCommand", (message) => {
                let commandEnvelope = JSON.parse(message);
                let keys = Object.keys(commandHandlers);
                for (let key of keys) {
                    let observer = commandHandlers[key];
                    observer(commandEnvelope);
                }
            });
            connection.on("commandFromServer", (message) => {
                let commandEnvelope = JSON.parse(message);
                let keys = Object.keys(commandHandlers);
                for (let key of keys) {
                    let observer = commandHandlers[key];
                    observer(commandEnvelope);
                }
            });
            connection.on("eventFromServer", (message) => {
                let eventEnvelope = JSON.parse(message);
                let keys = Object.keys(eventObservers);
                for (let key of keys) {
                    let observer = eventObservers[key];
                    observer(eventEnvelope);
                }
            });
            yield connection
                .start()
                .catch(err => console.log(err));
            let eventStream = {
                subscribeToKernelEvents: (observer) => {
                    let key = tokenGenerator.GetNewToken();
                    eventObservers[key] = observer;
                    let disposableSubscription = {
                        dispose: () => {
                            delete eventObservers[key];
                        }
                    };
                    return disposableSubscription;
                },
                setCommandHandler: (handler) => {
                    const key = tokenGenerator.GetNewToken();
                    commandHandlers[key] = handler;
                },
                submitCommand: (commandEnvelope) => {
                    return connection.send("submitCommand", JSON.stringify(commandEnvelope));
                },
                publishKernelEvent: (eventEnvelope) => {
                    return connection.send("kernelEvent", JSON.stringify(eventEnvelope));
                },
                waitForReady: () => {
                    return Promise.resolve();
                },
                dispose: () => {
                }
            };
            yield connection.send("connect");
            return Promise.resolve(eventStream);
        });
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    // Licensed under the MIT license. See LICENSE file in the project root for full license information.
    // Generated TypeScript interfaces and types.
    // --------------------------------------------- Kernel Commands
    const AddPackageType = "AddPackage";
    const CancelType = "Cancel";
    const ChangeWorkingDirectoryType = "ChangeWorkingDirectory";
    const DisplayErrorType = "DisplayError";
    const DisplayValueType = "DisplayValue";
    const GetInputType = "GetInput";
    const QuitType = "Quit";
    const RequestCompletionsType = "RequestCompletions";
    const RequestDiagnosticsType = "RequestDiagnostics";
    const RequestHoverTextType = "RequestHoverText";
    const RequestSignatureHelpType = "RequestSignatureHelp";
    const RequestValueType = "RequestValue";
    const RequestValueInfosType = "RequestValueInfos";
    const SendEditableCodeType = "SendEditableCode";
    const SubmitCodeType = "SubmitCode";
    const UpdateDisplayedValueType = "UpdateDisplayedValue";
    // --------------------------------------------- Kernel events
    const CodeSubmissionReceivedType = "CodeSubmissionReceived";
    const CommandCancelledType = "CommandCancelled";
    const CommandFailedType = "CommandFailed";
    const CommandSucceededType = "CommandSucceeded";
    const CompleteCodeSubmissionReceivedType = "CompleteCodeSubmissionReceived";
    const CompletionsProducedType = "CompletionsProduced";
    const DiagnosticLogEntryProducedType = "DiagnosticLogEntryProduced";
    const DiagnosticsProducedType = "DiagnosticsProduced";
    const DisplayedValueProducedType = "DisplayedValueProduced";
    const DisplayedValueUpdatedType = "DisplayedValueUpdated";
    const ErrorProducedType = "ErrorProduced";
    const HoverTextProducedType = "HoverTextProduced";
    const IncompleteCodeSubmissionReceivedType = "IncompleteCodeSubmissionReceived";
    const InputProducedType = "InputProduced";
    const KernelExtensionLoadedType = "KernelExtensionLoaded";
    const KernelReadyType = "KernelReady";
    const PackageAddedType = "PackageAdded";
    const ReturnValueProducedType = "ReturnValueProduced";
    const SignatureHelpProducedType = "SignatureHelpProduced";
    const StandardErrorValueProducedType = "StandardErrorValueProduced";
    const StandardOutputValueProducedType = "StandardOutputValueProduced";
    const ValueInfosProducedType = "ValueInfosProduced";
    const ValueProducedType = "ValueProduced";
    const WorkingDirectoryChangedType = "WorkingDirectoryChanged";
    exports.DiagnosticSeverity = void 0;
    (function (DiagnosticSeverity) {
        DiagnosticSeverity["Hidden"] = "hidden";
        DiagnosticSeverity["Info"] = "info";
        DiagnosticSeverity["Warning"] = "warning";
        DiagnosticSeverity["Error"] = "error";
    })(exports.DiagnosticSeverity || (exports.DiagnosticSeverity = {}));
    exports.DocumentSerializationType = void 0;
    (function (DocumentSerializationType) {
        DocumentSerializationType["Dib"] = "dib";
        DocumentSerializationType["Ipynb"] = "ipynb";
    })(exports.DocumentSerializationType || (exports.DocumentSerializationType = {}));
    exports.RequestType = void 0;
    (function (RequestType) {
        RequestType["Parse"] = "parse";
        RequestType["Serialize"] = "serialize";
    })(exports.RequestType || (exports.RequestType = {}));
    exports.SubmissionType = void 0;
    (function (SubmissionType) {
        SubmissionType["Run"] = "run";
        SubmissionType["Diagnose"] = "diagnose";
    })(exports.SubmissionType || (exports.SubmissionType = {}));

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    function createDefaultClientFetch(rootUrl) {
        function defaultClientFetch(input, requestInit = null) {
            return __awaiter$7(this, void 0, void 0, function* () {
                let address = input;
                if (!address.startsWith("http")) {
                    address = `${rootUrl}${address}`;
                }
                let response = yield fetch(address, requestInit);
                return response;
            });
        }
        return defaultClientFetch;
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    class KernelInvocationContext {
        constructor(kernelCommandInvocation) {
            this._childCommands = [];
            this._tokenGenerator = new TokenGenerator();
            this._eventObservers = new Map();
            this._isComplete = false;
            this.handlingKernel = null;
            this._commandEnvelope = kernelCommandInvocation;
        }
        static establish(kernelCommandInvocation) {
            let current = KernelInvocationContext._current;
            if (!current || current._isComplete) {
                KernelInvocationContext._current = new KernelInvocationContext(kernelCommandInvocation);
            }
            else {
                current._childCommands.push(kernelCommandInvocation);
            }
            return KernelInvocationContext._current;
        }
        static get current() { return this._current; }
        get command() { return this._commandEnvelope.command; }
        get commandEnvelope() { return this._commandEnvelope; }
        subscribeToKernelEvents(observer) {
            let subToken = this._tokenGenerator.GetNewToken();
            this._eventObservers.set(subToken, observer);
            return {
                dispose: () => {
                    this._eventObservers.delete(subToken);
                }
            };
        }
        complete(command) {
            if (command === this._commandEnvelope) {
                let succeeded = {};
                let eventEnvelope = {
                    command: this._commandEnvelope,
                    eventType: CommandSucceededType,
                    event: succeeded
                };
                this.publish(eventEnvelope);
                // TODO: C# version has completion callbacks - do we need these?
                // if (!_events.IsDisposed)
                // {
                //     _events.OnCompleted();
                // }
                this._isComplete = true;
            }
            else {
                let pos = this._childCommands.indexOf(command);
                delete this._childCommands[pos];
            }
        }
        fail(message) {
            // TODO:
            // The C# code accepts a message and/or an exception. Do we need to add support
            // for exceptions? (The TS CommandFailed interface doesn't have a place for it right now.)
            let failed = { message: message !== null && message !== void 0 ? message : "Command Failed" };
            let eventEnvelope = {
                command: this._commandEnvelope,
                eventType: CommandFailedType,
                event: failed
            };
            this.publish(eventEnvelope);
            this._isComplete = true;
        }
        publish(kernelEvent) {
            if (!this._isComplete) {
                let command = kernelEvent.command;
                if (command === null ||
                    areCommandsTheSame(command, this._commandEnvelope) ||
                    this._childCommands.includes(command)) {
                    this._eventObservers.forEach((observer) => {
                        observer(kernelEvent);
                    });
                }
            }
        }
        dispose() {
            KernelInvocationContext._current = null;
        }
    }
    KernelInvocationContext._current = null;
    function areCommandsTheSame(envelope1, envelope2) {
        return envelope1 === envelope2
            || (envelope1.commandType === envelope2.commandType && envelope1.token === envelope2.token);
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    // Licensed under the MIT license. See LICENSE file in the project root for full license information.
    var LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["Info"] = 0] = "Info";
        LogLevel[LogLevel["Warn"] = 1] = "Warn";
        LogLevel[LogLevel["Error"] = 2] = "Error";
        LogLevel[LogLevel["None"] = 3] = "None";
    })(LogLevel || (LogLevel = {}));
    class Logger {
        constructor(source, write) {
            this.source = source;
            this.write = write;
        }
        info(message) {
            this.write({ logLevel: LogLevel.Info, source: this.source, message });
        }
        warn(message) {
            this.write({ logLevel: LogLevel.Warn, source: this.source, message });
        }
        error(message) {
            this.write({ logLevel: LogLevel.Error, source: this.source, message });
        }
        static configure(source, writer) {
            const logger = new Logger(source, writer);
            Logger._default = logger;
        }
        static get default() {
            if (Logger._default) {
                return Logger._default;
            }
            throw new Error('No logger has been configured for this context');
        }
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    class Kernel {
        constructor(name) {
            this.name = name;
            this._commandHandlers = new Map();
            this._eventObservers = {};
            this._tokenGenerator = new TokenGenerator();
            this.rootKernel = this;
            this.parentKernel = null;
        }
        ensureCommandTokenAndId(commandEnvelope) {
            var _a;
            if (!commandEnvelope.token) {
                let nextToken = this._tokenGenerator.GetNewToken();
                if ((_a = KernelInvocationContext.current) === null || _a === void 0 ? void 0 : _a.commandEnvelope) {
                    // a parent command exists, create a token hierarchy
                    nextToken = KernelInvocationContext.current.commandEnvelope.token;
                }
                commandEnvelope.token = nextToken;
            }
            if (!commandEnvelope.id) {
                commandEnvelope.id = Guid.create().toString();
            }
        }
        static get current() {
            if (KernelInvocationContext.current) {
                return KernelInvocationContext.current.handlingKernel;
            }
            return null;
        }
        static get root() {
            if (Kernel.current) {
                return Kernel.current.rootKernel;
            }
            return null;
        }
        // Is it worth us going to efforts to ensure that the Promise returned here accurately reflects
        // the command's progress? The only thing that actually calls this is the kernel transport, through
        // the callback set up by attachKernelToTransport, and the callback is expected to return void, so
        // nothing is ever going to look at the promise we return here.
        send(commandEnvelope) {
            var _a;
            return __awaiter$7(this, void 0, void 0, function* () {
                this.ensureCommandTokenAndId(commandEnvelope);
                let context = KernelInvocationContext.establish(commandEnvelope);
                let isRootCommand = areCommandsTheSame(context.commandEnvelope, commandEnvelope);
                let contextEventsSubscription = null;
                if (isRootCommand) {
                    contextEventsSubscription = context.subscribeToKernelEvents(e => {
                        var _a;
                        const message = `kernel ${this.name} saw event ${e.eventType} with token ${(_a = e.command) === null || _a === void 0 ? void 0 : _a.token}`;
                        Logger.default.info(message);
                        return this.publishEvent(e);
                    });
                }
                try {
                    yield this.handleCommand(commandEnvelope);
                }
                catch (e) {
                    context.fail(((_a = e) === null || _a === void 0 ? void 0 : _a.message) || JSON.stringify(e));
                }
                finally {
                    if (contextEventsSubscription) {
                        contextEventsSubscription.dispose();
                    }
                }
            });
        }
        getCommandHandler(commandType) {
            return this._commandHandlers.get(commandType);
        }
        handleCommand(commandEnvelope) {
            return new Promise((resolve, reject) => __awaiter$7(this, void 0, void 0, function* () {
                var _a;
                let context = KernelInvocationContext.establish(commandEnvelope);
                context.handlingKernel = this;
                let isRootCommand = areCommandsTheSame(context.commandEnvelope, commandEnvelope);
                let handler = this.getCommandHandler(commandEnvelope.commandType);
                if (handler) {
                    try {
                        Logger.default.info(`kernel ${this.name} about to handle command ${commandEnvelope.commandType}`);
                        yield handler.handle({ commandEnvelope: commandEnvelope, context });
                        context.complete(commandEnvelope);
                        if (isRootCommand) {
                            context.dispose();
                        }
                        Logger.default.info(`kernel ${this.name} done handling command ${commandEnvelope.commandType}`);
                        resolve();
                    }
                    catch (e) {
                        context.fail(((_a = e) === null || _a === void 0 ? void 0 : _a.message) || JSON.stringify(e));
                        if (isRootCommand) {
                            context.dispose();
                        }
                        reject(e);
                    }
                }
                else {
                    if (isRootCommand) {
                        context.dispose();
                    }
                    reject(new Error(`No handler found for command type ${commandEnvelope.commandType}`));
                }
            }));
        }
        subscribeToKernelEvents(observer) {
            let subToken = this._tokenGenerator.GetNewToken();
            this._eventObservers[subToken] = observer;
            return {
                dispose: () => { delete this._eventObservers[subToken]; }
            };
        }
        registerCommandHandler(handler) {
            // When a registration already existed, we want to overwrite it because we want users to
            // be able to develop handlers iteratively, and it would be unhelpful for handler registration
            // for any particular command to be cumulative.
            this._commandHandlers.set(handler.commandType, handler);
        }
        getTargetKernel(command) {
            var _a;
            let targetKernelName = (_a = command.targetKernelName) !== null && _a !== void 0 ? _a : this.name;
            return targetKernelName === this.name ? this : undefined;
        }
        publishEvent(kernelEvent) {
            let keys = Object.keys(this._eventObservers);
            for (let subToken of keys) {
                let observer = this._eventObservers[subToken];
                observer(kernelEvent);
            }
        }
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    function attachKernelToTransport(kernel, kernelTransport) {
        kernelTransport.setCommandHandler(env => kernel.send(env));
        kernel.subscribeToKernelEvents(env => kernelTransport.publishKernelEvent(env));
    }
    let kernel = null;
    function clientSideKernelFactory(kernelTransport) {
        return __awaiter$7(this, void 0, void 0, function* () {
            if (!kernel) {
                // We need the client-side kernel to be a singleton. However, this factory method is
                // invoked each time a JS cell executes. This has the slightly unfortunate but ultimately
                // harmless effect that each cell sets up its own transport, so we end up with a multitude
                // of transports. But to have multiple kernels would become problematic - each would attempt
                // to handle incoming commands, leading to multiple handler invocations if a cell registering
                // a handler were run multiple times.
                kernel = new Kernel("client-side-kernel");
                attachKernelToTransport(kernel, kernelTransport);
            }
            return kernel;
        });
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    class ClientEventQueueManager {
        static addEventToClientQueue(clientFetch, commandToken, eventEnvelope) {
            let promiseQueue = this.eventPromiseQueues.get(commandToken);
            if (!promiseQueue) {
                promiseQueue = [];
                this.eventPromiseQueues.set(commandToken, promiseQueue);
            }
            const newPromise = clientFetch("publishEvent", {
                method: 'POST',
                cache: 'no-cache',
                mode: 'cors',
                body: JSON.stringify({ commandToken, eventEnvelope }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => { });
            promiseQueue.push(newPromise);
        }
        static waitForAllEventsToPublish(commandToken) {
            return __awaiter$7(this, void 0, void 0, function* () {
                const promiseQueue = this.eventPromiseQueues.get(commandToken);
                if (!promiseQueue) {
                    return;
                }
                yield Promise.all(promiseQueue);
            });
        }
    }
    ClientEventQueueManager.eventPromiseQueues = new Map();
    class InteractiveConsoleWrapper {
        constructor(clientFetch, commandToken) {
            this.clientFetch = clientFetch;
            this.commandToken = commandToken;
            this.globalConsole = console;
        }
        error(...args) {
            this.redirectAndEnqueue(this.globalConsole.error, ...args);
        }
        info(...args) {
            this.redirectAndEnqueue(this.globalConsole.info, ...args);
        }
        log(...args) {
            this.redirectAndEnqueue(this.globalConsole.log, ...args);
        }
        redirectAndEnqueue(target, ...args) {
            target(...args);
            this.enqueueArgsAsEvents(...args);
        }
        enqueueArgsAsEvents(...args) {
            for (const arg of args) {
                let mimeType;
                let value;
                if (typeof arg !== 'object' && !Array.isArray(arg)) {
                    mimeType = 'text/plain';
                    value = arg.toString();
                }
                else {
                    mimeType = 'application/json';
                    value = JSON.stringify(arg);
                }
                const displayedValue = {
                    formattedValues: [
                        {
                            mimeType,
                            value,
                        }
                    ]
                };
                const eventEnvelope = {
                    eventType: DisplayedValueProducedType,
                    event: displayedValue,
                };
                ClientEventQueueManager.addEventToClientQueue(this.clientFetch, this.commandToken, eventEnvelope);
            }
        }
    }
    class KernelClientImpl {
        constructor(parameters) {
            this._clientFetch = parameters.clientFetch;
            this._rootUrl = parameters.rootUrl;
            this._kernelTransport = parameters.kernelTransport;
            this._tokenGenerator = new TokenGenerator();
            this._configureRequire = parameters.configureRequire;
            this._clientSideKernel = parameters.clientSideKernel;
        }
        configureRequire(config) {
            return this._configureRequire(config);
        }
        subscribeToKernelEvents(observer) {
            let subscription = this._kernelTransport.subscribeToKernelEvents(observer);
            return subscription;
        }
        registerCommandHandler(handler) {
            this._clientSideKernel.registerCommandHandler(handler);
        }
        getVariable(kernelName, variableName) {
            return __awaiter$7(this, void 0, void 0, function* () {
                let response = yield this._clientFetch(`variables/${kernelName}/${variableName}`, {
                    method: 'GET',
                    cache: 'no-cache',
                    mode: 'cors'
                });
                let variable = yield response.json();
                return variable;
            });
        }
        getVariables(variableRequest) {
            return __awaiter$7(this, void 0, void 0, function* () {
                let response = yield this._clientFetch("variables", {
                    method: 'POST',
                    cache: 'no-cache',
                    mode: 'cors',
                    body: JSON.stringify(variableRequest),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                let variableBundle = yield response.json();
                return variableBundle;
            });
        }
        getResource(resource) {
            return this._clientFetch(`resources/${resource}`);
        }
        getResourceUrl(resource) {
            return `${this._rootUrl}resources/${resource}`;
        }
        getExtensionResource(extensionName, resource) {
            return this._clientFetch(`extension/${extensionName}/resources/${resource}`);
        }
        getExtensionResourceUrl(extensionName, resource) {
            return `${this._rootUrl}extensions/${extensionName}/resources/${resource}`;
        }
        loadKernels() {
            return __awaiter$7(this, void 0, void 0, function* () {
                let kernels = yield this._clientFetch("kernels", {
                    method: "GET",
                    cache: 'no-cache',
                    mode: 'cors'
                });
                let kernelNames = yield kernels.json();
                if (Array.isArray(kernelNames)) {
                    for (let i = 0; i < kernelNames.length; i++) {
                        let kernelName = kernelNames[i];
                        let kernelClient = {
                            getVariable: (variableName) => {
                                return this.getVariable(kernelName, variableName);
                            },
                            submitCode: (code) => {
                                return this.submitCode(code, kernelName);
                            },
                            submitCommand: (commandType, command) => {
                                return this.submitCommand(commandType, command, kernelName);
                            }
                        };
                        this[kernelName] = kernelClient;
                    }
                }
            });
        }
        submitCode(code, targetKernelName = null) {
            return __awaiter$7(this, void 0, void 0, function* () {
                let token = this._tokenGenerator.GetNewToken();
                let command = {
                    code: code,
                    targetKernelName: targetKernelName
                };
                yield this._kernelTransport.submitCommand({ command, commandType: SubmitCodeType, token });
                return token;
            });
        }
        submitCommand(commandType, command, targetKernelName) {
            return __awaiter$7(this, void 0, void 0, function* () {
                let token = this._tokenGenerator.GetNewToken();
                if (!command) {
                    command = {};
                }
                if (targetKernelName) {
                    command.targetKernelName = targetKernelName;
                }
                yield this._kernelTransport.submitCommand({ command, commandType: commandType, token });
                return token;
            });
        }
        getConsole(commandToken) {
            const wrappedConsole = new InteractiveConsoleWrapper(this._clientFetch, commandToken);
            return wrappedConsole;
        }
        markExecutionComplete(commandToken) {
            return this._clientFetch("markExecutionComplete", {
                method: 'POST',
                cache: 'no-cache',
                mode: 'cors',
                body: JSON.stringify({ commandToken }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => { });
        }
        failCommand(err, commandToken) {
            const failedEvent = {
                message: `${err}`
            };
            const eventEnvelope = {
                eventType: CommandFailedType,
                event: failedEvent,
            };
            ClientEventQueueManager.addEventToClientQueue(this._clientFetch, commandToken, eventEnvelope);
        }
        waitForAllEventsToPublish(commandToken) {
            return ClientEventQueueManager.waitForAllEventsToPublish(commandToken);
        }
    }
    function isConfiguration(config) {
        return typeof config !== "string";
    }
    function createDotnetInteractiveClient(configuration) {
        return __awaiter$7(this, void 0, void 0, function* () {
            let rootUrl = "";
            let clientFetch = null;
            let kernelTransportFactory = null;
            let kernelFactory = null;
            if (isConfiguration(configuration)) {
                rootUrl = configuration.address;
                clientFetch = configuration.clientFetch;
                kernelTransportFactory = configuration.kernelTransportFactory;
                kernelFactory = configuration.clientSideKernelFactory;
            }
            else {
                rootUrl = configuration;
            }
            if (!rootUrl.endsWith("/")) {
                rootUrl = `${rootUrl}/`;
            }
            if (!clientFetch) {
                clientFetch = createDefaultClientFetch(rootUrl);
            }
            if (!kernelTransportFactory) {
                kernelTransportFactory = signalTransportFactory;
            }
            if (!kernelFactory) {
                kernelFactory = clientSideKernelFactory;
            }
            let transport = yield kernelTransportFactory(rootUrl);
            let clientSideKernel = yield kernelFactory(transport);
            let client = new KernelClientImpl({
                clientFetch: clientFetch,
                rootUrl,
                kernelTransport: transport,
                clientSideKernel,
                configureRequire: (config) => {
                    return require.config(config) || require;
                }
            });
            yield client.loadKernels();
            return client;
        });
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    function init(global) {
        global.getDotnetInteractiveScope = (key) => {
            if (!global.interactiveScopes) {
                global.interactiveScopes = new DotnetInteractiveScopeContainer();
            }
            if (!global.interactiveScopes[key]) {
                global.interactiveScopes[key] = new DotnetInteractiveScope();
            }
            return global.interactiveScopes[key];
        };
        global.configureRequire = (config) => {
            return require.config(config) || require;
        };
        global.createDotnetInteractiveClient = createDotnetInteractiveClient;
    }

    exports.AddPackageType = AddPackageType;
    exports.CancelType = CancelType;
    exports.ChangeWorkingDirectoryType = ChangeWorkingDirectoryType;
    exports.CodeSubmissionReceivedType = CodeSubmissionReceivedType;
    exports.CommandCancelledType = CommandCancelledType;
    exports.CommandFailedType = CommandFailedType;
    exports.CommandSucceededType = CommandSucceededType;
    exports.CompleteCodeSubmissionReceivedType = CompleteCodeSubmissionReceivedType;
    exports.CompletionsProducedType = CompletionsProducedType;
    exports.DiagnosticLogEntryProducedType = DiagnosticLogEntryProducedType;
    exports.DiagnosticsProducedType = DiagnosticsProducedType;
    exports.DisplayErrorType = DisplayErrorType;
    exports.DisplayValueType = DisplayValueType;
    exports.DisplayedValueProducedType = DisplayedValueProducedType;
    exports.DisplayedValueUpdatedType = DisplayedValueUpdatedType;
    exports.DotnetInteractiveScope = DotnetInteractiveScope;
    exports.DotnetInteractiveScopeContainer = DotnetInteractiveScopeContainer;
    exports.ErrorProducedType = ErrorProducedType;
    exports.GetInputType = GetInputType;
    exports.HoverTextProducedType = HoverTextProducedType;
    exports.IncompleteCodeSubmissionReceivedType = IncompleteCodeSubmissionReceivedType;
    exports.InputProducedType = InputProducedType;
    exports.KernelExtensionLoadedType = KernelExtensionLoadedType;
    exports.KernelReadyType = KernelReadyType;
    exports.PackageAddedType = PackageAddedType;
    exports.QuitType = QuitType;
    exports.RequestCompletionsType = RequestCompletionsType;
    exports.RequestDiagnosticsType = RequestDiagnosticsType;
    exports.RequestHoverTextType = RequestHoverTextType;
    exports.RequestSignatureHelpType = RequestSignatureHelpType;
    exports.RequestValueInfosType = RequestValueInfosType;
    exports.RequestValueType = RequestValueType;
    exports.ReturnValueProducedType = ReturnValueProducedType;
    exports.SendEditableCodeType = SendEditableCodeType;
    exports.SignatureHelpProducedType = SignatureHelpProducedType;
    exports.StandardErrorValueProducedType = StandardErrorValueProducedType;
    exports.StandardOutputValueProducedType = StandardOutputValueProducedType;
    exports.SubmitCodeType = SubmitCodeType;
    exports.UpdateDisplayedValueType = UpdateDisplayedValueType;
    exports.ValueInfosProducedType = ValueInfosProducedType;
    exports.ValueProducedType = ValueProducedType;
    exports.WorkingDirectoryChangedType = WorkingDirectoryChangedType;
    exports.createDotnetInteractiveClient = createDotnetInteractiveClient;
    exports.init = init;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG90bmV0LWludGVyYWN0aXZlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL0Vycm9ycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vSHR0cENsaWVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vSUxvZ2dlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vTG9nZ2Vycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vVXRpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL0ZldGNoSHR0cENsaWVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vWGhySHR0cENsaWVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vRGVmYXVsdEh0dHBDbGllbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL1RleHRNZXNzYWdlRm9ybWF0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9IYW5kc2hha2VQcm90b2NvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vSUh1YlByb3RvY29sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9TdWJqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9IdWJDb25uZWN0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9EZWZhdWx0UmVjb25uZWN0UG9saWN5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9JVHJhbnNwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9BYm9ydENvbnRyb2xsZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL0xvbmdQb2xsaW5nVHJhbnNwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9TZXJ2ZXJTZW50RXZlbnRzVHJhbnNwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9XZWJTb2NrZXRUcmFuc3BvcnQuanMiLCIuLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL0h0dHBDb25uZWN0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9Kc29uSHViUHJvdG9jb2wuanMiLCIuLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL0h1YkNvbm5lY3Rpb25CdWlsZGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbi8qKiBFcnJvciB0aHJvd24gd2hlbiBhbiBIVFRQIHJlcXVlc3QgZmFpbHMuICovXHJcbnZhciBIdHRwRXJyb3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoSHR0cEVycm9yLCBfc3VwZXIpO1xyXG4gICAgLyoqIENvbnN0cnVjdHMgYSBuZXcgaW5zdGFuY2Ugb2Yge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5IdHRwRXJyb3J9LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvck1lc3NhZ2UgQSBkZXNjcmlwdGl2ZSBlcnJvciBtZXNzYWdlLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXR1c0NvZGUgVGhlIEhUVFAgc3RhdHVzIGNvZGUgcmVwcmVzZW50ZWQgYnkgdGhpcyBlcnJvci5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gSHR0cEVycm9yKGVycm9yTWVzc2FnZSwgc3RhdHVzQ29kZSkge1xyXG4gICAgICAgIHZhciBfbmV3VGFyZ2V0ID0gdGhpcy5jb25zdHJ1Y3RvcjtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciB0cnVlUHJvdG8gPSBfbmV3VGFyZ2V0LnByb3RvdHlwZTtcclxuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGVycm9yTWVzc2FnZSkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5zdGF0dXNDb2RlID0gc3RhdHVzQ29kZTtcclxuICAgICAgICAvLyBXb3JrYXJvdW5kIGlzc3VlIGluIFR5cGVzY3JpcHQgY29tcGlsZXJcclxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzEzOTY1I2lzc3VlY29tbWVudC0yNzg1NzAyMDBcclxuICAgICAgICBfdGhpcy5fX3Byb3RvX18gPSB0cnVlUHJvdG87XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEh0dHBFcnJvcjtcclxufShFcnJvcikpO1xyXG5leHBvcnQgeyBIdHRwRXJyb3IgfTtcclxuLyoqIEVycm9yIHRocm93biB3aGVuIGEgdGltZW91dCBlbGFwc2VzLiAqL1xyXG52YXIgVGltZW91dEVycm9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFRpbWVvdXRFcnJvciwgX3N1cGVyKTtcclxuICAgIC8qKiBDb25zdHJ1Y3RzIGEgbmV3IGluc3RhbmNlIG9mIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuVGltZW91dEVycm9yfS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JNZXNzYWdlIEEgZGVzY3JpcHRpdmUgZXJyb3IgbWVzc2FnZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gVGltZW91dEVycm9yKGVycm9yTWVzc2FnZSkge1xyXG4gICAgICAgIHZhciBfbmV3VGFyZ2V0ID0gdGhpcy5jb25zdHJ1Y3RvcjtcclxuICAgICAgICBpZiAoZXJyb3JNZXNzYWdlID09PSB2b2lkIDApIHsgZXJyb3JNZXNzYWdlID0gXCJBIHRpbWVvdXQgb2NjdXJyZWQuXCI7IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciB0cnVlUHJvdG8gPSBfbmV3VGFyZ2V0LnByb3RvdHlwZTtcclxuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGVycm9yTWVzc2FnZSkgfHwgdGhpcztcclxuICAgICAgICAvLyBXb3JrYXJvdW5kIGlzc3VlIGluIFR5cGVzY3JpcHQgY29tcGlsZXJcclxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzEzOTY1I2lzc3VlY29tbWVudC0yNzg1NzAyMDBcclxuICAgICAgICBfdGhpcy5fX3Byb3RvX18gPSB0cnVlUHJvdG87XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFRpbWVvdXRFcnJvcjtcclxufShFcnJvcikpO1xyXG5leHBvcnQgeyBUaW1lb3V0RXJyb3IgfTtcclxuLyoqIEVycm9yIHRocm93biB3aGVuIGFuIGFjdGlvbiBpcyBhYm9ydGVkLiAqL1xyXG52YXIgQWJvcnRFcnJvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhBYm9ydEVycm9yLCBfc3VwZXIpO1xyXG4gICAgLyoqIENvbnN0cnVjdHMgYSBuZXcgaW5zdGFuY2Ugb2Yge0BsaW5rIEFib3J0RXJyb3J9LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvck1lc3NhZ2UgQSBkZXNjcmlwdGl2ZSBlcnJvciBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBBYm9ydEVycm9yKGVycm9yTWVzc2FnZSkge1xyXG4gICAgICAgIHZhciBfbmV3VGFyZ2V0ID0gdGhpcy5jb25zdHJ1Y3RvcjtcclxuICAgICAgICBpZiAoZXJyb3JNZXNzYWdlID09PSB2b2lkIDApIHsgZXJyb3JNZXNzYWdlID0gXCJBbiBhYm9ydCBvY2N1cnJlZC5cIjsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHRydWVQcm90byA9IF9uZXdUYXJnZXQucHJvdG90eXBlO1xyXG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgZXJyb3JNZXNzYWdlKSB8fCB0aGlzO1xyXG4gICAgICAgIC8vIFdvcmthcm91bmQgaXNzdWUgaW4gVHlwZXNjcmlwdCBjb21waWxlclxyXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTM5NjUjaXNzdWVjb21tZW50LTI3ODU3MDIwMFxyXG4gICAgICAgIF90aGlzLl9fcHJvdG9fXyA9IHRydWVQcm90bztcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQWJvcnRFcnJvcjtcclxufShFcnJvcikpO1xyXG5leHBvcnQgeyBBYm9ydEVycm9yIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVycm9ycy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXHJcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn07XHJcbi8qKiBSZXByZXNlbnRzIGFuIEhUVFAgcmVzcG9uc2UuICovXHJcbnZhciBIdHRwUmVzcG9uc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBIdHRwUmVzcG9uc2Uoc3RhdHVzQ29kZSwgc3RhdHVzVGV4dCwgY29udGVudCkge1xyXG4gICAgICAgIHRoaXMuc3RhdHVzQ29kZSA9IHN0YXR1c0NvZGU7XHJcbiAgICAgICAgdGhpcy5zdGF0dXNUZXh0ID0gc3RhdHVzVGV4dDtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEh0dHBSZXNwb25zZTtcclxufSgpKTtcclxuZXhwb3J0IHsgSHR0cFJlc3BvbnNlIH07XHJcbi8qKiBBYnN0cmFjdGlvbiBvdmVyIGFuIEhUVFAgY2xpZW50LlxyXG4gKlxyXG4gKiBUaGlzIGNsYXNzIHByb3ZpZGVzIGFuIGFic3RyYWN0aW9uIG92ZXIgYW4gSFRUUCBjbGllbnQgc28gdGhhdCBhIGRpZmZlcmVudCBpbXBsZW1lbnRhdGlvbiBjYW4gYmUgcHJvdmlkZWQgb24gZGlmZmVyZW50IHBsYXRmb3Jtcy5cclxuICovXHJcbnZhciBIdHRwQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gSHR0cENsaWVudCgpIHtcclxuICAgIH1cclxuICAgIEh0dHBDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kKF9fYXNzaWduKHt9LCBvcHRpb25zLCB7IG1ldGhvZDogXCJHRVRcIiwgdXJsOiB1cmwgfSkpO1xyXG4gICAgfTtcclxuICAgIEh0dHBDbGllbnQucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZChfX2Fzc2lnbih7fSwgb3B0aW9ucywgeyBtZXRob2Q6IFwiUE9TVFwiLCB1cmw6IHVybCB9KSk7XHJcbiAgICB9O1xyXG4gICAgSHR0cENsaWVudC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbmQoX19hc3NpZ24oe30sIG9wdGlvbnMsIHsgbWV0aG9kOiBcIkRFTEVURVwiLCB1cmw6IHVybCB9KSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEdldHMgYWxsIGNvb2tpZXMgdGhhdCBhcHBseSB0byB0aGUgc3BlY2lmaWVkIFVSTC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdXJsIFRoZSBVUkwgdGhhdCB0aGUgY29va2llcyBhcmUgdmFsaWQgZm9yLlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQSBzdHJpbmcgY29udGFpbmluZyBhbGwgdGhlIGtleS12YWx1ZSBjb29raWUgcGFpcnMgZm9yIHRoZSBzcGVjaWZpZWQgVVJMLlxyXG4gICAgICovXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBIdHRwQ2xpZW50LnByb3RvdHlwZS5nZXRDb29raWVTdHJpbmcgPSBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEh0dHBDbGllbnQ7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEh0dHBDbGllbnQgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SHR0cENsaWVudC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbi8vIFRoZXNlIHZhbHVlcyBhcmUgZGVzaWduZWQgdG8gbWF0Y2ggdGhlIEFTUC5ORVQgTG9nIExldmVscyBzaW5jZSB0aGF0J3MgdGhlIHBhdHRlcm4gd2UncmUgZW11bGF0aW5nIGhlcmUuXHJcbi8qKiBJbmRpY2F0ZXMgdGhlIHNldmVyaXR5IG9mIGEgbG9nIG1lc3NhZ2UuXHJcbiAqXHJcbiAqIExvZyBMZXZlbHMgYXJlIG9yZGVyZWQgaW4gaW5jcmVhc2luZyBzZXZlcml0eS4gU28gYERlYnVnYCBpcyBtb3JlIHNldmVyZSB0aGFuIGBUcmFjZWAsIGV0Yy5cclxuICovXHJcbmV4cG9ydCB2YXIgTG9nTGV2ZWw7XHJcbihmdW5jdGlvbiAoTG9nTGV2ZWwpIHtcclxuICAgIC8qKiBMb2cgbGV2ZWwgZm9yIHZlcnkgbG93IHNldmVyaXR5IGRpYWdub3N0aWMgbWVzc2FnZXMuICovXHJcbiAgICBMb2dMZXZlbFtMb2dMZXZlbFtcIlRyYWNlXCJdID0gMF0gPSBcIlRyYWNlXCI7XHJcbiAgICAvKiogTG9nIGxldmVsIGZvciBsb3cgc2V2ZXJpdHkgZGlhZ25vc3RpYyBtZXNzYWdlcy4gKi9cclxuICAgIExvZ0xldmVsW0xvZ0xldmVsW1wiRGVidWdcIl0gPSAxXSA9IFwiRGVidWdcIjtcclxuICAgIC8qKiBMb2cgbGV2ZWwgZm9yIGluZm9ybWF0aW9uYWwgZGlhZ25vc3RpYyBtZXNzYWdlcy4gKi9cclxuICAgIExvZ0xldmVsW0xvZ0xldmVsW1wiSW5mb3JtYXRpb25cIl0gPSAyXSA9IFwiSW5mb3JtYXRpb25cIjtcclxuICAgIC8qKiBMb2cgbGV2ZWwgZm9yIGRpYWdub3N0aWMgbWVzc2FnZXMgdGhhdCBpbmRpY2F0ZSBhIG5vbi1mYXRhbCBwcm9ibGVtLiAqL1xyXG4gICAgTG9nTGV2ZWxbTG9nTGV2ZWxbXCJXYXJuaW5nXCJdID0gM10gPSBcIldhcm5pbmdcIjtcclxuICAgIC8qKiBMb2cgbGV2ZWwgZm9yIGRpYWdub3N0aWMgbWVzc2FnZXMgdGhhdCBpbmRpY2F0ZSBhIGZhaWx1cmUgaW4gdGhlIGN1cnJlbnQgb3BlcmF0aW9uLiAqL1xyXG4gICAgTG9nTGV2ZWxbTG9nTGV2ZWxbXCJFcnJvclwiXSA9IDRdID0gXCJFcnJvclwiO1xyXG4gICAgLyoqIExvZyBsZXZlbCBmb3IgZGlhZ25vc3RpYyBtZXNzYWdlcyB0aGF0IGluZGljYXRlIGEgZmFpbHVyZSB0aGF0IHdpbGwgdGVybWluYXRlIHRoZSBlbnRpcmUgYXBwbGljYXRpb24uICovXHJcbiAgICBMb2dMZXZlbFtMb2dMZXZlbFtcIkNyaXRpY2FsXCJdID0gNV0gPSBcIkNyaXRpY2FsXCI7XHJcbiAgICAvKiogVGhlIGhpZ2hlc3QgcG9zc2libGUgbG9nIGxldmVsLiBVc2VkIHdoZW4gY29uZmlndXJpbmcgbG9nZ2luZyB0byBpbmRpY2F0ZSB0aGF0IG5vIGxvZyBtZXNzYWdlcyBzaG91bGQgYmUgZW1pdHRlZC4gKi9cclxuICAgIExvZ0xldmVsW0xvZ0xldmVsW1wiTm9uZVwiXSA9IDZdID0gXCJOb25lXCI7XHJcbn0pKExvZ0xldmVsIHx8IChMb2dMZXZlbCA9IHt9KSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUlMb2dnZXIuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vKiogQSBsb2dnZXIgdGhhdCBkb2VzIG5vdGhpbmcgd2hlbiBsb2cgbWVzc2FnZXMgYXJlIHNlbnQgdG8gaXQuICovXHJcbnZhciBOdWxsTG9nZ2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTnVsbExvZ2dlcigpIHtcclxuICAgIH1cclxuICAgIC8qKiBAaW5oZXJpdERvYyAqL1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXHJcbiAgICBOdWxsTG9nZ2VyLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbiAoX2xvZ0xldmVsLCBfbWVzc2FnZSkge1xyXG4gICAgfTtcclxuICAgIC8qKiBUaGUgc2luZ2xldG9uIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLk51bGxMb2dnZXJ9LiAqL1xyXG4gICAgTnVsbExvZ2dlci5pbnN0YW5jZSA9IG5ldyBOdWxsTG9nZ2VyKCk7XHJcbiAgICByZXR1cm4gTnVsbExvZ2dlcjtcclxufSgpKTtcclxuZXhwb3J0IHsgTnVsbExvZ2dlciB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1Mb2dnZXJzLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5pbXBvcnQgeyBMb2dMZXZlbCB9IGZyb20gXCIuL0lMb2dnZXJcIjtcclxuaW1wb3J0IHsgTnVsbExvZ2dlciB9IGZyb20gXCIuL0xvZ2dlcnNcIjtcclxuLy8gVmVyc2lvbiB0b2tlbiB0aGF0IHdpbGwgYmUgcmVwbGFjZWQgYnkgdGhlIHByZXBhY2sgY29tbWFuZFxyXG4vKiogVGhlIHZlcnNpb24gb2YgdGhlIFNpZ25hbFIgY2xpZW50LiAqL1xyXG5leHBvcnQgdmFyIFZFUlNJT04gPSBcIjUuMC45XCI7XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG52YXIgQXJnID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQXJnKCkge1xyXG4gICAgfVxyXG4gICAgQXJnLmlzUmVxdWlyZWQgPSBmdW5jdGlvbiAodmFsLCBuYW1lKSB7XHJcbiAgICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgJ1wiICsgbmFtZSArIFwiJyBhcmd1bWVudCBpcyByZXF1aXJlZC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEFyZy5pc05vdEVtcHR5ID0gZnVuY3Rpb24gKHZhbCwgbmFtZSkge1xyXG4gICAgICAgIGlmICghdmFsIHx8IHZhbC5tYXRjaCgvXlxccyokLykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlICdcIiArIG5hbWUgKyBcIicgYXJndW1lbnQgc2hvdWxkIG5vdCBiZSBlbXB0eS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEFyZy5pc0luID0gZnVuY3Rpb24gKHZhbCwgdmFsdWVzLCBuYW1lKSB7XHJcbiAgICAgICAgLy8gVHlwZVNjcmlwdCBlbnVtcyBoYXZlIGtleXMgZm9yICoqYm90aCoqIHRoZSBuYW1lIGFuZCB0aGUgdmFsdWUgb2YgZWFjaCBlbnVtIG1lbWJlciBvbiB0aGUgdHlwZSBpdHNlbGYuXHJcbiAgICAgICAgaWYgKCEodmFsIGluIHZhbHVlcykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBcIiArIG5hbWUgKyBcIiB2YWx1ZTogXCIgKyB2YWwgKyBcIi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBBcmc7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEFyZyB9O1xyXG4vKiogQHByaXZhdGUgKi9cclxudmFyIFBsYXRmb3JtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUGxhdGZvcm0oKSB7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUGxhdGZvcm0sIFwiaXNCcm93c2VyXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUGxhdGZvcm0sIFwiaXNXZWJXb3JrZXJcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgJiYgXCJpbXBvcnRTY3JpcHRzXCIgaW4gc2VsZjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShQbGF0Zm9ybSwgXCJpc05vZGVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNCcm93c2VyICYmICF0aGlzLmlzV2ViV29ya2VyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIFBsYXRmb3JtO1xyXG59KCkpO1xyXG5leHBvcnQgeyBQbGF0Zm9ybSB9O1xyXG4vKiogQHByaXZhdGUgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGFEZXRhaWwoZGF0YSwgaW5jbHVkZUNvbnRlbnQpIHtcclxuICAgIHZhciBkZXRhaWwgPSBcIlwiO1xyXG4gICAgaWYgKGlzQXJyYXlCdWZmZXIoZGF0YSkpIHtcclxuICAgICAgICBkZXRhaWwgPSBcIkJpbmFyeSBkYXRhIG9mIGxlbmd0aCBcIiArIGRhdGEuYnl0ZUxlbmd0aDtcclxuICAgICAgICBpZiAoaW5jbHVkZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgZGV0YWlsICs9IFwiLiBDb250ZW50OiAnXCIgKyBmb3JtYXRBcnJheUJ1ZmZlcihkYXRhKSArIFwiJ1wiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgZGV0YWlsID0gXCJTdHJpbmcgZGF0YSBvZiBsZW5ndGggXCIgKyBkYXRhLmxlbmd0aDtcclxuICAgICAgICBpZiAoaW5jbHVkZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgZGV0YWlsICs9IFwiLiBDb250ZW50OiAnXCIgKyBkYXRhICsgXCInXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRldGFpbDtcclxufVxyXG4vKiogQHByaXZhdGUgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEFycmF5QnVmZmVyKGRhdGEpIHtcclxuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XHJcbiAgICAvLyBVaW50OEFycmF5Lm1hcCBvbmx5IHN1cHBvcnRzIHJldHVybmluZyBhbm90aGVyIFVpbnQ4QXJyYXk/XHJcbiAgICB2YXIgc3RyID0gXCJcIjtcclxuICAgIHZpZXcuZm9yRWFjaChmdW5jdGlvbiAobnVtKSB7XHJcbiAgICAgICAgdmFyIHBhZCA9IG51bSA8IDE2ID8gXCIwXCIgOiBcIlwiO1xyXG4gICAgICAgIHN0ciArPSBcIjB4XCIgKyBwYWQgKyBudW0udG9TdHJpbmcoMTYpICsgXCIgXCI7XHJcbiAgICB9KTtcclxuICAgIC8vIFRyaW0gb2YgdHJhaWxpbmcgc3BhY2UuXHJcbiAgICByZXR1cm4gc3RyLnN1YnN0cigwLCBzdHIubGVuZ3RoIC0gMSk7XHJcbn1cclxuLy8gQWxzbyBpbiBzaWduYWxyLXByb3RvY29sLW1zZ3BhY2svVXRpbHMudHNcclxuLyoqIEBwcml2YXRlICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xyXG4gICAgcmV0dXJuIHZhbCAmJiB0eXBlb2YgQXJyYXlCdWZmZXIgIT09IFwidW5kZWZpbmVkXCIgJiZcclxuICAgICAgICAodmFsIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHxcclxuICAgICAgICAgICAgLy8gU29tZXRpbWVzIHdlIGdldCBhbiBBcnJheUJ1ZmZlciB0aGF0IGRvZXNuJ3Qgc2F0aXNmeSBpbnN0YW5jZW9mXHJcbiAgICAgICAgICAgICh2YWwuY29uc3RydWN0b3IgJiYgdmFsLmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiQXJyYXlCdWZmZXJcIikpO1xyXG59XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2VuZE1lc3NhZ2UobG9nZ2VyLCB0cmFuc3BvcnROYW1lLCBodHRwQ2xpZW50LCB1cmwsIGFjY2Vzc1Rva2VuRmFjdG9yeSwgY29udGVudCwgbG9nTWVzc2FnZUNvbnRlbnQsIHdpdGhDcmVkZW50aWFscywgZGVmYXVsdEhlYWRlcnMpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EsIGhlYWRlcnMsIHRva2VuLCBfYiwgbmFtZSwgdmFsdWUsIHJlc3BvbnNlVHlwZSwgcmVzcG9uc2U7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKF9jLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVycyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWNjZXNzVG9rZW5GYWN0b3J5KSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBhY2Nlc3NUb2tlbkZhY3RvcnkoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBfYy5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnMgPSAoX2EgPSB7fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hW1wiQXV0aG9yaXphdGlvblwiXSA9IFwiQmVhcmVyIFwiICsgdG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9jLmxhYmVsID0gMjtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBfYiA9IGdldFVzZXJBZ2VudEhlYWRlcigpLCBuYW1lID0gX2JbMF0sIHZhbHVlID0gX2JbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1tuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKFwiICsgdHJhbnNwb3J0TmFtZSArIFwiIHRyYW5zcG9ydCkgc2VuZGluZyBkYXRhLiBcIiArIGdldERhdGFEZXRhaWwoY29udGVudCwgbG9nTWVzc2FnZUNvbnRlbnQpICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZSA9IGlzQXJyYXlCdWZmZXIoY29udGVudCkgPyBcImFycmF5YnVmZmVyXCIgOiBcInRleHRcIjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBodHRwQ2xpZW50LnBvc3QodXJsLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogX19hc3NpZ24oe30sIGhlYWRlcnMsIGRlZmF1bHRIZWFkZXJzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogcmVzcG9uc2VUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB3aXRoQ3JlZGVudGlhbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9jLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihcIiArIHRyYW5zcG9ydE5hbWUgKyBcIiB0cmFuc3BvcnQpIHJlcXVlc3QgY29tcGxldGUuIFJlc3BvbnNlIHN0YXR1czogXCIgKyByZXNwb25zZS5zdGF0dXNDb2RlICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuLyoqIEBwcml2YXRlICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb2dnZXIobG9nZ2VyKSB7XHJcbiAgICBpZiAobG9nZ2VyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbnNvbGVMb2dnZXIoTG9nTGV2ZWwuSW5mb3JtYXRpb24pO1xyXG4gICAgfVxyXG4gICAgaWYgKGxvZ2dlciA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBOdWxsTG9nZ2VyLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGxvZ2dlci5sb2cpIHtcclxuICAgICAgICByZXR1cm4gbG9nZ2VyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBDb25zb2xlTG9nZ2VyKGxvZ2dlcik7XHJcbn1cclxuLyoqIEBwcml2YXRlICovXHJcbnZhciBTdWJqZWN0U3Vic2NyaXB0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU3ViamVjdFN1YnNjcmlwdGlvbihzdWJqZWN0LCBvYnNlcnZlcikge1xyXG4gICAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlciA9IG9ic2VydmVyO1xyXG4gICAgfVxyXG4gICAgU3ViamVjdFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnN1YmplY3Qub2JzZXJ2ZXJzLmluZGV4T2YodGhpcy5vYnNlcnZlcik7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJqZWN0Lm9ic2VydmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zdWJqZWN0Lm9ic2VydmVycy5sZW5ndGggPT09IDAgJiYgdGhpcy5zdWJqZWN0LmNhbmNlbENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViamVjdC5jYW5jZWxDYWxsYmFjaygpLmNhdGNoKGZ1bmN0aW9uIChfKSB7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gU3ViamVjdFN1YnNjcmlwdGlvbjtcclxufSgpKTtcclxuZXhwb3J0IHsgU3ViamVjdFN1YnNjcmlwdGlvbiB9O1xyXG4vKiogQHByaXZhdGUgKi9cclxudmFyIENvbnNvbGVMb2dnZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDb25zb2xlTG9nZ2VyKG1pbmltdW1Mb2dMZXZlbCkge1xyXG4gICAgICAgIHRoaXMubWluaW11bUxvZ0xldmVsID0gbWluaW11bUxvZ0xldmVsO1xyXG4gICAgICAgIHRoaXMub3V0cHV0Q29uc29sZSA9IGNvbnNvbGU7XHJcbiAgICB9XHJcbiAgICBDb25zb2xlTG9nZ2VyLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbiAobG9nTGV2ZWwsIG1lc3NhZ2UpIHtcclxuICAgICAgICBpZiAobG9nTGV2ZWwgPj0gdGhpcy5taW5pbXVtTG9nTGV2ZWwpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChsb2dMZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBMb2dMZXZlbC5Dcml0aWNhbDpcclxuICAgICAgICAgICAgICAgIGNhc2UgTG9nTGV2ZWwuRXJyb3I6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRDb25zb2xlLmVycm9yKFwiW1wiICsgbmV3IERhdGUoKS50b0lTT1N0cmluZygpICsgXCJdIFwiICsgTG9nTGV2ZWxbbG9nTGV2ZWxdICsgXCI6IFwiICsgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIExvZ0xldmVsLldhcm5pbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRDb25zb2xlLndhcm4oXCJbXCIgKyBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgKyBcIl0gXCIgKyBMb2dMZXZlbFtsb2dMZXZlbF0gKyBcIjogXCIgKyBtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTG9nTGV2ZWwuSW5mb3JtYXRpb246XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRDb25zb2xlLmluZm8oXCJbXCIgKyBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgKyBcIl0gXCIgKyBMb2dMZXZlbFtsb2dMZXZlbF0gKyBcIjogXCIgKyBtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5kZWJ1ZyBvbmx5IGdvZXMgdG8gYXR0YWNoZWQgZGVidWdnZXJzIGluIE5vZGUsIHNvIHdlIHVzZSBjb25zb2xlLmxvZyBmb3IgVHJhY2UgYW5kIERlYnVnXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRDb25zb2xlLmxvZyhcIltcIiArIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSArIFwiXSBcIiArIExvZ0xldmVsW2xvZ0xldmVsXSArIFwiOiBcIiArIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBDb25zb2xlTG9nZ2VyO1xyXG59KCkpO1xyXG5leHBvcnQgeyBDb25zb2xlTG9nZ2VyIH07XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckFnZW50SGVhZGVyKCkge1xyXG4gICAgdmFyIHVzZXJBZ2VudEhlYWRlck5hbWUgPSBcIlgtU2lnbmFsUi1Vc2VyLUFnZW50XCI7XHJcbiAgICBpZiAoUGxhdGZvcm0uaXNOb2RlKSB7XHJcbiAgICAgICAgdXNlckFnZW50SGVhZGVyTmFtZSA9IFwiVXNlci1BZ2VudFwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFt1c2VyQWdlbnRIZWFkZXJOYW1lLCBjb25zdHJ1Y3RVc2VyQWdlbnQoVkVSU0lPTiwgZ2V0T3NOYW1lKCksIGdldFJ1bnRpbWUoKSwgZ2V0UnVudGltZVZlcnNpb24oKSldO1xyXG59XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0VXNlckFnZW50KHZlcnNpb24sIG9zLCBydW50aW1lLCBydW50aW1lVmVyc2lvbikge1xyXG4gICAgLy8gTWljcm9zb2Z0IFNpZ25hbFIvW1ZlcnNpb25dIChbRGV0YWlsZWQgVmVyc2lvbl07IFtPcGVyYXRpbmcgU3lzdGVtXTsgW1J1bnRpbWVdOyBbUnVudGltZSBWZXJzaW9uXSlcclxuICAgIHZhciB1c2VyQWdlbnQgPSBcIk1pY3Jvc29mdCBTaWduYWxSL1wiO1xyXG4gICAgdmFyIG1ham9yQW5kTWlub3IgPSB2ZXJzaW9uLnNwbGl0KFwiLlwiKTtcclxuICAgIHVzZXJBZ2VudCArPSBtYWpvckFuZE1pbm9yWzBdICsgXCIuXCIgKyBtYWpvckFuZE1pbm9yWzFdO1xyXG4gICAgdXNlckFnZW50ICs9IFwiIChcIiArIHZlcnNpb24gKyBcIjsgXCI7XHJcbiAgICBpZiAob3MgJiYgb3MgIT09IFwiXCIpIHtcclxuICAgICAgICB1c2VyQWdlbnQgKz0gb3MgKyBcIjsgXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB1c2VyQWdlbnQgKz0gXCJVbmtub3duIE9TOyBcIjtcclxuICAgIH1cclxuICAgIHVzZXJBZ2VudCArPSBcIlwiICsgcnVudGltZTtcclxuICAgIGlmIChydW50aW1lVmVyc2lvbikge1xyXG4gICAgICAgIHVzZXJBZ2VudCArPSBcIjsgXCIgKyBydW50aW1lVmVyc2lvbjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHVzZXJBZ2VudCArPSBcIjsgVW5rbm93biBSdW50aW1lIFZlcnNpb25cIjtcclxuICAgIH1cclxuICAgIHVzZXJBZ2VudCArPSBcIilcIjtcclxuICAgIHJldHVybiB1c2VyQWdlbnQ7XHJcbn1cclxuZnVuY3Rpb24gZ2V0T3NOYW1lKCkge1xyXG4gICAgaWYgKFBsYXRmb3JtLmlzTm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAocHJvY2Vzcy5wbGF0Zm9ybSkge1xyXG4gICAgICAgICAgICBjYXNlIFwid2luMzJcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIldpbmRvd3MgTlRcIjtcclxuICAgICAgICAgICAgY2FzZSBcImRhcndpblwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibWFjT1NcIjtcclxuICAgICAgICAgICAgY2FzZSBcImxpbnV4XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJMaW51eFwiO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3MucGxhdGZvcm07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0UnVudGltZVZlcnNpb24oKSB7XHJcbiAgICBpZiAoUGxhdGZvcm0uaXNOb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb2Nlc3MudmVyc2lvbnMubm9kZTtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuZnVuY3Rpb24gZ2V0UnVudGltZSgpIHtcclxuICAgIGlmIChQbGF0Zm9ybS5pc05vZGUpIHtcclxuICAgICAgICByZXR1cm4gXCJOb2RlSlNcIjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBcIkJyb3dzZXJcIjtcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1VdGlscy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxyXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59O1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbmltcG9ydCB7IEFib3J0RXJyb3IsIEh0dHBFcnJvciwgVGltZW91dEVycm9yIH0gZnJvbSBcIi4vRXJyb3JzXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXNwb25zZSB9IGZyb20gXCIuL0h0dHBDbGllbnRcIjtcclxuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tIFwiLi9JTG9nZ2VyXCI7XHJcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxudmFyIEZldGNoSHR0cENsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhGZXRjaEh0dHBDbGllbnQsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBGZXRjaEh0dHBDbGllbnQobG9nZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBmZXRjaCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAvLyBJbiBvcmRlciB0byBpZ25vcmUgdGhlIGR5bmFtaWMgcmVxdWlyZSBpbiB3ZWJwYWNrIGJ1aWxkcyB3ZSBuZWVkIHRvIGRvIHRoaXMgbWFnaWNcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZTogVFMgZG9lc24ndCBrbm93IGFib3V0IHRoZXNlIG5hbWVzXHJcbiAgICAgICAgICAgIHZhciByZXF1aXJlRnVuYyA9IHR5cGVvZiBfX3dlYnBhY2tfcmVxdWlyZV9fID09PSBcImZ1bmN0aW9uXCIgPyBfX25vbl93ZWJwYWNrX3JlcXVpcmVfXyA6IHJlcXVpcmU7XHJcbiAgICAgICAgICAgIC8vIENvb2tpZXMgYXJlbid0IGF1dG9tYXRpY2FsbHkgaGFuZGxlZCBpbiBOb2RlIHNvIHdlIG5lZWQgdG8gYWRkIGEgQ29va2llSmFyIHRvIHByZXNlcnZlIGNvb2tpZXMgYWNyb3NzIHJlcXVlc3RzXHJcbiAgICAgICAgICAgIF90aGlzLmphciA9IG5ldyAocmVxdWlyZUZ1bmMoXCJ0b3VnaC1jb29raWVcIikpLkNvb2tpZUphcigpO1xyXG4gICAgICAgICAgICBfdGhpcy5mZXRjaFR5cGUgPSByZXF1aXJlRnVuYyhcIm5vZGUtZmV0Y2hcIik7XHJcbiAgICAgICAgICAgIC8vIG5vZGUtZmV0Y2ggZG9lc24ndCBoYXZlIGEgbmljZSBBUEkgZm9yIGdldHRpbmcgYW5kIHNldHRpbmcgY29va2llc1xyXG4gICAgICAgICAgICAvLyBmZXRjaC1jb29raWUgd2lsbCB3cmFwIGEgZmV0Y2ggaW1wbGVtZW50YXRpb24gd2l0aCBhIGRlZmF1bHQgQ29va2llSmFyIG9yIGEgcHJvdmlkZWQgb25lXHJcbiAgICAgICAgICAgIF90aGlzLmZldGNoVHlwZSA9IHJlcXVpcmVGdW5jKFwiZmV0Y2gtY29va2llXCIpKF90aGlzLmZldGNoVHlwZSwgX3RoaXMuamFyKTtcclxuICAgICAgICAgICAgLy8gTm9kZSBuZWVkcyBFdmVudExpc3RlbmVyIG1ldGhvZHMgb24gQWJvcnRDb250cm9sbGVyIHdoaWNoIG91ciBjdXN0b20gcG9seWZpbGwgZG9lc24ndCBwcm92aWRlXHJcbiAgICAgICAgICAgIF90aGlzLmFib3J0Q29udHJvbGxlclR5cGUgPSByZXF1aXJlRnVuYyhcImFib3J0LWNvbnRyb2xsZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBfdGhpcy5mZXRjaFR5cGUgPSBmZXRjaC5iaW5kKHNlbGYpO1xyXG4gICAgICAgICAgICBfdGhpcy5hYm9ydENvbnRyb2xsZXJUeXBlID0gQWJvcnRDb250cm9sbGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogQGluaGVyaXREb2MgKi9cclxuICAgIEZldGNoSHR0cENsaWVudC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYWJvcnRDb250cm9sbGVyLCBlcnJvciwgdGltZW91dElkLCBtc1RpbWVvdXQsIHJlc3BvbnNlLCBlXzEsIGNvbnRlbnQsIHBheWxvYWQ7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgYWJvcnQgd2FzIG5vdCBzaWduYWxlZCBiZWZvcmUgY2FsbGluZyBzZW5kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LmFib3J0U2lnbmFsICYmIHJlcXVlc3QuYWJvcnRTaWduYWwuYWJvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFib3J0RXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcXVlc3QubWV0aG9kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBtZXRob2QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXF1ZXN0LnVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gdXJsIGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0Q29udHJvbGxlciA9IG5ldyB0aGlzLmFib3J0Q29udHJvbGxlclR5cGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSG9vayBvdXIgYWJvcnRTaWduYWwgaW50byB0aGUgYWJvcnQgY29udHJvbGxlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5hYm9ydFNpZ25hbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5hYm9ydFNpZ25hbC5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEFib3J0RXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dElkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QudGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNUaW1lb3V0ID0gcmVxdWVzdC50aW1lb3V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRDb250cm9sbGVyLmFib3J0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5XYXJuaW5nLCBcIlRpbWVvdXQgZnJvbSBIVFRQIHJlcXVlc3QuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IFRpbWVvdXRFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgbXNUaW1lb3V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzEsIDMsIDQsIDVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaFR5cGUocmVxdWVzdC51cmwsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiByZXF1ZXN0LmNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGU6IFwibm8tY2FjaGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPT09IHRydWUgPyBcImluY2x1ZGVcIiA6IFwic2FtZS1vcmlnaW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBfX2Fzc2lnbih7IFwiQ29udGVudC1UeXBlXCI6IFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIsIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiOiBcIlhNTEh0dHBSZXF1ZXN0XCIgfSwgcmVxdWVzdC5oZWFkZXJzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IHJlcXVlc3QubWV0aG9kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IFwiY29yc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0OiBcIm1hbnVhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbDogYWJvcnRDb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA1XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuV2FybmluZywgXCJFcnJvciBmcm9tIEhUVFAgcmVxdWVzdC4gXCIgKyBlXzEgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVfMTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aW1lb3V0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LmFib3J0U2lnbmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmFib3J0U2lnbmFsLm9uYWJvcnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNyAvKmVuZGZpbmFsbHkqL107XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSHR0cEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQsIHJlc3BvbnNlLnN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IGRlc2VyaWFsaXplQ29udGVudChyZXNwb25zZSwgcmVxdWVzdC5yZXNwb25zZVR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBjb250ZW50XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBuZXcgSHR0cFJlc3BvbnNlKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2Uuc3RhdHVzVGV4dCwgcGF5bG9hZCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBGZXRjaEh0dHBDbGllbnQucHJvdG90eXBlLmdldENvb2tpZVN0cmluZyA9IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICB2YXIgY29va2llcyA9IFwiXCI7XHJcbiAgICAgICAgaWYgKFBsYXRmb3JtLmlzTm9kZSAmJiB0aGlzLmphcikge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlOiB1bnVzZWQgdmFyaWFibGVcclxuICAgICAgICAgICAgdGhpcy5qYXIuZ2V0Q29va2llcyh1cmwsIGZ1bmN0aW9uIChlLCBjKSB7IHJldHVybiBjb29raWVzID0gYy5qb2luKFwiOyBcIik7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29va2llcztcclxuICAgIH07XHJcbiAgICByZXR1cm4gRmV0Y2hIdHRwQ2xpZW50O1xyXG59KEh0dHBDbGllbnQpKTtcclxuZXhwb3J0IHsgRmV0Y2hIdHRwQ2xpZW50IH07XHJcbmZ1bmN0aW9uIGRlc2VyaWFsaXplQ29udGVudChyZXNwb25zZSwgcmVzcG9uc2VUeXBlKSB7XHJcbiAgICB2YXIgY29udGVudDtcclxuICAgIHN3aXRjaCAocmVzcG9uc2VUeXBlKSB7XHJcbiAgICAgICAgY2FzZSBcImFycmF5YnVmZmVyXCI6XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSByZXNwb25zZS5hcnJheUJ1ZmZlcigpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwidGV4dFwiOlxyXG4gICAgICAgICAgICBjb250ZW50ID0gcmVzcG9uc2UudGV4dCgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiYmxvYlwiOlxyXG4gICAgICAgIGNhc2UgXCJkb2N1bWVudFwiOlxyXG4gICAgICAgIGNhc2UgXCJqc29uXCI6XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZVR5cGUgKyBcIiBpcyBub3Qgc3VwcG9ydGVkLlwiKTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb250ZW50ID0gcmVzcG9uc2UudGV4dCgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiBjb250ZW50O1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZldGNoSHR0cENsaWVudC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5pbXBvcnQgeyBBYm9ydEVycm9yLCBIdHRwRXJyb3IsIFRpbWVvdXRFcnJvciB9IGZyb20gXCIuL0Vycm9yc1wiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiLi9IdHRwQ2xpZW50XCI7XHJcbmltcG9ydCB7IExvZ0xldmVsIH0gZnJvbSBcIi4vSUxvZ2dlclwiO1xyXG52YXIgWGhySHR0cENsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhYaHJIdHRwQ2xpZW50LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gWGhySHR0cENsaWVudChsb2dnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmxvZ2dlciA9IGxvZ2dlcjtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogQGluaGVyaXREb2MgKi9cclxuICAgIFhockh0dHBDbGllbnQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLy8gQ2hlY2sgdGhhdCBhYm9ydCB3YXMgbm90IHNpZ25hbGVkIGJlZm9yZSBjYWxsaW5nIHNlbmRcclxuICAgICAgICBpZiAocmVxdWVzdC5hYm9ydFNpZ25hbCAmJiByZXF1ZXN0LmFib3J0U2lnbmFsLmFib3J0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBBYm9ydEVycm9yKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXJlcXVlc3QubWV0aG9kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBtZXRob2QgZGVmaW5lZC5cIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXJlcXVlc3QudXJsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyB1cmwgZGVmaW5lZC5cIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHhoci5vcGVuKHJlcXVlc3QubWV0aG9kLCByZXF1ZXN0LnVybCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzO1xyXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIlgtUmVxdWVzdGVkLVdpdGhcIiwgXCJYTUxIdHRwUmVxdWVzdFwiKTtcclxuICAgICAgICAgICAgLy8gRXhwbGljaXRseSBzZXR0aW5nIHRoZSBDb250ZW50LVR5cGUgaGVhZGVyIGZvciBSZWFjdCBOYXRpdmUgb24gQW5kcm9pZCBwbGF0Zm9ybS5cclxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIik7XHJcbiAgICAgICAgICAgIHZhciBoZWFkZXJzID0gcmVxdWVzdC5oZWFkZXJzO1xyXG4gICAgICAgICAgICBpZiAoaGVhZGVycykge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoaGVhZGVycylcclxuICAgICAgICAgICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoaGVhZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBoZWFkZXJzW2hlYWRlcl0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJlcXVlc3QucmVzcG9uc2VUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gcmVxdWVzdC5yZXNwb25zZVR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJlcXVlc3QuYWJvcnRTaWduYWwpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3QuYWJvcnRTaWduYWwub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB4aHIuYWJvcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEFib3J0RXJyb3IoKSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIHhoci50aW1lb3V0ID0gcmVxdWVzdC50aW1lb3V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5hYm9ydFNpZ25hbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuYWJvcnRTaWduYWwub25hYm9ydCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobmV3IEh0dHBSZXNwb25zZSh4aHIuc3RhdHVzLCB4aHIuc3RhdHVzVGV4dCwgeGhyLnJlc3BvbnNlIHx8IHhoci5yZXNwb25zZVRleHQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgSHR0cEVycm9yKHhoci5zdGF0dXNUZXh0LCB4aHIuc3RhdHVzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5XYXJuaW5nLCBcIkVycm9yIGZyb20gSFRUUCByZXF1ZXN0LiBcIiArIHhoci5zdGF0dXMgKyBcIjogXCIgKyB4aHIuc3RhdHVzVGV4dCArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgSHR0cEVycm9yKHhoci5zdGF0dXNUZXh0LCB4aHIuc3RhdHVzKSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLldhcm5pbmcsIFwiVGltZW91dCBmcm9tIEhUVFAgcmVxdWVzdC5cIik7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IFRpbWVvdXRFcnJvcigpKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgeGhyLnNlbmQocmVxdWVzdC5jb250ZW50IHx8IFwiXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBYaHJIdHRwQ2xpZW50O1xyXG59KEh0dHBDbGllbnQpKTtcclxuZXhwb3J0IHsgWGhySHR0cENsaWVudCB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1YaHJIdHRwQ2xpZW50LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbmltcG9ydCB7IEFib3J0RXJyb3IgfSBmcm9tIFwiLi9FcnJvcnNcIjtcclxuaW1wb3J0IHsgRmV0Y2hIdHRwQ2xpZW50IH0gZnJvbSBcIi4vRmV0Y2hIdHRwQ2xpZW50XCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tIFwiLi9IdHRwQ2xpZW50XCI7XHJcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IHsgWGhySHR0cENsaWVudCB9IGZyb20gXCIuL1hockh0dHBDbGllbnRcIjtcclxuLyoqIERlZmF1bHQgaW1wbGVtZW50YXRpb24gb2Yge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5IdHRwQ2xpZW50fS4gKi9cclxudmFyIERlZmF1bHRIdHRwQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKERlZmF1bHRIdHRwQ2xpZW50LCBfc3VwZXIpO1xyXG4gICAgLyoqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuRGVmYXVsdEh0dHBDbGllbnR9LCB1c2luZyB0aGUgcHJvdmlkZWQge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5JTG9nZ2VyfSB0byBsb2cgbWVzc2FnZXMuICovXHJcbiAgICBmdW5jdGlvbiBEZWZhdWx0SHR0cENsaWVudChsb2dnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZmV0Y2ggIT09IFwidW5kZWZpbmVkXCIgfHwgUGxhdGZvcm0uaXNOb2RlKSB7XHJcbiAgICAgICAgICAgIF90aGlzLmh0dHBDbGllbnQgPSBuZXcgRmV0Y2hIdHRwQ2xpZW50KGxvZ2dlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBfdGhpcy5odHRwQ2xpZW50ID0gbmV3IFhockh0dHBDbGllbnQobG9nZ2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHVzYWJsZSBIdHRwQ2xpZW50IGZvdW5kLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICBEZWZhdWx0SHR0cENsaWVudC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgdGhhdCBhYm9ydCB3YXMgbm90IHNpZ25hbGVkIGJlZm9yZSBjYWxsaW5nIHNlbmRcclxuICAgICAgICBpZiAocmVxdWVzdC5hYm9ydFNpZ25hbCAmJiByZXF1ZXN0LmFib3J0U2lnbmFsLmFib3J0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBBYm9ydEVycm9yKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXJlcXVlc3QubWV0aG9kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBtZXRob2QgZGVmaW5lZC5cIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXJlcXVlc3QudXJsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyB1cmwgZGVmaW5lZC5cIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnNlbmQocmVxdWVzdCk7XHJcbiAgICB9O1xyXG4gICAgRGVmYXVsdEh0dHBDbGllbnQucHJvdG90eXBlLmdldENvb2tpZVN0cmluZyA9IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LmdldENvb2tpZVN0cmluZyh1cmwpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBEZWZhdWx0SHR0cENsaWVudDtcclxufShIdHRwQ2xpZW50KSk7XHJcbmV4cG9ydCB7IERlZmF1bHRIdHRwQ2xpZW50IH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURlZmF1bHRIdHRwQ2xpZW50LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gTm90IGV4cG9ydGVkIGZyb20gaW5kZXhcclxuLyoqIEBwcml2YXRlICovXHJcbnZhciBUZXh0TWVzc2FnZUZvcm1hdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFRleHRNZXNzYWdlRm9ybWF0KCkge1xyXG4gICAgfVxyXG4gICAgVGV4dE1lc3NhZ2VGb3JtYXQud3JpdGUgPSBmdW5jdGlvbiAob3V0cHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCIgKyBvdXRwdXQgKyBUZXh0TWVzc2FnZUZvcm1hdC5SZWNvcmRTZXBhcmF0b3I7XHJcbiAgICB9O1xyXG4gICAgVGV4dE1lc3NhZ2VGb3JtYXQucGFyc2UgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgICAgICBpZiAoaW5wdXRbaW5wdXQubGVuZ3RoIC0gMV0gIT09IFRleHRNZXNzYWdlRm9ybWF0LlJlY29yZFNlcGFyYXRvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXNzYWdlIGlzIGluY29tcGxldGUuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbWVzc2FnZXMgPSBpbnB1dC5zcGxpdChUZXh0TWVzc2FnZUZvcm1hdC5SZWNvcmRTZXBhcmF0b3IpO1xyXG4gICAgICAgIG1lc3NhZ2VzLnBvcCgpO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlcztcclxuICAgIH07XHJcbiAgICBUZXh0TWVzc2FnZUZvcm1hdC5SZWNvcmRTZXBhcmF0b3JDb2RlID0gMHgxZTtcclxuICAgIFRleHRNZXNzYWdlRm9ybWF0LlJlY29yZFNlcGFyYXRvciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoVGV4dE1lc3NhZ2VGb3JtYXQuUmVjb3JkU2VwYXJhdG9yQ29kZSk7XHJcbiAgICByZXR1cm4gVGV4dE1lc3NhZ2VGb3JtYXQ7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IFRleHRNZXNzYWdlRm9ybWF0IH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRleHRNZXNzYWdlRm9ybWF0LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuaW1wb3J0IHsgVGV4dE1lc3NhZ2VGb3JtYXQgfSBmcm9tIFwiLi9UZXh0TWVzc2FnZUZvcm1hdFwiO1xyXG5pbXBvcnQgeyBpc0FycmF5QnVmZmVyIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuLyoqIEBwcml2YXRlICovXHJcbnZhciBIYW5kc2hha2VQcm90b2NvbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEhhbmRzaGFrZVByb3RvY29sKCkge1xyXG4gICAgfVxyXG4gICAgLy8gSGFuZHNoYWtlIHJlcXVlc3QgaXMgYWx3YXlzIEpTT05cclxuICAgIEhhbmRzaGFrZVByb3RvY29sLnByb3RvdHlwZS53cml0ZUhhbmRzaGFrZVJlcXVlc3QgPSBmdW5jdGlvbiAoaGFuZHNoYWtlUmVxdWVzdCkge1xyXG4gICAgICAgIHJldHVybiBUZXh0TWVzc2FnZUZvcm1hdC53cml0ZShKU09OLnN0cmluZ2lmeShoYW5kc2hha2VSZXF1ZXN0KSk7XHJcbiAgICB9O1xyXG4gICAgSGFuZHNoYWtlUHJvdG9jb2wucHJvdG90eXBlLnBhcnNlSGFuZHNoYWtlUmVzcG9uc2UgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciByZXNwb25zZU1lc3NhZ2U7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2VEYXRhO1xyXG4gICAgICAgIHZhciByZW1haW5pbmdEYXRhO1xyXG4gICAgICAgIGlmIChpc0FycmF5QnVmZmVyKGRhdGEpIHx8ICh0eXBlb2YgQnVmZmVyICE9PSBcInVuZGVmaW5lZFwiICYmIGRhdGEgaW5zdGFuY2VvZiBCdWZmZXIpKSB7XHJcbiAgICAgICAgICAgIC8vIEZvcm1hdCBpcyBiaW5hcnkgYnV0IHN0aWxsIG5lZWQgdG8gcmVhZCBKU09OIHRleHQgZnJvbSBoYW5kc2hha2UgcmVzcG9uc2VcclxuICAgICAgICAgICAgdmFyIGJpbmFyeURhdGEgPSBuZXcgVWludDhBcnJheShkYXRhKTtcclxuICAgICAgICAgICAgdmFyIHNlcGFyYXRvckluZGV4ID0gYmluYXJ5RGF0YS5pbmRleE9mKFRleHRNZXNzYWdlRm9ybWF0LlJlY29yZFNlcGFyYXRvckNvZGUpO1xyXG4gICAgICAgICAgICBpZiAoc2VwYXJhdG9ySW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXNzYWdlIGlzIGluY29tcGxldGUuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNvbnRlbnQgYmVmb3JlIHNlcGFyYXRvciBpcyBoYW5kc2hha2UgcmVzcG9uc2VcclxuICAgICAgICAgICAgLy8gb3B0aW9uYWwgY29udGVudCBhZnRlciBpcyBhZGRpdGlvbmFsIG1lc3NhZ2VzXHJcbiAgICAgICAgICAgIHZhciByZXNwb25zZUxlbmd0aCA9IHNlcGFyYXRvckluZGV4ICsgMTtcclxuICAgICAgICAgICAgbWVzc2FnZURhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGJpbmFyeURhdGEuc2xpY2UoMCwgcmVzcG9uc2VMZW5ndGgpKTtcclxuICAgICAgICAgICAgcmVtYWluaW5nRGF0YSA9IChiaW5hcnlEYXRhLmJ5dGVMZW5ndGggPiByZXNwb25zZUxlbmd0aCkgPyBiaW5hcnlEYXRhLnNsaWNlKHJlc3BvbnNlTGVuZ3RoKS5idWZmZXIgOiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHRleHREYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgdmFyIHNlcGFyYXRvckluZGV4ID0gdGV4dERhdGEuaW5kZXhPZihUZXh0TWVzc2FnZUZvcm1hdC5SZWNvcmRTZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICBpZiAoc2VwYXJhdG9ySW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXNzYWdlIGlzIGluY29tcGxldGUuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNvbnRlbnQgYmVmb3JlIHNlcGFyYXRvciBpcyBoYW5kc2hha2UgcmVzcG9uc2VcclxuICAgICAgICAgICAgLy8gb3B0aW9uYWwgY29udGVudCBhZnRlciBpcyBhZGRpdGlvbmFsIG1lc3NhZ2VzXHJcbiAgICAgICAgICAgIHZhciByZXNwb25zZUxlbmd0aCA9IHNlcGFyYXRvckluZGV4ICsgMTtcclxuICAgICAgICAgICAgbWVzc2FnZURhdGEgPSB0ZXh0RGF0YS5zdWJzdHJpbmcoMCwgcmVzcG9uc2VMZW5ndGgpO1xyXG4gICAgICAgICAgICByZW1haW5pbmdEYXRhID0gKHRleHREYXRhLmxlbmd0aCA+IHJlc3BvbnNlTGVuZ3RoKSA/IHRleHREYXRhLnN1YnN0cmluZyhyZXNwb25zZUxlbmd0aCkgOiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBdCB0aGlzIHBvaW50IHdlIHNob3VsZCBoYXZlIGp1c3QgdGhlIHNpbmdsZSBoYW5kc2hha2UgbWVzc2FnZVxyXG4gICAgICAgIHZhciBtZXNzYWdlcyA9IFRleHRNZXNzYWdlRm9ybWF0LnBhcnNlKG1lc3NhZ2VEYXRhKTtcclxuICAgICAgICB2YXIgcmVzcG9uc2UgPSBKU09OLnBhcnNlKG1lc3NhZ2VzWzBdKTtcclxuICAgICAgICBpZiAocmVzcG9uc2UudHlwZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCBhIGhhbmRzaGFrZSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXNwb25zZU1lc3NhZ2UgPSByZXNwb25zZTtcclxuICAgICAgICAvLyBtdWx0aXBsZSBtZXNzYWdlcyBjb3VsZCBoYXZlIGFycml2ZWQgd2l0aCBoYW5kc2hha2VcclxuICAgICAgICAvLyByZXR1cm4gYWRkaXRpb25hbCBkYXRhIHRvIGJlIHBhcnNlZCBhcyB1c3VhbCwgb3IgbnVsbCBpZiBhbGwgcGFyc2VkXHJcbiAgICAgICAgcmV0dXJuIFtyZW1haW5pbmdEYXRhLCByZXNwb25zZU1lc3NhZ2VdO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBIYW5kc2hha2VQcm90b2NvbDtcclxufSgpKTtcclxuZXhwb3J0IHsgSGFuZHNoYWtlUHJvdG9jb2wgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SGFuZHNoYWtlUHJvdG9jb2wuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vKiogRGVmaW5lcyB0aGUgdHlwZSBvZiBhIEh1YiBNZXNzYWdlLiAqL1xyXG5leHBvcnQgdmFyIE1lc3NhZ2VUeXBlO1xyXG4oZnVuY3Rpb24gKE1lc3NhZ2VUeXBlKSB7XHJcbiAgICAvKiogSW5kaWNhdGVzIHRoZSBtZXNzYWdlIGlzIGFuIEludm9jYXRpb24gbWVzc2FnZSBhbmQgaW1wbGVtZW50cyB0aGUge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5JbnZvY2F0aW9uTWVzc2FnZX0gaW50ZXJmYWNlLiAqL1xyXG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJJbnZvY2F0aW9uXCJdID0gMV0gPSBcIkludm9jYXRpb25cIjtcclxuICAgIC8qKiBJbmRpY2F0ZXMgdGhlIG1lc3NhZ2UgaXMgYSBTdHJlYW1JdGVtIG1lc3NhZ2UgYW5kIGltcGxlbWVudHMgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuU3RyZWFtSXRlbU1lc3NhZ2V9IGludGVyZmFjZS4gKi9cclxuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiU3RyZWFtSXRlbVwiXSA9IDJdID0gXCJTdHJlYW1JdGVtXCI7XHJcbiAgICAvKiogSW5kaWNhdGVzIHRoZSBtZXNzYWdlIGlzIGEgQ29tcGxldGlvbiBtZXNzYWdlIGFuZCBpbXBsZW1lbnRzIHRoZSB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLkNvbXBsZXRpb25NZXNzYWdlfSBpbnRlcmZhY2UuICovXHJcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcIkNvbXBsZXRpb25cIl0gPSAzXSA9IFwiQ29tcGxldGlvblwiO1xyXG4gICAgLyoqIEluZGljYXRlcyB0aGUgbWVzc2FnZSBpcyBhIFN0cmVhbSBJbnZvY2F0aW9uIG1lc3NhZ2UgYW5kIGltcGxlbWVudHMgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuU3RyZWFtSW52b2NhdGlvbk1lc3NhZ2V9IGludGVyZmFjZS4gKi9cclxuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiU3RyZWFtSW52b2NhdGlvblwiXSA9IDRdID0gXCJTdHJlYW1JbnZvY2F0aW9uXCI7XHJcbiAgICAvKiogSW5kaWNhdGVzIHRoZSBtZXNzYWdlIGlzIGEgQ2FuY2VsIEludm9jYXRpb24gbWVzc2FnZSBhbmQgaW1wbGVtZW50cyB0aGUge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5DYW5jZWxJbnZvY2F0aW9uTWVzc2FnZX0gaW50ZXJmYWNlLiAqL1xyXG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJDYW5jZWxJbnZvY2F0aW9uXCJdID0gNV0gPSBcIkNhbmNlbEludm9jYXRpb25cIjtcclxuICAgIC8qKiBJbmRpY2F0ZXMgdGhlIG1lc3NhZ2UgaXMgYSBQaW5nIG1lc3NhZ2UgYW5kIGltcGxlbWVudHMgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuUGluZ01lc3NhZ2V9IGludGVyZmFjZS4gKi9cclxuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiUGluZ1wiXSA9IDZdID0gXCJQaW5nXCI7XHJcbiAgICAvKiogSW5kaWNhdGVzIHRoZSBtZXNzYWdlIGlzIGEgQ2xvc2UgbWVzc2FnZSBhbmQgaW1wbGVtZW50cyB0aGUge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5DbG9zZU1lc3NhZ2V9IGludGVyZmFjZS4gKi9cclxuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiQ2xvc2VcIl0gPSA3XSA9IFwiQ2xvc2VcIjtcclxufSkoTWVzc2FnZVR5cGUgfHwgKE1lc3NhZ2VUeXBlID0ge30pKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SUh1YlByb3RvY29sLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuaW1wb3J0IHsgU3ViamVjdFN1YnNjcmlwdGlvbiB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbi8qKiBTdHJlYW0gaW1wbGVtZW50YXRpb24gdG8gc3RyZWFtIGl0ZW1zIHRvIHRoZSBzZXJ2ZXIuICovXHJcbnZhciBTdWJqZWN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU3ViamVjdCgpIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVycyA9IFtdO1xyXG4gICAgfVxyXG4gICAgU3ViamVjdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMub2JzZXJ2ZXJzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBfYVtfaV07XHJcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFN1YmplY3QucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLm9ic2VydmVyczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIG9ic2VydmVyID0gX2FbX2ldO1xyXG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXIuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgU3ViamVjdC5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMub2JzZXJ2ZXJzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBfYVtfaV07XHJcbiAgICAgICAgICAgIGlmIChvYnNlcnZlci5jb21wbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgICAgICByZXR1cm4gbmV3IFN1YmplY3RTdWJzY3JpcHRpb24odGhpcywgb2JzZXJ2ZXIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBTdWJqZWN0O1xyXG59KCkpO1xyXG5leHBvcnQgeyBTdWJqZWN0IH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YmplY3QuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbmltcG9ydCB7IEhhbmRzaGFrZVByb3RvY29sIH0gZnJvbSBcIi4vSGFuZHNoYWtlUHJvdG9jb2xcIjtcclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9JSHViUHJvdG9jb2xcIjtcclxuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tIFwiLi9JTG9nZ2VyXCI7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwiLi9TdWJqZWN0XCI7XHJcbmltcG9ydCB7IEFyZyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbnZhciBERUZBVUxUX1RJTUVPVVRfSU5fTVMgPSAzMCAqIDEwMDA7XHJcbnZhciBERUZBVUxUX1BJTkdfSU5URVJWQUxfSU5fTVMgPSAxNSAqIDEwMDA7XHJcbi8qKiBEZXNjcmliZXMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHtAbGluayBIdWJDb25uZWN0aW9ufSB0byB0aGUgc2VydmVyLiAqL1xyXG5leHBvcnQgdmFyIEh1YkNvbm5lY3Rpb25TdGF0ZTtcclxuKGZ1bmN0aW9uIChIdWJDb25uZWN0aW9uU3RhdGUpIHtcclxuICAgIC8qKiBUaGUgaHViIGNvbm5lY3Rpb24gaXMgZGlzY29ubmVjdGVkLiAqL1xyXG4gICAgSHViQ29ubmVjdGlvblN0YXRlW1wiRGlzY29ubmVjdGVkXCJdID0gXCJEaXNjb25uZWN0ZWRcIjtcclxuICAgIC8qKiBUaGUgaHViIGNvbm5lY3Rpb24gaXMgY29ubmVjdGluZy4gKi9cclxuICAgIEh1YkNvbm5lY3Rpb25TdGF0ZVtcIkNvbm5lY3RpbmdcIl0gPSBcIkNvbm5lY3RpbmdcIjtcclxuICAgIC8qKiBUaGUgaHViIGNvbm5lY3Rpb24gaXMgY29ubmVjdGVkLiAqL1xyXG4gICAgSHViQ29ubmVjdGlvblN0YXRlW1wiQ29ubmVjdGVkXCJdID0gXCJDb25uZWN0ZWRcIjtcclxuICAgIC8qKiBUaGUgaHViIGNvbm5lY3Rpb24gaXMgZGlzY29ubmVjdGluZy4gKi9cclxuICAgIEh1YkNvbm5lY3Rpb25TdGF0ZVtcIkRpc2Nvbm5lY3RpbmdcIl0gPSBcIkRpc2Nvbm5lY3RpbmdcIjtcclxuICAgIC8qKiBUaGUgaHViIGNvbm5lY3Rpb24gaXMgcmVjb25uZWN0aW5nLiAqL1xyXG4gICAgSHViQ29ubmVjdGlvblN0YXRlW1wiUmVjb25uZWN0aW5nXCJdID0gXCJSZWNvbm5lY3RpbmdcIjtcclxufSkoSHViQ29ubmVjdGlvblN0YXRlIHx8IChIdWJDb25uZWN0aW9uU3RhdGUgPSB7fSkpO1xyXG4vKiogUmVwcmVzZW50cyBhIGNvbm5lY3Rpb24gdG8gYSBTaWduYWxSIEh1Yi4gKi9cclxudmFyIEh1YkNvbm5lY3Rpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBIdWJDb25uZWN0aW9uKGNvbm5lY3Rpb24sIGxvZ2dlciwgcHJvdG9jb2wsIHJlY29ubmVjdFBvbGljeSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5uZXh0S2VlcEFsaXZlID0gMDtcclxuICAgICAgICBBcmcuaXNSZXF1aXJlZChjb25uZWN0aW9uLCBcImNvbm5lY3Rpb25cIik7XHJcbiAgICAgICAgQXJnLmlzUmVxdWlyZWQobG9nZ2VyLCBcImxvZ2dlclwiKTtcclxuICAgICAgICBBcmcuaXNSZXF1aXJlZChwcm90b2NvbCwgXCJwcm90b2NvbFwiKTtcclxuICAgICAgICB0aGlzLnNlcnZlclRpbWVvdXRJbk1pbGxpc2Vjb25kcyA9IERFRkFVTFRfVElNRU9VVF9JTl9NUztcclxuICAgICAgICB0aGlzLmtlZXBBbGl2ZUludGVydmFsSW5NaWxsaXNlY29uZHMgPSBERUZBVUxUX1BJTkdfSU5URVJWQUxfSU5fTVM7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICAgICAgdGhpcy5wcm90b2NvbCA9IHByb3RvY29sO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XHJcbiAgICAgICAgdGhpcy5yZWNvbm5lY3RQb2xpY3kgPSByZWNvbm5lY3RQb2xpY3k7XHJcbiAgICAgICAgdGhpcy5oYW5kc2hha2VQcm90b2NvbCA9IG5ldyBIYW5kc2hha2VQcm90b2NvbCgpO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbnJlY2VpdmUgPSBmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gX3RoaXMucHJvY2Vzc0luY29taW5nRGF0YShkYXRhKTsgfTtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25jbG9zZSA9IGZ1bmN0aW9uIChlcnJvcikgeyByZXR1cm4gX3RoaXMuY29ubmVjdGlvbkNsb3NlZChlcnJvcik7IH07XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSB7fTtcclxuICAgICAgICB0aGlzLm1ldGhvZHMgPSB7fTtcclxuICAgICAgICB0aGlzLmNsb3NlZENhbGxiYWNrcyA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVjb25uZWN0aW5nQ2FsbGJhY2tzID0gW107XHJcbiAgICAgICAgdGhpcy5yZWNvbm5lY3RlZENhbGxiYWNrcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW52b2NhdGlvbklkID0gMDtcclxuICAgICAgICB0aGlzLnJlY2VpdmVkSGFuZHNoYWtlUmVzcG9uc2UgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQ7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FjaGVkUGluZ01lc3NhZ2UgPSB0aGlzLnByb3RvY29sLndyaXRlTWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBpbmcgfSk7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICAvLyBVc2luZyBhIHB1YmxpYyBzdGF0aWMgZmFjdG9yeSBtZXRob2QgbWVhbnMgd2UgY2FuIGhhdmUgYSBwcml2YXRlIGNvbnN0cnVjdG9yIGFuZCBhbiBfaW50ZXJuYWxfXHJcbiAgICAvLyBjcmVhdGUgbWV0aG9kIHRoYXQgY2FuIGJlIHVzZWQgYnkgSHViQ29ubmVjdGlvbkJ1aWxkZXIuIEFuIFwiaW50ZXJuYWxcIiBjb25zdHJ1Y3RvciB3b3VsZCBqdXN0XHJcbiAgICAvLyBiZSBzdHJpcHBlZCBhd2F5IGFuZCB0aGUgJy5kLnRzJyBmaWxlIHdvdWxkIGhhdmUgbm8gY29uc3RydWN0b3IsIHdoaWNoIGlzIGludGVycHJldGVkIGFzIGFcclxuICAgIC8vIHB1YmxpYyBwYXJhbWV0ZXItbGVzcyBjb25zdHJ1Y3Rvci5cclxuICAgIEh1YkNvbm5lY3Rpb24uY3JlYXRlID0gZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGxvZ2dlciwgcHJvdG9jb2wsIHJlY29ubmVjdFBvbGljeSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgSHViQ29ubmVjdGlvbihjb25uZWN0aW9uLCBsb2dnZXIsIHByb3RvY29sLCByZWNvbm5lY3RQb2xpY3kpO1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIdWJDb25uZWN0aW9uLnByb3RvdHlwZSwgXCJzdGF0ZVwiLCB7XHJcbiAgICAgICAgLyoqIEluZGljYXRlcyB0aGUgc3RhdGUgb2YgdGhlIHtAbGluayBIdWJDb25uZWN0aW9ufSB0byB0aGUgc2VydmVyLiAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uU3RhdGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSHViQ29ubmVjdGlvbi5wcm90b3R5cGUsIFwiY29ubmVjdGlvbklkXCIsIHtcclxuICAgICAgICAvKiogUmVwcmVzZW50cyB0aGUgY29ubmVjdGlvbiBpZCBvZiB0aGUge0BsaW5rIEh1YkNvbm5lY3Rpb259IG9uIHRoZSBzZXJ2ZXIuIFRoZSBjb25uZWN0aW9uIGlkIHdpbGwgYmUgbnVsbCB3aGVuIHRoZSBjb25uZWN0aW9uIGlzIGVpdGhlclxyXG4gICAgICAgICAqICBpbiB0aGUgZGlzY29ubmVjdGVkIHN0YXRlIG9yIGlmIHRoZSBuZWdvdGlhdGlvbiBzdGVwIHdhcyBza2lwcGVkLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uID8gKHRoaXMuY29ubmVjdGlvbi5jb25uZWN0aW9uSWQgfHwgbnVsbCkgOiBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLCBcImJhc2VVcmxcIiwge1xyXG4gICAgICAgIC8qKiBJbmRpY2F0ZXMgdGhlIHVybCBvZiB0aGUge0BsaW5rIEh1YkNvbm5lY3Rpb259IHRvIHRoZSBzZXJ2ZXIuICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24uYmFzZVVybCB8fCBcIlwiO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0cyBhIG5ldyB1cmwgZm9yIHRoZSBIdWJDb25uZWN0aW9uLiBOb3RlIHRoYXQgdGhlIHVybCBjYW4gb25seSBiZSBjaGFuZ2VkIHdoZW4gdGhlIGNvbm5lY3Rpb24gaXMgaW4gZWl0aGVyIHRoZSBEaXNjb25uZWN0ZWQgb3JcclxuICAgICAgICAgKiBSZWNvbm5lY3Rpbmcgc3RhdGVzLlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIHVybCB0byBjb25uZWN0IHRvLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQgJiYgdGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5SZWNvbm5lY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBIdWJDb25uZWN0aW9uIG11c3QgYmUgaW4gdGhlIERpc2Nvbm5lY3RlZCBvciBSZWNvbm5lY3Rpbmcgc3RhdGUgdG8gY2hhbmdlIHRoZSB1cmwuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdXJsKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgSHViQ29ubmVjdGlvbiB1cmwgbXVzdCBiZSBhIHZhbGlkIHVybC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLmJhc2VVcmwgPSB1cmw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICAvKiogU3RhcnRzIHRoZSBjb25uZWN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBjb25uZWN0aW9uIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBlc3RhYmxpc2hlZCwgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yLlxyXG4gICAgICovXHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0UHJvbWlzZSA9IHRoaXMuc3RhcnRXaXRoU3RhdGVUcmFuc2l0aW9ucygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0UHJvbWlzZTtcclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5zdGFydFdpdGhTdGF0ZVRyYW5zaXRpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGVfMTtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlICE9PSBIdWJDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQ2Fubm90IHN0YXJ0IGEgSHViQ29ubmVjdGlvbiB0aGF0IGlzIG5vdCBpbiB0aGUgJ0Rpc2Nvbm5lY3RlZCcgc3RhdGUuXCIpKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBIdWJDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIlN0YXJ0aW5nIEh1YkNvbm5lY3Rpb24uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzEsIDMsICwgNF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnN0YXJ0SW50ZXJuYWwoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gSHViQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJIdWJDb25uZWN0aW9uIGNvbm5lY3RlZCBzdWNjZXNzZnVsbHkuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBIdWJDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiSHViQ29ubmVjdGlvbiBmYWlsZWQgdG8gc3RhcnQgc3VjY2Vzc2Z1bGx5IGJlY2F1c2Ugb2YgZXJyb3IgJ1wiICsgZV8xICsgXCInLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KGVfMSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5zdGFydEludGVybmFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGhhbmRzaGFrZVByb21pc2UsIGhhbmRzaGFrZVJlcXVlc3QsIGVfMjtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wRHVyaW5nU3RhcnRFcnJvciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlZEhhbmRzaGFrZVJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRzaGFrZVByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5oYW5kc2hha2VSZXNvbHZlciA9IHJlc29sdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5oYW5kc2hha2VSZWplY3RlciA9IHJlamVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuY29ubmVjdGlvbi5zdGFydCh0aGlzLnByb3RvY29sLnRyYW5zZmVyRm9ybWF0KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMiwgNSwgLCA3XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRzaGFrZVJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm90b2NvbDogdGhpcy5wcm90b2NvbC5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogdGhpcy5wcm90b2NvbC52ZXJzaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiU2VuZGluZyBoYW5kc2hha2UgcmVxdWVzdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc2VuZE1lc3NhZ2UodGhpcy5oYW5kc2hha2VQcm90b2NvbC53cml0ZUhhbmRzaGFrZVJlcXVlc3QoaGFuZHNoYWtlUmVxdWVzdCkpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkluZm9ybWF0aW9uLCBcIlVzaW5nIEh1YlByb3RvY29sICdcIiArIHRoaXMucHJvdG9jb2wubmFtZSArIFwiJy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmVuc2l2ZWx5IGNsZWFudXAgdGltZW91dCBpbiBjYXNlIHdlIHJlY2VpdmUgYSBtZXNzYWdlIGZyb20gdGhlIHNlcnZlciBiZWZvcmUgd2UgZmluaXNoIHN0YXJ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYW51cFRpbWVvdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFRpbWVvdXRQZXJpb2QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldEtlZXBBbGl2ZUludGVydmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGhhbmRzaGFrZVByb21pc2VdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJdCdzIGltcG9ydGFudCB0byBjaGVjayB0aGUgc3RvcER1cmluZ1N0YXJ0RXJyb3IgaW5zdGVhZCBvZiBqdXN0IHJlbHlpbmcgb24gdGhlIGhhbmRzaGFrZVByb21pc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmVpbmcgcmVqZWN0ZWQgb24gY2xvc2UsIGJlY2F1c2UgdGhpcyBjb250aW51YXRpb24gY2FuIHJ1biBhZnRlciBib3RoIHRoZSBoYW5kc2hha2UgY29tcGxldGVkIHN1Y2Nlc3NmdWxseVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgdGhlIGNvbm5lY3Rpb24gd2FzIGNsb3NlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RvcER1cmluZ1N0YXJ0RXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEl0J3MgaW1wb3J0YW50IHRvIHRocm93IGluc3RlYWQgb2YgcmV0dXJuaW5nIGEgcmVqZWN0ZWQgcHJvbWlzZSwgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGFsbG93IGFueSBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJhbnNpdGlvbnMgdG8gb2NjdXIgYmV0d2VlbiBub3cgYW5kIHRoZSBjYWxsaW5nIGNvZGUgb2JzZXJ2aW5nIHRoZSBleGNlcHRpb25zLiBSZXR1cm5pbmcgYSByZWplY3RlZCBwcm9taXNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIGNhdXNlIHRoZSBjYWxsaW5nIGNvbnRpbnVhdGlvbiB0byBnZXQgc2NoZWR1bGVkIHRvIHJ1biBsYXRlci5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IHRoaXMuc3RvcER1cmluZ1N0YXJ0RXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgN107XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlXzIgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJIdWIgaGFuZHNoYWtlIGZhaWxlZCB3aXRoIGVycm9yICdcIiArIGVfMiArIFwiJyBkdXJpbmcgc3RhcnQoKS4gU3RvcHBpbmcgSHViQ29ubmVjdGlvbi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYW51cFRpbWVvdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhbnVwUGluZ1RpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEh0dHBDb25uZWN0aW9uLnN0b3AoKSBzaG91bGQgbm90IGNvbXBsZXRlIHVudGlsIGFmdGVyIHRoZSBvbmNsb3NlIGNhbGxiYWNrIGlzIGludm9rZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgd2lsbCB0cmFuc2l0aW9uIHRoZSBIdWJDb25uZWN0aW9uIHRvIHRoZSBkaXNjb25uZWN0ZWQgc3RhdGUgYmVmb3JlIEh0dHBDb25uZWN0aW9uLnN0b3AoKSBjb21wbGV0ZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuY29ubmVjdGlvbi5zdG9wKGVfMildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSHR0cENvbm5lY3Rpb24uc3RvcCgpIHNob3VsZCBub3QgY29tcGxldGUgdW50aWwgYWZ0ZXIgdGhlIG9uY2xvc2UgY2FsbGJhY2sgaXMgaW52b2tlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyB3aWxsIHRyYW5zaXRpb24gdGhlIEh1YkNvbm5lY3Rpb24gdG8gdGhlIGRpc2Nvbm5lY3RlZCBzdGF0ZSBiZWZvcmUgSHR0cENvbm5lY3Rpb24uc3RvcCgpIGNvbXBsZXRlcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlXzI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBTdG9wcyB0aGUgY29ubmVjdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgY29ubmVjdGlvbiBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgdGVybWluYXRlZCwgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yLlxyXG4gICAgICovXHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0UHJvbWlzZSwgZV8zO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFByb21pc2UgPSB0aGlzLnN0YXJ0UHJvbWlzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wUHJvbWlzZSA9IHRoaXMuc3RvcEludGVybmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RvcFByb21pc2VdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzIsIDQsICwgNV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBd2FpdGluZyB1bmRlZmluZWQgY29udGludWVzIGltbWVkaWF0ZWx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHN0YXJ0UHJvbWlzZV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBd2FpdGluZyB1bmRlZmluZWQgY29udGludWVzIGltbWVkaWF0ZWx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlXzMgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5zdG9wSW50ZXJuYWwgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIkNhbGwgdG8gSHViQ29ubmVjdGlvbi5zdG9wKFwiICsgZXJyb3IgKyBcIikgaWdub3JlZCBiZWNhdXNlIGl0IGlzIGFscmVhZHkgaW4gdGhlIGRpc2Nvbm5lY3RlZCBzdGF0ZS5cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBIdWJDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiQ2FsbCB0byBIdHRwQ29ubmVjdGlvbi5zdG9wKFwiICsgZXJyb3IgKyBcIikgaWdub3JlZCBiZWNhdXNlIHRoZSBjb25uZWN0aW9uIGlzIGFscmVhZHkgaW4gdGhlIGRpc2Nvbm5lY3Rpbmcgc3RhdGUuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9wUHJvbWlzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBIdWJDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGluZztcclxuICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiU3RvcHBpbmcgSHViQ29ubmVjdGlvbi5cIik7XHJcbiAgICAgICAgaWYgKHRoaXMucmVjb25uZWN0RGVsYXlIYW5kbGUpIHtcclxuICAgICAgICAgICAgLy8gV2UncmUgaW4gYSByZWNvbm5lY3QgZGVsYXkgd2hpY2ggbWVhbnMgdGhlIHVuZGVybHlpbmcgY29ubmVjdGlvbiBpcyBjdXJyZW50bHkgYWxyZWFkeSBzdG9wcGVkLlxyXG4gICAgICAgICAgICAvLyBKdXN0IGNsZWFyIHRoZSBoYW5kbGUgdG8gc3RvcCB0aGUgcmVjb25uZWN0IGxvb3AgKHdoaWNoIG5vIG9uZSBpcyB3YWl0aW5nIG9uIHRoYW5rZnVsbHkpIGFuZFxyXG4gICAgICAgICAgICAvLyBmaXJlIHRoZSBvbmNsb3NlIGNhbGxiYWNrcy5cclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIkNvbm5lY3Rpb24gc3RvcHBlZCBkdXJpbmcgcmVjb25uZWN0IGRlbGF5LiBEb25lIHJlY29ubmVjdGluZy5cIik7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlY29ubmVjdERlbGF5SGFuZGxlKTtcclxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3REZWxheUhhbmRsZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNsb3NlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGVhbnVwVGltZW91dCgpO1xyXG4gICAgICAgIHRoaXMuY2xlYW51cFBpbmdUaW1lcigpO1xyXG4gICAgICAgIHRoaXMuc3RvcER1cmluZ1N0YXJ0RXJyb3IgPSBlcnJvciB8fCBuZXcgRXJyb3IoXCJUaGUgY29ubmVjdGlvbiB3YXMgc3RvcHBlZCBiZWZvcmUgdGhlIGh1YiBoYW5kc2hha2UgY291bGQgY29tcGxldGUuXCIpO1xyXG4gICAgICAgIC8vIEh0dHBDb25uZWN0aW9uLnN0b3AoKSBzaG91bGQgbm90IGNvbXBsZXRlIHVudGlsIGFmdGVyIGVpdGhlciBIdHRwQ29ubmVjdGlvbi5zdGFydCgpIGZhaWxzXHJcbiAgICAgICAgLy8gb3IgdGhlIG9uY2xvc2UgY2FsbGJhY2sgaXMgaW52b2tlZC4gVGhlIG9uY2xvc2UgY2FsbGJhY2sgd2lsbCB0cmFuc2l0aW9uIHRoZSBIdWJDb25uZWN0aW9uXHJcbiAgICAgICAgLy8gdG8gdGhlIGRpc2Nvbm5lY3RlZCBzdGF0ZSBpZiBuZWVkIGJlIGJlZm9yZSBIdHRwQ29ubmVjdGlvbi5zdG9wKCkgY29tcGxldGVzLlxyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24uc3RvcChlcnJvcik7XHJcbiAgICB9O1xyXG4gICAgLyoqIEludm9rZXMgYSBzdHJlYW1pbmcgaHViIG1ldGhvZCBvbiB0aGUgc2VydmVyIHVzaW5nIHRoZSBzcGVjaWZpZWQgbmFtZSBhbmQgYXJndW1lbnRzLlxyXG4gICAgICpcclxuICAgICAqIEB0eXBlcGFyYW0gVCBUaGUgdHlwZSBvZiB0aGUgaXRlbXMgcmV0dXJuZWQgYnkgdGhlIHNlcnZlci5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lIFRoZSBuYW1lIG9mIHRoZSBzZXJ2ZXIgbWV0aG9kIHRvIGludm9rZS5cclxuICAgICAqIEBwYXJhbSB7YW55W119IGFyZ3MgVGhlIGFyZ3VtZW50cyB1c2VkIHRvIGludm9rZSB0aGUgc2VydmVyIG1ldGhvZC5cclxuICAgICAqIEByZXR1cm5zIHtJU3RyZWFtUmVzdWx0PFQ+fSBBbiBvYmplY3QgdGhhdCB5aWVsZHMgcmVzdWx0cyBmcm9tIHRoZSBzZXJ2ZXIgYXMgdGhleSBhcmUgcmVjZWl2ZWQuXHJcbiAgICAgKi9cclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnN0cmVhbSA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucmVwbGFjZVN0cmVhbWluZ1BhcmFtcyhhcmdzKSwgc3RyZWFtcyA9IF9hWzBdLCBzdHJlYW1JZHMgPSBfYVsxXTtcclxuICAgICAgICB2YXIgaW52b2NhdGlvbkRlc2NyaXB0b3IgPSB0aGlzLmNyZWF0ZVN0cmVhbUludm9jYXRpb24obWV0aG9kTmFtZSwgYXJncywgc3RyZWFtSWRzKTtcclxuICAgICAgICB2YXIgcHJvbWlzZVF1ZXVlO1xyXG4gICAgICAgIHZhciBzdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcclxuICAgICAgICBzdWJqZWN0LmNhbmNlbENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgY2FuY2VsSW52b2NhdGlvbiA9IF90aGlzLmNyZWF0ZUNhbmNlbEludm9jYXRpb24oaW52b2NhdGlvbkRlc2NyaXB0b3IuaW52b2NhdGlvbklkKTtcclxuICAgICAgICAgICAgZGVsZXRlIF90aGlzLmNhbGxiYWNrc1tpbnZvY2F0aW9uRGVzY3JpcHRvci5pbnZvY2F0aW9uSWRdO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVF1ZXVlLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnNlbmRXaXRoUHJvdG9jb2woY2FuY2VsSW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3NbaW52b2NhdGlvbkRlc2NyaXB0b3IuaW52b2NhdGlvbklkXSA9IGZ1bmN0aW9uIChpbnZvY2F0aW9uRXZlbnQsIGVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgc3ViamVjdC5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaW52b2NhdGlvbkV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpbnZvY2F0aW9uRXZlbnQgd2lsbCBub3QgYmUgbnVsbCB3aGVuIGFuIGVycm9yIGlzIG5vdCBwYXNzZWQgdG8gdGhlIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICBpZiAoaW52b2NhdGlvbkV2ZW50LnR5cGUgPT09IE1lc3NhZ2VUeXBlLkNvbXBsZXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW52b2NhdGlvbkV2ZW50LmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QuZXJyb3IobmV3IEVycm9yKGludm9jYXRpb25FdmVudC5lcnJvcikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdC5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3QubmV4dCgoaW52b2NhdGlvbkV2ZW50Lml0ZW0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHJvbWlzZVF1ZXVlID0gdGhpcy5zZW5kV2l0aFByb3RvY29sKGludm9jYXRpb25EZXNjcmlwdG9yKVxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgc3ViamVjdC5lcnJvcihlKTtcclxuICAgICAgICAgICAgZGVsZXRlIF90aGlzLmNhbGxiYWNrc1tpbnZvY2F0aW9uRGVzY3JpcHRvci5pbnZvY2F0aW9uSWRdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGF1bmNoU3RyZWFtcyhzdHJlYW1zLCBwcm9taXNlUXVldWUpO1xyXG4gICAgICAgIHJldHVybiBzdWJqZWN0O1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnNlbmRNZXNzYWdlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLnJlc2V0S2VlcEFsaXZlSW50ZXJ2YWwoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uLnNlbmQobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyBhIGpzIG9iamVjdCB0byB0aGUgc2VydmVyLlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIGpzIG9iamVjdCB0byBzZXJpYWxpemUgYW5kIHNlbmQuXHJcbiAgICAgKi9cclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnNlbmRXaXRoUHJvdG9jb2wgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRNZXNzYWdlKHRoaXMucHJvdG9jb2wud3JpdGVNZXNzYWdlKG1lc3NhZ2UpKTtcclxuICAgIH07XHJcbiAgICAvKiogSW52b2tlcyBhIGh1YiBtZXRob2Qgb24gdGhlIHNlcnZlciB1c2luZyB0aGUgc3BlY2lmaWVkIG5hbWUgYW5kIGFyZ3VtZW50cy4gRG9lcyBub3Qgd2FpdCBmb3IgYSByZXNwb25zZSBmcm9tIHRoZSByZWNlaXZlci5cclxuICAgICAqXHJcbiAgICAgKiBUaGUgUHJvbWlzZSByZXR1cm5lZCBieSB0aGlzIG1ldGhvZCByZXNvbHZlcyB3aGVuIHRoZSBjbGllbnQgaGFzIHNlbnQgdGhlIGludm9jYXRpb24gdG8gdGhlIHNlcnZlci4gVGhlIHNlcnZlciBtYXkgc3RpbGxcclxuICAgICAqIGJlIHByb2Nlc3NpbmcgdGhlIGludm9jYXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZE5hbWUgVGhlIG5hbWUgb2YgdGhlIHNlcnZlciBtZXRob2QgdG8gaW52b2tlLlxyXG4gICAgICogQHBhcmFtIHthbnlbXX0gYXJncyBUaGUgYXJndW1lbnRzIHVzZWQgdG8gaW52b2tlIHRoZSBzZXJ2ZXIgbWV0aG9kLlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGludm9jYXRpb24gaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IHNlbnQsIG9yIHJlamVjdHMgd2l0aCBhbiBlcnJvci5cclxuICAgICAqL1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBhcmdzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnJlcGxhY2VTdHJlYW1pbmdQYXJhbXMoYXJncyksIHN0cmVhbXMgPSBfYVswXSwgc3RyZWFtSWRzID0gX2FbMV07XHJcbiAgICAgICAgdmFyIHNlbmRQcm9taXNlID0gdGhpcy5zZW5kV2l0aFByb3RvY29sKHRoaXMuY3JlYXRlSW52b2NhdGlvbihtZXRob2ROYW1lLCBhcmdzLCB0cnVlLCBzdHJlYW1JZHMpKTtcclxuICAgICAgICB0aGlzLmxhdW5jaFN0cmVhbXMoc3RyZWFtcywgc2VuZFByb21pc2UpO1xyXG4gICAgICAgIHJldHVybiBzZW5kUHJvbWlzZTtcclxuICAgIH07XHJcbiAgICAvKiogSW52b2tlcyBhIGh1YiBtZXRob2Qgb24gdGhlIHNlcnZlciB1c2luZyB0aGUgc3BlY2lmaWVkIG5hbWUgYW5kIGFyZ3VtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBUaGUgUHJvbWlzZSByZXR1cm5lZCBieSB0aGlzIG1ldGhvZCByZXNvbHZlcyB3aGVuIHRoZSBzZXJ2ZXIgaW5kaWNhdGVzIGl0IGhhcyBmaW5pc2hlZCBpbnZva2luZyB0aGUgbWV0aG9kLiBXaGVuIHRoZSBwcm9taXNlXHJcbiAgICAgKiByZXNvbHZlcywgdGhlIHNlcnZlciBoYXMgZmluaXNoZWQgaW52b2tpbmcgdGhlIG1ldGhvZC4gSWYgdGhlIHNlcnZlciBtZXRob2QgcmV0dXJucyBhIHJlc3VsdCwgaXQgaXMgcHJvZHVjZWQgYXMgdGhlIHJlc3VsdCBvZlxyXG4gICAgICogcmVzb2x2aW5nIHRoZSBQcm9taXNlLlxyXG4gICAgICpcclxuICAgICAqIEB0eXBlcGFyYW0gVCBUaGUgZXhwZWN0ZWQgcmV0dXJuIHR5cGUuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZSBUaGUgbmFtZSBvZiB0aGUgc2VydmVyIG1ldGhvZCB0byBpbnZva2UuXHJcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBhcmdzIFRoZSBhcmd1bWVudHMgdXNlZCB0byBpbnZva2UgdGhlIHNlcnZlciBtZXRob2QuXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn0gQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzdWx0IG9mIHRoZSBzZXJ2ZXIgbWV0aG9kIChpZiBhbnkpLCBvciByZWplY3RzIHdpdGggYW4gZXJyb3IuXHJcbiAgICAgKi9cclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucmVwbGFjZVN0cmVhbWluZ1BhcmFtcyhhcmdzKSwgc3RyZWFtcyA9IF9hWzBdLCBzdHJlYW1JZHMgPSBfYVsxXTtcclxuICAgICAgICB2YXIgaW52b2NhdGlvbkRlc2NyaXB0b3IgPSB0aGlzLmNyZWF0ZUludm9jYXRpb24obWV0aG9kTmFtZSwgYXJncywgZmFsc2UsIHN0cmVhbUlkcyk7XHJcbiAgICAgICAgdmFyIHAgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIC8vIGludm9jYXRpb25JZCB3aWxsIGFsd2F5cyBoYXZlIGEgdmFsdWUgZm9yIGEgbm9uLWJsb2NraW5nIGludm9jYXRpb25cclxuICAgICAgICAgICAgX3RoaXMuY2FsbGJhY2tzW2ludm9jYXRpb25EZXNjcmlwdG9yLmludm9jYXRpb25JZF0gPSBmdW5jdGlvbiAoaW52b2NhdGlvbkV2ZW50LCBlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnZvY2F0aW9uRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpbnZvY2F0aW9uRXZlbnQgd2lsbCBub3QgYmUgbnVsbCB3aGVuIGFuIGVycm9yIGlzIG5vdCBwYXNzZWQgdG8gdGhlIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGludm9jYXRpb25FdmVudC50eXBlID09PSBNZXNzYWdlVHlwZS5Db21wbGV0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnZvY2F0aW9uRXZlbnQuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoaW52b2NhdGlvbkV2ZW50LmVycm9yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGludm9jYXRpb25FdmVudC5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiVW5leHBlY3RlZCBtZXNzYWdlIHR5cGU6IFwiICsgaW52b2NhdGlvbkV2ZW50LnR5cGUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlUXVldWUgPSBfdGhpcy5zZW5kV2l0aFByb3RvY29sKGludm9jYXRpb25EZXNjcmlwdG9yKVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBpbnZvY2F0aW9uSWQgd2lsbCBhbHdheXMgaGF2ZSBhIHZhbHVlIGZvciBhIG5vbi1ibG9ja2luZyBpbnZvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgX3RoaXMuY2FsbGJhY2tzW2ludm9jYXRpb25EZXNjcmlwdG9yLmludm9jYXRpb25JZF07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBfdGhpcy5sYXVuY2hTdHJlYW1zKHN0cmVhbXMsIHByb21pc2VRdWV1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9O1xyXG4gICAgLyoqIFJlZ2lzdGVycyBhIGhhbmRsZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgaHViIG1ldGhvZCB3aXRoIHRoZSBzcGVjaWZpZWQgbWV0aG9kIG5hbWUgaXMgaW52b2tlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZSBUaGUgbmFtZSBvZiB0aGUgaHViIG1ldGhvZCB0byBkZWZpbmUuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXdNZXRob2QgVGhlIGhhbmRsZXIgdGhhdCB3aWxsIGJlIHJhaXNlZCB3aGVuIHRoZSBodWIgbWV0aG9kIGlzIGludm9rZWQuXHJcbiAgICAgKi9cclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUsIG5ld01ldGhvZCkge1xyXG4gICAgICAgIGlmICghbWV0aG9kTmFtZSB8fCAhbmV3TWV0aG9kKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWV0aG9kTmFtZSA9IG1ldGhvZE5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAoIXRoaXMubWV0aG9kc1ttZXRob2ROYW1lXSkge1xyXG4gICAgICAgICAgICB0aGlzLm1ldGhvZHNbbWV0aG9kTmFtZV0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUHJldmVudGluZyBhZGRpbmcgdGhlIHNhbWUgaGFuZGxlciBtdWx0aXBsZSB0aW1lcy5cclxuICAgICAgICBpZiAodGhpcy5tZXRob2RzW21ldGhvZE5hbWVdLmluZGV4T2YobmV3TWV0aG9kKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1ldGhvZHNbbWV0aG9kTmFtZV0ucHVzaChuZXdNZXRob2QpO1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBtZXRob2QpIHtcclxuICAgICAgICBpZiAoIW1ldGhvZE5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXRob2ROYW1lID0gbWV0aG9kTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMubWV0aG9kc1ttZXRob2ROYW1lXTtcclxuICAgICAgICBpZiAoIWhhbmRsZXJzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1ldGhvZCkge1xyXG4gICAgICAgICAgICB2YXIgcmVtb3ZlSWR4ID0gaGFuZGxlcnMuaW5kZXhPZihtZXRob2QpO1xyXG4gICAgICAgICAgICBpZiAocmVtb3ZlSWR4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKHJlbW92ZUlkeCwgMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMubWV0aG9kc1ttZXRob2ROYW1lXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubWV0aG9kc1ttZXRob2ROYW1lXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqIFJlZ2lzdGVycyBhIGhhbmRsZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgY29ubmVjdGlvbiBpcyBjbG9zZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGhhbmRsZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgY29ubmVjdGlvbiBpcyBjbG9zZWQuIE9wdGlvbmFsbHkgcmVjZWl2ZXMgYSBzaW5nbGUgYXJndW1lbnQgY29udGFpbmluZyB0aGUgZXJyb3IgdGhhdCBjYXVzZWQgdGhlIGNvbm5lY3Rpb24gdG8gY2xvc2UgKGlmIGFueSkuXHJcbiAgICAgKi9cclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLm9uY2xvc2UgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZWRDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKiBSZWdpc3RlcnMgYSBoYW5kbGVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGNvbm5lY3Rpb24gc3RhcnRzIHJlY29ubmVjdGluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgaGFuZGxlciB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBjb25uZWN0aW9uIHN0YXJ0cyByZWNvbm5lY3RpbmcuIE9wdGlvbmFsbHkgcmVjZWl2ZXMgYSBzaW5nbGUgYXJndW1lbnQgY29udGFpbmluZyB0aGUgZXJyb3IgdGhhdCBjYXVzZWQgdGhlIGNvbm5lY3Rpb24gdG8gc3RhcnQgcmVjb25uZWN0aW5nIChpZiBhbnkpLlxyXG4gICAgICovXHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5vbnJlY29ubmVjdGluZyA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdGluZ0NhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqIFJlZ2lzdGVycyBhIGhhbmRsZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgY29ubmVjdGlvbiBzdWNjZXNzZnVsbHkgcmVjb25uZWN0cy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgaGFuZGxlciB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBjb25uZWN0aW9uIHN1Y2Nlc3NmdWxseSByZWNvbm5lY3RzLlxyXG4gICAgICovXHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5vbnJlY29ubmVjdGVkID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0ZWRDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnByb2Nlc3NJbmNvbWluZ0RhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuY2xlYW51cFRpbWVvdXQoKTtcclxuICAgICAgICBpZiAoIXRoaXMucmVjZWl2ZWRIYW5kc2hha2VSZXNwb25zZSkge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5wcm9jZXNzSGFuZHNoYWtlUmVzcG9uc2UoZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVjZWl2ZWRIYW5kc2hha2VSZXNwb25zZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERhdGEgbWF5IGhhdmUgYWxsIGJlZW4gcmVhZCB3aGVuIHByb2Nlc3NpbmcgaGFuZHNoYWtlIHJlc3BvbnNlXHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gUGFyc2UgdGhlIG1lc3NhZ2VzXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlcyA9IHRoaXMucHJvdG9jb2wucGFyc2VNZXNzYWdlcyhkYXRhLCB0aGlzLmxvZ2dlcik7XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgbWVzc2FnZXNfMSA9IG1lc3NhZ2VzOyBfaSA8IG1lc3NhZ2VzXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG1lc3NhZ2VzXzFbX2ldO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLkludm9jYXRpb246XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW52b2tlQ2xpZW50TWV0aG9kKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLlN0cmVhbUl0ZW06XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5Db21wbGV0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLmNhbGxiYWNrc1ttZXNzYWdlLmludm9jYXRpb25JZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gTWVzc2FnZVR5cGUuQ29tcGxldGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNhbGxiYWNrc1ttZXNzYWdlLmludm9jYXRpb25JZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLlBpbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGNhcmUgYWJvdXQgcGluZ3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5DbG9zZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkluZm9ybWF0aW9uLCBcIkNsb3NlIG1lc3NhZ2UgcmVjZWl2ZWQgZnJvbSBzZXJ2ZXIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBtZXNzYWdlLmVycm9yID8gbmV3IEVycm9yKFwiU2VydmVyIHJldHVybmVkIGFuIGVycm9yIG9uIGNsb3NlOiBcIiArIG1lc3NhZ2UuZXJyb3IpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5hbGxvd1JlY29ubmVjdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSXQgZmVlbHMgd3Jvbmcgbm90IHRvIGF3YWl0IGNvbm5lY3Rpb24uc3RvcCgpIGhlcmUsIGJ1dCBwcm9jZXNzSW5jb21pbmdEYXRhIGlzIGNhbGxlZCBhcyBwYXJ0IG9mIGFuIG9ucmVjZWl2ZSBjYWxsYmFjayB3aGljaCBpcyBub3QgYXN5bmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGFscmVhZHkgdGhlIGJlaGF2aW9yIGZvciBzZXJ2ZXJUaW1lb3V0KCksIGFuZCBIdHRwQ29ubmVjdGlvbi5TdG9wKCkgc2hvdWxkIGNhdGNoIGFuZCBsb2cgYWxsIHBvc3NpYmxlIGV4Y2VwdGlvbnMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5zdG9wKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGNhbm5vdCBhd2FpdCBzdG9wSW50ZXJuYWwoKSBoZXJlLCBidXQgc3Vic2VxdWVudCBjYWxscyB0byBzdG9wKCkgd2lsbCBhd2FpdCB0aGlzIGlmIHN0b3BJbnRlcm5hbCgpIGlzIHN0aWxsIG9uZ29pbmcuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BQcm9taXNlID0gdGhpcy5zdG9wSW50ZXJuYWwoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5XYXJuaW5nLCBcIkludmFsaWQgbWVzc2FnZSB0eXBlOiBcIiArIG1lc3NhZ2UudHlwZSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXNldFRpbWVvdXRQZXJpb2QoKTtcclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5wcm9jZXNzSGFuZHNoYWtlUmVzcG9uc2UgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICB2YXIgcmVzcG9uc2VNZXNzYWdlO1xyXG4gICAgICAgIHZhciByZW1haW5pbmdEYXRhO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIF9hID0gdGhpcy5oYW5kc2hha2VQcm90b2NvbC5wYXJzZUhhbmRzaGFrZVJlc3BvbnNlKGRhdGEpLCByZW1haW5pbmdEYXRhID0gX2FbMF0sIHJlc3BvbnNlTWVzc2FnZSA9IF9hWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwiRXJyb3IgcGFyc2luZyBoYW5kc2hha2UgcmVzcG9uc2U6IFwiICsgZTtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkVycm9yLCBtZXNzYWdlKTtcclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRzaGFrZVJlamVjdGVyKGVycm9yKTtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXNwb25zZU1lc3NhZ2UuZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcIlNlcnZlciByZXR1cm5lZCBoYW5kc2hha2UgZXJyb3I6IFwiICsgcmVzcG9uc2VNZXNzYWdlLmVycm9yO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZHNoYWtlUmVqZWN0ZXIoZXJyb3IpO1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJTZXJ2ZXIgaGFuZHNoYWtlIGNvbXBsZXRlLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oYW5kc2hha2VSZXNvbHZlcigpO1xyXG4gICAgICAgIHJldHVybiByZW1haW5pbmdEYXRhO1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnJlc2V0S2VlcEFsaXZlSW50ZXJ2YWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbi5mZWF0dXJlcy5pbmhlcmVudEtlZXBBbGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNldCB0aGUgdGltZSB3ZSB3YW50IHRoZSBuZXh0IGtlZXAgYWxpdmUgdG8gYmUgc2VudFxyXG4gICAgICAgIC8vIFRpbWVyIHdpbGwgYmUgc2V0dXAgb24gbmV4dCBtZXNzYWdlIHJlY2VpdmVcclxuICAgICAgICB0aGlzLm5leHRLZWVwQWxpdmUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSArIHRoaXMua2VlcEFsaXZlSW50ZXJ2YWxJbk1pbGxpc2Vjb25kcztcclxuICAgICAgICB0aGlzLmNsZWFudXBQaW5nVGltZXIoKTtcclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5yZXNldFRpbWVvdXRQZXJpb2QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGlvbi5mZWF0dXJlcyB8fCAhdGhpcy5jb25uZWN0aW9uLmZlYXR1cmVzLmluaGVyZW50S2VlcEFsaXZlKSB7XHJcbiAgICAgICAgICAgIC8vIFNldCB0aGUgdGltZW91dCB0aW1lclxyXG4gICAgICAgICAgICB0aGlzLnRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnNlcnZlclRpbWVvdXQoKTsgfSwgdGhpcy5zZXJ2ZXJUaW1lb3V0SW5NaWxsaXNlY29uZHMpO1xyXG4gICAgICAgICAgICAvLyBTZXQga2VlcEFsaXZlIHRpbWVyIGlmIHRoZXJlIGlzbid0IG9uZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5waW5nU2VydmVySGFuZGxlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXh0UGluZyA9IHRoaXMubmV4dEtlZXBBbGl2ZSAtIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5leHRQaW5nIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRQaW5nID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIFRoZSB0aW1lciBuZWVkcyB0byBiZSBzZXQgZnJvbSBhIG5ldHdvcmtpbmcgY2FsbGJhY2sgdG8gYXZvaWQgQ2hyb21lIHRpbWVyIHRocm90dGxpbmcgZnJvbSBjYXVzaW5nIHRpbWVycyB0byBydW4gb25jZSBhIG1pbnV0ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5waW5nU2VydmVySGFuZGxlID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBIdWJDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgMywgLCA0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zZW5kTWVzc2FnZSh0aGlzLmNhY2hlZFBpbmdNZXNzYWdlKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gX2Iuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IGNhcmUgYWJvdXQgdGhlIGVycm9yLiBJdCBzaG91bGQgYmUgc2VlbiBlbHNld2hlcmUgaW4gdGhlIGNsaWVudC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgY29ubmVjdGlvbiBpcyBwcm9iYWJseSBpbiBhIGJhZCBvciBjbG9zZWQgc3RhdGUgbm93LCBjbGVhbnVwIHRoZSB0aW1lciBzbyBpdCBzdG9wcyB0cmlnZ2VyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhbnVwUGluZ1RpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7IH0sIG5leHRQaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXJ2ZXJUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIFRoZSBzZXJ2ZXIgaGFzbid0IHRhbGtlZCB0byB1cyBpbiBhIHdoaWxlLiBJdCBkb2Vzbid0IGxpa2UgdXMgYW55bW9yZSAuLi4gOihcclxuICAgICAgICAvLyBUZXJtaW5hdGUgdGhlIGNvbm5lY3Rpb24sIGJ1dCB3ZSBkb24ndCBuZWVkIHRvIHdhaXQgb24gdGhlIHByb21pc2UuIFRoaXMgY291bGQgdHJpZ2dlciByZWNvbm5lY3RpbmcuXHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLnN0b3AobmV3IEVycm9yKFwiU2VydmVyIHRpbWVvdXQgZWxhcHNlZCB3aXRob3V0IHJlY2VpdmluZyBhIG1lc3NhZ2UgZnJvbSB0aGUgc2VydmVyLlwiKSk7XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuaW52b2tlQ2xpZW50TWV0aG9kID0gZnVuY3Rpb24gKGludm9jYXRpb25NZXNzYWdlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgbWV0aG9kcyA9IHRoaXMubWV0aG9kc1tpbnZvY2F0aW9uTWVzc2FnZS50YXJnZXQudG9Mb3dlckNhc2UoKV07XHJcbiAgICAgICAgaWYgKG1ldGhvZHMpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbiAobSkgeyByZXR1cm4gbS5hcHBseShfdGhpcywgaW52b2NhdGlvbk1lc3NhZ2UuYXJndW1lbnRzKTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5FcnJvciwgXCJBIGNhbGxiYWNrIGZvciB0aGUgbWV0aG9kIFwiICsgaW52b2NhdGlvbk1lc3NhZ2UudGFyZ2V0LnRvTG93ZXJDYXNlKCkgKyBcIiB0aHJldyBlcnJvciAnXCIgKyBlICsgXCInLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaW52b2NhdGlvbk1lc3NhZ2UuaW52b2NhdGlvbklkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdjEuIFNvIHdlIHJldHVybiBhbiBlcnJvciB0byBhdm9pZCBibG9ja2luZyB0aGUgc2VydmVyIHdhaXRpbmcgZm9yIHRoZSByZXNwb25zZS5cclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCJTZXJ2ZXIgcmVxdWVzdGVkIGEgcmVzcG9uc2UsIHdoaWNoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyB2ZXJzaW9uIG9mIHRoZSBjbGllbnQuXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3Qgd2FudCB0byB3YWl0IG9uIHRoZSBzdG9wIGl0c2VsZi5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcFByb21pc2UgPSB0aGlzLnN0b3BJbnRlcm5hbChuZXcgRXJyb3IobWVzc2FnZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuV2FybmluZywgXCJObyBjbGllbnQgbWV0aG9kIHdpdGggdGhlIG5hbWUgJ1wiICsgaW52b2NhdGlvbk1lc3NhZ2UudGFyZ2V0ICsgXCInIGZvdW5kLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuY29ubmVjdGlvbkNsb3NlZCA9IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJIdWJDb25uZWN0aW9uLmNvbm5lY3Rpb25DbG9zZWQoXCIgKyBlcnJvciArIFwiKSBjYWxsZWQgd2hpbGUgaW4gc3RhdGUgXCIgKyB0aGlzLmNvbm5lY3Rpb25TdGF0ZSArIFwiLlwiKTtcclxuICAgICAgICAvLyBUcmlnZ2VyaW5nIHRoaXMuaGFuZHNoYWtlUmVqZWN0ZXIgaXMgaW5zdWZmaWNpZW50IGJlY2F1c2UgaXQgY291bGQgYWxyZWFkeSBiZSByZXNvbHZlZCB3aXRob3V0IHRoZSBjb250aW51YXRpb24gaGF2aW5nIHJ1biB5ZXQuXHJcbiAgICAgICAgdGhpcy5zdG9wRHVyaW5nU3RhcnRFcnJvciA9IHRoaXMuc3RvcER1cmluZ1N0YXJ0RXJyb3IgfHwgZXJyb3IgfHwgbmV3IEVycm9yKFwiVGhlIHVuZGVybHlpbmcgY29ubmVjdGlvbiB3YXMgY2xvc2VkIGJlZm9yZSB0aGUgaHViIGhhbmRzaGFrZSBjb3VsZCBjb21wbGV0ZS5cIik7XHJcbiAgICAgICAgLy8gSWYgdGhlIGhhbmRzaGFrZSBpcyBpbiBwcm9ncmVzcywgc3RhcnQgd2lsbCBiZSB3YWl0aW5nIGZvciB0aGUgaGFuZHNoYWtlIHByb21pc2UsIHNvIHdlIGNvbXBsZXRlIGl0LlxyXG4gICAgICAgIC8vIElmIGl0IGhhcyBhbHJlYWR5IGNvbXBsZXRlZCwgdGhpcyBzaG91bGQganVzdCBub29wLlxyXG4gICAgICAgIGlmICh0aGlzLmhhbmRzaGFrZVJlc29sdmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZHNoYWtlUmVzb2x2ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYW5jZWxDYWxsYmFja3NXaXRoRXJyb3IoZXJyb3IgfHwgbmV3IEVycm9yKFwiSW52b2NhdGlvbiBjYW5jZWxlZCBkdWUgdG8gdGhlIHVuZGVybHlpbmcgY29ubmVjdGlvbiBiZWluZyBjbG9zZWQuXCIpKTtcclxuICAgICAgICB0aGlzLmNsZWFudXBUaW1lb3V0KCk7XHJcbiAgICAgICAgdGhpcy5jbGVhbnVwUGluZ1RpbWVyKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBIdWJDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2xvc2UoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gSHViQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZCAmJiB0aGlzLnJlY29ubmVjdFBvbGljeSkge1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcclxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gSHViQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2xvc2UoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBJZiBub25lIG9mIHRoZSBhYm92ZSBpZiBjb25kaXRpb25zIHdlcmUgdHJ1ZSB3ZXJlIGNhbGxlZCB0aGUgSHViQ29ubmVjdGlvbiBtdXN0IGJlIGluIGVpdGhlcjpcclxuICAgICAgICAvLyAxLiBUaGUgQ29ubmVjdGluZyBzdGF0ZSBpbiB3aGljaCBjYXNlIHRoZSBoYW5kc2hha2VSZXNvbHZlciB3aWxsIGNvbXBsZXRlIGl0IGFuZCBzdG9wRHVyaW5nU3RhcnRFcnJvciB3aWxsIGZhaWwgaXQuXHJcbiAgICAgICAgLy8gMi4gVGhlIFJlY29ubmVjdGluZyBzdGF0ZSBpbiB3aGljaCBjYXNlIHRoZSBoYW5kc2hha2VSZXNvbHZlciB3aWxsIGNvbXBsZXRlIGl0IGFuZCBzdG9wRHVyaW5nU3RhcnRFcnJvciB3aWxsIGZhaWwgdGhlIGN1cnJlbnQgcmVjb25uZWN0IGF0dGVtcHRcclxuICAgICAgICAvLyAgICBhbmQgcG90ZW50aWFsbHkgY29udGludWUgdGhlIHJlY29ubmVjdCgpIGxvb3AuXHJcbiAgICAgICAgLy8gMy4gVGhlIERpc2Nvbm5lY3RlZCBzdGF0ZSBpbiB3aGljaCBjYXNlIHdlJ3JlIGFscmVhZHkgZG9uZS5cclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5jb21wbGV0ZUNsb3NlID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhcnRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VkQ2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMuYXBwbHkoX3RoaXMsIFtlcnJvcl0pOyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkVycm9yLCBcIkFuIG9uY2xvc2UgY2FsbGJhY2sgY2FsbGVkIHdpdGggZXJyb3IgJ1wiICsgZXJyb3IgKyBcIicgdGhyZXcgZXJyb3IgJ1wiICsgZSArIFwiJy5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUucmVjb25uZWN0ID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcmVjb25uZWN0U3RhcnRUaW1lLCBwcmV2aW91c1JlY29ubmVjdEF0dGVtcHRzLCByZXRyeUVycm9yLCBuZXh0UmV0cnlEZWxheSwgZV80O1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNvbm5lY3RTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1JlY29ubmVjdEF0dGVtcHRzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnlFcnJvciA9IGVycm9yICE9PSB1bmRlZmluZWQgPyBlcnJvciA6IG5ldyBFcnJvcihcIkF0dGVtcHRpbmcgdG8gcmVjb25uZWN0IGR1ZSB0byBhIHVua25vd24gZXJyb3IuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0UmV0cnlEZWxheSA9IHRoaXMuZ2V0TmV4dFJldHJ5RGVsYXkocHJldmlvdXNSZWNvbm5lY3RBdHRlbXB0cysrLCAwLCByZXRyeUVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRSZXRyeURlbGF5ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiQ29ubmVjdGlvbiBub3QgcmVjb25uZWN0aW5nIGJlY2F1c2UgdGhlIElSZXRyeVBvbGljeSByZXR1cm5lZCBudWxsIG9uIHRoZSBmaXJzdCByZWNvbm5lY3QgYXR0ZW1wdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2xvc2UoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gSHViQ29ubmVjdGlvblN0YXRlLlJlY29ubmVjdGluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiQ29ubmVjdGlvbiByZWNvbm5lY3RpbmcgYmVjYXVzZSBvZiBlcnJvciAnXCIgKyBlcnJvciArIFwiJy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiQ29ubmVjdGlvbiByZWNvbm5lY3RpbmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9ucmVjb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVjb25uZWN0aW5nQ2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMuYXBwbHkoX3RoaXMsIFtlcnJvcl0pOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkVycm9yLCBcIkFuIG9ucmVjb25uZWN0aW5nIGNhbGxiYWNrIGNhbGxlZCB3aXRoIGVycm9yICdcIiArIGVycm9yICsgXCInIHRocmV3IGVycm9yICdcIiArIGUgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXhpdCBlYXJseSBpZiBhbiBvbnJlY29ubmVjdGluZyBjYWxsYmFjayBjYWxsZWQgY29ubmVjdGlvbi5zdG9wKCkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5SZWNvbm5lY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiQ29ubmVjdGlvbiBsZWZ0IHRoZSByZWNvbm5lY3Rpbmcgc3RhdGUgaW4gb25yZWNvbm5lY3RpbmcgY2FsbGJhY2suIERvbmUgcmVjb25uZWN0aW5nLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEobmV4dFJldHJ5RGVsYXkgIT09IG51bGwpKSByZXR1cm4gWzMgLypicmVhayovLCA3XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkluZm9ybWF0aW9uLCBcIlJlY29ubmVjdCBhdHRlbXB0IG51bWJlciBcIiArIHByZXZpb3VzUmVjb25uZWN0QXR0ZW1wdHMgKyBcIiB3aWxsIHN0YXJ0IGluIFwiICsgbmV4dFJldHJ5RGVsYXkgKyBcIiBtcy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVjb25uZWN0RGVsYXlIYW5kbGUgPSBzZXRUaW1lb3V0KHJlc29sdmUsIG5leHRSZXRyeURlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3REZWxheUhhbmRsZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlICE9PSBIdWJDb25uZWN0aW9uU3RhdGUuUmVjb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiQ29ubmVjdGlvbiBsZWZ0IHRoZSByZWNvbm5lY3Rpbmcgc3RhdGUgZHVyaW5nIHJlY29ubmVjdCBkZWxheS4gRG9uZSByZWNvbm5lY3RpbmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMywgNSwgLCA2XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RhcnRJbnRlcm5hbCgpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBIdWJDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiSHViQ29ubmVjdGlvbiByZWNvbm5lY3RlZCBzdWNjZXNzZnVsbHkuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vbnJlY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVjb25uZWN0ZWRDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5hcHBseShfdGhpcywgW190aGlzLmNvbm5lY3Rpb24uY29ubmVjdGlvbklkXSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIFwiQW4gb25yZWNvbm5lY3RlZCBjYWxsYmFjayBjYWxsZWQgd2l0aCBjb25uZWN0aW9uSWQgJ1wiICsgdGhpcy5jb25uZWN0aW9uLmNvbm5lY3Rpb25JZCArIFwiOyB0aHJldyBlcnJvciAnXCIgKyBlICsgXCInLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlXzQgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCJSZWNvbm5lY3QgYXR0ZW1wdCBmYWlsZWQgYmVjYXVzZSBvZiBlcnJvciAnXCIgKyBlXzQgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5SZWNvbm5lY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJDb25uZWN0aW9uIG1vdmVkIHRvIHRoZSAnXCIgKyB0aGlzLmNvbm5lY3Rpb25TdGF0ZSArIFwiJyBmcm9tIHRoZSByZWNvbm5lY3Rpbmcgc3RhdGUgZHVyaW5nIHJlY29ubmVjdCBhdHRlbXB0LiBEb25lIHJlY29ubmVjdGluZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgVHlwZVNjcmlwdCBjb21waWxlciB0aGlua3MgdGhhdCBjb25uZWN0aW9uU3RhdGUgbXVzdCBiZSBDb25uZWN0ZWQgaGVyZS4gVGhlIFR5cGVTY3JpcHQgY29tcGlsZXIgaXMgd3JvbmcuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnlFcnJvciA9IGVfNCBpbnN0YW5jZW9mIEVycm9yID8gZV80IDogbmV3IEVycm9yKGVfNC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFJldHJ5RGVsYXkgPSB0aGlzLmdldE5leHRSZXRyeURlbGF5KHByZXZpb3VzUmVjb25uZWN0QXR0ZW1wdHMrKywgRGF0ZS5ub3coKSAtIHJlY29ubmVjdFN0YXJ0VGltZSwgcmV0cnlFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFszIC8qYnJlYWsqLywgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiUmVjb25uZWN0IHJldHJpZXMgaGF2ZSBiZWVuIGV4aGF1c3RlZCBhZnRlciBcIiArIChEYXRlLm5vdygpIC0gcmVjb25uZWN0U3RhcnRUaW1lKSArIFwiIG1zIGFuZCBcIiArIHByZXZpb3VzUmVjb25uZWN0QXR0ZW1wdHMgKyBcIiBmYWlsZWQgYXR0ZW1wdHMuIENvbm5lY3Rpb24gZGlzY29ubmVjdGluZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmdldE5leHRSZXRyeURlbGF5ID0gZnVuY3Rpb24gKHByZXZpb3VzUmV0cnlDb3VudCwgZWxhcHNlZE1pbGxpc2Vjb25kcywgcmV0cnlSZWFzb24pIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWNvbm5lY3RQb2xpY3kubmV4dFJldHJ5RGVsYXlJbk1pbGxpc2Vjb25kcyh7XHJcbiAgICAgICAgICAgICAgICBlbGFwc2VkTWlsbGlzZWNvbmRzOiBlbGFwc2VkTWlsbGlzZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNSZXRyeUNvdW50OiBwcmV2aW91c1JldHJ5Q291bnQsXHJcbiAgICAgICAgICAgICAgICByZXRyeVJlYXNvbjogcmV0cnlSZWFzb24sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIFwiSVJldHJ5UG9saWN5Lm5leHRSZXRyeURlbGF5SW5NaWxsaXNlY29uZHMoXCIgKyBwcmV2aW91c1JldHJ5Q291bnQgKyBcIiwgXCIgKyBlbGFwc2VkTWlsbGlzZWNvbmRzICsgXCIpIHRocmV3IGVycm9yICdcIiArIGUgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuY2FuY2VsQ2FsbGJhY2tzV2l0aEVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuY2FsbGJhY2tzO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0ge307XHJcbiAgICAgICAgT2JqZWN0LmtleXMoY2FsbGJhY2tzKVxyXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGNhbGxiYWNrc1trZXldO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCBlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuY2xlYW51cFBpbmdUaW1lciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5waW5nU2VydmVySGFuZGxlKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnBpbmdTZXJ2ZXJIYW5kbGUpO1xyXG4gICAgICAgICAgICB0aGlzLnBpbmdTZXJ2ZXJIYW5kbGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmNsZWFudXBUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXRIYW5kbGUpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dEhhbmRsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZUludm9jYXRpb24gPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgYXJncywgbm9uYmxvY2tpbmcsIHN0cmVhbUlkcykge1xyXG4gICAgICAgIGlmIChub25ibG9ja2luZykge1xyXG4gICAgICAgICAgICBpZiAoc3RyZWFtSWRzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBhcmd1bWVudHM6IGFyZ3MsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtSWRzOiBzdHJlYW1JZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBtZXRob2ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLkludm9jYXRpb24sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBhcmd1bWVudHM6IGFyZ3MsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBtZXRob2ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLkludm9jYXRpb24sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgaW52b2NhdGlvbklkID0gdGhpcy5pbnZvY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgIHRoaXMuaW52b2NhdGlvbklkKys7XHJcbiAgICAgICAgICAgIGlmIChzdHJlYW1JZHMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3VtZW50czogYXJncyxcclxuICAgICAgICAgICAgICAgICAgICBpbnZvY2F0aW9uSWQ6IGludm9jYXRpb25JZC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbUlkczogc3RyZWFtSWRzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogbWV0aG9kTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBNZXNzYWdlVHlwZS5JbnZvY2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJndW1lbnRzOiBhcmdzLFxyXG4gICAgICAgICAgICAgICAgICAgIGludm9jYXRpb25JZDogaW52b2NhdGlvbklkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBtZXRob2ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLkludm9jYXRpb24sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmxhdW5jaFN0cmVhbXMgPSBmdW5jdGlvbiAoc3RyZWFtcywgcHJvbWlzZVF1ZXVlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoc3RyZWFtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTeW5jaHJvbml6ZSBzdHJlYW0gZGF0YSBzbyB0aGV5IGFycml2ZSBpbi1vcmRlciBvbiB0aGUgc2VydmVyXHJcbiAgICAgICAgaWYgKCFwcm9taXNlUXVldWUpIHtcclxuICAgICAgICAgICAgcHJvbWlzZVF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKHN0cmVhbUlkKSB7XHJcbiAgICAgICAgICAgIHN0cmVhbXNbc3RyZWFtSWRdLnN1YnNjcmliZSh7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2VRdWV1ZSA9IHByb21pc2VRdWV1ZS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnNlbmRXaXRoUHJvdG9jb2woX3RoaXMuY3JlYXRlQ29tcGxldGlvbk1lc3NhZ2Uoc3RyZWFtSWQpKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGVyci5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChlcnIgJiYgZXJyLnRvU3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnIudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIlVua25vd24gZXJyb3JcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZVF1ZXVlID0gcHJvbWlzZVF1ZXVlLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuc2VuZFdpdGhQcm90b2NvbChfdGhpcy5jcmVhdGVDb21wbGV0aW9uTWVzc2FnZShzdHJlYW1JZCwgbWVzc2FnZSkpOyB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2VRdWV1ZSA9IHByb21pc2VRdWV1ZS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnNlbmRXaXRoUHJvdG9jb2woX3RoaXMuY3JlYXRlU3RyZWFtSXRlbU1lc3NhZ2Uoc3RyZWFtSWQsIGl0ZW0pKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIFdlIHdhbnQgdG8gaXRlcmF0ZSBvdmVyIHRoZSBrZXlzLCBzaW5jZSB0aGUga2V5cyBhcmUgdGhlIHN0cmVhbSBpZHNcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cclxuICAgICAgICBmb3IgKHZhciBzdHJlYW1JZCBpbiBzdHJlYW1zKSB7XHJcbiAgICAgICAgICAgIF9sb29wXzEoc3RyZWFtSWQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5yZXBsYWNlU3RyZWFtaW5nUGFyYW1zID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuICAgICAgICB2YXIgc3RyZWFtcyA9IFtdO1xyXG4gICAgICAgIHZhciBzdHJlYW1JZHMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGFyZ3VtZW50ID0gYXJnc1tpXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNPYnNlcnZhYmxlKGFyZ3VtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0cmVhbUlkID0gdGhpcy5pbnZvY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludm9jYXRpb25JZCsrO1xyXG4gICAgICAgICAgICAgICAgLy8gU3RvcmUgdGhlIHN0cmVhbSBmb3IgbGF0ZXIgdXNlXHJcbiAgICAgICAgICAgICAgICBzdHJlYW1zW3N0cmVhbUlkXSA9IGFyZ3VtZW50O1xyXG4gICAgICAgICAgICAgICAgc3RyZWFtSWRzLnB1c2goc3RyZWFtSWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgc3RyZWFtIGZyb20gYXJnc1xyXG4gICAgICAgICAgICAgICAgYXJncy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtzdHJlYW1zLCBzdHJlYW1JZHNdO1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmlzT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uIChhcmcpIHtcclxuICAgICAgICAvLyBUaGlzIGFsbG93cyBvdGhlciBzdHJlYW0gaW1wbGVtZW50YXRpb25zIHRvIGp1c3Qgd29yayAobGlrZSByeGpzKVxyXG4gICAgICAgIHJldHVybiBhcmcgJiYgYXJnLnN1YnNjcmliZSAmJiB0eXBlb2YgYXJnLnN1YnNjcmliZSA9PT0gXCJmdW5jdGlvblwiO1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZVN0cmVhbUludm9jYXRpb24gPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgYXJncywgc3RyZWFtSWRzKSB7XHJcbiAgICAgICAgdmFyIGludm9jYXRpb25JZCA9IHRoaXMuaW52b2NhdGlvbklkO1xyXG4gICAgICAgIHRoaXMuaW52b2NhdGlvbklkKys7XHJcbiAgICAgICAgaWYgKHN0cmVhbUlkcy5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGFyZ3VtZW50czogYXJncyxcclxuICAgICAgICAgICAgICAgIGludm9jYXRpb25JZDogaW52b2NhdGlvbklkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBzdHJlYW1JZHM6IHN0cmVhbUlkcyxcclxuICAgICAgICAgICAgICAgIHRhcmdldDogbWV0aG9kTmFtZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLlN0cmVhbUludm9jYXRpb24sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgYXJndW1lbnRzOiBhcmdzLFxyXG4gICAgICAgICAgICAgICAgaW52b2NhdGlvbklkOiBpbnZvY2F0aW9uSWQudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIHRhcmdldDogbWV0aG9kTmFtZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLlN0cmVhbUludm9jYXRpb24sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZUNhbmNlbEludm9jYXRpb24gPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbnZvY2F0aW9uSWQ6IGlkLFxyXG4gICAgICAgICAgICB0eXBlOiBNZXNzYWdlVHlwZS5DYW5jZWxJbnZvY2F0aW9uLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlU3RyZWFtSXRlbU1lc3NhZ2UgPSBmdW5jdGlvbiAoaWQsIGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbnZvY2F0aW9uSWQ6IGlkLFxyXG4gICAgICAgICAgICBpdGVtOiBpdGVtLFxyXG4gICAgICAgICAgICB0eXBlOiBNZXNzYWdlVHlwZS5TdHJlYW1JdGVtLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlQ29tcGxldGlvbk1lc3NhZ2UgPSBmdW5jdGlvbiAoaWQsIGVycm9yLCByZXN1bHQpIHtcclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcixcclxuICAgICAgICAgICAgICAgIGludm9jYXRpb25JZDogaWQsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBNZXNzYWdlVHlwZS5Db21wbGV0aW9uLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbnZvY2F0aW9uSWQ6IGlkLFxyXG4gICAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcclxuICAgICAgICAgICAgdHlwZTogTWVzc2FnZVR5cGUuQ29tcGxldGlvbixcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBIdWJDb25uZWN0aW9uO1xyXG59KCkpO1xyXG5leHBvcnQgeyBIdWJDb25uZWN0aW9uIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUh1YkNvbm5lY3Rpb24uanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vLyAwLCAyLCAxMCwgMzAgc2Vjb25kIGRlbGF5cyBiZWZvcmUgcmVjb25uZWN0IGF0dGVtcHRzLlxyXG52YXIgREVGQVVMVF9SRVRSWV9ERUxBWVNfSU5fTUlMTElTRUNPTkRTID0gWzAsIDIwMDAsIDEwMDAwLCAzMDAwMCwgbnVsbF07XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG52YXIgRGVmYXVsdFJlY29ubmVjdFBvbGljeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIERlZmF1bHRSZWNvbm5lY3RQb2xpY3kocmV0cnlEZWxheXMpIHtcclxuICAgICAgICB0aGlzLnJldHJ5RGVsYXlzID0gcmV0cnlEZWxheXMgIT09IHVuZGVmaW5lZCA/IHJldHJ5RGVsYXlzLmNvbmNhdChbbnVsbF0pIDogREVGQVVMVF9SRVRSWV9ERUxBWVNfSU5fTUlMTElTRUNPTkRTO1xyXG4gICAgfVxyXG4gICAgRGVmYXVsdFJlY29ubmVjdFBvbGljeS5wcm90b3R5cGUubmV4dFJldHJ5RGVsYXlJbk1pbGxpc2Vjb25kcyA9IGZ1bmN0aW9uIChyZXRyeUNvbnRleHQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXRyeURlbGF5c1tyZXRyeUNvbnRleHQucHJldmlvdXNSZXRyeUNvdW50XTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRGVmYXVsdFJlY29ubmVjdFBvbGljeTtcclxufSgpKTtcclxuZXhwb3J0IHsgRGVmYXVsdFJlY29ubmVjdFBvbGljeSB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1EZWZhdWx0UmVjb25uZWN0UG9saWN5LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gVGhpcyB3aWxsIGJlIHRyZWF0ZWQgYXMgYSBiaXQgZmxhZyBpbiB0aGUgZnV0dXJlLCBzbyB3ZSBrZWVwIGl0IHVzaW5nIHBvd2VyLW9mLXR3byB2YWx1ZXMuXHJcbi8qKiBTcGVjaWZpZXMgYSBzcGVjaWZpYyBIVFRQIHRyYW5zcG9ydCB0eXBlLiAqL1xyXG5leHBvcnQgdmFyIEh0dHBUcmFuc3BvcnRUeXBlO1xyXG4oZnVuY3Rpb24gKEh0dHBUcmFuc3BvcnRUeXBlKSB7XHJcbiAgICAvKiogU3BlY2lmaWVzIG5vIHRyYW5zcG9ydCBwcmVmZXJlbmNlLiAqL1xyXG4gICAgSHR0cFRyYW5zcG9ydFR5cGVbSHR0cFRyYW5zcG9ydFR5cGVbXCJOb25lXCJdID0gMF0gPSBcIk5vbmVcIjtcclxuICAgIC8qKiBTcGVjaWZpZXMgdGhlIFdlYlNvY2tldHMgdHJhbnNwb3J0LiAqL1xyXG4gICAgSHR0cFRyYW5zcG9ydFR5cGVbSHR0cFRyYW5zcG9ydFR5cGVbXCJXZWJTb2NrZXRzXCJdID0gMV0gPSBcIldlYlNvY2tldHNcIjtcclxuICAgIC8qKiBTcGVjaWZpZXMgdGhlIFNlcnZlci1TZW50IEV2ZW50cyB0cmFuc3BvcnQuICovXHJcbiAgICBIdHRwVHJhbnNwb3J0VHlwZVtIdHRwVHJhbnNwb3J0VHlwZVtcIlNlcnZlclNlbnRFdmVudHNcIl0gPSAyXSA9IFwiU2VydmVyU2VudEV2ZW50c1wiO1xyXG4gICAgLyoqIFNwZWNpZmllcyB0aGUgTG9uZyBQb2xsaW5nIHRyYW5zcG9ydC4gKi9cclxuICAgIEh0dHBUcmFuc3BvcnRUeXBlW0h0dHBUcmFuc3BvcnRUeXBlW1wiTG9uZ1BvbGxpbmdcIl0gPSA0XSA9IFwiTG9uZ1BvbGxpbmdcIjtcclxufSkoSHR0cFRyYW5zcG9ydFR5cGUgfHwgKEh0dHBUcmFuc3BvcnRUeXBlID0ge30pKTtcclxuLyoqIFNwZWNpZmllcyB0aGUgdHJhbnNmZXIgZm9ybWF0IGZvciBhIGNvbm5lY3Rpb24uICovXHJcbmV4cG9ydCB2YXIgVHJhbnNmZXJGb3JtYXQ7XHJcbihmdW5jdGlvbiAoVHJhbnNmZXJGb3JtYXQpIHtcclxuICAgIC8qKiBTcGVjaWZpZXMgdGhhdCBvbmx5IHRleHQgZGF0YSB3aWxsIGJlIHRyYW5zbWl0dGVkIG92ZXIgdGhlIGNvbm5lY3Rpb24uICovXHJcbiAgICBUcmFuc2ZlckZvcm1hdFtUcmFuc2ZlckZvcm1hdFtcIlRleHRcIl0gPSAxXSA9IFwiVGV4dFwiO1xyXG4gICAgLyoqIFNwZWNpZmllcyB0aGF0IGJpbmFyeSBkYXRhIHdpbGwgYmUgdHJhbnNtaXR0ZWQgb3ZlciB0aGUgY29ubmVjdGlvbi4gKi9cclxuICAgIFRyYW5zZmVyRm9ybWF0W1RyYW5zZmVyRm9ybWF0W1wiQmluYXJ5XCJdID0gMl0gPSBcIkJpbmFyeVwiO1xyXG59KShUcmFuc2ZlckZvcm1hdCB8fCAoVHJhbnNmZXJGb3JtYXQgPSB7fSkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1JVHJhbnNwb3J0LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gUm91Z2ggcG9seWZpbGwgb2YgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0Fib3J0Q29udHJvbGxlclxyXG4vLyBXZSBkb24ndCBhY3R1YWxseSBldmVyIHVzZSB0aGUgQVBJIGJlaW5nIHBvbHlmaWxsZWQsIHdlIGFsd2F5cyB1c2UgdGhlIHBvbHlmaWxsIGJlY2F1c2VcclxuLy8gaXQncyBhIHZlcnkgbmV3IEFQSSByaWdodCBub3cuXHJcbi8vIE5vdCBleHBvcnRlZCBmcm9tIGluZGV4LlxyXG4vKiogQHByaXZhdGUgKi9cclxudmFyIEFib3J0Q29udHJvbGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEFib3J0Q29udHJvbGxlcigpIHtcclxuICAgICAgICB0aGlzLmlzQWJvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25hYm9ydCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBBYm9ydENvbnRyb2xsZXIucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0Fib3J0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0Fib3J0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vbmFib3J0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uYWJvcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQWJvcnRDb250cm9sbGVyLnByb3RvdHlwZSwgXCJzaWduYWxcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBYm9ydENvbnRyb2xsZXIucHJvdG90eXBlLCBcImFib3J0ZWRcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc0Fib3J0ZWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gQWJvcnRDb250cm9sbGVyO1xyXG59KCkpO1xyXG5leHBvcnQgeyBBYm9ydENvbnRyb2xsZXIgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QWJvcnRDb250cm9sbGVyLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5pbXBvcnQgeyBBYm9ydENvbnRyb2xsZXIgfSBmcm9tIFwiLi9BYm9ydENvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgSHR0cEVycm9yLCBUaW1lb3V0RXJyb3IgfSBmcm9tIFwiLi9FcnJvcnNcIjtcclxuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tIFwiLi9JTG9nZ2VyXCI7XHJcbmltcG9ydCB7IFRyYW5zZmVyRm9ybWF0IH0gZnJvbSBcIi4vSVRyYW5zcG9ydFwiO1xyXG5pbXBvcnQgeyBBcmcsIGdldERhdGFEZXRhaWwsIGdldFVzZXJBZ2VudEhlYWRlciwgc2VuZE1lc3NhZ2UgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG4vLyBOb3QgZXhwb3J0ZWQgZnJvbSAnaW5kZXgnLCB0aGlzIHR5cGUgaXMgaW50ZXJuYWwuXHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG52YXIgTG9uZ1BvbGxpbmdUcmFuc3BvcnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBMb25nUG9sbGluZ1RyYW5zcG9ydChodHRwQ2xpZW50LCBhY2Nlc3NUb2tlbkZhY3RvcnksIGxvZ2dlciwgbG9nTWVzc2FnZUNvbnRlbnQsIHdpdGhDcmVkZW50aWFscywgaGVhZGVycykge1xyXG4gICAgICAgIHRoaXMuaHR0cENsaWVudCA9IGh0dHBDbGllbnQ7XHJcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnkgPSBhY2Nlc3NUb2tlbkZhY3Rvcnk7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICAgICAgdGhpcy5wb2xsQWJvcnQgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICAgICAgdGhpcy5sb2dNZXNzYWdlQ29udGVudCA9IGxvZ01lc3NhZ2VDb250ZW50O1xyXG4gICAgICAgIHRoaXMud2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzO1xyXG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnM7XHJcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vbnJlY2VpdmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMub25jbG9zZSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTG9uZ1BvbGxpbmdUcmFuc3BvcnQucHJvdG90eXBlLCBcInBvbGxBYm9ydGVkXCIsIHtcclxuICAgICAgICAvLyBUaGlzIGlzIGFuIGludGVybmFsIHR5cGUsIG5vdCBleHBvcnRlZCBmcm9tICdpbmRleCcgc28gdGhpcyBpcyByZWFsbHkganVzdCBpbnRlcm5hbC5cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9sbEFib3J0LmFib3J0ZWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBMb25nUG9sbGluZ1RyYW5zcG9ydC5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uICh1cmwsIHRyYW5zZmVyRm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX2EsIF9iLCBuYW1lLCB2YWx1ZSwgaGVhZGVycywgcG9sbE9wdGlvbnMsIHRva2VuLCBwb2xsVXJsLCByZXNwb25zZTtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYykge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYy5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXJnLmlzUmVxdWlyZWQodXJsLCBcInVybFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXJnLmlzUmVxdWlyZWQodHJhbnNmZXJGb3JtYXQsIFwidHJhbnNmZXJGb3JtYXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFyZy5pc0luKHRyYW5zZmVyRm9ybWF0LCBUcmFuc2ZlckZvcm1hdCwgXCJ0cmFuc2ZlckZvcm1hdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBDb25uZWN0aW5nLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWxsb3cgYmluYXJ5IGZvcm1hdCBvbiBOb2RlIGFuZCBCcm93c2VycyB0aGF0IHN1cHBvcnQgYmluYXJ5IGNvbnRlbnQgKGluZGljYXRlZCBieSB0aGUgcHJlc2VuY2Ugb2YgcmVzcG9uc2VUeXBlIHByb3BlcnR5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNmZXJGb3JtYXQgPT09IFRyYW5zZmVyRm9ybWF0LkJpbmFyeSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgbmV3IFhNTEh0dHBSZXF1ZXN0KCkucmVzcG9uc2VUeXBlICE9PSBcInN0cmluZ1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmluYXJ5IHByb3RvY29scyBvdmVyIFhtbEh0dHBSZXF1ZXN0IG5vdCBpbXBsZW1lbnRpbmcgYWR2YW5jZWQgZmVhdHVyZXMgYXJlIG5vdCBzdXBwb3J0ZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iID0gZ2V0VXNlckFnZW50SGVhZGVyKCksIG5hbWUgPSBfYlswXSwgdmFsdWUgPSBfYlsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVycyA9IF9fYXNzaWduKChfYSA9IHt9LCBfYVtuYW1lXSA9IHZhbHVlLCBfYSksIHRoaXMuaGVhZGVycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvbGxPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRTaWduYWw6IHRoaXMucG9sbEFib3J0LnNpZ25hbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAxMDAwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMud2l0aENyZWRlbnRpYWxzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNmZXJGb3JtYXQgPT09IFRyYW5zZmVyRm9ybWF0LkJpbmFyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9sbE9wdGlvbnMucmVzcG9uc2VUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2V0QWNjZXNzVG9rZW4oKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IF9jLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFkZXJUb2tlbihwb2xsT3B0aW9ucywgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2xsVXJsID0gdXJsICsgXCImXz1cIiArIERhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBwb2xsaW5nOiBcIiArIHBvbGxVcmwgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuaHR0cENsaWVudC5nZXQocG9sbFVybCwgcG9sbE9wdGlvbnMpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Muc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgVW5leHBlY3RlZCByZXNwb25zZSBjb2RlOiBcIiArIHJlc3BvbnNlLnN0YXR1c0NvZGUgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNYXJrIHJ1bm5pbmcgYXMgZmFsc2Ugc28gdGhhdCB0aGUgcG9sbCBpbW1lZGlhdGVseSBlbmRzIGFuZCBydW5zIHRoZSBjbG9zZSBsb2dpY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVycm9yID0gbmV3IEh0dHBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0IHx8IFwiXCIsIHJlc3BvbnNlLnN0YXR1c0NvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVjZWl2aW5nID0gdGhpcy5wb2xsKHRoaXMudXJsLCBwb2xsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgTG9uZ1BvbGxpbmdUcmFuc3BvcnQucHJvdG90eXBlLmdldEFjY2Vzc1Rva2VuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5KCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qLywgbnVsbF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIExvbmdQb2xsaW5nVHJhbnNwb3J0LnByb3RvdHlwZS51cGRhdGVIZWFkZXJUb2tlbiA9IGZ1bmN0aW9uIChyZXF1ZXN0LCB0b2tlbikge1xyXG4gICAgICAgIGlmICghcmVxdWVzdC5oZWFkZXJzKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycyA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXN0cmluZy1saXRlcmFsXHJcbiAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl0gPSBcIkJlYXJlciBcIiArIHRva2VuO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zdHJpbmctbGl0ZXJhbFxyXG4gICAgICAgIGlmIChyZXF1ZXN0LmhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdKSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zdHJpbmctbGl0ZXJhbFxyXG4gICAgICAgICAgICBkZWxldGUgcmVxdWVzdC5oZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgTG9uZ1BvbGxpbmdUcmFuc3BvcnQucHJvdG90eXBlLnBvbGwgPSBmdW5jdGlvbiAodXJsLCBwb2xsT3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRva2VuLCBwb2xsVXJsLCByZXNwb25zZSwgZV8xO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzAsICwgOCwgOV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucnVubmluZykgcmV0dXJuIFszIC8qYnJlYWsqLywgN107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2V0QWNjZXNzVG9rZW4oKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFkZXJUb2tlbihwb2xsT3B0aW9ucywgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzMsIDUsICwgNl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2xsVXJsID0gdXJsICsgXCImXz1cIiArIERhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBwb2xsaW5nOiBcIiArIHBvbGxVcmwgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuaHR0cENsaWVudC5nZXQocG9sbFVybCwgcG9sbE9wdGlvbnMpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gMjA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgUG9sbCB0ZXJtaW5hdGVkIGJ5IHNlcnZlci5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlICE9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5FcnJvciwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBVbmV4cGVjdGVkIHJlc3BvbnNlIGNvZGU6IFwiICsgcmVzcG9uc2Uuc3RhdHVzQ29kZSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVuZXhwZWN0ZWQgc3RhdHVzIGNvZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VFcnJvciA9IG5ldyBIdHRwRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCB8fCBcIlwiLCByZXNwb25zZS5zdGF0dXNDb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJvY2VzcyB0aGUgcmVzcG9uc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5jb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIGRhdGEgcmVjZWl2ZWQuIFwiICsgZ2V0RGF0YURldGFpbChyZXNwb25zZS5jb250ZW50LCB0aGlzLmxvZ01lc3NhZ2VDb250ZW50KSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vbnJlY2VpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbnJlY2VpdmUocmVzcG9uc2UuY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhbm90aGVyIHdheSB0aW1lb3V0IG1hbmlmZXN0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBQb2xsIHRpbWVkIG91dCwgcmVpc3N1aW5nLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA2XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJ1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExvZyBidXQgZGlzcmVnYXJkIGVycm9ycyB0aGF0IG9jY3VyIGFmdGVyIHN0b3BwaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgUG9sbCBlcnJvcmVkIGFmdGVyIHNodXRkb3duOiBcIiArIGVfMS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlXzEgaW5zdGFuY2VvZiBUaW1lb3V0RXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgdGltZW91dHMgYW5kIHJlaXNzdWUgdGhlIHBvbGwuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIFBvbGwgdGltZWQgb3V0LCByZWlzc3VpbmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2xvc2UgdGhlIGNvbm5lY3Rpb24gd2l0aCB0aGUgZXJyb3IgYXMgdGhlIHJlc3VsdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRXJyb3IgPSBlXzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzMgLypicmVhayovLCAxXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6IHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIFBvbGxpbmcgY29tcGxldGUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSB3aWxsIHJlYWNoIGhlcmUgd2l0aCBwb2xsQWJvcnRlZD09ZmFsc2Ugd2hlbiB0aGUgc2VydmVyIHJldHVybmVkIGEgcmVzcG9uc2UgY2F1c2luZyB0aGUgdHJhbnNwb3J0IHRvIHN0b3AuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHBvbGxBYm9ydGVkPT10cnVlIHRoZW4gY2xpZW50IGluaXRpYXRlZCB0aGUgc3RvcCBhbmQgdGhlIHN0b3AgbWV0aG9kIHdpbGwgcmFpc2UgdGhlIGNsb3NlIGV2ZW50IGFmdGVyIERFTEVURSBpcyBzZW50LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucG9sbEFib3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmFpc2VPbkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDk6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgTG9uZ1BvbGxpbmdUcmFuc3BvcnQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJ1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQ2Fubm90IHNlbmQgdW50aWwgdGhlIHRyYW5zcG9ydCBpcyBjb25uZWN0ZWRcIikpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBzZW5kTWVzc2FnZSh0aGlzLmxvZ2dlciwgXCJMb25nUG9sbGluZ1wiLCB0aGlzLmh0dHBDbGllbnQsIHRoaXMudXJsLCB0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSwgZGF0YSwgdGhpcy5sb2dNZXNzYWdlQ29udGVudCwgdGhpcy53aXRoQ3JlZGVudGlhbHMsIHRoaXMuaGVhZGVycyldO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBMb25nUG9sbGluZ1RyYW5zcG9ydC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBoZWFkZXJzLCBfYSwgbmFtZV8xLCB2YWx1ZSwgZGVsZXRlT3B0aW9ucywgdG9rZW47XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBTdG9wcGluZyBwb2xsaW5nLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGVsbCByZWNlaXZpbmcgbG9vcCB0byBzdG9wLCBhYm9ydCBhbnkgY3VycmVudCByZXF1ZXN0LCBhbmQgdGhlbiB3YWl0IGZvciBpdCB0byBmaW5pc2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9sbEFib3J0LmFib3J0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgLCA1LCA2XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVjZWl2aW5nXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VuZCBERUxFVEUgdG8gY2xlYW4gdXAgbG9uZyBwb2xsaW5nIG9uIHRoZSBzZXJ2ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIHNlbmRpbmcgREVMRVRFIHJlcXVlc3QgdG8gXCIgKyB0aGlzLnVybCArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVycyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IGdldFVzZXJBZ2VudEhlYWRlcigpLCBuYW1lXzEgPSBfYVswXSwgdmFsdWUgPSBfYVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1tuYW1lXzFdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBfX2Fzc2lnbih7fSwgaGVhZGVycywgdGhpcy5oZWFkZXJzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy53aXRoQ3JlZGVudGlhbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2V0QWNjZXNzVG9rZW4oKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IF9iLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFkZXJUb2tlbihkZWxldGVPcHRpb25zLCB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuaHR0cENsaWVudC5kZWxldGUodGhpcy51cmwsIGRlbGV0ZU9wdGlvbnMpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIERFTEVURSByZXF1ZXN0IHNlbnQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA2XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBTdG9wIGZpbmlzaGVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmFpc2UgY2xvc2UgZXZlbnQgaGVyZSBpbnN0ZWFkIG9mIGluIHBvbGxpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSXQgbmVlZHMgdG8gaGFwcGVuIGFmdGVyIHRoZSBERUxFVEUgcmVxdWVzdCBpcyBzZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmFpc2VPbkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNyAvKmVuZGZpbmFsbHkqL107XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIExvbmdQb2xsaW5nVHJhbnNwb3J0LnByb3RvdHlwZS5yYWlzZU9uQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub25jbG9zZSkge1xyXG4gICAgICAgICAgICB2YXIgbG9nTWVzc2FnZSA9IFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgRmlyaW5nIG9uY2xvc2UgZXZlbnQuXCI7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGxvZ01lc3NhZ2UgKz0gXCIgRXJyb3I6IFwiICsgdGhpcy5jbG9zZUVycm9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgbG9nTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRoaXMub25jbG9zZSh0aGlzLmNsb3NlRXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gTG9uZ1BvbGxpbmdUcmFuc3BvcnQ7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IExvbmdQb2xsaW5nVHJhbnNwb3J0IH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxvbmdQb2xsaW5nVHJhbnNwb3J0LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5pbXBvcnQgeyBMb2dMZXZlbCB9IGZyb20gXCIuL0lMb2dnZXJcIjtcclxuaW1wb3J0IHsgVHJhbnNmZXJGb3JtYXQgfSBmcm9tIFwiLi9JVHJhbnNwb3J0XCI7XHJcbmltcG9ydCB7IEFyZywgZ2V0RGF0YURldGFpbCwgZ2V0VXNlckFnZW50SGVhZGVyLCBQbGF0Zm9ybSwgc2VuZE1lc3NhZ2UgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG4vKiogQHByaXZhdGUgKi9cclxudmFyIFNlcnZlclNlbnRFdmVudHNUcmFuc3BvcnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTZXJ2ZXJTZW50RXZlbnRzVHJhbnNwb3J0KGh0dHBDbGllbnQsIGFjY2Vzc1Rva2VuRmFjdG9yeSwgbG9nZ2VyLCBsb2dNZXNzYWdlQ29udGVudCwgZXZlbnRTb3VyY2VDb25zdHJ1Y3Rvciwgd2l0aENyZWRlbnRpYWxzLCBoZWFkZXJzKSB7XHJcbiAgICAgICAgdGhpcy5odHRwQ2xpZW50ID0gaHR0cENsaWVudDtcclxuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSA9IGFjY2Vzc1Rva2VuRmFjdG9yeTtcclxuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcclxuICAgICAgICB0aGlzLmxvZ01lc3NhZ2VDb250ZW50ID0gbG9nTWVzc2FnZUNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy53aXRoQ3JlZGVudGlhbHMgPSB3aXRoQ3JlZGVudGlhbHM7XHJcbiAgICAgICAgdGhpcy5ldmVudFNvdXJjZUNvbnN0cnVjdG9yID0gZXZlbnRTb3VyY2VDb25zdHJ1Y3RvcjtcclxuICAgICAgICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzO1xyXG4gICAgICAgIHRoaXMub25yZWNlaXZlID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9uY2xvc2UgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydC5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uICh1cmwsIHRyYW5zZmVyRm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdG9rZW47XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFyZy5pc1JlcXVpcmVkKHVybCwgXCJ1cmxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFyZy5pc1JlcXVpcmVkKHRyYW5zZmVyRm9ybWF0LCBcInRyYW5zZmVyRm9ybWF0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBcmcuaXNJbih0cmFuc2ZlckZvcm1hdCwgVHJhbnNmZXJGb3JtYXQsIFwidHJhbnNmZXJGb3JtYXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoU1NFIHRyYW5zcG9ydCkgQ29ubmVjdGluZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCB1cmwgYmVmb3JlIGFjY2Vzc1Rva2VuRmFjdG9yeSBiZWNhdXNlIHRoaXMudXJsIGlzIG9ubHkgZm9yIHNlbmQgYW5kIHdlIHNldCB0aGUgYXV0aCBoZWFkZXIgaW5zdGVhZCBvZiB0aGUgcXVlcnkgc3RyaW5nIGZvciBzZW5kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXJsID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5KSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnkoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgKz0gKHVybC5pbmRleE9mKFwiP1wiKSA8IDAgPyBcIj9cIiA6IFwiJlwiKSArIChcImFjY2Vzc190b2tlbj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh0b2tlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiBbMiAvKnJldHVybiovLCBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3BlbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNmZXJGb3JtYXQgIT09IFRyYW5zZmVyRm9ybWF0LlRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiVGhlIFNlcnZlci1TZW50IEV2ZW50cyB0cmFuc3BvcnQgb25seSBzdXBwb3J0cyB0aGUgJ1RleHQnIHRyYW5zZmVyIGZvcm1hdFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50U291cmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFBsYXRmb3JtLmlzQnJvd3NlciB8fCBQbGF0Zm9ybS5pc1dlYldvcmtlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50U291cmNlID0gbmV3IF90aGlzLmV2ZW50U291cmNlQ29uc3RydWN0b3IodXJsLCB7IHdpdGhDcmVkZW50aWFsczogX3RoaXMud2l0aENyZWRlbnRpYWxzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm9uLWJyb3dzZXIgcGFzc2VzIGNvb2tpZXMgdmlhIHRoZSBkaWN0aW9uYXJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvb2tpZXMgPSBfdGhpcy5odHRwQ2xpZW50LmdldENvb2tpZVN0cmluZyh1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoZWFkZXJzID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVycy5Db29raWUgPSBjb29raWVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IGdldFVzZXJBZ2VudEhlYWRlcigpLCBuYW1lXzEgPSBfYVswXSwgdmFsdWUgPSBfYVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzW25hbWVfMV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFNvdXJjZSA9IG5ldyBfdGhpcy5ldmVudFNvdXJjZUNvbnN0cnVjdG9yKHVybCwgeyB3aXRoQ3JlZGVudGlhbHM6IF90aGlzLndpdGhDcmVkZW50aWFscywgaGVhZGVyczogX19hc3NpZ24oe30sIGhlYWRlcnMsIF90aGlzLmhlYWRlcnMpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFNvdXJjZS5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMub25yZWNlaXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKFNTRSB0cmFuc3BvcnQpIGRhdGEgcmVjZWl2ZWQuIFwiICsgZ2V0RGF0YURldGFpbChlLmRhdGEsIF90aGlzLmxvZ01lc3NhZ2VDb250ZW50KSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vbnJlY2VpdmUoZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50U291cmNlLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZS5kYXRhIHx8IFwiRXJyb3Igb2NjdXJyZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50U291cmNlLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCJTU0UgY29ubmVjdGVkIHRvIFwiICsgX3RoaXMudXJsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZXZlbnRTb3VyY2UgPSBldmVudFNvdXJjZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZXZlbnRTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQ2Fubm90IHNlbmQgdW50aWwgdGhlIHRyYW5zcG9ydCBpcyBjb25uZWN0ZWRcIikpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBzZW5kTWVzc2FnZSh0aGlzLmxvZ2dlciwgXCJTU0VcIiwgdGhpcy5odHRwQ2xpZW50LCB0aGlzLnVybCwgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnksIGRhdGEsIHRoaXMubG9nTWVzc2FnZUNvbnRlbnQsIHRoaXMud2l0aENyZWRlbnRpYWxzLCB0aGlzLmhlYWRlcnMpXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfTtcclxuICAgIFNlcnZlclNlbnRFdmVudHNUcmFuc3BvcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAodGhpcy5ldmVudFNvdXJjZSkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50U291cmNlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRTb3VyY2UgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9uY2xvc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25jbG9zZShlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydDtcclxufSgpKTtcclxuZXhwb3J0IHsgU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydCB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1TZXJ2ZXJTZW50RXZlbnRzVHJhbnNwb3J0LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5pbXBvcnQgeyBMb2dMZXZlbCB9IGZyb20gXCIuL0lMb2dnZXJcIjtcclxuaW1wb3J0IHsgVHJhbnNmZXJGb3JtYXQgfSBmcm9tIFwiLi9JVHJhbnNwb3J0XCI7XHJcbmltcG9ydCB7IEFyZywgZ2V0RGF0YURldGFpbCwgZ2V0VXNlckFnZW50SGVhZGVyLCBQbGF0Zm9ybSB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG52YXIgV2ViU29ja2V0VHJhbnNwb3J0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gV2ViU29ja2V0VHJhbnNwb3J0KGh0dHBDbGllbnQsIGFjY2Vzc1Rva2VuRmFjdG9yeSwgbG9nZ2VyLCBsb2dNZXNzYWdlQ29udGVudCwgd2ViU29ja2V0Q29uc3RydWN0b3IsIGhlYWRlcnMpIHtcclxuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcclxuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSA9IGFjY2Vzc1Rva2VuRmFjdG9yeTtcclxuICAgICAgICB0aGlzLmxvZ01lc3NhZ2VDb250ZW50ID0gbG9nTWVzc2FnZUNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy53ZWJTb2NrZXRDb25zdHJ1Y3RvciA9IHdlYlNvY2tldENvbnN0cnVjdG9yO1xyXG4gICAgICAgIHRoaXMuaHR0cENsaWVudCA9IGh0dHBDbGllbnQ7XHJcbiAgICAgICAgdGhpcy5vbnJlY2VpdmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMub25jbG9zZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gaGVhZGVycztcclxuICAgIH1cclxuICAgIFdlYlNvY2tldFRyYW5zcG9ydC5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uICh1cmwsIHRyYW5zZmVyRm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdG9rZW47XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFyZy5pc1JlcXVpcmVkKHVybCwgXCJ1cmxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFyZy5pc1JlcXVpcmVkKHRyYW5zZmVyRm9ybWF0LCBcInRyYW5zZmVyRm9ybWF0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBcmcuaXNJbih0cmFuc2ZlckZvcm1hdCwgVHJhbnNmZXJGb3JtYXQsIFwidHJhbnNmZXJGb3JtYXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoV2ViU29ja2V0cyB0cmFuc3BvcnQpIENvbm5lY3RpbmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5KSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnkoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgKz0gKHVybC5pbmRleE9mKFwiP1wiKSA8IDAgPyBcIj9cIiA6IFwiJlwiKSArIChcImFjY2Vzc190b2tlbj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh0b2tlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiBbMiAvKnJldHVybiovLCBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgvXmh0dHAvLCBcIndzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdlYlNvY2tldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb29raWVzID0gX3RoaXMuaHR0cENsaWVudC5nZXRDb29raWVTdHJpbmcodXJsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcGVuZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChQbGF0Zm9ybS5pc05vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaGVhZGVycyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IGdldFVzZXJBZ2VudEhlYWRlcigpLCBuYW1lXzEgPSBfYVswXSwgdmFsdWUgPSBfYVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzW25hbWVfMV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29va2llcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzW1wiQ29va2llXCJdID0gXCJcIiArIGNvb2tpZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgcGFzcyBoZWFkZXJzIHdoZW4gaW4gbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2ViU29ja2V0ID0gbmV3IF90aGlzLndlYlNvY2tldENvbnN0cnVjdG9yKHVybCwgdW5kZWZpbmVkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IF9fYXNzaWduKHt9LCBoZWFkZXJzLCBfdGhpcy5oZWFkZXJzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghd2ViU29ja2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hyb21lIGlzIG5vdCBoYXBweSB3aXRoIHBhc3NpbmcgJ3VuZGVmaW5lZCcgYXMgcHJvdG9jb2xcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJTb2NrZXQgPSBuZXcgX3RoaXMud2ViU29ja2V0Q29uc3RydWN0b3IodXJsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2ZlckZvcm1hdCA9PT0gVHJhbnNmZXJGb3JtYXQuQmluYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2ViU29ja2V0LmJpbmFyeVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2ViU29ja2V0Lm9ub3BlbiA9IGZ1bmN0aW9uIChfZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkluZm9ybWF0aW9uLCBcIldlYlNvY2tldCBjb25uZWN0ZWQgdG8gXCIgKyB1cmwgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMud2ViU29ja2V0ID0gd2ViU29ja2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYlNvY2tldC5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFcnJvckV2ZW50IGlzIGEgYnJvd3NlciBvbmx5IHR5cGUgd2UgbmVlZCB0byBjaGVjayBpZiB0aGUgdHlwZSBleGlzdHMgYmVmb3JlIHVzaW5nIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBFcnJvckV2ZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGV2ZW50IGluc3RhbmNlb2YgRXJyb3JFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IGV2ZW50LmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXCJUaGVyZSB3YXMgYW4gZXJyb3Igd2l0aCB0aGUgdHJhbnNwb3J0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJTb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihXZWJTb2NrZXRzIHRyYW5zcG9ydCkgZGF0YSByZWNlaXZlZC4gXCIgKyBnZXREYXRhRGV0YWlsKG1lc3NhZ2UuZGF0YSwgX3RoaXMubG9nTWVzc2FnZUNvbnRlbnQpICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5vbnJlY2VpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9ucmVjZWl2ZShtZXNzYWdlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2xvc2UoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYlNvY2tldC5vbmNsb3NlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgY2FsbCBjbG9zZSBoYW5kbGVyIGlmIGNvbm5lY3Rpb24gd2FzIG5ldmVyIGVzdGFibGlzaGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UnbGwgcmVqZWN0IHRoZSBjb25uZWN0IGNhbGwgaW5zdGVhZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2xvc2UoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXJyb3JFdmVudCBpcyBhIGJyb3dzZXIgb25seSB0eXBlIHdlIG5lZWQgdG8gY2hlY2sgaWYgdGhlIHR5cGUgZXhpc3RzIGJlZm9yZSB1c2luZyBpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIEVycm9yRXZlbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZXZlbnQgaW5zdGFuY2VvZiBFcnJvckV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IGV2ZW50LmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXCJUaGVyZSB3YXMgYW4gZXJyb3Igd2l0aCB0aGUgdHJhbnNwb3J0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgV2ViU29ja2V0VHJhbnNwb3J0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy53ZWJTb2NrZXQgJiYgdGhpcy53ZWJTb2NrZXQucmVhZHlTdGF0ZSA9PT0gdGhpcy53ZWJTb2NrZXRDb25zdHJ1Y3Rvci5PUEVOKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoV2ViU29ja2V0cyB0cmFuc3BvcnQpIHNlbmRpbmcgZGF0YS4gXCIgKyBnZXREYXRhRGV0YWlsKGRhdGEsIHRoaXMubG9nTWVzc2FnZUNvbnRlbnQpICsgXCIuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLndlYlNvY2tldC5zZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIldlYlNvY2tldCBpcyBub3QgaW4gdGhlIE9QRU4gc3RhdGVcIik7XHJcbiAgICB9O1xyXG4gICAgV2ViU29ja2V0VHJhbnNwb3J0LnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLndlYlNvY2tldCkge1xyXG4gICAgICAgICAgICAvLyBNYW51YWxseSBpbnZva2Ugb25jbG9zZSBjYWxsYmFjayBpbmxpbmUgc28gd2Uga25vdyB0aGUgSHR0cENvbm5lY3Rpb24gd2FzIGNsb3NlZCBwcm9wZXJseSBiZWZvcmUgcmV0dXJuaW5nXHJcbiAgICAgICAgICAgIC8vIFRoaXMgYWxzbyBzb2x2ZXMgYW4gaXNzdWUgd2hlcmUgd2Vic29ja2V0Lm9uY2xvc2UgY291bGQgdGFrZSAxOCsgc2Vjb25kcyB0byB0cmlnZ2VyIGR1cmluZyBuZXR3b3JrIGRpc2Nvbm5lY3RzXHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UodW5kZWZpbmVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfTtcclxuICAgIFdlYlNvY2tldFRyYW5zcG9ydC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAvLyB3ZWJTb2NrZXQgd2lsbCBiZSBudWxsIGlmIHRoZSB0cmFuc3BvcnQgZGlkIG5vdCBzdGFydCBzdWNjZXNzZnVsbHlcclxuICAgICAgICBpZiAodGhpcy53ZWJTb2NrZXQpIHtcclxuICAgICAgICAgICAgLy8gQ2xlYXIgd2Vic29ja2V0IGhhbmRsZXJzIGJlY2F1c2Ugd2UgYXJlIGNvbnNpZGVyaW5nIHRoZSBzb2NrZXQgY2xvc2VkIG5vd1xyXG4gICAgICAgICAgICB0aGlzLndlYlNvY2tldC5vbmNsb3NlID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgICAgICAgICB0aGlzLndlYlNvY2tldC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoKSB7IH07XHJcbiAgICAgICAgICAgIHRoaXMud2ViU29ja2V0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7IH07XHJcbiAgICAgICAgICAgIHRoaXMud2ViU29ja2V0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMud2ViU29ja2V0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKFdlYlNvY2tldHMgdHJhbnNwb3J0KSBzb2NrZXQgY2xvc2VkLlwiKTtcclxuICAgICAgICBpZiAodGhpcy5vbmNsb3NlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQ2xvc2VFdmVudChldmVudCkgJiYgKGV2ZW50Lndhc0NsZWFuID09PSBmYWxzZSB8fCBldmVudC5jb2RlICE9PSAxMDAwKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbmNsb3NlKG5ldyBFcnJvcihcIldlYlNvY2tldCBjbG9zZWQgd2l0aCBzdGF0dXMgY29kZTogXCIgKyBldmVudC5jb2RlICsgXCIgKFwiICsgZXZlbnQucmVhc29uICsgXCIpLlwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbmNsb3NlKGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25jbG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFdlYlNvY2tldFRyYW5zcG9ydC5wcm90b3R5cGUuaXNDbG9zZUV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50ICYmIHR5cGVvZiBldmVudC53YXNDbGVhbiA9PT0gXCJib29sZWFuXCIgJiYgdHlwZW9mIGV2ZW50LmNvZGUgPT09IFwibnVtYmVyXCI7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFdlYlNvY2tldFRyYW5zcG9ydDtcclxufSgpKTtcclxuZXhwb3J0IHsgV2ViU29ja2V0VHJhbnNwb3J0IH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVdlYlNvY2tldFRyYW5zcG9ydC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXHJcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn07XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuaW1wb3J0IHsgRGVmYXVsdEh0dHBDbGllbnQgfSBmcm9tIFwiLi9EZWZhdWx0SHR0cENsaWVudFwiO1xyXG5pbXBvcnQgeyBMb2dMZXZlbCB9IGZyb20gXCIuL0lMb2dnZXJcIjtcclxuaW1wb3J0IHsgSHR0cFRyYW5zcG9ydFR5cGUsIFRyYW5zZmVyRm9ybWF0IH0gZnJvbSBcIi4vSVRyYW5zcG9ydFwiO1xyXG5pbXBvcnQgeyBMb25nUG9sbGluZ1RyYW5zcG9ydCB9IGZyb20gXCIuL0xvbmdQb2xsaW5nVHJhbnNwb3J0XCI7XHJcbmltcG9ydCB7IFNlcnZlclNlbnRFdmVudHNUcmFuc3BvcnQgfSBmcm9tIFwiLi9TZXJ2ZXJTZW50RXZlbnRzVHJhbnNwb3J0XCI7XHJcbmltcG9ydCB7IEFyZywgY3JlYXRlTG9nZ2VyLCBnZXRVc2VyQWdlbnRIZWFkZXIsIFBsYXRmb3JtIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IHsgV2ViU29ja2V0VHJhbnNwb3J0IH0gZnJvbSBcIi4vV2ViU29ja2V0VHJhbnNwb3J0XCI7XHJcbnZhciBNQVhfUkVESVJFQ1RTID0gMTAwO1xyXG4vKiogQHByaXZhdGUgKi9cclxudmFyIEh0dHBDb25uZWN0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gSHR0cENvbm5lY3Rpb24odXJsLCBvcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cclxuICAgICAgICB0aGlzLnN0b3BQcm9taXNlUmVzb2x2ZXIgPSBmdW5jdGlvbiAoKSB7IH07XHJcbiAgICAgICAgdGhpcy5mZWF0dXJlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMubmVnb3RpYXRlVmVyc2lvbiA9IDE7XHJcbiAgICAgICAgQXJnLmlzUmVxdWlyZWQodXJsLCBcInVybFwiKTtcclxuICAgICAgICB0aGlzLmxvZ2dlciA9IGNyZWF0ZUxvZ2dlcihvcHRpb25zLmxvZ2dlcik7XHJcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gdGhpcy5yZXNvbHZlVXJsKHVybCk7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgb3B0aW9ucy5sb2dNZXNzYWdlQ29udGVudCA9IG9wdGlvbnMubG9nTWVzc2FnZUNvbnRlbnQgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogb3B0aW9ucy5sb2dNZXNzYWdlQ29udGVudDtcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID09PSBcImJvb2xlYW5cIiB8fCBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRpb25zLndpdGhDcmVkZW50aWFscztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIndpdGhDcmVkZW50aWFscyBvcHRpb24gd2FzIG5vdCBhICdib29sZWFuJyBvciAndW5kZWZpbmVkJyB2YWx1ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHdlYlNvY2tldE1vZHVsZSA9IG51bGw7XHJcbiAgICAgICAgdmFyIGV2ZW50U291cmNlTW9kdWxlID0gbnVsbDtcclxuICAgICAgICBpZiAoUGxhdGZvcm0uaXNOb2RlICYmIHR5cGVvZiByZXF1aXJlICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIC8vIEluIG9yZGVyIHRvIGlnbm9yZSB0aGUgZHluYW1pYyByZXF1aXJlIGluIHdlYnBhY2sgYnVpbGRzIHdlIG5lZWQgdG8gZG8gdGhpcyBtYWdpY1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlOiBUUyBkb2Vzbid0IGtub3cgYWJvdXQgdGhlc2UgbmFtZXNcclxuICAgICAgICAgICAgdmFyIHJlcXVpcmVGdW5jID0gdHlwZW9mIF9fd2VicGFja19yZXF1aXJlX18gPT09IFwiZnVuY3Rpb25cIiA/IF9fbm9uX3dlYnBhY2tfcmVxdWlyZV9fIDogcmVxdWlyZTtcclxuICAgICAgICAgICAgd2ViU29ja2V0TW9kdWxlID0gcmVxdWlyZUZ1bmMoXCJ3c1wiKTtcclxuICAgICAgICAgICAgZXZlbnRTb3VyY2VNb2R1bGUgPSByZXF1aXJlRnVuYyhcImV2ZW50c291cmNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIVBsYXRmb3JtLmlzTm9kZSAmJiB0eXBlb2YgV2ViU29ja2V0ICE9PSBcInVuZGVmaW5lZFwiICYmICFvcHRpb25zLldlYlNvY2tldCkge1xyXG4gICAgICAgICAgICBvcHRpb25zLldlYlNvY2tldCA9IFdlYlNvY2tldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoUGxhdGZvcm0uaXNOb2RlICYmICFvcHRpb25zLldlYlNvY2tldCkge1xyXG4gICAgICAgICAgICBpZiAod2ViU29ja2V0TW9kdWxlKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLldlYlNvY2tldCA9IHdlYlNvY2tldE1vZHVsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIVBsYXRmb3JtLmlzTm9kZSAmJiB0eXBlb2YgRXZlbnRTb3VyY2UgIT09IFwidW5kZWZpbmVkXCIgJiYgIW9wdGlvbnMuRXZlbnRTb3VyY2UpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5FdmVudFNvdXJjZSA9IEV2ZW50U291cmNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChQbGF0Zm9ybS5pc05vZGUgJiYgIW9wdGlvbnMuRXZlbnRTb3VyY2UpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBldmVudFNvdXJjZU1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5FdmVudFNvdXJjZSA9IGV2ZW50U291cmNlTW9kdWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaHR0cENsaWVudCA9IG9wdGlvbnMuaHR0cENsaWVudCB8fCBuZXcgRGVmYXVsdEh0dHBDbGllbnQodGhpcy5sb2dnZXIpO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gXCJEaXNjb25uZWN0ZWRcIiAvKiBEaXNjb25uZWN0ZWQgKi87XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgdGhpcy5vbnJlY2VpdmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMub25jbG9zZSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAodHJhbnNmZXJGb3JtYXQpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlLCBtZXNzYWdlO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2ZlckZvcm1hdCA9IHRyYW5zZmVyRm9ybWF0IHx8IFRyYW5zZmVyRm9ybWF0LkJpbmFyeTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXJnLmlzSW4odHJhbnNmZXJGb3JtYXQsIFRyYW5zZmVyRm9ybWF0LCBcInRyYW5zZmVyRm9ybWF0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiU3RhcnRpbmcgY29ubmVjdGlvbiB3aXRoIHRyYW5zZmVyIGZvcm1hdCAnXCIgKyBUcmFuc2ZlckZvcm1hdFt0cmFuc2ZlckZvcm1hdF0gKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IFwiRGlzY29ubmVjdGVkXCIgLyogRGlzY29ubmVjdGVkICovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQ2Fubm90IHN0YXJ0IGFuIEh0dHBDb25uZWN0aW9uIHRoYXQgaXMgbm90IGluIHRoZSAnRGlzY29ubmVjdGVkJyBzdGF0ZS5cIikpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IFwiQ29ubmVjdGluZ1wiIC8qIENvbm5lY3RpbmcgKi87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJbnRlcm5hbFByb21pc2UgPSB0aGlzLnN0YXJ0SW50ZXJuYWwodHJhbnNmZXJGb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnN0YXJ0SW50ZXJuYWxQcm9taXNlXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IFwiRGlzY29ubmVjdGluZ1wiIC8qIERpc2Nvbm5lY3RpbmcgKi8pKSByZXR1cm4gWzMgLypicmVhayovLCAzXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiRmFpbGVkIHRvIHN0YXJ0IHRoZSBIdHRwQ29ubmVjdGlvbiBiZWZvcmUgc3RvcCgpIHdhcyBjYWxsZWQuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5FcnJvciwgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGNhbm5vdCBhd2FpdCBzdG9wUHJvbWlzZSBpbnNpZGUgc3RhcnRJbnRlcm5hbCBzaW5jZSBzdG9wSW50ZXJuYWwgYXdhaXRzIHRoZSBzdGFydEludGVybmFsUHJvbWlzZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zdG9wUHJvbWlzZV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYW5ub3QgYXdhaXQgc3RvcFByb21pc2UgaW5zaWRlIHN0YXJ0SW50ZXJuYWwgc2luY2Ugc3RvcEludGVybmFsIGF3YWl0cyB0aGUgc3RhcnRJbnRlcm5hbFByb21pc2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihtZXNzYWdlKSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlICE9PSBcIkNvbm5lY3RlZFwiIC8qIENvbm5lY3RlZCAqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiSHR0cENvbm5lY3Rpb24uc3RhcnRJbnRlcm5hbCBjb21wbGV0ZWQgZ3JhY2VmdWxseSBidXQgZGlkbid0IGVudGVyIHRoZSBjb25uZWN0aW9uIGludG8gdGhlIGNvbm5lY3RlZCBzdGF0ZSFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5FcnJvciwgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKG1lc3NhZ2UpKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSA0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSAhPT0gXCJDb25uZWN0ZWRcIiAvKiBDb25uZWN0ZWQgKi8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkNhbm5vdCBzZW5kIGRhdGEgaWYgdGhlIGNvbm5lY3Rpb24gaXMgbm90IGluIHRoZSAnQ29ubmVjdGVkJyBTdGF0ZS5cIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuc2VuZFF1ZXVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZFF1ZXVlID0gbmV3IFRyYW5zcG9ydFNlbmRRdWV1ZSh0aGlzLnRyYW5zcG9ydCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFRyYW5zcG9ydCB3aWxsIG5vdCBiZSBudWxsIGlmIHN0YXRlIGlzIGNvbm5lY3RlZFxyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRRdWV1ZS5zZW5kKGRhdGEpO1xyXG4gICAgfTtcclxuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IFwiRGlzY29ubmVjdGVkXCIgLyogRGlzY29ubmVjdGVkICovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiQ2FsbCB0byBIdHRwQ29ubmVjdGlvbi5zdG9wKFwiICsgZXJyb3IgKyBcIikgaWdub3JlZCBiZWNhdXNlIHRoZSBjb25uZWN0aW9uIGlzIGFscmVhZHkgaW4gdGhlIGRpc2Nvbm5lY3RlZCBzdGF0ZS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZXNvbHZlKCldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gXCJEaXNjb25uZWN0aW5nXCIgLyogRGlzY29ubmVjdGluZyAqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIkNhbGwgdG8gSHR0cENvbm5lY3Rpb24uc3RvcChcIiArIGVycm9yICsgXCIpIGlnbm9yZWQgYmVjYXVzZSB0aGUgY29ubmVjdGlvbiBpcyBhbHJlYWR5IGluIHRoZSBkaXNjb25uZWN0aW5nIHN0YXRlLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnN0b3BQcm9taXNlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IFwiRGlzY29ubmVjdGluZ1wiIC8qIERpc2Nvbm5lY3RpbmcgKi87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcFByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgY29tcGxldGUgc3RvcCgpIHVudGlsIHN0b3BDb25uZWN0aW9uKCkgY29tcGxldGVzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3RvcFByb21pc2VSZXNvbHZlciA9IHJlc29sdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdG9wSW50ZXJuYWwgc2hvdWxkIG5ldmVyIHRocm93IHNvIGp1c3Qgb2JzZXJ2ZSBpdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zdG9wSW50ZXJuYWwoZXJyb3IpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0b3BJbnRlcm5hbCBzaG91bGQgbmV2ZXIgdGhyb3cgc28ganVzdCBvYnNlcnZlIGl0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RvcFByb21pc2VdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5zdG9wSW50ZXJuYWwgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBlXzEsIGVfMjtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGVycm9yIGFzIHNvb24gYXMgcG9zc2libGUgb3RoZXJ3aXNlIHRoZXJlIGlzIGEgcmFjZSBiZXR3ZWVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSB0cmFuc3BvcnQgY2xvc2luZyBhbmQgcHJvdmlkaW5nIGFuIGVycm9yIGFuZCB0aGUgZXJyb3IgZnJvbSBhIGNsb3NlIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2Ugd291bGQgcHJlZmVyIHRoZSBjbG9zZSBtZXNzYWdlIGVycm9yLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BFcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzEsIDMsICwgNF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnN0YXJ0SW50ZXJuYWxQcm9taXNlXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlXzEgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnRyYW5zcG9ydCkgcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gNTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbNSwgNywgLCA4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMudHJhbnNwb3J0LnN0b3AoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZV8yID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIFwiSHR0cENvbm5lY3Rpb24udHJhbnNwb3J0LnN0b3AoKSB0aHJldyBlcnJvciAnXCIgKyBlXzIgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BDb25uZWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDEwXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJIdHRwQ29ubmVjdGlvbi50cmFuc3BvcnQgaXMgdW5kZWZpbmVkIGluIEh0dHBDb25uZWN0aW9uLnN0b3AoKSBiZWNhdXNlIHN0YXJ0KCkgZmFpbGVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxMDtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5zdGFydEludGVybmFsID0gZnVuY3Rpb24gKHRyYW5zZmVyRm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdXJsLCBuZWdvdGlhdGVSZXNwb25zZSwgcmVkaXJlY3RzLCBfbG9vcF8xLCB0aGlzXzEsIGVfMztcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gdGhpcy5iYXNlVXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSA9IHRoaXMub3B0aW9ucy5hY2Nlc3NUb2tlbkZhY3Rvcnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgMTIsICwgMTNdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuc2tpcE5lZ290aWF0aW9uKSByZXR1cm4gWzMgLypicmVhayovLCA1XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodGhpcy5vcHRpb25zLnRyYW5zcG9ydCA9PT0gSHR0cFRyYW5zcG9ydFR5cGUuV2ViU29ja2V0cykpIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBObyBuZWVkIHRvIGFkZCBhIGNvbm5lY3Rpb24gSUQgaW4gdGhpcyBjYXNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdGhpcy5jb25zdHJ1Y3RUcmFuc3BvcnQoSHR0cFRyYW5zcG9ydFR5cGUuV2ViU29ja2V0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIHNob3VsZCBqdXN0IGNhbGwgY29ubmVjdCBkaXJlY3RseSBpbiB0aGlzIGNhc2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vIGZhbGxiYWNrIG9yIG5lZ290aWF0ZSBpbiB0aGlzIGNhc2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RhcnRUcmFuc3BvcnQodXJsLCB0cmFuc2ZlckZvcm1hdCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2Ugc2hvdWxkIGp1c3QgY2FsbCBjb25uZWN0IGRpcmVjdGx5IGluIHRoaXMgY2FzZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm8gZmFsbGJhY2sgb3IgbmVnb3RpYXRlIGluIHRoaXMgY2FzZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHRocm93IG5ldyBFcnJvcihcIk5lZ290aWF0aW9uIGNhbiBvbmx5IGJlIHNraXBwZWQgd2hlbiB1c2luZyB0aGUgV2ViU29ja2V0IHRyYW5zcG9ydCBkaXJlY3RseS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzMgLypicmVhayovLCAxMV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWdvdGlhdGVSZXNwb25zZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0cyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9sb29wXzEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNjZXNzVG9rZW5fMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpc18xLmdldE5lZ290aWF0aW9uUmVzcG9uc2UodXJsKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lZ290aWF0ZVJlc3BvbnNlID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHVzZXIgdHJpZXMgdG8gc3RvcCB0aGUgY29ubmVjdGlvbiB3aGVuIGl0IGlzIGJlaW5nIHN0YXJ0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzXzEuY29ubmVjdGlvblN0YXRlID09PSBcIkRpc2Nvbm5lY3RpbmdcIiAvKiBEaXNjb25uZWN0aW5nICovIHx8IHRoaXNfMS5jb25uZWN0aW9uU3RhdGUgPT09IFwiRGlzY29ubmVjdGVkXCIgLyogRGlzY29ubmVjdGVkICovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGNvbm5lY3Rpb24gd2FzIHN0b3BwZWQgZHVyaW5nIG5lZ290aWF0aW9uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZWdvdGlhdGVSZXNwb25zZS5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihuZWdvdGlhdGVSZXNwb25zZS5lcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmVnb3RpYXRlUmVzcG9uc2UuUHJvdG9jb2xWZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRGV0ZWN0ZWQgYSBjb25uZWN0aW9uIGF0dGVtcHQgdG8gYW4gQVNQLk5FVCBTaWduYWxSIFNlcnZlci4gVGhpcyBjbGllbnQgb25seSBzdXBwb3J0cyBjb25uZWN0aW5nIHRvIGFuIEFTUC5ORVQgQ29yZSBTaWduYWxSIFNlcnZlci4gU2VlIGh0dHBzOi8vYWthLm1zL3NpZ25hbHItY29yZS1kaWZmZXJlbmNlcyBmb3IgZGV0YWlscy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmVnb3RpYXRlUmVzcG9uc2UudXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gbmVnb3RpYXRlUmVzcG9uc2UudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5lZ290aWF0ZVJlc3BvbnNlLmFjY2Vzc1Rva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzVG9rZW5fMSA9IG5lZ290aWF0ZVJlc3BvbnNlLmFjY2Vzc1Rva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNfMS5hY2Nlc3NUb2tlbkZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBhY2Nlc3NUb2tlbl8xOyB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNfMSA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gNjtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbNSAvKnlpZWxkKiovLCBfbG9vcF8xKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmVnb3RpYXRlUmVzcG9uc2UudXJsICYmIHJlZGlyZWN0cyA8IE1BWF9SRURJUkVDVFMpIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVkaXJlY3RzID09PSBNQVhfUkVESVJFQ1RTICYmIG5lZ290aWF0ZVJlc3BvbnNlLnVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTmVnb3RpYXRlIHJlZGlyZWN0aW9uIGxpbWl0IGV4Y2VlZGVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmNyZWF0ZVRyYW5zcG9ydCh1cmwsIHRoaXMub3B0aW9ucy50cmFuc3BvcnQsIG5lZ290aWF0ZVJlc3BvbnNlLCB0cmFuc2ZlckZvcm1hdCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxMTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDExOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFuc3BvcnQgaW5zdGFuY2VvZiBMb25nUG9sbGluZ1RyYW5zcG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZWF0dXJlcy5pbmhlcmVudEtlZXBBbGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBcIkNvbm5lY3RpbmdcIiAvKiBDb25uZWN0aW5nICovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFbnN1cmUgdGhlIGNvbm5lY3Rpb24gdHJhbnNpdGlvbnMgdG8gdGhlIGNvbm5lY3RlZCBzdGF0ZSBwcmlvciB0byBjb21wbGV0aW5nIHRoaXMuc3RhcnRJbnRlcm5hbFByb21pc2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFydCgpIHdpbGwgaGFuZGxlIHRoZSBjYXNlIHdoZW4gc3RvcCB3YXMgY2FsbGVkIGFuZCBzdGFydEludGVybmFsIGV4aXRzIHN0aWxsIGluIHRoZSBkaXNjb25uZWN0aW5nIHN0YXRlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIlRoZSBIdHRwQ29ubmVjdGlvbiBjb25uZWN0ZWQgc3VjY2Vzc2Z1bGx5LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gXCJDb25uZWN0ZWRcIiAvKiBDb25uZWN0ZWQgKi87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMTNdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMyA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkVycm9yLCBcIkZhaWxlZCB0byBzdGFydCB0aGUgY29ubmVjdGlvbjogXCIgKyBlXzMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IFwiRGlzY29ubmVjdGVkXCIgLyogRGlzY29ubmVjdGVkICovO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgc3RhcnQgZmFpbHMsIGFueSBhY3RpdmUgY2FsbHMgdG8gc3RvcCBhc3N1bWUgdGhhdCBzdGFydCB3aWxsIGNvbXBsZXRlIHRoZSBzdG9wIHByb21pc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wUHJvbWlzZVJlc29sdmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlamVjdChlXzMpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDEzOiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5nZXROZWdvdGlhdGlvblJlc3BvbnNlID0gZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGhlYWRlcnMsIHRva2VuLCBfYSwgbmFtZSwgdmFsdWUsIG5lZ290aWF0ZVVybCwgcmVzcG9uc2UsIG5lZ290aWF0ZVJlc3BvbnNlLCBlXzQ7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnMgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5KCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBfYi5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl0gPSBcIkJlYXJlciBcIiArIHRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gZ2V0VXNlckFnZW50SGVhZGVyKCksIG5hbWUgPSBfYVswXSwgdmFsdWUgPSBfYVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1tuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWdvdGlhdGVVcmwgPSB0aGlzLnJlc29sdmVOZWdvdGlhdGVVcmwodXJsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIlNlbmRpbmcgbmVnb3RpYXRpb24gcmVxdWVzdDogXCIgKyBuZWdvdGlhdGVVcmwgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMywgNSwgLCA2XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuaHR0cENsaWVudC5wb3N0KG5lZ290aWF0ZVVybCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogX19hc3NpZ24oe30sIGhlYWRlcnMsIHRoaXMub3B0aW9ucy5oZWFkZXJzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMub3B0aW9ucy53aXRoQ3JlZGVudGlhbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9iLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgIT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgc3RhdHVzIGNvZGUgcmV0dXJuZWQgZnJvbSBuZWdvdGlhdGUgJ1wiICsgcmVzcG9uc2Uuc3RhdHVzQ29kZSArIFwiJ1wiKSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZ290aWF0ZVJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZS5jb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuZWdvdGlhdGVSZXNwb25zZS5uZWdvdGlhdGVWZXJzaW9uIHx8IG5lZ290aWF0ZVJlc3BvbnNlLm5lZ290aWF0ZVZlcnNpb24gPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOZWdvdGlhdGUgdmVyc2lvbiAwIGRvZXNuJ3QgdXNlIGNvbm5lY3Rpb25Ub2tlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU28gd2Ugc2V0IGl0IGVxdWFsIHRvIGNvbm5lY3Rpb25JZCBzbyBhbGwgb3VyIGxvZ2ljIGNhbiB1c2UgY29ubmVjdGlvblRva2VuIHdpdGhvdXQgYmVpbmcgYXdhcmUgb2YgdGhlIG5lZ290aWF0ZSB2ZXJzaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWdvdGlhdGVSZXNwb25zZS5jb25uZWN0aW9uVG9rZW4gPSBuZWdvdGlhdGVSZXNwb25zZS5jb25uZWN0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG5lZ290aWF0ZVJlc3BvbnNlXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfNCA9IF9iLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkVycm9yLCBcIkZhaWxlZCB0byBjb21wbGV0ZSBuZWdvdGlhdGlvbiB3aXRoIHRoZSBzZXJ2ZXI6IFwiICsgZV80KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KGVfNCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlQ29ubmVjdFVybCA9IGZ1bmN0aW9uICh1cmwsIGNvbm5lY3Rpb25Ub2tlbikge1xyXG4gICAgICAgIGlmICghY29ubmVjdGlvblRva2VuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmwgKyAodXJsLmluZGV4T2YoXCI/XCIpID09PSAtMSA/IFwiP1wiIDogXCImXCIpICsgKFwiaWQ9XCIgKyBjb25uZWN0aW9uVG9rZW4pO1xyXG4gICAgfTtcclxuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVUcmFuc3BvcnQgPSBmdW5jdGlvbiAodXJsLCByZXF1ZXN0ZWRUcmFuc3BvcnQsIG5lZ290aWF0ZVJlc3BvbnNlLCByZXF1ZXN0ZWRUcmFuc2ZlckZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGNvbm5lY3RVcmwsIHRyYW5zcG9ydEV4Y2VwdGlvbnMsIHRyYW5zcG9ydHMsIG5lZ290aWF0ZSwgX2ksIHRyYW5zcG9ydHNfMSwgZW5kcG9pbnQsIHRyYW5zcG9ydE9yRXJyb3IsIGV4XzEsIGV4XzIsIG1lc3NhZ2U7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3RVcmwgPSB0aGlzLmNyZWF0ZUNvbm5lY3RVcmwodXJsLCBuZWdvdGlhdGVSZXNwb25zZS5jb25uZWN0aW9uVG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNJVHJhbnNwb3J0KHJlcXVlc3RlZFRyYW5zcG9ydCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiQ29ubmVjdGlvbiB3YXMgcHJvdmlkZWQgYW4gaW5zdGFuY2Ugb2YgSVRyYW5zcG9ydCwgdXNpbmcgdGhhdCBkaXJlY3RseS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0ID0gcmVxdWVzdGVkVHJhbnNwb3J0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnN0YXJ0VHJhbnNwb3J0KGNvbm5lY3RVcmwsIHJlcXVlc3RlZFRyYW5zZmVyRm9ybWF0KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbklkID0gbmVnb3RpYXRlUmVzcG9uc2UuY29ubmVjdGlvbklkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRFeGNlcHRpb25zID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydHMgPSBuZWdvdGlhdGVSZXNwb25zZS5hdmFpbGFibGVUcmFuc3BvcnRzIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWdvdGlhdGUgPSBuZWdvdGlhdGVSZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2kgPSAwLCB0cmFuc3BvcnRzXzEgPSB0cmFuc3BvcnRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShfaSA8IHRyYW5zcG9ydHNfMS5sZW5ndGgpKSByZXR1cm4gWzMgLypicmVhayovLCAxM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZHBvaW50ID0gdHJhbnNwb3J0c18xW19pXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0T3JFcnJvciA9IHRoaXMucmVzb2x2ZVRyYW5zcG9ydE9yRXJyb3IoZW5kcG9pbnQsIHJlcXVlc3RlZFRyYW5zcG9ydCwgcmVxdWVzdGVkVHJhbnNmZXJGb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0cmFuc3BvcnRPckVycm9yIGluc3RhbmNlb2YgRXJyb3IpKSByZXR1cm4gWzMgLypicmVhayovLCA0XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RvcmUgdGhlIGVycm9yIGFuZCBjb250aW51ZSwgd2UgZG9uJ3Qgd2FudCB0byBjYXVzZSBhIHJlLW5lZ290aWF0ZSBpbiB0aGVzZSBjYXNlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRFeGNlcHRpb25zLnB1c2goZW5kcG9pbnQudHJhbnNwb3J0ICsgXCIgZmFpbGVkOiBcIiArIHRyYW5zcG9ydE9yRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAxMl07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNJVHJhbnNwb3J0KHRyYW5zcG9ydE9yRXJyb3IpKSByZXR1cm4gWzMgLypicmVhayovLCAxMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0T3JFcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhbmVnb3RpYXRlKSByZXR1cm4gWzMgLypicmVhayovLCA5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSA1O1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFs1LCA3LCAsIDhdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXROZWdvdGlhdGlvblJlc3BvbnNlKHVybCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVnb3RpYXRlID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA4XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4XzEgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlamVjdChleF8xKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0VXJsID0gdGhpcy5jcmVhdGVDb25uZWN0VXJsKHVybCwgbmVnb3RpYXRlLmNvbm5lY3Rpb25Ub2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gOTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbOSwgMTEsICwgMTJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zdGFydFRyYW5zcG9ydChjb25uZWN0VXJsLCByZXF1ZXN0ZWRUcmFuc2ZlckZvcm1hdCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uSWQgPSBuZWdvdGlhdGUuY29ubmVjdGlvbklkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhfMiA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkVycm9yLCBcIkZhaWxlZCB0byBzdGFydCB0aGUgdHJhbnNwb3J0ICdcIiArIGVuZHBvaW50LnRyYW5zcG9ydCArIFwiJzogXCIgKyBleF8yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVnb3RpYXRlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRFeGNlcHRpb25zLnB1c2goZW5kcG9pbnQudHJhbnNwb3J0ICsgXCIgZmFpbGVkOiBcIiArIGV4XzIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IFwiQ29ubmVjdGluZ1wiIC8qIENvbm5lY3RpbmcgKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIkZhaWxlZCB0byBzZWxlY3QgdHJhbnNwb3J0IGJlZm9yZSBzdG9wKCkgd2FzIGNhbGxlZC5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKG1lc3NhZ2UpKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMTJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc3BvcnRFeGNlcHRpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJVbmFibGUgdG8gY29ubmVjdCB0byB0aGUgc2VydmVyIHdpdGggYW55IG9mIHRoZSBhdmFpbGFibGUgdHJhbnNwb3J0cy4gXCIgKyB0cmFuc3BvcnRFeGNlcHRpb25zLmpvaW4oXCIgXCIpKSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJOb25lIG9mIHRoZSB0cmFuc3BvcnRzIHN1cHBvcnRlZCBieSB0aGUgY2xpZW50IGFyZSBzdXBwb3J0ZWQgYnkgdGhlIHNlcnZlci5cIikpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLmNvbnN0cnVjdFRyYW5zcG9ydCA9IGZ1bmN0aW9uICh0cmFuc3BvcnQpIHtcclxuICAgICAgICBzd2l0Y2ggKHRyYW5zcG9ydCkge1xyXG4gICAgICAgICAgICBjYXNlIEh0dHBUcmFuc3BvcnRUeXBlLldlYlNvY2tldHM6XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5XZWJTb2NrZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCInV2ViU29ja2V0JyBpcyBub3Qgc3VwcG9ydGVkIGluIHlvdXIgZW52aXJvbm1lbnQuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBXZWJTb2NrZXRUcmFuc3BvcnQodGhpcy5odHRwQ2xpZW50LCB0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSwgdGhpcy5sb2dnZXIsIHRoaXMub3B0aW9ucy5sb2dNZXNzYWdlQ29udGVudCB8fCBmYWxzZSwgdGhpcy5vcHRpb25zLldlYlNvY2tldCwgdGhpcy5vcHRpb25zLmhlYWRlcnMgfHwge30pO1xyXG4gICAgICAgICAgICBjYXNlIEh0dHBUcmFuc3BvcnRUeXBlLlNlcnZlclNlbnRFdmVudHM6XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5FdmVudFNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIidFdmVudFNvdXJjZScgaXMgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGVudmlyb25tZW50LlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydCh0aGlzLmh0dHBDbGllbnQsIHRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5LCB0aGlzLmxvZ2dlciwgdGhpcy5vcHRpb25zLmxvZ01lc3NhZ2VDb250ZW50IHx8IGZhbHNlLCB0aGlzLm9wdGlvbnMuRXZlbnRTb3VyY2UsIHRoaXMub3B0aW9ucy53aXRoQ3JlZGVudGlhbHMsIHRoaXMub3B0aW9ucy5oZWFkZXJzIHx8IHt9KTtcclxuICAgICAgICAgICAgY2FzZSBIdHRwVHJhbnNwb3J0VHlwZS5Mb25nUG9sbGluZzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTG9uZ1BvbGxpbmdUcmFuc3BvcnQodGhpcy5odHRwQ2xpZW50LCB0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSwgdGhpcy5sb2dnZXIsIHRoaXMub3B0aW9ucy5sb2dNZXNzYWdlQ29udGVudCB8fCBmYWxzZSwgdGhpcy5vcHRpb25zLndpdGhDcmVkZW50aWFscywgdGhpcy5vcHRpb25zLmhlYWRlcnMgfHwge30pO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biB0cmFuc3BvcnQ6IFwiICsgdHJhbnNwb3J0ICsgXCIuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUuc3RhcnRUcmFuc3BvcnQgPSBmdW5jdGlvbiAodXJsLCB0cmFuc2ZlckZvcm1hdCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy50cmFuc3BvcnQub25yZWNlaXZlID0gdGhpcy5vbnJlY2VpdmU7XHJcbiAgICAgICAgdGhpcy50cmFuc3BvcnQub25jbG9zZSA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5zdG9wQ29ubmVjdGlvbihlKTsgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnQuY29ubmVjdCh1cmwsIHRyYW5zZmVyRm9ybWF0KTtcclxuICAgIH07XHJcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUucmVzb2x2ZVRyYW5zcG9ydE9yRXJyb3IgPSBmdW5jdGlvbiAoZW5kcG9pbnQsIHJlcXVlc3RlZFRyYW5zcG9ydCwgcmVxdWVzdGVkVHJhbnNmZXJGb3JtYXQpIHtcclxuICAgICAgICB2YXIgdHJhbnNwb3J0ID0gSHR0cFRyYW5zcG9ydFR5cGVbZW5kcG9pbnQudHJhbnNwb3J0XTtcclxuICAgICAgICBpZiAodHJhbnNwb3J0ID09PSBudWxsIHx8IHRyYW5zcG9ydCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJTa2lwcGluZyB0cmFuc3BvcnQgJ1wiICsgZW5kcG9pbnQudHJhbnNwb3J0ICsgXCInIGJlY2F1c2UgaXQgaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIGNsaWVudC5cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJTa2lwcGluZyB0cmFuc3BvcnQgJ1wiICsgZW5kcG9pbnQudHJhbnNwb3J0ICsgXCInIGJlY2F1c2UgaXQgaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIGNsaWVudC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodHJhbnNwb3J0TWF0Y2hlcyhyZXF1ZXN0ZWRUcmFuc3BvcnQsIHRyYW5zcG9ydCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0cmFuc2ZlckZvcm1hdHMgPSBlbmRwb2ludC50cmFuc2ZlckZvcm1hdHMubWFwKGZ1bmN0aW9uIChzKSB7IHJldHVybiBUcmFuc2ZlckZvcm1hdFtzXTsgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJhbnNmZXJGb3JtYXRzLmluZGV4T2YocmVxdWVzdGVkVHJhbnNmZXJGb3JtYXQpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKHRyYW5zcG9ydCA9PT0gSHR0cFRyYW5zcG9ydFR5cGUuV2ViU29ja2V0cyAmJiAhdGhpcy5vcHRpb25zLldlYlNvY2tldCkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRyYW5zcG9ydCA9PT0gSHR0cFRyYW5zcG9ydFR5cGUuU2VydmVyU2VudEV2ZW50cyAmJiAhdGhpcy5vcHRpb25zLkV2ZW50U291cmNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiU2tpcHBpbmcgdHJhbnNwb3J0ICdcIiArIEh0dHBUcmFuc3BvcnRUeXBlW3RyYW5zcG9ydF0gKyBcIicgYmVjYXVzZSBpdCBpcyBub3Qgc3VwcG9ydGVkIGluIHlvdXIgZW52aXJvbm1lbnQuJ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIidcIiArIEh0dHBUcmFuc3BvcnRUeXBlW3RyYW5zcG9ydF0gKyBcIicgaXMgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGVudmlyb25tZW50LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJTZWxlY3RpbmcgdHJhbnNwb3J0ICdcIiArIEh0dHBUcmFuc3BvcnRUeXBlW3RyYW5zcG9ydF0gKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiU2tpcHBpbmcgdHJhbnNwb3J0ICdcIiArIEh0dHBUcmFuc3BvcnRUeXBlW3RyYW5zcG9ydF0gKyBcIicgYmVjYXVzZSBpdCBkb2VzIG5vdCBzdXBwb3J0IHRoZSByZXF1ZXN0ZWQgdHJhbnNmZXIgZm9ybWF0ICdcIiArIFRyYW5zZmVyRm9ybWF0W3JlcXVlc3RlZFRyYW5zZmVyRm9ybWF0XSArIFwiJy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIidcIiArIEh0dHBUcmFuc3BvcnRUeXBlW3RyYW5zcG9ydF0gKyBcIicgZG9lcyBub3Qgc3VwcG9ydCBcIiArIFRyYW5zZmVyRm9ybWF0W3JlcXVlc3RlZFRyYW5zZmVyRm9ybWF0XSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJTa2lwcGluZyB0cmFuc3BvcnQgJ1wiICsgSHR0cFRyYW5zcG9ydFR5cGVbdHJhbnNwb3J0XSArIFwiJyBiZWNhdXNlIGl0IHdhcyBkaXNhYmxlZCBieSB0aGUgY2xpZW50LlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCInXCIgKyBIdHRwVHJhbnNwb3J0VHlwZVt0cmFuc3BvcnRdICsgXCInIGlzIGRpc2FibGVkIGJ5IHRoZSBjbGllbnQuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5pc0lUcmFuc3BvcnQgPSBmdW5jdGlvbiAodHJhbnNwb3J0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRyYW5zcG9ydCAmJiB0eXBlb2YgKHRyYW5zcG9ydCkgPT09IFwib2JqZWN0XCIgJiYgXCJjb25uZWN0XCIgaW4gdHJhbnNwb3J0O1xyXG4gICAgfTtcclxuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5zdG9wQ29ubmVjdGlvbiA9IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIkh0dHBDb25uZWN0aW9uLnN0b3BDb25uZWN0aW9uKFwiICsgZXJyb3IgKyBcIikgY2FsbGVkIHdoaWxlIGluIHN0YXRlIFwiICsgdGhpcy5jb25uZWN0aW9uU3RhdGUgKyBcIi5cIik7XHJcbiAgICAgICAgdGhpcy50cmFuc3BvcnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIHN0b3BFcnJvciwgaXQgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIHRoZSBlcnJvciBmcm9tIHRoZSB0cmFuc3BvcnRcclxuICAgICAgICBlcnJvciA9IHRoaXMuc3RvcEVycm9yIHx8IGVycm9yO1xyXG4gICAgICAgIHRoaXMuc3RvcEVycm9yID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gXCJEaXNjb25uZWN0ZWRcIiAvKiBEaXNjb25uZWN0ZWQgKi8pIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIkNhbGwgdG8gSHR0cENvbm5lY3Rpb24uc3RvcENvbm5lY3Rpb24oXCIgKyBlcnJvciArIFwiKSB3YXMgaWdub3JlZCBiZWNhdXNlIHRoZSBjb25uZWN0aW9uIGlzIGFscmVhZHkgaW4gdGhlIGRpc2Nvbm5lY3RlZCBzdGF0ZS5cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBcIkNvbm5lY3RpbmdcIiAvKiBDb25uZWN0aW5nICovKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5XYXJuaW5nLCBcIkNhbGwgdG8gSHR0cENvbm5lY3Rpb24uc3RvcENvbm5lY3Rpb24oXCIgKyBlcnJvciArIFwiKSB3YXMgaWdub3JlZCBiZWNhdXNlIHRoZSBjb25uZWN0aW9uIGlzIHN0aWxsIGluIHRoZSBjb25uZWN0aW5nIHN0YXRlLlwiKTtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSHR0cENvbm5lY3Rpb24uc3RvcENvbm5lY3Rpb24oXCIgKyBlcnJvciArIFwiKSB3YXMgY2FsbGVkIHdoaWxlIHRoZSBjb25uZWN0aW9uIGlzIHN0aWxsIGluIHRoZSBjb25uZWN0aW5nIHN0YXRlLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBcIkRpc2Nvbm5lY3RpbmdcIiAvKiBEaXNjb25uZWN0aW5nICovKSB7XHJcbiAgICAgICAgICAgIC8vIEEgY2FsbCB0byBzdG9wKCkgaW5kdWNlZCB0aGlzIGNhbGwgdG8gc3RvcENvbm5lY3Rpb24gYW5kIG5lZWRzIHRvIGJlIGNvbXBsZXRlZC5cclxuICAgICAgICAgICAgLy8gQW55IHN0b3AoKSBhd2FpdGVycyB3aWxsIGJlIHNjaGVkdWxlZCB0byBjb250aW51ZSBhZnRlciB0aGUgb25jbG9zZSBjYWxsYmFjayBmaXJlcy5cclxuICAgICAgICAgICAgdGhpcy5zdG9wUHJvbWlzZVJlc29sdmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIFwiQ29ubmVjdGlvbiBkaXNjb25uZWN0ZWQgd2l0aCBlcnJvciAnXCIgKyBlcnJvciArIFwiJy5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiQ29ubmVjdGlvbiBkaXNjb25uZWN0ZWQuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zZW5kUXVldWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kUXVldWUuc3RvcCgpLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkVycm9yLCBcIlRyYW5zcG9ydFNlbmRRdWV1ZS5zdG9wKCkgdGhyZXcgZXJyb3IgJ1wiICsgZSArIFwiJy5cIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRRdWV1ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uSWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBcIkRpc2Nvbm5lY3RlZFwiIC8qIERpc2Nvbm5lY3RlZCAqLztcclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhcnRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vbmNsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbmNsb3NlKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkVycm9yLCBcIkh0dHBDb25uZWN0aW9uLm9uY2xvc2UoXCIgKyBlcnJvciArIFwiKSB0aHJldyBlcnJvciAnXCIgKyBlICsgXCInLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUucmVzb2x2ZVVybCA9IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICAvLyBzdGFydHNXaXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gSUVcclxuICAgICAgICBpZiAodXJsLmxhc3RJbmRleE9mKFwiaHR0cHM6Ly9cIiwgMCkgPT09IDAgfHwgdXJsLmxhc3RJbmRleE9mKFwiaHR0cDovL1wiLCAwKSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIVBsYXRmb3JtLmlzQnJvd3NlciB8fCAhd2luZG93LmRvY3VtZW50KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCByZXNvbHZlICdcIiArIHVybCArIFwiJy5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNldHRpbmcgdGhlIHVybCB0byB0aGUgaHJlZiBwcm9wZXJ5IG9mIGFuIGFuY2hvciB0YWcgaGFuZGxlcyBub3JtYWxpemF0aW9uXHJcbiAgICAgICAgLy8gZm9yIHVzLiBUaGVyZSBhcmUgMyBtYWluIGNhc2VzLlxyXG4gICAgICAgIC8vIDEuIFJlbGF0aXZlIHBhdGggbm9ybWFsaXphdGlvbiBlLmcgXCJiXCIgLT4gXCJodHRwOi8vbG9jYWxob3N0OjUwMDAvYS9iXCJcclxuICAgICAgICAvLyAyLiBBYnNvbHV0ZSBwYXRoIG5vcm1hbGl6YXRpb24gZS5nIFwiL2EvYlwiIC0+IFwiaHR0cDovL2xvY2FsaG9zdDo1MDAwL2EvYlwiXHJcbiAgICAgICAgLy8gMy4gTmV0d29ya3BhdGggcmVmZXJlbmNlIG5vcm1hbGl6YXRpb24gZS5nIFwiLy9sb2NhbGhvc3Q6NTAwMC9hL2JcIiAtPiBcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9hL2JcIlxyXG4gICAgICAgIHZhciBhVGFnID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgICAgIGFUYWcuaHJlZiA9IHVybDtcclxuICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiTm9ybWFsaXppbmcgJ1wiICsgdXJsICsgXCInIHRvICdcIiArIGFUYWcuaHJlZiArIFwiJy5cIik7XHJcbiAgICAgICAgcmV0dXJuIGFUYWcuaHJlZjtcclxuICAgIH07XHJcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUucmVzb2x2ZU5lZ290aWF0ZVVybCA9IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB1cmwuaW5kZXhPZihcIj9cIik7XHJcbiAgICAgICAgdmFyIG5lZ290aWF0ZVVybCA9IHVybC5zdWJzdHJpbmcoMCwgaW5kZXggPT09IC0xID8gdXJsLmxlbmd0aCA6IGluZGV4KTtcclxuICAgICAgICBpZiAobmVnb3RpYXRlVXJsW25lZ290aWF0ZVVybC5sZW5ndGggLSAxXSAhPT0gXCIvXCIpIHtcclxuICAgICAgICAgICAgbmVnb3RpYXRlVXJsICs9IFwiL1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZWdvdGlhdGVVcmwgKz0gXCJuZWdvdGlhdGVcIjtcclxuICAgICAgICBuZWdvdGlhdGVVcmwgKz0gaW5kZXggPT09IC0xID8gXCJcIiA6IHVybC5zdWJzdHJpbmcoaW5kZXgpO1xyXG4gICAgICAgIGlmIChuZWdvdGlhdGVVcmwuaW5kZXhPZihcIm5lZ290aWF0ZVZlcnNpb25cIikgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIG5lZ290aWF0ZVVybCArPSBpbmRleCA9PT0gLTEgPyBcIj9cIiA6IFwiJlwiO1xyXG4gICAgICAgICAgICBuZWdvdGlhdGVVcmwgKz0gXCJuZWdvdGlhdGVWZXJzaW9uPVwiICsgdGhpcy5uZWdvdGlhdGVWZXJzaW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmVnb3RpYXRlVXJsO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBIdHRwQ29ubmVjdGlvbjtcclxufSgpKTtcclxuZXhwb3J0IHsgSHR0cENvbm5lY3Rpb24gfTtcclxuZnVuY3Rpb24gdHJhbnNwb3J0TWF0Y2hlcyhyZXF1ZXN0ZWRUcmFuc3BvcnQsIGFjdHVhbFRyYW5zcG9ydCkge1xyXG4gICAgcmV0dXJuICFyZXF1ZXN0ZWRUcmFuc3BvcnQgfHwgKChhY3R1YWxUcmFuc3BvcnQgJiByZXF1ZXN0ZWRUcmFuc3BvcnQpICE9PSAwKTtcclxufVxyXG4vKiogQHByaXZhdGUgKi9cclxudmFyIFRyYW5zcG9ydFNlbmRRdWV1ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFRyYW5zcG9ydFNlbmRRdWV1ZSh0cmFuc3BvcnQpIHtcclxuICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHRyYW5zcG9ydDtcclxuICAgICAgICB0aGlzLmJ1ZmZlciA9IFtdO1xyXG4gICAgICAgIHRoaXMuZXhlY3V0aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbmRCdWZmZXJlZERhdGEgPSBuZXcgUHJvbWlzZVNvdXJjZSgpO1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3J0UmVzdWx0ID0gbmV3IFByb21pc2VTb3VyY2UoKTtcclxuICAgICAgICB0aGlzLnNlbmRMb29wUHJvbWlzZSA9IHRoaXMuc2VuZExvb3AoKTtcclxuICAgIH1cclxuICAgIFRyYW5zcG9ydFNlbmRRdWV1ZS5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5idWZmZXJEYXRhKGRhdGEpO1xyXG4gICAgICAgIGlmICghdGhpcy50cmFuc3BvcnRSZXN1bHQpIHtcclxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRSZXN1bHQgPSBuZXcgUHJvbWlzZVNvdXJjZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnRSZXN1bHQucHJvbWlzZTtcclxuICAgIH07XHJcbiAgICBUcmFuc3BvcnRTZW5kUXVldWUucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5leGVjdXRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbmRCdWZmZXJlZERhdGEucmVzb2x2ZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRMb29wUHJvbWlzZTtcclxuICAgIH07XHJcbiAgICBUcmFuc3BvcnRTZW5kUXVldWUucHJvdG90eXBlLmJ1ZmZlckRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLmJ1ZmZlci5sZW5ndGggJiYgdHlwZW9mICh0aGlzLmJ1ZmZlclswXSkgIT09IHR5cGVvZiAoZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgZGF0YSB0byBiZSBvZiB0eXBlIFwiICsgdHlwZW9mICh0aGlzLmJ1ZmZlcikgKyBcIiBidXQgd2FzIG9mIHR5cGUgXCIgKyB0eXBlb2YgKGRhdGEpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5idWZmZXIucHVzaChkYXRhKTtcclxuICAgICAgICB0aGlzLnNlbmRCdWZmZXJlZERhdGEucmVzb2x2ZSgpO1xyXG4gICAgfTtcclxuICAgIFRyYW5zcG9ydFNlbmRRdWV1ZS5wcm90b3R5cGUuc2VuZExvb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdHJhbnNwb3J0UmVzdWx0LCBkYXRhLCBlcnJvcl8xO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRydWUpIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnNlbmRCdWZmZXJlZERhdGEucHJvbWlzZV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5leGVjdXRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zcG9ydFJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0UmVzdWx0LnJlamVjdChcIkNvbm5lY3Rpb24gc3RvcHBlZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA2XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXJlZERhdGEgPSBuZXcgUHJvbWlzZVNvdXJjZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRSZXN1bHQgPSB0aGlzLnRyYW5zcG9ydFJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRSZXN1bHQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSB0eXBlb2YgKHRoaXMuYnVmZmVyWzBdKSA9PT0gXCJzdHJpbmdcIiA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlci5qb2luKFwiXCIpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYW5zcG9ydFNlbmRRdWV1ZS5jb25jYXRCdWZmZXJzKHRoaXMuYnVmZmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXIubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsyLCA0LCAsIDVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy50cmFuc3BvcnQuc2VuZChkYXRhKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydFJlc3VsdC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfMSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0UmVzdWx0LnJlamVjdChlcnJvcl8xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzMgLypicmVhayovLCAwXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgVHJhbnNwb3J0U2VuZFF1ZXVlLmNvbmNhdEJ1ZmZlcnMgPSBmdW5jdGlvbiAoYXJyYXlCdWZmZXJzKSB7XHJcbiAgICAgICAgdmFyIHRvdGFsTGVuZ3RoID0gYXJyYXlCdWZmZXJzLm1hcChmdW5jdGlvbiAoYikgeyByZXR1cm4gYi5ieXRlTGVuZ3RoOyB9KS5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgKyBiOyB9KTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkodG90YWxMZW5ndGgpO1xyXG4gICAgICAgIHZhciBvZmZzZXQgPSAwO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgYXJyYXlCdWZmZXJzXzEgPSBhcnJheUJ1ZmZlcnM7IF9pIDwgYXJyYXlCdWZmZXJzXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gYXJyYXlCdWZmZXJzXzFbX2ldO1xyXG4gICAgICAgICAgICByZXN1bHQuc2V0KG5ldyBVaW50OEFycmF5KGl0ZW0pLCBvZmZzZXQpO1xyXG4gICAgICAgICAgICBvZmZzZXQgKz0gaXRlbS5ieXRlTGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0LmJ1ZmZlcjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVHJhbnNwb3J0U2VuZFF1ZXVlO1xyXG59KCkpO1xyXG5leHBvcnQgeyBUcmFuc3BvcnRTZW5kUXVldWUgfTtcclxudmFyIFByb21pc2VTb3VyY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBQcm9taXNlU291cmNlKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIHJldHVybiBfYSA9IFtyZXNvbHZlLCByZWplY3RdLCBfdGhpcy5yZXNvbHZlciA9IF9hWzBdLCBfdGhpcy5yZWplY3RlciA9IF9hWzFdLCBfYTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFByb21pc2VTb3VyY2UucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5yZXNvbHZlcigpO1xyXG4gICAgfTtcclxuICAgIFByb21pc2VTb3VyY2UucHJvdG90eXBlLnJlamVjdCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcclxuICAgICAgICB0aGlzLnJlamVjdGVyKHJlYXNvbik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFByb21pc2VTb3VyY2U7XHJcbn0oKSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUh0dHBDb25uZWN0aW9uLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9JSHViUHJvdG9jb2xcIjtcclxuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tIFwiLi9JTG9nZ2VyXCI7XHJcbmltcG9ydCB7IFRyYW5zZmVyRm9ybWF0IH0gZnJvbSBcIi4vSVRyYW5zcG9ydFwiO1xyXG5pbXBvcnQgeyBOdWxsTG9nZ2VyIH0gZnJvbSBcIi4vTG9nZ2Vyc1wiO1xyXG5pbXBvcnQgeyBUZXh0TWVzc2FnZUZvcm1hdCB9IGZyb20gXCIuL1RleHRNZXNzYWdlRm9ybWF0XCI7XHJcbnZhciBKU09OX0hVQl9QUk9UT0NPTF9OQU1FID0gXCJqc29uXCI7XHJcbi8qKiBJbXBsZW1lbnRzIHRoZSBKU09OIEh1YiBQcm90b2NvbC4gKi9cclxudmFyIEpzb25IdWJQcm90b2NvbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEpzb25IdWJQcm90b2NvbCgpIHtcclxuICAgICAgICAvKiogQGluaGVyaXREb2MgKi9cclxuICAgICAgICB0aGlzLm5hbWUgPSBKU09OX0hVQl9QUk9UT0NPTF9OQU1FO1xyXG4gICAgICAgIC8qKiBAaW5oZXJpdERvYyAqL1xyXG4gICAgICAgIHRoaXMudmVyc2lvbiA9IDE7XHJcbiAgICAgICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICAgICAgdGhpcy50cmFuc2ZlckZvcm1hdCA9IFRyYW5zZmVyRm9ybWF0LlRleHQ7XHJcbiAgICB9XHJcbiAgICAvKiogQ3JlYXRlcyBhbiBhcnJheSBvZiB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLkh1Yk1lc3NhZ2V9IG9iamVjdHMgZnJvbSB0aGUgc3BlY2lmaWVkIHNlcmlhbGl6ZWQgcmVwcmVzZW50YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0IEEgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIHNlcmlhbGl6ZWQgcmVwcmVzZW50YXRpb24uXHJcbiAgICAgKiBAcGFyYW0ge0lMb2dnZXJ9IGxvZ2dlciBBIGxvZ2dlciB0aGF0IHdpbGwgYmUgdXNlZCB0byBsb2cgbWVzc2FnZXMgdGhhdCBvY2N1ciBkdXJpbmcgcGFyc2luZy5cclxuICAgICAqL1xyXG4gICAgSnNvbkh1YlByb3RvY29sLnByb3RvdHlwZS5wYXJzZU1lc3NhZ2VzID0gZnVuY3Rpb24gKGlucHV0LCBsb2dnZXIpIHtcclxuICAgICAgICAvLyBUaGUgaW50ZXJmYWNlIGRvZXMgYWxsb3cgXCJBcnJheUJ1ZmZlclwiIHRvIGJlIHBhc3NlZCBpbiwgYnV0IHRoaXMgaW1wbGVtZW50YXRpb24gZG9lcyBub3QuIFNvIGxldCdzIHRocm93IGEgdXNlZnVsIGVycm9yLlxyXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBpbnB1dCBmb3IgSlNPTiBodWIgcHJvdG9jb2wuIEV4cGVjdGVkIGEgc3RyaW5nLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpbnB1dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsb2dnZXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgbG9nZ2VyID0gTnVsbExvZ2dlci5pbnN0YW5jZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUGFyc2UgdGhlIG1lc3NhZ2VzXHJcbiAgICAgICAgdmFyIG1lc3NhZ2VzID0gVGV4dE1lc3NhZ2VGb3JtYXQucGFyc2UoaW5wdXQpO1xyXG4gICAgICAgIHZhciBodWJNZXNzYWdlcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgbWVzc2FnZXNfMSA9IG1lc3NhZ2VzOyBfaSA8IG1lc3NhZ2VzXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbWVzc2FnZXNfMVtfaV07XHJcbiAgICAgICAgICAgIHZhciBwYXJzZWRNZXNzYWdlID0gSlNPTi5wYXJzZShtZXNzYWdlKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJzZWRNZXNzYWdlLnR5cGUgIT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcGF5bG9hZC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoIChwYXJzZWRNZXNzYWdlLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuSW52b2NhdGlvbjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzSW52b2NhdGlvbk1lc3NhZ2UocGFyc2VkTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLlN0cmVhbUl0ZW06XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1N0cmVhbUl0ZW1NZXNzYWdlKHBhcnNlZE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5Db21wbGV0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNDb21wbGV0aW9uTWVzc2FnZShwYXJzZWRNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuUGluZzpcclxuICAgICAgICAgICAgICAgICAgICAvLyBTaW5nbGUgdmFsdWUsIG5vIG5lZWQgdG8gdmFsaWRhdGVcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuQ2xvc2U6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWxsIG9wdGlvbmFsIHZhbHVlcywgbm8gbmVlZCB0byB2YWxpZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAvLyBGdXR1cmUgcHJvdG9jb2wgY2hhbmdlcyBjYW4gYWRkIG1lc3NhZ2UgdHlwZXMsIG9sZCBjbGllbnRzIGNhbiBpZ25vcmUgdGhlbVxyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiVW5rbm93biBtZXNzYWdlIHR5cGUgJ1wiICsgcGFyc2VkTWVzc2FnZS50eXBlICsgXCInIGlnbm9yZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGh1Yk1lc3NhZ2VzLnB1c2gocGFyc2VkTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBodWJNZXNzYWdlcztcclxuICAgIH07XHJcbiAgICAvKiogV3JpdGVzIHRoZSBzcGVjaWZpZWQge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5IdWJNZXNzYWdlfSB0byBhIHN0cmluZyBhbmQgcmV0dXJucyBpdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0h1Yk1lc3NhZ2V9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gd3JpdGUuXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBBIHN0cmluZyBjb250YWluaW5nIHRoZSBzZXJpYWxpemVkIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBKc29uSHViUHJvdG9jb2wucHJvdG90eXBlLndyaXRlTWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIFRleHRNZXNzYWdlRm9ybWF0LndyaXRlKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcclxuICAgIH07XHJcbiAgICBKc29uSHViUHJvdG9jb2wucHJvdG90eXBlLmlzSW52b2NhdGlvbk1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMuYXNzZXJ0Tm90RW1wdHlTdHJpbmcobWVzc2FnZS50YXJnZXQsIFwiSW52YWxpZCBwYXlsb2FkIGZvciBJbnZvY2F0aW9uIG1lc3NhZ2UuXCIpO1xyXG4gICAgICAgIGlmIChtZXNzYWdlLmludm9jYXRpb25JZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0Tm90RW1wdHlTdHJpbmcobWVzc2FnZS5pbnZvY2F0aW9uSWQsIFwiSW52YWxpZCBwYXlsb2FkIGZvciBJbnZvY2F0aW9uIG1lc3NhZ2UuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBKc29uSHViUHJvdG9jb2wucHJvdG90eXBlLmlzU3RyZWFtSXRlbU1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMuYXNzZXJ0Tm90RW1wdHlTdHJpbmcobWVzc2FnZS5pbnZvY2F0aW9uSWQsIFwiSW52YWxpZCBwYXlsb2FkIGZvciBTdHJlYW1JdGVtIG1lc3NhZ2UuXCIpO1xyXG4gICAgICAgIGlmIChtZXNzYWdlLml0ZW0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHBheWxvYWQgZm9yIFN0cmVhbUl0ZW0gbWVzc2FnZS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEpzb25IdWJQcm90b2NvbC5wcm90b3R5cGUuaXNDb21wbGV0aW9uTWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2UucmVzdWx0ICYmIG1lc3NhZ2UuZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBwYXlsb2FkIGZvciBDb21wbGV0aW9uIG1lc3NhZ2UuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW1lc3NhZ2UucmVzdWx0ICYmIG1lc3NhZ2UuZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5hc3NlcnROb3RFbXB0eVN0cmluZyhtZXNzYWdlLmVycm9yLCBcIkludmFsaWQgcGF5bG9hZCBmb3IgQ29tcGxldGlvbiBtZXNzYWdlLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hc3NlcnROb3RFbXB0eVN0cmluZyhtZXNzYWdlLmludm9jYXRpb25JZCwgXCJJbnZhbGlkIHBheWxvYWQgZm9yIENvbXBsZXRpb24gbWVzc2FnZS5cIik7XHJcbiAgICB9O1xyXG4gICAgSnNvbkh1YlByb3RvY29sLnByb3RvdHlwZS5hc3NlcnROb3RFbXB0eVN0cmluZyA9IGZ1bmN0aW9uICh2YWx1ZSwgZXJyb3JNZXNzYWdlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIiB8fCB2YWx1ZSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEpzb25IdWJQcm90b2NvbDtcclxufSgpKTtcclxuZXhwb3J0IHsgSnNvbkh1YlByb3RvY29sIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUpzb25IdWJQcm90b2NvbC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXHJcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn07XHJcbmltcG9ydCB7IERlZmF1bHRSZWNvbm5lY3RQb2xpY3kgfSBmcm9tIFwiLi9EZWZhdWx0UmVjb25uZWN0UG9saWN5XCI7XHJcbmltcG9ydCB7IEh0dHBDb25uZWN0aW9uIH0gZnJvbSBcIi4vSHR0cENvbm5lY3Rpb25cIjtcclxuaW1wb3J0IHsgSHViQ29ubmVjdGlvbiB9IGZyb20gXCIuL0h1YkNvbm5lY3Rpb25cIjtcclxuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tIFwiLi9JTG9nZ2VyXCI7XHJcbmltcG9ydCB7IEpzb25IdWJQcm90b2NvbCB9IGZyb20gXCIuL0pzb25IdWJQcm90b2NvbFwiO1xyXG5pbXBvcnQgeyBOdWxsTG9nZ2VyIH0gZnJvbSBcIi4vTG9nZ2Vyc1wiO1xyXG5pbXBvcnQgeyBBcmcsIENvbnNvbGVMb2dnZXIgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZTpvYmplY3QtbGl0ZXJhbC1zb3J0LWtleXNcclxudmFyIExvZ0xldmVsTmFtZU1hcHBpbmcgPSB7XHJcbiAgICB0cmFjZTogTG9nTGV2ZWwuVHJhY2UsXHJcbiAgICBkZWJ1ZzogTG9nTGV2ZWwuRGVidWcsXHJcbiAgICBpbmZvOiBMb2dMZXZlbC5JbmZvcm1hdGlvbixcclxuICAgIGluZm9ybWF0aW9uOiBMb2dMZXZlbC5JbmZvcm1hdGlvbixcclxuICAgIHdhcm46IExvZ0xldmVsLldhcm5pbmcsXHJcbiAgICB3YXJuaW5nOiBMb2dMZXZlbC5XYXJuaW5nLFxyXG4gICAgZXJyb3I6IExvZ0xldmVsLkVycm9yLFxyXG4gICAgY3JpdGljYWw6IExvZ0xldmVsLkNyaXRpY2FsLFxyXG4gICAgbm9uZTogTG9nTGV2ZWwuTm9uZSxcclxufTtcclxuZnVuY3Rpb24gcGFyc2VMb2dMZXZlbChuYW1lKSB7XHJcbiAgICAvLyBDYXNlLWluc2Vuc2l0aXZlIG1hdGNoaW5nIHZpYSBsb3dlci1jYXNpbmdcclxuICAgIC8vIFllcywgSSBrbm93IGNhc2UtZm9sZGluZyBpcyBhIGNvbXBsaWNhdGVkIHByb2JsZW0gaW4gVW5pY29kZSwgYnV0IHdlIG9ubHkgc3VwcG9ydFxyXG4gICAgLy8gdGhlIEFTQ0lJIHN0cmluZ3MgZGVmaW5lZCBpbiBMb2dMZXZlbE5hbWVNYXBwaW5nIGFueXdheSwgc28gaXQncyBmaW5lIC1hbnVyc2UuXHJcbiAgICB2YXIgbWFwcGluZyA9IExvZ0xldmVsTmFtZU1hcHBpbmdbbmFtZS50b0xvd2VyQ2FzZSgpXTtcclxuICAgIGlmICh0eXBlb2YgbWFwcGluZyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHJldHVybiBtYXBwaW5nO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBsb2cgbGV2ZWw6IFwiICsgbmFtZSk7XHJcbiAgICB9XHJcbn1cclxuLyoqIEEgYnVpbGRlciBmb3IgY29uZmlndXJpbmcge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5IdWJDb25uZWN0aW9ufSBpbnN0YW5jZXMuICovXHJcbnZhciBIdWJDb25uZWN0aW9uQnVpbGRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEh1YkNvbm5lY3Rpb25CdWlsZGVyKCkge1xyXG4gICAgfVxyXG4gICAgSHViQ29ubmVjdGlvbkJ1aWxkZXIucHJvdG90eXBlLmNvbmZpZ3VyZUxvZ2dpbmcgPSBmdW5jdGlvbiAobG9nZ2luZykge1xyXG4gICAgICAgIEFyZy5pc1JlcXVpcmVkKGxvZ2dpbmcsIFwibG9nZ2luZ1wiKTtcclxuICAgICAgICBpZiAoaXNMb2dnZXIobG9nZ2luZykpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgbG9nZ2luZyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB2YXIgbG9nTGV2ZWwgPSBwYXJzZUxvZ0xldmVsKGxvZ2dpbmcpO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlciA9IG5ldyBDb25zb2xlTG9nZ2VyKGxvZ0xldmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyID0gbmV3IENvbnNvbGVMb2dnZXIobG9nZ2luZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb25CdWlsZGVyLnByb3RvdHlwZS53aXRoVXJsID0gZnVuY3Rpb24gKHVybCwgdHJhbnNwb3J0VHlwZU9yT3B0aW9ucykge1xyXG4gICAgICAgIEFyZy5pc1JlcXVpcmVkKHVybCwgXCJ1cmxcIik7XHJcbiAgICAgICAgQXJnLmlzTm90RW1wdHkodXJsLCBcInVybFwiKTtcclxuICAgICAgICB0aGlzLnVybCA9IHVybDtcclxuICAgICAgICAvLyBGbG93LXR5cGluZyBrbm93cyB3aGVyZSBpdCdzIGF0LiBTaW5jZSBIdHRwVHJhbnNwb3J0VHlwZSBpcyBhIG51bWJlciBhbmQgSUh0dHBDb25uZWN0aW9uT3B0aW9ucyBpcyBndWFyYW50ZWVkXHJcbiAgICAgICAgLy8gdG8gYmUgYW4gb2JqZWN0LCB3ZSBrbm93IChhcyBkb2VzIFR5cGVTY3JpcHQpIHRoaXMgY29tcGFyaXNvbiBpcyBhbGwgd2UgbmVlZCB0byBmaWd1cmUgb3V0IHdoaWNoIG92ZXJsb2FkIHdhcyBjYWxsZWQuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0cmFuc3BvcnRUeXBlT3JPcHRpb25zID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaHR0cENvbm5lY3Rpb25PcHRpb25zID0gX19hc3NpZ24oe30sIHRoaXMuaHR0cENvbm5lY3Rpb25PcHRpb25zLCB0cmFuc3BvcnRUeXBlT3JPcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaHR0cENvbm5lY3Rpb25PcHRpb25zID0gX19hc3NpZ24oe30sIHRoaXMuaHR0cENvbm5lY3Rpb25PcHRpb25zLCB7IHRyYW5zcG9ydDogdHJhbnNwb3J0VHlwZU9yT3B0aW9ucyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgLyoqIENvbmZpZ3VyZXMgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuSHViQ29ubmVjdGlvbn0gdG8gdXNlIHRoZSBzcGVjaWZpZWQgSHViIFByb3RvY29sLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SUh1YlByb3RvY29sfSBwcm90b2NvbCBUaGUge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5JSHViUHJvdG9jb2x9IGltcGxlbWVudGF0aW9uIHRvIHVzZS5cclxuICAgICAqL1xyXG4gICAgSHViQ29ubmVjdGlvbkJ1aWxkZXIucHJvdG90eXBlLndpdGhIdWJQcm90b2NvbCA9IGZ1bmN0aW9uIChwcm90b2NvbCkge1xyXG4gICAgICAgIEFyZy5pc1JlcXVpcmVkKHByb3RvY29sLCBcInByb3RvY29sXCIpO1xyXG4gICAgICAgIHRoaXMucHJvdG9jb2wgPSBwcm90b2NvbDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uQnVpbGRlci5wcm90b3R5cGUud2l0aEF1dG9tYXRpY1JlY29ubmVjdCA9IGZ1bmN0aW9uIChyZXRyeURlbGF5c09yUmVjb25uZWN0UG9saWN5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVjb25uZWN0UG9saWN5KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkEgcmVjb25uZWN0UG9saWN5IGhhcyBhbHJlYWR5IGJlZW4gc2V0LlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyZXRyeURlbGF5c09yUmVjb25uZWN0UG9saWN5KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0UG9saWN5ID0gbmV3IERlZmF1bHRSZWNvbm5lY3RQb2xpY3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXRyeURlbGF5c09yUmVjb25uZWN0UG9saWN5KSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdFBvbGljeSA9IG5ldyBEZWZhdWx0UmVjb25uZWN0UG9saWN5KHJldHJ5RGVsYXlzT3JSZWNvbm5lY3RQb2xpY3kpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3RQb2xpY3kgPSByZXRyeURlbGF5c09yUmVjb25uZWN0UG9saWN5O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICAvKiogQ3JlYXRlcyBhIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuSHViQ29ubmVjdGlvbn0gZnJvbSB0aGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHNwZWNpZmllZCBpbiB0aGlzIGJ1aWxkZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0h1YkNvbm5lY3Rpb259IFRoZSBjb25maWd1cmVkIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuSHViQ29ubmVjdGlvbn0uXHJcbiAgICAgKi9cclxuICAgIEh1YkNvbm5lY3Rpb25CdWlsZGVyLnByb3RvdHlwZS5idWlsZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBJZiBodHRwQ29ubmVjdGlvbk9wdGlvbnMgaGFzIGEgbG9nZ2VyLCB1c2UgaXQuIE90aGVyd2lzZSwgb3ZlcnJpZGUgaXQgd2l0aCB0aGUgb25lXHJcbiAgICAgICAgLy8gcHJvdmlkZWQgdG8gY29uZmlndXJlTG9nZ2VyXHJcbiAgICAgICAgdmFyIGh0dHBDb25uZWN0aW9uT3B0aW9ucyA9IHRoaXMuaHR0cENvbm5lY3Rpb25PcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIC8vIElmIGl0J3MgJ251bGwnLCB0aGUgdXNlciAqKmV4cGxpY2l0bHkqKiBhc2tlZCBmb3IgbnVsbCwgZG9uJ3QgbWVzcyB3aXRoIGl0LlxyXG4gICAgICAgIGlmIChodHRwQ29ubmVjdGlvbk9wdGlvbnMubG9nZ2VyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gSWYgb3VyIGxvZ2dlciBpcyB1bmRlZmluZWQgb3IgbnVsbCwgdGhhdCdzIE9LLCB0aGUgSHR0cENvbm5lY3Rpb24gY29uc3RydWN0b3Igd2lsbCBoYW5kbGUgaXQuXHJcbiAgICAgICAgICAgIGh0dHBDb25uZWN0aW9uT3B0aW9ucy5sb2dnZXIgPSB0aGlzLmxvZ2dlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTm93IGNyZWF0ZSB0aGUgY29ubmVjdGlvblxyXG4gICAgICAgIGlmICghdGhpcy51cmwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlICdIdWJDb25uZWN0aW9uQnVpbGRlci53aXRoVXJsJyBtZXRob2QgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIGJ1aWxkaW5nIHRoZSBjb25uZWN0aW9uLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSBuZXcgSHR0cENvbm5lY3Rpb24odGhpcy51cmwsIGh0dHBDb25uZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIEh1YkNvbm5lY3Rpb24uY3JlYXRlKGNvbm5lY3Rpb24sIHRoaXMubG9nZ2VyIHx8IE51bGxMb2dnZXIuaW5zdGFuY2UsIHRoaXMucHJvdG9jb2wgfHwgbmV3IEpzb25IdWJQcm90b2NvbCgpLCB0aGlzLnJlY29ubmVjdFBvbGljeSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEh1YkNvbm5lY3Rpb25CdWlsZGVyO1xyXG59KCkpO1xyXG5leHBvcnQgeyBIdWJDb25uZWN0aW9uQnVpbGRlciB9O1xyXG5mdW5jdGlvbiBpc0xvZ2dlcihsb2dnZXIpIHtcclxuICAgIHJldHVybiBsb2dnZXIubG9nICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SHViQ29ubmVjdGlvbkJ1aWxkZXIuanMubWFwIl0sIm5hbWVzIjpbIl9fZXh0ZW5kcyIsInRoaXMiLCJfX2Fzc2lnbiIsIkxvZ0xldmVsIiwiX19hd2FpdGVyIiwiX19nZW5lcmF0b3IiLCJBYm9ydENvbnRyb2xsZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUE7SUFDQTtJQUNBLElBQUlBLFdBQVMsR0FBRyxDQUFDQyxTQUFJLElBQUlBLFNBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQyxZQUFZO0lBQ3pELElBQUks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Q0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0lBQ2pFLGdCQUFnQjtJQUNoQixvQkFBb0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtJQUNoSSxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtJQUMxRyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFO0lBQ3pGLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMs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QUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtJQUN2SixRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM5RSxLQUFLLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQztJQUNGLElBQUlJLGFBQVcsR0FBRyxDQUFDSixTQUFJLElBQUlBLFNBQUksQ0FBQyxXQUFXLEtBQUssVUFBVSxPQUFPLEVBQUUsSUFBSSxFQUFFO0lBQ3pFLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUs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LENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JILElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sTUFBTSxLQUFLLFVBQVUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0osSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN0RSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRTtJQUN0QixRQUFRLElBQUksQ0FBQyxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUN0RSxRQUFRLE9BQU8sQ0FBQyxFQUFFLElBQUk7SUFDdEIsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN6SyxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEQsWUFBWSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekIsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDOUMsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUN4RSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztJQUNqRSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUztJQUNqRSxnQkFBZ0I7SUFDaEIsb0JBQW9CLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7SUFDaEksb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7SUFDMUcsb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRTtJQUN6RixvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO0lBQ3ZGLG9CQUFvQixJQUFJLENBQUMsQ0FBQyxDQUFD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LFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0lBQ3ZKLFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzlFLEtBQUssQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDO0lBQ0YsSUFBSUksYUFBVyxHQUFHLENBQUNKLFNBQUksSUFBSUEsU0FBSSxDQUFDLFdBQVcsS0FBSyxVQUFVLE9BQU8sRUFBRSxJQUFJLEVBQUU7SUFDekUsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JILElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sTUFBTSxLQUFLLFVBQVUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0osSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN0RSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRTtJQUN0QixRQUFRLElBQUksQ0FBQyxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUN0RSxRQUFRLE9BQU8sQ0FBQyxFQUFFLElBQUk7SUFDdEIsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN6SyxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEQsWUFBWSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekIsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDOUMsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUN4RSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztJQUNqRSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUztJQUNqRSxnQkFBZ0I7SUFDaEIsb0JBQW9CLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7SUFDaEksb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtB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QUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0lBQ3ZKLFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzlFLEtBQUssQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDO0lBQ0YsSUFBSUksYUFBVyxHQUFHLENBQUNKLFNBQUksSUFBSUEsU0FBSSxDQUFDLFdBQVcsS0FBSyxVQUFVLE9BQU8sRUFBRSxJQUFJLEVBQUU7SUFDekUsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JILElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sTUFBTSxLQUFLLFVBQVUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0osSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN0RSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRTtJQUN0QixRQUFRLElBQUksQ0FBQyxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUN0RSxRQUFRLE9BQU8sQ0FBQyxFQUFFLElBQUk7SUFDdEIsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN6SyxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEQsWUFBWSxRQUFRLEVBQUUs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LElBQUksQ0FBQyxFQUFFLEVBQUU7SUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDdEUsUUFBUSxPQUFPLENBQUMsRUFBRSxJQUFJO0lBQ3RCLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekssWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BELFlBQVksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLGdCQUFnQixLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNO0lBQzlDLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDeEUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7SUFDakUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVM7SUFDakUsZ0JBQWdCO0lBQ2hCLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFO0lBQ2hJLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO0lBQzFHLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FB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QztJQUN0RSxRQUFRLE9BQU8sQ0FBQyxFQUFFLElBQUk7SUFDdEIsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN6SyxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEQsWUFBWSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekIsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDOUMsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUN4RSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztJQUNqRSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUztJQUNqRSxnQkFBZ0I7SUFDaEIsb0JBQW9CLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7SUFDaEksb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7SUFDMUcsb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRTtJQUN6RixvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENB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Q0FBQyxNQUFNLEVBQUU7SUFDMUIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxHQUFHLEtBQUssU0FBUyxDQUFDO0lBQ3BDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
