import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

export async function getGoogleSheetsClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Missing Google Service Account credentials');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: SCOPES,
  });

  return google.sheets({ version: 'v4', auth });
}

export async function getFormResponses(spreadsheetId: string, range: string = 'Form Responses 1!A:E') {
  const sheets = await getGoogleSheetsClient();
  
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values || [];
  } catch (error) {
    console.error('Error fetching sheet values:', error);
    throw error;
  }
}
