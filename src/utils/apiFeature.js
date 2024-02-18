



export class ApiFeatures {
    constructor(mongooseQuery, searchQuery) {

        this.mongooseQuery = mongooseQuery;
        this.searchQuery = searchQuery;
    }
    // ===========Pagination===========

    pagination() {
        if (this.searchQuery.page <= 0) this.searchQuery.page = 1
        let pageNumber = this.searchQuery.page * 1 || 1;
        let pageLimit = 2

        let skip = (pageNumber - 1) * pageLimit
        this.pageNumber = pageNumber
        this.mongooseQuery.skip(skip).limit(pageLimit)
        return this
    } 
    // ===========Filter===========

    filter() {
        let filterObj = { ...this.searchQuery }
        let excludedFields = ['page', 'sort', 'fields', 'keyword']
        excludedFields.forEach((val, index) => {
            delete filterObj[val]
        })
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/(gt|gte|lt|lte)/g, match => '$' + match)
        filterObj = JSON.parse(filterObj)
        this.mongooseQuery.find(filterObj)
        return this
    }
    // ===========Sort===========

    sort() {
        if (this.searchQuery.sort) {
            let sortBy = this.searchQuery.sort.split(',').join(' ')
            console.log(sortBy);
            this.mongooseQuery.sort(sortBy)
        }
        return this
    }
    // ===========fields===========

    fields() {
        if (this.searchQuery.fields) {
            let fields = this.searchQuery.fields.split(',').join(' ')
            console.log(fields);
            this.mongooseQuery.select(fields)
        }
        return this
    }
    // ===========Search===========
    search() {
        if (this.searchQuery.keyword) {
            this.mongooseQuery.find({
                $or: [
                    { title: { $regex: this.searchQuery.keyword } },
                    { description: { $regex: this.searchQuery.keyword } },
                ]
            })
        }
        return this
    }

}







