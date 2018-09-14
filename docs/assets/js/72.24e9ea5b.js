(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{214:function(t,e,a){"use strict";a.r(e);var r=a(0),s=Object(r.a)({},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[t._m(0),t._v(" "),a("blockquote",[a("p",[t._v("引用自"),a("a",{attrs:{href:"https://blog.csdn.net/lyflower/article/details/4204449",target:"_blank",rel:"noopener noreferrer"}},[t._v("Java接口实现和继承关系"),a("OutboundLink")],1)])]),t._v(" "),t._m(1),t._v(" "),a("p",[t._v("有时候，我们可能想要构造一个很抽象的父类对象，它可能仅仅代表一个分类或抽象概念，它的实例没有任何意义，因此不希望它被实例化。")]),t._v(" "),a("p",[t._v("在Java中，通过在class关键字前增加abstract修饰符，就可以将一个类定义成抽象类。抽象类不能被实例化。")]),t._v(" "),a("p",[t._v("抽象类除了能像普通类一样可以拥有一般的属性和方法，也可以拥有抽象方法（abstract method）。抽象方法与抽象的行为相对应，通常是这个行为对父对象没有意义，而子对象有具体动作。抽象类可以有抽象方法也可以没有抽象方法；但是如果一个类有抽象方法，那么这个类只能定义为抽象类。")]),t._v(" "),a("p",[t._v("抽象方法还有一个特点是，它强迫子类要么仍然保持抽象性（即不具体实现该方法并仍然定义为抽象类），要么具体表现出这个方法的行为（实现具体的动作或者通过抛出UnsupportedOperationException异常来表明不支持该行为）。这样也可以强化多态性。")]),t._v(" "),t._m(2),t._v(" "),a("p",[t._v("Java适用关键字interface定义一个接口。接口也是抽象对象，并且接口中的方法都是抽象方法。")]),t._v(" "),a("p",[t._v("一个接口可以继承其他接口；一个类通过关键字implements声明要实现一个接口，并具体实现接口的方法。")]),t._v(" "),a("p",[t._v("如果是抽象类实现一个接口，那么抽象类中可以不具体实现接口的方法（保持其抽象性），而由子类去实现。")]),t._v(" "),t._m(3),t._v(" "),a("p",[t._v("共同点：都可以有抽象方法。")]),t._v(" "),a("p",[t._v("不同点：1、抽象类可以有实例变量，而接口不能拥有实例变量，接口中的变量都是静态（static）的常量（final）；2、抽象类可以有非抽象方法，而接口只能由抽象方法。")]),t._v(" "),a("p",[t._v("Java允许一个接口继承多个父接口，也允许一个类实现多个接口。")]),t._v(" "),a("p",[t._v("对于一个类实现多个接口的情况，因为接口只有抽象方法，具体方法只能由实现接口的类去实现，在调用的时候始终只会调用实现类的方法（不存在歧义）；而又因为接口只有静态的常量，但是由于静态变量是在编译器决定调用关系的，即使存在一定的冲突也会在编译时提示出错；而引用静态变量一般直接使用类名或接口名，从而避免产生歧义。对于一个接口继承多个父接口的情况也一样不存在这些缺点。")])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"继承与实现"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#继承与实现","aria-hidden":"true"}},[this._v("#")]),this._v(" 继承与实现")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"抽象类"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#抽象类","aria-hidden":"true"}},[this._v("#")]),this._v(" 抽象类")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"接口"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#接口","aria-hidden":"true"}},[this._v("#")]),this._v(" 接口")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"抽象类和接口对比"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#抽象类和接口对比","aria-hidden":"true"}},[this._v("#")]),this._v(" 抽象类和接口对比")])}],!1,null,null,null);s.options.__file="extend-implements.md";e.default=s.exports}}]);