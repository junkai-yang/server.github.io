(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "/Lhg":
/*!***************************************************!*\
  !*** ./src/app/layout/header/header.component.ts ***!
  \***************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-zorro-antd/layout */ "yW9e");
/* harmony import */ var ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd/menu */ "Q8cG");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd/icon */ "FwiY");





class HeaderComponent {
    constructor() {
        this.msg = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"];
        this.isCollapsed = false;
    }
    ngOnInit() {
    }
    clickCollapsed() {
        this.isCollapsed = !this.isCollapsed;
        this.msg.emit({ 'collapsed': this.isCollapsed });
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(); };
HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], outputs: { msg: "msg" }, decls: 2, vars: 1, consts: [["nz-menu", "", "nzTheme", "dark", "nzMode", "horizontal", 1, "header-menu"], ["nz-icon", "", 1, "trigger", 3, "nzType", "click"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nz-header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "i", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HeaderComponent_Template_i_click_1_listener() { return ctx.clickCollapsed(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzType", ctx.isCollapsed ? "menu-unfold" : "menu-fold");
    } }, directives: [ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_1__["NzHeaderComponent"], ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_2__["NzMenuDirective"], ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_3__["NzIconDirective"]], styles: [".trigger[_ngcontent-%COMP%] {\n  font-size: 18px;\n  line-height: 64px;\n  padding: 0 24px;\n  cursor: pointer;\n  transition: color 0.3s;\n}\n\n.trigger[_ngcontent-%COMP%]:hover {\n  color: #1890ff;\n}\n\n.logo[_ngcontent-%COMP%] {\n  height: 32px;\n  background: rgba(255, 255, 255, 0.2);\n  margin: 16px;\n}\n\nnz-header[_ngcontent-%COMP%] {\n  background: #fff;\n  padding: 0;\n}\n\n.inner-content[_ngcontent-%COMP%] {\n  padding: 24px;\n  background: #fff;\n  min-height: 360px;\n}\n\n.logo[_ngcontent-%COMP%] {\n  width: 120px;\n  height: 31px;\n  background: rgba(255, 255, 255, 0.2);\n  margin: 16px 30px 16px 0;\n  float: left;\n  line-height: 32px;\n  color: white;\n  text-align: center;\n}\n\n.header-menu[_ngcontent-%COMP%] {\n  line-height: 64px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxoZWFkZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLHNCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0VBQ0Esb0NBQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxnQkFBQTtFQUNBLFVBQUE7QUFFRjs7QUFBQTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FBR0Y7O0FBREE7RUFDRSxZQUFBO0VBQ0EsWUFBQTtFQUNBLG9DQUFBO0VBQ0Esd0JBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUFJRjs7QUFEQTtFQUNFLGlCQUFBO0FBSUYiLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRyaWdnZXIge1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBsaW5lLWhlaWdodDogNjRweDtcclxuICBwYWRkaW5nOiAwIDI0cHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuM3M7XHJcbn1cclxuXHJcbi50cmlnZ2VyOmhvdmVyIHtcclxuICBjb2xvcjogIzE4OTBmZjtcclxufVxyXG5cclxuLmxvZ28ge1xyXG4gIGhlaWdodDogMzJweDtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XHJcbiAgbWFyZ2luOiAxNnB4O1xyXG59XHJcbm56LWhlYWRlciB7XHJcbiAgYmFja2dyb3VuZDogI2ZmZjtcclxuICBwYWRkaW5nOiAwO1xyXG59XHJcbi5pbm5lci1jb250ZW50IHtcclxuICBwYWRkaW5nOiAyNHB4O1xyXG4gIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgbWluLWhlaWdodDogMzYwcHg7XHJcbn1cclxuLmxvZ28ge1xyXG4gIHdpZHRoOiAxMjBweDtcclxuICBoZWlnaHQ6IDMxcHg7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xyXG4gIG1hcmdpbjogMTZweCAzMHB4IDE2cHggMDtcclxuICBmbG9hdDogbGVmdDtcclxuICBsaW5lLWhlaWdodDogMzJweDtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uaGVhZGVyLW1lbnUge1xyXG4gIGxpbmUtaGVpZ2h0OiA2NHB4O1xyXG59XHJcbi8vXHJcbi8vXHJcbi8vLmlubmVyLWxheW91dCB7XHJcbi8vICBwYWRkaW5nOiAwIDI0cHggMjRweDtcclxuLy99XHJcbi8vXHJcbi8vLmxheW91dCB7XHJcbi8vICBoZWlnaHQ6IDEwMHZoO1xyXG4vL31cclxuXHJcbiJdfQ== */"] });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\nodejs\project_demo\3821ICT\Angular\project\climate\src\main.ts */"zUnb");


/***/ }),

/***/ "096P":
/*!***********************************************************!*\
  !*** ./src/app/layout/breadcrumb/breadcrumb.component.ts ***!
  \***********************************************************/
/*! exports provided: BreadcrumbComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbComponent", function() { return BreadcrumbComponent; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ng_zorro_antd_breadcrumb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd/breadcrumb */ "yNE/");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var ng_zorro_antd_date_picker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd/date-picker */ "0lU3");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-zorro-antd/icon */ "FwiY");








