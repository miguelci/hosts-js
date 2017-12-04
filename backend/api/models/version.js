const Model = require('./Model');

const TABLE = 'properties_versions';

class Version extends Model{

    constructor(property_id, data){
        super();
        this.property_id = parseInt(property_id);
        this.data = JSON.stringify(data);
        this.version = 0;
    }

    static find(property_id, callback){
        super.find('WHERE property_id = ?', [property_id], callback, TABLE);
    }

    addVersion(){
        this.findLastVersion(last_version => {
            if(last_version.properties_versions){
                if(last_version.properties_versions[0] !== undefined){
                    this.version = last_version.properties_versions[0].version;
                }
            }
            this.version++;
            Model.create(this, result => {}, TABLE);
        })
    }

    findLastVersion(callback){
        Model.find('WHERE property_id = ? ORDER BY date_created DESC LIMIT 1', [this.property_id], callback, TABLE);
    }

}

module.exports = Version;