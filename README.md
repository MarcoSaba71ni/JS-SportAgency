# FED1 Project Exam 1

Use this file to describe your project.

This web application is a dynamic blog-style site that displays a curated list of 10 pre-created football players posted by the admin user Sabatini.  
These are always publicly visible and read-only to preserve content integrity, allowing all users—logged in or not—to explore the content. Meaning read-only they cannot be edited or deleted by anyone, preserving their integrity.

The site also features full CRUD functionality for authenticated users. Once logged in, users can create their own player posts, which are displayed alongside the existing content. Each post is tied to the creator’s username through the Noroff Blog API, ensuring that only the original author can edit or delete their own entries.

Routing is managed using URL parameters (“id”) to navigate between views such as post details and the edit form. Conditional logic is implemented to ensure that Edit and Delete buttons only appear for posts owned by the logged-in user. This setup allows seamless interaction with the API while maintaining secure access control.

The application emphasizes both user experience and data ownership, ensuring a clear boundary between admin-created and user-generated content.

The application integrates with the Noroff Blog API using JavaScript and implements dynamic content handling through URL parameters, conditional rendering, and authentication checks.




OVERALL ENHANCEMENTS FOR PORTFOLIO PROJECT:

As in this case the Project Exam is yet to be graded, no changes were able to be done on the repository and its code. Advised by the teacher, there was no feedback from the teacher and the changes could only be cited on the READ.ME file of its repository. 

The overall project was a success in my humble opinion. Some of the standards were not met due to time limitation matters mainly. As certain aspects took an extra time to be understood by myself as much as some features to be figured out and issues/bugs to be solved, I found myself in a position where I had no time left to deliver and attend to small aspects that the assignment was asking.	
Analysing page by page and understanding how the project was designed and developed, I am about to provide self-judgmental feedback on specific areas that could be enhanced.

Starting by adding loading features, features that include setting a time to the operation to be concluded and implementing a personalised “Team Turco” loading spinner. Even though the files itselves are not heavy and the pages could actually load in a decent super short amount of time, adding the loading operation would give a more realistic feeling when accessing the pages. 
How this loading spin would be implemented:
Using css features and setting the time to an specific number, every time a button or an assembler is pressed, it would run first, the major purpose of the button and run the loading spinner before concluding the action.

The index.html design is very satisfying summed with the typography chosen. Only a specific section could be improved and would be the “Create Your Own Profile”. I would say a background image and using position relative and abstract on the text added by an image opacity and button scaled when hovering the image could be an area of improvement.


Although the Register and Login pages are really satisfactory two improvements could be implemented to the UI and the other to Java Script.
On the UI, a logo loading when arriving on the page and dropdown input would provide a feeling of getting ready for a new experience. Besides that, some fallbacks could be used specially on the register page when it comes to sending correct data. I realised that even though al the information was not completely corrected and sending an alert to the user, the user information would be already sent to the API but unfortunately would not location href to the index page.


“Contact Us” is functional and, as there is no endpoint to send the user contact information, I pretended that it was successful by sending an alert message that the contact information has been saved. The send button could be placed in the middle horizontally by text-align center with CSS.
”About Us” page layout is acceptable but its design could absolutely be improved. A better structure, a nav button that would display each trainer information avoiding the eternal scrolling. Perhaps an “anchor link” of each section that when clicked, would scroll down to the specific section.
The “My Profile Page” is very well organized and clean, displaying the user information based on the data saved on the local storage. Although there is an edit button to edit the user info, the assignment did not require this functionality. 
There was one feature that the assignment requested but I did not deliver. The assignment asked for a button or icon that would copy the URL of the specific page. That could be easily achieved by adding an event listener to the button that would window.location.search of the blog page. 



