# Trassist-An AI Driven Trash Assistant

- [Project summary](#project-summary)
  - [The issue we are hoping to solve](#the-issue-we-are-hoping-to-solve)
  - [How our technology solution can help](#how-our-technology-solution-can-help)
  - [Our idea](#our-idea)
- [Technology implementation](#technology-implementation)
  - [IBM AI service(s) used](#ibm-ai-services-used)
  - [Other IBM technology used](#other-ibm-technology-used)
  - [Solution architecture](#solution-architecture)
- [Presentation materials](#presentation-materials)
  - [Solution demo video](#solution-demo-video)
  - [Project development roadmap](#project-development-roadmap)
- [Additional details](#additional-details)
  - [How to run the project](#how-to-run-the-project)
  - [Live demo](#live-demo)
- [About this template](#about-this-template)
  - [Contributing](#contributing)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Project summary

### The issue we are hoping to solve

- Waste management is a major challenge facing both India and the world. 
- The World Bank estimates that 2.12 billion tons of waste are dumped in landfills worldwide each year, with the US, China, and India accounting for over half of this.
- Most of the waste is recyclable, and even some of it, such as plastic, can be converted into fuel. However, due to improper waste management, most of the waste ends up in landfills.
- There are four main pain points of waste management:

      1. Lack of awareness
      2. Segregation
      3. Collection
      4. Lack of traceability
- Our solution addresses all of these pain points and creates an effective waste management system that avoids trash going to landfills and promotes recycling.

### How our technology solution can help

We are designing a system to reduce trash going to landfills by collecting it at the source and transferring it to recycling stations.

### Our idea

#### Trassist Application
We have created a mobile application called Trassit to reach out to users and collect trash from them.
#### How app works?
<img width="907" alt="app_intro" src="https://github.com/ashugulati-work/Project-Trassist/assets/101620916/34119b5d-a9c8-4ab1-9bcb-dd1ae367e70f">

Above figure explain how to use app in detail.

-	After logging in, users can schedule a pickup to give trash to ‘Trassit’. To do this, users need to click and upload pictures of their household trash in the app. Once pictures get uploaded, AI-based Vision Model will run at backend to identify what type of trash user wish to provide.
-	This redirects the user to the next page, where they will see a complete list of the identified waste. Users need to add the approximate weight of each trash type. If an item is not detected by the model, or if an irrelevant item is detected, users can add or remove it manually.
-	After submitting the final list, it will show the approximate reward value based on that day's waste rate. The user can see waste rates from the rate card available on the home screen or from the side panel options. Along with the reward, it will also show how many carbon footprints will be avoided by providing trash for recycling.
-	Reward value shown is approximate and will be confirmed by the trash collector when they inspect and weigh the trash during collection. This is how pickup is scheduled. The trash collector will then contact the user and come to their doorstep to collect the segregated waste. 
-	When the trash collector arrives, the user needs to provide them with the segregated waste. The trash collector will then bag it and weigh it. Once the waste is submitted, the rewards will be added to the user's account. The user can then convert these rewards to cash or donate them to NGOs as per their convenience.
#### How is Trash processed
After collecting trash from user’s doorstep, it will be transported to specific waste recycling stations. We have a number of waste recycling stations connected with our service, and we try to reduce carbon footprints by optimizing transportation paths.

#### How rewards calculated?
- We have buying rates for each type of trash, including plastic, electronic waste, paper, metal, glass, and textile. The rate card is displayed on the homepage.
- When user provide the approximate weight of trash for each category, the total rewards will be calculated by multiplying the approximate weight by the rate of that trash on that day.
- Please note that the amount shown on the screen is an approximate amount. It will be updated by the trash collector after they weigh and inspect the trash.

#### How are funds generated to give rewards to user?
-	We are collaborating with local government Municipal corporations to implement our service.
-	Also, we will get some funds from waste recycling industries. 
-	The main source of fund will be by trading Carbon Credits. 
####Business value associated with project:
-	According to the current market scenario, data is the new fuel. We will generate a huge amount of authenticated data, which will be useful for a number of industries, from the manufacturing sector to the waste recycling sector, as well as for the government.
-	Will reduce cost of waste collection and transportation by optimizing trash flows from generation points to waste recycle stations.
-	Users will be benefited by providing waste. 
-	Ultimately, a huge amount of waste will be avoided from being dumped in landfills, which will help to make the world a better place to live.
#### Other aspects of App: 
-	Users can check how much trash they provided for recycling in the past in the history tab on the side panel.
-	The user education guide is provided on the side panel, to teach users about trash segregation and how ‘Trassit’ works.
-	Users can see comprehensive visualizations generated through the Watson-X AI visualization platform. It can consider data on waste generated individually, as well as for specific geographic locations, societies, and regions, so users and societies can compete to reduce their carbon footprints.
-	Twitter sentiments, emotions, and keywords around the topic of Waste Management are generated using IBM Natural Language Understanding and are shown under Trending tab on side panel. 



## Technology implementation

### IBM AI service(s) used

- [IBM Natural Language Understanding](https://cloud.ibm.com/catalog/services/natural-language-understanding) - The **Trending** tab in our mobile app displays the trending topics, distribution of emotions and sentiments around waste management extracted using this service.
- [watsonx.ai](https://dataplatform.cloud.ibm.com/wx/home?context=wx) - The **Stats** tab in our mobile app displays a pie chart and scatter plot using vizualization of this service based on the stored data.

### Other IBM technology used

- [IBM Cloundant](https://cloud.ibm.com/catalog/services/cloudant) - This service helps us store our user base data along with captured trash pictures.
- [IBM Cloud Object Storage](https://cloud.ibm.com/objectstorage/create) - This service helps us save vizualizations created using watsonx.ai service and make it available for our mobile app.

### Solution architecture

![Trassist_architecture](https://github.com/ashugulati-work/Project-Trassist/assets/125637093/0694d8b2-0d5f-4ad7-961b-42b18a52769c)


Diagram and step-by-step description of the flow of our solution:

1. The user navigates to the mobile application and uploads trash pictures.
2. Hugging Face OpenAI Vision Model processes the images and identifies the trash.
3. The app stores the user data within IBM Cloudant for analysis.
4. IBM watsonx.ai vizualizes the stored data from Cloudant and stores as objects in IBM Cloud Object Storage.
5. IBM Natural Language Processing extracts keywords, sentiments, and emotions for waste management trends and awareness.

## Presentation materials

_INSTRUCTIONS: The following deliverables should be officially posted to your My Team > Submissions section of the [Call for Code Global Challenge resources site](https://cfc-prod.skillsnetwork.site/), but you can also include them here for completeness. Replace the examples seen here with your own deliverable links._

### Solution demo video

[![Watch the video](https://raw.githubusercontent.com/Liquid-Prep/Liquid-Prep/main/images/readme/IBM-interview-video-image.png)](https://youtu.be/vOgCOoy_Bx0)

### Project development roadmap

The project currently does the following things.

- User can use Trassit app to schedule a request for trash collection. 
- AI-based Vision Model runs at backend and detects trash type from images. 
- App calculates and shows approximate values of rewards and Carbon footprint saved using provided weight of trash. 
- The Trending tab in app displays the trending topics, distribution of emotions and sentiments around waste management extracted using IBM Natural Language Understanding
- Stats tab in app displays a pie chart and scatter plot of available data using visualization generated through the Watson-X AI

In the future we plan to...

See below for our proposed schedule on next steps after Call for Code 2023 submission.
<img width="658" alt="Roadmap" src="https://github.com/ashugulati-work/Project-Trassist/assets/101620916/ec20f93f-a5e9-46ab-bd92-9aace5f58302">


## Additional details

_INSTRUCTIONS: The following deliverables are suggested, but **optional**. Additional details like this can help the judges better review your solution. Remove any sections you are not using._

### How to run the project

INSTRUCTIONS: In this section you add the instructions to run your project on your local machine for development and testing purposes. You can also add instructions on how to deploy the project in production.

### Live demo

You can find a running system to test at...

See our [description document](./docs/DESCRIPTION.md) for log in credentials.

---

_INSTRUCTIONS: You can remove the below section from your specific project README._

## About this template

### Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

### Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

### Authors

<a href="https://github.com/Call-for-Code/Project-Sample/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=Call-for-Code/Project-Sample" />
</a>

- **Billie Thompson** - _Initial work_ - [PurpleBooth](https://github.com/PurpleBooth)

### License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

- Based on [Billie Thompson's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).