function BreadcrumbComponent_nz_breadcrumb_item_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "nz-breadcrumb-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const param_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](param_r1);
} }
class BreadcrumbComponent {
    constructor(router, activatedRoute) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.routerPath = "";
        this.dateFormat = 'yyyy/MM/dd';
    }
    ngOnInit() {
        this.router.events.subscribe((data) => {
            if (data instanceof _angular_router__WEBPACK_IMPORTED_MODULE_0__["NavigationEnd"]) {
                // console.log(this.activatedRoute.snapshot)
                this.routerPath = data.url.substr(1);
                this.routerSplit = this.routerPath.split('/');
                console.log("Router方式:", this.routerPath);
                let graphs = JSON.parse(localStorage.getItem('ContainGraph')) || { 'Graph': [] };
                // console.log(graphs)
                if (this.routerSplit[0] === 'home') {
                    // console.log(graphs)
                    if (graphs.Graph === [] || graphs.Graph.indexOf(this.routerSplit[1]) == -1) {
                        graphs.Graph.push(this.routerSplit[1]);
                        console.log(graphs);
                        localStorage.setItem('ContainGraph', JSON.stringify(graphs));
                    }
                }
            }
        });
    }
    clear() {
        localStorage.removeItem('ContainGraph');
    }
    emitDate() {
        if (this.date) {
            const date = {
                'start': this.date[0],
                'end': this.date[1]
            };
            console.log(date);
        }
    }
}
BreadcrumbComponent.ɵfac = function BreadcrumbComponent_Factory(t) { return new (t || BreadcrumbComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__["ActivatedRoute"])); };
BreadcrumbComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: BreadcrumbComponent, selectors: [["app-breadcrumb"]], decls: 12, vars: 5, consts: [[2, "display", "inline"], [4, "ngFor", "ngForOf"], [1, "right"], ["id", "date", 1, "info"], [3, "nzFormat", "ngModel", "ngModelChange"], ["type", "button", "id", "searchDate", 1, "button", 3, "click"], ["id", "date1", 1, "info"], ["nz-icon", "", "nzType", "search", "nzTheme", "outline", 2, "padding", "0 0 2px 6px", 3, "click"]], template: function BreadcrumbComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "nz-breadcrumb");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, BreadcrumbComponent_nz_breadcrumb_item_2_Template, 2, 1, "nz-breadcrumb-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Information Platform ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "nz-range-picker", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function BreadcrumbComponent_Template_nz_range_picker_ngModelChange_6_listener($event) { return ctx.date = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BreadcrumbComponent_Template_button_click_7_listener() { return ctx.emitDate(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Search");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "nz-range-picker", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function BreadcrumbComponent_Template_nz_range_picker_ngModelChange_10_listener($event) { return ctx.date = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "i", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BreadcrumbComponent_Template_i_click_11_listener() { return ctx.emitDate(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.routerPath.split("/"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzFormat", ctx.dateFormat)("ngModel", ctx.date);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzFormat", ctx.dateFormat)("ngModel", ctx.date);
    } }, directives: [ng_zorro_antd_breadcrumb__WEBPACK_IMPORTED_MODULE_2__["NzBreadCrumbComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], ng_zorro_antd_date_picker__WEBPACK_IMPORTED_MODULE_4__["NzDatePickerComponent"], ng_zorro_antd_date_picker__WEBPACK_IMPORTED_MODULE_4__["NzRangePickerComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"], ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_6__["NzIconDirective"], ng_zorro_antd_breadcrumb__WEBPACK_IMPORTED_MODULE_2__["NzBreadCrumbItemComponent"]], styles: ["nz-breadcrumb[_ngcontent-%COMP%] {\n  margin: 16px 0;\n}\n\n#info[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n\n.right[_ngcontent-%COMP%] {\n  float: right;\n  margin-top: -5px;\n}\n\n.nz-date-picker[_ngcontent-%COMP%] {\n  margin: 0 8px 12px 0;\n}\n\n.button[_ngcontent-%COMP%] {\n  background-color: #052745;\n  height: 30px;\n  width: 60px;\n  border: none;\n  color: whitesmoke;\n  text-align: center;\n  font-size: 13px;\n  Margin-LEFT: 15PX;\n  border-radius: 4px;\n}\n\n@media (max-width: 992px) {\n  #date[_ngcontent-%COMP%] {\n    display: none;\n    padding-bottom: 5px;\n  }\n\n  #date1[_ngcontent-%COMP%] {\n    display: block;\n    padding-bottom: 5px;\n  }\n}\n\n@media (min-width: 991px) {\n  #date1[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxicmVhZGNydW1iLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtBQUNGOztBQUNBO0VBQ0UsbUJBQUE7QUFFRjs7QUFBQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQUdGOztBQURBO0VBQ0Usb0JBQUE7QUFJRjs7QUFGQTtFQUNFLHlCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBS0Y7O0FBRkE7RUFFRTtJQUNFLGFBQUE7SUFDQSxtQkFBQTtFQUlGOztFQURBO0lBQ0UsY0FBQTtJQUNBLG1CQUFBO0VBSUY7QUFDRjs7QUFEQTtFQUVDO0lBQ0UsYUFBQTtFQUVEO0FBQ0YiLCJmaWxlIjoiYnJlYWRjcnVtYi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm56LWJyZWFkY3J1bWIge1xyXG4gIG1hcmdpbjogMTZweCAwO1xyXG59XHJcbiNpbmZve1xyXG4gIHdoaXRlLXNwYWNlOm5vd3JhcDtcclxufVxyXG4ucmlnaHQge1xyXG4gIGZsb2F0OnJpZ2h0O1xyXG4gIG1hcmdpbi10b3A6IC01cHg7XHJcbn1cclxuLm56LWRhdGUtcGlja2VyIHtcclxuICBtYXJnaW46IDAgOHB4IDEycHggMDtcclxufVxyXG4uYnV0dG9ue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwNTI3NDU7XHJcbiAgaGVpZ2h0OiAzMHB4O1xyXG4gIHdpZHRoOiA2MHB4O1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBjb2xvcjogd2hpdGVzbW9rZTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAxM3B4O1xyXG4gIE1hcmdpbi1MRUZUOiAxNVBYO1xyXG4gIGJvcmRlci1yYWRpdXM6NHB4O1xyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogOTkycHgpXHJcbntcclxuICAjZGF0ZXtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogNXB4O1xyXG4gIH1cclxuXHJcbiAgI2RhdGUxIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDVweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSAobWluLXdpZHRoOiA5OTFweClcclxue1xyXG4gI2RhdGUxIHtcclxuICAgZGlzcGxheTogbm9uZTtcclxuIH1cclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ 1:
/*!*******************************!*\
  !*** asciify-image (ignored) ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "4jEQ":
/*!******************************************************************!*\
  !*** ./src/app/graph/force-graph-td/force-graph-td.component.ts ***!
  \******************************************************************/
/*! exports provided: ForceGraphTDComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForceGraphTDComponent", function() { return ForceGraphTDComponent; });
/* harmony import */ var _3d_force_graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! 3d-force-graph */ "rDJh");
/* harmony import */ var three_spritetext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three-spritetext */ "ilox");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class ForceGraphTDComponent {
    constructor() {
        this.N = 80;
        this.gData = {
            nodes: [...Array(this.N).keys()].map(i => ({ id: i })),
            links: [...Array(this.N).keys()]
                .filter(id => id)
                .map(id => ({
                source: id,
                target: Math.round(Math.random() * (id - 1))
            }))
        };
        this.ForceGraph = Object(_3d_force_graph__WEBPACK_IMPORTED_MODULE_0__["default"])(); // init graph
        this.highlightNodes = new Set();
        this.highlightLinks = new Set();
        this.hoverNode = null;
    }
    ngOnChanges(changes) {
        console.log(changes);
        if (changes.WordCloudParam && changes.WordCloudParam.currentValue !== undefined) {
            this.WordCloudParam = changes.WordCloudParam.currentValue;
            for (let node of this.gData.nodes) {
                if (node.id === Number(this.WordCloudParam)) {
                    this.clickNode(node);
                }
            }
        }
    }
    ngOnInit() {
        this.gData.links.forEach(link => {
            const a = this.gData.nodes[link.source];
            const b = this.gData.nodes[link.target];
            !a.neighbors && (a.neighbors = []);
            !b.neighbors && (b.neighbors = []);
            a.neighbors.push(b);
            b.neighbors.push(a);
            !a.links && (a.links = []);
            !b.links && (b.links = []);
            a.links.push(link);
            b.links.push(link);
        });
        this.elem = document.getElementById('container');
        this.ForceGraph(this.elem)
            .width(430)
            .height(238)
            .backgroundColor('#fff')
            .showNavInfo(false)
            .graphData(this.gData)
            .nodeThreeObjectExtend(true)
            .nodeThreeObject(node => {
            const Node = node;
            let text = '';
            if (Node.id.length > 10) {
                text = Node.id.substring(0, 9) + '...';
            }
            else {
                text = Node.id;
            }
            const sprite = new three_spritetext__WEBPACK_IMPORTED_MODULE_1__["default"](`${text}`);
            sprite.material.depthWrite = false;
            sprite.color = 'black';
            sprite.textHeight = 5;
            sprite.textHeight = 5;
            sprite.center.y += 1.5;
            return sprite;
        })
            .nodeColor(node => this.highlightNodes.has(node) ? node === this.hoverNode ? 'rgb(255,0,0,1)' : 'rgba(255,160,0,0.8)' : 'rgba(25,95,217,0.6)')
            .linkWidth(link => this.highlightLinks.has(link) ? 3 : 1)
            .linkDirectionalParticles(link => this.highlightLinks.has(link) ? 3 : 0)
            .linkDirectionalParticleWidth(4)
            .onNodeClick(node => this.clickNode(node));
    }
    search(node) {
        const distance = 100;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
        this.ForceGraph.cameraPosition({ x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        1500 // ms transition duration
        );
    }
    clickNode(Node) {
        // no state change
        if ((!Node && !this.highlightNodes.size) || (Node && this.hoverNode === Node))
            return;
        this.highlightNodes.clear();
        this.highlightLinks.clear();
        if (Node) {
            this.highlightNodes.add(Node);
            Node.neighbors.forEach(neighbor => this.highlightNodes.add(neighbor));
            Node.links.forEach(link => this.highlightLinks.add(link));
        }
        this.hoverNode = Node || null;
        this.updateHighlight();
        this.search(Node);
    }
    updateHighlight() {
        // trigger update of highlighted objects in scene
        this.ForceGraph
            .nodeColor(this.ForceGraph.nodeColor())
            .linkWidth(this.ForceGraph.linkWidth())
            .linkDirectionalParticles(this.ForceGraph.linkDirectionalParticles());
    }
}
ForceGraphTDComponent.ɵfac = function ForceGraphTDComponent_Factory(t) { return new (t || ForceGraphTDComponent)(); };
ForceGraphTDComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ForceGraphTDComponent, selectors: [["app-force-graph-td"]], inputs: { WordCloudParam: "WordCloudParam" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵNgOnChangesFeature"]], decls: 1, vars: 0, consts: [["id", "container"]], template: function ForceGraphTDComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "div", 0);
    } }, styles: ["#container[_ngcontent-%COMP%] {\n  position: relative;\n  height: 250px;\n  width: 430px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxmb3JjZS1ncmFwaC10ZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7QUFDRiIsImZpbGUiOiJmb3JjZS1ncmFwaC10ZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNjb250YWluZXIge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBoZWlnaHQ6IDI1MHB4O1xyXG4gIHdpZHRoOiA0MzBweDtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "J21m":
/*!***************************************!*\
  !*** ./src/app/graph/graph.module.ts ***!
  \***************************************/
/*! exports provided: GraphModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphModule", function() { return GraphModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _graph_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graph-routing.module */ "NXy0");
/* harmony import */ var _test_test_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./test/test.component */ "MjuH");
/* harmony import */ var _word_cloud_word_cloud_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./word-cloud/word-cloud.component */ "vZbB");
/* harmony import */ var _line_graph_line_graph_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./line-graph/line-graph.component */ "q6VA");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-zorro-antd/icon */ "FwiY");
/* harmony import */ var ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-zorro-antd/grid */ "B+r4");
/* harmony import */ var _sum1_sum1_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sum1/sum1.component */ "p9sp");
/* harmony import */ var _heat_map_heat_map_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./heat-map/heat-map.component */ "qfjz");
/* harmony import */ var _force_graph_force_graph_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./force-graph/force-graph.component */ "yHUG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng-zorro-antd/collapse */ "IvDN");
/* harmony import */ var _force_graph_td_force_graph_td_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./force-graph-td/force-graph-td.component */ "4jEQ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ "fXoL");














