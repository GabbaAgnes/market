const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });

const Story = new Schema({
    content: Object,
    creatureId: String,
    owner: String
    //add additional formation info later
});

module.exports = mongoose.model('stories', Story);
