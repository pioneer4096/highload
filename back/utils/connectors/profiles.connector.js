class ProfilesConnector {
    constructor(db) {
        this.db = db
    }

    async getProfile(userId) {
        return this.db.findProfileById(userId)
    }

    async getAllProfiles() {
        return this.db.getAll()
    }
}

module.exports = ProfilesConnector