class GraphModule {
}
GraphModule.ɵfac = function GraphModule_Factory(t) { return new (t || GraphModule)(); };
GraphModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineNgModule"]({ type: GraphModule });
GraphModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _graph_routing_module__WEBPACK_IMPORTED_MODULE_1__["GraphRoutingModule"],
            ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_5__["NzIconModule"],
            ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_6__["NzGridModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
            ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_11__["NzCollapseModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsetNgModuleScope"](GraphModule, { declarations: [_test_test_component__WEBPACK_IMPORTED_MODULE_2__["TestComponent"], _word_cloud_word_cloud_component__WEBPACK_IMPORTED_MODULE_3__["WordCloudComponent"], _line_graph_line_graph_component__WEBPACK_IMPORTED_MODULE_4__["LineGraphComponent"], _heat_map_heat_map_component__WEBPACK_IMPORTED_MODULE_8__["HeatMapComponent"],
        _sum1_sum1_component__WEBPACK_IMPORTED_MODULE_7__["Sum1Component"], _force_graph_force_graph_component__WEBPACK_IMPORTED_MODULE_9__["ForceGraphComponent"], _force_graph_td_force_graph_td_component__WEBPACK_IMPORTED_MODULE_12__["ForceGraphTDComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _graph_routing_module__WEBPACK_IMPORTED_MODULE_1__["GraphRoutingModule"],
        ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_5__["NzIconModule"],
        ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_6__["NzGridModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
        ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_11__["NzCollapseModule"]], exports: [_sum1_sum1_component__WEBPACK_IMPORTED_MODULE_7__["Sum1Component"],
        _force_graph_force_graph_component__WEBPACK_IMPORTED_MODULE_9__["ForceGraphComponent"],
        _line_graph_line_graph_component__WEBPACK_IMPORTED_MODULE_4__["LineGraphComponent"],
        _heat_map_heat_map_component__WEBPACK_IMPORTED_MODULE_8__["HeatMapComponent"],
        _word_cloud_word_cloud_component__WEBPACK_IMPORTED_MODULE_3__["WordCloudComponent"],
        _force_graph_td_force_graph_td_component__WEBPACK_IMPORTED_MODULE_12__["ForceGraphTDComponent"]] }); })();


/***/ }),

