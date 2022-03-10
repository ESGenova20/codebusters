let id = 0;

// Helps to generate id unique params
const IdParamGenerator = (text) => ((text !== '') ? `${text}-${++id}` : ++id);

module.exports = IdParamGenerator;