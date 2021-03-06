"use strict";
var BgImgHolder = function() {
		var a = $(".bg-img-holder");
		a.length && a.each(function() {
			var a, e, t, n, o;
			a = $(this), e = a.children("img").attr("src"), t = a.data("bg-position") ? a.data("bg-position") : "initial", n = a.data("bg-size") ? a.data("bg-size") : "auto", o = a.data("bg-height") ? a.data("bg-height") : "100%", a.css("background-image", 'url("' + e + '")').css("background-position", t).css("background-size", n).css("opacity", "1").css("height", o)
		})
	}(),
	CardActions = function() {
		var a = $(".card"),
			n = ".card-product-actions";
		a.length && $(n).length && (a.on({
			mouseenter: function() {
				var a, e, t;
				a = $(this), e = a.find(n), t = e.data("animation-in"), e.length && (e.addClass("in animated " + t), e.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
					e.removeClass("animated " + t)
				}))
			}
		}), a.on({
			mouseleave: function() {
				var a, e, t;
				a = $(this), e = a.find(n), t = e.data("animation-out"), e.length && (e.addClass("animated " + t), e.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
					e.removeClass("in animated " + t)
				}))
			}
		}))
	}(),
	Countdown = function() {
		var a = $(".countdown");
		a.length && a.each(function() {
			var a, e;
			a = $(this), e = a.data("countdown-date"), a.countdown(e).on("update.countdown", function(a) {
				$(this).html(a.strftime('<div class="countdown-item"><span class="countdown-digit">%-D</span><span class="countdown-label countdown-days">day%!d</span></div><div class="countdown-item"><span class="countdown-digit">%H</span><span class="countdown-separator">:</span><span class="countdown-label">hr</span></div><div class="countdown-item"><span class="countdown-digit">%M</span><span class="countdown-separator">:</span><span class="countdown-label">min</span></div><div class="countdown-item"><span class="countdown-digit">%S</span><span class="countdown-label">sec</span></div>'))
			})
		})
	}();
!
function(c) {
	c.fn.countTo = function(d) {
		return d = d || {}, c(this).each(function() {
			var t = c.extend({}, c.fn.countTo.defaults, {
				from: c(this).data("from"),
				to: c(this).data("to"),
				speed: c(this).data("speed"),
				refreshInterval: c(this).data("refresh-interval"),
				decimals: c(this).data("decimals")
			}, d),
				a = Math.ceil(t.speed / t.refreshInterval),
				e = (t.to - t.from) / a,
				n = this,
				o = c(this),
				i = 0,
				s = t.from,
				r = o.data("countTo") || {};

			function l(a) {
				var e = t.formatter.call(n, a, t);
				o.text(e)
			}
			o.data("countTo", r), r.interval && clearInterval(r.interval), r.interval = setInterval(function() {
				i++, l(s += e), "function" == typeof t.onUpdate && t.onUpdate.call(n, s), a <= i && (o.removeData("countTo"), clearInterval(r.interval), s = t.to, "function" == typeof t.onComplete && t.onComplete.call(n, s))
			}, t.refreshInterval), l(s)
		})
	}, c.fn.countTo.defaults = {
		from: 0,
		to: 0,
		speed: 1e3,
		refreshInterval: 100,
		decimals: 0,
		formatter: function(a, e) {
			return a.toFixed(e.decimals)
		},
		onUpdate: null,
		onComplete: null
	}
}(jQuery);
var map, lat, lng, CountTo = function() {
		var a, e = ".milestone-count",
			t = $(e);
		t.length && (a = t, inView(e).on("enter", function() {
			a.hasClass("counting-finished") || a.countTo({
				formatter: function(a, e) {
					return a.toFixed(e.decimals)
				},
				onUpdate: function(a) {},
				onComplete: function(a) {
					$(this).addClass("counting-finished")
				}
			})
		}))
	}(),
	Datepicker = function() {
		var a = $('[data-toggle="date"]');
		a.length && a.each(function() {
			$(this).datepicker({
				isableTouchKeyboard: !0,
				autoclose: !1
			})
		})
	}(),
	Dropdown = function() {
		var e = $(".dropdown");
		e.length && e.on({
			"hide.bs.dropdown": function() {
				var a;
				(a = e).hasClass("dropdown-animate") && (a.find(".dropdown-menu").addClass("hide"), setTimeout(function() {
					a.removeClass("hide")
				}, 300))
			}
		})
	}(),
	TextareaAutosize = function() {
		var a = $(".textarea-autosize");
		a.length && autosize(a)
	}(),
	CustomInputFile = function() {
		var a = $(".custom-input-file");
		a.length && a.each(function() {
			var s = $(this);
			s.on("change", function(a) {
				var e, t, n, o, i;
				e = this, t = a, o = s.next("label"), i = o.html(), e && 1 < e.files.length ? n = (e.getAttribute("data-multiple-caption") || "").replace("{count}", e.files.length) : t.target.value && (n = t.target.value.split("\\").pop()), n ? o.find("span").html(n) : o.html(i)
			}), s.on("focus", function() {
				s.addClass("has-focus")
			}).on("blur", function() {
				s.removeClass("has-focus")
			})
		})
	}(),
	$map = $("#map-canvas"),
	color = "#510FA8";