/***/ "JoXy":
/*!****************************************!*\
  !*** ./src/app/graph/graph.service.ts ***!
  \****************************************/
/*! exports provided: GraphService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphService", function() { return GraphService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");


class GraphService {
    constructor(http) {
        this.http = http;
        this.httpOption = {}; // for token
        this.APIURL = `http://supergit.asuscomm.com:4000`;
        this.host = '/api/';
    }
    /***
     * get Employee
     * ***/
    getEmployeeInfo() {
        const url = this.host + `/goods/findGoods`;
        const info = {
            "province": "江苏"
        };
        // const url = this.APIURL + '/goods/findGoods'
        console.log(url);
        return this.http.post(url, info);
        // return this.http.get<any>(url);
    }
}
GraphService.ɵfac = function GraphService_Factory(t) { return new (t || GraphService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
GraphService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: GraphService, factory: GraphService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "MjuH":
/*!**********************************************!*\
  !*** ./src/app/graph/test/test.component.ts ***!
  \**********************************************/
/*! exports provided: TestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestComponent", function() { return TestComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _word_cloud_word_cloud_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../word-cloud/word-cloud.component */ "vZbB");
/* harmony import */ var ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd/collapse */ "IvDN");
/* harmony import */ var _line_graph_line_graph_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../line-graph/line-graph.component */ "q6VA");





const _c0 = ["testContainer"];
class TestComponent {
    constructor(resolver) {
        this.resolver = resolver;
    }
    ngOnInit() {
    }
    createComponent() {
        const factory = this.resolver.resolveComponentFactory(_word_cloud_word_cloud_component__WEBPACK_IMPORTED_MODULE_1__["WordCloudComponent"]);
        this.componentRef = this.container.createComponent(factory);
        console.log('componentRef', this.componentRef);
    }
    remove() {
        this.container.clear();
    }
}
TestComponent.ɵfac = function TestComponent_Factory(t) { return new (t || TestComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"])); };
TestComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TestComponent, selectors: [["app-test"]], viewQuery: function TestComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.container = _t.first);
    } }, decls: 14, vars: 3, consts: [["testContainer", ""], [3, "click"], [1, "row", "mb-2"], [1, "col-lg-6", "themed-grid-col"], [3, "nzActive", "nzShowArrow", "nzHeader"]], template: function TestComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", null, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "I am a container");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TestComponent_Template_button_click_3_listener() { return ctx.createComponent(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "\u6765\u4E00\u4E2A");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TestComponent_Template_button_click_5_listener() { return ctx.remove(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "\u5220\u9664");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "nz-collapse");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "nz-collapse-panel", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "app-line-graph");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, ".col-md-6");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzActive", true)("nzShowArrow", false)("nzHeader", "title");
    } }, directives: [ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_2__["NzCollapseComponent"], ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_2__["NzCollapsePanelComponent"], _line_graph_line_graph_component__WEBPACK_IMPORTED_MODULE_3__["LineGraphComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0ZXN0LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "NXy0":
/*!***********************************************!*\
  !*** ./src/app/graph/graph-routing.module.ts ***!
  \***********************************************/
/*! exports provided: GraphRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphRoutingModule", function() { return GraphRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _test_test_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test/test.component */ "MjuH");
/* harmony import */ var _word_cloud_word_cloud_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./word-cloud/word-cloud.component */ "vZbB");
/* harmony import */ var _line_graph_line_graph_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./line-graph/line-graph.component */ "q6VA");
/* harmony import */ var _heat_map_heat_map_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./heat-map/heat-map.component */ "qfjz");
/* harmony import */ var _force_graph_force_graph_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./force-graph/force-graph.component */ "yHUG");
/* harmony import */ var _force_graph_td_force_graph_td_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./force-graph-td/force-graph-td.component */ "4jEQ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");









const routes = [
    {
        path: 'test',
        component: _test_test_component__WEBPACK_IMPORTED_MODULE_1__["TestComponent"],
    },
    {
        path: 'NodeGraph',
        component: _force_graph_force_graph_component__WEBPACK_IMPORTED_MODULE_5__["ForceGraphComponent"],
    },
    {
        path: 'WordCloud',
        component: _word_cloud_word_cloud_component__WEBPACK_IMPORTED_MODULE_2__["WordCloudComponent"],
    },
    {
        path: 'StackGraph',
        component: _line_graph_line_graph_component__WEBPACK_IMPORTED_MODULE_3__["LineGraphComponent"],
    },
    {
        path: 'HeatMap',
        component: _heat_map_heat_map_component__WEBPACK_IMPORTED_MODULE_4__["HeatMapComponent"],
    },
    {
        path: '3d',
        component: _force_graph_td_force_graph_td_component__WEBPACK_IMPORTED_MODULE_6__["ForceGraphTDComponent"]
    },
    {
        path: '**',
        redirectTo: '/home/content'
    }
];
class GraphRoutingModule {
}
GraphRoutingModule.ɵfac = function GraphRoutingModule_Factory(t) { return new (t || GraphRoutingModule)(); };
GraphRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: GraphRoutingModule });
GraphRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](GraphRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-zorro-antd/layout */ "yW9e");
/* harmony import */ var ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd/menu */ "Q8cG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _layout_header_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layout/header/header.component */ "/Lhg");
/* harmony import */ var _layout_breadcrumb_breadcrumb_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./layout/breadcrumb/breadcrumb.component */ "096P");






