var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;

var toursEditTmp = require("./templates/TourEditTmp.hbs");
var toursCreateTmp = require("./templates/TourCreateTmp.hbs");
var inputListItem = require("./templates/InputListItem.hbs");
var tripScheduleItemTmp = require("./templates/TripScheduleItemTmp.hbs");
var dayScheduleItemTmp = require("./templates/DayScheduleItemTmp.hbs");
var swal = require("sweetalert");

var ToursEditCreateView = Backbone.View.extend({
    el: ".dashboard",
    initialize: function (options) {
        _.bindAll(this, "renderHTML", "saveChanges", "cancelChanges","addInputListItem", "initElements", "initMap", "startDateChange", "endDateChange", /*"latChange", "lngChange",*/ "createMarker", "selectFile", "validateTour");
        this.router = options.router;
    },
    events: {
        // "#latitude change": "latChange",
        // "#longitude change": "lngChange"
    },
    render: function (options) {
        $('.active').removeClass('active');
        $('#tours').addClass('active');

        var that = this;

        this.tourID = options.tourID;
        this.isCreating = !options.tourID;
        this.template = options.tourID ? toursEditTmp : toursCreateTmp;

        this.renderHTML().then(function () {
            that.initElements();
            that.initPlugins();
            that.initMap();
        });
    },
    initElements: function () {
        this.$title = this.$el.find("#title");
        this.$startDate = this.$el.find("#startDate");
        this.$endDate = this.$el.find("#endDate");
        this.$desc = this.$el.find("#desc");
        this.$longitude = this.$el.find("#longitude");
        this.$latitude = this.$el.find("#latitude");
        this.$cost = this.$el.find("#cost");
        this.$places = this.$el.find("#places");
        this.$complexity = this.$el.find("#complexity");
        this.$inclusiveList = this.$el.find("#inclusive-list");
        this.$notInclusiveList = this.$el.find("#not-inclusive-list");
        this.$inclusiveInputArray = this.$inclusiveList.find(".value-input");
        this.$notInclusiveInputArray = this.$notInclusiveList.find(".value-input");
        this.$tripScheduleList = this.$el.find("#trip-schedule-list");
        this.$dayScheduleListsArray = this.$el.find(".day-schedule-list");
        this.$addInclusive = this.$el.find("#add-inclusive");
        this.$addNotInclusive = this.$el.find("#add-not-inclusive");
        this.$saveChanges = this.$el.find("#save-changes");
        this.$cancelChanges = this.$el.find("#cancel-changes");
        this.$selectedFiles = this.$el.find(".select-file");

        this.attachEvents();
    },
    initPlugins: function () {
        this.$startDate.datepicker({
            maxDate: this.$endDate.val(),
            constrainInput: true
        });
        this.$endDate.datepicker({
            minDate: this.$startDate.val(),
            constrainInput: true
        });
    },
    initMap: function () {
        var that = this,
            latLngObj = {};

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 15.8203125, lng: 48.69096039092549},
            zoom: 3,
            disableDefaultUI: true
        });

        if(!this.isCreating) {
            latLngObj = {
                lat: parseInt(this.tourData.latitude, 10),
                lng: parseInt(this.tourData.longitude, 10)
            };

            this.createMarker(latLngObj);
            this.map.setCenter(latLngObj);
        }

        this.map.addListener("click", function (event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();

            if(that.marker){
                that.marker.setMap(null);
            }

            that.createMarker(event.latLng);

            that.$latitude.val(lat);
            that.$longitude.val(lng);
        });
    },
    renderHTML: function () {
        var that = this;

        return new Promise(function (resolve, reject) {
            var url ="/api/tours/" + that.tourID;

            if(!that.isCreating) {
                $.ajax(url).done(function (response) {
                    if(response.code === 200) {
                        that.tourData = response.data;
                        that.tourData.startDate = formatDateToString(new Date(that.tourData.startDate), ".");
                        that.tourData.endDate = formatDateToString(new Date(that.tourData.endDate), ".");
                        that.$el.html(that.template(response.data));
                        resolve();
                    } else {
                        swal("Ошибка!", "Такой тур не найден!");
                        reject();
                    }
                });
            } else {
                that.$el.html(that.template({}));
                resolve();
            }
        });
    },
    attachEvents: function() {
        this.$startDate.change(this.startDateChange);
        this.$endDate.change(this.endDateChange);
        this.$el.find(".add-field-btn").click(this.addInputListItem);
        this.$el.find(".delete-field").click(this.deleteField);
        this.$cancelChanges.click(this.cancelChanges);
        this.$saveChanges.click(this.saveChanges);
        this.$selectedFiles.change(this.selectFile);
    },
    saveChanges: function (e) {
        var dataToSubmit = {},
            inclusiveArr = [],
            notInclusiveArr = [],
            tripScheduleArr = [],
            validationResult;

        this.$tripScheduleList.find(".day-schedule-list").each(function (index, el) {
            var $list = $(el),
                scheduleObj = {};

            scheduleObj.day = $list.data("day");
            scheduleObj.schedule = [];

            $list.find("input").each(function (index, el) {
                var $input = $(el);

                if($.trim($input.val())){
                    scheduleObj.schedule.push($input.val());
                }
            });

            tripScheduleArr.push(scheduleObj);
        });

        this.$inclusiveList.find("input").each(function (index, el) {
            var $input = $(el);

            if($.trim($input.val())){
                inclusiveArr.push($input.val());
            }
        });

        this.$notInclusiveList.find("input").each(function (index, el) {
            var $input = $(el);

            if($.trim($input.val())){
                notInclusiveArr.push($input.val());
            }
        });

        dataToSubmit.title = this.$title.val();
        dataToSubmit.desc = this.$desc.val();
        dataToSubmit.startDate = this.$startDate.val();
        dataToSubmit.endDate = this.$endDate.val();
        dataToSubmit.cost = this.$cost.val();
        dataToSubmit.places = this.$places.val();
        dataToSubmit.complexity = this.$complexity.val();
        dataToSubmit.latitude = this.$latitude.val();
        dataToSubmit.longitude = this.$longitude.val();
        dataToSubmit.inclusive = inclusiveArr;
        dataToSubmit.not_inclusive = notInclusiveArr;
        dataToSubmit.schedule = tripScheduleArr;


        dataToSubmit.img = {
            head: [],
            center: [],
            footer: []
        };

        var headImg = $(".select-file[name='head']");
        var centerImg = $(".select-file[name='center']");
        var footerImg = $(".select-file[name='footer']");

        headImg.each(function( index ) {
            dataToSubmit.img.head.push($( this ).val().replace(/^.*?([^\\\/]*)$/, '$1'));
        });

        centerImg.each(function( index ) {
            dataToSubmit.img.center.push($( this ).val().replace(/^.*?([^\\\/]*)$/, '$1'));
        });

        footerImg.each(function( index ) {
            dataToSubmit.img.footer.push($( this ).val().replace(/^.*?([^\\\/]*)$/, '$1'));
        });


        dataToSubmit.cover = $(".select-file[name='cover']").val().replace(/^.*?([^\\\/]*)$/, '$1') ||'';

        validationResult = this.validateTour(dataToSubmit);

        if(validationResult.hasError) {
            swal("Ошибка", validationResult.message, "error");
            return;
        }

        dataToSubmit = JSON.stringify(dataToSubmit);

        if(this.isCreating) {
            this.postNewTour(dataToSubmit);//добавить новый
        } else {
            this.putChanges(dataToSubmit);//обновить
        }
    },
    validateTour: function (tourData) {
        var hasError = false,
            errMsgArr = [];

        if($.trim(tourData.title) === "") {
            errMsgArr.push("Название не может быть пустой строкой.");
            hasError = true;
        }

        if($.trim(tourData.desc) === "") {
            errMsgArr.push("Описание не может быть пустой строкой.");
            hasError = true;
        }

        if($.trim(tourData.startDate) === "" || $.trim(tourData.startDate) === "") {
            errMsgArr.push("Укажите даты начала и конца тура.");
            hasError = true;
        }

        if($.trim(tourData.longitude) === "" || $.trim(tourData.latitude) === "") {
            errMsgArr.push("Укажите координаты места проведения тура.");
            hasError = true;
        }

        if($.trim(tourData.complexity) === "") {
            errMsgArr.push("Укажите сложность тура.");
            hasError = true;
        }

        if(parseInt(tourData.complexity, "10") < 1 || parseInt(tourData.complexity, "10") > 5) {
            errMsgArr.push("Укажите сложность в пределе от 1 (легкий) до 5 (сложный).");
            hasError = true;
        }

        if($.trim(tourData.cost) === "") {
            errMsgArr.push("Укажите стоимость тура.");
            hasError = true;
        }

        if(parseInt(tourData.cost) < 0) {
            errMsgArr.push("Стоимость тура не может быть меньше нуля.");
            hasError = true;
        }

        if($.trim(tourData.places) === "" || parseInt(tourData.places, "10") < 1) {
            errMsgArr.push("Укажите количество мест.");
            hasError = true;
        }

        if(tourData.inclusive.length === 0) {
            errMsgArr.push("Укажите, что входит в стоимость тура.");
            hasError = true;
        }

        if(tourData.not_inclusive.length === 0) {
            errMsgArr.push("Укажите, что не входит в стоимость тура.");
            hasError = true;
        }

        if(tourData.schedule.length === 0) {
            errMsgArr.push("Расписание должно включать в себя хотя бы один день.");
            hasError = true;
        }

        if(!$(".select-file[name='cover']").val() && this.isCreating) {
            errMsgArr.push("Добавьте обложку тура");
            hasError = true;
        }

        return {
            hasError: hasError,
            message: errMsgArr.join("\n")
        };
    },
    putChanges: function (dataToSubmit) {
        $('#data-to-submit').val(dataToSubmit);

        $('#update-tour').ajaxSubmit({
            success: function (response) {
                swal("Сохраненно", "Фототур успешно изменен.", "success")
            },
            error: function (xhr, mes, err) {
                console.log(mes);
                console.log(err);
            }
        });
    },
    postNewTour: function (dataToSubmit) {
        $('#data-to-submit').val(dataToSubmit);

        $('#create-tour').ajaxSubmit({
            success: function (response) {
                swal("Добавлено", "Фототур успешно добавлен.", "success")
            },
            error: function (xhr, mes, err) {
                console.log(mes);
                console.log(err);
            }
        });
    },
    cancelChanges: function (e) {
        this.render({tourID: this.tourID});
    },
    deleteField: function (e) {
        var $closestLi = $(e.currentTarget).closest(".input-group-item");

        if(!$closestLi.is(":only-child")){
            $closestLi.remove();
        } else {
            $closestLi.find("input").val("");
        }
    },
    startDateChange: function () {
        this.$endDate.datepicker("option", "minDate", this.$startDate.val());
        this.renderTripSchedule();
    },
    endDateChange: function () {
        this.$startDate.datepicker("option", "maxDate", this.$endDate.val());
        this.renderTripSchedule();
    },
    addInputListItem: function (e) {
        var $inputList = $(e.currentTarget).siblings(".input-list"),
            $newListItem = $(inputListItem());

        $newListItem.find(".delete-field").click(this.deleteField);

        $inputList.append($newListItem);
    },
    renderTripSchedule: function () {
        var startDate = convertToDate(this.$startDate.val(), "."),
            endDate = convertToDate(this.$endDate.val(), "."),
            days = daysBetween(startDate, endDate),
            i,
            day,
            dayDate,
            that = this;


        this.$tripScheduleList.empty();

        for(i = 0; i < days; i+=1) {
            (function (i) {
                dayDate = addDays(startDate, i);
                day = "День " + (i + 1) + " (" + dayDate.getDate() + "." + (dayDate.getMonth() + 1) + ")";
                that.$tripScheduleList.append(tripScheduleItemTmp({day: day}))
            })(i);
        }

        this.$tripScheduleList.find(".add-day-schedule").click(this.addInputListItem);
        this.$tripScheduleList.find(".delete-field").click(this.deleteField);
    },
    createMarker: function (latLngObj) {
        this.marker = new google.maps.Marker({
            position: latLngObj,
            map: this.map,
            title: 'Выбраная точка'
        });
    },
    selectFile: function (e) {
        var root =  $(e.target).closest('li');
        var that = this;

        var reader = new FileReader();

        reader.onload = function (event) {
            var the_url = event.target.result;
            console.log(root.find('.gallery-img').css("background-image"));
            root.find('.gallery-img').css("background-image", "url('" + the_url + "')");
            if(root.hasClass('add-pics')) {
            root.removeClass('add-pics');
            root.find('.gallery-img').html('').removeClass('plus');
            root.find('.img-caption').html('<i class="icon-spin3 change-photo" title="Заменить фотографию"></i>');
            }
        };

        reader.readAsDataURL($(e.target)[0].files[0]);
    }
});

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function convertToDate (str, split) {
    var dateArr = str.split(split);
    return new Date(dateArr[2], dateArr[1] - 1, dateArr[0])
}

function daysBetween(date1, date2) {
    var ONE_DAY = 1000 * 60 * 60 * 24;
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
    var difference_ms = Math.abs(date1_ms - date2_ms);
    return Math.round(difference_ms/ONE_DAY) + 1
}

function formatDateToString (date, joinSymb) {
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join(joinSymb + "");
}

module.exports = ToursEditCreateView;