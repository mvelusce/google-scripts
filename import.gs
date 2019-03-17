
var startIngredients = 7;
var endIngredients = 24;
var startDirections = 25;
var endDirections = 42;

function import() {
  
  var totRows = 86;
  
  var origRecipes = SpreadsheetApp.openById("19hhAJXfQwHoW0pzHyFLLE84JY_4tgOOKNtQ0GYwshjM");
  var sheet = origRecipes.getSheetByName("ricette");
  var range = sheet.getRange("A2:AQ" + totRows);
  
  for (var row=1; row<totRows; row++) {
    Logger.log("Processing row: " + row);
    
    var name = range.getCell(row, 1).getValue();
    var category = range.getCell(row, 2).getValue();
    var base_ingredient = range.getCell(row, 3).getValue();
    var servings = range.getCell(row, 4).getValue();
    var caloriesPerson = range.getCell(row, 5).getValue();
    var caloriesTot = range.getCell(row, 6).getValue();
    
    var ingredients = "";
    for (var ing=startIngredients; ing<=endIngredients; ing++) {
      ingredients += range.getCell(row, ing).getValue() + "\n";
    }
    
    var directions = "";
    for (var dir=startDirections; dir<=endDirections; dir++) {
      directions += range.getCell(row, dir).getValue() + "\n";
    }
    
    var notes = range.getCell(row, 43).getValue();
    
    var values = ["", name, category, base_ingredient, 3, servings, "", caloriesPerson, ingredients, directions, notes];
    
    var recipe = {values: values};
    
    createRecipeDoc(recipe);
  }
  Logger.log("End!");
}
