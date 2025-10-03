/**
 * WFLEC 2026 Registration Form Handler
 * Google Apps Script to receive form submissions and store in Google Sheets
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Paste this code
 * 4. Click "Deploy" > "New deployment"
 * 5. Choose "Web app"
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone"
 * 8. Click "Deploy"
 * 9. Copy the Web App URL and paste it in your .env.local file
 * 10. The script will automatically create a Google Sheet on first run
 */

// Configuration
const SHEET_NAME = 'WFLEC 2026 Registrations';
const NOTIFICATION_EMAILS = [
  'richmond@radcommgroup.com',
  'rhema@radcommgroup.com'
];

/**
 * Main function to handle POST requests from the registration form
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get or create the spreadsheet
    const sheet = getOrCreateSheet();
    
    // Add the registration data
    addRegistration(sheet, data);
    
    // Send email notifications
    sendEmailNotifications(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Registration submitted successfully',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle OPTIONS requests for CORS
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

/**
 * Get existing sheet or create a new one
 */
function getOrCreateSheet() {
  let spreadsheet = getSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    initializeSheet(sheet);
  }
  
  return sheet;
}

/**
 * Get or create the spreadsheet
 */
function getSpreadsheet() {
  const files = DriveApp.getFilesByName('WFLEC 2026 Registration Data');
  
  if (files.hasNext()) {
    const file = files.next();
    return SpreadsheetApp.openById(file.getId());
  } else {
    // Create new spreadsheet
    const spreadsheet = SpreadsheetApp.create('WFLEC 2026 Registration Data');
    Logger.log('Created new spreadsheet: ' + spreadsheet.getUrl());
    return spreadsheet;
  }
}

/**
 * Initialize sheet with headers
 */
function initializeSheet(sheet) {
  const headers = [
    'Timestamp',
    'Full Name',
    'Email',
    'Phone',
    'Country',
    'Organization',
    'Job Title',
    'Attendance Type',
    'Areas of Interest',
    'Additional Message',
    'Status'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header row
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#F6C15F')
    .setFontWeight('bold')
    .setFontColor('#06121B');
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  // Auto-resize columns
  for (let i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }
}

/**
 * Add registration data to sheet
 */
function addRegistration(sheet, data) {
  const timestamp = new Date();
  
  const row = [
    timestamp,
    data.fullName || '',
    data.email || '',
    data.phone || '',
    data.country || '',
    data.organization || '',
    data.jobTitle || '',
    data.attendanceType || '',
    Array.isArray(data.interests) ? data.interests.join(', ') : '',
    data.message || '',
    'New'
  ];
  
  sheet.appendRow(row);
  
  // Format the new row
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 1, 1, row.length)
    .setBorder(true, true, true, true, false, false);
  
  // Alternate row colors for better readability
  if (lastRow % 2 === 0) {
    sheet.getRange(lastRow, 1, 1, row.length).setBackground('#f8f9fa');
  }
}

/**
 * Send email notifications to the team
 */