class AppComponent {
    constructor() {
        this.title = 'climate';
        this.isCollapsed = false;
    }
    collapsed(event) {
        this.isCollapsed = event.collapsed;
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 22, vars: 3, consts: [[1, "layout"], ["nzCollapsible", "", 3, "nzCollapsed", "nzTrigger", "nzCollapsedChange"], [1, "logo"], ["nz-menu", "", "nzTheme", "dark", "nzMode", "inline"], ["nz-submenu", "", "nzTitle", "Combine Graph", "nzIcon", "user"], ["href", "javascript:void(0)", "routerLink", "/home/content"], ["nz-menu-item", "", "nzSelected", ""], ["nz-submenu", "", "nzTitle", "Single Graph", "nzIcon", "laptop"], ["href", "javascript:void(0)", "routerLink", "/graph/test"], ["nz-menu-item", ""], [3, "msg"], [1, "out-layer"], [1, "inner-content"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nz-layout", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "nz-sider", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("nzCollapsedChange", function AppComponent_Template_nz_sider_nzCollapsedChange_1_listener($event) { return ctx.isCollapsed = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ul", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "li", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Overall");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "li", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Test");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "nz-layout");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "nz-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "app-header", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("msg", function AppComponent_Template_app_header_msg_17_listener($event) { return ctx.collapsed($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "nz-content", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "app-breadcrumb");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "nz-content", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzCollapsed", ctx.isCollapsed)("nzTrigger", null);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.isCollapsed ? "CAB" : "Climate Action Beacon");
    } }, directives: [ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_1__["NzLayoutComponent"], ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_1__["NzSiderComponent"], ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_2__["NzMenuDirective"], ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_2__["NzSubMenuComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"], ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_2__["NzMenuItemDirective"], ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_1__["NzHeaderComponent"], _layout_header_header_component__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"], ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_1__["NzContentComponent"], _layout_breadcrumb_breadcrumb_component__WEBPACK_IMPORTED_MODULE_5__["BreadcrumbComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]], styles: [".layout[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  height: auto;\n  overflow: auto;\n}\n\nnz-header[_ngcontent-%COMP%] {\n  background: #fff;\n  padding: 0;\n}\n\nnz-content[_ngcontent-%COMP%] {\n  margin: 0 16px;\n}\n\nnz-breadcrumb[_ngcontent-%COMP%] {\n  margin: 16px 0;\n}\n\n.logo[_ngcontent-%COMP%] {\n  height: 32px;\n  background: rgba(255, 255, 255, 0.2);\n  margin: 16px;\n  text-align: center;\n  font-size: 10px;\n  color: white;\n  padding-top: 0.5rem;\n}\n\na[_ngcontent-%COMP%] {\n  text-decoration: none;\n}\n\n.inner-content[_ngcontent-%COMP%] {\n  padding: 24px;\n  background: #fff;\n  min-height: 360px;\n}\n\n.out-layer[_ngcontent-%COMP%] {\n  min-width: 820px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxVQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0VBQ0Esb0NBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxxQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0FBQ0YiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxheW91dCB7XHJcbiAgbWluLWhlaWdodDogMTAwdmg7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIG92ZXJmbG93OiBhdXRvO1xyXG59XHJcblxyXG5uei1oZWFkZXIge1xyXG4gIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgcGFkZGluZzogMDtcclxufVxyXG5cclxubnotY29udGVudCB7XHJcbiAgbWFyZ2luOiAwIDE2cHg7XHJcbn1cclxuXHJcbm56LWJyZWFkY3J1bWIge1xyXG4gIG1hcmdpbjogMTZweCAwO1xyXG59XHJcblxyXG4ubG9nbyB7XHJcbiAgaGVpZ2h0OiAzMnB4O1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcclxuICBtYXJnaW46IDE2cHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMTBweDtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgcGFkZGluZy10b3A6IDAuNXJlbTtcclxufVxyXG5cclxuYSB7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59XHJcblxyXG4uaW5uZXItY29udGVudCB7XHJcbiAgcGFkZGluZzogMjRweDtcclxuICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gIG1pbi1oZWlnaHQ6IDM2MHB4O1xyXG59XHJcblxyXG4ub3V0LWxheWVyIHtcclxuICBtaW4td2lkdGg6IDgyMHB4O1xyXG59XHJcblxyXG5cclxuIl19 */"] });


/***/ }),

/***/ "Tx//":
/*!*****************************************!*\
  !*** ./src/app/layout/layout.module.ts ***!
  \*****************************************/
/*! exports provided: LayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutModule", function() { return LayoutModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var ng_zorro_antd_breadcrumb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-zorro-antd/breadcrumb */ "yNE/");
/* harmony import */ var ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd/menu */ "Q8cG");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header/header.component */ "/Lhg");
/* harmony import */ var _breadcrumb_breadcrumb_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./breadcrumb/breadcrumb.component */ "096P");
/* harmony import */ var _graph_graph_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../graph/graph-routing.module */ "NXy0");
/* harmony import */ var ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-zorro-antd/layout */ "yW9e");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng-zorro-antd/icon */ "FwiY");
/* harmony import */ var ng_zorro_antd_date_picker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-zorro-antd/date-picker */ "0lU3");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ "fXoL");











