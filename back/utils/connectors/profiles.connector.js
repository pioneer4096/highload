class ProfilesConnector {
    constructor(db) {
        this.db = db
    }

    async getProfile(userId) {
        const profile = await this.db.findProfileById(userId)
        if (profile?.rows?.length) {
            return profile.rows[0] || null
        }
        else {
            return null
        }
    }

    async getAllProfiles() {
        const profiles = await this.db.getAll()
        if (profiles?.rows?.length) {
            return profiles.rows
        }
        else {
            return null
        }
    }
}

module.exports = ProfilesConnector