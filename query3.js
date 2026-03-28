use("campusNutrition")

const userId = "user_001"

const result = db.users.aggregate([
  { $match: { _id: userId } },
  { $unwind: "$consumption_entries" },
  { $count: "consumptionEntryCount" }
]).toArray()

printjson(result)
