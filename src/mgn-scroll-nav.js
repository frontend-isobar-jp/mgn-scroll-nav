/*

Megane Template

Website: http://megane-template.com/
License: Dentsu Isobar All Rights Reserved.

*/
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.mgnScrollNav = factory();
    }
}(this, function() {

    function mgnScrollNav(selector, option) {

        this.selector = selector;
        this.scrollNav = document.querySelectorAll( this.selector )[0];

        //option
        if(option == null) option = {};

        this.box = option.boxElm ? option.boxElm : '.f-section';
        this.btn = option.activeElm ? option.activeElm : 'li';
        this.posFix = option.posFix ? option.posFix : 0;
        this.edgeJudge = option.edgeJudge;
        if(this.edgeJudge == null) this.edgeJudge = true;

        this.boxElm = document.querySelectorAll( this.box );

        if( this.scrollNav ) {
            this.btnElm = this.scrollNav.querySelectorAll( this.btn );
            this.Init();
        }

    }

    /**
    **
    ** Init
    **
    **/
    mgnScrollNav.prototype.Init = function() {

        var this_ = this,
            INTERVAL = 10,
            timer;

        for (var i = 0; i < this.boxElm.length; i++) {

            var TARGET_ID = this.boxElm[i].id;
            this.btnElm[i].querySelectorAll('a')[0].setAttribute( 'href', '#' + TARGET_ID );

        }

        var Restart = function() {

            clearTimeout(timer);
            timer = setTimeout(this_.Ready, INTERVAL);

        }

        this.Ready();

        window.addEventListener( 'resize', function(){
            this.Ready()
        });
        window.addEventListener( 'scroll', function(){
            this.Ready()
        });

    };


    /**
    **
    ** Ready
    **
    **/
    mgnScrollNav.prototype.Ready = function() {

        this.Reset();
        this.GetTarget();

    }
    mgnScrollNav.prototype.Reset = function() {

        for (var i = 0; i < this.btnElm.length; i++) this.RemoveClass(this.btnElm[i],'active');
        for (var i = 0; i < this.boxElm.length; i++) this.RemoveClass(this.boxElm[i],'active');

    }

    mgnScrollNav.prototype.GetTarget = function() {

        var WIN_HEIGHT = window.innerHeight;
        var WIN_SCROLL = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        var hasJudge;

        if( this.edgeJudge ){
            hasJudge = document.documentElement.scrollHeight == WIN_HEIGHT + WIN_SCROLL || WIN_SCROLL == 0;
        } else {
            hasJudge = this.edgeJudge;
        }

        if( hasJudge ){

            var TARGET_ID = WIN_SCROLL == 0 ? this.boxElm[0].id : this.boxElm[ this.boxElm.length - 1 ].id;
            this.Position( TARGET_ID );

        } else {

            for (var i = 0; i < this.boxElm.length; i++) {

                var BOX_HEIGHT =  this.boxElm[i].scrollHeight;
                var BOX_TOP = this.GetOffset( this.boxElm[i] ).top;

                var checkPos;

                if( String(this.posFix).indexOf('%') > -1 ){

                    // 単位が%の場合
                    checkPos = WIN_SCROLL + WIN_HEIGHT * ( this.posFix.split('%')[0] / 100 );

                } else {

                    checkPos = WIN_SCROLL + this.posFix;

                }

                if( checkPos >= BOX_TOP && checkPos < BOX_TOP + BOX_HEIGHT ){

                    this.Position( this.boxElm[i].id );

                }

            }

        }

    };


    /**
    **
    ** Position
    **
    **/
    mgnScrollNav.prototype.Position = function(id) {

        for (var i = 0; i < this.btnElm.length; i++) {

            var THIS_HREF = this.btnElm[i].querySelectorAll('a')[0].getAttribute( 'href' ).split('#')[1];

            if( id === THIS_HREF ) {

                this.AddClass(this.btnElm[i],'active');
                this.AddClass(document.getElementById(THIS_HREF),'active');

            }

        }

    };



    /**
    **
    ** GetOffset
    **
    **/
    mgnScrollNav.prototype.GetOffset = function(el) {

        var BOX = el.getBoundingClientRect();

        return {
            top: BOX.top + window.pageYOffset - document.documentElement.clientTop,
            left: BOX.left + window.pageXOffset - document.documentElement.clientLeft
        }

    }

    mgnScrollNav.prototype.AddClass = function( element, _className ) {

        if (element.classList) {
            element.classList.add(_className);
        } else {
            element.className += ' ' + _className;
        }

    }
    mgnScrollNav.prototype.RemoveClass = function( element, _className ) {

        if (element.classList) {
            element.classList.remove(_className);
        } else {
            element.className = element.className.replace(new RegExp('(^|\\b)' + _className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }

    }

    return mgnScrollNav;

}));
