# Project Description
When email chains become too long, it becomes increasingly difficult to extract relevant information and context. This is due to excessive indentation, multiple participants, and the presence of redundant or unrelated content. The problem worsens when someone new is looped into the conversation mid-thread.

EmailGPT is a Chrome extension that solves this problem by providing users with AI-powered summaries, message-by-message breakdowns, and action item highlights of long email chains powered by the user's Gemini API key. 

# Setup Instructions
- navigate to https://github.com/tunamoon/emailGPT
- using terminal, navigate to the correct folder
- git clone https://github.com/tunamoon/emailGPT.git
- in the root folder (EmailGPT), run npm install
- In Google Chrome, go to chrome://extensions/
- Turn on "Developer Mode" and click "Load Unpacked"
- Select our repository folder (EmailGPT) and then the dist folder
- Turn our extension on with the toggle
- Find our feature in the top right corner, with all your other favorite extensions
- Enjoy all of the fabulous features!


# Final list of implemented features
- Integration with Gemini API key access
- A high-level summary of the entire email thread
- A chronological breakdown of individual messages, highlighting unique and relevant content
- Extraction and display of action items or requests of email chain
- Suggested response to the most recent email with all context
- A clean, non-disruptive overlay UI that appears within email for convenient access
- Saved most recent analysis for ease of access

# Color Palette
- HEX: EB5A36
- HEX: 4285F4
- HEX: 99B7E7

# Individual Contributions
- Luna: Github Repo, Original UI and functional layout, managing errors by users, readme, about button, milestone demo video
- Lisa: slides, testing documentation, history feature
- Emma: Landing Page with hand-drawn icons, Logo/brainding creation, team management/communication, summary feature, UX/UI redesign
- Allen: Integrate with API key,  summarizing feature, action items feature, message by message breakdown feature, saving most recent entry and result
- All: manage pull requests
  
# Future Work
- Customizeable analysis and prompting
- Integrating with several LLM's and not just Gemini
- Integrating with other communication methods like slack, messages
- Scraping email threads ourselves and not require user to copy and paste

# Working Instructions
- Work on separate branches
- every time you finish working
     1. `git fetch origin` so you're on latest remote version
     2. `git status` optional, to check whether you're on the right branch, what changes you've made that's different from local
     3. `git pull origin main` try to complete merge requests yourself
     4. `git add .`
     5. `git commit -m "whatever you did"`
     6. `git push origin [your current branch]`
- make a pull request, add luna as a reviewer
- try not to push directly to main if possible
- to update the actual chrome extension, rerun `npm run build`
- run `npm run dev` to find the local version that updates immediately after you change code