class LayoutModule {
}
LayoutModule.ɵfac = function LayoutModule_Factory(t) { return new (t || LayoutModule)(); };
LayoutModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineNgModule"]({ type: LayoutModule });
LayoutModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            ng_zorro_antd_breadcrumb__WEBPACK_IMPORTED_MODULE_1__["NzBreadCrumbModule"],
            ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_2__["NzMenuModule"],
            _graph_graph_routing_module__WEBPACK_IMPORTED_MODULE_5__["GraphRoutingModule"],
            ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_6__["NzLayoutModule"],
            ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_7__["NzIconModule"],
            ng_zorro_antd_date_picker__WEBPACK_IMPORTED_MODULE_8__["NzDatePickerModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsetNgModuleScope"](LayoutModule, { declarations: [_header_header_component__WEBPACK_IMPORTED_MODULE_3__["HeaderComponent"], _breadcrumb_breadcrumb_component__WEBPACK_IMPORTED_MODULE_4__["BreadcrumbComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        ng_zorro_antd_breadcrumb__WEBPACK_IMPORTED_MODULE_1__["NzBreadCrumbModule"],
        ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_2__["NzMenuModule"],
        _graph_graph_routing_module__WEBPACK_IMPORTED_MODULE_5__["GraphRoutingModule"],
        ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_6__["NzLayoutModule"],
        ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_7__["NzIconModule"],
        ng_zorro_antd_date_picker__WEBPACK_IMPORTED_MODULE_8__["NzDatePickerModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"]], exports: [_header_header_component__WEBPACK_IMPORTED_MODULE_3__["HeaderComponent"],
        _breadcrumb_breadcrumb_component__WEBPACK_IMPORTED_MODULE_4__["BreadcrumbComponent"]] }); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd/i18n */ "Rm4T");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_common_locales_en__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/locales/en */ "tAZD");
/* harmony import */ var _angular_common_locales_en__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_en__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng-zorro-antd/layout */ "yW9e");
/* harmony import */ var ng_zorro_antd_breadcrumb__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng-zorro-antd/breadcrumb */ "yNE/");
/* harmony import */ var ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng-zorro-antd/menu */ "Q8cG");
/* harmony import */ var _layout_layout_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./layout/layout.module */ "Tx//");
/* harmony import */ var ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ng-zorro-antd/grid */ "B+r4");
/* harmony import */ var _graph_graph_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./graph/graph.module */ "J21m");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ng-zorro-antd/icon */ "FwiY");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ "fXoL");


















Object(_angular_common__WEBPACK_IMPORTED_MODULE_4__["registerLocaleData"])(_angular_common_locales_en__WEBPACK_IMPORTED_MODULE_5___default.a);
class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineInjector"]({ providers: [{ provide: ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_3__["NZ_I18N"], useValue: ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_3__["en_US"] }], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["BrowserAnimationsModule"],
            ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_9__["NzLayoutModule"],
            ng_zorro_antd_breadcrumb__WEBPACK_IMPORTED_MODULE_10__["NzBreadCrumbModule"],
            ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_11__["NzMenuModule"],
            _layout_layout_module__WEBPACK_IMPORTED_MODULE_12__["LayoutModule"],
            ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_13__["NzGridModule"],
            _graph_graph_module__WEBPACK_IMPORTED_MODULE_14__["GraphModule"],
            ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_15__["NzIconModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["BrowserAnimationsModule"],
        ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_9__["NzLayoutModule"],
        ng_zorro_antd_breadcrumb__WEBPACK_IMPORTED_MODULE_10__["NzBreadCrumbModule"],
        ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_11__["NzMenuModule"],
        _layout_layout_module__WEBPACK_IMPORTED_MODULE_12__["LayoutModule"],
        ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_13__["NzGridModule"],
        _graph_graph_module__WEBPACK_IMPORTED_MODULE_14__["GraphModule"],
        ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_15__["NzIconModule"]] }); })();


/***/ }),

/***/ "p9sp":
/*!**********************************************!*\
  !*** ./src/app/graph/sum1/sum1.component.ts ***!
  \**********************************************/
/*! exports provided: Sum1Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sum1Component", function() { return Sum1Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-zorro-antd/grid */ "B+r4");
/* harmony import */ var _force_graph_force_graph_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../force-graph/force-graph.component */ "yHUG");
/* harmony import */ var _line_graph_line_graph_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../line-graph/line-graph.component */ "q6VA");
/* harmony import */ var _heat_map_heat_map_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../heat-map/heat-map.component */ "qfjz");
/* harmony import */ var _word_cloud_word_cloud_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../word-cloud/word-cloud.component */ "vZbB");






class Sum1Component {
    constructor() { }
    ngOnInit() {
    }
}
Sum1Component.ɵfac = function Sum1Component_Factory(t) { return new (t || Sum1Component)(); };
Sum1Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: Sum1Component, selectors: [["app-sum1"]], decls: 10, vars: 0, consts: [["nz-row", ""], ["nz-col", "", "nzFlex", "1 1 300px"], ["nz-col", "", "nzFlex", "0 1 300px"]], template: function Sum1Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-force-graph");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "app-line-graph");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "app-heat-map");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "app-word-cloud");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_1__["NzRowDirective"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_1__["NzColDirective"], _force_graph_force_graph_component__WEBPACK_IMPORTED_MODULE_2__["ForceGraphComponent"], _line_graph_line_graph_component__WEBPACK_IMPORTED_MODULE_3__["LineGraphComponent"], _heat_map_heat_map_component__WEBPACK_IMPORTED_MODULE_4__["HeatMapComponent"], _word_cloud_word_cloud_component__WEBPACK_IMPORTED_MODULE_5__["WordCloudComponent"]], styles: ["[nz-row][_ngcontent-%COMP%] {\n  background-color: rgba(128, 128, 128, 0.08);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxzdW0xLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsMkNBQUE7QUFBRiIsImZpbGUiOiJzdW0xLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbltuei1yb3ddIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMDgpO1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ "q6VA":
/*!**********************************************************!*\
  !*** ./src/app/graph/line-graph/line-graph.component.ts ***!
  \**********************************************************/
/*! exports provided: LineGraphComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineGraphComponent", function() { return LineGraphComponent; });
/* harmony import */ var echarts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! echarts */ "MT78");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _graph_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../graph.service */ "JoXy");



