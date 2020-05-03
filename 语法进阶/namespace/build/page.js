"use strict";
var Component;
(function (Component) {
    // 在命名空间中定义 其他命名空间
    var SubComponent;
    (function (SubComponent) {
        var Test = /** @class */ (function () {
            function Test() {
                return "jm-test";
            }
            return Test;
        }());
        SubComponent.Test = Test;
    })(SubComponent = Component.SubComponent || (Component.SubComponent = {}));
    var Header = /** @class */ (function () {
        function Header() {
            var ele = document.createElement("div");
            ele.innerText = "This is header";
            document.body.appendChild(ele);
        }
        return Header;
    }());
    Component.Header = Header;
    var Content = /** @class */ (function () {
        function Content() {
            var ele = document.createElement("div");
            ele.innerText = "This is Content";
            document.body.appendChild(ele);
        }
        return Content;
    }());
    Component.Content = Content;
    var Footer = /** @class */ (function () {
        function Footer() {
            var ele = document.createElement("div");
            ele.innerText = "This is Footer";
            document.body.appendChild(ele);
        }
        return Footer;
    }());
    Component.Footer = Footer;
})(Component || (Component = {}));
// 为当前组件声明需要关联依赖的命名空间
/// <reference path="./components.ts" />
var Home;
(function (Home) {
    var Page = /** @class */ (function () {
        function Page() {
            this.user = {
                name: "jm"
            };
            new Component.Header();
            new Component.Content();
            new Component.Footer();
            var test = new Component.SubComponent.Test();
            console.log(test);
            console.log(this.user);
        }
        return Page;
    }());
    Home.Page = Page;
})(Home || (Home = {}));
