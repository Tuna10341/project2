use("campusNutrition")

db.menuSnapshots.drop()
db.users.drop()

db.menuSnapshots.insertMany([
  {
    _id: "snapshot_001",
    menu_date: ISODate("2026-03-30T00:00:00Z"),
    fetched_at: ISODate("2026-03-30T08:00:00Z"),
    source_reference: "DOC_001",
    is_complete: true,
    dining_location: {
      location_id: "loc_001",
      name: "Stetson East",
      campus: "Boston",
      is_active: true
    },
    meal_period: {
      meal_period_id: "mp_001",
      name: "Lunch",
      start_time: "11:00",
      end_time: "15:00"
    },
    source_system: {
      source_system_id: "src_001",
      name: "DineOnCampus"
    },
    items: [
      {
        menu_item_id: "item_001",
        name: "Grilled Chicken Bowl",
        category: {
          category_id: "cat_001",
          category_name: "Entree"
        },
        allergen_tags: ["soy"],
        station: {
          station_id: "st_001",
          station_name: "Main Line"
        },
        display_portion: "1 bowl",
        nutrition: {
          nutrition_version_id: "nut_001",
          calories: 520,
          serving_size_value: 1,
          serving_unit: "bowl",
          recorded_at: ISODate("2026-03-30T08:00:00Z")
        }
      },
      {
        menu_item_id: "item_002",
        name: "Caesar Salad",
        category: {
          category_id: "cat_002",
          category_name: "Salad"
        },
        allergen_tags: ["milk"],
        station: {
          station_id: "st_002",
          station_name: "Salad Bar"
        },
        display_portion: "1 plate",
        nutrition: {
          nutrition_version_id: "nut_002",
          calories: 280,
          serving_size_value: 1,
          serving_unit: "plate",
          recorded_at: ISODate("2026-03-30T08:00:00Z")
        }
      },
      {
        menu_item_id: "item_003",
        name: "Veggie Pasta",
        category: {
          category_id: "cat_003",
          category_name: "Vegetarian"
        },
        allergen_tags: ["wheat"],
        station: {
          station_id: "st_001",
          station_name: "Main Line"
        },
        display_portion: "1 bowl",
        nutrition: {
          nutrition_version_id: "nut_003",
          calories: 430,
          serving_size_value: 1,
          serving_unit: "bowl",
          recorded_at: ISODate("2026-03-30T08:00:00Z")
        }
      }
    ]
  },
  {
    _id: "snapshot_002",
    menu_date: ISODate("2026-03-30T00:00:00Z"),
    fetched_at: ISODate("2026-03-30T17:00:00Z"),
    source_reference: "DOC_002",
    is_complete: true,
    dining_location: {
      location_id: "loc_002",
      name: "International Village",
      campus: "Boston",
      is_active: true
    },
    meal_period: {
      meal_period_id: "mp_002",
      name: "Dinner",
      start_time: "17:00",
      end_time: "21:00"
    },
    source_system: {
      source_system_id: "src_001",
      name: "DineOnCampus"
    },
    items: [
      {
        menu_item_id: "item_004",
        name: "Beef Stir Fry",
        category: {
          category_id: "cat_001",
          category_name: "Entree"
        },
        allergen_tags: ["soy"],
        station: {
          station_id: "st_003",
          station_name: "Global Kitchen"
        },
        display_portion: "1 plate",
        nutrition: {
          nutrition_version_id: "nut_004",
          calories: 610,
          serving_size_value: 1,
          serving_unit: "plate",
          recorded_at: ISODate("2026-03-30T17:00:00Z")
        }
      },
      {
        menu_item_id: "item_005",
        name: "Brown Rice",
        category: {
          category_id: "cat_004",
          category_name: "Side"
        },
        allergen_tags: [],
        station: {
          station_id: "st_003",
          station_name: "Global Kitchen"
        },
        display_portion: "1 cup",
        nutrition: {
          nutrition_version_id: "nut_005",
          calories: 210,
          serving_size_value: 1,
          serving_unit: "cup",
          recorded_at: ISODate("2026-03-30T17:00:00Z")
        }
      },
      {
        menu_item_id: "item_006",
        name: "Fruit Cup",
        category: {
          category_id: "cat_005",
          category_name: "Dessert"
        },
        allergen_tags: [],
        station: {
          station_id: "st_004",
          station_name: "Dessert"
        },
        display_portion: "1 cup",
        nutrition: {
          nutrition_version_id: "nut_006",
          calories: 120,
          serving_size_value: 1,
          serving_unit: "cup",
          recorded_at: ISODate("2026-03-30T17:00:00Z")
        }
      }
    ]
  }
])

