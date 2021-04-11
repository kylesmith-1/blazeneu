# Final Project: Written Report

## Meta

### Who was on your team? 

On Inkfish, we are team #176:

- Kyle Smith
- Jack Cardin
- Rebekah Johnson

### What’s the URL of your deployed app?
http://blazeneu.com/

### What’s the URL of your github repository with the code for your deployed app?
https://github.com/kylesmith-1/blazeneu

### Is your app deployed and working?
Yes!

### For each team member, what work did that person do on the project?

#### Kyle
- Added the appropriate access levels for companies and entries, so that 1) you can still view but must be signed in to contribute and 2) only the creator of an entry can delete it. 3) Predefined users with admin access can delete/edit any entry/company. 

- Integrated real time data that shows how many contributions have been made to the site so far (correlates to how many total entries have been posted).

- Added gifs that display when a company has 0 reports of drug testing.

- Created the forms for adding an entry.

- Integrated email notifications, so that a user can sign up to be notified when a company has a new entry added.

- Added the disclaimer on the website.

- Added manual entry for the location, so that a user can still enter an address if their company is not in Google Maps. A user can toggle between manual entry/google maps selection, with Google Maps being the default.

- Spearheaded the database migrations and schema.

- Deployed the website.

#### Rebekah
- Created mockups for the desired look and feel of the website, which can be found here on Figma: https://www.figma.com/file/KepJOVw1eFx988WMu9QHSl/blazeneu?node-id=0%3A1
- Designed the site logo.
- Implemented designs on the website, using the React-Bootstrap framework and a considerable amount of CSS. 
- Significantly contributed to components for the web user interface.
- Pair programmed to integrate the search bar and google maps component into the website.
- Debugged google maps component so that the marker would relocate according to drag/drop and so that it will search only by establishment.
- Styled the search bar.
- Contributed to the migrations and schema.
- Made significant contributions to the project proposal and final report.

#### Jack
- Researched how to build and integrate a search bar component into a React application
- Researched how to build and integrate a google maps component into a React application
- Integrated a search bar component into our React application to filter companies by name.
- Integrated the Google Maps component into our React application to be able to select, on a map, establishments for where a given company is located.
- Created README and appropriately attributed sources, ensuring they were licensed properly. 

#### Collectively
- Discussed desired features of this application.
- Met regularly to pair program and help each other debug problems.
- Contributed to the project proposal and final report.


## App
### What does your project 2 app do?

To reiterate from our proposal: Our project idea is to create a database for Northeastern students that lists out which companies drug test, either during the interview process or throughout the duration of the co-op itself. One of our team members first thought of this project idea when they noticed that clubs/students will often share spreadsheets that record this information from past students who voluntarily share whether they were drug tested at their co-op. Other times, questions are posted on social media, usually anonymously, asking about whether a specific company drug tests. This uncertainty about what to expect creates unnecessary anxiety for students, particularly in relation to recreational drugs that are legal in Massachusetts, such as marijuana, but that could disqualify a candidate or result in termination on the job. Our goal is to make known the expectations of a company to the greatest extent possible, in order to help job candidates be best prepared.

In several ways, our app operates similarly to the Events App. On the home screen, a user is greeted with a list of companies that have been added to the database. We have included a search bar so that, as the number of companies grows, a user can easily filter out companies and only render relevant ones. By clicking into these companies, they can view a list of entries from other users which detail their experience with drug testing for that company.  A user must be logged in to view entries, or to contribute to the site in general. If no entries exist for a company or the user is curious to see more information, they can opt into receiving email notifications from that company, which inform them when more contributions have been made. To add some humor to our website, we have also included gifs, which only render when a company has been found to not drug test 100% of the time.

### How has your app concept changed since the proposal?

Here is a list of changes made since our proposal:

- Entry data is only viewable if you are signed up/logged in, whereas it was originally viewable regardless.

- Entries are made sequentially, so that the first entry is at the top and the most recent entry is at the bottom. The original thought was that more recent entries would be rendered first.

- We did not have time to implement our “nice-to-have” feature of verification for company/entry posts, but this was always a stretch goal.

- We did, however, have time to implement our stretch goal of email notifications. Our thoughts behind this feature did change. Originally, it would connect users with whoever created an entry, allowing them to ask further questions. The creator of the entry could choose to opt out of receiving these messages. We pivoted away from this idea, instead making it so that a user would receive a notification whenever new data was added to the company.

- In our proposal, we mentioned two possibilities for real time data. We ultimately opted for the latter, which was displaying in real-time the number of contributions (entries) made to a site.

- For our Google Maps component, the original thought was to also implement directions from the user to the company. We pivoted away from this idea, rationalizing that a user would be able to easily pull up directions on their own device with the address. How it works in our application is that the creator of a company uses Google Maps to choose the location, ensuring it is the correct address. From that point on, the location is displayed purely as the address and does not include the map.

### How do users interact with your application? What can they accomplish by doing so?
Users interact with our application in one of three ways:

1) They use the application to view information. By creating an account, a user can search for a company and view all entry information. The information in a single entry includes: The co-op cycle/year an entry is applicable to, whether a company drug tests or not, whether drug tests are continuous, and any additional notes they wish to include. A user can also opt in to receiving email notifications when more data is added to a company. By using the application, the user gains insight into what the expectations of that company may be in regards to drug testing.

2) They use the application to contribute information. By creating an account, a user can choose to create a new company if it does not exist yet, or add an entry to an existing company. By using the application, the user can contribute their knowledge and help other future applicants for their position know what to expect.

