var basics = require('basics');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.building && creep.carry.energy == 0) {
        creep.memory.building = false;
        creep.say('🔄 harvest');
        }
        if(!creep.memory.building &&
                creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            basics.build(creep);
        }
        else {
            basics.harvest(creep);
        }
    }
};

module.exports = roleBuilder;
