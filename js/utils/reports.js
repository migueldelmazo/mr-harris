define([], function () {

    var reports = window.z_reports = [];

    return {

        create: function (msg) {
            reports.push(msg);
        },

        print: function () {
            console.debug(reports);
        }

    };
});