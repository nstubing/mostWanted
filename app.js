/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
/*[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,17,18,19,20,21]*/
function app(data){
  people = data
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
  let filteredPeople=[];
  userInputFilter(userSearchChoice,filteredPeople,people);
  userSearchChoice=prompt("We found "+filteredPeople.length+" people. If you are done type 'done' if not, add another trait! 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  if (userSearchChoice==="done"){
    if(filteredPeople.length===0){
      displayPerson(filteredPeople);
    }
    else {
      displayPeople(filteredPeople);
    }
  }
  else{
    userInputFilter(userSearchChoice,filteredPeople,people);
  }
  let person = filteredPeople[0];

  mainMenu(person, people);

}
function searchByHeight(people,filteredPeople) {
  let userInputHeight = prompt("How tall is the person?");
  let heightArray = people.filter(function (el) {
    if(el.height==  userInputHeight) {
      filteredPeople.push(el);
    }
    // return true if el.height matches userInputHeight
  });

  return heightArray;
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
function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What is the color of your person's eyes?");

  let newArray = people.filter(function (el) {
    if(el.eyeColor == userInputEyeColor) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}
function searchByGender(people) {
  let userInputGender = prompt("What is the gender?");

  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}
function searchOccupation(people) {
  let userInputOccupation = prompt("What is your person occupation?");

  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}
function searchByAge(people) {

 let userInputAge = prompt("What is the age of the person you are looking for?");
let filteredPeopleAge=[];

 let ageArray = people.filter(function (el) {
 let age=getAge(el);
   if( userInputAge==age) {    //need to make sure we compare el.dob after we change it to age.
     filteredPeopleAge.push(el);
   }
   // return true if el.height matches userInputHeight
 });


 function getAge (el) {
let dobInfo= el.dob.split("/");
   let  dob= dobInfo;
   let month =dob[0]
   let day = dob[1]
   let year = dob[2]
   let today = new Date();
   let age = today.getFullYear() - year;
   if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
     age--;

   }
   return age;


}

}
function userInputFilter(userSearchChoice,filteredPeople,people){
  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people,filteredPeople);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      break;
    case "age":
      filteredPeople = searchByAge(people);
      break;
    case "occupation":
      filteredPeople = searchByOccupation(people);
      break;
    // so on and so forth
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }
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
 let personInfo="";
 for(i=0;i<people.length;i++){
  personInfo+= "First Name: " + people[i].firstName + "<br>";
  personInfo+= "Last Name: " + people[i].lastName + "\n";
  personInfo+= "gender: " + people[i].gender + "\n";
  personInfo+= "dob: " + people[i].dob + "\n";
  personInfo+= "height inches: " + people[i].height + "\n";
  personInfo+= "weight lbs: " + people[i].weight + "\n";
  personInfo+= "eyeColor: " + people[i].eyeColor + "\n";
  personInfo+= "occupation: " + people[i].occupation + "\n";
  personInfo+= "parents: " + people[i].parents + "\n";
  personInfo+= "currentSpouse: " + people[i].currentSpouse + "\n";
  personInfo+= "\n";
  // TODO: finish getting the rest of the information to display
  document.getElementById("peopleDisplay").innerHTML=personInfo;
  }
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "<br>";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo+= "gender: " + person.gender + "\n";
  personInfo+= "dob: " + person.dob + "\n";
  personInfo+= "height inches: " + person.height + "\n";
  personInfo+= "weight lbs: " + person.weight + "\n";
  personInfo+= "eyeColor: " + person.eyeColor + "\n";
  personInfo+= "occupation: " + person.occupation + "\n";
  personInfo+= "parents: " + person.parents + "\n";
  personInfo+= "currentSpouse: " + person.currentSpouse + "\n";
  personInfo+= "\n";
  // TODO: finish getting the rest of the information to display
  document.getElementById("peopleDisplay").innerHTML=personInfo;
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
  searchNumber=people.length-1
  let array=[];
  descendantFinder(person,array,searchNumber);
  if (array.length>0){
    for(j=0;j<array.length;j++){
      descendantFinder(array[j],array,searchNumber);
    }
  }
  let descendantWords=descendantsToString(array)
  return descendantWords;
}
function descendantFinder(person,array,searchNumber){
/*  newDescendantList=array;*/

  if (searchNumber===-1){
    return array
  }
  if (people[searchNumber].parents[0]===person.id||people[searchNumber].parents[1]===person.id){
    array.push(people[searchNumber]);
  }
    descendantFinder(person,array,searchNumber-1);
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
    var response = prompt(question)/*.trim();*/;
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