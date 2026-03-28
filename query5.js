use("campusNutrition")

const userId = "user_001"

const result = db.users.aggregate([
  { $match: { _id: userId } },
  { $unwind: "$consumption_entries" },
  {
    $group: {
      _id: "$_id",
      display_name: { $first: "$display_name" },
      totalCaloriesConsumed: {
        $sum: {
          $multiply: [
            "$consumption_entries.calories",
            "$consumption_entries.quantity"
          ]
        }
      }
    }
  }
]).toArray()

printjson(result)
