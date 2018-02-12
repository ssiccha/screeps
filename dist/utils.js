// return specific type of body
var specifyBody = function( type, energy ) {
    if ( type == 'worker' ) {
        if ( energy < 400 ) {
            return [ WORK, CARRY, MOVE, MOVE ];
        }
        else if ( energy >= 400 ){
            return [ WORK, WORK, CARRY, CARRY, MOVE, MOVE ];
        }
    }
    return [];
}

module.exports = {
    specifyBody: specifyBody
}
