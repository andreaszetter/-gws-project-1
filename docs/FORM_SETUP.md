# Setting Up the Contribution Form

This document explains how to set up and manage the Google Form for easy game idea contributions.

> **⚠️ IMPORTANT:** After creating your form, don't forget to replace the placeholder URLs in the documentation!  
> See [TODO_SETUP_FORM.md](TODO_SETUP_FORM.md) for instructions on replacing placeholder URLs with your actual form link.

## Creating the Google Form

1. Go to [Google Forms](https://forms.google.com/)
2. Create a new form with the following fields:

### Form Title
"Game Ideas Contribution Form"

### Form Description
"Share your game ideas, concepts, and inspirations with the team! This form makes it easy to contribute without needing to use Git or GitHub."

### Form Questions

**1. Your Name (Optional)**
- Type: Short answer
- Description: "Your name or alias (optional - you can contribute anonymously!)"

**2. Idea Title**
- Type: Short answer
- Required: Yes
- Description: "Give your idea a catchy name"

**3. Core Concept**
- Type: Paragraph
- Required: Yes
- Description: "Briefly describe your game idea"

**4. Category**
- Type: Multiple choice
- Required: Yes
- Options:
  - Game Mechanic
  - Narrative/Story
  - Technical Idea
  - General Concept
  - Art/Visual Style
  - Audio/Music
  - Other

**5. Detailed Description**
- Type: Paragraph
- Required: No
- Description: "Add any additional details, features, or thoughts about your idea"

**6. Genre/Type**
- Type: Short answer
- Required: No
- Description: "What genre or type of game? (e.g., Puzzle, RPG, Platformer)"

**7. Inspiration**
- Type: Paragraph
- Required: No
- Description: "What inspired this idea? Any games, movies, or experiences that influenced it?"

**8. Priority/Excitement**
- Type: Linear scale (1-5)
- Required: No
- Description: "How excited are you about this idea?"
- Scale: 1 (Just a thought) to 5 (Super excited!)

**9. Additional Comments**
- Type: Paragraph
- Required: No
- Description: "Anything else you'd like to add?"

## Form Settings

### General Settings
- ✅ Collect email addresses: Optional (set to "Don't collect")
- ✅ Allow response editing after submit
- ✅ Show link to submit another response

### Presentation Settings
- ✅ Show progress bar
- Confirmation message: "Thanks for sharing your idea! We'll review it and add it to the repository soon. 🎮"

## Sharing the Form

1. Click "Send" button in the form editor
2. Choose "Link" option
3. Check "Shorten URL" for easier sharing
4. Copy the link
5. Add the link to:
   - README.md (in the "Getting Started" section)
   - CONTRIBUTING.md (as a new contribution method)

## Processing Form Submissions

### Automated Processing (Future Enhancement)
You can set up Google Forms to send responses to a Google Sheet, which can then trigger automated actions:
- Responses → Google Sheets
- Google Apps Script → Format submissions
- GitHub API → Create automated PR or issue with the idea

### Manual Processing (Current Method)
1. Regularly check form responses (Settings → Responses tab)
2. Review new ideas
3. Add them to IDEAS.md or create detailed docs in the appropriate folder
4. Credit the contributor if they provided their name
5. Thank contributors and notify them when their idea is added

## Example Workflow

1. Contributor fills out form
2. Form maintainer receives notification (can be configured)
3. Maintainer reviews submission
4. Maintainer adds idea to repository:
   ```markdown
   - **Idea Name**: [From form]
   - **Core Concept**: [From form]
   - **Genre/Type**: [From form]
   - **Key Features**: [From detailed description]
   - **Inspiration**: [From form]
   - **Added by**: [From name field] - [Submission date]
   ```
5. Maintainer commits changes with message like "Add idea from form: [Idea Title]"

## Benefits of Using the Form

✅ **Lower barrier to entry**: No Git knowledge required
✅ **Mobile-friendly**: Easy to submit ideas on the go
✅ **Structured input**: Consistent format for all ideas
✅ **Anonymous options**: Contributors can share without revealing identity
✅ **Quick**: Takes just a few minutes to submit an idea
✅ **Accessible**: Anyone with the link can contribute

## Form Maintenance

- Review form responses at least weekly
- Keep form link up to date in all documentation
- Consider analytics to see which types of ideas are most common
- Update form questions based on team feedback

---

*Last updated: [Date when form is created]*
