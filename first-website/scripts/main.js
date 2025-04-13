 

const myImage = document.querySelector("img");

myImage.addEventListener("click", () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "images/healthy-living.jpg") {
    myImage.setAttribute("src", "images/super-foods.jpg");
  } else {
    myImage.setAttribute("src", "images/healthy-living.jpg");
  }
});


let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");
myHeading.textContent = "Hello world!";

function setUserName() {
    const myName = prompt("Please enter your name.");
    if (!myName) {
        setUserName();
    } else {
        localStorage.setItem("name", myName);
        myHeading.textContent = `Healthy Eating and Nutrition, ${myName}`;
    }
  }

  if (!localStorage.getItem("name")) {
    setUserName();
  } else {
    const storedName = localStorage.getItem("name");
    myHeading.textContent = `Healthy Eating and Nutrition, ${storedName}`;
  }
  myButton.addEventListener("click", () => {
    setUserName();
  });