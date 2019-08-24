
var startIngredients = 7;
var endIngredients = 24;
var startDirections = 25;
var endDirections = 42;

function import() {
  
  var startRow = 238;
  var endRow = 239;
  var totRows = endRow - startRow + 1;
  
  var origRecipes = SpreadsheetApp.openById("1UYKDIk3fLG6AZfBEqHjF88BKtnczQvOVcJrodqKwsqw");
  var sheet = origRecipes.getSheetByName("ricette");
  var range = sheet.getRange("A" + startRow + ":AQ" + endRow);
  
  for (var row=1; row<totRows+1; row++) {
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
