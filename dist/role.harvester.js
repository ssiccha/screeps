basics = require('basics');

var roleHarvester = {

/** @param {Creep} creep **/
run: function(creep) {

    var delivering = creep.memory.delivering;
    if(delivering && creep.carry.energy == 0) {
        creep.memory.delivering = false;
        delivering = false;
        creep.say('🔄 harvest');
    }
    if(!delivering) {
        basics.harvest(creep);
    }
    if(delivering) {
        basics.deliver(creep);
    }
}

};

module.exports = roleHarvester;
