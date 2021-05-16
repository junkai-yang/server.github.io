(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dashboard-dashboard-module"],{

/***/ "GU7r":
/*!**********************************************************************!*\
  !*** ./node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/observers.js ***!
  \**********************************************************************/
/*! exports provided: CdkObserveContent, ContentObserver, MutationObserverFactory, ObserversModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdkObserveContent", function() { return CdkObserveContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentObserver", function() { return ContentObserver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MutationObserverFactory", function() { return MutationObserverFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObserversModule", function() { return ObserversModule; });
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/coercion */ "8LU1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");





/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Factory that creates a new MutationObserver and allows us to stub it out in unit tests.
 * @docs-private
 */

class MutationObserverFactory {
    create(callback) {
        return typeof MutationObserver === 'undefined' ? null : new MutationObserver(callback);
    }
}
MutationObserverFactory.ɵfac = function MutationObserverFactory_Factory(t) { return new (t || MutationObserverFactory)(); };
MutationObserverFactory.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function MutationObserverFactory_Factory() { return new MutationObserverFactory(); }, token: MutationObserverFactory, providedIn: "root" });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MutationObserverFactory, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], null, null); })();
/** An injectable service that allows watching elements for changes to their content. */
class ContentObserver {
    constructor(_mutationObserverFactory) {
        this._mutationObserverFactory = _mutationObserverFactory;
        /** Keeps track of the existing MutationObservers so they can be reused. */
        this._observedElements = new Map();
    }
    ngOnDestroy() {
        this._observedElements.forEach((_, element) => this._cleanupObserver(element));
    }
    observe(elementOrRef) {
        const element = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceElement"])(elementOrRef);
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"]((observer) => {
            const stream = this._observeElement(element);
            const subscription = stream.subscribe(observer);
            return () => {
                subscription.unsubscribe();
                this._unobserveElement(element);
            };
        });
    }
    /**
     * Observes the given element by using the existing MutationObserver if available, or creating a
     * new one if not.
     */
    _observeElement(element) {
        if (!this._observedElements.has(element)) {
            const stream = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
            const observer = this._mutationObserverFactory.create(mutations => stream.next(mutations));
            if (observer) {
                observer.observe(element, {
                    characterData: true,
                    childList: true,
                    subtree: true
                });
            }
            this._observedElements.set(element, { observer, stream, count: 1 });
        }
        else {
            this._observedElements.get(element).count++;
        }
        return this._observedElements.get(element).stream;
    }
    /**
     * Un-observes the given element and cleans up the underlying MutationObserver if nobody else is
     * observing this element.
     */
    _unobserveElement(element) {
        if (this._observedElements.has(element)) {
            this._observedElements.get(element).count--;
            if (!this._observedElements.get(element).count) {
                this._cleanupObserver(element);
            }
        }
    }
    /** Clean up the underlying MutationObserver for the specified element. */
    _cleanupObserver(element) {
        if (this._observedElements.has(element)) {
            const { observer, stream } = this._observedElements.get(element);
            if (observer) {
                observer.disconnect();
            }
            stream.complete();
            this._observedElements.delete(element);
        }
    }
}
ContentObserver.ɵfac = function ContentObserver_Factory(t) { return new (t || ContentObserver)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](MutationObserverFactory)); };
ContentObserver.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function ContentObserver_Factory() { return new ContentObserver(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(MutationObserverFactory)); }, token: ContentObserver, providedIn: "root" });
ContentObserver.ctorParameters = () => [
    { type: MutationObserverFactory }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ContentObserver, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: MutationObserverFactory }]; }, null); })();
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
class CdkObserveContent {
    constructor(_contentObserver, _elementRef, _ngZone) {
        this._contentObserver = _contentObserver;
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        /** Event emitted for each change in the element's content. */
        this.event = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this._disabled = false;
        this._currentSubscription = null;
    }
    /**
     * Whether observing content is disabled. This option can be used
     * to disconnect the underlying MutationObserver until it is needed.
     */
    get disabled() { return this._disabled; }
    set disabled(value) {
        this._disabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceBooleanProperty"])(value);
        this._disabled ? this._unsubscribe() : this._subscribe();
    }
    /** Debounce interval for emitting the changes. */
    get debounce() { return this._debounce; }
    set debounce(value) {
        this._debounce = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceNumberProperty"])(value);
        this._subscribe();
    }
    ngAfterContentInit() {
        if (!this._currentSubscription && !this.disabled) {
            this._subscribe();
        }
    }
    ngOnDestroy() {
        this._unsubscribe();
    }
    _subscribe() {
        this._unsubscribe();
        const stream = this._contentObserver.observe(this._elementRef);
        // TODO(mmalerba): We shouldn't be emitting on this @Output() outside the zone.
        // Consider brining it back inside the zone next time we're making breaking changes.
        // Bringing it back inside can cause things like infinite change detection loops and changed
        // after checked errors if people's code isn't handling it properly.
        this._ngZone.runOutsideAngular(() => {
            this._currentSubscription =
                (this.debounce ? stream.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(this.debounce)) : stream).subscribe(this.event);
        });
    }
    _unsubscribe() {
        var _a;
        (_a = this._currentSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
CdkObserveContent.ɵfac = function CdkObserveContent_Factory(t) { return new (t || CdkObserveContent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ContentObserver), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"])); };
CdkObserveContent.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: CdkObserveContent, selectors: [["", "cdkObserveContent", ""]], inputs: { disabled: ["cdkObserveContentDisabled", "disabled"], debounce: "debounce" }, outputs: { event: "cdkObserveContent" }, exportAs: ["cdkObserveContent"] });
CdkObserveContent.ctorParameters = () => [
    { type: ContentObserver },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }
];
CdkObserveContent.propDecorators = {
    event: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"], args: ['cdkObserveContent',] }],
    disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['cdkObserveContentDisabled',] }],
    debounce: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CdkObserveContent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
                selector: '[cdkObserveContent]',
                exportAs: 'cdkObserveContent'
            }]
    }], function () { return [{ type: ContentObserver }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }]; }, { event: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"],
            args: ['cdkObserveContent']
        }], disabled: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"],
            args: ['cdkObserveContentDisabled']
        }], debounce: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }] }); })();
class ObserversModule {
}
ObserversModule.ɵfac = function ObserversModule_Factory(t) { return new (t || ObserversModule)(); };
ObserversModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: ObserversModule });
ObserversModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ providers: [MutationObserverFactory] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ObserversModule, { declarations: [CdkObserveContent], exports: [CdkObserveContent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ObserversModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                exports: [CdkObserveContent],
                declarations: [CdkObserveContent],
                providers: [MutationObserverFactory]
            }]
    }], null, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */



//# sourceMappingURL=observers.js.map

/***/ }),

/***/ "HSCc":
/*!*********************************************************************************!*\
  !*** ./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-pipes.js ***!
  \*********************************************************************************/
/*! exports provided: NzAggregatePipe, NzBytesPipe, NzEllipsisPipe, NzPipesModule, NzSafeNullPipe, NzSanitizerPipe, NzToCssUnitPipe, NzTrimPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzAggregatePipe", function() { return NzAggregatePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzBytesPipe", function() { return NzBytesPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzEllipsisPipe", function() { return NzEllipsisPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzPipesModule", function() { return NzPipesModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzSafeNullPipe", function() { return NzSafeNullPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzSanitizerPipe", function() { return NzSanitizerPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzToCssUnitPipe", function() { return NzToCssUnitPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzTrimPipe", function() { return NzTrimPipe; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd/core/util */ "/KA4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");





/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */


class NzAggregatePipe {
    transform(value, method) {
        if (!Array.isArray(value)) {
            return value;
        }
        if (value.length === 0) {
            return undefined;
        }
        switch (method) {
            case 'sum':
                return Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_2__["sum"])(value);
            case 'avg':
                return Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_2__["sum"])(value) / value.length;
            case 'max':
                return Math.max(...value);
            case 'min':
                return Math.min(...value);
            default:
                throw Error(`Invalid Pipe Arguments: Aggregate pipe doesn't support this type`);
        }
    }
}
NzAggregatePipe.ɵfac = function NzAggregatePipe_Factory(t) { return new (t || NzAggregatePipe)(); };
NzAggregatePipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "nzAggregate", type: NzAggregatePipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NzAggregatePipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"],
        args: [{
                name: 'nzAggregate'
            }]
    }], null, null); })();

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzBytesPipe {
    transform(input, decimal = 0, from = 'B', to) {
        if (!(Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_2__["isNumberFinite"])(input) && Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_2__["isNumberFinite"])(decimal) && decimal % 1 === 0 && decimal >= 0)) {
            return input;
        }
        let bytes = input;
        let unit = from;
        while (unit !== 'B') {
            bytes *= 1024;
            unit = NzBytesPipe.formats[unit].prev;
        }
        if (to) {
            const format = NzBytesPipe.formats[to];
            const result = Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_2__["toDecimal"])(NzBytesPipe.calculateResult(format, bytes), decimal);
            return NzBytesPipe.formatResult(result, to);
        }
        for (const key in NzBytesPipe.formats) {
            if (NzBytesPipe.formats.hasOwnProperty(key)) {
                const format = NzBytesPipe.formats[key];
                if (bytes < format.max) {
                    const result = Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_2__["toDecimal"])(NzBytesPipe.calculateResult(format, bytes), decimal);
                    return NzBytesPipe.formatResult(result, key);
                }
            }
        }
    }
    static formatResult(result, unit) {
        return `${result} ${unit}`;
    }
    static calculateResult(format, bytes) {
        const prev = format.prev ? NzBytesPipe.formats[format.prev] : undefined;
        return prev ? bytes / prev.max : bytes;
    }
}
NzBytesPipe.ɵfac = function NzBytesPipe_Factory(t) { return new (t || NzBytesPipe)(); };
NzBytesPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "nzBytes", type: NzBytesPipe, pure: true });
NzBytesPipe.formats = {
    B: { max: 1024 },
    kB: { max: Math.pow(1024, 2), prev: 'B' },
    KB: { max: Math.pow(1024, 2), prev: 'B' },
    MB: { max: Math.pow(1024, 3), prev: 'kB' },
    GB: { max: Math.pow(1024, 4), prev: 'MB' },
    TB: { max: Number.MAX_SAFE_INTEGER, prev: 'GB' }
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NzBytesPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"],
        args: [{
                name: 'nzBytes'
            }]
    }], null, null); })();

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzToCssUnitPipe {
    transform(value, defaultUnit = 'px') {
        const absoluteLengthUnit = ['cm', 'mm', 'Q', 'in', 'pc', 'pt', 'px'];
        const relativeLengthUnit = ['em', 'ex', 'ch', 'rem', '1h', 'vw', 'vh', 'vmin', 'vmax'];
        const percentagesUnit = ['%'];
        const listOfUnit = [...absoluteLengthUnit, ...relativeLengthUnit, ...percentagesUnit];
        let unit = 'px';
        if (listOfUnit.some(u => u === defaultUnit)) {
            unit = defaultUnit;
        }
        return typeof value === 'number' ? `${value}${unit}` : `${value}`;
    }
}
NzToCssUnitPipe.ɵfac = function NzToCssUnitPipe_Factory(t) { return new (t || NzToCssUnitPipe)(); };
NzToCssUnitPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "nzToCssUnit", type: NzToCssUnitPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NzToCssUnitPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"],
        args: [{
                name: 'nzToCssUnit'
            }]
    }], null, null); })();

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzEllipsisPipe {
    transform(value, length, suffix = '') {
        if (typeof value !== 'string') {
            return value;
        }
        const len = typeof length === 'undefined' ? value.length : length;
        if (value.length <= len) {
            return value;
        }
        return value.substring(0, len) + suffix;
    }
}
NzEllipsisPipe.ɵfac = function NzEllipsisPipe_Factory(t) { return new (t || NzEllipsisPipe)(); };
NzEllipsisPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "nzEllipsis", type: NzEllipsisPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NzEllipsisPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"],
        args: [{
                name: 'nzEllipsis'
            }]
    }], null, null); })();

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSafeNullPipe {
    transform(value, replace = '') {
        if (Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_2__["isNil"])(value)) {
            return replace;
        }
        return value;
    }
}
NzSafeNullPipe.ɵfac = function NzSafeNullPipe_Factory(t) { return new (t || NzSafeNullPipe)(); };
NzSafeNullPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "nzSafeNull", type: NzSafeNullPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NzSafeNullPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"],
        args: [{
                name: 'nzSafeNull'
            }]
    }], null, null); })();

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSanitizerPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value, type = 'html') {
        switch (type) {
            case 'html':
                return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style':
                return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'url':
                return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                throw new Error(`Invalid safe type specified`);
        }
    }
}
NzSanitizerPipe.ɵfac = function NzSanitizerPipe_Factory(t) { return new (t || NzSanitizerPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"])); };
NzSanitizerPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "nzSanitizer", type: NzSanitizerPipe, pure: true });
NzSanitizerPipe.ctorParameters = () => [
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"] }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NzSanitizerPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"],
        args: [{
                name: 'nzSanitizer'
            }]
    }], function () { return [{ type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"] }]; }, null); })();

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTrimPipe {
    // TODO(chensimeng) trimEnd, trimStart
    transform(text) {
        return text.trim();
    }
}
NzTrimPipe.ɵfac = function NzTrimPipe_Factory(t) { return new (t || NzTrimPipe)(); };
NzTrimPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "nzTrim", type: NzTrimPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NzTrimPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"],
        args: [{
                name: 'nzTrim'
            }]
    }], null, null); })();

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const pipes = [NzToCssUnitPipe, NzSafeNullPipe, NzSanitizerPipe, NzTrimPipe, NzBytesPipe, NzAggregatePipe, NzEllipsisPipe];
class NzPipesModule {
}
NzPipesModule.ɵfac = function NzPipesModule_Factory(t) { return new (t || NzPipesModule)(); };
NzPipesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: NzPipesModule });
NzPipesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](NzPipesModule, { declarations: function () { return [NzToCssUnitPipe, NzSafeNullPipe, NzSanitizerPipe, NzTrimPipe, NzBytesPipe, NzAggregatePipe, NzEllipsisPipe]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]; }, exports: function () { return [NzToCssUnitPipe, NzSafeNullPipe, NzSanitizerPipe, NzTrimPipe, NzBytesPipe, NzAggregatePipe, NzEllipsisPipe]; } }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NzPipesModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]],
                exports: [pipes],
                declarations: [pipes]
            }]
    }], null, null); })();

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */



//# sourceMappingURL=ng-zorro-antd-pipes.js.map

/***/ }),

/***/ "Oy4E":
/*!*******************************************************!*\
  !*** ./src/app/dashboard/dashboard-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: DashboardRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardRoutingModule", function() { return DashboardRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _content_content_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content/content.component */ "SDAj");
/* harmony import */ var _graph_display_graph_display_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./graph-display/graph-display.component */ "hNM+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





const routes = [
    {
        path: 'content',
        component: _content_content_component__WEBPACK_IMPORTED_MODULE_1__["ContentComponent"],
    },
    {
        path: 'test',
        component: _graph_display_graph_display_component__WEBPACK_IMPORTED_MODULE_2__["GraphDisplayComponent"],
    },
    {
        path: '**',
        redirectTo: 'content'
    }
];
class DashboardRoutingModule {
}
DashboardRoutingModule.ɵfac = function DashboardRoutingModule_Factory(t) { return new (t || DashboardRoutingModule)(); };
DashboardRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: DashboardRoutingModule });
DashboardRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](DashboardRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "SDAj":
/*!********************************************************!*\
  !*** ./src/app/dashboard/content/content.component.ts ***!
  \********************************************************/
/*! exports provided: ContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentComponent", function() { return ContentComponent; });
/* harmony import */ var screenfull__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! screenfull */ "k7+O");
/* harmony import */ var screenfull__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(screenfull__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _graph_graph_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../graph/graph.service */ "JoXy");
/* harmony import */ var ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd/collapse */ "IvDN");
/* harmony import */ var _graph_line_graph_line_graph_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../graph/line-graph/line-graph.component */ "q6VA");
/* harmony import */ var _graph_word_cloud_word_cloud_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../graph/word-cloud/word-cloud.component */ "vZbB");
/* harmony import */ var _graph_force_graph_td_force_graph_td_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../graph/force-graph-td/force-graph-td.component */ "4jEQ");
/* harmony import */ var _graph_heat_map_heat_map_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../graph/heat-map/heat-map.component */ "qfjz");
/* harmony import */ var ng_zorro_antd_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-zorro-antd/modal */ "dEAy");
/* harmony import */ var ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng-zorro-antd/button */ "OzZK");
/* harmony import */ var ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng-zorro-antd/core/wave */ "RwU8");
/* harmony import */ var ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng-zorro-antd/core/transition-patch */ "C2AL");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-zorro-antd/icon */ "FwiY");













function ContentComponent_ng_container_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Sorry, there is no data for the date you selected!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
function ContentComponent_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ContentComponent_ng_template_20_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r5.handleOk(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Ok");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function ContentComponent_ng_template_22_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "i", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ContentComponent_ng_template_22_Template_i_click_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r7.changeSize($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
class ContentComponent {
    constructor(service) {
        this.service = service;
        this.collapse_line = true;
        this.collapse_word = true;
        this.collapse_force = true;
        this.collapse_map = true;
        this.isVisible = false;
    }
    ngOnInit() {
        setInterval(() => {
            const target = document.getElementsByClassName('scene-container')[0];
            const sf = screenfull__WEBPACK_IMPORTED_MODULE_0__;
            if (!sf.isFullscreen) {
                this.service.nodeSize.next({ 'height': 287, 'width': 520 });
            }
        }, 800);
    }
    getWordCloud(event) {
        // console.log(event)
        this.param_WordCloud = event.param.name;
    }
    handleOk() {
        this.isVisible = false;
    }
    getLineGraphVisible(event) {
        // console.log(event)
        this.isVisible = event.visible;
    }
    changeSize(event) {
        event.stopPropagation();
        this.service.nodeSize.next({ 'height': document.documentElement.scrollHeight, 'width': document.documentElement.scrollWidth });
        const target = document.getElementsByClassName('scene-container')[0];
        const sf = screenfull__WEBPACK_IMPORTED_MODULE_0__;
        if (sf.isEnabled) {
            sf.request(target);
        }
    }
}
ContentComponent.ɵfac = function ContentComponent_Factory(t) { return new (t || ContentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_graph_graph_service__WEBPACK_IMPORTED_MODULE_2__["GraphService"])); };
ContentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ContentComponent, selectors: [["app-content"]], decls: 24, vars: 16, consts: [[1, "row", "mb-2"], [1, "col-xl-6"], ["nzExpandIconPosition", "right", 3, "nzGhost"], [3, "nzActive", "nzHeader"], [3, "msg"], ["nzExpandIconPosition", "right", 2, "align-items", "center", 3, "nzGhost"], [3, "nzActive", "nzHeader", "nzExtra"], [3, "WordCloudParam"], [2, "align-items", "center", 3, "nzActive", "nzHeader"], ["nzTitle", "Tips", "nzClosable", "false", 3, "nzVisible", "nzFooter", "nzVisibleChange"], [4, "nzModalContent"], ["modalFooter", ""], ["extraTpl", ""], ["nz-button", "", "nzType", "primary", 3, "click"], ["nz-icon", "", "nzType", "arrows-alt", "nzTheme", "outline", 3, "click"]], template: function ContentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "nz-collapse", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "nz-collapse-panel", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "app-line-graph", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("msg", function ContentComponent_Template_app_line_graph_msg_4_listener($event) { return ctx.getLineGraphVisible($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "nz-collapse", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "nz-collapse-panel", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "app-word-cloud", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("msg", function ContentComponent_Template_app_word_cloud_msg_8_listener($event) { return ctx.getWordCloud($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "nz-collapse", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "nz-collapse-panel", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "app-force-graph-td", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "nz-collapse", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "nz-collapse-panel", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](17, "app-heat-map");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "nz-modal", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("nzVisibleChange", function ContentComponent_Template_nz_modal_nzVisibleChange_18_listener($event) { return ctx.isVisible = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, ContentComponent_ng_container_19_Template, 3, 0, "ng-container", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, ContentComponent_ng_template_20_Template, 2, 0, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, ContentComponent_ng_template_22_Template, 1, 0, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](21);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzGhost", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzActive", ctx.collapse_line)("nzHeader", "Interactive Line Chart");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzGhost", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzActive", ctx.collapse_word)("nzHeader", "Word Cloud");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzGhost", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzActive", ctx.collapse_force)("nzHeader", "Semantic Network")("nzExtra", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("WordCloudParam", ctx.param_WordCloud);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzGhost", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzActive", ctx.collapse_map)("nzHeader", "Heat Map");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzVisible", ctx.isVisible)("nzFooter", _r1);
    } }, directives: [ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_3__["NzCollapseComponent"], ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_3__["NzCollapsePanelComponent"], _graph_line_graph_line_graph_component__WEBPACK_IMPORTED_MODULE_4__["LineGraphComponent"], _graph_word_cloud_word_cloud_component__WEBPACK_IMPORTED_MODULE_5__["WordCloudComponent"], _graph_force_graph_td_force_graph_td_component__WEBPACK_IMPORTED_MODULE_6__["ForceGraphTDComponent"], _graph_heat_map_heat_map_component__WEBPACK_IMPORTED_MODULE_7__["HeatMapComponent"], ng_zorro_antd_modal__WEBPACK_IMPORTED_MODULE_8__["NzModalComponent"], ng_zorro_antd_modal__WEBPACK_IMPORTED_MODULE_8__["NzModalContentDirective"], ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_9__["NzButtonComponent"], ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_10__["NzWaveDirective"], ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_11__["ɵNzTransitionPatchDirective"], ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_12__["NzIconDirective"]], styles: [".slider[_ngcontent-%COMP%] {\n  width: 50%;\n}\n\n.slider-container[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  padding: 10px;\n}\n\n.gutter-row[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\n}\n\n.grid-config[_ngcontent-%COMP%] {\n  height: 33vh;\n  font-size: 14px;\n  border-radius: 4px;\n}\n\n.grid-elems[_ngcontent-%COMP%] {\n  margin: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxjb250ZW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsVUFBQTtBQUNGOztBQUNBO0VBQ0UsbUJBQUE7RUFDQSxhQUFBO0FBRUY7O0FBQ0E7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSx3Q0FBQTtBQUVGOztBQUFBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQUdGOztBQUFBO0VBQ0UsV0FBQTtBQUdGIiwiZmlsZSI6ImNvbnRlbnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc2xpZGVyIHtcclxuICB3aWR0aDogNTAlO1xyXG59XHJcbi5zbGlkZXItY29udGFpbmVyIHtcclxuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbn1cclxuXHJcbi5ndXR0ZXItcm93IHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYm94LXNoYWRvdzogMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4xKVxyXG59XHJcbi5ncmlkLWNvbmZpZyB7XHJcbiAgaGVpZ2h0OiAzM3ZoO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgLy9iYWNrZ3JvdW5kOiAjMDA5MmZmO1xyXG59XHJcbi5ncmlkLWVsZW1zIHtcclxuICBtYXJnaW46IDVweDtcclxuICAvL21hcmdpbi1yaWdodDogYXV0bztcclxuICAvL21hcmdpbi1sZWZ0OiBhdXRvO1xyXG4gIC8vbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICAvL2JvcmRlcjoxcHggc29saWQ7XHJcbiAgLy9ib3JkZXItcmFkaXVzOjI1cHg7XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "TDBs":
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.module.ts ***!
  \***********************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard-routing.module */ "Oy4E");
/* harmony import */ var ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd/layout */ "yW9e");
/* harmony import */ var ng_zorro_antd_breadcrumb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd/breadcrumb */ "yNE/");
/* harmony import */ var ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd/menu */ "Q8cG");
/* harmony import */ var _content_content_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./content/content.component */ "SDAj");
/* harmony import */ var _graph_display_graph_display_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./graph-display/graph-display.component */ "hNM+");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng-zorro-antd/icon */ "FwiY");
/* harmony import */ var ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-zorro-antd/grid */ "B+r4");
/* harmony import */ var _graph_graph_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../graph/graph.module */ "J21m");
/* harmony import */ var ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng-zorro-antd/collapse */ "IvDN");
/* harmony import */ var ng_zorro_antd_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng-zorro-antd/modal */ "dEAy");
/* harmony import */ var ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-zorro-antd/button */ "OzZK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ "fXoL");














