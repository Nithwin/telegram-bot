import { NextResponse } from 'next/server';
import { getFormResponses } from '@/lib/google-sheets';
import { sendTelegramMessage } from '@/lib/telegram';
import { ALL_STUDENTS } from '@/data/students';
import { subDays, format, isSameDay, parseISO } from 'date-fns';

export const dynamic = 'force-dynamic'; // Ensure the function is not cached

export async function GET(request: Request) {
  // Check for specialized Vercel Cron header if needed for security
  // const authHeader = request.headers.get('authorization');
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) { ... }

  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) {
       return NextResponse.json({ error: 'Missing GOOGLE_SHEET_ID' }, { status: 500 });
    }

    // 1. Fetch all responses
    // Assumption: Columns are [Timestamp, RegNo, Name, ...]
    // We'll primarily trust RegNo for matching.
    const rows = await getFormResponses(spreadsheetId);
    
    // Header row might exist, so we might skip row 0 if it contains "Timestamp"
    // But let's look at the data. 
    // Format of Google Form Timestamp: "M/d/yyyy H:mm:ss" or ISO depending on locale.
    // Actually, usually it's "1/6/2025 10:00:00" string.
    
    const yesterday = subDays(new Date(), 1);
    
    // Normalize yesterday to start of day or just use day comparison
    const yesterdayStr = format(yesterday, 'yyyy-MM-dd');

    console.log(`Checking for submissions on: ${yesterdayStr}`);

    const submittedRegNos = new Set<string>();

    rows.forEach((row, index) => {
      // row[0] is Timestamp
      // row[1] is typically Email or Score, row[2] might be RegNo.
      // USER input required: Which column is RegNo?
      // Default Assumption for this logic: 
      // Column A: Timestamp
      // Column B: Reg No (Let's assume Reg No is the second column for now)
      // Column C: Name
      
      const timestampRaw = row[0];
      const regNo = row[1]?.trim(); 

      if (!timestampRaw || !regNo) return;

      // Parse timestamp
      // Flexible parsing might be needed. simpler: check if the date part matches.
      // Google Sheets often sends data as strings.
      
      const entryDate = new Date(timestampRaw);
      
      // Check if entryDate is valid
      if (isNaN(entryDate.getTime())) {
          // Try manual parsing if standard new Date() fails (e.g. DD/MM/YYYY)
          return; 
      }

      if (isSameDay(entryDate, yesterday)) {
        submittedRegNos.add(regNo);
      }
    });

    // 2. Identify missing students
    const missingStudents = ALL_STUDENTS.filter(student => !submittedRegNos.has(student.regNo));

    if (missingStudents.length === 0) {
      await sendTelegramMessage(`Good news! Everyone submitted their form for ${yesterdayStr}.`);
      return NextResponse.json({ message: 'No missing students.' });
    }

    // 3. Construct Message
    const missingList = missingStudents.map(s => `${s.name} (${s.regNo})`).join('\n');
    const message = `📢 *Missing Submissions Report* \n📅 Date: ${yesterdayStr}\n\nThe following students did not submit the form:\n\n${missingList}`;

    // 4. Send Message
    await sendTelegramMessage(message);

    return NextResponse.json({ 
      message: 'Report sent.', 
      missingCount: missingStudents.length,
      checkedDate: yesterdayStr
    });

  } catch (error: any) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