3) Admins use the application to moderate information and ensure that content is appropriate and not being abused. For the time being, admins solely consist of the three creators of the project.

### For each project requirement above, how does your app meet that requirement?
 - Our application includes multiple features that extend past the functionality typical of past homework assignments, which includes email notifications, google maps integration, a search bar that filters companies as you type, and an overall more sleek design than solely using the default react-bootstrap styles.
- We have built the web application as two separate components. It has a back-end built with Elixir / Phoenix, located in a folder called “server” on Github, and a front-end built with Create React App, located in a folder called “web-ui” on Github. Our front-end is deployed as a static site and is structured as an SPA.
- Our back-end does include a significant amount of application logic. This includes the implementation of validating and hashing passwords, organization of managing database relationships with API access, as well as fully-elixir based logic for determining who to send email notifications to, and posting to the SendGrid REST API to do that. 
- Our frontend communicates with the server primarily via the JSON API to get and post data for all our database tables (users, companies, entries, notifications). We use channels to manage a real time data point, which is the total number of entries live on the app. This is used to update without refreshing on the splash page of the app. 
- All of our application is deployed to Kyle Smith’s github: https://github.com/kylesmith-1/blazeneu/tree/deploy-version
- Our application has user accounts with local password authentication.
- Users, Companies, Notifications, and Entries are stored in a Postgres database. 
- Our server-side code uses the SendGrid API that is authenticated via an auth token, held as an environment variable. (Authentication of the App). This is to send email notifications on new entries to companies that users have enrolled in notifications for.
- Our application uses Phoenix Channels to push real-time updates to users. Every time a contribution is made, the number on the home screen increases to show total contributions made.
- Our chosen feature for “something neat,” was to integrate the Google Maps API into our project as a React component for each company post. This component’s purpose is to ensure that users are talking about the same co-op/internship location in terms of physical geography as opposed to co-op location in A (in Boston) vs B (Los Angeles). To accomplish this, we used the Google Maps’ GeoLocation API. When creating a post about a specific company, a user will be prompted to input the company location on a mini-map component. Kyle also had the idea to allow users to toggle between how they choose their location, with the option to enter an address manually instead. This way, the user can still input a location for nontraditional scenarios such as freelancing work, remote work, or other scenarios where a location map input would not be applicable. We also have a search bar, which allows a user to type for the company they are looking for. This narrows the displayed list in real time. As the number of companies grows, this will become increasingly useful.

####- Testing:
  - Kyle created an admin account and tested deleting an entry. He also tested entering an address manually.
  - Rebekah created an admin account and tested modifying company info and deleting a company entry.
  - We asked 10 users to create companies/entries and report any issues they ran into, using mock data if they felt more comfortable doing so. By asking enough people to test the website, we discovered a bug where, due to the way we were generating a url to view a company, having a number of companies that exceeded double digits broke some of the routes to other pages. We resolved this issue and had no further trouble.

### What interesting stuff does your app include beyond the project requirements?
Beyond the project requirements, our app includes several interesting features:
- Gifs that display when a company has been found to not drug test 100% of the time
- Emojis that change depending on whether or not a company drug tests/drug tests continuously.
- A search bar that filters companies as you type. 
- We have admin level access, to help moderate content on our page
- We also dedicated a considerable amount of time to styling the app, creating a splash page and a footer disclaimer.

### What’s the complex part of your app? How did you design that component and why?
Our app has multiple complex components:

A search bar to filter companies by name.
- This component was originally built using an algorithm based on calculating the levenshtein distance between two strings (the query, and a given company in our database’s list of companies). This approach proved to be difficult to implement in React, and it was consequently scrapped for a more straightforward approach. This approach simply uses built in javascript functions to filter out the companies by name, if that company’s name does not contain the search query in it. This newly implemented version of the search bar also allows the user to display search results in real time as they type.

A google maps component to select locations for companies.
- This component’s original purpose was to show the distance between a current user and the company they were searching, however we found this to be a rather unnecessary use of our time, as the user would most likely not use it and simply put the address into a map application of their choice. Instead, we decided to put a map component in the form to create new companies. This way a user can specify a company name, and then use a  combination search bar/drag-and-drop pin on the map to specify where a company is geographically, and ensure there will be no confusion. 

Twilio SendGrid Email API
- The SendGrip API is used in our application to allow users to opt in/out of receiving email notifications. Twilio offers a generous free tier of sending 100 emails/day, which works for the scope of this project. It also meets the requirements as it is an authenticated API, and we can interact with it purely from the Elixir Backend of our app. When you create a new entry, the API checks whether anyone has enrolled in notifications for that company. If so, it sends an alert email to users who have chosen to opt in.

### What was the most significant challenge you encountered and how did you solve it?

Deployment was the most significant challenge. Part of this was fixing the Cors, Nginx, Sockets to make sure nothing broke with different URLs on the application. This was a bit of a pain to get right, specifically with the sockets for us. Also, we ran into an interesting issue that took a very long time to debug. Essentially, we had a mistaken/useless line in our elixir logic that pulled the first database entry for the notifications table. In dev, this was not an issue, as our seeds file preloaded that table with at least one value. However, seeds did not run in production, so there were no initial values. This caused an internal elixir error on posting a new entry, but there was not much helpful in the way of revealing that. The output from running the Phoenix build just showed normal POST Requests, and then passed a 404, which lead us to believe there was something wrong with routing that particular API endpoint. Eventually from more or less trial and error we located the right area and quickly spotted the bug, but it did take a very long time. 

Channels were also slightly difficult for us, as we did not realize we were incorrectly pointing the front end at the phoenix application for a while, and had a tricky time debugging. 





