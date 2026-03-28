use("campusNutrition")

const userId = "user_001"

const result = db.users.aggregate([
  { $match: { _id: userId } },
  {
    $project: {
      _id: 1,
      display_name: 1,
      consumptionCount: { $size: "$consumption_entries" }
    }
  }
]).toArray()

printjson(result)
