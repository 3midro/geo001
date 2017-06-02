/**
 * Framework7 1.6.0
 * Full featured mobile HTML framework for building iOS & Android apps
 * 
 * http://framework7.io/
 * 
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: April 10, 2017
 */
(function () {

    'use strict';
    /*===========================
    Framework 7
    ===========================*/
    window.Framework7 = function (params) {
        // App
        var app = this;
    
        // Version
        app.version = '1.6.0';
    
        // Default Parameters
        app.params = {
            //
            root: 'body',
            //
            cache: true,
            cacheIgnore: [],
            cacheIgnoreGetParameters: false,
            cacheDuration: 1000 * 60 * 10, // Ten minutes
            preloadPreviousPage: true,
            uniqueHistory: false,
            uniqueHistoryIgnoreGetParameters: false,
            dynamicPageUrl: 'content-{{index}}',
            allowDuplicateUrls: false,
            router: true,
            routerRemoveTimeout: false,
            routerRemoveWithTimeout: false,
            // Push State
            pushState: false,
            pushStateRoot: undefined,
            pushStateNoAnimation: false,
            pushStateSeparator: '#!/',
            pushStateOnLoad: true,
            // Fast clicks
            fastClicks: true,
            fastClicksDistanceThreshold: 10,
            fastClicksDelayBetweenClicks: 50,
            fastClicksExclude: '', // CSS selector
            // Tap Hold
            tapHold: false,
            tapHoldDelay: 750,
            tapHoldPreventClicks: true,
            // Active State
            activeState: true,
            activeStateElements: 'a, button, label, span',
            // Animate Nav Back Icon
            animateNavBackIcon: false,
            // Swipe Back
            swipeBackPage: true,
            swipeBackPageThreshold: 0,
            swipeBackPageActiveArea: 30,
            swipeBackPageAnimateShadow: true,
            swipeBackPageAnimateOpacity: true,
            // Ajax
            ajaxLinks: undefined, // or CSS selector
            // External Links
            externalLinks: '.external', // CSS selector
            // Sortable
            sortable: true,
            // Scroll toolbars
            hideNavbarOnPageScroll: false,
            hideToolbarOnPageScroll: false,
            hideTabbarOnPageScroll: false,
            showBarsOnPageScrollEnd: true,
            showBarsOnPageScrollTop: true,
            // Swipeout
            swipeout: true,
            swipeoutActionsNoFold: false,
            swipeoutNoFollow: false,
            swipeoutRemoveWithTimeout: false,
            // Smart Select Back link template
            smartSelectOpenIn: 'page', // or 'popup' or 'picker'
            smartSelectBackText: 'Back',
            smartSelectPopupCloseText: 'Close',
            smartSelectPickerCloseText: 'Done',
            smartSelectSearchbar: false,
            smartSelectBackOnSelect: false,
            // Tap Navbar or Statusbar to scroll to top
            scrollTopOnNavbarClick: false,
            scrollTopOnStatusbarClick: false,
            // Panels
            panelLeftBreakpoint: null,
            panelRightBreakpoint: null,
            swipePanel: false, // or 'left' or 'right'
            swipePanelActiveArea: 0,
            swipePanelCloseOpposite: true,
            swipePanelOnlyClose: false,
            swipePanelNoFollow: false,
            swipePanelThreshold: 0,
            panelsCloseByOutside: true,
            // Modals
            modalButtonOk: 'OK',
            modalButtonCancel: 'Cancel',
            modalUsernamePlaceholder: 'Username',
            modalPasswordPlaceholder: 'Password',
            modalTitle: 'Framework7',
            modalCloseByOutside: false,
            actionsCloseByOutside: true,
            popupCloseByOutside: true,
            popoverCloseByOutside: true,
            modalPreloaderTitle: 'Loading... ',
            modalStack: true,
            modalsMoveToRoot: true,
            // Lazy Load
            imagesLazyLoadThreshold: 0,
            imagesLazyLoadSequential: true,
            // Name space
            viewClass: 'view',
            viewMainClass: 'view-main',
            viewsClass: 'views',
            // Notifications defaults
            notificationCloseOnClick: false,
            notificationCloseIcon: true,
            notificationCloseButtonText: 'Close',
            // Animate Pages
            animatePages: true,
            // Template7
            templates: {},
            template7Data: {},
            template7Pages: false,
            precompileTemplates: false,
            // Material
            material: false,
            materialPageLoadDelay: 0,
            materialPreloaderSvg: '<svg xmlns="http://www.w3.org/2000/svg" height="75" width="75" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg>',
            materialPreloaderHtml:
                '<span class="preloader-inner">' +
                    '<span class="preloader-inner-gap"></span>' +
                    '<span class="preloader-inner-left">' +
                        '<span class="preloader-inner-half-circle"></span>' +
                    '</span>' +
                    '<span class="preloader-inner-right">' +
                        '<span class="preloader-inner-half-circle"></span>' +
                    '</span>' +
                '</span>',
            materialRipple: true,
            materialRippleElements: '.ripple, a.link, a.item-link, .button, .modal-button, .tab-link, .label-radio, .label-checkbox, .actions-modal-button, a.searchbar-clear, a.floating-button, .floating-button > a, .speed-dial-buttons a, .form-checkbox, .form-radio, .data-table .sortable-cell',
            // Auto init
            init: true,
        };
    
        // Extend defaults with parameters
        for (var param in params) {
            app.params[param] = params[param];
        }
    
        // DOM lib
        var $ = Dom7;
    
        // Template7 lib
        var t7 = Template7;
        app._compiledTemplates = {};
    
        // App Root
        app.root = $(app.params.root);
        app.root.eq(0).addClass('framework7-root');
    
        // Touch events
        app.touchEvents = {
            start: app.support.touch ? 'touchstart' : 'mousedown',
            move: app.support.touch ? 'touchmove' : 'mousemove',
            end: app.support.touch ? 'touchend' : 'mouseup'
        };
    
        // Link to local storage
        app.ls = window.localStorage;
    
        // RTL
        app.rtl = $('body').css('direction') === 'rtl';
        if (app.rtl) $('html').attr('dir', 'rtl');
    
        // Overwrite statusbar overlay
        if (typeof app.params.statusbarOverlay !== 'undefined') {
            if (app.params.statusbarOverlay) $('html').addClass('with-statusbar-overlay');
            else $('html').removeClass('with-statusbar-overlay');
        }
        else if (app.device.ios && (window.cordova || window.phonegap)) {
            $(document).on('resume', function () {
                if (app.device.needsStatusBar()) {
                    $('html').addClass('with-statusbar-overlay');
                }
            }, false);
        }
    

        /*======================================================
        ************   Views   ************
        ======================================================*/
        app.views = [];
        var View = function (selector, params) {
            var defaults = {
                dynamicNavbar: false,
                domCache: false,
                linksView: undefined,
                reloadPages: false,
                uniqueHistory: app.params.uniqueHistory,
                uniqueHistoryIgnoreGetParameters: app.params.uniqueHistoryIgnoreGetParameters,
                allowDuplicateUrls: app.params.allowDuplicateUrls,
                swipeBackPage: app.params.swipeBackPage,
                swipeBackPageAnimateShadow: app.params.swipeBackPageAnimateShadow,
                swipeBackPageAnimateOpacity: app.params.swipeBackPageAnimateOpacity,
                swipeBackPageActiveArea: app.params.swipeBackPageActiveArea,
                swipeBackPageThreshold: app.params.swipeBackPageThreshold,
                animatePages: app.params.animatePages,
                preloadPreviousPage: app.params.preloadPreviousPage
            };
            var i;
        
            // Params
            params = params || {};
        
            // Disable dynamic navbar for material theme
            if (params.dynamicNavbar && app.params.material) params.dynamicNavbar = false;
        
            // Extend params with defaults
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            // View
            var view = this;
            view.params = params;
        
            // Selector
            view.selector = selector;
        
            // Container
            var container = $(selector);
            view.container = container[0];
        
            // Fix Selector
        
            if (typeof selector !== 'string') {
                // Supposed to be HTMLElement or Dom7
                selector = (container.attr('id') ? '#' + container.attr('id') : '') + (container.attr('class') ? '.' + container.attr('class').replace(/ /g, '.').replace('.active', '') : '');
                view.selector = selector;
            }
        
            // Is main
            view.main = container.hasClass(app.params.viewMainClass);
        
            // Content cache
            view.contentCache = {};
        
            // Context cache
            view.contextCache = {};
        
            // Pages cache
            view.pagesCache = {};
            view.pageElementsCache = {};
        
            // Store View in element for easy access
            container[0].f7View = view;
        
            // Pages
            view.pagesContainer = container.find('.pages')[0];
            view.initialPages = [];
            view.initialPagesUrl = [];
            view.initialNavbars = [];
            if (view.params.domCache) {
                var initialPages = container.find('.page');
                for (i = 0; i < initialPages.length; i++) {
                    view.initialPages.push(initialPages[i]);
                    view.initialPagesUrl.push('#' + initialPages.eq(i).attr('data-page'));
                }
                if (view.params.dynamicNavbar) {
                    var initialNavbars = container.find('.navbar-inner');
                    for (i = 0; i < initialNavbars.length; i++) {
                        view.initialNavbars.push(initialNavbars[i]);
                    }
                }
        
            }
        
            view.allowPageChange = true;
        
            // Location
            var docLocation = document.location.href;
        
            // History
            view.history = [];
            var viewURL = docLocation;
            var pushStateSeparator = app.params.pushStateSeparator;
            var pushStateRoot = app.params.pushStateRoot;
            if (app.params.pushState && view.main) {
                if (pushStateRoot) {
                    viewURL = pushStateRoot;
                }
                else {
                    if (pushStateSeparator && viewURL.indexOf(pushStateSeparator) >= 0 && viewURL.indexOf(pushStateSeparator + '#') < 0) viewURL = viewURL.split(pushStateSeparator)[0];
                }
        
            }
        
            // Active Page
            var currentPage, currentPageData;
            if (!view.activePage) {
                currentPage = $(view.pagesContainer).find('.page-on-center');
                if (currentPage.length === 0) {
                    currentPage = $(view.pagesContainer).find('.page:not(.cached)');
                    currentPage = currentPage.eq(currentPage.length - 1);
                }
                if (currentPage.length > 0) {
                    currentPageData = currentPage[0].f7PageData;
                }
            }
        
            // View startup URL
            if (view.params.domCache && currentPage) {
                view.url = container.attr('data-url') || view.params.url || '#' + currentPage.attr('data-page');   
                view.pagesCache[view.url] = currentPage.attr('data-page');
            }
            else view.url = container.attr('data-url') || view.params.url || viewURL;
        
            // Update current page Data
            if (currentPageData) {
                currentPageData.view = view;
                currentPageData.url = view.url;
                if (view.params.domCache && view.params.dynamicNavbar && !currentPageData.navbarInnerContainer) {
                    currentPageData.navbarInnerContainer = view.initialNavbars[view.initialPages.indexOf(currentPageData.container)];
                }
                view.activePage = currentPageData;
                currentPage[0].f7PageData = currentPageData;
            }
        
            // Store to history main view's url
            if (view.url) {
                view.history.push(view.url);
            }
        
            // Touch events
            var isTouched = false,
                isMoved = false,
                touchesStart = {},
                isScrolling,
                activePage = [],
                previousPage = [],
                viewContainerWidth,
                touchesDiff,
                allowViewTouchMove = true,
                touchStartTime,
                activeNavbar = [],
                previousNavbar = [],
                activeNavElements,
                previousNavElements,
                activeNavBackIcon,
                previousNavBackIcon,
                dynamicNavbar,
                pageShadow,
                el;
        
            view.handleTouchStart = function (e) {
                if (!allowViewTouchMove || !view.params.swipeBackPage || isTouched || app.swipeoutOpenedEl || !view.allowPageChange) return;
                isMoved = false;
                isTouched = true;
                isScrolling = undefined;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = (new Date()).getTime();
                dynamicNavbar = view.params.dynamicNavbar && container.find('.navbar-inner').length > 1;
            };
        
            view.handleTouchMove = function (e) {
                if (!isTouched) return;
                var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (isScrolling || e.f7PreventSwipeBack || app.preventSwipeBack) {
                    isTouched = false;
                    return;
                }
                if (!isMoved) {
                    var cancel = false;
                    // Calc values during first move fired
                    viewContainerWidth = container.width();
                    var target = $(e.target);
                    var swipeout = target.hasClass('swipeout') ? target : target.parents('.swipeout');
                    if (swipeout.length > 0) {
                        if (!app.rtl && swipeout.find('.swipeout-actions-left').length > 0) cancel = true;
                        if (app.rtl && swipeout.find('.swipeout-actions-right').length > 0) cancel = true;
                    }
                    activePage = target.is('.page') ? target : target.parents('.page');
                    if (activePage.hasClass('no-swipeback')) cancel = true;
                    previousPage = container.find('.page-on-left:not(.cached)');
                    var notFromBorder = touchesStart.x - container.offset().left > view.params.swipeBackPageActiveArea;
                    if (app.rtl) {
                        notFromBorder = touchesStart.x < container.offset().left - container[0].scrollLeft + viewContainerWidth - view.params.swipeBackPageActiveArea;
                    }
                    else {
                        notFromBorder = touchesStart.x - container.offset().left > view.params.swipeBackPageActiveArea;
                    }
                    if (notFromBorder) cancel = true;
                    if (previousPage.length === 0 || activePage.length === 0) cancel = true;
                    if (cancel) {
                        isTouched = false;
                        return;
                    }
        
                    if (view.params.swipeBackPageAnimateShadow && !app.device.android) {
                        pageShadow = activePage.find('.swipeback-page-shadow');
                        if (pageShadow.length === 0) {
                            pageShadow = $('<div class="swipeback-page-shadow"></div>');
                            activePage.append(pageShadow);
                        }
                    }
        
                    if (dynamicNavbar) {
                        activeNavbar = container.find('.navbar-on-center:not(.cached)');
                        previousNavbar = container.find('.navbar-on-left:not(.cached)');
                        activeNavElements = activeNavbar.find('.left, .center, .right, .subnavbar, .fading');
                        previousNavElements = previousNavbar.find('.left, .center, .right, .subnavbar, .fading');
                        if (app.params.animateNavBackIcon) {
                            activeNavBackIcon = activeNavbar.find('.left.sliding .back .icon');
                            previousNavBackIcon = previousNavbar.find('.left.sliding .back .icon');
                        }
                    }
        
                    // Close/Hide Any Picker
                    if ($('.picker-modal.modal-in').length > 0) {
                        app.closeModal($('.picker-modal.modal-in'));
                    }
                }
                e.f7PreventPanelSwipe = true;
                isMoved = true;
                e.preventDefault();
        
                // RTL inverter
                var inverter = app.rtl ? -1 : 1;
        
                // Touches diff
                touchesDiff = (pageX - touchesStart.x - view.params.swipeBackPageThreshold) * inverter;
                if (touchesDiff < 0) touchesDiff = 0;
                var percentage = touchesDiff / viewContainerWidth;
        
                // Swipe Back Callback
                var callbackData = {
                    percentage: percentage,
                    activePage: activePage[0],
                    previousPage: previousPage[0],
                    activeNavbar: activeNavbar[0],
                    previousNavbar: previousNavbar[0]
                };
                if (view.params.onSwipeBackMove) {
                    view.params.onSwipeBackMove(callbackData);
                }
                container.trigger('swipeBackMove swipeback:move', callbackData);
        
                // Transform pages
                var activePageTranslate = touchesDiff * inverter;
                var previousPageTranslate = (touchesDiff / 5 - viewContainerWidth / 5) * inverter;
                if (app.device.pixelRatio === 1) {
                    activePageTranslate = Math.round(activePageTranslate);
                    previousPageTranslate = Math.round(previousPageTranslate);
                }
        
                activePage.transform('translate3d(' + activePageTranslate + 'px,0,0)');
                if (view.params.swipeBackPageAnimateShadow && !app.device.android) pageShadow[0].style.opacity = 1 - 1 * percentage;
        
                previousPage.transform('translate3d(' + previousPageTranslate + 'px,0,0)');
                if (view.params.swipeBackPageAnimateOpacity) previousPage[0].style.opacity = 0.9 + 0.1 * percentage;
        
                // Dynamic Navbars Animation
                if (dynamicNavbar) {
                    var i;
                    for (i = 0; i < activeNavElements.length; i++) {
                        el = $(activeNavElements[i]);
                        if (!el.is('.subnavbar.sliding')) el[0].style.opacity = (1 - percentage * 1.3);
                        if (el[0].className.indexOf('sliding') >= 0) {
                            var activeNavTranslate = percentage * el[0].f7NavbarRightOffset;
                            if (app.device.pixelRatio === 1) activeNavTranslate = Math.round(activeNavTranslate);
                            el.transform('translate3d(' + activeNavTranslate + 'px,0,0)');
                            if (app.params.animateNavBackIcon) {
                                if (el[0].className.indexOf('left') >= 0 && activeNavBackIcon.length > 0) {
                                    activeNavBackIcon.transform('translate3d(' + -activeNavTranslate + 'px,0,0)');
                                }
                            }
                        }
                    }
                    for (i = 0; i < previousNavElements.length; i++) {
                        el = $(previousNavElements[i]);
                        if (!el.is('.subnavbar.sliding')) el[0].style.opacity = percentage * 1.3 - 0.3;
                        if (el[0].className.indexOf('sliding') >= 0) {
                            var previousNavTranslate = el[0].f7NavbarLeftOffset * (1 - percentage);
                            if (app.device.pixelRatio === 1) previousNavTranslate = Math.round(previousNavTranslate);
                            el.transform('translate3d(' + previousNavTranslate + 'px,0,0)');
                            if (app.params.animateNavBackIcon) {
                                if (el[0].className.indexOf('left') >= 0 && previousNavBackIcon.length > 0) {
                                    previousNavBackIcon.transform('translate3d(' + -previousNavTranslate + 'px,0,0)');
                                }
                            }
                        }
                    }
                }
            };
        
            view.handleTouchEnd = function (e) {
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                isTouched = false;
                isMoved = false;
                if (touchesDiff === 0) {
                    $([activePage[0], previousPage[0]]).transform('').css({opacity: '', boxShadow: ''});
                    if (dynamicNavbar) {
                        activeNavElements.transform('').css({opacity: ''});
                        previousNavElements.transform('').css({opacity: ''});
                        if (activeNavBackIcon && activeNavBackIcon.length > 0) activeNavBackIcon.transform('');
                        if (previousNavBackIcon && activeNavBackIcon.length > 0) previousNavBackIcon.transform('');
                    }
                    return;
                }
                var timeDiff = (new Date()).getTime() - touchStartTime;
                var pageChanged = false;
                // Swipe back to previous page
                if (
                        timeDiff < 300 && touchesDiff > 10 ||
                        timeDiff >= 300 && touchesDiff > viewContainerWidth / 2
                    ) {
                    activePage.removeClass('page-on-center').addClass('page-on-right');
                    previousPage.removeClass('page-on-left').addClass('page-on-center');
                    if (dynamicNavbar) {
                        activeNavbar.removeClass('navbar-on-center').addClass('navbar-on-right');
                        previousNavbar.removeClass('navbar-on-left').addClass('navbar-on-center');
                    }
                    pageChanged = true;
                }
                // Reset custom styles
                // Add transitioning class for transition-duration
                $([activePage[0], previousPage[0]]).transform('').css({opacity: '', boxShadow: ''}).addClass('page-transitioning');
                if (dynamicNavbar) {
                    activeNavElements.css({opacity: ''})
                    .each(function () {
                        var translate = pageChanged ? this.f7NavbarRightOffset : 0;
                        var sliding = $(this);
                        sliding.transform('translate3d(' + translate + 'px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && activeNavBackIcon.length > 0) {
                                activeNavBackIcon.addClass('page-transitioning').transform('translate3d(' + -translate + 'px,0,0)');
                            }
                        }
        
                    }).addClass('page-transitioning');
        
                    previousNavElements.transform('').css({opacity: ''}).each(function () {
                        var translate = pageChanged ? 0 : this.f7NavbarLeftOffset;
                        var sliding = $(this);
                        sliding.transform('translate3d(' + translate + 'px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && previousNavBackIcon.length > 0) {
                                previousNavBackIcon.addClass('page-transitioning').transform('translate3d(' + -translate + 'px,0,0)');
                            }
                        }
                    }).addClass('page-transitioning');
                }
                allowViewTouchMove = false;
                view.allowPageChange = false;
                // Swipe Back Callback
                var callbackData = {
                    activePage: activePage[0],
                    previousPage: previousPage[0],
                    activeNavbar: activeNavbar[0],
                    previousNavbar: previousNavbar[0]
                };
                if (pageChanged) {
                    // Update View's URL
                    var url = view.history[view.history.length - 2];
                    view.url = url;
        
                    // Page before animation callback
                    app.pageBackCallback('before', view, {pageContainer: activePage[0], url: url, position: 'center', newPage: previousPage, oldPage: activePage, swipeBack: true});
                    app.pageAnimCallback('before', view, {pageContainer: previousPage[0], url: url, position: 'left', newPage: previousPage, oldPage: activePage, swipeBack: true});
        
                    if (view.params.onSwipeBackBeforeChange) {
                        view.params.onSwipeBackBeforeChange(callbackData);
                    }
                    container.trigger('swipeBackBeforeChange swipeback:beforechange', callbackData);
                }
                else {
                    if (view.params.onSwipeBackBeforeReset) {
                        view.params.onSwipeBackBeforeReset(callbackData);
                    }
                    container.trigger('swipeBackBeforeReset swipeback:beforereset', callbackData);
                }
        
                activePage.transitionEnd(function () {
                    $([activePage[0], previousPage[0]]).removeClass('page-transitioning');
                    if (dynamicNavbar) {
                        activeNavElements.removeClass('page-transitioning').css({opacity: ''});
                        previousNavElements.removeClass('page-transitioning').css({opacity: ''});
                        if (activeNavBackIcon && activeNavBackIcon.length > 0) activeNavBackIcon.removeClass('page-transitioning');
                        if (previousNavBackIcon && previousNavBackIcon.length > 0) previousNavBackIcon.removeClass('page-transitioning');
                    }
                    allowViewTouchMove = true;
                    view.allowPageChange = true;
                    if (pageChanged) {
                        if (app.params.pushState && view.main) history.back();
                        // Page after animation callback
                        app.pageBackCallback('after', view, {pageContainer: activePage[0], url: url, position: 'center', newPage: previousPage, oldPage: activePage, swipeBack: true});
                        app.pageAnimCallback('after', view, {pageContainer: previousPage[0], url: url, position: 'left', newPage: previousPage, oldPage: activePage, swipeBack: true});
                        app.router.afterBack(view, activePage, previousPage);
        
                        if (view.params.onSwipeBackAfterChange) {
                            view.params.onSwipeBackAfterChange(callbackData);
                        }
                        container.trigger('swipeBackAfterChange swipeback:afterchange', callbackData);
                    }
                    else {
                        if (view.params.onSwipeBackAfterReset) {
                            view.params.onSwipeBackAfterReset(callbackData);
                        }
                        container.trigger('swipeBackAfterReset swipeback:afterreset', callbackData);
                    }
                    if (pageShadow && pageShadow.length > 0) pageShadow.remove();
                });
            };
            view.attachEvents = function (detach) {
                var action = detach ? 'off' : 'on';
                var passiveListener = app.touchEvents.start === 'touchstart' && app.support.passiveListener ? {passive: true, capture: false} : false;
                var activeListener = app.support.passiveListener ? {passive: false, capture: false} : false;
                container[action](app.touchEvents.start, view.handleTouchStart, passiveListener);
                container[action](app.touchEvents.move, view.handleTouchMove, activeListener);
                container[action](app.touchEvents.end, view.handleTouchEnd, passiveListener);
            };
            view.detachEvents = function () {
                view.attachEvents(true);
            };
        
            // Init
            if (view.params.swipeBackPage && !app.params.material) {
                view.attachEvents();
            }
        
            // Check view name to delete unwanted characters
            if (view.params.name) view.params.name = view.params.name.replace(/[^a-zA-Z]/g, '');
          
            // Add view to app
            app.views.push(view);
            if (view.main) {
                app.mainView = view;
                app.views.main = view;
            }
            else if(view.params.name) {
                app[view.params.name + 'View'] = view;
                app.views[view.params.name] = view;
            }
        
            // Router
            view.router = {
                load: function (options) {
                    return app.router.load(view, options);
                },
                back: function (options) {
                    return app.router.back(view, options);
                },
                // Shortcuts
                loadPage: function (options) {
                    options = options || {};
                    if (typeof options === 'string') {
                        var url = options;
                        options = {};
                        if (url && url.indexOf('#') === 0 && view.params.domCache) {
                            options.pageName = url.split('#')[1];
                        }
                        else options.url = url;
                    }
                    return app.router.load(view, options);
                },
                loadContent: function (content) {
                    return app.router.load(view, {content: content});
                },
                reloadPage: function (url) {
                    return app.router.load(view, {url: url, reload: true});
                },
                reloadContent: function (content) {
                    return app.router.load(view, {content: content, reload: true});
                },
                reloadPreviousPage: function (url) {
                    return app.router.load(view, {url: url, reloadPrevious: true, reload: true});
                },
                reloadPreviousContent: function (content) {
                    return app.router.load(view, {content: content, reloadPrevious: true, reload: true});
                },
                refreshPage: function () {
                    var options = {
                        url: view.url,
                        reload: true,
                        ignoreCache: true
                    };
                    if (options.url && options.url.indexOf('#') === 0) {
                        if (view.params.domCache && view.pagesCache[options.url]) {
                            options.pageName = view.pagesCache[options.url];
                            options.url = undefined;
                            delete options.url;
                        }
                        else if (view.contentCache[options.url]) {
                            options.content = view.contentCache[options.url];
                            options.url = undefined;
                            delete options.url;
                        }
                    }
                    return app.router.load(view, options);
                },
                refreshPreviousPage: function () {
                    var options = {
                        url: view.history[view.history.length - 2],
                        reload: true,
                        reloadPrevious: true,
                        ignoreCache: true
                    };
                    if (options.url && options.url.indexOf('#') === 0 && view.params.domCache && view.pagesCache[options.url]) {
                        options.pageName = view.pagesCache[options.url];
                        options.url = undefined;
                        delete options.url;
                    }
                    return app.router.load(view, options);
                }
            };
        
            // Aliases for temporary backward compatibility
            view.loadPage = view.router.loadPage;
            view.loadContent = view.router.loadContent;
            view.reloadPage = view.router.reloadPage;
            view.reloadContent = view.router.reloadContent;
            view.reloadPreviousPage = view.router.reloadPreviousPage;
            view.reloadPreviousContent = view.router.reloadPreviousContent;
            view.refreshPage = view.router.refreshPage;
            view.refreshPreviousPage = view.router.refreshPreviousPage;
            view.back = view.router.back;
        
            // Bars methods
            view.hideNavbar = function (animated) {
                return app.hideNavbar(container.find('.navbar'), animated);
            };
            view.showNavbar = function (animated) {
                return app.showNavbar(container.find('.navbar'), animated);
            };
            view.hideToolbar = function (animated) {
                return app.hideToolbar(container.find('.toolbar'), animated);
            };
            view.showToolbar = function (animated) {
                return app.showToolbar(container.find('.toolbar'), animated);
            };
        
            // Push State on load
            if (app.params.pushState && app.params.pushStateOnLoad && view.main) {
                var pushStateUrl;
                var pushStateUrlSplit = docLocation.split(pushStateSeparator)[1];
                if (pushStateRoot) {
                    pushStateUrl = docLocation.split(app.params.pushStateRoot + pushStateSeparator)[1];
                }
                else if (pushStateSeparator && docLocation.indexOf(pushStateSeparator) >= 0 && docLocation.indexOf(pushStateSeparator + '#') < 0) {
                    pushStateUrl = pushStateUrlSplit;
                }
                var pushStateAnimatePages = app.params.pushStateNoAnimation ? false : undefined;
                var historyState = history.state;
                if (pushStateUrl) {
                    if (pushStateUrl.indexOf('#') >= 0 && view.params.domCache && historyState && historyState.pageName && 'viewIndex' in historyState) {
                        app.router.load(view, {pageName: historyState.pageName, url: historyState.url, animatePages: pushStateAnimatePages, pushState: false});
                    }
                    else if (pushStateUrl.indexOf('#') >= 0 && view.params.domCache && view.initialPagesUrl.indexOf(pushStateUrl) >= 0) {
                        app.router.load(view, {pageName: pushStateUrl.replace('#',''), animatePages: pushStateAnimatePages, pushState: false});
                    }
                    else app.router.load(view, {url: pushStateUrl, animatePages: pushStateAnimatePages, pushState: false});
                }
                else if (view.params.domCache && docLocation.indexOf(pushStateSeparator + '#') >= 0) {
                    if (historyState && historyState.pageName && 'viewIndex' in historyState) {
                        app.router.load(view, {pageName: historyState.pageName, url: historyState.url, animatePages: pushStateAnimatePages, pushState: false});
                    }
                    else if (pushStateSeparator && pushStateUrlSplit.indexOf('#') === 0) {
                        if (view.initialPagesUrl.indexOf(pushStateUrlSplit)) {
                            app.router.load(view, {pageName: pushStateUrlSplit.replace('#', ''), animatePages: pushStateAnimatePages, pushState: false});
                        }
                    }
                }
            }
        
            // Destroy
            view.destroy = function () {
                view.detachEvents();
                if (view.main) {
                    app.mainView = null;
                    delete app.mainView;
                    app.views.main = null;
                    delete app.views.main;
                }
                else if(view.params.name) {
                    app[view.params.name + 'View'] = null;
                    delete app[view.params.name + 'View'];
                    app.views[view.params.name] = null;
                    delete app.views[view.params.name];
                }
                container.removeAttr('data-page');
                container[0].f7View = null;
                delete container[0].f7View;
                
                app.views.splice(app.views.indexOf(view), 1);
        
                // Delete props & methods
                for (var prop in view) {
                    if (view.hasOwnProperty(prop)) {
                        view[prop] = null;
                        delete view[prop];
                    }
                }
                view = null;
            };
        
            // Plugin hook
            app.pluginHook('addView', view);
        
            // Return view
            return view;
        };
        
        app.addView = function (selector, params) {
            return new View(selector, params);
        };
        
        app.getCurrentView = function (index) {
            var popoverView = $('.popover.modal-in .view');
            var popupView = $('.popup.modal-in .view');
            var panelView = $('.panel.active .view');
            var appViews = $('.views');
            // Find active view as tab
            var appView = appViews.children('.view');
            // Propably in tabs or split view
            if (appView.length > 1) {
                if (appView.hasClass('tab')) {
                    // Tabs
                    appView = appViews.children('.view.active');
                }
                else {
                    // Split View, leave appView intact
                }
            }
            if (popoverView.length > 0 && popoverView[0].f7View) return popoverView[0].f7View;
            if (popupView.length > 0 && popupView[0].f7View) return popupView[0].f7View;
            if (panelView.length > 0 && panelView[0].f7View) return panelView[0].f7View;
            if (appView.length > 0) {
                if (appView.length === 1 && appView[0].f7View) return appView[0].f7View;
                if (appView.length > 1) {
                    var currentViews = [];
                    for (var i = 0; i < appView.length; i++) {
                        if (appView[i].f7View) currentViews.push(appView[i].f7View);
                    }
                    if (currentViews.length > 0 && typeof index !== 'undefined') return currentViews[index];
                    if (currentViews.length > 1) return currentViews;
                    if (currentViews.length === 1) return currentViews[0];
                    return undefined;
                }
            }
            return undefined;
        };
        

        /*======================================================
        ************   Navbars && Toolbars   ************
        ======================================================*/
        // On Navbar Init Callback
        app.navbarInitCallback = function (view, pageContainer, navbarContainer, navbarInnerContainer) {
            if (!navbarContainer && navbarInnerContainer) navbarContainer = $(navbarInnerContainer).parent('.navbar')[0];
            if (!navbarInnerContainer || navbarInnerContainer.f7NavbarInitialized && view && !view.params.domCache) return;
            var navbarData = {
                container: navbarContainer,
                innerContainer: navbarInnerContainer
            };
            var pageData = pageContainer && pageContainer.f7PageData;
        
            var eventData = {
                page: pageData,
                navbar: navbarData
            };
        
            if (navbarInnerContainer.f7NavbarInitialized && ((view && view.params.domCache) || (!view && $(navbarContainer).parents('.popup, .popover, .login-screen, .modal, .actions-modal, .picker-modal').length > 0))) {
                // Reinit Navbar
                app.reinitNavbar(navbarContainer, navbarInnerContainer);
        
                // Plugin hook
                app.pluginHook('navbarReinit', eventData);
        
                // Event
                $(navbarInnerContainer).trigger('navbarReinit navbar:reinit', eventData);
                return;
            }
            navbarInnerContainer.f7NavbarInitialized = true;
            // Before Init
            app.pluginHook('navbarBeforeInit', navbarData, pageData);
            $(navbarInnerContainer).trigger('navbarBeforeInit navbar:beforeinit', eventData);
        
            // Initialize Navbar
            app.initNavbar(navbarContainer, navbarInnerContainer);
        
            // On init
            app.pluginHook('navbarInit', navbarData, pageData);
            $(navbarInnerContainer).trigger('navbarInit navbar:init', eventData);
        };
        // Navbar Remove Callback
        app.navbarRemoveCallback = function (view, pageContainer, navbarContainer, navbarInnerContainer) {
            if (!navbarContainer && navbarInnerContainer) navbarContainer = $(navbarInnerContainer).parent('.navbar')[0];
            var navbarData = {
                container: navbarContainer,
                innerContainer: navbarInnerContainer
            };
            var pageData;
            if (pageContainer) {
                pageData = pageContainer.f7PageData;
            }
        
            var eventData = {
                page: pageData,
                navbar: navbarData
            };
            app.pluginHook('navbarBeforeRemove', navbarData, pageData);
            $(navbarInnerContainer).trigger('navbarBeforeRemove navbar:beforeremove', eventData);
            navbarData = null;
            pageData = null;
        };
        app.initNavbar = function (navbarContainer, navbarInnerContainer) {
            // Init Subnavbar Searchbar
            if (app.initSearchbar) app.initSearchbar(navbarInnerContainer);
        };
        app.reinitNavbar = function (navbarContainer, navbarInnerContainer) {
            // Re init navbar methods
        };
        app.initNavbarWithCallback = function (navbarContainer) {
            navbarContainer = $(navbarContainer);
            var viewContainer = navbarContainer.parents('.' + app.params.viewClass);
            var view;
            if (viewContainer.length === 0) return;
            if (navbarContainer.parents('.navbar-through').length === 0 && viewContainer.find('.navbar-through').length === 0) return;
            view = viewContainer[0].f7View || undefined;
        
            navbarContainer.find('.navbar-inner').each(function () {
                var navbarInnerContainer = this;
                var pageContainer;
                if ($(navbarInnerContainer).attr('data-page')) {
                    // For dom cache
                    pageContainer = viewContainer.find('.page[data-page="' + $(navbarInnerContainer).attr('data-page') + '"]')[0];
                }
                if (!pageContainer) {
                    var pages = viewContainer.find('.page');
                    if (pages.length === 1) {
                        pageContainer = pages[0];
                    }
                    else {
                        viewContainer.find('.page').each(function () {
                            if (this.f7PageData && this.f7PageData.navbarInnerContainer === navbarInnerContainer) {
                                pageContainer = this;
                            }
                        });
                    }
                }
                app.navbarInitCallback(view, pageContainer, navbarContainer[0], navbarInnerContainer);
            });
        };
        
        // Size Navbars
        app.sizeNavbars = function (viewContainer) {
            if (app.params.material) return;
            var navbarInner = viewContainer ? $(viewContainer).find('.navbar .navbar-inner:not(.cached)') : $('.navbar .navbar-inner:not(.cached)');
            navbarInner.each(function () {
                var n = $(this);
                if (n.hasClass('cached')) return;
                var left = app.rtl ? n.find('.right') : n.find('.left'),
                    right = app.rtl ? n.find('.left') : n.find('.right'),
                    center = n.find('.center'),
                    subnavbar = n.find('.subnavbar'),
                    noLeft = left.length === 0,
                    noRight = right.length === 0,
                    leftWidth = noLeft ? 0 : left.outerWidth(true),
                    rightWidth = noRight ? 0 : right.outerWidth(true),
                    centerWidth = center.outerWidth(true),
                    navbarStyles = n.styles(),
                    navbarWidth = n[0].offsetWidth - parseInt(navbarStyles.paddingLeft, 10) - parseInt(navbarStyles.paddingRight, 10),
                    onLeft = n.hasClass('navbar-on-left'),
                    currLeft, diff;
        
                if (noRight) {
                    currLeft = navbarWidth - centerWidth;
                }
                if (noLeft) {
                    currLeft = 0;
                }
                if (!noLeft && !noRight) {
                    currLeft = (navbarWidth - rightWidth - centerWidth + leftWidth) / 2;
                }
                var requiredLeft = (navbarWidth - centerWidth) / 2;
                if (navbarWidth - leftWidth - rightWidth > centerWidth) {
                    if (requiredLeft < leftWidth) {
                        requiredLeft = leftWidth;
                    }
                    if (requiredLeft + centerWidth > navbarWidth - rightWidth) {
                        requiredLeft = navbarWidth - rightWidth - centerWidth;
                    }
                    diff = requiredLeft - currLeft;
                }
                else {
                    diff = 0;
                }
                // RTL inverter
                var inverter = app.rtl ? -1 : 1;
        
                if (center.hasClass('sliding')) {
                    center[0].f7NavbarLeftOffset = -(currLeft + diff) * inverter;
                    center[0].f7NavbarRightOffset = (navbarWidth - currLeft - diff - centerWidth) * inverter;
                    if (onLeft) {
                        if (app.params.animateNavBackIcon) {
                            var activeNavbarBackLink = n.parent().find('.navbar-on-center').find('.left.sliding .back .icon ~ span');
                            if (activeNavbarBackLink.length > 0) {
                                center[0].f7NavbarLeftOffset += activeNavbarBackLink[0].offsetLeft;
                            }
                        }
                        center.transform('translate3d(' + center[0].f7NavbarLeftOffset + 'px, 0, 0)');
                    }
                }
                if (!noLeft && left.hasClass('sliding')) {
                    if (app.rtl) {
                        left[0].f7NavbarLeftOffset = -(navbarWidth - left[0].offsetWidth) / 2 * inverter;
                        left[0].f7NavbarRightOffset = leftWidth * inverter;
                    }
                    else {
                        left[0].f7NavbarLeftOffset = -leftWidth;
                        left[0].f7NavbarRightOffset = (navbarWidth - left[0].offsetWidth) / 2;
                        if (app.params.animateNavBackIcon && left.find('.back .icon').length > 0) {
                            left[0].f7NavbarRightOffset -= left.find('.back .icon')[0].offsetWidth;
                        }
                    }
                    if (onLeft) left.transform('translate3d(' + left[0].f7NavbarLeftOffset + 'px, 0, 0)');
                }
                if (!noRight && right.hasClass('sliding')) {
                    if (app.rtl) {
                        right[0].f7NavbarLeftOffset = -rightWidth * inverter;
                        right[0].f7NavbarRightOffset = (navbarWidth - right[0].offsetWidth) / 2 * inverter;
                    }
                    else {
                        right[0].f7NavbarLeftOffset = -(navbarWidth - right[0].offsetWidth) / 2;
                        right[0].f7NavbarRightOffset = rightWidth;
                    }
                    if (onLeft) right.transform('translate3d(' + right[0].f7NavbarLeftOffset + 'px, 0, 0)');
                }
                if (subnavbar.length && subnavbar.hasClass('sliding')) {
                    subnavbar[0].f7NavbarLeftOffset = app.rtl ? subnavbar[0].offsetWidth : -subnavbar[0].offsetWidth;
                    subnavbar[0].f7NavbarRightOffset = -subnavbar[0].f7NavbarLeftOffset;
                }
        
                // Center left
                var centerLeft = diff;
                if (app.rtl && noLeft && noRight && center.length > 0) centerLeft = -centerLeft;
                center.css({left: centerLeft + 'px'});
                
            });
        };
        
        // Hide/Show Navbars/Toolbars
        app.hideNavbar = function (navbarContainer, animated) {
            if (typeof animated === 'undefined') animated = true;
            $(navbarContainer).addClass('navbar-hidden' + (!animated ? (' not-animated') : ''));
            return true;
        };
        app.showNavbar = function (navbarContainer, animated) {
            if (typeof animated === 'undefined') animated = true;
            var navbar = $(navbarContainer);
            if (animated) {
                navbar.removeClass('not-animated');
                navbar.addClass('navbar-hiding').removeClass('navbar-hidden').transitionEnd(function () {
                    navbar.removeClass('navbar-hiding');
                });
            }
            else {
                navbar.removeClass('navbar-hidden navbar-hiding not-animated');
            }
            return true;
        };
        app.hideToolbar = function (toolbarContainer, animated) {
            if (typeof animated === 'undefined') animated = true;
            $(toolbarContainer).addClass('toolbar-hidden' + (!animated ? (' not-animated') : ''));
            return true;
        };
        app.showToolbar = function (toolbarContainer, animated) {
            if (typeof animated === 'undefined') animated = true;
            var toolbar = $(toolbarContainer);
            if (animated) {
                toolbar.removeClass('not-animated');
                toolbar.addClass('toolbar-hiding').removeClass('toolbar-hidden').transitionEnd(function () {
                    toolbar.removeClass('toolbar-hiding' + (!animated ? (' not-animated') : ''));
                });
            }
            else {
                toolbar.removeClass('toolbar-hidden toolbar-hiding not-animated');
            }
                
        };
        

        /*======================================================
        ************   Searchbar   ************
        ======================================================*/
        var Searchbar = function (container, params) {
            var defaults = {
                input: null,
                clearButton: null,
                cancelButton: null,
                searchList: null,
                searchIn: '.item-title',
                searchBy: '',
                found: null,
                notFound: null,
                overlay: null,
                ignore: '.searchbar-ignore',
                customSearch: false,
                removeDiacritics: false,
                hideDividers: true,
                hideGroups: true,
                /* Callbacks
                onSearch
                onEnable
                onDisable
                onClear
                */
        
            };
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined' || params[def] === null && defaults.hasOwnProperty(def)) {
                    params[def] = defaults[def];
                }
            }
        
            // Instance
            var s = this;
        
            // Material
            s.material = app.params.material;
        
            // Params
            s.params = params;
        
            // Container
            container = $(container);
            s.container = container;
        
            // Active
            s.active = false;
        
            // Input
            s.input = s.params.input ? $(s.params.input) : s.container.find('input[type="search"]');
            s.clearButton = s.params.clearButton ? $(s.params.clearButton) : s.container.find('.searchbar-clear');
            s.cancelButton = s.params.cancelButton ? $(s.params.cancelButton) : s.container.find('.searchbar-cancel');
        
            // Search List
            s.searchList = $(s.params.searchList);
        
            // Is Virtual List
            s.isVirtualList = s.searchList.hasClass('virtual-list');
        
            // Is In Page
            s.pageContainer = s.container.parents('.page').eq(0);
        
            // Overlay
            if (!s.params.overlay) {
                s.overlay = s.pageContainer.length > 0 ? s.pageContainer.find('.searchbar-overlay') : $('.searchbar-overlay');
            }
            else {
                s.overlay = $(s.params.overlay);
            }
            // Found and not found
            if (!s.params.found) {
                s.found = s.pageContainer.length > 0 ? s.pageContainer.find('.searchbar-found') : $('.searchbar-found');
            }
            else {
                s.found = $(s.params.found);
            }
            if (!s.params.notFound) {
                s.notFound = s.pageContainer.length > 0 ? s.pageContainer.find('.searchbar-not-found') : $('.searchbar-not-found');
            }
            else {
                s.notFound = $(s.params.notFound);
            }
        
            // Set Cancel button
            var cancelMarginProp = app.rtl ? 'margin-left' : 'margin-right';
            var cancelButtonHasMargin = false;
            s.setCancelButtonMargin = function () {
                s.cancelButton.transition(0).show();
                s.cancelButton.css(cancelMarginProp, -s.cancelButton[0].offsetWidth + 'px');
                var clientLeft = s.cancelButton[0].clientLeft;
                s.cancelButton.transition('');
                cancelButtonHasMargin = true;
            };
        
            // Trigger
            s.triggerEvent = function (eventName, callbackName, eventData) {
                s.container.trigger(eventName, eventData);
                if (s.searchList.length > 0) s.searchList.trigger(eventName, eventData);
                if (callbackName && s.params[callbackName]) s.params[callbackName](s, eventData);
            };
        
            // Enable/disalbe
            s.enable = function (e) {
                function _enable() {
                    if ((s.searchList.length || s.params.customSearch) && !s.container.hasClass('searchbar-active') && !s.query) s.overlay.addClass('searchbar-overlay-active');
                    s.container.addClass('searchbar-active');
                    if (s.cancelButton.length > 0 && !s.material) {
                        if (!cancelButtonHasMargin) {
                            s.setCancelButtonMargin();
                        }
                        s.cancelButton.css(cancelMarginProp, '0px');
                    }
                    s.triggerEvent('enableSearch searchbar:enable', 'onEnable');
                    s.active = true;
                }
                if (app.device.ios && !app.params.material && e && e.type === 'focus') {
                    setTimeout(function () {
                        _enable();
                    }, 400);
                }
                else {
                    _enable();
                }
            };
        
            s.disable = function () {
                s.input.val('').trigger('change');
                s.container.removeClass('searchbar-active searchbar-not-empty');
                if (s.cancelButton.length > 0 && !s.material) s.cancelButton.css(cancelMarginProp, -s.cancelButton[0].offsetWidth + 'px');
        
                if (s.searchList.length || s.params.customSearch) s.overlay.removeClass('searchbar-overlay-active');
        
                s.active = false;
                function _disable() {
                    s.input.blur();
                }
                if (app.device.ios) {
                    setTimeout(function () {
                        _disable();
                    }, 400);
                }
                else {
                    _disable();
                }
                s.triggerEvent('disableSearch searchbar:disable', 'onDisable');
            };
        
            // Clear
            s.clear = function (e) {
                if (!s.query && e && $(e.target).hasClass('searchbar-clear')) {
                    s.disable();
                    return;
                }
                var previousQuery = s.value;
                s.input.val('').trigger('change').focus();
                s.triggerEvent('clearSearch searchbar:clear', 'onClear', {previousQuery: previousQuery});
            };
        
            // Search
            s.handleInput = function () {
                setTimeout(function () {
                    var value = s.input.val().trim();
                    if ((s.searchList.length > 0 || s.params.customSearch) && (s.params.searchIn || s.isVirtualList)) s.search(value, true);
                }, 0);
            };
        
            var previousQuery = '';
            var virtualList;
            s.search = function (query, internal) {
                if (query.trim() === previousQuery) return;
                previousQuery = query.trim();
        
                if (!internal) {
                    if (!s.active) {
                        s.enable();
                    }
                    s.input.val(query);
                }
                s.query = s.value = query;
                // Add active/inactive classes on overlay
                if (query.length === 0) {
                    s.container.removeClass('searchbar-not-empty');
                    if (s.searchList.length && s.container.hasClass('searchbar-active')) s.overlay.addClass('searchbar-overlay-active');
                }
                else {
                    s.container.addClass('searchbar-not-empty');
                    if (s.searchList.length && s.container.hasClass('searchbar-active')) s.overlay.removeClass('searchbar-overlay-active');
                }
        
                if (s.params.customSearch) {
                    s.triggerEvent('search searchbar:search', 'onSearch', {query: query});
                    return;
                }
        
                var foundItems = [], _vlQuery;
                if (s.isVirtualList) {
                    virtualList = s.searchList[0].f7VirtualList;
                    if (query.trim() === '') {
                        virtualList.resetFilter();
                        s.notFound.hide();
                        s.found.show();
                        return;
                    }
                    _vlQuery = s.params.removeDiacritics ? $.removeDiacritics(query) : query;
                    if (virtualList.params.searchAll) {
                        foundItems = virtualList.params.searchAll(_vlQuery, virtualList.items) || [];
                    }
                    else if (virtualList.params.searchByItem) {
                        for (var i = 0; i < virtualList.items.length; i++) {
                            if(virtualList.params.searchByItem(_vlQuery, i, virtualList.params.items[i])) {
                                foundItems.push(i);
                            }
                        }
                    }
                }
                else {
                    var values;
                    if (s.params.removeDiacritics) values = $.removeDiacritics(query.trim().toLowerCase()).split(' ');
                    else {
                        values = query.trim().toLowerCase().split(' ');
                    }
                    s.searchList.find('li').removeClass('hidden-by-searchbar').each(function (index, el) {
                        el = $(el);
                        var compareWithText = [];
                        el.find(s.params.searchIn).each(function () {
                            var itemText = $(this).text().trim().toLowerCase();
                            if (s.params.removeDiacritics) itemText = $.removeDiacritics(itemText);
                            compareWithText.push(itemText);
                        });
                        compareWithText = compareWithText.join(' ');
                        var wordsMatch = 0;
                        for (var i = 0; i < values.length; i++) {
                            if (compareWithText.indexOf(values[i]) >= 0) wordsMatch++;
                        }
                        if (wordsMatch !== values.length && !(s.params.ignore && el.is(s.params.ignore))) {
                            el.addClass('hidden-by-searchbar');
                        }
                        else {
                            foundItems.push(el[0]);
                        }
                    });
        
                    if (s.params.hideDividers) {
                        s.searchList.find('.item-divider, .list-group-title').each(function () {
                            var title = $(this);
                            var nextElements = title.nextAll('li');
                            var hide = true;
                            for (var i = 0; i < nextElements.length; i++) {
                                var nextEl = $(nextElements[i]);
                                if (nextEl.hasClass('list-group-title') || nextEl.hasClass('item-divider')) break;
                                if (!nextEl.hasClass('hidden-by-searchbar')) {
                                    hide = false;
                                }
                            }
                            var ignore = s.params.ignore && title.is(s.params.ignore);
                            if (hide && !ignore) title.addClass('hidden-by-searchbar');
                            else title.removeClass('hidden-by-searchbar');
                        });
                    }
                    if (s.params.hideGroups) {
                        s.searchList.find('.list-group').each(function () {
                            var group = $(this);
                            var ignore = s.params.ignore && group.is(s.params.ignore);
                            var notHidden = group.find('li:not(.hidden-by-searchbar)');
                            if (notHidden.length === 0 && !ignore) {
                                group.addClass('hidden-by-searchbar');
                            }
                            else {
                                group.removeClass('hidden-by-searchbar');
                            }
                        });
                    }
                }
                s.triggerEvent('search searchbar:search', 'onSearch', {query: query, foundItems: foundItems});
                if (foundItems.length === 0) {
                    s.notFound.show();
                    s.found.hide();
                }
                else {
                    s.notFound.hide();
                    s.found.show();
                }
                if (s.isVirtualList) {
                    virtualList.filterItems(foundItems);
                }
            };
        
            // Events
            function preventSubmit(e) {
                e.preventDefault();
            }
        
            s.attachEvents = function (destroy) {
                var method = destroy ? 'off' : 'on';
                s.container[method]('submit', preventSubmit);
                if (!s.material) s.cancelButton[method]('click', s.disable);
                s.overlay[method]('click', s.disable);
                s.input[method]('focus', s.enable);
                s.input[method]('change keydown keypress keyup', s.handleInput);
                s.clearButton[method]('click', s.clear);
        
            };
            s.detachEvents = function() {
                s.attachEvents(true);
            };
        
            // Init Destroy
            s.init = function () {
                s.attachEvents();
            };
            s.destroy = function () {
                if (!s) return;
                s.detachEvents();
                s = null;
            };
        
            // Init
            s.init();
        
            s.container[0].f7Searchbar = s;
            return s;
        
        };
        app.searchbar = function (container, params) {
            return new Searchbar(container, params);
        };
        app.initSearchbar = function (container) {
            container = $(container);
            var searchbar = container.hasClass('searchbar') ? container : container.find('.searchbar');
            if (searchbar.length === 0) return;
            if (!searchbar.hasClass('searchbar-init')) return;
        
            var sb = app.searchbar(searchbar, searchbar.dataset());
        
            function onBeforeRemove() {
                if (sb) sb.destroy();
            }
            if (container.hasClass('page')) {
                container.once('pageBeforeRemove', onBeforeRemove);
            }
            else if (container.hasClass('navbar-inner')) {
                container.once('navbarBeforeRemove', onBeforeRemove);
            }
        };
        

        /*======================================================
        ************   Messagebar   ************
        ======================================================*/
        var Messagebar = function (container, params) {
            var defaults = {
                textarea: null,
                maxHeight: null,
            };
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined' || params[def] === null) {
                    params[def] = defaults[def];
                }
            }
        
            // Instance
            var m = this;
        
            // Params
            m.params = params;
        
            // Container
            m.container = $(container);
            if (m.container.length === 0) return;
        
            // Textarea
            m.textarea = m.params.textarea ? $(m.params.textarea) : m.container.find('textarea');
        
            // Is In Page
            m.pageContainer = m.container.parents('.page').eq(0);
            m.pageContent = m.pageContainer.find('.page-content');
        
            // Initial Sizes
            m.pageContentPadding = parseInt(m.pageContent.css('padding-bottom'));
            m.initialBarHeight = m.container[0].offsetHeight;
            m.initialAreaHeight = m.textarea[0].offsetHeight;
        
        
            // Resize textarea
            m.sizeTextarea = function () {
                // Reset
                m.textarea.css({'height': ''});
        
                var height = m.textarea[0].offsetHeight;
                var diff = height - m.textarea[0].clientHeight;
                var scrollHeight = m.textarea[0].scrollHeight;
        
                // Update
                if (scrollHeight + diff > height) {
                    var newAreaHeight = scrollHeight + diff;
                    var newBarHeight = m.initialBarHeight + (newAreaHeight - m.initialAreaHeight);
                    var maxBarHeight = m.params.maxHeight || m.container.parents('.view')[0].offsetHeight - 88;
                    if (newBarHeight > maxBarHeight) {
                        newBarHeight = parseInt(maxBarHeight, 10);
                        newAreaHeight = newBarHeight - m.initialBarHeight + m.initialAreaHeight;
                    }
                    m.textarea.css('height', newAreaHeight + 'px');
                    m.container.css('height', newBarHeight + 'px');
                    var onBottom = (m.pageContent[0].scrollTop === m.pageContent[0].scrollHeight - m.pageContent[0].offsetHeight);
                    if (m.pageContent.length > 0) {
                        m.pageContent.css('padding-bottom', newBarHeight + 'px');
                        if (m.pageContent.find('.messages-new-first').length === 0 && onBottom) {
                            m.pageContent.scrollTop(m.pageContent[0].scrollHeight - m.pageContent[0].offsetHeight);
                        }
                    }
                }
                else {
                    if (m.pageContent.length > 0) {
                        m.container.css({'height': '', 'bottom': ''});
                        m.pageContent.css({'padding-bottom': ''});
                    }
                }
            };
        
            // Clear
            m.clear = function () {
                m.textarea.val('').trigger('change');
            };
            m.value = function (value) {
                if (typeof value === 'undefined') return m.textarea.val();
                else m.textarea.val(value).trigger('change');
            };
        
            // Handle textarea
            m.textareaTimeout = undefined;
            m.handleTextarea = function (e) {
                clearTimeout(m.textareaTimeout);
                m.textareaTimeout = setTimeout(function () {
                    m.sizeTextarea();
                }, 0);
            };
        
            //Events
            function preventSubmit(e) {
                e.preventDefault();
            }
        
            m.attachEvents = function (destroy) {
                var method = destroy ? 'off' : 'on';
                m.container[method]('submit', preventSubmit);
                m.textarea[method]('change keydown keypress keyup paste cut', m.handleTextarea);
            };
            m.detachEvents = function () {
                m.attachEvents(true);
            };
        
            // Init Destroy
            m.init = function () {
                m.attachEvents();
            };
            m.destroy = function () {
                m.detachEvents();
                m = null;
            };
        
            // Init
            m.init();
        
            m.container[0].f7Messagebar = m;
            return m;
        };
        app.messagebar = function (container, params) {
            return new Messagebar(container, params);
        };
        app.initPageMessagebar = function (pageContainer) {
            pageContainer = $(pageContainer);
            var messagebar = pageContainer.hasClass('messagebar') ? pageContainer : pageContainer.find('.messagebar');
            if (messagebar.length === 0) return;
            if (!messagebar.hasClass('messagebar-init')) return;
            var mb = app.messagebar(messagebar, messagebar.dataset());
        
            // Destroy on page remove
            function pageBeforeRemove() {
                mb.destroy();
                pageContainer.off('page:beforeremove', pageBeforeRemove);
            }
            if (pageContainer.hasClass('page')) {
                pageContainer.on('page:beforeremove', pageBeforeRemove);
            }
        };
        

        /*======================================================
        ************   XHR   ************
        ======================================================*/
        // XHR Caching
        app.cache = [];
        app.removeFromCache = function (url) {
            var index = false;
            for (var i = 0; i < app.cache.length; i++) {
                if (app.cache[i].url === url) index = i;
            }
            if (index !== false) app.cache.splice(index, 1);
        };
        
        // XHR
        app.xhr = false;
        app.get = function (url, view, ignoreCache, callback) {
            // should we ignore get params or not
            var _url = url;
            if (app.params.cacheIgnoreGetParameters && url.indexOf('?') >= 0) {
                _url = url.split('?')[0];
            }
            if (app.params.cache && !ignoreCache && url.indexOf('nocache') < 0 && app.params.cacheIgnore.indexOf(_url) < 0) {
                // Check is the url cached
                for (var i = 0; i < app.cache.length; i++) {
                    if (app.cache[i].url === _url) {
                        // Check expiration
                        if ((new Date()).getTime() - app.cache[i].time < app.params.cacheDuration) {
                            // Load from cache
                            callback(app.cache[i].content);
                            return false;
                        }
                    }
                }
            }
        
            app.xhr = $.ajax({
                url: url,
                method: 'GET',
                beforeSend: app.params.onAjaxStart,
                complete: function (xhr, status) {
                    if (status !== 'error' && status !== 'timeout' && (xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
                        if (app.params.cache && xhr.responseText !== '') {
                            app.removeFromCache(_url);
                            app.cache.push({
                                url: _url,
                                time: (new Date()).getTime(),
                                content: xhr.responseText
                            });
                        }
                        callback(xhr.responseText, false);
                    }
                    else {
                        callback(xhr.responseText, true);
                    }
                    if (app.params.onAjaxComplete) app.params.onAjaxComplete(xhr);
                },
                error: function (xhr) {
                    callback(xhr.responseText, true);
                    if (app.params.onAjaxError) app.params.onAjaxError(xhr);
                }
            });
            if (view) view.xhr = app.xhr;
        
            return app.xhr;
        };
        

        /*======================================================
        ************   Pages   ************
        ======================================================*/
        // Page Callbacks API
        app.pageCallbacks = {};
        
        app.onPage = function (callbackName, pageName, callback) {
            if (pageName && pageName.split(' ').length > 1) {
                var pageNames = pageName.split(' ');
                var returnCallbacks = [];
                for (var i = 0; i < pageNames.length; i++) {
                    returnCallbacks.push(app.onPage(callbackName, pageNames[i], callback));
                }
                returnCallbacks.remove = function () {
                    for (var i = 0; i < returnCallbacks.length; i++) {
                        returnCallbacks[i].remove();
                    }
                };
                returnCallbacks.trigger = function () {
                    for (var i = 0; i < returnCallbacks.length; i++) {
                        returnCallbacks[i].trigger();
                    }
                };
                return returnCallbacks;
            }
            var callbacks = app.pageCallbacks[callbackName][pageName];
            if (!callbacks) {
                callbacks = app.pageCallbacks[callbackName][pageName] = [];
            }
            app.pageCallbacks[callbackName][pageName].push(callback);
            return {
                remove: function () {
                    var removeIndex;
                    for (var i = 0; i < callbacks.length; i++) {
                        if (callbacks[i].toString() === callback.toString()) {
                            removeIndex = i;
                        }
                    }
                    if (typeof removeIndex !== 'undefined') callbacks.splice(removeIndex, 1);
                },
                trigger: callback
            };
        };
        
        //Create callbacks methods dynamically
        function createPageCallback(callbackName) {
            var capitalized = callbackName.replace(/^./, function (match) {
                return match.toUpperCase();
            });
            app['onPage' + capitalized] = function (pageName, callback) {
                return app.onPage(callbackName, pageName, callback);
            };
        }
        
        var pageCallbacksNames = ('beforeInit init reinit beforeAnimation afterAnimation back afterBack beforeRemove').split(' ');
        for (var i = 0; i < pageCallbacksNames.length; i++) {
            app.pageCallbacks[pageCallbacksNames[i]] = {};
            createPageCallback(pageCallbacksNames[i]);
        }
        
        app.triggerPageCallbacks = function (callbackName, pageName, pageData) {
            var allPagesCallbacks = app.pageCallbacks[callbackName]['*'];
            if (allPagesCallbacks) {
                for (var j = 0; j < allPagesCallbacks.length; j++) {
                    allPagesCallbacks[j](pageData);
                }
            }
            var callbacks = app.pageCallbacks[callbackName][pageName];
            if (!callbacks || callbacks.length === 0) return;
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i](pageData);
            }
        };
        
        // On Page Init Callback
        app.pageInitCallback = function (view, params) {
            var pageContainer = params.pageContainer;
            if (!pageContainer) return;
            if (pageContainer.f7PageInitialized && view && !view.params.domCache) return;
        
            var pageQuery = params.query;
            if (!pageQuery) {
                if (params.url && params.url.indexOf('?') > 0) {
                    pageQuery = $.parseUrlQuery(params.url || '');
                }
                else if (pageContainer.f7PageData && pageContainer.f7PageData.query) {
                    pageQuery = pageContainer.f7PageData.query;
                }
                else {
                    pageQuery = {};
                }
            }
        
            // Page Data
            var pageData = {
                container: pageContainer,
                url: params.url,
                query: pageQuery,
                name: $(pageContainer).attr('data-page'),
                view: view,
                from: params.position,
                context: params.context,
                navbarInnerContainer: params.navbarInnerContainer,
                fromPage: params.fromPage
            };
            if (params.fromPage && !params.fromPage.navbarInnerContainer && params.oldNavbarInnerContainer) {
                params.fromPage.navbarInnerContainer = params.oldNavbarInnerContainer;
            }
        
            if (pageContainer.f7PageInitialized && ((view && view.params.domCache) || (!view && $(pageContainer).parents('.popup, .popover, .login-screen, .modal, .actions-modal, .picker-modal').length > 0))) {
                // Reinit Page
                app.reinitPage(pageContainer);
        
                // Callbacks
                app.pluginHook('pageReinit', pageData);
                if (app.params.onPageReinit) app.params.onPageReinit(app, pageData);
                app.triggerPageCallbacks('reinit', pageData.name, pageData);
                $(pageData.container).trigger('pageReinit page:reinit', {page: pageData});
                return;
            }
            pageContainer.f7PageInitialized = true;
        
            // Store pagedata in page
            pageContainer.f7PageData = pageData;
        
            // Update View's activePage
            if (view && !params.preloadOnly && !params.reloadPrevious) {
                // Add data-page on view
                $(view.container).attr('data-page', pageData.name);
                // Update View active page data
                view.activePage = pageData;
            }
        
            // Before Init Callbacks
            app.pluginHook('pageBeforeInit', pageData);
            if (app.params.onPageBeforeInit) app.params.onPageBeforeInit(app, pageData);
            app.triggerPageCallbacks('beforeInit', pageData.name, pageData);
            $(pageData.container).trigger('pageBeforeInit page:beforeinit', {page: pageData});
        
            // Init page
            app.initPage(pageContainer);
        
            // Init Callback
            app.pluginHook('pageInit', pageData);
            if (app.params.onPageInit) app.params.onPageInit(app, pageData);
            app.triggerPageCallbacks('init', pageData.name, pageData);
            $(pageData.container).trigger('pageInit page:init', {page: pageData});
        };
        app.pageRemoveCallback = function (view, pageContainer, position) {
            var pageContext;
            if (!pageContainer) return;
            if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;
            // Page Data
            var pageData = {
                container: pageContainer,
                name: $(pageContainer).attr('data-page'),
                view: view,
                url: pageContainer.f7PageData && pageContainer.f7PageData.url,
                query: pageContainer.f7PageData && pageContainer.f7PageData.query,
                navbarInnerContainer: pageContainer.f7PageData && pageContainer.f7PageData.navbarInnerContainer,
                from: position,
                context: pageContext
            };
            // Before Init Callback
            app.pluginHook('pageBeforeRemove', pageData);
            if (app.params.onPageBeforeRemove) app.params.onPageBeforeRemove(app, pageData);
            app.triggerPageCallbacks('beforeRemove', pageData.name, pageData);
            $(pageData.container).trigger('pageBeforeRemove page:beforeremove', {page: pageData});
            pageData = null;
        };
        app.pageBackCallback = function (callback, view, params) {
            // Page Data
            var pageContainer = params.pageContainer;
            var pageContext;
            if (!pageContainer) return;
            if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;
        
            var pageData = {
                container: pageContainer,
                name: $(pageContainer).attr('data-page'),
                url: pageContainer.f7PageData && pageContainer.f7PageData.url,
                query: pageContainer.f7PageData && pageContainer.f7PageData.query,
                view: view,
                from: params.position,
                context: pageContext,
                navbarInnerContainer: pageContainer.f7PageData && pageContainer.f7PageData.navbarInnerContainer,
                swipeBack: params.swipeBack
            };
        
            if (callback === 'after') {
                app.pluginHook('pageAfterBack', pageData);
                if (app.params.onPageAfterBack) app.params.onPageAfterBack(app, pageData);
                app.triggerPageCallbacks('afterBack', pageData.name, pageData);
                $(pageContainer).trigger('pageAfterBack page:afterback', {page: pageData});
        
            }
            if (callback === 'before') {
                app.pluginHook('pageBack', pageData);
                if (app.params.onPageBack) app.params.onPageBack(app, pageData);
                app.triggerPageCallbacks('back', pageData.name, pageData);
                $(pageData.container).trigger('pageBack page:back', {page: pageData});
            }
        };
        app.pageAnimCallback = function (callback, view, params) {
            var pageContainer = params.pageContainer;
            var pageContext;
            if (!pageContainer) return;
            if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;
        
            var pageQuery = params.query;
            if (!pageQuery) {
                if (params.url && params.url.indexOf('?') > 0) {
                    pageQuery = $.parseUrlQuery(params.url || '');
                }
                else if (pageContainer.f7PageData && pageContainer.f7PageData.query) {
                    pageQuery = pageContainer.f7PageData.query;
                }
                else {
                    pageQuery = {};
                }
            }
            // Page Data
            var pageData = {
                container: pageContainer,
                url: params.url,
                query: pageQuery,
                name: $(pageContainer).attr('data-page'),
                view: view,
                from: params.position,
                context: pageContext,
                swipeBack: params.swipeBack,
                navbarInnerContainer: pageContainer.f7PageData && pageContainer.f7PageData.navbarInnerContainer,
                fromPage: params.fromPage
            };
            var oldPage = params.oldPage,
                newPage = params.newPage;
        
            // Update page date
            pageContainer.f7PageData = pageData;
        
            if (callback === 'after') {
                app.pluginHook('pageAfterAnimation', pageData);
                if (app.params.onPageAfterAnimation) app.params.onPageAfterAnimation(app, pageData);
                app.triggerPageCallbacks('afterAnimation', pageData.name, pageData);
                $(pageData.container).trigger('pageAfterAnimation page:afteranimation', {page: pageData});
        
            }
            if (callback === 'before') {
                // Add data-page on view
                $(view.container).attr('data-page', pageData.name);
        
                // Update View's activePage
                if (view) view.activePage = pageData;
        
                // Hide/show navbar dynamically
                if (newPage.hasClass('no-navbar') && !oldPage.hasClass('no-navbar')) {
                    view.hideNavbar();
                }
                if (!newPage.hasClass('no-navbar') && (oldPage.hasClass('no-navbar') || oldPage.hasClass('no-navbar-by-scroll'))) {
                    view.showNavbar();
                }
                // Hide/show navbar toolbar
                if (newPage.hasClass('no-toolbar') && !oldPage.hasClass('no-toolbar')) {
                    view.hideToolbar();
                }
                if (!newPage.hasClass('no-toolbar') && (oldPage.hasClass('no-toolbar') || oldPage.hasClass('no-toolbar-by-scroll'))) {
                    view.showToolbar();
                }
                // Hide/show tabbar
                var tabBar;
                if (newPage.hasClass('no-tabbar') && !oldPage.hasClass('no-tabbar')) {
                    tabBar = $(view.container).find('.tabbar');
                    if (tabBar.length === 0) tabBar = $(view.container).parents('.' + app.params.viewsClass).find('.tabbar');
                    app.hideToolbar(tabBar);
                }
                if (!newPage.hasClass('no-tabbar') && (oldPage.hasClass('no-tabbar') || oldPage.hasClass('no-tabbar-by-scroll'))) {
                    tabBar = $(view.container).find('.tabbar');
                    if (tabBar.length === 0) tabBar = $(view.container).parents('.' + app.params.viewsClass).find('.tabbar');
                    app.showToolbar(tabBar);
                }
        
                oldPage.removeClass('no-navbar-by-scroll no-toolbar-by-scroll');
                // Callbacks
                app.pluginHook('pageBeforeAnimation', pageData);
                if (app.params.onPageBeforeAnimation) app.params.onPageBeforeAnimation(app, pageData);
                app.triggerPageCallbacks('beforeAnimation', pageData.name, pageData);
                $(pageData.container).trigger('pageBeforeAnimation page:beforeanimation', {page: pageData});
            }
        };
        
        // Init Page Events and Manipulations
        app.initPage = function (pageContainer) {
            pageContainer = $(pageContainer);
            if (pageContainer.length === 0) return;
            // Size navbars on page load
            if (app.sizeNavbars) app.sizeNavbars(pageContainer.parents('.' + app.params.viewClass)[0]);
            // Init messages
            if (app.initPageMessages) app.initPageMessages(pageContainer);
            // Init forms storage
            if (app.initFormsStorage) app.initFormsStorage(pageContainer);
            // Init smart select
            if (app.initSmartSelects) app.initSmartSelects(pageContainer);
            // Init slider
            if (app.initPageSwiper) app.initPageSwiper(pageContainer);
            // Init pull to refres
            if (app.initPullToRefresh) app.initPullToRefresh(pageContainer);
            // Init infinite scroll
            if (app.initPageInfiniteScroll) app.initPageInfiniteScroll(pageContainer);
            // Init searchbar
            if (app.initSearchbar) app.initSearchbar(pageContainer);
            // Init message bar
            if (app.initPageMessagebar) app.initPageMessagebar(pageContainer);
            // Init scroll toolbars
            if (app.initPageScrollToolbars) app.initPageScrollToolbars(pageContainer);
            // Init lazy images
            if (app.initImagesLazyLoad) app.initImagesLazyLoad(pageContainer);
            // Init progress bars
            if (app.initPageProgressbar) app.initPageProgressbar(pageContainer);
            // Init resizeable textareas
            if (app.initPageResizableTextarea) app.initPageResizableTextarea(pageContainer);
            // Init Data Table
            if (app.initPageDataTables) app.initPageDataTables(pageContainer);
            // Init Material Preloader
            if (app.params.material && app.initPageMaterialPreloader) app.initPageMaterialPreloader(pageContainer);
            // Init Material Inputs
            if (app.params.material && app.initPageMaterialInputs) app.initPageMaterialInputs(pageContainer);
            // Init Material Tabbar
            if (app.params.material && app.initPageMaterialTabbar) app.initPageMaterialTabbar(pageContainer);
        };
        app.reinitPage = function (pageContainer) {
            pageContainer = $(pageContainer);
            if (pageContainer.length === 0) return;
            // Size navbars on page reinit
            if (app.sizeNavbars) app.sizeNavbars(pageContainer.parents('.' + app.params.viewClass)[0]);
            // Reinit slider
            if (app.reinitPageSwiper) app.reinitPageSwiper(pageContainer);
            // Reinit lazy load
            if (app.reinitLazyLoad) app.reinitLazyLoad(pageContainer);
        };
        app.initPageWithCallback = function (pageContainer) {
            pageContainer = $(pageContainer);
            var viewContainer = pageContainer.parents('.' + app.params.viewClass);
            if (viewContainer.length === 0) return;
            var view = viewContainer[0].f7View || undefined;
            var url = view && view.url ? view.url : undefined;
            if (viewContainer && pageContainer.attr('data-page')) {
                viewContainer.attr('data-page', pageContainer.attr('data-page'));
            }
            app.pageInitCallback(view, {pageContainer: pageContainer[0], url: url, position: 'center'});
        };
        

        /*======================================================
        ************   Navigation / Router   ************
        ======================================================*/
        app.router = {
            _remove: function (el) {
                if (app.params.routerRemoveTimeout || app.params.routerRemoveWithTimeout) {
                    setTimeout(function () {
                        $(el).remove();
                    }, 0);
                }
                else $(el).remove();
            },
            _modalsSelector: '.popup, .modal, .popover, .actions-modal, .picker-modal, .login-screen',
            // Temporary DOM Element
            temporaryDom: document.createElement('div'),
        
            // Find page or navbar in passed container which are related to View
            findElement: function (selector, container, view, notCached) {
                container = $(container);
                if (notCached) selector = selector + ':not(.cached)';
                var found = container.find(selector).filter(function (index, el) {
                    return $(el).parents(app.router._modalsSelector).length === 0;
                });
                if (found.length > 1) {
                    if (typeof view.selector === 'string') {
                        // Search in related view
                        found = container.find(view.selector + ' ' + selector);
                    }
                    if (found.length > 1) {
                        // Search in main view
                        found = container.find('.' + app.params.viewMainClass + ' ' + selector);
                    }
                }
                if (found.length === 1) return found;
                else {
                    // Try to find non cached
                    if (!notCached) found = app.router.findElement(selector, container, view, true);
                    if (found && found.length === 1) return found;
                    if (found && found.length > 1) return $(found[0]);
                    else return undefined;
                }
            },
        
            // Set pages classes for animationEnd
            animatePages: function (leftPage, rightPage, direction) {
                // Loading new page
                var removeClasses = 'page-on-center page-on-right page-on-left';
                if (direction === 'to-left') {
                    leftPage.removeClass(removeClasses).addClass('page-from-center-to-left');
                    rightPage.removeClass(removeClasses).addClass('page-from-right-to-center');
                }
                // Go back
                if (direction === 'to-right') {
                    leftPage.removeClass(removeClasses).addClass('page-from-left-to-center');
                    rightPage.removeClass(removeClasses).addClass('page-from-center-to-right');
        
                }
            },
        
            // Prepare navbar before animarion
            prepareNavbar: function (newNavbarInner, oldNavbarInner, newNavbarPosition) {
                $(newNavbarInner).find('.sliding').each(function () {
                    var sliding = $(this);
                    var slidingOffset = newNavbarPosition === 'right' ? this.f7NavbarRightOffset : this.f7NavbarLeftOffset;
        
                    if (app.params.animateNavBackIcon) {
                        if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                            sliding.find('.back .icon').transform('translate3d(' + (-slidingOffset) + 'px,0,0)');
                        }
                    }
                    sliding.transform('translate3d(' + slidingOffset + 'px,0,0)');
                });
            },
        
            // Set navbars classes for animation
            animateNavbars: function (leftNavbarInner, rightNavbarInner, direction) {
                // Loading new page
                var removeClasses = 'navbar-on-right navbar-on-center navbar-on-left';
                if (direction === 'to-left') {
                    rightNavbarInner.removeClass(removeClasses).addClass('navbar-from-right-to-center');
                    rightNavbarInner.find('.sliding').each(function () {
                        var sliding = $(this);
                        sliding.transform('translate3d(0px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                                sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                            }
                        }
                    });
        
                    leftNavbarInner.removeClass(removeClasses).addClass('navbar-from-center-to-left');
                    leftNavbarInner.find('.sliding').each(function () {
                        var sliding = $(this);
                        var rightText;
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('center') && rightNavbarInner.find('.sliding.left .back .icon').length > 0) {
                                rightText = rightNavbarInner.find('.sliding.left .back span');
                                if (rightText.length > 0) this.f7NavbarLeftOffset += rightText[0].offsetLeft;
                            }
                            if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                                sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarLeftOffset) + 'px,0,0)');
                            }
                        }
                        sliding.transform('translate3d(' + (this.f7NavbarLeftOffset) + 'px,0,0)');
                    });
                }
                // Go back
                if (direction === 'to-right') {
                    leftNavbarInner.removeClass(removeClasses).addClass('navbar-from-left-to-center');
                    leftNavbarInner.find('.sliding').each(function () {
                        var sliding = $(this);
                        sliding.transform('translate3d(0px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                                sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                            }
                        }
                    });
        
                    rightNavbarInner.removeClass(removeClasses).addClass('navbar-from-center-to-right');
                    rightNavbarInner.find('.sliding').each(function () {
                        var sliding = $(this);
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                                sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarRightOffset) + 'px,0,0)');
                            }
                        }
                        sliding.transform('translate3d(' + (this.f7NavbarRightOffset) + 'px,0,0)');
                    });
                }
            },
        
            preprocess: function(view, content, url, next) {
                // Plugin hook
                app.pluginHook('routerPreprocess', view, content, url, next);
        
                // Preprocess by plugin
                content = app.pluginProcess('preprocess', content);
        
                if (view && view.params && view.params.preprocess) {
                    content = view.params.preprocess(content, url, next);
                    if (typeof content !== 'undefined') {
                        next(content);
                    }
                }
                else if (app.params.preprocess) {
                    content = app.params.preprocess(content, url, next);
                    if (typeof content !== 'undefined') {
                        next(content);
                    }
                }
                else {
                    next(content);
                }
            },
            preroute: function(view, options, isBack) {
                if (isBack) options.isBack = true;
                app.pluginHook('routerPreroute', view, options);
                if ((app.params.preroute && app.params.preroute(view, options) === false) || (view && view.params.preroute && view.params.preroute(view, options) === false)) {
                    return true;
                }
                else {
                    return false;
                }
            },
        
            template7Render: function (view, options) {
                var url = options.url,
                    content = options.content, //initial content
                    t7_rendered_content = options.content, // will be rendered using Template7
                    context = options.context, // Context data for Template7
                    contextName = options.contextName,
                    template = options.template; // Template 7 compiled template
        
                var t7_ctx, t7_template;
                if (typeof content === 'string') {
                    if (url) {
                        if (app.template7Cache[url] && !options.ignoreCache) t7_template = t7.cache[url];
                        else {
                            t7_template = t7.compile(content);
                            t7.cache[url] = t7_template;
                        }
                    }
                    else t7_template = t7.compile(content);
                }
                else if (template) {
                    t7_template = template;
                }
        
                if (context) {
                    t7_ctx = context;
                    if (context && url) {
                        view.contextCache[url] = context;
                    }
                }
                else {
                    if (contextName) {
                        if (contextName.indexOf('.') >= 0) {
                            var _ctx_path = contextName.split('.');
                            var _ctx = t7.data[_ctx_path[0]];
                            for (var i = 1; i < _ctx_path.length; i++) {
                                if (_ctx_path[i]) _ctx = _ctx[_ctx_path[i]];
                            }
                            t7_ctx = _ctx;
                        }
                        else t7_ctx = t7.data[contextName];
                    }
                    if (!t7_ctx && url) {
                        t7_ctx = t7.data['url:' + url];
                    }
                    if (!t7_ctx && typeof content === 'string' && !template) {
                        //try to find by page name in content
                        var pageNameMatch = content.match(/(data-page=["'][^"^']*["'])/);
                        if (pageNameMatch) {
                            var page = pageNameMatch[0].split('data-page=')[1].replace(/['"]/g, '');
                            if (page) t7_ctx = t7.data['page:' + page];
                        }
                    }
                    if (!t7_ctx && template && t7.templates) {
                        // Try to find matched template name in t7.templates
                        for (var templateName in t7.templates) {
                            if (t7.templates[templateName] === template) t7_ctx = t7.data[templateName];
                        }
                    }
                    if (!t7_ctx && url && url in view.contextCache) {
                        t7_ctx = view.contextCache[url];
                    }
                    if (!t7_ctx) {
                        t7_ctx = {};
                    }
                }
        
                if (t7_template && t7_ctx) {
                    if (typeof t7_ctx === 'function') t7_ctx = t7_ctx();
                    if (url) {
                        // Extend data with URL query
                        var query = $.parseUrlQuery(url);
                        t7_ctx.url_query = {};
                        for (var key in query) {
                            t7_ctx.url_query[key] = query[key];
                        }
                    }
                    try {
                        t7_rendered_content = t7_template(t7_ctx);
                    }
                    catch (e) {
                        t7_rendered_content = '';
                        if (window.console && window.console.error) {
                            console.error(e);
                        }
                    }
                }
        
                return {content: t7_rendered_content, context: t7_ctx};
            }
        };
        
        
        app.router._load = function (view, options) {
            // Plugin hook
            app.pluginHook('routerLoad', view, options);
        
            var url = options.url,
                content = options.content, //initial content
                t7_rendered = {content: options.content},
                template = options.template, // Template 7 compiled template
                pageName = options.pageName,
                viewContainer = $(view.container),
                pagesContainer = $(view.pagesContainer),
                animatePages = options.animatePages,
                newPage, oldPage, pagesInView, i, oldNavbarInner, newNavbarInner, navbar, dynamicNavbar, reloadPosition,
                isDynamicPage = typeof url === 'undefined' && content || template,
                pushState = options.pushState,
                pageElement = options.pageElement;
        
            if (typeof animatePages === 'undefined') animatePages = view.params.animatePages;
        
            // Render with Template7
            if (app.params.template7Pages && typeof content === 'string' || template) {
                t7_rendered = app.router.template7Render(view, options);
                if (t7_rendered.content && !content) {
                    content = t7_rendered.content;
                }
            }
        
            app.router.temporaryDom.innerHTML = '';
        
            // Parse DOM
            if (!pageName && !pageElement) {
                if ((typeof content === 'string') || (url && (typeof content === 'string'))) {
                    app.router.temporaryDom.innerHTML = t7_rendered.content;
                } else {
                    if ('length' in content && content.length > 1) {
                        for (var ci = 0; ci < content.length; ci++) {
                            $(app.router.temporaryDom).append(content[ci]);
                        }
                    } else {
                        $(app.router.temporaryDom).append(content);
                    }
                }
            }
        
            // Reload position
            reloadPosition = options.reload && (options.reloadPrevious ? 'left' : 'center');
        
            // Find new page
            if (pageName) newPage = pagesContainer.find('.page[data-page="' + pageName + '"]');
            else {
                if (pageElement) newPage = $(pageElement);
                else newPage = app.router.findElement('.page', app.router.temporaryDom, view);
            }
            // If page not found exit
            if (!newPage || newPage.length === 0 || (pageName && view.activePage && view.activePage.name === pageName)) {
                view.allowPageChange = true;
                return;
            }
        
            newPage.addClass(options.reload ? 'page-on-' + reloadPosition : 'page-on-right');
        
            // Find old page (should be the last one) and remove older pages
            pagesInView = pagesContainer.children('.page:not(.cached)');
            if (pageElement) {
                pagesInView = pagesInView.filter(function (index, page) {
                    if (page !== pageElement) return page;
                });
            }
        
            if (options.reload && options.reloadPrevious && pagesInView.length === 1)  {
                view.allowPageChange = true;
                return;
            }
        
            if (options.reload) {
                oldPage = pagesInView.eq(pagesInView.length - 1);
            }
            else {
                if (pagesInView.length > 1) {
                    for (i = 0; i < pagesInView.length - 2; i++) {
                        if (!view.params.domCache) {
                            app.pageRemoveCallback(view, pagesInView[i], 'left');
                            app.router._remove(pagesInView[i]);
                        }
                        else {
                            $(pagesInView[i]).addClass('cached');
                        }
                    }
                    if (!view.params.domCache) {
                        app.pageRemoveCallback(view, pagesInView[i], 'left');
                        app.router._remove(pagesInView[i]);
                    }
                    else {
                        $(pagesInView[i]).addClass('cached');
                    }
                }
                oldPage = pagesContainer.children('.page:not(.cached)');
            }
            if (pageElement && oldPage.length > 1) {
                oldPage = oldPage.filter(function (index, page) {
                    if (page !== pageElement) return page;
                });
            }
            if(view.params.domCache || pageElement) newPage.removeClass('cached');
        
            // Dynamic navbar
            if (view.params.dynamicNavbar) {
                dynamicNavbar = true;
                // Find navbar
                if (pageName) {
                    newNavbarInner = viewContainer.find('.navbar-inner[data-page="' + pageName + '"]');
                }
                else {
                    newNavbarInner = app.router.findElement('.navbar-inner', app.router.temporaryDom, view);
                }
                if (!newNavbarInner || newNavbarInner.length === 0) {
                    // Look in page
                    newNavbarInner = newPage.find('.navbar-inner');
                    if (!newNavbarInner || newNavbarInner.length === 0) {
                        // Set false
                        dynamicNavbar = false;
                    }
                    else {
                        if (newNavbarInner.parent('.navbar').length > 0) {
                            newNavbarInner.prependTo(newPage);
                        }
                    }
                }
                if (dynamicNavbar && newPage.find('.navbar').length > 0) {
                    app.router._remove(newPage.find('.navbar').filter(function(index, el){
                        return $(el).parents(app.router._modalsSelector).length === 0;
                    }));
                }
                navbar = viewContainer.children('.navbar');
                if (options.reload) {
                    oldNavbarInner = navbar.find('.navbar-inner:not(.cached):last-child');
                }
                else {
                    oldNavbarInner = navbar.find('.navbar-inner:not(.cached)');
        
                    if (oldNavbarInner.length > 0) {
                        for (i = 0; i < oldNavbarInner.length - 1; i++) {
                            if (!view.params.domCache) {
                                app.navbarRemoveCallback(view, pagesInView[i], navbar[0], oldNavbarInner[i]);
                                app.router._remove(oldNavbarInner[i]);
                            }
                            else
                                $(oldNavbarInner[i]).addClass('cached');
                        }
                        if (!newNavbarInner && oldNavbarInner.length === 1) {
                            if (!view.params.domCache) {
                                app.navbarRemoveCallback(view, pagesInView[0], navbar[0], oldNavbarInner[0]);
                                app.router._remove(oldNavbarInner[0]);
                            }
                            else
                                $(oldNavbarInner[0]).addClass('cached');
                        }
                        oldNavbarInner = navbar.find('.navbar-inner:not(.cached)');
                    }
                }
            }
            if (dynamicNavbar) {
                newNavbarInner.addClass(options.reload ? 'navbar-on-' + reloadPosition : 'navbar-on-right');
                if(view.params.domCache || pageElement) newNavbarInner.removeClass('cached');
                newPage[0].f7RelatedNavbar = newNavbarInner[0];
                newNavbarInner[0].f7RelatedPage = newPage[0];
            }
        
            // save content areas into view's cache
            if (!url) {
                var newPageName = pageName || newPage.attr('data-page');
                if (isDynamicPage) url = '#' + app.params.dynamicPageUrl.replace(/{{name}}/g, newPageName).replace(/{{index}}/g, view.history.length - (options.reload ? 1 : 0));
                else url = '#' + newPageName;
                if (!view.params.domCache) {
                    view.contentCache[url] = content;
                }
                if (view.params.domCache && pageName) {
                    view.pagesCache[url] = pageName;
                }
            }
            else if (url && pageElement) {
                view.pageElementsCache[url] = {
                    page: newPage,
                    navbarInner: newNavbarInner
                };
            }
        
            // Push State
            if (app.params.pushState && !options.reloadPrevious && view.main)  {
                if (typeof pushState === 'undefined') pushState = true;
                var pushStateRoot = app.params.pushStateRoot || '';
                var method = options.reload ? 'replaceState' : 'pushState';
                if (pushState) {
                    if (!isDynamicPage && !pageName) {
                        history[method]({url: url, viewIndex: app.views.indexOf(view)}, '', pushStateRoot + app.params.pushStateSeparator + url);
                    }
                    else if (isDynamicPage && content) {
                        history[method]({content: typeof content === 'string' ? content : '', url: url, viewIndex: app.views.indexOf(view)}, '', pushStateRoot + app.params.pushStateSeparator + url);
                    }
                    else if (pageName) {
                        history[method]({pageName: pageName, url: url, viewIndex: app.views.indexOf(view)}, '', pushStateRoot + app.params.pushStateSeparator + url);
                    }
                }
            }
        
            // Update View history
            view.url = url;
            if (options.reload) {
                var lastUrl = view.history[view.history.length - (options.reloadPrevious ? 2 : 1)];
                if (lastUrl &&
                    lastUrl.indexOf('#') === 0 &&
                    lastUrl in view.contentCache &&
                    lastUrl !== url &&
                    view.history.indexOf(lastUrl) === -1) {
                    view.contentCache[lastUrl] = null;
                    delete view.contentCache[lastUrl];
                }
                else if (lastUrl &&
                    lastUrl in view.pageElementsCache &&
                    lastUrl !== url &&
                    (view.history.indexOf(lastUrl) === -1 || view.history.indexOf(lastUrl) === view.history.length - 1)) {
                    view.pageElementsCache[lastUrl] = null;
                    delete view.pageElementsCache[lastUrl];
                }
                if (lastUrl &&
                    lastUrl in view.contextCache &&
                    lastUrl !== url &&
                    (view.history.indexOf(lastUrl) === -1 || view.history.indexOf(lastUrl) === view.history.length - 1)) {
                    view.contextCache[lastUrl] = null;
                    delete view.contextCache[lastUrl];
                }
                view.history[view.history.length - (options.reloadPrevious ? 2 : 1)] = url;
            }
            else {
                view.history.push(url);
            }
        
            // Unique history
            var historyBecameUnique = false;
            if (view.params.uniqueHistory) {
                var _history = view.history;
                var _url = url;
                if (view.params.uniqueHistoryIgnoreGetParameters) {
                    _history = [];
                    _url = url.split('?')[0];
                    for (i = 0; i < view.history.length; i++) {
                        _history.push(view.history[i].split('?')[0]);
                    }
                }
        
                if (_history.indexOf(_url) !== _history.lastIndexOf(_url)) {
                    view.history = view.history.slice(0, _history.indexOf(_url));
                    view.history.push(url);
                    historyBecameUnique = true;
                }
            }
            // Dom manipulations
            if (options.reloadPrevious) {
                oldPage = oldPage.prev('.page');
                newPage.insertBefore(oldPage);
                if (dynamicNavbar) {
                    oldNavbarInner = oldNavbarInner.prev('.navbar-inner');
                    newNavbarInner.insertAfter(oldNavbarInner);
                }
            }
            else {
                pagesContainer.append(newPage[0]);
                if (dynamicNavbar) navbar.append(newNavbarInner[0]);
            }
            // Remove Old Page And Navbar
            if (options.reload) {
                if (view.params.domCache && view.initialPages.indexOf(oldPage[0]) >= 0) {
                    oldPage.addClass('cached');
                    if (dynamicNavbar) oldNavbarInner.addClass('cached');
                }
                else {
                    app.pageRemoveCallback(view, oldPage[0], reloadPosition);
                    if (dynamicNavbar) app.navbarRemoveCallback(view, oldPage[0], navbar[0], oldNavbarInner[0]);
                    app.router._remove(oldPage);
                    if (dynamicNavbar) app.router._remove(oldNavbarInner);
                }
            }
        
            // Page Init Events
            app.pageInitCallback(view, {
                pageContainer: newPage[0],
                url: url,
                position: options.reload ? reloadPosition : 'right',
                navbarInnerContainer: dynamicNavbar ? newNavbarInner && newNavbarInner[0] : undefined,
                oldNavbarInnerContainer: dynamicNavbar ? oldNavbarInner && oldNavbarInner[0] : undefined,
                context: t7_rendered.context || options.context,
                query: options.query,
                fromPage: oldPage && oldPage.length && oldPage[0].f7PageData,
                reload: options.reload,
                reloadPrevious: options.reloadPrevious
            });
        
            // Navbar init event
            if (dynamicNavbar) {
                app.navbarInitCallback(view, newPage[0], navbar[0], newNavbarInner[0], url, options.reload ? reloadPosition : 'right');
            }
        
            if (options.reload) {
                view.allowPageChange = true;
                if (historyBecameUnique) view.refreshPreviousPage();
                return;
            }
        
            if (dynamicNavbar && animatePages) {
                app.router.prepareNavbar(newNavbarInner, oldNavbarInner, 'right');
            }
            // Force reLayout
            var clientLeft = newPage[0].clientLeft;
        
            // Before Anim Callback
            app.pageAnimCallback('before', view, {
                pageContainer: newPage[0],
                url: url,
                position: 'right',
                oldPage: oldPage,
                newPage: newPage,
                query: options.query,
                fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
            });
        
            function afterAnimation() {
                view.allowPageChange = true;
                newPage.removeClass('page-from-right-to-center page-on-right page-on-left').addClass('page-on-center');
                oldPage.removeClass('page-from-center-to-left page-on-center page-on-right').addClass('page-on-left');
                if (dynamicNavbar) {
                    newNavbarInner.removeClass('navbar-from-right-to-center navbar-on-left navbar-on-right').addClass('navbar-on-center');
                    oldNavbarInner.removeClass('navbar-from-center-to-left navbar-on-center navbar-on-right').addClass('navbar-on-left');
                }
                app.pageAnimCallback('after', view, {
                    pageContainer: newPage[0],
                    url: url,
                    position: 'right',
                    oldPage: oldPage,
                    newPage: newPage,
                    query: options.query,
                    fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
                });
                if (app.params.pushState && view.main) app.pushStateClearQueue();
                if (!(view.params.swipeBackPage || view.params.preloadPreviousPage)) {
                    if (view.params.domCache) {
                        oldPage.addClass('cached');
                        if (dynamicNavbar) oldNavbarInner.addClass('cached');
                    }
                    else {
                        if (!(url.indexOf('#') === 0 && newPage.attr('data-page').indexOf('smart-select-') === 0)) {
                            app.pageRemoveCallback(view, oldPage[0], 'left');
                            if (dynamicNavbar) app.navbarRemoveCallback(view, oldPage[0], navbar[0], oldNavbarInner[0]);
                            app.router._remove(oldPage);
                            if (dynamicNavbar) app.router._remove(oldNavbarInner);
                        }
                    }
                }
                if (view.params.uniqueHistory && historyBecameUnique) {
                    view.refreshPreviousPage();
                }
            }
            if (animatePages) {
                // Set pages before animation
                if (app.params.material && app.params.materialPageLoadDelay) {
                    setTimeout(function () {
                        app.router.animatePages(oldPage, newPage, 'to-left', view);
                    }, app.params.materialPageLoadDelay);
                }
                else {
                    app.router.animatePages(oldPage, newPage, 'to-left', view);
                }
        
                // Dynamic navbar animation
                if (dynamicNavbar) {
                    setTimeout(function() {
                        app.router.animateNavbars(oldNavbarInner, newNavbarInner, 'to-left', view);
                    }, 0);
                }
                newPage.animationEnd(function () {
                    afterAnimation();
                });
            }
            else {
                if (dynamicNavbar) newNavbarInner.find('.sliding, .sliding .back .icon').transform('');
                afterAnimation();
            }
        
        };
        
        app.router.load = function (view, options) {
            options = options || {};
            if (app.router.preroute(view, options)) {
                return false;
            }
            var url = options.url;
            var content = options.content;
            var pageName = options.pageName;
            var pageElement = options.pageElement;
            if (pageName) {
                if (pageName.indexOf('?') > 0) {
                    options.query = $.parseUrlQuery(pageName);
                    options.pageName = pageName = pageName.split('?')[0];
                }
            }
            var template = options.template;
            if (view.params.reloadPages === true) options.reload = true;
        
            if (!view.allowPageChange) return false;
            if (url && view.url === url && !options.reload && !view.params.allowDuplicateUrls) return false;
            view.allowPageChange = false;
            if (app.xhr && view.xhr && view.xhr === app.xhr) {
                app.xhr.abort();
                app.xhr = false;
            }
            function proceed(content) {
                app.router.preprocess(view, content, url, function (content) {
                    options.content = content;
                    app.router._load(view, options);
                });
            }
            if (content || pageName || pageElement) {
                proceed(content);
                return;
            }
            else if (template) {
                app.router._load(view, options);
                return;
            }
        
            if (!options.url || options.url === '#') {
                view.allowPageChange = true;
                return;
            }
            app.get(options.url, view, options.ignoreCache, function (content, error) {
                if (error) {
                    view.allowPageChange = true;
                    return;
                }
                proceed(content);
            });
        };
        
        app.router._back = function (view, options) {
            options = options || {};
        
            app.pluginHook('routerBack', view, options);
        
            var url = options.url,
                content = options.content,
                t7_rendered = {content: options.content}, // will be rendered using Template7
                template = options.template, // Template 7 compiled template
                animatePages = options.animatePages,
                preloadOnly = options.preloadOnly,
                pushState = options.pushState,
                ignoreCache = options.ignoreCache,
                force = options.force,
                pageName = options.pageName,
                pageElement = options.pageElement;
        
            var viewContainer = $(view.container),
                pagesContainer = $(view.pagesContainer),
                pagesInView = pagesContainer.children('.page:not(.cached)'),
                oldPage, newPage, oldNavbarInner, newNavbarInner, navbar, navbarInners, dynamicNavbar, manipulateDom = true;
        
            if (typeof animatePages === 'undefined') animatePages = view.params.animatePages;
        
            // Render with Template7
            if (app.params.template7Pages && typeof content === 'string' || template) {
                t7_rendered = app.router.template7Render(view, options);
                if (t7_rendered.content && !content) {
                    content = t7_rendered.content;
                }
            }
        
            // Animation
            function afterAnimation() {
                app.pageBackCallback('after', view, {
                    pageContainer: oldPage[0],
                    url: url,
                    position: 'center',
                    oldPage: oldPage,
                    newPage: newPage,
                });
                app.pageAnimCallback('after', view, {
                    pageContainer: newPage[0],
                    url: url,
                    position: 'left',
                    oldPage: oldPage,
                    newPage: newPage,
                    query: options.query,
                    fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
                });
                app.router.afterBack(view, oldPage[0], newPage[0]);
            }
            function animateBack() {
                // Page before animation callback
                app.pageBackCallback('before', view, {
                    pageContainer: oldPage[0],
                    url: url,
                    position: 'center',
                    oldPage: oldPage,
                    newPage: newPage,
                });
                app.pageAnimCallback('before', view, {
                    pageContainer: newPage[0],
                    url: url,
                    position: 'left',
                    oldPage: oldPage,
                    newPage: newPage,
                    query: options.query,
                    fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
                });
        
                if (animatePages) {
                    // Set pages before animation
                    app.router.animatePages(newPage, oldPage, 'to-right', view);
        
                    // Dynamic navbar animation
                    if (dynamicNavbar) {
                        setTimeout(function () {
                            app.router.animateNavbars(newNavbarInner, oldNavbarInner, 'to-right', view);
                        }, 0);
                    }
        
                    newPage.animationEnd(function () {
                        afterAnimation();
                    });
                }
                else {
                    if (dynamicNavbar) newNavbarInner.find('.sliding, .sliding .back .icon').transform('');
                    afterAnimation();
                }
            }
        
            function parseNewPage() {
                app.router.temporaryDom.innerHTML = '';
                // Parse DOM
                if ((typeof content === 'string') || (url && (typeof content === 'string'))) {
                    app.router.temporaryDom.innerHTML = t7_rendered.content;
                } else {
                    if ('length' in content && content.length > 1) {
                        for (var ci = 0; ci < content.length; ci++) {
                            $(app.router.temporaryDom).append(content[ci]);
                        }
                    } else {
                        $(app.router.temporaryDom).append(content);
                    }
                }
                if (pageElement) newPage = $(pageElement);
                else newPage = app.router.findElement('.page', app.router.temporaryDom, view);
        
                if (view.params.dynamicNavbar) {
                    // Find navbar
                    newNavbarInner = app.router.findElement('.navbar-inner', app.router.temporaryDom, view);
                }
            }
            function setPages() {
                // If pages not found or there are still more than one, exit
                if (!newPage || newPage.length === 0) {
                    view.allowPageChange = true;
                    return;
                }
                if (view.params.dynamicNavbar && typeof dynamicNavbar === 'undefined') {
                    if (!newNavbarInner || newNavbarInner.length === 0) {
                        dynamicNavbar = false;
                    }
                    else {
                        dynamicNavbar = true;
                    }
                }
        
                newPage.addClass('page-on-left').removeClass('cached');
                if (dynamicNavbar) {
                    navbar = viewContainer.children('.navbar');
                    navbarInners = navbar.find('.navbar-inner:not(.cached)');
                    newNavbarInner.addClass('navbar-on-left').removeClass('cached');
                }
                // Remove/hide previous page in force mode
                if (force) {
                    var pageToRemove, navbarToRemove;
                    pageToRemove = $(pagesInView[pagesInView.length - 2]);
        
                    if (dynamicNavbar) navbarToRemove = $(pageToRemove[0] && pageToRemove[0].f7RelatedNavbar || navbarInners[navbarInners.length - 2]);
                    if (view.params.domCache && view.initialPages.indexOf(pageToRemove[0]) >= 0) {
                        if (pageToRemove.length && pageToRemove[0] !== newPage[0]) pageToRemove.addClass('cached');
                        if (dynamicNavbar && navbarToRemove.length && navbarToRemove[0] !== newNavbarInner[0]) {
                            navbarToRemove.addClass('cached');
                        }
                    }
                    else {
                        var removeNavbar = dynamicNavbar && navbarToRemove.length;
                        if (pageToRemove.length) {
                            app.pageRemoveCallback(view, pageToRemove[0], 'right');
                            if (removeNavbar) {
                                app.navbarRemoveCallback(view, pageToRemove[0], navbar[0], navbarToRemove[0]);
                            }
                            app.router._remove(pageToRemove);
                            if (removeNavbar) app.router._remove(navbarToRemove);
                        }
                        else if (removeNavbar) {
                            app.navbarRemoveCallback(view, pageToRemove[0], navbar[0], navbarToRemove[0]);
                            app.router._remove(navbarToRemove);
                        }
                    }
                    pagesInView = pagesContainer.children('.page:not(.cached)');
                    if (dynamicNavbar) {
                        navbarInners = viewContainer.children('.navbar').find('.navbar-inner:not(.cached)');
                    }
                    if (view.history.indexOf(url) >= 0) {
                        view.history = view.history.slice(0, view.history.indexOf(url) + 2);
                    }
                    else {
                        if (view.history[[view.history.length - 2]]) {
                            view.history[view.history.length - 2] = url;
                        }
                        else {
                            view.history.unshift(url);
                        }
                    }
                }
        
                oldPage = $(pagesInView[pagesInView.length - 1]);
                if (view.params.domCache) {
                    if (oldPage[0] === newPage[0]) {
                        oldPage = pagesContainer.children('.page.page-on-center');
                        if (oldPage.length === 0 && view.activePage) oldPage = $(view.activePage.container);
                    }
                }
        
                if (dynamicNavbar && !oldNavbarInner) {
                    oldNavbarInner = $(navbarInners[navbarInners.length - 1]);
                    if (view.params.domCache) {
                        if (oldNavbarInner[0] === newNavbarInner[0]) {
                            oldNavbarInner = navbar.children('.navbar-inner.navbar-on-center:not(.cached)');
                        }
                        if (oldNavbarInner.length === 0) {
                            oldNavbarInner = navbar.children('.navbar-inner[data-page="'+oldPage.attr('data-page')+'"]');
                        }
                    }
                    if (oldNavbarInner.length === 0 || newNavbarInner[0] === oldNavbarInner[0]) dynamicNavbar = false;
                }
        
                if (dynamicNavbar) {
                    if (manipulateDom) newNavbarInner.insertBefore(oldNavbarInner);
                    newNavbarInner[0].f7RelatedPage = newPage[0];
                    newPage[0].f7RelatedNavbar = newNavbarInner[0];
                }
                if (manipulateDom) newPage.insertBefore(oldPage);
        
                // Page Init Events
                app.pageInitCallback(view, {
                    pageContainer: newPage[0],
                    url: url,
                    position: 'left',
                    navbarInnerContainer: dynamicNavbar ? newNavbarInner[0] : undefined,
                    oldNavbarInnerContainer: dynamicNavbar ? oldNavbarInner && oldNavbarInner[0] : undefined,
                    context: t7_rendered.context,
                    query: options.query,
                    fromPage: oldPage && oldPage.length && oldPage[0].f7PageData,
                    preloadOnly: preloadOnly
                });
                if (dynamicNavbar) {
                    app.navbarInitCallback(view, newPage[0], navbar[0], newNavbarInner[0], url, 'right');
                }
        
                if (dynamicNavbar && newNavbarInner.hasClass('navbar-on-left') && animatePages) {
                    app.router.prepareNavbar(newNavbarInner,  oldNavbarInner, 'left');
                }
        
                if (preloadOnly) {
                    view.allowPageChange = true;
                    return;
                }
        
                // Update View's URL
                view.url = url;
        
                // Force reLayout
                var clientLeft = newPage[0].clientLeft;
        
                animateBack();
        
                // Push state
                if (app.params.pushState && view.main)  {
                    if (typeof pushState === 'undefined') pushState = true;
                    if (!preloadOnly && history.state && pushState) {
                        history.back();
                    }
                }
                return;
            }
        
            // Simple go back when we have pages on left
            if (pagesInView.length > 1 && !force) {
                // Exit if only preloadOnly
                if (preloadOnly) {
                    view.allowPageChange = true;
                    return;
                }
                // Update View's URL
                view.url = view.history[view.history.length - 2];
                url = view.url;
        
                // Define old and new pages
                newPage = $(pagesInView[pagesInView.length - 2]);
                oldPage = $(pagesInView[pagesInView.length - 1]);
        
                // Dynamic navbar
                if (view.params.dynamicNavbar) {
                    dynamicNavbar = true;
                    // Find navbar
                    navbarInners = viewContainer.children('.navbar').find('.navbar-inner:not(.cached)');
                    newNavbarInner = $(navbarInners[0]);
                    oldNavbarInner = $(navbarInners[1]);
                    if (newNavbarInner.length === 0 || oldNavbarInner.length === 0 || oldNavbarInner[0] === newNavbarInner[0]) {
                        dynamicNavbar = false;
                    }
                }
                manipulateDom = false;
                setPages();
                return;
            }
        
            if (!force) {
                // Go back when there is no pages on left
                if (!preloadOnly) {
                    view.url = view.history[view.history.length - 2];
                    url = view.url;
                }
        
                if (content) {
                    parseNewPage();
                    setPages();
                    return;
                }
                else if (pageName) {
                    // Get dom cached pages
                    newPage = $(viewContainer).find('.page[data-page="' + pageName + '"]');
                    if (view.params.dynamicNavbar) {
                        newNavbarInner = $(viewContainer).children('.navbar').find('.navbar-inner[data-page="' + pageName + '"]');
                        if (newNavbarInner.length === 0 && newPage[0].f7RelatedNavbar) {
                            newNavbarInner = $(newPage[0].f7RelatedNavbar);
                        }
                        if (newNavbarInner.length === 0 && newPage[0].f7PageData) {
                            newNavbarInner = $(newPage[0].f7PageData.navbarInnerContainer);
                        }
                    }
                    setPages();
                    return;
                }
                else if (url && url in view.pageElementsCache) {
                    newPage = view.pageElementsCache[url].page;
                    newNavbarInner = view.pageElementsCache[url].navbarInner;
                    setPages();
                    return;
                }
                else {
                    view.allowPageChange = true;
                    return;
                }
            }
            else {
                if (url && url === view.url || pageName && view.activePage && view.activePage.name === pageName) {
                    view.allowPageChange = true;
                    return;
                }
                // Go back with force url
                if (content) {
                    parseNewPage();
                    setPages();
                    return;
                }
                else if (pageName && view.params.domCache) {
                    if (pageName) url = '#' + pageName;
        
                    newPage = $(viewContainer).find('.page[data-page="' + pageName + '"]');
                    if (newPage[0].f7PageData && newPage[0].f7PageData.url) {
                        url = newPage[0].f7PageData.url;
                    }
                    if (view.params.dynamicNavbar) {
                        newNavbarInner = $(viewContainer).children('.navbar').find('.navbar-inner[data-page="' + pageName + '"]');
                        if (newNavbarInner.length === 0 && newPage[0].f7RelatedNavbar) {
                            newNavbarInner = $(newPage[0].f7RelatedNavbar);
                        }
                        if (newNavbarInner.length === 0 && newPage[0].f7PageData) {
                            newNavbarInner = $(newPage[0].f7PageData.navbarInnerContainer);
                        }
                    }
                    setPages();
                    return;
                }
                else if (pageElement && url) {
                    newPage = $(pageElement);
                    if (view.params.dynamicNavbar) {
                        newNavbarInner = newPage.find('.navbar-inner').filter(function (index, el) {
                            return $(el).parents(app.router._modalsSelector).length === 0;
                        });
                        if (newNavbarInner.length > 0) {
                            newPage.prepend(newNavbarInner);
                            app.router._remove(newPage.find('.navbar').filter(function (index, el) {
                                return $(el).parents(app.router._modalsSelector).length === 0;
                            }));
                        }
                    }
                    setPages();
                    return;
                }
                else {
                    view.allowPageChange = true;
                    return;
                }
            }
        
        };
        app.router.back = function (view, options) {
            options = options || {};
            if (app.router.preroute(view, options, true)) {
                return false;
            }
            var url = options.url;
            var content = options.content;
            var pageName = options.pageName;
            var pageElement = options.pageElement;
            if (pageName) {
                if (pageName.indexOf('?') > 0) {
                    options.query = $.parseUrlQuery(pageName);
                    options.pageName = pageName = pageName.split('?')[0];
                }
            }
            var force = options.force;
            if (!view.allowPageChange) return false;
            view.allowPageChange = false;
            if (app.xhr && view.xhr && view.xhr === app.xhr) {
                app.xhr.abort();
                app.xhr = false;
            }
            var pagesInView = $(view.pagesContainer).find('.page:not(.cached)');
        
            function proceed(content) {
                app.router.preprocess(view, content, url, function (content) {
                    options.content = content;
                    app.router._back(view, options);
                });
            }
            if (pagesInView.length > 1 && !force) {
                // Simple go back to previos page in view
                app.router._back(view, options);
                return;
            }
            if (!force) {
                url = view.history[view.history.length - 2] || options.url;
                if (!options.url) options.url = url;
                if (!url) {
                    view.allowPageChange = true;
                    return;
                }
                if (url.indexOf('#') === 0 && view.contentCache[url]) {
                    proceed(view.contentCache[url]);
                    return;
                }
                else if (url.indexOf('#') === 0 && view.params.domCache) {
                    if (!pageName) options.pageName = url.split('#')[1];
                    proceed();
                    return;
                }
                else if (url && url in view.pageElementsCache) {
                    proceed();
                }
                else if (url.indexOf('#') !== 0) {
                    // Load ajax page
                    app.get(options.url, view, options.ignoreCache, function (content, error) {
                        if (error) {
                            view.allowPageChange = true;
                            return;
                        }
                        proceed(content);
                    });
                    return;
                }
            }
            else {
                // Go back with force url
                if (!url && content) {
                    proceed(content);
                    return;
                }
                else if (!url && pageName) {
                    if (pageName) url = '#' + pageName;
                    proceed();
                    return;
                }
                else if (url && pageElement) {
                    proceed();
                    return;
                }
                else if (url) {
                    app.get(options.url, view, options.ignoreCache, function (content, error) {
                        if (error) {
                            view.allowPageChange = true;
                            return;
                        }
                        proceed(content);
                    });
                    return;
                }
            }
            view.allowPageChange = true;
            return;
        };
        
        app.router.afterBack = function (view, oldPage, newPage) {
            // Remove old page and set classes on new one
            oldPage = $(oldPage);
            newPage = $(newPage);
        
            if (view.params.domCache && view.initialPages.indexOf(oldPage[0]) >= 0) {
                oldPage.removeClass('page-from-center-to-right').addClass('cached');
            }
            else {
                app.pageRemoveCallback(view, oldPage[0], 'right');
                app.router._remove(oldPage);
            }
        
            newPage.removeClass('page-from-left-to-center page-on-left').addClass('page-on-center');
            view.allowPageChange = true;
        
            // Update View's History
            var previousURL = view.history.pop();
        
            var newNavbar;
        
            // Updated dynamic navbar
            if (view.params.dynamicNavbar) {
                var inners = $(view.container).children('.navbar').find('.navbar-inner:not(.cached)');
                var oldNavbar = $(oldPage[0].f7RelatedNavbar || inners[1]);
                if (view.params.domCache && view.initialNavbars.indexOf(oldNavbar[0]) >= 0) {
                    oldNavbar.removeClass('navbar-from-center-to-right').addClass('cached');
                }
                else {
                    app.navbarRemoveCallback(view, oldPage[0], undefined, oldNavbar[0]);
                    app.router._remove(oldNavbar);
                }
                newNavbar = $(inners[0]).removeClass('navbar-on-left navbar-from-left-to-center').addClass('navbar-on-center');
            }
        
            // Remove pages in dom cache
            if (view.params.domCache) {
                $(view.container).find('.page.cached').each(function () {
                    var page = $(this);
                    var pageUrl = page[0].f7PageData && page[0].f7PageData.url;
                    if (pageUrl && view.history.indexOf(pageUrl) < 0 && view.initialPages.indexOf(this) < 0) {
                        app.pageRemoveCallback(view, page[0], 'right');
                        if (page[0].f7RelatedNavbar && view.params.dynamicNavbar) app.navbarRemoveCallback(view, page[0], undefined, page[0].f7RelatedNavbar);
                        app.router._remove(page);
                        if (page[0].f7RelatedNavbar && view.params.dynamicNavbar) app.router._remove(page[0].f7RelatedNavbar);
                    }
                });
            }
        
            // Check previous page is content based only and remove it from content cache
            if (!view.params.domCache &&
                previousURL &&
                previousURL.indexOf('#') > -1 &&
                (previousURL in view.contentCache) &&
                // If the same page is in the history multiple times, don't remove it.
                view.history.indexOf(previousURL) === -1) {
                view.contentCache[previousURL] = null;
                delete view.contentCache[previousURL];
            }
            if (previousURL &&
                (previousURL in view.pageElementsCache) &&
                // If the same page is in the history multiple times, don't remove it.
                view.history.indexOf(previousURL) === -1) {
                view.pageElementsCache[previousURL] = null;
                delete view.pageElementsCache[previousURL];
            }
            // Check for context cache
            if (previousURL &&
                (previousURL in view.contextCache) &&
                // If the same page is in the history multiple times, don't remove it.
                view.history.indexOf(previousURL) === -1) {
                view.contextCache[previousURL] = null;
                delete view.contextCache[previousURL];
            }
        
            if (app.params.pushState && view.main) app.pushStateClearQueue();
        
            // Preload previous page
            if (view.params.preloadPreviousPage) {
                if (view.params.domCache && view.history.length > 1) {
                    var preloadUrl = view.history[view.history.length - 2];
                    var previousPage;
                    var previousNavbar;
                    if (preloadUrl && view.pagesCache[preloadUrl]) {
                        // Load by page name
                        previousPage = $(view.container).find('.page[data-page="' + view.pagesCache[preloadUrl] + '"]');
                        if (previousPage.next('.page')[0] !== newPage[0]) previousPage.insertBefore(newPage);
                        if (newNavbar) {
                            previousNavbar = $(view.container).children('.navbar').find('.navbar-inner[data-page="' + view.pagesCache[preloadUrl] + '"]');
                            if(!previousNavbar || previousNavbar.length === 0) previousNavbar = newNavbar.prev('.navbar-inner.cached');
                            if (previousNavbar.next('.navbar-inner')[0] !== newNavbar[0]) previousNavbar.insertBefore(newNavbar);
                        }
                    }
                    else {
                        // Just load previous page
                        previousPage = newPage.prev('.page.cached');
                        if (newNavbar) previousNavbar = newNavbar.prev('.navbar-inner.cached');
                    }
                    if (previousPage && previousPage.length > 0) previousPage.removeClass('cached page-on-right page-on-center').addClass('page-on-left');
                    if (previousNavbar && previousNavbar.length > 0) previousNavbar.removeClass('cached navbar-on-right navbar-on-center').addClass('navbar-on-left');
                }
                else {
                    app.router.back(view, {preloadOnly: true});
                }
            }
        };
        

        /*======================================================
        ************   Modals   ************
        ======================================================*/
        var _modalTemplateTempDiv = document.createElement('div');
        app.modalStack = [];
        app.modalStackClearQueue = function () {
            if (app.modalStack.length) {
                (app.modalStack.shift())();
            }
        };
        app.modal = function (params) {
            params = params || {};
            var modalHTML = '';
            if (app.params.modalTemplate) {
                if (!app._compiledTemplates.modal) app._compiledTemplates.modal = t7.compile(app.params.modalTemplate);
                modalHTML = app._compiledTemplates.modal(params);
            }
            else {
                var buttonsHTML = '';
                if (params.buttons && params.buttons.length > 0) {
                    for (var i = 0; i < params.buttons.length; i++) {
                        buttonsHTML += '<span class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params.buttons[i].text + '</span>';
                    }
                }
                var titleHTML = params.title ? '<div class="modal-title">' + params.title + '</div>' : '';
                var textHTML = params.text ? '<div class="modal-text">' + params.text + '</div>' : '';
                var afterTextHTML = params.afterText ? params.afterText : '';
                var noButtons = !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '';
                var verticalButtons = params.verticalButtons ? 'modal-buttons-vertical': '';
                var modalButtonsHTML = params.buttons && params.buttons.length > 0 ? '<div class="modal-buttons modal-buttons-' + params.buttons.length + ' ' + verticalButtons + '">' + buttonsHTML + '</div>' : '';
                modalHTML = '<div class="modal ' + noButtons + ' ' + (params.cssClass || '') + '"><div class="modal-inner">' + (titleHTML + textHTML + afterTextHTML) + '</div>' + modalButtonsHTML + '</div>';
            }
        
            _modalTemplateTempDiv.innerHTML = modalHTML;
        
            var modal = $(_modalTemplateTempDiv).children();
        
            app.root.append(modal[0]);
        
            // Add events on buttons
            modal.find('.modal-button').each(function (index, el) {
                $(el).on('click', function (e) {
                    if (params.buttons[index].close !== false) app.closeModal(modal);
                    if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
                    if (params.onClick) params.onClick(modal, index);
                });
            });
            app.openModal(modal);
            return modal[0];
        };
        app.alert = function (text, title, callbackOk) {
            if (typeof title === 'function') {
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                buttons: [ {text: app.params.modalButtonOk, bold: true, onClick: callbackOk} ]
            });
        };
        app.confirm = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                buttons: [
                    {text: app.params.modalButtonCancel, onClick: callbackCancel},
                    {text: app.params.modalButtonOk, bold: true, onClick: callbackOk}
                ]
            });
        };
        app.prompt = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                afterText: '<div class="input-field"><input type="text" class="modal-text-input"></div>',
                buttons: [
                    {
                        text: app.params.modalButtonCancel
                    },
                    {
                        text: app.params.modalButtonOk,
                        bold: true
                    }
                ],
                onClick: function (modal, index) {
                    if (index === 0 && callbackCancel) callbackCancel($(modal).find('.modal-text-input').val());
                    if (index === 1 && callbackOk) callbackOk($(modal).find('.modal-text-input').val());
                }
            });
        };
        app.modalLogin = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                afterText: '<div class="input-field modal-input-double"><input type="text" name="modal-username" placeholder="' + app.params.modalUsernamePlaceholder + '" class="modal-text-input"></div><div class="input-field modal-input-double"><input type="password" name="modal-password" placeholder="' + app.params.modalPasswordPlaceholder + '" class="modal-text-input"></div>',
                buttons: [
                    {
                        text: app.params.modalButtonCancel
                    },
                    {
                        text: app.params.modalButtonOk,
                        bold: true
                    }
                ],
                onClick: function (modal, index) {
                    var username = $(modal).find('.modal-text-input[name="modal-username"]').val();
                    var password = $(modal).find('.modal-text-input[name="modal-password"]').val();
                    if (index === 0 && callbackCancel) callbackCancel(username, password);
                    if (index === 1 && callbackOk) callbackOk(username, password);
                }
            });
        };
        app.modalPassword = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                afterText: '<div class="input-field"><input type="password" name="modal-password" placeholder="' + app.params.modalPasswordPlaceholder + '" class="modal-text-input"></div>',
                buttons: [
                    {
                        text: app.params.modalButtonCancel
                    },
                    {
                        text: app.params.modalButtonOk,
                        bold: true
                    }
                ],
                onClick: function (modal, index) {
                    var password = $(modal).find('.modal-text-input[name="modal-password"]').val();
                    if (index === 0 && callbackCancel) callbackCancel(password);
                    if (index === 1 && callbackOk) callbackOk(password);
                }
            });
        };
        app.showPreloader = function (title) {
            return app.modal({
                title: title || app.params.modalPreloaderTitle,
                text: '<div class="preloader">' + (app.params.material ? app.params.materialPreloaderHtml : '') + '</div>',
                cssClass: 'modal-preloader'
            });
        };
        app.hidePreloader = function () {
            app.closeModal('.modal-preloader');
        };
        app.showIndicator = function () {
            if ($('.preloader-indicator-overlay').length > 0) return;
            app.root.append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white">' + (app.params.material ? app.params.materialPreloaderHtml : '') + '</span></div>');
        };
        app.hideIndicator = function () {
            $('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
        };
        // Action Sheet
        app.actions = function (target, params, animated) {
            var toPopover = false, modal, groupSelector, buttonSelector;
            if (arguments.length === 1 || arguments.length === 2 && typeof arguments[1] === 'boolean') {
                // Actions
                params = arguments[0];
                animated = arguments[1];
            }
            else {
                // Popover
                if (app.device.ios) {
                    if (app.device.ipad) toPopover = true;
                }
                else {
                    if (app.width >= 768) toPopover = true;
                }
            }
            if (typeof animated === 'undefined') animated = true;
        
            params = params || [];
        
            if (params.length > 0 && !Array.isArray(params[0])) {
                params = [params];
            }
            var modalHTML;
            if (toPopover) {
                var actionsToPopoverTemplate = app.params.modalActionsToPopoverTemplate ||
                    '<div class="popover actions-popover">' +
                      '<div class="popover-inner">' +
                        '{{#each this}}' +
                        '<div class="list-block">' +
                          '<ul>' +
                            '{{#each this}}' +
                            '{{#if label}}' +
                            '<li class="actions-popover-label {{#if color}}color-{{color}}{{/if}} {{#if bold}}actions-popover-bold{{/if}}">{{text}}</li>' +
                            '{{else}}' +
                            '<li><a href="#" class="item-link list-button {{#if color}}color-{{color}}{{/if}} {{#if bg}}bg-{{bg}}{{/if}} {{#if bold}}actions-popover-bold{{/if}} {{#if disabled}}disabled{{/if}}">{{text}}</a></li>' +
                            '{{/if}}' +
                            '{{/each}}' +
                          '</ul>' +
                        '</div>' +
                        '{{/each}}' +
                      '</div>' +
                    '</div>';
                if (!app._compiledTemplates.actionsToPopover) {
                    app._compiledTemplates.actionsToPopover = t7.compile(actionsToPopoverTemplate);
                }
                var popoverHTML = app._compiledTemplates.actionsToPopover(params);
                modal = $(app.popover(popoverHTML, target, true, animated));
                groupSelector = '.list-block ul';
                buttonSelector = '.list-button';
            }
            else {
                if (app.params.modalActionsTemplate) {
                    if (!app._compiledTemplates.actions) app._compiledTemplates.actions = t7.compile(app.params.modalActionsTemplate);
                    modalHTML = app._compiledTemplates.actions(params);
                }
                else {
                    var buttonsHTML = '';
                    for (var i = 0; i < params.length; i++) {
                        for (var j = 0; j < params[i].length; j++) {
                            if (j === 0) buttonsHTML += '<div class="actions-modal-group">';
                            var button = params[i][j];
                            var buttonClass = button.label ? 'actions-modal-label' : 'actions-modal-button';
                            if (button.bold) buttonClass += ' actions-modal-button-bold';
                            if (button.color) buttonClass += ' color-' + button.color;
                            if (button.bg) buttonClass += ' bg-' + button.bg;
                            if (button.disabled) buttonClass += ' disabled';
                            buttonsHTML += '<div class="' + buttonClass + '">' + button.text + '</div>';
                            if (j === params[i].length - 1) buttonsHTML += '</div>';
                        }
                    }
                    modalHTML = '<div class="actions-modal">' + buttonsHTML + '</div>';
                }
                _modalTemplateTempDiv.innerHTML = modalHTML;
                modal = $(_modalTemplateTempDiv).children();
                app.root.append(modal[0]);
                groupSelector = '.actions-modal-group';
                buttonSelector = '.actions-modal-button';
            }
        
            var groups = modal.find(groupSelector);
            groups.each(function (index, el) {
                var groupIndex = index;
                $(el).children().each(function (index, el) {
                    var buttonIndex = index;
                    var buttonParams = params[groupIndex][buttonIndex];
                    var clickTarget;
                    if (!toPopover && $(el).is(buttonSelector)) clickTarget = $(el);
                    if (toPopover && $(el).find(buttonSelector).length > 0) clickTarget = $(el).find(buttonSelector);
        
                    if (clickTarget) {
                        clickTarget.on('click', function (e) {
                            if (buttonParams.close !== false) app.closeModal(modal);
                            if (buttonParams.onClick) buttonParams.onClick(modal, e);
                        });
                    }
                });
            });
            if (!toPopover) app.openModal(modal, animated);
            return modal[0];
        };
        app.popover = function (modal, target, removeOnClose, animated, closeByOutside) {
            if (typeof removeOnClose === 'undefined') removeOnClose = true;
            if (typeof closeByOutside === 'undefined') closeByOutside = true;
            if (typeof animated === 'undefined') animated = true;
            if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
                var _modal = document.createElement('div');
                _modal.innerHTML = modal.trim();
                if (_modal.childNodes.length > 0) {
                    modal = _modal.childNodes[0];
                    if (removeOnClose) modal.classList.add('remove-on-close');
                    if (!closeByOutside) modal.classList.add('ignore-close-by-outside');
                    app.root.append(modal);
                }
                else return false; //nothing found
            }
            modal = $(modal);
            target = $(target);
            if (modal.length === 0 || target.length === 0) return false;
            if (modal.parents('body').length === 0) {
                if (removeOnClose) modal.addClass('remove-on-close');
                if (!closeByOutside) modal.addClass.add('ignore-close-by-outside');
                app.root.append(modal[0]);
            }
            if (modal.find('.popover-angle').length === 0 && !app.params.material) {
                modal.append('<div class="popover-angle"></div>');
            }
            modal.show();
        
            var material = app.params.material;
        
            function sizePopover() {
                modal.css({left: '', top: ''});
                var modalWidth =  modal.width();
                var modalHeight =  modal.height(); // 13 - height of angle
                var modalAngle, modalAngleSize = 0, modalAngleLeft, modalAngleTop;
                if (!material) {
                    modalAngle = modal.find('.popover-angle');
                    modalAngleSize = modalAngle.width() / 2;
                    modalAngle.removeClass('on-left on-right on-top on-bottom').css({left: '', top: ''});
                }
                else {
                    modal.removeClass('popover-on-left popover-on-right popover-on-top popover-on-bottom').css({left: '', top: ''});
                }
        
                var targetWidth = target.outerWidth();
                var targetHeight = target.outerHeight();
                var targetOffset = target.offset();
                var targetOffsetLeft = targetOffset.left - app.left;
                var targetOffsetTop = targetOffset.top - app.top;
                var targetParentPage = target.parents('.page');
                if (targetParentPage.length > 0) {
                    targetOffsetTop = targetOffsetTop - targetParentPage[0].scrollTop;
                }
        
                var modalTop = 0;
                var modalLeft = 0;
                var diff = 0;
                // Top Position
                var modalPosition = material ? 'bottom' : 'top';
                if (material) {
                    if (modalHeight < app.height - targetOffsetTop - targetHeight) {
                        // On bottom
                        modalPosition = 'bottom';
                        modalTop = targetOffsetTop;
                    }
                    else if (modalHeight < targetOffsetTop) {
                        // On top
                        modalTop = targetOffsetTop - modalHeight + targetHeight;
                        modalPosition = 'top';
                    }
                    else {
                        // On middle
                        modalPosition = 'bottom';
                        modalTop = targetOffsetTop;
                    }
        
                    if (modalTop <= 0) {
                        modalTop = 8;
                    }
                    else if (modalTop + modalHeight >= app.height) {
                        modalTop = app.height - modalHeight - 8;
                    }
        
                    // Horizontal Position
                    modalLeft = targetOffsetLeft;
                    if (modalLeft + modalWidth >= app.width - 8) {
                        modalLeft = targetOffsetLeft + targetWidth - modalWidth - 8;
                    }
                    if (modalLeft < 8) {
                        modalLeft = 8;
                    }
                    if (modalPosition === 'top') {
                        modal.addClass('popover-on-top');
                    }
                    if (modalPosition === 'bottom') {
                        modal.addClass('popover-on-bottom');
                    }
                    if (target.hasClass('floating-button-to-popover') && !modal.hasClass('modal-in')) {
                        modal.addClass('popover-floating-button');
                        var diffX = (modalLeft + modalWidth / 2) - (targetOffsetLeft + targetWidth / 2),
                            diffY = (modalTop + modalHeight / 2) - (targetOffsetTop + targetHeight / 2);
                        target
                            .addClass('floating-button-to-popover-in')
                            .transform('translate3d(' + diffX + 'px, ' + diffY + 'px,0)')
                            .transitionEnd(function (e) {
                                if (!target.hasClass('floating-button-to-popover-in')) return;
                                target
                                    .addClass('floating-button-to-popover-scale')
                                    .transform('translate3d(' + diffX + 'px, ' + diffY + 'px,0) scale(' + (modalWidth/targetWidth) + ', ' + (modalHeight/targetHeight) + ')');
                            });
        
                        modal.once('popover:close', function () {
                            target
                                .removeClass('floating-button-to-popover-in floating-button-to-popover-scale')
                                .addClass('floating-button-to-popover-out')
                                .transform('')
                                .transitionEnd(function (e) {
                                    target.removeClass('floating-button-to-popover-out');
                                });
                        });
                        modal.once('popover:closed', function () {
                            modal.removeClass('popover-floating-button');
                        });
                    }
                    else if (target.hasClass('floating-button-to-popover') && modal.hasClass('modal-in')) {
                        modalLeft = targetOffsetLeft;
                        modalTop = targetOffsetTop;
                    }
        
                }
                else {
                    if ((modalHeight + modalAngleSize) < targetOffsetTop) {
                        // On top
                        modalTop = targetOffsetTop - modalHeight - modalAngleSize;
                    }
                    else if ((modalHeight + modalAngleSize) < app.height - targetOffsetTop - targetHeight) {
                        // On bottom
                        modalPosition = 'bottom';
                        modalTop = targetOffsetTop + targetHeight + modalAngleSize;
                    }
                    else {
                        // On middle
                        modalPosition = 'middle';
                        modalTop = targetHeight / 2 + targetOffsetTop - modalHeight / 2;
                        diff = modalTop;
                        if (modalTop <= 0) {
                            modalTop = 5;
                        }
                        else if (modalTop + modalHeight >= app.height) {
                            modalTop = app.height - modalHeight - 5;
                        }
                        diff = diff - modalTop;
                    }
        
                    // Horizontal Position
                    if (modalPosition === 'top' || modalPosition === 'bottom') {
                        modalLeft = targetWidth / 2 + targetOffsetLeft - modalWidth / 2;
                        diff = modalLeft;
                        if (modalLeft < 5) modalLeft = 5;
                        if (modalLeft + modalWidth > app.width) modalLeft = app.width - modalWidth - 5;
                        if (modalPosition === 'top') {
                            modalAngle.addClass('on-bottom');
                        }
                        if (modalPosition === 'bottom') {
                            modalAngle.addClass('on-top');
                        }
                        diff = diff - modalLeft;
                        modalAngleLeft = (modalWidth / 2 - modalAngleSize + diff);
                        modalAngleLeft = Math.max(Math.min(modalAngleLeft, modalWidth - modalAngleSize * 2 - 13), 13);
                        modalAngle.css({left: modalAngleLeft + 'px'});
        
                    }
                    else if (modalPosition === 'middle') {
                        modalLeft = targetOffsetLeft - modalWidth - modalAngleSize;
                        modalAngle.addClass('on-right');
                        if (modalLeft < 5 || (modalLeft + modalWidth > app.width)) {
                            if (modalLeft < 5) modalLeft = targetOffsetLeft + targetWidth + modalAngleSize;
                            if (modalLeft + modalWidth > app.width) modalLeft = app.width - modalWidth - 5;
                            modalAngle.removeClass('on-right').addClass('on-left');
                        }
                        modalAngleTop = (modalHeight / 2 - modalAngleSize + diff);
                        modalAngleTop = Math.max(Math.min(modalAngleTop, modalHeight - modalAngleSize * 2 - 13), 13);
                        modalAngle.css({top: modalAngleTop + 'px'});
                    }
                }
        
        
                // Apply Styles
                modal.css({top: modalTop + 'px', left: modalLeft + 'px'});
            }
        
            sizePopover();
        
            app.onResize(sizePopover);
        
            modal.on('popover:close', function () {
                app.offResize(sizePopover);
            });
        
            app.openModal(modal, animated);
            return modal[0];
        };
        app.popup = function (modal, removeOnClose, animated) {
            if (typeof removeOnClose === 'undefined') removeOnClose = true;
            if (typeof animated === 'undefined') animated = true;
            if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
                var _modal = document.createElement('div');
                _modal.innerHTML = modal.trim();
                if (_modal.childNodes.length > 0) {
                    modal = _modal.childNodes[0];
                    if (removeOnClose) modal.classList.add('remove-on-close');
                    app.root.append(modal);
                }
                else return false; //nothing found
            }
            modal = $(modal);
            if (modal.length === 0) return false;
            if (modal.parents('body').length === 0) {
                if (removeOnClose) modal.addClass('remove-on-close');
                app.root.append(modal[0]);
            }
            modal.show();
        
            app.openModal(modal, animated);
            return modal[0];
        };
        app.pickerModal = function (modal, removeOnClose, animated) {
            if (typeof removeOnClose === 'undefined') removeOnClose = true;
            if (typeof animated === 'undefined') animated = true;
            if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
                modal = $(modal);
                if (modal.length > 0) {
                    if (removeOnClose) modal.addClass('remove-on-close');
                    app.root.append(modal[0]);
                }
                else return false; //nothing found
            }
            modal = $(modal);
            if (modal.length === 0) return false;
            if (modal.parents('body').length === 0) {
                if (removeOnClose) modal.addClass('remove-on-close');
                app.root.append(modal[0]);
            }
            if ($('.picker-modal.modal-in:not(.modal-out)').length > 0 && !modal.hasClass('modal-in')) {
                app.closeModal('.picker-modal.modal-in:not(.modal-out)');
            }
            modal.show();
            app.openModal(modal, animated);
            return modal[0];
        };
        app.loginScreen = function (modal, animated) {
            if (!modal) modal = '.login-screen';
            if (typeof animated === 'undefined') animated = true;
            modal = $(modal);
            if (modal.length === 0) return false;
            if ($('.login-screen.modal-in:not(.modal-out)').length > 0 && !modal.hasClass('modal-in')) {
                app.closeModal('.login-screen.modal-in:not(.modal-out)');
            }
            modal.show();
        
            app.openModal(modal, animated);
            return modal[0];
        };
        app.openModal = function (modal, animated) {
            if (typeof animated === 'undefined') animated = true;
            modal = $(modal);
            modal[animated ? 'removeClass' : 'addClass']('not-animated');
        
            var isModal = modal.hasClass('modal');
            var isPopover = modal.hasClass('popover');
            var isPopup = modal.hasClass('popup');
            var isLoginScreen = modal.hasClass('login-screen');
            var isPickerModal = modal.hasClass('picker-modal');
            var isActions = modal.hasClass('actions-modal');
        
            // Modal Event Prefix
            var modalType = 'modal';
            if (isPopover) modalType = 'popover';
            if (isPopup) modalType = 'popup';
            if (isLoginScreen) modalType = 'loginscreen';
            if (isPickerModal) modalType = 'picker';
            if (isActions) modalType = 'actions';
        
            if ($('.modal.modal-in:not(.modal-out)').length && app.params.modalStack && isModal) {
                app.modalStack.push(function () {
                    app.openModal(modal);
                });
                return;
            }
        
            // do nothing if this modal already shown
            if (true === modal.data('f7-modal-shown')) {
                return;
            }
            modal.data('f7-modal-shown', true);
        
            // Move modal
            var modalParent = modal.parent();
            if (app.params.modalsMoveToRoot && !modalParent.is(app.root)) {
                app.root.append(modal);
                modal.once(modalType + ':closed', function() {
                   modalParent.append(modal);
                });
            }
        
            modal.once(modalType + ':close', function() {
               modal.removeData('f7-modal-shown');
            });
        
            if (isModal) {
                modal.show();
                modal.css({
                    marginTop: - Math.round(modal.outerHeight() / 2) + 'px'
                });
            }
        
            var overlay;
            if (!isLoginScreen && !isPickerModal) {
                if ($('.modal-overlay').length === 0 && !isPopup) {
                    app.root.append('<div class="modal-overlay"></div>');
                }
                if ($('.popup-overlay').length === 0 && isPopup) {
                    app.root.append('<div class="popup-overlay"></div>');
                }
                overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
            }
            if (app.params.material && isPickerModal) {
                if (modal.hasClass('picker-calendar')) {
                    if ($('.picker-modal-overlay').length === 0 && !isPopup) {
                        app.root.append('<div class="picker-modal-overlay"></div>');
                    }
                    overlay = $('.picker-modal-overlay');
                }
            }
            if (overlay) {
                overlay[animated ? 'removeClass' : 'addClass']('not-animated');
            }
        
            //Make sure that styles are applied, trigger relayout;
            var clientLeft = modal[0].clientLeft;
        
            // Trugger open event
            modal.trigger('open ' + modalType + ':open');
        
            // Picker modal body class
            if (isPickerModal) {
                $('body').addClass('with-picker-modal');
            }
        
            // Init Pages and Navbars in modal
            if (modal.find('.' + app.params.viewClass).length > 0) {
                modal.find('.page').each(function () {
                    app.initPageWithCallback(this);
                });
                modal.find('.navbar').each(function () {
                    app.initNavbarWithCallback(this);
                });
            }
        
            // Classes for transition in
            if (!isLoginScreen && !isPickerModal) overlay.addClass('modal-overlay-visible');
            if (app.params.material && isPickerModal && overlay) overlay.addClass('modal-overlay-visible');
            if (animated) {
                modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function (e) {
                    if (modal.hasClass('modal-out')) modal.trigger('closed ' + modalType + ':closed');
                    else modal.trigger('opened ' + modalType + ':opened');
                });
            }
            else {
                modal.removeClass('modal-out').addClass('modal-in');
                modal.trigger('opened ' + modalType + ':opened');
            }
            return true;
        };
        app.closeModal = function (modal, animated) {
            if (typeof animated === 'undefined') animated = true;
            modal = $(modal || '.modal-in');
            if (typeof modal !== 'undefined' && modal.length === 0) {
                return;
            }
            modal[animated ? 'removeClass' : 'addClass']('not-animated');
            var isModal = modal.hasClass('modal');
            var isPopover = modal.hasClass('popover');
            var isPopup = modal.hasClass('popup');
            var isLoginScreen = modal.hasClass('login-screen');
            var isPickerModal = modal.hasClass('picker-modal');
            var isActions = modal.hasClass('actions-modal');
        
            // Modal Event Prefix
            var modalType = 'modal';
            if (isPopover) modalType = 'popover';
            if (isPopup) modalType = 'popup';
            if (isLoginScreen) modalType = 'loginscreen';
            if (isPickerModal) modalType = 'picker';
            if (isActions) modalType = 'actions';
        
            var removeOnClose = modal.hasClass('remove-on-close');
            
            // ignore close popover
            if (isPopover && modal.hasClass('ignore-close-by-outside')) {
                return;
            }
        
            // For Actions
            var keepOnClose = modal.hasClass('keep-on-close');
        
            var overlay;
        
            if (isPopup) overlay = $('.popup-overlay');
            else {
                if (isPickerModal && app.params.material) overlay = $('.picker-modal-overlay');
                else if (!isPickerModal) overlay = $('.modal-overlay');
            }
        
            if (isPopup){
                if (modal.length === $('.popup.modal-in').length) {
                    overlay.removeClass('modal-overlay-visible');
                }
            }
            else if (overlay && overlay.length > 0) {
                overlay.removeClass('modal-overlay-visible');
            }
            if (overlay) overlay[animated ? 'removeClass' : 'addClass']('not-animated');
        
            modal.trigger('close ' + modalType + ':close');
        
            // Picker modal body class
            if (isPickerModal) {
                $('body').removeClass('with-picker-modal');
                $('body').addClass('picker-modal-closing');
            }
        
            if (!(isPopover && !app.params.material)) {
                if (animated) {
                    modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function (e) {
                        if (modal.hasClass('modal-out')) modal.trigger('closed ' + modalType + ':closed');
                        else {
                            modal.trigger('opened ' + modalType + ':opened');
                            if (isPopover) return;
                        }
        
                        if (isPickerModal) {
                            $('body').removeClass('picker-modal-closing');
                        }
                        if (isPopup || isLoginScreen || isPickerModal || isPopover) {
                            modal.removeClass('modal-out').hide();
                            if (removeOnClose && modal.length > 0) {
                                modal.remove();
                            }
                        }
                        else if (!keepOnClose) {
                            modal.remove();
                        }
                    });
                }
                else {
                    modal.trigger('closed ' + modalType + ':closed');
                    modal.removeClass('modal-in modal-out');
                    if (isPickerModal) {
                        $('body').removeClass('picker-modal-closing');
                    }
                    if (isPopup || isLoginScreen || isPickerModal || isPopover) {
                        modal.hide();
                        if (removeOnClose && modal.length > 0) {
                            modal.remove();
                        }
                    }
                    else if (!keepOnClose) {
                        modal.remove();
                    }
                }
                if (isModal && app.params.modalStack) {
                    app.modalStackClearQueue();
                }
            }
            else {
                modal.removeClass('modal-in modal-out not-animated').trigger('closed ' + modalType + ':closed').hide();
                if (removeOnClose) {
                    modal.remove();
                }
            }
            return true;
        };
        

        /*===============================================================================
        ************   Progress Bar   ************
        ===============================================================================*/
        app.setProgressbar = function (container, progress, speed) {
            container = $(container || app.root);
            if (container.length === 0) return;
            if (progress) progress = Math.min(Math.max(progress, 0), 100);
            var progressbar;
            if (container.hasClass('progressbar')) progressbar = container;
            else {
                progressbar = container.children('.progressbar');
            }
            if (progressbar.length === 0 || progressbar.hasClass('progressbar-infinite')) return;
            var clientLeft = progressbar[0].clientLeft;
            progressbar.children('span').transform('translate3d(' + (-100 + progress) + '%,0,0)');
            if (typeof speed !== 'undefined') {
                progressbar.children('span').transition(speed);
            }
            else {
                progressbar.children('span').transition('');
            }
            return progressbar[0];
        };
        app.showProgressbar = function (container, progress, color) {
            if (typeof container === 'number') {
                container = app.root;
                progress = arguments[0];
                color = arguments[1];
            }
            if (progress && typeof progress === 'string' && parseFloat(progress) !== progress * 1) {
                color = progress;
                progress = undefined;
            }
            container = $(container || app.root);
            if (container.length === 0) return;
            var progressbar;
            if (container.hasClass('progressbar')) progressbar = container;
            else {
                progressbar = container.children('.progressbar:not(.progressbar-out), .progressbar-infinite:not(.progressbar-out)');
                if (progressbar.length === 0) {
                    // Create one
                    if (typeof progress !== 'undefined') {
                        // Determined
                        progressbar = $('<span class="progressbar progressbar-in' + (color ? ' color-' + color : '') + '"><span></span></span>');
                    }
                    else {
                        // Infinite
                        progressbar = $('<span class="progressbar-infinite progressbar-in' + (color ? ' color-' + color : '') + '"></span>');
                    }
                    container.append(progressbar);
                }
            }
            if (progress) app.setProgressbar(container, progress);
            return progressbar[0];
        };
        app.hideProgressbar = function (container) {
            container = $(container || app.root);
            if (container.length === 0) return;
            var progressbar;
            if (container.hasClass('progressbar')) progressbar = container;
            else {
                progressbar = container.children('.progressbar, .progressbar-infinite');
            }
            if (progressbar.length === 0 || !progressbar.hasClass('progressbar-in') || progressbar.hasClass('progressbar-out')) return;
            progressbar.removeClass('progressbar-in').addClass('progressbar-out').animationEnd(function () {
                progressbar.remove();
                progressbar = null;
            });
            return;
        };
        app.initPageProgressbar = function (pageContainer) {
            pageContainer = $(pageContainer);
            pageContainer.find('.progressbar').each(function () {
                var p = $(this);
                if (p.children('span').length === 0) p.append('<span></span>');
                if (p.attr('data-progress')) app.setProgressbar(p, p.attr('data-progress'));
            });
        };

        /*======================================================
        ************   Panels   ************
        ======================================================*/
        app.allowPanelOpen = true;
        app.openPanel = function (panelPosition, animated) {
            if (typeof animated === 'undefined') animated = true;
            if (!app.allowPanelOpen) return false;
            var panel = $('.panel-' + panelPosition);
            if (panel.length === 0 || panel.hasClass('active') || panel.hasClass('panel-visible-by-breakpoint')) return false;
            app.closePanel(); // Close if some panel is opened
            app.allowPanelOpen = false;
            var effect = panel.hasClass('panel-reveal') ? 'reveal' : 'cover';
            panel[animated ? 'removeClass' : 'addClass']('not-animated');
            panel.css({display: 'block'}).addClass('active');
            panel.trigger('open panel:open');
        
            var panelOverlay = $('.panel-overlay');
            panelOverlay[animated ? 'removeClass' : 'addClass']('not-animated');
            panelOverlay.show();
        
            if (panel.find('.' + app.params.viewClass).length > 0) {
                if (app.sizeNavbars) app.sizeNavbars(panel.find('.' + app.params.viewClass)[0]);
            }
        
            // Trigger reLayout
            var clientLeft = panel[0].clientLeft;
        
            // Transition End;
            var transitionEndTarget = effect === 'reveal' ? $('.' + app.params.viewsClass) : panel;
        
            function panelTransitionEnd() {
                transitionEndTarget.transitionEnd(function (e) {
                    if ($(e.target).is(transitionEndTarget)) {
                        if (panel.hasClass('active')) {
                            panel.trigger('opened panel:opened');
                        }
                        else {
                            panel.trigger('closed panel:closed');
                        }
                        panelOverlay.css({display: ''});
                        app.allowPanelOpen = true;
                    }
                    else panelTransitionEnd();
                });
            }
            if (animated) {
                panelTransitionEnd();
            }
            else {
                panel.trigger('opened panel:opened');
                panelOverlay.css({display: ''});
                app.allowPanelOpen = true;
            }
        
            $('body').addClass('with-panel-' + panelPosition + '-' + effect);
            return true;
        };
        app.closePanel = function (animated) {
            if (typeof animated === 'undefined') animated = true;
            var activePanel = $('.panel.active');
            if (activePanel.length === 0 || activePanel.hasClass('panel-visible-by-breakpoint')) return false;
            var effect = activePanel.hasClass('panel-reveal') ? 'reveal' : 'cover';
            var panelPosition = activePanel.hasClass('panel-left') ? 'left' : 'right';
            activePanel[animated ? 'removeClass' : 'addClass']('not-animated');
            activePanel.removeClass('active');
        
            var panelOverlay = $('.panel-overlay');
            panelOverlay.removeClass('not-animated');
        
            var transitionEndTarget = effect === 'reveal' ? $('.' + app.params.viewsClass) : activePanel;
            activePanel.trigger('close panel:close');
            app.allowPanelOpen = false;
            if (animated) {
                transitionEndTarget.transitionEnd(function () {
                    if (activePanel.hasClass('active')) return;
                    activePanel.css({display: ''});
                    activePanel.trigger('closed panel:closed');
                    $('body').removeClass('panel-closing');
                    app.allowPanelOpen = true;
                });
                $('body').addClass('panel-closing').removeClass('with-panel-' + panelPosition + '-' + effect);
            }
            else {
                activePanel.css({display: ''});
                activePanel.trigger('closed panel:closed');
                activePanel.removeClass('not-animated');
                $('body').removeClass('with-panel-' + panelPosition + '-' + effect);
                app.allowPanelOpen = true;
            }
        };
        /*======================================================
        ************   Panels breakpoints   ************
        ======================================================*/
        app.initPanelsBreakpoints = function () {
            var panelLeft = $('.panel-left');
            var panelRight = $('.panel-right');
            var views = app.root.children('.views');
            var wasVisible;
            function setPanels() {
                // Left Panel
                if (app.params.panelLeftBreakpoint && panelLeft.length > 0) {
                    wasVisible = panelLeft.hasClass('panel-visible-by-breakpoint');
                    if (app.width >= app.params.panelLeftBreakpoint) {
                        if (!wasVisible) {
                            $('body').removeClass('with-panel-left-reveal with-panel-left-cover');
                            panelLeft.css('display', '').addClass('panel-visible-by-breakpoint').removeClass('active');
                            panelLeft.trigger('open panel:open opened panel:opened');
                            views.css({
                                'margin-left': panelLeft.width() + 'px'
                            });
                            app.allowPanelOpen = true;
                        }
                    }
                    else {
                        if (wasVisible) {
                            panelLeft.css('display', '').removeClass('panel-visible-by-breakpoint active');
                            panelLeft.trigger('close panel:close closed panel:closed');
                            views.css({
                                'margin-left': ''
                            });
                            app.allowPanelOpen = true;
                        }
                    }
                }
                // Right Panel
                if (app.params.panelRightBreakpoint && panelRight.length > 0) {
                    wasVisible = panelRight.hasClass('panel-visible-by-breakpoint');
                    if (app.width >= app.params.panelRightBreakpoint) {
                        if (!wasVisible) {
                            $('body').removeClass('with-panel-right-reveal with-panel-right-cover');
                            panelRight.css('display', '').addClass('panel-visible-by-breakpoint').removeClass('active');
                            panelRight.trigger('open panel:open opened panel:opened');
                            views.css({
                                'margin-right': panelRight.width() + 'px'
                            });
                            app.allowPanelOpen = true;
                        }
                    }
                    else {
                        if (wasVisible) {
                            panelRight.css('display', '').removeClass('panel-visible-by-breakpoint active');
                            panelRight.trigger('close panel:close closed panel:closed');
                            views.css({
                                'margin-right': ''
                            });
                            app.allowPanelOpen = true;
                        }
                    }
                }
            }
            app.onResize(setPanels);
            setPanels();
        };
        /*======================================================
        ************   Swipe panels   ************
        ======================================================*/
        app.initSwipePanels = function () {
            var panel, side;
            if (app.params.swipePanel) {
                panel = $('.panel.panel-' + app.params.swipePanel);
                side = app.params.swipePanel;
                if (panel.length === 0 && side !== 'both') return;
            }
            else {
                if (app.params.swipePanelOnlyClose) {
                    if ($('.panel').length === 0) return;
                }
                else return;
            }
        
            var panelOverlay = $('.panel-overlay');
            var isTouched, isMoved, isScrolling, touchesStart = {}, touchStartTime, touchesDiff, translate, overlayOpacity, opened, panelWidth, effect, direction;
            var views = $('.' + app.params.viewsClass);
        
            function handleTouchStart(e) {
                if (!app.allowPanelOpen || (!app.params.swipePanel && !app.params.swipePanelOnlyClose) || isTouched) return;
                if ($('.modal-in, .photo-browser-in').length > 0) return;
                if (!(app.params.swipePanelCloseOpposite || app.params.swipePanelOnlyClose)) {
                    if ($('.panel.active').length > 0 && !panel.hasClass('active')) return;
                }
                if (e.target && e.target.nodeName.toLowerCase() === 'input' && e.target.type === 'range') return;
                if ($(e.target).closest('.tabs-swipeable-wrap').length > 0) return;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                if (app.params.swipePanelCloseOpposite || app.params.swipePanelOnlyClose) {
                    if ($('.panel.active').length > 0) {
                        side = $('.panel.active').hasClass('panel-left') ? 'left' : 'right';
                    }
                    else {
                        if (app.params.swipePanelOnlyClose) return;
                        side = app.params.swipePanel;
                    }
                    if (!side) return;
                }
                panel = $('.panel.panel-' + side);
                opened = panel.hasClass('active');
                if (app.params.swipePanelActiveArea && !opened) {
                    if (side === 'left') {
                        if (touchesStart.x > app.params.swipePanelActiveArea) return;
                    }
                    if (side === 'right') {
                        if (touchesStart.x < app.width - app.params.swipePanelActiveArea) return;
                    }
                }
                isMoved = false;
                isTouched = true;
                isScrolling = undefined;
        
                touchStartTime = (new Date()).getTime();
                direction = undefined;
            }
            function handleTouchMove(e) {
                if (!isTouched) return;
                if (e.f7PreventPanelSwipe) return;
                var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (isScrolling) {
                    isTouched = false;
                    return;
                }
                if (!direction) {
                    if (pageX > touchesStart.x) {
                        direction = 'to-right';
                    }
                    else {
                        direction = 'to-left';
                    }
        
                    if(side === 'both'){
                        if ($('.panel.active').length > 0) {
                            side = $('.panel.active').hasClass('panel-left') ? 'left' : 'right';
                        }
                        else {
                            side = direction === 'to-right' ? 'left' : 'right';
                        }
                        if (app.params.swipePanelActiveArea > 0) {
                            if (side === 'left' && touchesStart.x > app.params.swipePanelActiveArea) {
                                isTouched = false;
                                return;
                            }
                            if (side === 'right' && touchesStart.x < app.width - app.params.swipePanelActiveArea) {
                                isTouched = false;
                                return;
                            }
                        }
                        panel = $('.panel.panel-' + side);
                    }
                    if (panel.hasClass('panel-visible-by-breakpoint')) {
                        isTouched = false;
                        return;
                    }
        
                    if (
                        side === 'left' &&
                        (
                            direction === 'to-left' && !panel.hasClass('active')
                        ) ||
                        side === 'right' &&
                        (
                            direction === 'to-right' && !panel.hasClass('active')
                        )
                    )
                    {
                        isTouched = false;
                        return;
                    }
                }
        
                if (app.params.swipePanelNoFollow) {
                    var timeDiff = (new Date()).getTime() - touchStartTime;
                    if (timeDiff < 300) {
                        if (direction === 'to-left') {
                            if (side === 'right') app.openPanel(side);
                            if (side === 'left' && panel.hasClass('active')) app.closePanel();
                        }
                        if (direction === 'to-right') {
                            if (side === 'left') app.openPanel(side);
                            if (side === 'right' && panel.hasClass('active')) app.closePanel();
                        }
                    }
                    isTouched = false;
                    isMoved = false;
                    return;
                }
        
                if (!isMoved) {
                    effect = panel.hasClass('panel-cover') ? 'cover' : 'reveal';
                    if (!opened) {
                        panel.show();
                        panelOverlay.show();
                    }
                    panelWidth = panel[0].offsetWidth;
                    panel.transition(0);
                    if (panel.find('.' + app.params.viewClass).length > 0) {
                        if (app.sizeNavbars) app.sizeNavbars(panel.find('.' + app.params.viewClass)[0]);
                    }
                }
        
                isMoved = true;
        
                e.preventDefault();
                var threshold = opened ? 0 : -app.params.swipePanelThreshold;
                if (side === 'right') threshold = -threshold;
        
                touchesDiff = pageX - touchesStart.x + threshold;
        
                if (side === 'right') {
                    if (effect === 'cover') {
                        translate = touchesDiff + (opened ? 0 : panelWidth);
                        if (translate < 0) translate = 0;
                        if (translate > panelWidth) {
                            translate = panelWidth;
                        }
                    }
                    else {
                        translate = touchesDiff - (opened ? panelWidth : 0);
                        if (translate > 0) translate = 0;
                        if (translate < -panelWidth) {
                            translate = -panelWidth;
                        }
                    }
                }
                else {
                    translate = touchesDiff + (opened ? panelWidth : 0);
                    if (translate < 0) translate = 0;
                    if (translate > panelWidth) {
                        translate = panelWidth;
                    }
                }
                if (effect === 'reveal') {
                    views.transform('translate3d(' + translate + 'px,0,0)').transition(0);
                    panelOverlay.transform('translate3d(' + translate + 'px,0,0)').transition(0);
        
                    panel.trigger('panel:swipe', {progress: Math.abs(translate / panelWidth)});
                    app.pluginHook('swipePanelSetTransform', views[0], panel[0], Math.abs(translate / panelWidth));
                }
                else {
                    if (side === 'left') translate = translate - panelWidth;
                    panel.transform('translate3d(' + (translate) + 'px,0,0)').transition(0);
        
                    panelOverlay.transition(0);
                    overlayOpacity = 1 - Math.abs(translate/panelWidth);
                    panelOverlay.css({opacity: overlayOpacity});
        
                    panel.trigger('panel:swipe', {progress: Math.abs(translate / panelWidth)});
                    app.pluginHook('swipePanelSetTransform', views[0], panel[0], Math.abs(translate / panelWidth));
                }
            }
            function handleTouchEnd(e) {
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                isTouched = false;
                isMoved = false;
                var timeDiff = (new Date()).getTime() - touchStartTime;
                var action;
                var edge = (translate === 0 || Math.abs(translate) === panelWidth);
        
                if (!opened) {
                    if (effect === 'cover') {
                        if (translate === 0) {
                            action = 'swap'; //open
                        }
                        else if (timeDiff < 300 && Math.abs(translate) > 0) {
                            action = 'swap'; //open
                        }
                        else if (timeDiff >= 300 && Math.abs(translate) < panelWidth / 2) {
                            action = 'swap'; //open
                        }
                        else {
                            action = 'reset'; //close
                        }
                    }
                    else {
                        if (translate === 0) {
                            action = 'reset';
                        }
                        else if (
                            timeDiff < 300 && Math.abs(translate) > 0 ||
                            timeDiff >= 300 && (Math.abs(translate) >= panelWidth / 2)
                        ) {
                            action = 'swap';
                        }
                        else {
                            action = 'reset';
                        }
                    }
                }
                else {
                    if (effect === 'cover') {
                        if (translate === 0) {
                            action = 'reset'; //open
                        }
                        else if (timeDiff < 300 && Math.abs(translate) > 0) {
                            action = 'swap'; //open
                        }
                        else if (timeDiff >= 300 && Math.abs(translate) < panelWidth / 2) {
                            action = 'reset'; //open
                        }
                        else {
                            action = 'swap'; //close
                        }
                    }
                    else {
                        if (translate === -panelWidth) {
                            action = 'reset';
                        }
                        else if (
                            timeDiff < 300 && Math.abs(translate) >= 0 ||
                            timeDiff >= 300 && (Math.abs(translate) <= panelWidth / 2)
                        ) {
                            if (side === 'left' && translate === panelWidth) action = 'reset';
                            else action = 'swap';
                        }
                        else {
                            action = 'reset';
                        }
                    }
                }
                if (action === 'swap') {
                    app.allowPanelOpen = true;
                    if (opened) {
                        app.closePanel();
                        if (edge) {
                            panel.css({display: ''});
                            $('body').removeClass('panel-closing');
                        }
                    }
                    else {
                        app.openPanel(side);
                    }
                    if (edge) app.allowPanelOpen = true;
                }
                if (action === 'reset') {
                    if (opened) {
                        app.allowPanelOpen = true;
                        app.openPanel(side);
                    }
                    else {
                        app.closePanel();
                        if (edge) {
                            app.allowPanelOpen = true;
                            panel.css({display: ''});
                        }
                        else {
                            var target = effect === 'reveal' ? views : panel;
                            panel.trigger('close panel:close');
                            $('body').addClass('panel-closing');
                            target.transitionEnd(function () {
                                if (panel.hasClass('active')) return;
                                panel.trigger('close panel:closed');
                                panel.css({display: ''});
                                $('body').removeClass('panel-closing');
                                app.allowPanelOpen = true;
                            });
                        }
                    }
                }
                if (effect === 'reveal') {
                    views.transition('');
                    views.transform('');
                }
                panel.transition('').transform('');
                panelOverlay.css({display: ''}).transform('').transition('').css('opacity', '');
            }
            var passiveListener = app.touchEvents.start === 'touchstart' && app.support.passiveListener ? {passive: true, capture: false} : false;
            var activeListener = app.support.passiveListener ? {passive: false, capture: false} : false;
            $(document).on(app.touchEvents.start, handleTouchStart, passiveListener);
            $(document).on(app.touchEvents.move, handleTouchMove, activeListener);
            $(document).on(app.touchEvents.end, handleTouchEnd, passiveListener);
        };
        

        /*======================================================
        ************   Image Lazy Loading   ************
        ************   Based on solution by Marc Godard, https://github.com/MarcGodard   ************
        ======================================================*/
        app.initImagesLazyLoad = function (pageContainer) {
            pageContainer = $(pageContainer);
        
            // Lazy images
            var lazyLoadImages;
            if (pageContainer.hasClass('lazy')) {
                lazyLoadImages = pageContainer;
                pageContainer = lazyLoadImages.parents('.page');
            }
            else {
                lazyLoadImages = pageContainer.find('.lazy');
            }
            if (lazyLoadImages.length === 0) return;
        
            // Scrollable page content
            var pageContent;
            if (pageContainer.hasClass('page-content'))  {
                pageContent = pageContainer;
                pageContainer = pageContainer.parents('.page');
            }
            else  {
                pageContent = pageContainer.find('.page-content');
            }
            if (pageContent.length === 0) return;
        
            // Placeholder
            var placeholderSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXCwsK592mkAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
            if (typeof app.params.imagesLazyLoadPlaceholder === 'string') {
                placeholderSrc = app.params.imagesLazyLoadPlaceholder;
            }
            if (app.params.imagesLazyLoadPlaceholder !== false) lazyLoadImages.each(function(){
                if ($(this).attr('data-src') && !$(this).attr('src')) $(this).attr('src', placeholderSrc);
            });
        
            // load image
            var imagesSequence = [];
            var imageIsLoading = false;
            function loadImage(el) {
                el = $(el);
        
                var bg = el.attr('data-background');
                var src = bg ? bg : el.attr('data-src');
                if (!src) return;
        
                function onLoad() {
                    el.removeClass('lazy').addClass('lazy-loaded');
                    if (bg) {
                        el.css('background-image', 'url(' + src + ')');
                    }
                    else {
                        el.attr('src', src);
                    }
        
                    if (app.params.imagesLazyLoadSequential) {
                        imageIsLoading = false;
                        if (imagesSequence.length > 0) {
                            loadImage(imagesSequence.shift());
                        }
                    }
                    el.trigger('lazy-loaded');
                    if (app.params.onLazyLoaded) app.params.onLazyLoaded(el);
                }
        
                function onError() {
                    el.removeClass('lazy').addClass('lazy-loaded');
                    if (bg) {
                        el.css('background-image', 'url(' + placeholderSrc + ')');
                    }
                    else {
                        el.attr('src', placeholderSrc);
                    }
        
                    if (app.params.imagesLazyLoadSequential) {
                        imageIsLoading = false;
                        if (imagesSequence.length > 0) {
                            loadImage(imagesSequence.shift());
                        }
                    }
                    el.trigger('lazy-error');
                    if (app.params.onLazyError) app.params.onLazyError(el);
                }
        
                if (app.params.imagesLazyLoadSequential) {
                    if (imageIsLoading) {
                        if (imagesSequence.indexOf(el[0]) < 0) imagesSequence.push(el[0]);
                        return;
                    }
                }
        
                // Loading flag
                imageIsLoading = true;
        
                var image = new Image();
                image.onload = onLoad;
                image.onerror = onError;
                image.src =src;
        
                // Add loaded callback and events
                el.trigger('lazy-load');
                if (app.params.onLazyLoad && !el.hasClass('lazy-loaded')) app.params.onLazyLoad(el);
            }
            function lazyHandler() {
                lazyLoadImages = pageContainer.find('.lazy');
                lazyLoadImages.each(function(index, el) {
                    el = $(el);
                    if (el.parents('.tab:not(.active)').length > 0) {
                        return;
                    }
                    if (isElementInViewport(el[0])) {
                        loadImage(el);
                    }
                });
            }
        
            function isElementInViewport (el) {
                var rect = el.getBoundingClientRect();
                var threshold = app.params.imagesLazyLoadThreshold || 0;
                return (
                    rect.top >= (0 - threshold) &&
                    rect.left >= (0 - threshold) &&
                    rect.top <= (app.height + threshold) &&
                    rect.left <= (app.width + threshold)
                );
            }
        
            function attachEvents(destroy) {
                var method = destroy ? 'off' : 'on';
                lazyLoadImages[method]('lazy', lazyHandler);
                lazyLoadImages.parents('.tab')[method]('show', lazyHandler);
                pageContainer[method]('lazy', lazyHandler);
                pageContent[method]('lazy', lazyHandler);
                pageContent[method]('scroll', lazyHandler);
                app[method === 'on' ? 'onResize' : 'offResize'](lazyHandler);
            }
            function detachEvents() {
                attachEvents(true);
            }
        
            // Store detach function
            pageContainer[0].f7DestroyImagesLazyLoad = detachEvents;
        
            // Attach events
            attachEvents();
        
            // Destroy on page remove
            if (pageContainer.hasClass('page')) {
                pageContainer.once('page:beforeremove', detachEvents);
            }
        
            // Run loader on page load/init
            lazyHandler();
        
            // Run after page animation
            pageContainer.once('page:afteranimation', lazyHandler);
        };
        app.destroyImagesLazyLoad = function (pageContainer) {
            pageContainer = $(pageContainer);
            if (pageContainer.length > 0 && pageContainer[0].f7DestroyImagesLazyLoad) {
                pageContainer[0].f7DestroyImagesLazyLoad();
            }
        };
        app.reinitImagesLazyLoad = function (pageContainer) {
            pageContainer = $(pageContainer);
            if (pageContainer.length > 0) {
                pageContainer.trigger('lazy');
            }
        };
        

        /*======================================================
        ************   Material Preloader   ************
        ======================================================*/
        app.initPageMaterialPreloader = function (pageContainer) {
            $(pageContainer).find('.preloader').each(function () {
                if ($(this).children().length === 0) {
                    $(this).html(app.params.materialPreloaderHtml);
                }
            });
        };

        /*======================================================
        ************   Messages   ************
        ======================================================*/
        var Messages = function (container, params) {
            var defaults = {
                autoLayout: true,
                newMessagesFirst: false,
                scrollMessages: true,
                scrollMessagesOnlyOnEdge: false,
                messageTemplate:
                    '{{#if day}}' +
                    '<div class="messages-date">{{day}} {{#if time}}, <span>{{time}}</span>{{/if}}</div>' +
                    '{{/if}}' +
                    '<div class="message message-{{type}} {{#if hasImage}}message-pic{{/if}} {{#if avatar}}message-with-avatar{{/if}} {{#if position}}message-appear-from-{{position}}{{/if}}">' +
                        '{{#if name}}<div class="message-name">{{name}}</div>{{/if}}' +
                        '<div class="message-text">{{text}}{{#if date}}<div class="message-date">{{date}}</div>{{/if}}</div>' +
                        '{{#if avatar}}<div class="message-avatar" style="background-image:url({{avatar}})"></div>{{/if}}' +
                        '{{#if label}}<div class="message-label">{{label}}</div>{{/if}}' +
                    '</div>'
            };
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined' || params[def] === null) {
                    params[def] = defaults[def];
                }
            }
        
            // Instance
            var m = this;
        
            // Params
            m.params = params;
        
            // Container
            m.container = $(container);
            if (m.container.length === 0) return;
        
            // Autolayout
            if (m.params.autoLayout) m.container.addClass('messages-auto-layout');
        
            // New messages first
            if (m.params.newMessagesFirst) m.container.addClass('messages-new-first');
        
            // Is In Page
            m.pageContainer = m.container.parents('.page').eq(0);
            m.pageContent = m.pageContainer.find('.page-content');
        
            // Compiled template
            m.template = Template7.compile(m.params.messageTemplate);
        
            // Auto Layout
            m.layout = function () {
                if (!m.container.hasClass('messages-auto-layout')) m.container.addClass('messages-auto-layout');
                m.container.find('.message').each(function () {
                    var message = $(this);
                    if (message.find('.message-text img').length > 0) {
                        var childNodes = message.find('.message-text')[0].childNodes;
                        var onlyPic = true;
                        for (var i = 0 ; i < childNodes.length; i++) {
                            if (childNodes[i].nodeType === 1 && childNodes[i].nodeName.toLowerCase() !== 'img') onlyPic = false;
                            if (childNodes[i].nodeType === 3 && childNodes[i].textContent.trim() !== '') onlyPic = false;
                        }
                        if (onlyPic) message.addClass('message-pic');
                        else message.removeClass('message-pic');
                    }
                    if (message.find('.message-avatar').length > 0) message.addClass('message-with-avatar');
                });
                m.container.find('.message').each(function () {
                    var message = $(this);
                    var isSent = message.hasClass('message-sent');
                    var next = message.next('.message-' + (isSent ? 'sent' : 'received'));
                    var prev = message.prev('.message-' + (isSent ? 'sent' : 'received'));
                    if (next.length === 0) {
                        message.addClass('message-last message-with-tail');
                    }
                    else message.removeClass('message-last message-with-tail');
        
                    if (prev.length === 0) {
                        message.addClass('message-first');
                    }
                    else message.removeClass('message-first');
        
                    if (prev.length > 0 && prev.find('.message-name').length > 0 && message.find('.message-name').length > 0) {
                        if (prev.find('.message-name').text() !== message.find('.message-name').text()) {
                            prev.addClass('message-last message-with-tail');
                            message.addClass('message-first');
                        }
                    }
                });
            };
        
            // Add Message
            m.appendMessage = function (props, animate) {
                return m.addMessage(props, 'append', animate);
            };
            m.prependMessage = function (props, animate) {
                return m.addMessage(props, 'prepend', animate);
            };
            m.addMessage = function (props, method, animate) {
                return m.addMessages([props], method, animate);
            };
            m.addMessages = function (newMessages, method, animate) {
                if (typeof animate === 'undefined') {
                    animate = true;
                }
                if (typeof method === 'undefined') {
                    method = m.params.newMessagesFirst ? 'prepend' : 'append';
                }
                var newMessagesHTML = '', i;
                for (i = 0; i < newMessages.length; i++) {
                    var props = newMessages[i] || {};
                    props.type = props.type || 'sent';
                    if (!props.text) continue;
                    props.hasImage = props.text.indexOf('<img') >= 0;
                    if (props.onlyImage === false) props.hasImage = false;
                    if (animate) props.position = method === 'append' ? 'bottom' : 'top';
        
                    newMessagesHTML += m.template(props);
                }
                var scrollHeightBefore = m.pageContent[0].scrollHeight,
                    heightBefore = m.pageContent[0].offsetHeight,
                    scrollBefore = m.pageContent[0].scrollTop;
                m.container[method](newMessagesHTML);
                if (m.params.autoLayout) m.layout();
                if (method === 'prepend') {
                    m.pageContent[0].scrollTop = scrollBefore + (m.pageContent[0].scrollHeight - scrollHeightBefore);
                }
                if (m.params.scrollMessages && (method === 'append' && !m.params.newMessagesFirst) || (method === 'prepend' && m.params.newMessagesFirst)) {
                    if (m.params.scrollMessagesOnlyOnEdge) {
                        var onEdge = false;
                        if (m.params.newMessagesFirst) {
                            if (scrollBefore === 0) onEdge = true;
                        }
                        else {
                            if (scrollBefore - (scrollHeightBefore - heightBefore) >= -10) onEdge = true;
                        }
                        if (onEdge) m.scrollMessages(animate ? undefined : 0);
                    }
                    else m.scrollMessages(animate ? undefined : 0);
                }
                var messages = m.container.find('.message');
                if (newMessages.length === 1) {
                    return method === 'append' ? messages[messages.length - 1] : messages[0];
                }
                else {
                    var messagesToReturn = [];
                    if (method === 'append') {
                        for (i = messages.length - newMessages.length; i < messages.length; i++) {
                            messagesToReturn.push(messages[i]);
                        }
                    }
                    else {
                        for (i = 0; i < newMessages.length; i++) {
                            messagesToReturn.push(messages[i]);
                        }
                    }
                    return messagesToReturn;
                }
        
            };
            m.removeMessage = function (message) {
                message = $(message);
                if (message.length === 0) {
                    return false;
                }
                else {
                    message.remove();
                    if (m.params.autoLayout) m.layout();
                    return true;
                }
            };
            m.removeMessages = function (messages) {
                m.removeMessage(messages);
            };
            m.clean = function () {
                m.container.html('');
            };
        
            // Scroll
            m.scrollMessages = function (duration, scrollTop) {
                if (typeof duration === 'undefined') duration = 400;
                var currentScroll = m.pageContent[0].scrollTop;
                var newScroll;
                if (typeof scrollTop !== 'undefined') newScroll = scrollTop;
                else {
                    newScroll = m.params.newMessagesFirst ? 0 : m.pageContent[0].scrollHeight - m.pageContent[0].offsetHeight;
                    if (newScroll === currentScroll) return;
                }
                m.pageContent.scrollTop(newScroll, duration);
            };
        
            // Init Destroy
            m.init = function () {
                if (m.params.messages) {
                    m.addMessages(m.params.messages, undefined, false);
                }
                else {
                    if (m.params.autoLayout) m.layout();
                    m.scrollMessages(0);
                }
        
            };
            m.destroy = function () {
                m = null;
            };
        
            // Init
            m.init();
        
            m.container[0].f7Messages = m;
            return m;
        };
        app.messages = function (container, params) {
            return new Messages (container, params);
        };
        app.initPageMessages = function (pageContainer) {
            pageContainer = $(pageContainer);
            var messages = pageContainer.find('.messages');
            if (messages.length === 0) return;
            if (!messages.hasClass('messages-init')) {
                return;
            }
            var m = app.messages(messages, messages.dataset());
        
            // Destroy on page remove
            function pageBeforeRemove() {
                m.destroy();
                pageContainer.off('page:beforeremove', pageBeforeRemove);
            }
            if (pageContainer.hasClass('page')) {
                pageContainer.on('page:beforeremove', pageBeforeRemove);
            }
        };
        

        /*===============================================================================
        ************   Swipeout Actions (Swipe to delete)   ************
        ===============================================================================*/
        app.swipeoutOpenedEl = undefined;
        app.allowSwipeout = true;
        app.initSwipeout = function (swipeoutEl) {
            var isTouched, isMoved, isScrolling, touchesStart = {}, touchStartTime, touchesDiff, swipeOutEl, swipeOutContent, actionsRight, actionsLeft, actionsLeftWidth, actionsRightWidth, translate, opened, openedActions, buttonsLeft, buttonsRight, direction, overswipeLeftButton, overswipeRightButton, overswipeLeft, overswipeRight, noFoldLeft, noFoldRight;
        
            var activeListener = app.support.passiveListener ? {passive: false, capture: false} : false;
        
            $(document).on(app.touchEvents.start, function (e) {
                if (app.swipeoutOpenedEl) {
                    var target = $(e.target);
                    if (!(
                        app.swipeoutOpenedEl.is(target[0]) ||
                        target.parents('.swipeout').is(app.swipeoutOpenedEl) ||
                        target.hasClass('modal-in') ||
                        target.hasClass('modal-overlay') ||
                        target.hasClass('actions-modal') || 
                        target.parents('.actions-modal.modal-in, .modal.modal-in').length > 0
                        )) {
                        app.swipeoutClose(app.swipeoutOpenedEl);
                    }
                }
            }, activeListener);
        
            function handleTouchStart(e) {
                if (!app.allowSwipeout) return;
                isMoved = false;
                isTouched = true;
                isScrolling = undefined;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = (new Date()).getTime();
            }
            function handleTouchMove(e) {
                if (!isTouched) return;
                var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (isScrolling) {
                    isTouched = false;
                    return;
                }
        
                if (!isMoved) {
                    if ($('.list-block.sortable-opened').length > 0) return;
                    /*jshint validthis:true */
                    swipeOutEl = $(this);
                    swipeOutContent = swipeOutEl.find('.swipeout-content');
                    actionsRight = swipeOutEl.find('.swipeout-actions-right');
                    actionsLeft = swipeOutEl.find('.swipeout-actions-left');
                    actionsLeftWidth = actionsRightWidth = buttonsLeft = buttonsRight = overswipeRightButton = overswipeLeftButton = null;
                    noFoldLeft = actionsLeft.hasClass('swipeout-actions-no-fold') || app.params.swipeoutActionsNoFold;
                    noFoldRight = actionsRight.hasClass('swipeout-actions-no-fold') || app.params.swipeoutActionsNoFold;
                    if (actionsLeft.length > 0) {
                        actionsLeftWidth = actionsLeft.outerWidth();
                        buttonsLeft = actionsLeft.children('a');
                        overswipeLeftButton = actionsLeft.find('.swipeout-overswipe');
                    }
                    if (actionsRight.length > 0) {
                        actionsRightWidth = actionsRight.outerWidth();
                        buttonsRight = actionsRight.children('a');
                        overswipeRightButton = actionsRight.find('.swipeout-overswipe');
                    }
                    opened = swipeOutEl.hasClass('swipeout-opened');
                    if (opened) {
                        openedActions = swipeOutEl.find('.swipeout-actions-left.swipeout-actions-opened').length > 0 ? 'left' : 'right';
                    }
                    swipeOutEl.removeClass('transitioning');
                    if (!app.params.swipeoutNoFollow) {
                        swipeOutEl.find('.swipeout-actions-opened').removeClass('swipeout-actions-opened');
                        swipeOutEl.removeClass('swipeout-opened');
                    }
                }
                isMoved = true;
                e.preventDefault();
                
                touchesDiff = pageX - touchesStart.x;
                translate = touchesDiff;
        
                if (opened) {
                    if (openedActions === 'right') translate = translate - actionsRightWidth;
                    else translate = translate + actionsLeftWidth;
                }
        
                if (translate > 0 && actionsLeft.length === 0 || translate < 0 && actionsRight.length === 0) {
                    if (!opened) {
                        isTouched = isMoved = false;
                        swipeOutContent.transform('');
                        if (buttonsRight && buttonsRight.length > 0) {
                            buttonsRight.transform('');
                        }
                        if (buttonsLeft && buttonsLeft.length > 0) {
                            buttonsLeft.transform('');
                        }
                        return;
                    }
                    translate = 0;
                }
        
                if (translate < 0) direction = 'to-left';
                else if (translate > 0) direction = 'to-right';
                else {
                    if (!direction) direction = 'to-left';
                }
                
                var i, buttonOffset, progress;
                
                e.f7PreventPanelSwipe = true;
                if (app.params.swipeoutNoFollow) {
                    if (opened) {
                        if (openedActions === 'right' && touchesDiff > 0) {
                            app.swipeoutClose(swipeOutEl);
                        }
                        if (openedActions === 'left' && touchesDiff < 0) {
                            app.swipeoutClose(swipeOutEl);
                        }
                    }
                    else {
                        if (touchesDiff < 0 && actionsRight.length > 0) {
                            app.swipeoutOpen(swipeOutEl, 'right');
                        }
                        if (touchesDiff > 0 && actionsLeft.length > 0) {
                            app.swipeoutOpen(swipeOutEl, 'left');
                        }
                    }
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                overswipeLeft = false;
                overswipeRight = false;
                var $button;
                if (actionsRight.length > 0) {
                    // Show right actions
                    progress = translate / actionsRightWidth;
                    if (translate < -actionsRightWidth) {
                        translate = -actionsRightWidth - Math.pow(-translate - actionsRightWidth, 0.8);
                        if (overswipeRightButton.length > 0) {
                            overswipeRight = true;
                        }
                    }
                    for (i = 0; i < buttonsRight.length; i++) {
                        if (typeof buttonsRight[i]._buttonOffset === 'undefined') {
                            buttonsRight[i]._buttonOffset = buttonsRight[i].offsetLeft;
                        }
                        buttonOffset = buttonsRight[i]._buttonOffset;
                        $button = $(buttonsRight[i]);
                        if (overswipeRightButton.length > 0 && $button.hasClass('swipeout-overswipe')) {
                            $button.css({left: (overswipeRight ? -buttonOffset : 0) + 'px'});
                            if (overswipeRight) {
                                $button.addClass('swipeout-overswipe-active');
                            }
                            else {
                                $button.removeClass('swipeout-overswipe-active');   
                            }
                        }
                        $button.transform('translate3d(' + (translate - buttonOffset * (1 + Math.max(progress, -1))) + 'px,0,0)');
                    }
                }
                if (actionsLeft.length > 0) {
                    // Show left actions
                    progress = translate / actionsLeftWidth;
                    if (translate > actionsLeftWidth) {
                        translate = actionsLeftWidth + Math.pow(translate - actionsLeftWidth, 0.8);
                        if (overswipeLeftButton.length > 0) {
                            overswipeLeft = true;
                        }
                    }
                    for (i = 0; i < buttonsLeft.length; i++) {
                        if (typeof buttonsLeft[i]._buttonOffset === 'undefined') {
                            buttonsLeft[i]._buttonOffset = actionsLeftWidth - buttonsLeft[i].offsetLeft - buttonsLeft[i].offsetWidth;
                        }
                        buttonOffset = buttonsLeft[i]._buttonOffset;
                        $button = $(buttonsLeft[i]);
                        if (overswipeLeftButton.length > 0 && $button.hasClass('swipeout-overswipe')) {
                            $button.css({left: (overswipeLeft ? buttonOffset : 0) + 'px'});
                            if (overswipeLeft) {
                                $button.addClass('swipeout-overswipe-active');
                            }
                            else {
                                $button.removeClass('swipeout-overswipe-active');   
                            }
                        }
                        if (buttonsLeft.length > 1) {
                            $button.css('z-index', buttonsLeft.length - i); 
                        }
                        $button.transform('translate3d(' + (translate + buttonOffset * (1 - Math.min(progress, 1))) + 'px,0,0)');
                    }
                }
                swipeOutContent.transform('translate3d(' + translate + 'px,0,0)');
            }
            function handleTouchEnd(e) {
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
        
                isTouched = false;
                isMoved = false;
                var timeDiff = (new Date()).getTime() - touchStartTime;
                var action, actionsWidth, actions, buttons, i;
        
                actions = direction === 'to-left' ? actionsRight : actionsLeft;
                actionsWidth = direction === 'to-left' ? actionsRightWidth : actionsLeftWidth;
        
                if (
                    timeDiff < 300 && (touchesDiff < -10 && direction === 'to-left' || touchesDiff > 10 && direction === 'to-right') ||
                    timeDiff >= 300 && Math.abs(translate) > actionsWidth / 2
                ) {
                    action = 'open';
                }
                else {
                    action = 'close';
                }
                if (timeDiff < 300) {
                    if (Math.abs(translate) === 0) action = 'close';
                    if (Math.abs(translate) === actionsWidth) action = 'open';
                }
                
                if (action === 'open') {
                    app.swipeoutOpenedEl = swipeOutEl;
                    swipeOutEl.trigger('open swipeout:open');
                    swipeOutEl.addClass('swipeout-opened transitioning');
                    var newTranslate = direction === 'to-left' ? -actionsWidth : actionsWidth;
                    swipeOutContent.transform('translate3d(' + newTranslate + 'px,0,0)');
                    actions.addClass('swipeout-actions-opened');
                    buttons = direction === 'to-left' ? buttonsRight : buttonsLeft;
                    if (buttons) {
                        for (i = 0; i < buttons.length; i++) {
                            $(buttons[i]).transform('translate3d(' + newTranslate + 'px,0,0)');
                        }
                    }
                    if (overswipeRight) {
                        actionsRight.find('.swipeout-overswipe')[0].click();
                    }
                    if (overswipeLeft) {
                        actionsLeft.find('.swipeout-overswipe')[0].click();
                    }
                }
                else {
                    swipeOutEl.trigger('close swipeout:close');
                    app.swipeoutOpenedEl = undefined;
                    swipeOutEl.addClass('transitioning').removeClass('swipeout-opened');
                    swipeOutContent.transform('');
                    actions.removeClass('swipeout-actions-opened');
                }
                
                var buttonOffset;
                if (buttonsLeft && buttonsLeft.length > 0 && buttonsLeft !== buttons) {
                    for (i = 0; i < buttonsLeft.length; i++) {
                        buttonOffset = buttonsLeft[i]._buttonOffset;
                        if (typeof buttonOffset === 'undefined') {
                            buttonsLeft[i]._buttonOffset = actionsLeftWidth - buttonsLeft[i].offsetLeft - buttonsLeft[i].offsetWidth;
                        }
                        $(buttonsLeft[i]).transform('translate3d(' + (buttonOffset) + 'px,0,0)');
                    }
                }
                if (buttonsRight && buttonsRight.length > 0 && buttonsRight !== buttons) {
                    for (i = 0; i < buttonsRight.length; i++) {
                        buttonOffset = buttonsRight[i]._buttonOffset;
                        if (typeof buttonOffset === 'undefined') {
                            buttonsRight[i]._buttonOffset = buttonsRight[i].offsetLeft;
                        }
                        $(buttonsRight[i]).transform('translate3d(' + (-buttonOffset) + 'px,0,0)');
                    }
                }
                swipeOutContent.transitionEnd(function (e) {
                    if (opened && action === 'open' || closed && action === 'close') return;
                    swipeOutEl.trigger(action === 'open' ? 'opened' : 'closed');
                    if (opened && action === 'close') {
                        if (actionsRight.length > 0) {
                            buttonsRight.transform('');
                        }
                        if (actionsLeft.length > 0) {
                            buttonsLeft.transform('');
                        }
                    }
                });
            }
            if (swipeoutEl) {
                $(swipeoutEl).on(app.touchEvents.start, handleTouchStart, activeListener);
                $(swipeoutEl).on(app.touchEvents.move, handleTouchMove, activeListener);
                $(swipeoutEl).on(app.touchEvents.end, handleTouchEnd, activeListener);
            }
            else {
                $(document).on(app.touchEvents.start, '.list-block li.swipeout', handleTouchStart, activeListener);
                $(document).on(app.touchEvents.move, '.list-block li.swipeout', handleTouchMove, activeListener);
                $(document).on(app.touchEvents.end, '.list-block li.swipeout', handleTouchEnd, activeListener);
            }
                
        };
        app.swipeoutOpen = function (el, dir, callback) {
            el = $(el);
            if (arguments.length === 2) {
                if (typeof arguments[1] === 'function') {
                    callback = dir;
                }
            }
        
            if (el.length === 0) return;
            if (el.length > 1) el = $(el[0]);
            if (!el.hasClass('swipeout') || el.hasClass('swipeout-opened')) return;
            if (!dir) {
                if (el.find('.swipeout-actions-right').length > 0) dir = 'right';
                else dir = 'left';
            }
            var swipeOutActions = el.find('.swipeout-actions-' + dir);
            if (swipeOutActions.length === 0) return;
            el.trigger('open swipeout:open').addClass('swipeout-opened').removeClass('transitioning');
            swipeOutActions.addClass('swipeout-actions-opened');
            var buttons = swipeOutActions.children('a');
            var swipeOutActionsWidth = swipeOutActions.outerWidth();
            var translate = dir === 'right' ? -swipeOutActionsWidth : swipeOutActionsWidth;
            var i;
            if (buttons.length > 1) {
                for (i = 0; i < buttons.length; i++) {
                    if (dir === 'right') {
                        $(buttons[i]).transform('translate3d(' + (- buttons[i].offsetLeft) + 'px,0,0)');
                    }
                    else {
                        $(buttons[i]).css('z-index', buttons.length - i).transform('translate3d(' + (swipeOutActionsWidth - buttons[i].offsetWidth - buttons[i].offsetLeft) + 'px,0,0)');
                    }
                }
                var clientLeft = buttons[1].clientLeft;
            }
            el.addClass('transitioning');
            for (i = 0; i < buttons.length; i++) {
                $(buttons[i]).transform('translate3d(' + (translate) + 'px,0,0)');
            }
            el.find('.swipeout-content').transform('translate3d(' + translate + 'px,0,0)').transitionEnd(function () {
                el.trigger('opened swipeout:opened');
                if (callback) callback.call(el[0]);
            });
            app.swipeoutOpenedEl = el;
        };
        app.swipeoutClose = function (el, callback) {
            el = $(el);
            if (el.length === 0) return;
            if (!el.hasClass('swipeout-opened')) return;
            var dir = el.find('.swipeout-actions-opened').hasClass('swipeout-actions-right') ? 'right' : 'left';
            var swipeOutActions = el.find('.swipeout-actions-opened').removeClass('swipeout-actions-opened');
            var buttons = swipeOutActions.children('a');
            var swipeOutActionsWidth = swipeOutActions.outerWidth();
            app.allowSwipeout = false;
            el.trigger('close swipeout:close');
            el.removeClass('swipeout-opened').addClass('transitioning');
        
            var closeTO;
            function onSwipeoutClose() {
                app.allowSwipeout = true;
                if (el.hasClass('swipeout-opened')) return;
                el.removeClass('transitioning');
                buttons.transform('');
                el.trigger('closed swipeout:closed');
                if (callback) callback.call(el[0]);
                if (closeTO) clearTimeout(closeTO);
            }
            el.find('.swipeout-content').transform('').transitionEnd(onSwipeoutClose);
            closeTO = setTimeout(onSwipeoutClose, 500);
            
            for (var i = 0; i < buttons.length; i++) {
                if (dir === 'right') {
                    $(buttons[i]).transform('translate3d(' + (-buttons[i].offsetLeft) + 'px,0,0)');
                }
                else {
                    $(buttons[i]).transform('translate3d(' + (swipeOutActionsWidth - buttons[i].offsetWidth - buttons[i].offsetLeft) + 'px,0,0)');
                }
                $(buttons[i]).css({left:0 + 'px'}).removeClass('swipeout-overswipe-active');
            }
            if (app.swipeoutOpenedEl && app.swipeoutOpenedEl[0] === el[0]) app.swipeoutOpenedEl = undefined;
        };
        app.swipeoutDelete = function (el, callback) {
            el = $(el);
            if (el.length === 0) return;
            if (el.length > 1) el = $(el[0]);
            app.swipeoutOpenedEl = undefined;
            el.trigger('delete swipeout:delete');
            el.css({height: el.outerHeight() + 'px'});
            var clientLeft = el[0].clientLeft;
            el.css({height: 0 + 'px'}).addClass('deleting transitioning').transitionEnd(function () {
                el.trigger('deleted swipeout:deleted');
                if (callback) callback.call(el[0]);
                if (el.parents('.virtual-list').length > 0) {
                    var virtualList = el.parents('.virtual-list')[0].f7VirtualList;
                    var virtualIndex = el[0].f7VirtualListIndex;
                    if (virtualList && typeof virtualIndex !== 'undefined') virtualList.deleteItem(virtualIndex);
                }
                else {
                    if (app.params.swipeoutRemoveWithTimeout) {
                        setTimeout(function () {
                            el.remove();
                        }, 0);
                    }
                    else el.remove();
                }
            });
            var translate = '-100%';
            el.find('.swipeout-content').transform('translate3d(' + translate + ',0,0)');
        };
        

        /*===============================================================================
        ************   Sortable   ************
        ===============================================================================*/
        app.sortableToggle = function (sortableContainer) {
            sortableContainer = $(sortableContainer);
            if (sortableContainer.length === 0) sortableContainer = $('.list-block.sortable');
            sortableContainer.toggleClass('sortable-opened');
            if (sortableContainer.hasClass('sortable-opened')) {
                sortableContainer.trigger('open sortable:open');
            }
            else {
                sortableContainer.trigger('close sortable:close');
            }
            return sortableContainer;
        };
        app.sortableOpen = function (sortableContainer) {
            sortableContainer = $(sortableContainer);
            if (sortableContainer.length === 0) sortableContainer = $('.list-block.sortable');
            sortableContainer.addClass('sortable-opened');
            sortableContainer.trigger('open sortable:open');
            return sortableContainer;
        };
        app.sortableClose = function (sortableContainer) {
            sortableContainer = $(sortableContainer);
            if (sortableContainer.length === 0) sortableContainer = $('.list-block.sortable');
            sortableContainer.removeClass('sortable-opened');
            sortableContainer.trigger('close sortable:close');
            return sortableContainer;
        };
        app.initSortable = function () {
            var isTouched, isMoved, touchStartY, touchesDiff, sortingEl, sortingElHeight, sortingItems, minTop, maxTop, insertAfter, insertBefore, sortableContainer, startIndex;
            
            function handleTouchStart(e) {
                isMoved = false;
                isTouched = true;
                touchStartY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                /*jshint validthis:true */
                sortingEl = $(this).parent();
                startIndex = sortingEl.index();
                sortingItems = sortingEl.parent().children('li');
                sortableContainer = sortingEl.parents('.sortable');
                e.preventDefault();
                app.allowPanelOpen = app.allowSwipeout = false;
            }
            function handleTouchMove(e) {
                if (!isTouched || !sortingEl) return;
                var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                if (!isMoved) {
                    sortingEl.addClass('sorting');
                    sortableContainer.addClass('sortable-sorting');
                    minTop = sortingEl[0].offsetTop;
                    maxTop = sortingEl.parent().height() - sortingEl[0].offsetTop - sortingEl.height();
                    sortingElHeight = sortingEl[0].offsetHeight;
                }
                isMoved = true;
        
                e.preventDefault();
                e.f7PreventPanelSwipe = true;
                touchesDiff = pageY - touchStartY;
                var translate = touchesDiff;
                if (translate < -minTop) translate = -minTop;
                if (translate > maxTop) translate = maxTop;
                sortingEl.transform('translate3d(0,' + translate + 'px,0)');
        
                insertBefore = insertAfter = undefined;
        
                sortingItems.each(function () {
                    var currentEl = $(this);
                    if (currentEl[0] === sortingEl[0]) return;
                    var currentElOffset = currentEl[0].offsetTop;
                    var currentElHeight = currentEl.height();
                    var sortingElOffset = sortingEl[0].offsetTop + translate;
        
                    if ((sortingElOffset >= currentElOffset - currentElHeight / 2) && sortingEl.index() < currentEl.index()) {
                        currentEl.transform('translate3d(0, '+(-sortingElHeight)+'px,0)');
                        insertAfter = currentEl;
                        insertBefore = undefined;
                    }
                    else if ((sortingElOffset <= currentElOffset + currentElHeight / 2) && sortingEl.index() > currentEl.index()) {
                        currentEl.transform('translate3d(0, '+(sortingElHeight)+'px,0)');
                        insertAfter = undefined;
                        if (!insertBefore) insertBefore = currentEl;
                    }
                    else {
                        $(this).transform('translate3d(0, 0%,0)');
                    }
                });
            }
            function handleTouchEnd(e) {
                app.allowPanelOpen = app.allowSwipeout = true;
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                e.preventDefault();
                sortingItems.transform('');
                sortingEl.removeClass('sorting');
                sortableContainer.removeClass('sortable-sorting');
                var virtualList, oldIndex, newIndex;
                if (insertAfter) {
                    sortingEl.insertAfter(insertAfter);
                    sortingEl.trigger('sort sortable:sort', {startIndex: startIndex, newIndex: sortingEl.index()});
                }
                if (insertBefore) {
                    sortingEl.insertBefore(insertBefore);
                    sortingEl.trigger('sort sortable:sort', {startIndex: startIndex, newIndex: sortingEl.index()});
                }
                if ((insertAfter || insertBefore) && sortableContainer.hasClass('virtual-list')) {
                    virtualList = sortableContainer[0].f7VirtualList;
                    oldIndex = sortingEl[0].f7VirtualListIndex;
                    newIndex = insertBefore ? insertBefore[0].f7VirtualListIndex : insertAfter[0].f7VirtualListIndex;
                    if (virtualList) virtualList.moveItem(oldIndex, newIndex);
                }
                insertAfter = insertBefore = undefined;
                isTouched = false;
                isMoved = false;
            }
            var activeListener = app.support.passiveListener ? {passive: false, capture: false} : false;
            $(document).on(app.touchEvents.start, '.list-block.sortable .sortable-handler', handleTouchStart, activeListener);
            if (app.support.touch) {
                $(document).on(app.touchEvents.move, '.list-block.sortable .sortable-handler', handleTouchMove, activeListener);
                $(document).on(app.touchEvents.end, '.list-block.sortable .sortable-handler', handleTouchEnd, activeListener);
            }
            else {
                $(document).on(app.touchEvents.move, handleTouchMove, activeListener);
                $(document).on(app.touchEvents.end, handleTouchEnd, activeListener);
            }
        };
        

        /*===============================================================================
        ************   Smart Select   ************
        ===============================================================================*/
        app.initSmartSelects = function (pageContainer) {
            //console.log(pageContainer);
            pageContainer = $(pageContainer);
            var selects;
            if (pageContainer.is('.smart-select')) {
                selects = pageContainer;
            }
            else {
                selects = pageContainer.find('.smart-select');
            }
            if (selects.length === 0) return;
        
            selects.each(function () {
                var smartSelect = $(this);
        
                var $select = smartSelect.find('select');
                if ($select.length === 0) return;
        
                var select = $select[0];
                if (select.length === 0) return;
        
                var valueText = [];
                var displayAs;
                for (var i = 0; i < select.length; i++) {
                    if (select[i].selected) {
                        displayAs = select[i].dataset ? select[i].dataset.displayAs : $(select[i]).data('display-as');
                        if (displayAs && typeof displayAs !== 'undefined') {
        					valueText.push(displayAs);
        				} else {
        					valueText.push(select[i].textContent.trim());
        				}
        			}
                }
        
                var itemAfter = smartSelect.find('.item-after');
                if (itemAfter.length === 0) {
                    smartSelect.find('.item-inner').append('<div class="item-after">' + valueText.join(', ') + '</div>');
                }
                else {
                    var selectedText = itemAfter.text();
                    if (itemAfter.hasClass('smart-select-value')) {
                        for (i = 0; i < select.length; i++) {
                            select[i].selected = select[i].textContent.trim() === selectedText.trim();
                        }
                    } else {
                        itemAfter.text(valueText.join(', '));
                    }
                }
        
                $select.on('change', function () {
                    var valueText = [];
                    for (var i = 0; i < select.length; i++) {
                        if (select[i].selected) {
                            var displayAs = select[i].dataset ? select[i].dataset.displayAs : $(select[i]).data('display-as');
                        	if (displayAs && typeof displayAs !== 'undefined') {
        						valueText.push(displayAs);
        					} else {
        						valueText.push(select[i].textContent.trim());
        					}
        				}
                    }
                    smartSelect.find('.item-after').text(valueText.join(', '));
                });
        
            });
        
        };
        app.smartSelectAddOption = function (select, option, index) {
            select = $(select);
            var smartSelect = select.parents('.smart-select');
            if (typeof index === 'undefined') {
                select.append(option);
            }
            else {
                $(option).insertBefore(select.find('option').eq(index));
            }
            app.initSmartSelects(smartSelect);
            var selectName = smartSelect.find('select').attr('name');
            var opened = $('.page.smart-select-page[data-select-name="' + selectName + '"]').length > 0;
            if (opened) {
                app.smartSelectOpen(smartSelect, true);
            }
        };
        app.smartSelectOpen = function (smartSelect, reLayout) {
            smartSelect = $(smartSelect);
            if (smartSelect.length === 0) return;
        
            // Find related view
            var view = smartSelect.parents('.' + app.params.viewClass);
            if (view.length === 0) return;
            view = view[0].f7View;
        
            // Parameters
            var openIn = smartSelect.attr('data-open-in') || app.params.smartSelectOpenIn;
            if (openIn === 'popup') {
                if ($('.popup.smart-select-popup').length > 0) return;
            }
            else if (openIn === 'picker') {
                if ($('.picker-modal.modal-in').length > 0 && !reLayout){
                    if (smartSelect[0].f7SmartSelectPicker !== $('.picker-modal.modal-in:not(.modal-out)')[0]) app.closeModal($('.picker-modal.modal-in:not(.modal-out)'));
                    else return;
                }
            }
            else {
                if (!view) return;
            }
        
            var smartSelectData = smartSelect.dataset();
            var pageTitle = smartSelectData.pageTitle || smartSelect.find('.item-title').text();
            var backText = smartSelectData.backText || app.params.smartSelectBackText;
            var closeText;
            if (openIn === 'picker') {
                closeText = smartSelectData.pickerCloseText || smartSelectData.backText || app.params.smartSelectPickerCloseText ;
            }
            else {
                closeText = smartSelectData.popupCloseText || smartSelectData.backText || app.params.smartSelectPopupCloseText ;
            }
            var backOnSelect = smartSelectData.backOnSelect !== undefined ? smartSelectData.backOnSelect : app.params.smartSelectBackOnSelect;
            var formTheme = smartSelectData.formTheme || app.params.smartSelectFormTheme;
            var navbarTheme = smartSelectData.navbarTheme || app.params.smartSelectNavbarTheme;
            var toolbarTheme = smartSelectData.toolbarTheme || app.params.smartSelectToolbarTheme;
            var virtualList = smartSelectData.virtualList;
            var virtualListHeight = smartSelectData.virtualListHeight;
            var material = app.params.material;
            var pickerHeight = smartSelectData.pickerHeight || app.params.smartSelectPickerHeight;
        
            // Collect all options/values
            var select = smartSelect.find('select')[0];
            var $select = $(select);
            var $selectData = $select.dataset();
            if (select.disabled || smartSelect.hasClass('disabled') || $select.hasClass('disabled')) {
                return;
            }
            var values = [];
            var id = (new Date()).getTime();
            var inputType = select.multiple ? 'checkbox' : 'radio';
            var inputName = inputType + '-' + id;
            var maxLength = $select.attr('maxlength');
            var selectName = select.name;
            var option, optionHasMedia, optionImage, optionIcon, optionGroup, optionGroupLabel, optionPreviousGroup, optionIsLabel, previousGroup, optionColor, optionClassName, optionData;
            for (var i = 0; i < select.length; i++) {
                option = $(select[i]);
                optionData = option.dataset();
                optionImage = optionData.optionImage || $selectData.optionImage || smartSelectData.optionImage;
                optionIcon = optionData.optionIcon || $selectData.optionIcon || smartSelectData.optionIcon;
                optionHasMedia = optionImage || optionIcon || inputType === 'checkbox';
                if (material) optionHasMedia = optionImage || optionIcon;
                optionColor = optionData.optionColor;
                optionClassName = optionData.optionClass;
                if (option[0].disabled) optionClassName += ' disabled';
                optionGroup = option.parent('optgroup')[0];
                optionGroupLabel = optionGroup && optionGroup.label;
                optionIsLabel = false;
                if (optionGroup) {
                    if (optionGroup !== previousGroup) {
                        optionIsLabel = true;
                        previousGroup = optionGroup;
                        values.push({
                            groupLabel: optionGroupLabel,
                            isLabel: optionIsLabel
                        });
                    }
                }
                values.push({
                    value: option[0].value,
                    text: option[0].textContent.trim(),
                    selected: option[0].selected,
                    group: optionGroup,
                    groupLabel: optionGroupLabel,
                    image: optionImage,
                    icon: optionIcon,
                    color: optionColor,
                    className: optionClassName,
                    disabled: option[0].disabled,
                    inputType: inputType,
                    id: id,
                    hasMedia: optionHasMedia,
                    checkbox: inputType === 'checkbox',
                    inputName: inputName,
                    material: app.params.material
                });
            }
        
        
            // Item template/HTML
            if (!app._compiledTemplates.smartSelectItem) {
                app._compiledTemplates.smartSelectItem = t7.compile(app.params.smartSelectItemTemplate ||
                    '{{#if isLabel}}' +
                    '<li class="item-divider">{{groupLabel}}</li>' +
                    '{{else}}' +
                    '<li{{#if className}} class="{{className}}"{{/if}}>' +
                        '<label class="label-{{inputType}} item-content">' +
                            '<input type="{{inputType}}" name="{{inputName}}" value="{{value}}" {{#if selected}}checked{{/if}}>' +
                            '{{#if material}}' +
                                '{{#if hasMedia}}' +
                                '<div class="item-media">' +
                                    '{{#if icon}}<i class="icon {{icon}}"></i>{{/if}}' +
                                    '{{#if image}}<img src="{{image}}">{{/if}}' +
                                '</div>' +
                                '<div class="item-inner">' +
                                    '<div class="item-title{{#if color}} color-{{color}}{{/if}}">{{text}}</div>' +
                                '</div>' +
                                '<div class="item-after">' +
                                    '<i class="icon icon-form-{{inputType}}"></i>' +
                                '</div>' +
                                '{{else}}' +
                                '<div class="item-media">' +
                                    '<i class="icon icon-form-{{inputType}}"></i>' +
                                '</div>' +
                                '<div class="item-inner">' +
                                    '<div class="item-title{{#if color}} color-{{color}}{{/if}}">{{text}}</div>' +
                                '</div>' +
                                '{{/if}}' +
                            '{{else}}' +
                                '{{#if hasMedia}}' +
                                '<div class="item-media">' +
                                    '{{#if checkbox}}<i class="icon icon-form-checkbox"></i>{{/if}}' +
                                    '{{#if icon}}<i class="icon {{icon}}"></i>{{/if}}' +
                                    '{{#if image}}<img src="{{image}}">{{/if}}' +
                                '</div>' +
                                '{{/if}}' +
                                '<div class="item-inner">' +
                                    '<div class="item-title{{#if color}} color-{{color}}{{/if}}">{{text}}</div>' +
                                '</div>' +
                            '{{/if}}' +
                        '</label>' +
                    '</li>' +
                    '{{/if}}'
                );
            }
            var smartSelectItemTemplate = app._compiledTemplates.smartSelectItem;
        
            var inputsHTML = '';
            if (!virtualList) {
                for (var j = 0; j < values.length; j++) {
                    inputsHTML += smartSelectItemTemplate(values[j]);
                }
            }
        
            // Toolbar / Navbar
            var toolbarHTML = '', navbarHTML;
            var noNavbar = '', noToolbar = '', noTabbar = '', navbarLayout;
        
            if (openIn === 'picker') {
                if (!app._compiledTemplates.smartSelectToolbar) {
                    app._compiledTemplates.smartSelectToolbar = t7.compile(app.params.smartSelectToolbarTemplate ||
                        '<div class="toolbar {{#if toolbarTheme}}theme-{{toolbarTheme}}{{/if}}">' +
                          '<div class="toolbar-inner">' +
                            '<div class="left"></div>' +
                            '<div class="right"><a href="#" class="link close-picker"><span>{{closeText}}</span></a></div>' +
                        '</div>' +
                      '</div>'
                    );
                }
        
                toolbarHTML = app._compiledTemplates.smartSelectToolbar({
                    pageTitle: pageTitle,
                    closeText: closeText,
                    openIn: openIn,
                    toolbarTheme: toolbarTheme,
                    inPicker: openIn === 'picker'
                });
            }
            else {
                // Navbar HTML
                if (!app._compiledTemplates.smartSelectNavbar) {
                    app._compiledTemplates.smartSelectNavbar = t7.compile(app.params.smartSelectNavbarTemplate ||
                        '<div class="navbar {{#if navbarTheme}}theme-{{navbarTheme}}{{/if}}">' +
                            '<div class="navbar-inner">' +
                                '{{leftTemplate}}' +
                                '<div class="center sliding">{{pageTitle}}</div>' +
                            '</div>' +
                        '</div>'
                    );
                }
                navbarHTML = app._compiledTemplates.smartSelectNavbar({
                    pageTitle: pageTitle,
                    backText: backText,
                    closeText: closeText,
                    openIn: openIn,
                    navbarTheme: navbarTheme,
                    inPopup: openIn === 'popup',
                    inPage: openIn === 'page',
                    leftTemplate: openIn === 'popup' ?
                        (app.params.smartSelectPopupCloseTemplate || (material ? '<div class="left"><a href="#" class="link close-popup icon-only"><i class="icon icon-back"></i></a></div>' : '<div class="left"><a href="#" class="link close-popup"><i class="icon icon-back"></i><span>{{closeText}}</span></a></div>')).replace(/{{closeText}}/g, closeText) :
                        (app.params.smartSelectBackTemplate || (material ? '<div class="left"><a href="#" class="back link icon-only"><i class="icon icon-back"></i></a></div>' : '<div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>{{backText}}</span></a></div>')).replace(/{{backText}}/g, backText)
                });
                // Determine navbar layout type - static/fixed/through
                if (openIn === 'page') {
                    navbarLayout = 'static';
                    if (smartSelect.parents('.navbar-through').length > 0) navbarLayout = 'through';
                    if (smartSelect.parents('.navbar-fixed').length > 0) navbarLayout = 'fixed';
                    noToolbar = smartSelect.parents('.page').hasClass('no-toolbar') ? 'no-toolbar' : '';
                    noNavbar  = smartSelect.parents('.page').hasClass('no-navbar')  ? 'no-navbar'  : 'navbar-' + navbarLayout;
                    noTabbar = smartSelect.parents('.page').hasClass('no-tabbar') ? 'no-tabbar' : '';
                }
                else {
                    navbarLayout = 'fixed';
                }
            }
        
        
            // Page Layout
            var pageName = 'smart-select-' + inputName;
        
            var useSearchbar = typeof smartSelect.data('searchbar') === 'undefined' ? app.params.smartSelectSearchbar : (smartSelect.data('searchbar') === 'true' ? true : false);
            var searchbarPlaceholder, searchbarCancel;
        
            if (useSearchbar) {
                searchbarPlaceholder = smartSelect.data('searchbar-placeholder') || 'Search';
                searchbarCancel = smartSelect.data('searchbar-cancel') || 'Cancel';
            }
        
            var searchbarHTML =   '<form class="searchbar searchbar-init" data-search-list=".smart-select-list-' + id + '" data-search-in=".item-title">' +
                                    '<div class="searchbar-input">' +
                                        '<input type="search" placeholder="' + searchbarPlaceholder + '">' +
                                        '<a href="#" class="searchbar-clear"></a>' +
                                    '</div>' +
                                    (material ? '' : '<a href="#" class="searchbar-cancel">' + searchbarCancel + '</a>') +
                                  '</form>' +
                                  '<div class="searchbar-overlay"></div>';
        
            var pageHTML =
                (openIn !== 'picker' && navbarLayout === 'through' ? navbarHTML : '') +
                '<div class="pages">' +
                '  <div data-page="' + pageName + '" data-select-name="' + selectName + '" class="page smart-select-page ' + noNavbar + ' ' + noToolbar + ' ' + noTabbar + '">' +
                     (openIn !== 'picker' && navbarLayout === 'fixed' ? navbarHTML : '') +
                     (useSearchbar ? searchbarHTML : '') +
                '    <div class="page-content">' +
                       (openIn !== 'picker' && navbarLayout === 'static' ? navbarHTML : '') +
                '      <div class="list-block ' + (virtualList ? 'virtual-list' : '') + ' smart-select-list-' + id + ' ' + (formTheme ? 'theme-' + formTheme : '') + '">' +
                '        <ul>' +
                            (virtualList ? '' : inputsHTML) +
                '        </ul>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>';
        
            // Define popup and picker
            var popup, picker;
        
            // Scroll SS Picker To Input
            function scrollToInput() {
                var pageContent = smartSelect.parents('.page-content');
                if (pageContent.length === 0) return;
                var paddingTop = parseInt(pageContent.css('padding-top'), 10),
                    paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
                    pageHeight = pageContent[0].offsetHeight - paddingTop - picker.height(),
                    pageScrollHeight = pageContent[0].scrollHeight - paddingTop - picker.height(),
                    newPaddingBottom;
                var inputTop = smartSelect.offset().top - paddingTop + smartSelect[0].offsetHeight;
                if (inputTop > pageHeight) {
                    var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
                    if (scrollTop + pageHeight > pageScrollHeight) {
                        newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
                        if (pageHeight === pageScrollHeight) {
                            newPaddingBottom = picker.height();
                        }
                        pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
                    }
                    pageContent.scrollTop(scrollTop, 300);
                }
            }
            // Close SS Picker on HTML Click
            function closeOnHTMLClick(e) {
                var close = true;
                if (e.target === smartSelect[0] || $(e.target).parents(smartSelect[0]).length > 0) {
                    close = false;
                }
                if ($(e.target).parents('.picker-modal').length > 0) {
                    close = false;
                }
                if (close) {
                    app.closeModal('.smart-select-picker.modal-in');
                }
            }
        
            // Check max length
            function checkMaxLength(container) {
                if (select.selectedOptions.length >= maxLength) {
                    container.find('input[type="checkbox"]').each(function () {
                        if (!this.checked) {
                            $(this).parents('li').addClass('disabled');
                        }
                        else {
                            $(this).parents('li').removeClass('disabled');
                        }
                    });
                }
                else {
                    container.find('.disabled').removeClass('disabled');
                }
            }
            // Event Listeners on new page
            function handleInputs(container) {
                container = $(container);
                if (virtualList) {
                    var virtualListInstance = app.virtualList(container.find('.virtual-list'), {
                        items: values,
                        template: smartSelectItemTemplate,
                        height: virtualListHeight || undefined,
                        searchByItem: function (query, index, item) {
                            if (item.text && item.text.toLowerCase().indexOf(query.trim().toLowerCase()) >=0 ) return true;
                            return false;
                        }
                    });
                    container.once(openIn === 'popup' || openIn === 'picker' ? 'closed': 'pageBeforeRemove', function () {
                        if (virtualListInstance && virtualListInstance.destroy) virtualListInstance.destroy();
                    });
                }
                if (maxLength) {
                    checkMaxLength(container);
                }
                if (backOnSelect) {
                    container.find('input[type="radio"][name="' + inputName + '"]:checked').parents('label').once('click', function () {
                        if (openIn === 'popup') app.closeModal(popup);
                        else if (openIn === 'picker') app.closeModal(picker);
                        else view.router.back();
                    });
                }
                container.on('change', 'input[name="' + inputName + '"]', function () {
        			var option, text;
                    var input = this;
                    var value = input.value;
                    var optionText = [];
                    var displayAs;
                    console.log(input);
                    if (input.type === 'checkbox') {
                        var values = [];
                        for (var i = 0; i < select.options.length; i++) {
                            option = select.options[i];
                            if (option.value === value) {
                                option.selected = input.checked;
                            }
                            if (option.selected) {
                                displayAs = option.dataset ? option.dataset.displayAs : $(option).data('display-as');
                                text = displayAs && typeof displayAs !== 'undefined' ? displayAs : option.textContent;
                                optionText.push(text.trim());
                            }
                        }
                        if (maxLength) {
                            checkMaxLength(container);
                        }
                    }
                    else {
                        option = smartSelect.find('option[value="' + value + '"]')[0];
                        displayAs = option.dataset ? option.dataset.displayAs : $(option).data('display-as');
                        text = displayAs && typeof displayAs !== 'undefined' ? displayAs : option.textContent;
                        optionText = [text];
                        select.value = value;
                    }
        
                    $select.trigger('change');
                    smartSelect.find('.item-after').text(optionText.join(', '));
                    if (backOnSelect && inputType === 'radio') {
                        if (openIn === 'popup') app.closeModal(popup);
                        else if (openIn === 'picker') app.closeModal(picker);
                        else view.router.back();
                    }
                });
            }
            function pageInit(e) {
                var page = e.detail.page;
                if (page.name === pageName) {
                    handleInputs(page.container);
                }
            }
            if (openIn === 'popup') {
                if (reLayout) {
                    popup = $('.popup.smart-select-popup .view');
                    popup.html(pageHTML);
                }
                else {
                    popup = app.popup(
                        '<div class="popup smart-select-popup smart-select-popup-' + inputName + '">' +
                            '<div class="view navbar-fixed">' +
                                pageHTML +
                            '</div>' +
                        '</div>'
                        );
                    popup = $(popup);
                }
                app.initPage(popup.find('.page'));
                handleInputs(popup);
            }
            else if (openIn === 'picker') {
                if (reLayout) {
                    picker = $('.picker-modal.smart-select-picker .view');
                    picker.html(pageHTML);
                }
                else {
                    picker = app.pickerModal(
                        '<div class="picker-modal smart-select-picker smart-select-picker-' + inputName + '"' + (pickerHeight ? ' style="height:' + pickerHeight + '"' : '') + '>' +
                            toolbarHTML +
                            '<div class="picker-modal-inner">' +
                                '<div class="view">' +
                                    pageHTML +
                                '</div>' +
                            '</div>' +
                        '</div>'
                        );
                    picker = $(picker);
        
                    // Scroll To Input
                    scrollToInput();
        
                    // Close On Click
                    $('html').on('click', closeOnHTMLClick);
        
                    // On Close
                    picker.once('picker:close', function () {
                        // Reset linked picker
                        smartSelect[0].f7SmartSelectPicker = undefined;
        
                        // Detach html click
                        $('html').off('click', closeOnHTMLClick);
        
                        // Restore page padding bottom
                        smartSelect.parents('.page-content').css({paddingBottom: ''});
                    });
        
                    // Link Picker
                    smartSelect[0].f7SmartSelectPicker = picker[0];
                }
        
                // Init Page
                app.initPage(picker.find('.page'));
        
                // Attach events
                handleInputs(picker);
            }
            else {
                $(document).once('page:init', '.smart-select-page', pageInit);
                view.router.load({
                    content: pageHTML,
                    reload: reLayout ? true : undefined
                });
            }
        };
        

        /*===============================================================================
        ************   Virtual List   ************
        ===============================================================================*/
        var VirtualList = function (listBlock, params) {
            var defaults = {
                cols: 1,
                height: app.params.material ? 48 : 44,
                cache: true,
                dynamicHeightBufferSize: 1,
                showFilteredItemsOnly: false,
                template:
                    '<li>' +
                        '<div class="item-content">' +
                            '<div class="item-inner">' +
                                '<div class="item-title">{{this}}</div>' +
                            '</div>' +
                        '</div>' +
                    '</li>'
            };
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
        
            // Preparation
            var vl = this;
            vl.listBlock = $(listBlock);
            vl.params = params;
            vl.items = vl.params.items;
            if (vl.params.showFilteredItemsOnly) {
                vl.filteredItems = [];
            }
            if (vl.params.template && !vl.params.renderItem) {
                if (typeof vl.params.template === 'string') vl.template = t7.compile(vl.params.template);
                else if (typeof vl.params.template === 'function') vl.template = vl.params.template;
            }
            vl.pageContent = vl.listBlock.parents('.page-content');
        
            // Bad scroll
            var updatableScroll;
            if (typeof vl.params.updatableScroll !== 'undefined') {
                updatableScroll = vl.params.updatableScroll;
            }
            else {
                updatableScroll = true;
                if (app.device.ios && app.device.osVersion.split('.')[0] < 8) {
                    updatableScroll = false;
                }
                vl.params.updatableScroll = updatableScroll;
            }
        
            // Append <ul>
            vl.ul = vl.params.ul ? $(vl.params.ul) : vl.listBlock.children('ul');
            if (vl.ul.length === 0) {
                vl.listBlock.append('<ul></ul>');
                vl.ul = vl.listBlock.children('ul');
            }
        
            // DOM cached items
            vl.domCache = {};
            vl.displayDomCache = {};
        
            // Temporary DOM Element
            vl.tempDomElement = document.createElement('ul');
        
            // Last repain position
            vl.lastRepaintY = null;
        
            // Fragment
            vl.fragment = document.createDocumentFragment();
        
            // Filter
            vl.filterItems = function (indexes, resetScrollTop) {
                vl.filteredItems = [];
                var firstIndex = indexes[0];
                var lastIndex = indexes[indexes.length - 1];
                for (var i = 0; i < indexes.length; i++) {
                    vl.filteredItems.push(vl.items[indexes[i]]);
                }
                if (typeof resetScrollTop === 'undefined') resetScrollTop = true;
                if (resetScrollTop) {
                    vl.pageContent[0].scrollTop = 0;
                }
                vl.update();
            };
            vl.resetFilter = function () {
                if (vl.params.showFilteredItemsOnly) {
                    vl.filteredItems = [];
                }
                else {
                    vl.filteredItems = null;
                    delete vl.filteredItems;
                }
                vl.update();
            };
        
            var pageHeight, rowsPerScreen, rowsBefore, rowsAfter, rowsToRender, maxBufferHeight = 0, listHeight;
            var dynamicHeight = typeof vl.params.height === 'function';
        
            // Set list size
            vl.setListSize = function () {
                var items = vl.filteredItems || vl.items;
                pageHeight = vl.pageContent[0].offsetHeight;
                if (dynamicHeight) {
                    listHeight = 0;
                    vl.heights = [];
                    for (var i = 0; i < items.length; i++) {
                        var itemHeight = vl.params.height(items[i]);
                        listHeight += itemHeight;
                        vl.heights.push(itemHeight);
                    }
                }
                else {
                    listHeight = Math.ceil(items.length /  vl.params.cols) * vl.params.height;
                    rowsPerScreen = Math.ceil(pageHeight / vl.params.height);
                    rowsBefore = vl.params.rowsBefore || rowsPerScreen * 2;
                    rowsAfter = vl.params.rowsAfter || rowsPerScreen;
                    rowsToRender = (rowsPerScreen + rowsBefore + rowsAfter);
                    maxBufferHeight = rowsBefore / 2 * vl.params.height;
                }
        
                if (updatableScroll) {
                    vl.ul.css({height: listHeight + 'px'});
                }
            };
        
            // Render items
            vl.render = function (force, forceScrollTop) {
                if (force) vl.lastRepaintY = null;
        
                var scrollTop = -(vl.listBlock[0].getBoundingClientRect().top - vl.pageContent[0].getBoundingClientRect().top);
        
                if (typeof forceScrollTop !== 'undefined') scrollTop = forceScrollTop;
        
                if (vl.lastRepaintY === null || Math.abs(scrollTop - vl.lastRepaintY) > maxBufferHeight || (!updatableScroll && (vl.pageContent[0].scrollTop + pageHeight >= vl.pageContent[0].scrollHeight))) {
                    vl.lastRepaintY = scrollTop;
                }
                else {
                    return;
                }
        
                var items = vl.filteredItems || vl.items,
                    fromIndex, toIndex, heightBeforeFirstItem = 0, heightBeforeLastItem = 0;
                if (dynamicHeight) {
                    var itemTop = 0, j, itemHeight;
                    maxBufferHeight = pageHeight;
        
                    for (j = 0; j < vl.heights.length; j++) {
                        itemHeight = vl.heights[j];
                        if (typeof fromIndex === 'undefined') {
                            if (itemTop + itemHeight >= scrollTop - pageHeight * 2 * vl.params.dynamicHeightBufferSize) fromIndex = j;
                            else heightBeforeFirstItem += itemHeight;
                        }
        
                        if (typeof toIndex === 'undefined') {
                            if (itemTop + itemHeight >= scrollTop + pageHeight * 2 * vl.params.dynamicHeightBufferSize || j === vl.heights.length - 1) toIndex = j + 1;
                            heightBeforeLastItem += itemHeight;
                        }
                        itemTop += itemHeight;
                    }
                    toIndex = Math.min(toIndex, items.length);
                }
                else {
                    fromIndex = (parseInt(scrollTop / vl.params.height) - rowsBefore) * vl.params.cols;
                    if (fromIndex < 0) {
                        fromIndex = 0;
                    }
                    toIndex = Math.min(fromIndex + rowsToRender * vl.params.cols, items.length);
                }
        
                var topPosition;
                vl.reachEnd = false;
                for (var i = fromIndex; i < toIndex; i++) {
                    var item, index;
                    // Define real item index
                    index = vl.items.indexOf(items[i]);
        
                    if (i === fromIndex) vl.currentFromIndex = index;
                    if (i === toIndex - 1) vl.currentToIndex = index;
                    if (vl.filteredItems) {
                        if (vl.items[index] === vl.filteredItems[vl.filteredItems.length - 1]) vl.reachEnd = true;
                    }
                    else {
                        if (index === vl.items.length - 1) vl.reachEnd = true;
                    }
        
                    // Find items
                    if (vl.domCache[index]) {
                        item = vl.domCache[index];
                    }
                    else {
                        if (vl.template && !vl.params.renderItem) {
                            vl.tempDomElement.innerHTML = vl.template(items[i], {index: index}).trim();
                        }
                        else if (vl.params.renderItem) {
                            vl.tempDomElement.innerHTML = vl.params.renderItem(index, items[i]).trim();
                        }
                        else {
                            vl.tempDomElement.innerHTML = items[i].toString().trim();
                        }
                        item = vl.tempDomElement.childNodes[0];
                        if (vl.params.cache) vl.domCache[index] = item;
                    }
                    item.f7VirtualListIndex = index;
        
                    // Set item top position
                    if (i === fromIndex) {
                        if (dynamicHeight) {
                            topPosition = heightBeforeFirstItem;
                        }
                        else {
                            topPosition = (i * vl.params.height / vl.params.cols);
                        }
                    }
                    item.style.top = topPosition + 'px';
        
                    // Before item insert
                    if (vl.params.onItemBeforeInsert) vl.params.onItemBeforeInsert(vl, item);
        
                    // Append item to fragment
                    vl.fragment.appendChild(item);
        
        
                }
        
                // Update list height with not updatable scroll
                if (!updatableScroll) {
                    if (dynamicHeight) {
                        vl.ul[0].style.height = heightBeforeLastItem + 'px';
                    }
                    else {
                        vl.ul[0].style.height = i * vl.params.height / vl.params.cols + 'px';
                    }
                }
        
                // Update list html
                if (vl.params.onBeforeClear) vl.params.onBeforeClear(vl, vl.fragment);
                vl.ul[0].innerHTML = '';
        
                if (vl.params.onItemsBeforeInsert) vl.params.onItemsBeforeInsert(vl, vl.fragment);
                if (items && items.length === 0) {
                    vl.reachEnd = true;
                    if (vl.params.emptyTemplate) vl.ul[0].innerHTML = vl.params.emptyTemplate;
                }
                else {
                    vl.ul[0].appendChild(vl.fragment);
                }
        
                if (vl.params.onItemsAfterInsert) vl.params.onItemsAfterInsert(vl, vl.fragment);
        
                if (typeof forceScrollTop !== 'undefined' && force) {
                    vl.pageContent.scrollTop(forceScrollTop, 0);
                }
            };
        
            vl.scrollToItem = function (index) {
                if (index > vl.items.length) return false;
        
                var itemTop = 0, listTop;
                if (dynamicHeight) {
                    for (var i = 0; i < index; i++) {
                        itemTop += vl.heights[i];
                    }
                }
                else {
                    itemTop = index * vl.params.height;
                }
                listTop = vl.listBlock[0].offsetTop;
                vl.render(true, listTop + itemTop - parseInt(vl.pageContent.css('padding-top'), 10));
                return true;
            };
        
            // Handle scroll event
            vl.handleScroll = function (e) {
                vl.render();
            };
            // Handle resize event
            vl._isVisible = function (el) {
                return !!( el.offsetWidth || el.offsetHeight || el.getClientRects().length );
            };
            vl.handleResize = function (e) {
                if (vl._isVisible(vl.listBlock[0])) {
                    vl.setListSize();
                    vl.render(true);
                }
            };
        
            vl.attachEvents = function (detach) {
                var action = detach ? 'off' : 'on';
                vl.pageContent[action]('scroll', vl.handleScroll);
                vl.listBlock.parents('.tab').eq(0)[action]('tab:show', vl.handleResize);
                vl.listBlock.parents('.panel').eq(0)[action]('panel:open', vl.handleResize);
                vl.listBlock.parents('.popup').eq(0)[action]('popup:open', vl.handleResize);
                app[action === 'on' ? 'onResize' : 'offResize'](vl.handleResize);
            };
        
            // Init Virtual List
            vl.init = function () {
                vl.attachEvents();
                vl.setListSize();
                vl.render();
            };
        
            // Append
            vl.appendItems = function (items) {
                for (var i = 0; i < items.length; i++) {
                    vl.items.push(items[i]);
                }
                vl.update();
            };
            vl.appendItem = function (item) {
                vl.appendItems([item]);
            };
            // Replace
            vl.replaceAllItems = function (items) {
                vl.items = items;
                delete vl.filteredItems;
                vl.domCache = {};
                vl.update();
            };
            vl.replaceItem = function (index, item) {
                vl.items[index] = item;
                if (vl.params.cache) delete vl.domCache[index];
                vl.update();
            };
            // Prepend
            vl.prependItems = function (items) {
                for (var i = items.length - 1; i >= 0; i--) {
                    vl.items.unshift(items[i]);
                }
                if (vl.params.cache) {
                    var newCache = {};
                    for (var cached in vl.domCache) {
                        newCache[parseInt(cached, 10) + items.length] = vl.domCache[cached];
                    }
                    vl.domCache = newCache;
                }
                vl.update();
            };
            vl.prependItem = function (item) {
                vl.prependItems([item]);
            };
        
            // Move
            vl.moveItem = function (oldIndex, newIndex) {
                if (oldIndex === newIndex) return;
                // remove item from array
                var item = vl.items.splice(oldIndex, 1)[0];
                if (newIndex >= vl.items.length) {
                    // Add item to the end
                    vl.items.push(item);
                    newIndex = vl.items.length - 1;
                }
                else {
                    // Add item to new index
                    vl.items.splice(newIndex, 0, item);
                }
                // Update cache
                if (vl.params.cache) {
                    var newCache = {};
                    for (var cached in vl.domCache) {
                        var cachedIndex = parseInt(cached, 10);
                        var leftIndex = oldIndex < newIndex ? oldIndex : newIndex;
                        var rightIndex = oldIndex < newIndex ? newIndex : oldIndex;
                        var indexShift = oldIndex < newIndex ? -1 : 1;
                        if (cachedIndex < leftIndex || cachedIndex > rightIndex) newCache[cachedIndex] = vl.domCache[cachedIndex];
                        if (cachedIndex === leftIndex) newCache[rightIndex] = vl.domCache[cachedIndex];
                        if (cachedIndex > leftIndex && cachedIndex <= rightIndex) newCache[cachedIndex + indexShift] = vl.domCache[cachedIndex];
                    }
                    vl.domCache = newCache;
                }
                vl.update();
            };
            // Insert before
            vl.insertItemBefore = function (index, item) {
                if (index === 0) {
                    vl.prependItem(item);
                    return;
                }
                if (index >= vl.items.length) {
                    vl.appendItem(item);
                    return;
                }
                vl.items.splice(index, 0, item);
                // Update cache
                if (vl.params.cache) {
                    var newCache = {};
                    for (var cached in vl.domCache) {
                        var cachedIndex = parseInt(cached, 10);
                        if (cachedIndex >= index) {
                            newCache[cachedIndex + 1] = vl.domCache[cachedIndex];
                        }
                    }
                    vl.domCache = newCache;
                }
                vl.update();
            };
            // Delete
            vl.deleteItems = function (indexes) {
                var prevIndex, indexShift = 0;
                for (var i = 0; i < indexes.length; i++) {
                    var index = indexes[i];
                    if (typeof prevIndex !== 'undefined') {
                        if (index > prevIndex) {
                            indexShift = -i;
                        }
                    }
                    index = index + indexShift;
                    prevIndex = indexes[i];
                    // Delete item
                    var deletedItem = vl.items.splice(index, 1)[0];
        
                    // Delete from filtered
                    if (vl.filteredItems && vl.filteredItems.indexOf(deletedItem) >= 0) {
                        vl.filteredItems.splice(vl.filteredItems.indexOf(deletedItem), 1);
                    }
                    // Update cache
                    if (vl.params.cache) {
                        var newCache = {};
                        for (var cached in vl.domCache) {
                            var cachedIndex = parseInt(cached, 10);
                            if (cachedIndex === index) {
                                delete vl.domCache[index];
                            }
                            else if (parseInt(cached, 10) > index) {
                                newCache[cachedIndex - 1] = vl.domCache[cached];
                            }
                            else {
                                newCache[cachedIndex] = vl.domCache[cached];
                            }
                        }
                        vl.domCache = newCache;
                    }
                }
                vl.update();
            };
            vl.deleteAllItems = function () {
                vl.items = [];
                delete vl.filteredItems;
                if (vl.params.cache) vl.domCache = {};
                vl.update();
            };
            vl.deleteItem = function (index) {
                vl.deleteItems([index]);
            };
        
            // Clear cache
            vl.clearCache = function () {
                vl.domCache = {};
            };
        
            // Update Virtual List
            vl.update = function () {
                vl.setListSize();
                vl.render(true);
            };
        
            // Destroy
            vl.destroy = function () {
                vl.attachEvents(true);
                delete vl.items;
                delete vl.domCache;
            };
        
            // Init Virtual List
            vl.init();
        
            // Store vl in container
            vl.listBlock[0].f7VirtualList = vl;
            return vl;
        };
        
        // App Method
        app.virtualList = function (listBlock, params) {
            return new VirtualList(listBlock, params);
        };
        
        app.reinitVirtualList = function (pageContainer) {
            var page = $(pageContainer);
            var vlists = page.find('.virtual-list');
            if (vlists.length === 0) return;
            for (var i = 0; i < vlists.length; i++) {
                var vlistInstance = vlists[i].f7VirtualList;
                if (vlistInstance) {
                    vlistInstance.update();
                }
            }
        };
        

        /*======================================================
        ************   Pull To Refresh   ************
        ======================================================*/
        app.initPullToRefresh = function (pageContainer) {
            var eventsTarget = $(pageContainer);
            if (!eventsTarget.hasClass('pull-to-refresh-content')) {
                eventsTarget = eventsTarget.find('.pull-to-refresh-content');
            }
            if (!eventsTarget || eventsTarget.length === 0) return;
        
            var touchId, isTouched, isMoved, touchesStart = {}, isScrolling, touchesDiff, touchStartTime, container, refresh = false, useTranslate = false, startTranslate = 0, translate, scrollTop, wasScrolled, layer, triggerDistance, dynamicTriggerDistance, pullStarted;
            var page = eventsTarget.hasClass('page') ? eventsTarget : eventsTarget.parents('.page');
            var hasNavbar = false;
            if (page.find('.navbar').length > 0 || page.parents('.navbar-fixed, .navbar-through').length > 0 || page.hasClass('navbar-fixed') || page.hasClass('navbar-through')) hasNavbar = true;
            if (page.hasClass('no-navbar')) hasNavbar = false;
            if (!hasNavbar) eventsTarget.addClass('pull-to-refresh-no-navbar');
        
            container = eventsTarget;
        
            // Define trigger distance
            if (container.attr('data-ptr-distance')) {
                dynamicTriggerDistance = true;
            }
            else {
                triggerDistance = 44;
            }
        
            function handleTouchStart(e) {
                if (isTouched) {
                    if (app.device.os === 'android') {
                        if ('targetTouches' in e && e.targetTouches.length > 1) return;
                    }
                    else return;
                }
        
                /*jshint validthis:true */
                container = $(this);
                if (container.hasClass('refreshing')) {
                    return;
                }
        
                isMoved = false;
                pullStarted = false;
                isTouched = true;
                isScrolling = undefined;
                wasScrolled = undefined;
                if (e.type === 'touchstart') touchId = e.targetTouches[0].identifier;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = (new Date()).getTime();
        
            }
        
            function handleTouchMove(e) {
                if (!isTouched) return;
                var pageX, pageY, touch;
                if (e.type === 'touchmove') {
                    if (touchId && e.touches) {
                        for (var i = 0; i < e.touches.length; i++) {
                            if (e.touches[i].identifier === touchId) {
                                touch = e.touches[i];
                            }
                        }
                    }
                    if (!touch) touch = e.targetTouches[0];
                    pageX = touch.pageX;
                    pageY = touch.pageY;
                }
                else {
                    pageX = e.pageX;
                    pageY = e.pageY;
                }
                if (!pageX || !pageY) return;
        
        
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (!isScrolling) {
                    isTouched = false;
                    return;
                }
        
                scrollTop = container[0].scrollTop;
                if (typeof wasScrolled === 'undefined' && scrollTop !== 0) wasScrolled = true;
        
                if (!isMoved) {
                    /*jshint validthis:true */
                    container.removeClass('transitioning');
                    if (scrollTop > container[0].offsetHeight) {
                        isTouched = false;
                        return;
                    }
                    if (dynamicTriggerDistance) {
                        triggerDistance = container.attr('data-ptr-distance');
                        if (triggerDistance.indexOf('%') >= 0) triggerDistance = container[0].offsetHeight * parseInt(triggerDistance, 10) / 100;
                    }
                    startTranslate = container.hasClass('refreshing') ? triggerDistance : 0;
                    if (container[0].scrollHeight === container[0].offsetHeight || app.device.os !== 'ios') {
                        useTranslate = true;
                    }
                    else {
                        useTranslate = false;
                    }
                }
                isMoved = true;
                touchesDiff = pageY - touchesStart.y;
        
                if (touchesDiff > 0 && scrollTop <= 0 || scrollTop < 0) {
                    // iOS 8 fix
                    if (app.device.os === 'ios' && parseInt(app.device.osVersion.split('.')[0], 10) > 7 && scrollTop === 0 && !wasScrolled) useTranslate = true;
        
                    if (useTranslate) {
                        e.preventDefault();
                        translate = (Math.pow(touchesDiff, 0.85) + startTranslate);
                        container.transform('translate3d(0,' + translate + 'px,0)');
                    }
                    if ((useTranslate && Math.pow(touchesDiff, 0.85) > triggerDistance) || (!useTranslate && touchesDiff >= triggerDistance * 2)) {
                        refresh = true;
                        container.addClass('pull-up').removeClass('pull-down');
                    }
                    else {
                        refresh = false;
                        container.removeClass('pull-up').addClass('pull-down');
                    }
                    if (!pullStarted) {
                        container.trigger('pullstart ptr:pullstart');
                        pullStarted = true;
                    }
                    container.trigger('pullmove ptr:pullmove', {
                        event: e,
                        scrollTop: scrollTop,
                        translate: translate,
                        touchesDiff: touchesDiff
                    });
                }
                else {
                    pullStarted = false;
                    container.removeClass('pull-up pull-down');
                    refresh = false;
                    return;
                }
            }
            function handleTouchEnd(e) {
                if (e.type === 'touchend' && e.changedTouches && e.changedTouches.length > 0 && touchId) {
                    if (e.changedTouches[0].identifier !== touchId) return;
                }
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                if (translate) {
                    container.addClass('transitioning');
                    translate = 0;
                }
                container.transform('');
                if (refresh) {
                    container.addClass('refreshing');
                    container.trigger('refresh ptr:refresh', {
                        done: function () {
                            app.pullToRefreshDone(container);
                        }
                    });
                }
                else {
                    container.removeClass('pull-down');
                }
                isTouched = false;
                isMoved = false;
                if (pullStarted) container.trigger('pullend ptr:pullend');
            }
        
            // Attach Events
            var passiveListener = app.touchEvents.start === 'touchstart' && app.support.passiveListener ? {passive: true, capture: false} : false;
            var activeListener = app.support.passiveListener ? {passive: false, capture: false} : false;
            eventsTarget.on(app.touchEvents.start, handleTouchStart, passiveListener);
            eventsTarget.on(app.touchEvents.move, handleTouchMove, activeListener);
            eventsTarget.on(app.touchEvents.end, handleTouchEnd, passiveListener);
        
            // Detach Events on page remove
            if (page.length === 0) return;
            function destroyPullToRefresh() {
                eventsTarget.off(app.touchEvents.start, handleTouchStart, passiveListener);
                eventsTarget.off(app.touchEvents.move, handleTouchMove, activeListener);
                eventsTarget.off(app.touchEvents.end, handleTouchEnd, passiveListener);
            }
            eventsTarget[0].f7DestroyPullToRefresh = destroyPullToRefresh;
            function detachEvents() {
                destroyPullToRefresh();
                page.off('page:beforeremove', detachEvents);
            }
            page.on('page:beforeremove', detachEvents);
        
        };
        
        app.pullToRefreshDone = function (container) {
            container = $(container);
            if (container.length === 0) container = $('.pull-to-refresh-content.refreshing');
            container.removeClass('refreshing').addClass('transitioning');
            container.transitionEnd(function () {
                container.removeClass('transitioning pull-up pull-down');
                container.trigger('refreshdone ptr:done');
            });
        };
        app.pullToRefreshTrigger = function (container) {
            container = $(container);
            if (container.length === 0) container = $('.pull-to-refresh-content');
            if (container.hasClass('refreshing')) return;
            container.addClass('transitioning refreshing');
            container.trigger('refresh ptr:refresh', {
                done: function () {
                    app.pullToRefreshDone(container);
                }
            });
        };
        
        app.destroyPullToRefresh = function (pageContainer) {
            pageContainer = $(pageContainer);
            var pullToRefreshContent = pageContainer.hasClass('pull-to-refresh-content') ? pageContainer : pageContainer.find('.pull-to-refresh-content');
            if (pullToRefreshContent.length === 0) return;
            if (pullToRefreshContent[0].f7DestroyPullToRefresh) pullToRefreshContent[0].f7DestroyPullToRefresh();
        };
        

        /* ===============================================================================
        ************   Infinite Scroll   ************
        =============================================================================== */
        function handleInfiniteScroll() {
            /*jshint validthis:true */
            var inf = $(this);
            var scrollTop = inf[0].scrollTop;
            var scrollHeight = inf[0].scrollHeight;
            var height = inf[0].offsetHeight;
            var distance = inf[0].getAttribute('data-distance');
            var virtualListContainer = inf.find('.virtual-list');
            var virtualList;
            var onTop = inf.hasClass('infinite-scroll-top');
            if (!distance) distance = 50;
            if (typeof distance === 'string' && distance.indexOf('%') >= 0) {
                distance = parseInt(distance, 10) / 100 * height;
            }
            if (distance > height) distance = height;
            if (onTop) {
                if (scrollTop < distance) {
                    inf.trigger('infinite');
                }
            }
            else {
                if (scrollTop + height >= scrollHeight - distance) {
                    if (virtualListContainer.length > 0) {
                        virtualList = virtualListContainer.eq(-1)[0].f7VirtualList;
                        if (virtualList && !virtualList.reachEnd && !virtualList.params.updatableScroll) {
                            return;
                        }
                    }
                    inf.trigger('infinite');
                }
            }
        
        }
        app.attachInfiniteScroll = function (infiniteContent) {
            $(infiniteContent).on('scroll', handleInfiniteScroll);
        };
        app.detachInfiniteScroll = function (infiniteContent) {
            $(infiniteContent).off('scroll', handleInfiniteScroll);
        };
        
        app.initPageInfiniteScroll = function (pageContainer) {
            pageContainer = $(pageContainer);
            var infiniteContent = pageContainer.find('.infinite-scroll');
            if (infiniteContent.length === 0) return;
            app.attachInfiniteScroll(infiniteContent);
            function detachEvents() {
                app.detachInfiniteScroll(infiniteContent);
                pageContainer.off('page:beforeremove', detachEvents);
            }
            pageContainer.on('page:beforeremove', detachEvents);
        };

        /*=============================================================
        ************   Hide/show Toolbar/Navbar on scroll   ************
        =============================================================*/
        app.initPageScrollToolbars = function (pageContainer) {
            pageContainer = $(pageContainer);
            var scrollContent = pageContainer.find('.page-content');
            if (scrollContent.length === 0) return;
            var hideNavbar = (app.params.hideNavbarOnPageScroll || scrollContent.hasClass('hide-navbar-on-scroll') || scrollContent.hasClass('hide-bars-on-scroll')) && !(scrollContent.hasClass('keep-navbar-on-scroll') || scrollContent.hasClass('keep-bars-on-scroll'));
            var hideToolbar = (app.params.hideToolbarOnPageScroll || scrollContent.hasClass('hide-toolbar-on-scroll') || scrollContent.hasClass('hide-bars-on-scroll')) && !(scrollContent.hasClass('keep-toolbar-on-scroll') || scrollContent.hasClass('keep-bars-on-scroll'));
            var hideTabbar = (app.params.hideTabbarOnPageScroll || scrollContent.hasClass('hide-tabbar-on-scroll')) && !(scrollContent.hasClass('keep-tabbar-on-scroll'));
        
            if (!(hideNavbar || hideToolbar || hideTabbar)) return;
        
            var viewContainer = scrollContent.parents('.' + app.params.viewClass);
            if (viewContainer.length === 0) return;
        
            var navbar = viewContainer.find('.navbar'),
                toolbar = viewContainer.find('.toolbar'),
                tabbar;
            if (hideTabbar) {
                tabbar = viewContainer.find('.tabbar');
                if (tabbar.length === 0) tabbar = viewContainer.parents('.' + app.params.viewsClass).find('.tabbar');
            }
        
            var hasNavbar = navbar.length > 0,
                hasToolbar = toolbar.length > 0,
                hasTabbar = tabbar && tabbar.length > 0;
        
            var previousScroll, currentScroll;
                previousScroll = currentScroll = scrollContent[0].scrollTop;
        
            var scrollHeight, offsetHeight, reachEnd, action, navbarHidden, toolbarHidden, tabbarHidden;
        
            var toolbarHeight = (hasToolbar && hideToolbar) ? toolbar[0].offsetHeight : 0;
            var tabbarHeight = (hasTabbar && hideTabbar) ? tabbar[0].offsetHeight : 0;
            var bottomBarHeight = tabbarHeight || toolbarHeight;
        
            function handleScroll(e) {
                if (pageContainer.hasClass('page-on-left')) return;
                currentScroll = scrollContent[0].scrollTop;
                scrollHeight = scrollContent[0].scrollHeight;
                offsetHeight = scrollContent[0].offsetHeight;
                reachEnd =  currentScroll + offsetHeight >= scrollHeight - bottomBarHeight;
                navbarHidden = navbar.hasClass('navbar-hidden');
                toolbarHidden = toolbar.hasClass('toolbar-hidden');
                tabbarHidden = tabbar && tabbar.hasClass('toolbar-hidden');
        
                if (reachEnd) {
                    if (app.params.showBarsOnPageScrollEnd) {
                        action = 'show';
                    }
                }
                else if (previousScroll > currentScroll) {
                    if (app.params.showBarsOnPageScrollTop || currentScroll <= 44) {
                        action = 'show';
                    }
                    else {
                        action = 'hide';
                    }
                }
                else {
                    if (currentScroll > 44) {
                        action = 'hide';
                    }
                    else {
                        action = 'show';
                    }
                }
        
                if (action === 'show') {
                    if (hasNavbar && hideNavbar && navbarHidden) {
                        app.showNavbar(navbar);
                        pageContainer.removeClass('no-navbar-by-scroll');
                        navbarHidden = false;
                    }
                    if (hasToolbar && hideToolbar && toolbarHidden) {
                        app.showToolbar(toolbar);
                        pageContainer.removeClass('no-toolbar-by-scroll');
                        toolbarHidden = false;
                    }
                    if (hasTabbar && hideTabbar && tabbarHidden) {
                        app.showToolbar(tabbar);
                        pageContainer.removeClass('no-tabbar-by-scroll');
                        tabbarHidden = false;
                    }
                }
                else {
                    if (hasNavbar && hideNavbar && !navbarHidden) {
                        app.hideNavbar(navbar);
                        pageContainer.addClass('no-navbar-by-scroll');
                        navbarHidden = true;
                    }
                    if (hasToolbar && hideToolbar && !toolbarHidden) {
                        app.hideToolbar(toolbar);
                        pageContainer.addClass('no-toolbar-by-scroll');
                        toolbarHidden = true;
                    }
                    if (hasTabbar && hideTabbar && !tabbarHidden) {
                        app.hideToolbar(tabbar);
                        pageContainer.addClass('no-tabbar-by-scroll');
                        tabbarHidden = true;
                    }
                }
        
                previousScroll = currentScroll;
            }
            scrollContent.on('scroll', handleScroll);
            scrollContent[0].f7ScrollToolbarsHandler = handleScroll;
        };
        app.destroyScrollToolbars = function (pageContainer) {
            pageContainer = $(pageContainer);
            var scrollContent = pageContainer.find('.page-content');
            if (scrollContent.length === 0) return;
            var handler = scrollContent[0].f7ScrollToolbarsHandler;
            if (!handler) return;
            scrollContent.off('scroll', scrollContent[0].f7ScrollToolbarsHandler);
        };
        

        /*======================================================
        ************   Material Tabbar   ************
        ======================================================*/
        app.materialTabbarSetHighlight = function (tabbar, activeLink) {
            $(tabbar).each(function () {
                var tabbar = $(this);
                activeLink = activeLink || tabbar.find('.tab-link.active');
        
                if (activeLink && activeLink.length > 0) {
                    var tabLinkWidth, highlightTranslate;
                    if (tabbar.hasClass('tabbar-scrollable')) {
                        tabLinkWidth = activeLink[0].offsetWidth + 'px';
                        highlightTranslate = activeLink[0].offsetLeft + 'px';
                    }
                    else {
                        tabLinkWidth = 1 / tabbar.find('.tab-link').length * 100 + '%';
                        highlightTranslate = (app.rtl ? - activeLink.index(): activeLink.index()) * 100 + '%';
                    }
        
                    tabbar.find('.tab-link-highlight')
                        .css({width: tabLinkWidth})
                        .transform('translate3d(' + highlightTranslate + ',0,0)');
                }
            });
        };
        app.initPageMaterialTabbar = function (pageContainer) {
            pageContainer = $(pageContainer);
            var tabbar = pageContainer.find('.tabbar');
            if (tabbar.length === 0 && pageContainer.hasClass('tabbar')) tabbar = pageContainer;
        
            function tabbarSetHighlight() {
                app.materialTabbarSetHighlight(tabbar);
            }
            if (tabbar.length > 0) {
                if (tabbar.find('.tab-link-highlight').length === 0) {
                    tabbar.find('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
                }
        
                tabbarSetHighlight();
                app.onResize(tabbarSetHighlight);
                pageContainer.once('page:beforeremove', function () {
                    app.offResize(tabbarSetHighlight);
                });
            }
        };
        app.initMaterialTabbar = function (tabbar) {
            return app.initPageMaterialTabbar(tabbar);
        };
        

        /* ===============================================================================
        ************   Tabs   ************
        =============================================================================== */
        app.showTab = function (tab, tabLink, animated, force) {
            var newTab = $(tab);
            if (arguments.length === 2 && typeof arguments[1] === 'boolean') {
                tab = arguments[0];
                animated = arguments[1];
            }
            if (arguments.length === 3 && typeof arguments[1] === 'boolean' && typeof arguments[2] === 'boolean') {
                tab = arguments[0];
                animated = arguments[1];
                force = arguments[2];
            }
            if (typeof animated === 'undefined') animated = true;
            if (newTab.length === 0) return false;
            if (newTab.hasClass('active')) {
                if (force) newTab.trigger('show tab:show');
                return false;
            }
            var tabs = newTab.parent('.tabs');
            if (tabs.length === 0) return false;
        
            // Return swipeouts in hidden tabs
            app.allowSwipeout = true;
        
            // Animated tabs
            var isAnimatedTabs = tabs.parent().hasClass('tabs-animated-wrap');
            if (isAnimatedTabs) {
                tabs.parent()[animated ? 'removeClass' : 'addClass']('not-animated');
                var tabTranslate = (app.rtl ? newTab.index() : -newTab.index()) * 100;
                tabs.transform('translate3d(' + tabTranslate + '%,0,0)');
            }
        
            // Swipeable tabs
            var isSwipeableTabs = tabs.parent().hasClass('tabs-swipeable-wrap'), swiper;
            if (isSwipeableTabs) {
                swiper = tabs.parent()[0].swiper;
                if (swiper.activeIndex !== newTab.index()) swiper.slideTo(newTab.index(), animated ? undefined : 0, false);
            }
        
            // Remove active class from old tabs
            var oldTab = tabs.children('.tab.active').removeClass('active').trigger('hide tab:hide');
            // Add active class to new tab
            newTab.addClass('active');
            // Trigger 'show' event on new tab
            newTab.trigger('show tab:show');
        
            // Update navbars in new tab
            if (!isAnimatedTabs && !isSwipeableTabs && newTab.find('.navbar').length > 0) {
                // Find tab's view
                var viewContainer;
                if (newTab.hasClass(app.params.viewClass)) viewContainer = newTab[0];
                else viewContainer = newTab.parents('.' + app.params.viewClass)[0];
                app.sizeNavbars(viewContainer);
            }
        
            // Find related link for new tab
            if (tabLink) tabLink = $(tabLink);
            else {
                // Search by id
                if (typeof tab === 'string') tabLink = $('.tab-link[href="' + tab + '"]');
                else tabLink = $('.tab-link[href="#' + newTab.attr('id') + '"]');
                // Search by data-tab
                if (!tabLink || tabLink && tabLink.length === 0) {
                    $('[data-tab]').each(function () {
                        if (newTab.is($(this).attr('data-tab'))) tabLink = $(this);
                    });
                }
            }
            if (tabLink.length === 0) return;
        
            // Find related link for old tab
            var oldTabLink;
            if (oldTab && oldTab.length > 0) {
                // Search by id
                var oldTabId = oldTab.attr('id');
                if (oldTabId) oldTabLink = $('.tab-link[href="#' + oldTabId + '"]');
                // Search by data-tab
                if (!oldTabLink || oldTabLink && oldTabLink.length === 0) {
                    $('[data-tab]').each(function () {
                        if (oldTab.is($(this).attr('data-tab'))) oldTabLink = $(this);
                    });
                }
            }
        
            // Update links' classes
            if (tabLink && tabLink.length > 0) {
                tabLink.addClass('active');
                // Material Highlight
                if (app.params.material) {
                    var tabbar = tabLink.parents('.tabbar');
                    if (tabbar.length > 0) {
                        if (tabbar.find('.tab-link-highlight').length === 0) {
                            tabbar.find('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
                        }
                        app.materialTabbarSetHighlight(tabbar, tabLink);
                    }
                }
            }
            if (oldTabLink && oldTabLink.length > 0) oldTabLink.removeClass('active');
        
            return true;
        };

        /*===============================================================================
        ************   Accordion   ************
        ===============================================================================*/
        app.accordionToggle = function (item) {
            item = $(item);
            if (item.length === 0) return;
            if (item.hasClass('accordion-item-expanded')) app.accordionClose(item);
            else app.accordionOpen(item);
        };
        app.accordionOpen = function (item) {
            item = $(item);
            var list = item.parents('.accordion-list').eq(0);
            var content = item.children('.accordion-item-content');
            if (content.length === 0) content = item.find('.accordion-item-content');
            var expandedItem = list.length > 0 && item.parent().children('.accordion-item-expanded');
            if (expandedItem.length > 0) {
                app.accordionClose(expandedItem);
            }
            content.css('height', content[0].scrollHeight + 'px').transitionEnd(function () {
                if (item.hasClass('accordion-item-expanded')) {
                    content.transition(0);
                    content.css('height', 'auto');
                    var clientLeft = content[0].clientLeft;
                    content.transition('');
                    item.trigger('opened accordion:opened');
                }
                else {
                    content.css('height', '');
                    item.trigger('closed accordion:closed');
                }
            });
            item.trigger('open accordion:open');
            item.addClass('accordion-item-expanded');
        };
        app.accordionClose = function (item) {
            item = $(item);
            var content = item.children('.accordion-item-content');
            if (content.length === 0) content = item.find('.accordion-item-content');
            item.removeClass('accordion-item-expanded');
            content.transition(0);
            content.css('height', content[0].scrollHeight + 'px');
            // Relayout
            var clientLeft = content[0].clientLeft;
            // Close
            content.transition('');
            content.css('height', '').transitionEnd(function () {
                if (item.hasClass('accordion-item-expanded')) {
                    content.transition(0);
                    content.css('height', 'auto');
                    var clientLeft = content[0].clientLeft;
                    content.transition('');
                    item.trigger('opened accordion:opened');
                }
                else {
                    content.css('height', '');
                    item.trigger('closed accordion:closed');
                }
            });
            item.trigger('close accordion:close');
        };

        /*===============================================================================
        ************   Fast Clicks   ************
        ************   Inspired by https://github.com/ftlabs/fastclick   ************
        ===============================================================================*/
        app.initFastClicks = function () {
            if (app.params.activeState) {
                $('html').addClass('watch-active-state');
            }
            if (app.device.ios && app.device.webView) {
                // Strange hack required for iOS 8 webview to work on inputs
                window.addEventListener('touchstart', function () {});
            }
        
            var touchStartX, touchStartY, touchStartTime, targetElement, trackClick, activeSelection, scrollParent, lastClickTime, isMoved, tapHoldFired, tapHoldTimeout;
            var activableElement, activeTimeout, needsFastClick, needsFastClickTimeOut;
            var rippleWave, rippleTarget, rippleTransform, rippleTimeout;
            function findActivableElement(el) {
                var target = $(el);
                var parents = target.parents(app.params.activeStateElements);
                var activable;
                if (target.is(app.params.activeStateElements)) {
                    activable = target;
                }
                if (parents.length > 0) {
                    activable = activable ? activable.add(parents) : parents;
                }
                return activable ? activable : target;
            }
            function isInsideScrollableView(el) {
                var pageContent = el.parents('.page-content, .panel');
        
                if (pageContent.length === 0) {
                    return false;
                }
        
                // This event handler covers the "tap to stop scrolling".
                if (pageContent.prop('scrollHandlerSet') !== 'yes') {
                    pageContent.on('scroll', function() {
                      clearTimeout(activeTimeout);
                      clearTimeout(rippleTimeout);
                    });
                    pageContent.prop('scrollHandlerSet', 'yes');
                }
        
                return true;
            }
            function addActive() {
                if (!activableElement) return;
                activableElement.addClass('active-state');
            }
            function removeActive(el) {
                if (!activableElement) return;
                activableElement.removeClass('active-state');
                activableElement = null;
            }
            function isFormElement(el) {
                var nodes = ('input select textarea label').split(' ');
                if (el.nodeName && nodes.indexOf(el.nodeName.toLowerCase()) >= 0) return true;
                return false;
            }
            function androidNeedsBlur(el) {
                var noBlur = ('button input textarea select').split(' ');
                if (document.activeElement && el !== document.activeElement && document.activeElement !== document.body) {
                    if (noBlur.indexOf(el.nodeName.toLowerCase()) >= 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return false;
                }
            }
            function targetNeedsFastClick(el) {
                var $el = $(el);
                if (el.nodeName.toLowerCase() === 'input' && (el.type === 'file' || el.type === 'range')) return false;
                if (el.nodeName.toLowerCase() === 'select' && app.device.android) return false;
                if ($el.hasClass('no-fastclick') || $el.parents('.no-fastclick').length > 0) return false;
                if (app.params.fastClicksExclude && $el.is(app.params.fastClicksExclude)) return false;
                return true;
            }
            function targetNeedsFocus(el) {
                if (document.activeElement === el) {
                    return false;
                }
                var tag = el.nodeName.toLowerCase();
                var skipInputs = ('button checkbox file image radio submit').split(' ');
                if (el.disabled || el.readOnly) return false;
                if (tag === 'textarea') return true;
                if (tag === 'select') {
                    if (app.device.android) return false;
                    else return true;
                }
                if (tag === 'input' && skipInputs.indexOf(el.type) < 0) return true;
            }
            function targetNeedsPrevent(el) {
                el = $(el);
                var prevent = true;
                if (el.is('label') || el.parents('label').length > 0) {
                    if (app.device.android) {
                        prevent = false;
                    }
                    else if (app.device.ios && el.is('input')) {
                        prevent = true;
                    }
                    else prevent = false;
                }
                return prevent;
            }
        
            // Mouse Handlers
            function handleMouseDown (e) {
                findActivableElement(e.target).addClass('active-state');
                if ('which' in e && e.which === 3) {
                    setTimeout(function () {
                        $('.active-state').removeClass('active-state');
                    }, 0);
                }
                if (app.params.material && app.params.materialRipple) {
                    touchStartX = e.pageX;
                    touchStartY = e.pageY;
                    rippleTouchStart(e.target, e.pageX, e.pageY);
                }
            }
            function handleMouseMove (e) {
                $('.active-state').removeClass('active-state');
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchMove();
                }
            }
            function handleMouseUp (e) {
                $('.active-state').removeClass('active-state');
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchEnd();
                }
            }
        
            // Material Touch Ripple Effect
            function findRippleElement(el) {
                var needsRipple = app.params.materialRippleElements;
                var $el = $(el);
                if ($el.is(needsRipple)) {
                    if ($el.hasClass('no-ripple')) {
                        return false;
                    }
                    return $el;
                }
                else if ($el.parents(needsRipple).length > 0) {
                    var rippleParent = $el.parents(needsRipple).eq(0);
                    if (rippleParent.hasClass('no-ripple')) {
                        return false;
                    }
                    return rippleParent;
                }
                else return false;
            }
            function createRipple(x, y, el) {
                if (!el) return;
                var box = el[0].getBoundingClientRect();
                var center = {
                    x: x - box.left,
                    y: y - box.top
                },
                    height = box.height,
                    width = box.width;
                var diameter = Math.max(Math.pow((Math.pow(height, 2) + Math.pow(width, 2)), 0.5), 48);
        
                rippleWave = $(
                    '<div class="ripple-wave" style="width: ' + diameter + 'px; height: '+diameter+'px; margin-top:-'+diameter/2+'px; margin-left:-'+diameter/2+'px; left:'+center.x+'px; top:'+center.y+'px;"></div>'
                );
                el.prepend(rippleWave);
                var clientLeft = rippleWave[0].clientLeft;
                rippleTransform = 'translate3d('+(-center.x + width/2)+'px, '+(-center.y + height/2)+'px, 0) scale(1)';
                rippleWave.transform(rippleTransform);
            }
        
            function removeRipple() {
                if (!rippleWave) return;
                var toRemove = rippleWave;
        
                var removeTimeout = setTimeout(function () {
                    toRemove.remove();
                }, 400);
        
                rippleWave
                    .addClass('ripple-wave-fill')
                    .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'))
                    .transitionEnd(function () {
                        clearTimeout(removeTimeout);
        
                        var rippleWave = $(this)
                            .addClass('ripple-wave-out')
                            .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'));
        
                        removeTimeout = setTimeout(function () {
                            rippleWave.remove();
                        }, 700);
        
                        setTimeout(function () {
                            rippleWave.transitionEnd(function(){
                                clearTimeout(removeTimeout);
                                $(this).remove();
                            });
                        }, 0);
                    });
        
                rippleWave = rippleTarget = undefined;
            }
        
            function rippleTouchStart (el, x, y) {
                rippleTarget = findRippleElement(el);
                if (!rippleTarget || rippleTarget.length === 0) {
                    rippleTarget = undefined;
                    return;
                }
                if (!isInsideScrollableView(rippleTarget)) {
                    createRipple(touchStartX, touchStartY, rippleTarget);
                }
                else {
                    rippleTimeout = setTimeout(function () {
                        createRipple(touchStartX, touchStartY, rippleTarget);
                    }, 80);
                }
            }
            function rippleTouchMove() {
                clearTimeout(rippleTimeout);
                removeRipple();
            }
            function rippleTouchEnd() {
                if (rippleWave) {
                    removeRipple();
                }
                else if (rippleTarget && !isMoved) {
                    clearTimeout(rippleTimeout);
                    createRipple(touchStartX, touchStartY, rippleTarget);
                    setTimeout(removeRipple, 0);
                }
                else {
                    removeRipple();
                }
            }
        
            // Send Click
            function sendClick(e) {
                var touch = e.changedTouches[0];
                var evt = document.createEvent('MouseEvents');
                var eventType = 'click';
                if (app.device.android && targetElement.nodeName.toLowerCase() === 'select') {
                    eventType = 'mousedown';
                }
                evt.initMouseEvent(eventType, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
                evt.forwardedTouchEvent = true;
                targetElement.dispatchEvent(evt);
            }
        
            // Touch Handlers
            function handleTouchStart(e) {
                isMoved = false;
                tapHoldFired = false;
                if (e.targetTouches.length > 1) {
                    if (activableElement) removeActive();
                    return true;
                }
                if (e.touches.length > 1 && activableElement) {
                    removeActive();
                }
                if (app.params.tapHold) {
                    if (tapHoldTimeout) clearTimeout(tapHoldTimeout);
                    tapHoldTimeout = setTimeout(function () {
                        if (e && e.touches && e.touches.length > 1) return;
                        tapHoldFired = true;
                        e.preventDefault();
                        $(e.target).trigger('taphold');
                    }, app.params.tapHoldDelay);
                }
                if (needsFastClickTimeOut) clearTimeout(needsFastClickTimeOut);
                needsFastClick = targetNeedsFastClick(e.target);
        
                if (!needsFastClick) {
                    trackClick = false;
                    return true;
                }
                if (app.device.ios || (app.device.android && 'getSelection' in window)) {
                    var selection = window.getSelection();
                    if (selection.rangeCount && selection.focusNode !== document.body && (!selection.isCollapsed || document.activeElement === selection.focusNode)) {
                        activeSelection = true;
                        return true;
                    }
                    else {
                        activeSelection = false;
                    }
                }
                if (app.device.android)  {
                    if (androidNeedsBlur(e.target)) {
                        document.activeElement.blur();
                    }
                }
        
                trackClick = true;
                targetElement = e.target;
                touchStartTime = (new Date()).getTime();
                touchStartX = e.targetTouches[0].pageX;
                touchStartY = e.targetTouches[0].pageY;
        
                // Detect scroll parent
                if (app.device.ios) {
                    scrollParent = undefined;
                    $(targetElement).parents().each(function () {
                        var parent = this;
                        if (parent.scrollHeight > parent.offsetHeight && !scrollParent) {
                            scrollParent = parent;
                            scrollParent.f7ScrollTop = scrollParent.scrollTop;
                        }
                    });
                }
                if ((e.timeStamp - lastClickTime) < app.params.fastClicksDelayBetweenClicks) {
                    e.preventDefault();
                }
        
                if (app.params.activeState) {
                    activableElement = findActivableElement(targetElement);
                    // If it's inside a scrollable view, we don't trigger active-state yet,
                    // because it can be a scroll instead. Based on the link:
                    // http://labnote.beedesk.com/click-scroll-and-pseudo-active-on-mobile-webk
                    if (!isInsideScrollableView(activableElement)) {
                        addActive();
                    } else {
                        activeTimeout = setTimeout(addActive, 80);
                    }
                }
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchStart(targetElement, touchStartX, touchStartY);
                }
            }
            function handleTouchMove(e) {
                if (!trackClick) return;
                var _isMoved = false;
                var distance = app.params.fastClicksDistanceThreshold;
                if (distance) {
                    var pageX = e.targetTouches[0].pageX;
                    var pageY = e.targetTouches[0].pageY;
                    if (Math.abs(pageX - touchStartX) > distance ||  Math.abs(pageY - touchStartY) > distance) {
                        _isMoved = true;
                    }
                }
                else {
                    _isMoved = true;
                }
                if (_isMoved) {
                    trackClick = false;
                    targetElement = null;
                    isMoved = true;
                    if (app.params.tapHold) {
                        clearTimeout(tapHoldTimeout);
                    }
        			if (app.params.activeState) {
        				clearTimeout(activeTimeout);
        				removeActive();
        			}
                    if (app.params.material && app.params.materialRipple) {
                        rippleTouchMove();
                    }
                }
            }
            function handleTouchEnd(e) {
                clearTimeout(activeTimeout);
                clearTimeout(tapHoldTimeout);
        
                if (!trackClick) {
                    if (!activeSelection && needsFastClick) {
                        if (!(app.device.android && !e.cancelable)) {
                            e.preventDefault();
                        }
                    }
                    return true;
                }
        
                if (document.activeElement === e.target) {
                    if (app.params.activeState) removeActive();
                    if (app.params.material && app.params.materialRipple) {
                        rippleTouchEnd();
                    }
                    return true;
                }
        
                if (!activeSelection) {
                    e.preventDefault();
                }
        
                if ((e.timeStamp - lastClickTime) < app.params.fastClicksDelayBetweenClicks) {
                    setTimeout(removeActive, 0);
                    return true;
                }
        
                lastClickTime = e.timeStamp;
        
                trackClick = false;
        
                if (app.device.ios && scrollParent) {
                    if (scrollParent.scrollTop !== scrollParent.f7ScrollTop) {
                        return false;
                    }
                }
        
                // Add active-state here because, in a very fast tap, the timeout didn't
                // have the chance to execute. Removing active-state in a timeout gives
                // the chance to the animation execute.
                if (app.params.activeState) {
                    addActive();
                    setTimeout(removeActive, 0);
                }
                // Remove Ripple
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchEnd();
                }
        
                // Trigger focus when required
                if (targetNeedsFocus(targetElement)) {
                    if (app.device.ios && app.device.webView) {
                        if ((event.timeStamp - touchStartTime) > 159) {
                            targetElement = null;
                            return false;
                        }
                        targetElement.focus();
                        return false;
                    }
                    else {
                        targetElement.focus();
                    }
                }
        
                // Blur active elements
                if (document.activeElement && targetElement !== document.activeElement && document.activeElement !== document.body && targetElement.nodeName.toLowerCase() !== 'label') {
                    document.activeElement.blur();
                }
        
                // Send click
                e.preventDefault();
                sendClick(e);
                return false;
            }
            function handleTouchCancel(e) {
                trackClick = false;
                targetElement = null;
        
                // Remove Active State
                clearTimeout(activeTimeout);
                clearTimeout(tapHoldTimeout);
                if (app.params.activeState) {
                    removeActive();
                }
        
                // Remove Ripple
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchEnd();
                }
            }
        
            function handleClick(e) {
                var allowClick = false;
        
                if (trackClick) {
                    targetElement = null;
                    trackClick = false;
                    return true;
                }
                if (e.target.type === 'submit' && e.detail === 0 || e.target.type === 'file') {
                    return true;
                }
                if (!targetElement) {
                    if (!isFormElement(e.target)) {
                        allowClick =  true;
                    }
                }
                if (!needsFastClick) {
                    allowClick = true;
                }
                if (document.activeElement === targetElement) {
                    allowClick =  true;
                }
                if (e.forwardedTouchEvent) {
                    allowClick =  true;
                }
                if (!e.cancelable) {
                    allowClick =  true;
                }
                if (app.params.tapHold && app.params.tapHoldPreventClicks && tapHoldFired) {
                    allowClick = false;
                }
                if (!allowClick) {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    if (targetElement) {
                        if (targetNeedsPrevent(targetElement) || isMoved) {
                            e.preventDefault();
                        }
                    }
                    else {
                        e.preventDefault();
                    }
                    targetElement = null;
                }
                needsFastClickTimeOut = setTimeout(function () {
                    needsFastClick = false;
                }, (app.device.ios || app.device.androidChrome ? 100 : 400));
        
                if (app.params.tapHold) {
                    tapHoldTimeout = setTimeout(function () {
                        tapHoldFired = false;
                    }, (app.device.ios || app.device.androidChrome ? 100 : 400));
                }
        
                return allowClick;
            }
            if (app.support.touch) {
                document.addEventListener('click', handleClick, true);
        
                document.addEventListener('touchstart', handleTouchStart);
                document.addEventListener('touchmove', handleTouchMove);
                document.addEventListener('touchend', handleTouchEnd);
                document.addEventListener('touchcancel', handleTouchCancel);
            }
            else {
                if (app.params.activeState) {
                    document.addEventListener('mousedown', handleMouseDown);
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                }
            }
            if (app.params.material && app.params.materialRipple) {
                document.addEventListener('contextmenu', function (e) {
                    if (activableElement) removeActive();
                    rippleTouchEnd();
                });
            }
        
        };
        

        /*===============================================================================
        ************   Handle clicks and make them fast (on tap);   ************
        ===============================================================================*/
        app.initClickEvents = function () {
            function handleScrollTop(e) {
                /*jshint validthis:true */
                var clicked = $(this);
                var target = $(e.target);
                var isLink = clicked[0].nodeName.toLowerCase() === 'a' ||
                             clicked.parents('a').length > 0 ||
                             target[0].nodeName.toLowerCase() === 'a' ||
                             target.parents('a').length > 0;
        
                if (isLink) return;
                var pageContent, page;
                if (app.params.scrollTopOnNavbarClick && clicked.is('.navbar .center')) {
                    // Find active page
                    var navbar = clicked.parents('.navbar');
        
                    // Static Layout
                    pageContent = navbar.parents('.page-content');
        
                    if (pageContent.length === 0) {
                        // Fixed Layout
                        if (navbar.parents('.page').length > 0) {
                            pageContent = navbar.parents('.page').find('.page-content');
                        }
                        // Through Layout
                        if (pageContent.length === 0) {
                            if (navbar.nextAll('.pages').length > 0) {
                                pageContent = navbar.nextAll('.pages').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                            }
                        }
                    }
                }
                if (app.params.scrollTopOnStatusbarClick && clicked.is('.statusbar-overlay')) {
                    if ($('.popup.modal-in').length > 0) {
                        // Check for opened popup
                        pageContent = $('.popup.modal-in').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                    else if ($('.panel.active').length > 0) {
                        // Check for opened panel
                        pageContent = $('.panel.active').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                    else if ($('.views > .view.active').length > 0) {
                        // View in tab bar app layout
                        pageContent = $('.views > .view.active').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                    else {
                        // Usual case
                        pageContent = $('.views').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                }
        
                if (pageContent && pageContent.length > 0) {
                    // Check for tab
                    if (pageContent.hasClass('tab')) {
                        pageContent = pageContent.parent('.tabs').children('.page-content.active');
                    }
                    if (pageContent.length > 0) pageContent.scrollTop(0, 300);
                }
            }
            function handleClicks(e) {
                /*jshint validthis:true */
                var clicked = $(this);
                var url = clicked.attr('href');
                var isLink = clicked[0].nodeName.toLowerCase() === 'a';
        
                // Check if link is external
                if (isLink) {
                    if (clicked.is(app.params.externalLinks) || (url && url.indexOf('javascript:') >= 0)) {
                        if(url && clicked.attr('target') === '_system') {
                            e.preventDefault();
                            window.open(url, '_system');
                        }
                        return;
                    }
                }
        
                // Collect Clicked data- attributes
                var clickedData = clicked.dataset();
        
                // Smart Select
                if (clicked.hasClass('smart-select')) {
                    if (app.smartSelectOpen) app.smartSelectOpen(clicked);
                }
        
                // Open Panel
                if (clicked.hasClass('open-panel')) {
                    if ($('.panel').length === 1) {
                        if ($('.panel').hasClass('panel-left')) app.openPanel('left');
                        else app.openPanel('right');
                    }
                    else {
                        if (clickedData.panel === 'right') app.openPanel('right');
                        else app.openPanel('left');
                    }
                }
                
                // Close Panel
                if (clicked.hasClass('close-panel')) {
                    app.closePanel();
                }
        
                // Panel Overlay
                if (clicked.hasClass('panel-overlay')) {
                    $('.panel.active').trigger('panel:overlay-click');
                    if (app.params.panelsCloseByOutside) app.closePanel();
                }
        
                // Popover
                if (clicked.hasClass('open-popover')) {
                    var popover;
                    if (clickedData.popover) {
                        popover = clickedData.popover;
                    }
                    else popover = '.popover';
                    app.popover(popover, clicked);
                }
                if (clicked.hasClass('close-popover')) {
                    app.closeModal('.popover.modal-in');
                }
                // Popup
                var popup;
                if (clicked.hasClass('open-popup')) {
                    if (clickedData.popup) {
                        popup = clickedData.popup;
                    }
                    else popup = '.popup';
                    app.popup(popup);
                }
                if (clicked.hasClass('close-popup')) {
                    if (clickedData.popup) {
                        popup = clickedData.popup;
                    }
                    else popup = '.popup.modal-in';
                    app.closeModal(popup);
                }
                // Login Screen
                var loginScreen;
                if (clicked.hasClass('open-login-screen')) {
                    if (clickedData.loginScreen) {
                        loginScreen = clickedData.loginScreen;
                    }
                    else loginScreen = '.login-screen';
                    app.loginScreen(loginScreen);
                }
                if (clicked.hasClass('close-login-screen')) {
                    app.closeModal('.login-screen.modal-in');
                }
                // Close Modal
                if (clicked.hasClass('modal-overlay')) {
                    if ($('.modal.modal-in').length > 0 && app.params.modalCloseByOutside)
                        app.closeModal('.modal.modal-in');
                    if ($('.actions-modal.modal-in').length > 0 && app.params.actionsCloseByOutside)
                        app.closeModal('.actions-modal.modal-in');
        
                    if ($('.popover.modal-in').length > 0 && app.params.popoverCloseByOutside)
                        app.closeModal('.popover.modal-in');
                }
                if (clicked.hasClass('popup-overlay')) {
                    if ($('.popup.modal-in').length > 0 && app.params.popupCloseByOutside)
                        app.closeModal('.popup.modal-in');
                }
                if (clicked.hasClass('picker-modal-overlay')) {
                    if ($('.picker-modal.modal-in').length > 0)
                        app.closeModal('.picker-modal.modal-in');
                }
        
                // Picker
                if (clicked.hasClass('close-picker')) {
                    var pickerToClose = $('.picker-modal.modal-in');
                    if (pickerToClose.length > 0) {
                        app.closeModal(pickerToClose);
                    }
                    else {
                        pickerToClose = $('.popover.modal-in .picker-modal');
                        if (pickerToClose.length > 0) {
                            app.closeModal(pickerToClose.parents('.popover'));
                        }
                    }
                }
                if (clicked.hasClass('open-picker')) {
                    var pickerToOpen;
                    if (clickedData.picker) {
                        pickerToOpen = clickedData.picker;
                    }
                    else pickerToOpen = '.picker-modal';
                    app.pickerModal(pickerToOpen, clicked);
                }
        
                // Tabs
                var isTabLink;
                if (clicked.hasClass('tab-link')) {
                    isTabLink = true;
                    app.showTab(clickedData.tab || clicked.attr('href'), clicked);
                }
                // Swipeout Close
                if (clicked.hasClass('swipeout-close')) {
                    app.swipeoutClose(clicked.parents('.swipeout-opened'));
                }
                // Swipeout Delete
                if (clicked.hasClass('swipeout-delete')) {
                    if (clickedData.confirm) {
                        var text = clickedData.confirm;
                        var title = clickedData.confirmTitle;
                        if (title) {
                            app.confirm(text, title, function () {
                                app.swipeoutDelete(clicked.parents('.swipeout'));
                            }, function () {
                                if (clickedData.closeOnCancel) app.swipeoutClose(clicked.parents('.swipeout'));
                            });
                        }
                        else {
                            app.confirm(text, function () {
                                app.swipeoutDelete(clicked.parents('.swipeout'));
                            }, function () {
                                if (clickedData.closeOnCancel) app.swipeoutClose(clicked.parents('.swipeout'));
                            });
                        }
                    }
                    else {
                        app.swipeoutDelete(clicked.parents('.swipeout'));
                    }
        
                }
                // Sortable
                if (clicked.hasClass('toggle-sortable')) {
                    app.sortableToggle(clickedData.sortable);
                }
                if (clicked.hasClass('open-sortable')) {
                    app.sortableOpen(clickedData.sortable);
                }
                if (clicked.hasClass('close-sortable')) {
                    app.sortableClose(clickedData.sortable);
                }
                // Accordion
                if (clicked.hasClass('accordion-item-toggle') || (clicked.hasClass('item-link') && clicked.parent().hasClass('accordion-item'))) {
                    var accordionItem = clicked.parent('.accordion-item');
                    if (accordionItem.length === 0) accordionItem = clicked.parents('.accordion-item');
                    if (accordionItem.length === 0) accordionItem = clicked.parents('li');
                    app.accordionToggle(accordionItem);
                }
        
                // Speed Dial
                if (clicked.hasClass('floating-button') && clicked.parent().hasClass('speed-dial')) {
                    clicked.parent().toggleClass('speed-dial-opened');
                }
                if (clicked.hasClass('close-speed-dial')) {
                    $('.speed-dial-opened').removeClass('speed-dial-opened');
                }
        
                // Load Page
                if (app.params.ajaxLinks && !clicked.is(app.params.ajaxLinks) || !isLink || !app.params.router) {
                    return;
                }
                if (isLink) {
                    e.preventDefault();
                }
        
                var validUrl = url && url.length > 0 && url !== '#' && !isTabLink;
                var template = clickedData.template;
                if (validUrl || clicked.hasClass('back') || template) {
                    var view;
                    if (clickedData.view) {
                        view = $(clickedData.view)[0].f7View;
                    }
                    else {
                        view = clicked.parents('.' + app.params.viewClass)[0] && clicked.parents('.' + app.params.viewClass)[0].f7View;
                        if (view && view.params.linksView) {
                            if (typeof view.params.linksView === 'string') view = $(view.params.linksView)[0].f7View;
                            else if (view.params.linksView instanceof View) view = view.params.linksView;
                        }
                    }
                    if (!view) {
                        if (app.mainView) view = app.mainView;
                    }
                    if (!view) return;
        
                    var pageName;
                    if (!template) {
                        if (url && url.indexOf('#') === 0 && url !== '#')  {
                            if (view.params.domCache) {
                                pageName = url.split('#')[1];
                            }
                            else return;
                        }
                        if (url === '#' && !clicked.hasClass('back')) return;
                    }
                    else {
                        url = undefined;
                    }
        
                    var animatePages;
                    if (typeof clickedData.animatePages !== 'undefined') {
                        animatePages = clickedData.animatePages;
                    }
                    else {
                        if (clicked.hasClass('with-animation')) animatePages = true;
                        if (clicked.hasClass('no-animation')) animatePages = false;
                    }
        
                    var options = {
                        animatePages: animatePages,
                        ignoreCache: clickedData.ignoreCache,
                        force: clickedData.force,
                        reload: clickedData.reload,
                        reloadPrevious: clickedData.reloadPrevious,
                        pageName: pageName,
                        pushState: clickedData.pushState,
                        url: url
                    };
        
                    if (app.params.template7Pages) {
                        options.contextName = clickedData.contextName;
                        var context = clickedData.context;
                        if (context) {
                            options.context = JSON.parse(context);
                        }
                    }
                    if (template && template in t7.templates) {
                        options.template = t7.templates[template];
                    }
        
                    if (clicked.hasClass('back')) view.router.back(options);
                    else view.router.load(options);
                }
            }
            $(document).on('click', 'a, .open-panel, .close-panel, .panel-overlay, .modal-overlay, .popup-overlay, .swipeout-delete, .swipeout-close, .close-popup, .open-popup, .open-popover, .open-login-screen, .close-login-screen .smart-select, .toggle-sortable, .open-sortable, .close-sortable, .accordion-item-toggle, .close-picker, .picker-modal-overlay', handleClicks);
            if (app.params.scrollTopOnNavbarClick || app.params.scrollTopOnStatusbarClick) {
                $(document).on('click', '.statusbar-overlay, .navbar .center', handleScrollTop);
            }
        
            // Prevent scrolling on overlays
            function preventScrolling(e) {
                e.preventDefault();
            }
            if (app.support.touch && !app.device.android) {
                var activeListener = app.support.passiveListener ? {passive: false, capture: false} : false;
                $(document).on((app.params.fastClicks ? 'touchstart' : 'touchmove'), '.panel-overlay, .modal-overlay, .preloader-indicator-overlay, .popup-overlay, .searchbar-overlay', preventScrolling, activeListener);
            }
        };
        

        /*======================================================
        ************   App Resize Actions   ************
        ======================================================*/
        // Prevent iPad horizontal body scrolling when soft keyboard is opened
        function _fixIpadBodyScrolLeft() {
            if (app.device.ipad) {
                document.body.scrollLeft = 0;
                setTimeout(function () {
                    document.body.scrollLeft = 0;
                }, 0);
            }
        }
        var appResizeCallbacks = [];
        app.getSize = function () {
            var offset = app.root.offset();
            app.width = app.root[0].offsetWidth;
            app.height = app.root[0].offsetHeight;
            app.left = offset.left;
            app.top = offset.top;
        };
        app.onResize = function (callback) {
            appResizeCallbacks.push(callback);
        };
        app.offResize = function (callback) {
            for (var i = 0; i < appResizeCallbacks.length; i++) {
                if (appResizeCallbacks[i] === callback) {
                    appResizeCallbacks.splice(i, 1);
                }
            }
        };
        app.resize = function () {
            _fixIpadBodyScrolLeft();
            app.getSize();
            if (app.sizeNavbars) app.sizeNavbars();
            for (var i = 0; i < appResizeCallbacks.length; i++) {
                appResizeCallbacks[i]();
            }
        };
        app.orientationchange = function () {
            if (app.device && app.device.minimalUi) {
                if (window.orientation === 90 || window.orientation === -90) document.body.scrollTop = 0;
            }
            _fixIpadBodyScrolLeft();
        };
        app.initResize = function () {
            $(window).on('resize', app.resize);
            $(window).on('orientationchange', app.orientationchange);
            app.getSize();
        };
        

        /*===============================================================================
        ************   Store and parse forms data   ************
        ===============================================================================*/
        app.formsData = {};
        app.formStoreData = function (formId, formJSON) {
            // Store form data in app.formsData
            app.formsData[formId] = formJSON;
        
            // Store form data in local storage also
            app.ls['f7form-' + formId] = JSON.stringify(formJSON);
        };
        app.formDeleteData = function (formId) {
            // Delete form data from app.formsData
            if (app.formsData[formId]) {
                app.formsData[formId] = '';
                delete app.formsData[formId];
            }
        
            // Delete form data from local storage also
            if (app.ls['f7form-' + formId]) {
                app.ls['f7form-' + formId] = '';
                app.ls.removeItem('f7form-' + formId);
            }
        };
        app.formGetData = function (formId) {
            // First of all check in local storage
            if (app.ls['f7form-' + formId]) {
                return JSON.parse(app.ls['f7form-' + formId]);
            }
            // Try to get it from formsData obj
            else if (app.formsData[formId]) return app.formsData[formId];
        };
        app.formToData = function (form) {
            form = $(form);
            if (form.length !== 1) return false;
        
            // Form data
            var formData = {};
        
            // Skip input types
            var skipTypes = ['submit', 'image', 'button', 'file'];
            var skipNames = [];
            form.find('input, select, textarea').each(function () {
                var input = $(this);
                var name = input.attr('name');
                var type = input.attr('type');
                var tag = this.nodeName.toLowerCase();
                if (skipTypes.indexOf(type) >= 0) return;
                if (skipNames.indexOf(name) >= 0 || !name) return;
                if (tag === 'select' && input.prop('multiple')) {
                    skipNames.push(name);
                    formData[name] = [];
                    form.find('select[name="' + name + '"] option').each(function () {
                        if (this.selected) formData[name].push(this.value);
                    });
                }
                else {
                    switch (type) {
                        case 'checkbox' :
                            skipNames.push(name);
                            formData[name] = [];
                            form.find('input[name="' + name + '"]').each(function () {
                                if (this.checked) formData[name].push(this.value);
                            });
                            break;
                        case 'radio' :
                            skipNames.push(name);
                            form.find('input[name="' + name + '"]').each(function () {
                                if (this.checked) formData[name] = this.value;
                            });
                            break;
                        default :
                            formData[name] = input.val();
                            break;
                    }
                }
            });
            form.trigger('formToJSON formToData form:todata', {formData: formData});
        
            return formData;
        };
        app.formToJSON = app.formToData;
        app.formFromData = function (form, formData) {
            form = $(form);
            if (form.length !== 1) return false;
        
            // Skip input types
            var skipTypes = ['submit', 'image', 'button', 'file'];
            var skipNames = [];
        
            form.find('input, select, textarea').each(function () {
                var input = $(this);
                var name = input.attr('name');
                var type = input.attr('type');
                var tag = this.nodeName.toLowerCase();
                if (typeof formData[name] === 'undefined' || formData[name] === null) return;
                if (skipTypes.indexOf(type) >= 0) return;
                if (skipNames.indexOf(name) >= 0 || !name) return;
                if (tag === 'select' && input.prop('multiple')) {
                    skipNames.push(name);
                    form.find('select[name="' + name + '"] option').each(function () {
                        if (formData[name].indexOf(this.value) >= 0) this.selected = true;
                        else this.selected = false;
                    });
                }
                else {
                    switch (type) {
                        case 'checkbox' :
                            skipNames.push(name);
                            form.find('input[name="' + name + '"]').each(function () {
                                if (formData[name].indexOf(this.value) >= 0) this.checked = true;
                                else this.checked = false;
                            });
                            break;
                        case 'radio' :
                            skipNames.push(name);
                            form.find('input[name="' + name + '"]').each(function () {
                                if (formData[name] === this.value) this.checked = true;
                                else this.checked = false;
                            });
                            break;
                        default :
                            input.val(formData[name]);
                            break;
                    }
                }
                if (tag === 'select' || tag === 'input' || tag === 'textarea') {
                    input.trigger('change');
                }
            });
            form.trigger('formFromJSON formFromData form:fromdata', {formData: formData});
        };
        app.formFromJSON = app.formFromData;
        
        app.initFormsStorage = function (pageContainer) {
            pageContainer = $(pageContainer);
            var forms = pageContainer.find('form.store-data');
            if (forms.length === 0) return;
        
            // Parse forms data and fill form if there is such data
            forms.each(function () {
                var id = this.getAttribute('id');
                if (!id) return;
                var formData = app.formGetData(id);
                if (formData) app.formFromData(this, formData);
            });
            // Update forms data on inputs change
            function storeForm() {
                /*jshint validthis:true */
                var form = $(this);
                var formId = form[0].id;
                if (!formId) return;
                var formJSON = app.formToData(form);
                if (!formJSON) return;
                app.formStoreData(formId, formJSON);
                form.trigger('store form:storedata', {data: formJSON});
            }
            forms.on('change submit', storeForm);
        
            // Detach Listeners
            function pageBeforeRemove() {
                forms.off('change submit', storeForm);
                pageContainer.off('page:beforeremove', pageBeforeRemove);
            }
            pageContainer.on('page:beforeremove', pageBeforeRemove);
        };

        /*===============================================================================
        ************   Ajax submit for forms   ************
        ===============================================================================*/
        // Ajax submit on forms
        $(document).on('submit change', 'form.ajax-submit, form.ajax-submit-onchange', function (e) {
            var form = $(this);
            if (e.type === 'change' && !form.hasClass('ajax-submit-onchange')) return;
            if (e.type === 'submit') e.preventDefault();
        
            var method = (form.attr('method') || 'GET').toUpperCase();
            var contentType = form.prop('enctype') || form.attr('enctype');
        
            var url = form.attr('action');
            if (!url) return;
        
            var data;
            if (method === 'POST') data = new FormData(form[0]);
            else data = $.serializeObject(app.formToJSON(form[0]));
        
            var xhr = $.ajax({
                method: method,
                url: url,
                contentType: contentType,
                data: data,
                beforeSend: function (xhr) {
                    form.trigger('beforeSubmit form:beforesend', {data:data, xhr: xhr});
                },
                error: function (xhr) {
                    form.trigger('submitError form:error', {data:data, xhr: xhr});
                },
                success: function (data) {
                    form.trigger('submitted form:success', {data: data, xhr: xhr});
                }
            });
        });
        
        

        /*===============================================================================
        ************   Resizable textarea   ************
        ===============================================================================*/
        app.resizeTextarea = function (textarea) {
            textarea = $(textarea);
            if (!textarea.hasClass('resizable')) {
                return;
            }
            textarea.css({'height': ''});
            var height = textarea[0].offsetHeight;
            var diff = height - textarea[0].clientHeight;
            var scrollHeight = textarea[0].scrollHeight;
        
            if (scrollHeight + diff > height) {
                var newAreaHeight = scrollHeight + diff;
                textarea.css('height', newAreaHeight + 'px');
            }
        };
        app.resizableTextarea = function (textarea) {
            textarea = $(textarea);
            if (textarea.length === 0) return;
            var textareaTimeout;
            function handleTextarea() {
                clearTimeout(textareaTimeout);
                textareaTimeout = setTimeout(function () {
                    app.resizeTextarea(textarea);
                }, 0);
            }
            textarea[0].f7DestroyResizableTextarea = function () {
                textarea.off('change keydown keypress keyup paste cut', handleTextarea);
            };
            return textarea.on('change keydown keypress keyup paste cut', handleTextarea);
        };
        app.destroyResizableTextarea = function (pageContainer) {
            pageContainer = $(pageContainer);
            if (pageContainer.length > 0 && pageContainer.is('textarea') && pageContainer[0].f7DestroyResizableTextarea) {
                pageContainer[0].f7DestroyResizableTextarea();
            }
            else if (pageContainer.length > 0) {
                pageContainer.find('textarea.resiable').each(function () {
                    var textarea = this;
                    if (textarea.f7DestroyResizableTextarea) {
                        textarea.f7DestroyResizableTextarea ();
                    }
                });
            }
        };
        app.initPageResizableTextarea = function (pageContainer) {
            pageContainer = $(pageContainer);
            var textareas = pageContainer.find('textarea.resizable');
            textareas.each(function () {
                app.resizableTextarea(this);
            });
        };

        /*======================================================
        ************   Material Text Inputs   ************
        ======================================================*/
        app.initPageMaterialInputs = function (pageContainer) {
            pageContainer = $(pageContainer);
            var textareas = pageContainer.find('textarea.resizable');
            pageContainer.find('.item-input').each(function () {
                var itemInput = $(this);
                var notInputs = ['checkbox', 'button', 'submit', 'range', 'radio', 'image'];
                itemInput.find('input, select, textarea').each(function () {
                    var input = $(this);
                    if (notInputs.indexOf(input.attr('type')) < 0) {
                        itemInput.addClass('item-input-field');
                        if (input.val().trim() !== '') {
                            input.parents('.item-input, .input-field').add(input.parents('.item-inner')).addClass('not-empty-state');
                        }
                    }
                });
                if (itemInput.parents('.input-item, .inputs-list').length > 0) return;
                itemInput.parents('.list-block').eq(0).addClass('inputs-list');
            });
        };
        /*======================================================
        ************   Material Focus Inputs   ************
        ======================================================*/
        app.initMaterialWatchInputs = function () {
            var notInputs = ['checkbox', 'button', 'submit', 'range', 'radio', 'image'];
            function addFocusState(e) {
                /*jshint validthis:true*/
                var i = $(this);
                var type = i.attr('type');
                if (notInputs.indexOf(type) >= 0) return;
                var els = i.add(i.parents('.item-input, .input-field')).add(i.parents('.item-inner').eq(0));
                els.addClass('focus-state');
            }
            function removeFocusState(e) {
                /*jshint validthis:true*/
                var i = $(this), value = i.val();
                var type = i.attr('type');
                if (notInputs.indexOf(type) >= 0) return;
                var els = i.add(i.parents('.item-input, .input-field')).add(i.parents('.item-inner').eq(0));
                els.removeClass('focus-state');
                if (value && value.trim() !== '') {
                    els.addClass('not-empty-state');
                }
                else {
                    els.removeClass('not-empty-state');
                }
            }
            function watchChangeState(e) {
                /*jshint validthis:true*/
                var input = $(this),
                    value = input.val();
                var type = input.attr('type');
                if (notInputs.indexOf(type) >= 0) return;
                var els = input.add(input.parents('.item-input, .input-field')).add(input.parents('.item-inner').eq(0));
                if (els.length === 0) return;
                if (value && (typeof value === 'string' && value.trim() !== '') || (Array.isArray(value) && value.length > 0)) {
                    els.addClass('not-empty-state');
                }
                else {
                    els.removeClass('not-empty-state');
                }
            }
            $(document).on('change', 'input, textarea, select', watchChangeState, true);
            $(document).on('focus', 'input, textarea, select', addFocusState, true);
            $(document).on('blur', 'input, textarea, select', removeFocusState, true);
        };
        

        /*======================================================
        ************   Handle Browser's History   ************
        ======================================================*/
        app.pushStateQueue = [];
        app.pushStateClearQueue = function () {
            if (app.pushStateQueue.length === 0) return;
            var queue = app.pushStateQueue.pop();
            var animatePages;
            if (app.params.pushStateNoAnimation === true) animatePages = false;
            if (queue.action === 'back') {
                app.router.back(queue.view, {animatePages: animatePages});
            }
            if (queue.action === 'loadPage') {
                app.router.load(queue.view, {url: queue.stateUrl, animatePages: animatePages, pushState: false});
            }
            if (queue.action === 'loadContent') {
                app.router.load(queue.view, {content: queue.stateContent, animatePages: animatePages, pushState: false});
            }
            if (queue.action === 'loadPageName') {
                app.router.load(queue.view, {pageName: queue.statePageName, url: queue.stateUrl, animatePages: animatePages, pushState: false});
            }
        };
        
        app.initPushState = function () {
            var blockPopstate = true;
            $(window).on('load', function () {
                setTimeout(function () {
                    blockPopstate = false;
                }, 0);
            });
        
            if (document.readyState && document.readyState === 'complete') {
                blockPopstate = false;
            }
        
            function handlePopState(e) {
                if (blockPopstate) return;
                var mainView = app.mainView;
                if (!mainView) return;
                var state = e.state;
                if (!state) {
                    state = {
                        viewIndex: app.views.indexOf(mainView),
                        url : mainView.history[0]
                    };
                }
                if (state.viewIndex < 0) return;
                var view = app.views[state.viewIndex];
                var stateUrl = state && state.url || undefined;
                var stateContent = state && state.content || undefined;
                var statePageName = state && state.pageName || undefined;
                var animatePages;
        
                if (app.params.pushStateNoAnimation === true) animatePages = false;
        
                if (stateUrl !== view.url) {
                    if (view.history.indexOf(stateUrl) >= 0) {
                        // Go Back
                        if (view.allowPageChange) {
                            app.router.back(view, {url:undefined, animatePages: animatePages, pushState: false, preloadOnly:false});
                        }
                        else {
                            app.pushStateQueue.push({
                                action: 'back',
                                view: view
                            });
                        }
                    }
                    else if (stateContent) {
                        // Load Page
                        if (view.allowPageChange) {
                            app.router.load(view, {content:stateContent, animatePages: animatePages, pushState: false});
                        }
                        else {
                            app.pushStateQueue.unshift({
                                action: 'loadContent',
                                stateContent: stateContent,
                                view: view
                            });
                        }
        
                    }
                    else if (statePageName) {
                        // Load Page by page name with Dom Cache
                        if (view.allowPageChange) {
                            app.router.load(view, {pageName:statePageName, url: stateUrl, animatePages: animatePages, pushState: false});
                        }
                        else {
                            app.pushStateQueue.unshift({
                                action: 'loadPageName',
                                statePageName: statePageName,
                                view: view
                            });
                        }
                    }
                    else  {
                        // Load Page
                        if (view.allowPageChange) {
                            app.router.load(view, {url:stateUrl, animatePages: animatePages, pushState: false});
                        }
                        else {
                            app.pushStateQueue.unshift({
                                action: 'loadPage',
                                stateUrl: stateUrl,
                                view: view
                            });
                        }
                    }
                }
            }
            $(window).on('popstate', handlePopState);
        };
        

        /*===========================
        Framework7 Swiper Additions
        ===========================*/
        app.swiper = function (container, params) {
            return new Swiper(container, params);
        };
        app.initPageSwiper = function (pageContainer) {
            pageContainer = $(pageContainer);
            var swipers = pageContainer.find('.swiper-init, .tabs-swipeable-wrap');
            if (swipers.length === 0) return;
            function destroySwiperOnRemove(slider) {
                function destroySwiper() {
                    slider.destroy();
                    pageContainer.off('page:beforeremove', destroySwiper);
                }
                pageContainer.on('page:beforeremove', destroySwiper);
            }
            swipers.each(function () {
                var swiper = $(this), initialSlide;
                var params;
                if (swiper.hasClass('tabs-swipeable-wrap')) {
                    swiper.addClass('swiper-container').children('.tabs').addClass('swiper-wrapper').children('.tab').addClass('swiper-slide');
                    initialSlide = swiper.children('.tabs').children('.tab.active').index();
                }
                if (swiper.data('swiper')) {
                    params = JSON.parse(swiper.data('swiper'));
                }
                else {
                    params = swiper.dataset();
                }
                if (typeof params.initialSlide === 'undefined' && typeof initialSlide !== 'undefined') {
                    params.initialSlide = initialSlide;
                }
                if (swiper.hasClass('tabs-swipeable-wrap')) {
                    params.onSlideChangeStart = function (s) {
                        app.showTab(s.slides.eq(s.activeIndex));
                    };
                }
                var _slider = app.swiper(swiper[0], params);
                destroySwiperOnRemove(_slider);
            });
        };
        app.reinitPageSwiper = function (pageContainer) {
            pageContainer = $(pageContainer);
            var sliders = pageContainer.find('.swiper-init, .tabs-swipeable-wrap');
            if (sliders.length === 0) return;
            for (var i = 0; i < sliders.length; i++) {
                var sliderInstance = sliders[0].swiper;
                if (sliderInstance) {
                    sliderInstance.update(true);
                }
            }
        };
        

        /*======================================================
        ************   Photo Browser   ************
        ======================================================*/
        var PhotoBrowser = function (params) {
            var pb = this, i;
        
            var defaults = {
                photos : [],
                initialSlide: 0,
                spaceBetween: 20,
                speed: 300,
                zoom: true,
                zoomMax: 3,
                zoomMin: 1,
                exposition: true,
                expositionHideCaptions: false,
                type: 'standalone',
                navbar: true,
                toolbar: true,
                theme: 'light',
                swipeToClose: true,
                backLinkText: 'Close',
                ofText: 'of',
                loop: false,
                lazyLoading: false,
                lazyLoadingInPrevNext: false,
                lazyLoadingOnTransitionStart: false,
                material: app.params.material,
                materialPreloaderSvg: app.params.materialPreloaderSvg,
                materialPreloaderHtml: app.params.materialPreloaderHtml,
                /*
                Callbacks:
                onLazyImageLoad(pb, slide, img)
                onLazyImageReady(pb, slide, img)
                onOpen(pb)
                onClose(pb)
                onTransitionStart(swiper)
                onTransitionEnd(swiper)
                onSlideChangeStart(swiper)
                onSlideChangeEnd(swiper)
                onTap(swiper, e)
                onClick(swiper, e)
                onDoubleTap(swiper, e)
                onSwipeToClose(pb)
                */
            };
        
            params = params || {};
            if (!params.backLinkText && app.params.material) defaults.backLinkText = '';
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            if (params.maxZoom) {
                params.zoomMax = params.maxZoom;
            }
            if (params.minZoom) {
                params.zoomMin = params.minZoom;
            }
        
            pb.params = params;
            pb.params.iconsColorClass = pb.params.iconsColor ? 'color-' + pb.params.iconsColor : (pb.params.theme === 'dark' ? 'color-white' : '');
            pb.params.preloaderColorClass = pb.params.theme === 'dark' ? 'preloader-white' : '';
        
            // Templates
            var photoTemplate = pb.params.photoTemplate ||
                '<div class="photo-browser-slide swiper-slide">' +
                    '<span class="swiper-zoom-container">' +
                        '<img src="{{js "this.url || this"}}">' +
                    '</span>' +
                '</div>';
            var photoLazyTemplate = pb.params.lazyPhotoTemplate ||
                '<div class="photo-browser-slide photo-browser-slide-lazy swiper-slide">' +
                    '<div class="preloader {{@root.preloaderColorClass}}">{{#if @root.material}}{{@root.materialPreloaderHtml}}{{/if}}</div>' +
                    '<span class="swiper-zoom-container">' +
                        '<img data-src="{{js "this.url || this"}}" class="swiper-lazy">' +
                    '</span>' +
                '</div>';
            var objectTemplate = pb.params.objectTemplate ||
                '<div class="photo-browser-slide photo-browser-object-slide swiper-slide">{{js "this.html || this"}}</div>';
            var captionTemplate = pb.params.captionTemplate ||
                '<div class="photo-browser-caption" data-caption-index="{{@index}}">' +
                    '{{caption}}' +
                '</div>';
            var navbarTemplate = pb.params.navbarTemplate ||
                '<div class="navbar">' +
                    '<div class="navbar-inner">' +
                        '<div class="left sliding">' +
                            '<a href="#" class="link ' + (params.type === 'popup' ? 'close-popup' : 'photo-browser-close-link')+ ' {{#unless backLinkText}}icon-only{{/unless}} {{js "this.type === \'page\' ? \'back\' : \'\'"}}">' +
                                '<i class="icon icon-back {{iconsColorClass}}"></i>' +
                                '{{#if backLinkText}}<span>{{backLinkText}}</span>{{/if}}' +
                            '</a>' +
                        '</div>' +
                        '<div class="center sliding">' +
                            '<span class="photo-browser-current"></span> ' +
                            '<span class="photo-browser-of">{{ofText}}</span> ' +
                            '<span class="photo-browser-total"></span>' +
                        '</div>' +
                        '<div class="right"></div>' +
                    '</div>' +
                '</div>';
            var toolbarTemplate = pb.params.toolbarTemplate ||
                '<div class="toolbar tabbar">' +
                    '<div class="toolbar-inner">' +
                        '<a href="#" class="link photo-browser-prev">' +
                            '<i class="icon icon-prev {{iconsColorClass}}"></i>' +
                        '</a>' +
                        '<a href="#" class="link photo-browser-next">' +
                            '<i class="icon icon-next {{iconsColorClass}}"></i>' +
                        '</a>' +
                    '</div>' +
                '</div>';
        
            var htmlTemplate = t7.compile('<div class="photo-browser photo-browser-{{theme}}">' +
                    '<div class="view navbar-fixed toolbar-fixed">' +
                        '{{#unless material}}{{#if navbar}}' +
                        navbarTemplate +
                        '{{/if}}{{/unless}}' +
                        '<div class="page no-toolbar {{#unless navbar}}no-navbar{{/unless}} toolbar-fixed navbar-fixed" data-page="photo-browser-slides">' +
                            '{{#if material}}{{#if navbar}}' +
                            navbarTemplate +
                            '{{/if}}{{/if}}' +
                            '{{#if toolbar}}' +
                            toolbarTemplate +
                            '{{/if}}' +
                            '<div class="photo-browser-captions photo-browser-captions-{{js "this.captionsTheme || this.theme"}}">' +
                                '{{#each photos}}{{#if caption}}' +
                                captionTemplate +
                                '{{/if}}{{/each}}' +
                            '</div>' +
                            '<div class="photo-browser-swiper-container swiper-container">' +
                                '<div class="photo-browser-swiper-wrapper swiper-wrapper">' +
                                    '{{#each photos}}' +
                                    '{{#js_compare "this.html || ((typeof this === \'string\' || this instanceof String) && (this.indexOf(\'<\') >= 0 || this.indexOf(\'>\') >= 0))"}}' +
                                        objectTemplate +
                                    '{{else}}' +
                                        '{{#if @root.lazyLoading}}' +
                                        photoLazyTemplate +
                                        '{{else}}' +
                                        photoTemplate +
                                        '{{/if}}' +
                                    '{{/js_compare}}' +
                                    '{{/each}}' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>')(pb.params);
        
            pb.activeIndex = pb.params.initialSlide;
            pb.openIndex = pb.activeIndex;
            pb.opened = false;
        
            pb.open = function (index) {
                if (typeof index === 'undefined') index = pb.activeIndex;
                index = parseInt(index, 10);
                if (pb.opened && pb.swiper) {
                    pb.swiper.slideTo(index);
                    return;
                }
                pb.opened = true;
                pb.openIndex = index;
                if (pb.params.type === 'standalone') {
                    app.root.append(htmlTemplate);
                }
                if (pb.params.type === 'popup') {
                    pb.popup = app.popup('<div class="popup photo-browser-popup">' + htmlTemplate + '</div>');
                    $(pb.popup).on('popup:closed', pb.onPopupClose);
                }
                if (pb.params.type === 'page') {
                    $(document).once('page:beforeinit', pb.onPageBeforeInit);
                    $(document).once('page:beforeremove', pb.onPageBeforeRemove);
                    if (!pb.params.view) pb.params.view = app.mainView;
                    pb.params.view.loadContent(htmlTemplate);
                    return;
                }
                pb.layout(pb.openIndex);
                if (pb.params.onOpen) {
                    pb.params.onOpen(pb);
                }
        
            };
            pb.close = function () {
                pb.opened = false;
                if (!pb.swiperContainer || pb.swiperContainer.length === 0) {
                    return;
                }
                if (pb.params.onClose) {
                    pb.params.onClose(pb);
                }
                // Detach events
                pb.attachEvents(true);
                // Delete from DOM
                if (pb.params.type === 'standalone') {
                    pb.container.removeClass('photo-browser-in').addClass('photo-browser-out').animationEnd(function () {
                        pb.container.remove();
                    });
                }
                // Destroy slider
                pb.swiper.destroy();
                // Delete references
                pb.swiper = pb.swiperContainer = pb.swiperWrapper = pb.slides = undefined; //gestureSlide = gestureImg = gestureImgWrap = undefined;
            };
        
            pb.onPopupClose = function (e) {
                pb.close();
                $(pb.popup).off('page:beforeinit', pb.onPopupClose);
            };
            pb.onPageBeforeInit = function (e) {
                if (e.detail.page.name === 'photo-browser-slides') {
                    pb.layout(pb.openIndex);
                    if (pb.params.onOpen) {
                        pb.params.onOpen(pb);
                    }
                }
            };
            pb.onPageBeforeRemove = function (e) {
                if (e.detail.page.name === 'photo-browser-slides') {
                    pb.close();
                }
            };
        
            pb.onSliderTransitionStart = function (swiper) {
                pb.activeIndex = swiper.activeIndex;
        
                var current = swiper.activeIndex + 1;
                var total = swiper.slides.length;
                if (pb.params.loop) {
                    total = total - 2;
                    current = current - swiper.loopedSlides;
                    if (current < 1) current = total + current;
                    if (current > total) current = current - total;
                }
                pb.container.find('.photo-browser-current').text(current);
                pb.container.find('.photo-browser-total').text(total);
        
                $('.photo-browser-prev, .photo-browser-next').removeClass('photo-browser-link-inactive');
        
                if (swiper.isBeginning && !pb.params.loop) {
                    $('.photo-browser-prev').addClass('photo-browser-link-inactive');
                }
                if (swiper.isEnd && !pb.params.loop) {
                    $('.photo-browser-next').addClass('photo-browser-link-inactive');
                }
        
                // Update captions
                if (pb.captions.length > 0) {
                    pb.captionsContainer.find('.photo-browser-caption-active').removeClass('photo-browser-caption-active');
                    var captionIndex = pb.params.loop ? swiper.slides.eq(swiper.activeIndex).attr('data-swiper-slide-index') : pb.activeIndex;
                    pb.captionsContainer.find('[data-caption-index="' + captionIndex + '"]').addClass('photo-browser-caption-active');
                }
        
        
                // Stop Video
                var previousSlideVideo = swiper.slides.eq(swiper.previousIndex).find('video');
                if (previousSlideVideo.length > 0) {
                    if ('pause' in previousSlideVideo[0]) previousSlideVideo[0].pause();
                }
                // Callback
                if (pb.params.onTransitionStart) pb.params.onTransitionStart(swiper);
            };
            pb.onSliderTransitionEnd = function (swiper) {
                if (pb.params.onTransitionEnd) pb.params.onTransitionEnd(swiper);
            };
        
            pb.layout = function (index) {
                if (pb.params.type === 'page') {
                    pb.container = $('.photo-browser-swiper-container').parents('.view');
                }
                else {
                    pb.container = $('.photo-browser');
                }
                if (pb.params.type === 'standalone') {
                    pb.container.addClass('photo-browser-in');
                    app.sizeNavbars(pb.container);
                }
                pb.swiperContainer = pb.container.find('.photo-browser-swiper-container');
                pb.swiperWrapper = pb.container.find('.photo-browser-swiper-wrapper');
                pb.slides = pb.container.find('.photo-browser-slide');
                pb.captionsContainer = pb.container.find('.photo-browser-captions');
                pb.captions = pb.container.find('.photo-browser-caption');
        
                var sliderSettings = {
                    nextButton: pb.params.nextButton || '.photo-browser-next',
                    prevButton: pb.params.prevButton || '.photo-browser-prev',
                    indexButton: pb.params.indexButton,
                    initialSlide: index,
                    spaceBetween: pb.params.spaceBetween,
                    speed: pb.params.speed,
                    loop: pb.params.loop,
                    lazyLoading: pb.params.lazyLoading,
                    lazyLoadingInPrevNext: pb.params.lazyLoadingInPrevNext,
                    lazyLoadingOnTransitionStart: pb.params.lazyLoadingOnTransitionStart,
                    preloadImages: pb.params.lazyLoading ? false : true,
                    zoom: pb.params.zoom,
                    zoomMax: pb.params.zoomMax,
                    zoomMin: pb.params.zoomMin,
                    onTap: function (swiper, e) {
                        if (pb.params.onTap) pb.params.onTap(swiper, e);
                    },
                    onClick: function (swiper, e) {
                        if (pb.params.exposition) pb.toggleExposition();
                        if (pb.params.onClick) pb.params.onClick(swiper, e);
                    },
                    onDoubleTap: function (swiper, e) {
                        // pb.toggleZoom(e);
                        if (pb.params.onDoubleTap) pb.params.onDoubleTap(swiper, e);
                    },
                    onTransitionStart: function (swiper) {
                        pb.onSliderTransitionStart(swiper);
                    },
                    onTransitionEnd: function (swiper) {
                        pb.onSliderTransitionEnd(swiper);
                    },
                    onSlideChangeStart: pb.params.onSlideChangeStart,
                    onSlideChangeEnd: pb.params.onSlideChangeEnd,
                    onLazyImageLoad: function (swiper, slide, img) {
                        if (pb.params.onLazyImageLoad) pb.params.onLazyImageLoad(pb, slide, img);
                    },
                    onLazyImageReady: function (swiper, slide, img) {
                        $(slide).removeClass('photo-browser-slide-lazy');
                        if (pb.params.onLazyImageReady) pb.params.onLazyImageReady(pb, slide, img);
                    }
                };
        
                if (pb.params.swipeToClose && pb.params.type !== 'page') {
                    sliderSettings.onTouchStart = pb.swipeCloseTouchStart;
                    sliderSettings.onTouchMoveOpposite = pb.swipeCloseTouchMove;
                    sliderSettings.onTouchEnd = pb.swipeCloseTouchEnd;
                }
        
                pb.swiper = app.swiper(pb.swiperContainer, sliderSettings);
                if (index === 0) {
                    pb.onSliderTransitionStart(pb.swiper);
                }
                pb.attachEvents();
            };
            pb.attachEvents = function (detach) {
                var action = detach ? 'off' : 'on';
                pb.container.find('.photo-browser-close-link')[action]('click', pb.close);
            };
        
        
            // Expose
            pb.exposed = false;
            pb.toggleExposition = function () {
                if (pb.container) pb.container.toggleClass('photo-browser-exposed');
                if (pb.params.expositionHideCaptions) pb.captionsContainer.toggleClass('photo-browser-captions-exposed');
                pb.exposed = !pb.exposed;
            };
            pb.enableExposition = function () {
                if (pb.container) pb.container.addClass('photo-browser-exposed');
                if (pb.params.expositionHideCaptions) pb.captionsContainer.addClass('photo-browser-captions-exposed');
                pb.exposed = true;
            };
            pb.disableExposition = function () {
                if (pb.container) pb.container.removeClass('photo-browser-exposed');
                if (pb.params.expositionHideCaptions) pb.captionsContainer.removeClass('photo-browser-captions-exposed');
                pb.exposed = false;
            };
        
            // Swipe Up To Close
            var swipeToCloseIsTouched = false;
            var allowSwipeToClose = true;
            var swipeToCloseDiff, swipeToCloseStart, swipeToCloseCurrent, swipeToCloseStarted = false, swipeToCloseActiveSlide, swipeToCloseTimeStart;
            pb.swipeCloseTouchStart = function (swiper, e) {
                if (!allowSwipeToClose) return;
                swipeToCloseIsTouched = true;
            };
            pb.swipeCloseTouchMove = function (swiper, e) {
                if (!swipeToCloseIsTouched) return;
                if (!swipeToCloseStarted) {
                    swipeToCloseStarted = true;
                    swipeToCloseStart = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    swipeToCloseActiveSlide = pb.swiper.slides.eq(pb.swiper.activeIndex);
                    swipeToCloseTimeStart = (new Date()).getTime();
                }
                e.preventDefault();
                swipeToCloseCurrent = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                swipeToCloseDiff = swipeToCloseStart - swipeToCloseCurrent;
                var opacity = 1 - Math.abs(swipeToCloseDiff) / 300;
                swipeToCloseActiveSlide.transform('translate3d(0,' + (-swipeToCloseDiff) + 'px,0)');
                pb.swiper.container.css('opacity', opacity).transition(0);
            };
            pb.swipeCloseTouchEnd = function (swiper, e) {
                swipeToCloseIsTouched = false;
                if (!swipeToCloseStarted) {
                    swipeToCloseStarted = false;
                    return;
                }
                swipeToCloseStarted = false;
                allowSwipeToClose = false;
                var diff = Math.abs(swipeToCloseDiff);
                var timeDiff = (new Date()).getTime() - swipeToCloseTimeStart;
                if ((timeDiff < 300 && diff > 20) || (timeDiff >= 300 && diff > 100)) {
                    setTimeout(function () {
                        if (pb.params.type === 'standalone') {
                            pb.close();
                        }
                        if (pb.params.type === 'popup') {
                            app.closeModal(pb.popup);
                        }
                        if (pb.params.onSwipeToClose) {
                            pb.params.onSwipeToClose(pb);
                        }
                        allowSwipeToClose = true;
                    }, 0);
                    return;
                }
                if (diff !== 0) {
                    swipeToCloseActiveSlide.addClass('transitioning').transitionEnd(function () {
                        allowSwipeToClose = true;
                        swipeToCloseActiveSlide.removeClass('transitioning');
                    });
                }
                else {
                    allowSwipeToClose = true;
                }
                pb.swiper.container.css('opacity', '').transition('');
                swipeToCloseActiveSlide.transform('');
            };
        
            return pb;
        };
        
        app.photoBrowser = function (params) {
            return new PhotoBrowser(params);
        };
        

        /*===============================================================================
        ************   Autocomplete   ************
        ===============================================================================*/
        var Autocomplete = function (params) {
            var a = this;
        
            // Params
            var defaults = {
                // Standalone Options
                /*
                opener: undefined,
                */
                popupCloseText: 'Close',
                backText: 'Back',
                searchbarPlaceholderText: 'Search...',
                searchbarCancelText: 'Cancel',
                openWithAnimation: true,
                // When opened in page should the searchbar be focused by default
                autoFocus: false,
                openIn: 'page',
                backOnSelect: false,
                notFoundText: 'Nothing found',
                requestSourceOnOpen: false,
                /*
                pageTitle: undefined,
                */
        
                // Handle Data
                /*
                source: undefined,
                limit: undefined,
                */
                valueProperty: 'id',
                textProperty: 'text',
        
                // Dropdown Options
                highlightMatches: true,
        
                /*
                dropdownPlaceholderText: 'Type anything...',
                */
                updateInputValueOnSelect: true,
                expandInput: false,
        
                // Preloader
                preloaderColor: false,
                preloader: false,
        
                // Templates
                /*
                itemTemplate: undefined,
                navbarTemplate: undefined,
                dropdownTemplate: undefined
                dropdownItemTemplate: undefined,
                dropdownPlaceholderTemplate: undefined
                */
        
                // Color themes
                /*
                navbarTheme: undefined,
                formTheme: undefined,
                */
        
                // Callbacks
                /*
                onChange: function (a, value) - for not dropdown
                onOpen: function (a)
                onClose: function (a)
                */
            };
        
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            a.params = params;
        
            // Opener Link & View
            if (a.params.opener) {
                a.opener = $(a.params.opener);
            }
            var view = a.params.view;
            if (!a.params.view && a.opener && a.opener.length) {
                // Find related view
                view = a.opener.parents('.' + app.params.viewClass);
                if (view.length === 0) return;
                view = view[0].f7View;
            }
        
            // Input
            if (a.params.input) {
                a.input = $(a.params.input);
                if (a.input.length === 0 && a.params.openIn === 'dropdown') return;
            }
        
            // Array with selected items
            a.value = a.params.value || [];
        
            // ID & Inputs
            a.id = (new Date()).getTime();
            a.inputType = a.params.multiple ? 'checkbox' : 'radio';
            a.inputName = a.inputType + '-' + a.id;
        
            // Is Material
            var material = app.params.material;
        
            // Back On Select
            var backOnSelect = a.params.backOnSelect;
        
            if (a.params.openIn !== 'dropdown') {
                // Item Template
                a.itemTemplate = t7.compile(a.params.itemTemplate ||
                    '<li>' +
                        '<label class="label-{{inputType}} item-content">' +
                            '<input type="{{inputType}}" name="{{inputName}}" value="{{value}}" {{#if selected}}checked{{/if}}>' +
                            '{{#if material}}' +
                                '<div class="item-media">' +
                                    '<i class="icon icon-form-{{inputType}}"></i>' +
                                '</div>' +
                                '<div class="item-inner">' +
                                    '<div class="item-title">{{text}}</div>' +
                                '</div>' +
                            '{{else}}' +
                                '{{#if checkbox}}' +
                                '<div class="item-media">' +
                                    '<i class="icon icon-form-checkbox"></i>' +
                                '</div>' +
                                '{{/if}}' +
                                '<div class="item-inner">' +
                                    '<div class="item-title">{{text}}</div>' +
                                '</div>' +
                            '{{/if}}' +
                        '</label>' +
                    '</li>'
                );
                // Page Layout
                var pageTitle = a.params.pageTitle || '';
                if (!pageTitle && a.opener && a.opener.length) {
                    pageTitle = a.opener.find('.item-title').text();
                }
                var pageName = 'autocomplete-' + a.inputName;
        
                var navbarTheme = a.params.navbarTheme,
                    formTheme = a.params.formTheme;
        
                // Navbar HTML
                var navbarHTML;
                var noNavbar = '', noToolbar = '', navbarLayout;
        
                a.navbarTemplate = t7.compile(a.params.navbarTemplate ||
                    '<div class="navbar no-shadow {{#if navbarTheme}}theme-{{navbarTheme}}{{/if}}">' +
                        '<div class="navbar-inner">' +
                            '<div class="left sliding">' +
                                '{{#if material}}' +
                                '<a href="#" class="link {{#if inPopup}}close-popup{{else}}back{{/if}} icon-only" {{#unless animated}}data-animate-pages="false"{{/unless}}><i class="icon icon-back"></i></a>' +
                                '{{else}}' +
                                '<a href="#" class="link {{#if inPopup}}close-popup{{else}}back{{/if}}" {{#unless animated}}data-animate-pages="false"{{/unless}}>' +
                                    '<i class="icon icon-back"></i>' +
                                    '{{#if inPopup}}' +
                                    '<span>{{popupCloseText}}</span>' +
                                    '{{else}}' +
                                    '<span>{{backText}}</span>' +
                                    '{{/if}}' +
                                '</a>' +
                                '{{/if}}' +
                            '</div>' +
                            '<div class="center sliding">{{pageTitle}}</div>' +
                            '{{#if preloader}}' +
                            '<div class="right">' +
                                '<div class="autocomplete-preloader preloader {{#if preloaderColor}}preloader-{{preloaderColor}}{{/if}}"></div>' +
                            '</div>' +
                            '{{/if}}' +
                        '</div>' +
                    '</div>'
                );
                navbarHTML = a.navbarTemplate({
                    pageTitle: pageTitle,
                    backText: a.params.backText,
                    popupCloseText: a.params.popupCloseText,
                    openIn: a.params.openIn,
                    navbarTheme: navbarTheme,
                    inPopup: a.params.openIn === 'popup',
                    inPage: a.params.openIn === 'page',
                    material: material,
                    preloader: a.params.preloader,
                    preloaderColor: a.params.preloaderColor,
                    animated: a.params.openWithAnimation
                });
        
                // Determine navbar layout type - static/fixed/through
                if (a.params.openIn === 'page') {
                    navbarLayout = 'static';
                    if (a.opener) {
                        if (a.opener.parents('.navbar-through').length > 0) navbarLayout = 'through';
                        if (a.opener.parents('.navbar-fixed').length > 0) navbarLayout = 'fixed';
                        noToolbar = a.opener.parents('.page').hasClass('no-toolbar') ? 'no-toolbar' : '';
                        noNavbar  = a.opener.parents('.page').hasClass('no-navbar')  ? 'no-navbar'  : 'navbar-' + navbarLayout;
                    }
                    else if (view.container) {
                        if ($(view.container).hasClass('navbar-through') || $(view.container).find('.navbar-through').length > 0) navbarLayout = 'through';
                        if ($(view.container).hasClass('navbar-fixed') || $(view.container).find('.navbar-fixed').length > 0) navbarLayout = 'fixed';
                        noToolbar = $(view.activePage.container).hasClass('no-toolbar') ? 'no-toolbar' : '';
                        noNavbar  = $(view.activePage.container).hasClass('no-navbar')  ? 'no-navbar'  : 'navbar-' + navbarLayout;
                    }
                }
                else {
                    navbarLayout = 'fixed';
                }
                var searchbarHTML =
                    '<form class="searchbar">' +
                        '<div class="searchbar-input">' +
                            '<input type="search" placeholder="' + a.params.searchbarPlaceholderText + '">' +
                            '<a href="#" class="searchbar-clear"></a>' +
                        '</div>' +
                        (material ? '' : '<a href="#" class="searchbar-cancel">' + a.params.searchbarCancelText + '</a>') +
                    '</form>' +
                    '<div class="searchbar-overlay"></div>';
                var pageHTML =
                    (navbarLayout === 'through' ? navbarHTML : '') +
                    '<div class="pages">' +
                        '<div data-page="' + pageName + '" class="page autocomplete-page ' + noNavbar + ' ' + noToolbar + '">' +
                            (navbarLayout === 'fixed' ? navbarHTML : '') +
                            searchbarHTML +
                            '<div class="page-content">' +
                                (navbarLayout === 'static' ? navbarHTML : '') +
                                '<div class="list-block autocomplete-found autocomplete-list-' + a.id + ' ' + (formTheme ? 'theme-' + formTheme : '') + '">' +
                                    '<ul></ul>' +
                                '</div>' +
                                '<div class="list-block autocomplete-not-found">' +
                                    '<ul><li class="item-content"><div class="item-inner"><div class="item-title">' + a.params.notFoundText + '</div></div></li></ul>' +
                                '</div>' +
                                '<div class="list-block autocomplete-values">' +
                                    '<ul></ul>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
            }
            else {
                a.dropdownItemTemplate = t7.compile(a.params.dropdownItemTemplate ||
                    '<li>' +
                        '<label class="{{#unless placeholder}}label-radio{{/unless}} item-content" data-value="{{value}}">' +
                            '<div class="item-inner">' +
                                '<div class="item-title">{{text}}</div>' +
                            '</div>' +
                        '</label>' +
                    '</li>'
                );
                a.dropdownPlaceholderTemplate = t7.compile(a.params.dropdownPlaceholderTemplate ||
                    '<li class="autocomplete-dropdown-placeholder">' +
                        '<div class="item-content">' +
                            '<div class="item-inner">' +
                                '<div class="item-title">{{text}}</div>' +
                            '</div>' +
                        '</label>' +
                    '</li>'
                );
                a.dropdownTemplate = t7.compile(a.params.dropdownTemplate ||
                    '<div class="autocomplete-dropdown">' +
                        '<div class="autocomplete-dropdown-inner">' +
                            '<div class="list-block">' +
                                '<ul></ul>' +
                            '</div>' +
                        '</div>' +
                        '{{#if preloader}}' +
                        '<div class="autocomplete-preloader preloader {{#if preloaderColor}}preloader-{{preloaderColor}}{{/if}}">{{#if material}}{{materialPreloaderHtml}}{{/if}}</div>' +
                        '{{/if}}' +
                    '</div>'
                );
            }
        
            // Define popup
            a.popup = undefined;
        
            // Define Dropdown
            a.dropdown = undefined;
        
            // Handle Input Value Change
            function handleInputValue (e) {
                var query = a.input.val();
                if (a.params.source) {
                    a.params.source(a, query, function (items) {
                        var itemsHTML = '';
                        var limit = a.params.limit ? Math.min(a.params.limit, items.length) : items.length;
                        a.items = items;
                        var i, j, regExp;
                        if (a.params.highlightMatches) {
                            query = query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
                            regExp = new RegExp('('+query+')', 'i');
                        }
        
                        for (i = 0; i < limit; i++) {
                            var itemValue = typeof items[i] === 'object' ? items[i][a.params.valueProperty] : items[i];
                            var itemText = typeof items[i] !== 'object' ? items[i] : items[i][a.params.textProperty];
                            itemsHTML += a.dropdownItemTemplate({
                                value: itemValue,
                                text: a.params.highlightMatches ? itemText.replace(regExp, '<b>$1</b>') : itemText
                            });
                        }
                        if (itemsHTML === '' && query === '' && a.params.dropdownPlaceholderText) {
                            itemsHTML += a.dropdownPlaceholderTemplate({
                                text: a.params.dropdownPlaceholderText,
                            });
                        }
                        a.dropdown.find('ul').html(itemsHTML);
                    });
                }
            }
            // Handle Drop Down Click
            function handleDropdownClick (e) {
                /*jshint validthis:true */
                var clicked = $(this);
                var clickedItem;
                for (var i = 0; i < a.items.length; i++) {
                    var itemValue = typeof a.items[i] === 'object' ? a.items[i][a.params.valueProperty] : a.items[i];
                    var value = clicked.attr('data-value');
                    if (itemValue === value || itemValue * 1 === value * 1) {
                        clickedItem = a.items[i];
                    }
                }
                if (a.params.updateInputValueOnSelect) {
                    a.input.val(typeof clickedItem === 'object' ? clickedItem[a.params.textProperty] : clickedItem);
                    a.input.trigger('input change');
                }
        
                if (a.params.onChange) {
                    a.params.onChange(a, clickedItem);
                }
        
                a.close();
            }
        
            // Handle HTML Click to close Dropdown
            function closeOnHTMLClick (e) {
                var target = $(e.target);
                if (!(target.is(a.input[0]) || a.dropdown && target.parents(a.dropdown[0]).length > 0)) {
                    a.close();
                }
            }
        
            a.positionDropDown = function () {
                var listBlock = a.input.parents('.list-block'),
                    pageContent = a.input.parents('.page-content'),
                    paddingTop = parseInt(pageContent.css('padding-top'), 10),
                    paddingBottom = parseInt(pageContent.css('padding-top'), 10),
                    // inputOffset = a.input.offset(),
                    listBlockOffsetLeft = listBlock.length > 0 ? listBlock.offset().left - listBlock.parent().offset().left : 0,
                    inputOffsetLeft = a.input.offset().left - (listBlock.length > 0 ? listBlock.offset().left : 0),
                    inputOffsetTop = a.input.offset().top - (pageContent.offset().top - pageContent[0].scrollTop),
                    maxHeight = pageContent[0].scrollHeight - paddingBottom - (inputOffsetTop + pageContent[0].scrollTop) - a.input[0].offsetHeight;
        
                a.dropdown.css({
                    left: (listBlock.length > 0 ? listBlockOffsetLeft : inputOffsetLeft) + 'px',
                    top: inputOffsetTop + pageContent[0].scrollTop + a.input[0].offsetHeight + 'px',
                    width: (listBlock.length > 0 ? listBlock[0].offsetWidth : a.input[0].offsetWidth) + 'px'
                });
                a.dropdown.children('.autocomplete-dropdown-inner').css({
                    maxHeight: maxHeight + 'px',
                    paddingLeft: listBlock.length > 0 && !a.params.expandInput ? inputOffsetLeft - (material ? 16 : 15) + 'px' : ''
                });
            };
        
            a.pageInit = function (e) {
                var page = e.detail.page;
                a.page = $(page.container);
                a.pageData = page;
                if (page.name !== pageName) {
                    return;
                }
                var container = $(page.container);
        
                // Source
                function onSource(query) {
                    if (!a.params.source) return;
                    var i, j, k;
        
                    a.params.source(a, query, function(items) {
                        var itemsHTML = '';
                        var limit = a.params.limit ? Math.min(a.params.limit, items.length) : items.length;
                        a.items = items;
                        for (i = 0; i < limit; i++) {
                            var selected = false;
                            var itemValue = typeof items[i] === 'object' ? items[i][a.params.valueProperty] : items[i];
                            for (j = 0; j < a.value.length; j++) {
                                var aValue = typeof a.value[j] === 'object' ? a.value[j][a.params.valueProperty] : a.value[j];
                                if (aValue === itemValue || aValue * 1 === itemValue * 1) selected = true;
                            }
                            itemsHTML += a.itemTemplate({
                                value: itemValue,
                                text: typeof items[i] !== 'object' ? items[i] : items[i][a.params.textProperty],
                                inputType: a.inputType,
                                id: a.id,
                                inputName: a.inputName,
                                selected: selected,
                                checkbox: a.inputType === 'checkbox',
                                material: material
                            });
                        }
                        container.find('.autocomplete-found ul').html(itemsHTML);
                        if (items.length === 0) {
                            if (query.length !== 0) {
                                container.find('.autocomplete-not-found').show();
                                container.find('.autocomplete-found, .autocomplete-values').hide();
                            }
                            else {
                                container.find('.autocomplete-values').show();
                                container.find('.autocomplete-found, .autocomplete-not-found').hide();
                            }
                        }
                        else {
                            container.find('.autocomplete-found').show();
                            container.find('.autocomplete-not-found, .autocomplete-values').hide();
                        }
                    });
                }
        
                // Init Search Bar
                var searchbar = app.searchbar(container.find('.searchbar'), {
                    customSearch: true,
                    onSearch: function (searchbar, data) {
                        if (data.query.length === 0 && searchbar.active) {
                            searchbar.overlay.addClass('searchbar-overlay-active');
                        }
                        else {
                            searchbar.overlay.removeClass('searchbar-overlay-active');
                        }
        
                        onSource(data.query);
                    }
                });
        
                // Save searchbar instance
                a.searchbar = searchbar;
        
                // Update values
                function updateValues() {
                    var valuesHTML = '';
                    var i;
                    for (i = 0; i < a.value.length; i++) {
        
                        valuesHTML += a.itemTemplate({
                            value: typeof a.value[i] === 'object' ? a.value[i][a.params.valueProperty] : a.value[i],
                            text: typeof a.value[i] === 'object' ? a.value[i][a.params.textProperty]: a.value[i],
                            inputType: a.inputType,
                            id: a.id,
                            inputName: a.inputName + '-checked',
                            checkbox: a.inputType === 'checkbox',
                            material: material,
                            selected: true
                        });
                    }
                    container.find('.autocomplete-values ul').html(valuesHTML);
                }
        
                // Handle Inputs
                if (!a.params.multiple && a.params.backOnSelect) {
                    container.once('click', '.list-block label', function () {
                        if (a.params.openIn === 'popup') app.closeModal(a.popup);
                        else view.router.back({animatePages: a.params.openWithAnimation});
                    });
                }
                container.on('change', 'input[type="radio"], input[type="checkbox"]', function () {
                    var i;
                    var input = this;
                    var value = input.value;
                    var text = $(input).parents('li').find('.item-title').text();
                    var isValues = $(input).parents('.autocomplete-values').length > 0;
                    var item, itemValue, aValue;
                    if (isValues) {
                        if (a.inputType === 'checkbox' && !input.checked) {
                            for (i = 0; i < a.value.length; i++) {
                                aValue = typeof a.value[i] === 'string' ? a.value[i] : a.value[i][a.params.valueProperty];
                                if (aValue === value || aValue * 1 === value * 1) {
                                    a.value.splice(i, 1);
                                }
                            }
                            updateValues();
                            if (a.params.onChange) a.params.onChange(a, a.value);
                        }
                        return;
                    }
        
                    // Find Related Item
                    for (i = 0; i < a.items.length; i++) {
                        itemValue = typeof a.items[i] === 'string' ? a.items[i] : a.items[i][a.params.valueProperty];
                        if (itemValue === value || itemValue * 1 === value * 1) item = a.items[i];
                    }
                    // Update Selected Value
                    if (a.inputType === 'radio') {
                        a.value = [item];
                    }
                    else {
                        if (input.checked) {
                            a.value.push(item);
                        }
                        else {
                            for (i = 0; i < a.value.length; i++) {
                                aValue = typeof a.value[i] === 'string' ? a.value[i] : a.value[i][a.params.valueProperty];
                                if (aValue === value || aValue * 1 === value * 1) {
                                    a.value.splice(i, 1);
                                }
                            }
                        }
                    }
        
                    // Update Values Block
                    updateValues();
        
                    // On Select Callback
                    if ((a.inputType === 'radio' && input.checked || a.inputType === 'checkbox') && a.params.onChange ) {
                        a.params.onChange(a, a.value);
                    }
                });
        
                // Update Values On Page Init
                updateValues();
        
                // Source on load
                if (a.params.requestSourceOnOpen) onSource('');
        
                // On Open Callback
                if (a.params.onOpen) a.params.onOpen(a);
            };
        
            // Show Hide Preloader
            a.showPreloader = function () {
                if (a.params.openIn === 'dropdown') {
                    if (a.dropdown) a.dropdown.find('.autocomplete-preloader').addClass('autocomplete-preloader-visible');
                }
                else $('.autocomplete-preloader').addClass('autocomplete-preloader-visible');
            };
        
            a.hidePreloader = function () {
                if (a.params.openIn === 'dropdown') {
                    if (a.dropdown) a.dropdown.find('.autocomplete-preloader').removeClass('autocomplete-preloader-visible');
                }
                else $('.autocomplete-preloader').removeClass('autocomplete-preloader-visible');
            };
        
            // Autofocus
            a.autoFocus = function (e) {
                var self = this;
                setTimeout(function () {
                    $(self).find('input[type=search]').focus();
                }, 0);
            };
        
            // Open Autocomplete Page/Popup
            a.open = function () {
                if (a.opened) return;
                a.opened = true;
                if (a.params.openIn === 'dropdown') {
                    if (!a.dropdown) {
                        a.dropdown = $(a.dropdownTemplate({
                            preloader: a.params.preloader,
                            preloaderColor: a.params.preloaderColor,
                            material: material,
                            materialPreloaderHtml: app.params.materialPreloaderHtml
                        }));
                        a.dropdown.on('click', 'label', handleDropdownClick);
        
                    }
                    var listBlock = a.input.parents('.list-block');
                    if (listBlock.length && a.input.parents('.item-content').length > 0 && a.params.expandInput) {
                        a.input.parents('.item-content').addClass('item-content-dropdown-expand');
                    }
                    a.positionDropDown();
                    a.input.parents('.page-content').append(a.dropdown);
                    a.dropdown.addClass('autocomplete-dropdown-in');
                    a.input.trigger('input');
                    app.onResize(a.positionDropDown);
                    if (a.params.onOpen) a.params.onOpen(a);
                }
                else {
                    $(document).once('page:init', '.autocomplete-page', a.pageInit);
                    if (a.params.openIn === 'popup') {
                        a.popup = app.popup(
                            '<div class="popup autocomplete-popup autocomplete-popup-' + a.inputName + '">' +
                                '<div class="view navbar-fixed">' +
                                    pageHTML +
                                '</div>' +
                            '</div>',
                            true,
                            a.params.openWithAnimation
                        );
                        a.popup = $(a.popup);
                        if (a.params.autoFocus) {
                            if (a.params.openWithAnimation) a.popup.once('popup:opened', a.autoFocus);
                            else a.autoFocus.bind(a.popup)();
                        }
                        a.popup.once('popup:closed', function () {
                            a.popup = undefined;
                            a.opened = false;
                            if (a.params.onClose) a.params.onClose(a);
                        });
                    }
                    else {
                        if (a.params.autoFocus) {
                            $(document).once(a.params.openWithAnimation ? 'page:afteranimation' : 'page:init', '.autocomplete-page', a.autoFocus);
                        }
                        view.router.load({
                            content: pageHTML,
                            animatePages: a.params.openWithAnimation
                        });
                        $(document).once('page:back', '.autocomplete-page', function () {
                            a.opened = false;
                            if (a.params.onClose) a.params.onClose(a);
                        });
                    }
                }
            };
            a.close = function (e) {
                if (!a.opened) return;
                if (a.params.openIn === 'dropdown') {
                    if (e && e.type === 'blur' && a.dropdown.find('label.active-state').length > 0) return;
                    a.dropdown.removeClass('autocomplete-dropdown-in').remove();
                    a.input.parents('.item-content-dropdown-expand').removeClass('item-content-dropdown-expand');
                    a.opened = false;
                    app.offResize(a.positionDropDown);
                    if (a.params.onClose) a.params.onClose(a);
                }
                if (a.params.openIn === 'popup') {
                    if (a.popup) app.closeModal(a.popup);
                }
            };
        
            // Init Events
            a.initEvents = function (detach) {
                var method = detach ? 'off' : 'on';
                if (a.params.openIn !== 'dropdown' && a.opener) {
                    a.opener[method]('click', a.open);
                }
                if (a.params.openIn === 'dropdown' && a.input) {
                    a.input[method]('focus', a.open);
                    a.input[method]('input', handleInputValue);
                    if (app.device.android) {
                        $('html')[method]('click', closeOnHTMLClick);
                    }
                    else {
                        a.input[method]('blur', a.close);
                    }
                }
                if (detach && a.dropdown) {
                    a.dropdown = null;
                }
            };
        
            // Init/Destroy Methods
            a.init = function () {
                a.initEvents();
            };
            a.destroy = function () {
                a.initEvents(true);
                a = null;
            };
        
            // Init
            a.init();
        
            return a;
        };
        app.autocomplete = function (params) {
            return new Autocomplete(params);
        };
        

        /*======================================================
        ************   Picker   ************
        ======================================================*/
        var Picker = function (params) {
            var p = this;
            var defaults = {
                updateValuesOnMomentum: false,
                updateValuesOnTouchmove: true,
                rotateEffect: false,
                momentumRatio: 7,
                freeMode: false,
                // Common settings
                closeByOutsideClick: true,
                scrollToInput: true,
                inputReadOnly: true,
                convertToPopover: true,
                onlyInPopover: false,
                toolbar: true,
                toolbarCloseText: 'Done',
                toolbarTemplate:
                    '<div class="toolbar">' +
                        '<div class="toolbar-inner">' +
                            '<div class="left"></div>' +
                            '<div class="right">' +
                                '<a href="#" class="link close-picker">{{closeText}}</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
            };
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            p.params = params;
            p.cols = [];
            p.initialized = false;
        
            // Inline flag
            p.inline = p.params.container ? true : false;
        
            // 3D Transforms origin bug, only on safari
            var originBug = app.device.ios || (navigator.userAgent.toLowerCase().indexOf('safari') >= 0 && navigator.userAgent.toLowerCase().indexOf('chrome') < 0) && !app.device.android;
        
            // Should be converted to popover
            function isPopover() {
                var toPopover = false;
                if (!p.params.convertToPopover && !p.params.onlyInPopover) return toPopover;
                if (!p.inline && p.params.input) {
                    if (p.params.onlyInPopover) toPopover = true;
                    else {
                        if (app.device.ios) {
                            toPopover = app.device.ipad ? true : false;
                        }
                        else {
                            if (app.width >= 768) toPopover = true;
                        }
                    }
                }
                return toPopover;
            }
            function inPopover() {
                if (p.opened && p.container && p.container.length > 0 && p.container.parents('.popover').length > 0) return true;
                else return false;
            }
        
            // Value
            p.setValue = function (arrValues, transition) {
                var valueIndex = 0;
                if (p.cols.length === 0) {
                    p.value = arrValues;
                    p.updateValue(arrValues);
                    return;
                }
                for (var i = 0; i < p.cols.length; i++) {
                    if (p.cols[i] && !p.cols[i].divider) {
                        p.cols[i].setValue(arrValues[valueIndex], transition);
                        valueIndex++;
                    }
                }
            };
            p.updateValue = function (forceValues) {
                var newValue = forceValues || [];
                var newDisplayValue = [], i, column;
                if (p.cols.length === 0) {
                    for (i = 0; i < p.params.cols.length; i++) {
                        column = p.params.cols[i];
                        if (column.displayValues !== undefined && column.values !== undefined && column.values.indexOf(newValue[i]) !== undefined) {
                            newDisplayValue.push(column.displayValues[column.values.indexOf(newValue[i])]);
                        }
                        else {
                            newDisplayValue.push(newValue[i]);
                        }
                    }
                }
                else {
                    for (i = 0; i < p.cols.length; i++) {
                        if (!p.cols[i].divider) {
                            newValue.push(p.cols[i].value);
                            newDisplayValue.push(p.cols[i].displayValue);
                        }
                    }
                }
        
                if (newValue.indexOf(undefined) >= 0) {
                    return;
                }
                p.value = newValue;
                p.displayValue = newDisplayValue;
                if (p.params.onChange) {
                    p.params.onChange(p, p.value, p.displayValue);
                }
                if (p.input && p.input.length > 0) {
                    $(p.input).val(p.params.formatValue ? p.params.formatValue(p, p.value, p.displayValue) : p.value.join(' '));
                    $(p.input).trigger('change');
                }
            };
        
            // Columns Handlers
            p.initPickerCol = function (colElement, updateItems) {
                var colContainer = $(colElement);
                var colIndex = colContainer.index();
                var col = p.cols[colIndex];
                if (col.divider) return;
                col.container = colContainer;
                col.wrapper = col.container.find('.picker-items-col-wrapper');
                col.items = col.wrapper.find('.picker-item');
        
                var i, j;
                var wrapperHeight, itemHeight, itemsHeight, minTranslate, maxTranslate;
                col.replaceValues = function (values, displayValues) {
                    col.destroyEvents();
                    col.values = values;
                    col.displayValues = displayValues;
                    var newItemsHTML = p.columnHTML(col, true);
                    col.wrapper.html(newItemsHTML);
                    col.items = col.wrapper.find('.picker-item');
                    col.calcSize();
                    col.setValue(col.values[0], 0, true);
                    col.initEvents();
                };
                var resizeTimeout;
                col.calcSize = function () {
                    if (p.params.rotateEffect) {
                        col.container.removeClass('picker-items-col-absolute');
                        if (!col.width) col.container.css({width:''});
                    }
                    var colWidth, colHeight;
                    colWidth = 0;
                    colHeight = col.container[0].offsetHeight;
                    wrapperHeight = col.wrapper[0].offsetHeight;
                    itemHeight = col.items[0].offsetHeight;
                    itemsHeight = itemHeight * col.items.length;
                    minTranslate = colHeight / 2 - itemsHeight + itemHeight / 2;
                    maxTranslate = colHeight / 2 - itemHeight / 2;
                    if (col.width) {
                        colWidth = col.width;
                        if (parseInt(colWidth, 10) === colWidth) colWidth = colWidth + 'px';
                        col.container.css({width: colWidth});
                    }
                    if (p.params.rotateEffect) {
                        if (!col.width) {
                            col.items.each(function () {
                                var item = $(this).children('span');
                                colWidth = Math.max(colWidth, item[0].offsetWidth);
                            });
                            col.container.css({width: (colWidth + 2) + 'px'});
                        }
                        col.container.addClass('picker-items-col-absolute');
                    }
                };
                col.calcSize();
        
                col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)').transition(0);
        
        
                var activeIndex = 0;
                var animationFrameId;
        
                // Set Value Function
                col.setValue = function (newValue, transition, valueCallbacks) {
                    if (typeof transition === 'undefined') transition = '';
                    var newActiveIndex = col.wrapper.find('.picker-item[data-picker-value="' + newValue + '"]').index();
                    if(typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
                        return;
                    }
                    var newTranslate = -newActiveIndex * itemHeight + maxTranslate;
                    // Update wrapper
                    col.wrapper.transition(transition);
                    col.wrapper.transform('translate3d(0,' + (newTranslate) + 'px,0)');
        
                    // Watch items
                    if (p.params.updateValuesOnMomentum && col.activeIndex && col.activeIndex !== newActiveIndex ) {
                        $.cancelAnimationFrame(animationFrameId);
                        col.wrapper.transitionEnd(function(){
                            $.cancelAnimationFrame(animationFrameId);
                        });
                        updateDuringScroll();
                    }
        
                    // Update items
                    col.updateItems(newActiveIndex, newTranslate, transition, valueCallbacks);
                };
        
                col.updateItems = function (activeIndex, translate, transition, valueCallbacks) {
                    if (typeof translate === 'undefined') {
                        translate = $.getTranslate(col.wrapper[0], 'y');
                    }
                    if(typeof activeIndex === 'undefined') activeIndex = -Math.round((translate - maxTranslate)/itemHeight);
                    if (activeIndex < 0) activeIndex = 0;
                    if (activeIndex >= col.items.length) activeIndex = col.items.length - 1;
                    var previousActiveIndex = col.activeIndex;
                    col.activeIndex = activeIndex;
                    col.wrapper.find('.picker-selected').removeClass('picker-selected');
        
                    col.items.transition(transition);
        
                    var selectedItem = col.items.eq(activeIndex).addClass('picker-selected').transform('');
        
                    // Set 3D rotate effect
                    if (p.params.rotateEffect) {
                        var percentage = (translate - (Math.floor((translate - maxTranslate)/itemHeight) * itemHeight + maxTranslate)) / itemHeight;
        
                        col.items.each(function () {
                            var item = $(this);
                            var itemOffsetTop = item.index() * itemHeight;
                            var translateOffset = maxTranslate - translate;
                            var itemOffset = itemOffsetTop - translateOffset;
                            var percentage = itemOffset / itemHeight;
        
                            var itemsFit = Math.ceil(col.height / itemHeight / 2) + 1;
        
                            var angle = (-18*percentage);
                            if (angle > 180) angle = 180;
                            if (angle < -180) angle = -180;
                            // Far class
                            if (Math.abs(percentage) > itemsFit) item.addClass('picker-item-far');
                            else item.removeClass('picker-item-far');
                            // Set transform
                            item.transform('translate3d(0, ' + (-translate + maxTranslate) + 'px, ' + (originBug ? -110 : 0) + 'px) rotateX(' + angle + 'deg)');
                        });
                    }
        
                    if (valueCallbacks || typeof valueCallbacks === 'undefined') {
                        // Update values
                        col.value = selectedItem.attr('data-picker-value');
                        col.displayValue = col.displayValues ? col.displayValues[activeIndex] : col.value;
                        // On change callback
                        if (previousActiveIndex !== activeIndex) {
                            if (col.onChange) {
                                col.onChange(p, col.value, col.displayValue);
                            }
                            p.updateValue();
                        }
                    }
                };
        
                function updateDuringScroll() {
                    animationFrameId = $.requestAnimationFrame(function () {
                        col.updateItems(undefined, undefined, 0);
                        updateDuringScroll();
                    });
                }
        
                // Update items on init
                if (updateItems) col.updateItems(0, maxTranslate, 0);
        
                var allowItemClick = true;
                var isTouched, isMoved, touchStartY, touchCurrentY, touchStartTime, touchEndTime, startTranslate, returnTo, currentTranslate, prevTranslate, velocityTranslate, velocityTime;
                function handleTouchStart (e) {
                    if (isMoved || isTouched) return;
                    e.preventDefault();
                    isTouched = true;
                    touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = (new Date()).getTime();
        
                    allowItemClick = true;
                    startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
                }
                function handleTouchMove (e) {
                    if (!isTouched) return;
                    e.preventDefault();
                    allowItemClick = false;
                    touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    if (!isMoved) {
                        // First move
                        $.cancelAnimationFrame(animationFrameId);
                        isMoved = true;
                        startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
                        col.wrapper.transition(0);
                    }
        
                    var diff = touchCurrentY - touchStartY;
                    currentTranslate = startTranslate + diff;
                    returnTo = undefined;
        
                    // Normalize translate
                    if (currentTranslate < minTranslate) {
                        currentTranslate = minTranslate - Math.pow(minTranslate - currentTranslate, 0.8);
                        returnTo = 'min';
                    }
                    if (currentTranslate > maxTranslate) {
                        currentTranslate = maxTranslate + Math.pow(currentTranslate - maxTranslate, 0.8);
                        returnTo = 'max';
                    }
                    // Transform wrapper
                    col.wrapper.transform('translate3d(0,' + currentTranslate + 'px,0)');
        
                    // Update items
                    col.updateItems(undefined, currentTranslate, 0, p.params.updateValuesOnTouchmove);
        
                    // Calc velocity
                    velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
                    velocityTime = (new Date()).getTime();
                    prevTranslate = currentTranslate;
                }
                function handleTouchEnd (e) {
                    if (!isTouched || !isMoved) {
                        isTouched = isMoved = false;
                        return;
                    }
                    isTouched = isMoved = false;
                    col.wrapper.transition('');
                    if (returnTo) {
                        if (returnTo === 'min') {
                            col.wrapper.transform('translate3d(0,' + minTranslate + 'px,0)');
                        }
                        else col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)');
                    }
                    touchEndTime = new Date().getTime();
                    var velocity, newTranslate;
                    if (touchEndTime - touchStartTime > 300) {
                        newTranslate = currentTranslate;
                    }
                    else {
                        velocity = Math.abs(velocityTranslate / (touchEndTime - velocityTime));
                        newTranslate = currentTranslate + velocityTranslate * p.params.momentumRatio;
                    }
        
                    newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);
        
                    // Active Index
                    var activeIndex = -Math.floor((newTranslate - maxTranslate)/itemHeight);
        
                    // Normalize translate
                    if (!p.params.freeMode) newTranslate = -activeIndex * itemHeight + maxTranslate;
        
                    // Transform wrapper
                    col.wrapper.transform('translate3d(0,' + (parseInt(newTranslate,10)) + 'px,0)');
        
                    // Update items
                    col.updateItems(activeIndex, newTranslate, '', true);
        
                    // Watch items
                    if (p.params.updateValuesOnMomentum) {
                        updateDuringScroll();
                        col.wrapper.transitionEnd(function(){
                            $.cancelAnimationFrame(animationFrameId);
                        });
                    }
        
                    // Allow click
                    setTimeout(function () {
                        allowItemClick = true;
                    }, 100);
                }
        
                function handleClick(e) {
                    if (!allowItemClick) return;
                    $.cancelAnimationFrame(animationFrameId);
                    /*jshint validthis:true */
                    var value = $(this).attr('data-picker-value');
                    col.setValue(value);
                }
        
                col.initEvents = function (detach) {
                    var method = detach ? 'off' : 'on';
                    var activeListener = app.support.passiveListener ? {passive: false, capture: false} : false;
                    col.container[method](app.touchEvents.start, handleTouchStart, activeListener);
                    col.container[method](app.touchEvents.move, handleTouchMove, activeListener);
                    col.container[method](app.touchEvents.end, handleTouchEnd, activeListener);
                    col.items[method]('click', handleClick);
                };
                col.destroyEvents = function () {
                    col.initEvents(true);
                };
        
                col.container[0].f7DestroyPickerCol = function () {
                    col.destroyEvents();
                };
        
                col.initEvents();
        
            };
            p.destroyPickerCol = function (colContainer) {
                colContainer = $(colContainer);
                if ('f7DestroyPickerCol' in colContainer[0]) colContainer[0].f7DestroyPickerCol();
            };
            // Resize cols
            function resizeCols() {
                if (!p.opened) return;
                for (var i = 0; i < p.cols.length; i++) {
                    if (!p.cols[i].divider) {
                        p.cols[i].calcSize();
                        p.cols[i].setValue(p.cols[i].value, 0, false);
                    }
                }
            }
            app.onResize(resizeCols);
        
            // HTML Layout
            p.columnHTML = function (col, onlyItems) {
                var columnItemsHTML = '';
                var columnHTML = '';
                if (col.divider) {
                    columnHTML += '<div class="picker-items-col picker-items-col-divider ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '">' + col.content + '</div>';
                }
                else {
                    for (var j = 0; j < col.values.length; j++) {
                        columnItemsHTML += '<div class="picker-item" data-picker-value="' + col.values[j] + '"><span>' + (col.displayValues ? col.displayValues[j] : col.values[j]) + '</span></div>';
                    }
                    columnHTML += '<div class="picker-items-col ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '"><div class="picker-items-col-wrapper">' + columnItemsHTML + '</div></div>';
                }
                return onlyItems ? columnItemsHTML : columnHTML;
            };
            p.layout = function () {
                var pickerHTML = '';
                var pickerClass = '';
                var i;
                p.cols = [];
                var colsHTML = '';
                for (i = 0; i < p.params.cols.length; i++) {
                    var col = p.params.cols[i];
                    colsHTML += p.columnHTML(p.params.cols[i]);
                    p.cols.push(col);
                }
                pickerClass = 'picker-modal picker-columns ' + (p.params.cssClass || '') + (p.params.rotateEffect ? ' picker-3d' : '');
                pickerHTML =
                    '<div class="' + (pickerClass) + '">' +
                        (p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '') +
                        '<div class="picker-modal-inner picker-items">' +
                            colsHTML +
                            '<div class="picker-center-highlight"></div>' +
                        '</div>' +
                    '</div>';
        
                p.pickerHTML = pickerHTML;
            };
        
            // Input Events
            function openOnInput(e) {
                e.preventDefault();
                if (p.opened) return;
                p.open();
                if (p.params.scrollToInput && !isPopover()) {
                    var pageContent = p.input.parents('.page-content');
                    if (pageContent.length === 0) return;
        
                    var paddingTop = parseInt(pageContent.css('padding-top'), 10),
                        paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
                        pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
                        pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
                        newPaddingBottom;
                    var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
                    if (inputTop > pageHeight) {
                        var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
                        if (scrollTop + pageHeight > pageScrollHeight) {
                            newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
                            if (pageHeight === pageScrollHeight) {
                                newPaddingBottom = p.container.height();
                            }
                            pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
                        }
                        pageContent.scrollTop(scrollTop, 300);
                    }
                }
            }
            function closeOnHTMLClick(e) {
                if (inPopover()) return;
                if (p.input && p.input.length > 0) {
                    if (e.target !== p.input[0] && $(e.target).parents('.picker-modal').length === 0) p.close();
                }
                else {
                    if ($(e.target).parents('.picker-modal').length === 0) p.close();
                }
            }
        
            if (p.params.input) {
                p.input = $(p.params.input);
                if (p.input.length > 0) {
                    if (p.params.inputReadOnly) p.input.prop('readOnly', true);
                    if (!p.inline) {
                        p.input.on('click', openOnInput);
                    }
                    if (p.params.inputReadOnly) {
                        p.input.on('focus mousedown', function (e) {
                            e.preventDefault();
                        });
                    }
                }
        
            }
        
            if (!p.inline && p.params.closeByOutsideClick) $('html').on('click', closeOnHTMLClick);
        
            // Open
            function onPickerClose() {
                p.opened = false;
                if (p.input && p.input.length > 0) {
                    p.input.parents('.page-content').css({'padding-bottom': ''});
                    if (app.params.material) p.input.trigger('blur');
                }
                if (p.params.onClose) p.params.onClose(p);
        
                // Destroy events
                p.container.find('.picker-items-col').each(function () {
                    p.destroyPickerCol(this);
                });
            }
        
            p.opened = false;
            p.open = function () {
                var toPopover = isPopover();
        
                if (!p.opened) {
        
                    // Layout
                    p.layout();
        
                    // Append
                    if (toPopover) {
                        p.pickerHTML = '<div class="popover popover-picker-columns"><div class="popover-inner">' + p.pickerHTML + '</div></div>';
                        p.popover = app.popover(p.pickerHTML, p.params.input, true);
                        p.container = $(p.popover).find('.picker-modal');
                        $(p.popover).on('popover:close', function () {
                            onPickerClose();
                        });
                    }
                    else if (p.inline) {
                        p.container = $(p.pickerHTML);
                        p.container.addClass('picker-modal-inline');
                        $(p.params.container).append(p.container);
                    }
                    else {
                        p.container = $(app.pickerModal(p.pickerHTML));
                        $(p.container)
                        .on('picker:close', function () {
                            onPickerClose();
                        });
                    }
        
                    // Store picker instance
                    p.container[0].f7Picker = p;
        
                    // Init Events
                    p.container.find('.picker-items-col').each(function () {
                        var updateItems = true;
                        if ((!p.initialized && p.params.value) || (p.initialized && p.value)) updateItems = false;
                        p.initPickerCol(this, updateItems);
                    });
        
                    // Set value
                    if (!p.initialized) {
                        if (p.value) p.setValue(p.value, 0);
                        else if (p.params.value) {
                            p.setValue(p.params.value, 0);
                        }
                    }
                    else {
                        if (p.value) p.setValue(p.value, 0);
                    }
        
                    // Material Focus
                    if (p.input && p.input.length > 0 && app.params.material) {
                        p.input.trigger('focus');
                    }
                }
        
                // Set flag
                p.opened = true;
                p.initialized = true;
        
                if (p.params.onOpen) p.params.onOpen(p);
            };
        
            // Close
            p.close = function () {
                if (!p.opened || p.inline) return;
                if (inPopover()) {
                    app.closeModal(p.popover);
                    return;
                }
                else {
                    app.closeModal(p.container);
                    return;
                }
            };
        
            // Destroy
            p.destroy = function () {
                p.close();
                if (p.params.input && p.input.length > 0) {
                    p.input.off('click focus', openOnInput);
                }
                $('html').off('click', closeOnHTMLClick);
                app.offResize(resizeCols);
            };
        
            if (p.inline) {
                p.open();
            }
            else {
                if (!p.initialized && p.params.value) p.setValue(p.params.value);
            }
        
            return p;
        };
        app.picker = function (params) {
            return new Picker(params);
        };
        

        /*======================================================
        ************   Calendar   ************
        ======================================================*/
        var Calendar = function (params) {
            var p = this;
            var defaults = {
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'],
                monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                firstDay: 1, // First day of the week, Monday
                weekendDays: [0, 6], // Sunday and Saturday
                multiple: false,
                rangePicker: false,
                dateFormat: 'yyyy-mm-dd',
                direction: 'horizontal', // or 'vertical'
                minDate: null,
                maxDate: null,
                disabled: null, // dates range of disabled days
                events: null, // dates range of days with events
                rangesClasses: null, //array with custom classes date ranges
                touchMove: true,
                animate: true,
                closeOnSelect: false,
                monthPicker: true,
                monthPickerTemplate:
                    '<div class="picker-calendar-month-picker">' +
                        '<a href="#" class="link icon-only picker-calendar-prev-month"><i class="icon icon-prev"></i></a>' +
                        '<span class="current-month-value"></span>' +
                        '<a href="#" class="link icon-only picker-calendar-next-month"><i class="icon icon-next"></i></a>' +
                    '</div>',
                yearPicker: true,
                yearPickerTemplate:
                    '<div class="picker-calendar-year-picker">' +
                        '<a href="#" class="link icon-only picker-calendar-prev-year"><i class="icon icon-prev"></i></a>' +
                        '<span class="current-year-value"></span>' +
                        '<a href="#" class="link icon-only picker-calendar-next-year"><i class="icon icon-next"></i></a>' +
                    '</div>',
                weekHeader: true,
                // Common settings
                closeByOutsideClick: true,
                scrollToInput: true,
                inputReadOnly: true,
                convertToPopover: true,
                onlyInPopover: false,
                toolbar: true,
                toolbarCloseText: 'Done',
                headerPlaceholder: 'Select date',
                header: app.params.material,
                footer: app.params.material,
                toolbarTemplate:
                    '<div class="toolbar">' +
                        '<div class="toolbar-inner">' +
                            '{{monthPicker}}' +
                            '{{yearPicker}}' +
                        '</div>' +
                    '</div>',
                headerTemplate:
                    '<div class="picker-header">' +
                        '<div class="picker-calendar-selected-date">{{placeholder}}</div>' +
                    '</div>',
                footerTemplate:
                    '<div class="picker-footer">' +
                        '<a href="#" class="button close-picker">{{closeText}}</a>' +
                    '</div>',
        
                /* Callbacks
                onMonthAdd
                onChange
                onOpen
                onClose
                onDayClick
                onMonthYearChangeStart
                onMonthYearChangeEnd
                */
            };
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            p.params = params;
            p.initialized = false;
        
            // Inline flag
            p.inline = p.params.container ? true : false;
        
            // Is horizontal
            p.isH = p.params.direction === 'horizontal';
        
            // RTL inverter
            var inverter = p.isH ? (app.rtl ? -1 : 1) : 1;
        
            // Animating flag
            p.animating = false;
        
            // Should be converted to popover
            function isPopover() {
                var toPopover = false;
                if (!p.params.convertToPopover && !p.params.onlyInPopover) return toPopover;
                if (!p.inline && p.params.input) {
                    if (p.params.onlyInPopover) toPopover = true;
                    else {
                        if (app.device.ios) {
                            toPopover = app.device.ipad ? true : false;
                        }
                        else {
                            if (app.width >= 768) toPopover = true;
                        }
                    }
                }
                return toPopover;
            }
            function inPopover() {
                if (p.opened && p.container && p.container.length > 0 && p.container.parents('.popover').length > 0) return true;
                else return false;
            }
        
            // Format date
            function formatDate(date) {
                date = new Date(date);
                var year = date.getFullYear();
                var month = date.getMonth();
                var month1 = month + 1;
                var day = date.getDate();
                var weekDay = date.getDay();
        
                return p.params.dateFormat
                    .replace(/yyyy/g, year)
                    .replace(/yy/g, (year + '').substring(2))
                    .replace(/mm/g, month1 < 10 ? '0' + month1 : month1)
                    .replace(/m(\W+)/g, month1 + '$1')
                    .replace(/MM/g, p.params.monthNames[month])
                    .replace(/M(\W+)/g, p.params.monthNamesShort[month] + '$1')
                    .replace(/dd/g, day < 10 ? '0' + day : day)
                    .replace(/d(\W+)/g, day + '$1')
                    .replace(/DD/g, p.params.dayNames[weekDay])
                    .replace(/D(\W+)/g, p.params.dayNamesShort[weekDay] + '$1');
            }
        
        
            // Value
            p.addValue = function (value) {
                if (p.params.multiple) {
                    if (!p.value) p.value = [];
                    var inValuesIndex;
                    for (var i = 0; i < p.value.length; i++) {
                        if (new Date(value).getTime() === new Date(p.value[i]).getTime()) {
                            inValuesIndex = i;
                        }
                    }
                    if (typeof inValuesIndex === 'undefined') {
                        p.value.push(value);
                    }
                    else {
                        p.value.splice(inValuesIndex, 1);
                    }
                    p.updateValue();
                }
                else if (p.params.rangePicker) {
                    if (!p.value) p.value = [];
                    if (p.value.length === 2 || p.value.length === 0) {
                        p.value = [];
                    }
                    if (p.value[0] !== value) p.value.push(value);
                    else p.value = [];
                    p.value.sort(function (a,b) {
                        return a - b;
                    });
                    p.updateValue();
                }
                else {
                    p.value = [value];
                    p.updateValue();
                }
            };
            p.setValue = function (arrValues) {
                p.value = arrValues;
                p.updateValue();
            };
            p.updateValue = function (onlyHeader) {
                var i, inputValue;
                if (p.container && p.container.length > 0) {
                    p.wrapper.find('.picker-calendar-day-selected').removeClass('picker-calendar-day-selected');
                    var valueDate;
                    if (p.params.rangePicker && p.value.length === 2) {
                        for (i = new Date(p.value[0]).getTime(); i <= new Date(p.value[1]).getTime(); i += 24*60*60*1000) {
                            valueDate = new Date(i);
                            p.wrapper.find('.picker-calendar-day[data-date="' + valueDate.getFullYear() + '-' + valueDate.getMonth() + '-' + valueDate.getDate() + '"]').addClass('picker-calendar-day-selected');
                        }
                    }
                    else {
                        for (i = 0; i < p.value.length; i++) {
                            valueDate = new Date(p.value[i]);
                            p.wrapper.find('.picker-calendar-day[data-date="' + valueDate.getFullYear() + '-' + valueDate.getMonth() + '-' + valueDate.getDate() + '"]').addClass('picker-calendar-day-selected');
                        }
                    }
                }
        
                if (p.params.onChange) {
                    p.params.onChange(p, p.value);
                }
                if ((p.input && p.input.length > 0) || (app.params.material && p.params.header)) {
                    if (p.params.formatValue) inputValue = p.params.formatValue(p, p.value);
                    else {
                        inputValue = [];
                        for (i = 0; i < p.value.length; i++) {
                            inputValue.push(formatDate(p.value[i]));
                        }
                        inputValue = inputValue.join(p.params.rangePicker ? ' - ' : ', ');
                    }
                    if (app.params.material && p.params.header && p.container && p.container.length > 0) {
                        p.container.find('.picker-calendar-selected-date').text(inputValue);
                    }
                    if (p.input && p.input.length > 0 && !onlyHeader) {
                        $(p.input).val(inputValue);
                        $(p.input).trigger('change');
                    }
        
                }
            };
        
            // Columns Handlers
            p.initCalendarEvents = function () {
                var col;
                var allowItemClick = true;
                var isTouched, isMoved, touchStartX, touchStartY, touchCurrentX, touchCurrentY, touchStartTime, touchEndTime, startTranslate, currentTranslate, wrapperWidth, wrapperHeight, percentage, touchesDiff, isScrolling;
                function handleTouchStart (e) {
                    if (isMoved || isTouched) return;
                    // e.preventDefault();
                    isTouched = true;
                    touchStartX = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                    touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = (new Date()).getTime();
                    percentage = 0;
                    allowItemClick = true;
                    isScrolling = undefined;
                    startTranslate = currentTranslate = p.monthsTranslate;
                }
                function handleTouchMove (e) {
                    if (!isTouched) return;
        
                    touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    if (typeof isScrolling === 'undefined') {
                        isScrolling = !!(isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX));
                    }
                    if (p.isH && isScrolling) {
                        isTouched = false;
                        return;
                    }
                    e.preventDefault();
                    if (p.animating) {
                        isTouched = false;
                        return;
                    }
                    allowItemClick = false;
                    if (!isMoved) {
                        // First move
                        isMoved = true;
                        wrapperWidth = p.wrapper[0].offsetWidth;
                        wrapperHeight = p.wrapper[0].offsetHeight;
                        p.wrapper.transition(0);
                    }
        
                    touchesDiff = p.isH ? touchCurrentX - touchStartX : touchCurrentY - touchStartY;
                    percentage = touchesDiff/(p.isH ? wrapperWidth : wrapperHeight);
                    currentTranslate = (p.monthsTranslate * inverter + percentage) * 100;
        
                    // Transform wrapper
                    p.wrapper.transform('translate3d(' + (p.isH ? currentTranslate : 0) + '%, ' + (p.isH ? 0 : currentTranslate) + '%, 0)');
        
                }
                function handleTouchEnd (e) {
                    if (!isTouched || !isMoved) {
                        isTouched = isMoved = false;
                        return;
                    }
                    isTouched = isMoved = false;
        
                    touchEndTime = new Date().getTime();
                    if (touchEndTime - touchStartTime < 300) {
                        if (Math.abs(touchesDiff) < 10) {
                            p.resetMonth();
                        }
                        else if (touchesDiff >= 10) {
                            if (app.rtl) p.nextMonth();
                            else p.prevMonth();
                        }
                        else {
                            if (app.rtl) p.prevMonth();
                            else p.nextMonth();
                        }
                    }
                    else {
                        if (percentage <= -0.5) {
                            if (app.rtl) p.prevMonth();
                            else p.nextMonth();
                        }
                        else if (percentage >= 0.5) {
                            if (app.rtl) p.nextMonth();
                            else p.prevMonth();
                        }
                        else {
                            p.resetMonth();
                        }
                    }
        
                    // Allow click
                    setTimeout(function () {
                        allowItemClick = true;
                    }, 100);
                }
        
                function handleDayClick(e) {
                    if (!allowItemClick) return;
                    var day = $(e.target).parents('.picker-calendar-day');
                    if (day.length === 0 && $(e.target).hasClass('picker-calendar-day')) {
                        day = $(e.target);
                    }
                    if (day.length === 0) return;
                    if (day.hasClass('picker-calendar-day-disabled')) return;
                    if (!p.params.rangePicker) {
                        if (day.hasClass('picker-calendar-day-next')) p.nextMonth();
                        if (day.hasClass('picker-calendar-day-prev')) p.prevMonth();
                    }
                    var dateYear = day.attr('data-year');
                    var dateMonth = day.attr('data-month');
                    var dateDay = day.attr('data-day');
                    if (p.params.onDayClick) {
                        p.params.onDayClick(p, day[0], dateYear, dateMonth, dateDay);
                    }
                    if (!day.hasClass('picker-calendar-day-selected') || p.params.multiple || p.params.rangePicker) {
                        p.addValue(new Date(dateYear, dateMonth, dateDay, 0, 0, 0));
                    }
                    if (p.params.closeOnSelect) {
                        if (p.params.rangePicker && p.value.length === 2 || !p.params.rangePicker) p.close();
                    }
                }
        
                p.container.find('.picker-calendar-prev-month').on('click', p.prevMonth);
                p.container.find('.picker-calendar-next-month').on('click', p.nextMonth);
                p.container.find('.picker-calendar-prev-year').on('click', p.prevYear);
                p.container.find('.picker-calendar-next-year').on('click', p.nextYear);
                p.wrapper.on('click', handleDayClick);
                var passiveListener = app.touchEvents.start === 'touchstart' && app.support.passiveListener ? {passive: true, capture: false} : false;
                var activeListener = app.support.passiveListener ? {passive: false, capture: false} : false;
                if (p.params.touchMove) {
                    p.wrapper.on(app.touchEvents.start, handleTouchStart, passiveListener);
                    p.wrapper.on(app.touchEvents.move, handleTouchMove, activeListener);
                    p.wrapper.on(app.touchEvents.end, handleTouchEnd, passiveListener);
                }
        
                p.container[0].f7DestroyCalendarEvents = function () {
                    p.container.find('.picker-calendar-prev-month').off('click', p.prevMonth);
                    p.container.find('.picker-calendar-next-month').off('click', p.nextMonth);
                    p.container.find('.picker-calendar-prev-year').off('click', p.prevYear);
                    p.container.find('.picker-calendar-next-year').off('click', p.nextYear);
                    p.wrapper.off('click', handleDayClick);
                    if (p.params.touchMove) {
                        p.wrapper.off(app.touchEvents.start, handleTouchStart, passiveListener);
                        p.wrapper.off(app.touchEvents.move, handleTouchMove, activeListener);
                        p.wrapper.off(app.touchEvents.end, handleTouchEnd, passiveListener);
                    }
                };
        
        
            };
            p.destroyCalendarEvents = function (colContainer) {
                if ('f7DestroyCalendarEvents' in p.container[0]) p.container[0].f7DestroyCalendarEvents();
            };
        
            // Scan Dates Range
            p.dateInRange = function (dayDate, range) {
                var match = false;
                var i;
                if (!range) return false;
                if (Array.isArray(range)) {
                    for (i = 0; i < range.length; i ++) {
                        if (range[i].from || range[i].to) {
                            if (range[i].from && range[i].to) {
                                if ((dayDate <= new Date(range[i].to).getTime()) && (dayDate >= new Date(range[i].from).getTime())) {
                                    match = true;
                                }
                            }
                            else if (range[i].from) {
                                if (dayDate >= new Date(range[i].from).getTime()) {
                                    match = true;
                                }
                            }
                            else if (range[i].to) {
                                if (dayDate <= new Date(range[i].to).getTime()) {
                                    match = true;
                                }
                            }
                        } else if (dayDate === new Date(range[i]).getTime()) {
                            match = true;
                        }
                    }
                }
                else if (range.from || range.to) {
                    if (range.from && range.to) {
                        if ((dayDate <= new Date(range.to).getTime()) && (dayDate >= new Date(range.from).getTime())) {
                            match = true;
                        }
                    }
                    else if (range.from) {
                        if (dayDate >= new Date(range.from).getTime()) {
                            match = true;
                        }
                    }
                    else if (range.to) {
                        if (dayDate <= new Date(range.to).getTime()) {
                            match = true;
                        }
                    }
                }
                else if (typeof range === 'function') {
                    match = range(new Date(dayDate));
                }
                return match;
            };
            // Calendar Methods
            p.daysInMonth = function (date) {
                var d = new Date(date);
                return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
            };
            p.monthHTML = function (date, offset) {
                date = new Date(date);
                var year = date.getFullYear(),
                    month = date.getMonth(),
                    day = date.getDate();
                if (offset === 'next') {
                    if (month === 11) date = new Date(year + 1, 0);
                    else date = new Date(year, month + 1, 1);
                }
                if (offset === 'prev') {
                    if (month === 0) date = new Date(year - 1, 11);
                    else date = new Date(year, month - 1, 1);
                }
                if (offset === 'next' || offset === 'prev') {
                    month = date.getMonth();
                    year = date.getFullYear();
                }
                var daysInPrevMonth = p.daysInMonth(new Date(date.getFullYear(), date.getMonth()).getTime() - 10 * 24 * 60 * 60 * 1000),
                    daysInMonth = p.daysInMonth(date),
                    firstDayOfMonthIndex = new Date(date.getFullYear(), date.getMonth()).getDay();
                if (firstDayOfMonthIndex === 0) firstDayOfMonthIndex = 7;
        
                var dayDate, currentValues = [], i, j, k,
                    rows = 6, cols = 7,
                    monthHTML = '',
                    dayIndex = 0 + (p.params.firstDay - 1),
                    today = new Date().setHours(0,0,0,0),
                    minDate = p.params.minDate ? new Date(p.params.minDate).getTime() : null,
                    maxDate = p.params.maxDate ? new Date(p.params.maxDate).getTime() : null,
                    disabled,
                    hasEvent;
        
                if (p.value && p.value.length) {
                    for (i = 0; i < p.value.length; i++) {
                        currentValues.push(new Date(p.value[i]).setHours(0,0,0,0));
                    }
                }
        
                for (i = 1; i <= rows; i++) {
                    var rowHTML = '';
                    var row = i;
                    for (j = 1; j <= cols; j++) {
                        var col = j;
                        dayIndex ++;
                        var dayNumber = dayIndex - firstDayOfMonthIndex;
                        var weekDayIndex = (col - 1 + p.params.firstDay > 6) ? (col - 1 - 7 + p.params.firstDay) : (col - 1 + p.params.firstDay);
                        var addClass = '';
                        if (dayNumber < 0) {
                            dayNumber = daysInPrevMonth + dayNumber + 1;
                            addClass += ' picker-calendar-day-prev';
                            dayDate = new Date(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, dayNumber).getTime();
                        }
                        else {
                            dayNumber = dayNumber + 1;
                            if (dayNumber > daysInMonth) {
                                dayNumber = dayNumber - daysInMonth;
                                addClass += ' picker-calendar-day-next';
                                dayDate = new Date(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, dayNumber).getTime();
                            }
                            else {
                                dayDate = new Date(year, month, dayNumber).getTime();
                            }
                        }
                        // Today
                        if (dayDate === today) addClass += ' picker-calendar-day-today';
                        // Selected
                        if (p.params.rangePicker && currentValues.length === 2) {
                            if (dayDate >= currentValues[0] && dayDate <= currentValues[1]) addClass += ' picker-calendar-day-selected';
                        }
                        else {
                            if (currentValues.indexOf(dayDate) >= 0) addClass += ' picker-calendar-day-selected';
                        }
                        // Weekend
                        if (p.params.weekendDays.indexOf(weekDayIndex) >= 0) {
                            addClass += ' picker-calendar-day-weekend';
                        }
                        // Has Events
                        hasEvent = false;
                        if (p.params.events) {
                            if (p.dateInRange(dayDate, p.params.events)) {
                                hasEvent = true;
                            }
                        }
                        if (hasEvent) {
                            addClass += ' picker-calendar-day-has-events';
                        }
                        // Custom Ranges
                        if (p.params.rangesClasses) {
                            for (k = 0; k < p.params.rangesClasses.length; k++) {
                                if (p.dateInRange(dayDate, p.params.rangesClasses[k].range)) {
                                    addClass += ' ' + p.params.rangesClasses[k].cssClass;
                                }
                            }
                        }
                        // Disabled
                        disabled = false;
                        if ((minDate && dayDate < minDate) || (maxDate && dayDate > maxDate)) {
                            disabled = true;
                        }
                        if (p.params.disabled) {
                            if (p.dateInRange(dayDate, p.params.disabled)) {
                                disabled = true;
                            }
                        }
                        if (disabled) {
                            addClass += ' picker-calendar-day-disabled';
                        }
        
        
                        dayDate = new Date(dayDate);
                        var dayYear = dayDate.getFullYear();
                        var dayMonth = dayDate.getMonth();
                        rowHTML += '<div data-year="' + dayYear + '" data-month="' + dayMonth + '" data-day="' + dayNumber + '" class="picker-calendar-day' + (addClass) + '" data-date="' + (dayYear + '-' + dayMonth + '-' + dayNumber) + '"><span>'+dayNumber+'</span></div>';
                    }
                    monthHTML += '<div class="picker-calendar-row">' + rowHTML + '</div>';
                }
                monthHTML = '<div class="picker-calendar-month" data-year="' + year + '" data-month="' + month + '">' + monthHTML + '</div>';
                return monthHTML;
            };
            p.animating = false;
            p.updateCurrentMonthYear = function (dir) {
                if (typeof dir === 'undefined') {
                    p.currentMonth = parseInt(p.months.eq(1).attr('data-month'), 10);
                    p.currentYear = parseInt(p.months.eq(1).attr('data-year'), 10);
                }
                else {
                    p.currentMonth = parseInt(p.months.eq(dir === 'next' ? (p.months.length - 1) : 0).attr('data-month'), 10);
                    p.currentYear = parseInt(p.months.eq(dir === 'next' ? (p.months.length - 1) : 0).attr('data-year'), 10);
                }
                p.container.find('.current-month-value').text(p.params.monthNames[p.currentMonth]);
                p.container.find('.current-year-value').text(p.currentYear);
        
            };
            p.onMonthChangeStart = function (dir) {
                p.updateCurrentMonthYear(dir);
                p.months.removeClass('picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next');
                var currentIndex = dir === 'next' ? p.months.length - 1 : 0;
        
                p.months.eq(currentIndex).addClass('picker-calendar-month-current');
                p.months.eq(dir === 'next' ? currentIndex - 1 : currentIndex + 1).addClass(dir === 'next' ? 'picker-calendar-month-prev' : 'picker-calendar-month-next');
        
                if (p.params.onMonthYearChangeStart) {
                    p.params.onMonthYearChangeStart(p, p.currentYear, p.currentMonth);
                }
            };
            p.onMonthChangeEnd = function (dir, rebuildBoth) {
                p.animating = false;
                var nextMonthHTML, prevMonthHTML, newMonthHTML;
                p.wrapper.find('.picker-calendar-month:not(.picker-calendar-month-prev):not(.picker-calendar-month-current):not(.picker-calendar-month-next)').remove();
        
                if (typeof dir === 'undefined') {
                    dir = 'next';
                    rebuildBoth = true;
                }
                if (!rebuildBoth) {
                    newMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), dir);
                }
                else {
                    p.wrapper.find('.picker-calendar-month-next, .picker-calendar-month-prev').remove();
                    prevMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), 'prev');
                    nextMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), 'next');
                }
                if (dir === 'next' || rebuildBoth) {
                    p.wrapper.append(newMonthHTML || nextMonthHTML);
                }
                if (dir === 'prev' || rebuildBoth) {
                    p.wrapper.prepend(newMonthHTML || prevMonthHTML);
                }
                p.months = p.wrapper.find('.picker-calendar-month');
                p.setMonthsTranslate(p.monthsTranslate);
                if (p.params.onMonthAdd) {
                    p.params.onMonthAdd(p, dir === 'next' ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]);
                }
                if (p.params.onMonthYearChangeEnd) {
                    p.params.onMonthYearChangeEnd(p, p.currentYear, p.currentMonth);
                }
            };
            p.setMonthsTranslate = function (translate) {
                translate = translate || p.monthsTranslate || 0;
                if (typeof p.monthsTranslate === 'undefined') p.monthsTranslate = translate;
                p.months.removeClass('picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next');
                var prevMonthTranslate = -(translate + 1) * 100 * inverter;
                var currentMonthTranslate = -translate * 100 * inverter;
                var nextMonthTranslate = -(translate - 1) * 100 * inverter;
                p.months.eq(0).transform('translate3d(' + (p.isH ? prevMonthTranslate : 0) + '%, ' + (p.isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
                p.months.eq(1).transform('translate3d(' + (p.isH ? currentMonthTranslate : 0) + '%, ' + (p.isH ? 0 : currentMonthTranslate) + '%, 0)').addClass('picker-calendar-month-current');
                p.months.eq(2).transform('translate3d(' + (p.isH ? nextMonthTranslate : 0) + '%, ' + (p.isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
            };
            p.nextMonth = function (transition) {
                if (typeof transition === 'undefined' || typeof transition === 'object') {
                    transition = '';
                    if (!p.params.animate) transition = 0;
                }
                var nextMonth = parseInt(p.months.eq(p.months.length - 1).attr('data-month'), 10);
                var nextYear = parseInt(p.months.eq(p.months.length - 1).attr('data-year'), 10);
                var nextDate = new Date(nextYear, nextMonth);
                var nextDateTime = nextDate.getTime();
                var transitionEndCallback = p.animating ? false : true;
                if (p.params.maxDate) {
                    if (nextDateTime > new Date(p.params.maxDate).getTime()) {
                        return p.resetMonth();
                    }
                }
                p.monthsTranslate --;
                if (nextMonth === p.currentMonth) {
                    var nextMonthTranslate = -(p.monthsTranslate) * 100 * inverter;
                    var nextMonthHTML = $(p.monthHTML(nextDateTime, 'next')).transform('translate3d(' + (p.isH ? nextMonthTranslate : 0) + '%, ' + (p.isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
                    p.wrapper.append(nextMonthHTML[0]);
                    p.months = p.wrapper.find('.picker-calendar-month');
                    if (p.params.onMonthAdd) {
                        p.params.onMonthAdd(p, p.months.eq(p.months.length - 1)[0]);
                    }
                }
                p.animating = true;
                p.onMonthChangeStart('next');
                var translate = (p.monthsTranslate * 100) * inverter;
        
                p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
                if (transitionEndCallback) {
                    p.wrapper.transitionEnd(function () {
                        p.onMonthChangeEnd('next');
                    });
                }
                if (!p.params.animate) {
                    p.onMonthChangeEnd('next');
                }
            };
            p.prevMonth = function (transition) {
                if (typeof transition === 'undefined' || typeof transition === 'object') {
                    transition = '';
                    if (!p.params.animate) transition = 0;
                }
                var prevMonth = parseInt(p.months.eq(0).attr('data-month'), 10);
                var prevYear = parseInt(p.months.eq(0).attr('data-year'), 10);
                var prevDate = new Date(prevYear, prevMonth + 1, -1);
                var prevDateTime = prevDate.getTime();
                var transitionEndCallback = p.animating ? false : true;
                if (p.params.minDate) {
                    if (prevDateTime < new Date(p.params.minDate).getTime()) {
                        return p.resetMonth();
                    }
                }
                p.monthsTranslate ++;
                if (prevMonth === p.currentMonth) {
                    var prevMonthTranslate = -(p.monthsTranslate) * 100 * inverter;
                    var prevMonthHTML = $(p.monthHTML(prevDateTime, 'prev')).transform('translate3d(' + (p.isH ? prevMonthTranslate : 0) + '%, ' + (p.isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
                    p.wrapper.prepend(prevMonthHTML[0]);
                    p.months = p.wrapper.find('.picker-calendar-month');
                    if (p.params.onMonthAdd) {
                        p.params.onMonthAdd(p, p.months.eq(0)[0]);
                    }
                }
                p.animating = true;
                p.onMonthChangeStart('prev');
                var translate = (p.monthsTranslate * 100) * inverter;
                p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
                if (transitionEndCallback) {
                    p.wrapper.transitionEnd(function () {
                        p.onMonthChangeEnd('prev');
                    });
                }
                if (!p.params.animate) {
                    p.onMonthChangeEnd('prev');
                }
            };
            p.resetMonth = function (transition) {
                if (typeof transition === 'undefined') transition = '';
                var translate = (p.monthsTranslate * 100) * inverter;
                p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
            };
            p.setYearMonth = function (year, month, transition) {
                if (typeof year === 'undefined') year = p.currentYear;
                if (typeof month === 'undefined') month = p.currentMonth;
                if (typeof transition === 'undefined' || typeof transition === 'object') {
                    transition = '';
                    if (!p.params.animate) transition = 0;
                }
                var targetDate;
                if (year < p.currentYear) {
                    targetDate = new Date(year, month + 1, -1).getTime();
                }
                else {
                    targetDate = new Date(year, month).getTime();
                }
                if (p.params.maxDate && targetDate > new Date(p.params.maxDate).getTime()) {
                    return false;
                }
                if (p.params.minDate && targetDate < new Date(p.params.minDate).getTime()) {
                    return false;
                }
                var currentDate = new Date(p.currentYear, p.currentMonth).getTime();
                var dir = targetDate > currentDate ? 'next' : 'prev';
                var newMonthHTML = p.monthHTML(new Date(year, month));
                p.monthsTranslate = p.monthsTranslate || 0;
                var prevTranslate = p.monthsTranslate;
                var monthTranslate, wrapperTranslate;
                var transitionEndCallback = p.animating ? false : true;
                if (targetDate > currentDate) {
                    // To next
                    p.monthsTranslate --;
                    if (!p.animating) p.months.eq(p.months.length - 1).remove();
                    p.wrapper.append(newMonthHTML);
                    p.months = p.wrapper.find('.picker-calendar-month');
                    monthTranslate = -(prevTranslate - 1) * 100 * inverter;
                    p.months.eq(p.months.length - 1).transform('translate3d(' + (p.isH ? monthTranslate : 0) + '%, ' + (p.isH ? 0 : monthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
                }
                else {
                    // To prev
                    p.monthsTranslate ++;
                    if (!p.animating) p.months.eq(0).remove();
                    p.wrapper.prepend(newMonthHTML);
                    p.months = p.wrapper.find('.picker-calendar-month');
                    monthTranslate = -(prevTranslate + 1) * 100 * inverter;
                    p.months.eq(0).transform('translate3d(' + (p.isH ? monthTranslate : 0) + '%, ' + (p.isH ? 0 : monthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
                }
                if (p.params.onMonthAdd) {
                    p.params.onMonthAdd(p, dir === 'next' ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]);
                }
                p.animating = true;
                p.onMonthChangeStart(dir);
                wrapperTranslate = (p.monthsTranslate * 100) * inverter;
                p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? wrapperTranslate : 0) + '%, ' + (p.isH ? 0 : wrapperTranslate) + '%, 0)');
                if (transitionEndCallback) {
                   p.wrapper.transitionEnd(function () {
                        p.onMonthChangeEnd(dir, true);
                    });
                }
                if (!p.params.animate) {
                    p.onMonthChangeEnd(dir);
                }
            };
            p.nextYear = function () {
                p.setYearMonth(p.currentYear + 1);
            };
            p.prevYear = function () {
                p.setYearMonth(p.currentYear - 1);
            };
        
        
            // HTML Layout
            p.layout = function () {
                var pickerHTML = '';
                var pickerClass = '';
                var i;
        
                var layoutDate = p.value && p.value.length ? p.value[0] : new Date().setHours(0,0,0,0);
                var prevMonthHTML = p.monthHTML(layoutDate, 'prev');
                var currentMonthHTML = p.monthHTML(layoutDate);
                var nextMonthHTML = p.monthHTML(layoutDate, 'next');
                var monthsHTML = '<div class="picker-calendar-months"><div class="picker-calendar-months-wrapper">' + (prevMonthHTML + currentMonthHTML + nextMonthHTML) + '</div></div>';
                // Week days header
                var weekHeaderHTML = '';
                if (p.params.weekHeader) {
                    for (i = 0; i < 7; i++) {
                        var weekDayIndex = (i + p.params.firstDay > 6) ? (i - 7 + p.params.firstDay) : (i + p.params.firstDay);
                        var dayName = p.params.dayNamesShort[weekDayIndex];
                        weekHeaderHTML += '<div class="picker-calendar-week-day ' + ((p.params.weekendDays.indexOf(weekDayIndex) >= 0) ? 'picker-calendar-week-day-weekend' : '') + '"> ' + dayName + '</div>';
        
                    }
                    weekHeaderHTML = '<div class="picker-calendar-week-days">' + weekHeaderHTML + '</div>';
                }
                pickerClass = 'picker-modal picker-calendar' +
                            (p.params.rangePicker ? ' picker-calendar-range' : '') +
                            (p.params.cssClass ? ' ' + p.params.cssClass : '');
                var toolbarHTML = p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '';
                if (p.params.toolbar) {
                    toolbarHTML = p.params.toolbarTemplate
                        .replace(/{{closeText}}/g, p.params.toolbarCloseText)
                        .replace(/{{monthPicker}}/g, (p.params.monthPicker ? p.params.monthPickerTemplate : ''))
                        .replace(/{{yearPicker}}/g, (p.params.yearPicker ? p.params.yearPickerTemplate : ''));
                }
                var headerHTML = p.params.header ? p.params.headerTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText).replace(/{{placeholder}}/g, p.params.headerPlaceholder) : '';
                var footerHTML = p.params.footer ? p.params.footerTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '';
        
                pickerHTML =
                    '<div class="' + (pickerClass) + '">' +
                        headerHTML +
                        footerHTML +
                        toolbarHTML +
                        '<div class="picker-modal-inner">' +
                            weekHeaderHTML +
                            monthsHTML +
                        '</div>' +
                    '</div>';
        
        
                p.pickerHTML = pickerHTML;
            };
        
            // Input Events
            function openOnInput(e) {
                e.preventDefault();
                if (p.opened) return;
                p.open();
                if (p.params.scrollToInput && !isPopover() && !app.params.material) {
                    var pageContent = p.input.parents('.page-content');
                    if (pageContent.length === 0) return;
        
                    var paddingTop = parseInt(pageContent.css('padding-top'), 10),
                        paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
                        pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
                        pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
                        newPaddingBottom;
        
                    var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
                    if (inputTop > pageHeight) {
                        var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
                        if (scrollTop + pageHeight > pageScrollHeight) {
                            newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
                            if (pageHeight === pageScrollHeight) {
                                newPaddingBottom = p.container.height();
                            }
                            pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
                        }
                        pageContent.scrollTop(scrollTop, 300);
                    }
                }
            }
            function closeOnHTMLClick(e) {
                if (inPopover()) return;
                if (p.input && p.input.length > 0) {
                    if (e.target !== p.input[0] && $(e.target).parents('.picker-modal').length === 0) p.close();
                }
                else {
                    if ($(e.target).parents('.picker-modal').length === 0) p.close();
                }
            }
        
            if (p.params.input) {
                p.input = $(p.params.input);
                if (p.input.length > 0) {
                    if (p.params.inputReadOnly) p.input.prop('readOnly', true);
                    if (!p.inline) {
                        p.input.on('click', openOnInput);
                    }
                    if (p.params.inputReadOnly) {
                        p.input.on('focus mousedown', function (e) {
                            e.preventDefault();
                        });
                    }
                }
        
            }
        
            if (!p.inline && p.params.closeByOutsideClick) $('html').on('click', closeOnHTMLClick);
        
            // Open
            function onPickerClose() {
                p.opened = false;
                if (p.input && p.input.length > 0) {
                    p.input.parents('.page-content').css({'padding-bottom': ''});
                    if (app.params.material) p.input.trigger('blur');
                }
                if (p.params.onClose) p.params.onClose(p);
        
                // Destroy events
                p.destroyCalendarEvents();
            }
        
            p.opened = false;
            p.open = function () {
                var toPopover = isPopover();
                var updateValue = false;
                if (!p.opened) {
                    // Set date value
                    if (!p.value) {
                        if (p.params.value) {
                            p.value = p.params.value;
                            updateValue = true;
                        }
                    }
        
                    // Layout
                    p.layout();
        
                    // Append
                    if (toPopover) {
                        p.pickerHTML = '<div class="popover popover-picker-calendar"><div class="popover-inner">' + p.pickerHTML + '</div></div>';
                        p.popover = app.popover(p.pickerHTML, p.params.input, true);
                        p.container = $(p.popover).find('.picker-modal');
                        $(p.popover).on('popover:close', function () {
                            onPickerClose();
                        });
                    }
                    else if (p.inline) {
                        p.container = $(p.pickerHTML);
                        p.container.addClass('picker-modal-inline');
                        $(p.params.container).append(p.container);
                    }
                    else {
                        p.container = $(app.pickerModal(p.pickerHTML));
                        $(p.container)
                        .on('picker:close', function () {
                            onPickerClose();
                        });
                    }
        
                    // Store calendar instance
                    p.container[0].f7Calendar = p;
                    p.wrapper = p.container.find('.picker-calendar-months-wrapper');
        
                    // Months
                    p.months = p.wrapper.find('.picker-calendar-month');
        
                    // Update current month and year
                    p.updateCurrentMonthYear();
        
                    // Set initial translate
                    p.monthsTranslate = 0;
                    p.setMonthsTranslate();
        
                    // Init events
                    p.initCalendarEvents();
        
                    // Update input value
                    if (updateValue) p.updateValue();
                    else if (app.params.material && p.value) p.updateValue(true);
        
                    // Material Focus
                    if (p.input && p.input.length > 0 && app.params.material) {
                        p.input.trigger('focus');
                    }
        
                }
        
                // Set flag
                p.opened = true;
                p.initialized = true;
                if (p.params.onMonthAdd) {
                    p.months.each(function () {
                        p.params.onMonthAdd(p, this);
                    });
                }
                if (p.params.onOpen) p.params.onOpen(p);
            };
        
            // Close
            p.close = function () {
                if (!p.opened || p.inline) return;
                if (inPopover()) {
                    app.closeModal(p.popover);
                    return;
                }
                else {
                    app.closeModal(p.container);
                    return;
                }
            };
        
            // Destroy
            p.destroy = function () {
                p.close();
                if (p.params.input && p.input.length > 0) {
                    p.input.off('click focus', openOnInput);
                }
                $('html').off('click', closeOnHTMLClick);
            };
        
            if (p.inline) {
                p.open();
            }
            else {
                if (!p.initialized && p.params.value) p.setValue(p.params.value);
            }
        
            return p;
        };
        app.calendar = function (params) {
            return new Calendar(params);
        };
        

        /*======================================================
        ************   Notifications   ************
        ======================================================*/
        var _tempNotificationElement;
        app.addNotification = function (params) {
            if (!params) return;
            
            if (typeof params.media === 'undefined') params.media = app.params.notificationMedia;
            if (typeof params.title === 'undefined') params.title = app.params.notificationTitle;
            if (typeof params.subtitle === 'undefined') params.subtitle = app.params.notificationSubtitle;
            if (typeof params.closeIcon === 'undefined') params.closeIcon = app.params.notificationCloseIcon;
            if (typeof params.hold === 'undefined') params.hold = app.params.notificationHold;
            if (typeof params.closeOnClick === 'undefined') params.closeOnClick = app.params.notificationCloseOnClick;
            if (typeof params.button === 'undefined') params.button = app.params.notificationCloseButtonText && {
                text: app.params.notificationCloseButtonText,
                close: true
            };
        
            if (!_tempNotificationElement) _tempNotificationElement = document.createElement('div');
        
            params.material = app.params.material;
        
            var container = $('.notifications');
            if (container.length === 0) {
                app.root.append('<div class="notifications list-block' + (params.material ? '' : ' media-list') + '"><ul></ul></div>');
                container = $('.notifications');
            }
            var list = container.children('ul');
            
            var notificationTemplate = app.params.notificationTemplate || 
                '{{#if custom}}' +
                '<li>{{custom}}</li>' +
                '{{else}}' +
                '<li class="notification-item notification-hidden">' +
                    '<div class="item-content">' +
                        '{{#if material}}' +
                            '<div class="item-inner">' +
                                '<div class="item-title">{{js "this.message || this.title || this.subtitle"}}</div>' +
                                '{{#if ../button}}{{#button}}' +
                                '<div class="item-after">' +
                                    '<a href="#" class="button {{#if color}}color-{{color}}{{/if}} {{#js_compare "this.close !== false"}}close-notification{{/js_compare}}">{{text}}</a>' +
                                '</div>' +
                                '{{/button}}{{/if}}' +
                            '</div>' +
                        '{{else}}' +
                            '{{#if media}}' +
                            '<div class="item-media">{{media}}</div>' +
                            '{{/if}}' +
                            '<div class="item-inner">' +
                                '<div class="item-title-row">' +
                                    '{{#if title}}' +
                                    '<div class="item-title">{{title}}</div>' +
                                    '{{/if}}' +
                                    '{{#if closeIcon}}' +
                                    '<div class="item-after"><a href="#" class="close-notification"><span></span></a></div>' +
                                    '{{/if}}' +
                                '</div>' +
                                '{{#if subtitle}}' +
                                '<div class="item-subtitle">{{subtitle}}</div>' +
                                '{{/if}}' +
                                '{{#if message}}' +
                                '<div class="item-text">{{message}}</div>' +
                                '</div>' +
                            '{{/if}}' +
                        '{{/if}}' +
                    '</div>' +
                '</li>' +
                '{{/if}}';
            if (!app._compiledTemplates.notification) {
                app._compiledTemplates.notification = t7.compile(notificationTemplate);
            }
            _tempNotificationElement.innerHTML = app._compiledTemplates.notification(params);
        
            var item = $(_tempNotificationElement).children();
        
            item.on('click', function (e) {
                var close = false;
                var target = $(e.target);
                if (params.material && target.hasClass('button')) {
                    if (params.button && params.button.onClick) params.button.onClick.call(target[0], e, item[0]);
                }
                if (target.is('.close-notification') || $(e.target).parents('.close-notification').length > 0) {
                    close = true;
                }
                else {
                    if (params.onClick) params.onClick(e, item[0]);
                    if (params.closeOnClick) close = true;
                }
                if (close) app.closeNotification(item[0], e);
            });
            if (params.onClose) {
                item.data('f7NotificationOnClose', function (e) {
                    params.onClose(item[0], e);
                });
            }
            if (params.additionalClass) {
                item.addClass(params.additionalClass);
            }
            if (params.hold) {
                setTimeout(function () {
                    if (item.length > 0) app.closeNotification(item[0]);
                }, params.hold);
            }
        
            if (!app.params.material) {
                app.closeNotification(list.children('li.notification-item:last-child'));
            }
            list.append(item[0]);
            container.show();
        
            var itemHeight = item.outerHeight(), clientLeft;
            if (params.material) {
                container.transform('translate3d(0, '+itemHeight+'px, 0)');
                container.transition(0);
        
                clientLeft = item[0].clientLeft;
        
                container.transform('translate3d(0, 0, 0)');
                container.transition('');
            }
            else {
                item.transform('translate3d(0,' + (-itemHeight) + 'px,0)');
                item.transition(0);
        
                clientLeft = item[0].clientLeft;
        
                item.transition('');
                item.transform('translate3d(0,0px,0)');
            }
        
            container.transform('translate3d(0, 0,0)');
            item.removeClass('notification-hidden');
        
            return item[0];
        };
        app.closeNotification = function (item, event) {
            item = $(item);
            if (item.length === 0) return;
            if (item.hasClass('notification-item-removing')) return;
            var container = $('.notifications');
        
            var itemHeight = item.outerHeight();
            item.css('height', itemHeight + 'px').transition(0).addClass('notification-item-removing');
            var clientLeft = item[0].clientLeft;
        
            item.css({
                height: '0px',
                marginBottom: '0px'
            }).transition('');
        
            if (item.data('f7NotificationOnClose')) item.data('f7NotificationOnClose')(event);
        
            if (container.find('.notification-item:not(.notification-item-removing)').length === 0) {
                container.transform('');
            }
        
            item.addClass('notification-hidden').transitionEnd(function () {
                item.remove();
                if (container.find('.notification-item').length === 0) {
                    container.hide();
                }
            });
        };

        /*===============================================================================
        ************   Data Table   ************
        ===============================================================================*/
        app.initDataTable = function (table) {
            table = $(table);
            var tableHeader = table.find('.data-table-header');
            var tableHeaderSelected = table.find('.data-table-header-selected');
        
            // Handle selected
            function checkSelectedHeader() {
                if (tableHeader.length > 0 && tableHeaderSelected.length > 0) {
                    var checkedItems = table.find('tbody .checkbox-cell input:checked').length;
                    table[checkedItems > 0 ? 'addClass' : 'removeClass']('data-table-has-checked');
                    tableHeaderSelected.find('.data-table-selected-count').text(checkedItems);
                }
            }
            table.on('change', '.checkbox-cell input[type="checkbox"]', function (e) {
                if (e.detail && e.detail._sentByF7DataTable) {
                    // Scripted event, don't do anything
                    return;
                }
                var input = $(this);
                var checked = input[0].checked;
                if (input.parents('thead').length > 0) {
                    table
                        .find('tbody tr')[checked ? 'addClass': 'removeClass']('data-table-row-selected')
                        .find('input').prop('checked', checked).trigger('change', {_sentByF7DataTable: true});
                }
                else {
                    input.parents('tr')[checked ? 'addClass': 'removeClass']('data-table-row-selected');
                    if (!checked) {
                        table.find('thead .checkbox-cell input[type="checkbox"]').prop('checked', false);
                    }
                    else {
                        // Check for all checked
                        if (table.find('tbody .checkbox-cell input[type="checkbox"]:checked').length === table.find('tbody tr').length) {
                            table.find('thead .checkbox-cell input[type="checkbox"]').prop('checked', true).trigger('change', {_sentByF7DataTable: true});
                        }
                    }
                }
                checkSelectedHeader();
            });
            checkSelectedHeader();
        
            // Sortable
            table.find('thead .sortable-cell').on('click', function () {
                var cell = $(this);
                var isActive = cell.hasClass('sortable-active');
                var currentSort;
                if (isActive) {
                    currentSort = cell.hasClass('sortable-desc') ? 'desc' : 'asc';
                    cell.removeClass('sortable-desc sortable-asc').addClass('sortable-' + (currentSort === 'desc' ? 'asc' : 'desc'));
                }
                else {
                    table.find('thead .sortable-active').removeClass('sortable-active');
                    cell.addClass('sortable-active');
                }
            });
        
            // Collapsible
            if (table.hasClass('data-table-collapsible')) {
                table.find('tbody td:not(.checkbox-cell)').each(function () {
                    var index = $(this).index();
                    var collpsibleTitle = $(this).attr('data-collapsible-title');
                    if (!collpsibleTitle && collpsibleTitle !== '') {
                        $(this).attr('data-collapsible-title', table.find('thead th').eq(index).text());
                    }
                });
            }
        };
        app.initPageDataTables = function (pageContainer) {
            pageContainer = $(pageContainer);
            var dataTables = pageContainer.find('.data-table-init');
            if (dataTables.length === 0 && pageContainer.hasClass('data-table-init')) {
                dataTables = pageContainer;
            }
            dataTables.each(function () {
                app.initDataTable(this);
            });
        };
        

        /*===========================
        Compile Template7 Templates On App Init
        ===========================*/
        app.initTemplate7Templates = function () {
            if (!window.Template7) return;
            Template7.templates = Template7.templates || app.params.templates || {};
            Template7.data = Template7.data || app.params.template7Data || {};
            Template7.cache = Template7.cache || {};
        
            app.templates = Template7.templates;
            app.template7Data = Template7.data;
            app.template7Cache = Template7.cache;
        
            // Precompile templates on app init
            if (!app.params.precompileTemplates) return;
            $('script[type="text/template7"]').each(function () {
                var id = $(this).attr('id');
                if (!id) return;
                Template7.templates[id] = Template7.compile($(this).html());
            });
        };
        

        /*=======================================
        ************   Plugins API   ************
        =======================================*/
        var _plugins = [];
        app.initPlugins = function () {
            // Initialize plugins
            for (var plugin in app.plugins) {
                var p = app.plugins[plugin](app, app.params[plugin]);
                if (p) _plugins.push(p);
            }
        };
        // Plugin Hooks
        app.pluginHook = function (hook) {
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].hooks && hook in _plugins[i].hooks) {
                    _plugins[i].hooks[hook](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };
        // Prevented by plugin
        app.pluginPrevent = function (action) {
            var prevent = false;
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].prevents && action in _plugins[i].prevents) {
                    if (_plugins[i].prevents[action](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])) prevent = true;
                }
            }
            return prevent;
        };
        // Preprocess content by plugin
        app.pluginProcess = function (process, data) {
            var processed = data;
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].preprocess && process in _plugins[i].preprocess) {
                    processed = _plugins[i].preprocess[process](data, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
                }
            }
            return processed;
        };
        
        

        /*======================================================
        ************   App Init   ************
        ======================================================*/
        app.init = function () {
            // Compile Template7 templates on app load
            if (app.initTemplate7Templates) app.initTemplate7Templates();
        
            // Init Plugins
            if (app.initPlugins) app.initPlugins();
        
            // Init Device
            if (app.getDeviceInfo) app.getDeviceInfo();
        
            // Init resize events and calc app sizes
            if (app.initResize) app.initResize();
        
            // Init Panels Breakpoints
            if (app.initPanelsBreakpoints && (app.params.panelLeftBreakpoint || app.params.panelRightBreakpoint)) app.initPanelsBreakpoints();
        
            // Init Click events
            if (app.initFastClicks && app.params.fastClicks) app.initFastClicks();
            if (app.initClickEvents) app.initClickEvents();
        
            // Init each page callbacks
            $('.page:not(.cached)').each(function () {
                app.initPageWithCallback(this);
            });
        
            // Init each navbar callbacks
            $('.navbar:not(.cached)').each(function () {
                app.initNavbarWithCallback(this);
            });
        
            // Init push state
            if (app.initPushState && app.params.pushState) app.initPushState();
        
            // Init Live Swipeouts events
            if (app.initSwipeout && app.params.swipeout) app.initSwipeout();
        
            // Init Live Sortable events
            if (app.initSortable && app.params.sortable) app.initSortable();
        
            // Init Live Swipe Panels
            if (app.initSwipePanels && (app.params.swipePanel || app.params.swipePanelOnlyClose)) app.initSwipePanels();
        
            // Init Material Inputs
            if (app.params.material && app.initMaterialWatchInputs) app.initMaterialWatchInputs();
        
            // Init Material Tabbar
            if (app.params.material) {
                $('.tabbar').each(function (index, el) {
                    if ($(el).parents('.page').length === 0) {
                        app.initMaterialTabbar(el);
                    }
                });
            }
        
            // App Init callback
            if (app.params.onAppInit) app.params.onAppInit();
        
            // Plugin app init hook
            app.pluginHook('appInit');
        };
        if (app.params.init) app.init();
        

        //Return instance        
        return app;
    };
    

    /*===========================
    Dom7 Library
    ===========================*/
    var Dom7 = (function () {
        var Dom7 = function (arr) {
            var _this = this, i = 0;
            // Create array-like object
            for (i = 0; i < arr.length; i++) {
                _this[i] = arr[i];
            }
            _this.length = arr.length;
            // Return collection with methods
            return this;
        };
        var $ = function (selector, context) {
            var arr = [], i = 0;
            if (selector && !context) {
                if (selector instanceof Dom7) {
                    return selector;
                }
            }
            if (selector) {
                // String
                if (typeof selector === 'string') {
                    var els, tempParent, html;
                    selector = html = selector.trim();
                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                        var toCreate = 'div';
                        if (html.indexOf('<li') === 0) toCreate = 'ul';
                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
                        if (html.indexOf('<option') === 0) toCreate = 'select';
                        tempParent = document.createElement(toCreate);
                        tempParent.innerHTML = html;
                        for (i = 0; i < tempParent.childNodes.length; i++) {
                            arr.push(tempParent.childNodes[i]);
                        }
                    }
                    else {
                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                            // Pure ID selector
                            els = [document.getElementById(selector.split('#')[1])];
                        }
                        else {
                            // Other selectors
                            els = (context || document).querySelectorAll(selector);
                        }
                        for (i = 0; i < els.length; i++) {
                            if (els[i]) arr.push(els[i]);
                        }
                    }
                }
                // Node/element
                else if (selector.nodeType || selector === window || selector === document) {
                    arr.push(selector);
                }
                //Array of elements or instance of Dom
                else if (selector.length > 0 && selector[0].nodeType) {
                    for (i = 0; i < selector.length; i++) {
                        arr.push(selector[i]);
                    }
                }
            }
            return new Dom7(arr);
        };

        Dom7.prototype = {
            // Classes and attributes
            addClass: function (className) {
                if (typeof className === 'undefined') {
                    return this;
                }
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof this[j].classList !== 'undefined') this[j].classList.add(classes[i]);
                    }
                }
                return this;
            },
            removeClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof this[j].classList !== 'undefined') this[j].classList.remove(classes[i]);
                    }
                }
                return this;
            },
            hasClass: function (className) {
                if (!this[0]) return false;
                else return this[0].classList.contains(className);
            },
            toggleClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof this[j].classList !== 'undefined') this[j].classList.toggle(classes[i]);
                    }
                }
                return this;
            },
            attr: function (attrs, value) {
                if (arguments.length === 1 && typeof attrs === 'string') {
                    // Get attr
                    if (this[0]) return this[0].getAttribute(attrs);
                    else return undefined;
                }
                else {
                    // Set attrs
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i].setAttribute(attrs, value);
                        }
                        else {
                            // Object
                            for (var attrName in attrs) {
                                this[i][attrName] = attrs[attrName];
                                this[i].setAttribute(attrName, attrs[attrName]);
                            }
                        }
                    }
                    return this;
                }
            },
            removeAttr: function (attr) {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attr);
                }
                return this;
            },
            prop: function (props, value) {
                if (arguments.length === 1 && typeof props === 'string') {
                    // Get prop
                    if (this[0]) return this[0][props];
                }
                else {
                    // Set props
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i][props] = value;
                        }
                        else {
                            // Object
                            for (var propName in props) {
                                this[i][propName] = props[propName];
                            }
                        }
                    }
                    return this;
                }
            },
            data: function (key, value) {
                var el;
                if (typeof value === 'undefined') {
                    el = this[0];
                    // Get value
                    if (el) {
                        if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
                            return el.dom7ElementDataStorage[key];
                        }
                        else {
                            var dataKey = el.getAttribute('data-' + key);
                            if (dataKey) {
                                return dataKey;
                            }
                            else return undefined;
                        }
                    }
                    else return undefined;
                }
                else {
                    // Set value
                    for (var i = 0; i < this.length; i++) {
                        el = this[i];
                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                        el.dom7ElementDataStorage[key] = value;
                    }
                    return this;
                }
            },
            removeData: function(key) {
                for (var i = 0; i < this.length; i++) {
                    var el = this[i];
                    if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
                        el.dom7ElementDataStorage[key] = null;
                        delete el.dom7ElementDataStorage[key];
                    }
                }
            },
            dataset: function () {
                var el = this[0];
                if (el) {
                    var dataset = {};
                    if (el.dataset) {
                        for (var dataKey in el.dataset) {
                            dataset[dataKey] = el.dataset[dataKey];
                        }
                    }
                    else {
                        for (var i = 0; i < el.attributes.length; i++) {
                            var attr = el.attributes[i];
                            if (attr.name.indexOf('data-') >= 0) {
                                dataset[$.toCamelCase(attr.name.split('data-')[1])] = attr.value;
                            }
                        }
                    }
                    for (var key in dataset) {
                        if (dataset[key] === 'false') dataset[key] = false;
                        else if (dataset[key] === 'true') dataset[key] = true;
                        else if (parseFloat(dataset[key]) === dataset[key] * 1) dataset[key] = dataset[key] * 1;
                    }
                    return dataset;
                }
            },
            val: function (value) {
                if (typeof value === 'undefined') {
                    if (this[0]) {
                        if (this[0].multiple && this[0].nodeName.toLowerCase() === 'select') {
                            var values = [];
                            for (var i = 0; i < this[0].selectedOptions.length; i++) {
                                values.push(this[0].selectedOptions[i].value);
                            }
                            return values;
                        }
                        return this[0].value;
                    }
                    else return undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].value = value;
                    }
                    return this;
                }
            },
            // Transforms
            transform : function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.transform = transform;
                }
                return this;
            },
            transition: function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            },
            //Events
            on: function (eventName, targetSelector, listener, capture) {
                function handleLiveEvent(e) {
                    var target = e.target;
                    if ($(target).is(targetSelector)) listener.call(target, e);
                    else {
                        var parents = $(target).parents();
                        for (var k = 0; k < parents.length; k++) {
                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                        }
                    }
                }
                var events = eventName.split(' ');
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof targetSelector === 'function' || targetSelector === false) {
                        // Usual events
                        if (typeof targetSelector === 'function') {
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        for (j = 0; j < events.length; j++) {
                            this[i].addEventListener(events[j], listener, capture);
                        }
                    }
                    else {
                        //Live events
                        for (j = 0; j < events.length; j++) {
                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                            this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                            this[i].addEventListener(events[j], handleLiveEvent, capture);
                        }
                    }
                }
        
                return this;
            },
            off: function (eventName, targetSelector, listener, capture) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof targetSelector === 'function' || targetSelector === false) {
                            // Usual events
                            if (typeof targetSelector === 'function') {
                                listener = arguments[1];
                                capture = arguments[2] || false;
                            }
                            this[j].removeEventListener(events[i], listener, capture);
                        }
                        else {
                            // Live event
                            if (this[j].dom7LiveListeners) {
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                    if (this[j].dom7LiveListeners[k].listener === listener) {
                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                                    }
                                }
                            }
                        }
                    }
                }
                return this;
            },
            once: function (eventName, targetSelector, listener, capture) {
                var dom = this;
                if (typeof targetSelector === 'function') {
                    listener = arguments[1];
                    capture = arguments[2];
                    targetSelector = false;
                }
                function proxy(e) {
                    listener.call(e.target, e);
                    dom.off(eventName, targetSelector, proxy, capture);
                }
                return dom.on(eventName, targetSelector, proxy, capture);
            },
            trigger: function (eventName, eventData) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        var evt;
                        try {
                            evt = new CustomEvent(events[i], {detail: eventData, bubbles: true, cancelable: true});
                        }
                        catch (e) {
                            evt = document.createEvent('Event');
                            evt.initEvent(events[i], true, true);
                            evt.detail = eventData;
                        }
                        this[j].dispatchEvent(evt);
                    }
                }
                return this;
            },
            transitionEnd: function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend'],
                    i, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            animationEnd: function (callback) {
                var events = ['webkitAnimationEnd', 'animationend'],
                    i, dom = this;
                function fireCallBack(e) {
                    callback(e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            // Sizing/Styles
            width: function () {
                if (this[0] === window) {
                    return window.innerWidth;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('width'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerWidth: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) {
                        var styles = this.styles();
                        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
                    }
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            },
            height: function () {
                if (this[0] === window) {
                    return window.innerHeight;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('height'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerHeight: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) {
                        var styles = this.styles();
                        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
                    }
                    else
                        return this[0].offsetHeight;
                }
                else return null;
            },
            offset: function () {
                if (this.length > 0) {
                    var el = this[0];
                    var box = el.getBoundingClientRect();
                    var body = document.body;
                    var clientTop  = el.clientTop  || body.clientTop  || 0;
                    var clientLeft = el.clientLeft || body.clientLeft || 0;
                    var scrollTop  = el === window ? window.scrollY : el.scrollTop;
                    var scrollLeft = el === window ? window.scrollX : el.scrollLeft;
                    return {
                        top: box.top  + scrollTop  - clientTop,
                        left: box.left + scrollLeft - clientLeft
                    };
                }
                else {
                    return null;
                }
            },
            hide: function () {
                for (var i = 0; i < this.length; i++) {
                    this[i].style.display = 'none';
                }
                return this;
            },
            show: function () {
                for (var i = 0; i < this.length; i++) {
                    this[i].style.display = 'block';
                }
                return this;
            },
            styles: function () {
                if (this[0]) return window.getComputedStyle(this[0], null);
            },
            css: function (props, value) {
                var i;
                if (arguments.length === 1) {
                    if (typeof props === 'string') {
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                    }
                    else {
                        for (i = 0; i < this.length; i++) {
                            for (var prop in props) {
                                this[i].style[prop] = props[prop];
                            }
                        }
                        return this;
                    }
                }
                if (arguments.length === 2 && typeof props === 'string') {
                    for (i = 0; i < this.length; i++) {
                        this[i].style[props] = value;
                    }
                    return this;
                }
                return this;
            },
        
            //Dom manipulation
            // Iterate over the collection passing elements to `callback`
            each: function (callback) {
                // Don't bother continuing without a callback
                if (!callback) return this;
                // Iterate over the current collection
                for (var i = 0; i < this.length; i++) {
                    // If the callback returns false
                    if (callback.call(this[i], i, this[i]) === false) {
                        // End the loop early
                        return this;
                    }
                }
                // Return `this` to allow chained DOM operations
                return this;
            },
            filter: function (callback) {
                var matchedItems = [];
                var dom = this;
                for (var i = 0; i < dom.length; i++) {
                    if (callback.call(dom[i], i, dom[i])) matchedItems.push(dom[i]);
                }
                return new Dom7(matchedItems);
            },
            html: function (html) {
                if (typeof html === 'undefined') {
                    return this[0] ? this[0].innerHTML : undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].innerHTML = html;
                    }
                    return this;
                }
            },
            text: function (text) {
                if (typeof text === 'undefined') {
                    if (this[0]) {
                        return this[0].textContent.trim();
                    }
                    else return null;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].textContent = text;
                    }
                    return this;
                }
            },
            is: function (selector) {
                var compareWith, i, el = this[0];
                if (!el || typeof selector === 'undefined') return false;
                if (typeof selector === 'string') {
                    if (el.matches) return el.matches(selector);
                    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                    else {
                        compareWith = $(selector);
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === el) return true;
                        }
                        return false;
                    }
                }
                else if (selector === document) return el === document;
                else if (selector === window) return el === window;
                else {
                    if (selector.nodeType || selector insta