db.users.insertMany([
  {
    _id: "user_001",
    email: "tuna.t@northeastern.edu",
    display_name: "Tuna",
    created_at: ISODate("2026-03-25T10:00:00Z"),
    dietary_goals: [
      {
        goal_id: "goal_001",
        goal_type: "Calories",
        target_value: 2200,
        unit: "kcal",
        start_date: ISODate("2026-03-25T00:00:00Z"),
        end_date: ISODate("2026-04-25T00:00:00Z")
      }
    ],
    filter_presets: [
      {
        filter_id: "filter_001",
        name: "Low Calorie",
        min_calories: 0,
        max_calories: 400,
        max_serving_size: 1,
        enabled: true,
        created_at: ISODate("2026-03-25T10:10:00Z")
      },
      {
        filter_id: "filter_002",
        name: "High Protein",
        min_calories: 300,
        max_calories: 700,
        max_serving_size: 1,
        enabled: false,
        created_at: ISODate("2026-03-25T10:15:00Z")
      }
    ],
    meal_plans: [
      {
        meal_plan_id: "plan_001",
        plan_date: ISODate("2026-03-30T00:00:00Z"),
        notes: "Lunch plan",
        items: [
          {
            menu_item_id: "item_001",
            name: "Grilled Chicken Bowl",
            planned_quantity: 1,
            expected_calories: 520
          },
          {
            menu_item_id: "item_002",
            name: "Caesar Salad",
            planned_quantity: 1,
            expected_calories: 280
          }
        ]
      }
    ],
    consumption_entries: [
      {
        consumption_entry_id: "cons_001",
        consumed_at: ISODate("2026-03-30T12:15:00Z"),
        quantity: 1,
        snapshot_id: "snapshot_001",
        menu_item_id: "item_001",
        item_name: "Grilled Chicken Bowl",
        calories: 520
      },
      {
        consumption_entry_id: "cons_002",
        consumed_at: ISODate("2026-03-30T12:20:00Z"),
        quantity: 1,
        snapshot_id: "snapshot_001",
        menu_item_id: "item_002",
        item_name: "Caesar Salad",
        calories: 280
      }
    ]
  },
  {
    _id: "user_002",
    email: "alex.a@northeastern.edu",
    display_name: "Alex",
    created_at: ISODate("2026-03-26T09:00:00Z"),
    dietary_goals: [
      {
        goal_id: "goal_002",
        goal_type: "Calories",
        target_value: 1800,
        unit: "kcal",
        start_date: ISODate("2026-03-26T00:00:00Z"),
        end_date: ISODate("2026-04-26T00:00:00Z")
      }
    ],
    filter_presets: [
      {
        filter_id: "filter_003",
        name: "Very Light",
        min_calories: 0,
        max_calories: 250,
        max_serving_size: 1,
        enabled: true,
        created_at: ISODate("2026-03-26T09:10:00Z")
      }
    ],
    meal_plans: [
      {
        meal_plan_id: "plan_002",
        plan_date: ISODate("2026-03-30T00:00:00Z"),
        notes: "Dinner plan",
        items: [
          {
            menu_item_id: "item_005",
            name: "Brown Rice",
            planned_quantity: 1,
            expected_calories: 210
          },
          {
            menu_item_id: "item_006",
            name: "Fruit Cup",
            planned_quantity: 1,
            expected_calories: 120
          }
        ]
      }
    ],
    consumption_entries: [
      {
        consumption_entry_id: "cons_003",
        consumed_at: ISODate("2026-03-30T18:10:00Z"),
        quantity: 1,
        snapshot_id: "snapshot_002",
        menu_item_id: "item_005",
        item_name: "Brown Rice",
        calories: 210
      }
    ]
  }
])

print("Database initialized")
print("menuSnapshots count:", db.menuSnapshots.countDocuments())
print("users count:", db.users.countDocuments())
