class infoVideo{
    constructor(config){
        this.title = config.title,
        this.url = config.url,
        this.duration = config.duration,
        this.timeCode = config.timeCode
    }

    get title () {
        return this.title
    }

    get url () {
        return this.url
    }

    get timeCode () {
        return this.timeCode
    }


}