class DashboardModule {
}
DashboardModule.ɵfac = function DashboardModule_Factory(t) { return new (t || DashboardModule)(); };
DashboardModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineNgModule"]({ type: DashboardModule });
DashboardModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_1__["DashboardRoutingModule"],
            ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_2__["NzLayoutModule"],
            ng_zorro_antd_breadcrumb__WEBPACK_IMPORTED_MODULE_3__["NzBreadCrumbModule"],
            ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_4__["NzMenuModule"],
            ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_7__["NzIconModule"],
            ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_8__["NzGridModule"],
            _graph_graph_module__WEBPACK_IMPORTED_MODULE_9__["GraphModule"],
            ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_10__["NzCollapseModule"],
            ng_zorro_antd_modal__WEBPACK_IMPORTED_MODULE_11__["NzModalModule"],
            ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_12__["NzButtonModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsetNgModuleScope"](DashboardModule, { declarations: [_content_content_component__WEBPACK_IMPORTED_MODULE_5__["ContentComponent"], _graph_display_graph_display_component__WEBPACK_IMPORTED_MODULE_6__["GraphDisplayComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_1__["DashboardRoutingModule"],
        ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_2__["NzLayoutModule"],
        ng_zorro_antd_breadcrumb__WEBPACK_IMPORTED_MODULE_3__["NzBreadCrumbModule"],
        ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_4__["NzMenuModule"],
        ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_7__["NzIconModule"],
        ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_8__["NzGridModule"],
        _graph_graph_module__WEBPACK_IMPORTED_MODULE_9__["GraphModule"],
        ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_10__["NzCollapseModule"],
        ng_zorro_antd_modal__WEBPACK_IMPORTED_MODULE_11__["NzModalModule"],
        ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_12__["NzButtonModule"]] }); })();


/***/ }),

/***/ "dEAy":
/*!*********************************************************************************!*\
  !*** ./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-modal.js ***!
  \*********************************************************************************/
/*! exports provided: BaseModalContainerComponent, FADE_CLASS_NAME_MAP, MODAL_MASK_CLASS_NAME, ModalOptions, NZ_CONFIG_MODULE_NAME, NzModalCloseComponent, NzModalComponent, NzModalConfirmContainerComponent, NzModalContainerComponent, NzModalContentDirective, NzModalFooterComponent, NzModalFooterDirective, NzModalLegacyAPI, NzModalModule, NzModalRef, NzModalService, NzModalTitleComponent, NzModalTitleDirective, ZOOM_CLASS_NAME_MAP, applyConfigDefaults, getConfigFromComponent, getValueWithConfig, nzModalAnimations, setContentInstanceParams, throwNzModalContentAlreadyAttachedError, ɵ0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseModalContainerComponent", function() { return BaseModalContainerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FADE_CLASS_NAME_MAP", function() { return FADE_CLASS_NAME_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODAL_MASK_CLASS_NAME", function() { return MODAL_MASK_CLASS_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalOptions", function() { return ModalOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NZ_CONFIG_MODULE_NAME", function() { return NZ_CONFIG_MODULE_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzModalCloseComponent", function() { return NzModalCloseComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzModalComponent", function() { return NzModalComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzModalConfirmContainerComponent", function() { return NzModalConfirmContainerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzModalContainerComponent", function() { return NzModalContainerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzModalContentDirective", function() { return NzModalContentDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzModalFooterComponent", function() { return NzModalFooterComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzModalFooterDirective", function() { return NzModalFooterDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzModalLegacyAPI", function() { return NzModalLegacyAPI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzModalModule", function() { return NzModalModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzModalRef", function() { return NzModalRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzModalService", function() { return NzModalService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzModalTitleComponent", function() { return NzModalTitleComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NzModalTitleDirective", function() { return NzModalTitleDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZOOM_CLASS_NAME_MAP", function() { return ZOOM_CLASS_NAME_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyConfigDefaults", function() { return applyConfigDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfigFromComponent", function() { return getConfigFromComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getValueWithConfig", function() { return getValueWithConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nzModalAnimations", function() { return nzModalAnimations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setContentInstanceParams", function() { return setContentInstanceParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throwNzModalContentAlreadyAttachedError", function() { return throwNzModalContentAlreadyAttachedError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ0", function() { return ɵ0; });
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/bidi */ "cH1L");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/overlay */ "rDax");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/portal */ "+rOU");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ng_zorro_antd_core_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd/core/config */ "2Suw");
/* harmony import */ var ng_zorro_antd_core_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-zorro-antd/core/logger */ "79xS");
/* harmony import */ var ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-zorro-antd/core/util */ "/KA4");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/a11y */ "u47x");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-zorro-antd/i18n */ "Rm4T");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/animations */ "R0Ic");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/cdk/keycodes */ "FtGj");
/* harmony import */ var ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng-zorro-antd/button */ "OzZK");
/* harmony import */ var ng_zorro_antd_core_no_animation__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ng-zorro-antd/core/no-animation */ "YF2q");
/* harmony import */ var ng_zorro_antd_core_outlet__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ng-zorro-antd/core/outlet */ "pdGh");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ng-zorro-antd/icon */ "FwiY");
/* harmony import */ var ng_zorro_antd_pipes__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ng-zorro-antd/pipes */ "HSCc");
/* harmony import */ var ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ng-zorro-antd/core/transition-patch */ "C2AL");
/* harmony import */ var ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ng-zorro-antd/core/wave */ "RwU8");






















/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */















const _c0 = ["modalElement"];
function NzModalConfirmContainerComponent_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NzModalConfirmContainerComponent_button_4_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r7.onCloseClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function NzModalConfirmContainerComponent_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("innerHTML", ctx_r2.config.nzTitle, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeHtml"]);
} }
function NzModalConfirmContainerComponent_ng_template_12_Template(rf, ctx) { }
function NzModalConfirmContainerComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "div", 17);
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("innerHTML", ctx_r4.config.nzContent, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeHtml"]);
} }
function NzModalConfirmContainerComponent_button_15_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NzModalConfirmContainerComponent_button_15_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r9.onCancel(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("nzLoading", !!ctx_r5.config.nzCancelLoading)("disabled", ctx_r5.config.nzCancelDisabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("cdkFocusInitial", ctx_r5.config.nzAutofocus === "cancel" || null);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r5.config.nzCancelText || ctx_r5.locale.cancelText, " ");
} }
function NzModalConfirmContainerComponent_button_16_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NzModalConfirmContainerComponent_button_16_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r11.onOk(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("nzType", ctx_r6.config.nzOkType)("nzLoading", !!ctx_r6.config.nzOkLoading)("disabled", ctx_r6.config.nzOkDisabled)("nzDanger", ctx_r6.config.nzOkDanger);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("cdkFocusInitial", ctx_r6.config.nzAutofocus === "ok" || null);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r6.config.nzOkText || ctx_r6.locale.okText, " ");
} }
function NzModalContainerComponent_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NzModalContainerComponent_button_4_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r6.onCloseClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function NzModalContainerComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "div", 10);
} }
function NzModalContainerComponent_ng_template_7_Template(rf, ctx) { }
function NzModalContainerComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "div", 11);
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("innerHTML", ctx_r4.config.nzContent, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeHtml"]);
} }
function NzModalContainerComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("cancelTriggered", function NzModalContainerComponent_div_9_Template_div_cancelTriggered_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r8.onCloseClick(); })("okTriggered", function NzModalContainerComponent_div_9_Template_div_okTriggered_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r9); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r10.onOkClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("modalRef", ctx_r5.modalRef);
} }
function NzModalComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵprojection"](0);
} }
const _c1 = ["*"];
const _c2 = ["nz-modal-close", ""];
function NzModalCloseComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const closeIcon_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("nzType", closeIcon_r1);
} }
const _c3 = ["nz-modal-footer", ""];
function NzModalFooterComponent_ng_container_0_ng_container_1_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "div", 5);
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("innerHTML", ctx_r4.config.nzFooter, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeHtml"]);
} }
function NzModalFooterComponent_ng_container_0_ng_container_1_ng_container_2_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NzModalFooterComponent_ng_container_0_ng_container_1_ng_container_2_button_1_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r9); const button_r7 = ctx.$implicit; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](4); return ctx_r8.onButtonClick(button_r7); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const button_r7 = ctx.$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("hidden", !ctx_r6.getButtonCallableProp(button_r7, "show"))("nzLoading", ctx_r6.getButtonCallableProp(button_r7, "loading"))("disabled", ctx_r6.getButtonCallableProp(button_r7, "disabled"))("nzType", button_r7.type)("nzDanger", button_r7.danger)("nzShape", button_r7.shape)("nzSize", button_r7.size)("nzGhost", button_r7.ghost);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", button_r7.label, " ");
} }
function NzModalFooterComponent_ng_container_0_ng_container_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, NzModalFooterComponent_ng_container_0_ng_container_1_ng_container_2_button_1_Template, 2, 9, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r5.buttons);
} }
function NzModalFooterComponent_ng_container_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, NzModalFooterComponent_ng_container_0_ng_container_1_div_1_Template, 1, 1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, NzModalFooterComponent_ng_container_0_ng_container_1_ng_container_2_Template, 2, 1, "ng-container", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r3.buttonsFooter);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r3.buttonsFooter);
} }
const _c4 = function (a0, a1) { return { $implicit: a0, modalRef: a1 }; };
function NzModalFooterComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, NzModalFooterComponent_ng_container_0_ng_container_1_Template, 3, 2, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("nzStringTemplateOutlet", ctx_r0.config.nzFooter)("nzStringTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction2"](2, _c4, ctx_r0.config.nzComponentParams, ctx_r0.modalRef));
} }
function NzModalFooterComponent_ng_template_1_button_0_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NzModalFooterComponent_ng_template_1_button_0_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r12.onCancel(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("nzLoading", !!ctx_r10.config.nzCancelLoading)("disabled", ctx_r10.config.nzCancelDisabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("cdkFocusInitial", ctx_r10.config.nzAutofocus === "cancel" || null);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r10.config.nzCancelText || ctx_r10.locale.cancelText, " ");
} }
function NzModalFooterComponent_ng_template_1_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NzModalFooterComponent_ng_template_1_button_1_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r14.onOk(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("nzType", ctx_r11.config.nzOkType)("nzDanger", ctx_r11.config.nzOkDanger)("nzLoading", !!ctx_r11.config.nzOkLoading)("disabled", ctx_r11.config.nzOkDisabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("cdkFocusInitial", ctx_r11.config.nzAutofocus === "ok" || null);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r11.config.nzOkText || ctx_r11.locale.okText, " ");
} }
function NzModalFooterComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, NzModalFooterComponent_ng_template_1_button_0_Template, 2, 4, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, NzModalFooterComponent_ng_template_1_button_1_Template, 2, 6, "button", 9);
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r2.config.nzCancelText !== null);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r2.config.nzOkText !== null);
} }
const _c5 = ["nz-modal-title", ""];
function NzModalTitleComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("innerHTML", ctx_r0.config.nzTitle, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeHtml"]);
} }
const noopFun = () => void 0;
const ɵ0 = noopFun;
class ModalOptions {
    constructor() {
        this.nzCentered = false;
        this.nzClosable = true;
        this.nzOkLoading = false;
        this.nzOkDisabled = false;
        this.nzCancelDisabled = false;
        this.nzCancelLoading = false;
        this.nzNoAnimation = false;
        this.nzAutofocus = 'auto';
        this.nzKeyboard = true;
        this.nzZIndex = 1000;
        this.nzWidth = 520;
        this.nzCloseIcon = 'close';
        this.nzOkType = 'primary';
        this.nzOkDanger = false;
        this.nzModalType = 'default';
        this.nzOnCancel = noopFun;
        this.nzOnOk = noopFun;
        // Confirm
        this.nzIconType = 'question-circle';
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const ZOOM_CLASS_NAME_MAP = {
    enter: 'zoom-enter',
    enterActive: 'zoom-enter-active',
    leave: 'zoom-leave',
    leaveActive: 'zoom-leave-active'
};
const FADE_CLASS_NAME_MAP = {
    enter: 'fade-enter',
    enterActive: 'fade-enter-active',
    leave: 'fade-leave',
    leaveActive: 'fade-leave-active'
};
const MODAL_MASK_CLASS_NAME = 'ant-modal-mask';
const NZ_CONFIG_MODULE_NAME = 'modal';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const nzModalAnimations = {
    modalContainer: Object(_angular_animations__WEBPACK_IMPORTED_MODULE_13__["trigger"])('modalContainer', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_13__["state"])('void, exit', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_13__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_13__["state"])('enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_13__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_13__["transition"])('* => enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_13__["animate"])('.24s', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_13__["style"])({}))),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_13__["transition"])('* => void, * => exit', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_13__["animate"])('.2s', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_13__["style"])({})))
    ])
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function applyConfigDefaults(config, defaultOptions) {
    return Object.assign(Object.assign({}, defaultOptions), config);
}
function getValueWithConfig(userValue, configValue, defaultValue) {
    return typeof userValue === 'undefined' ? (typeof configValue === 'undefined' ? defaultValue : configValue) : userValue;
}
/**
 * Assign the params into the content component instance.
 * @deprecated Should use dependency injection to get the params for user
 * @breaking-change 12.0.0
 */
function setContentInstanceParams(instance, params) {
    Object.assign(instance, params);
}
function getConfigFromComponent(component) {
    const { nzCentered, nzMask, nzMaskClosable, nzClosable, nzOkLoading, nzOkDisabled, nzCancelDisabled, nzCancelLoading, nzKeyboard, nzNoAnimation, nzContent, nzComponentParams, nzFooter, nzZIndex, nzWidth, nzWrapClassName, nzClassName, nzStyle, nzTitle, nzCloseIcon, nzMaskStyle, nzBodyStyle, nzOkText, nzCancelText, nzOkType, nzOkDanger, nzIconType, nzModalType, nzOnOk, nzOnCancel, nzAfterOpen, nzAfterClose, nzCloseOnNavigation, nzAutofocus } = component;
    return {
        nzCentered,
        nzMask,
        nzMaskClosable,
        nzClosable,
        nzOkLoading,
        nzOkDisabled,
        nzCancelDisabled,
        nzCancelLoading,
        nzKeyboard,
        nzNoAnimation,
        nzContent,
        nzComponentParams,
        nzFooter,
        nzZIndex,
        nzWidth,
        nzWrapClassName,
        nzClassName,
        nzStyle,
        nzTitle,
        nzCloseIcon,
        nzMaskStyle,
        nzBodyStyle,
        nzOkText,
        nzCancelText,
        nzOkType,
        nzOkDanger,
        nzIconType,
        nzModalType,
        nzOnOk,
        nzOnCancel,
        nzAfterOpen,
        nzAfterClose,
        nzCloseOnNavigation,
        nzAutofocus
    };
}

function throwNzModalContentAlreadyAttachedError() {
    throw Error('Attempting to attach modal content after content is already attached');
}
class BaseModalContainerComponent extends _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["BasePortalOutlet"] {
    constructor(elementRef, focusTrapFactory, cdr, render, overlayRef, nzConfigService, config, document, animationType) {
        super();
        this.elementRef = elementRef;
        this.focusTrapFactory = focusTrapFactory;
        this.cdr = cdr;
        this.render = render;
        this.overlayRef = overlayRef;
        this.nzConfigService = nzConfigService;
        this.config = config;
        this.animationType = animationType;
        this.animationStateChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.containerClick = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.cancelTriggered = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.okTriggered = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.state = 'enter';
        this.isStringContent = false;
        this.dir = 'ltr';
        this.elementFocusedBeforeModalWasOpened = null;
        this.mouseDown = false;
        this.oldMaskStyle = null;
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        this.document = document;
        this.dir = overlayRef.getDirection();
        this.isStringContent = typeof config.nzContent === 'string';
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroy$))
            .subscribe(() => {
            this.updateMaskClassname();
        });
    }
    get showMask() {
        const defaultConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME) || {};
        return !!getValueWithConfig(this.config.nzMask, defaultConfig.nzMask, true);
    }
    get maskClosable() {
        const defaultConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME) || {};
        return !!getValueWithConfig(this.config.nzMaskClosable, defaultConfig.nzMaskClosable, true);
    }
    onContainerClick(e) {
        if (e.target === e.currentTarget && !this.mouseDown && this.showMask && this.maskClosable) {
            this.containerClick.emit();
        }
    }
    onMousedown() {
        this.mouseDown = true;
    }
    onMouseup() {
        if (this.mouseDown) {
            setTimeout(() => {
                this.mouseDown = false;
            });
        }
    }
    onCloseClick() {
        this.cancelTriggered.emit();
    }
    onOkClick() {
        this.okTriggered.emit();
    }
    attachComponentPortal(portal) {
        if (this.portalOutlet.hasAttached()) {
            throwNzModalContentAlreadyAttachedError();
        }
        this.savePreviouslyFocusedElement();
        this.setZIndexForBackdrop();
        return this.portalOutlet.attachComponentPortal(portal);
    }
    attachTemplatePortal(portal) {
        if (this.portalOutlet.hasAttached()) {
            throwNzModalContentAlreadyAttachedError();
        }
        this.savePreviouslyFocusedElement();
        this.setZIndexForBackdrop();
        return this.portalOutlet.attachTemplatePortal(portal);
    }
    attachStringContent() {
        this.savePreviouslyFocusedElement();
        this.setZIndexForBackdrop();
    }
    getNativeElement() {
        return this.elementRef.nativeElement;
    }
    animationDisabled() {
        return this.config.nzNoAnimation || this.animationType === 'NoopAnimations';
    }
    setModalTransformOrigin() {
        const modalElement = this.modalElementRef.nativeElement;
        if (this.elementFocusedBeforeModalWasOpened) {
            const previouslyDOMRect = this.elementFocusedBeforeModalWasOpened.getBoundingClientRect();
            const lastPosition = Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["getElementOffset"])(this.elementFocusedBeforeModalWasOpened);
            const x = lastPosition.left + previouslyDOMRect.width / 2;
            const y = lastPosition.top + previouslyDOMRect.height / 2;
            const transformOrigin = `${x - modalElement.offsetLeft}px ${y - modalElement.offsetTop}px 0px`;
            this.render.setStyle(modalElement, 'transform-origin', transformOrigin);
        }
    }
    savePreviouslyFocusedElement() {
        if (!this.focusTrap) {
            this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
        }
        if (this.document) {
            this.elementFocusedBeforeModalWasOpened = this.document.activeElement;
            if (this.elementRef.nativeElement.focus) {
                Promise.resolve().then(() => this.elementRef.nativeElement.focus());
            }
        }
    }
    trapFocus() {
        const element = this.elementRef.nativeElement;
        if (this.config.nzAutofocus) {
            this.focusTrap.focusInitialElementWhenReady().then();
        }
        else {
            const activeElement = this.document.activeElement;
            if (activeElement !== element && !element.contains(activeElement)) {
                element.focus();
            }
        }
    }
    restoreFocus() {
        const toFocus = this.elementFocusedBeforeModalWasOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            const activeElement = this.document.activeElement;
            const element = this.elementRef.nativeElement;
            if (!activeElement || activeElement === this.document.body || activeElement === element || element.contains(activeElement)) {
                toFocus.focus();
            }
        }
        if (this.focusTrap) {
            this.focusTrap.destroy();
        }
    }
    setEnterAnimationClass() {
        if (this.animationDisabled()) {
            return;
        }
        // Make sure to set the `TransformOrigin` style before set the modelElement's class names
        this.setModalTransformOrigin();
        const modalElement = this.modalElementRef.nativeElement;
        const backdropElement = this.overlayRef.backdropElement;
        modalElement.classList.add(ZOOM_CLASS_NAME_MAP.enter);
        modalElement.classList.add(ZOOM_CLASS_NAME_MAP.enterActive);
        if (backdropElement) {
            backdropElement.classList.add(FADE_CLASS_NAME_MAP.enter);
            backdropElement.classList.add(FADE_CLASS_NAME_MAP.enterActive);
        }
    }
    setExitAnimationClass() {
        const modalElement = this.modalElementRef.nativeElement;
        modalElement.classList.add(ZOOM_CLASS_NAME_MAP.leave);
        modalElement.classList.add(ZOOM_CLASS_NAME_MAP.leaveActive);
        this.setMaskExitAnimationClass();
    }
    setMaskExitAnimationClass(force = false) {
        const backdropElement = this.overlayRef.backdropElement;
        if (backdropElement) {
            if (this.animationDisabled() || force) {
                // https://github.com/angular/components/issues/18645
                backdropElement.classList.remove(MODAL_MASK_CLASS_NAME);
                return;
            }
            backdropElement.classList.add(FADE_CLASS_NAME_MAP.leave);
            backdropElement.classList.add(FADE_CLASS_NAME_MAP.leaveActive);
        }
    }
    cleanAnimationClass() {
        if (this.animationDisabled()) {
            return;
        }
        const backdropElement = this.overlayRef.backdropElement;
        const modalElement = this.modalElementRef.nativeElement;
        if (backdropElement) {
            backdropElement.classList.remove(FADE_CLASS_NAME_MAP.enter);
            backdropElement.classList.remove(FADE_CLASS_NAME_MAP.enterActive);
        }
        modalElement.classList.remove(ZOOM_CLASS_NAME_MAP.enter);
        modalElement.classList.remove(ZOOM_CLASS_NAME_MAP.enterActive);
        modalElement.classList.remove(ZOOM_CLASS_NAME_MAP.leave);
        modalElement.classList.remove(ZOOM_CLASS_NAME_MAP.leaveActive);
    }
    setZIndexForBackdrop() {
        const backdropElement = this.overlayRef.backdropElement;
        if (backdropElement) {
            if (Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["isNotNil"])(this.config.nzZIndex)) {
                this.render.setStyle(backdropElement, 'z-index', this.config.nzZIndex);
            }
        }
    }
    bindBackdropStyle() {
        const backdropElement = this.overlayRef.backdropElement;
        if (backdropElement) {
            if (this.oldMaskStyle) {
                const styles = this.oldMaskStyle;
                Object.keys(styles).forEach(key => {
                    this.render.removeStyle(backdropElement, key);
                });
                this.oldMaskStyle = null;
            }
            this.setZIndexForBackdrop();
            if (typeof this.config.nzMaskStyle === 'object' && Object.keys(this.config.nzMaskStyle).length) {
                const styles = Object.assign({}, this.config.nzMaskStyle);
                Object.keys(styles).forEach(key => {
                    this.render.setStyle(backdropElement, key, styles[key]);
                });
                this.oldMaskStyle = styles;
            }
        }
    }
    updateMaskClassname() {
        const backdropElement = this.overlayRef.backdropElement;
        if (backdropElement) {
            if (this.showMask) {
                backdropElement.classList.add(MODAL_MASK_CLASS_NAME);
            }
            else {
                backdropElement.classList.remove(MODAL_MASK_CLASS_NAME);
            }
        }
    }
    onAnimationDone(event) {
        if (event.toState === 'enter') {
            this.trapFocus();
        }
        else if (event.toState === 'exit') {
            this.restoreFocus();
        }
        this.cleanAnimationClass();
        this.animationStateChanged.emit(event);
    }
    onAnimationStart(event) {
        if (event.toState === 'enter') {
            this.setEnterAnimationClass();
            this.bindBackdropStyle();
        }
        else if (event.toState === 'exit') {
            this.setExitAnimationClass();
        }
        this.animationStateChanged.emit(event);
    }
    startExitAnimation() {
        this.state = 'exit';
        this.cdr.markForCheck();
    }
    ngOnDestroy() {
        this.setMaskExitAnimationClass(true);
        this.destroy$.next();
        this.destroy$.complete();
    }
}
BaseModalContainerComponent.ɵfac = function BaseModalContainerComponent_Factory(t) { return new (t || BaseModalContainerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__["FocusTrapFactory"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ng_zorro_antd_core_config__WEBPACK_IMPORTED_MODULE_4__["NzConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ModalOptions), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](undefined), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](String)); };
BaseModalContainerComponent.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineDirective"]({ type: BaseModalContainerComponent, features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]] });
BaseModalContainerComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"] },
    { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__["FocusTrapFactory"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Renderer2"] },
    { type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayRef"] },
    { type: ng_zorro_antd_core_config__WEBPACK_IMPORTED_MODULE_4__["NzConfigService"] },
    { type: ModalOptions },
    { type: undefined },
    { type: String }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzModalConfirmContainerComponent extends BaseModalContainerComponent {
    constructor(i18n, elementRef, focusTrapFactory, cdr, render, overlayRef, nzConfigService, config, document, animationType) {
        super(elementRef, focusTrapFactory, cdr, render, overlayRef, nzConfigService, config, document, animationType);
        this.i18n = i18n;
        this.config = config;
        this.cancelTriggered = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.okTriggered = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.i18n.localeChange.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Modal');
        });
    }
    onCancel() {
        this.cancelTriggered.emit();
    }
    onOk() {
        this.okTriggered.emit();
    }
}
NzModalConfirmContainerComponent.ɵfac = function NzModalConfirmContainerComponent_Factory(t) { return new (t || NzModalConfirmContainerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_12__["NzI18nService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__["FocusTrapFactory"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ng_zorro_antd_core_config__WEBPACK_IMPORTED_MODULE_4__["NzConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ModalOptions), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_10__["DOCUMENT"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["ANIMATION_MODULE_TYPE"], 8)); };
NzModalConfirmContainerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: NzModalConfirmContainerComponent, selectors: [["nz-modal-confirm-container"]], viewQuery: function NzModalConfirmContainerComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["CdkPortalOutlet"], 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 3);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.portalOutlet = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.modalElementRef = _t.first);
    } }, hostAttrs: ["tabindex", "-1", "role", "dialog"], hostVars: 10, hostBindings: function NzModalConfirmContainerComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsyntheticHostListener"]("@modalContainer.start", function NzModalConfirmContainerComponent_animation_modalContainer_start_HostBindingHandler($event) { return ctx.onAnimationStart($event); })("@modalContainer.done", function NzModalConfirmContainerComponent_animation_modalContainer_done_HostBindingHandler($event) { return ctx.onAnimationDone($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NzModalConfirmContainerComponent_click_HostBindingHandler($event) { return ctx.onContainerClick($event); })("mouseup", function NzModalConfirmContainerComponent_mouseup_HostBindingHandler() { return ctx.onMouseup(); });
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsyntheticHostProperty"]("@.disabled", ctx.config.nzNoAnimation)("@modalContainer", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassMap"](ctx.config.nzWrapClassName ? "ant-modal-wrap " + ctx.config.nzWrapClassName : "ant-modal-wrap");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("z-index", ctx.config.nzZIndex);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("ant-modal-wrap-rtl", ctx.dir === "rtl")("ant-modal-centered", ctx.config.nzCentered);
    } }, outputs: { cancelTriggered: "cancelTriggered", okTriggered: "okTriggered" }, exportAs: ["nzModalConfirmContainer"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]], decls: 17, vars: 13, consts: [["role", "document", 1, "ant-modal", 3, "ngClass", "ngStyle", "mousedown"], ["modalElement", ""], [1, "ant-modal-content"], ["nz-modal-close", "", 3, "click", 4, "ngIf"], [1, "ant-modal-body", 3, "ngStyle"], [1, "ant-modal-confirm-body-wrapper"], [1, "ant-modal-confirm-body"], ["nz-icon", "", 3, "nzType"], [1, "ant-modal-confirm-title"], [4, "nzStringTemplateOutlet"], [1, "ant-modal-confirm-content"], ["cdkPortalOutlet", ""], [3, "innerHTML", 4, "ngIf"], [1, "ant-modal-confirm-btns"], ["nz-button", "", 3, "nzLoading", "disabled", "click", 4, "ngIf"], ["nz-button", "", 3, "nzType", "nzLoading", "disabled", "nzDanger", "click", 4, "ngIf"], ["nz-modal-close", "", 3, "click"], [3, "innerHTML"], ["nz-button", "", 3, "nzLoading", "disabled", "click"], ["nz-button", "", 3, "nzType", "nzLoading", "disabled", "nzDanger", "click"]], template: function NzModalConfirmContainerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mousedown", function NzModalConfirmContainerComponent_Template_div_mousedown_0_listener() { return ctx.onMousedown(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "nzToCssUnit");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, NzModalConfirmContainerComponent_button_4_Template, 1, 0, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "i", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, NzModalConfirmContainerComponent_ng_container_10_Template, 2, 1, "ng-container", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, NzModalConfirmContainerComponent_ng_template_12_Template, 0, 0, "ng-template", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, NzModalConfirmContainerComponent_div_13_Template, 1, 1, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](15, NzModalConfirmContainerComponent_button_15_Template, 2, 4, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, NzModalConfirmContainerComponent_button_16_Template, 2, 6, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("width", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 11, ctx.config == null ? null : ctx.config.nzWidth));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", ctx.config.nzClassName)("ngStyle", ctx.config.nzStyle);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.config.nzClosable);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngStyle", ctx.config.nzBodyStyle);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("nzType", ctx.config.nzIconType);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("nzStringTemplateOutlet", ctx.config.nzTitle);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isStringContent);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.config.nzCancelText !== null);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.config.nzOkText !== null);
    } }, directives: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_10__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgStyle"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_21__["ɵNzTransitionPatchDirective"], ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_19__["NzIconDirective"], ng_zorro_antd_core_outlet__WEBPACK_IMPORTED_MODULE_18__["NzStringTemplateOutletDirective"], _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["CdkPortalOutlet"], NzModalCloseComponent, ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_16__["NzButtonComponent"], ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_22__["NzWaveDirective"]]; }, pipes: function () { return [ng_zorro_antd_pipes__WEBPACK_IMPORTED_MODULE_20__["NzToCssUnitPipe"]]; }, encapsulation: 2, data: { animation: [nzModalAnimations.modalContainer] } });
