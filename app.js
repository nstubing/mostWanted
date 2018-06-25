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
  traitSearcher(filteredPeople,people);
}
function peopleFilterDuplicates(filteredPeople){
  secondaryFilter=[];
  for(p=0;p<filteredPeople.length-1;p++){
    for(m=p+1;m<filteredPeople.length;m++){
      if(filteredPeople[p].id===filteredPeople[m].id){
        secondaryFilter.push(filteredPeople[m])

      }
    }
  }

return secondaryFilter

}
function traitSearcher(filteredPeople,people){
 if(filteredPeople.length===0){
   alert("We did not find anybody that matches your traits, press ok to restart!")
   searchByTraits(people);
 }
 else if(filteredPeople.length===1){
     mainMenu(filteredPeople,people);
 }
 else{
   userSearchChoice=prompt("We found "+filteredPeople.length+" people. If you are done type 'done' if not, add another trait! 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
   if (userSearchChoice==="done"){
       displayPeople(filteredPeople);
   }
   else{
     userInputFilter(userSearchChoice,filteredPeople,people);
     filteredPeople = peopleFilterDuplicates(filteredPeople);
     traitSearcher(filteredPeople,people)
   }
 }
}

function searchByHeight(people,filteredPeople) {
  let userInputHeight = prompt("How tall is the person?");
  let heightArray = people.filter(function (el) {
    if(el.height==  userInputHeight) {
      filteredPeople.push(el);
    }
    // return true if el.height matches userInputHeight
  });
}

function searchByWeight(people, filteredPeople) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      filteredPeople.push(el);
    }
    // return true if el.height matches userInputHeight
  });
}
function searchByEyeColor(people,filteredPeople) {
  let userInputEyeColor = prompt("What is the color of your person's eyes?");

  let newArray = people.filter(function (el) {
    if(el.eyeColor == userInputEyeColor) {
      filteredPeople.push(el);
    }
    // return true if el.height matches userInputHeight
  });
}
function searchByGender(people,filteredPeople) {
  let userInputGender = prompt("What is the gender?");

  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      filteredPeople.push(el);
    }
    // return true if el.height matches userInputHeight
  });
}
function searchByOccupation(people, filteredPeople) {
  let userInputOccupation = prompt("What is your person occupation?");

  let newArray = people.map(function (el) {
    if(el.occupation == userInputOccupation) {
      filteredPeople.push(el);
    }
    // return true if el.height matches userInputHeight
  });
}
function searchByAge(people, filteredPeople) {

 let userInputAge = prompt("What is the age of the person you are looking for?");

 let ageArray = people.filter(function (el) {
 let age=getAge(el);
   if( userInputAge==age) {    //need to make sure we compare el.dob after we change it to age.
     filteredPeople.push(el);
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
      searchByHeight(people,filteredPeople);
      break;
    case "weight":
      searchByWeight(people,filteredPeople);
      break;
    case "eye color":
      searchByEyeColor(people, filteredPeople);
      break;
    case "gender":
      searchByGender(people, filteredPeople);
      break;
    case "age":
      searchByAge(people, filteredPeople);
      break;
    case "occupation":
      searchByOccupation(people,filteredPeople);
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
      displayFamily(person,people);
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
 personInfo+= "Last Name: " + people[i].lastName + "<br>";
 personInfo+= "Gender: " + people[i].gender + "<br>";
 personInfo+= "DoB: " + people[i].dob + "<br>";
 personInfo+= "Height in Inches: " + people[i].height + "<br>";
 personInfo+= "Weight in Pounds: " + people[i].weight + "<br>";
 personInfo+= "Eye Color: " + people[i].eyeColor + "<br>";
 personInfo+= "Occupation: " + people[i].occupation + "<br>";
 personInfo+= "Parents: " + people[i].parents + "<br>";
 personInfo+= "Current Spouse: " + people[i].currentSpouse + "<br>";
 personInfo+= "<br>";
 // TODO: finish getting the rest of the information to display

 document.getElementById("peopleDisplay").style.display = 'block';
 document.getElementById("peopleDisplay").innerHTML=personInfo;
 }
}

function displayPerson(person){
 // print all of the information about a person:
 // height, weight, age, name, occupation, eye color.
 var personInfo = "First Name: " + person[0].firstName + "<br>";
 personInfo += "Last Name: " + person[0].lastName + "<br>";
 personInfo+= "Gender: " + person[0].gender + "<br>";
 personInfo+= "DoB: " + person[0].dob + "<br>";
 personInfo+= "Height in Inches: " + person[0].height + "<br>";
 personInfo+= "Weight in Pounds: " + person[0].weight + "<br>";
 personInfo+= "Eye Color: " + person[0].eyeColor + "<br>";
 personInfo+= "Occupation: " + person[0].occupation + "<br>";
 personInfo+= "Parents: " + person[0].parents + "<br>";
 personInfo+= "CurrentSpouse: " + person[0].currentSpouse + "<br>";
 personInfo+= "<br>";
 // TODO: finish getting the rest of the information to display
 document.getElementById("peopleDisplay").style.display = 'block';
 document.getElementById("peopleDisplay").innerHTML=personInfo;
}

function displayFamily(person,people){
  var personInfo = "First Name: " + person[0].firstName + "<br>";
 personInfo += "Last Name: " + person[0].lastName + "<br>";
 personInfo += "Parents: " + getParents(person,people) + "<br>";
 personInfo += "Siblings: " + getSiblings(person,people) + "<br>";
 personInfo += "Spouse: " + getSpouse(person,people) + "<br>";
 personInfo += "Children: " + getDescendants(person) + "<br>";

 document.getElementById("peopleDisplay").style.display = 'block';
 document.getElementById("peopleDisplay").innerHTML=personInfo;

}
function getSiblings(person,people){
  siblings=""
  let siblingCount=0
  for(e=0;e<people.length;e++){
    if((person[0].parents[0]===people[e].parents[0])&&(person[0].id!==people[e].id)){
      siblings+=people[e].firstName+" "+people[e].lastName+". ";
      siblingCount++
    }
  }
  if(siblingCount===0){
    siblings+="None.";
  }
  return siblings
}
function getSpouse(person,people){
  spouse=""
  if(person[0].currentSpouse==null){
    spouse+="None."
  }
  else{
      for(s=0;s<people.length;s++){
        if(person[0].currentSpouse===people[s].id){
          spouse+=people[s].firstName+" "+people[s].lastName+". ";
        }
      }
    }
  return spouse
}

function getParents(person,people){
  parents=""
  for(q=0;q<person[0].parents.length;q++){
    currentParentID=person[0].parents[q]
    for(t=0;t<people.length;t++){
      if(currentParentID===people[t].id){
        parents+=people[t].firstName+" "+people[t].lastName+". ";
      }
    }
  }
  if (parents===""){
    parents+= "None."
  }

  return parents
}


function displayDescendants(person){
 var personInfo = "First Name: " + person[0].firstName + "<br>";
 personInfo += "Last Name: " + person[0].lastName + "<br>";
 personInfo += "Descendants: " + getDescendants(person) + "<br>";

 document.getElementById("peopleDisplay").style.display = 'block';
 document.getElementById("peopleDisplay").innerHTML=personInfo;
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
  if(array.length===0){
    descendantString+="None."
  }
  else{
    for(i=0;i<array.length;i++){
      descendantString+=array[i].firstName+" "+array[i].lastName+". "
    }
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