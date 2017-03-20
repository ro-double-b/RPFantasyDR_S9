Sprints
[x] refactor to Angular
[x] add authentication
[x] add basic DB for auth
[x] update DB for user's selection
[x] add functionality for results
[x] add selection drag/drop/submit

Minor updates
// additional features
[x] update the about content
[x] get selection and queens to be aligned
[x] add rules of game
[x] form validation
[x] error when autopopulate starts
[x] update content for About Me
[x] update to send a notification if you have not selected all of the queens 
[x] fill out words on website
[x] login is not working
[x] size of about me when window is small
[x] add "fantasy" to logo on nav bar
[x] back to top does not work
[x] login error box not populating correctly!
[x] dont log out when you submit
[x] nav bar not working
[x] update the links to switch between login/signup are working
[x] contact icons do not link to external sites
[x] udpate hover for drag and drop
[x] reformat the background to be better!
[x] update photos to remove backmarks
[x] navbar not staying at top
[x] rankings is not uploading for new users!
[x] have a search feature on ranking
[x] nav bar does not work again
[x] fix how the ranking number is on
[x] show how you rank with others on ranking
[x] update color and frame for about me section -- results overspilling
[x] add the email to list of contact
[x] update header for ranking along with user
[x] filter features on ranking
[x] add name after logged in
[x] bigger border on bottom
[x] deploy
[x] queens not loading after you login
[x] get heroku psql server working
[x] move heroku address to actual domain
[x] table display properly working
[x] rankings scroll feature if window is too small
[x] pick top three
[x] update heroku naming
[x] change top three after first three episodes
[x] remove express sessions as it is crashing application
[x] update for toot and boot additional points
[x] check promises for all async calls!
[x] error when autopopulate starts, still getting errors but wont time out
[x] add buttions for scroll of queens
[x] when you login you dont get update ranking, etc...
[x] express session is not working currently
[x] check to make sure that you dont get logged out after submitting a selection
[x] logout functionality not working
[x] when you go to a random site it does not work, wont redirect
[x] try to stay where you are at on the page too
[x] clear out console.logs for when you select queens
[x] mobile redirect site
[x] logout disapears if you refersh homepage
[x] remove fade up items????
[x] change bootstrap based on various browser sizes
[x] remove twitter from about me section
[x] toot boot buttons not centered
[x] make a page that can be displayed on mobile phone
[x] link to rankings is not wokring!
[x] check functionality of toot and boot eliminations
[x] if not entered before you are doubleing your sumtotals
[x] make a page that can be displayed while server is running (night of episode and day of toot/boot)
[x] queen pictures need to stay consistent when window is sized down
[x] update modal for submission bc right now it is just for one day


===> BEFORE DEPLOYMENT MUST HAVES
[ ] UPDATE DATABASE
[ ] SECURITY
[ ] GET USER OUT OF SCOPE


[ ] test modals
[ ] restrict various characters in username and password
[ ] link mobile page to the rest of document now that is ready
[ ] test out mobile site
[ ] selection boxes need to stay consistent
[ ] do a run though of the season, with what you expect/test cases
[ ] ranking css descriptions should not be em, similar to others
[ ] update ranking secion description
[ ] add a ranking on the database
[ ] update signup function to let users know that other users can see their username
[ ] re-do the pictures!
[ ] other updates to css
[ ] name not displaying when you are logged in
[ ] test out on mobile phone
[ ] add team feature
[ ] longer names are not consistent on small screens, making it appear larger
[ ] add back mobile once done testing
[ ] read this article and add security features to my server: https://glebbahmutov.com/blog/solid-expressjs-server/
[ ] read this article and add security features to client side: https://www.owasp.org/index.php/Testing_for_Reflected_Cross_site_scripting_(OTG-INPVAL-001) && https://www.owasp.org/index.php/Authentication_Cheat_Sheet
[ ] have 'sign in to play' scroll you to top of page!
[ ] limit how many rankings are shown on screen
[ ] add results
[ ] user profiles
[ ] have profile of who you picked and how they did
[?] when making selection, revers too low, 2nd nav bar is not there
[ ] use cookie parser
[ ] contact go-daddy to make site not have heroku in it
[ ] totals are not populating correctly
[ ] update finalsumtotal in database
[ ] update a rranking table in database

===> STRETCH BEFORE DEPLOYMENT

[ ] update fadeLeft/Right annimate css depending on where you are clicking
[ ] ability to click on user and see their profile and who they picked
[ ] seems to not persist if you change browsers!
[ ] bugg when you keep on selecting a category over and over again
[ ] ranking link does not work
[ ] update selection to display 'update choice', if already submitted!
[ ] have chosen queens apear in box after selected
[ ] have access to select stuff on mobile
[ ] test to make sure selection css property is update when logged in
[ ] button  in #/results to calculate and sort rankings
[ ] button in #/resutls to add rank into database
[ ] add an error modal if you dont have the correct user to add to the database
[ ] wheen there is a small window the login navbar will not work


[ ] table font-size property not small enough makes site scrollable
[ ] ranking not displaying correctly on my phone!
[ ] add description for toot and boot
[ ] change results to something more discrete
[ ] make form validation for when i submit the results
[ ] updat since the totals is currently empty
[ ] update favicon image
[ ] wont update data if you refresh page
[ ] displaying wrong modal when you sign up a new user

=== > SUNDAY

// refactoring
[ ] remove the directives in the app.js file
[ ] update for ESLint
[ ] remove duplicate script/link files in html index file
[ ] go through and refactor to ES6 where necessary
[ ] refactor css document to match actual content
[ ] break out auth factory and controller in app.js
[ ] update controller names to fit descriptions
[ ] break out queen into one rootScope instead of having multiple instances