let spreadArrays = (this && this.spreadArrays) || function () {
    for (let s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (let r = Array(s), k = 0, i = 0; i < il; i++)
        for (let a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var kCommandTypeRegex = /^[\t\n\f\r ]*([MLHVZCSQTAmlhvzcsqta])[\t\n\f\r ]*/;
var kFlagRegex = /^[01]/;
var kNumberRegex = /^[+-]?(([0-9]*\.[0-9]+)|([0-9]+\.)|([0-9]+))([eE][+-]?[0-9]+)?/;
var kCoordinateRegex = kNumberRegex;
var kCommaWsp = /^(([\t\n\f\r ]+,?[\t\n\f\r ]*)|(,[\t\n\f\r ]*))/;
var kGrammar = {
    M: [kCoordinateRegex, kCoordinateRegex],
    L: [kCoordinateRegex, kCoordinateRegex],
    H: [kCoordinateRegex],
    V: [kCoordinateRegex],
    Z: [],
    C: [kCoordinateRegex, kCoordinateRegex, kCoordinateRegex, kCoordinateRegex, kCoordinateRegex, kCoordinateRegex],
    S: [kCoordinateRegex, kCoordinateRegex, kCoordinateRegex, kCoordinateRegex],
    Q: [kCoordinateRegex, kCoordinateRegex, kCoordinateRegex, kCoordinateRegex],
    T: [kCoordinateRegex, kCoordinateRegex],
    A: [kNumberRegex, kNumberRegex, kCoordinateRegex, kFlagRegex, kFlagRegex, kCoordinateRegex, kCoordinateRegex],
};
var SvgParser = /** @class */ (function () {
    function SvgParser() {
    }
    SvgParser.components = function (type, path, cursor) {
        var expectedRegexList = kGrammar[type.toUpperCase()];
        var components = [];
        while (cursor <= path.length) {
            var component = [type];
            for (var i = 0, expectedRegexList_1 = expectedRegexList; i < expectedRegexList_1.length; i++) {
                var regex = expectedRegexList_1[i];
                var match = path.slice(cursor).match(regex);
                if (match !== null) {
                    component.push(match[0]);
                    cursor += match[0].length;
                    var ws = path.slice(cursor).match(kCommaWsp);
                    if (ws !== null) {
                        cursor += ws[0].length;
                    }
                }
                else if (component.length === 1) {
                    return [cursor, components];
                }
                else {
                    throw new Error('malformed path (first error at ' + cursor + ')');
                }
            }
            components.push(component);
            if (expectedRegexList.length === 0) {
                return [cursor, components];
            }
            if (type === 'm') {
                type = 'l';
            }
            if (type === 'M') {
                type = 'L';
            }
        }
        throw new Error('malformed path (first error at ' + cursor + ')');
    };
    SvgParser.parse = function (path) {
        let cursor = 0;
        let tokens = [];
        while (cursor < path.length) {
            let match = path.slice(cursor).match(kCommandTypeRegex);
            if (match !== null) {
                let command = match[1];
                cursor += match[0].length;
                let componentList = SvgParser.components(command, path, cursor);
                cursor = componentList[0];
                tokens = spreadArrays(tokens, componentList[1]);
            }
            else {
                throw new Error('malformed path (first error at ' + cursor + ')');
            }
        }
        return tokens;
    };
    return SvgParser;
}());