class LineGraphComponent {
    constructor(service) {
        this.service = service;
    }
    ngOnInit() {
        this.chart = echarts__WEBPACK_IMPORTED_MODULE_0__["init"](document.getElementById('line'));
        this.chart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['positive', 'negative', 'natural']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'positive',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [0, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'natural',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: 'negative',
                    type: 'line',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        });
    }
}
LineGraphComponent.ɵfac = function LineGraphComponent_Factory(t) { return new (t || LineGraphComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_graph_service__WEBPACK_IMPORTED_MODULE_2__["GraphService"])); };
LineGraphComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LineGraphComponent, selectors: [["app-line-graph"]], decls: 1, vars: 0, consts: [["id", "line"]], template: function LineGraphComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
    } }, styles: ["#line[_ngcontent-%COMP%] {\n  position: relative;\n  height: 238px;\n  width: 430px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxsaW5lLWdyYXBoLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtBQUNGIiwiZmlsZSI6ImxpbmUtZ3JhcGguY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjbGluZSB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGhlaWdodDogMjM4cHg7XHJcbiAgd2lkdGg6IDQzMHB4O1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ "qfjz":
/*!******************************************************!*\
  !*** ./src/app/graph/heat-map/heat-map.component.ts ***!
  \******************************************************/
/*! exports provided: HeatMapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeatMapComponent", function() { return HeatMapComponent; });
/* harmony import */ var _antv_l7__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @antv/l7 */ "8ml+");
/* harmony import */ var _antv_l7_maps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @antv/l7-maps */ "6Pbx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");




class HeatMapComponent {
    constructor(http) {
        this.http = http;
        this.data = {
            "type": "FeatureCollection",
            "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
            "features": [
                {
                    "type": "Feature",
                    "properties": { "id": "ak16994521", "mag": 2.3 },
                    "geometry": { "type": "Point", "coordinates": [-151.5129, 63.1016, 0.0] }
                },
                {
                    "type": "Feature",
                    "properties": { "id": "ak16994519", "mag": 1.7 },
                    "geometry": { "type": "Point", "coordinates": [-150.4048, 63.1224, 105.5] }
                },
                {
                    "type": "Feature",
                    "properties": { "id": "ak16994517", "mag": 1.6 },
                    "geometry": { "type": "Point", "coordinates": [-151.3597, 63.0781, 0.0] }
                },
                {
                    "type": "Feature",
                    "properties": { "id": "ci38021336", "mag": 1.42 },
                    "geometry": { "type": "Point", "coordinates": [-118.497, 34.299667, 7.64] }
                },
            ]
        };
    }
    ngOnInit() {
        this.scene = new _antv_l7__WEBPACK_IMPORTED_MODULE_0__["Scene"]({
            id: 'map',
            logoVisible: false,
            map: new _antv_l7_maps__WEBPACK_IMPORTED_MODULE_1__["Mapbox"]({
                style: 'light',
                pitch: 0,
                center: [127.5671666579043, 7.445038892195569],
                zoom: 2.632456779444394,
            })
        });
        console.log(this.scene.getSize());
        this.scene.on('loaded', () => {
            fetch('https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json')
                .then(res => res.json())
                .then(data => {
                console.log(data);
                const layer = new _antv_l7__WEBPACK_IMPORTED_MODULE_0__["HeatmapLayer"]({})
                    .source(this.data)
                    .shape('heatmap')
                    .size('mag', [0, 1.0]) // weight映射通道
                    .style({
                    intensity: 2,
                    radius: 20,
                    opacity: 1.0,
                    rampColors: {
                        colors: [
                            '#FF4818',
                            '#F7B74A',
                            '#FFF598',
                            '#91EABC',
                            '#2EA9A1',
                            '#206C7C'
                        ].reverse(),
                        positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
                    }
                });
                this.scene.addLayer(layer);
            });
        });
    }
}
HeatMapComponent.ɵfac = function HeatMapComponent_Factory(t) { return new (t || HeatMapComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"])); };
HeatMapComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: HeatMapComponent, selectors: [["app-heat-map"]], decls: 1, vars: 0, consts: [["id", "map"]], template: function HeatMapComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "div", 0);
    } }, styles: ["#map[_ngcontent-%COMP%] {\n  position: relative;\n  height: 238px;\n  width: 430px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxoZWF0LW1hcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7QUFDRiIsImZpbGUiOiJoZWF0LW1hcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNtYXAge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBoZWlnaHQ6IDIzOHB4O1xyXG4gIHdpZHRoOiA0MzBweDtcclxuICAvL21hcmdpbi1sZWZ0OjMwcHg7XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const routes = [
    {
        path: 'home',
        loadChildren: () => __webpack_require__.e(/*! import() | dashboard-dashboard-module */ "dashboard-dashboard-module").then(__webpack_require__.bind(null, /*! ./dashboard/dashboard.module */ "TDBs")).then(mod => mod.DashboardModule)
    },
    {
        path: 'graph',
        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./graph/graph.module */ "J21m")).then(mod => mod.GraphModule)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "vZbB":
/*!**********************************************************!*\
  !*** ./src/app/graph/word-cloud/word-cloud.component.ts ***!
  \**********************************************************/
/*! exports provided: WordCloudComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WordCloudComponent", function() { return WordCloudComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var echarts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! echarts */ "MT78");
/* harmony import */ var echarts_wordcloud__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! echarts-wordcloud */ "h6EL");
/* harmony import */ var _graph_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../graph.service */ "JoXy");





