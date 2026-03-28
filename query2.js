use("campusNutrition")

const result = db.menuSnapshots.find(
  {
    $and: [
      { "meal_period.name": { $in: ["Lunch", "Dinner"] } },
      {
        $or: [
          { "items.nutrition.calories": { $lte: 250 } },
          { "items.category.category_name": "Vegetarian" },
          { "items.name": "Fruit Cup" }
        ]
      }
    ]
  },
  {
    _id: 1,
    "dining_location.name": 1,
    "meal_period.name": 1,
    items: 1
  }
).toArray()

printjson(result)
