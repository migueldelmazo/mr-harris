define([], function () {

    return {
        parse: function (ev) {
            return {
                //ev attributes
                currentTarget:  ev.currentTarget,
                type:           ev.type,
                //positions
                offsetX:        ev.offsetX, //solo click event tiene estas propiedades
                offsetY:        ev.offsetY,
                pageX:          ev.pageX,
                pageY:          ev.pageY
            };
        }

    };

});