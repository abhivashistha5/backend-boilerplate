var saveData = function(model, data) {
  return new model(data).save();
};

var getData = function (model, query, projection, options) {
  return model.find(query, projection, options);
};

var findOne = function (model, query, projection, options) {
  return model.findOne(query, projection, options);
};

var findAndUpdate = function (model, conditions, update, options) {
  return model.findOneAndUpdate(conditions, update, options);
};

var update = function (model, conditions, update, options) {
  return model.update(conditions, update, options);
};

var deleteOne = function (model, condition) {
  return model.deleteOne(condition);
};

var deleteMany = function (model, condition) {
  return model.deleteMany(condition);
};

/*------------------------------------------------------------------------
* FIND WITH REFERENCE
* -----------------------------------------------------------------------*/
var populateData = function (model, query, projection, options, collectionOptions) {
  return model.find(query, projection, options).populate(collectionOptions).exec();
};

var count = function (model, condition) {
  return model.count(condition);
};
/*
----------------------------------------
AGGREGATE DATA
----------------------------------------
*/
var aggregateData = function (model, group) {
  return model.aggregate(group);
};

var insert = function(model, data, options){
  return model.collection.insert(data, options);
};

var aggregateDataWithPopulate = function (model, group, populateOptions, callback) {
  model.aggregate(group, (err, data) => {

      if (err) {
          //logger.error("Aggregate Data", err);
          return callback(err);
      }

      model.populate(data, populateOptions,
          function (err, populatedDocs) {

              if (err) return callback(err);
              return callback(null, populatedDocs);// This object should now be populated accordingly.
          });
//return callback(null, data);
  });
};

var deepPopulate= function(model, criteria, projectionQuery, options, populateModel, nestedModel, callback)
{
  model.find(criteria, projectionQuery, options).populate(populateModel)
      .exec(function (err, docs) {
          if (err) return callback(err);

          model.populate(docs, nestedModel,
              function (err, populatedDocs) {
                  if (err) return callback(err);
                  callback(null, populatedDocs);// This object should now be populated accordingly.
              });
      });
};
var aggregateDataOnly= function (model, group, callback) {
  model.aggregate(group, (err, data) => {
      console.log("err dats:;", err, data)
      if (err) {
          return callback(err);
      }
      else
      {
          return callback(null, data);
      }

  });
};

var bulkFindAndUpdate= function(bulk,query,update,options)
{
  bulk.find(query).upsert().update(update,options);
};


module.exports = {
  saveData,
  getData,
  update,
  deleteOne,
  deleteMany,
  insert,
  count,
  findOne,
  findAndUpdate,
  populateData,
  aggregateData,
  aggregateDataWithPopulate,
  deepPopulate,
  aggregateDataOnly,
  bulkFindAndUpdate,
};