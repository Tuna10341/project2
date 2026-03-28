use("campusNutrition")

const userId = "user_001"
const filterId = "filter_002"
const newValue = true

db.users.updateOne(
  {
    _id: userId,
    "filter_presets.filter_id": filterId
  },
  {
    $set: {
      "filter_presets.$.enabled": newValue
    }
  }
)

printjson(
  db.users.findOne(
    { _id: userId },
    { _id: 1, display_name: 1, filter_presets: 1 }
  )
)
