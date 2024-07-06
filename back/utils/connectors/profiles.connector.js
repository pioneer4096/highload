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

    async searchProfiles(firstName, lastName) {
        return this.db.searchProfiles(firstName, lastName)
    }
}

module.exports = ProfilesConnector