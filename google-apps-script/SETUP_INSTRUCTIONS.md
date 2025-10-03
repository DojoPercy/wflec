# Google Apps Script Setup Instructions

## Step-by-Step Guide to Deploy the Backend

### 1. Create Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com/)
2. Click **"New project"**
3. Name your project: `WFLEC 2026 Registration Handler`

### 2. Add the Code

1. Delete any default code in the editor
2. Copy the entire contents of `Code.gs` from this folder
3. Paste it into the script editor
4. Click **Save** (disk icon or Ctrl+S)

### 3. Deploy as Web App

1. Click **Deploy** > **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **"Web app"**
4. Configure the deployment:
   - **Description**: `WFLEC Registration API v1`
   - **Execute as**: Select **"Me (your-email@gmail.com)"**
   - **Who has access**: Select **"Anyone"**
5. Click **Deploy**
6. You may need to authorize the script:
   - Click **"Authorize access"**
   - Choose your Google account
   - Click **"Advanced"** if you see a warning
   - Click **"Go to WFLEC 2026 Registration Handler (unsafe)"**
   - Click **"Allow"**
7. **IMPORTANT**: Copy the **Web App URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```

### 4. Test the Deployment

1. In the Apps Script editor, select the `testSetup` function from the dropdown
2. Click **Run** (▶️ play button)
3. Check the **Execution log** at the bottom
4. You should see a message with the Google Sheet URL
5. Open the Google Sheet - it should have a new test registration

### 5. Configure Your Next.js App

1. In your project root, create a file named `.env.local`:
   ```bash
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
2. Replace `YOUR_SCRIPT_ID` with your actual Web App URL from step 3
3. Restart your Next.js development server

### 6. Update Notification Emails (Optional)

If you want to change the email addresses that receive notifications:

1. In `Code.gs`, find line 19:
   ```javascript
   const NOTIFICATION_EMAILS = [
     'richmond@radcommgroup.com',
     'rhema@radcommgroup.com'
   ];
   ```
2. Update the email addresses
3. Save and redeploy (Deploy > Manage deployments > Edit > Version: New version > Deploy)

## What Gets Created

### Google Sheet Structure

The script automatically creates a Google Sheet with these columns:

| Timestamp | Full Name | Email | Phone | Country | Organization | Job Title | Attendance Type | Areas of Interest | Additional Message | Status |
|-----------|-----------|-------|-------|---------|--------------|-----------|-----------------|-------------------|-------------------|--------|

- **Automatic formatting**: Headers in brand colors, alternating row colors
- **Data validation**: All fields properly stored
- **Status tracking**: Each registration starts with "New" status

### Email Notifications

**Team Notifications** (sent to Richmond & Rhema):
- Beautiful HTML formatted email
- All registration details
- Direct link to Google Sheet
- Timestamp in Dubai timezone

**Registrant Confirmation** (sent to person who registered):
- Professional confirmation email
- Registration summary
- Event details
- Next steps information
- Contact information

## Troubleshooting

### "Authorization Required" Error
- Make sure you clicked "Allow" during authorization
- The script needs permission to:
  - Create/access Google Sheets
  - Send emails
  - Access Google Drive

### "Script function not found" Error
- Make sure you deployed as "Web app", not "API executable"
- Check that "Execute as" is set to "Me"

### No Email Received
- Check spam/junk folder
- Verify email addresses in `NOTIFICATION_EMAILS`
- Check Apps Script execution logs for errors

### CORS Errors
- The script automatically handles CORS
- Make sure you deployed with "Anyone" access
- Clear browser cache and try again

### Data Not Appearing in Sheet
1. Go to [Apps Script](https://script.google.com/)
2. Open your project
3. Click **"Executions"** in left sidebar
4. Check for any failed executions and error messages

## Security Notes

- ✅ The Web App URL is public but only accepts POST requests
- ✅ No sensitive data is exposed in the URL
- ✅ All data goes directly to your Google Sheet (only you can access)
- ✅ Google handles all authentication and security
- ✅ Rate limiting is handled by Google Apps Script quotas

## Google Apps Script Quotas (Free Tier)

- **Email sends per day**: 100
- **Script runtime**: 6 minutes per execution
- **Triggers total runtime**: 90 minutes per day

For WFLEC, these limits are more than sufficient. If you exceed them, you can:
1. Use a Google Workspace account (higher quotas)
2. Implement a queuing system
3. Use a paid service like SendGrid for emails

## Making Changes

### To Update the Script:
1. Go to your Apps Script project
2. Make changes to the code
3. Save
4. Click **Deploy** > **Manage deployments**
5. Click the pencil icon ✏️ to edit
6. Under "Version", select **"New version"**
7. Click **Deploy**

**Note**: The Web App URL stays the same, so you don't need to update your `.env.local` file.

## Advanced Features

### Export to CSV
The Google Sheet can be exported as CSV anytime:
1. Open the sheet
2. File > Download > Comma Separated Values (.csv)

### Connect to CRM
You can use Google Sheets integrations to sync with:
- HubSpot
- Salesforce
- Zapier
- Make (formerly Integromat)

### Analytics Dashboard
Create a dashboard in Google Sheets:
1. Add a new sheet tab
2. Use formulas to analyze registrations
3. Create charts for attendance types, countries, etc.

## Support

If you encounter any issues:
1. Check the Execution log in Apps Script
2. Verify all settings match this guide
3. Test with the `testSetup()` function
4. Check that your Google account has permissions to create Sheets and send emails