function initMap() {
	map = document.getElementById("map-canvas"), lat = map.getAttribute("data-lat"), lng = map.getAttribute("data-lng");
	var a = new google.maps.LatLng(lat, lng),
		e = {
			zoom: 14,
			scrollwheel: !1,
			center: a,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: [{
				featureType: "administrative",
				elementType: "labels.text.fill",
				stylers: [{
					color: "#444444"
				}]
			}, {
				featureType: "landscape",
				elementType: "all",
				stylers: [{
					color: "#f2f2f2"
				}]
			}, {
				featureType: "poi",
				elementType: "all",
				stylers: [{
					visibility: "off"
				}]
			}, {
				featureType: "road",
				elementType: "all",
				stylers: [{
					saturation: -100
				}, {
					lightness: 45
				}]
			}, {
				featureType: "road.highway",
				elementType: "all",
				stylers: [{
					visibility: "simplified"
				}]
			}, {
				featureType: "road.arterial",
				elementType: "labels.icon",
				stylers: [{
					visibility: "off"
				}]
			}, {
				featureType: "transit",
				elementType: "all",
				stylers: [{
					visibility: "off"
				}]
			}, {
				featureType: "water",
				elementType: "all",
				stylers: [{
					color: color
				}, {
					visibility: "on"
				}]
			}]
		};
	map = new google.maps.Map(document.getElementById("map-canvas"), e);
	var t = new google.maps.Marker({
		position: a,
		map: map,
		animation: google.maps.Animation.DROP,
		title: "Hello World!"
	}),
		n = new google.maps.InfoWindow({
			content: '<div class="info-window-content"><h5>Webpixels</h5><h6>Premium Themes · UI/UX · Web Apps</h6><p>Some more details for directions or company informations...</p></div>'
		});
	google.maps.event.addListener(t, "click", function() {
		n.open(map, t)
	})
}
$map.length && google.maps.event.addDomListener(window, "load", initMap);
var Highlight = function() {
		var a = $(".highlight");
		a.length && a.each(function(a, e) {
			var t;
			t = e, hljs.highlightBlock(t)
		})
	}(),
	Layout = void $("body").on("click", "[data-action]", function(a) {
		a.preventDefault();
		var e = $(this),
			t = e.data("action"),
			n = e.data("target");
		switch (t) {
		case "offcanvas-open":
			n = e.data("target"), $(n).addClass("open"), $("body").append('<div class="body-backdrop" data-action="offcanvas-close" data-target=' + n + " />");
			break;
		case "offcanvas-close":
			n = e.data("target"), $(n).removeClass("open"), $("body").find(".body-backdrop").remove();
			break;
		case "aside-open":
			n = e.data("target"), e.addClass("active"), $(n).addClass("show"), $("body").append('<div class="body-backdrop" data-action="aside-close" data-target=' + n + " />");
			break;
		case "aside-close":
			n = e.data("target"), e.removeClass("active"), $(n).removeClass("show"), $("body").find(".body-backdrop").remove();
			break;
		case "search-open":
			n = e.data("target"), e.addClass("active"), $(n).addClass("show"), $("body").addClass("navbar-search-open").append('<div class="body-backdrop body-backdrop-dark" data-action="search-close" data-target="' + n + '" />');
			break;
		case "search-close":
			n = e.data("target"), $('[data-action="search-open"]').removeClass("active"), $(n).removeClass("show"), $("body").removeClass("navbar-search-open").find(".body-backdrop").remove()
		}
	}),
	Masonry = function() {
		var a = $(".masonry-container");
		a.length && a.each(function() {
			var a, e, t, n, o, i;
			a = $(this), e = a.find(".masonry"), t = a.find(".masonry-filter-menu"), n = t.find(".default"), o = n.data("filter"), i = e.imagesLoaded(function() {
				null != o && "" != o && ("*" != o && (o = "." + o), n.addClass("active"));
				var a = {
					itemSelector: ".masonry-item",
					filter: o
				};
				i.isotope(a)
			}), t.on("click", "a", function() {
				var a = $(this).attr("data-filter");
				a = "*" == a ? "" : "." + a, i.isotope({
					filter: filterValue
				})
			})
		})
	}(),
	NavbarCollapse = function() {
		var a = $("#navbar-main"),
			e = $("#navbar-main-collapse"),
			t = $("#navbar-top-main");
		e.length && (e.on({
			"show.bs.collapse": function() {
				a.addClass("navbar-collapsed"), t.addClass("navbar-collapsed")
			}
		}), e.on({
			"hide.bs.collapse": function() {
				e.removeClass("collapsing").addClass("collapsing-out"), a.removeClass("navbar-collapsed").addClass("navbar-collapsed-out"), t.removeClass("navbar-collapsed").addClass("navbar-collapsed-out")
			}
		}), e.on({
			"hidden.bs.collapse": function() {
				e.removeClass("collapsing-out"), a.removeClass("navbar-collapsed-out"), t.removeClass("navbar-collapsed-out")
			}
		}))
	}(),
	NavbarSticky = function() {
		var a = $(".navbar-sticky");

		function e(a) {
			var e = $(window).scrollTop();
			t + 200 < e ? a.addClass("sticky") : a.removeClass("sticky")
		}
		if (a.length) {
			var t = a.offset().top;
			e(a), $(window).on({
				scroll: function() {
					e(a)
				}
			})
		}
	}(),
	NegativeMargin = function() {
		var a = $("[data-negative-margin]");
		$(window).on({
			"load resize": function() {
				a.length && a.each(function() {
					var a, e;
					a = $(this), e = a.find($(a.data("negative-margin"))).height(), console.log(e), 991 < $(window).width() ? a.css({
						"margin-top": "-" + e + "px"
					}) : a.css({
						"margin-top": "0"
					})
				})
			}
		})
	}(),
	SingleSlider = function() {
		var a = $(".input-slider-container");
		a.length && a.each(function() {
			var a, e, t, n, o, i, s, r, l, d, c;
			a = $(this), e = a.find(".input-slider"), t = e.attr("id"), n = e.data("range-value-min"), o = e.data("range-value-max"), i = a.find(".range-slider-value"), s = i.attr("id"), r = i.data("range-value-low"), l = document.getElementById(t), d = document.getElementById(s), c = {
				start: [parseInt(r)],
				connect: [!0, !1],
				range: {
					min: [parseInt(n)],
					max: [parseInt(o)]
				}
			}, noUiSlider.create(l, c), l.noUiSlider.on("update", function(a, e) {
				d.textContent = a[e]
			})
		})
	}(),
	RangeSlider = function() {
		var a = $("#input-slider-range");
		a.length && a.each(function() {
			var a, e, t, n;
			$(this), a = document.getElementById("input-slider-range"), e = document.getElementById("input-slider-range-value-low"), t = document.getElementById("input-slider-range-value-high"), n = [e, t], noUiSlider.create(a, {
				start: [parseInt(e.getAttribute("data-range-value-low")), parseInt(t.getAttribute("data-range-value-high"))],
				connect: !0,
				range: {
					min: parseInt(a.getAttribute("data-range-value-min")),
					max: parseInt(a.getAttribute("data-range-value-max"))
				}
			}), a.noUiSlider.on("update", function(a, e) {
				n[e].textContent = a[e]
			})
		})
	}(),
	Popover = function() {
		var a = $('[data-toggle="popover"]'),
			t = "";
		a.length && a.each(function() {
			!
			function(a) {
				a.data("color") && (t = "popover-" + a.data("color"));
				var e = {
					template: '<div class="popover ' + t + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
				};
				a.popover(e)
			}($(this))
		})
	}(),
	Pricing = function() {
		var a = $(".pricing-container"),
			e = $(".pricing-container button[data-pricing]");
		a.length && e.on({
			click: function() {
				!
				function(a) {
					a.data("pricing");
					var e = a.parents(".pricing-container"),
						t = $("." + e.attr("class") + " [data-pricing-value]");
					a.hasClass("active") || ($("." + e.attr("class") + " button[data-pricing]").removeClass("active"), a.addClass("active"), t.each(function() {
						var a = $(this).data("pricing-value"),
							e = $(this).find("span.price").text();
						$(this).find("span.price").text(a), $(this).data("pricing-value", e)
					}))
				}($(this))
			}
		})
	}(),
	Scrollbar = function() {
		var a = $(".scrollbar-inner");
		a.length && a.scrollbar().scrollLock()
	}(),
	ScrollTo = function() {
		var a = $(".scroll-me, [data-scroll-to], .toc-entry a");
		a.length && a.on("click", function(a) {
			var e, t, n, o;
			e = $(this), t = e.attr("href"), n = e.data("scroll-to-offset") ? e.data("scroll-to-offset") : 0, o = {
				scrollTop: $(t).offset().top - n
			}, $("html, body").stop(!0, !0).animate(o, 600), event.preventDefault()
		})
	}(),
	Select = function() {
		var a = $('[data-toggle="select"]');

		function t(a) {
			if (!a.id) return a.text;
			var e = $(a.element).data("avatar-src");
			return e ? $('<span class="avatar avatar-xs mr-3"><img class="avatar-img rounded-circle" src="' + e + '" alt="' + a.text + '"></span><span>' + a.text + "</span>") : a.text
		}
		a.length && a.each(function() {
			var a, e;
			a = $(this), e = {
				dropdownParent: a.closest(".modal").length ? a.closest(".modal") : $(document.body),
				minimumResultsForSearch: a.data("minimum-results-for-search"),
				templateResult: t
			}, a.select2(e)
		})
	}(),
	Spotlight = function() {
		var a = $(".spotlight");
		$(window).on({
			"load resize": function() {
				a.length && a.each(function() {
					!
					function(a) {
						var e;
						if ("fullscreen" == a.data("spotlight")) {
							if (a.data("spotlight-offset")) {
								var t = $("body").find(a.data("spotlight-offset")).height();
								e = $(window).height() - t
							} else e = $(window).height();
							991 < $(window).width() ? a.find(".spotlight-holder").css({
								height: e + "px"
							}) : a.find(".spotlight-holder").css({
								height: "auto"
							})
						}
					}($(this))
				})
			}
		})
	}(),
	Sticky = function() {
		var a = $('[data-toggle="sticky"]');
		a.length && a.each(function() {
			var a, e;
			a = $(this), e = {
				offset_top: a.data("sticky-offset") ? a.data("sticky-offset") : 0
			}, a.stick_in_parent(e)
		})
	}(),
	WpxSwiper = function() {
		var a = $(".swiper-js-container");
		$(document).ready(function() {
			a.length && a.each(function(a, e) {
				!
				function(a) {
					var e = a.find(".swiper-container"),
						t = a.find(".swiper-pagination"),
						n = a.find(".swiper-button-next"),
						o = a.find(".swiper-button-prev"),
						i = e.data("swiper-effect") ? e.data("swiper-effect") : "slide",
						s = e.data("swiper-direction") ? e.data("swiper-direction") : "horizontal",
						r = e.data("swiper-initial-slide") ? e.data("swiper-initial-slide") : 0,
						l = !! e.data("swiper-autoheight") && e.data("swiper-autoheight"),
						d = !! e.data("swiper-autoplay") && e.data("swiper-autoplay"),
						c = !! e.data("swiper-centered-slides") && e.data("swiper-centered-slides"),
						p = e.data("swiper-items"),
						u = e.data("swiper-sm-items"),
						f = e.data("swiper-md-items"),
						g = e.data("swiper-lg-items"),
						h = e.data("swiper-xl-items"),
						v = e.data("swiper-space-between"),
						m = e.data("swiper-sm-space-between"),
						w = e.data("swiper-md-space-between"),
						b = e.data("swiper-lg-space-between"),
						y = e.data("swiper-xl-space-between");
					p = p || 1, u = u || p, f = f || u, g = g || f, h = h || g, v = v || 0, m = m || v, w = w || m, b = b || w, y = y || b;
					var $ = new Swiper(e, {
						pagination: {
							el: t,
							clickable: !0
						},
						navigation: {
							nextEl: n,
							prevEl: o
						},
						slidesPerView: p,
						spaceBetween: v,
						initialSlide: r,
						autoHeight: l,
						centeredSlides: c,
						mousewheel: !1,
						keyboard: {
							enabled: !0,
							onlyInViewport: !1
						},
						grabCursor: !0,
						autoplay: d,
						effect: i,
						coverflowEffect: {
							rotate: 10,
							stretch: 0,
							depth: 50,
							modifier: 3,
							slideShadows: !1
						},
						speed: 800,
						direction: s,
						preventClicks: !0,
						preventClicksPropagation: !0,
						observer: !0,
						observeParents: !0,
						breakpointsInverse: !0,
						breakpoints: {
							575: {
								slidesPerView: u,
								spaceBetweenSlides: m
							},
							767: {
								slidesPerView: f,
								spaceBetweenSlides: w
							},
							991: {
								slidesPerView: g,
								spaceBetweenSlides: b
							},
							1199: {
								slidesPerView: h,
								spaceBetweenSlides: y
							}
						}
					});
					console.log($.params)
				}($(e))
			})
		})
	}(),
	Tags = function() {
		var a = $('[data-toggle="tags"]');
		a.length && a.each(function() {
			$(this).tagsinput({
				tagClass: "badge badge-primary"
			})
		})
	}(),
	Tooltip = function() {
		var a = $('[data-toggle="tooltip"]');
		a.length && a.tooltip()
	}(),
	Typed = function() {
		var a = $(".typed");
		a.length && a.each(function() {
			var a, e, t, n;
			a = $(this), e = "#" + a.attr("id"), t = (t = a.data("type-this")).split(","), n = new Typed(e, {
				strings: t,
				typeSpeed: 100,
				backSpeed: 70,
				loop: !0
			}), inView(e).on("enter", function() {
				n.start()
			}).on("exit", function() {
				n.stop()
			})
		})
	}(),
	Wavify = function() {
		var a = $('[data-toggle="wavify"]');
		a.length && a.each(function() {
			$(this).find("path").wavify({
				height: 50,
				bones: 5,
				amplitude: 40,
				speed: .15
			})
		})
	}();