function sendEmailNotifications(data) {
  const subject = '🎯 New WFLEC 2026 Registration';
  
  const htmlBody = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #F6C15F, #F3911A); padding: 20px; text-align: center; }
          .header h1 { color: #06121B; margin: 0; }
          .content { padding: 20px; background: #f8f9fa; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #06121B; }
          .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #F6C15F; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
          .interests { display: inline-block; margin: 3px; padding: 5px 10px; background: #F6C15F; color: #06121B; border-radius: 15px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>New Registration Received</h1>
          <p style="color: #06121B; margin: 5px 0 0 0;">WFLEC 2026 - Abu Dhabi</p>
        </div>
        
        <div class="content">
          <h2>Personal Information</h2>
          <div class="field">
            <div class="label">Full Name</div>
            <div class="value">${data.fullName || 'N/A'}</div>
          </div>
          
          <div class="field">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${data.email}">${data.email || 'N/A'}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Phone Number</div>
            <div class="value">${data.phone || 'N/A'}</div>
          </div>
          
          <div class="field">
            <div class="label">Country</div>
            <div class="value">${data.country || 'N/A'}</div>
          </div>
          
          <h2>Professional Information</h2>
          <div class="field">
            <div class="label">Organization</div>
            <div class="value">${data.organization || 'N/A'}</div>
          </div>
          
          <div class="field">
            <div class="label">Job Title</div>
            <div class="value">${data.jobTitle || 'N/A'}</div>
          </div>
          
          <div class="field">
            <div class="label">Attendance Type</div>
            <div class="value">${formatAttendanceType(data.attendanceType)}</div>
          </div>
          
          <h2>Areas of Interest</h2>
          <div class="field">
            ${formatInterests(data.interests)}
          </div>
          
          ${data.message ? `
            <h2>Additional Message</h2>
            <div class="field">
              <div class="value">${data.message}</div>
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding: 15px; background: #fff; border: 2px solid #F6C15F; border-radius: 8px;">
            <strong>⏰ Registration Time:</strong> ${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })} (Dubai Time)
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated notification from the WFLEC 2026 registration system.</p>
          <p><a href="${getSpreadsheetUrl()}" style="color: #F6C15F;">View All Registrations in Google Sheets</a></p>
        </div>
      </body>
    </html>
  `;
  
  // Send to all notification emails
  NOTIFICATION_EMAILS.forEach(email => {
    try {
      MailApp.sendEmail({
        to: email,
        subject: subject,
        htmlBody: htmlBody
      });
    } catch (error) {
      Logger.log('Failed to send email to ' + email + ': ' + error.toString());
    }
  });
  
  // Also send confirmation email to registrant
  sendConfirmationEmail(data);
}

/**
 * Send confirmation email to the registrant
 */
function sendConfirmationEmail(data) {
  if (!data.email) return;
  
  const subject = 'Thank You for Registering - WFLEC 2026';
  
  const htmlBody = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #F6C15F, #F3911A); padding: 30px; text-align: center; }
          .header h1 { color: #06121B; margin: 0; font-size: 28px; }
          .content { padding: 30px; background: #f8f9fa; }
          .info-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #F6C15F; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; background: #06121B; color: white; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Registration Confirmed! 🎉</h1>
          <p style="color: #06121B; margin: 10px 0 0 0; font-size: 16px;">World Future Leaders in Energy Congress 2026</p>
        </div>
        
        <div class="content">
          <h2>Dear ${data.fullName},</h2>
          
          <p>Thank you for registering your interest in <strong>WFLEC 2026</strong>!</p>
          
          <p>We have successfully received your registration and our team will review your information shortly. You will receive further details about the congress via email in the coming days.</p>
          
          <div class="info-box">
            <h3 style="margin-top: 0; color: #F6C15F;">📅 Event Details</h3>
            <p><strong>Event:</strong> World Future Leaders in Energy Congress</p>
            <p><strong>Date:</strong> 10–12 March 2026</p>
            <p><strong>Location:</strong> Masdar City, Abu Dhabi, United Arab Emirates</p>
          </div>
          
          <div class="info-box">
            <h3 style="margin-top: 0; color: #F6C15F;">📝 Your Registration Summary</h3>
            <p><strong>Attendance Type:</strong> ${formatAttendanceType(data.attendanceType)}</p>
            <p><strong>Organization:</strong> ${data.organization}</p>
            <p><strong>Job Title:</strong> ${data.jobTitle}</p>
          </div>
          
          <h3>What's Next?</h3>
          <ul>
            <li>Our team will review your registration within 2-3 business days</li>
            <li>You'll receive detailed information about the congress agenda</li>
            <li>We'll send you registration confirmation and payment details (if applicable)</li>
            <li>Keep an eye on your inbox for speaker announcements and updates</li>
          </ul>
          
          <p>If you have any questions in the meantime, please don't hesitate to reach out:</p>
          <ul>
            <li>📧 <a href="mailto:richmond@radcommgroup.com">richmond@radcommgroup.com</a> (Sponsorships)</li>
            <li>📧 <a href="mailto:rhema@radcommgroup.com">rhema@radcommgroup.com</a> (Nominations)</li>
          </ul>
          
          <p style="margin-top: 30px;">We look forward to welcoming you to Abu Dhabi!</p>
          
          <p><strong>The WFLEC 2026 Team</strong></p>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} World Future Leaders in Energy Congress | Organized by RAD Communications</p>
          <p>Business Center - First Floor Incubator Building, Masdar City, Abu Dhabi, UAE</p>
        </div>
      </body>
    </html>
  `;
  
  try {
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (error) {
    Logger.log('Failed to send confirmation email: ' + error.toString());
  }
}

/**
 * Helper function to format attendance type
 */
function formatAttendanceType(type) {
  const types = {
    'delegate': 'Conference Delegate',
    'speaker': 'Speaker/Panelist',
    'sponsor': 'Sponsor/Exhibitor',
    'media': 'Media/Press',
    'student': 'Student/Academic'
  };
  return types[type] || type || 'N/A';
}

/**
 * Helper function to format interests as badges
 */
function formatInterests(interests) {
  if (!Array.isArray(interests) || interests.length === 0) {
    return '<div class="value">N/A</div>';
  }
  
  return '<div class="value">' + 
    interests.map(interest => `<span class="interests">${interest}</span>`).join(' ') +
    '</div>';
}

/**
 * Get spreadsheet URL
 */
function getSpreadsheetUrl() {
  try {
    const spreadsheet = getSpreadsheet();
    return spreadsheet.getUrl();
  } catch (error) {
    return '#';
  }
}

/**
 * Test function to verify setup
 */
function testSetup() {
  const testData = {
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '+971 50 123 4567',
    country: 'United Arab Emirates',
    organization: 'Test Company',
    jobTitle: 'Test Position',
    attendanceType: 'delegate',
    interests: ['Leadership Development', 'Innovation & Technology'],
    message: 'This is a test registration'
  };
  
  const sheet = getOrCreateSheet();
  addRegistration(sheet, testData);
  
  Logger.log('Test completed! Check your Google Sheet.');
  Logger.log('Spreadsheet URL: ' + getSpreadsheetUrl());
}
