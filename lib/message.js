exports.Message = function(type, payload) {

    this.type = type;
    this.payload = payload;
    this.createdOn = new Date();

};

