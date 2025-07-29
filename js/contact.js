function submitAlert() {

    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("text").value;
    if(!phone || !email || !message) {
        alert("Inputs must to be filled");
    } else {
         alert("Your message has been sent to our server");
        window.location.href = "../index.html";
    } 
   
}
