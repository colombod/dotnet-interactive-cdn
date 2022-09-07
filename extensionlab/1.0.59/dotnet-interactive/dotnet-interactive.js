(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.dotnetInteractive = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
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
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    function isFunction(value) {
        return typeof value === 'function';
    }

    function createErrorClass(createImpl) {
        var _super = function (instance) {
            Error.call(instance);
            instance.stack = new Error().stack;
        };
        var ctorFunc = createImpl(_super);
        ctorFunc.prototype = Object.create(Error.prototype);
        ctorFunc.prototype.constructor = ctorFunc;
        return ctorFunc;
    }

    var UnsubscriptionError = createErrorClass(function (_super) {
        return function UnsubscriptionErrorImpl(errors) {
            _super(this);
            this.message = errors
                ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
                : '';
            this.name = 'UnsubscriptionError';
            this.errors = errors;
        };
    });

    function arrRemove(arr, item) {
        if (arr) {
            var index = arr.indexOf(item);
            0 <= index && arr.splice(index, 1);
        }
    }

    var Subscription = (function () {
        function Subscription(initialTeardown) {
            this.initialTeardown = initialTeardown;
            this.closed = false;
            this._parentage = null;
            this._finalizers = null;
        }
        Subscription.prototype.unsubscribe = function () {
            var e_1, _a, e_2, _b;
            var errors;
            if (!this.closed) {
                this.closed = true;
                var _parentage = this._parentage;
                if (_parentage) {
                    this._parentage = null;
                    if (Array.isArray(_parentage)) {
                        try {
                            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                                var parent_1 = _parentage_1_1.value;
                                parent_1.remove(this);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    else {
                        _parentage.remove(this);
                    }
                }
                var initialFinalizer = this.initialTeardown;
                if (isFunction(initialFinalizer)) {
                    try {
                        initialFinalizer();
                    }
                    catch (e) {
                        errors = e instanceof UnsubscriptionError ? e.errors : [e];
                    }
                }
                var _finalizers = this._finalizers;
                if (_finalizers) {
                    this._finalizers = null;
                    try {
                        for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                            var finalizer = _finalizers_1_1.value;
                            try {
                                execFinalizer(finalizer);
                            }
                            catch (err) {
                                errors = errors !== null && errors !== void 0 ? errors : [];
                                if (err instanceof UnsubscriptionError) {
                                    errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                                }
                                else {
                                    errors.push(err);
                                }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                if (errors) {
                    throw new UnsubscriptionError(errors);
                }
            }
        };
        Subscription.prototype.add = function (teardown) {
            var _a;
            if (teardown && teardown !== this) {
                if (this.closed) {
                    execFinalizer(teardown);
                }
                else {
                    if (teardown instanceof Subscription) {
                        if (teardown.closed || teardown._hasParent(this)) {
                            return;
                        }
                        teardown._addParent(this);
                    }
                    (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
                }
            }
        };
        Subscription.prototype._hasParent = function (parent) {
            var _parentage = this._parentage;
            return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
        };
        Subscription.prototype._addParent = function (parent) {
            var _parentage = this._parentage;
            this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
        };
        Subscription.prototype._removeParent = function (parent) {
            var _parentage = this._parentage;
            if (_parentage === parent) {
                this._parentage = null;
            }
            else if (Array.isArray(_parentage)) {
                arrRemove(_parentage, parent);
            }
        };
        Subscription.prototype.remove = function (teardown) {
            var _finalizers = this._finalizers;
            _finalizers && arrRemove(_finalizers, teardown);
            if (teardown instanceof Subscription) {
                teardown._removeParent(this);
            }
        };
        Subscription.EMPTY = (function () {
            var empty = new Subscription();
            empty.closed = true;
            return empty;
        })();
        return Subscription;
    }());
    var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
    function isSubscription(value) {
        return (value instanceof Subscription ||
            (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
    }
    function execFinalizer(finalizer) {
        if (isFunction(finalizer)) {
            finalizer();
        }
        else {
            finalizer.unsubscribe();
        }
    }

    var config = {
        onUnhandledError: null,
        onStoppedNotification: null,
        Promise: undefined,
        useDeprecatedSynchronousErrorHandling: false,
        useDeprecatedNextContext: false,
    };

    var timeoutProvider = {
        setTimeout: function (handler, timeout) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var delegate = timeoutProvider.delegate;
            if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
                return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
            }
            return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
        },
        clearTimeout: function (handle) {
            var delegate = timeoutProvider.delegate;
            return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
        },
        delegate: undefined,
    };

    function reportUnhandledError(err) {
        timeoutProvider.setTimeout(function () {
            {
                throw err;
            }
        });
    }

    function noop() { }

    var context = null;
    function errorContext(cb) {
        if (config.useDeprecatedSynchronousErrorHandling) {
            var isRoot = !context;
            if (isRoot) {
                context = { errorThrown: false, error: null };
            }
            cb();
            if (isRoot) {
                var _a = context, errorThrown = _a.errorThrown, error = _a.error;
                context = null;
                if (errorThrown) {
                    throw error;
                }
            }
        }
        else {
            cb();
        }
    }

    var Subscriber = (function (_super) {
        __extends(Subscriber, _super);
        function Subscriber(destination) {
            var _this = _super.call(this) || this;
            _this.isStopped = false;
            if (destination) {
                _this.destination = destination;
                if (isSubscription(destination)) {
                    destination.add(_this);
                }
            }
            else {
                _this.destination = EMPTY_OBSERVER;
            }
            return _this;
        }
        Subscriber.create = function (next, error, complete) {
            return new SafeSubscriber(next, error, complete);
        };
        Subscriber.prototype.next = function (value) {
            if (this.isStopped) ;
            else {
                this._next(value);
            }
        };
        Subscriber.prototype.error = function (err) {
            if (this.isStopped) ;
            else {
                this.isStopped = true;
                this._error(err);
            }
        };
        Subscriber.prototype.complete = function () {
            if (this.isStopped) ;
            else {
                this.isStopped = true;
                this._complete();
            }
        };
        Subscriber.prototype.unsubscribe = function () {
            if (!this.closed) {
                this.isStopped = true;
                _super.prototype.unsubscribe.call(this);
                this.destination = null;
            }
        };
        Subscriber.prototype._next = function (value) {
            this.destination.next(value);
        };
        Subscriber.prototype._error = function (err) {
            try {
                this.destination.error(err);
            }
            finally {
                this.unsubscribe();
            }
        };
        Subscriber.prototype._complete = function () {
            try {
                this.destination.complete();
            }
            finally {
                this.unsubscribe();
            }
        };
        return Subscriber;
    }(Subscription));
    var _bind = Function.prototype.bind;
    function bind(fn, thisArg) {
        return _bind.call(fn, thisArg);
    }
    var ConsumerObserver = (function () {
        function ConsumerObserver(partialObserver) {
            this.partialObserver = partialObserver;
        }
        ConsumerObserver.prototype.next = function (value) {
            var partialObserver = this.partialObserver;
            if (partialObserver.next) {
                try {
                    partialObserver.next(value);
                }
                catch (error) {
                    handleUnhandledError(error);
                }
            }
        };
        ConsumerObserver.prototype.error = function (err) {
            var partialObserver = this.partialObserver;
            if (partialObserver.error) {
                try {
                    partialObserver.error(err);
                }
                catch (error) {
                    handleUnhandledError(error);
                }
            }
            else {
                handleUnhandledError(err);
            }
        };
        ConsumerObserver.prototype.complete = function () {
            var partialObserver = this.partialObserver;
            if (partialObserver.complete) {
                try {
                    partialObserver.complete();
                }
                catch (error) {
                    handleUnhandledError(error);
                }
            }
        };
        return ConsumerObserver;
    }());
    var SafeSubscriber = (function (_super) {
        __extends(SafeSubscriber, _super);
        function SafeSubscriber(observerOrNext, error, complete) {
            var _this = _super.call(this) || this;
            var partialObserver;
            if (isFunction(observerOrNext) || !observerOrNext) {
                partialObserver = {
                    next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                    error: error !== null && error !== void 0 ? error : undefined,
                    complete: complete !== null && complete !== void 0 ? complete : undefined,
                };
            }
            else {
                var context_1;
                if (_this && config.useDeprecatedNextContext) {
                    context_1 = Object.create(observerOrNext);
                    context_1.unsubscribe = function () { return _this.unsubscribe(); };
                    partialObserver = {
                        next: observerOrNext.next && bind(observerOrNext.next, context_1),
                        error: observerOrNext.error && bind(observerOrNext.error, context_1),
                        complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
                    };
                }
                else {
                    partialObserver = observerOrNext;
                }
            }
            _this.destination = new ConsumerObserver(partialObserver);
            return _this;
        }
        return SafeSubscriber;
    }(Subscriber));
    function handleUnhandledError(error) {
        {
            reportUnhandledError(error);
        }
    }
    function defaultErrorHandler(err) {
        throw err;
    }
    var EMPTY_OBSERVER = {
        closed: true,
        next: noop,
        error: defaultErrorHandler,
        complete: noop,
    };

    var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

    function identity(x) {
        return x;
    }

    function pipeFromArray(fns) {
        if (fns.length === 0) {
            return identity;
        }
        if (fns.length === 1) {
            return fns[0];
        }
        return function piped(input) {
            return fns.reduce(function (prev, fn) { return fn(prev); }, input);
        };
    }

    var Observable = (function () {
        function Observable(subscribe) {
            if (subscribe) {
                this._subscribe = subscribe;
            }
        }
        Observable.prototype.lift = function (operator) {
            var observable = new Observable();
            observable.source = this;
            observable.operator = operator;
            return observable;
        };
        Observable.prototype.subscribe = function (observerOrNext, error, complete) {
            var _this = this;
            var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
            errorContext(function () {
                var _a = _this, operator = _a.operator, source = _a.source;
                subscriber.add(operator
                    ?
                        operator.call(subscriber, source)
                    : source
                        ?
                            _this._subscribe(subscriber)
                        :
                            _this._trySubscribe(subscriber));
            });
            return subscriber;
        };
        Observable.prototype._trySubscribe = function (sink) {
            try {
                return this._subscribe(sink);
            }
            catch (err) {
                sink.error(err);
            }
        };
        Observable.prototype.forEach = function (next, promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var subscriber = new SafeSubscriber({
                    next: function (value) {
                        try {
                            next(value);
                        }
                        catch (err) {
                            reject(err);
                            subscriber.unsubscribe();
                        }
                    },
                    error: reject,
                    complete: resolve,
                });
                _this.subscribe(subscriber);
            });
        };
        Observable.prototype._subscribe = function (subscriber) {
            var _a;
            return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
        };
        Observable.prototype[observable] = function () {
            return this;
        };
        Observable.prototype.pipe = function () {
            var operations = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                operations[_i] = arguments[_i];
            }
            return pipeFromArray(operations)(this);
        };
        Observable.prototype.toPromise = function (promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var value;
                _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
            });
        };
        Observable.create = function (subscribe) {
            return new Observable(subscribe);
        };
        return Observable;
    }());
    function getPromiseCtor(promiseCtor) {
        var _a;
        return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
    }
    function isObserver(value) {
        return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
    }
    function isSubscriber(value) {
        return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
    }

    function hasLift(source) {
        return isFunction(source === null || source === void 0 ? void 0 : source.lift);
    }
    function operate(init) {
        return function (source) {
            if (hasLift(source)) {
                return source.lift(function (liftedSource) {
                    try {
                        return init(liftedSource, this);
                    }
                    catch (err) {
                        this.error(err);
                    }
                });
            }
            throw new TypeError('Unable to lift unknown Observable type');
        };
    }

    function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
        return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
    }
    var OperatorSubscriber = (function (_super) {
        __extends(OperatorSubscriber, _super);
        function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
            var _this = _super.call(this, destination) || this;
            _this.onFinalize = onFinalize;
            _this.shouldUnsubscribe = shouldUnsubscribe;
            _this._next = onNext
                ? function (value) {
                    try {
                        onNext(value);
                    }
                    catch (err) {
                        destination.error(err);
                    }
                }
                : _super.prototype._next;
            _this._error = onError
                ? function (err) {
                    try {
                        onError(err);
                    }
                    catch (err) {
                        destination.error(err);
                    }
                    finally {
                        this.unsubscribe();
                    }
                }
                : _super.prototype._error;
            _this._complete = onComplete
                ? function () {
                    try {
                        onComplete();
                    }
                    catch (err) {
                        destination.error(err);
                    }
                    finally {
                        this.unsubscribe();
                    }
                }
                : _super.prototype._complete;
            return _this;
        }
        OperatorSubscriber.prototype.unsubscribe = function () {
            var _a;
            if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                var closed_1 = this.closed;
                _super.prototype.unsubscribe.call(this);
                !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
            }
        };
        return OperatorSubscriber;
    }(Subscriber));

    var ObjectUnsubscribedError = createErrorClass(function (_super) {
        return function ObjectUnsubscribedErrorImpl() {
            _super(this);
            this.name = 'ObjectUnsubscribedError';
            this.message = 'object unsubscribed';
        };
    });

    var Subject = (function (_super) {
        __extends(Subject, _super);
        function Subject() {
            var _this = _super.call(this) || this;
            _this.closed = false;
            _this.currentObservers = null;
            _this.observers = [];
            _this.isStopped = false;
            _this.hasError = false;
            _this.thrownError = null;
            return _this;
        }
        Subject.prototype.lift = function (operator) {
            var subject = new AnonymousSubject(this, this);
            subject.operator = operator;
            return subject;
        };
        Subject.prototype._throwIfClosed = function () {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
        };
        Subject.prototype.next = function (value) {
            var _this = this;
            errorContext(function () {
                var e_1, _a;
                _this._throwIfClosed();
                if (!_this.isStopped) {
                    if (!_this.currentObservers) {
                        _this.currentObservers = Array.from(_this.observers);
                    }
                    try {
                        for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var observer = _c.value;
                            observer.next(value);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            });
        };
        Subject.prototype.error = function (err) {
            var _this = this;
            errorContext(function () {
                _this._throwIfClosed();
                if (!_this.isStopped) {
                    _this.hasError = _this.isStopped = true;
                    _this.thrownError = err;
                    var observers = _this.observers;
                    while (observers.length) {
                        observers.shift().error(err);
                    }
                }
            });
        };
        Subject.prototype.complete = function () {
            var _this = this;
            errorContext(function () {
                _this._throwIfClosed();
                if (!_this.isStopped) {
                    _this.isStopped = true;
                    var observers = _this.observers;
                    while (observers.length) {
                        observers.shift().complete();
                    }
                }
            });
        };
        Subject.prototype.unsubscribe = function () {
            this.isStopped = this.closed = true;
            this.observers = this.currentObservers = null;
        };
        Object.defineProperty(Subject.prototype, "observed", {
            get: function () {
                var _a;
                return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
            },
            enumerable: false,
            configurable: true
        });
        Subject.prototype._trySubscribe = function (subscriber) {
            this._throwIfClosed();
            return _super.prototype._trySubscribe.call(this, subscriber);
        };
        Subject.prototype._subscribe = function (subscriber) {
            this._throwIfClosed();
            this._checkFinalizedStatuses(subscriber);
            return this._innerSubscribe(subscriber);
        };
        Subject.prototype._innerSubscribe = function (subscriber) {
            var _this = this;
            var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
            if (hasError || isStopped) {
                return EMPTY_SUBSCRIPTION;
            }
            this.currentObservers = null;
            observers.push(subscriber);
            return new Subscription(function () {
                _this.currentObservers = null;
                arrRemove(observers, subscriber);
            });
        };
        Subject.prototype._checkFinalizedStatuses = function (subscriber) {
            var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
            if (hasError) {
                subscriber.error(thrownError);
            }
            else if (isStopped) {
                subscriber.complete();
            }
        };
        Subject.prototype.asObservable = function () {
            var observable = new Observable();
            observable.source = this;
            return observable;
        };
        Subject.create = function (destination, source) {
            return new AnonymousSubject(destination, source);
        };
        return Subject;
    }(Observable));
    var AnonymousSubject = (function (_super) {
        __extends(AnonymousSubject, _super);
        function AnonymousSubject(destination, source) {
            var _this = _super.call(this) || this;
            _this.destination = destination;
            _this.source = source;
            return _this;
        }
        AnonymousSubject.prototype.next = function (value) {
            var _a, _b;
            (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
        };
        AnonymousSubject.prototype.error = function (err) {
            var _a, _b;
            (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
        };
        AnonymousSubject.prototype.complete = function () {
            var _a, _b;
            (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        AnonymousSubject.prototype._subscribe = function (subscriber) {
            var _a, _b;
            return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
        };
        return AnonymousSubject;
    }(Subject));

    function map(project, thisArg) {
        return operate(function (source, subscriber) {
            var index = 0;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                subscriber.next(project.call(thisArg, value, index++));
            }));
        });
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    // Licensed under the MIT license. See LICENSE file in the project root for full license information.
    // Generated TypeScript interfaces and types.
    // --------------------------------------------- Kernel Commands
    const AddPackageType = "AddPackage";
    const CancelType = "Cancel";
    const ChangeWorkingDirectoryType = "ChangeWorkingDirectory";
    const CompileProjectType = "CompileProject";
    const DisplayErrorType = "DisplayError";
    const DisplayValueType = "DisplayValue";
    const OpenDocumentType = "OpenDocument";
    const OpenProjectType = "OpenProject";
    const QuitType = "Quit";
    const RequestCompletionsType = "RequestCompletions";
    const RequestDiagnosticsType = "RequestDiagnostics";
    const RequestHoverTextType = "RequestHoverText";
    const RequestInputType = "RequestInput";
    const RequestKernelInfoType = "RequestKernelInfo";
    const RequestSignatureHelpType = "RequestSignatureHelp";
    const RequestValueType = "RequestValue";
    const RequestValueInfosType = "RequestValueInfos";
    const SendEditableCodeType = "SendEditableCode";
    const SubmitCodeType = "SubmitCode";
    const UpdateDisplayedValueType = "UpdateDisplayedValue";
    // --------------------------------------------- Kernel events
    const AssemblyProducedType = "AssemblyProduced";
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
    const DocumentOpenedType = "DocumentOpened";
    const ErrorProducedType = "ErrorProduced";
    const HoverTextProducedType = "HoverTextProduced";
    const IncompleteCodeSubmissionReceivedType = "IncompleteCodeSubmissionReceived";
    const InputProducedType = "InputProduced";
    const KernelExtensionLoadedType = "KernelExtensionLoaded";
    const KernelInfoProducedType = "KernelInfoProduced";
    const KernelReadyType = "KernelReady";
    const PackageAddedType = "PackageAdded";
    const ProjectOpenedType = "ProjectOpened";
    const ReturnValueProducedType = "ReturnValueProduced";
    const SignatureHelpProducedType = "SignatureHelpProduced";
    const StandardErrorValueProducedType = "StandardErrorValueProduced";
    const StandardOutputValueProducedType = "StandardOutputValueProduced";
    const ValueInfosProducedType = "ValueInfosProduced";
    const ValueProducedType = "ValueProduced";
    const WorkingDirectoryChangedType = "WorkingDirectoryChanged";
    exports.InsertTextFormat = void 0;
    (function (InsertTextFormat) {
        InsertTextFormat["PlainText"] = "plaintext";
        InsertTextFormat["Snippet"] = "snippet";
    })(exports.InsertTextFormat || (exports.InsertTextFormat = {}));
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
    // Licensed under the MIT license. See LICENSE file in the project root for full license information.
    function isPromiseCompletionSource(obj) {
        return obj.promise
            && obj.resolve
            && obj.reject;
    }
    class PromiseCompletionSource {
        constructor() {
            this._resolve = () => { };
            this._reject = () => { };
            this.promise = new Promise((resolve, reject) => {
                this._resolve = resolve;
                this._reject = reject;
            });
        }
        resolve(value) {
            this._resolve(value);
        }
        reject(reason) {
            this._reject(reason);
        }
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    class KernelInvocationContext {
        constructor(kernelCommandInvocation) {
            this._childCommands = [];
            this._eventSubject = new Subject();
            this._isComplete = false;
            this._handlingKernel = null;
            this.completionSource = new PromiseCompletionSource();
            this._commandEnvelope = kernelCommandInvocation;
        }
        get promise() {
            return this.completionSource.promise;
        }
        get handlingKernel() {
            return this._handlingKernel;
        }
        ;
        get kernelEvents() {
            return this._eventSubject.asObservable();
        }
        ;
        set handlingKernel(value) {
            this._handlingKernel = value;
        }
        static establish(kernelCommandInvocation) {
            var _a, _b;
            let current = KernelInvocationContext._current;
            if (!current || current._isComplete) {
                KernelInvocationContext._current = new KernelInvocationContext(kernelCommandInvocation);
            }
            else {
                if (!areCommandsTheSame(kernelCommandInvocation, current._commandEnvelope)) {
                    const found = current._childCommands.includes(kernelCommandInvocation);
                    if (!found) {
                        current._childCommands.push(kernelCommandInvocation);
                        const oldSlip = (_a = kernelCommandInvocation.routingSlip) !== null && _a !== void 0 ? _a : [];
                        kernelCommandInvocation.routingSlip = [...((_b = current._commandEnvelope.routingSlip) !== null && _b !== void 0 ? _b : [])];
                        for (const uri of oldSlip) {
                            tryAddUriToRoutingSlip(kernelCommandInvocation, uri);
                        }
                    }
                }
            }
            return KernelInvocationContext._current;
        }
        static get current() { return this._current; }
        get command() { return this._commandEnvelope.command; }
        get commandEnvelope() { return this._commandEnvelope; }
        complete(command) {
            if (areCommandsTheSame(command, this._commandEnvelope)) {
                this._isComplete = true;
                let succeeded = {};
                let eventEnvelope = {
                    command: this._commandEnvelope,
                    eventType: CommandSucceededType,
                    event: succeeded
                };
                this.internalPublish(eventEnvelope);
                this.completionSource.resolve();
                // TODO: C# version has completion callbacks - do we need these?
                // if (!_events.IsDisposed)
                // {
                //     _events.OnCompleted();
                // }
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
            this._isComplete = true;
            let failed = { message: message !== null && message !== void 0 ? message : "Command Failed" };
            let eventEnvelope = {
                command: this._commandEnvelope,
                eventType: CommandFailedType,
                event: failed
            };
            this.internalPublish(eventEnvelope);
            this.completionSource.resolve();
        }
        publish(kernelEvent) {
            if (!this._isComplete) {
                this.internalPublish(kernelEvent);
            }
        }
        internalPublish(kernelEvent) {
            if (!kernelEvent.command) {
                kernelEvent.command = this._commandEnvelope;
            }
            let command = kernelEvent.command;
            if (this.handlingKernel) {
                tryAddUriToRoutingSlip(kernelEvent, getKernelUri(this.handlingKernel));
                kernelEvent.routingSlip; //?
            }
            this._commandEnvelope; //?
            if (command === null ||
                command === undefined ||
                areCommandsTheSame(command, this._commandEnvelope) ||
                this._childCommands.includes(command)) {
                this._eventSubject.next(kernelEvent);
            }
        }
        isParentOfCommand(commandEnvelope) {
            const childFound = this._childCommands.includes(commandEnvelope);
            return childFound;
        }
        dispose() {
            if (!this._isComplete) {
                this.complete(this._commandEnvelope);
            }
            KernelInvocationContext._current = null;
        }
    }
    KernelInvocationContext._current = null;
    function areCommandsTheSame(envelope1, envelope2) {
        return envelope1 === envelope2
            || ((envelope1 === null || envelope1 === void 0 ? void 0 : envelope1.commandType) === (envelope2 === null || envelope2 === void 0 ? void 0 : envelope2.commandType) && (envelope1 === null || envelope1 === void 0 ? void 0 : envelope1.token) === (envelope2 === null || envelope2 === void 0 ? void 0 : envelope2.token) && (envelope1 === null || envelope1 === void 0 ? void 0 : envelope1.id) === (envelope2 === null || envelope2 === void 0 ? void 0 : envelope2.id));
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

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    // Licensed under the MIT license. See LICENSE file in the project root for full license information.
    exports.LogLevel = void 0;
    (function (LogLevel) {
        LogLevel[LogLevel["Info"] = 0] = "Info";
        LogLevel[LogLevel["Warn"] = 1] = "Warn";
        LogLevel[LogLevel["Error"] = 2] = "Error";
        LogLevel[LogLevel["None"] = 3] = "None";
    })(exports.LogLevel || (exports.LogLevel = {}));
    class Logger {
        constructor(source, write) {
            this.source = source;
            this.write = write;
        }
        info(message) {
            this.write({ logLevel: exports.LogLevel.Info, source: this.source, message });
        }
        warn(message) {
            this.write({ logLevel: exports.LogLevel.Warn, source: this.source, message });
        }
        error(message) {
            this.write({ logLevel: exports.LogLevel.Error, source: this.source, message });
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
    Logger._default = new Logger('default', (_entry) => { });

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    class KernelScheduler {
        constructor() {
            this._operationQueue = [];
        }
        cancelCurrentOperation() {
            var _a;
            (_a = this._inFlightOperation) === null || _a === void 0 ? void 0 : _a.promiseCompletionSource.reject(new Error("Operation cancelled"));
        }
        runAsync(value, executor) {
            const operation = {
                value,
                executor,
                promiseCompletionSource: new PromiseCompletionSource(),
            };
            if (this._inFlightOperation) {
                Logger.default.info(`kernelScheduler: starting immediate execution of ${JSON.stringify(operation.value)}`);
                // invoke immediately
                return operation.executor(operation.value)
                    .then(() => {
                    Logger.default.info(`kernelScheduler: immediate execution completed: ${JSON.stringify(operation.value)}`);
                    operation.promiseCompletionSource.resolve();
                })
                    .catch(e => {
                    Logger.default.info(`kernelScheduler: immediate execution failed: ${JSON.stringify(e)} - ${JSON.stringify(operation.value)}`);
                    operation.promiseCompletionSource.reject(e);
                });
            }
            Logger.default.info(`kernelScheduler: scheduling execution of ${JSON.stringify(operation.value)}`);
            this._operationQueue.push(operation);
            if (this._operationQueue.length === 1) {
                this.executeNextCommand();
            }
            return operation.promiseCompletionSource.promise;
        }
        executeNextCommand() {
            const nextOperation = this._operationQueue.length > 0 ? this._operationQueue[0] : undefined;
            if (nextOperation) {
                this._inFlightOperation = nextOperation;
                Logger.default.info(`kernelScheduler: starting scheduled execution of ${JSON.stringify(nextOperation.value)}`);
                nextOperation.executor(nextOperation.value)
                    .then(() => {
                    this._inFlightOperation = undefined;
                    Logger.default.info(`kernelScheduler: completing inflight operation: success ${JSON.stringify(nextOperation.value)}`);
                    nextOperation.promiseCompletionSource.resolve();
                })
                    .catch(e => {
                    this._inFlightOperation = undefined;
                    Logger.default.info(`kernelScheduler: completing inflight operation: failure ${JSON.stringify(e)} - ${JSON.stringify(nextOperation.value)}`);
                    nextOperation.promiseCompletionSource.reject(e);
                })
                    .finally(() => {
                    this._operationQueue.shift();
                    this.executeNextCommand();
                });
            }
        }
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    exports.KernelType = void 0;
    (function (KernelType) {
        KernelType[KernelType["composite"] = 0] = "composite";
        KernelType[KernelType["proxy"] = 1] = "proxy";
        KernelType[KernelType["default"] = 2] = "default";
    })(exports.KernelType || (exports.KernelType = {}));
    class Kernel {
        constructor(name, languageName, languageVersion) {
            this.name = name;
            this._commandHandlers = new Map();
            this._eventSubject = new Subject();
            this._tokenGenerator = new TokenGenerator();
            this.rootKernel = this;
            this.parentKernel = null;
            this._scheduler = null;
            this._kernelType = exports.KernelType.default;
            this._kernelInfo = {
                localName: name,
                languageName: languageName,
                aliases: [],
                languageVersion: languageVersion,
                supportedDirectives: [],
                supportedKernelCommands: []
            };
            this.registerCommandHandler({
                commandType: RequestKernelInfoType, handle: (invocation) => __awaiter(this, void 0, void 0, function* () {
                    yield this.handleRequestKernelInfo(invocation);
                })
            });
        }
        get kernelInfo() {
            return this._kernelInfo;
        }
        get kernelType() {
            return this._kernelType;
        }
        set kernelType(value) {
            this._kernelType = value;
        }
        get kernelEvents() {
            return this._eventSubject.asObservable();
        }
        handleRequestKernelInfo(invocation) {
            return __awaiter(this, void 0, void 0, function* () {
                const eventEnvelope = {
                    eventType: KernelInfoProducedType,
                    command: invocation.commandEnvelope,
                    event: { kernelInfo: this._kernelInfo }
                }; //?
                invocation.context.publish(eventEnvelope);
                return Promise.resolve();
            });
        }
        getScheduler() {
            var _a, _b;
            if (!this._scheduler) {
                this._scheduler = (_b = (_a = this.parentKernel) === null || _a === void 0 ? void 0 : _a.getScheduler()) !== null && _b !== void 0 ? _b : new KernelScheduler();
            }
            return this._scheduler;
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
        // the command's progress? The only thing that actually calls this is the kernel channel, through
        // the callback set up by attachKernelToChannel, and the callback is expected to return void, so
        // nothing is ever going to look at the promise we return here.
        send(commandEnvelope) {
            return __awaiter(this, void 0, void 0, function* () {
                this.ensureCommandTokenAndId(commandEnvelope);
                tryAddUriToRoutingSlip(commandEnvelope, getKernelUri(this));
                commandEnvelope.routingSlip; //?
                KernelInvocationContext.establish(commandEnvelope);
                return this.getScheduler().runAsync(commandEnvelope, (value) => this.executeCommand(value));
            });
        }
        executeCommand(commandEnvelope) {
            return __awaiter(this, void 0, void 0, function* () {
                let context = KernelInvocationContext.establish(commandEnvelope);
                let previousHandlingKernel = context.handlingKernel;
                try {
                    yield this.handleCommand(commandEnvelope);
                }
                catch (e) {
                    context.fail((e === null || e === void 0 ? void 0 : e.message) || JSON.stringify(e));
                }
                finally {
                    context.handlingKernel = previousHandlingKernel;
                }
            });
        }
        getCommandHandler(commandType) {
            return this._commandHandlers.get(commandType);
        }
        handleCommand(commandEnvelope) {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let context = KernelInvocationContext.establish(commandEnvelope);
                const previoudHendlingKernel = context.handlingKernel;
                context.handlingKernel = this;
                let isRootCommand = areCommandsTheSame(context.commandEnvelope, commandEnvelope);
                let eventSubscription = undefined; //?
                if (isRootCommand) {
                    this.name; //?
                    Logger.default.info(`kernel ${this.name} of type ${exports.KernelType[this.kernelType]} subscribing to context events`);
                    eventSubscription = context.kernelEvents.pipe(map(e => {
                        var _a;
                        const message = `kernel ${this.name} of type ${exports.KernelType[this.kernelType]} saw event ${e.eventType} with token ${(_a = e.command) === null || _a === void 0 ? void 0 : _a.token}`;
                        Logger.default.info(message);
                        tryAddUriToRoutingSlip(e, getKernelUri(this));
                        return e;
                    }))
                        .subscribe(this.publishEvent.bind(this));
                }
                let handler = this.getCommandHandler(commandEnvelope.commandType);
                if (handler) {
                    try {
                        Logger.default.info(`kernel ${this.name} about to handle command: ${JSON.stringify(commandEnvelope)}`);
                        yield handler.handle({ commandEnvelope: commandEnvelope, context });
                        context.complete(commandEnvelope);
                        context.handlingKernel = previoudHendlingKernel;
                        if (isRootCommand) {
                            eventSubscription === null || eventSubscription === void 0 ? void 0 : eventSubscription.unsubscribe();
                            context.dispose();
                        }
                        Logger.default.info(`kernel ${this.name} done handling command: ${JSON.stringify(commandEnvelope)}`);
                        resolve();
                    }
                    catch (e) {
                        context.fail((e === null || e === void 0 ? void 0 : e.message) || JSON.stringify(e));
                        context.handlingKernel = previoudHendlingKernel;
                        if (isRootCommand) {
                            eventSubscription === null || eventSubscription === void 0 ? void 0 : eventSubscription.unsubscribe();
                            context.dispose();
                        }
                        reject(e);
                    }
                }
                else {
                    context.handlingKernel = previoudHendlingKernel;
                    if (isRootCommand) {
                        eventSubscription === null || eventSubscription === void 0 ? void 0 : eventSubscription.unsubscribe();
                        context.dispose();
                    }
                    reject(new Error(`No handler found for command type ${commandEnvelope.commandType}`));
                }
            }));
        }
        subscribeToKernelEvents(observer) {
            const sub = this._eventSubject.subscribe(observer);
            return {
                dispose: () => { sub.unsubscribe(); }
            };
        }
        canHandle(commandEnvelope) {
            if (commandEnvelope.command.targetKernelName && commandEnvelope.command.targetKernelName !== this.name) {
                return false;
            }
            if (commandEnvelope.command.destinationUri) {
                if (this.kernelInfo.uri !== commandEnvelope.command.destinationUri) {
                    return false;
                }
            }
            return this.supportsCommand(commandEnvelope.commandType);
        }
        supportsCommand(commandType) {
            return this._commandHandlers.has(commandType);
        }
        registerCommandHandler(handler) {
            // When a registration already existed, we want to overwrite it because we want users to
            // be able to develop handlers iteratively, and it would be unhelpful for handler registration
            // for any particular command to be cumulative.
            this._commandHandlers.set(handler.commandType, handler);
            this._kernelInfo.supportedKernelCommands = Array.from(this._commandHandlers.keys()).map(commandName => ({ name: commandName }));
        }
        getHandlingKernel(commandEnvelope, context) {
            if (this.canHandle(commandEnvelope)) {
                return this;
            }
            else {
                context === null || context === void 0 ? void 0 : context.fail(`Command ${commandEnvelope.commandType} is not supported by Kernel ${this.name}`);
                return null;
            }
        }
        publishEvent(kernelEvent) {
            this._eventSubject.next(kernelEvent);
        }
    }
    function submitCommandAndGetResult(kernel, commandEnvelope, expectedEventType) {
        return __awaiter(this, void 0, void 0, function* () {
            let completionSource = new PromiseCompletionSource();
            let handled = false;
            let disposable = kernel.subscribeToKernelEvents(eventEnvelope => {
                var _a, _b;
                if (((_a = eventEnvelope.command) === null || _a === void 0 ? void 0 : _a.token) === commandEnvelope.token) {
                    switch (eventEnvelope.eventType) {
                        case CommandFailedType:
                            if (!handled) {
                                handled = true;
                                let err = eventEnvelope.event; //?
                                completionSource.reject(err);
                            }
                            break;
                        case CommandSucceededType:
                            if (areCommandsTheSame(eventEnvelope.command, commandEnvelope)
                                && (((_b = eventEnvelope.command) === null || _b === void 0 ? void 0 : _b.id) === commandEnvelope.id)) {
                                if (!handled) { //? ($ ? eventEnvelope : {})
                                    handled = true;
                                    completionSource.reject('Command was handled before reporting expected result.');
                                }
                                break;
                            }
                        default:
                            if (eventEnvelope.eventType === expectedEventType) {
                                handled = true;
                                let event = eventEnvelope.event; //? ($ ? eventEnvelope : {})
                                completionSource.resolve(event);
                            }
                            break;
                    }
                }
            });
            try {
                yield kernel.send(commandEnvelope);
            }
            finally {
                disposable.dispose();
            }
            return completionSource.promise;
        });
    }
    function getKernelUri(kernel) {
        var _a;
        return (_a = kernel.kernelInfo.uri) !== null && _a !== void 0 ? _a : `kernel://local/${kernel.kernelInfo.localName}`;
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    function isKernelCommandEnvelope(commandOrEvent) {
        return commandOrEvent.commandType !== undefined;
    }
    function isKernelEventEnvelope(commandOrEvent) {
        return commandOrEvent.eventType !== undefined;
    }
    class KernelCommandAndEventReceiver {
        constructor(observer) {
            this._disposables = [];
            this._observable = observer;
        }
        subscribe(observer) {
            return this._observable.subscribe(observer);
        }
        dispose() {
            for (let disposable of this._disposables) {
                disposable.dispose();
            }
        }
        static FromObservable(observable) {
            return new KernelCommandAndEventReceiver(observable);
        }
        static FromEventListener(args) {
            let subject = new Subject();
            args.eventTarget.addEventListener(args.event, (e) => {
                let mapped = args.map(e);
                subject.next(mapped);
            });
            return new KernelCommandAndEventReceiver(subject);
        }
    }
    function isObservable(source) {
        return source.next !== undefined;
    }
    class KernelCommandAndEventSender {
        constructor() {
        }
        send(kernelCommandOrEventEnvelope) {
            if (this._sender) {
                try {
                    if (typeof this._sender === "function") {
                        this._sender(kernelCommandOrEventEnvelope);
                    }
                    else if (isObservable(this._sender)) {
                        this._sender.next(kernelCommandOrEventEnvelope);
                    }
                    else {
                        return Promise.reject(new Error("Sender is not set"));
                    }
                }
                catch (error) {
                    return Promise.reject(error);
                }
                return Promise.resolve();
            }
            return Promise.reject(new Error("Sender is not set"));
        }
        static FromObserver(observer) {
            const sender = new KernelCommandAndEventSender();
            sender._sender = observer;
            return sender;
        }
        static FromFunction(send) {
            const sender = new KernelCommandAndEventSender();
            sender._sender = send;
            return sender;
        }
    }
    function isSetOfString(collection) {
        return typeof (collection) !== typeof (new Set());
    }
    function isArrayOfString(collection) {
        return Array.isArray(collection) && collection.length > 0 && typeof (collection[0]) === typeof ("");
    }
    function tryAddUriToRoutingSlip(kernelCommandOrEventEnvelope, kernelUri) {
        if (kernelCommandOrEventEnvelope.routingSlip === undefined || kernelCommandOrEventEnvelope.routingSlip === null) {
            kernelCommandOrEventEnvelope.routingSlip = [];
        }
        var canAdd = !kernelCommandOrEventEnvelope.routingSlip.find(e => e === kernelUri);
        if (canAdd) {
            kernelCommandOrEventEnvelope.routingSlip.push(kernelUri);
            kernelCommandOrEventEnvelope.routingSlip; //?
        }
        return canAdd;
    }
    function ensureOrUpdateProxyForKernelInfo(kernelInfoProduced, compositeKernel) {
        var _a;
        const uriToLookup = (_a = kernelInfoProduced.kernelInfo.remoteUri) !== null && _a !== void 0 ? _a : kernelInfoProduced.kernelInfo.uri;
        if (uriToLookup) {
            let kernel = compositeKernel.findKernelByUri(uriToLookup);
            if (!kernel) {
                // add
                if (compositeKernel.host) {
                    Logger.default.info(`creating proxy for uri [${uriToLookup}] with info ${JSON.stringify(kernelInfoProduced)}`);
                    kernel = compositeKernel.host.connectProxyKernel(kernelInfoProduced.kernelInfo.localName, uriToLookup, kernelInfoProduced.kernelInfo.aliases);
                }
                else {
                    throw new Error('no kernel host found');
                }
            }
            else {
                Logger.default.info(`patching proxy for uri [${uriToLookup}] with info ${JSON.stringify(kernelInfoProduced)}`);
            }
            if (kernel.kernelType === exports.KernelType.proxy) {
                // patch
                updateKernelInfo(kernel.kernelInfo, kernelInfoProduced.kernelInfo);
            }
        }
    }
    function isKernelInfoForProxy(kernelInfo) {
        const hasUri = !!kernelInfo.uri;
        const hasRemoteUri = !!kernelInfo.remoteUri;
        return hasUri && hasRemoteUri;
    }
    function updateKernelInfo(destination, incoming) {
        var _a, _b;
        destination.languageName = (_a = incoming.languageName) !== null && _a !== void 0 ? _a : destination.languageName;
        destination.languageVersion = (_b = incoming.languageVersion) !== null && _b !== void 0 ? _b : destination.languageVersion;
        const supportedDirectives = new Set();
        const supportedCommands = new Set();
        if (!destination.supportedDirectives) {
            destination.supportedDirectives = [];
        }
        if (!destination.supportedKernelCommands) {
            destination.supportedKernelCommands = [];
        }
        for (const supportedDirective of destination.supportedDirectives) {
            supportedDirectives.add(supportedDirective.name);
        }
        for (const supportedCommand of destination.supportedKernelCommands) {
            supportedCommands.add(supportedCommand.name);
        }
        for (const supportedDirective of incoming.supportedDirectives) {
            if (!supportedDirectives.has(supportedDirective.name)) {
                supportedDirectives.add(supportedDirective.name);
                destination.supportedDirectives.push(supportedDirective);
            }
        }
        for (const supportedCommand of incoming.supportedKernelCommands) {
            if (!supportedCommands.has(supportedCommand.name)) {
                supportedCommands.add(supportedCommand.name);
                destination.supportedKernelCommands.push(supportedCommand);
            }
        }
    }
    class Connector {
        constructor(configuration) {
            this._remoteUris = new Set();
            this._receiver = configuration.receiver;
            this._sender = configuration.sender;
            if (configuration.remoteUris) {
                for (const remoteUri of configuration.remoteUris) {
                    const uri = extractHostAndNomalize(remoteUri);
                    if (uri) {
                        this._remoteUris.add(uri);
                    }
                }
            }
            this._listener = this._receiver.subscribe({
                next: (kernelCommandOrEventEnvelope) => {
                    var _a, _b;
                    if (isKernelEventEnvelope(kernelCommandOrEventEnvelope)) {
                        if (kernelCommandOrEventEnvelope.eventType === KernelInfoProducedType) {
                            const event = kernelCommandOrEventEnvelope.event;
                            if (!event.kernelInfo.remoteUri) {
                                const uri = extractHostAndNomalize(event.kernelInfo.uri);
                                if (uri) {
                                    this._remoteUris.add(uri);
                                }
                            }
                        }
                        if (((_b = (_a = kernelCommandOrEventEnvelope.routingSlip) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0) {
                            const eventOrigin = kernelCommandOrEventEnvelope.routingSlip[0];
                            const uri = extractHostAndNomalize(eventOrigin);
                            if (uri) {
                                this._remoteUris.add(uri);
                            }
                        }
                    }
                }
            });
        }
        get remoteHostUris() {
            return Array.from(this._remoteUris.values());
        }
        get sender() {
            return this._sender;
        }
        get receiver() {
            return this._receiver;
        }
        canReach(remoteUri) {
            const host = extractHostAndNomalize(remoteUri); //?
            if (host) {
                return this._remoteUris.has(host);
            }
            return false;
        }
        dispose() {
            this._listener.unsubscribe();
        }
    }
    function extractHostAndNomalize(kernelUri) {
        var _a;
        const filter = /(?<host>.+:\/\/[^\/]+)(\/[^\/])*/gi;
        const match = filter.exec(kernelUri); //?
        if ((_a = match === null || match === void 0 ? void 0 : match.groups) === null || _a === void 0 ? void 0 : _a.host) {
            const host = match.groups.host;
            return host; //?
        }
        return "";
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    class CompositeKernel extends Kernel {
        constructor(name) {
            super(name);
            this._host = null;
            this._defaultKernelNamesByCommandType = new Map();
            this.kernelType = exports.KernelType.composite;
            this._childKernels = new KernelCollection(this);
        }
        get childKernels() {
            return Array.from(this._childKernels);
        }
        get host() {
            return this._host;
        }
        set host(host) {
            this._host = host;
            if (this._host) {
                this.kernelInfo.uri = this._host.uri;
                this._childKernels.notifyThatHostWasSet();
            }
        }
        handleRequestKernelInfo(invocation) {
            return __awaiter(this, void 0, void 0, function* () {
                for (let kernel of this._childKernels) {
                    if (kernel.supportsCommand(invocation.commandEnvelope.commandType)) {
                        yield kernel.handleCommand({ command: {}, commandType: RequestKernelInfoType });
                    }
                }
            });
        }
        add(kernel, aliases) {
            if (!kernel) {
                throw new Error("kernel cannot be null or undefined");
            }
            if (!this.defaultKernelName) {
                // default to first kernel
                this.defaultKernelName = kernel.name;
            }
            kernel.parentKernel = this;
            kernel.rootKernel = this.rootKernel;
            kernel.kernelEvents.subscribe({
                next: (event) => {
                    tryAddUriToRoutingSlip(event, getKernelUri(this));
                    this.publishEvent(event);
                }
            });
            if (aliases) {
                let set = new Set(aliases);
                if (kernel.kernelInfo.aliases) {
                    for (let alias in kernel.kernelInfo.aliases) {
                        set.add(alias);
                    }
                }
                kernel.kernelInfo.aliases = Array.from(set);
            }
            this._childKernels.add(kernel, aliases);
            const invocationContext = KernelInvocationContext.current;
            if (invocationContext) {
                invocationContext.commandEnvelope; //?
                invocationContext.publish({
                    eventType: KernelInfoProducedType,
                    event: {
                        kernelInfo: kernel.kernelInfo
                    },
                    command: invocationContext.commandEnvelope
                });
            }
            else {
                this.publishEvent({
                    eventType: KernelInfoProducedType,
                    event: {
                        kernelInfo: kernel.kernelInfo
                    }
                });
            }
        }
        findKernelByUri(uri) {
            return this._childKernels.tryGetByUri(uri);
        }
        findKernelByName(name) {
            return this._childKernels.tryGetByAlias(name);
        }
        setDefaultTargetKernelNameForCommand(commandType, kernelName) {
            this._defaultKernelNamesByCommandType.set(commandType, kernelName);
        }
        handleCommand(commandEnvelope) {
            var _a;
            const invocationContext = KernelInvocationContext.current;
            let kernel = commandEnvelope.command.targetKernelName === this.name
                ? this
                : this.getHandlingKernel(commandEnvelope, invocationContext);
            const previusoHandlingKernel = (_a = invocationContext === null || invocationContext === void 0 ? void 0 : invocationContext.handlingKernel) !== null && _a !== void 0 ? _a : null;
            if (kernel === this) {
                if (invocationContext !== null) {
                    invocationContext.handlingKernel = kernel;
                }
                return super.handleCommand(commandEnvelope).finally(() => {
                    if (invocationContext !== null) {
                        invocationContext.handlingKernel = previusoHandlingKernel;
                    }
                });
            }
            else if (kernel) {
                if (invocationContext !== null) {
                    invocationContext.handlingKernel = kernel;
                }
                tryAddUriToRoutingSlip(commandEnvelope, getKernelUri(kernel));
                return kernel.handleCommand(commandEnvelope).finally(() => {
                    if (invocationContext !== null) {
                        invocationContext.handlingKernel = previusoHandlingKernel;
                    }
                });
            }
            if (invocationContext !== null) {
                invocationContext.handlingKernel = previusoHandlingKernel;
            }
            return Promise.reject(new Error("Kernel not found: " + commandEnvelope.command.targetKernelName));
        }
        getHandlingKernel(commandEnvelope, context) {
            var _a, _b, _c, _d, _e;
            let kernel = null;
            if (commandEnvelope.command.destinationUri) {
                kernel = (_a = this._childKernels.tryGetByUri(commandEnvelope.command.destinationUri)) !== null && _a !== void 0 ? _a : null;
                if (kernel) {
                    return kernel;
                }
            }
            let targetKernelName = commandEnvelope.command.targetKernelName;
            if (targetKernelName === undefined || targetKernelName === null) {
                if (this.canHandle(commandEnvelope)) {
                    return this;
                }
                targetKernelName = (_b = this._defaultKernelNamesByCommandType.get(commandEnvelope.commandType)) !== null && _b !== void 0 ? _b : this.defaultKernelName;
            }
            if (targetKernelName !== undefined && targetKernelName !== null) {
                kernel = (_c = this._childKernels.tryGetByAlias(targetKernelName)) !== null && _c !== void 0 ? _c : null;
            }
            if (targetKernelName && !kernel) {
                const errorMessage = `Kernel not found: ${targetKernelName}`;
                Logger.default.error(errorMessage);
                throw new Error(errorMessage);
            }
            if (!kernel) {
                if (this._childKernels.count === 1) {
                    kernel = (_d = this._childKernels.single()) !== null && _d !== void 0 ? _d : null;
                }
            }
            if (!kernel) {
                kernel = (_e = context === null || context === void 0 ? void 0 : context.handlingKernel) !== null && _e !== void 0 ? _e : null;
            }
            return kernel !== null && kernel !== void 0 ? kernel : this;
        }
    }
    class KernelCollection {
        constructor(compositeKernel) {
            this._kernels = [];
            this._nameAndAliasesByKernel = new Map();
            this._kernelsByNameOrAlias = new Map();
            this._kernelsByLocalUri = new Map();
            this._kernelsByRemoteUri = new Map();
            this._compositeKernel = compositeKernel;
        }
        [Symbol.iterator]() {
            let counter = 0;
            return {
                next: () => {
                    return {
                        value: this._kernels[counter++],
                        done: counter > this._kernels.length //?
                    };
                }
            };
        }
        single() {
            return this._kernels.length === 1 ? this._kernels[0] : undefined;
        }
        add(kernel, aliases) {
            if (this._kernelsByNameOrAlias.has(kernel.name)) {
                throw new Error(`kernel with name ${kernel.name} already exists`);
            }
            this.updateKernelInfoAndIndex(kernel, aliases);
            this._kernels.push(kernel);
        }
        get count() {
            return this._kernels.length;
        }
        updateKernelInfoAndIndex(kernel, aliases) {
            var _a;
            if (aliases) {
                for (let alias of aliases) {
                    if (this._kernelsByNameOrAlias.has(alias)) {
                        throw new Error(`kernel with alias ${alias} already exists`);
                    }
                }
            }
            if (!this._nameAndAliasesByKernel.has(kernel)) {
                let set = new Set();
                for (let alias of kernel.kernelInfo.aliases) {
                    set.add(alias);
                }
                kernel.kernelInfo.aliases = Array.from(set);
                set.add(kernel.kernelInfo.localName);
                this._nameAndAliasesByKernel.set(kernel, set);
            }
            if (aliases) {
                for (let alias of aliases) {
                    this._nameAndAliasesByKernel.get(kernel).add(alias);
                }
            }
            (_a = this._nameAndAliasesByKernel.get(kernel)) === null || _a === void 0 ? void 0 : _a.forEach(alias => {
                this._kernelsByNameOrAlias.set(alias, kernel);
            });
            if (this._compositeKernel.host) {
                kernel.kernelInfo.uri = `${this._compositeKernel.host.uri}/${kernel.name}`; //?
                this._kernelsByLocalUri.set(kernel.kernelInfo.uri, kernel);
            }
            if (kernel.kernelType === exports.KernelType.proxy) {
                this._kernelsByRemoteUri.set(kernel.kernelInfo.remoteUri, kernel);
            }
        }
        tryGetByAlias(alias) {
            return this._kernelsByNameOrAlias.get(alias);
        }
        tryGetByUri(uri) {
            let kernel = this._kernelsByLocalUri.get(uri) || this._kernelsByRemoteUri.get(uri);
            return kernel;
        }
        notifyThatHostWasSet() {
            for (let kernel of this._kernels) {
                this.updateKernelInfoAndIndex(kernel);
            }
        }
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    class ConsoleCapture {
        constructor() {
            this.originalConsole = console;
            console = this;
        }
        set kernelInvocationContext(value) {
            this._kernelInvocationContext = value;
        }
        assert(value, message, ...optionalParams) {
            this.originalConsole.assert(value, message, optionalParams);
        }
        clear() {
            this.originalConsole.clear();
        }
        count(label) {
            this.originalConsole.count(label);
        }
        countReset(label) {
            this.originalConsole.countReset(label);
        }
        debug(message, ...optionalParams) {
            this.originalConsole.debug(message, optionalParams);
        }
        dir(obj, options) {
            this.originalConsole.dir(obj, options);
        }
        dirxml(...data) {
            this.originalConsole.dirxml(data);
        }
        error(message, ...optionalParams) {
            this.redirectAndPublish(this.originalConsole.error, ...[message, ...optionalParams]);
        }
        group(...label) {
            this.originalConsole.group(label);
        }
        groupCollapsed(...label) {
            this.originalConsole.groupCollapsed(label);
        }
        groupEnd() {
            this.originalConsole.groupEnd();
        }
        info(message, ...optionalParams) {
            this.redirectAndPublish(this.originalConsole.info, ...[message, ...optionalParams]);
        }
        log(message, ...optionalParams) {
            this.redirectAndPublish(this.originalConsole.log, ...[message, ...optionalParams]);
        }
        table(tabularData, properties) {
            this.originalConsole.table(tabularData, properties);
        }
        time(label) {
            this.originalConsole.time(label);
        }
        timeEnd(label) {
            this.originalConsole.timeEnd(label);
        }
        timeLog(label, ...data) {
            this.originalConsole.timeLog(label, data);
        }
        timeStamp(label) {
            this.originalConsole.timeStamp(label);
        }
        trace(message, ...optionalParams) {
            this.redirectAndPublish(this.originalConsole.trace, ...[message, ...optionalParams]);
        }
        warn(message, ...optionalParams) {
            this.originalConsole.warn(message, optionalParams);
        }
        profile(label) {
            this.originalConsole.profile(label);
        }
        profileEnd(label) {
            this.originalConsole.profileEnd(label);
        }
        dispose() {
            console = this.originalConsole;
        }
        redirectAndPublish(target, ...args) {
            if (this._kernelInvocationContext) {
                for (const arg of args) {
                    let mimeType;
                    let value;
                    if (typeof arg !== 'object' && !Array.isArray(arg)) {
                        mimeType = 'text/plain';
                        value = arg === null || arg === void 0 ? void 0 : arg.toString();
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
                        command: this._kernelInvocationContext.commandEnvelope
                    };
                    this._kernelInvocationContext.publish(eventEnvelope);
                }
            }
            if (target) {
                target(...args);
            }
        }
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    class HtmlKernel extends Kernel {
        constructor(kernelName, htmlFragmentProcessor, languageName, languageVersion) {
            super(kernelName !== null && kernelName !== void 0 ? kernelName : "html", languageName !== null && languageName !== void 0 ? languageName : "HTML");
            this.htmlFragmentProcessor = htmlFragmentProcessor;
            if (!this.htmlFragmentProcessor) {
                this.htmlFragmentProcessor = domHtmlFragmentProcessor;
            }
            this.registerCommandHandler({ commandType: SubmitCodeType, handle: invocation => this.handleSubmitCode(invocation) });
        }
        handleSubmitCode(invocation) {
            return __awaiter(this, void 0, void 0, function* () {
                const submitCode = invocation.commandEnvelope.command;
                const code = submitCode.code;
                invocation.context.publish({ eventType: CodeSubmissionReceivedType, event: { code }, command: invocation.commandEnvelope });
                if (!this.htmlFragmentProcessor) {
                    throw new Error("No HTML fragment processor registered");
                }
                try {
                    yield this.htmlFragmentProcessor(code);
                }
                catch (e) {
                    throw e; //?
                }
            });
        }
    }
    function domHtmlFragmentProcessor(htmlFragment, configuration) {
        var _a, _b, _c, _d;
        const factory = (_a = configuration === null || configuration === void 0 ? void 0 : configuration.containerFactory) !== null && _a !== void 0 ? _a : (() => document.createElement("div"));
        const elementToObserve = (_b = configuration === null || configuration === void 0 ? void 0 : configuration.elementToObserve) !== null && _b !== void 0 ? _b : (() => document.body);
        const addToDom = (_c = configuration === null || configuration === void 0 ? void 0 : configuration.addToDom) !== null && _c !== void 0 ? _c : ((element) => document.body.appendChild(element));
        const mutationObserverFactory = (_d = configuration === null || configuration === void 0 ? void 0 : configuration.mutationObserverFactory) !== null && _d !== void 0 ? _d : (callback => new MutationObserver(callback));
        let container = factory();
        if (!container.id) {
            container.id = "html_kernel_container" + Math.floor(Math.random() * 1000000);
        }
        container.innerHTML = htmlFragment;
        const completionPromise = new PromiseCompletionSource();
        const mutationObserver = mutationObserverFactory((mutations, observer) => {
            for (const mutation of mutations) {
                if (mutation.type === "childList") {
                    const nodes = Array.from(mutation.addedNodes);
                    for (const addedNode of nodes) {
                        const element = addedNode;
                        element.id; //?
                        container.id; //?
                        if ((element === null || element === void 0 ? void 0 : element.id) === container.id) { //?
                            completionPromise.resolve();
                            mutationObserver.disconnect();
                            return;
                        }
                    }
                }
            }
        });
        mutationObserver.observe(elementToObserve(), { childList: true, subtree: true });
        addToDom(container);
        return completionPromise.promise;
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    class JavascriptKernel extends Kernel {
        constructor(name) {
            super(name !== null && name !== void 0 ? name : "javascript", "Javascript");
            this.suppressedLocals = new Set(this.allLocalVariableNames());
            this.registerCommandHandler({ commandType: SubmitCodeType, handle: invocation => this.handleSubmitCode(invocation) });
            this.registerCommandHandler({ commandType: RequestValueInfosType, handle: invocation => this.handleRequestValueInfos(invocation) });
            this.registerCommandHandler({ commandType: RequestValueType, handle: invocation => this.handleRequestValue(invocation) });
            this.capture = new ConsoleCapture();
        }
        handleSubmitCode(invocation) {
            const _super = Object.create(null, {
                kernelInfo: { get: () => super.kernelInfo }
            });
            return __awaiter(this, void 0, void 0, function* () {
                const submitCode = invocation.commandEnvelope.command;
                const code = submitCode.code;
                _super.kernelInfo.localName; //?
                _super.kernelInfo.uri; //?
                _super.kernelInfo.remoteUri; //?
                invocation.context.publish({ eventType: CodeSubmissionReceivedType, event: { code }, command: invocation.commandEnvelope });
                invocation.context.commandEnvelope.routingSlip; //?
                this.capture.kernelInvocationContext = invocation.context;
                let result = undefined;
                try {
                    const AsyncFunction = eval(`Object.getPrototypeOf(async function(){}).constructor`);
                    const evaluator = AsyncFunction("console", code);
                    result = yield evaluator(this.capture);
                    if (result !== undefined) {
                        const formattedValue = formatValue(result, 'application/json');
                        const event = {
                            formattedValues: [formattedValue]
                        };
                        invocation.context.publish({ eventType: ReturnValueProducedType, event, command: invocation.commandEnvelope });
                    }
                }
                catch (e) {
                    throw e; //?
                }
                finally {
                    this.capture.kernelInvocationContext = undefined;
                }
            });
        }
        handleRequestValueInfos(invocation) {
            const valueInfos = this.allLocalVariableNames().filter(v => !this.suppressedLocals.has(v)).map(v => ({ name: v, preferredMimeTypes: [] }));
            const event = {
                valueInfos
            };
            invocation.context.publish({ eventType: ValueInfosProducedType, event, command: invocation.commandEnvelope });
            return Promise.resolve();
        }
        handleRequestValue(invocation) {
            const requestValue = invocation.commandEnvelope.command;
            const rawValue = this.getLocalVariable(requestValue.name);
            const formattedValue = formatValue(rawValue, requestValue.mimeType || 'application/json');
            Logger.default.info(`returning ${JSON.stringify(formattedValue)} for ${requestValue.name}`);
            const event = {
                name: requestValue.name,
                formattedValue
            };
            invocation.context.publish({ eventType: ValueProducedType, event, command: invocation.commandEnvelope });
            return Promise.resolve();
        }
        allLocalVariableNames() {
            const result = [];
            try {
                for (const key in globalThis) {
                    try {
                        if (typeof globalThis[key] !== 'function') {
                            result.push(key);
                        }
                    }
                    catch (e) {
                        Logger.default.error(`error getting value for ${key} : ${e}`);
                    }
                }
            }
            catch (e) {
                Logger.default.error(`error scanning globla variables : ${e}`);
            }
            return result;
        }
        getLocalVariable(name) {
            return globalThis[name];
        }
    }
    function formatValue(arg, mimeType) {
        let value;
        switch (mimeType) {
            case 'text/plain':
                value = (arg === null || arg === void 0 ? void 0 : arg.toString()) || 'undefined';
                break;
            case 'application/json':
                value = JSON.stringify(arg);
                break;
            default:
                throw new Error(`unsupported mime type: ${mimeType}`);
        }
        return {
            mimeType,
            value,
        };
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    class ProxyKernel extends Kernel {
        constructor(name, _sender, _receiver) {
            super(name);
            this.name = name;
            this._sender = _sender;
            this._receiver = _receiver;
            this.kernelType = exports.KernelType.proxy;
        }
        getCommandHandler(commandType) {
            return {
                commandType,
                handle: (invocation) => {
                    return this._commandHandler(invocation);
                }
            };
        }
        delegatePublication(envelope, invocationContext) {
            let alreadyBeenSeen = false;
            if (envelope.routingSlip === undefined || !envelope.routingSlip.find(e => e === getKernelUri(this))) {
                tryAddUriToRoutingSlip(envelope, getKernelUri(this));
            }
            else {
                alreadyBeenSeen = true;
            }
            if (this.hasSameOrigin(envelope)) {
                if (!alreadyBeenSeen) {
                    invocationContext.publish(envelope);
                }
            }
        }
        hasSameOrigin(envelope) {
            var _a, _b, _c;
            let commandOriginUri = (_c = (_b = (_a = envelope.command) === null || _a === void 0 ? void 0 : _a.command) === null || _b === void 0 ? void 0 : _b.originUri) !== null && _c !== void 0 ? _c : this.kernelInfo.uri;
            if (commandOriginUri === this.kernelInfo.uri) {
                return true;
            }
            return commandOriginUri === null;
        }
        updateKernelInfoFromEvent(kernelInfoProduced) {
            updateKernelInfo(this.kernelInfo, kernelInfoProduced.kernelInfo);
        }
        _commandHandler(commandInvocation) {
            var _a, _b;
            var _c, _d;
            return __awaiter(this, void 0, void 0, function* () {
                const commandToken = commandInvocation.commandEnvelope.token;
                const commandId = commandInvocation.commandEnvelope.id;
                const completionSource = new PromiseCompletionSource();
                // fix : is this the right way? We are trying to avoid forwarding events we just did forward
                let eventSubscription = this._receiver.subscribe({
                    next: (envelope) => {
                        if (isKernelEventEnvelope(envelope)) {
                            if (envelope.eventType === KernelInfoProducedType &&
                                (envelope.command === null || envelope.command === undefined)) {
                                const kernelInfoProduced = envelope.event;
                                this.updateKernelInfoFromEvent(kernelInfoProduced);
                                this.publishEvent({
                                    eventType: KernelInfoProducedType,
                                    event: { kernelInfo: this.kernelInfo }
                                });
                            }
                            else if (envelope.command.token === commandToken) {
                                for (const kernelUri of envelope.command.routingSlip) {
                                    tryAddUriToRoutingSlip(commandInvocation.commandEnvelope, kernelUri);
                                    envelope.command.routingSlip = commandInvocation.commandEnvelope.routingSlip; //?
                                }
                                switch (envelope.eventType) {
                                    case KernelInfoProducedType:
                                        {
                                            const kernelInfoProduced = envelope.event;
                                            if (kernelInfoProduced.kernelInfo.uri === this.kernelInfo.remoteUri) {
                                                this.updateKernelInfoFromEvent(kernelInfoProduced);
                                                this.delegatePublication({
                                                    eventType: KernelInfoProducedType,
                                                    event: { kernelInfo: this.kernelInfo },
                                                    routingSlip: envelope.routingSlip,
                                                    command: commandInvocation.commandEnvelope
                                                }, commandInvocation.context);
                                                this.delegatePublication(envelope, commandInvocation.context);
                                            }
                                            else {
                                                this.delegatePublication(envelope, commandInvocation.context);
                                            }
                                        }
                                        break;
                                    case CommandCancelledType:
                                    case CommandFailedType:
                                    case CommandSucceededType:
                                        Logger.default.info(`proxy name=${this.name}[local uri:${this.kernelInfo.uri}, remote uri:${this.kernelInfo.remoteUri}] finished, envelopeid=${envelope.command.id}, commandid=${commandId}`);
                                        if (envelope.command.id === commandId) {
                                            completionSource.resolve(envelope);
                                        }
                                        else {
                                            this.delegatePublication(envelope, commandInvocation.context);
                                        }
                                        break;
                                    default:
                                        this.delegatePublication(envelope, commandInvocation.context);
                                        break;
                                }
                            }
                        }
                    }
                });
                try {
                    if (!commandInvocation.commandEnvelope.command.destinationUri || !commandInvocation.commandEnvelope.command.originUri) {
                        (_a = (_c = commandInvocation.commandEnvelope.command).originUri) !== null && _a !== void 0 ? _a : (_c.originUri = this.kernelInfo.uri);
                        (_b = (_d = commandInvocation.commandEnvelope.command).destinationUri) !== null && _b !== void 0 ? _b : (_d.destinationUri = this.kernelInfo.remoteUri);
                    }
                    commandInvocation.commandEnvelope.routingSlip; //?
                    Logger.default.info(`proxy ${this.name}[local uri:${this.kernelInfo.uri}, remote uri:${this.kernelInfo.remoteUri}] forwarding command ${commandInvocation.commandEnvelope.commandType} to ${commandInvocation.commandEnvelope.command.destinationUri}`);
                    this._sender.send(commandInvocation.commandEnvelope);
                    Logger.default.info(`proxy ${this.name}[local uri:${this.kernelInfo.uri}, remote uri:${this.kernelInfo.remoteUri}] about to await with token ${commandToken}`);
                    const enventEnvelope = yield completionSource.promise;
                    if (enventEnvelope.eventType === CommandFailedType) {
                        commandInvocation.context.fail(enventEnvelope.event.message);
                    }
                    Logger.default.info(`proxy ${this.name}[local uri:${this.kernelInfo.uri}, remote uri:${this.kernelInfo.remoteUri}] done awaiting with token ${commandToken}`);
                }
                catch (e) {
                    commandInvocation.context.fail(e.message);
                }
                finally {
                    eventSubscription.unsubscribe();
                }
            });
        }
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    class KernelHost {
        constructor(kernel, sender, receiver, hostUri) {
            this._remoteUriToKernel = new Map();
            this._uriToKernel = new Map();
            this._kernelToKernelInfo = new Map();
            this._connectors = [];
            this._kernel = kernel;
            this._uri = hostUri || "kernel://vscode";
            this._kernel.host = this;
            this._scheduler = new KernelScheduler();
            this._defaultConnector = new Connector({ sender, receiver });
            this._connectors.push(this._defaultConnector);
        }
        get uri() {
            return this._uri;
        }
        tryGetKernelByRemoteUri(remoteUri) {
            return this._remoteUriToKernel.get(remoteUri);
        }
        trygetKernelByOriginUri(originUri) {
            return this._uriToKernel.get(originUri);
        }
        tryGetKernelInfo(kernel) {
            return this._kernelToKernelInfo.get(kernel);
        }
        addKernelInfo(kernel, kernelInfo) {
            kernelInfo.uri = `${this._uri}/${kernel.name}`; //?
            this._kernelToKernelInfo.set(kernel, kernelInfo);
            this._uriToKernel.set(kernelInfo.uri, kernel);
        }
        getKernel(kernelCommandEnvelope) {
            var _a;
            const uriToLookup = (_a = kernelCommandEnvelope.command.destinationUri) !== null && _a !== void 0 ? _a : kernelCommandEnvelope.command.originUri;
            let kernel = undefined;
            if (uriToLookup) {
                kernel = this._kernel.findKernelByUri(uriToLookup);
            }
            if (!kernel) {
                if (kernelCommandEnvelope.command.targetKernelName) {
                    kernel = this._kernel.findKernelByName(kernelCommandEnvelope.command.targetKernelName);
                }
            }
            kernel !== null && kernel !== void 0 ? kernel : (kernel = this._kernel);
            Logger.default.info(`Using Kernel ${kernel.name}`);
            return kernel;
        }
        connectProxyKernelOnDefaultConnector(localName, remoteKernelUri, aliases) {
            return this.connectProxyKernelOnConnector(localName, this._defaultConnector.sender, this._defaultConnector.receiver, remoteKernelUri, aliases);
        }
        tryAddConnector(connector) {
            if (!connector.remoteUris) {
                this._connectors.push(new Connector(connector));
                return true;
            }
            else {
                const found = connector.remoteUris.find(uri => this._connectors.find(c => c.canReach(uri)));
                if (!found) {
                    this._connectors.push(new Connector(connector));
                    return true;
                }
                return false;
            }
        }
        connectProxyKernel(localName, remoteKernelUri, aliases) {
            this._connectors; //?
            const connector = this._connectors.find(c => c.canReach(remoteKernelUri));
            if (!connector) {
                throw new Error(`Cannot find connector to reach ${remoteKernelUri}`);
            }
            let kernel = new ProxyKernel(localName, connector.sender, connector.receiver);
            kernel.kernelInfo.remoteUri = remoteKernelUri;
            this._kernel.add(kernel, aliases);
            return kernel;
        }
        connectProxyKernelOnConnector(localName, sender, receiver, remoteKernelUri, aliases) {
            let kernel = new ProxyKernel(localName, sender, receiver);
            kernel.kernelInfo.remoteUri = remoteKernelUri;
            this._kernel.add(kernel, aliases);
            return kernel;
        }
        tryGetConnector(remoteUri) {
            return this._connectors.find(c => c.canReach(remoteUri));
        }
        connect() {
            this._kernel.subscribeToKernelEvents(e => {
                this._defaultConnector.sender.send(e);
            });
            this._defaultConnector.receiver.subscribe({
                next: (kernelCommandOrEventEnvelope) => {
                    if (isKernelCommandEnvelope(kernelCommandOrEventEnvelope)) {
                        this._scheduler.runAsync(kernelCommandOrEventEnvelope, commandEnvelope => {
                            const kernel = this._kernel;
                            return kernel.send(commandEnvelope);
                        });
                    }
                }
            });
            this._defaultConnector.sender.send({ eventType: KernelReadyType, event: {}, routingSlip: [this._kernel.kernelInfo.uri] });
            this.publishKerneInfo();
        }
        publishKerneInfo() {
            const events = this.getKernelInfoProduced();
            for (const event of events) {
                this._defaultConnector.sender.send(event);
            }
        }
        getKernelInfoProduced() {
            let events = [];
            events.push({ eventType: KernelInfoProducedType, event: { kernelInfo: this._kernel.kernelInfo }, routingSlip: [this._kernel.kernelInfo.uri] });
            for (let kernel of this._kernel.childKernels) {
                events.push({ eventType: KernelInfoProducedType, event: { kernelInfo: kernel.kernelInfo }, routingSlip: [kernel.kernelInfo.uri] });
            }
            return events;
        }
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    function createHost(global, compositeKernelName, configureRequire, logMessage, localToRemote, remoteToLocal, onReady) {
        Logger.configure(compositeKernelName, logMessage);
        global.interactive = {};
        configureRequire(global.interactive);
        global.kernel = {
            get root() {
                return Kernel.root;
            }
        };
        const compositeKernel = new CompositeKernel(compositeKernelName);
        const kernelHost = new KernelHost(compositeKernel, KernelCommandAndEventSender.FromObserver(localToRemote), KernelCommandAndEventReceiver.FromObservable(remoteToLocal), `kernel://${compositeKernelName}`);
        remoteToLocal.subscribe({
            next: (envelope) => {
                if (isKernelEventEnvelope(envelope) && envelope.eventType === KernelInfoProducedType) {
                    const kernelInfoProduced = envelope.event;
                    ensureOrUpdateProxyForKernelInfo(kernelInfoProduced, compositeKernel);
                }
            }
        });
        global[compositeKernelName] = {
            compositeKernel,
            kernelHost,
        };
        const jsKernel = new JavascriptKernel();
        compositeKernel.add(jsKernel, ["js"]);
        kernelHost.connect();
        onReady();
    }

    // Copyright (c) .NET Foundation and contributors. All rights reserved.
    function setup(configuration) {
        const remoteToLocal = new Subject();
        const localToRemote = new Subject();
        const global = ((configuration === null || configuration === void 0 ? void 0 : configuration.global) || window);
        localToRemote.subscribe({
            next: envelope => {
                global === null || global === void 0 ? void 0 : global.publishCommandOrEvent(envelope);
            }
        });
        if (global) {
            global.sendKernelCommand = (kernelCommandEnvelope) => {
                remoteToLocal.next(kernelCommandEnvelope);
            };
        }
        const compositeKernelName = (configuration === null || configuration === void 0 ? void 0 : configuration.hostName) || 'browser';
        createHost(global, compositeKernelName, configureRequire, _entry => {
        }, localToRemote, remoteToLocal, () => {
            const htmlKernel = new HtmlKernel();
            global[compositeKernelName].compositeKernel.add(htmlKernel);
        });
        function configureRequire(interactive) {
            if ((typeof (require) !== typeof (Function)) || (typeof (require.config) !== typeof (Function))) {
                let require_script = document.createElement('script');
                require_script.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js');
                require_script.setAttribute('type', 'text/javascript');
                require_script.onload = function () {
                    interactive.configureRequire = (confing) => {
                        return require.config(confing) || require;
                    };
                };
                document.getElementsByTagName('head')[0].appendChild(require_script);
            }
            else {
                interactive.configureRequire = (confing) => {
                    return require.config(confing) || require;
                };
            }
        }
    }

    exports.AddPackageType = AddPackageType;
    exports.AssemblyProducedType = AssemblyProducedType;
    exports.CancelType = CancelType;
    exports.ChangeWorkingDirectoryType = ChangeWorkingDirectoryType;
    exports.CodeSubmissionReceivedType = CodeSubmissionReceivedType;
    exports.CommandCancelledType = CommandCancelledType;
    exports.CommandFailedType = CommandFailedType;
    exports.CommandSucceededType = CommandSucceededType;
    exports.CompileProjectType = CompileProjectType;
    exports.CompleteCodeSubmissionReceivedType = CompleteCodeSubmissionReceivedType;
    exports.CompletionsProducedType = CompletionsProducedType;
    exports.CompositeKernel = CompositeKernel;
    exports.Connector = Connector;
    exports.ConsoleCapture = ConsoleCapture;
    exports.DiagnosticLogEntryProducedType = DiagnosticLogEntryProducedType;
    exports.DiagnosticsProducedType = DiagnosticsProducedType;
    exports.DisplayErrorType = DisplayErrorType;
    exports.DisplayValueType = DisplayValueType;
    exports.DisplayedValueProducedType = DisplayedValueProducedType;
    exports.DisplayedValueUpdatedType = DisplayedValueUpdatedType;
    exports.DocumentOpenedType = DocumentOpenedType;
    exports.ErrorProducedType = ErrorProducedType;
    exports.Guid = Guid;
    exports.HoverTextProducedType = HoverTextProducedType;
    exports.HtmlKernel = HtmlKernel;
    exports.IncompleteCodeSubmissionReceivedType = IncompleteCodeSubmissionReceivedType;
    exports.InputProducedType = InputProducedType;
    exports.JavascriptKernel = JavascriptKernel;
    exports.Kernel = Kernel;
    exports.KernelCommandAndEventReceiver = KernelCommandAndEventReceiver;
    exports.KernelCommandAndEventSender = KernelCommandAndEventSender;
    exports.KernelExtensionLoadedType = KernelExtensionLoadedType;
    exports.KernelHost = KernelHost;
    exports.KernelInfoProducedType = KernelInfoProducedType;
    exports.KernelInvocationContext = KernelInvocationContext;
    exports.KernelReadyType = KernelReadyType;
    exports.KernelScheduler = KernelScheduler;
    exports.Logger = Logger;
    exports.OpenDocumentType = OpenDocumentType;
    exports.OpenProjectType = OpenProjectType;
    exports.PackageAddedType = PackageAddedType;
    exports.ProjectOpenedType = ProjectOpenedType;
    exports.PromiseCompletionSource = PromiseCompletionSource;
    exports.ProxyKernel = ProxyKernel;
    exports.QuitType = QuitType;
    exports.RequestCompletionsType = RequestCompletionsType;
    exports.RequestDiagnosticsType = RequestDiagnosticsType;
    exports.RequestHoverTextType = RequestHoverTextType;
    exports.RequestInputType = RequestInputType;
    exports.RequestKernelInfoType = RequestKernelInfoType;
    exports.RequestSignatureHelpType = RequestSignatureHelpType;
    exports.RequestValueInfosType = RequestValueInfosType;
    exports.RequestValueType = RequestValueType;
    exports.ReturnValueProducedType = ReturnValueProducedType;
    exports.SendEditableCodeType = SendEditableCodeType;
    exports.SignatureHelpProducedType = SignatureHelpProducedType;
    exports.StandardErrorValueProducedType = StandardErrorValueProducedType;
    exports.StandardOutputValueProducedType = StandardOutputValueProducedType;
    exports.SubmitCodeType = SubmitCodeType;
    exports.TokenGenerator = TokenGenerator;
    exports.UpdateDisplayedValueType = UpdateDisplayedValueType;
    exports.ValueInfosProducedType = ValueInfosProducedType;
    exports.ValueProducedType = ValueProducedType;
    exports.WorkingDirectoryChangedType = WorkingDirectoryChangedType;
    exports.areCommandsTheSame = areCommandsTheSame;
    exports.domHtmlFragmentProcessor = domHtmlFragmentProcessor;
    exports.ensureOrUpdateProxyForKernelInfo = ensureOrUpdateProxyForKernelInfo;
    exports.extractHostAndNomalize = extractHostAndNomalize;
    exports.formatValue = formatValue;
    exports.getKernelUri = getKernelUri;
    exports.isArrayOfString = isArrayOfString;
    exports.isKernelCommandEnvelope = isKernelCommandEnvelope;
    exports.isKernelEventEnvelope = isKernelEventEnvelope;
    exports.isKernelInfoForProxy = isKernelInfoForProxy;
    exports.isPromiseCompletionSource = isPromiseCompletionSource;
    exports.isSetOfString = isSetOfString;
    exports.setup = setup;
    exports.submitCommandAndGetResult = submitCommandAndGetResult;
    exports.tryAddUriToRoutingSlip = tryAddUriToRoutingSlip;
    exports.updateKernelInfo = updateKernelInfo;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG90bmV0LWludGVyYWN0aXZlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pc0Z1bmN0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvY3JlYXRlRXJyb3JDbGFzcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9hcnJSZW1vdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvU3Vic2NyaXB0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL2NvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvdGltZW91dFByb3ZpZGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvcmVwb3J0VW5oYW5kbGVkRXJyb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9ub29wLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvZXJyb3JDb250ZXh0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL1N1YnNjcmliZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc3ltYm9sL29ic2VydmFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pZGVudGl0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL3BpcGUuanMiLCIuLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvT2JzZXJ2YWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2xpZnQuanMiLCIuLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL09wZXJhdG9yU3Vic2NyaWJlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL09iamVjdFVuc3Vic2NyaWJlZEVycm9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL1N1YmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL21hcC5qcyIsIi4uL3NyYy9jb250cmFjdHMudHMiLCIuLi9zcmMvcHJvbWlzZUNvbXBsZXRpb25Tb3VyY2UudHMiLCIuLi9zcmMva2VybmVsSW52b2NhdGlvbkNvbnRleHQudHMiLCIuLi9zcmMvdG9rZW5HZW5lcmF0b3IudHMiLCIuLi9zcmMvbG9nZ2VyLnRzIiwiLi4vc3JjL2tlcm5lbFNjaGVkdWxlci50cyIsIi4uL3NyYy9rZXJuZWwudHMiLCIuLi9zcmMvY29ubmVjdGlvbi50cyIsIi4uL3NyYy9jb21wb3NpdGVLZXJuZWwudHMiLCIuLi9zcmMvY29uc29sZUNhcHR1cmUudHMiLCIuLi9zcmMvaHRtbEtlcm5lbC50cyIsIi4uL3NyYy9qYXZhc2NyaXB0S2VybmVsLnRzIiwiLi4vc3JjL3Byb3h5S2VybmVsLnRzIiwiLi4vc3JjL2tlcm5lbEhvc3QudHMiLCIuLi9zcmMvd2Vidmlldy9mcm9udEVuZEhvc3QudHMiLCIuLi9zcmMvc2V0dXAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNGdW5jdGlvbi5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlRXJyb3JDbGFzcyhjcmVhdGVJbXBsKSB7XG4gICAgdmFyIF9zdXBlciA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICBFcnJvci5jYWxsKGluc3RhbmNlKTtcbiAgICAgICAgaW5zdGFuY2Uuc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcbiAgICB9O1xuICAgIHZhciBjdG9yRnVuYyA9IGNyZWF0ZUltcGwoX3N1cGVyKTtcbiAgICBjdG9yRnVuYy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG4gICAgY3RvckZ1bmMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvckZ1bmM7XG4gICAgcmV0dXJuIGN0b3JGdW5jO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3JlYXRlRXJyb3JDbGFzcy5qcy5tYXAiLCJpbXBvcnQgeyBjcmVhdGVFcnJvckNsYXNzIH0gZnJvbSAnLi9jcmVhdGVFcnJvckNsYXNzJztcbmV4cG9ydCB2YXIgVW5zdWJzY3JpcHRpb25FcnJvciA9IGNyZWF0ZUVycm9yQ2xhc3MoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBVbnN1YnNjcmlwdGlvbkVycm9ySW1wbChlcnJvcnMpIHtcbiAgICAgICAgX3N1cGVyKHRoaXMpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBlcnJvcnNcbiAgICAgICAgICAgID8gZXJyb3JzLmxlbmd0aCArIFwiIGVycm9ycyBvY2N1cnJlZCBkdXJpbmcgdW5zdWJzY3JpcHRpb246XFxuXCIgKyBlcnJvcnMubWFwKGZ1bmN0aW9uIChlcnIsIGkpIHsgcmV0dXJuIGkgKyAxICsgXCIpIFwiICsgZXJyLnRvU3RyaW5nKCk7IH0pLmpvaW4oJ1xcbiAgJylcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIHRoaXMubmFtZSA9ICdVbnN1YnNjcmlwdGlvbkVycm9yJztcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XG4gICAgfTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VW5zdWJzY3JpcHRpb25FcnJvci5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gYXJyUmVtb3ZlKGFyciwgaXRlbSkge1xuICAgIGlmIChhcnIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gYXJyLmluZGV4T2YoaXRlbSk7XG4gICAgICAgIDAgPD0gaW5kZXggJiYgYXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyUmVtb3ZlLmpzLm1hcCIsImltcG9ydCB7IF9fcmVhZCwgX19zcHJlYWRBcnJheSwgX192YWx1ZXMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBVbnN1YnNjcmlwdGlvbkVycm9yIH0gZnJvbSAnLi91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3InO1xuaW1wb3J0IHsgYXJyUmVtb3ZlIH0gZnJvbSAnLi91dGlsL2FyclJlbW92ZSc7XG52YXIgU3Vic2NyaXB0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTdWJzY3JpcHRpb24oaW5pdGlhbFRlYXJkb3duKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbFRlYXJkb3duID0gaW5pdGlhbFRlYXJkb3duO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wYXJlbnRhZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLl9maW5hbGl6ZXJzID0gbnVsbDtcbiAgICB9XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVfMSwgX2EsIGVfMiwgX2I7XG4gICAgICAgIHZhciBlcnJvcnM7XG4gICAgICAgIGlmICghdGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBfcGFyZW50YWdlID0gdGhpcy5fcGFyZW50YWdlO1xuICAgICAgICAgICAgaWYgKF9wYXJlbnRhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJlbnRhZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KF9wYXJlbnRhZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfcGFyZW50YWdlXzEgPSBfX3ZhbHVlcyhfcGFyZW50YWdlKSwgX3BhcmVudGFnZV8xXzEgPSBfcGFyZW50YWdlXzEubmV4dCgpOyAhX3BhcmVudGFnZV8xXzEuZG9uZTsgX3BhcmVudGFnZV8xXzEgPSBfcGFyZW50YWdlXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudF8xID0gX3BhcmVudGFnZV8xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50XzEucmVtb3ZlKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3BhcmVudGFnZV8xXzEgJiYgIV9wYXJlbnRhZ2VfMV8xLmRvbmUgJiYgKF9hID0gX3BhcmVudGFnZV8xLnJldHVybikpIF9hLmNhbGwoX3BhcmVudGFnZV8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3BhcmVudGFnZS5yZW1vdmUodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGluaXRpYWxGaW5hbGl6ZXIgPSB0aGlzLmluaXRpYWxUZWFyZG93bjtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGluaXRpYWxGaW5hbGl6ZXIpKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbEZpbmFsaXplcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSBlIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvciA/IGUuZXJyb3JzIDogW2VdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBfZmluYWxpemVycyA9IHRoaXMuX2ZpbmFsaXplcnM7XG4gICAgICAgICAgICBpZiAoX2ZpbmFsaXplcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maW5hbGl6ZXJzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfZmluYWxpemVyc18xID0gX192YWx1ZXMoX2ZpbmFsaXplcnMpLCBfZmluYWxpemVyc18xXzEgPSBfZmluYWxpemVyc18xLm5leHQoKTsgIV9maW5hbGl6ZXJzXzFfMS5kb25lOyBfZmluYWxpemVyc18xXzEgPSBfZmluYWxpemVyc18xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmFsaXplciA9IF9maW5hbGl6ZXJzXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhlY0ZpbmFsaXplcihmaW5hbGl6ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IGVycm9ycyAhPT0gbnVsbCAmJiBlcnJvcnMgIT09IHZvaWQgMCA/IGVycm9ycyA6IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGVycm9ycykpLCBfX3JlYWQoZXJyLmVycm9ycykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfZmluYWxpemVyc18xXzEgJiYgIV9maW5hbGl6ZXJzXzFfMS5kb25lICYmIChfYiA9IF9maW5hbGl6ZXJzXzEucmV0dXJuKSkgX2IuY2FsbChfZmluYWxpemVyc18xKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVbnN1YnNjcmlwdGlvbkVycm9yKGVycm9ycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHRlYXJkb3duKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHRlYXJkb3duICYmIHRlYXJkb3duICE9PSB0aGlzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBleGVjRmluYWxpemVyKHRlYXJkb3duKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0ZWFyZG93biBpbnN0YW5jZW9mIFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVhcmRvd24uY2xvc2VkIHx8IHRlYXJkb3duLl9oYXNQYXJlbnQodGhpcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0ZWFyZG93bi5fYWRkUGFyZW50KHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAodGhpcy5fZmluYWxpemVycyA9IChfYSA9IHRoaXMuX2ZpbmFsaXplcnMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdKS5wdXNoKHRlYXJkb3duKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5faGFzUGFyZW50ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICB2YXIgX3BhcmVudGFnZSA9IHRoaXMuX3BhcmVudGFnZTtcbiAgICAgICAgcmV0dXJuIF9wYXJlbnRhZ2UgPT09IHBhcmVudCB8fCAoQXJyYXkuaXNBcnJheShfcGFyZW50YWdlKSAmJiBfcGFyZW50YWdlLmluY2x1ZGVzKHBhcmVudCkpO1xuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5fYWRkUGFyZW50ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICB2YXIgX3BhcmVudGFnZSA9IHRoaXMuX3BhcmVudGFnZTtcbiAgICAgICAgdGhpcy5fcGFyZW50YWdlID0gQXJyYXkuaXNBcnJheShfcGFyZW50YWdlKSA/IChfcGFyZW50YWdlLnB1c2gocGFyZW50KSwgX3BhcmVudGFnZSkgOiBfcGFyZW50YWdlID8gW19wYXJlbnRhZ2UsIHBhcmVudF0gOiBwYXJlbnQ7XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLl9yZW1vdmVQYXJlbnQgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHZhciBfcGFyZW50YWdlID0gdGhpcy5fcGFyZW50YWdlO1xuICAgICAgICBpZiAoX3BhcmVudGFnZSA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnRhZ2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoX3BhcmVudGFnZSkpIHtcbiAgICAgICAgICAgIGFyclJlbW92ZShfcGFyZW50YWdlLCBwYXJlbnQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICh0ZWFyZG93bikge1xuICAgICAgICB2YXIgX2ZpbmFsaXplcnMgPSB0aGlzLl9maW5hbGl6ZXJzO1xuICAgICAgICBfZmluYWxpemVycyAmJiBhcnJSZW1vdmUoX2ZpbmFsaXplcnMsIHRlYXJkb3duKTtcbiAgICAgICAgaWYgKHRlYXJkb3duIGluc3RhbmNlb2YgU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0ZWFyZG93bi5fcmVtb3ZlUGFyZW50KHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24uRU1QVFkgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZW1wdHkgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgICAgIGVtcHR5LmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBlbXB0eTtcbiAgICB9KSgpO1xuICAgIHJldHVybiBTdWJzY3JpcHRpb247XG59KCkpO1xuZXhwb3J0IHsgU3Vic2NyaXB0aW9uIH07XG5leHBvcnQgdmFyIEVNUFRZX1NVQlNDUklQVElPTiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbmV4cG9ydCBmdW5jdGlvbiBpc1N1YnNjcmlwdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiAodmFsdWUgaW5zdGFuY2VvZiBTdWJzY3JpcHRpb24gfHxcbiAgICAgICAgKHZhbHVlICYmICdjbG9zZWQnIGluIHZhbHVlICYmIGlzRnVuY3Rpb24odmFsdWUucmVtb3ZlKSAmJiBpc0Z1bmN0aW9uKHZhbHVlLmFkZCkgJiYgaXNGdW5jdGlvbih2YWx1ZS51bnN1YnNjcmliZSkpKTtcbn1cbmZ1bmN0aW9uIGV4ZWNGaW5hbGl6ZXIoZmluYWxpemVyKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oZmluYWxpemVyKSkge1xuICAgICAgICBmaW5hbGl6ZXIoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZpbmFsaXplci51bnN1YnNjcmliZSgpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YnNjcmlwdGlvbi5qcy5tYXAiLCJleHBvcnQgdmFyIGNvbmZpZyA9IHtcbiAgICBvblVuaGFuZGxlZEVycm9yOiBudWxsLFxuICAgIG9uU3RvcHBlZE5vdGlmaWNhdGlvbjogbnVsbCxcbiAgICBQcm9taXNlOiB1bmRlZmluZWQsXG4gICAgdXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZzogZmFsc2UsXG4gICAgdXNlRGVwcmVjYXRlZE5leHRDb250ZXh0OiBmYWxzZSxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwIiwiaW1wb3J0IHsgX19yZWFkLCBfX3NwcmVhZEFycmF5IH0gZnJvbSBcInRzbGliXCI7XG5leHBvcnQgdmFyIHRpbWVvdXRQcm92aWRlciA9IHtcbiAgICBzZXRUaW1lb3V0OiBmdW5jdGlvbiAoaGFuZGxlciwgdGltZW91dCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDI7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJnc1tfaSAtIDJdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVsZWdhdGUgPSB0aW1lb3V0UHJvdmlkZXIuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSA9PT0gbnVsbCB8fCBkZWxlZ2F0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZWdhdGUuc2V0VGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlLnNldFRpbWVvdXQuYXBwbHkoZGVsZWdhdGUsIF9fc3ByZWFkQXJyYXkoW2hhbmRsZXIsIHRpbWVvdXRdLCBfX3JlYWQoYXJncykpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2V0VGltZW91dC5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXkoW2hhbmRsZXIsIHRpbWVvdXRdLCBfX3JlYWQoYXJncykpKTtcbiAgICB9LFxuICAgIGNsZWFyVGltZW91dDogZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSB0aW1lb3V0UHJvdmlkZXIuZGVsZWdhdGU7XG4gICAgICAgIHJldHVybiAoKGRlbGVnYXRlID09PSBudWxsIHx8IGRlbGVnYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxlZ2F0ZS5jbGVhclRpbWVvdXQpIHx8IGNsZWFyVGltZW91dCkoaGFuZGxlKTtcbiAgICB9LFxuICAgIGRlbGVnYXRlOiB1bmRlZmluZWQsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGltZW91dFByb3ZpZGVyLmpzLm1hcCIsImltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgeyB0aW1lb3V0UHJvdmlkZXIgfSBmcm9tICcuLi9zY2hlZHVsZXIvdGltZW91dFByb3ZpZGVyJztcbmV4cG9ydCBmdW5jdGlvbiByZXBvcnRVbmhhbmRsZWRFcnJvcihlcnIpIHtcbiAgICB0aW1lb3V0UHJvdmlkZXIuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvblVuaGFuZGxlZEVycm9yID0gY29uZmlnLm9uVW5oYW5kbGVkRXJyb3I7XG4gICAgICAgIGlmIChvblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICBvblVuaGFuZGxlZEVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlcG9ydFVuaGFuZGxlZEVycm9yLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBub29wKCkgeyB9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ub29wLmpzLm1hcCIsImltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XG52YXIgY29udGV4dCA9IG51bGw7XG5leHBvcnQgZnVuY3Rpb24gZXJyb3JDb250ZXh0KGNiKSB7XG4gICAgaWYgKGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgIHZhciBpc1Jvb3QgPSAhY29udGV4dDtcbiAgICAgICAgaWYgKGlzUm9vdCkge1xuICAgICAgICAgICAgY29udGV4dCA9IHsgZXJyb3JUaHJvd246IGZhbHNlLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNiKCk7XG4gICAgICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IGNvbnRleHQsIGVycm9yVGhyb3duID0gX2EuZXJyb3JUaHJvd24sIGVycm9yID0gX2EuZXJyb3I7XG4gICAgICAgICAgICBjb250ZXh0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChlcnJvclRocm93bikge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjYigpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBjYXB0dXJlRXJyb3IoZXJyKSB7XG4gICAgaWYgKGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nICYmIGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC5lcnJvclRocm93biA9IHRydWU7XG4gICAgICAgIGNvbnRleHQuZXJyb3IgPSBlcnI7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXJyb3JDb250ZXh0LmpzLm1hcCIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IGlzU3Vic2NyaXB0aW9uLCBTdWJzY3JpcHRpb24gfSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyByZXBvcnRVbmhhbmRsZWRFcnJvciB9IGZyb20gJy4vdXRpbC9yZXBvcnRVbmhhbmRsZWRFcnJvcic7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi91dGlsL25vb3AnO1xuaW1wb3J0IHsgbmV4dE5vdGlmaWNhdGlvbiwgZXJyb3JOb3RpZmljYXRpb24sIENPTVBMRVRFX05PVElGSUNBVElPTiB9IGZyb20gJy4vTm90aWZpY2F0aW9uRmFjdG9yaWVzJztcbmltcG9ydCB7IHRpbWVvdXRQcm92aWRlciB9IGZyb20gJy4vc2NoZWR1bGVyL3RpbWVvdXRQcm92aWRlcic7XG5pbXBvcnQgeyBjYXB0dXJlRXJyb3IgfSBmcm9tICcuL3V0aWwvZXJyb3JDb250ZXh0JztcbnZhciBTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdWJzY3JpYmVyKGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmlzU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoZGVzdGluYXRpb24pIHtcbiAgICAgICAgICAgIF90aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgICAgICAgICBpZiAoaXNTdWJzY3JpcHRpb24oZGVzdGluYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb24uYWRkKF90aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmRlc3RpbmF0aW9uID0gRU1QVFlfT0JTRVJWRVI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTdWJzY3JpYmVyLmNyZWF0ZSA9IGZ1bmN0aW9uIChuZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTYWZlU3Vic2NyaWJlcihuZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIGhhbmRsZVN0b3BwZWROb3RpZmljYXRpb24obmV4dE5vdGlmaWNhdGlvbih2YWx1ZSksIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbmV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIGhhbmRsZVN0b3BwZWROb3RpZmljYXRpb24oZXJyb3JOb3RpZmljYXRpb24oZXJyKSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKENPTVBMRVRFX05PVElGSUNBVElPTiwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS51bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFN1YnNjcmliZXI7XG59KFN1YnNjcmlwdGlvbikpO1xuZXhwb3J0IHsgU3Vic2NyaWJlciB9O1xudmFyIF9iaW5kID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ7XG5mdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIF9iaW5kLmNhbGwoZm4sIHRoaXNBcmcpO1xufVxudmFyIENvbnN1bWVyT2JzZXJ2ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnN1bWVyT2JzZXJ2ZXIocGFydGlhbE9ic2VydmVyKSB7XG4gICAgICAgIHRoaXMucGFydGlhbE9ic2VydmVyID0gcGFydGlhbE9ic2VydmVyO1xuICAgIH1cbiAgICBDb25zdW1lck9ic2VydmVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBwYXJ0aWFsT2JzZXJ2ZXIgPSB0aGlzLnBhcnRpYWxPYnNlcnZlcjtcbiAgICAgICAgaWYgKHBhcnRpYWxPYnNlcnZlci5uZXh0KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBhcnRpYWxPYnNlcnZlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZVVuaGFuZGxlZEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29uc3VtZXJPYnNlcnZlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHZhciBwYXJ0aWFsT2JzZXJ2ZXIgPSB0aGlzLnBhcnRpYWxPYnNlcnZlcjtcbiAgICAgICAgaWYgKHBhcnRpYWxPYnNlcnZlci5lcnJvcikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwYXJ0aWFsT2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZVVuaGFuZGxlZEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhhbmRsZVVuaGFuZGxlZEVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnN1bWVyT2JzZXJ2ZXIucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGFydGlhbE9ic2VydmVyID0gdGhpcy5wYXJ0aWFsT2JzZXJ2ZXI7XG4gICAgICAgIGlmIChwYXJ0aWFsT2JzZXJ2ZXIuY29tcGxldGUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVVbmhhbmRsZWRFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDb25zdW1lck9ic2VydmVyO1xufSgpKTtcbnZhciBTYWZlU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNhZmVTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNhZmVTdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgdmFyIHBhcnRpYWxPYnNlcnZlcjtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob2JzZXJ2ZXJPck5leHQpIHx8ICFvYnNlcnZlck9yTmV4dCkge1xuICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyID0ge1xuICAgICAgICAgICAgICAgIG5leHQ6IChvYnNlcnZlck9yTmV4dCAhPT0gbnVsbCAmJiBvYnNlcnZlck9yTmV4dCAhPT0gdm9pZCAwID8gb2JzZXJ2ZXJPck5leHQgOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvciAhPT0gbnVsbCAmJiBlcnJvciAhPT0gdm9pZCAwID8gZXJyb3IgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGNvbXBsZXRlICE9PSBudWxsICYmIGNvbXBsZXRlICE9PSB2b2lkIDAgPyBjb21wbGV0ZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgY29udGV4dF8xO1xuICAgICAgICAgICAgaWYgKF90aGlzICYmIGNvbmZpZy51c2VEZXByZWNhdGVkTmV4dENvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0XzEgPSBPYmplY3QuY3JlYXRlKG9ic2VydmVyT3JOZXh0KTtcbiAgICAgICAgICAgICAgICBjb250ZXh0XzEudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy51bnN1YnNjcmliZSgpOyB9O1xuICAgICAgICAgICAgICAgIHBhcnRpYWxPYnNlcnZlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogb2JzZXJ2ZXJPck5leHQubmV4dCAmJiBiaW5kKG9ic2VydmVyT3JOZXh0Lm5leHQsIGNvbnRleHRfMSksXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBvYnNlcnZlck9yTmV4dC5lcnJvciAmJiBiaW5kKG9ic2VydmVyT3JOZXh0LmVycm9yLCBjb250ZXh0XzEpLFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogb2JzZXJ2ZXJPck5leHQuY29tcGxldGUgJiYgYmluZChvYnNlcnZlck9yTmV4dC5jb21wbGV0ZSwgY29udGV4dF8xKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyID0gb2JzZXJ2ZXJPck5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBuZXcgQ29uc3VtZXJPYnNlcnZlcihwYXJ0aWFsT2JzZXJ2ZXIpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBTYWZlU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuZXhwb3J0IHsgU2FmZVN1YnNjcmliZXIgfTtcbmZ1bmN0aW9uIGhhbmRsZVVuaGFuZGxlZEVycm9yKGVycm9yKSB7XG4gICAgaWYgKGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgIGNhcHR1cmVFcnJvcihlcnJvcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXBvcnRVbmhhbmRsZWRFcnJvcihlcnJvcik7XG4gICAgfVxufVxuZnVuY3Rpb24gZGVmYXVsdEVycm9ySGFuZGxlcihlcnIpIHtcbiAgICB0aHJvdyBlcnI7XG59XG5mdW5jdGlvbiBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbiwgc3Vic2NyaWJlcikge1xuICAgIHZhciBvblN0b3BwZWROb3RpZmljYXRpb24gPSBjb25maWcub25TdG9wcGVkTm90aWZpY2F0aW9uO1xuICAgIG9uU3RvcHBlZE5vdGlmaWNhdGlvbiAmJiB0aW1lb3V0UHJvdmlkZXIuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBvblN0b3BwZWROb3RpZmljYXRpb24obm90aWZpY2F0aW9uLCBzdWJzY3JpYmVyKTsgfSk7XG59XG5leHBvcnQgdmFyIEVNUFRZX09CU0VSVkVSID0ge1xuICAgIGNsb3NlZDogdHJ1ZSxcbiAgICBuZXh0OiBub29wLFxuICAgIGVycm9yOiBkZWZhdWx0RXJyb3JIYW5kbGVyLFxuICAgIGNvbXBsZXRlOiBub29wLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YnNjcmliZXIuanMubWFwIiwiZXhwb3J0IHZhciBvYnNlcnZhYmxlID0gKGZ1bmN0aW9uICgpIHsgcmV0dXJuICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5vYnNlcnZhYmxlKSB8fCAnQEBvYnNlcnZhYmxlJzsgfSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmFibGUuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIGlkZW50aXR5KHgpIHtcbiAgICByZXR1cm4geDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlkZW50aXR5LmpzLm1hcCIsImltcG9ydCB7IGlkZW50aXR5IH0gZnJvbSAnLi9pZGVudGl0eSc7XG5leHBvcnQgZnVuY3Rpb24gcGlwZSgpIHtcbiAgICB2YXIgZm5zID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgZm5zW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBwaXBlRnJvbUFycmF5KGZucyk7XG59XG5leHBvcnQgZnVuY3Rpb24gcGlwZUZyb21BcnJheShmbnMpIHtcbiAgICBpZiAoZm5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gaWRlbnRpdHk7XG4gICAgfVxuICAgIGlmIChmbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBmbnNbMF07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiBwaXBlZChpbnB1dCkge1xuICAgICAgICByZXR1cm4gZm5zLnJlZHVjZShmdW5jdGlvbiAocHJldiwgZm4pIHsgcmV0dXJuIGZuKHByZXYpOyB9LCBpbnB1dCk7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBpcGUuanMubWFwIiwiaW1wb3J0IHsgU2FmZVN1YnNjcmliZXIsIFN1YnNjcmliZXIgfSBmcm9tICcuL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgaXNTdWJzY3JpcHRpb24gfSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBvYnNlcnZhYmxlIGFzIFN5bWJvbF9vYnNlcnZhYmxlIH0gZnJvbSAnLi9zeW1ib2wvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBwaXBlRnJvbUFycmF5IH0gZnJvbSAnLi91dGlsL3BpcGUnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IGVycm9yQ29udGV4dCB9IGZyb20gJy4vdXRpbC9lcnJvckNvbnRleHQnO1xudmFyIE9ic2VydmFibGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGUoc3Vic2NyaWJlKSB7XG4gICAgICAgIGlmIChzdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5saWZ0ID0gZnVuY3Rpb24gKG9wZXJhdG9yKSB7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zb3VyY2UgPSB0aGlzO1xuICAgICAgICBvYnNlcnZhYmxlLm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHN1YnNjcmliZXIgPSBpc1N1YnNjcmliZXIob2JzZXJ2ZXJPck5leHQpID8gb2JzZXJ2ZXJPck5leHQgOiBuZXcgU2FmZVN1YnNjcmliZXIob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgICAgIGVycm9yQ29udGV4dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2EgPSBfdGhpcywgb3BlcmF0b3IgPSBfYS5vcGVyYXRvciwgc291cmNlID0gX2Euc291cmNlO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5hZGQob3BlcmF0b3JcbiAgICAgICAgICAgICAgICA/XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yLmNhbGwoc3Vic2NyaWJlciwgc291cmNlKVxuICAgICAgICAgICAgICAgIDogc291cmNlXG4gICAgICAgICAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9zdWJzY3JpYmUoc3Vic2NyaWJlcilcbiAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3RyeVN1YnNjcmliZShzdWJzY3JpYmVyKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3Vic2NyaWJlcjtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLl90cnlTdWJzY3JpYmUgPSBmdW5jdGlvbiAoc2luaykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1YnNjcmliZShzaW5rKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBzaW5rLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAobmV4dCwgcHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcHJvbWlzZUN0b3IgPSBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcik7XG4gICAgICAgIHJldHVybiBuZXcgcHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHN1YnNjcmliZXIgPSBuZXcgU2FmZVN1YnNjcmliZXIoe1xuICAgICAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiByZWplY3QsXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IHJlc29sdmUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKF9hID0gdGhpcy5zb3VyY2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZVtTeW1ib2xfb2JzZXJ2YWJsZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9wZXJhdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIG9wZXJhdGlvbnNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGlwZUZyb21BcnJheShvcGVyYXRpb25zKSh0aGlzKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnRvUHJvbWlzZSA9IGZ1bmN0aW9uIChwcm9taXNlQ3Rvcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBwcm9taXNlQ3RvciA9IGdldFByb21pc2VDdG9yKHByb21pc2VDdG9yKTtcbiAgICAgICAgcmV0dXJuIG5ldyBwcm9taXNlQ3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICBfdGhpcy5zdWJzY3JpYmUoZnVuY3Rpb24gKHgpIHsgcmV0dXJuICh2YWx1ZSA9IHgpOyB9LCBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiByZWplY3QoZXJyKTsgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVzb2x2ZSh2YWx1ZSk7IH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUuY3JlYXRlID0gZnVuY3Rpb24gKHN1YnNjcmliZSkge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlKTtcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlO1xufSgpKTtcbmV4cG9ydCB7IE9ic2VydmFibGUgfTtcbmZ1bmN0aW9uIGdldFByb21pc2VDdG9yKHByb21pc2VDdG9yKSB7XG4gICAgdmFyIF9hO1xuICAgIHJldHVybiAoX2EgPSBwcm9taXNlQ3RvciAhPT0gbnVsbCAmJiBwcm9taXNlQ3RvciAhPT0gdm9pZCAwID8gcHJvbWlzZUN0b3IgOiBjb25maWcuUHJvbWlzZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogUHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGlzT2JzZXJ2ZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgaXNGdW5jdGlvbih2YWx1ZS5uZXh0KSAmJiBpc0Z1bmN0aW9uKHZhbHVlLmVycm9yKSAmJiBpc0Z1bmN0aW9uKHZhbHVlLmNvbXBsZXRlKTtcbn1cbmZ1bmN0aW9uIGlzU3Vic2NyaWJlcih2YWx1ZSkge1xuICAgIHJldHVybiAodmFsdWUgJiYgdmFsdWUgaW5zdGFuY2VvZiBTdWJzY3JpYmVyKSB8fCAoaXNPYnNlcnZlcih2YWx1ZSkgJiYgaXNTdWJzY3JpcHRpb24odmFsdWUpKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9ic2VydmFibGUuanMubWFwIiwiaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vaXNGdW5jdGlvbic7XG5leHBvcnQgZnVuY3Rpb24gaGFzTGlmdChzb3VyY2UpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbihzb3VyY2UgPT09IG51bGwgfHwgc291cmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzb3VyY2UubGlmdCk7XG59XG5leHBvcnQgZnVuY3Rpb24gb3BlcmF0ZShpbml0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgaWYgKGhhc0xpZnQoc291cmNlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS5saWZ0KGZ1bmN0aW9uIChsaWZ0ZWRTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5pdChsaWZ0ZWRTb3VyY2UsIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmFibGUgdG8gbGlmdCB1bmtub3duIE9ic2VydmFibGUgdHlwZScpO1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saWZ0LmpzLm1hcCIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgb25OZXh0LCBvbkNvbXBsZXRlLCBvbkVycm9yLCBvbkZpbmFsaXplKSB7XG4gICAgcmV0dXJuIG5ldyBPcGVyYXRvclN1YnNjcmliZXIoZGVzdGluYXRpb24sIG9uTmV4dCwgb25Db21wbGV0ZSwgb25FcnJvciwgb25GaW5hbGl6ZSk7XG59XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoT3BlcmF0b3JTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE9wZXJhdG9yU3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgb25OZXh0LCBvbkNvbXBsZXRlLCBvbkVycm9yLCBvbkZpbmFsaXplLCBzaG91bGRVbnN1YnNjcmliZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbikgfHwgdGhpcztcbiAgICAgICAgX3RoaXMub25GaW5hbGl6ZSA9IG9uRmluYWxpemU7XG4gICAgICAgIF90aGlzLnNob3VsZFVuc3Vic2NyaWJlID0gc2hvdWxkVW5zdWJzY3JpYmU7XG4gICAgICAgIF90aGlzLl9uZXh0ID0gb25OZXh0XG4gICAgICAgICAgICA/IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG9uTmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IF9zdXBlci5wcm90b3R5cGUuX25leHQ7XG4gICAgICAgIF90aGlzLl9lcnJvciA9IG9uRXJyb3JcbiAgICAgICAgICAgID8gZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogX3N1cGVyLnByb3RvdHlwZS5fZXJyb3I7XG4gICAgICAgIF90aGlzLl9jb21wbGV0ZSA9IG9uQ29tcGxldGVcbiAgICAgICAgICAgID8gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogX3N1cGVyLnByb3RvdHlwZS5fY29tcGxldGU7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT3BlcmF0b3JTdWJzY3JpYmVyLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoIXRoaXMuc2hvdWxkVW5zdWJzY3JpYmUgfHwgdGhpcy5zaG91bGRVbnN1YnNjcmliZSgpKSB7XG4gICAgICAgICAgICB2YXIgY2xvc2VkXzEgPSB0aGlzLmNsb3NlZDtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUudW5zdWJzY3JpYmUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICFjbG9zZWRfMSAmJiAoKF9hID0gdGhpcy5vbkZpbmFsaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPcGVyYXRvclN1YnNjcmliZXI7XG59KFN1YnNjcmliZXIpKTtcbmV4cG9ydCB7IE9wZXJhdG9yU3Vic2NyaWJlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T3BlcmF0b3JTdWJzY3JpYmVyLmpzLm1hcCIsImltcG9ydCB7IGNyZWF0ZUVycm9yQ2xhc3MgfSBmcm9tICcuL2NyZWF0ZUVycm9yQ2xhc3MnO1xuZXhwb3J0IHZhciBPYmplY3RVbnN1YnNjcmliZWRFcnJvciA9IGNyZWF0ZUVycm9yQ2xhc3MoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBPYmplY3RVbnN1YnNjcmliZWRFcnJvckltcGwoKSB7XG4gICAgICAgIF9zdXBlcih0aGlzKTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ09iamVjdFVuc3Vic2NyaWJlZEVycm9yJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ29iamVjdCB1bnN1YnNjcmliZWQnO1xuICAgIH07XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9iamVjdFVuc3Vic2NyaWJlZEVycm9yLmpzLm1hcCIsImltcG9ydCB7IF9fZXh0ZW5kcywgX192YWx1ZXMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBFTVBUWV9TVUJTQ1JJUFRJT04gfSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBPYmplY3RVbnN1YnNjcmliZWRFcnJvciB9IGZyb20gJy4vdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvcic7XG5pbXBvcnQgeyBhcnJSZW1vdmUgfSBmcm9tICcuL3V0aWwvYXJyUmVtb3ZlJztcbmltcG9ydCB7IGVycm9yQ29udGV4dCB9IGZyb20gJy4vdXRpbC9lcnJvckNvbnRleHQnO1xudmFyIFN1YmplY3QgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdWJqZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN1YmplY3QoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5jdXJyZW50T2JzZXJ2ZXJzID0gbnVsbDtcbiAgICAgICAgX3RoaXMub2JzZXJ2ZXJzID0gW107XG4gICAgICAgIF90aGlzLmlzU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5oYXNFcnJvciA9IGZhbHNlO1xuICAgICAgICBfdGhpcy50aHJvd25FcnJvciA9IG51bGw7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU3ViamVjdC5wcm90b3R5cGUubGlmdCA9IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgICAgICB2YXIgc3ViamVjdCA9IG5ldyBBbm9ueW1vdXNTdWJqZWN0KHRoaXMsIHRoaXMpO1xuICAgICAgICBzdWJqZWN0Lm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICAgIHJldHVybiBzdWJqZWN0O1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX3Rocm93SWZDbG9zZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgZXJyb3JDb250ZXh0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICAgICAgX3RoaXMuX3Rocm93SWZDbG9zZWQoKTtcbiAgICAgICAgICAgIGlmICghX3RoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5jdXJyZW50T2JzZXJ2ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmN1cnJlbnRPYnNlcnZlcnMgPSBBcnJheS5mcm9tKF90aGlzLm9ic2VydmVycyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXMoX3RoaXMuY3VycmVudE9ic2VydmVycyksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYnNlcnZlciA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBlcnJvckNvbnRleHQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX3Rocm93SWZDbG9zZWQoKTtcbiAgICAgICAgICAgIGlmICghX3RoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGFzRXJyb3IgPSBfdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIF90aGlzLnRocm93bkVycm9yID0gZXJyO1xuICAgICAgICAgICAgICAgIHZhciBvYnNlcnZlcnMgPSBfdGhpcy5vYnNlcnZlcnM7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXJzLnNoaWZ0KCkuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGVycm9yQ29udGV4dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fdGhyb3dJZkNsb3NlZCgpO1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBvYnNlcnZlcnMgPSBfdGhpcy5vYnNlcnZlcnM7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXJzLnNoaWZ0KCkuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm9ic2VydmVycyA9IHRoaXMuY3VycmVudE9ic2VydmVycyA9IG51bGw7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3ViamVjdC5wcm90b3R5cGUsIFwib2JzZXJ2ZWRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHJldHVybiAoKF9hID0gdGhpcy5vYnNlcnZlcnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFN1YmplY3QucHJvdG90eXBlLl90cnlTdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB0aGlzLl90aHJvd0lmQ2xvc2VkKCk7XG4gICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLl90cnlTdWJzY3JpYmUuY2FsbCh0aGlzLCBzdWJzY3JpYmVyKTtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB0aGlzLl90aHJvd0lmQ2xvc2VkKCk7XG4gICAgICAgIHRoaXMuX2NoZWNrRmluYWxpemVkU3RhdHVzZXMoc3Vic2NyaWJlcik7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbm5lclN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLl9pbm5lclN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIGhhc0Vycm9yID0gX2EuaGFzRXJyb3IsIGlzU3RvcHBlZCA9IF9hLmlzU3RvcHBlZCwgb2JzZXJ2ZXJzID0gX2Eub2JzZXJ2ZXJzO1xuICAgICAgICBpZiAoaGFzRXJyb3IgfHwgaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gRU1QVFlfU1VCU0NSSVBUSU9OO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudE9ic2VydmVycyA9IG51bGw7XG4gICAgICAgIG9ic2VydmVycy5wdXNoKHN1YnNjcmliZXIpO1xuICAgICAgICByZXR1cm4gbmV3IFN1YnNjcmlwdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5jdXJyZW50T2JzZXJ2ZXJzID0gbnVsbDtcbiAgICAgICAgICAgIGFyclJlbW92ZShvYnNlcnZlcnMsIHN1YnNjcmliZXIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLl9jaGVja0ZpbmFsaXplZFN0YXR1c2VzID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgaGFzRXJyb3IgPSBfYS5oYXNFcnJvciwgdGhyb3duRXJyb3IgPSBfYS50aHJvd25FcnJvciwgaXNTdG9wcGVkID0gX2EuaXNTdG9wcGVkO1xuICAgICAgICBpZiAoaGFzRXJyb3IpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IodGhyb3duRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzU3RvcHBlZCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5hc09ic2VydmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zb3VyY2UgPSB0aGlzO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9O1xuICAgIFN1YmplY3QuY3JlYXRlID0gZnVuY3Rpb24gKGRlc3RpbmF0aW9uLCBzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBbm9ueW1vdXNTdWJqZWN0KGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuICAgIH07XG4gICAgcmV0dXJuIFN1YmplY3Q7XG59KE9ic2VydmFibGUpKTtcbmV4cG9ydCB7IFN1YmplY3QgfTtcbnZhciBBbm9ueW1vdXNTdWJqZWN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQW5vbnltb3VzU3ViamVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBbm9ueW1vdXNTdWJqZWN0KGRlc3RpbmF0aW9uLCBzb3VyY2UpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgX3RoaXMuc291cmNlID0gc291cmNlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgKF9iID0gKF9hID0gdGhpcy5kZXN0aW5hdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5leHQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBBbm9ueW1vdXNTdWJqZWN0LnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgKF9iID0gKF9hID0gdGhpcy5kZXN0aW5hdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmVycm9yKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbChfYSwgZXJyKTtcbiAgICB9O1xuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAoX2IgPSAoX2EgPSB0aGlzLmRlc3RpbmF0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29tcGxldGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hKTtcbiAgICB9O1xuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICByZXR1cm4gKF9iID0gKF9hID0gdGhpcy5zb3VyY2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zdWJzY3JpYmUoc3Vic2NyaWJlcikpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IEVNUFRZX1NVQlNDUklQVElPTjtcbiAgICB9O1xuICAgIHJldHVybiBBbm9ueW1vdXNTdWJqZWN0O1xufShTdWJqZWN0KSk7XG5leHBvcnQgeyBBbm9ueW1vdXNTdWJqZWN0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJqZWN0LmpzLm1hcCIsImltcG9ydCB7IG9wZXJhdGUgfSBmcm9tICcuLi91dGlsL2xpZnQnO1xuaW1wb3J0IHsgY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyIH0gZnJvbSAnLi9PcGVyYXRvclN1YnNjcmliZXInO1xuZXhwb3J0IGZ1bmN0aW9uIG1hcChwcm9qZWN0LCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIG9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChwcm9qZWN0LmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4KyspKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcHJvamVjdCByb290IGZvciBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcblxyXG4vLyBHZW5lcmF0ZWQgVHlwZVNjcmlwdCBpbnRlcmZhY2VzIGFuZCB0eXBlcy5cclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBLZXJuZWwgQ29tbWFuZHNcclxuXHJcbmV4cG9ydCBjb25zdCBBZGRQYWNrYWdlVHlwZSA9IFwiQWRkUGFja2FnZVwiO1xyXG5leHBvcnQgY29uc3QgQ2FuY2VsVHlwZSA9IFwiQ2FuY2VsXCI7XHJcbmV4cG9ydCBjb25zdCBDaGFuZ2VXb3JraW5nRGlyZWN0b3J5VHlwZSA9IFwiQ2hhbmdlV29ya2luZ0RpcmVjdG9yeVwiO1xyXG5leHBvcnQgY29uc3QgQ29tcGlsZVByb2plY3RUeXBlID0gXCJDb21waWxlUHJvamVjdFwiO1xyXG5leHBvcnQgY29uc3QgRGlzcGxheUVycm9yVHlwZSA9IFwiRGlzcGxheUVycm9yXCI7XHJcbmV4cG9ydCBjb25zdCBEaXNwbGF5VmFsdWVUeXBlID0gXCJEaXNwbGF5VmFsdWVcIjtcclxuZXhwb3J0IGNvbnN0IE9wZW5Eb2N1bWVudFR5cGUgPSBcIk9wZW5Eb2N1bWVudFwiO1xyXG5leHBvcnQgY29uc3QgT3BlblByb2plY3RUeXBlID0gXCJPcGVuUHJvamVjdFwiO1xyXG5leHBvcnQgY29uc3QgUXVpdFR5cGUgPSBcIlF1aXRcIjtcclxuZXhwb3J0IGNvbnN0IFJlcXVlc3RDb21wbGV0aW9uc1R5cGUgPSBcIlJlcXVlc3RDb21wbGV0aW9uc1wiO1xyXG5leHBvcnQgY29uc3QgUmVxdWVzdERpYWdub3N0aWNzVHlwZSA9IFwiUmVxdWVzdERpYWdub3N0aWNzXCI7XHJcbmV4cG9ydCBjb25zdCBSZXF1ZXN0SG92ZXJUZXh0VHlwZSA9IFwiUmVxdWVzdEhvdmVyVGV4dFwiO1xyXG5leHBvcnQgY29uc3QgUmVxdWVzdElucHV0VHlwZSA9IFwiUmVxdWVzdElucHV0XCI7XHJcbmV4cG9ydCBjb25zdCBSZXF1ZXN0S2VybmVsSW5mb1R5cGUgPSBcIlJlcXVlc3RLZXJuZWxJbmZvXCI7XHJcbmV4cG9ydCBjb25zdCBSZXF1ZXN0U2lnbmF0dXJlSGVscFR5cGUgPSBcIlJlcXVlc3RTaWduYXR1cmVIZWxwXCI7XHJcbmV4cG9ydCBjb25zdCBSZXF1ZXN0VmFsdWVUeXBlID0gXCJSZXF1ZXN0VmFsdWVcIjtcclxuZXhwb3J0IGNvbnN0IFJlcXVlc3RWYWx1ZUluZm9zVHlwZSA9IFwiUmVxdWVzdFZhbHVlSW5mb3NcIjtcclxuZXhwb3J0IGNvbnN0IFNlbmRFZGl0YWJsZUNvZGVUeXBlID0gXCJTZW5kRWRpdGFibGVDb2RlXCI7XHJcbmV4cG9ydCBjb25zdCBTdWJtaXRDb2RlVHlwZSA9IFwiU3VibWl0Q29kZVwiO1xyXG5leHBvcnQgY29uc3QgVXBkYXRlRGlzcGxheWVkVmFsdWVUeXBlID0gXCJVcGRhdGVEaXNwbGF5ZWRWYWx1ZVwiO1xyXG5cclxuZXhwb3J0IHR5cGUgS2VybmVsQ29tbWFuZFR5cGUgPVxyXG4gICAgICB0eXBlb2YgQWRkUGFja2FnZVR5cGVcclxuICAgIHwgdHlwZW9mIENhbmNlbFR5cGVcclxuICAgIHwgdHlwZW9mIENoYW5nZVdvcmtpbmdEaXJlY3RvcnlUeXBlXHJcbiAgICB8IHR5cGVvZiBDb21waWxlUHJvamVjdFR5cGVcclxuICAgIHwgdHlwZW9mIERpc3BsYXlFcnJvclR5cGVcclxuICAgIHwgdHlwZW9mIERpc3BsYXlWYWx1ZVR5cGVcclxuICAgIHwgdHlwZW9mIE9wZW5Eb2N1bWVudFR5cGVcclxuICAgIHwgdHlwZW9mIE9wZW5Qcm9qZWN0VHlwZVxyXG4gICAgfCB0eXBlb2YgUXVpdFR5cGVcclxuICAgIHwgdHlwZW9mIFJlcXVlc3RDb21wbGV0aW9uc1R5cGVcclxuICAgIHwgdHlwZW9mIFJlcXVlc3REaWFnbm9zdGljc1R5cGVcclxuICAgIHwgdHlwZW9mIFJlcXVlc3RIb3ZlclRleHRUeXBlXHJcbiAgICB8IHR5cGVvZiBSZXF1ZXN0SW5wdXRUeXBlXHJcbiAgICB8IHR5cGVvZiBSZXF1ZXN0S2VybmVsSW5mb1R5cGVcclxuICAgIHwgdHlwZW9mIFJlcXVlc3RTaWduYXR1cmVIZWxwVHlwZVxyXG4gICAgfCB0eXBlb2YgUmVxdWVzdFZhbHVlVHlwZVxyXG4gICAgfCB0eXBlb2YgUmVxdWVzdFZhbHVlSW5mb3NUeXBlXHJcbiAgICB8IHR5cGVvZiBTZW5kRWRpdGFibGVDb2RlVHlwZVxyXG4gICAgfCB0eXBlb2YgU3VibWl0Q29kZVR5cGVcclxuICAgIHwgdHlwZW9mIFVwZGF0ZURpc3BsYXllZFZhbHVlVHlwZTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQWRkUGFja2FnZSBleHRlbmRzIEtlcm5lbENvbW1hbmQge1xyXG4gICAgcGFja2FnZVJlZmVyZW5jZTogUGFja2FnZVJlZmVyZW5jZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBLZXJuZWxDb21tYW5kIHtcclxuICAgIHRhcmdldEtlcm5lbE5hbWU/OiBzdHJpbmc7XHJcbiAgICBvcmlnaW5Vcmk/OiBzdHJpbmc7XHJcbiAgICBkZXN0aW5hdGlvblVyaT86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDYW5jZWwgZXh0ZW5kcyBLZXJuZWxDb21tYW5kIHtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VXb3JraW5nRGlyZWN0b3J5IGV4dGVuZHMgS2VybmVsQ29tbWFuZCB7XHJcbiAgICB3b3JraW5nRGlyZWN0b3J5OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGlsZVByb2plY3QgZXh0ZW5kcyBLZXJuZWxDb21tYW5kIHtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEaXNwbGF5RXJyb3IgZXh0ZW5kcyBLZXJuZWxDb21tYW5kIHtcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEaXNwbGF5VmFsdWUgZXh0ZW5kcyBLZXJuZWxDb21tYW5kIHtcclxuICAgIGZvcm1hdHRlZFZhbHVlOiBGb3JtYXR0ZWRWYWx1ZTtcclxuICAgIHZhbHVlSWQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPcGVuRG9jdW1lbnQgZXh0ZW5kcyBLZXJuZWxDb21tYW5kIHtcclxuICAgIHJlbGF0aXZlRmlsZVBhdGg6IHN0cmluZztcclxuICAgIHJlZ2lvbk5hbWU/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgT3BlblByb2plY3QgZXh0ZW5kcyBLZXJuZWxDb21tYW5kIHtcclxuICAgIHByb2plY3Q6IFByb2plY3Q7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUXVpdCBleHRlbmRzIEtlcm5lbENvbW1hbmQge1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RDb21wbGV0aW9ucyBleHRlbmRzIExhbmd1YWdlU2VydmljZUNvbW1hbmQge1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExhbmd1YWdlU2VydmljZUNvbW1hbmQgZXh0ZW5kcyBLZXJuZWxDb21tYW5kIHtcclxuICAgIGNvZGU6IHN0cmluZztcclxuICAgIGxpbmVQb3NpdGlvbjogTGluZVBvc2l0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3REaWFnbm9zdGljcyBleHRlbmRzIEtlcm5lbENvbW1hbmQge1xyXG4gICAgY29kZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RIb3ZlclRleHQgZXh0ZW5kcyBMYW5ndWFnZVNlcnZpY2VDb21tYW5kIHtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0SW5wdXQgZXh0ZW5kcyBLZXJuZWxDb21tYW5kIHtcclxuICAgIHByb21wdDogc3RyaW5nO1xyXG4gICAgaXNQYXNzd29yZDogYm9vbGVhbjtcclxuICAgIGlucHV0VHlwZUhpbnQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0S2VybmVsSW5mbyBleHRlbmRzIEtlcm5lbENvbW1hbmQge1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RTaWduYXR1cmVIZWxwIGV4dGVuZHMgTGFuZ3VhZ2VTZXJ2aWNlQ29tbWFuZCB7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFZhbHVlIGV4dGVuZHMgS2VybmVsQ29tbWFuZCB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBtaW1lVHlwZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RWYWx1ZUluZm9zIGV4dGVuZHMgS2VybmVsQ29tbWFuZCB7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2VuZEVkaXRhYmxlQ29kZSBleHRlbmRzIEtlcm5lbENvbW1hbmQge1xyXG4gICAgbGFuZ3VhZ2U6IHN0cmluZztcclxuICAgIGNvZGU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTdWJtaXRDb2RlIGV4dGVuZHMgS2VybmVsQ29tbWFuZCB7XHJcbiAgICBjb2RlOiBzdHJpbmc7XHJcbiAgICBzdWJtaXNzaW9uVHlwZT86IFN1Ym1pc3Npb25UeXBlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZURpc3BsYXllZFZhbHVlIGV4dGVuZHMgS2VybmVsQ29tbWFuZCB7XHJcbiAgICBmb3JtYXR0ZWRWYWx1ZTogRm9ybWF0dGVkVmFsdWU7XHJcbiAgICB2YWx1ZUlkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgS2VybmVsRXZlbnQge1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERpc3BsYXlFbGVtZW50IGV4dGVuZHMgSW50ZXJhY3RpdmVEb2N1bWVudE91dHB1dEVsZW1lbnQge1xyXG4gICAgZGF0YTogeyBba2V5OiBzdHJpbmddOiBhbnk7IH07XHJcbiAgICBtZXRhZGF0YTogeyBba2V5OiBzdHJpbmddOiBhbnk7IH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSW50ZXJhY3RpdmVEb2N1bWVudE91dHB1dEVsZW1lbnQge1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJldHVyblZhbHVlRWxlbWVudCBleHRlbmRzIEludGVyYWN0aXZlRG9jdW1lbnRPdXRwdXRFbGVtZW50IHtcclxuICAgIGRhdGE6IHsgW2tleTogc3RyaW5nXTogYW55OyB9O1xyXG4gICAgZXhlY3V0aW9uT3JkZXI6IG51bWJlcjtcclxuICAgIG1ldGFkYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueTsgfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUZXh0RWxlbWVudCBleHRlbmRzIEludGVyYWN0aXZlRG9jdW1lbnRPdXRwdXRFbGVtZW50IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHRleHQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBFcnJvckVsZW1lbnQgZXh0ZW5kcyBJbnRlcmFjdGl2ZURvY3VtZW50T3V0cHV0RWxlbWVudCB7XHJcbiAgICBlcnJvck5hbWU6IHN0cmluZztcclxuICAgIGVycm9yVmFsdWU6IHN0cmluZztcclxuICAgIHN0YWNrVHJhY2U6IEFycmF5PHN0cmluZz47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm90ZWJvb2tQYXJzZVJlcXVlc3QgZXh0ZW5kcyBOb3RlYm9va1BhcnNlT3JTZXJpYWxpemVSZXF1ZXN0IHtcclxuICAgIHR5cGU6IFJlcXVlc3RUeXBlO1xyXG4gICAgcmF3RGF0YTogVWludDhBcnJheTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOb3RlYm9va1BhcnNlT3JTZXJpYWxpemVSZXF1ZXN0IHtcclxuICAgIHR5cGU6IFJlcXVlc3RUeXBlO1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIHNlcmlhbGl6YXRpb25UeXBlOiBEb2N1bWVudFNlcmlhbGl6YXRpb25UeXBlO1xyXG4gICAgZGVmYXVsdExhbmd1YWdlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm90ZWJvb2tTZXJpYWxpemVSZXF1ZXN0IGV4dGVuZHMgTm90ZWJvb2tQYXJzZU9yU2VyaWFsaXplUmVxdWVzdCB7XHJcbiAgICB0eXBlOiBSZXF1ZXN0VHlwZTtcclxuICAgIG5ld0xpbmU6IHN0cmluZztcclxuICAgIGRvY3VtZW50OiBJbnRlcmFjdGl2ZURvY3VtZW50O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5vdGVib29rUGFyc2VSZXNwb25zZSBleHRlbmRzIE5vdGVib29rUGFyc2VyU2VydmVyUmVzcG9uc2Uge1xyXG4gICAgZG9jdW1lbnQ6IEludGVyYWN0aXZlRG9jdW1lbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm90ZWJvb2tQYXJzZXJTZXJ2ZXJSZXNwb25zZSB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5vdGVib29rU2VyaWFsaXplUmVzcG9uc2UgZXh0ZW5kcyBOb3RlYm9va1BhcnNlclNlcnZlclJlc3BvbnNlIHtcclxuICAgIHJhd0RhdGE6IFVpbnQ4QXJyYXk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm90ZWJvb2tFcnJvclJlc3BvbnNlIGV4dGVuZHMgTm90ZWJvb2tQYXJzZXJTZXJ2ZXJSZXNwb25zZSB7XHJcbiAgICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxufVxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEtlcm5lbCBldmVudHNcclxuXHJcbmV4cG9ydCBjb25zdCBBc3NlbWJseVByb2R1Y2VkVHlwZSA9IFwiQXNzZW1ibHlQcm9kdWNlZFwiO1xyXG5leHBvcnQgY29uc3QgQ29kZVN1Ym1pc3Npb25SZWNlaXZlZFR5cGUgPSBcIkNvZGVTdWJtaXNzaW9uUmVjZWl2ZWRcIjtcclxuZXhwb3J0IGNvbnN0IENvbW1hbmRDYW5jZWxsZWRUeXBlID0gXCJDb21tYW5kQ2FuY2VsbGVkXCI7XHJcbmV4cG9ydCBjb25zdCBDb21tYW5kRmFpbGVkVHlwZSA9IFwiQ29tbWFuZEZhaWxlZFwiO1xyXG5leHBvcnQgY29uc3QgQ29tbWFuZFN1Y2NlZWRlZFR5cGUgPSBcIkNvbW1hbmRTdWNjZWVkZWRcIjtcclxuZXhwb3J0IGNvbnN0IENvbXBsZXRlQ29kZVN1Ym1pc3Npb25SZWNlaXZlZFR5cGUgPSBcIkNvbXBsZXRlQ29kZVN1Ym1pc3Npb25SZWNlaXZlZFwiO1xyXG5leHBvcnQgY29uc3QgQ29tcGxldGlvbnNQcm9kdWNlZFR5cGUgPSBcIkNvbXBsZXRpb25zUHJvZHVjZWRcIjtcclxuZXhwb3J0IGNvbnN0IERpYWdub3N0aWNMb2dFbnRyeVByb2R1Y2VkVHlwZSA9IFwiRGlhZ25vc3RpY0xvZ0VudHJ5UHJvZHVjZWRcIjtcclxuZXhwb3J0IGNvbnN0IERpYWdub3N0aWNzUHJvZHVjZWRUeXBlID0gXCJEaWFnbm9zdGljc1Byb2R1Y2VkXCI7XHJcbmV4cG9ydCBjb25zdCBEaXNwbGF5ZWRWYWx1ZVByb2R1Y2VkVHlwZSA9IFwiRGlzcGxheWVkVmFsdWVQcm9kdWNlZFwiO1xyXG5leHBvcnQgY29uc3QgRGlzcGxheWVkVmFsdWVVcGRhdGVkVHlwZSA9IFwiRGlzcGxheWVkVmFsdWVVcGRhdGVkXCI7XHJcbmV4cG9ydCBjb25zdCBEb2N1bWVudE9wZW5lZFR5cGUgPSBcIkRvY3VtZW50T3BlbmVkXCI7XHJcbmV4cG9ydCBjb25zdCBFcnJvclByb2R1Y2VkVHlwZSA9IFwiRXJyb3JQcm9kdWNlZFwiO1xyXG5leHBvcnQgY29uc3QgSG92ZXJUZXh0UHJvZHVjZWRUeXBlID0gXCJIb3ZlclRleHRQcm9kdWNlZFwiO1xyXG5leHBvcnQgY29uc3QgSW5jb21wbGV0ZUNvZGVTdWJtaXNzaW9uUmVjZWl2ZWRUeXBlID0gXCJJbmNvbXBsZXRlQ29kZVN1Ym1pc3Npb25SZWNlaXZlZFwiO1xyXG5leHBvcnQgY29uc3QgSW5wdXRQcm9kdWNlZFR5cGUgPSBcIklucHV0UHJvZHVjZWRcIjtcclxuZXhwb3J0IGNvbnN0IEtlcm5lbEV4dGVuc2lvbkxvYWRlZFR5cGUgPSBcIktlcm5lbEV4dGVuc2lvbkxvYWRlZFwiO1xyXG5leHBvcnQgY29uc3QgS2VybmVsSW5mb1Byb2R1Y2VkVHlwZSA9IFwiS2VybmVsSW5mb1Byb2R1Y2VkXCI7XHJcbmV4cG9ydCBjb25zdCBLZXJuZWxSZWFkeVR5cGUgPSBcIktlcm5lbFJlYWR5XCI7XHJcbmV4cG9ydCBjb25zdCBQYWNrYWdlQWRkZWRUeXBlID0gXCJQYWNrYWdlQWRkZWRcIjtcclxuZXhwb3J0IGNvbnN0IFByb2plY3RPcGVuZWRUeXBlID0gXCJQcm9qZWN0T3BlbmVkXCI7XHJcbmV4cG9ydCBjb25zdCBSZXR1cm5WYWx1ZVByb2R1Y2VkVHlwZSA9IFwiUmV0dXJuVmFsdWVQcm9kdWNlZFwiO1xyXG5leHBvcnQgY29uc3QgU2lnbmF0dXJlSGVscFByb2R1Y2VkVHlwZSA9IFwiU2lnbmF0dXJlSGVscFByb2R1Y2VkXCI7XHJcbmV4cG9ydCBjb25zdCBTdGFuZGFyZEVycm9yVmFsdWVQcm9kdWNlZFR5cGUgPSBcIlN0YW5kYXJkRXJyb3JWYWx1ZVByb2R1Y2VkXCI7XHJcbmV4cG9ydCBjb25zdCBTdGFuZGFyZE91dHB1dFZhbHVlUHJvZHVjZWRUeXBlID0gXCJTdGFuZGFyZE91dHB1dFZhbHVlUHJvZHVjZWRcIjtcclxuZXhwb3J0IGNvbnN0IFZhbHVlSW5mb3NQcm9kdWNlZFR5cGUgPSBcIlZhbHVlSW5mb3NQcm9kdWNlZFwiO1xyXG5leHBvcnQgY29uc3QgVmFsdWVQcm9kdWNlZFR5cGUgPSBcIlZhbHVlUHJvZHVjZWRcIjtcclxuZXhwb3J0IGNvbnN0IFdvcmtpbmdEaXJlY3RvcnlDaGFuZ2VkVHlwZSA9IFwiV29ya2luZ0RpcmVjdG9yeUNoYW5nZWRcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEtlcm5lbEV2ZW50VHlwZSA9XHJcbiAgICAgIHR5cGVvZiBBc3NlbWJseVByb2R1Y2VkVHlwZVxyXG4gICAgfCB0eXBlb2YgQ29kZVN1Ym1pc3Npb25SZWNlaXZlZFR5cGVcclxuICAgIHwgdHlwZW9mIENvbW1hbmRDYW5jZWxsZWRUeXBlXHJcbiAgICB8IHR5cGVvZiBDb21tYW5kRmFpbGVkVHlwZVxyXG4gICAgfCB0eXBlb2YgQ29tbWFuZFN1Y2NlZWRlZFR5cGVcclxuICAgIHwgdHlwZW9mIENvbXBsZXRlQ29kZVN1Ym1pc3Npb25SZWNlaXZlZFR5cGVcclxuICAgIHwgdHlwZW9mIENvbXBsZXRpb25zUHJvZHVjZWRUeXBlXHJcbiAgICB8IHR5cGVvZiBEaWFnbm9zdGljTG9nRW50cnlQcm9kdWNlZFR5cGVcclxuICAgIHwgdHlwZW9mIERpYWdub3N0aWNzUHJvZHVjZWRUeXBlXHJcbiAgICB8IHR5cGVvZiBEaXNwbGF5ZWRWYWx1ZVByb2R1Y2VkVHlwZVxyXG4gICAgfCB0eXBlb2YgRGlzcGxheWVkVmFsdWVVcGRhdGVkVHlwZVxyXG4gICAgfCB0eXBlb2YgRG9jdW1lbnRPcGVuZWRUeXBlXHJcbiAgICB8IHR5cGVvZiBFcnJvclByb2R1Y2VkVHlwZVxyXG4gICAgfCB0eXBlb2YgSG92ZXJUZXh0UHJvZHVjZWRUeXBlXHJcbiAgICB8IHR5cGVvZiBJbmNvbXBsZXRlQ29kZVN1Ym1pc3Npb25SZWNlaXZlZFR5cGVcclxuICAgIHwgdHlwZW9mIElucHV0UHJvZHVjZWRUeXBlXHJcbiAgICB8IHR5cGVvZiBLZXJuZWxFeHRlbnNpb25Mb2FkZWRUeXBlXHJcbiAgICB8IHR5cGVvZiBLZXJuZWxJbmZvUHJvZHVjZWRUeXBlXHJcbiAgICB8IHR5cGVvZiBLZXJuZWxSZWFkeVR5cGVcclxuICAgIHwgdHlwZW9mIFBhY2thZ2VBZGRlZFR5cGVcclxuICAgIHwgdHlwZW9mIFByb2plY3RPcGVuZWRUeXBlXHJcbiAgICB8IHR5cGVvZiBSZXR1cm5WYWx1ZVByb2R1Y2VkVHlwZVxyXG4gICAgfCB0eXBlb2YgU2lnbmF0dXJlSGVscFByb2R1Y2VkVHlwZVxyXG4gICAgfCB0eXBlb2YgU3RhbmRhcmRFcnJvclZhbHVlUHJvZHVjZWRUeXBlXHJcbiAgICB8IHR5cGVvZiBTdGFuZGFyZE91dHB1dFZhbHVlUHJvZHVjZWRUeXBlXHJcbiAgICB8IHR5cGVvZiBWYWx1ZUluZm9zUHJvZHVjZWRUeXBlXHJcbiAgICB8IHR5cGVvZiBWYWx1ZVByb2R1Y2VkVHlwZVxyXG4gICAgfCB0eXBlb2YgV29ya2luZ0RpcmVjdG9yeUNoYW5nZWRUeXBlO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBc3NlbWJseVByb2R1Y2VkIGV4dGVuZHMgS2VybmVsRXZlbnQge1xyXG4gICAgYXNzZW1ibHk6IEJhc2U2NEVuY29kZWRBc3NlbWJseTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb2RlU3VibWlzc2lvblJlY2VpdmVkIGV4dGVuZHMgS2VybmVsRXZlbnQge1xyXG4gICAgY29kZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbW1hbmRDYW5jZWxsZWQgZXh0ZW5kcyBLZXJuZWxFdmVudCB7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWFuZEZhaWxlZCBleHRlbmRzIEtlcm5lbEV2ZW50IHtcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kU3VjY2VlZGVkIGV4dGVuZHMgS2VybmVsRXZlbnQge1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbXBsZXRlQ29kZVN1Ym1pc3Npb25SZWNlaXZlZCBleHRlbmRzIEtlcm5lbEV2ZW50IHtcclxuICAgIGNvZGU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb21wbGV0aW9uc1Byb2R1Y2VkIGV4dGVuZHMgS2VybmVsRXZlbnQge1xyXG4gICAgbGluZVBvc2l0aW9uU3Bhbj86IExpbmVQb3NpdGlvblNwYW47XHJcbiAgICBjb21wbGV0aW9uczogQXJyYXk8Q29tcGxldGlvbkl0ZW0+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERpYWdub3N0aWNMb2dFbnRyeVByb2R1Y2VkIGV4dGVuZHMgRGlhZ25vc3RpY0V2ZW50IHtcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEaWFnbm9zdGljRXZlbnQgZXh0ZW5kcyBLZXJuZWxFdmVudCB7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGlhZ25vc3RpY3NQcm9kdWNlZCBleHRlbmRzIEtlcm5lbEV2ZW50IHtcclxuICAgIGRpYWdub3N0aWNzOiBBcnJheTxEaWFnbm9zdGljPjtcclxuICAgIGZvcm1hdHRlZERpYWdub3N0aWNzOiBBcnJheTxGb3JtYXR0ZWRWYWx1ZT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGlzcGxheWVkVmFsdWVQcm9kdWNlZCBleHRlbmRzIERpc3BsYXlFdmVudCB7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGlzcGxheUV2ZW50IGV4dGVuZHMgS2VybmVsRXZlbnQge1xyXG4gICAgZm9ybWF0dGVkVmFsdWVzOiBBcnJheTxGb3JtYXR0ZWRWYWx1ZT47XHJcbiAgICB2YWx1ZUlkPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERpc3BsYXllZFZhbHVlVXBkYXRlZCBleHRlbmRzIERpc3BsYXlFdmVudCB7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRG9jdW1lbnRPcGVuZWQgZXh0ZW5kcyBLZXJuZWxFdmVudCB7XHJcbiAgICByZWxhdGl2ZUZpbGVQYXRoOiBzdHJpbmc7XHJcbiAgICByZWdpb25OYW1lPzogc3RyaW5nO1xyXG4gICAgY29udGVudDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEVycm9yUHJvZHVjZWQgZXh0ZW5kcyBEaXNwbGF5RXZlbnQge1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEhvdmVyVGV4dFByb2R1Y2VkIGV4dGVuZHMgS2VybmVsRXZlbnQge1xyXG4gICAgY29udGVudDogQXJyYXk8Rm9ybWF0dGVkVmFsdWU+O1xyXG4gICAgbGluZVBvc2l0aW9uU3Bhbj86IExpbmVQb3NpdGlvblNwYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSW5jb21wbGV0ZUNvZGVTdWJtaXNzaW9uUmVjZWl2ZWQgZXh0ZW5kcyBLZXJuZWxFdmVudCB7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSW5wdXRQcm9kdWNlZCBleHRlbmRzIEtlcm5lbEV2ZW50IHtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgS2VybmVsRXh0ZW5zaW9uTG9hZGVkIGV4dGVuZHMgS2VybmVsRXZlbnQge1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEtlcm5lbEluZm9Qcm9kdWNlZCBleHRlbmRzIEtlcm5lbEV2ZW50IHtcclxuICAgIGtlcm5lbEluZm86IEtlcm5lbEluZm87XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgS2VybmVsUmVhZHkgZXh0ZW5kcyBLZXJuZWxFdmVudCB7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGFja2FnZUFkZGVkIGV4dGVuZHMgS2VybmVsRXZlbnQge1xyXG4gICAgcGFja2FnZVJlZmVyZW5jZTogUmVzb2x2ZWRQYWNrYWdlUmVmZXJlbmNlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFByb2plY3RPcGVuZWQgZXh0ZW5kcyBLZXJuZWxFdmVudCB7XHJcbiAgICBwcm9qZWN0SXRlbXM6IEFycmF5PFByb2plY3RJdGVtPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXR1cm5WYWx1ZVByb2R1Y2VkIGV4dGVuZHMgRGlzcGxheUV2ZW50IHtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTaWduYXR1cmVIZWxwUHJvZHVjZWQgZXh0ZW5kcyBLZXJuZWxFdmVudCB7XHJcbiAgICBzaWduYXR1cmVzOiBBcnJheTxTaWduYXR1cmVJbmZvcm1hdGlvbj47XHJcbiAgICBhY3RpdmVTaWduYXR1cmVJbmRleDogbnVtYmVyO1xyXG4gICAgYWN0aXZlUGFyYW1ldGVySW5kZXg6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTdGFuZGFyZEVycm9yVmFsdWVQcm9kdWNlZCBleHRlbmRzIERpc3BsYXlFdmVudCB7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RhbmRhcmRPdXRwdXRWYWx1ZVByb2R1Y2VkIGV4dGVuZHMgRGlzcGxheUV2ZW50IHtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBWYWx1ZUluZm9zUHJvZHVjZWQgZXh0ZW5kcyBLZXJuZWxFdmVudCB7XHJcbiAgICB2YWx1ZUluZm9zOiBBcnJheTxLZXJuZWxWYWx1ZUluZm8+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFZhbHVlUHJvZHVjZWQgZXh0ZW5kcyBLZXJuZWxFdmVudCB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBmb3JtYXR0ZWRWYWx1ZTogRm9ybWF0dGVkVmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV29ya2luZ0RpcmVjdG9yeUNoYW5nZWQgZXh0ZW5kcyBLZXJuZWxFdmVudCB7XHJcbiAgICB3b3JraW5nRGlyZWN0b3J5OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBSZXF1aXJlZCBUeXBlc1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCYXNlNjRFbmNvZGVkQXNzZW1ibHkge1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb21wbGV0aW9uSXRlbSB7XHJcbiAgICBkaXNwbGF5VGV4dDogc3RyaW5nO1xyXG4gICAga2luZDogc3RyaW5nO1xyXG4gICAgZmlsdGVyVGV4dDogc3RyaW5nO1xyXG4gICAgc29ydFRleHQ6IHN0cmluZztcclxuICAgIGluc2VydFRleHQ6IHN0cmluZztcclxuICAgIGluc2VydFRleHRGb3JtYXQ/OiBJbnNlcnRUZXh0Rm9ybWF0O1xyXG4gICAgZG9jdW1lbnRhdGlvbjogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBJbnNlcnRUZXh0Rm9ybWF0IHtcclxuICAgIFBsYWluVGV4dCA9IFwicGxhaW50ZXh0XCIsXHJcbiAgICBTbmlwcGV0ID0gXCJzbmlwcGV0XCIsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGlhZ25vc3RpYyB7XHJcbiAgICBsaW5lUG9zaXRpb25TcGFuOiBMaW5lUG9zaXRpb25TcGFuO1xyXG4gICAgc2V2ZXJpdHk6IERpYWdub3N0aWNTZXZlcml0eTtcclxuICAgIGNvZGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRGlhZ25vc3RpY1NldmVyaXR5IHtcclxuICAgIEhpZGRlbiA9IFwiaGlkZGVuXCIsXHJcbiAgICBJbmZvID0gXCJpbmZvXCIsXHJcbiAgICBXYXJuaW5nID0gXCJ3YXJuaW5nXCIsXHJcbiAgICBFcnJvciA9IFwiZXJyb3JcIixcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMaW5lUG9zaXRpb25TcGFuIHtcclxuICAgIHN0YXJ0OiBMaW5lUG9zaXRpb247XHJcbiAgICBlbmQ6IExpbmVQb3NpdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMaW5lUG9zaXRpb24ge1xyXG4gICAgbGluZTogbnVtYmVyO1xyXG4gICAgY2hhcmFjdGVyOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIERvY3VtZW50U2VyaWFsaXphdGlvblR5cGUge1xyXG4gICAgRGliID0gXCJkaWJcIixcclxuICAgIElweW5iID0gXCJpcHluYlwiLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1hdHRlZFZhbHVlIHtcclxuICAgIG1pbWVUeXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEludGVyYWN0aXZlRG9jdW1lbnQge1xyXG4gICAgZWxlbWVudHM6IEFycmF5PEludGVyYWN0aXZlRG9jdW1lbnRFbGVtZW50PjtcclxuICAgIG1ldGFkYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueTsgfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJbnRlcmFjdGl2ZURvY3VtZW50RWxlbWVudCB7XHJcbiAgICBpZD86IHN0cmluZztcclxuICAgIGxhbmd1YWdlPzogc3RyaW5nO1xyXG4gICAgY29udGVudHM6IHN0cmluZztcclxuICAgIG91dHB1dHM6IEFycmF5PEludGVyYWN0aXZlRG9jdW1lbnRPdXRwdXRFbGVtZW50PjtcclxuICAgIGV4ZWN1dGlvbk9yZGVyOiBudW1iZXI7XHJcbiAgICBtZXRhZGF0YT86IHsgW2tleTogc3RyaW5nXTogYW55OyB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEtlcm5lbEluZm8ge1xyXG4gICAgYWxpYXNlczogQXJyYXk8c3RyaW5nPjtcclxuICAgIGxhbmd1YWdlTmFtZT86IHN0cmluZztcclxuICAgIGxhbmd1YWdlVmVyc2lvbj86IHN0cmluZztcclxuICAgIGxvY2FsTmFtZTogc3RyaW5nO1xyXG4gICAgdXJpPzogc3RyaW5nO1xyXG4gICAgcmVtb3RlVXJpPzogc3RyaW5nO1xyXG4gICAgc3VwcG9ydGVkS2VybmVsQ29tbWFuZHM6IEFycmF5PEtlcm5lbENvbW1hbmRJbmZvPjtcclxuICAgIHN1cHBvcnRlZERpcmVjdGl2ZXM6IEFycmF5PEtlcm5lbERpcmVjdGl2ZUluZm8+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEtlcm5lbENvbW1hbmRJbmZvIHtcclxuICAgIG5hbWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBLZXJuZWxEaXJlY3RpdmVJbmZvIHtcclxuICAgIG5hbWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBLZXJuZWxWYWx1ZUluZm8ge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgcHJlZmVycmVkTWltZVR5cGVzOiBBcnJheTxzdHJpbmc+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBhY2thZ2VSZWZlcmVuY2Uge1xyXG4gICAgcGFja2FnZU5hbWU6IHN0cmluZztcclxuICAgIHBhY2thZ2VWZXJzaW9uOiBzdHJpbmc7XHJcbiAgICBpc1BhY2thZ2VWZXJzaW9uU3BlY2lmaWVkOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFByb2plY3Qge1xyXG4gICAgZmlsZXM6IEFycmF5PFByb2plY3RGaWxlPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0RmlsZSB7XHJcbiAgICByZWxhdGl2ZUZpbGVQYXRoOiBzdHJpbmc7XHJcbiAgICBjb250ZW50OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdEl0ZW0ge1xyXG4gICAgcmVsYXRpdmVGaWxlUGF0aDogc3RyaW5nO1xyXG4gICAgcmVnaW9uTmFtZXM6IEFycmF5PHN0cmluZz47XHJcbiAgICByZWdpb25zQ29udGVudDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmc7IH07XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFJlcXVlc3RUeXBlIHtcclxuICAgIFBhcnNlID0gXCJwYXJzZVwiLFxyXG4gICAgU2VyaWFsaXplID0gXCJzZXJpYWxpemVcIixcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXNvbHZlZFBhY2thZ2VSZWZlcmVuY2UgZXh0ZW5kcyBQYWNrYWdlUmVmZXJlbmNlIHtcclxuICAgIGFzc2VtYmx5UGF0aHM6IEFycmF5PHN0cmluZz47XHJcbiAgICBwcm9iaW5nUGF0aHM6IEFycmF5PHN0cmluZz47XHJcbiAgICBwYWNrYWdlUm9vdDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNpZ25hdHVyZUluZm9ybWF0aW9uIHtcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBkb2N1bWVudGF0aW9uOiBGb3JtYXR0ZWRWYWx1ZTtcclxuICAgIHBhcmFtZXRlcnM6IEFycmF5PFBhcmFtZXRlckluZm9ybWF0aW9uPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQYXJhbWV0ZXJJbmZvcm1hdGlvbiB7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgZG9jdW1lbnRhdGlvbjogRm9ybWF0dGVkVmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFN1Ym1pc3Npb25UeXBlIHtcclxuICAgIFJ1biA9IFwicnVuXCIsXHJcbiAgICBEaWFnbm9zZSA9IFwiZGlhZ25vc2VcIixcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBLZXJuZWxFdmVudEVudmVsb3BlIHtcclxuICAgIGV2ZW50VHlwZTogS2VybmVsRXZlbnRUeXBlO1xyXG4gICAgZXZlbnQ6IEtlcm5lbEV2ZW50O1xyXG4gICAgY29tbWFuZD86IEtlcm5lbENvbW1hbmRFbnZlbG9wZTtcclxuICAgIHJvdXRpbmdTbGlwPzogc3RyaW5nW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgS2VybmVsQ29tbWFuZEVudmVsb3BlIHtcclxuICAgIHRva2VuPzogc3RyaW5nO1xyXG4gICAgaWQ/OiBzdHJpbmc7XHJcbiAgICBjb21tYW5kVHlwZTogS2VybmVsQ29tbWFuZFR5cGU7XHJcbiAgICBjb21tYW5kOiBLZXJuZWxDb21tYW5kO1xyXG4gICAgcm91dGluZ1NsaXA/OiBzdHJpbmdbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBLZXJuZWxFdmVudEVudmVsb3BlT2JzZXJ2ZXIge1xyXG4gICAgKGV2ZW50RW52ZWxvcGU6IEtlcm5lbEV2ZW50RW52ZWxvcGUpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEtlcm5lbENvbW1hbmRFbnZlbG9wZUhhbmRsZXIge1xyXG4gICAgKGV2ZW50RW52ZWxvcGU6IEtlcm5lbENvbW1hbmRFbnZlbG9wZSk6IFByb21pc2U8dm9pZD47XHJcbn0iLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZUNvbXBsZXRpb25Tb3VyY2U8VD4ob2JqOiBhbnkpOiBvYmogaXMgUHJvbWlzZUNvbXBsZXRpb25Tb3VyY2U8VD4ge1xyXG4gICAgcmV0dXJuIG9iai5wcm9taXNlXHJcbiAgICAgICAgJiYgb2JqLnJlc29sdmVcclxuICAgICAgICAmJiBvYmoucmVqZWN0O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJvbWlzZUNvbXBsZXRpb25Tb3VyY2U8VD4ge1xyXG4gICAgcHJpdmF0ZSBfcmVzb2x2ZTogKHZhbHVlOiBUKSA9PiB2b2lkID0gKCkgPT4geyB9O1xyXG4gICAgcHJpdmF0ZSBfcmVqZWN0OiAocmVhc29uOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7IH07XHJcbiAgICByZWFkb25seSBwcm9taXNlOiBQcm9taXNlPFQ+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZSA9IHJlc29sdmU7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlamVjdCA9IHJlamVjdDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXNvbHZlKHZhbHVlOiBUKSB7XHJcbiAgICAgICAgdGhpcy5fcmVzb2x2ZSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVqZWN0KHJlYXNvbjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fcmVqZWN0KHJlYXNvbik7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcbmltcG9ydCAqIGFzIHJ4anMgZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgdHJ5QWRkVXJpVG9Sb3V0aW5nU2xpcCB9IGZyb20gXCIuL2Nvbm5lY3Rpb25cIjtcclxuaW1wb3J0ICogYXMgY29udHJhY3RzIGZyb20gXCIuL2NvbnRyYWN0c1wiO1xyXG5pbXBvcnQgeyBEaXNwb3NhYmxlIH0gZnJvbSBcIi4vZGlzcG9zYWJsZXNcIjtcclxuaW1wb3J0IHsgZ2V0S2VybmVsVXJpLCBLZXJuZWwgfSBmcm9tIFwiLi9rZXJuZWxcIjtcclxuaW1wb3J0IHsgUHJvbWlzZUNvbXBsZXRpb25Tb3VyY2UgfSBmcm9tIFwiLi9wcm9taXNlQ29tcGxldGlvblNvdXJjZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBLZXJuZWxJbnZvY2F0aW9uQ29udGV4dCBpbXBsZW1lbnRzIERpc3Bvc2FibGUge1xyXG4gICAgcHVibGljIGdldCBwcm9taXNlKCk6IHZvaWQgfCBQcm9taXNlTGlrZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGlvblNvdXJjZS5wcm9taXNlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2N1cnJlbnQ6IEtlcm5lbEludm9jYXRpb25Db250ZXh0IHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb21tYW5kRW52ZWxvcGU6IGNvbnRyYWN0cy5LZXJuZWxDb21tYW5kRW52ZWxvcGU7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jaGlsZENvbW1hbmRzOiBjb250cmFjdHMuS2VybmVsQ29tbWFuZEVudmVsb3BlW10gPSBbXTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2V2ZW50U3ViamVjdDogcnhqcy5TdWJqZWN0PGNvbnRyYWN0cy5LZXJuZWxFdmVudEVudmVsb3BlPiA9IG5ldyByeGpzLlN1YmplY3Q8Y29udHJhY3RzLktlcm5lbEV2ZW50RW52ZWxvcGU+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNDb21wbGV0ZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfaGFuZGxpbmdLZXJuZWw6IEtlcm5lbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgaGFuZGxpbmdLZXJuZWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsaW5nS2VybmVsO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGtlcm5lbEV2ZW50cygpOiByeGpzLk9ic2VydmFibGU8Y29udHJhY3RzLktlcm5lbEV2ZW50RW52ZWxvcGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgc2V0IGhhbmRsaW5nS2VybmVsKHZhbHVlOiBLZXJuZWwgfCBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5faGFuZGxpbmdLZXJuZWwgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbXBsZXRpb25Tb3VyY2UgPSBuZXcgUHJvbWlzZUNvbXBsZXRpb25Tb3VyY2U8dm9pZD4oKTtcclxuICAgIHN0YXRpYyBlc3RhYmxpc2goa2VybmVsQ29tbWFuZEludm9jYXRpb246IGNvbnRyYWN0cy5LZXJuZWxDb21tYW5kRW52ZWxvcGUpOiBLZXJuZWxJbnZvY2F0aW9uQ29udGV4dCB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBLZXJuZWxJbnZvY2F0aW9uQ29udGV4dC5fY3VycmVudDtcclxuICAgICAgICBpZiAoIWN1cnJlbnQgfHwgY3VycmVudC5faXNDb21wbGV0ZSkge1xyXG4gICAgICAgICAgICBLZXJuZWxJbnZvY2F0aW9uQ29udGV4dC5fY3VycmVudCA9IG5ldyBLZXJuZWxJbnZvY2F0aW9uQ29udGV4dChrZXJuZWxDb21tYW5kSW52b2NhdGlvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFhcmVDb21tYW5kc1RoZVNhbWUoa2VybmVsQ29tbWFuZEludm9jYXRpb24sIGN1cnJlbnQuX2NvbW1hbmRFbnZlbG9wZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gY3VycmVudC5fY2hpbGRDb21tYW5kcy5pbmNsdWRlcyhrZXJuZWxDb21tYW5kSW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5fY2hpbGRDb21tYW5kcy5wdXNoKGtlcm5lbENvbW1hbmRJbnZvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkU2xpcCA9IGtlcm5lbENvbW1hbmRJbnZvY2F0aW9uLnJvdXRpbmdTbGlwID8/IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGtlcm5lbENvbW1hbmRJbnZvY2F0aW9uLnJvdXRpbmdTbGlwID0gWy4uLihjdXJyZW50Ll9jb21tYW5kRW52ZWxvcGUucm91dGluZ1NsaXAgPz8gW10pXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHVyaSBvZiBvbGRTbGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeUFkZFVyaVRvUm91dGluZ1NsaXAoa2VybmVsQ29tbWFuZEludm9jYXRpb24sIHVyaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gS2VybmVsSW52b2NhdGlvbkNvbnRleHQuX2N1cnJlbnQhO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgY3VycmVudCgpOiBLZXJuZWxJbnZvY2F0aW9uQ29udGV4dCB8IG51bGwgeyByZXR1cm4gdGhpcy5fY3VycmVudDsgfVxyXG4gICAgZ2V0IGNvbW1hbmQoKTogY29udHJhY3RzLktlcm5lbENvbW1hbmQgeyByZXR1cm4gdGhpcy5fY29tbWFuZEVudmVsb3BlLmNvbW1hbmQ7IH1cclxuICAgIGdldCBjb21tYW5kRW52ZWxvcGUoKTogY29udHJhY3RzLktlcm5lbENvbW1hbmRFbnZlbG9wZSB7IHJldHVybiB0aGlzLl9jb21tYW5kRW52ZWxvcGU7IH1cclxuICAgIGNvbnN0cnVjdG9yKGtlcm5lbENvbW1hbmRJbnZvY2F0aW9uOiBjb250cmFjdHMuS2VybmVsQ29tbWFuZEVudmVsb3BlKSB7XHJcbiAgICAgICAgdGhpcy5fY29tbWFuZEVudmVsb3BlID0ga2VybmVsQ29tbWFuZEludm9jYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgY29tcGxldGUoY29tbWFuZDogY29udHJhY3RzLktlcm5lbENvbW1hbmRFbnZlbG9wZSkge1xyXG4gICAgICAgIGlmIChhcmVDb21tYW5kc1RoZVNhbWUoY29tbWFuZCwgdGhpcy5fY29tbWFuZEVudmVsb3BlKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pc0NvbXBsZXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHN1Y2NlZWRlZDogY29udHJhY3RzLkNvbW1hbmRTdWNjZWVkZWQgPSB7fTtcclxuICAgICAgICAgICAgbGV0IGV2ZW50RW52ZWxvcGU6IGNvbnRyYWN0cy5LZXJuZWxFdmVudEVudmVsb3BlID0ge1xyXG4gICAgICAgICAgICAgICAgY29tbWFuZDogdGhpcy5fY29tbWFuZEVudmVsb3BlLFxyXG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlOiBjb250cmFjdHMuQ29tbWFuZFN1Y2NlZWRlZFR5cGUsXHJcbiAgICAgICAgICAgICAgICBldmVudDogc3VjY2VlZGVkXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxQdWJsaXNoKGV2ZW50RW52ZWxvcGUpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRpb25Tb3VyY2UucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBDIyB2ZXJzaW9uIGhhcyBjb21wbGV0aW9uIGNhbGxiYWNrcyAtIGRvIHdlIG5lZWQgdGhlc2U/XHJcbiAgICAgICAgICAgIC8vIGlmICghX2V2ZW50cy5Jc0Rpc3Bvc2VkKVxyXG4gICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIC8vICAgICBfZXZlbnRzLk9uQ29tcGxldGVkKCk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gdGhpcy5fY2hpbGRDb21tYW5kcy5pbmRleE9mKGNvbW1hbmQpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fY2hpbGRDb21tYW5kc1twb3NdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmYWlsKG1lc3NhZ2U/OiBzdHJpbmcpIHtcclxuICAgICAgICAvLyBUT0RPOlxyXG4gICAgICAgIC8vIFRoZSBDIyBjb2RlIGFjY2VwdHMgYSBtZXNzYWdlIGFuZC9vciBhbiBleGNlcHRpb24uIERvIHdlIG5lZWQgdG8gYWRkIHN1cHBvcnRcclxuICAgICAgICAvLyBmb3IgZXhjZXB0aW9ucz8gKFRoZSBUUyBDb21tYW5kRmFpbGVkIGludGVyZmFjZSBkb2Vzbid0IGhhdmUgYSBwbGFjZSBmb3IgaXQgcmlnaHQgbm93LilcclxuICAgICAgICB0aGlzLl9pc0NvbXBsZXRlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgZmFpbGVkOiBjb250cmFjdHMuQ29tbWFuZEZhaWxlZCA9IHsgbWVzc2FnZTogbWVzc2FnZSA/PyBcIkNvbW1hbmQgRmFpbGVkXCIgfTtcclxuICAgICAgICBsZXQgZXZlbnRFbnZlbG9wZTogY29udHJhY3RzLktlcm5lbEV2ZW50RW52ZWxvcGUgPSB7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IHRoaXMuX2NvbW1hbmRFbnZlbG9wZSxcclxuICAgICAgICAgICAgZXZlbnRUeXBlOiBjb250cmFjdHMuQ29tbWFuZEZhaWxlZFR5cGUsXHJcbiAgICAgICAgICAgIGV2ZW50OiBmYWlsZWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmludGVybmFsUHVibGlzaChldmVudEVudmVsb3BlKTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRpb25Tb3VyY2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1Ymxpc2goa2VybmVsRXZlbnQ6IGNvbnRyYWN0cy5LZXJuZWxFdmVudEVudmVsb3BlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxQdWJsaXNoKGtlcm5lbEV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbnRlcm5hbFB1Ymxpc2goa2VybmVsRXZlbnQ6IGNvbnRyYWN0cy5LZXJuZWxFdmVudEVudmVsb3BlKSB7XHJcbiAgICAgICAgaWYgKCFrZXJuZWxFdmVudC5jb21tYW5kKSB7XHJcbiAgICAgICAgICAgIGtlcm5lbEV2ZW50LmNvbW1hbmQgPSB0aGlzLl9jb21tYW5kRW52ZWxvcGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY29tbWFuZCA9IGtlcm5lbEV2ZW50LmNvbW1hbmQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmhhbmRsaW5nS2VybmVsKSB7XHJcbiAgICAgICAgICAgIHRyeUFkZFVyaVRvUm91dGluZ1NsaXAoa2VybmVsRXZlbnQsIGdldEtlcm5lbFVyaSh0aGlzLmhhbmRsaW5nS2VybmVsKSk7XHJcbiAgICAgICAgICAgIGtlcm5lbEV2ZW50LnJvdXRpbmdTbGlwOy8vP1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBrZXJuZWxFdmVudDsvLz9cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY29tbWFuZEVudmVsb3BlOy8vP1xyXG4gICAgICAgIGlmIChjb21tYW5kID09PSBudWxsIHx8XHJcbiAgICAgICAgICAgIGNvbW1hbmQgPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICBhcmVDb21tYW5kc1RoZVNhbWUoY29tbWFuZCEsIHRoaXMuX2NvbW1hbmRFbnZlbG9wZSkgfHxcclxuICAgICAgICAgICAgdGhpcy5fY2hpbGRDb21tYW5kcy5pbmNsdWRlcyhjb21tYW5kISkpIHtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRTdWJqZWN0Lm5leHQoa2VybmVsRXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc1BhcmVudE9mQ29tbWFuZChjb21tYW5kRW52ZWxvcGU6IGNvbnRyYWN0cy5LZXJuZWxDb21tYW5kRW52ZWxvcGUpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBjaGlsZEZvdW5kID0gdGhpcy5fY2hpbGRDb21tYW5kcy5pbmNsdWRlcyhjb21tYW5kRW52ZWxvcGUpO1xyXG4gICAgICAgIHJldHVybiBjaGlsZEZvdW5kO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGUodGhpcy5fY29tbWFuZEVudmVsb3BlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgS2VybmVsSW52b2NhdGlvbkNvbnRleHQuX2N1cnJlbnQgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXJlQ29tbWFuZHNUaGVTYW1lKGVudmVsb3BlMTogY29udHJhY3RzLktlcm5lbENvbW1hbmRFbnZlbG9wZSwgZW52ZWxvcGUyOiBjb250cmFjdHMuS2VybmVsQ29tbWFuZEVudmVsb3BlKTogYm9vbGVhbiB7XHJcbiAgICBlbnZlbG9wZTE7Ly8/XHJcbiAgICBlbnZlbG9wZTI7Ly8/XHJcbiAgICBlbnZlbG9wZTEgPT09IGVudmVsb3BlMjsvLz9cclxuICAgIHJldHVybiBlbnZlbG9wZTEgPT09IGVudmVsb3BlMlxyXG4gICAgICAgIHx8IChlbnZlbG9wZTE/LmNvbW1hbmRUeXBlID09PSBlbnZlbG9wZTI/LmNvbW1hbmRUeXBlICYmIGVudmVsb3BlMT8udG9rZW4gPT09IGVudmVsb3BlMj8udG9rZW4gJiYgZW52ZWxvcGUxPy5pZCA9PT0gZW52ZWxvcGUyPy5pZCk7XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcbmltcG9ydCB7IEtlcm5lbENvbW1hbmRFbnZlbG9wZSB9IGZyb20gXCIuL2NvbnRyYWN0c1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEd1aWQge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdmFsaWRhdG9yID0gbmV3IFJlZ0V4cChcIl5bYS16MC05XXs4fS1bYS16MC05XXs0fS1bYS16MC05XXs0fS1bYS16MC05XXs0fS1bYS16MC05XXsxMn0kXCIsIFwiaVwiKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEVNUFRZID0gXCIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDBcIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzR3VpZChndWlkOiBhbnkpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gZ3VpZC50b1N0cmluZygpO1xyXG4gICAgICAgIHJldHVybiBndWlkICYmIChndWlkIGluc3RhbmNlb2YgR3VpZCB8fCBHdWlkLnZhbGlkYXRvci50ZXN0KHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKTogR3VpZCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHdWlkKFtHdWlkLmdlbigyKSwgR3VpZC5nZW4oMSksIEd1aWQuZ2VuKDEpLCBHdWlkLmdlbigxKSwgR3VpZC5nZW4oMyldLmpvaW4oXCItXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUVtcHR5KCk6IEd1aWQge1xyXG4gICAgICAgIHJldHVybiBuZXcgR3VpZChcImVtcHR5Z3VpZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBhcnNlKGd1aWQ6IHN0cmluZyk6IEd1aWQge1xyXG4gICAgICAgIHJldHVybiBuZXcgR3VpZChndWlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJhdygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBbR3VpZC5nZW4oMiksIEd1aWQuZ2VuKDEpLCBHdWlkLmdlbigxKSwgR3VpZC5nZW4oMSksIEd1aWQuZ2VuKDMpXS5qb2luKFwiLVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZW4oY291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBvdXQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWJpdHdpc2VcclxuICAgICAgICAgICAgb3V0ICs9ICgoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApIHwgMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbHVlOiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihndWlkOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWd1aWQpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXJndW1lbnQ7IGB2YWx1ZWAgaGFzIG5vIHZhbHVlLlwiKTsgfVxyXG5cclxuICAgICAgICB0aGlzLnZhbHVlID0gR3VpZC5FTVBUWTtcclxuXHJcbiAgICAgICAgaWYgKGd1aWQgJiYgR3VpZC5pc0d1aWQoZ3VpZCkpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGd1aWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlcXVhbHMob3RoZXI6IEd1aWQpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBDb21wYXJpbmcgc3RyaW5nIGB2YWx1ZWAgYWdhaW5zdCBwcm92aWRlZCBgZ3VpZGAgd2lsbCBhdXRvLWNhbGxcclxuICAgICAgICAvLyB0b1N0cmluZyBvbiBgZ3VpZGAgZm9yIGNvbXBhcmlzb25cclxuICAgICAgICByZXR1cm4gR3VpZC5pc0d1aWQob3RoZXIpICYmIHRoaXMudmFsdWUgPT09IG90aGVyLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzRW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgPT09IEd1aWQuRU1QVFk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvSlNPTigpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFRva2VuKGNvbW1hbmRFbnZlbG9wZTogS2VybmVsQ29tbWFuZEVudmVsb3BlKSB7XHJcbiAgICBpZiAoIWNvbW1hbmRFbnZlbG9wZS50b2tlbikge1xyXG4gICAgICAgIGNvbW1hbmRFbnZlbG9wZS50b2tlbiA9IEd1aWQuY3JlYXRlKCkudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVG9rZW5HZW5lcmF0b3Ige1xyXG4gICAgcHJpdmF0ZSBfc2VlZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfY291bnRlcjogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3NlZWQgPSBHdWlkLmNyZWF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5fY291bnRlciA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldE5ld1Rva2VuKCk6IHN0cmluZyB7XHJcbiAgICAgICAgdGhpcy5fY291bnRlcisrO1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLl9zZWVkfTo6JHt0aGlzLl9jb3VudGVyfWA7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcbmV4cG9ydCBlbnVtIExvZ0xldmVsIHtcclxuICAgIEluZm8gPSAwLFxyXG4gICAgV2FybiA9IDEsXHJcbiAgICBFcnJvciA9IDIsXHJcbiAgICBOb25lID0gMyxcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgTG9nRW50cnkgPSB7XHJcbiAgICBsb2dMZXZlbDogTG9nTGV2ZWw7XHJcbiAgICBzb3VyY2U6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dnZXIge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9kZWZhdWx0OiBMb2dnZXIgPSBuZXcgTG9nZ2VyKCdkZWZhdWx0JywgKF9lbnRyeTogTG9nRW50cnkpID0+IHsgfSk7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHNvdXJjZTogc3RyaW5nLCByZWFkb25seSB3cml0ZTogKGVudHJ5OiBMb2dFbnRyeSkgPT4gdm9pZCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbmZvKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMud3JpdGUoeyBsb2dMZXZlbDogTG9nTGV2ZWwuSW5mbywgc291cmNlOiB0aGlzLnNvdXJjZSwgbWVzc2FnZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgd2FybihtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLndyaXRlKHsgbG9nTGV2ZWw6IExvZ0xldmVsLldhcm4sIHNvdXJjZTogdGhpcy5zb3VyY2UsIG1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMud3JpdGUoeyBsb2dMZXZlbDogTG9nTGV2ZWwuRXJyb3IsIHNvdXJjZTogdGhpcy5zb3VyY2UsIG1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjb25maWd1cmUoc291cmNlOiBzdHJpbmcsIHdyaXRlcjogKGVudHJ5OiBMb2dFbnRyeSkgPT4gdm9pZCkge1xyXG4gICAgICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoc291cmNlLCB3cml0ZXIpO1xyXG4gICAgICAgIExvZ2dlci5fZGVmYXVsdCA9IGxvZ2dlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBkZWZhdWx0KCk6IExvZ2dlciB7XHJcbiAgICAgICAgaWYgKExvZ2dlci5fZGVmYXVsdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTG9nZ2VyLl9kZWZhdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBsb2dnZXIgaGFzIGJlZW4gY29uZmlndXJlZCBmb3IgdGhpcyBjb250ZXh0Jyk7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuL2xvZ2dlclwiO1xyXG5pbXBvcnQgeyBQcm9taXNlQ29tcGxldGlvblNvdXJjZSB9IGZyb20gXCIuL3Byb21pc2VDb21wbGV0aW9uU291cmNlXCI7XHJcblxyXG5pbnRlcmZhY2UgU2NoZWR1bGVyT3BlcmF0aW9uPFQ+IHtcclxuICAgIHZhbHVlOiBUO1xyXG4gICAgZXhlY3V0b3I6ICh2YWx1ZTogVCkgPT4gUHJvbWlzZTx2b2lkPjtcclxuICAgIHByb21pc2VDb21wbGV0aW9uU291cmNlOiBQcm9taXNlQ29tcGxldGlvblNvdXJjZTx2b2lkPjtcclxufVxyXG5leHBvcnQgY2xhc3MgS2VybmVsU2NoZWR1bGVyPFQ+IHtcclxuICAgIHByaXZhdGUgX29wZXJhdGlvblF1ZXVlOiBBcnJheTxTY2hlZHVsZXJPcGVyYXRpb248VD4+ID0gW107XHJcbiAgICBwcml2YXRlIF9pbkZsaWdodE9wZXJhdGlvbj86IFNjaGVkdWxlck9wZXJhdGlvbjxUPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FuY2VsQ3VycmVudE9wZXJhdGlvbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pbkZsaWdodE9wZXJhdGlvbj8ucHJvbWlzZUNvbXBsZXRpb25Tb3VyY2UucmVqZWN0KG5ldyBFcnJvcihcIk9wZXJhdGlvbiBjYW5jZWxsZWRcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIHJ1bkFzeW5jKHZhbHVlOiBULCBleGVjdXRvcjogKHZhbHVlOiBUKSA9PiBQcm9taXNlPHZvaWQ+KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3Qgb3BlcmF0aW9uID0ge1xyXG4gICAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgICAgZXhlY3V0b3IsXHJcbiAgICAgICAgICAgIHByb21pc2VDb21wbGV0aW9uU291cmNlOiBuZXcgUHJvbWlzZUNvbXBsZXRpb25Tb3VyY2U8dm9pZD4oKSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5faW5GbGlnaHRPcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmRlZmF1bHQuaW5mbyhga2VybmVsU2NoZWR1bGVyOiBzdGFydGluZyBpbW1lZGlhdGUgZXhlY3V0aW9uIG9mICR7SlNPTi5zdHJpbmdpZnkob3BlcmF0aW9uLnZhbHVlKX1gKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGludm9rZSBpbW1lZGlhdGVseVxyXG4gICAgICAgICAgICByZXR1cm4gb3BlcmF0aW9uLmV4ZWN1dG9yKG9wZXJhdGlvbi52YWx1ZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZGVmYXVsdC5pbmZvKGBrZXJuZWxTY2hlZHVsZXI6IGltbWVkaWF0ZSBleGVjdXRpb24gY29tcGxldGVkOiAke0pTT04uc3RyaW5naWZ5KG9wZXJhdGlvbi52YWx1ZSl9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uLnByb21pc2VDb21wbGV0aW9uU291cmNlLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmRlZmF1bHQuaW5mbyhga2VybmVsU2NoZWR1bGVyOiBpbW1lZGlhdGUgZXhlY3V0aW9uIGZhaWxlZDogJHtKU09OLnN0cmluZ2lmeShlKX0gLSAke0pTT04uc3RyaW5naWZ5KG9wZXJhdGlvbi52YWx1ZSl9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uLnByb21pc2VDb21wbGV0aW9uU291cmNlLnJlamVjdChlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTG9nZ2VyLmRlZmF1bHQuaW5mbyhga2VybmVsU2NoZWR1bGVyOiBzY2hlZHVsaW5nIGV4ZWN1dGlvbiBvZiAke0pTT04uc3RyaW5naWZ5KG9wZXJhdGlvbi52YWx1ZSl9YCk7XHJcbiAgICAgICAgdGhpcy5fb3BlcmF0aW9uUXVldWUucHVzaChvcGVyYXRpb24pO1xyXG4gICAgICAgIGlmICh0aGlzLl9vcGVyYXRpb25RdWV1ZS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5leGVjdXRlTmV4dENvbW1hbmQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvcGVyYXRpb24ucHJvbWlzZUNvbXBsZXRpb25Tb3VyY2UucHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGV4ZWN1dGVOZXh0Q29tbWFuZCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBuZXh0T3BlcmF0aW9uID0gdGhpcy5fb3BlcmF0aW9uUXVldWUubGVuZ3RoID4gMCA/IHRoaXMuX29wZXJhdGlvblF1ZXVlWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmIChuZXh0T3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luRmxpZ2h0T3BlcmF0aW9uID0gbmV4dE9wZXJhdGlvbjtcclxuICAgICAgICAgICAgTG9nZ2VyLmRlZmF1bHQuaW5mbyhga2VybmVsU2NoZWR1bGVyOiBzdGFydGluZyBzY2hlZHVsZWQgZXhlY3V0aW9uIG9mICR7SlNPTi5zdHJpbmdpZnkobmV4dE9wZXJhdGlvbi52YWx1ZSl9YCk7XHJcbiAgICAgICAgICAgIG5leHRPcGVyYXRpb24uZXhlY3V0b3IobmV4dE9wZXJhdGlvbi52YWx1ZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbkZsaWdodE9wZXJhdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZGVmYXVsdC5pbmZvKGBrZXJuZWxTY2hlZHVsZXI6IGNvbXBsZXRpbmcgaW5mbGlnaHQgb3BlcmF0aW9uOiBzdWNjZXNzICR7SlNPTi5zdHJpbmdpZnkobmV4dE9wZXJhdGlvbi52YWx1ZSl9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dE9wZXJhdGlvbi5wcm9taXNlQ29tcGxldGlvblNvdXJjZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luRmxpZ2h0T3BlcmF0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5kZWZhdWx0LmluZm8oYGtlcm5lbFNjaGVkdWxlcjogY29tcGxldGluZyBpbmZsaWdodCBvcGVyYXRpb246IGZhaWx1cmUgJHtKU09OLnN0cmluZ2lmeShlKX0gLSAke0pTT04uc3RyaW5naWZ5KG5leHRPcGVyYXRpb24udmFsdWUpfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRPcGVyYXRpb24ucHJvbWlzZUNvbXBsZXRpb25Tb3VyY2UucmVqZWN0KGUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcGVyYXRpb25RdWV1ZS5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0ZU5leHRDb21tYW5kKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcbmltcG9ydCB7IEtlcm5lbEludm9jYXRpb25Db250ZXh0LCBhcmVDb21tYW5kc1RoZVNhbWUgfSBmcm9tIFwiLi9rZXJuZWxJbnZvY2F0aW9uQ29udGV4dFwiO1xyXG5pbXBvcnQgeyBUb2tlbkdlbmVyYXRvciwgR3VpZCB9IGZyb20gXCIuL3Rva2VuR2VuZXJhdG9yXCI7XHJcbmltcG9ydCAqIGFzIGNvbnRyYWN0cyBmcm9tIFwiLi9jb250cmFjdHNcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XHJcbmltcG9ydCB7IENvbXBvc2l0ZUtlcm5lbCB9IGZyb20gXCIuL2NvbXBvc2l0ZUtlcm5lbFwiO1xyXG5pbXBvcnQgeyBLZXJuZWxTY2hlZHVsZXIgfSBmcm9tIFwiLi9rZXJuZWxTY2hlZHVsZXJcIjtcclxuaW1wb3J0IHsgUHJvbWlzZUNvbXBsZXRpb25Tb3VyY2UgfSBmcm9tIFwiLi9wcm9taXNlQ29tcGxldGlvblNvdXJjZVwiO1xyXG5pbXBvcnQgKiBhcyBkaXNwb3NhYmxlcyBmcm9tIFwiLi9kaXNwb3NhYmxlc1wiO1xyXG5pbXBvcnQgeyB0cnlBZGRVcmlUb1JvdXRpbmdTbGlwIH0gZnJvbSBcIi4vY29ubmVjdGlvblwiO1xyXG5pbXBvcnQgKiBhcyByeGpzIGZyb20gXCJyeGpzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElLZXJuZWxDb21tYW5kSW52b2NhdGlvbiB7XHJcbiAgICBjb21tYW5kRW52ZWxvcGU6IGNvbnRyYWN0cy5LZXJuZWxDb21tYW5kRW52ZWxvcGU7XHJcbiAgICBjb250ZXh0OiBLZXJuZWxJbnZvY2F0aW9uQ29udGV4dDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJS2VybmVsQ29tbWFuZEhhbmRsZXIge1xyXG4gICAgY29tbWFuZFR5cGU6IHN0cmluZztcclxuICAgIGhhbmRsZTogKGNvbW1hbmRJbnZvY2F0aW9uOiBJS2VybmVsQ29tbWFuZEludm9jYXRpb24pID0+IFByb21pc2U8dm9pZD47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUtlcm5lbEV2ZW50T2JzZXJ2ZXIge1xyXG4gICAgKGtlcm5lbEV2ZW50OiBjb250cmFjdHMuS2VybmVsRXZlbnRFbnZlbG9wZSk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEtlcm5lbFR5cGUge1xyXG4gICAgY29tcG9zaXRlLFxyXG4gICAgcHJveHksXHJcbiAgICBkZWZhdWx0XHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgS2VybmVsIHtcclxuICAgIHByaXZhdGUgX2tlcm5lbEluZm86IGNvbnRyYWN0cy5LZXJuZWxJbmZvO1xyXG4gICAgcHJpdmF0ZSBfY29tbWFuZEhhbmRsZXJzID0gbmV3IE1hcDxzdHJpbmcsIElLZXJuZWxDb21tYW5kSGFuZGxlcj4oKTtcclxuICAgIHByaXZhdGUgX2V2ZW50U3ViamVjdCA9IG5ldyByeGpzLlN1YmplY3Q8Y29udHJhY3RzLktlcm5lbEV2ZW50RW52ZWxvcGU+KCk7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b2tlbkdlbmVyYXRvcjogVG9rZW5HZW5lcmF0b3IgPSBuZXcgVG9rZW5HZW5lcmF0b3IoKTtcclxuICAgIHB1YmxpYyByb290S2VybmVsOiBLZXJuZWwgPSB0aGlzO1xyXG4gICAgcHVibGljIHBhcmVudEtlcm5lbDogQ29tcG9zaXRlS2VybmVsIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9zY2hlZHVsZXI/OiBLZXJuZWxTY2hlZHVsZXI8Y29udHJhY3RzLktlcm5lbENvbW1hbmRFbnZlbG9wZT4gfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2tlcm5lbFR5cGU6IEtlcm5lbFR5cGUgPSBLZXJuZWxUeXBlLmRlZmF1bHQ7XHJcblxyXG4gICAgcHVibGljIGdldCBrZXJuZWxJbmZvKCk6IGNvbnRyYWN0cy5LZXJuZWxJbmZvIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tlcm5lbEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBrZXJuZWxUeXBlKCk6IEtlcm5lbFR5cGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9rZXJuZWxUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzZXQga2VybmVsVHlwZSh2YWx1ZTogS2VybmVsVHlwZSkge1xyXG4gICAgICAgIHRoaXMuX2tlcm5lbFR5cGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGtlcm5lbEV2ZW50cygpOiByeGpzLk9ic2VydmFibGU8Y29udHJhY3RzLktlcm5lbEV2ZW50RW52ZWxvcGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG5hbWU6IHN0cmluZywgbGFuZ3VhZ2VOYW1lPzogc3RyaW5nLCBsYW5ndWFnZVZlcnNpb24/OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9rZXJuZWxJbmZvID0ge1xyXG4gICAgICAgICAgICBsb2NhbE5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgIGxhbmd1YWdlTmFtZTogbGFuZ3VhZ2VOYW1lLFxyXG4gICAgICAgICAgICBhbGlhc2VzOiBbXSxcclxuICAgICAgICAgICAgbGFuZ3VhZ2VWZXJzaW9uOiBsYW5ndWFnZVZlcnNpb24sXHJcbiAgICAgICAgICAgIHN1cHBvcnRlZERpcmVjdGl2ZXM6IFtdLFxyXG4gICAgICAgICAgICBzdXBwb3J0ZWRLZXJuZWxDb21tYW5kczogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJDb21tYW5kSGFuZGxlcih7XHJcbiAgICAgICAgICAgIGNvbW1hbmRUeXBlOiBjb250cmFjdHMuUmVxdWVzdEtlcm5lbEluZm9UeXBlLCBoYW5kbGU6IGFzeW5jIGludm9jYXRpb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5oYW5kbGVSZXF1ZXN0S2VybmVsSW5mbyhpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhc3luYyBoYW5kbGVSZXF1ZXN0S2VybmVsSW5mbyhpbnZvY2F0aW9uOiBJS2VybmVsQ29tbWFuZEludm9jYXRpb24pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBldmVudEVudmVsb3BlOiBjb250cmFjdHMuS2VybmVsRXZlbnRFbnZlbG9wZSA9IHtcclxuICAgICAgICAgICAgZXZlbnRUeXBlOiBjb250cmFjdHMuS2VybmVsSW5mb1Byb2R1Y2VkVHlwZSxcclxuICAgICAgICAgICAgY29tbWFuZDogaW52b2NhdGlvbi5jb21tYW5kRW52ZWxvcGUsXHJcbiAgICAgICAgICAgIGV2ZW50OiA8Y29udHJhY3RzLktlcm5lbEluZm9Qcm9kdWNlZD57IGtlcm5lbEluZm86IHRoaXMuX2tlcm5lbEluZm8gfVxyXG4gICAgICAgIH07Ly8/XHJcblxyXG4gICAgICAgIGludm9jYXRpb24uY29udGV4dC5wdWJsaXNoKGV2ZW50RW52ZWxvcGUpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNjaGVkdWxlcigpOiBLZXJuZWxTY2hlZHVsZXI8Y29udHJhY3RzLktlcm5lbENvbW1hbmRFbnZlbG9wZT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5fc2NoZWR1bGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlciA9IHRoaXMucGFyZW50S2VybmVsPy5nZXRTY2hlZHVsZXIoKSA/PyBuZXcgS2VybmVsU2NoZWR1bGVyPGNvbnRyYWN0cy5LZXJuZWxDb21tYW5kRW52ZWxvcGU+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NoZWR1bGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZW5zdXJlQ29tbWFuZFRva2VuQW5kSWQoY29tbWFuZEVudmVsb3BlOiBjb250cmFjdHMuS2VybmVsQ29tbWFuZEVudmVsb3BlKSB7XHJcbiAgICAgICAgaWYgKCFjb21tYW5kRW52ZWxvcGUudG9rZW4pIHtcclxuICAgICAgICAgICAgbGV0IG5leHRUb2tlbiA9IHRoaXMuX3Rva2VuR2VuZXJhdG9yLkdldE5ld1Rva2VuKCk7XHJcbiAgICAgICAgICAgIGlmIChLZXJuZWxJbnZvY2F0aW9uQ29udGV4dC5jdXJyZW50Py5jb21tYW5kRW52ZWxvcGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIGEgcGFyZW50IGNvbW1hbmQgZXhpc3RzLCBjcmVhdGUgYSB0b2tlbiBoaWVyYXJjaHlcclxuICAgICAgICAgICAgICAgIG5leHRUb2tlbiA9IEtlcm5lbEludm9jYXRpb25Db250ZXh0LmN1cnJlbnQuY29tbWFuZEVudmVsb3BlLnRva2VuITtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb21tYW5kRW52ZWxvcGUudG9rZW4gPSBuZXh0VG9rZW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWNvbW1hbmRFbnZlbG9wZS5pZCkge1xyXG4gICAgICAgICAgICBjb21tYW5kRW52ZWxvcGUuaWQgPSBHdWlkLmNyZWF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgY3VycmVudCgpOiBLZXJuZWwgfCBudWxsIHtcclxuICAgICAgICBpZiAoS2VybmVsSW52b2NhdGlvbkNvbnRleHQuY3VycmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gS2VybmVsSW52b2NhdGlvbkNvbnRleHQuY3VycmVudC5oYW5kbGluZ0tlcm5lbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCByb290KCk6IEtlcm5lbCB8IG51bGwge1xyXG4gICAgICAgIGlmIChLZXJuZWwuY3VycmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gS2VybmVsLmN1cnJlbnQucm9vdEtlcm5lbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSXMgaXQgd29ydGggdXMgZ29pbmcgdG8gZWZmb3J0cyB0byBlbnN1cmUgdGhhdCB0aGUgUHJvbWlzZSByZXR1cm5lZCBoZXJlIGFjY3VyYXRlbHkgcmVmbGVjdHNcclxuICAgIC8vIHRoZSBjb21tYW5kJ3MgcHJvZ3Jlc3M/IFRoZSBvbmx5IHRoaW5nIHRoYXQgYWN0dWFsbHkgY2FsbHMgdGhpcyBpcyB0aGUga2VybmVsIGNoYW5uZWwsIHRocm91Z2hcclxuICAgIC8vIHRoZSBjYWxsYmFjayBzZXQgdXAgYnkgYXR0YWNoS2VybmVsVG9DaGFubmVsLCBhbmQgdGhlIGNhbGxiYWNrIGlzIGV4cGVjdGVkIHRvIHJldHVybiB2b2lkLCBzb1xyXG4gICAgLy8gbm90aGluZyBpcyBldmVyIGdvaW5nIHRvIGxvb2sgYXQgdGhlIHByb21pc2Ugd2UgcmV0dXJuIGhlcmUuXHJcbiAgICBhc3luYyBzZW5kKGNvbW1hbmRFbnZlbG9wZTogY29udHJhY3RzLktlcm5lbENvbW1hbmRFbnZlbG9wZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlQ29tbWFuZFRva2VuQW5kSWQoY29tbWFuZEVudmVsb3BlKTtcclxuICAgICAgICB0cnlBZGRVcmlUb1JvdXRpbmdTbGlwKGNvbW1hbmRFbnZlbG9wZSwgZ2V0S2VybmVsVXJpKHRoaXMpKTtcclxuICAgICAgICBjb21tYW5kRW52ZWxvcGUucm91dGluZ1NsaXA7Ly8/XHJcbiAgICAgICAgS2VybmVsSW52b2NhdGlvbkNvbnRleHQuZXN0YWJsaXNoKGNvbW1hbmRFbnZlbG9wZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2NoZWR1bGVyKCkucnVuQXN5bmMoY29tbWFuZEVudmVsb3BlLCAodmFsdWUpID0+IHRoaXMuZXhlY3V0ZUNvbW1hbmQodmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGV4ZWN1dGVDb21tYW5kKGNvbW1hbmRFbnZlbG9wZTogY29udHJhY3RzLktlcm5lbENvbW1hbmRFbnZlbG9wZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGxldCBjb250ZXh0ID0gS2VybmVsSW52b2NhdGlvbkNvbnRleHQuZXN0YWJsaXNoKGNvbW1hbmRFbnZlbG9wZSk7XHJcbiAgICAgICAgbGV0IHByZXZpb3VzSGFuZGxpbmdLZXJuZWwgPSBjb250ZXh0LmhhbmRsaW5nS2VybmVsO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZUNvbW1hbmQoY29tbWFuZEVudmVsb3BlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29udGV4dC5mYWlsKCg8YW55PmUpPy5tZXNzYWdlIHx8IEpTT04uc3RyaW5naWZ5KGUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuaGFuZGxpbmdLZXJuZWwgPSBwcmV2aW91c0hhbmRsaW5nS2VybmVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDb21tYW5kSGFuZGxlcihjb21tYW5kVHlwZTogY29udHJhY3RzLktlcm5lbENvbW1hbmRUeXBlKTogSUtlcm5lbENvbW1hbmRIYW5kbGVyIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZEhhbmRsZXJzLmdldChjb21tYW5kVHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ29tbWFuZChjb21tYW5kRW52ZWxvcGU6IGNvbnRyYWN0cy5LZXJuZWxDb21tYW5kRW52ZWxvcGUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IEtlcm5lbEludm9jYXRpb25Db250ZXh0LmVzdGFibGlzaChjb21tYW5kRW52ZWxvcGUpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcHJldmlvdWRIZW5kbGluZ0tlcm5lbCA9IGNvbnRleHQuaGFuZGxpbmdLZXJuZWw7XHJcbiAgICAgICAgICAgIGNvbnRleHQuaGFuZGxpbmdLZXJuZWwgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgaXNSb290Q29tbWFuZCA9IGFyZUNvbW1hbmRzVGhlU2FtZShjb250ZXh0LmNvbW1hbmRFbnZlbG9wZSwgY29tbWFuZEVudmVsb3BlKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBldmVudFN1YnNjcmlwdGlvbjogcnhqcy5TdWJzY3JpcHRpb24gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7Ly8/XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNSb290Q29tbWFuZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lOy8vP1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmRlZmF1bHQuaW5mbyhga2VybmVsICR7dGhpcy5uYW1lfSBvZiB0eXBlICR7S2VybmVsVHlwZVt0aGlzLmtlcm5lbFR5cGVdfSBzdWJzY3JpYmluZyB0byBjb250ZXh0IGV2ZW50c2ApO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRTdWJzY3JpcHRpb24gPSBjb250ZXh0Lmtlcm5lbEV2ZW50cy5waXBlKHJ4anMubWFwKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBga2VybmVsICR7dGhpcy5uYW1lfSBvZiB0eXBlICR7S2VybmVsVHlwZVt0aGlzLmtlcm5lbFR5cGVdfSBzYXcgZXZlbnQgJHtlLmV2ZW50VHlwZX0gd2l0aCB0b2tlbiAke2UuY29tbWFuZD8udG9rZW59YDtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOy8vP1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5kZWZhdWx0LmluZm8obWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5QWRkVXJpVG9Sb3V0aW5nU2xpcChlLCBnZXRLZXJuZWxVcmkodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlO1xyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLnB1Ymxpc2hFdmVudC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGhhbmRsZXIgPSB0aGlzLmdldENvbW1hbmRIYW5kbGVyKGNvbW1hbmRFbnZlbG9wZS5jb21tYW5kVHlwZSk7XHJcbiAgICAgICAgICAgIGlmIChoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5kZWZhdWx0LmluZm8oYGtlcm5lbCAke3RoaXMubmFtZX0gYWJvdXQgdG8gaGFuZGxlIGNvbW1hbmQ6ICR7SlNPTi5zdHJpbmdpZnkoY29tbWFuZEVudmVsb3BlKX1gKTtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBoYW5kbGVyLmhhbmRsZSh7IGNvbW1hbmRFbnZlbG9wZTogY29tbWFuZEVudmVsb3BlLCBjb250ZXh0IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY29tcGxldGUoY29tbWFuZEVudmVsb3BlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmhhbmRsaW5nS2VybmVsID0gcHJldmlvdWRIZW5kbGluZ0tlcm5lbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNSb290Q29tbWFuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudFN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5kZWZhdWx0LmluZm8oYGtlcm5lbCAke3RoaXMubmFtZX0gZG9uZSBoYW5kbGluZyBjb21tYW5kOiAke0pTT04uc3RyaW5naWZ5KGNvbW1hbmRFbnZlbG9wZSl9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZhaWwoKDxhbnk+ZSk/Lm1lc3NhZ2UgfHwgSlNPTi5zdHJpbmdpZnkoZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuaGFuZGxpbmdLZXJuZWwgPSBwcmV2aW91ZEhlbmRsaW5nS2VybmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1Jvb3RDb21tYW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50U3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5oYW5kbGluZ0tlcm5lbCA9IHByZXZpb3VkSGVuZGxpbmdLZXJuZWw7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSb290Q29tbWFuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50U3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgTm8gaGFuZGxlciBmb3VuZCBmb3IgY29tbWFuZCB0eXBlICR7Y29tbWFuZEVudmVsb3BlLmNvbW1hbmRUeXBlfWApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN1YnNjcmliZVRvS2VybmVsRXZlbnRzKG9ic2VydmVyOiBjb250cmFjdHMuS2VybmVsRXZlbnRFbnZlbG9wZU9ic2VydmVyKTogZGlzcG9zYWJsZXMuRGlzcG9zYWJsZVN1YnNjcmlwdGlvbiB7XHJcbiAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5fZXZlbnRTdWJqZWN0LnN1YnNjcmliZShvYnNlcnZlcik7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRpc3Bvc2U6ICgpID0+IHsgc3ViLnVuc3Vic2NyaWJlKCk7IH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjYW5IYW5kbGUoY29tbWFuZEVudmVsb3BlOiBjb250cmFjdHMuS2VybmVsQ29tbWFuZEVudmVsb3BlKSB7XHJcbiAgICAgICAgaWYgKGNvbW1hbmRFbnZlbG9wZS5jb21tYW5kLnRhcmdldEtlcm5lbE5hbWUgJiYgY29tbWFuZEVudmVsb3BlLmNvbW1hbmQudGFyZ2V0S2VybmVsTmFtZSAhPT0gdGhpcy5uYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY29tbWFuZEVudmVsb3BlLmNvbW1hbmQuZGVzdGluYXRpb25VcmkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMua2VybmVsSW5mby51cmkgIT09IGNvbW1hbmRFbnZlbG9wZS5jb21tYW5kLmRlc3RpbmF0aW9uVXJpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnN1cHBvcnRzQ29tbWFuZChjb21tYW5kRW52ZWxvcGUuY29tbWFuZFR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHN1cHBvcnRzQ29tbWFuZChjb21tYW5kVHlwZTogY29udHJhY3RzLktlcm5lbENvbW1hbmRUeXBlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRIYW5kbGVycy5oYXMoY29tbWFuZFR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyQ29tbWFuZEhhbmRsZXIoaGFuZGxlcjogSUtlcm5lbENvbW1hbmRIYW5kbGVyKTogdm9pZCB7XHJcbiAgICAgICAgLy8gV2hlbiBhIHJlZ2lzdHJhdGlvbiBhbHJlYWR5IGV4aXN0ZWQsIHdlIHdhbnQgdG8gb3ZlcndyaXRlIGl0IGJlY2F1c2Ugd2Ugd2FudCB1c2VycyB0b1xyXG4gICAgICAgIC8vIGJlIGFibGUgdG8gZGV2ZWxvcCBoYW5kbGVycyBpdGVyYXRpdmVseSwgYW5kIGl0IHdvdWxkIGJlIHVuaGVscGZ1bCBmb3IgaGFuZGxlciByZWdpc3RyYXRpb25cclxuICAgICAgICAvLyBmb3IgYW55IHBhcnRpY3VsYXIgY29tbWFuZCB0byBiZSBjdW11bGF0aXZlLlxyXG4gICAgICAgIHRoaXMuX2NvbW1hbmRIYW5kbGVycy5zZXQoaGFuZGxlci5jb21tYW5kVHlwZSwgaGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fa2VybmVsSW5mby5zdXBwb3J0ZWRLZXJuZWxDb21tYW5kcyA9IEFycmF5LmZyb20odGhpcy5fY29tbWFuZEhhbmRsZXJzLmtleXMoKSkubWFwKGNvbW1hbmROYW1lID0+ICh7IG5hbWU6IGNvbW1hbmROYW1lIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0SGFuZGxpbmdLZXJuZWwoY29tbWFuZEVudmVsb3BlOiBjb250cmFjdHMuS2VybmVsQ29tbWFuZEVudmVsb3BlLCBjb250ZXh0PzogS2VybmVsSW52b2NhdGlvbkNvbnRleHQgfCBudWxsKTogS2VybmVsIHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FuSGFuZGxlKGNvbW1hbmRFbnZlbG9wZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGV4dD8uZmFpbChgQ29tbWFuZCAke2NvbW1hbmRFbnZlbG9wZS5jb21tYW5kVHlwZX0gaXMgbm90IHN1cHBvcnRlZCBieSBLZXJuZWwgJHt0aGlzLm5hbWV9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcHVibGlzaEV2ZW50KGtlcm5lbEV2ZW50OiBjb250cmFjdHMuS2VybmVsRXZlbnRFbnZlbG9wZSkge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50U3ViamVjdC5uZXh0KGtlcm5lbEV2ZW50KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN1Ym1pdENvbW1hbmRBbmRHZXRSZXN1bHQ8VEV2ZW50IGV4dGVuZHMgY29udHJhY3RzLktlcm5lbEV2ZW50PihrZXJuZWw6IEtlcm5lbCwgY29tbWFuZEVudmVsb3BlOiBjb250cmFjdHMuS2VybmVsQ29tbWFuZEVudmVsb3BlLCBleHBlY3RlZEV2ZW50VHlwZTogY29udHJhY3RzLktlcm5lbEV2ZW50VHlwZSk6IFByb21pc2U8VEV2ZW50PiB7XHJcbiAgICBsZXQgY29tcGxldGlvblNvdXJjZSA9IG5ldyBQcm9taXNlQ29tcGxldGlvblNvdXJjZTxURXZlbnQ+KCk7XHJcbiAgICBsZXQgaGFuZGxlZCA9IGZhbHNlO1xyXG4gICAgbGV0IGRpc3Bvc2FibGUgPSBrZXJuZWwuc3Vic2NyaWJlVG9LZXJuZWxFdmVudHMoZXZlbnRFbnZlbG9wZSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50RW52ZWxvcGUuY29tbWFuZD8udG9rZW4gPT09IGNvbW1hbmRFbnZlbG9wZS50b2tlbikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50RW52ZWxvcGUuZXZlbnRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbnRyYWN0cy5Db21tYW5kRmFpbGVkVHlwZTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWhhbmRsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlcnIgPSA8Y29udHJhY3RzLkNvbW1hbmRGYWlsZWQ+ZXZlbnRFbnZlbG9wZS5ldmVudDsvLz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvblNvdXJjZS5yZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbnRyYWN0cy5Db21tYW5kU3VjY2VlZGVkVHlwZTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJlQ29tbWFuZHNUaGVTYW1lKGV2ZW50RW52ZWxvcGUuY29tbWFuZCEsIGNvbW1hbmRFbnZlbG9wZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgKGV2ZW50RW52ZWxvcGUuY29tbWFuZD8uaWQgPT09IGNvbW1hbmRFbnZlbG9wZS5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoYW5kbGVkKSB7Ly8/ICgkID8gZXZlbnRFbnZlbG9wZSA6IHt9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uU291cmNlLnJlamVjdCgnQ29tbWFuZCB3YXMgaGFuZGxlZCBiZWZvcmUgcmVwb3J0aW5nIGV4cGVjdGVkIHJlc3VsdC4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudEVudmVsb3BlLmV2ZW50VHlwZSA9PT0gZXhwZWN0ZWRFdmVudFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBldmVudCA9IDxURXZlbnQ+ZXZlbnRFbnZlbG9wZS5ldmVudDsvLz8gKCQgPyBldmVudEVudmVsb3BlIDoge30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25Tb3VyY2UucmVzb2x2ZShldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBrZXJuZWwuc2VuZChjb21tYW5kRW52ZWxvcGUpO1xyXG4gICAgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgZGlzcG9zYWJsZS5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbXBsZXRpb25Tb3VyY2UucHJvbWlzZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEtlcm5lbFVyaShrZXJuZWw6IEtlcm5lbCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4ga2VybmVsLmtlcm5lbEluZm8udXJpID8/IGBrZXJuZWw6Ly9sb2NhbC8ke2tlcm5lbC5rZXJuZWxJbmZvLmxvY2FsTmFtZX1gO1xyXG59IiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcbmltcG9ydCAqIGFzIHJ4anMgZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENvbXBvc2l0ZUtlcm5lbCB9IGZyb20gJy4vY29tcG9zaXRlS2VybmVsJztcclxuaW1wb3J0ICogYXMgY29udHJhY3RzIGZyb20gJy4vY29udHJhY3RzJztcclxuaW1wb3J0ICogYXMgZGlzcG9zYWJsZXMgZnJvbSAnLi9kaXNwb3NhYmxlcyc7XHJcbmltcG9ydCB7IERpc3Bvc2FibGUgfSBmcm9tICcuL2Rpc3Bvc2FibGVzJztcclxuaW1wb3J0IHsgS2VybmVsVHlwZSB9IGZyb20gJy4va2VybmVsJztcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInO1xyXG5cclxuZXhwb3J0IHR5cGUgS2VybmVsQ29tbWFuZE9yRXZlbnRFbnZlbG9wZSA9IGNvbnRyYWN0cy5LZXJuZWxDb21tYW5kRW52ZWxvcGUgfCBjb250cmFjdHMuS2VybmVsRXZlbnRFbnZlbG9wZTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0tlcm5lbENvbW1hbmRFbnZlbG9wZShjb21tYW5kT3JFdmVudDogS2VybmVsQ29tbWFuZE9yRXZlbnRFbnZlbG9wZSk6IGNvbW1hbmRPckV2ZW50IGlzIGNvbnRyYWN0cy5LZXJuZWxDb21tYW5kRW52ZWxvcGUge1xyXG4gICAgcmV0dXJuICg8YW55PmNvbW1hbmRPckV2ZW50KS5jb21tYW5kVHlwZSAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNLZXJuZWxFdmVudEVudmVsb3BlKGNvbW1hbmRPckV2ZW50OiBLZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlKTogY29tbWFuZE9yRXZlbnQgaXMgY29udHJhY3RzLktlcm5lbEV2ZW50RW52ZWxvcGUge1xyXG4gICAgcmV0dXJuICg8YW55PmNvbW1hbmRPckV2ZW50KS5ldmVudFR5cGUgIT09IHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJS2VybmVsQ29tbWFuZEFuZEV2ZW50UmVjZWl2ZXIgZXh0ZW5kcyByeGpzLlN1YnNjcmliYWJsZTxLZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlPiB7XHJcblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElLZXJuZWxDb21tYW5kQW5kRXZlbnRTZW5kZXIge1xyXG4gICAgc2VuZChrZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlOiBLZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlKTogUHJvbWlzZTx2b2lkPjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEtlcm5lbENvbW1hbmRBbmRFdmVudFJlY2VpdmVyIGltcGxlbWVudHMgSUtlcm5lbENvbW1hbmRBbmRFdmVudFJlY2VpdmVyIHtcclxuICAgIHByaXZhdGUgX29ic2VydmFibGU6IHJ4anMuU3Vic2NyaWJhYmxlPEtlcm5lbENvbW1hbmRPckV2ZW50RW52ZWxvcGU+O1xyXG4gICAgcHJpdmF0ZSBfZGlzcG9zYWJsZXM6IGRpc3Bvc2FibGVzLkRpc3Bvc2FibGVbXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3Iob2JzZXJ2ZXI6IHJ4anMuT2JzZXJ2YWJsZTxLZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlPikge1xyXG4gICAgICAgIHRoaXMuX29ic2VydmFibGUgPSBvYnNlcnZlcjtcclxuICAgIH1cclxuXHJcbiAgICBzdWJzY3JpYmUob2JzZXJ2ZXI6IFBhcnRpYWw8cnhqcy5PYnNlcnZlcjxLZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlPj4pOiByeGpzLlVuc3Vic2NyaWJhYmxlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb2JzZXJ2YWJsZS5zdWJzY3JpYmUob2JzZXJ2ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGRpc3Bvc2FibGUgb2YgdGhpcy5fZGlzcG9zYWJsZXMpIHtcclxuICAgICAgICAgICAgZGlzcG9zYWJsZS5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgRnJvbU9ic2VydmFibGUob2JzZXJ2YWJsZTogcnhqcy5PYnNlcnZhYmxlPEtlcm5lbENvbW1hbmRPckV2ZW50RW52ZWxvcGU+KTogSUtlcm5lbENvbW1hbmRBbmRFdmVudFJlY2VpdmVyIHtcclxuICAgICAgICByZXR1cm4gbmV3IEtlcm5lbENvbW1hbmRBbmRFdmVudFJlY2VpdmVyKG9ic2VydmFibGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgRnJvbUV2ZW50TGlzdGVuZXIoYXJnczogeyBtYXA6IChkYXRhOiBFdmVudCkgPT4gS2VybmVsQ29tbWFuZE9yRXZlbnRFbnZlbG9wZSwgZXZlbnRUYXJnZXQ6IEV2ZW50VGFyZ2V0LCBldmVudDogc3RyaW5nIH0pOiBJS2VybmVsQ29tbWFuZEFuZEV2ZW50UmVjZWl2ZXIge1xyXG4gICAgICAgIGxldCBzdWJqZWN0ID0gbmV3IHJ4anMuU3ViamVjdDxLZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlPigpO1xyXG4gICAgICAgIGFyZ3MuZXZlbnRUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihhcmdzLmV2ZW50LCAoZTogRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1hcHBlZCA9IGFyZ3MubWFwKGUpO1xyXG4gICAgICAgICAgICBzdWJqZWN0Lm5leHQobWFwcGVkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbmV3IEtlcm5lbENvbW1hbmRBbmRFdmVudFJlY2VpdmVyKHN1YmplY3QpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc09ic2VydmFibGUoc291cmNlOiBhbnkpOiBzb3VyY2UgaXMgcnhqcy5PYnNlcnZlcjxLZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlPiB7XHJcbiAgICByZXR1cm4gKDxhbnk+c291cmNlKS5uZXh0ICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBLZXJuZWxDb21tYW5kQW5kRXZlbnRTZW5kZXIgaW1wbGVtZW50cyBJS2VybmVsQ29tbWFuZEFuZEV2ZW50U2VuZGVyIHtcclxuICAgIHByaXZhdGUgX3NlbmRlcj86IHJ4anMuT2JzZXJ2ZXI8S2VybmVsQ29tbWFuZE9yRXZlbnRFbnZlbG9wZT4gfCAoKGtlcm5lbEV2ZW50RW52ZWxvcGU6IEtlcm5lbENvbW1hbmRPckV2ZW50RW52ZWxvcGUpID0+IHZvaWQpO1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuICAgIHNlbmQoa2VybmVsQ29tbWFuZE9yRXZlbnRFbnZlbG9wZTogS2VybmVsQ29tbWFuZE9yRXZlbnRFbnZlbG9wZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZW5kZXIpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fc2VuZGVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZW5kZXIoa2VybmVsQ29tbWFuZE9yRXZlbnRFbnZlbG9wZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZSh0aGlzLl9zZW5kZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VuZGVyLm5leHQoa2VybmVsQ29tbWFuZE9yRXZlbnRFbnZlbG9wZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJTZW5kZXIgaXMgbm90IHNldFwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlNlbmRlciBpcyBub3Qgc2V0XCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEZyb21PYnNlcnZlcihvYnNlcnZlcjogcnhqcy5PYnNlcnZlcjxLZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlPik6IElLZXJuZWxDb21tYW5kQW5kRXZlbnRTZW5kZXIge1xyXG4gICAgICAgIGNvbnN0IHNlbmRlciA9IG5ldyBLZXJuZWxDb21tYW5kQW5kRXZlbnRTZW5kZXIoKTtcclxuICAgICAgICBzZW5kZXIuX3NlbmRlciA9IG9ic2VydmVyO1xyXG4gICAgICAgIHJldHVybiBzZW5kZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBGcm9tRnVuY3Rpb24oc2VuZDogKGtlcm5lbEV2ZW50RW52ZWxvcGU6IEtlcm5lbENvbW1hbmRPckV2ZW50RW52ZWxvcGUpID0+IHZvaWQpOiBJS2VybmVsQ29tbWFuZEFuZEV2ZW50U2VuZGVyIHtcclxuICAgICAgICBjb25zdCBzZW5kZXIgPSBuZXcgS2VybmVsQ29tbWFuZEFuZEV2ZW50U2VuZGVyKCk7XHJcbiAgICAgICAgc2VuZGVyLl9zZW5kZXIgPSBzZW5kO1xyXG4gICAgICAgIHJldHVybiBzZW5kZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1NldE9mU3RyaW5nKGNvbGxlY3Rpb246IGFueSk6IGNvbGxlY3Rpb24gaXMgU2V0PHN0cmluZz4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZiAoY29sbGVjdGlvbikgIT09IHR5cGVvZiAobmV3IFNldDxzdHJpbmc+KCkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheU9mU3RyaW5nKGNvbGxlY3Rpb246IGFueSk6IGNvbGxlY3Rpb24gaXMgc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikgJiYgY29sbGVjdGlvbi5sZW5ndGggPiAwICYmIHR5cGVvZiAoY29sbGVjdGlvblswXSkgPT09IHR5cGVvZiAoXCJcIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0cnlBZGRVcmlUb1JvdXRpbmdTbGlwKGtlcm5lbENvbW1hbmRPckV2ZW50RW52ZWxvcGU6IEtlcm5lbENvbW1hbmRPckV2ZW50RW52ZWxvcGUsIGtlcm5lbFVyaTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoa2VybmVsQ29tbWFuZE9yRXZlbnRFbnZlbG9wZS5yb3V0aW5nU2xpcCA9PT0gdW5kZWZpbmVkIHx8IGtlcm5lbENvbW1hbmRPckV2ZW50RW52ZWxvcGUucm91dGluZ1NsaXAgPT09IG51bGwpIHtcclxuICAgICAgICBrZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlLnJvdXRpbmdTbGlwID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNhbkFkZCA9ICFrZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlLnJvdXRpbmdTbGlwLmZpbmQoZSA9PiBlID09PSBrZXJuZWxVcmkpO1xyXG4gICAgaWYgKGNhbkFkZCkge1xyXG4gICAgICAgIGtlcm5lbENvbW1hbmRPckV2ZW50RW52ZWxvcGUucm91dGluZ1NsaXAucHVzaChrZXJuZWxVcmkpO1xyXG4gICAgICAgIGtlcm5lbENvbW1hbmRPckV2ZW50RW52ZWxvcGUucm91dGluZ1NsaXA7Ly8/XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNhbkFkZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZU9yVXBkYXRlUHJveHlGb3JLZXJuZWxJbmZvKGtlcm5lbEluZm9Qcm9kdWNlZDogY29udHJhY3RzLktlcm5lbEluZm9Qcm9kdWNlZCwgY29tcG9zaXRlS2VybmVsOiBDb21wb3NpdGVLZXJuZWwpIHtcclxuICAgIGNvbnN0IHVyaVRvTG9va3VwID0ga2VybmVsSW5mb1Byb2R1Y2VkLmtlcm5lbEluZm8ucmVtb3RlVXJpID8/IGtlcm5lbEluZm9Qcm9kdWNlZC5rZXJuZWxJbmZvLnVyaTtcclxuICAgIGlmICh1cmlUb0xvb2t1cCkge1xyXG4gICAgICAgIGxldCBrZXJuZWwgPSBjb21wb3NpdGVLZXJuZWwuZmluZEtlcm5lbEJ5VXJpKHVyaVRvTG9va3VwKTtcclxuICAgICAgICBpZiAoIWtlcm5lbCkge1xyXG4gICAgICAgICAgICAvLyBhZGRcclxuICAgICAgICAgICAgaWYgKGNvbXBvc2l0ZUtlcm5lbC5ob3N0KSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZGVmYXVsdC5pbmZvKGBjcmVhdGluZyBwcm94eSBmb3IgdXJpIFske3VyaVRvTG9va3VwfV0gd2l0aCBpbmZvICR7SlNPTi5zdHJpbmdpZnkoa2VybmVsSW5mb1Byb2R1Y2VkKX1gKTtcclxuICAgICAgICAgICAgICAgIGtlcm5lbCA9IGNvbXBvc2l0ZUtlcm5lbC5ob3N0LmNvbm5lY3RQcm94eUtlcm5lbChrZXJuZWxJbmZvUHJvZHVjZWQua2VybmVsSW5mby5sb2NhbE5hbWUsIHVyaVRvTG9va3VwLCBrZXJuZWxJbmZvUHJvZHVjZWQua2VybmVsSW5mby5hbGlhc2VzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm8ga2VybmVsIGhvc3QgZm91bmQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5kZWZhdWx0LmluZm8oYHBhdGNoaW5nIHByb3h5IGZvciB1cmkgWyR7dXJpVG9Mb29rdXB9XSB3aXRoIGluZm8gJHtKU09OLnN0cmluZ2lmeShrZXJuZWxJbmZvUHJvZHVjZWQpfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGtlcm5lbC5rZXJuZWxUeXBlID09PSBLZXJuZWxUeXBlLnByb3h5KSB7XHJcbiAgICAgICAgICAgIC8vIHBhdGNoXHJcbiAgICAgICAgICAgIHVwZGF0ZUtlcm5lbEluZm8oa2VybmVsLmtlcm5lbEluZm8sIGtlcm5lbEluZm9Qcm9kdWNlZC5rZXJuZWxJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0tlcm5lbEluZm9Gb3JQcm94eShrZXJuZWxJbmZvOiBjb250cmFjdHMuS2VybmVsSW5mbyk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgaGFzVXJpID0gISFrZXJuZWxJbmZvLnVyaTtcclxuICAgIGNvbnN0IGhhc1JlbW90ZVVyaSA9ICEha2VybmVsSW5mby5yZW1vdGVVcmk7XHJcbiAgICByZXR1cm4gaGFzVXJpICYmIGhhc1JlbW90ZVVyaTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUtlcm5lbEluZm8oZGVzdGluYXRpb246IGNvbnRyYWN0cy5LZXJuZWxJbmZvLCBpbmNvbWluZzogY29udHJhY3RzLktlcm5lbEluZm8pIHtcclxuICAgIGRlc3RpbmF0aW9uLmxhbmd1YWdlTmFtZSA9IGluY29taW5nLmxhbmd1YWdlTmFtZSA/PyBkZXN0aW5hdGlvbi5sYW5ndWFnZU5hbWU7XHJcbiAgICBkZXN0aW5hdGlvbi5sYW5ndWFnZVZlcnNpb24gPSBpbmNvbWluZy5sYW5ndWFnZVZlcnNpb24gPz8gZGVzdGluYXRpb24ubGFuZ3VhZ2VWZXJzaW9uO1xyXG5cclxuICAgIGNvbnN0IHN1cHBvcnRlZERpcmVjdGl2ZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICAgIGNvbnN0IHN1cHBvcnRlZENvbW1hbmRzID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcblxyXG4gICAgaWYgKCFkZXN0aW5hdGlvbi5zdXBwb3J0ZWREaXJlY3RpdmVzKSB7XHJcbiAgICAgICAgZGVzdGluYXRpb24uc3VwcG9ydGVkRGlyZWN0aXZlcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghZGVzdGluYXRpb24uc3VwcG9ydGVkS2VybmVsQ29tbWFuZHMpIHtcclxuICAgICAgICBkZXN0aW5hdGlvbi5zdXBwb3J0ZWRLZXJuZWxDb21tYW5kcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3Qgc3VwcG9ydGVkRGlyZWN0aXZlIG9mIGRlc3RpbmF0aW9uLnN1cHBvcnRlZERpcmVjdGl2ZXMpIHtcclxuICAgICAgICBzdXBwb3J0ZWREaXJlY3RpdmVzLmFkZChzdXBwb3J0ZWREaXJlY3RpdmUubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBzdXBwb3J0ZWRDb21tYW5kIG9mIGRlc3RpbmF0aW9uLnN1cHBvcnRlZEtlcm5lbENvbW1hbmRzKSB7XHJcbiAgICAgICAgc3VwcG9ydGVkQ29tbWFuZHMuYWRkKHN1cHBvcnRlZENvbW1hbmQubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBzdXBwb3J0ZWREaXJlY3RpdmUgb2YgaW5jb21pbmcuc3VwcG9ydGVkRGlyZWN0aXZlcykge1xyXG4gICAgICAgIGlmICghc3VwcG9ydGVkRGlyZWN0aXZlcy5oYXMoc3VwcG9ydGVkRGlyZWN0aXZlLm5hbWUpKSB7XHJcbiAgICAgICAgICAgIHN1cHBvcnRlZERpcmVjdGl2ZXMuYWRkKHN1cHBvcnRlZERpcmVjdGl2ZS5uYW1lKTtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24uc3VwcG9ydGVkRGlyZWN0aXZlcy5wdXNoKHN1cHBvcnRlZERpcmVjdGl2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3Qgc3VwcG9ydGVkQ29tbWFuZCBvZiBpbmNvbWluZy5zdXBwb3J0ZWRLZXJuZWxDb21tYW5kcykge1xyXG4gICAgICAgIGlmICghc3VwcG9ydGVkQ29tbWFuZHMuaGFzKHN1cHBvcnRlZENvbW1hbmQubmFtZSkpIHtcclxuICAgICAgICAgICAgc3VwcG9ydGVkQ29tbWFuZHMuYWRkKHN1cHBvcnRlZENvbW1hbmQubmFtZSk7XHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLnN1cHBvcnRlZEtlcm5lbENvbW1hbmRzLnB1c2goc3VwcG9ydGVkQ29tbWFuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29ubmVjdG9yIGltcGxlbWVudHMgRGlzcG9zYWJsZSB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9saXN0ZW5lcjogcnhqcy5VbnN1YnNjcmliYWJsZTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3JlY2VpdmVyOiBJS2VybmVsQ29tbWFuZEFuZEV2ZW50UmVjZWl2ZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zZW5kZXI6IElLZXJuZWxDb21tYW5kQW5kRXZlbnRTZW5kZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9yZW1vdGVVcmlzOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgcmVtb3RlSG9zdFVyaXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuX3JlbW90ZVVyaXMudmFsdWVzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2VuZGVyKCk6IElLZXJuZWxDb21tYW5kQW5kRXZlbnRTZW5kZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZW5kZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCByZWNlaXZlcigpOiBJS2VybmVsQ29tbWFuZEFuZEV2ZW50UmVjZWl2ZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWNlaXZlcjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWd1cmF0aW9uOiB7IHJlY2VpdmVyOiBJS2VybmVsQ29tbWFuZEFuZEV2ZW50UmVjZWl2ZXIsIHNlbmRlcjogSUtlcm5lbENvbW1hbmRBbmRFdmVudFNlbmRlciwgcmVtb3RlVXJpcz86IHN0cmluZ1tdIH0pIHtcclxuICAgICAgICB0aGlzLl9yZWNlaXZlciA9IGNvbmZpZ3VyYXRpb24ucmVjZWl2ZXI7XHJcbiAgICAgICAgdGhpcy5fc2VuZGVyID0gY29uZmlndXJhdGlvbi5zZW5kZXI7XHJcbiAgICAgICAgaWYgKGNvbmZpZ3VyYXRpb24ucmVtb3RlVXJpcykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlbW90ZVVyaSBvZiBjb25maWd1cmF0aW9uLnJlbW90ZVVyaXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHVyaSA9IGV4dHJhY3RIb3N0QW5kTm9tYWxpemUocmVtb3RlVXJpKTtcclxuICAgICAgICAgICAgICAgIGlmICh1cmkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdGVVcmlzLmFkZCh1cmkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXIgPSB0aGlzLl9yZWNlaXZlci5zdWJzY3JpYmUoe1xyXG4gICAgICAgICAgICBuZXh0OiAoa2VybmVsQ29tbWFuZE9yRXZlbnRFbnZlbG9wZTogS2VybmVsQ29tbWFuZE9yRXZlbnRFbnZlbG9wZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzS2VybmVsRXZlbnRFbnZlbG9wZShrZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlLmV2ZW50VHlwZSA9PT0gY29udHJhY3RzLktlcm5lbEluZm9Qcm9kdWNlZFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnQgPSA8Y29udHJhY3RzLktlcm5lbEluZm9Qcm9kdWNlZD5rZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlLmV2ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWV2ZW50Lmtlcm5lbEluZm8ucmVtb3RlVXJpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmkgPSBleHRyYWN0SG9zdEFuZE5vbWFsaXplKGV2ZW50Lmtlcm5lbEluZm8udXJpISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXJpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtb3RlVXJpcy5hZGQodXJpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGtlcm5lbENvbW1hbmRPckV2ZW50RW52ZWxvcGUucm91dGluZ1NsaXA/Lmxlbmd0aCA/PyAwKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnRPcmlnaW4gPSBrZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlLnJvdXRpbmdTbGlwIVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXJpID0gZXh0cmFjdEhvc3RBbmROb21hbGl6ZShldmVudE9yaWdpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW90ZVVyaXMuYWRkKHVyaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FuUmVhY2gocmVtb3RlVXJpOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBob3N0ID0gZXh0cmFjdEhvc3RBbmROb21hbGl6ZShyZW1vdGVVcmkpOy8vP1xyXG4gICAgICAgIGlmIChob3N0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW1vdGVVcmlzLmhhcyhob3N0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9saXN0ZW5lci51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEhvc3RBbmROb21hbGl6ZShrZXJuZWxVcmk6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICBjb25zdCBmaWx0ZXI6IFJlZ0V4cCA9IC8oPzxob3N0Pi4rOlxcL1xcL1teXFwvXSspKFxcL1teXFwvXSkqL2dpO1xyXG4gICAgY29uc3QgbWF0Y2ggPSBmaWx0ZXIuZXhlYyhrZXJuZWxVcmkpOyAvLz9cclxuICAgIGlmIChtYXRjaD8uZ3JvdXBzPy5ob3N0KSB7XHJcbiAgICAgICAgY29uc3QgaG9zdCA9IG1hdGNoLmdyb3Vwcy5ob3N0O1xyXG4gICAgICAgIHJldHVybiBob3N0Oy8vP1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcbmltcG9ydCB7IHRyeUFkZFVyaVRvUm91dGluZ1NsaXAgfSBmcm9tIFwiLi9jb25uZWN0aW9uXCI7XHJcbmltcG9ydCAqIGFzIGNvbnRyYWN0cyBmcm9tIFwiLi9jb250cmFjdHNcIjtcclxuaW1wb3J0IHsgZ2V0S2VybmVsVXJpLCBJS2VybmVsQ29tbWFuZEludm9jYXRpb24sIEtlcm5lbCwgS2VybmVsVHlwZSB9IGZyb20gXCIuL2tlcm5lbFwiO1xyXG5pbXBvcnQgeyBLZXJuZWxIb3N0IH0gZnJvbSBcIi4va2VybmVsSG9zdFwiO1xyXG5pbXBvcnQgeyBLZXJuZWxJbnZvY2F0aW9uQ29udGV4dCB9IGZyb20gXCIuL2tlcm5lbEludm9jYXRpb25Db250ZXh0XCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuL2xvZ2dlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvc2l0ZUtlcm5lbCBleHRlbmRzIEtlcm5lbCB7XHJcbiAgICBwcml2YXRlIF9ob3N0OiBLZXJuZWxIb3N0IHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0S2VybmVsTmFtZXNCeUNvbW1hbmRUeXBlOiBNYXA8Y29udHJhY3RzLktlcm5lbENvbW1hbmRUeXBlLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xyXG5cclxuICAgIGRlZmF1bHRLZXJuZWxOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9jaGlsZEtlcm5lbHM6IEtlcm5lbENvbGxlY3Rpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5rZXJuZWxUeXBlID0gS2VybmVsVHlwZS5jb21wb3NpdGU7XHJcbiAgICAgICAgdGhpcy5fY2hpbGRLZXJuZWxzID0gbmV3IEtlcm5lbENvbGxlY3Rpb24odGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNoaWxkS2VybmVscygpIHtcclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLl9jaGlsZEtlcm5lbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBob3N0KCk6IEtlcm5lbEhvc3QgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faG9zdDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgaG9zdChob3N0OiBLZXJuZWxIb3N0IHwgbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX2hvc3QgPSBob3N0O1xyXG4gICAgICAgIGlmICh0aGlzLl9ob3N0KSB7XHJcbiAgICAgICAgICAgIHRoaXMua2VybmVsSW5mby51cmkgPSB0aGlzLl9ob3N0LnVyaTtcclxuICAgICAgICAgICAgdGhpcy5fY2hpbGRLZXJuZWxzLm5vdGlmeVRoYXRIb3N0V2FzU2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBhc3luYyBoYW5kbGVSZXF1ZXN0S2VybmVsSW5mbyhpbnZvY2F0aW9uOiBJS2VybmVsQ29tbWFuZEludm9jYXRpb24pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBmb3IgKGxldCBrZXJuZWwgb2YgdGhpcy5fY2hpbGRLZXJuZWxzKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXJuZWwuc3VwcG9ydHNDb21tYW5kKGludm9jYXRpb24uY29tbWFuZEVudmVsb3BlLmNvbW1hbmRUeXBlKSkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQga2VybmVsLmhhbmRsZUNvbW1hbmQoeyBjb21tYW5kOiB7fSwgY29tbWFuZFR5cGU6IGNvbnRyYWN0cy5SZXF1ZXN0S2VybmVsSW5mb1R5cGUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKGtlcm5lbDogS2VybmVsLCBhbGlhc2VzPzogc3RyaW5nW10pIHtcclxuICAgICAgICBpZiAoIWtlcm5lbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJrZXJuZWwgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmRlZmF1bHRLZXJuZWxOYW1lKSB7XHJcbiAgICAgICAgICAgIC8vIGRlZmF1bHQgdG8gZmlyc3Qga2VybmVsXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEtlcm5lbE5hbWUgPSBrZXJuZWwubmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGtlcm5lbC5wYXJlbnRLZXJuZWwgPSB0aGlzO1xyXG4gICAgICAgIGtlcm5lbC5yb290S2VybmVsID0gdGhpcy5yb290S2VybmVsO1xyXG4gICAgICAgIGtlcm5lbC5rZXJuZWxFdmVudHMuc3Vic2NyaWJlKHtcclxuICAgICAgICAgICAgbmV4dDogKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudDsvLz9cclxuICAgICAgICAgICAgICAgIHRyeUFkZFVyaVRvUm91dGluZ1NsaXAoZXZlbnQsIGdldEtlcm5lbFVyaSh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICBldmVudDsvLz9cclxuICAgICAgICAgICAgICAgIHRoaXMucHVibGlzaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoYWxpYXNlcykge1xyXG4gICAgICAgICAgICBsZXQgc2V0ID0gbmV3IFNldChhbGlhc2VzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChrZXJuZWwua2VybmVsSW5mby5hbGlhc2VzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBhbGlhcyBpbiBrZXJuZWwua2VybmVsSW5mby5hbGlhc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0LmFkZChhbGlhcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGtlcm5lbC5rZXJuZWxJbmZvLmFsaWFzZXMgPSBBcnJheS5mcm9tKHNldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jaGlsZEtlcm5lbHMuYWRkKGtlcm5lbCwgYWxpYXNlcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGludm9jYXRpb25Db250ZXh0ID0gS2VybmVsSW52b2NhdGlvbkNvbnRleHQuY3VycmVudDtcclxuXHJcbiAgICAgICAgaWYgKGludm9jYXRpb25Db250ZXh0KSB7XHJcbiAgICAgICAgICAgIGludm9jYXRpb25Db250ZXh0LmNvbW1hbmRFbnZlbG9wZTsvLz9cclxuICAgICAgICAgICAgaW52b2NhdGlvbkNvbnRleHQucHVibGlzaCh7XHJcbiAgICAgICAgICAgICAgICBldmVudFR5cGU6IGNvbnRyYWN0cy5LZXJuZWxJbmZvUHJvZHVjZWRUeXBlLFxyXG4gICAgICAgICAgICAgICAgZXZlbnQ6IDxjb250cmFjdHMuS2VybmVsSW5mb1Byb2R1Y2VkPntcclxuICAgICAgICAgICAgICAgICAgICBrZXJuZWxJbmZvOiBrZXJuZWwua2VybmVsSW5mb1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6IGludm9jYXRpb25Db250ZXh0LmNvbW1hbmRFbnZlbG9wZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnB1Ymxpc2hFdmVudCh7XHJcbiAgICAgICAgICAgICAgICBldmVudFR5cGU6IGNvbnRyYWN0cy5LZXJuZWxJbmZvUHJvZHVjZWRUeXBlLFxyXG4gICAgICAgICAgICAgICAgZXZlbnQ6IDxjb250cmFjdHMuS2VybmVsSW5mb1Byb2R1Y2VkPntcclxuICAgICAgICAgICAgICAgICAgICBrZXJuZWxJbmZvOiBrZXJuZWwua2VybmVsSW5mb1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEtlcm5lbEJ5VXJpKHVyaTogc3RyaW5nKTogS2VybmVsIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRLZXJuZWxzLnRyeUdldEJ5VXJpKHVyaSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEtlcm5lbEJ5TmFtZShuYW1lOiBzdHJpbmcpOiBLZXJuZWwgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZEtlcm5lbHMudHJ5R2V0QnlBbGlhcyhuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREZWZhdWx0VGFyZ2V0S2VybmVsTmFtZUZvckNvbW1hbmQoY29tbWFuZFR5cGU6IGNvbnRyYWN0cy5LZXJuZWxDb21tYW5kVHlwZSwga2VybmVsTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdEtlcm5lbE5hbWVzQnlDb21tYW5kVHlwZS5zZXQoY29tbWFuZFR5cGUsIGtlcm5lbE5hbWUpO1xyXG4gICAgfVxyXG4gICAgb3ZlcnJpZGUgaGFuZGxlQ29tbWFuZChjb21tYW5kRW52ZWxvcGU6IGNvbnRyYWN0cy5LZXJuZWxDb21tYW5kRW52ZWxvcGUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBpbnZvY2F0aW9uQ29udGV4dCA9IEtlcm5lbEludm9jYXRpb25Db250ZXh0LmN1cnJlbnQ7XHJcblxyXG4gICAgICAgIGxldCBrZXJuZWwgPSBjb21tYW5kRW52ZWxvcGUuY29tbWFuZC50YXJnZXRLZXJuZWxOYW1lID09PSB0aGlzLm5hbWVcclxuICAgICAgICAgICAgPyB0aGlzXHJcbiAgICAgICAgICAgIDogdGhpcy5nZXRIYW5kbGluZ0tlcm5lbChjb21tYW5kRW52ZWxvcGUsIGludm9jYXRpb25Db250ZXh0KTtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IHByZXZpdXNvSGFuZGxpbmdLZXJuZWwgPSBpbnZvY2F0aW9uQ29udGV4dD8uaGFuZGxpbmdLZXJuZWwgPz8gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKGtlcm5lbCA9PT0gdGhpcykge1xyXG4gICAgICAgICAgICBpZiAoaW52b2NhdGlvbkNvbnRleHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGludm9jYXRpb25Db250ZXh0LmhhbmRsaW5nS2VybmVsID0ga2VybmVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5oYW5kbGVDb21tYW5kKGNvbW1hbmRFbnZlbG9wZSkuZmluYWxseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW52b2NhdGlvbkNvbnRleHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnZvY2F0aW9uQ29udGV4dC5oYW5kbGluZ0tlcm5lbCA9IHByZXZpdXNvSGFuZGxpbmdLZXJuZWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoa2VybmVsKSB7XHJcbiAgICAgICAgICAgIGlmIChpbnZvY2F0aW9uQ29udGV4dCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaW52b2NhdGlvbkNvbnRleHQuaGFuZGxpbmdLZXJuZWwgPSBrZXJuZWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJ5QWRkVXJpVG9Sb3V0aW5nU2xpcChjb21tYW5kRW52ZWxvcGUsIGdldEtlcm5lbFVyaShrZXJuZWwpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGtlcm5lbC5oYW5kbGVDb21tYW5kKGNvbW1hbmRFbnZlbG9wZSkuZmluYWxseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW52b2NhdGlvbkNvbnRleHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnZvY2F0aW9uQ29udGV4dC5oYW5kbGluZ0tlcm5lbCA9IHByZXZpdXNvSGFuZGxpbmdLZXJuZWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGludm9jYXRpb25Db250ZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGludm9jYXRpb25Db250ZXh0LmhhbmRsaW5nS2VybmVsID0gcHJldml1c29IYW5kbGluZ0tlcm5lbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIktlcm5lbCBub3QgZm91bmQ6IFwiICsgY29tbWFuZEVudmVsb3BlLmNvbW1hbmQudGFyZ2V0S2VybmVsTmFtZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIG92ZXJyaWRlIGdldEhhbmRsaW5nS2VybmVsKGNvbW1hbmRFbnZlbG9wZTogY29udHJhY3RzLktlcm5lbENvbW1hbmRFbnZlbG9wZSwgY29udGV4dD86IEtlcm5lbEludm9jYXRpb25Db250ZXh0IHwgbnVsbCk6IEtlcm5lbCB8IG51bGwge1xyXG5cclxuICAgICAgICBsZXQga2VybmVsOiBLZXJuZWwgfCBudWxsID0gbnVsbDtcclxuICAgICAgICBpZiAoY29tbWFuZEVudmVsb3BlLmNvbW1hbmQuZGVzdGluYXRpb25VcmkpIHtcclxuICAgICAgICAgICAga2VybmVsID0gdGhpcy5fY2hpbGRLZXJuZWxzLnRyeUdldEJ5VXJpKGNvbW1hbmRFbnZlbG9wZS5jb21tYW5kLmRlc3RpbmF0aW9uVXJpKSA/PyBudWxsO1xyXG4gICAgICAgICAgICBpZiAoa2VybmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ga2VybmVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0S2VybmVsTmFtZSA9IGNvbW1hbmRFbnZlbG9wZS5jb21tYW5kLnRhcmdldEtlcm5lbE5hbWU7XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXRLZXJuZWxOYW1lID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0S2VybmVsTmFtZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYW5IYW5kbGUoY29tbWFuZEVudmVsb3BlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRhcmdldEtlcm5lbE5hbWUgPSB0aGlzLl9kZWZhdWx0S2VybmVsTmFtZXNCeUNvbW1hbmRUeXBlLmdldChjb21tYW5kRW52ZWxvcGUuY29tbWFuZFR5cGUpID8/IHRoaXMuZGVmYXVsdEtlcm5lbE5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFyZ2V0S2VybmVsTmFtZSAhPT0gdW5kZWZpbmVkICYmIHRhcmdldEtlcm5lbE5hbWUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAga2VybmVsID0gdGhpcy5fY2hpbGRLZXJuZWxzLnRyeUdldEJ5QWxpYXModGFyZ2V0S2VybmVsTmFtZSkgPz8gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXRLZXJuZWxOYW1lICYmICFrZXJuZWwpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYEtlcm5lbCBub3QgZm91bmQ6ICR7dGFyZ2V0S2VybmVsTmFtZX1gO1xyXG4gICAgICAgICAgICBMb2dnZXIuZGVmYXVsdC5lcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgha2VybmVsKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2hpbGRLZXJuZWxzLmNvdW50ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBrZXJuZWwgPSB0aGlzLl9jaGlsZEtlcm5lbHMuc2luZ2xlKCkgPz8gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFrZXJuZWwpIHtcclxuICAgICAgICAgICAga2VybmVsID0gY29udGV4dD8uaGFuZGxpbmdLZXJuZWwgPz8gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGtlcm5lbCA/PyB0aGlzO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgS2VybmVsQ29sbGVjdGlvbiBpbXBsZW1lbnRzIEl0ZXJhYmxlPEtlcm5lbD4ge1xyXG5cclxuICAgIHByaXZhdGUgX2NvbXBvc2l0ZUtlcm5lbDogQ29tcG9zaXRlS2VybmVsO1xyXG4gICAgcHJpdmF0ZSBfa2VybmVsczogS2VybmVsW10gPSBbXTtcclxuICAgIHByaXZhdGUgX25hbWVBbmRBbGlhc2VzQnlLZXJuZWw6IE1hcDxLZXJuZWwsIFNldDxzdHJpbmc+PiA9IG5ldyBNYXA8S2VybmVsLCBTZXQ8c3RyaW5nPj4oKTtcclxuICAgIHByaXZhdGUgX2tlcm5lbHNCeU5hbWVPckFsaWFzOiBNYXA8c3RyaW5nLCBLZXJuZWw+ID0gbmV3IE1hcDxzdHJpbmcsIEtlcm5lbD4oKTtcclxuICAgIHByaXZhdGUgX2tlcm5lbHNCeUxvY2FsVXJpOiBNYXA8c3RyaW5nLCBLZXJuZWw+ID0gbmV3IE1hcDxzdHJpbmcsIEtlcm5lbD4oKTtcclxuICAgIHByaXZhdGUgX2tlcm5lbHNCeVJlbW90ZVVyaTogTWFwPHN0cmluZywgS2VybmVsPiA9IG5ldyBNYXA8c3RyaW5nLCBLZXJuZWw+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29tcG9zaXRlS2VybmVsOiBDb21wb3NpdGVLZXJuZWwpIHtcclxuICAgICAgICB0aGlzLl9jb21wb3NpdGVLZXJuZWwgPSBjb21wb3NpdGVLZXJuZWw7XHJcbiAgICB9XHJcblxyXG4gICAgW1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmF0b3I8S2VybmVsPiB7XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5leHQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuX2tlcm5lbHNbY291bnRlcisrXSxcclxuICAgICAgICAgICAgICAgICAgICBkb25lOiBjb3VudGVyID4gdGhpcy5fa2VybmVscy5sZW5ndGggLy8/XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzaW5nbGUoKTogS2VybmVsIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fa2VybmVscy5sZW5ndGggPT09IDEgPyB0aGlzLl9rZXJuZWxzWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgYWRkKGtlcm5lbDogS2VybmVsLCBhbGlhc2VzPzogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fa2VybmVsc0J5TmFtZU9yQWxpYXMuaGFzKGtlcm5lbC5uYW1lKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGtlcm5lbCB3aXRoIG5hbWUgJHtrZXJuZWwubmFtZX0gYWxyZWFkeSBleGlzdHNgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVLZXJuZWxJbmZvQW5kSW5kZXgoa2VybmVsLCBhbGlhc2VzKTtcclxuICAgICAgICB0aGlzLl9rZXJuZWxzLnB1c2goa2VybmVsKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0IGNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tlcm5lbHMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUtlcm5lbEluZm9BbmRJbmRleChrZXJuZWw6IEtlcm5lbCwgYWxpYXNlcz86IHN0cmluZ1tdKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmIChhbGlhc2VzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGFsaWFzIG9mIGFsaWFzZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9rZXJuZWxzQnlOYW1lT3JBbGlhcy5oYXMoYWxpYXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBrZXJuZWwgd2l0aCBhbGlhcyAke2FsaWFzfSBhbHJlYWR5IGV4aXN0c2ApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX25hbWVBbmRBbGlhc2VzQnlLZXJuZWwuaGFzKGtlcm5lbCkpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGFsaWFzIG9mIGtlcm5lbC5rZXJuZWxJbmZvLmFsaWFzZXMpIHtcclxuICAgICAgICAgICAgICAgIHNldC5hZGQoYWxpYXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBrZXJuZWwua2VybmVsSW5mby5hbGlhc2VzID0gQXJyYXkuZnJvbShzZXQpO1xyXG5cclxuICAgICAgICAgICAgc2V0LmFkZChrZXJuZWwua2VybmVsSW5mby5sb2NhbE5hbWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fbmFtZUFuZEFsaWFzZXNCeUtlcm5lbC5zZXQoa2VybmVsLCBzZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWxpYXNlcykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBhbGlhcyBvZiBhbGlhc2VzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uYW1lQW5kQWxpYXNlc0J5S2VybmVsLmdldChrZXJuZWwpIS5hZGQoYWxpYXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9uYW1lQW5kQWxpYXNlc0J5S2VybmVsLmdldChrZXJuZWwpPy5mb3JFYWNoKGFsaWFzID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fa2VybmVsc0J5TmFtZU9yQWxpYXMuc2V0KGFsaWFzLCBrZXJuZWwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fY29tcG9zaXRlS2VybmVsLmhvc3QpIHtcclxuICAgICAgICAgICAga2VybmVsLmtlcm5lbEluZm8udXJpID0gYCR7dGhpcy5fY29tcG9zaXRlS2VybmVsLmhvc3QudXJpfS8ke2tlcm5lbC5uYW1lfWA7Ly8/XHJcbiAgICAgICAgICAgIHRoaXMuX2tlcm5lbHNCeUxvY2FsVXJpLnNldChrZXJuZWwua2VybmVsSW5mby51cmksIGtlcm5lbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoa2VybmVsLmtlcm5lbFR5cGUgPT09IEtlcm5lbFR5cGUucHJveHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fa2VybmVsc0J5UmVtb3RlVXJpLnNldChrZXJuZWwua2VybmVsSW5mby5yZW1vdGVVcmkhLCBrZXJuZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdHJ5R2V0QnlBbGlhcyhhbGlhczogc3RyaW5nKTogS2VybmVsIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fa2VybmVsc0J5TmFtZU9yQWxpYXMuZ2V0KGFsaWFzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdHJ5R2V0QnlVcmkodXJpOiBzdHJpbmcpOiBLZXJuZWwgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCBrZXJuZWwgPSB0aGlzLl9rZXJuZWxzQnlMb2NhbFVyaS5nZXQodXJpKSB8fCB0aGlzLl9rZXJuZWxzQnlSZW1vdGVVcmkuZ2V0KHVyaSk7XHJcbiAgICAgICAgcmV0dXJuIGtlcm5lbDtcclxuICAgIH1cclxuICAgIG5vdGlmeVRoYXRIb3N0V2FzU2V0KCkge1xyXG4gICAgICAgIGZvciAobGV0IGtlcm5lbCBvZiB0aGlzLl9rZXJuZWxzKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlS2VybmVsSW5mb0FuZEluZGV4KGtlcm5lbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcHJvamVjdCByb290IGZvciBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcblxyXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XHJcbmltcG9ydCAqIGFzIGNvbnRyYWN0cyBmcm9tIFwiLi9jb250cmFjdHNcIjtcclxuaW1wb3J0IHsgS2VybmVsSW52b2NhdGlvbkNvbnRleHQgfSBmcm9tIFwiLi9rZXJuZWxJbnZvY2F0aW9uQ29udGV4dFwiO1xyXG5pbXBvcnQgKiBhcyBkaXNwb3NhYmxlcyBmcm9tIFwiLi9kaXNwb3NhYmxlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnNvbGVDYXB0dXJlIGltcGxlbWVudHMgZGlzcG9zYWJsZXMuRGlzcG9zYWJsZSB7XHJcbiAgICBwcml2YXRlIG9yaWdpbmFsQ29uc29sZTogQ29uc29sZTtcclxuICAgIHByaXZhdGUgX2tlcm5lbEludm9jYXRpb25Db250ZXh0OiBLZXJuZWxJbnZvY2F0aW9uQ29udGV4dCB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm9yaWdpbmFsQ29uc29sZSA9IGNvbnNvbGU7XHJcbiAgICAgICAgY29uc29sZSA9IDxDb25zb2xlPjxhbnk+dGhpcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQga2VybmVsSW52b2NhdGlvbkNvbnRleHQodmFsdWU6IEtlcm5lbEludm9jYXRpb25Db250ZXh0IHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fa2VybmVsSW52b2NhdGlvbkNvbnRleHQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBhc3NlcnQodmFsdWU6IGFueSwgbWVzc2FnZT86IHN0cmluZywgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUuYXNzZXJ0KHZhbHVlLCBtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcbiAgICBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9yaWdpbmFsQ29uc29sZS5jbGVhcigpO1xyXG4gICAgfVxyXG4gICAgY291bnQobGFiZWw/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9yaWdpbmFsQ29uc29sZS5jb3VudChsYWJlbCk7XHJcbiAgICB9XHJcbiAgICBjb3VudFJlc2V0KGxhYmVsPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUuY291bnRSZXNldChsYWJlbCk7XHJcbiAgICB9XHJcbiAgICBkZWJ1ZyhtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9yaWdpbmFsQ29uc29sZS5kZWJ1ZyhtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcbiAgICBkaXIob2JqOiBhbnksIG9wdGlvbnM/OiB1dGlsLkluc3BlY3RPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUuZGlyKG9iaiwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBkaXJ4bWwoLi4uZGF0YTogYW55W10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9yaWdpbmFsQ29uc29sZS5kaXJ4bWwoZGF0YSk7XHJcbiAgICB9XHJcbiAgICBlcnJvcihtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlZGlyZWN0QW5kUHVibGlzaCh0aGlzLm9yaWdpbmFsQ29uc29sZS5lcnJvciwgLi4uW21lc3NhZ2UsIC4uLm9wdGlvbmFsUGFyYW1zXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ3JvdXAoLi4ubGFiZWw6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUuZ3JvdXAobGFiZWwpO1xyXG4gICAgfVxyXG4gICAgZ3JvdXBDb2xsYXBzZWQoLi4ubGFiZWw6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUuZ3JvdXBDb2xsYXBzZWQobGFiZWwpO1xyXG4gICAgfVxyXG4gICAgZ3JvdXBFbmQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUuZ3JvdXBFbmQoKTtcclxuICAgIH1cclxuICAgIGluZm8obWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWRpcmVjdEFuZFB1Ymxpc2godGhpcy5vcmlnaW5hbENvbnNvbGUuaW5mbywgLi4uW21lc3NhZ2UsIC4uLm9wdGlvbmFsUGFyYW1zXSk7XHJcbiAgICB9XHJcbiAgICBsb2cobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWRpcmVjdEFuZFB1Ymxpc2godGhpcy5vcmlnaW5hbENvbnNvbGUubG9nLCAuLi5bbWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXNdKTtcclxuICAgIH1cclxuXHJcbiAgICB0YWJsZSh0YWJ1bGFyRGF0YTogYW55LCBwcm9wZXJ0aWVzPzogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9yaWdpbmFsQ29uc29sZS50YWJsZSh0YWJ1bGFyRGF0YSwgcHJvcGVydGllcyk7XHJcbiAgICB9XHJcbiAgICB0aW1lKGxhYmVsPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUudGltZShsYWJlbCk7XHJcbiAgICB9XHJcbiAgICB0aW1lRW5kKGxhYmVsPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUudGltZUVuZChsYWJlbCk7XHJcbiAgICB9XHJcbiAgICB0aW1lTG9nKGxhYmVsPzogc3RyaW5nLCAuLi5kYXRhOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub3JpZ2luYWxDb25zb2xlLnRpbWVMb2cobGFiZWwsIGRhdGEpO1xyXG4gICAgfVxyXG4gICAgdGltZVN0YW1wKGxhYmVsPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUudGltZVN0YW1wKGxhYmVsKTtcclxuICAgIH1cclxuICAgIHRyYWNlKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVkaXJlY3RBbmRQdWJsaXNoKHRoaXMub3JpZ2luYWxDb25zb2xlLnRyYWNlLCAuLi5bbWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXNdKTtcclxuICAgIH1cclxuICAgIHdhcm4obWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGUud2FybihtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvZmlsZShsYWJlbD86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub3JpZ2luYWxDb25zb2xlLnByb2ZpbGUobGFiZWwpO1xyXG4gICAgfVxyXG4gICAgcHJvZmlsZUVuZChsYWJlbD86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub3JpZ2luYWxDb25zb2xlLnByb2ZpbGVFbmQobGFiZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZSA9IHRoaXMub3JpZ2luYWxDb25zb2xlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVkaXJlY3RBbmRQdWJsaXNoKHRhcmdldDogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkLCAuLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9rZXJuZWxJbnZvY2F0aW9uQ29udGV4dCkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBhcmdzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWltZVR5cGU6IHN0cmluZztcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmcgIT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGFyZykpIHtcclxuICAgICAgICAgICAgICAgICAgICBtaW1lVHlwZSA9ICd0ZXh0L3BsYWluJztcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGFyZz8udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWltZVR5cGUgPSAnYXBwbGljYXRpb24vanNvbic7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeShhcmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3BsYXllZFZhbHVlOiBjb250cmFjdHMuRGlzcGxheWVkVmFsdWVQcm9kdWNlZCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWltZVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudEVudmVsb3BlOiBjb250cmFjdHMuS2VybmVsRXZlbnRFbnZlbG9wZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudFR5cGU6IGNvbnRyYWN0cy5EaXNwbGF5ZWRWYWx1ZVByb2R1Y2VkVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBldmVudDogZGlzcGxheWVkVmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogdGhpcy5fa2VybmVsSW52b2NhdGlvbkNvbnRleHQuY29tbWFuZEVudmVsb3BlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2tlcm5lbEludm9jYXRpb25Db250ZXh0LnB1Ymxpc2goZXZlbnRFbnZlbG9wZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQoLi4uYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcbmltcG9ydCAqIGFzIGNvbnRyYWN0cyBmcm9tIFwiLi9jb250cmFjdHNcIjtcclxuaW1wb3J0IHsgS2VybmVsLCBJS2VybmVsQ29tbWFuZEludm9jYXRpb24gfSBmcm9tIFwiLi9rZXJuZWxcIjtcclxuaW1wb3J0IHsgUHJvbWlzZUNvbXBsZXRpb25Tb3VyY2UgfSBmcm9tIFwiLi9wcm9taXNlQ29tcGxldGlvblNvdXJjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEh0bWxLZXJuZWwgZXh0ZW5kcyBLZXJuZWwge1xyXG4gICAgY29uc3RydWN0b3Ioa2VybmVsTmFtZT86IHN0cmluZywgcHJpdmF0ZSByZWFkb25seSBodG1sRnJhZ21lbnRQcm9jZXNzb3I/OiAoaHRtbEZyYWdtZW50OiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD4sIGxhbmd1YWdlTmFtZT86IHN0cmluZywgbGFuZ3VhZ2VWZXJzaW9uPzogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoa2VybmVsTmFtZSA/PyBcImh0bWxcIiwgbGFuZ3VhZ2VOYW1lID8/IFwiSFRNTFwiKTtcclxuICAgICAgICBpZiAoIXRoaXMuaHRtbEZyYWdtZW50UHJvY2Vzc29yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaHRtbEZyYWdtZW50UHJvY2Vzc29yID0gZG9tSHRtbEZyYWdtZW50UHJvY2Vzc29yO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tbWFuZEhhbmRsZXIoeyBjb21tYW5kVHlwZTogY29udHJhY3RzLlN1Ym1pdENvZGVUeXBlLCBoYW5kbGU6IGludm9jYXRpb24gPT4gdGhpcy5oYW5kbGVTdWJtaXRDb2RlKGludm9jYXRpb24pIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgaGFuZGxlU3VibWl0Q29kZShpbnZvY2F0aW9uOiBJS2VybmVsQ29tbWFuZEludm9jYXRpb24pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBzdWJtaXRDb2RlID0gPGNvbnRyYWN0cy5TdWJtaXRDb2RlPmludm9jYXRpb24uY29tbWFuZEVudmVsb3BlLmNvbW1hbmQ7XHJcbiAgICAgICAgY29uc3QgY29kZSA9IHN1Ym1pdENvZGUuY29kZTtcclxuXHJcbiAgICAgICAgaW52b2NhdGlvbi5jb250ZXh0LnB1Ymxpc2goeyBldmVudFR5cGU6IGNvbnRyYWN0cy5Db2RlU3VibWlzc2lvblJlY2VpdmVkVHlwZSwgZXZlbnQ6IHsgY29kZSB9LCBjb21tYW5kOiBpbnZvY2F0aW9uLmNvbW1hbmRFbnZlbG9wZSB9KTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmh0bWxGcmFnbWVudFByb2Nlc3Nvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBIVE1MIGZyYWdtZW50IHByb2Nlc3NvciByZWdpc3RlcmVkXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5odG1sRnJhZ21lbnRQcm9jZXNzb3IoY29kZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBlOy8vP1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRvbUh0bWxGcmFnbWVudFByb2Nlc3NvcihodG1sRnJhZ21lbnQ6IHN0cmluZywgY29uZmlndXJhdGlvbj86IHtcclxuICAgIGNvbnRhaW5lckZhY3Rvcnk/OiAoKSA9PiBIVE1MRGl2RWxlbWVudCxcclxuICAgIGVsZW1lbnRUb09ic2VydmU/OiAoKSA9PiBIVE1MRWxlbWVudCxcclxuICAgIGFkZFRvRG9tPzogKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB2b2lkLFxyXG4gICAgbXV0YXRpb25PYnNlcnZlckZhY3Rvcnk/OiAoY2FsbGJhY2s6IE11dGF0aW9uQ2FsbGJhY2spID0+IE11dGF0aW9uT2JzZXJ2ZXJcclxufSk6IFByb21pc2U8dm9pZD4ge1xyXG5cclxuICAgIGNvbnN0IGZhY3Rvcnk6ICgpID0+IEhUTUxEaXZFbGVtZW50ID0gY29uZmlndXJhdGlvbj8uY29udGFpbmVyRmFjdG9yeSA/PyAoKCkgPT4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICBjb25zdCBlbGVtZW50VG9PYnNlcnZlOiAoKSA9PiBIVE1MRWxlbWVudCA9IGNvbmZpZ3VyYXRpb24/LmVsZW1lbnRUb09ic2VydmUgPz8gKCgpID0+IGRvY3VtZW50LmJvZHkpO1xyXG4gICAgY29uc3QgYWRkVG9Eb206IChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gdm9pZCA9IGNvbmZpZ3VyYXRpb24/LmFkZFRvRG9tID8/ICgoZWxlbWVudCkgPT4gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KSk7XHJcbiAgICBjb25zdCBtdXRhdGlvbk9ic2VydmVyRmFjdG9yeSA9IGNvbmZpZ3VyYXRpb24/Lm11dGF0aW9uT2JzZXJ2ZXJGYWN0b3J5ID8/IChjYWxsYmFjayA9PiBuZXcgTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjaykpO1xyXG5cclxuICAgIGxldCBjb250YWluZXIgPSBmYWN0b3J5KCk7XHJcblxyXG4gICAgaWYgKCFjb250YWluZXIuaWQpIHtcclxuICAgICAgICBjb250YWluZXIuaWQgPSBcImh0bWxfa2VybmVsX2NvbnRhaW5lclwiICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IGh0bWxGcmFnbWVudDtcclxuICAgIGNvbnN0IGNvbXBsZXRpb25Qcm9taXNlID0gbmV3IFByb21pc2VDb21wbGV0aW9uU291cmNlPHZvaWQ+KCk7XHJcbiAgICBjb25zdCBtdXRhdGlvbk9ic2VydmVyID0gbXV0YXRpb25PYnNlcnZlckZhY3RvcnkoKG11dGF0aW9uczogTXV0YXRpb25SZWNvcmRbXSwgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIpID0+IHtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09IFwiY2hpbGRMaXN0XCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlcyA9IEFycmF5LmZyb20obXV0YXRpb24uYWRkZWROb2Rlcyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGFkZGVkTm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhZGRlZE5vZGUgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5pZDsvLz9cclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaWQ7Ly8/XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQ/LmlkID09PSBjb250YWluZXIuaWQpIHsvLz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvblByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGVsZW1lbnRUb09ic2VydmUoKSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XHJcbiAgICBhZGRUb0RvbShjb250YWluZXIpO1xyXG4gICAgcmV0dXJuIGNvbXBsZXRpb25Qcm9taXNlLnByb21pc2U7XHJcblxyXG59IiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcbmltcG9ydCAqIGFzIGNvbnRyYWN0cyBmcm9tIFwiLi9jb250cmFjdHNcIjtcclxuaW1wb3J0IHsgQ29uc29sZUNhcHR1cmUgfSBmcm9tIFwiLi9jb25zb2xlQ2FwdHVyZVwiO1xyXG5pbXBvcnQgeyBLZXJuZWwsIElLZXJuZWxDb21tYW5kSW52b2NhdGlvbiB9IGZyb20gXCIuL2tlcm5lbFwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi9sb2dnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKYXZhc2NyaXB0S2VybmVsIGV4dGVuZHMgS2VybmVsIHtcclxuICAgIHByaXZhdGUgc3VwcHJlc3NlZExvY2FsczogU2V0PHN0cmluZz47XHJcbiAgICBwcml2YXRlIGNhcHR1cmU6IENvbnNvbGVDYXB0dXJlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU/OiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lID8/IFwiamF2YXNjcmlwdFwiLCBcIkphdmFzY3JpcHRcIik7XHJcbiAgICAgICAgdGhpcy5zdXBwcmVzc2VkTG9jYWxzID0gbmV3IFNldDxzdHJpbmc+KHRoaXMuYWxsTG9jYWxWYXJpYWJsZU5hbWVzKCkpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJDb21tYW5kSGFuZGxlcih7IGNvbW1hbmRUeXBlOiBjb250cmFjdHMuU3VibWl0Q29kZVR5cGUsIGhhbmRsZTogaW52b2NhdGlvbiA9PiB0aGlzLmhhbmRsZVN1Ym1pdENvZGUoaW52b2NhdGlvbikgfSk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckNvbW1hbmRIYW5kbGVyKHsgY29tbWFuZFR5cGU6IGNvbnRyYWN0cy5SZXF1ZXN0VmFsdWVJbmZvc1R5cGUsIGhhbmRsZTogaW52b2NhdGlvbiA9PiB0aGlzLmhhbmRsZVJlcXVlc3RWYWx1ZUluZm9zKGludm9jYXRpb24pIH0pO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJDb21tYW5kSGFuZGxlcih7IGNvbW1hbmRUeXBlOiBjb250cmFjdHMuUmVxdWVzdFZhbHVlVHlwZSwgaGFuZGxlOiBpbnZvY2F0aW9uID0+IHRoaXMuaGFuZGxlUmVxdWVzdFZhbHVlKGludm9jYXRpb24pIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNhcHR1cmUgPSBuZXcgQ29uc29sZUNhcHR1cmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGhhbmRsZVN1Ym1pdENvZGUoaW52b2NhdGlvbjogSUtlcm5lbENvbW1hbmRJbnZvY2F0aW9uKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3Qgc3VibWl0Q29kZSA9IDxjb250cmFjdHMuU3VibWl0Q29kZT5pbnZvY2F0aW9uLmNvbW1hbmRFbnZlbG9wZS5jb21tYW5kO1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBzdWJtaXRDb2RlLmNvZGU7XHJcblxyXG4gICAgICAgIHN1cGVyLmtlcm5lbEluZm8ubG9jYWxOYW1lOy8vP1xyXG4gICAgICAgIHN1cGVyLmtlcm5lbEluZm8udXJpOy8vP1xyXG4gICAgICAgIHN1cGVyLmtlcm5lbEluZm8ucmVtb3RlVXJpOy8vP1xyXG4gICAgICAgIGludm9jYXRpb24uY29udGV4dC5wdWJsaXNoKHsgZXZlbnRUeXBlOiBjb250cmFjdHMuQ29kZVN1Ym1pc3Npb25SZWNlaXZlZFR5cGUsIGV2ZW50OiB7IGNvZGUgfSwgY29tbWFuZDogaW52b2NhdGlvbi5jb21tYW5kRW52ZWxvcGUgfSk7XHJcbiAgICAgICAgaW52b2NhdGlvbi5jb250ZXh0LmNvbW1hbmRFbnZlbG9wZS5yb3V0aW5nU2xpcDsvLz9cclxuICAgICAgICB0aGlzLmNhcHR1cmUua2VybmVsSW52b2NhdGlvbkNvbnRleHQgPSBpbnZvY2F0aW9uLmNvbnRleHQ7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogYW55ID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBBc3luY0Z1bmN0aW9uID0gZXZhbChgT2JqZWN0LmdldFByb3RvdHlwZU9mKGFzeW5jIGZ1bmN0aW9uKCl7fSkuY29uc3RydWN0b3JgKTtcclxuICAgICAgICAgICAgY29uc3QgZXZhbHVhdG9yID0gQXN5bmNGdW5jdGlvbihcImNvbnNvbGVcIiwgY29kZSk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IGV2YWx1YXRvcih0aGlzLmNhcHR1cmUpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gZm9ybWF0VmFsdWUocmVzdWx0LCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXZlbnQ6IGNvbnRyYWN0cy5SZXR1cm5WYWx1ZVByb2R1Y2VkID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlczogW2Zvcm1hdHRlZFZhbHVlXVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGludm9jYXRpb24uY29udGV4dC5wdWJsaXNoKHsgZXZlbnRUeXBlOiBjb250cmFjdHMuUmV0dXJuVmFsdWVQcm9kdWNlZFR5cGUsIGV2ZW50LCBjb21tYW5kOiBpbnZvY2F0aW9uLmNvbW1hbmRFbnZlbG9wZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgZTsvLz9cclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FwdHVyZS5rZXJuZWxJbnZvY2F0aW9uQ29udGV4dCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVSZXF1ZXN0VmFsdWVJbmZvcyhpbnZvY2F0aW9uOiBJS2VybmVsQ29tbWFuZEludm9jYXRpb24pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCB2YWx1ZUluZm9zOiBjb250cmFjdHMuS2VybmVsVmFsdWVJbmZvW10gPSB0aGlzLmFsbExvY2FsVmFyaWFibGVOYW1lcygpLmZpbHRlcih2ID0+ICF0aGlzLnN1cHByZXNzZWRMb2NhbHMuaGFzKHYpKS5tYXAodiA9PiAoeyBuYW1lOiB2LCBwcmVmZXJyZWRNaW1lVHlwZXM6IFtdIH0pKTtcclxuICAgICAgICBjb25zdCBldmVudDogY29udHJhY3RzLlZhbHVlSW5mb3NQcm9kdWNlZCA9IHtcclxuICAgICAgICAgICAgdmFsdWVJbmZvc1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaW52b2NhdGlvbi5jb250ZXh0LnB1Ymxpc2goeyBldmVudFR5cGU6IGNvbnRyYWN0cy5WYWx1ZUluZm9zUHJvZHVjZWRUeXBlLCBldmVudCwgY29tbWFuZDogaW52b2NhdGlvbi5jb21tYW5kRW52ZWxvcGUgfSk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlUmVxdWVzdFZhbHVlKGludm9jYXRpb246IElLZXJuZWxDb21tYW5kSW52b2NhdGlvbik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3RWYWx1ZSA9IDxjb250cmFjdHMuUmVxdWVzdFZhbHVlPmludm9jYXRpb24uY29tbWFuZEVudmVsb3BlLmNvbW1hbmQ7XHJcbiAgICAgICAgY29uc3QgcmF3VmFsdWUgPSB0aGlzLmdldExvY2FsVmFyaWFibGUocmVxdWVzdFZhbHVlLm5hbWUpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gZm9ybWF0VmFsdWUocmF3VmFsdWUsIHJlcXVlc3RWYWx1ZS5taW1lVHlwZSB8fCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgICAgIExvZ2dlci5kZWZhdWx0LmluZm8oYHJldHVybmluZyAke0pTT04uc3RyaW5naWZ5KGZvcm1hdHRlZFZhbHVlKX0gZm9yICR7cmVxdWVzdFZhbHVlLm5hbWV9YCk7XHJcbiAgICAgICAgY29uc3QgZXZlbnQ6IGNvbnRyYWN0cy5WYWx1ZVByb2R1Y2VkID0ge1xyXG4gICAgICAgICAgICBuYW1lOiByZXF1ZXN0VmFsdWUubmFtZSxcclxuICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGludm9jYXRpb24uY29udGV4dC5wdWJsaXNoKHsgZXZlbnRUeXBlOiBjb250cmFjdHMuVmFsdWVQcm9kdWNlZFR5cGUsIGV2ZW50LCBjb21tYW5kOiBpbnZvY2F0aW9uLmNvbW1hbmRFbnZlbG9wZSB9KTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhbGxMb2NhbFZhcmlhYmxlTmFtZXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBnbG9iYWxUaGlzKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKDxhbnk+Z2xvYmFsVGhpcylba2V5XSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZGVmYXVsdC5lcnJvcihgZXJyb3IgZ2V0dGluZyB2YWx1ZSBmb3IgJHtrZXl9IDogJHtlfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZGVmYXVsdC5lcnJvcihgZXJyb3Igc2Nhbm5pbmcgZ2xvYmxhIHZhcmlhYmxlcyA6ICR7ZX1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRMb2NhbFZhcmlhYmxlKG5hbWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuICg8YW55Pmdsb2JhbFRoaXMpW25hbWVdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VmFsdWUoYXJnOiBhbnksIG1pbWVUeXBlOiBzdHJpbmcpOiBjb250cmFjdHMuRm9ybWF0dGVkVmFsdWUge1xyXG4gICAgbGV0IHZhbHVlOiBzdHJpbmc7XHJcblxyXG4gICAgc3dpdGNoIChtaW1lVHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ3RleHQvcGxhaW4nOlxyXG4gICAgICAgICAgICB2YWx1ZSA9IGFyZz8udG9TdHJpbmcoKSB8fCAndW5kZWZpbmVkJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnYXBwbGljYXRpb24vanNvbic6XHJcbiAgICAgICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkoYXJnKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBtaW1lIHR5cGU6ICR7bWltZVR5cGV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtaW1lVHlwZSxcclxuICAgICAgICB2YWx1ZSxcclxuICAgIH07XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcbmltcG9ydCAqIGFzIGNvbnRyYWN0cyBmcm9tIFwiLi9jb250cmFjdHNcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XHJcbmltcG9ydCB7IEtlcm5lbCwgSUtlcm5lbENvbW1hbmRIYW5kbGVyLCBJS2VybmVsQ29tbWFuZEludm9jYXRpb24sIGdldEtlcm5lbFVyaSwgS2VybmVsVHlwZSB9IGZyb20gXCIuL2tlcm5lbFwiO1xyXG5pbXBvcnQgKiBhcyBjb25uZWN0aW9uIGZyb20gXCIuL2Nvbm5lY3Rpb25cIjtcclxuaW1wb3J0IHsgUHJvbWlzZUNvbXBsZXRpb25Tb3VyY2UgfSBmcm9tIFwiLi9wcm9taXNlQ29tcGxldGlvblNvdXJjZVwiO1xyXG5pbXBvcnQgeyBLZXJuZWxJbnZvY2F0aW9uQ29udGV4dCB9IGZyb20gXCIuL2tlcm5lbEludm9jYXRpb25Db250ZXh0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUHJveHlLZXJuZWwgZXh0ZW5kcyBLZXJuZWwge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG92ZXJyaWRlIHJlYWRvbmx5IG5hbWU6IHN0cmluZywgcHJpdmF0ZSByZWFkb25seSBfc2VuZGVyOiBjb25uZWN0aW9uLklLZXJuZWxDb21tYW5kQW5kRXZlbnRTZW5kZXIsIHByaXZhdGUgcmVhZG9ubHkgX3JlY2VpdmVyOiBjb25uZWN0aW9uLklLZXJuZWxDb21tYW5kQW5kRXZlbnRSZWNlaXZlcikge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMua2VybmVsVHlwZSA9IEtlcm5lbFR5cGUucHJveHk7XHJcbiAgICB9XHJcbiAgICBvdmVycmlkZSBnZXRDb21tYW5kSGFuZGxlcihjb21tYW5kVHlwZTogY29udHJhY3RzLktlcm5lbENvbW1hbmRUeXBlKTogSUtlcm5lbENvbW1hbmRIYW5kbGVyIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb21tYW5kVHlwZSxcclxuICAgICAgICAgICAgaGFuZGxlOiAoaW52b2NhdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRIYW5kbGVyKGludm9jYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlbGVnYXRlUHVibGljYXRpb24oZW52ZWxvcGU6IGNvbnRyYWN0cy5LZXJuZWxFdmVudEVudmVsb3BlLCBpbnZvY2F0aW9uQ29udGV4dDogS2VybmVsSW52b2NhdGlvbkNvbnRleHQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYWxyZWFkeUJlZW5TZWVuID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGVudmVsb3BlLnJvdXRpbmdTbGlwID09PSB1bmRlZmluZWQgfHwgIWVudmVsb3BlLnJvdXRpbmdTbGlwLmZpbmQoZSA9PiBlID09PSBnZXRLZXJuZWxVcmkodGhpcykpKSB7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24udHJ5QWRkVXJpVG9Sb3V0aW5nU2xpcChlbnZlbG9wZSwgZ2V0S2VybmVsVXJpKHRoaXMpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbHJlYWR5QmVlblNlZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaGFzU2FtZU9yaWdpbihlbnZlbG9wZSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhbHJlYWR5QmVlblNlZW4pIHtcclxuICAgICAgICAgICAgICAgIGludm9jYXRpb25Db250ZXh0LnB1Ymxpc2goZW52ZWxvcGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFzU2FtZU9yaWdpbihlbnZlbG9wZTogY29udHJhY3RzLktlcm5lbEV2ZW50RW52ZWxvcGUpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgY29tbWFuZE9yaWdpblVyaSA9IGVudmVsb3BlLmNvbW1hbmQ/LmNvbW1hbmQ/Lm9yaWdpblVyaSA/PyB0aGlzLmtlcm5lbEluZm8udXJpO1xyXG4gICAgICAgIGlmIChjb21tYW5kT3JpZ2luVXJpID09PSB0aGlzLmtlcm5lbEluZm8udXJpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbW1hbmRPcmlnaW5VcmkgPT09IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVLZXJuZWxJbmZvRnJvbUV2ZW50KGtlcm5lbEluZm9Qcm9kdWNlZDogY29udHJhY3RzLktlcm5lbEluZm9Qcm9kdWNlZCkge1xyXG4gICAgICAgIGNvbm5lY3Rpb24udXBkYXRlS2VybmVsSW5mbyh0aGlzLmtlcm5lbEluZm8sIGtlcm5lbEluZm9Qcm9kdWNlZC5rZXJuZWxJbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIF9jb21tYW5kSGFuZGxlcihjb21tYW5kSW52b2NhdGlvbjogSUtlcm5lbENvbW1hbmRJbnZvY2F0aW9uKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgY29tbWFuZFRva2VuID0gY29tbWFuZEludm9jYXRpb24uY29tbWFuZEVudmVsb3BlLnRva2VuO1xyXG4gICAgICAgIGNvbnN0IGNvbW1hbmRJZCA9IGNvbW1hbmRJbnZvY2F0aW9uLmNvbW1hbmRFbnZlbG9wZS5pZDtcclxuICAgICAgICBjb25zdCBjb21wbGV0aW9uU291cmNlID0gbmV3IFByb21pc2VDb21wbGV0aW9uU291cmNlPGNvbnRyYWN0cy5LZXJuZWxFdmVudEVudmVsb3BlPigpO1xyXG4gICAgICAgIC8vIGZpeCA6IGlzIHRoaXMgdGhlIHJpZ2h0IHdheT8gV2UgYXJlIHRyeWluZyB0byBhdm9pZCBmb3J3YXJkaW5nIGV2ZW50cyB3ZSBqdXN0IGRpZCBmb3J3YXJkXHJcbiAgICAgICAgbGV0IGV2ZW50U3Vic2NyaXB0aW9uID0gdGhpcy5fcmVjZWl2ZXIuc3Vic2NyaWJlKHtcclxuICAgICAgICAgICAgbmV4dDogKGVudmVsb3BlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5pc0tlcm5lbEV2ZW50RW52ZWxvcGUoZW52ZWxvcGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudmVsb3BlLmV2ZW50VHlwZSA9PT0gY29udHJhY3RzLktlcm5lbEluZm9Qcm9kdWNlZFR5cGUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGVudmVsb3BlLmNvbW1hbmQgPT09IG51bGwgfHwgZW52ZWxvcGUuY29tbWFuZCA9PT0gdW5kZWZpbmVkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXJuZWxJbmZvUHJvZHVjZWQgPSA8Y29udHJhY3RzLktlcm5lbEluZm9Qcm9kdWNlZD5lbnZlbG9wZS5ldmVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVLZXJuZWxJbmZvRnJvbUV2ZW50KGtlcm5lbEluZm9Qcm9kdWNlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVibGlzaEV2ZW50KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZTogY29udHJhY3RzLktlcm5lbEluZm9Qcm9kdWNlZFR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IHsga2VybmVsSW5mbzogdGhpcy5rZXJuZWxJbmZvIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChlbnZlbG9wZS5jb21tYW5kIS50b2tlbiA9PT0gY29tbWFuZFRva2VuKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtlcm5lbFVyaSBvZiBlbnZlbG9wZS5jb21tYW5kIS5yb3V0aW5nU2xpcCEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udHJ5QWRkVXJpVG9Sb3V0aW5nU2xpcChjb21tYW5kSW52b2NhdGlvbi5jb21tYW5kRW52ZWxvcGUsIGtlcm5lbFVyaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnZlbG9wZS5jb21tYW5kIS5yb3V0aW5nU2xpcCA9IGNvbW1hbmRJbnZvY2F0aW9uLmNvbW1hbmRFbnZlbG9wZS5yb3V0aW5nU2xpcDsvLz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChlbnZlbG9wZS5ldmVudFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgY29udHJhY3RzLktlcm5lbEluZm9Qcm9kdWNlZFR5cGU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXJuZWxJbmZvUHJvZHVjZWQgPSA8Y29udHJhY3RzLktlcm5lbEluZm9Qcm9kdWNlZD5lbnZlbG9wZS5ldmVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtlcm5lbEluZm9Qcm9kdWNlZC5rZXJuZWxJbmZvLnVyaSA9PT0gdGhpcy5rZXJuZWxJbmZvLnJlbW90ZVVyaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVLZXJuZWxJbmZvRnJvbUV2ZW50KGtlcm5lbEluZm9Qcm9kdWNlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlUHVibGljYXRpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFR5cGU6IGNvbnRyYWN0cy5LZXJuZWxJbmZvUHJvZHVjZWRUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudDogeyBrZXJuZWxJbmZvOiB0aGlzLmtlcm5lbEluZm8gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGluZ1NsaXA6IGVudmVsb3BlLnJvdXRpbmdTbGlwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBjb21tYW5kSW52b2NhdGlvbi5jb21tYW5kRW52ZWxvcGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBjb21tYW5kSW52b2NhdGlvbi5jb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGVQdWJsaWNhdGlvbihlbnZlbG9wZSwgY29tbWFuZEludm9jYXRpb24uY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlUHVibGljYXRpb24oZW52ZWxvcGUsIGNvbW1hbmRJbnZvY2F0aW9uLmNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBjb250cmFjdHMuQ29tbWFuZENhbmNlbGxlZFR5cGU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGNvbnRyYWN0cy5Db21tYW5kRmFpbGVkVHlwZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgY29udHJhY3RzLkNvbW1hbmRTdWNjZWVkZWRUeXBlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5kZWZhdWx0LmluZm8oYHByb3h5IG5hbWU9JHt0aGlzLm5hbWV9W2xvY2FsIHVyaToke3RoaXMua2VybmVsSW5mby51cml9LCByZW1vdGUgdXJpOiR7dGhpcy5rZXJuZWxJbmZvLnJlbW90ZVVyaX1dIGZpbmlzaGVkLCBlbnZlbG9wZWlkPSR7ZW52ZWxvcGUuY29tbWFuZCEuaWR9LCBjb21tYW5kaWQ9JHtjb21tYW5kSWR9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudmVsb3BlLmNvbW1hbmQhLmlkID09PSBjb21tYW5kSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvblNvdXJjZS5yZXNvbHZlKGVudmVsb3BlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlUHVibGljYXRpb24oZW52ZWxvcGUsIGNvbW1hbmRJbnZvY2F0aW9uLmNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZVB1YmxpY2F0aW9uKGVudmVsb3BlLCBjb21tYW5kSW52b2NhdGlvbi5jb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoIWNvbW1hbmRJbnZvY2F0aW9uLmNvbW1hbmRFbnZlbG9wZS5jb21tYW5kLmRlc3RpbmF0aW9uVXJpIHx8ICFjb21tYW5kSW52b2NhdGlvbi5jb21tYW5kRW52ZWxvcGUuY29tbWFuZC5vcmlnaW5VcmkpIHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRJbnZvY2F0aW9uLmNvbW1hbmRFbnZlbG9wZS5jb21tYW5kLm9yaWdpblVyaSA/Pz0gdGhpcy5rZXJuZWxJbmZvLnVyaTtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRJbnZvY2F0aW9uLmNvbW1hbmRFbnZlbG9wZS5jb21tYW5kLmRlc3RpbmF0aW9uVXJpID8/PSB0aGlzLmtlcm5lbEluZm8ucmVtb3RlVXJpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb21tYW5kSW52b2NhdGlvbi5jb21tYW5kRW52ZWxvcGUucm91dGluZ1NsaXA7Ly8/XHJcbiAgICAgICAgICAgIExvZ2dlci5kZWZhdWx0LmluZm8oYHByb3h5ICR7dGhpcy5uYW1lfVtsb2NhbCB1cmk6JHt0aGlzLmtlcm5lbEluZm8udXJpfSwgcmVtb3RlIHVyaToke3RoaXMua2VybmVsSW5mby5yZW1vdGVVcml9XSBmb3J3YXJkaW5nIGNvbW1hbmQgJHtjb21tYW5kSW52b2NhdGlvbi5jb21tYW5kRW52ZWxvcGUuY29tbWFuZFR5cGV9IHRvICR7Y29tbWFuZEludm9jYXRpb24uY29tbWFuZEVudmVsb3BlLmNvbW1hbmQuZGVzdGluYXRpb25Vcml9YCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbmRlci5zZW5kKGNvbW1hbmRJbnZvY2F0aW9uLmNvbW1hbmRFbnZlbG9wZSk7XHJcbiAgICAgICAgICAgIExvZ2dlci5kZWZhdWx0LmluZm8oYHByb3h5ICR7dGhpcy5uYW1lfVtsb2NhbCB1cmk6JHt0aGlzLmtlcm5lbEluZm8udXJpfSwgcmVtb3RlIHVyaToke3RoaXMua2VybmVsSW5mby5yZW1vdGVVcml9XSBhYm91dCB0byBhd2FpdCB3aXRoIHRva2VuICR7Y29tbWFuZFRva2VufWApO1xyXG4gICAgICAgICAgICBjb25zdCBlbnZlbnRFbnZlbG9wZSA9IGF3YWl0IGNvbXBsZXRpb25Tb3VyY2UucHJvbWlzZTtcclxuICAgICAgICAgICAgaWYgKGVudmVudEVudmVsb3BlLmV2ZW50VHlwZSA9PT0gY29udHJhY3RzLkNvbW1hbmRGYWlsZWRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kSW52b2NhdGlvbi5jb250ZXh0LmZhaWwoKDxjb250cmFjdHMuQ29tbWFuZEZhaWxlZD5lbnZlbnRFbnZlbG9wZS5ldmVudCkubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTG9nZ2VyLmRlZmF1bHQuaW5mbyhgcHJveHkgJHt0aGlzLm5hbWV9W2xvY2FsIHVyaToke3RoaXMua2VybmVsSW5mby51cml9LCByZW1vdGUgdXJpOiR7dGhpcy5rZXJuZWxJbmZvLnJlbW90ZVVyaX1dIGRvbmUgYXdhaXRpbmcgd2l0aCB0b2tlbiAke2NvbW1hbmRUb2tlbn1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29tbWFuZEludm9jYXRpb24uY29udGV4dC5mYWlsKCg8YW55PmUpLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgZXZlbnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcbmltcG9ydCB7IENvbXBvc2l0ZUtlcm5lbCB9IGZyb20gJy4vY29tcG9zaXRlS2VybmVsJztcclxuaW1wb3J0ICogYXMgY29udHJhY3RzIGZyb20gJy4vY29udHJhY3RzJztcclxuaW1wb3J0ICogYXMgY29ubmVjdGlvbiBmcm9tICcuL2Nvbm5lY3Rpb24nO1xyXG5pbXBvcnQgeyBLZXJuZWwgfSBmcm9tICcuL2tlcm5lbCc7XHJcbmltcG9ydCB7IFByb3h5S2VybmVsIH0gZnJvbSAnLi9wcm94eUtlcm5lbCc7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcclxuaW1wb3J0IHsgS2VybmVsU2NoZWR1bGVyIH0gZnJvbSAnLi9rZXJuZWxTY2hlZHVsZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIEtlcm5lbEhvc3Qge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcmVtb3RlVXJpVG9LZXJuZWwgPSBuZXcgTWFwPHN0cmluZywgS2VybmVsPigpO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdXJpVG9LZXJuZWwgPSBuZXcgTWFwPHN0cmluZywgS2VybmVsPigpO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfa2VybmVsVG9LZXJuZWxJbmZvID0gbmV3IE1hcDxLZXJuZWwsIGNvbnRyYWN0cy5LZXJuZWxJbmZvPigpO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdXJpOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zY2hlZHVsZXI6IEtlcm5lbFNjaGVkdWxlcjxjb250cmFjdHMuS2VybmVsQ29tbWFuZEVudmVsb3BlPjtcclxuICAgIHByaXZhdGUgX2tlcm5lbDogQ29tcG9zaXRlS2VybmVsO1xyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdENvbm5lY3RvcjogY29ubmVjdGlvbi5Db25uZWN0b3I7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb25uZWN0b3JzOiBjb25uZWN0aW9uLkNvbm5lY3RvcltdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3Ioa2VybmVsOiBDb21wb3NpdGVLZXJuZWwsIHNlbmRlcjogY29ubmVjdGlvbi5JS2VybmVsQ29tbWFuZEFuZEV2ZW50U2VuZGVyLCByZWNlaXZlcjogY29ubmVjdGlvbi5JS2VybmVsQ29tbWFuZEFuZEV2ZW50UmVjZWl2ZXIsIGhvc3RVcmk6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2tlcm5lbCA9IGtlcm5lbDtcclxuICAgICAgICB0aGlzLl91cmkgPSBob3N0VXJpIHx8IFwia2VybmVsOi8vdnNjb2RlXCI7XHJcbiAgICAgICAgdGhpcy5fa2VybmVsLmhvc3QgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX3NjaGVkdWxlciA9IG5ldyBLZXJuZWxTY2hlZHVsZXI8Y29udHJhY3RzLktlcm5lbENvbW1hbmRFbnZlbG9wZT4oKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdENvbm5lY3RvciA9IG5ldyBjb25uZWN0aW9uLkNvbm5lY3Rvcih7IHNlbmRlciwgcmVjZWl2ZXIgfSk7XHJcbiAgICAgICAgdGhpcy5fY29ubmVjdG9ycy5wdXNoKHRoaXMuX2RlZmF1bHRDb25uZWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdXJpKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VyaTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdHJ5R2V0S2VybmVsQnlSZW1vdGVVcmkocmVtb3RlVXJpOiBzdHJpbmcpOiBLZXJuZWwgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZW1vdGVVcmlUb0tlcm5lbC5nZXQocmVtb3RlVXJpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdHJ5Z2V0S2VybmVsQnlPcmlnaW5Vcmkob3JpZ2luVXJpOiBzdHJpbmcpOiBLZXJuZWwgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91cmlUb0tlcm5lbC5nZXQob3JpZ2luVXJpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdHJ5R2V0S2VybmVsSW5mbyhrZXJuZWw6IEtlcm5lbCk6IGNvbnRyYWN0cy5LZXJuZWxJbmZvIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fa2VybmVsVG9LZXJuZWxJbmZvLmdldChrZXJuZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRLZXJuZWxJbmZvKGtlcm5lbDogS2VybmVsLCBrZXJuZWxJbmZvOiBjb250cmFjdHMuS2VybmVsSW5mbykge1xyXG5cclxuICAgICAgICBrZXJuZWxJbmZvLnVyaSA9IGAke3RoaXMuX3VyaX0vJHtrZXJuZWwubmFtZX1gOy8vP1xyXG4gICAgICAgIHRoaXMuX2tlcm5lbFRvS2VybmVsSW5mby5zZXQoa2VybmVsLCBrZXJuZWxJbmZvKTtcclxuICAgICAgICB0aGlzLl91cmlUb0tlcm5lbC5zZXQoa2VybmVsSW5mby51cmksIGtlcm5lbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEtlcm5lbChrZXJuZWxDb21tYW5kRW52ZWxvcGU6IGNvbnRyYWN0cy5LZXJuZWxDb21tYW5kRW52ZWxvcGUpOiBLZXJuZWwge1xyXG5cclxuICAgICAgICBjb25zdCB1cmlUb0xvb2t1cCA9IGtlcm5lbENvbW1hbmRFbnZlbG9wZS5jb21tYW5kLmRlc3RpbmF0aW9uVXJpID8/IGtlcm5lbENvbW1hbmRFbnZlbG9wZS5jb21tYW5kLm9yaWdpblVyaTtcclxuICAgICAgICBsZXQga2VybmVsOiBLZXJuZWwgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKHVyaVRvTG9va3VwKSB7XHJcbiAgICAgICAgICAgIGtlcm5lbCA9IHRoaXMuX2tlcm5lbC5maW5kS2VybmVsQnlVcmkodXJpVG9Mb29rdXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFrZXJuZWwpIHtcclxuICAgICAgICAgICAgaWYgKGtlcm5lbENvbW1hbmRFbnZlbG9wZS5jb21tYW5kLnRhcmdldEtlcm5lbE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGtlcm5lbCA9IHRoaXMuX2tlcm5lbC5maW5kS2VybmVsQnlOYW1lKGtlcm5lbENvbW1hbmRFbnZlbG9wZS5jb21tYW5kLnRhcmdldEtlcm5lbE5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBrZXJuZWwgPz89IHRoaXMuX2tlcm5lbDtcclxuICAgICAgICBMb2dnZXIuZGVmYXVsdC5pbmZvKGBVc2luZyBLZXJuZWwgJHtrZXJuZWwubmFtZX1gKTtcclxuICAgICAgICByZXR1cm4ga2VybmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25uZWN0UHJveHlLZXJuZWxPbkRlZmF1bHRDb25uZWN0b3IobG9jYWxOYW1lOiBzdHJpbmcsIHJlbW90ZUtlcm5lbFVyaT86IHN0cmluZywgYWxpYXNlcz86IHN0cmluZ1tdKTogUHJveHlLZXJuZWwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RQcm94eUtlcm5lbE9uQ29ubmVjdG9yKGxvY2FsTmFtZSwgdGhpcy5fZGVmYXVsdENvbm5lY3Rvci5zZW5kZXIsIHRoaXMuX2RlZmF1bHRDb25uZWN0b3IucmVjZWl2ZXIsIHJlbW90ZUtlcm5lbFVyaSwgYWxpYXNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRyeUFkZENvbm5lY3Rvcihjb25uZWN0b3I6IHsgc2VuZGVyOiBjb25uZWN0aW9uLklLZXJuZWxDb21tYW5kQW5kRXZlbnRTZW5kZXIsIHJlY2VpdmVyOiBjb25uZWN0aW9uLklLZXJuZWxDb21tYW5kQW5kRXZlbnRSZWNlaXZlciwgcmVtb3RlVXJpcz86IHN0cmluZ1tdIH0pIHtcclxuICAgICAgICBpZiAoIWNvbm5lY3Rvci5yZW1vdGVVcmlzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3RvcnMucHVzaChuZXcgY29ubmVjdGlvbi5Db25uZWN0b3IoY29ubmVjdG9yKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gY29ubmVjdG9yLnJlbW90ZVVyaXMhLmZpbmQodXJpID0+IHRoaXMuX2Nvbm5lY3RvcnMuZmluZChjID0+IGMuY2FuUmVhY2godXJpKSkpO1xyXG4gICAgICAgICAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0b3JzLnB1c2gobmV3IGNvbm5lY3Rpb24uQ29ubmVjdG9yKGNvbm5lY3RvcikpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29ubmVjdFByb3h5S2VybmVsKGxvY2FsTmFtZTogc3RyaW5nLCByZW1vdGVLZXJuZWxVcmk6IHN0cmluZywgYWxpYXNlcz86IHN0cmluZ1tdKTogUHJveHlLZXJuZWwge1xyXG4gICAgICAgIHRoaXMuX2Nvbm5lY3RvcnM7Ly8/XHJcbiAgICAgICAgY29uc3QgY29ubmVjdG9yID0gdGhpcy5fY29ubmVjdG9ycy5maW5kKGMgPT4gYy5jYW5SZWFjaChyZW1vdGVLZXJuZWxVcmkpKTtcclxuICAgICAgICBpZiAoIWNvbm5lY3Rvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIGNvbm5lY3RvciB0byByZWFjaCAke3JlbW90ZUtlcm5lbFVyaX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGtlcm5lbCA9IG5ldyBQcm94eUtlcm5lbChsb2NhbE5hbWUsIGNvbm5lY3Rvci5zZW5kZXIsIGNvbm5lY3Rvci5yZWNlaXZlcik7XHJcbiAgICAgICAga2VybmVsLmtlcm5lbEluZm8ucmVtb3RlVXJpID0gcmVtb3RlS2VybmVsVXJpO1xyXG4gICAgICAgIHRoaXMuX2tlcm5lbC5hZGQoa2VybmVsLCBhbGlhc2VzKTtcclxuICAgICAgICByZXR1cm4ga2VybmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29ubmVjdFByb3h5S2VybmVsT25Db25uZWN0b3IobG9jYWxOYW1lOiBzdHJpbmcsIHNlbmRlcjogY29ubmVjdGlvbi5JS2VybmVsQ29tbWFuZEFuZEV2ZW50U2VuZGVyLCByZWNlaXZlcjogY29ubmVjdGlvbi5JS2VybmVsQ29tbWFuZEFuZEV2ZW50UmVjZWl2ZXIsIHJlbW90ZUtlcm5lbFVyaT86IHN0cmluZywgYWxpYXNlcz86IHN0cmluZ1tdKTogUHJveHlLZXJuZWwge1xyXG4gICAgICAgIGxldCBrZXJuZWwgPSBuZXcgUHJveHlLZXJuZWwobG9jYWxOYW1lLCBzZW5kZXIsIHJlY2VpdmVyKTtcclxuICAgICAgICBrZXJuZWwua2VybmVsSW5mby5yZW1vdGVVcmkgPSByZW1vdGVLZXJuZWxVcmk7XHJcbiAgICAgICAgdGhpcy5fa2VybmVsLmFkZChrZXJuZWwsIGFsaWFzZXMpO1xyXG4gICAgICAgIHJldHVybiBrZXJuZWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRyeUdldENvbm5lY3RvcihyZW1vdGVVcmk6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25uZWN0b3JzLmZpbmQoYyA9PiBjLmNhblJlYWNoKHJlbW90ZVVyaSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25uZWN0KCkge1xyXG4gICAgICAgIHRoaXMuX2tlcm5lbC5zdWJzY3JpYmVUb0tlcm5lbEV2ZW50cyhlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fZGVmYXVsdENvbm5lY3Rvci5zZW5kZXIuc2VuZChlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdENvbm5lY3Rvci5yZWNlaXZlci5zdWJzY3JpYmUoe1xyXG4gICAgICAgICAgICBuZXh0OiAoa2VybmVsQ29tbWFuZE9yRXZlbnRFbnZlbG9wZTogY29ubmVjdGlvbi5LZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5pc0tlcm5lbENvbW1hbmRFbnZlbG9wZShrZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci5ydW5Bc3luYyhrZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlLCBjb21tYW5kRW52ZWxvcGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXJuZWwgPSB0aGlzLl9rZXJuZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXJuZWwuc2VuZChjb21tYW5kRW52ZWxvcGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2RlZmF1bHRDb25uZWN0b3Iuc2VuZGVyLnNlbmQoeyBldmVudFR5cGU6IGNvbnRyYWN0cy5LZXJuZWxSZWFkeVR5cGUsIGV2ZW50OiB7fSwgcm91dGluZ1NsaXA6IFt0aGlzLl9rZXJuZWwua2VybmVsSW5mby51cmkhXSB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5wdWJsaXNoS2VybmVJbmZvKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHB1Ymxpc2hLZXJuZUluZm8oKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IHRoaXMuZ2V0S2VybmVsSW5mb1Byb2R1Y2VkKCk7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgZXZlbnRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRDb25uZWN0b3Iuc2VuZGVyLnNlbmQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0S2VybmVsSW5mb1Byb2R1Y2VkKCk6IGNvbnRyYWN0cy5LZXJuZWxFdmVudEVudmVsb3BlW10ge1xyXG4gICAgICAgIGxldCBldmVudHM6IGNvbnRyYWN0cy5LZXJuZWxFdmVudEVudmVsb3BlW10gPSBbXTtcclxuICAgICAgICBldmVudHMucHVzaCh7IGV2ZW50VHlwZTogY29udHJhY3RzLktlcm5lbEluZm9Qcm9kdWNlZFR5cGUsIGV2ZW50OiA8Y29udHJhY3RzLktlcm5lbEluZm9Qcm9kdWNlZD57IGtlcm5lbEluZm86IHRoaXMuX2tlcm5lbC5rZXJuZWxJbmZvIH0sIHJvdXRpbmdTbGlwOiBbdGhpcy5fa2VybmVsLmtlcm5lbEluZm8udXJpIV0gfSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGtlcm5lbCBvZiB0aGlzLl9rZXJuZWwuY2hpbGRLZXJuZWxzKSB7XHJcbiAgICAgICAgICAgIGV2ZW50cy5wdXNoKHsgZXZlbnRUeXBlOiBjb250cmFjdHMuS2VybmVsSW5mb1Byb2R1Y2VkVHlwZSwgZXZlbnQ6IDxjb250cmFjdHMuS2VybmVsSW5mb1Byb2R1Y2VkPnsga2VybmVsSW5mbzoga2VybmVsLmtlcm5lbEluZm8gfSwgcm91dGluZ1NsaXA6IFtrZXJuZWwua2VybmVsSW5mby51cmkhXSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBldmVudHM7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcbmltcG9ydCB7IENvbXBvc2l0ZUtlcm5lbCB9IGZyb20gXCIuLi9jb21wb3NpdGVLZXJuZWxcIjtcclxuaW1wb3J0IHsgSmF2YXNjcmlwdEtlcm5lbCB9IGZyb20gXCIuLi9qYXZhc2NyaXB0S2VybmVsXCI7XHJcbmltcG9ydCB7IEtlcm5lbCB9IGZyb20gXCIuLi9rZXJuZWxcIjtcclxuaW1wb3J0IHsgTG9nRW50cnksIExvZ2dlciB9IGZyb20gXCIuLi9sb2dnZXJcIjtcclxuaW1wb3J0IHsgS2VybmVsSG9zdCB9IGZyb20gXCIuLi9rZXJuZWxIb3N0XCI7XHJcbmltcG9ydCAqIGFzIHJ4anMgZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0ICogYXMgY29ubmVjdGlvbiBmcm9tIFwiLi4vY29ubmVjdGlvblwiO1xyXG5pbXBvcnQgKiBhcyBjb250cmFjdHMgZnJvbSBcIi4uL2NvbnRyYWN0c1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhvc3QoXHJcbiAgICBnbG9iYWw6IGFueSxcclxuICAgIGNvbXBvc2l0ZUtlcm5lbE5hbWU6IHN0cmluZyxcclxuICAgIGNvbmZpZ3VyZVJlcXVpcmU6IChpbnRlcmFjdGl2ZTogYW55KSA9PiB2b2lkLFxyXG4gICAgbG9nTWVzc2FnZTogKGVudHJ5OiBMb2dFbnRyeSkgPT4gdm9pZCxcclxuICAgIGxvY2FsVG9SZW1vdGU6IHJ4anMuT2JzZXJ2ZXI8Y29ubmVjdGlvbi5LZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlPixcclxuICAgIHJlbW90ZVRvTG9jYWw6IHJ4anMuT2JzZXJ2YWJsZTxjb25uZWN0aW9uLktlcm5lbENvbW1hbmRPckV2ZW50RW52ZWxvcGU+LFxyXG4gICAgb25SZWFkeTogKCkgPT4gdm9pZCkge1xyXG4gICAgTG9nZ2VyLmNvbmZpZ3VyZShjb21wb3NpdGVLZXJuZWxOYW1lLCBsb2dNZXNzYWdlKTtcclxuXHJcbiAgICBnbG9iYWwuaW50ZXJhY3RpdmUgPSB7fTtcclxuICAgIGNvbmZpZ3VyZVJlcXVpcmUoZ2xvYmFsLmludGVyYWN0aXZlKTtcclxuXHJcbiAgICBnbG9iYWwua2VybmVsID0ge1xyXG4gICAgICAgIGdldCByb290KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gS2VybmVsLnJvb3Q7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjb21wb3NpdGVLZXJuZWwgPSBuZXcgQ29tcG9zaXRlS2VybmVsKGNvbXBvc2l0ZUtlcm5lbE5hbWUpO1xyXG4gICAgY29uc3Qga2VybmVsSG9zdCA9IG5ldyBLZXJuZWxIb3N0KGNvbXBvc2l0ZUtlcm5lbCwgY29ubmVjdGlvbi5LZXJuZWxDb21tYW5kQW5kRXZlbnRTZW5kZXIuRnJvbU9ic2VydmVyKGxvY2FsVG9SZW1vdGUpLCBjb25uZWN0aW9uLktlcm5lbENvbW1hbmRBbmRFdmVudFJlY2VpdmVyLkZyb21PYnNlcnZhYmxlKHJlbW90ZVRvTG9jYWwpLCBga2VybmVsOi8vJHtjb21wb3NpdGVLZXJuZWxOYW1lfWApO1xyXG4gICAgcmVtb3RlVG9Mb2NhbC5zdWJzY3JpYmUoe1xyXG4gICAgICAgIG5leHQ6IChlbnZlbG9wZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5pc0tlcm5lbEV2ZW50RW52ZWxvcGUoZW52ZWxvcGUpICYmIGVudmVsb3BlLmV2ZW50VHlwZSA9PT0gY29udHJhY3RzLktlcm5lbEluZm9Qcm9kdWNlZFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGtlcm5lbEluZm9Qcm9kdWNlZCA9IDxjb250cmFjdHMuS2VybmVsSW5mb1Byb2R1Y2VkPmVudmVsb3BlLmV2ZW50O1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5lbnN1cmVPclVwZGF0ZVByb3h5Rm9yS2VybmVsSW5mbyhrZXJuZWxJbmZvUHJvZHVjZWQsIGNvbXBvc2l0ZUtlcm5lbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBnbG9iYWxbY29tcG9zaXRlS2VybmVsTmFtZV0gPSB7XHJcbiAgICAgICAgY29tcG9zaXRlS2VybmVsLFxyXG4gICAgICAgIGtlcm5lbEhvc3QsXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGpzS2VybmVsID0gbmV3IEphdmFzY3JpcHRLZXJuZWwoKTtcclxuICAgIGNvbXBvc2l0ZUtlcm5lbC5hZGQoanNLZXJuZWwsIFtcImpzXCJdKTtcclxuXHJcbiAgICBrZXJuZWxIb3N0LmNvbm5lY3QoKTtcclxuXHJcbiAgICBvblJlYWR5KCk7XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcbmltcG9ydCAqIGFzIGNvbnRyYWN0cyBmcm9tIFwiLi9jb250cmFjdHNcIjtcclxuaW1wb3J0IHsgSHRtbEtlcm5lbCB9IGZyb20gXCIuL2h0bWxLZXJuZWxcIjtcclxuaW1wb3J0ICogYXMgZnJvbnRFbmRIb3N0IGZyb20gJy4vd2Vidmlldy9mcm9udEVuZEhvc3QnO1xyXG5pbXBvcnQgKiBhcyByeGpzIGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCAqIGFzIGNvbm5lY3Rpb24gZnJvbSBcIi4vY29ubmVjdGlvblwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwKGNvbmZpZ3VyYXRpb24/OiB7IGdsb2JhbD86IGFueSwgaG9zdE5hbWU6IHN0cmluZyB9KSB7XHJcblxyXG4gICAgY29uc3QgcmVtb3RlVG9Mb2NhbCA9IG5ldyByeGpzLlN1YmplY3Q8Y29ubmVjdGlvbi5LZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlPigpO1xyXG4gICAgY29uc3QgbG9jYWxUb1JlbW90ZSA9IG5ldyByeGpzLlN1YmplY3Q8Y29ubmVjdGlvbi5LZXJuZWxDb21tYW5kT3JFdmVudEVudmVsb3BlPigpO1xyXG5cclxuICAgIGNvbnN0IGdsb2JhbCA9IChjb25maWd1cmF0aW9uPy5nbG9iYWwgfHwgd2luZG93KTtcclxuXHJcbiAgICBsb2NhbFRvUmVtb3RlLnN1YnNjcmliZSh7XHJcbiAgICAgICAgbmV4dDogZW52ZWxvcGUgPT4ge1xyXG4gICAgICAgICAgICBnbG9iYWw/LnB1Ymxpc2hDb21tYW5kT3JFdmVudChlbnZlbG9wZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGdsb2JhbCkge1xyXG4gICAgICAgIGdsb2JhbC5zZW5kS2VybmVsQ29tbWFuZCA9IChrZXJuZWxDb21tYW5kRW52ZWxvcGU6IGNvbnRyYWN0cy5LZXJuZWxDb21tYW5kRW52ZWxvcGUpID0+IHtcclxuICAgICAgICAgICAgcmVtb3RlVG9Mb2NhbC5uZXh0KGtlcm5lbENvbW1hbmRFbnZlbG9wZSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb21wb3NpdGVLZXJuZWxOYW1lID0gY29uZmlndXJhdGlvbj8uaG9zdE5hbWUgfHwgJ2Jyb3dzZXInO1xyXG4gICAgZnJvbnRFbmRIb3N0LmNyZWF0ZUhvc3QoXHJcbiAgICAgICAgZ2xvYmFsLFxyXG4gICAgICAgIGNvbXBvc2l0ZUtlcm5lbE5hbWUsXHJcbiAgICAgICAgY29uZmlndXJlUmVxdWlyZSxcclxuICAgICAgICBfZW50cnkgPT4ge1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvY2FsVG9SZW1vdGUsXHJcbiAgICAgICAgcmVtb3RlVG9Mb2NhbCxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGh0bWxLZXJuZWwgPSBuZXcgSHRtbEtlcm5lbCgpO1xyXG4gICAgICAgICAgICBnbG9iYWxbY29tcG9zaXRlS2VybmVsTmFtZV0uY29tcG9zaXRlS2VybmVsLmFkZChodG1sS2VybmVsKTtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbmZpZ3VyZVJlcXVpcmUoaW50ZXJhY3RpdmU6IGFueSkge1xyXG4gICAgICAgIGlmICgodHlwZW9mIChyZXF1aXJlKSAhPT0gdHlwZW9mIChGdW5jdGlvbikpIHx8ICh0eXBlb2YgKCg8YW55PnJlcXVpcmUpLmNvbmZpZykgIT09IHR5cGVvZiAoRnVuY3Rpb24pKSkge1xyXG4gICAgICAgICAgICBsZXQgcmVxdWlyZV9zY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICAgICAgcmVxdWlyZV9zY3JpcHQuc2V0QXR0cmlidXRlKCdzcmMnLCAnaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvcmVxdWlyZS5qcy8yLjMuNi9yZXF1aXJlLm1pbi5qcycpO1xyXG4gICAgICAgICAgICByZXF1aXJlX3NjcmlwdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9qYXZhc2NyaXB0Jyk7XHJcbiAgICAgICAgICAgIHJlcXVpcmVfc2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGludGVyYWN0aXZlLmNvbmZpZ3VyZVJlcXVpcmUgPSAoY29uZmluZzogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8YW55PnJlcXVpcmUpLmNvbmZpZyhjb25maW5nKSB8fCByZXF1aXJlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQocmVxdWlyZV9zY3JpcHQpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbnRlcmFjdGl2ZS5jb25maWd1cmVSZXF1aXJlID0gKGNvbmZpbmc6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICg8YW55PnJlcXVpcmUpLmNvbmZpZyhjb25maW5nKSB8fCByZXF1aXJlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdLCJuYW1lcyI6WyJTeW1ib2xfb2JzZXJ2YWJsZSIsIkluc2VydFRleHRGb3JtYXQiLCJEaWFnbm9zdGljU2V2ZXJpdHkiLCJEb2N1bWVudFNlcmlhbGl6YXRpb25UeXBlIiwiUmVxdWVzdFR5cGUiLCJTdWJtaXNzaW9uVHlwZSIsInJ4anMuU3ViamVjdCIsImNvbnRyYWN0cy5Db21tYW5kU3VjY2VlZGVkVHlwZSIsImNvbnRyYWN0cy5Db21tYW5kRmFpbGVkVHlwZSIsIkxvZ0xldmVsIiwiS2VybmVsVHlwZSIsImNvbnRyYWN0cy5SZXF1ZXN0S2VybmVsSW5mb1R5cGUiLCJjb250cmFjdHMuS2VybmVsSW5mb1Byb2R1Y2VkVHlwZSIsInJ4anMubWFwIiwiY29udHJhY3RzLkRpc3BsYXllZFZhbHVlUHJvZHVjZWRUeXBlIiwiY29udHJhY3RzLlN1Ym1pdENvZGVUeXBlIiwiY29udHJhY3RzLkNvZGVTdWJtaXNzaW9uUmVjZWl2ZWRUeXBlIiwiY29udHJhY3RzLlJlcXVlc3RWYWx1ZUluZm9zVHlwZSIsImNvbnRyYWN0cy5SZXF1ZXN0VmFsdWVUeXBlIiwiY29udHJhY3RzLlJldHVyblZhbHVlUHJvZHVjZWRUeXBlIiwiY29udHJhY3RzLlZhbHVlSW5mb3NQcm9kdWNlZFR5cGUiLCJjb250cmFjdHMuVmFsdWVQcm9kdWNlZFR5cGUiLCJjb25uZWN0aW9uLnRyeUFkZFVyaVRvUm91dGluZ1NsaXAiLCJjb25uZWN0aW9uLnVwZGF0ZUtlcm5lbEluZm8iLCJjb25uZWN0aW9uLmlzS2VybmVsRXZlbnRFbnZlbG9wZSIsImNvbnRyYWN0cy5Db21tYW5kQ2FuY2VsbGVkVHlwZSIsImNvbm5lY3Rpb24uQ29ubmVjdG9yIiwiY29ubmVjdGlvbi5pc0tlcm5lbENvbW1hbmRFbnZlbG9wZSIsImNvbnRyYWN0cy5LZXJuZWxSZWFkeVR5cGUiLCJjb25uZWN0aW9uLktlcm5lbENvbW1hbmRBbmRFdmVudFNlbmRlciIsImNvbm5lY3Rpb24uS2VybmVsQ29tbWFuZEFuZEV2ZW50UmVjZWl2ZXIiLCJjb25uZWN0aW9uLmVuc3VyZU9yVXBkYXRlUHJveHlGb3JLZXJuZWxJbmZvIiwiZnJvbnRFbmRIb3N0LmNyZWF0ZUhvc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQU8sU0FBUyxVQUFVLENBQUMsS0FBSyxFQUFFO0lBQ2xDLElBQUksT0FBTyxPQUFPLEtBQUssS0FBSyxVQUFVLENBQUM7SUFDdkM7O0lDRk8sU0FBUyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUU7SUFDN0MsSUFBSSxJQUFJLE1BQU0sR0FBRyxVQUFVLFFBQVEsRUFBRTtJQUNyQyxRQUFRLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0IsUUFBUSxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDO0lBQzNDLEtBQUssQ0FBQztJQUNOLElBQUksSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLElBQUksUUFBUSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4RCxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztJQUM5QyxJQUFJLE9BQU8sUUFBUSxDQUFDO0lBQ3BCOztJQ1JPLElBQUksbUJBQW1CLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxNQUFNLEVBQUU7SUFDcEUsSUFBSSxP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
