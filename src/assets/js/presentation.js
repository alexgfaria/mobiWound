/**
 * Copyright (c) 2015 Marand (marand.com)
 * Author: Leandro Gomes
 */

var PresentationRenderer = autoInit(function () {
    console.log("EEERRRRRR");

    var defaults = {
        $document: $(document),
        firstInit: true
    };

    function formatDate (str) {

        var date = new Date(str);

        var curr_date = date.getDate();

        var curr_month = date.getMonth();

        curr_month++;

        var curr_year = date.getFullYear();

        var curr_hour = "0" + date.getHours();

        var curr_min = "0" + date.getMinutes();

        var curr_sec = "0" + date.getSeconds();

        return curr_date + ". " + curr_month + ". " + curr_year + " " + curr_hour.slice(-2) + ":" + curr_min.slice(-2) + ":" + curr_sec.slice(-2);

    }

    function isDate (date, rmType) {
        if(arguments.length<2) {
            console.error("isDate() needs 2 arguments!")
        }
        return ( ( (rmType=='DV_DATE' || rmType=='DV_DATETIME' ) && new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) && isNaN(date) ));

    }

    function isUrl(value) {
        return value.substr(0, 4) == 'http';
    }

    function toLinkTag(url, mediaType) {

        if(mediaType.toLowerCase().indexOf("image") >= 0){
            return '<img src="'+url+'" />';

        }

        var mtIcons = {'application/pdf': 'fa-file-pdf-o'};
        var icon='';
            if(mediaType && mtIcons[mediaType]){
                icon= '<i class="fa fa-2x '+mtIcons[mediaType]+'"></i>';
            }
        var linkText = icon ? icon : url;
        return '<a href="' + url + '" target="_blank">'+linkText + '</a>'
    }


    function findMediaType (dvMultimediaItem) {
        if (dvMultimediaItem.rmType && dvMultimediaItem.rmType=='DV_MULTIMEDIA' && dvMultimediaItem.children && dvMultimediaItem.children.length) {
            for (var j = 0; j < dvMultimediaItem.children.length; j++) {
                var child = dvMultimediaItem.children[j];
                if(child.children && child.children.length) {
                    for (var k = 0; k < child.children.length; k++) {
                        var grandChild = child.children[k];
                        if(grandChild.label=='code_string') {
                            var displayValue = grandChild.displayValue;
                            return displayValue
                        }
                    }
                }
            }
        }
    }

    function parseDuration (DurationString) {
        var matches = DurationString.match(/^P([0-9]+Y|)?([0-9]+M|)?([0-9]+D|)?T?([0-9]+H|)?([0-9]+M|)?([0-9]+S|)?$/),
            result = {};

        if (matches) {
            result.year = parseInt(matches[1]);
            result.month = parseInt(matches[2]);
            result.day = parseInt(matches[3]);
            result.hour = parseInt(matches[4]);
            result.minute = parseInt(matches[5]);
            result.second = parseInt(matches[6]);

            result.toString = function() {
                var string = '';

                if (this.year) string += this.year + ' Year' + (this.year == 1 ? '': 's') + ' ';
                if (this.month) string += this.month + ' Month' + (this.month == 1 ? '': 's') + ' ';
                if (this.day) string += this.day + ' Day' + (this.day == 1 ? '': 's') + ' ';
                if (this.hour) string += this.hour + ' Hour' + (this.hour == 1 ? '': 's') + ' ';
                if (this.minute) string += this.minute + ' Minute' + (this.minute == 1 ? '': 's') + ' ';
                if (this.second) string += this.second + ' Second' + (this.second == 1 ? '': 's') + ' ';

                return string;
            };

            return result;
        } else {
            return false;
        }
    }

    return {
        init: function () {

            this.options = defaults;

            if(this.options.firstInit) this.setEvents();

        },

        createExtendedView: function(data) {
            this.emptyResult();

            if(data.children) this.loopData(data.children);

        },

        createInlineView: function(data) {
            this.emptyResult();

            if(data.children) this.loopDataInline(data.children);

        },

        emptyResult: function () {

            this.markup = "";

        },

        getResult: function () {

            return this.markup;

        },

        loopData: function(data, options) {
            this.markup += '<ul>';

            for (var i=0; i<data.length; i++) {

                if(options && options.mediaType && data[i].label=='media_type') {
                    continue;
                }

                var label = data[i].label;

                if(!data[i].children) {

                    var value = false;

                    if(label.indexOf("Duration") != -1 && data[i].displayValue.charAt(0) == "P"){
                        value = parseDuration(data[i].displayValue);
                    }
                    if(!value) value = isDate(data[i].displayValue, data[i].rmType) ? formatDate(data[i].displayValue) : data[i].displayValue;

                    if(isUrl(value)){
                        var mediaType = options?options.mediaType:null;
                        value = toLinkTag(value, mediaType);
                    }


                    this.markup += "<li><span class='label-value'><i class='fa fa-dot-circle-o'></i> " + label + ': </span><span class="value">' + value + '</span></li>';

                }
                else {

                    /*if(data[i].children.length == 1 && data[i].children[0].displayValue) {

                        var displayValue = data[i].children[0].displayValue,
                            valueFlat = isDate(displayValue) ? formatDate(displayValue) : displayValue;

                        this.markup += "<li><span class='label-value'><i class='fa fa-dot-circle-o'></i> " + label + ': </span><span class="value">' + valueFlat + '</span></li>';

                    }
                    else{*/

                        this.markup += "<li><div class='header'><i class='fa fa-angle-down'></i> " + label + "</div>";  //span

                        options = {mediaType: findMediaType(data[i])};


                        this.loopData(data[i].children,options);

                        this.markup += "</li>";

                    //}

                }

            }

            this.markup += '</ul>';

        },

        loopDataInline: function(data, options) {

            var isChildrenSibling = false;

            this.markup += '<ul>';

            for (var i=0; i<data.length; i++) {

                if(options && options.mediaType && data[i].label=='media_type') {
                    continue;
                }

                var label = data[i].label;

                if(!data[i].children) {

                    if(!isChildrenSibling){
                        this.markup += "<li>";
                        isChildrenSibling = true;
                    }

                    var value = false;

                    if(label.indexOf("Duration") != -1 && data[i].displayValue.charAt(0) == "P"){
                        value = parseDuration(data[i].displayValue);
                    }

                    if(!value) value = isDate(data[i].displayValue, data[i].rmType) ? formatDate(data[i].displayValue) : data[i].displayValue;
                    if(isUrl(value)){
                        var mediaType = options?options.mediaType:null;
                        value = toLinkTag(value, mediaType);
                    }
                    this.markup += "<span class='label-value'>| " + label + ": </span><span class='value'>" + value + "</span>";

                    if(i == data.length-1){
                        this.markup += "</li>";
                        isChildrenSibling = false;
                    }

                }
                else {

                   /* if(data[i].children.length == 1 && data[i].children[0].displayValue) {

                        if(!isChildrenSibling){
                            this.markup += "<li>";
                            isChildrenSibling = true;
                        }

                        var displayValue = data[i].children[0].displayValue,
                            valueFlat = isDate(displayValue) ? formatDate(displayValue) : displayValue;

                        this.markup += "<span class='label-value'>| " + label + ': </span><span class="value">' + valueFlat + '</span>';

                    }
                    else{*/

                        this.markup += "<li><div class='header'><i class='fa fa-angle-down'></i> " + label + "</div>"; //span
                        options = {mediaType: findMediaType(data[i])};
                        this.loopDataInline(data[i].children, options);

                        if(isChildrenSibling) isChildrenSibling = false;

                        this.markup += "</li>";

                    //}

                }

            }

            this.markup += '</ul>';

        },

        setEvents: function() {

            this.options.firstInit = false;

            this.options.$document.on('click', 'li div.header', function() {

                var el = $(this);

                if( el.find('i').hasClass('fa-rotate-45') )  el.find('i').removeClass('fa-rotate-45');

                el.toggleClass('collapsed expanded');

                el.find('i').toggleClass("fa-angle-right fa-angle-down");

                var content = el.siblings();

                content.slideToggle('2000', 'easeInOutCubic');

            });

            this.options.$document.on('mouseenter', 'li div.header', function() {

                if( $(this).hasClass('collapsed') ) {

                    $(this).find('i').addClass('fa-rotate-45');

                    $(this).find('i').css('color', '#577da0');

                }
            });

            this.options.$document.on('mouseleave', 'li div.header', function() {

                if( $(this).hasClass('collapsed') ) {

                    $(this).find('i').removeClass('fa-rotate-45');

                    $(this).find('i').css('color', '#999');

                }
            });

        }

    };
}());

function autoInit( module ) {

    $( function() {
        if ( module.init ) {
            module.init();
        }
    });

    return module;
}


