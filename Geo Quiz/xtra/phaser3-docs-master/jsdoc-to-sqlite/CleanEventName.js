const CleanEventName = function (eventName)
{
    //  jsdoc format: Phaser.Scenes.Events#event:BOOT
    return eventName.replace('#event:', '.');
};

module.exports = CleanEventName;
