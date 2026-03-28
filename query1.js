use("campusNutrition")

const result = db.menuSnapshots.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$dining_location.name",
      averageCalories: { $avg: "$items.nutrition.calories" },
      itemCount: { $sum: 1 }
    }
  },
  { $sort: { averageCalories: -1 } }
]).toArray()

printjson(result)
