# Project Description
When email chains become too long, it becomes increasingly difficult to extract relevant information and context. This is due to excessive indentation, multiple participants, and the presence of redundant or unrelated content. The problem worsens when someone new is looped into the conversation mid-thread.

EmailGPT is a Chrome extension for emails that solves this problem by providing users with:
- A concise summary of the entire thread
- A breakdown of each message, with distractions like pleasantries or repeated information filtered out
- Users can also engage Gemini for suggested replies or to gain clarity about the conversation's content and trajectory.

# Final list of implemented features
- A high-level summary of the entire email thread
- A chronological breakdown of individual messages, highlighting unique and relevant content
- Extraction and display of action items or requests
- Integration with Gemini for suggested responses or decision-making guidance
- A clean, non-disruptive overlay UI that appears within email for convenient access
- Saved most recent entry for ease of access, and if user accidentally clicks out

# Setup Instructions
Work on separate branches
- every time you finish working
     1. `git fetch origin` so you're on latest remote version
     2. `git status` optional, to check whether you're on the right branch, what changes you've made that's different from local
     3. `git pull origin main` try to complete merge requests yourself
     5. `git add .`
     6. `git commit -m "whatever you did"`
     7. `git push origin [your current branch]`
- make a pull request, add luna as a reviewer
- try not to push directly to main if possible
Updating chrome extension
- to update the actual chrome extension, rerun `npm run build`
- run `npm run dev` to find the local version that updates immediately after you change code
  - chrome storage doesn't work for local versions though p sure

# Colors
- gmail blue, orange, white

# Individual Contributions
- Luna: UI pages, managing errors by users, readme, about button, milestone demo video
- Lisa: slides, testing documentation
- Emma: Landing Page, team management/communication
- Allen: Integrate with api key, implement summarizing, action items, message by message breakdown, saving most recent entry and result
- All: manage pull requests
  
# Future Work
- Integrating with several LLM's and not just Gemini
- Integrating with other communication methods like slack, messages
- Scraping email threads ourselves and not require user to copy and paste
