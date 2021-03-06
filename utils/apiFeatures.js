/* eslint-disable node/no-unsupported-features/es-syntax */

class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter() {
      const queryObj = { ...this.queryString };
      const excludedFields = ["page", "sort", "limit", "fields"];
      excludedFields.forEach((el) => delete queryObj[el]);
      //console.log(req.query, queryObj);
  
      // const tours = await Tour.find(req.query)
      // 2) Advanced Filtering
      let queryStr = JSON.stringify(queryObj);
      this.query.find(JSON.parse(queryStr));
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
      console.log(queryStr);
      return this;
    }
  
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(",").join(" ");
        this.query = this.query.sort(sortBy);
        // IF 2 items has same price - sort('price ratingAverage')
      } else {
        // Will sort the data on the baseis of createdAt if no sorting is specified
        this.query = this.query.sort("-createdAt");
      }
  
      //console.log(req.query);
      return this;
    }
  
    limitFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(",").join(" ");
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select("-__v"); // Excluding this v field using 'minus'
      }
  
      return this;
    }
  
    paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
  
      return this;
    }
  }


  module.exports = APIFeatures