class WordCloudComponent {
    constructor(service) {
        this.service = service;
        this.msg = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
        this.chart = echarts__WEBPACK_IMPORTED_MODULE_1__["init"](document.getElementById('main'));
        this.chart.setOption({
            backgroundColor: '#fff',
            tooltip: {
                show: false
            },
            series: [{
                    type: 'wordCloud',
                    size: ['9%', '50%'],
                    sizeRange: [10, 30],
                    textRotation: [0, 45, 90, -45],
                    rotationRange: [-45, 90],
                    gridSize: 8,
                    shape: 'diamond',
                    drawOutOfBound: false,
                    autoSize: {
                        enable: true,
                        minSize: 6
                    },
                    textStyle: {
                        normal: {
                            color: () => {
                                return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.15)'
                        }
                    },
                    data: [
                        { "value": 123, "name": "1" },
                        { "value": 232, "name": "2" },
                        { "value": 273, "name": "3" },
                        { "value": 12, "name": "4" },
                        { "value": 45, "name": "5" },
                        { "value": 345, "name": "6" },
                        { "value": 65, "name": "7" },
                        { "value": 134, "name": "8" },
                        { "value": 53, "name": "9" },
                        { "value": 63, "name": "10" },
                        { "value": 145, "name": "11" },
                        { "value": 133, "name": "12" },
                        { "value": 153, "name": "31" },
                        { "value": 173, "name": "15" },
                        { "value": 173, "name": "14" },
                        { "value": 183, "name": "13" },
                        { "value": 146, "name": "16" },
                        { "value": 168, "name": "17" },
                        { "value": 134, "name": "18" },
                        { "value": 146, "name": "19" },
                        { "value": 86, "name": "20" },
                        { "value": 423, "name": "21" },
                        { "value": 14, "name": "22" },
                        { "value": 644, "name": "23" },
                        { "value": 234, "name": "24" },
                        { "value": 145, "name": "25" },
                        { "value": 33, "name": "26" },
                        { "value": 623, "name": "27" },
                        { "value": 363, "name": "28" },
                        { "value": 33, "name": "29" },
                        { "value": 15, "name": "30" },
                        { "value": 43, "name": "31" },
                        { "value": 133, "name": "32" },
                    ],
                }]
        });
        this.getClickValue();
    }
    getClickValue() {
        this.chart.on('click', function (word) {
            console.log(word);
            this.msg.emit({ 'param': word });
        }.bind(this));
    }
}
WordCloudComponent.ɵfac = function WordCloudComponent_Factory(t) { return new (t || WordCloudComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_graph_service__WEBPACK_IMPORTED_MODULE_3__["GraphService"])); };
WordCloudComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WordCloudComponent, selectors: [["app-word-cloud"]], outputs: { msg: "msg" }, decls: 1, vars: 0, consts: [["id", "main"]], template: function WordCloudComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0);
    } }, styles: ["#main[_ngcontent-%COMP%] {\n  position: relative;\n  height: 238px;\n  width: 430px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFx3b3JkLWNsb3VkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtBQUNGIiwiZmlsZSI6IndvcmQtY2xvdWQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjbWFpbiB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGhlaWdodDogMjM4cHg7XHJcbiAgd2lkdGg6IDQzMHB4O1xyXG4gIC8vbWFyZ2luLWxlZnQ6MzBweDtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "yHUG":
/*!************************************************************!*\
  !*** ./src/app/graph/force-graph/force-graph.component.ts ***!
  \************************************************************/
/*! exports provided: ForceGraphComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForceGraphComponent", function() { return ForceGraphComponent; });
/* harmony import */ var force_graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! force-graph */ "3keW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class ForceGraphComponent {
    constructor() {
        this.N = 80;
        this.gData = {
            nodes: [...Array(this.N).keys()].map(i => ({ id: i })),
            links: [...Array(this.N).keys()]
                .filter(id => id)
                .map(id => ({
                source: id,
                target: Math.round(Math.random() * (id - 1))
            }))
        };
        this.ForceGraph = Object(force_graph__WEBPACK_IMPORTED_MODULE_0__["default"])(); // init graph
        this.NODE_R = 8;
        this.highlightNodes = new Set();
        this.highlightLinks = new Set();
        this.hoverNode = null;
    }
    ngOnChanges(changes) {
        console.log(changes);
        if (changes.WordCloudParam && changes.WordCloudParam.currentValue !== undefined) {
            this.WordCloudParam = changes.WordCloudParam.currentValue;
            for (let node of this.gData.nodes) {
                if (node.id === Number(this.WordCloudParam)) {
                    this.clickNode(node);
                }
            }
        }
    }
    ngOnInit() {
        this.gData.links.forEach(link => {
            const a = this.gData.nodes[link.source];
            const b = this.gData.nodes[link.target];
            !a.neighbors && (a.neighbors = []);
            !b.neighbors && (b.neighbors = []);
            a.neighbors.push(b);
            b.neighbors.push(a);
            !a.links && (a.links = []);
            !b.links && (b.links = []);
            a.links.push(link);
            b.links.push(link);
        });
        this.elem = document.getElementById('container');
        this.ForceGraph(this.elem)
            .width(430)
            .height(238)
            .graphData(this.gData)
            .nodeRelSize(this.NODE_R)
            .onNodeClick(node => this.clickNode(node))
            .onLinkClick(link => {
            this.highlightNodes.clear();
            this.highlightNodes.clear();
            if (link) {
                this.highlightNodes.add(link);
                this.highlightNodes.add(link.source);
                this.highlightNodes.add(link.target);
            }
        })
            .autoPauseRedraw(false) // keep redrawing after engine has stopped
            .linkWidth(link => this.highlightNodes.has(link) ? 5 : 1)
            .linkDirectionalParticles(4)
            .linkDirectionalParticleWidth(link => this.highlightNodes.has(link) ? 4 : 0)
            .nodeCanvasObjectMode(node => this.highlightNodes.has(node) ? 'before' : undefined)
            .nodeCanvasObject((node, ctx) => {
            // add ring just for highlighted nodes
            ctx.beginPath();
            ctx.arc(node.x, node.y, this.NODE_R * 1.4, 0, 2 * Math.PI, false);
            ctx.fillStyle = node === this.hoverNode ? 'red' : 'orange';
            ctx.fill();
        });
    }
    clickNode(Node) {
        this.highlightNodes.clear();
        this.highlightLinks.clear();
        if (Node) {
            this.highlightNodes.add(Node);
            Node.neighbors.forEach(neighbor => this.highlightNodes.add(neighbor));
            Node.links.forEach(link => this.highlightNodes.add(link));
        }
        this.hoverNode = Node || null;
        this.elem.style.cursor = Node ? '-webkit-grab' : null;
    }
}
ForceGraphComponent.ɵfac = function ForceGraphComponent_Factory(t) { return new (t || ForceGraphComponent)(); };
ForceGraphComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ForceGraphComponent, selectors: [["app-force-graph"]], inputs: { WordCloudParam: "WordCloudParam", height: "height", width: "width" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]], decls: 1, vars: 0, consts: [["id", "container"]], template: function ForceGraphComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
    } }, styles: ["#container[_ngcontent-%COMP%] {\n  position: relative;\n  height: 250px;\n  width: 430px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxmb3JjZS1ncmFwaC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7QUFDRiIsImZpbGUiOiJmb3JjZS1ncmFwaC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNjb250YWluZXIge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBoZWlnaHQ6IDI1MHB4O1xyXG4gIHdpZHRoOiA0MzBweDtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map