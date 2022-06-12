const { fileExtension } = require('../config');
const handler = {readdir: require('../handler/readdir')}

module.exports = (identifier) => {
    const callback = identifier[identifier.length - 1];
    const database_name = identifier.slice(0, -1);
    
    if (typeof callback !== 'function') database_name.push(callback);
    if (database_name.length < 1) throw new TypeError('No identifier specified "[...].getDatabases(?)".');
    
    var result = handler.readdir(database_name)
    .filter(target => target.endsWith(`.${fileExtension}`))
    .map(target => target.slice(0, -(fileExtension.length + 1)));
    return typeof callback === 'function' ? callback(result) : result;
}