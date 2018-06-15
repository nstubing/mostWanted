/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
var people=data/*[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,17,18,19,20,21]*/
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    searchByName(people);
    // TODO: search by name
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people); // restart app
    break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    // so on and so forth
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }

  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);

}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  switch(displayOption){
    case "info":
       displayPerson(person);
    // TODO: get person's info
    break;
    case "family":
    // displayFamily(person);
    // TODO: get person's family
    break;
    case "descendants":
      displayDescendants(person);
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
  let person= people.filter(function (el){
  if ((el.firstName.toLowerCase()===firstName) && (el.lastName.toLowerCase()===lastName)){
    return true
  }
  });
  mainMenu(person,people);
  return person;
  // TODO: find the person using the name they entered
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo+= "gender: " + person[0].gender + "\n";
  personInfo+= "dob: " + person[0].dob + "\n";
  personInfo+= "height inches: " + person[0].height + "\n";
  personInfo+= "weight lbs: " + person[0].weight + "\n";
  personInfo+= "eyeColor: " + person[0].eyeColor + "\n";
  personInfo+= "occupation: " + person[0].occupation + "\n";
  personInfo+= "parents: " + person[0].parents + "\n";
  personInfo+= "currentSpouse: " + person[0].currentSpouse + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function displayDescendants(person){
  var personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";

  personInfo += "Descendants: " + getDescendants(person) + "\n";



  alert(personInfo);


}

function getDescendants (person){
/*  let descendantString=""*/
/*    let descendantCounter=0;*/
  person=personToObject(person);
  let array=[];
  let descendantList=array.concat(descendantFinder(person));
  array = descendantList;
  if (descendantList.length>0){
    for(j=0;j<descendantList.length;j++){
      array=array.concat(descendantFinder(descendantList[j]));
    }
  }
  let descendantWords=descendantsToString(array)
  return descendantWords;
}
function descendantFinder(person){
  newDescendantList=[];
  for(i=0;i<people.length;i++){
    if (people[i].parents[0]===person.id||people[i].parents[1]===person.id){
      newDescendantList.push(people[i]);
    }
  }
return newDescendantList;
}
function personToObject(person){
  let personObject={
    id:person[0].id
  }
  return personObject;
}
function descendantsToString(array){
  descendantString="";
  for(i=0;i<array.length;i++){
    descendantString+=array[i].firstName+" "+array[i].lastName+". "
  }
return descendantString
}

function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
