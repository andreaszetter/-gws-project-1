# Form Automation System

This directory contains the automation system for processing Google Form submissions and automatically committing them to the GitHub repository.

## 🎯 Purpose

Automatically process game idea submissions from the Google Form and commit them to `IDEAS.md` without manual intervention.

## 📋 Components

1. **FormToGitHub.gs** - Google Apps Script that handles automation
2. **AUTOMATION_SETUP.md** - Complete setup guide
3. **AUTOMATION_QUICK_REFERENCE.md** - Quick reference for maintenance

## 🚀 Quick Start

**Prerequisites:**
- Google Form already created and working
- Form responses linked to Google Sheets
- GitHub repository admin access

**Setup Steps:**
1. Read [AUTOMATION_SETUP.md](AUTOMATION_SETUP.md)
2. Create GitHub Personal Access Token
3. Add Apps Script to your Google Sheet
4. Configure script properties
5. Set up the form submit trigger
6. Test the automation

**Time required:** ~15-20 minutes

## 🔄 How It Works

```
┌─────────────┐
│   User      │
│ Fills Form  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Google    │
│    Form     │
└──────┬──────┘
       │ Submits
       ▼
┌─────────────┐
│   Google    │
│   Sheets    │ ← Stores responses
└──────┬──────┘
       │
       │ Triggers
       ▼
┌─────────────┐
│    Apps     │
│   Script    │ ← FormToGitHub.gs
└──────┬──────┘
       │
       │ 1. Extracts form data
       │ 2. Formats as markdown
       │ 3. Calls GitHub API
       ▼
┌─────────────┐
│   GitHub    │
│     API     │
└──────┬──────┘
       │
       │ Creates commit
       ▼
┌─────────────┐
│  IDEAS.md   │ ← New idea added!
└─────────────┘
```

**Processing time:** 30-60 seconds from submission to commit

## 📁 Files Reference

| File | Purpose | Location |
|------|---------|----------|
| `FormToGitHub.gs` | Main automation script | Copy to Apps Script editor |
| `AUTOMATION_SETUP.md` | Setup instructions | Read first for setup |
| `AUTOMATION_QUICK_REFERENCE.md` | Maintenance guide | Use for ongoing maintenance |
| `FORM_SETUP.md` | Form creation guide | For initial form setup |

## ⚙️ Configuration

The script requires these properties set in Apps Script:

```
GITHUB_TOKEN     Your GitHub Personal Access Token
GITHUB_OWNER     Repository owner (username/org)
GITHUB_REPO      Repository name
GITHUB_BRANCH    Target branch (usually 'main')
```

See [AUTOMATION_SETUP.md](AUTOMATION_SETUP.md) for detailed configuration steps.

## 🧪 Testing

### Method 1: Test Function
1. Open Apps Script editor
2. Select `testFormSubmission` function
3. Click Run
4. Check execution log and repository

### Method 2: Real Submission
1. Fill out the Google Form with test data
2. Mark it clearly (e.g., "TEST - Delete this")
3. Wait 1 minute
4. Check IDEAS.md in repository

### Method 3: Configuration Check
1. Open Apps Script editor
2. Select `testConfiguration` function
3. Click Run
4. Review execution log for setup verification

## 🔧 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Ideas not appearing | Check Apps Script Executions for errors |
| "Token expired" error | Generate new token, update script properties |
| "API rate limit" | Wait a few minutes, GitHub has rate limits |
| Duplicate submissions | Delete extra triggers, keep only one |
| Script not running | Verify trigger is set up correctly |

### Detailed Logs

1. Google Sheet → Extensions → Apps Script
2. Click **Executions** (📋 icon)
3. Click on execution to see details
4. Review error messages and stack traces

## 🔐 Security

**Best Practices:**
- ✅ Use script properties for sensitive data
- ✅ Never hardcode tokens in the script
- ✅ Set token expiration dates
- ✅ Use tokens with minimal required permissions
- ✅ Regularly review execution logs
- ✅ Limit spreadsheet edit access

**Token Permissions Required:**
- `repo` scope (full control of repositories)

## 📊 Monitoring

### Regular Checks (Monthly)
- ✅ Review execution log for errors
- ✅ Verify GitHub token hasn't expired
- ✅ Check IDEAS.md formatting
- ✅ Test with a submission

### What to Watch For
- ❌ Failed executions in log
- ❌ Missing submissions in IDEAS.md
- ❌ Malformed markdown
- ❌ API errors

## 🔄 Maintenance

### Updating the Script
1. Edit in Apps Script editor
2. Save changes (Ctrl/Cmd+S)
3. Test with test function or form submission
4. Changes take effect immediately

### Token Renewal
When your token expires:
1. Generate new token at GitHub
2. Update `GITHUB_TOKEN` in script properties
3. Test with `testConfiguration` function

### Pausing Automation
1. Apps Script → Triggers
2. Delete the form submit trigger
3. Process submissions manually if needed

### Resuming Automation
1. Apps Script → Triggers
2. Add trigger for `onFormSubmit`
3. Set to run on form submit
4. Test with submission

## 📚 Additional Resources

- [GitHub API Documentation](https://docs.github.com/en/rest)
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Forms Triggers](https://developers.google.com/apps-script/guides/triggers/events)

## 💡 Customization Ideas

### Custom Formatting
Modify `formatAsMarkdown()` function to change how ideas appear in IDEAS.md.

### Different Target Files
Update `commitToGitHub()` to route ideas to different files based on category.

### Email Notifications
Add email alerts when new ideas are submitted:
```javascript
MailApp.sendEmail({
  to: "your-email@example.com",
  subject: "New Idea: " + title,
  body: markdown
});
```

### Pull Requests Instead of Direct Commits
Modify to create PRs for review before merging:
- Use GitHub PR API instead of direct commits
- Allows review before ideas go live
- Good for teams that want approval process

## 📝 Support

**For setup help:**
- See [AUTOMATION_SETUP.md](AUTOMATION_SETUP.md)
- Check troubleshooting section
- Review execution logs

**For maintenance:**
- See [AUTOMATION_QUICK_REFERENCE.md](AUTOMATION_QUICK_REFERENCE.md)
- Check common tasks section

**For errors:**
- Check Apps Script execution log
- Verify script properties
- Test configuration function
- Check GitHub API status

## 📊 Statistics

**Typical Performance:**
- Execution time: <1 second
- GitHub API calls: 2 per submission (GET + PUT)
- Processing delay: 30-60 seconds
- Success rate: >99% (with proper setup)

**Limitations:**
- GitHub API rate limit: 5000 requests/hour (generous)
- Form submission rate: No practical limit
- Script quota: 90 min/day execution time (more than enough)

---

**Ready to set up?** → Start with [AUTOMATION_SETUP.md](AUTOMATION_SETUP.md)

**Already set up?** → Use [AUTOMATION_QUICK_REFERENCE.md](AUTOMATION_QUICK_REFERENCE.md)
