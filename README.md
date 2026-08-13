# <img width="480" alt="Sapphire Launcher" src="https://github.com/user-attachments/assets/da11fefd-e4c5-496c-9192-b103f32b64e3" />
Deploying to **Cloudflare Pages** is reccomended!  
[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cyanpurr/Sapphire)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/cyanpurr/Sapphire)
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cyanpurr/Sapphire)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/cyanpurr/Sapphire)  
[![Fork on GitHub](https://img.shields.io/badge/Fork_on_GitHub-333?logo=github)](https://github.com/cyanpurr/Sapphire/fork)  
https://サファイア.cyanpurr.cc.cd - Instance 1  
https://s.cyanpurr.cc.cd - Instance 2  
https://sl.cyanpurr.cc.cd - Instance 3  
https://chronos-sapphire.cyanpurr.cc.cd - Instance 4  
https://math.cyanpurr.cc.cd - Instance 5  
https://school.cyanpurr.cc.cd - Instance 6  
https://edu.cyanpurr.cc.cd - Instance 7  
## What is this?
**Sapphire** is an app that runs inside of your browser and allows you to load custom HTML5 Apps with/without an internet connection.  
  
This works using **Origin Private File System (OPFS)** which is a Storage API that allows website developers to store data in a virtual filesystem that runs directly in the browser, perfect for this project of mine!
## But why?
I'm sick and tired of having to search for different unblocked links to different utilities that I do need for my own personal work and hobbies along with searching for games. Instead of hunting down a ton of links for each game and everything, I have made this process a bit easier by having it all in one place. **(It also serves as a replacement for my huge bookmark folder full of game sites)**
## How do I use this?
Go to any instance (a.k.a website) running **Sapphire** such as the official one for example and you will be greeted with a prompt to install the App which is recommended to do but it's entirely up to you.  
  
After installing the app or ignoring the prompt then you will successfully be inside the launcher where you can run your downloaded apps, get some new apps or configure **Sapphire** to your liking.  
  
If there are no apps that show up on the Download tab then you should add an Index, Indexes are list of apps and where to download it for using in **Sapphire**. After adding an Index, some apps will show up in the Download tab if fetching was successful!
  
After downloading some apps, you can go back to the Installed tab and run them or delete what you don't like. Check out the Scripts menu for running custom scripts inside apps!
## For Developers
### Support The Project!
If you're a nerd like me and want to help out, pull requests are welcome for the following:
- Bugs / Issues
- Indexes ***(add your own at the bottom of /js/main.js)***
  
Pull requests are **NOT** for:
- Implementing new features **(Use Issues for suggestions and how you would implement them)**
- Adding indexes hosted by someone with a very small following **(I can't trust everyone on here)**
- Adding indexes hosted on either cloud storage services, temporary file upload sites, git repositories, webhosting services that don't allow **Sapphire** indexes. **(You must host your own website on your own domain [subdomains are allowed if it belongs to a "free subdomain" service and not part of a hosting provider] where it won't suddenly shut down or run into issues)**
### Creating an Index
On your website or a file hosting site that allows for direct links such as Dropbox for example, create a new file called `index.json` or any name you want then fill it out in this format:
```json
[
  {
    "icon": "LINK TO IMAGE FILE",
    "name": "NAME OF APPLICATION",
    "description": "A SHORT DESCRIPTION OF YOUR APPLICATION",
    "zipfile": "A DIRECT LINK TO A ZIP FILE CONTAINING YOUR APPLICATION"
  },
  {
    "icon": "/index/icons/cookie-clicker.png",
    "name": "Cookie Clicker",
    "description": "Click cookies.",
    "zipfile": "/index/cookie-clicker.zip"
  }
]
```
### Creating an Application
Create a .ZIP file containing `index.html` at the root.  
Here's what your zips file structure should look like:
```js
application.zip
│   index.html
│   script.js
│
├───images
│   │   circle.png
│   │   square.png
│   │   triangle.png
│   │   icon.png
│   │   tux_penguin.png
```