NzModalConfirmContainerComponent.ctorParameters = () => [
    { type: ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_12__["NzI18nService"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"] },
    { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__["FocusTrapFactory"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Renderer2"] },
    { type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayRef"] },
    { type: ng_zorro_antd_core_config__WEBPACK_IMPORTED_MODULE_4__["NzConfigService"] },
    { type: ModalOptions },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["DOCUMENT"],] }] },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["ANIMATION_MODULE_TYPE"],] }] }
];
NzModalConfirmContainerComponent.propDecorators = {
    portalOutlet: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["CdkPortalOutlet"], { static: true },] }],
    modalElementRef: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['modalElement', { static: true },] }],
    cancelTriggered: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
    okTriggered: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzModalContainerComponent extends BaseModalContainerComponent {
    constructor(elementRef, focusTrapFactory, cdr, render, overlayRef, nzConfigService, config, document, animationType) {
        super(elementRef, focusTrapFactory, cdr, render, overlayRef, nzConfigService, config, document, animationType);
        this.config = config;
    }
}
NzModalContainerComponent.ɵfac = function NzModalContainerComponent_Factory(t) { return new (t || NzModalContainerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__["FocusTrapFactory"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ng_zorro_antd_core_config__WEBPACK_IMPORTED_MODULE_4__["NzConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ModalOptions), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_10__["DOCUMENT"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["ANIMATION_MODULE_TYPE"], 8)); };
NzModalContainerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: NzModalContainerComponent, selectors: [["nz-modal-container"]], viewQuery: function NzModalContainerComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["CdkPortalOutlet"], 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 3);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.portalOutlet = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.modalElementRef = _t.first);
    } }, hostAttrs: ["tabindex", "-1", "role", "dialog"], hostVars: 10, hostBindings: function NzModalContainerComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsyntheticHostListener"]("@modalContainer.start", function NzModalContainerComponent_animation_modalContainer_start_HostBindingHandler($event) { return ctx.onAnimationStart($event); })("@modalContainer.done", function NzModalContainerComponent_animation_modalContainer_done_HostBindingHandler($event) { return ctx.onAnimationDone($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NzModalContainerComponent_click_HostBindingHandler($event) { return ctx.onContainerClick($event); })("mouseup", function NzModalContainerComponent_mouseup_HostBindingHandler() { return ctx.onMouseup(); });
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsyntheticHostProperty"]("@.disabled", ctx.config.nzNoAnimation)("@modalContainer", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassMap"](ctx.config.nzWrapClassName ? "ant-modal-wrap " + ctx.config.nzWrapClassName : "ant-modal-wrap");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("z-index", ctx.config.nzZIndex);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("ant-modal-wrap-rtl", ctx.dir === "rtl")("ant-modal-centered", ctx.config.nzCentered);
    } }, exportAs: ["nzModalContainer"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]], decls: 10, vars: 11, consts: [["role", "document", 1, "ant-modal", 3, "ngClass", "ngStyle", "mousedown"], ["modalElement", ""], [1, "ant-modal-content"], ["nz-modal-close", "", 3, "click", 4, "ngIf"], ["nz-modal-title", "", 4, "ngIf"], [1, "ant-modal-body", 3, "ngStyle"], ["cdkPortalOutlet", ""], [3, "innerHTML", 4, "ngIf"], ["nz-modal-footer", "", 3, "modalRef", "cancelTriggered", "okTriggered", 4, "ngIf"], ["nz-modal-close", "", 3, "click"], ["nz-modal-title", ""], [3, "innerHTML"], ["nz-modal-footer", "", 3, "modalRef", "cancelTriggered", "okTriggered"]], template: function NzModalContainerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mousedown", function NzModalContainerComponent_Template_div_mousedown_0_listener() { return ctx.onMousedown(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "nzToCssUnit");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, NzModalContainerComponent_button_4_Template, 1, 0, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, NzModalContainerComponent_div_5_Template, 1, 0, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, NzModalContainerComponent_ng_template_7_Template, 0, 0, "ng-template", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, NzModalContainerComponent_div_8_Template, 1, 1, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, NzModalContainerComponent_div_9_Template, 1, 1, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("width", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 9, ctx.config == null ? null : ctx.config.nzWidth));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", ctx.config.nzClassName)("ngStyle", ctx.config.nzStyle);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.config.nzClosable);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.config.nzTitle);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngStyle", ctx.config.nzBodyStyle);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isStringContent);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.config.nzFooter !== null);
    } }, directives: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_10__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgStyle"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["CdkPortalOutlet"], NzModalCloseComponent, NzModalTitleComponent, NzModalFooterComponent]; }, pipes: function () { return [ng_zorro_antd_pipes__WEBPACK_IMPORTED_MODULE_20__["NzToCssUnitPipe"]]; }, encapsulation: 2, data: { animation: [nzModalAnimations.modalContainer] } });
NzModalContainerComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"] },
    { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__["FocusTrapFactory"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Renderer2"] },
    { type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayRef"] },
    { type: ng_zorro_antd_core_config__WEBPACK_IMPORTED_MODULE_4__["NzConfigService"] },
    { type: ModalOptions },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["DOCUMENT"],] }] },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["ANIMATION_MODULE_TYPE"],] }] }
];
NzModalContainerComponent.propDecorators = {
    portalOutlet: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["CdkPortalOutlet"], { static: true },] }],
    modalElementRef: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['modalElement', { static: true },] }]
};

class NzModalRef {
    constructor(overlayRef, config, containerInstance) {
        this.overlayRef = overlayRef;
        this.config = config;
        this.containerInstance = containerInstance;
        this.componentInstance = null;
        this.state = 0 /* OPEN */;
        this.afterClose = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        this.afterOpen = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        containerInstance.animationStateChanged
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["filter"])(event => event.phaseName === 'done' && event.toState === 'enter'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1))
            .subscribe(() => {
            this.afterOpen.next();
            this.afterOpen.complete();
            if (config.nzAfterOpen instanceof _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]) {
                config.nzAfterOpen.emit();
            }
        });
        containerInstance.animationStateChanged
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["filter"])(event => event.phaseName === 'done' && event.toState === 'exit'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1))
            .subscribe(() => {
            clearTimeout(this.closeTimeout);
            this._finishDialogClose();
        });
        containerInstance.containerClick.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1)).subscribe(() => {
            const cancelable = !this.config.nzCancelLoading && !this.config.nzOkLoading;
            if (cancelable) {
                this.trigger("cancel" /* CANCEL */);
            }
        });
        overlayRef
            .keydownEvents()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["filter"])(event => {
            return (this.config.nzKeyboard &&
                !this.config.nzCancelLoading &&
                !this.config.nzOkLoading &&
                event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_15__["ESCAPE"] &&
                !Object(_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_15__["hasModifierKey"])(event));
        }))
            .subscribe(event => {
            event.preventDefault();
            this.trigger("cancel" /* CANCEL */);
        });
        containerInstance.cancelTriggered.subscribe(() => this.trigger("cancel" /* CANCEL */));
        containerInstance.okTriggered.subscribe(() => this.trigger("ok" /* OK */));
        overlayRef.detachments().subscribe(() => {
            this.afterClose.next(this.result);
            this.afterClose.complete();
            if (config.nzAfterClose instanceof _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]) {
                config.nzAfterClose.emit(this.result);
            }
            this.componentInstance = null;
            this.overlayRef.dispose();
        });
    }
    getContentComponent() {
        return this.componentInstance;
    }
    getElement() {
        return this.containerInstance.getNativeElement();
    }
    destroy(result) {
        this.close(result);
    }
    triggerOk() {
        return this.trigger("ok" /* OK */);
    }
    triggerCancel() {
        return this.trigger("cancel" /* CANCEL */);
    }
    close(result) {
        this.result = result;
        this.containerInstance.animationStateChanged
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["filter"])(event => event.phaseName === 'start'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1))
            .subscribe(event => {
            this.overlayRef.detachBackdrop();
            this.closeTimeout = setTimeout(() => {
                this._finishDialogClose();
            }, event.totalTime + 100);
        });
        this.containerInstance.startExitAnimation();
        this.state = 1 /* CLOSING */;
    }
    updateConfig(config) {
        Object.assign(this.config, config);
        this.containerInstance.bindBackdropStyle();
        this.containerInstance.cdr.markForCheck();
    }
    getState() {
        return this.state;
    }
    getConfig() {
        return this.config;
    }
    getBackdropElement() {
        return this.overlayRef.backdropElement;
    }
    trigger(action) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__awaiter"])(this, void 0, void 0, function* () {
            const trigger = { ok: this.config.nzOnOk, cancel: this.config.nzOnCancel }[action];
            const loadingKey = { ok: 'nzOkLoading', cancel: 'nzCancelLoading' }[action];
            const loading = this.config[loadingKey];
            if (loading) {
                return;
            }
            if (trigger instanceof _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]) {
                trigger.emit(this.getContentComponent());
            }
            else if (typeof trigger === 'function') {
                const result = trigger(this.getContentComponent());
                if (Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["isPromise"])(result)) {
                    this.config[loadingKey] = true;
                    let doClose = false;
                    try {
                        doClose = yield result;
                    }
                    finally {
                        this.config[loadingKey] = false;
                        this.closeWhitResult(doClose);
                    }
                }
                else {
                    this.closeWhitResult(result);
                }
            }
        });
    }
    closeWhitResult(result) {
        if (result !== false) {
            this.close(result);
        }
    }
    _finishDialogClose() {
        this.state = 2 /* CLOSED */;
        this.overlayRef.dispose();
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzModalService {
    constructor(overlay, injector, nzConfigService, parentModal, directionality) {
        this.overlay = overlay;
        this.injector = injector;
        this.nzConfigService = nzConfigService;
        this.parentModal = parentModal;
        this.directionality = directionality;
        this.openModalsAtThisLevel = [];
        this.afterAllClosedAtThisLevel = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        this.afterAllClose = Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["defer"])(() => this.openModals.length ? this._afterAllClosed : this._afterAllClosed.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["startWith"])(undefined)));
    }
    get openModals() {
        return this.parentModal ? this.parentModal.openModals : this.openModalsAtThisLevel;
    }
    get _afterAllClosed() {
        const parent = this.parentModal;
        return parent ? parent._afterAllClosed : this.afterAllClosedAtThisLevel;
    }
    create(config) {
        return this.open(config.nzContent, config);
    }
    closeAll() {
        this.closeModals(this.openModals);
    }
    confirm(options = {}, confirmType = 'confirm') {
        if ('nzFooter' in options) {
            Object(ng_zorro_antd_core_logger__WEBPACK_IMPORTED_MODULE_5__["warn"])(`The Confirm-Modal doesn't support "nzFooter", this property will be ignored.`);
        }
        if (!('nzWidth' in options)) {
            options.nzWidth = 416;
        }
        if (!('nzMaskClosable' in options)) {
            options.nzMaskClosable = false;
        }
        options.nzModalType = 'confirm';
        options.nzClassName = `ant-modal-confirm ant-modal-confirm-${confirmType} ${options.nzClassName || ''}`;
        return this.create(options);
    }
    info(options = {}) {
        return this.confirmFactory(options, 'info');
    }
    success(options = {}) {
        return this.confirmFactory(options, 'success');
    }
    error(options = {}) {
        return this.confirmFactory(options, 'error');
    }
    warning(options = {}) {
        return this.confirmFactory(options, 'warning');
    }
    open(componentOrTemplateRef, config) {
        const configMerged = applyConfigDefaults(config || {}, new ModalOptions());
        const overlayRef = this.createOverlay(configMerged);
        const modalContainer = this.attachModalContainer(overlayRef, configMerged);
        const modalRef = this.attachModalContent(componentOrTemplateRef, modalContainer, overlayRef, configMerged);
        modalContainer.modalRef = modalRef;
        this.openModals.push(modalRef);
        modalRef.afterClose.subscribe(() => this.removeOpenModal(modalRef));
        return modalRef;
    }
    removeOpenModal(modalRef) {
        const index = this.openModals.indexOf(modalRef);
        if (index > -1) {
            this.openModals.splice(index, 1);
            if (!this.openModals.length) {
                this._afterAllClosed.next();
            }
        }
    }
    closeModals(dialogs) {
        let i = dialogs.length;
        while (i--) {
            dialogs[i].close();
            if (!this.openModals.length) {
                this._afterAllClosed.next();
            }
        }
    }
    createOverlay(config) {
        const globalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME) || {};
        const overlayConfig = new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayConfig"]({
            hasBackdrop: true,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: this.overlay.position().global(),
            disposeOnNavigation: getValueWithConfig(config.nzCloseOnNavigation, globalConfig.nzCloseOnNavigation, true),
            direction: getValueWithConfig(config.nzDirection, globalConfig.nzDirection, this.directionality.value)
        });
        if (getValueWithConfig(config.nzMask, globalConfig.nzMask, true)) {
            overlayConfig.backdropClass = MODAL_MASK_CLASS_NAME;
        }
        return this.overlay.create(overlayConfig);
    }
    attachModalContainer(overlayRef, config) {
        const userInjector = config && config.nzViewContainerRef && config.nzViewContainerRef.injector;
        const injector = _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injector"].create({
            parent: userInjector || this.injector,
            providers: [
                { provide: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayRef"], useValue: overlayRef },
                { provide: ModalOptions, useValue: config }
            ]
        });
        const ContainerComponent = config.nzModalType === 'confirm'
            ? // If the mode is `confirm`, use `NzModalConfirmContainerComponent`
                NzModalConfirmContainerComponent
            : // If the mode is not `confirm`, use `NzModalContainerComponent`
                NzModalContainerComponent;
        const containerPortal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["ComponentPortal"](ContainerComponent, config.nzViewContainerRef, injector);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
    attachModalContent(componentOrTemplateRef, modalContainer, overlayRef, config) {
        const modalRef = new NzModalRef(overlayRef, config, modalContainer);
        if (componentOrTemplateRef instanceof _angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"]) {
            modalContainer.attachTemplatePortal(new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["TemplatePortal"](componentOrTemplateRef, null, { $implicit: config.nzComponentParams, modalRef }));
        }
        else if (Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["isNotNil"])(componentOrTemplateRef) && typeof componentOrTemplateRef !== 'string') {
            const injector = this.createInjector(modalRef, config);
            const contentRef = modalContainer.attachComponentPortal(new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["ComponentPortal"](componentOrTemplateRef, config.nzViewContainerRef, injector));
            setContentInstanceParams(contentRef.instance, config.nzComponentParams);
            modalRef.componentInstance = contentRef.instance;
        }
        else {
            modalContainer.attachStringContent();
        }
        return modalRef;
    }
    createInjector(modalRef, config) {
        const userInjector = config && config.nzViewContainerRef && config.nzViewContainerRef.injector;
        return _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injector"].create({
            parent: userInjector || this.injector,
            providers: [{ provide: NzModalRef, useValue: modalRef }]
        });
    }
    confirmFactory(options = {}, confirmType) {
        const iconMap = {
            info: 'info-circle',
            success: 'check-circle',
            error: 'close-circle',
            warning: 'exclamation-circle'
        };
        if (!('nzIconType' in options)) {
            options.nzIconType = iconMap[confirmType];
        }
        if (!('nzCancelText' in options)) {
            // Remove the Cancel button if the user not specify a Cancel button
            options.nzCancelText = null;
        }
        return this.confirm(options, confirmType);
    }
    ngOnDestroy() {
        this.closeModals(this.openModalsAtThisLevel);
        this.afterAllClosedAtThisLevel.complete();
    }
}
NzModalService.ɵfac = function NzModalService_Factory(t) { return new (t || NzModalService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["Overlay"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["Injector"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](ng_zorro_antd_core_config__WEBPACK_IMPORTED_MODULE_4__["NzConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](NzModalService, 12), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_0__["Directionality"], 8)); };
NzModalService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: NzModalService, factory: NzModalService.ɵfac });
NzModalService.ctorParameters = () => [
    { type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["Overlay"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injector"] },
    { type: ng_zorro_antd_core_config__WEBPACK_IMPORTED_MODULE_4__["NzConfigService"] },
    { type: NzModalService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["SkipSelf"] }] },
    { type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_0__["Directionality"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"] }] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzModalContentDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NzModalContentDirective.ɵfac = function NzModalContentDirective_Factory(t) { return new (t || NzModalContentDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"])); };
NzModalContentDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineDirective"]({ type: NzModalContentDirective, selectors: [["", "nzModalContent", ""]], exportAs: ["nzModalContent"] });
NzModalContentDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzModalFooterDirective {
    constructor(nzModalRef, templateRef) {
        this.nzModalRef = nzModalRef;
        this.templateRef = templateRef;
        if (this.nzModalRef) {
            this.nzModalRef.updateConfig({
                nzFooter: this.templateRef
            });
        }
    }
}
NzModalFooterDirective.ɵfac = function NzModalFooterDirective_Factory(t) { return new (t || NzModalFooterDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](NzModalRef, 8), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"])); };
NzModalFooterDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineDirective"]({ type: NzModalFooterDirective, selectors: [["", "nzModalFooter", ""]], exportAs: ["nzModalFooter"] });
NzModalFooterDirective.ctorParameters = () => [
    { type: NzModalRef, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"] }] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzModalTitleDirective {
    constructor(nzModalRef, templateRef) {
        this.nzModalRef = nzModalRef;
        this.templateRef = templateRef;
        if (this.nzModalRef) {
            this.nzModalRef.updateConfig({
                nzTitle: this.templateRef
            });
        }
    }
}
NzModalTitleDirective.ɵfac = function NzModalTitleDirective_Factory(t) { return new (t || NzModalTitleDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](NzModalRef, 8), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"])); };
NzModalTitleDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineDirective"]({ type: NzModalTitleDirective, selectors: [["", "nzModalTitle", ""]], exportAs: ["nzModalTitle"] });
NzModalTitleDirective.ctorParameters = () => [
    { type: NzModalRef, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"] }] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzModalComponent {
    constructor(cdr, modal, viewContainerRef) {
        this.cdr = cdr;
        this.modal = modal;
        this.viewContainerRef = viewContainerRef;
        this.nzVisible = false;
        this.nzClosable = true;
        this.nzOkLoading = false;
        this.nzOkDisabled = false;
        this.nzCancelDisabled = false;
        this.nzCancelLoading = false;
        this.nzKeyboard = true;
        this.nzNoAnimation = false;
        this.nzCentered = false;
        this.nzZIndex = 1000;
        this.nzWidth = 520;
        this.nzCloseIcon = 'close';
        this.nzOkType = 'primary';
        this.nzOkDanger = false;
        this.nzIconType = 'question-circle'; // Confirm Modal ONLY
        this.nzModalType = 'default';
        this.nzAutofocus = 'auto';
        // TODO(@hsuanxyz) Input will not be supported
        this.nzOnOk = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        // TODO(@hsuanxyz) Input will not be supported
        this.nzOnCancel = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.nzAfterOpen = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.nzAfterClose = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.nzVisibleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.modalRef = null;
    }
    set modalTitle(value) {
        if (value) {
            this.setTitleWithTemplate(value);
        }
    }
    set modalFooter(value) {
        if (value) {
            this.setFooterWithTemplate(value);
        }
    }
    get afterOpen() {
        // Observable alias for nzAfterOpen
        return this.nzAfterOpen.asObservable();
    }
    get afterClose() {
        // Observable alias for nzAfterClose
        return this.nzAfterClose.asObservable();
    }
    open() {
        if (!this.nzVisible) {
            this.nzVisible = true;
            this.nzVisibleChange.emit(true);
        }
        if (!this.modalRef) {
            const config = this.getConfig();
            this.modalRef = this.modal.create(config);
        }
    }
    close(result) {
        if (this.nzVisible) {
            this.nzVisible = false;
            this.nzVisibleChange.emit(false);
        }
        if (this.modalRef) {
            this.modalRef.close(result);
            this.modalRef = null;
        }
    }
    destroy(result) {
        this.close(result);
    }
    triggerOk() {
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.triggerOk();
    }
    triggerCancel() {
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.triggerCancel();
    }
    getContentComponent() {
        var _a;
        return (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.getContentComponent();
    }
    getElement() {
        var _a;
        return (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.getElement();
    }
    getModalRef() {
        return this.modalRef;
    }
    setTitleWithTemplate(templateRef) {
        this.nzTitle = templateRef;
        if (this.modalRef) {
            // If modalRef already created, set the title in next tick
            Promise.resolve().then(() => {
                this.modalRef.updateConfig({
                    nzTitle: this.nzTitle
                });
            });
        }
    }
    setFooterWithTemplate(templateRef) {
        this.nzFooter = templateRef;
        if (this.modalRef) {
            // If modalRef already created, set the footer in next tick
            Promise.resolve().then(() => {
                this.modalRef.updateConfig({
                    nzFooter: this.nzFooter
                });
            });
        }
        this.cdr.markForCheck();
    }
    getConfig() {
        const componentConfig = getConfigFromComponent(this);
        componentConfig.nzViewContainerRef = this.viewContainerRef;
        if (!this.nzContent && !this.contentFromContentChild) {
            componentConfig.nzContent = this.contentTemplateRef;
            Object(ng_zorro_antd_core_logger__WEBPACK_IMPORTED_MODULE_5__["warnDeprecation"])('Usage `<ng-content></ng-content>` is deprecated, which will be removed in 12.0.0. Please instead use `<ng-template nzModalContent></ng-template>` to declare the content of the modal.');
        }
        else {
            componentConfig.nzContent = this.nzContent || this.contentFromContentChild;
        }
        return componentConfig;
    }
    ngOnChanges(changes) {
        const { nzVisible } = changes, otherChanges = Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__rest"])(changes, ["nzVisible"]);
        if (Object.keys(otherChanges).length && this.modalRef) {
            this.modalRef.updateConfig(getConfigFromComponent(this));
        }
        if (nzVisible) {
            if (this.nzVisible) {
                this.open();
            }
            else {
                this.close();
            }
        }
    }
    ngOnDestroy() {
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a._finishDialogClose();
    }
}
NzModalComponent.ɵfac = function NzModalComponent_Factory(t) { return new (t || NzModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](NzModalService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewContainerRef"])); };
NzModalComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: NzModalComponent, selectors: [["nz-modal"]], contentQueries: function NzModalComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵcontentQuery"](dirIndex, NzModalTitleDirective, 3, _angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵcontentQuery"](dirIndex, NzModalFooterDirective, 3, _angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵcontentQuery"](dirIndex, NzModalContentDirective, 3, _angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"]);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.modalTitle = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.modalFooter = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.contentFromContentChild = _t.first);
    } }, viewQuery: function NzModalComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"], 3);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.contentTemplateRef = _t.first);
    } }, inputs: { nzVisible: "nzVisible", nzClosable: "nzClosable", nzOkLoading: "nzOkLoading", nzOkDisabled: "nzOkDisabled", nzCancelDisabled: "nzCancelDisabled", nzCancelLoading: "nzCancelLoading", nzKeyboard: "nzKeyboard", nzNoAnimation: "nzNoAnimation", nzCentered: "nzCentered", nzZIndex: "nzZIndex", nzWidth: "nzWidth", nzCloseIcon: "nzCloseIcon", nzOkType: "nzOkType", nzOkDanger: "nzOkDanger", nzIconType: "nzIconType", nzModalType: "nzModalType", nzAutofocus: "nzAutofocus", nzOnOk: "nzOnOk", nzOnCancel: "nzOnCancel", nzTitle: "nzTitle", nzFooter: "nzFooter", nzMask: "nzMask", nzMaskClosable: "nzMaskClosable", nzCloseOnNavigation: "nzCloseOnNavigation", nzContent: "nzContent", nzComponentParams: "nzComponentParams", nzWrapClassName: "nzWrapClassName", nzClassName: "nzClassName", nzStyle: "nzStyle", nzMaskStyle: "nzMaskStyle", nzBodyStyle: "nzBodyStyle", nzOkText: "nzOkText", nzCancelText: "nzCancelText" }, outputs: { nzOnOk: "nzOnOk", nzOnCancel: "nzOnCancel", nzAfterOpen: "nzAfterOpen", nzAfterClose: "nzAfterClose", nzVisibleChange: "nzVisibleChange" }, exportAs: ["nzModal"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵNgOnChangesFeature"]], ngContentSelectors: _c1, decls: 1, vars: 0, template: function NzModalComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, NzModalComponent_ng_template_0_Template, 1, 0, "ng-template");
    } }, encapsulation: 2, changeDetection: 0 });
NzModalComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: NzModalService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewContainerRef"] }
];
NzModalComponent.propDecorators = {
    nzMask: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzMaskClosable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzCloseOnNavigation: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzVisible: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzClosable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzOkLoading: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzOkDisabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzCancelDisabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzCancelLoading: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzKeyboard: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzNoAnimation: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzCentered: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzContent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzComponentParams: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzFooter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzZIndex: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzWrapClassName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzClassName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzStyle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzTitle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzCloseIcon: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzMaskStyle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzBodyStyle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzOkText: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzCancelText: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzOkType: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzOkDanger: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzIconType: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzModalType: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzAutofocus: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    nzOnOk: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
    nzOnCancel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
    nzAfterOpen: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
    nzAfterClose: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
    nzVisibleChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
    contentTemplateRef: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"], { static: true },] }],
    modalTitle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ContentChild"], args: [NzModalTitleDirective, { static: true, read: _angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"] },] }],
    contentFromContentChild: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ContentChild"], args: [NzModalContentDirective, { static: true, read: _angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"] },] }],
    modalFooter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ContentChild"], args: [NzModalFooterDirective, { static: true, read: _angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"] },] }]
};
Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__decorate"])([
    Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["InputBoolean"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__metadata"])("design:type", Boolean)
], NzModalComponent.prototype, "nzMask", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__decorate"])([
    Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["InputBoolean"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__metadata"])("design:type", Boolean)
], NzModalComponent.prototype, "nzMaskClosable", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__decorate"])([
    Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["InputBoolean"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__metadata"])("design:type", Boolean)
], NzModalComponent.prototype, "nzCloseOnNavigation", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__decorate"])([
    Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["InputBoolean"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__metadata"])("design:type", Boolean)
], NzModalComponent.prototype, "nzVisible", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__decorate"])([
    Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["InputBoolean"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__metadata"])("design:type", Boolean)
], NzModalComponent.prototype, "nzClosable", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__decorate"])([
    Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["InputBoolean"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__metadata"])("design:type", Boolean)
], NzModalComponent.prototype, "nzOkLoading", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__decorate"])([
    Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["InputBoolean"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__metadata"])("design:type", Boolean)
], NzModalComponent.prototype, "nzOkDisabled", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__decorate"])([
    Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["InputBoolean"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__metadata"])("design:type", Boolean)
], NzModalComponent.prototype, "nzCancelDisabled", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__decorate"])([
    Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["InputBoolean"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__metadata"])("design:type", Boolean)
], NzModalComponent.prototype, "nzCancelLoading", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__decorate"])([
    Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["InputBoolean"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__metadata"])("design:type", Boolean)
], NzModalComponent.prototype, "nzKeyboard", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__decorate"])([
    Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["InputBoolean"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__metadata"])("design:type", Object)
], NzModalComponent.prototype, "nzNoAnimation", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__decorate"])([
    Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["InputBoolean"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__metadata"])("design:type", Object)
], NzModalComponent.prototype, "nzCentered", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__decorate"])([
    Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["InputBoolean"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_14__["__metadata"])("design:type", Boolean)
], NzModalComponent.prototype, "nzOkDanger", void 0);
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](BaseModalContainerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Directive"]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"] }, { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__["FocusTrapFactory"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Renderer2"] }, { type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayRef"] }, { type: ng_zorro_antd_core_config__WEBPACK_IMPORTED_MODULE_4__["NzConfigService"] }, { type: ModalOptions }, { type: undefined }, { type: String }]; }, null); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](NzModalConfirmContainerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"],
        args: [{
                selector: 'nz-modal-confirm-container',
                exportAs: 'nzModalConfirmContainer',
                template: `
    <div
      #modalElement
      role="document"
      class="ant-modal"
      (mousedown)="onMousedown()"
      [ngClass]="config.nzClassName!"
      [ngStyle]="config.nzStyle!"
      [style.width]="config?.nzWidth! | nzToCssUnit"
    >
      <div class="ant-modal-content">
        <button *ngIf="config.nzClosable" nz-modal-close (click)="onCloseClick()"></button>
        <div class="ant-modal-body" [ngStyle]="config.nzBodyStyle!">
          <div class="ant-modal-confirm-body-wrapper">
            <div class="ant-modal-confirm-body">
              <i nz-icon [nzType]="config.nzIconType!"></i>
              <span class="ant-modal-confirm-title">
                <ng-container *nzStringTemplateOutlet="config.nzTitle">
                  <span [innerHTML]="config.nzTitle"></span>
                </ng-container>
              </span>
              <div class="ant-modal-confirm-content">
                <ng-template cdkPortalOutlet></ng-template>
                <div *ngIf="isStringContent" [innerHTML]="config.nzContent"></div>
              </div>
            </div>
            <div class="ant-modal-confirm-btns">
              <button
                *ngIf="config.nzCancelText !== null"
                [attr.cdkFocusInitial]="config.nzAutofocus === 'cancel' || null"
                nz-button
                (click)="onCancel()"
                [nzLoading]="!!config.nzCancelLoading"
                [disabled]="config.nzCancelDisabled"
              >
                {{ config.nzCancelText || locale.cancelText }}
              </button>
              <button
                *ngIf="config.nzOkText !== null"
                [attr.cdkFocusInitial]="config.nzAutofocus === 'ok' || null"
                nz-button
                [nzType]="config.nzOkType!"
                (click)="onOk()"
                [nzLoading]="!!config.nzOkLoading"
                [disabled]="config.nzOkDisabled"
                [nzDanger]="config.nzOkDanger"
              >
                {{ config.nzOkText || locale.okText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
                animations: [nzModalAnimations.modalContainer],
                // Using OnPush for modal caused footer can not to detect changes. we can fix it when 8.x.
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectionStrategy"].Default,
                host: {
                    tabindex: '-1',
                    role: 'dialog',
                    '[class]': 'config.nzWrapClassName ? "ant-modal-wrap " + config.nzWrapClassName : "ant-modal-wrap"',
                    '[class.ant-modal-wrap-rtl]': `dir === 'rtl'`,
                    '[class.ant-modal-centered]': 'config.nzCentered',
                    '[style.zIndex]': 'config.nzZIndex',
                    '[@.disabled]': 'config.nzNoAnimation',
                    '[@modalContainer]': 'state',
                    '(@modalContainer.start)': 'onAnimationStart($event)',
                    '(@modalContainer.done)': 'onAnimationDone($event)',
                    '(click)': 'onContainerClick($event)',
                    '(mouseup)': 'onMouseup()'
                }
            }]
    }], function () { return [{ type: ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_12__["NzI18nService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"] }, { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__["FocusTrapFactory"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Renderer2"] }, { type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayRef"] }, { type: ng_zorro_antd_core_config__WEBPACK_IMPORTED_MODULE_4__["NzConfigService"] }, { type: ModalOptions }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["DOCUMENT"]]
            }] }, { type: String, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"],
                args: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["ANIMATION_MODULE_TYPE"]]
            }] }]; }, { cancelTriggered: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"]
        }], okTriggered: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"]
        }], portalOutlet: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"],
            args: [_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["CdkPortalOutlet"], { static: true }]
        }], modalElementRef: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"],
            args: ['modalElement', { static: true }]
        }] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](NzModalContainerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"],
        args: [{
                selector: 'nz-modal-container',
                exportAs: 'nzModalContainer',
                template: `
    <div
      #modalElement
      role="document"
      class="ant-modal"
      (mousedown)="onMousedown()"
      [ngClass]="config.nzClassName!"
      [ngStyle]="config.nzStyle!"
      [style.width]="config?.nzWidth! | nzToCssUnit"
    >
      <div class="ant-modal-content">
        <button *ngIf="config.nzClosable" nz-modal-close (click)="onCloseClick()"></button>
        <div *ngIf="config.nzTitle" nz-modal-title></div>
        <div class="ant-modal-body" [ngStyle]="config.nzBodyStyle!">
          <ng-template cdkPortalOutlet></ng-template>
          <div *ngIf="isStringContent" [innerHTML]="config.nzContent"></div>
        </div>
        <div
          *ngIf="config.nzFooter !== null"
          nz-modal-footer
          [modalRef]="modalRef"
          (cancelTriggered)="onCloseClick()"
          (okTriggered)="onOkClick()"
        ></div>
      </div>
    </div>
  `,
                animations: [nzModalAnimations.modalContainer],
                // Using OnPush for modal caused footer can not to detect changes. we can fix it when 8.x.
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectionStrategy"].Default,
                host: {
                    tabindex: '-1',
                    role: 'dialog',
                    '[class]': 'config.nzWrapClassName ? "ant-modal-wrap " + config.nzWrapClassName : "ant-modal-wrap"',
                    '[class.ant-modal-wrap-rtl]': `dir === 'rtl'`,
                    '[class.ant-modal-centered]': 'config.nzCentered',
                    '[style.zIndex]': 'config.nzZIndex',
                    '[@.disabled]': 'config.nzNoAnimation',
                    '[@modalContainer]': 'state',
                    '(@modalContainer.start)': 'onAnimationStart($event)',
                    '(@modalContainer.done)': 'onAnimationDone($event)',
                    '(click)': 'onContainerClick($event)',
                    '(mouseup)': 'onMouseup()'
                }
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"] }, { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__["FocusTrapFactory"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Renderer2"] }, { type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayRef"] }, { type: ng_zorro_antd_core_config__WEBPACK_IMPORTED_MODULE_4__["NzConfigService"] }, { type: ModalOptions }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["DOCUMENT"]]
            }] }, { type: String, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"],
                args: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["ANIMATION_MODULE_TYPE"]]
            }] }]; }, { portalOutlet: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"],
            args: [_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["CdkPortalOutlet"], { static: true }]
        }], modalElementRef: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"],
            args: ['modalElement', { static: true }]
        }] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](NzModalService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"]
    }], function () { return [{ type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["Overlay"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injector"] }, { type: ng_zorro_antd_core_config__WEBPACK_IMPORTED_MODULE_4__["NzConfigService"] }, { type: NzModalService, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["SkipSelf"]
            }] }, { type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_0__["Directionality"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"]
            }] }]; }, null); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](NzModalContentDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Directive"],
        args: [{
                selector: '[nzModalContent]',
                exportAs: 'nzModalContent'
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"] }]; }, null); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](NzModalFooterDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Directive"],
        args: [{
                selector: '[nzModalFooter]',
                exportAs: 'nzModalFooter'
            }]
    }], function () { return [{ type: NzModalRef, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"]
            }] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"] }]; }, null); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](NzModalTitleDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Directive"],
        args: [{
                selector: '[nzModalTitle]',
                exportAs: 'nzModalTitle'
            }]
    }], function () { return [{ type: NzModalRef, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"]
            }] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"] }]; }, null); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](NzModalComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"],
        args: [{
                selector: 'nz-modal',
                exportAs: 'nzModal',
                template: `
    <ng-template><ng-content></ng-content></ng-template>
  `,
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectionStrategy"].OnPush
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] }, { type: NzModalService }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewContainerRef"] }]; }, { nzVisible: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzClosable: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzOkLoading: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzOkDisabled: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzCancelDisabled: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzCancelLoading: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzKeyboard: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzNoAnimation: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzCentered: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzZIndex: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzWidth: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzCloseIcon: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzOkType: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzOkDanger: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzIconType: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzModalType: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzAutofocus: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzOnOk: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }, {
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"]
        }], nzOnCancel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }, {
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"]
        }], nzAfterOpen: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"]
        }], nzAfterClose: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"]
        }], nzVisibleChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"]
        }], modalTitle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ContentChild"],
            args: [NzModalTitleDirective, { static: true, read: _angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"] }]
        }], modalFooter: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ContentChild"],
            args: [NzModalFooterDirective, { static: true, read: _angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"] }]
        }], nzTitle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzFooter: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzMask: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzMaskClosable: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzCloseOnNavigation: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzContent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzComponentParams: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzWrapClassName: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzClassName: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzStyle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzMaskStyle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzBodyStyle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzOkText: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], nzCancelText: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }], contentTemplateRef: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"],
            args: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"], { static: true }]
        }], contentFromContentChild: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ContentChild"],
            args: [NzModalContentDirective, { static: true, read: _angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"] }]
        }] }); })();

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzModalCloseComponent {
    constructor(config) {
        this.config = config;
    }
}
NzModalCloseComponent.ɵfac = function NzModalCloseComponent_Factory(t) { return new (t || NzModalCloseComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ModalOptions)); };
NzModalCloseComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: NzModalCloseComponent, selectors: [["button", "nz-modal-close", ""]], hostAttrs: ["aria-label", "Close", 1, "ant-modal-close"], exportAs: ["NzModalCloseBuiltin"], attrs: _c2, decls: 2, vars: 1, consts: [[1, "ant-modal-close-x"], [4, "nzStringTemplateOutlet"], ["nz-icon", "", 1, "ant-modal-close-icon", 3, "nzType"]], template: function NzModalCloseComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, NzModalCloseComponent_ng_container_1_Template, 2, 1, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("nzStringTemplateOutlet", ctx.config.nzCloseIcon);
    } }, directives: [ng_zorro_antd_core_outlet__WEBPACK_IMPORTED_MODULE_18__["NzStringTemplateOutletDirective"], ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_21__["ɵNzTransitionPatchDirective"], ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_19__["NzIconDirective"]], encapsulation: 2, changeDetection: 0 });
NzModalCloseComponent.ctorParameters = () => [
    { type: ModalOptions }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](NzModalCloseComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"],
        args: [{
                selector: 'button[nz-modal-close]',
                exportAs: 'NzModalCloseBuiltin',
                template: `
    <span class="ant-modal-close-x">
      <ng-container *nzStringTemplateOutlet="config.nzCloseIcon; let closeIcon">
        <i nz-icon [nzType]="closeIcon" class="ant-modal-close-icon"></i>
      </ng-container>
    </span>
  `,
                host: {
                    class: 'ant-modal-close',
                    'aria-label': 'Close'
                },
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectionStrategy"].OnPush
            }]
    }], function () { return [{ type: ModalOptions }]; }, null); })();

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzModalFooterComponent {
    constructor(i18n, config) {
        this.i18n = i18n;
        this.config = config;
        this.buttonsFooter = false;
        this.buttons = [];
        this.cancelTriggered = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.okTriggered = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        if (Array.isArray(config.nzFooter)) {
            this.buttonsFooter = true;
            this.buttons = config.nzFooter.map(mergeDefaultOption);
        }
        this.i18n.localeChange.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Modal');
        });
    }
    onCancel() {
        this.cancelTriggered.emit();
    }
    onOk() {
        this.okTriggered.emit();
    }
    /**
     * Returns the value of the specified key.
     * If it is a function, run and return the return value of the function.
     */
    getButtonCallableProp(options, prop) {
        const value = options[prop];
        const componentInstance = this.modalRef.getContentComponent();
        return typeof value === 'function' ? value.apply(options, componentInstance && [componentInstance]) : value;
    }
    /**
     * Run function based on the type and set its `loading` prop if needed.
     */
    onButtonClick(options) {
        const loading = this.getButtonCallableProp(options, 'loading');
        if (!loading) {
            const result = this.getButtonCallableProp(options, 'onClick');
            if (options.autoLoading && Object(ng_zorro_antd_core_util__WEBPACK_IMPORTED_MODULE_6__["isPromise"])(result)) {
                options.loading = true;
                result.then(() => (options.loading = false)).catch(() => (options.loading = false));
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzModalFooterComponent.ɵfac = function NzModalFooterComponent_Factory(t) { return new (t || NzModalFooterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_12__["NzI18nService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ModalOptions)); };
NzModalFooterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: NzModalFooterComponent, selectors: [["div", "nz-modal-footer", ""]], hostAttrs: [1, "ant-modal-footer"], inputs: { modalRef: "modalRef" }, outputs: { cancelTriggered: "cancelTriggered", okTriggered: "okTriggered" }, exportAs: ["NzModalFooterBuiltin"], attrs: _c3, decls: 3, vars: 2, consts: [[4, "ngIf", "ngIfElse"], ["defaultFooterButtons", ""], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], [3, "innerHTML", 4, "ngIf"], [4, "ngIf"], [3, "innerHTML"], ["nz-button", "", 3, "hidden", "nzLoading", "disabled", "nzType", "nzDanger", "nzShape", "nzSize", "nzGhost", "click", 4, "ngFor", "ngForOf"], ["nz-button", "", 3, "hidden", "nzLoading", "disabled", "nzType", "nzDanger", "nzShape", "nzSize", "nzGhost", "click"], ["nz-button", "", 3, "nzLoading", "disabled", "click", 4, "ngIf"], ["nz-button", "", 3, "nzType", "nzDanger", "nzLoading", "disabled", "click", 4, "ngIf"], ["nz-button", "", 3, "nzLoading", "disabled", "click"], ["nz-button", "", 3, "nzType", "nzDanger", "nzLoading", "disabled", "click"]], template: function NzModalFooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, NzModalFooterComponent_ng_container_0_Template, 2, 5, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, NzModalFooterComponent_ng_template_1_Template, 2, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.config.nzFooter)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], ng_zorro_antd_core_outlet__WEBPACK_IMPORTED_MODULE_18__["NzStringTemplateOutletDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgForOf"], ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_16__["NzButtonComponent"], ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_22__["NzWaveDirective"], ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_21__["ɵNzTransitionPatchDirective"]], encapsulation: 2 });
NzModalFooterComponent.ctorParameters = () => [
    { type: ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_12__["NzI18nService"] },
    { type: ModalOptions }
];
NzModalFooterComponent.propDecorators = {
    cancelTriggered: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
    okTriggered: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
    modalRef: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](NzModalFooterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"],
        args: [{
                selector: 'div[nz-modal-footer]',
                exportAs: 'NzModalFooterBuiltin',
                template: `
    <ng-container *ngIf="config.nzFooter; else defaultFooterButtons">
      <ng-container *nzStringTemplateOutlet="config.nzFooter; context: { $implicit: config.nzComponentParams, modalRef: modalRef }">
        <div *ngIf="!buttonsFooter" [innerHTML]="config.nzFooter"></div>
        <ng-container *ngIf="buttonsFooter">
          <button
            *ngFor="let button of buttons"
            nz-button
            (click)="onButtonClick(button)"
            [hidden]="!getButtonCallableProp(button, 'show')"
            [nzLoading]="getButtonCallableProp(button, 'loading')"
            [disabled]="getButtonCallableProp(button, 'disabled')"
            [nzType]="button.type!"
            [nzDanger]="button.danger"
            [nzShape]="button.shape!"
            [nzSize]="button.size!"
            [nzGhost]="button.ghost!"
          >
            {{ button.label }}
          </button>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-template #defaultFooterButtons>
      <button
        *ngIf="config.nzCancelText !== null"
        [attr.cdkFocusInitial]="config.nzAutofocus === 'cancel' || null"
        nz-button
        (click)="onCancel()"
        [nzLoading]="!!config.nzCancelLoading"
        [disabled]="config.nzCancelDisabled"
      >
        {{ config.nzCancelText || locale.cancelText }}
      </button>
      <button
        *ngIf="config.nzOkText !== null"
        [attr.cdkFocusInitial]="config.nzAutofocus === 'ok' || null"
        nz-button
        [nzType]="config.nzOkType!"
        [nzDanger]="config.nzOkDanger"
        (click)="onOk()"
        [nzLoading]="!!config.nzOkLoading"
        [disabled]="config.nzOkDisabled"
      >
        {{ config.nzOkText || locale.okText }}
      </button>
    </ng-template>
  `,
                host: {
                    class: 'ant-modal-footer'
                },
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectionStrategy"].Default
            }]
    }], function () { return [{ type: ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_12__["NzI18nService"] }, { type: ModalOptions }]; }, { cancelTriggered: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"]
        }], okTriggered: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"]
        }], modalRef: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }] }); })();
function mergeDefaultOption(options) {
    return Object.assign({ type: null, size: 'default', autoLoading: true, show: true, loading: false, disabled: false }, options);
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzModalTitleComponent {
    constructor(config) {
        this.config = config;
    }
}
NzModalTitleComponent.ɵfac = function NzModalTitleComponent_Factory(t) { return new (t || NzModalTitleComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ModalOptions)); };
NzModalTitleComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: NzModalTitleComponent, selectors: [["div", "nz-modal-title", ""]], hostAttrs: [1, "ant-modal-header"], exportAs: ["NzModalTitleBuiltin"], attrs: _c5, decls: 2, vars: 1, consts: [[1, "ant-modal-title"], [4, "nzStringTemplateOutlet"], [3, "innerHTML"]], template: function NzModalTitleComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, NzModalTitleComponent_ng_container_1_Template, 2, 1, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("nzStringTemplateOutlet", ctx.config.nzTitle);
    } }, directives: [ng_zorro_antd_core_outlet__WEBPACK_IMPORTED_MODULE_18__["NzStringTemplateOutletDirective"]], encapsulation: 2, changeDetection: 0 });
NzModalTitleComponent.ctorParameters = () => [
    { type: ModalOptions }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](NzModalTitleComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"],
        args: [{
                selector: 'div[nz-modal-title]',
                exportAs: 'NzModalTitleBuiltin',
                template: `
    <div class="ant-modal-title">
      <ng-container *nzStringTemplateOutlet="config.nzTitle">
        <div [innerHTML]="config.nzTitle"></div>
      </ng-container>
    </div>
  `,
                host: {
                    class: 'ant-modal-header'
                },
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectionStrategy"].OnPush
            }]
    }], function () { return [{ type: ModalOptions }]; }, null); })();

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzModalModule {
}
NzModalModule.ɵfac = function NzModalModule_Factory(t) { return new (t || NzModalModule)(); };
NzModalModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: NzModalModule });
NzModalModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ providers: [NzModalService], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_10__["CommonModule"],
            _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_0__["BidiModule"],
            _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayModule"],
            ng_zorro_antd_core_outlet__WEBPACK_IMPORTED_MODULE_18__["NzOutletModule"],
            _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["PortalModule"],
            ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_12__["NzI18nModule"],
            ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_16__["NzButtonModule"],
            ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_19__["NzIconModule"],
            ng_zorro_antd_pipes__WEBPACK_IMPORTED_MODULE_20__["NzPipesModule"],
            ng_zorro_antd_core_no_animation__WEBPACK_IMPORTED_MODULE_17__["NzNoAnimationModule"],
            ng_zorro_antd_pipes__WEBPACK_IMPORTED_MODULE_20__["NzPipesModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](NzModalModule, { declarations: function () { return [NzModalComponent, NzModalFooterDirective, NzModalContentDirective, NzModalCloseComponent, NzModalFooterComponent, NzModalTitleComponent, NzModalTitleDirective, NzModalContainerComponent, NzModalConfirmContainerComponent, NzModalComponent]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_10__["CommonModule"],
        _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_0__["BidiModule"],
        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayModule"],
        ng_zorro_antd_core_outlet__WEBPACK_IMPORTED_MODULE_18__["NzOutletModule"],
        _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["PortalModule"],
        ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_12__["NzI18nModule"],
        ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_16__["NzButtonModule"],
        ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_19__["NzIconModule"],
        ng_zorro_antd_pipes__WEBPACK_IMPORTED_MODULE_20__["NzPipesModule"],
        ng_zorro_antd_core_no_animation__WEBPACK_IMPORTED_MODULE_17__["NzNoAnimationModule"],
        ng_zorro_antd_pipes__WEBPACK_IMPORTED_MODULE_20__["NzPipesModule"]]; }, exports: function () { return [NzModalComponent, NzModalFooterDirective, NzModalContentDirective, NzModalTitleDirective]; } }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](NzModalModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"],
        args: [{
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_10__["CommonModule"],
                    _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_0__["BidiModule"],
                    _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayModule"],
                    ng_zorro_antd_core_outlet__WEBPACK_IMPORTED_MODULE_18__["NzOutletModule"],
                    _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["PortalModule"],
                    ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_12__["NzI18nModule"],
                    ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_16__["NzButtonModule"],
                    ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_19__["NzIconModule"],
                    ng_zorro_antd_pipes__WEBPACK_IMPORTED_MODULE_20__["NzPipesModule"],
                    ng_zorro_antd_core_no_animation__WEBPACK_IMPORTED_MODULE_17__["NzNoAnimationModule"],
                    ng_zorro_antd_pipes__WEBPACK_IMPORTED_MODULE_20__["NzPipesModule"]
                ],
                exports: [NzModalComponent, NzModalFooterDirective, NzModalContentDirective, NzModalTitleDirective],
                providers: [NzModalService],
                entryComponents: [NzModalContainerComponent, NzModalConfirmContainerComponent],
                declarations: [
                    NzModalComponent,
                    NzModalFooterDirective,
                    NzModalContentDirective,
                    NzModalCloseComponent,
                    NzModalFooterComponent,
                    NzModalTitleComponent,
                    NzModalTitleDirective,
                    NzModalContainerComponent,
                    NzModalConfirmContainerComponent,
                    NzModalComponent
                ]
            }]
    }], null, null); })();

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzModalLegacyAPI {
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */



//# sourceMappingURL=ng-zorro-antd-modal.js.map

/***/ }),

/***/ "hNM+":
/*!********************************************************************!*\
  !*** ./src/app/dashboard/graph-display/graph-display.component.ts ***!
  \********************************************************************/
/*! exports provided: GraphDisplayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphDisplayComponent", function() { return GraphDisplayComponent; });
/* harmony import */ var echarts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! echarts */ "MT78");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd/icon */ "FwiY");
/* harmony import */ var ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd/core/transition-patch */ "C2AL");




class GraphDisplayComponent {
    constructor() { }
    ngOnInit() {
        this.chart = echarts__WEBPACK_IMPORTED_MODULE_0__["init"](document.getElementById('graph'));
        this.chart.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                }]
        });
    }
}
GraphDisplayComponent.ɵfac = function GraphDisplayComponent_Factory(t) { return new (t || GraphDisplayComponent)(); };
GraphDisplayComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: GraphDisplayComponent, selectors: [["app-graph-display"]], decls: 4, vars: 0, consts: [["id", "graph"], ["id", "icons"], ["nz-icon", "", "nzType", "link", "nzTheme", "outline", 1, "icon"], ["nz-icon", "", "nzType", "delete", "nzTheme", "outline", 1, "icon"]], template: function GraphDisplayComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "i", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, directives: [ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_2__["NzIconDirective"], ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_3__["ɵNzTransitionPatchDirective"]], styles: ["#graph[_ngcontent-%COMP%] {\n  height: 100vh;\n  width: 100vh;\n  margin: 0 auto;\n}\n\n.icon[_ngcontent-%COMP%] {\n  float: right;\n  padding: 0 10px;\n}\n\n#icons[_ngcontent-%COMP%] {\n  height: 20px;\n  width: auto;\n}\n\n#main[_ngcontent-%COMP%] {\n  align-content: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxncmFwaC1kaXNwbGF5LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRUUsYUFBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0FBQUY7O0FBR0E7RUFFRSxZQUFBO0VBQ0EsZUFBQTtBQURGOztBQUlBO0VBRUUsWUFBQTtFQUNBLFdBQUE7QUFGRjs7QUFLQTtFQUVFLHFCQUFBO0FBSEYiLCJmaWxlIjoiZ3JhcGgtZGlzcGxheS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNncmFwaFxyXG57XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuICB3aWR0aDogMTAwdmg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbn1cclxuXHJcbi5pY29uXHJcbntcclxuICBmbG9hdDogcmlnaHQ7XHJcbiAgcGFkZGluZzogMCAxMHB4O1xyXG59XHJcblxyXG4jaWNvbnNcclxue1xyXG4gIGhlaWdodDogMjBweDtcclxuICB3aWR0aDogYXV0bztcclxufVxyXG5cclxuI21haW5cclxue1xyXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "k7+O":
/*!****************************************************!*\
  !*** ./node_modules/screenfull/dist/screenfull.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
* screenfull
* v5.1.0 - 2020-12-24
* (c) Sindre Sorhus; MIT License
*/
(function () {
	'use strict';

	var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
	var isCommonjs =  true && module.exports;

	var fn = (function () {
		var val;

		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// New WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			// Old WebKit
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0; i < val.length; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	})();

	var eventNameMap = {
		change: fn.fullscreenchange,
		error: fn.fullscreenerror
	};

	var screenfull = {
		request: function (element, options) {
			return new Promise(function (resolve, reject) {
				var onFullScreenEntered = function () {
					this.off('change', onFullScreenEntered);
					resolve();
				}.bind(this);

				this.on('change', onFullScreenEntered);

				element = element || document.documentElement;

				var returnPromise = element[fn.requestFullscreen](options);

				if (returnPromise instanceof Promise) {
					returnPromise.then(onFullScreenEntered).catch(reject);
				}
			}.bind(this));
		},
		exit: function () {
			return new Promise(function (resolve, reject) {
				if (!this.isFullscreen) {
					resolve();
					return;
				}

				var onFullScreenExit = function () {
					this.off('change', onFullScreenExit);
					resolve();
				}.bind(this);

				this.on('change', onFullScreenExit);

				var returnPromise = document[fn.exitFullscreen]();

				if (returnPromise instanceof Promise) {
					returnPromise.then(onFullScreenExit).catch(reject);
				}
			}.bind(this));
		},
		toggle: function (element, options) {
			return this.isFullscreen ? this.exit() : this.request(element, options);
		},
		onchange: function (callback) {
			this.on('change', callback);
		},
		onerror: function (callback) {
			this.on('error', callback);
		},
		on: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.addEventListener(eventName, callback, false);
			}
		},
		off: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.removeEventListener(eventName, callback, false);
			}
		},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = {isEnabled: false};
		} else {
			window.screenfull = {isEnabled: false};
		}

		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function () {
				return Boolean(document[fn.fullscreenElement]);
			}
		},
		element: {
			enumerable: true,
			get: function () {
				return document[fn.fullscreenElement];
			}
		},
		isEnabled: {
			enumerable: true,
			get: function () {
				// Coerce to boolean in case of old WebKit
				return Boolean(document[fn.fullscreenEnabled]);
			}
		}
	});

	if (isCommonjs) {
		module.exports = screenfull;
	} else {
		window.screenfull = screenfull;
	}
})();


/***/ }),

/***/ "u47x":
/*!*****************************************************************!*\
  !*** ./node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/a11y.js ***!
  \*****************************************************************/
/*! exports provided: A11yModule, ActiveDescendantKeyManager, AriaDescriber, CDK_DESCRIBEDBY_HOST_ATTRIBUTE, CDK_DESCRIBEDBY_ID_PREFIX, CdkAriaLive, CdkMonitorFocus, CdkTrapFocus, ConfigurableFocusTrap, ConfigurableFocusTrapFactory, EventListenerFocusTrapInertStrategy, FOCUS_MONITOR_DEFAULT_OPTIONS, FOCUS_TRAP_INERT_STRATEGY, FocusKeyManager, FocusMonitor, FocusTrap, FocusTrapFactory, HighContrastModeDetector, InteractivityChecker, IsFocusableConfig, LIVE_ANNOUNCER_DEFAULT_OPTIONS, LIVE_ANNOUNCER_ELEMENT_TOKEN, LIVE_ANNOUNCER_ELEMENT_TOKEN_FACTORY, ListKeyManager, LiveAnnouncer, MESSAGES_CONTAINER_ID, TOUCH_BUFFER_MS, isFakeMousedownFromScreenReader, isFakeTouchstartFromScreenReader, ɵangular_material_src_cdk_a11y_a11y_a, ɵangular_material_src_cdk_a11y_a11y_b */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A11yModule", function() { return A11yModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActiveDescendantKeyManager", function() { return ActiveDescendantKeyManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AriaDescriber", function() { return AriaDescriber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CDK_DESCRIBEDBY_HOST_ATTRIBUTE", function() { return CDK_DESCRIBEDBY_HOST_ATTRIBUTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CDK_DESCRIBEDBY_ID_PREFIX", function() { return CDK_DESCRIBEDBY_ID_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdkAriaLive", function() { return CdkAriaLive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdkMonitorFocus", function() { return CdkMonitorFocus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdkTrapFocus", function() { return CdkTrapFocus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigurableFocusTrap", function() { return ConfigurableFocusTrap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigurableFocusTrapFactory", function() { return ConfigurableFocusTrapFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventListenerFocusTrapInertStrategy", function() { return EventListenerFocusTrapInertStrategy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FOCUS_MONITOR_DEFAULT_OPTIONS", function() { return FOCUS_MONITOR_DEFAULT_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FOCUS_TRAP_INERT_STRATEGY", function() { return FOCUS_TRAP_INERT_STRATEGY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FocusKeyManager", function() { return FocusKeyManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FocusMonitor", function() { return FocusMonitor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FocusTrap", function() { return FocusTrap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FocusTrapFactory", function() { return FocusTrapFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HighContrastModeDetector", function() { return HighContrastModeDetector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InteractivityChecker", function() { return InteractivityChecker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IsFocusableConfig", function() { return IsFocusableConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LIVE_ANNOUNCER_DEFAULT_OPTIONS", function() { return LIVE_ANNOUNCER_DEFAULT_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LIVE_ANNOUNCER_ELEMENT_TOKEN", function() { return LIVE_ANNOUNCER_ELEMENT_TOKEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LIVE_ANNOUNCER_ELEMENT_TOKEN_FACTORY", function() { return LIVE_ANNOUNCER_ELEMENT_TOKEN_FACTORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListKeyManager", function() { return ListKeyManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveAnnouncer", function() { return LiveAnnouncer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MESSAGES_CONTAINER_ID", function() { return MESSAGES_CONTAINER_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOUCH_BUFFER_MS", function() { return TOUCH_BUFFER_MS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFakeMousedownFromScreenReader", function() { return isFakeMousedownFromScreenReader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFakeTouchstartFromScreenReader", function() { return isFakeTouchstartFromScreenReader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵangular_material_src_cdk_a11y_a11y_a", function() { return FocusTrapManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵangular_material_src_cdk_a11y_a11y_b", function() { return ConfigurableFocusTrapConfig; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/keycodes */ "FtGj");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/coercion */ "8LU1");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/platform */ "nLfN");
/* harmony import */ var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/observers */ "GU7r");









/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** IDs are delimited by an empty space, as per the spec. */



const ID_DELIMITER = ' ';
/**
 * Adds the given ID to the specified ARIA attribute on an element.
 * Used for attributes such as aria-labelledby, aria-owns, etc.
 */
function addAriaReferencedId(el, attr, id) {
    const ids = getAriaReferenceIds(el, attr);
    if (ids.some(existingId => existingId.trim() == id.trim())) {
        return;
    }
    ids.push(id.trim());
    el.setAttribute(attr, ids.join(ID_DELIMITER));
}
/**
 * Removes the given ID from the specified ARIA attribute on an element.
 * Used for attributes such as aria-labelledby, aria-owns, etc.
 */
function removeAriaReferencedId(el, attr, id) {
    const ids = getAriaReferenceIds(el, attr);
    const filteredIds = ids.filter(val => val != id.trim());
    if (filteredIds.length) {
        el.setAttribute(attr, filteredIds.join(ID_DELIMITER));
    }
    else {
        el.removeAttribute(attr);
    }
}
/**
 * Gets the list of IDs referenced by the given ARIA attribute on an element.
 * Used for attributes such as aria-labelledby, aria-owns, etc.
 */
function getAriaReferenceIds(el, attr) {
    // Get string array of all individual ids (whitespace delimited) in the attribute value
    return (el.getAttribute(attr) || '').match(/\S+/g) || [];
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** ID used for the body container where all messages are appended. */
const MESSAGES_CONTAINER_ID = 'cdk-describedby-message-container';
/** ID prefix used for each created message element. */
const CDK_DESCRIBEDBY_ID_PREFIX = 'cdk-describedby-message';
/** Attribute given to each host element that is described by a message element. */
const CDK_DESCRIBEDBY_HOST_ATTRIBUTE = 'cdk-describedby-host';
/** Global incremental identifier for each registered message element. */
let nextId = 0;
/** Global map of all registered message elements that have been placed into the document. */
const messageRegistry = new Map();
/** Container for all registered messages. */
let messagesContainer = null;
/**
 * Utility that creates visually hidden elements with a message content. Useful for elements that
 * want to use aria-describedby to further describe themselves without adding additional visual
 * content.
 */
class AriaDescriber {
    constructor(_document) {
        this._document = _document;
    }
    describe(hostElement, message, role) {
        if (!this._canBeDescribed(hostElement, message)) {
            return;
        }
        const key = getKey(message, role);
        if (typeof message !== 'string') {
            // We need to ensure that the element has an ID.
            setMessageId(message);
            messageRegistry.set(key, { messageElement: message, referenceCount: 0 });
        }
        else if (!messageRegistry.has(key)) {
            this._createMessageElement(message, role);
        }
        if (!this._isElementDescribedByMessage(hostElement, key)) {
            this._addMessageReference(hostElement, key);
        }
    }
    removeDescription(hostElement, message, role) {
        if (!message || !this._isElementNode(hostElement)) {
            return;
        }
        const key = getKey(message, role);
        if (this._isElementDescribedByMessage(hostElement, key)) {
            this._removeMessageReference(hostElement, key);
        }
        // If the message is a string, it means that it's one that we created for the
        // consumer so we can remove it safely, otherwise we should leave it in place.
        if (typeof message === 'string') {
            const registeredMessage = messageRegistry.get(key);
            if (registeredMessage && registeredMessage.referenceCount === 0) {
                this._deleteMessageElement(key);
            }
        }
        if (messagesContainer && messagesContainer.childNodes.length === 0) {
            this._deleteMessagesContainer();
        }
    }
    /** Unregisters all created message elements and removes the message container. */
    ngOnDestroy() {
        const describedElements = this._document.querySelectorAll(`[${CDK_DESCRIBEDBY_HOST_ATTRIBUTE}]`);
        for (let i = 0; i < describedElements.length; i++) {
            this._removeCdkDescribedByReferenceIds(describedElements[i]);
            describedElements[i].removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
        }
        if (messagesContainer) {
            this._deleteMessagesContainer();
        }
        messageRegistry.clear();
    }
    /**
     * Creates a new element in the visually hidden message container element with the message
     * as its content and adds it to the message registry.
     */
    _createMessageElement(message, role) {
        const messageElement = this._document.createElement('div');
        setMessageId(messageElement);
        messageElement.textContent = message;
        if (role) {
            messageElement.setAttribute('role', role);
        }
        this._createMessagesContainer();
        messagesContainer.appendChild(messageElement);
        messageRegistry.set(getKey(message, role), { messageElement, referenceCount: 0 });
    }
    /** Deletes the message element from the global messages container. */
    _deleteMessageElement(key) {
        const registeredMessage = messageRegistry.get(key);
        const messageElement = registeredMessage && registeredMessage.messageElement;
        if (messagesContainer && messageElement) {
            messagesContainer.removeChild(messageElement);
        }
        messageRegistry.delete(key);
    }
    /** Creates the global container for all aria-describedby messages. */
    _createMessagesContainer() {
        if (!messagesContainer) {
            const preExistingContainer = this._document.getElementById(MESSAGES_CONTAINER_ID);
            // When going from the server to the client, we may end up in a situation where there's
            // already a container on the page, but we don't have a reference to it. Clear the
            // old container so we don't get duplicates. Doing this, instead of emptying the previous
            // container, should be slightly faster.
            if (preExistingContainer && preExistingContainer.parentNode) {
                preExistingContainer.parentNode.removeChild(preExistingContainer);
            }
            messagesContainer = this._document.createElement('div');
            messagesContainer.id = MESSAGES_CONTAINER_ID;
            // We add `visibility: hidden` in order to prevent text in this container from
            // being searchable by the browser's Ctrl + F functionality.
            // Screen-readers will still read the description for elements with aria-describedby even
            // when the description element is not visible.
            messagesContainer.style.visibility = 'hidden';
            // Even though we use `visibility: hidden`, we still apply `cdk-visually-hidden` so that
            // the description element doesn't impact page layout.
            messagesContainer.classList.add('cdk-visually-hidden');
            this._document.body.appendChild(messagesContainer);
        }
    }
    /** Deletes the global messages container. */
    _deleteMessagesContainer() {
        if (messagesContainer && messagesContainer.parentNode) {
            messagesContainer.parentNode.removeChild(messagesContainer);
            messagesContainer = null;
        }
    }
    /** Removes all cdk-describedby messages that are hosted through the element. */
    _removeCdkDescribedByReferenceIds(element) {
        // Remove all aria-describedby reference IDs that are prefixed by CDK_DESCRIBEDBY_ID_PREFIX
        const originalReferenceIds = getAriaReferenceIds(element, 'aria-describedby')
            .filter(id => id.indexOf(CDK_DESCRIBEDBY_ID_PREFIX) != 0);
        element.setAttribute('aria-describedby', originalReferenceIds.join(' '));
    }
    /**
     * Adds a message reference to the element using aria-describedby and increments the registered
     * message's reference count.
     */
    _addMessageReference(element, key) {
        const registeredMessage = messageRegistry.get(key);
        // Add the aria-describedby reference and set the
        // describedby_host attribute to mark the element.
        addAriaReferencedId(element, 'aria-describedby', registeredMessage.messageElement.id);
        element.setAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE, '');
        registeredMessage.referenceCount++;
    }
    /**
     * Removes a message reference from the element using aria-describedby
     * and decrements the registered message's reference count.
     */
    _removeMessageReference(element, key) {
        const registeredMessage = messageRegistry.get(key);
        registeredMessage.referenceCount--;
        removeAriaReferencedId(element, 'aria-describedby', registeredMessage.messageElement.id);
        element.removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
    }
    /** Returns true if the element has been described by the provided message ID. */
    _isElementDescribedByMessage(element, key) {
        const referenceIds = getAriaReferenceIds(element, 'aria-describedby');
        const registeredMessage = messageRegistry.get(key);
        const messageId = registeredMessage && registeredMessage.messageElement.id;
        return !!messageId && referenceIds.indexOf(messageId) != -1;
    }
    /** Determines whether a message can be described on a particular element. */
    _canBeDescribed(element, message) {
        if (!this._isElementNode(element)) {
            return false;
        }
        if (message && typeof message === 'object') {
            // We'd have to make some assumptions about the description element's text, if the consumer
            // passed in an element. Assume that if an element is passed in, the consumer has verified
            // that it can be used as a description.
            return true;
        }
        const trimmedMessage = message == null ? '' : `${message}`.trim();
        const ariaLabel = element.getAttribute('aria-label');
        // We shouldn't set descriptions if they're exactly the same as the `aria-label` of the
        // element, because screen readers will end up reading out the same text twice in a row.
        return trimmedMessage ? (!ariaLabel || ariaLabel.trim() !== trimmedMessage) : false;
    }
    /** Checks whether a node is an Element node. */
    _isElementNode(element) {
        return element.nodeType === this._document.ELEMENT_NODE;
    }
}
AriaDescriber.ɵfac = function AriaDescriber_Factory(t) { return new (t || AriaDescriber)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"])); };
AriaDescriber.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function AriaDescriber_Factory() { return new AriaDescriber(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"])); }, token: AriaDescriber, providedIn: "root" });
AriaDescriber.ctorParameters = () => [
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"],] }] }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AriaDescriber, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]]
            }] }]; }, null); })();
/** Gets a key that can be used to look messages up in the registry. */
function getKey(message, role) {
    return typeof message === 'string' ? `${role || ''}/${message}` : message;
}
/** Assigns a unique ID to an element, if it doesn't have one already. */
function setMessageId(element) {
    if (!element.id) {
        element.id = `${CDK_DESCRIBEDBY_ID_PREFIX}-${nextId++}`;
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 */
class ListKeyManager {
    constructor(_items) {
        this._items = _items;
        this._activeItemIndex = -1;
        this._activeItem = null;
        this._wrap = false;
        this._letterKeyStream = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._typeaheadSubscription = rxjs__WEBPACK_IMPORTED_MODULE_2__["Subscription"].EMPTY;
        this._vertical = true;
        this._allowedModifierKeys = [];
        this._homeAndEnd = false;
        /**
         * Predicate function that can be used to check whether an item should be skipped
         * by the key manager. By default, disabled items are skipped.
         */
        this._skipPredicateFn = (item) => item.disabled;
        // Buffer for the letters that the user has pressed when the typeahead option is turned on.
        this._pressedLetters = [];
        /**
         * Stream that emits any time the TAB key is pressed, so components can react
         * when focus is shifted off of the list.
         */
        this.tabOut = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /** Stream that emits whenever the active item of the list manager changes. */
        this.change = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        // We allow for the items to be an array because, in some cases, the consumer may
        // not have access to a QueryList of the items they want to manage (e.g. when the
        // items aren't being collected via `ViewChildren` or `ContentChildren`).
        if (_items instanceof _angular_core__WEBPACK_IMPORTED_MODULE_1__["QueryList"]) {
            _items.changes.subscribe((newItems) => {
                if (this._activeItem) {
                    const itemArray = newItems.toArray();
                    const newIndex = itemArray.indexOf(this._activeItem);
                    if (newIndex > -1 && newIndex !== this._activeItemIndex) {
                        this._activeItemIndex = newIndex;
                    }
                }
            });
        }
    }
    /**
     * Sets the predicate function that determines which items should be skipped by the
     * list key manager.
     * @param predicate Function that determines whether the given item should be skipped.
     */
    skipPredicate(predicate) {
        this._skipPredicateFn = predicate;
        return this;
    }
    /**
     * Configures wrapping mode, which determines whether the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     * @param shouldWrap Whether the list should wrap when reaching the end.
     */
    withWrap(shouldWrap = true) {
        this._wrap = shouldWrap;
        return this;
    }
    /**
     * Configures whether the key manager should be able to move the selection vertically.
     * @param enabled Whether vertical selection should be enabled.
     */
    withVerticalOrientation(enabled = true) {
        this._vertical = enabled;
        return this;
    }
    /**
     * Configures the key manager to move the selection horizontally.
     * Passing in `null` will disable horizontal movement.
     * @param direction Direction in which the selection can be moved.
     */
    withHorizontalOrientation(direction) {
        this._horizontal = direction;
        return this;
    }
    /**
     * Modifier keys which are allowed to be held down and whose default actions will be prevented
     * as the user is pressing the arrow keys. Defaults to not allowing any modifier keys.
     */
    withAllowedModifierKeys(keys) {
        this._allowedModifierKeys = keys;
        return this;
    }
    /**
     * Turns on typeahead mode which allows users to set the active item by typing.
     * @param debounceInterval Time to wait after the last keystroke before setting the active item.
     */
    withTypeAhead(debounceInterval = 200) {
        if ((typeof ngDevMode === 'undefined' || ngDevMode) && (this._items.length &&
            this._items.some(item => typeof item.getLabel !== 'function'))) {
            throw Error('ListKeyManager items in typeahead mode must implement the `getLabel` method.');
        }
        this._typeaheadSubscription.unsubscribe();
        // Debounce the presses of non-navigational keys, collect the ones that correspond to letters
        // and convert those letters back into a string. Afterwards find the first item that starts
        // with that string and select it.
        this._typeaheadSubscription = this._letterKeyStream.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(letter => this._pressedLetters.push(letter)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["debounceTime"])(debounceInterval), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(() => this._pressedLetters.length > 0), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(() => this._pressedLetters.join(''))).subscribe(inputString => {
            const items = this._getItemsArray();
            // Start at 1 because we want to start searching at the item immediately
            // following the current active item.
            for (let i = 1; i < items.length + 1; i++) {
                const index = (this._activeItemIndex + i) % items.length;
                const item = items[index];
                if (!this._skipPredicateFn(item) &&
                    item.getLabel().toUpperCase().trim().indexOf(inputString) === 0) {
                    this.setActiveItem(index);
                    break;
                }
            }
            this._pressedLetters = [];
        });
        return this;
    }
    /**
     * Configures the key manager to activate the first and last items
     * respectively when the Home or End key is pressed.
     * @param enabled Whether pressing the Home or End key activates the first/last item.
     */
    withHomeAndEnd(enabled = true) {
        this._homeAndEnd = enabled;
        return this;
    }
    setActiveItem(item) {
        const previousActiveItem = this._activeItem;
        this.updateActiveItem(item);
        if (this._activeItem !== previousActiveItem) {
            this.change.next(this._activeItemIndex);
        }
    }
    /**
     * Sets the active item depending on the key event passed in.
     * @param event Keyboard event to be used for determining which element should be active.
     */
    onKeydown(event) {
        const keyCode = event.keyCode;
        const modifiers = ['altKey', 'ctrlKey', 'metaKey', 'shiftKey'];
        const isModifierAllowed = modifiers.every(modifier => {
            return !event[modifier] || this._allowedModifierKeys.indexOf(modifier) > -1;
        });
        switch (keyCode) {
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__["TAB"]:
                this.tabOut.next();
                return;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__["DOWN_ARROW"]:
                if (this._vertical && isModifierAllowed) {
                    this.setNextItemActive();
                    break;
                }
                else {
                    return;
                }
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__["UP_ARROW"]:
                if (this._vertical && isModifierAllowed) {
                    this.setPreviousItemActive();
                    break;
                }
                else {
                    return;
                }
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__["RIGHT_ARROW"]:
                if (this._horizontal && isModifierAllowed) {
                    this._horizontal === 'rtl' ? this.setPreviousItemActive() : this.setNextItemActive();
                    break;
                }
                else {
                    return;
                }
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__["LEFT_ARROW"]:
                if (this._horizontal && isModifierAllowed) {
                    this._horizontal === 'rtl' ? this.setNextItemActive() : this.setPreviousItemActive();
                    break;
                }
                else {
                    return;
                }
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__["HOME"]:
                if (this._homeAndEnd && isModifierAllowed) {
                    this.setFirstItemActive();
                    break;
                }
                else {
                    return;
                }
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__["END"]:
                if (this._homeAndEnd && isModifierAllowed) {
                    this.setLastItemActive();
                    break;
                }
                else {
                    return;
                }
            default:
                if (isModifierAllowed || Object(_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__["hasModifierKey"])(event, 'shiftKey')) {
                    // Attempt to use the `event.key` which also maps it to the user's keyboard language,
                    // otherwise fall back to resolving alphanumeric characters via the keyCode.
                    if (event.key && event.key.length === 1) {
                        this._letterKeyStream.next(event.key.toLocaleUpperCase());
                    }
                    else if ((keyCode >= _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__["A"] && keyCode <= _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__["Z"]) || (keyCode >= _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__["ZERO"] && keyCode <= _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__["NINE"])) {
                        this._letterKeyStream.next(String.fromCharCode(keyCode));
                    }
                }
                // Note that we return here, in order to avoid preventing
                // the default action of non-navigational keys.
                return;
        }
        this._pressedLetters = [];
        event.preventDefault();
    }
    /** Index of the currently active item. */
    get activeItemIndex() {
        return this._activeItemIndex;
    }
    /** The active item. */
    get activeItem() {
        return this._activeItem;
    }
    /** Gets whether the user is currently typing into the manager using the typeahead feature. */
    isTyping() {
        return this._pressedLetters.length > 0;
    }
    /** Sets the active item to the first enabled item in the list. */
    setFirstItemActive() {
        this._setActiveItemByIndex(0, 1);
    }
    /** Sets the active item to the last enabled item in the list. */
    setLastItemActive() {
        this._setActiveItemByIndex(this._items.length - 1, -1);
    }
    /** Sets the active item to the next enabled item in the list. */
    setNextItemActive() {
        this._activeItemIndex < 0 ? this.setFirstItemActive() : this._setActiveItemByDelta(1);
    }
    /** Sets the active item to a previous enabled item in the list. */
    setPreviousItemActive() {
        this._activeItemIndex < 0 && this._wrap ? this.setLastItemActive()
            : this._setActiveItemByDelta(-1);
    }
    updateActiveItem(item) {
        const itemArray = this._getItemsArray();
        const index = typeof item === 'number' ? item : itemArray.indexOf(item);
        const activeItem = itemArray[index];
        // Explicitly check for `null` and `undefined` because other falsy values are valid.
        this._activeItem = activeItem == null ? null : activeItem;
        this._activeItemIndex = index;
    }
    /**
     * This method sets the active item, given a list of items and the delta between the
     * currently active item and the new active item. It will calculate differently
     * depending on whether wrap mode is turned on.
     */
    _setActiveItemByDelta(delta) {
        this._wrap ? this._setActiveInWrapMode(delta) : this._setActiveInDefaultMode(delta);
    }
    /**
     * Sets the active item properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     */
    _setActiveInWrapMode(delta) {
        const items = this._getItemsArray();
        for (let i = 1; i <= items.length; i++) {
            const index = (this._activeItemIndex + (delta * i) + items.length) % items.length;
            const item = items[index];
            if (!this._skipPredicateFn(item)) {
                this.setActiveItem(index);
                return;
            }
        }
    }
    /**
     * Sets the active item properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     */
    _setActiveInDefaultMode(delta) {
        this._setActiveItemByIndex(this._activeItemIndex + delta, delta);
    }
    /**
     * Sets the active item to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     */
    _setActiveItemByIndex(index, fallbackDelta) {
        const items = this._getItemsArray();
        if (!items[index]) {
            return;
        }
        while (this._skipPredicateFn(items[index])) {
            index += fallbackDelta;
            if (!items[index]) {
                return;
            }
        }
        this.setActiveItem(index);
    }
    /** Returns the items as an array. */
    _getItemsArray() {
        return this._items instanceof _angular_core__WEBPACK_IMPORTED_MODULE_1__["QueryList"] ? this._items.toArray() : this._items;
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class ActiveDescendantKeyManager extends ListKeyManager {
    setActiveItem(index) {
        if (this.activeItem) {
            this.activeItem.setInactiveStyles();
        }
        super.setActiveItem(index);
        if (this.activeItem) {
            this.activeItem.setActiveStyles();
        }
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class FocusKeyManager extends ListKeyManager {
    constructor() {
        super(...arguments);
        this._origin = 'program';
    }
    /**
     * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
     * @param origin Focus origin to be used when focusing items.
     */
    setFocusOrigin(origin) {
        this._origin = origin;
        return this;
    }
    setActiveItem(item) {
        super.setActiveItem(item);
        if (this.activeItem) {
            this.activeItem.focus(this._origin);
        }
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Configuration for the isFocusable method.
 */
class IsFocusableConfig {
    constructor() {
        /**
         * Whether to count an element as focusable even if it is not currently visible.
         */
        this.ignoreVisibility = false;
    }
}
// The InteractivityChecker leans heavily on the ally.js accessibility utilities.
// Methods like `isTabbable` are only covering specific edge-cases for the browsers which are
// supported.
/**
 * Utility for checking the interactivity of an element, such as whether is is focusable or
 * tabbable.
 */
class InteractivityChecker {
    constructor(_platform) {
        this._platform = _platform;
    }
    /**
     * Gets whether an element is disabled.
     *
     * @param element Element to be checked.
     * @returns Whether the element is disabled.
     */
    isDisabled(element) {
        // This does not capture some cases, such as a non-form control with a disabled attribute or
        // a form control inside of a disabled form, but should capture the most common cases.
        return element.hasAttribute('disabled');
    }
    /**
     * Gets whether an element is visible for the purposes of interactivity.
     *
     * This will capture states like `display: none` and `visibility: hidden`, but not things like
     * being clipped by an `overflow: hidden` parent or being outside the viewport.
     *
     * @returns Whether the element is visible.
     */
    isVisible(element) {
        return hasGeometry(element) && getComputedStyle(element).visibility === 'visible';
    }
    /**
     * Gets whether an element can be reached via Tab key.
     * Assumes that the element has already been checked with isFocusable.
     *
     * @param element Element to be checked.
     * @returns Whether the element is tabbable.
     */
    isTabbable(element) {
        // Nothing is tabbable on the server 😎
        if (!this._platform.isBrowser) {
            return false;
        }
        const frameElement = getFrameElement(getWindow(element));
        if (frameElement) {
            // Frame elements inherit their tabindex onto all child elements.
            if (getTabIndexValue(frameElement) === -1) {
                return false;
            }
            // Browsers disable tabbing to an element inside of an invisible frame.
            if (!this.isVisible(frameElement)) {
                return false;
            }
        }
        let nodeName = element.nodeName.toLowerCase();
        let tabIndexValue = getTabIndexValue(element);
        if (element.hasAttribute('contenteditable')) {
            return tabIndexValue !== -1;
        }
        if (nodeName === 'iframe' || nodeName === 'object') {
            // The frame or object's content may be tabbable depending on the content, but it's
            // not possibly to reliably detect the content of the frames. We always consider such
            // elements as non-tabbable.
            return false;
        }
        // In iOS, the browser only considers some specific elements as tabbable.
        if (this._platform.WEBKIT && this._platform.IOS && !isPotentiallyTabbableIOS(element)) {
            return false;
        }
        if (nodeName === 'audio') {
            // Audio elements without controls enabled are never tabbable, regardless
            // of the tabindex attribute explicitly being set.
            if (!element.hasAttribute('controls')) {
                return false;
            }
            // Audio elements with controls are by default tabbable unless the
            // tabindex attribute is set to `-1` explicitly.
            return tabIndexValue !== -1;
        }
        if (nodeName === 'video') {
            // For all video elements, if the tabindex attribute is set to `-1`, the video
            // is not tabbable. Note: We cannot rely on the default `HTMLElement.tabIndex`
            // property as that one is set to `-1` in Chrome, Edge and Safari v13.1. The
            // tabindex attribute is the source of truth here.
            if (tabIndexValue === -1) {
                return false;
            }
            // If the tabindex is explicitly set, and not `-1` (as per check before), the
            // video element is always tabbable (regardless of whether it has controls or not).
            if (tabIndexValue !== null) {
                return true;
            }
            // Otherwise (when no explicit tabindex is set), a video is only tabbable if it
            // has controls enabled. Firefox is special as videos are always tabbable regardless
            // of whether there are controls or not.
            return this._platform.FIREFOX || element.hasAttribute('controls');
        }
        return element.tabIndex >= 0;
    }
    /**
     * Gets whether an element can be focused by the user.
     *
     * @param element Element to be checked.
     * @param config The config object with options to customize this method's behavior
     * @returns Whether the element is focusable.
     */
    isFocusable(element, config) {
        // Perform checks in order of left to most expensive.
        // Again, naive approach that does not capture many edge cases and browser quirks.
        return isPotentiallyFocusable(element) && !this.isDisabled(element) &&
            ((config === null || config === void 0 ? void 0 : config.ignoreVisibility) || this.isVisible(element));
    }
}
InteractivityChecker.ɵfac = function InteractivityChecker_Factory(t) { return new (t || InteractivityChecker)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"])); };
InteractivityChecker.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function InteractivityChecker_Factory() { return new InteractivityChecker(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"])); }, token: InteractivityChecker, providedIn: "root" });
InteractivityChecker.ctorParameters = () => [
    { type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"] }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](InteractivityChecker, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"] }]; }, null); })();
/**
 * Returns the frame element from a window object. Since browsers like MS Edge throw errors if
 * the frameElement property is being accessed from a different host address, this property
 * should be accessed carefully.
 */
function getFrameElement(window) {
    try {
        return window.frameElement;
    }
    catch (_a) {
        return null;
    }
}
/** Checks whether the specified element has any geometry / rectangles. */
function hasGeometry(element) {
    // Use logic from jQuery to check for an invisible element.
    // See https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js#L12
    return !!(element.offsetWidth || element.offsetHeight ||
        (typeof element.getClientRects === 'function' && element.getClientRects().length));
}
/** Gets whether an element's  */
function isNativeFormElement(element) {
    let nodeName = element.nodeName.toLowerCase();
    return nodeName === 'input' ||
        nodeName === 'select' ||
        nodeName === 'button' ||
        nodeName === 'textarea';
}
/** Gets whether an element is an `<input type="hidden">`. */
function isHiddenInput(element) {
    return isInputElement(element) && element.type == 'hidden';
}
/** Gets whether an element is an anchor that has an href attribute. */
function isAnchorWithHref(element) {
    return isAnchorElement(element) && element.hasAttribute('href');
}
/** Gets whether an element is an input element. */
function isInputElement(element) {
    return element.nodeName.toLowerCase() == 'input';
}
/** Gets whether an element is an anchor element. */
function isAnchorElement(element) {
    return element.nodeName.toLowerCase() == 'a';
}
/** Gets whether an element has a valid tabindex. */
function hasValidTabIndex(element) {
    if (!element.hasAttribute('tabindex') || element.tabIndex === undefined) {
        return false;
    }
    let tabIndex = element.getAttribute('tabindex');
    // IE11 parses tabindex="" as the value "-32768"
    if (tabIndex == '-32768') {
        return false;
    }
    return !!(tabIndex && !isNaN(parseInt(tabIndex, 10)));
}
/**
 * Returns the parsed tabindex from the element attributes instead of returning the
 * evaluated tabindex from the browsers defaults.
 */
function getTabIndexValue(element) {
    if (!hasValidTabIndex(element)) {
        return null;
    }
    // See browser issue in Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1128054
    const tabIndex = parseInt(element.getAttribute('tabindex') || '', 10);
    return isNaN(tabIndex) ? -1 : tabIndex;
}
/** Checks whether the specified element is potentially tabbable on iOS */
function isPotentiallyTabbableIOS(element) {
    let nodeName = element.nodeName.toLowerCase();
    let inputType = nodeName === 'input' && element.type;
    return inputType === 'text'
        || inputType === 'password'
        || nodeName === 'select'
        || nodeName === 'textarea';
}
/**
 * Gets whether an element is potentially focusable without taking current visible/disabled state
 * into account.
 */
function isPotentiallyFocusable(element) {
    // Inputs are potentially focusable *unless* they're type="hidden".
    if (isHiddenInput(element)) {
        return false;
    }
    return isNativeFormElement(element) ||
        isAnchorWithHref(element) ||
        element.hasAttribute('contenteditable') ||
        hasValidTabIndex(element);
}
/** Gets the parent window of a DOM node with regards of being inside of an iframe. */
function getWindow(node) {
    // ownerDocument is null if `node` itself *is* a document.
    return node.ownerDocument && node.ownerDocument.defaultView || window;
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Class that allows for trapping focus within a DOM element.
 *
 * This class currently uses a relatively simple approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like `tabIndex > 0`, flex `order`, and shadow roots can cause the two to be misaligned.
 *
 * @deprecated Use `ConfigurableFocusTrap` instead.
 * @breaking-change 11.0.0
 */
class FocusTrap {
    constructor(_element, _checker, _ngZone, _document, deferAnchors = false) {
        this._element = _element;
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._document = _document;
        this._hasAttached = false;
        // Event listeners for the anchors. Need to be regular functions so that we can unbind them later.
        this.startAnchorListener = () => this.focusLastTabbableElement();
        this.endAnchorListener = () => this.focusFirstTabbableElement();
        this._enabled = true;
        if (!deferAnchors) {
            this.attachAnchors();
        }
    }
    /** Whether the focus trap is active. */
    get enabled() { return this._enabled; }
    set enabled(value) {
        this._enabled = value;
        if (this._startAnchor && this._endAnchor) {
            this._toggleAnchorTabIndex(value, this._startAnchor);
            this._toggleAnchorTabIndex(value, this._endAnchor);
        }
    }
    /** Destroys the focus trap by cleaning up the anchors. */
    destroy() {
        const startAnchor = this._startAnchor;
        const endAnchor = this._endAnchor;
        if (startAnchor) {
            startAnchor.removeEventListener('focus', this.startAnchorListener);
            if (startAnchor.parentNode) {
                startAnchor.parentNode.removeChild(startAnchor);
            }
        }
        if (endAnchor) {
            endAnchor.removeEventListener('focus', this.endAnchorListener);
            if (endAnchor.parentNode) {
                endAnchor.parentNode.removeChild(endAnchor);
            }
        }
        this._startAnchor = this._endAnchor = null;
        this._hasAttached = false;
    }
    /**
     * Inserts the anchors into the DOM. This is usually done automatically
     * in the constructor, but can be deferred for cases like directives with `*ngIf`.
     * @returns Whether the focus trap managed to attach successfully. This may not be the case
     * if the target element isn't currently in the DOM.
     */
    attachAnchors() {
        // If we're not on the browser, there can be no focus to trap.
        if (this._hasAttached) {
            return true;
        }
        this._ngZone.runOutsideAngular(() => {
            if (!this._startAnchor) {
                this._startAnchor = this._createAnchor();
                this._startAnchor.addEventListener('focus', this.startAnchorListener);
            }
            if (!this._endAnchor) {
                this._endAnchor = this._createAnchor();
                this._endAnchor.addEventListener('focus', this.endAnchorListener);
            }
        });
        if (this._element.parentNode) {
            this._element.parentNode.insertBefore(this._startAnchor, this._element);
            this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling);
            this._hasAttached = true;
        }
        return this._hasAttached;
    }
    /**
     * Waits for the zone to stabilize, then either focuses the first element that the
     * user specified, or the first tabbable element.
     * @returns Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfully.
     */
    focusInitialElementWhenReady() {
        return new Promise(resolve => {
            this._executeOnStable(() => resolve(this.focusInitialElement()));
        });
    }
    /**
     * Waits for the zone to stabilize, then focuses
     * the first tabbable element within the focus trap region.
     * @returns Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfully.
     */
    focusFirstTabbableElementWhenReady() {
        return new Promise(resolve => {
            this._executeOnStable(() => resolve(this.focusFirstTabbableElement()));
        });
    }
    /**
     * Waits for the zone to stabilize, then focuses
     * the last tabbable element within the focus trap region.
     * @returns Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfully.
     */
    focusLastTabbableElementWhenReady() {
        return new Promise(resolve => {
            this._executeOnStable(() => resolve(this.focusLastTabbableElement()));
        });
    }
    /**
     * Get the specified boundary element of the trapped region.
     * @param bound The boundary to get (start or end of trapped region).
     * @returns The boundary element.
     */
    _getRegionBoundary(bound) {
        // Contains the deprecated version of selector, for temporary backwards comparability.
        let markers = this._element.querySelectorAll(`[cdk-focus-region-${bound}], ` +
            `[cdkFocusRegion${bound}], ` +
            `[cdk-focus-${bound}]`);
        for (let i = 0; i < markers.length; i++) {
            // @breaking-change 8.0.0
            if (markers[i].hasAttribute(`cdk-focus-${bound}`)) {
                console.warn(`Found use of deprecated attribute 'cdk-focus-${bound}', ` +
                    `use 'cdkFocusRegion${bound}' instead. The deprecated ` +
                    `attribute will be removed in 8.0.0.`, markers[i]);
            }
            else if (markers[i].hasAttribute(`cdk-focus-region-${bound}`)) {
                console.warn(`Found use of deprecated attribute 'cdk-focus-region-${bound}', ` +
                    `use 'cdkFocusRegion${bound}' instead. The deprecated attribute ` +
                    `will be removed in 8.0.0.`, markers[i]);
            }
        }
        if (bound == 'start') {
            return markers.length ? markers[0] : this._getFirstTabbableElement(this._element);
        }
        return markers.length ?
            markers[markers.length - 1] : this._getLastTabbableElement(this._element);
    }
    /**
     * Focuses the element that should be focused when the focus trap is initialized.
     * @returns Whether focus was moved successfully.
     */
    focusInitialElement() {
        // Contains the deprecated version of selector, for temporary backwards comparability.
        const redirectToElement = this._element.querySelector(`[cdk-focus-initial], ` +
            `[cdkFocusInitial]`);
        if (redirectToElement) {
            // @breaking-change 8.0.0
            if (redirectToElement.hasAttribute(`cdk-focus-initial`)) {
                console.warn(`Found use of deprecated attribute 'cdk-focus-initial', ` +
                    `use 'cdkFocusInitial' instead. The deprecated attribute ` +
                    `will be removed in 8.0.0`, redirectToElement);
            }
            // Warn the consumer if the element they've pointed to
            // isn't focusable, when not in production mode.
            if ((typeof ngDevMode === 'undefined' || ngDevMode) &&
                !this._checker.isFocusable(redirectToElement)) {
                console.warn(`Element matching '[cdkFocusInitial]' is not focusable.`, redirectToElement);
            }
            if (!this._checker.isFocusable(redirectToElement)) {
                const focusableChild = this._getFirstTabbableElement(redirectToElement);
                focusableChild === null || focusableChild === void 0 ? void 0 : focusableChild.focus();
                return !!focusableChild;
            }
            redirectToElement.focus();
            return true;
        }
        return this.focusFirstTabbableElement();
    }
    /**
     * Focuses the first tabbable element within the focus trap region.
     * @returns Whether focus was moved successfully.
     */
    focusFirstTabbableElement() {
        const redirectToElement = this._getRegionBoundary('start');
        if (redirectToElement) {
            redirectToElement.focus();
        }
        return !!redirectToElement;
    }
    /**
     * Focuses the last tabbable element within the focus trap region.
     * @returns Whether focus was moved successfully.
     */
    focusLastTabbableElement() {
        const redirectToElement = this._getRegionBoundary('end');
        if (redirectToElement) {
            redirectToElement.focus();
        }
        return !!redirectToElement;
    }
    /**
     * Checks whether the focus trap has successfully been attached.
     */
    hasAttached() {
        return this._hasAttached;
    }
    /** Get the first tabbable element from a DOM subtree (inclusive). */
    _getFirstTabbableElement(root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in DOM order. Note that IE doesn't have `children` for SVG so we fall
        // back to `childNodes` which includes text nodes, comments etc.
        let children = root.children || root.childNodes;
        for (let i = 0; i < children.length; i++) {
            let tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ?
                this._getFirstTabbableElement(children[i]) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    }
    /** Get the last tabbable element from a DOM subtree (inclusive). */
    _getLastTabbableElement(root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in reverse DOM order.
        let children = root.children || root.childNodes;
        for (let i = children.length - 1; i >= 0; i--) {
            let tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ?
                this._getLastTabbableElement(children[i]) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    }
    /** Creates an anchor element. */
    _createAnchor() {
        const anchor = this._document.createElement('div');
        this._toggleAnchorTabIndex(this._enabled, anchor);
        anchor.classList.add('cdk-visually-hidden');
        anchor.classList.add('cdk-focus-trap-anchor');
        anchor.setAttribute('aria-hidden', 'true');
        return anchor;
    }
    /**
     * Toggles the `tabindex` of an anchor, based on the enabled state of the focus trap.
     * @param isEnabled Whether the focus trap is enabled.
     * @param anchor Anchor on which to toggle the tabindex.
     */
    _toggleAnchorTabIndex(isEnabled, anchor) {
        // Remove the tabindex completely, rather than setting it to -1, because if the
        // element has a tabindex, the user might still hit it when navigating with the arrow keys.
        isEnabled ? anchor.setAttribute('tabindex', '0') : anchor.removeAttribute('tabindex');
    }
    /**
     * Toggles the`tabindex` of both anchors to either trap Tab focus or allow it to escape.
     * @param enabled: Whether the anchors should trap Tab.
     */
    toggleAnchors(enabled) {
        if (this._startAnchor && this._endAnchor) {
            this._toggleAnchorTabIndex(enabled, this._startAnchor);
            this._toggleAnchorTabIndex(enabled, this._endAnchor);
        }
    }
    /** Executes a function when the zone is stable. */
    _executeOnStable(fn) {
        if (this._ngZone.isStable) {
            fn();
        }
        else {
            this._ngZone.onStable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(fn);
        }
    }
}
/**
 * Factory that allows easy instantiation of focus traps.
 * @deprecated Use `ConfigurableFocusTrapFactory` instead.
 * @breaking-change 11.0.0
 */
class FocusTrapFactory {
    constructor(_checker, _ngZone, _document) {
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._document = _document;
    }
    /**
     * Creates a focus-trapped region around the given element.
     * @param element The element around which focus will be trapped.
     * @param deferCaptureElements Defers the creation of focus-capturing elements to be done
     *     manually by the user.
     * @returns The created focus trap instance.
     */
    create(element, deferCaptureElements = false) {
        return new FocusTrap(element, this._checker, this._ngZone, this._document, deferCaptureElements);
    }
}
FocusTrapFactory.ɵfac = function FocusTrapFactory_Factory(t) { return new (t || FocusTrapFactory)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](InteractivityChecker), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"])); };
FocusTrapFactory.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function FocusTrapFactory_Factory() { return new FocusTrapFactory(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(InteractivityChecker), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"])); }, token: FocusTrapFactory, providedIn: "root" });
FocusTrapFactory.ctorParameters = () => [
    { type: InteractivityChecker },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"],] }] }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FocusTrapFactory, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: InteractivityChecker }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]]
            }] }]; }, null); })();
/** Directive for trapping focus within a region. */
class CdkTrapFocus {
    constructor(_elementRef, _focusTrapFactory, _document) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        /** Previously focused element to restore focus to upon destroy when using autoCapture. */
        this._previouslyFocusedElement = null;
        this._document = _document;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    /** Whether the focus trap is active. */
    get enabled() { return this.focusTrap.enabled; }
    set enabled(value) { this.focusTrap.enabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value); }
    /**
     * Whether the directive should automatically move focus into the trapped region upon
     * initialization and return focus to the previous activeElement upon destruction.
     */
    get autoCapture() { return this._autoCapture; }
    set autoCapture(value) { this._autoCapture = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value); }
    ngOnDestroy() {
        this.focusTrap.destroy();
        // If we stored a previously focused element when using autoCapture, return focus to that
        // element now that the trapped region is being destroyed.
        if (this._previouslyFocusedElement) {
            this._previouslyFocusedElement.focus();
            this._previouslyFocusedElement = null;
        }
    }
    ngAfterContentInit() {
        this.focusTrap.attachAnchors();
        if (this.autoCapture) {
            this._captureFocus();
        }
    }
    ngDoCheck() {
        if (!this.focusTrap.hasAttached()) {
            this.focusTrap.attachAnchors();
        }
    }
    ngOnChanges(changes) {
        const autoCaptureChange = changes['autoCapture'];
        if (autoCaptureChange && !autoCaptureChange.firstChange && this.autoCapture &&
            this.focusTrap.hasAttached()) {
            this._captureFocus();
        }
    }
    _captureFocus() {
        this._previouslyFocusedElement = this._document.activeElement;
        this.focusTrap.focusInitialElementWhenReady();
    }
}
CdkTrapFocus.ɵfac = function CdkTrapFocus_Factory(t) { return new (t || CdkTrapFocus)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](FocusTrapFactory), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"])); };
CdkTrapFocus.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: CdkTrapFocus, selectors: [["", "cdkTrapFocus", ""]], inputs: { enabled: ["cdkTrapFocus", "enabled"], autoCapture: ["cdkTrapFocusAutoCapture", "autoCapture"] }, exportAs: ["cdkTrapFocus"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]] });
CdkTrapFocus.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
    { type: FocusTrapFactory },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"],] }] }
];
CdkTrapFocus.propDecorators = {
    enabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['cdkTrapFocus',] }],
    autoCapture: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['cdkTrapFocusAutoCapture',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CdkTrapFocus, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
                selector: '[cdkTrapFocus]',
                exportAs: 'cdkTrapFocus'
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }, { type: FocusTrapFactory }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]]
            }] }]; }, { enabled: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"],
            args: ['cdkTrapFocus']
        }], autoCapture: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"],
            args: ['cdkTrapFocusAutoCapture']
        }] }); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Class that allows for trapping focus within a DOM element.
 *
 * This class uses a strategy pattern that determines how it traps focus.
 * See FocusTrapInertStrategy.
 */
class ConfigurableFocusTrap extends FocusTrap {
    constructor(_element, _checker, _ngZone, _document, _focusTrapManager, _inertStrategy, config) {
        super(_element, _checker, _ngZone, _document, config.defer);
        this._focusTrapManager = _focusTrapManager;
        this._inertStrategy = _inertStrategy;
        this._focusTrapManager.register(this);
    }
    /** Whether the FocusTrap is enabled. */
    get enabled() { return this._enabled; }
    set enabled(value) {
        this._enabled = value;
        if (this._enabled) {
            this._focusTrapManager.register(this);
        }
        else {
            this._focusTrapManager.deregister(this);
        }
    }
    /** Notifies the FocusTrapManager that this FocusTrap will be destroyed. */
    destroy() {
        this._focusTrapManager.deregister(this);
        super.destroy();
    }
    /** @docs-private Implemented as part of ManagedFocusTrap. */
    _enable() {
        this._inertStrategy.preventFocus(this);
        this.toggleAnchors(true);
    }
    /** @docs-private Implemented as part of ManagedFocusTrap. */
    _disable() {
        this._inertStrategy.allowFocus(this);
        this.toggleAnchors(false);
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** IE 11 compatible closest implementation that is able to start from non-Element Nodes. */
function closest(element, selector) {
    if (!(element instanceof Node)) {
        return null;
    }
    let curr = element;
    while (curr != null && !(curr instanceof Element)) {
        curr = curr.parentNode;
    }
    return curr && (hasNativeClosest ?
        curr.closest(selector) : polyfillClosest(curr, selector));
}
/** Polyfill for browsers without Element.closest. */
function polyfillClosest(element, selector) {
    let curr = element;
    while (curr != null && !(curr instanceof Element && matches(curr, selector))) {
        curr = curr.parentNode;
    }
    return (curr || null);
}
const hasNativeClosest = typeof Element != 'undefined' && !!Element.prototype.closest;
/** IE 11 compatible matches implementation. */
function matches(element, selector) {
    return element.matches ?
        element.matches(selector) :
        element['msMatchesSelector'](selector);
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Lightweight FocusTrapInertStrategy that adds a document focus event
 * listener to redirect focus back inside the FocusTrap.
 */
class EventListenerFocusTrapInertStrategy {
    constructor() {
        /** Focus event handler. */
        this._listener = null;
    }
    /** Adds a document event listener that keeps focus inside the FocusTrap. */
    preventFocus(focusTrap) {
        // Ensure there's only one listener per document
        if (this._listener) {
            focusTrap._document.removeEventListener('focus', this._listener, true);
        }
        this._listener = (e) => this._trapFocus(focusTrap, e);
        focusTrap._ngZone.runOutsideAngular(() => {
            focusTrap._document.addEventListener('focus', this._listener, true);
        });
    }
    /** Removes the event listener added in preventFocus. */
    allowFocus(focusTrap) {
        if (!this._listener) {
            return;
        }
        focusTrap._document.removeEventListener('focus', this._listener, true);
        this._listener = null;
    }
    /**
     * Refocuses the first element in the FocusTrap if the focus event target was outside
     * the FocusTrap.
     *
     * This is an event listener callback. The event listener is added in runOutsideAngular,
     * so all this code runs outside Angular as well.
     */
    _trapFocus(focusTrap, event) {
        const target = event.target;
        const focusTrapRoot = focusTrap._element;
        // Don't refocus if target was in an overlay, because the overlay might be associated
        // with an element inside the FocusTrap, ex. mat-select.
        if (!focusTrapRoot.contains(target) && closest(target, 'div.cdk-overlay-pane') === null) {
            // Some legacy FocusTrap usages have logic that focuses some element on the page
            // just before FocusTrap is destroyed. For backwards compatibility, wait
            // to be sure FocusTrap is still enabled before refocusing.
            setTimeout(() => {
                // Check whether focus wasn't put back into the focus trap while the timeout was pending.
                if (focusTrap.enabled && !focusTrapRoot.contains(focusTrap._document.activeElement)) {
                    focusTrap.focusFirstTabbableElement();
                }
            });
        }
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Configuration for creating a ConfigurableFocusTrap.
 */
class ConfigurableFocusTrapConfig {
    constructor() {
        /**
         * Whether to defer the creation of FocusTrap elements to be
         * done manually by the user. Default is to create them
         * automatically.
         */
        this.defer = false;
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** The injection token used to specify the inert strategy. */
const FOCUS_TRAP_INERT_STRATEGY = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('FOCUS_TRAP_INERT_STRATEGY');

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Injectable that ensures only the most recently enabled FocusTrap is active. */
class FocusTrapManager {
    constructor() {
        // A stack of the FocusTraps on the page. Only the FocusTrap at the
        // top of the stack is active.
        this._focusTrapStack = [];
    }
    /**
     * Disables the FocusTrap at the top of the stack, and then pushes
     * the new FocusTrap onto the stack.
     */
    register(focusTrap) {
        // Dedupe focusTraps that register multiple times.
        this._focusTrapStack = this._focusTrapStack.filter((ft) => ft !== focusTrap);
        let stack = this._focusTrapStack;
        if (stack.length) {
            stack[stack.length - 1]._disable();
        }
        stack.push(focusTrap);
        focusTrap._enable();
    }
    /**
     * Removes the FocusTrap from the stack, and activates the
     * FocusTrap that is the new top of the stack.
     */
    deregister(focusTrap) {
        focusTrap._disable();
        const stack = this._focusTrapStack;
        const i = stack.indexOf(focusTrap);
        if (i !== -1) {
            stack.splice(i, 1);
            if (stack.length) {
                stack[stack.length - 1]._enable();
            }
        }
    }
}
FocusTrapManager.ɵfac = function FocusTrapManager_Factory(t) { return new (t || FocusTrapManager)(); };
FocusTrapManager.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function FocusTrapManager_Factory() { return new FocusTrapManager(); }, token: FocusTrapManager, providedIn: "root" });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FocusTrapManager, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return []; }, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Factory that allows easy instantiation of configurable focus traps. */
class ConfigurableFocusTrapFactory {
    constructor(_checker, _ngZone, _focusTrapManager, _document, _inertStrategy) {
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._focusTrapManager = _focusTrapManager;
        this._document = _document;
        // TODO split up the strategies into different modules, similar to DateAdapter.
        this._inertStrategy = _inertStrategy || new EventListenerFocusTrapInertStrategy();
    }
    create(element, config = new ConfigurableFocusTrapConfig()) {
        let configObject;
        if (typeof config === 'boolean') {
            configObject = new ConfigurableFocusTrapConfig();
            configObject.defer = config;
        }
        else {
            configObject = config;
        }
        return new ConfigurableFocusTrap(element, this._checker, this._ngZone, this._document, this._focusTrapManager, this._inertStrategy, configObject);
    }
}
ConfigurableFocusTrapFactory.ɵfac = function ConfigurableFocusTrapFactory_Factory(t) { return new (t || ConfigurableFocusTrapFactory)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](InteractivityChecker), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](FocusTrapManager), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](FOCUS_TRAP_INERT_STRATEGY, 8)); };
ConfigurableFocusTrapFactory.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function ConfigurableFocusTrapFactory_Factory() { return new ConfigurableFocusTrapFactory(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(InteractivityChecker), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(FocusTrapManager), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(FOCUS_TRAP_INERT_STRATEGY, 8)); }, token: ConfigurableFocusTrapFactory, providedIn: "root" });
ConfigurableFocusTrapFactory.ctorParameters = () => [
    { type: InteractivityChecker },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
    { type: FocusTrapManager },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"],] }] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [FOCUS_TRAP_INERT_STRATEGY,] }] }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ConfigurableFocusTrapFactory, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: InteractivityChecker }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }, { type: FocusTrapManager }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [FOCUS_TRAP_INERT_STRATEGY]
            }] }]; }, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const LIVE_ANNOUNCER_ELEMENT_TOKEN = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('liveAnnouncerElement', {
    providedIn: 'root',
    factory: LIVE_ANNOUNCER_ELEMENT_TOKEN_FACTORY,
});
/** @docs-private */
function LIVE_ANNOUNCER_ELEMENT_TOKEN_FACTORY() {
    return null;
}
/** Injection token that can be used to configure the default options for the LiveAnnouncer. */
const LIVE_ANNOUNCER_DEFAULT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('LIVE_ANNOUNCER_DEFAULT_OPTIONS');

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class LiveAnnouncer {
    constructor(elementToken, _ngZone, _document, _defaultOptions) {
        this._ngZone = _ngZone;
        this._defaultOptions = _defaultOptions;
        // We inject the live element and document as `any` because the constructor signature cannot
        // reference browser globals (HTMLElement, Document) on non-browser environments, since having
        // a class decorator causes TypeScript to preserve the constructor signature types.
        this._document = _document;
        this._liveElement = elementToken || this._createLiveElement();
    }
    announce(message, ...args) {
        const defaultOptions = this._defaultOptions;
        let politeness;
        let duration;
        if (args.length === 1 && typeof args[0] === 'number') {
            duration = args[0];
        }
        else {
            [politeness, duration] = args;
        }
        this.clear();
        clearTimeout(this._previousTimeout);
        if (!politeness) {
            politeness =
                (defaultOptions && defaultOptions.politeness) ? defaultOptions.politeness : 'polite';
        }
        if (duration == null && defaultOptions) {
            duration = defaultOptions.duration;
        }
        // TODO: ensure changing the politeness works on all environments we support.
        this._liveElement.setAttribute('aria-live', politeness);
        // This 100ms timeout is necessary for some browser + screen-reader combinations:
        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
        //   second time without clearing and then using a non-zero delay.
        // (using JAWS 17 at time of this writing).
        return this._ngZone.runOutsideAngular(() => {
            return new Promise(resolve => {
                clearTimeout(this._previousTimeout);
                this._previousTimeout = setTimeout(() => {
                    this._liveElement.textContent = message;
                    resolve();
                    if (typeof duration === 'number') {
                        this._previousTimeout = setTimeout(() => this.clear(), duration);
                    }
                }, 100);
            });
        });
    }
    /**
     * Clears the current text from the announcer element. Can be used to prevent
     * screen readers from reading the text out again while the user is going
     * through the page landmarks.
     */
    clear() {
        if (this._liveElement) {
            this._liveElement.textContent = '';
        }
    }
    ngOnDestroy() {
        clearTimeout(this._previousTimeout);
        if (this._liveElement && this._liveElement.parentNode) {
            this._liveElement.parentNode.removeChild(this._liveElement);
            this._liveElement = null;
        }
    }
    _createLiveElement() {
        const elementClass = 'cdk-live-announcer-element';
        const previousElements = this._document.getElementsByClassName(elementClass);
        const liveEl = this._document.createElement('div');
        // Remove any old containers. This can happen when coming in from a server-side-rendered page.
        for (let i = 0; i < previousElements.length; i++) {
            previousElements[i].parentNode.removeChild(previousElements[i]);
        }
        liveEl.classList.add(elementClass);
        liveEl.classList.add('cdk-visually-hidden');
        liveEl.setAttribute('aria-atomic', 'true');
        liveEl.setAttribute('aria-live', 'polite');
        this._document.body.appendChild(liveEl);
        return liveEl;
    }
}
LiveAnnouncer.ɵfac = function LiveAnnouncer_Factory(t) { return new (t || LiveAnnouncer)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](LIVE_ANNOUNCER_ELEMENT_TOKEN, 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](LIVE_ANNOUNCER_DEFAULT_OPTIONS, 8)); };
LiveAnnouncer.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function LiveAnnouncer_Factory() { return new LiveAnnouncer(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(LIVE_ANNOUNCER_ELEMENT_TOKEN, 8), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(LIVE_ANNOUNCER_DEFAULT_OPTIONS, 8)); }, token: LiveAnnouncer, providedIn: "root" });
LiveAnnouncer.ctorParameters = () => [
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [LIVE_ANNOUNCER_ELEMENT_TOKEN,] }] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"],] }] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [LIVE_ANNOUNCER_DEFAULT_OPTIONS,] }] }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](LiveAnnouncer, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [LIVE_ANNOUNCER_ELEMENT_TOKEN]
            }] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [LIVE_ANNOUNCER_DEFAULT_OPTIONS]
            }] }]; }, null); })();
/**
 * A directive that works similarly to aria-live, but uses the LiveAnnouncer to ensure compatibility
 * with a wider range of browsers and screen readers.
 */
class CdkAriaLive {
    constructor(_elementRef, _liveAnnouncer, _contentObserver, _ngZone) {
        this._elementRef = _elementRef;
        this._liveAnnouncer = _liveAnnouncer;
        this._contentObserver = _contentObserver;
        this._ngZone = _ngZone;
        this._politeness = 'polite';
    }
    /** The aria-live politeness level to use when announcing messages. */
    get politeness() { return this._politeness; }
    set politeness(value) {
        this._politeness = value === 'off' || value === 'assertive' ? value : 'polite';
        if (this._politeness === 'off') {
            if (this._subscription) {
                this._subscription.unsubscribe();
                this._subscription = null;
            }
        }
        else if (!this._subscription) {
            this._subscription = this._ngZone.runOutsideAngular(() => {
                return this._contentObserver
                    .observe(this._elementRef)
                    .subscribe(() => {
                    // Note that we use textContent here, rather than innerText, in order to avoid a reflow.
                    const elementText = this._elementRef.nativeElement.textContent;
                    // The `MutationObserver` fires also for attribute
                    // changes which we don't want to announce.
                    if (elementText !== this._previousAnnouncedText) {
                        this._liveAnnouncer.announce(elementText, this._politeness);
                        this._previousAnnouncedText = elementText;
                    }
                });
            });
        }
    }
    ngOnDestroy() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }
}
CdkAriaLive.ɵfac = function CdkAriaLive_Factory(t) { return new (t || CdkAriaLive)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](LiveAnnouncer), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_observers__WEBPACK_IMPORTED_MODULE_7__["ContentObserver"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"])); };
CdkAriaLive.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: CdkAriaLive, selectors: [["", "cdkAriaLive", ""]], inputs: { politeness: ["cdkAriaLive", "politeness"] }, exportAs: ["cdkAriaLive"] });
CdkAriaLive.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
    { type: LiveAnnouncer },
    { type: _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_7__["ContentObserver"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }
];
CdkAriaLive.propDecorators = {
    politeness: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['cdkAriaLive',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CdkAriaLive, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
                selector: '[cdkAriaLive]',
                exportAs: 'cdkAriaLive'
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }, { type: LiveAnnouncer }, { type: _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_7__["ContentObserver"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }]; }, { politeness: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"],
            args: ['cdkAriaLive']
        }] }); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Gets whether an event could be a faked `mousedown` event dispatched by a screen reader. */
function isFakeMousedownFromScreenReader(event) {
    // We can typically distinguish between these faked mousedown events and real mousedown events
    // using the "buttons" property. While real mousedowns will indicate the mouse button that was
    // pressed (e.g. "1" for the left mouse button), faked mousedowns will usually set the property
    // value to 0.
    return event.buttons === 0;
}
/** Gets whether an event could be a faked `touchstart` event dispatched by a screen reader. */
function isFakeTouchstartFromScreenReader(event) {
    const touch = (event.touches && event.touches[0]) ||
        (event.changedTouches && event.changedTouches[0]);
    // A fake `touchstart` can be distinguished from a real one by looking at the `identifier`
    // which is typically >= 0 on a real device versus -1 from a screen reader. Just to be safe,
    // we can also look at `radiusX` and `radiusY`. This behavior was observed against a Windows 10
    // device with a touch screen running NVDA v2020.4 and Firefox 85 or Chrome 88.
    return !!touch && touch.identifier === -1 && (touch.radiusX == null || touch.radiusX === 1) &&
        (touch.radiusY == null || touch.radiusY === 1);
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// This is the value used by AngularJS Material. Through trial and error (on iPhone 6S) they found
// that a value of around 650ms seems appropriate.
const TOUCH_BUFFER_MS = 650;
/** InjectionToken for FocusMonitorOptions. */
const FOCUS_MONITOR_DEFAULT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('cdk-focus-monitor-default-options');
/**
 * Event listener options that enable capturing and also
 * mark the listener as passive if the browser supports it.
 */
const captureEventListenerOptions = Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["normalizePassiveListenerOptions"])({
    passive: true,
    capture: true
});
/** Monitors mouse and keyboard events to determine the cause of focus events. */
class FocusMonitor {
    constructor(_ngZone, _platform, 
    /** @breaking-change 11.0.0 make document required */
    document, options) {
        this._ngZone = _ngZone;
        this._platform = _platform;
        /** The focus origin that the next focus event is a result of. */
        this._origin = null;
        /** Whether the window has just been focused. */
        this._windowFocused = false;
        /** Map of elements being monitored to their info. */
        this._elementInfo = new Map();
        /** The number of elements currently being monitored. */
        this._monitoredElementCount = 0;
        /**
         * Keeps track of the root nodes to which we've currently bound a focus/blur handler,
         * as well as the number of monitored elements that they contain. We have to treat focus/blur
         * handlers differently from the rest of the events, because the browser won't emit events
         * to the document when focus moves inside of a shadow root.
         */
        this._rootNodeFocusListenerCount = new Map();
        /**
         * Event listener for `keydown` events on the document.
         * Needs to be an arrow function in order to preserve the context when it gets bound.
         */
        this._documentKeydownListener = () => {
            // On keydown record the origin and clear any touch event that may be in progress.
            this._lastTouchTarget = null;
            this._setOriginForCurrentEventQueue('keyboard');
        };
        /**
         * Event listener for `mousedown` events on the document.
         * Needs to be an arrow function in order to preserve the context when it gets bound.
         */
        this._documentMousedownListener = (event) => {
            // On mousedown record the origin only if there is not touch
            // target, since a mousedown can happen as a result of a touch event.
            if (!this._lastTouchTarget) {
                // In some cases screen readers fire fake `mousedown` events instead of `keydown`.
                // Resolve the focus source to `keyboard` if we detect one of them.
                const source = isFakeMousedownFromScreenReader(event) ? 'keyboard' : 'mouse';
                this._setOriginForCurrentEventQueue(source);
            }
        };
        /**
         * Event listener for `touchstart` events on the document.
         * Needs to be an arrow function in order to preserve the context when it gets bound.
         */
        this._documentTouchstartListener = (event) => {
            // Some screen readers will fire a fake `touchstart` event if an element is activated using
            // the keyboard while on a device with a touchsreen. Consider such events as keyboard focus.
            if (!isFakeTouchstartFromScreenReader(event)) {
                // When the touchstart event fires the focus event is not yet in the event queue. This means
                // we can't rely on the trick used above (setting timeout of 1ms). Instead we wait 650ms to
                // see if a focus happens.
                if (this._touchTimeoutId != null) {
                    clearTimeout(this._touchTimeoutId);
                }
                this._lastTouchTarget = getTarget(event);
                this._touchTimeoutId = setTimeout(() => this._lastTouchTarget = null, TOUCH_BUFFER_MS);
            }
            else if (!this._lastTouchTarget) {
                this._setOriginForCurrentEventQueue('keyboard');
            }
        };
        /**
         * Event listener for `focus` events on the window.
         * Needs to be an arrow function in order to preserve the context when it gets bound.
         */
        this._windowFocusListener = () => {
            // Make a note of when the window regains focus, so we can
            // restore the origin info for the focused element.
            this._windowFocused = true;
            this._windowFocusTimeoutId = setTimeout(() => this._windowFocused = false);
        };
        /**
         * Event listener for `focus` and 'blur' events on the document.
         * Needs to be an arrow function in order to preserve the context when it gets bound.
         */
        this._rootNodeFocusAndBlurListener = (event) => {
            const target = getTarget(event);
            const handler = event.type === 'focus' ? this._onFocus : this._onBlur;
            // We need to walk up the ancestor chain in order to support `checkChildren`.
            for (let element = target; element; element = element.parentElement) {
                handler.call(this, event, element);
            }
        };
        this._document = document;
        this._detectionMode = (options === null || options === void 0 ? void 0 : options.detectionMode) || 0 /* IMMEDIATE */;
    }
    monitor(element, checkChildren = false) {
        const nativeElement = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceElement"])(element);
        // Do nothing if we're not on the browser platform or the passed in node isn't an element.
        if (!this._platform.isBrowser || nativeElement.nodeType !== 1) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null);
        }
        // If the element is inside the shadow DOM, we need to bind our focus/blur listeners to
        // the shadow root, rather than the `document`, because the browser won't emit focus events
        // to the `document`, if focus is moving within the same shadow root.
        const rootNode = Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["_getShadowRoot"])(nativeElement) || this._getDocument();
        const cachedInfo = this._elementInfo.get(nativeElement);
        // Check if we're already monitoring this element.
        if (cachedInfo) {
            if (checkChildren) {
                // TODO(COMP-318): this can be problematic, because it'll turn all non-checkChildren
                // observers into ones that behave as if `checkChildren` was turned on. We need a more
                // robust solution.
                cachedInfo.checkChildren = true;
            }
            return cachedInfo.subject;
        }
        // Create monitored element info.
        const info = {
            checkChildren: checkChildren,
            subject: new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"](),
            rootNode
        };
        this._elementInfo.set(nativeElement, info);
        this._registerGlobalListeners(info);
        return info.subject;
    }
    stopMonitoring(element) {
        const nativeElement = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceElement"])(element);
        const elementInfo = this._elementInfo.get(nativeElement);
        if (elementInfo) {
            elementInfo.subject.complete();
            this._setClasses(nativeElement);
            this._elementInfo.delete(nativeElement);
            this._removeGlobalListeners(elementInfo);
        }
    }
    focusVia(element, origin, options) {
        const nativeElement = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceElement"])(element);
        const focusedElement = this._getDocument().activeElement;
        // If the element is focused already, calling `focus` again won't trigger the event listener
        // which means that the focus classes won't be updated. If that's the case, update the classes
        // directly without waiting for an event.
        if (nativeElement === focusedElement) {
            this._getClosestElementsInfo(nativeElement)
                .forEach(([currentElement, info]) => this._originChanged(currentElement, origin, info));
        }
        else {
            this._setOriginForCurrentEventQueue(origin);
            // `focus` isn't available on the server
            if (typeof nativeElement.focus === 'function') {
                nativeElement.focus(options);
            }
        }
    }
    ngOnDestroy() {
        this._elementInfo.forEach((_info, element) => this.stopMonitoring(element));
    }
    /** Access injected document if available or fallback to global document reference */
    _getDocument() {
        return this._document || document;
    }
    /** Use defaultView of injected document if available or fallback to global window reference */
    _getWindow() {
        const doc = this._getDocument();
        return doc.defaultView || window;
    }
    _toggleClass(element, className, shouldSet) {
        if (shouldSet) {
            element.classList.add(className);
        }
        else {
            element.classList.remove(className);
        }
    }
    _getFocusOrigin(event) {
        // If we couldn't detect a cause for the focus event, it's due to one of three reasons:
        // 1) The window has just regained focus, in which case we want to restore the focused state of
        //    the element from before the window blurred.
        // 2) It was caused by a touch event, in which case we mark the origin as 'touch'.
        // 3) The element was programmatically focused, in which case we should mark the origin as
        //    'program'.
        if (this._origin) {
            return this._origin;
        }
        if (this._windowFocused && this._lastFocusOrigin) {
            return this._lastFocusOrigin;
        }
        else if (this._wasCausedByTouch(event)) {
            return 'touch';
        }
        else {
            return 'program';
        }
    }
    /**
     * Sets the focus classes on the element based on the given focus origin.
     * @param element The element to update the classes on.
     * @param origin The focus origin.
     */
    _setClasses(element, origin) {
        this._toggleClass(element, 'cdk-focused', !!origin);
        this._toggleClass(element, 'cdk-touch-focused', origin === 'touch');
        this._toggleClass(element, 'cdk-keyboard-focused', origin === 'keyboard');
        this._toggleClass(element, 'cdk-mouse-focused', origin === 'mouse');
        this._toggleClass(element, 'cdk-program-focused', origin === 'program');
    }
    /**
     * Sets the origin and schedules an async function to clear it at the end of the event queue.
     * If the detection mode is 'eventual', the origin is never cleared.
     * @param origin The origin to set.
     */
    _setOriginForCurrentEventQueue(origin) {
        this._ngZone.runOutsideAngular(() => {
            this._origin = origin;
            if (this._detectionMode === 0 /* IMMEDIATE */) {
                // Sometimes the focus origin won't be valid in Firefox because Firefox seems to focus *one*
                // tick after the interaction event fired. To ensure the focus origin is always correct,
                // the focus origin will be determined at the beginning of the next tick.
                this._originTimeoutId = setTimeout(() => this._origin = null, 1);
            }
        });
    }
    /**
     * Checks whether the given focus event was caused by a touchstart event.
     * @param event The focus event to check.
     * @returns Whether the event was caused by a touch.
     */
    _wasCausedByTouch(event) {
        // Note(mmalerba): This implementation is not quite perfect, there is a small edge case.
        // Consider the following dom structure:
        //
        // <div #parent tabindex="0" cdkFocusClasses>
        //   <div #child (click)="#parent.focus()"></div>
        // </div>
        //
        // If the user touches the #child element and the #parent is programmatically focused as a
        // result, this code will still consider it to have been caused by the touch event and will
        // apply the cdk-touch-focused class rather than the cdk-program-focused class. This is a
        // relatively small edge-case that can be worked around by using
        // focusVia(parentEl, 'program') to focus the parent element.
        //
        // If we decide that we absolutely must handle this case correctly, we can do so by listening
        // for the first focus event after the touchstart, and then the first blur event after that
        // focus event. When that blur event fires we know that whatever follows is not a result of the
        // touchstart.
        const focusTarget = getTarget(event);
        return this._lastTouchTarget instanceof Node && focusTarget instanceof Node &&
            (focusTarget === this._lastTouchTarget || focusTarget.contains(this._lastTouchTarget));
    }
    /**
     * Handles focus events on a registered element.
     * @param event The focus event.
     * @param element The monitored element.
     */
    _onFocus(event, element) {
        // NOTE(mmalerba): We currently set the classes based on the focus origin of the most recent
        // focus event affecting the monitored element. If we want to use the origin of the first event
        // instead we should check for the cdk-focused class here and return if the element already has
        // it. (This only matters for elements that have includesChildren = true).
        // If we are not counting child-element-focus as focused, make sure that the event target is the
        // monitored element itself.
        const elementInfo = this._elementInfo.get(element);
        if (!elementInfo || (!elementInfo.checkChildren && element !== getTarget(event))) {
            return;
        }
        this._originChanged(element, this._getFocusOrigin(event), elementInfo);
    }
    /**
     * Handles blur events on a registered element.
     * @param event The blur event.
     * @param element The monitored element.
     */
    _onBlur(event, element) {
        // If we are counting child-element-focus as focused, make sure that we aren't just blurring in
        // order to focus another child of the monitored element.
        const elementInfo = this._elementInfo.get(element);
        if (!elementInfo || (elementInfo.checkChildren && event.relatedTarget instanceof Node &&
            element.contains(event.relatedTarget))) {
            return;
        }
        this._setClasses(element);
        this._emitOrigin(elementInfo.subject, null);
    }
    _emitOrigin(subject, origin) {
        this._ngZone.run(() => subject.next(origin));
    }
    _registerGlobalListeners(elementInfo) {
        if (!this._platform.isBrowser) {
            return;
        }
        const rootNode = elementInfo.rootNode;
        const rootNodeFocusListeners = this._rootNodeFocusListenerCount.get(rootNode) || 0;
        if (!rootNodeFocusListeners) {
            this._ngZone.runOutsideAngular(() => {
                rootNode.addEventListener('focus', this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
                rootNode.addEventListener('blur', this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
            });
        }
        this._rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners + 1);
        // Register global listeners when first element is monitored.
        if (++this._monitoredElementCount === 1) {
            // Note: we listen to events in the capture phase so we
            // can detect them even if the user stops propagation.
            this._ngZone.runOutsideAngular(() => {
                const document = this._getDocument();
                const window = this._getWindow();
                document.addEventListener('keydown', this._documentKeydownListener, captureEventListenerOptions);
                document.addEventListener('mousedown', this._documentMousedownListener, captureEventListenerOptions);
                document.addEventListener('touchstart', this._documentTouchstartListener, captureEventListenerOptions);
                window.addEventListener('focus', this._windowFocusListener);
            });
        }
    }
    _removeGlobalListeners(elementInfo) {
        const rootNode = elementInfo.rootNode;
        if (this._rootNodeFocusListenerCount.has(rootNode)) {
            const rootNodeFocusListeners = this._rootNodeFocusListenerCount.get(rootNode);
            if (rootNodeFocusListeners > 1) {
                this._rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners - 1);
            }
            else {
                rootNode.removeEventListener('focus', this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
                rootNode.removeEventListener('blur', this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
                this._rootNodeFocusListenerCount.delete(rootNode);
            }
        }
        // Unregister global listeners when last element is unmonitored.
        if (!--this._monitoredElementCount) {
            const document = this._getDocument();
            const window = this._getWindow();
            document.removeEventListener('keydown', this._documentKeydownListener, captureEventListenerOptions);
            document.removeEventListener('mousedown', this._documentMousedownListener, captureEventListenerOptions);
            document.removeEventListener('touchstart', this._documentTouchstartListener, captureEventListenerOptions);
            window.removeEventListener('focus', this._windowFocusListener);
            // Clear timeouts for all potentially pending timeouts to prevent the leaks.
            clearTimeout(this._windowFocusTimeoutId);
            clearTimeout(this._touchTimeoutId);
            clearTimeout(this._originTimeoutId);
        }
    }
    /** Updates all the state on an element once its focus origin has changed. */
    _originChanged(element, origin, elementInfo) {
        this._setClasses(element, origin);
        this._emitOrigin(elementInfo.subject, origin);
        this._lastFocusOrigin = origin;
    }
    /**
     * Collects the `MonitoredElementInfo` of a particular element and
     * all of its ancestors that have enabled `checkChildren`.
     * @param element Element from which to start the search.
     */
    _getClosestElementsInfo(element) {
        const results = [];
        this._elementInfo.forEach((info, currentElement) => {
            if (currentElement === element || (info.checkChildren && currentElement.contains(element))) {
                results.push([currentElement, info]);
            }
        });
        return results;
    }
}
FocusMonitor.ɵfac = function FocusMonitor_Factory(t) { return new (t || FocusMonitor)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](FOCUS_MONITOR_DEFAULT_OPTIONS, 8)); };
FocusMonitor.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function FocusMonitor_Factory() { return new FocusMonitor(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"], 8), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(FOCUS_MONITOR_DEFAULT_OPTIONS, 8)); }, token: FocusMonitor, providedIn: "root" });
FocusMonitor.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
    { type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"],] }] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [FOCUS_MONITOR_DEFAULT_OPTIONS,] }] }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FocusMonitor, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }, { type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [FOCUS_MONITOR_DEFAULT_OPTIONS]
            }] }]; }, null); })();
/** Gets the target of an event, accounting for Shadow DOM. */
function getTarget(event) {
    // If an event is bound outside the Shadow DOM, the `event.target` will
    // point to the shadow root so we have to use `composedPath` instead.
    return (event.composedPath ? event.composedPath()[0] : event.target);
}
/**
 * Directive that determines how a particular element was focused (via keyboard, mouse, touch, or
 * programmatically) and adds corresponding classes to the element.
 *
 * There are two variants of this directive:
 * 1) cdkMonitorElementFocus: does not consider an element to be focused if one of its children is
 *    focused.
 * 2) cdkMonitorSubtreeFocus: considers an element focused if it or any of its children are focused.
 */
class CdkMonitorFocus {
    constructor(_elementRef, _focusMonitor) {
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        this.cdkFocusChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ngAfterViewInit() {
        const element = this._elementRef.nativeElement;
        this._monitorSubscription = this._focusMonitor.monitor(element, element.nodeType === 1 && element.hasAttribute('cdkMonitorSubtreeFocus'))
            .subscribe(origin => this.cdkFocusChange.emit(origin));
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef);
        if (this._monitorSubscription) {
            this._monitorSubscription.unsubscribe();
        }
    }
}
CdkMonitorFocus.ɵfac = function CdkMonitorFocus_Factory(t) { return new (t || CdkMonitorFocus)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](FocusMonitor)); };
CdkMonitorFocus.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: CdkMonitorFocus, selectors: [["", "cdkMonitorElementFocus", ""], ["", "cdkMonitorSubtreeFocus", ""]], outputs: { cdkFocusChange: "cdkFocusChange" } });
CdkMonitorFocus.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
    { type: FocusMonitor }
];
CdkMonitorFocus.propDecorators = {
    cdkFocusChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CdkMonitorFocus, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
                selector: '[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]'
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }, { type: FocusMonitor }]; }, { cdkFocusChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"]
        }] }); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** CSS class applied to the document body when in black-on-white high-contrast mode. */
const BLACK_ON_WHITE_CSS_CLASS = 'cdk-high-contrast-black-on-white';
/** CSS class applied to the document body when in white-on-black high-contrast mode. */
const WHITE_ON_BLACK_CSS_CLASS = 'cdk-high-contrast-white-on-black';
/** CSS class applied to the document body when in high-contrast mode. */
const HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS = 'cdk-high-contrast-active';
/**
 * Service to determine whether the browser is currently in a high-contrast-mode environment.
 *
 * Microsoft Windows supports an accessibility feature called "High Contrast Mode". This mode
 * changes the appearance of all applications, including web applications, to dramatically increase
 * contrast.
 *
 * IE, Edge, and Firefox currently support this mode. Chrome does not support Windows High Contrast
 * Mode. This service does not detect high-contrast mode as added by the Chrome "High Contrast"
 * browser extension.
 */
class HighContrastModeDetector {
    constructor(_platform, document) {
        this._platform = _platform;
        this._document = document;
    }
    /** Gets the current high-contrast-mode for the page. */
    getHighContrastMode() {
        if (!this._platform.isBrowser) {
            return 0 /* NONE */;
        }
        // Create a test element with an arbitrary background-color that is neither black nor
        // white; high-contrast mode will coerce the color to either black or white. Also ensure that
        // appending the test element to the DOM does not affect layout by absolutely positioning it
        const testElement = this._document.createElement('div');
        testElement.style.backgroundColor = 'rgb(1,2,3)';
        testElement.style.position = 'absolute';
        this._document.body.appendChild(testElement);
        // Get the computed style for the background color, collapsing spaces to normalize between
        // browsers. Once we get this color, we no longer need the test element. Access the `window`
        // via the document so we can fake it in tests. Note that we have extra null checks, because
        // this logic will likely run during app bootstrap and throwing can break the entire app.
        const documentWindow = this._document.defaultView || window;
        const computedStyle = (documentWindow && documentWindow.getComputedStyle) ?
            documentWindow.getComputedStyle(testElement) : null;
        const computedColor = (computedStyle && computedStyle.backgroundColor || '').replace(/ /g, '');
        this._document.body.removeChild(testElement);
        switch (computedColor) {
            case 'rgb(0,0,0)': return 2 /* WHITE_ON_BLACK */;
            case 'rgb(255,255,255)': return 1 /* BLACK_ON_WHITE */;
        }
        return 0 /* NONE */;
    }
    /** Applies CSS classes indicating high-contrast mode to document body (browser-only). */
    _applyBodyHighContrastModeCssClasses() {
        if (this._platform.isBrowser && this._document.body) {
            const bodyClasses = this._document.body.classList;
            // IE11 doesn't support `classList` operations with multiple arguments
            bodyClasses.remove(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS);
            bodyClasses.remove(BLACK_ON_WHITE_CSS_CLASS);
            bodyClasses.remove(WHITE_ON_BLACK_CSS_CLASS);
            const mode = this.getHighContrastMode();
            if (mode === 1 /* BLACK_ON_WHITE */) {
                bodyClasses.add(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS);
                bodyClasses.add(BLACK_ON_WHITE_CSS_CLASS);
            }
            else if (mode === 2 /* WHITE_ON_BLACK */) {
                bodyClasses.add(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS);
                bodyClasses.add(WHITE_ON_BLACK_CSS_CLASS);
            }
        }
    }
}
HighContrastModeDetector.ɵfac = function HighContrastModeDetector_Factory(t) { return new (t || HighContrastModeDetector)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"])); };
HighContrastModeDetector.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function HighContrastModeDetector_Factory() { return new HighContrastModeDetector(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"])); }, token: HighContrastModeDetector, providedIn: "root" });
HighContrastModeDetector.ctorParameters = () => [
    { type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"],] }] }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](HighContrastModeDetector, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]]
            }] }]; }, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class A11yModule {
    constructor(highContrastModeDetector) {
        highContrastModeDetector._applyBodyHighContrastModeCssClasses();
    }
}
A11yModule.ɵfac = function A11yModule_Factory(t) { return new (t || A11yModule)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](HighContrastModeDetector)); };
A11yModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: A11yModule });
A11yModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["PlatformModule"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_7__["ObserversModule"]]] });
A11yModule.ctorParameters = () => [
    { type: HighContrastModeDetector }
];
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](A11yModule, { declarations: function () { return [CdkAriaLive, CdkTrapFocus, CdkMonitorFocus]; }, imports: function () { return [_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["PlatformModule"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_7__["ObserversModule"]]; }, exports: function () { return [CdkAriaLive, CdkTrapFocus, CdkMonitorFocus]; } }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](A11yModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                imports: [_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["PlatformModule"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_7__["ObserversModule"]],
                declarations: [CdkAriaLive, CdkTrapFocus, CdkMonitorFocus],
                exports: [CdkAriaLive, CdkTrapFocus, CdkMonitorFocus]
            }]
    }], function () { return [{ type: HighContrastModeDetector }]; }, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */



//# sourceMappingURL=a11y.js.map

/***/ })

}]);
//# sourceMappingURL=dashboard-dashboard-module.js.map