# Automating Form Submissions to GitHub

This guide explains how to set up automatic processing of Google Form submissions to your GitHub repository.

## Overview

When someone submits an idea through the Google Form, the automation will:
1. Capture the form response
2. Format it as markdown
3. Automatically create a commit to your GitHub repository
4. Add the idea to IDEAS.md

No manual intervention needed! ✨

## Prerequisites

Before starting, make sure you have:
- ✅ A Google Form set up (see [FORM_SETUP.md](FORM_SETUP.md))
- ✅ Responses linked to a Google Sheet
- ✅ Admin access to the GitHub repository
- ✅ About 15-20 minutes for setup

## Step 1: Link Form to Google Sheets

If you haven't already:

1. Open your Google Form
2. Go to the "Responses" tab
3. Click the Google Sheets icon (📊)
4. Choose "Create a new spreadsheet"
5. Name it something like "Game Ideas - Form Responses"

This creates a spreadsheet that automatically captures all form submissions.

## Step 2: Create a GitHub Personal Access Token

The automation needs permission to commit to your repository.

1. Go to GitHub Settings → [Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a descriptive name: "Google Forms Automation"
4. Set expiration (recommend: 90 days or 1 year)
5. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - This includes: `repo:status`, `repo_deployment`, `public_repo`, `repo:invite`, `security_events`
6. Click "Generate token"
7. **IMPORTANT**: Copy the token immediately - you won't see it again!
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Save it somewhere secure temporarily

## Step 3: Add the Apps Script to Your Spreadsheet

1. Open the Google Sheet (the one linked to your form)
2. Click **Extensions** → **Apps Script**
3. Delete any existing code in the editor
4. Copy and paste the script from [FormToGitHub.gs](FormToGitHub.gs)
5. Click the save icon (💾) or Ctrl/Cmd+S
6. Name the project: "Form to GitHub Automation"

## Step 4: Configure Script Properties

The script needs to know your repository details and GitHub token.

1. In the Apps Script editor, click **Project Settings** (⚙️ icon on the left)
2. Scroll down to **Script Properties**
3. Click **Add script property** and add these properties:

   | Property Name | Value | Example |
   |--------------|-------|---------|
   | `GITHUB_TOKEN` | Your GitHub token from Step 2 | `ghp_xxxxxxxxxxxx` |
   | `GITHUB_OWNER` | Your GitHub username or organization | `andreaszetter` |
   | `GITHUB_REPO` | Repository name | `-gws-project-1` |
   | `GITHUB_BRANCH` | Branch to commit to | `main` |
   | `GITHUB_FILE_PATH` | *(Optional)* File to update | `IDEAS.md` (default) |

4. Click "Save script properties"

**⚠️ Security Note**: Script properties are encrypted and only accessible to the script. Never hardcode your token in the script itself!

**💡 Optional Property**: The `GITHUB_FILE_PATH` property is optional. If not set, ideas will be added to `IDEAS.md` by default. You can set this if you want to use a different file.

## Step 5: Set Up the Form Trigger

Now we'll make the script run automatically when someone submits the form.

1. In the Apps Script editor, click **Triggers** (⏰ icon on the left)
2. Click **+ Add Trigger** (bottom right)
3. Configure the trigger:
   - **Choose which function to run**: `onFormSubmit`
   - **Choose which deployment should run**: `Head`
   - **Select event source**: `From spreadsheet`
   - **Select event type**: `On form submit`
4. Click **Save**
5. You may need to authorize the script:
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to [Project name] (unsafe)"
   - Click "Allow"

## Step 6: Test the Automation

Let's make sure everything works!

1. Go to your Google Form
2. Submit a test idea with clearly marked test data:
   - Example title: "TEST - Delete this idea"
   - Fill in other fields with test data
3. Wait about 30-60 seconds
4. Check your GitHub repository:
   - Go to the repository on GitHub
   - Check recent commits - you should see a new commit like "Add idea from form: TEST - Delete this idea"
   - Open IDEAS.md - your test idea should be at the bottom

If it works, you can delete the test idea from IDEAS.md!

## Troubleshooting

### The script didn't run

**Check the execution log:**
1. In Apps Script, click **Executions** (📋 icon on the left)
2. Look for recent executions and any errors

**Common issues:**
- **Token expired**: Generate a new token and update script properties
- **Wrong repository details**: Double-check GITHUB_OWNER and GITHUB_REPO
- **Permissions**: Make sure the token has `repo` scope
- **Branch doesn't exist**: Verify GITHUB_BRANCH is correct

### Error: "API rate limit exceeded"

GitHub has rate limits. The script is designed to stay within limits, but if you're doing many tests:
- Wait a few minutes between tests
- Consider using a different branch for testing

### Ideas are being added twice

Check your triggers:
1. Go to **Triggers** in Apps Script
2. Delete any duplicate triggers
3. Keep only one "On form submit" trigger

### Need to see detailed errors?

1. Open Apps Script editor
2. Click **Executions**
3. Click on a failed execution to see the error details

## Maintaining the Automation

### Regular Maintenance

- **Token Expiration**: When your GitHub token expires, generate a new one and update script properties
- **Check Executions**: Occasionally review the execution log to ensure smooth operation
- **Sheet Organization**: Periodically archive old form responses if the sheet gets large

### Updating the Script

If you need to modify the automation:
1. Edit the script in Apps Script editor
2. Save changes
3. Test with a form submission
4. The trigger will automatically use the updated version

### Pausing the Automation

If you need to temporarily pause:
1. Go to **Triggers** in Apps Script
2. Click the three dots (⋮) next to the trigger
3. Click "Delete trigger"

To resume, recreate the trigger using Step 5 above.

## Advanced Options

### Customizing the Markdown Format

Edit the `formatAsMarkdown()` function in the script to change how ideas appear in IDEAS.md.

### Adding to Different Files

Modify the `commitToGitHub()` function to commit to different files based on the idea category.

### Sending Notifications

Add email notifications by including:
```javascript
MailApp.sendEmail({
  to: "your-email@example.com",
  subject: "New Idea Submitted: " + title,
  body: "A new idea has been added to the repository."
});
```

### Creating Pull Requests Instead of Direct Commits

For review before merging, modify the script to use GitHub's Pull Request API instead of direct commits.

## Security Best Practices

✅ **DO**:
- Use script properties for sensitive data
- Set token expiration dates
- Use tokens with minimal necessary permissions
- Regularly review who has access to the spreadsheet
- Monitor the execution log for unusual activity

❌ **DON'T**:
- Share your GitHub token
- Hardcode tokens in the script
- Give spreadsheet edit access to untrusted users
- Use tokens with more permissions than needed

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review execution logs for error details
3. Verify all script properties are correct
4. Test with a simple form submission

## Summary

Once set up, the automation:
- ✅ Runs automatically on every form submission
- ✅ Commits new ideas to GitHub within 1 minute
- ✅ Properly formats ideas in markdown
- ✅ Requires no manual intervention
- ✅ Can be paused/resumed as needed

You've successfully automated your form! Contributors can now submit ideas that automatically appear in your repository. 🎉

---

*Last updated: December 2024*
