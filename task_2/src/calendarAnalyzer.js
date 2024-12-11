import { google } from 'googleapis';
import { parseISO } from 'date-fns';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

class CalendarAnalyzer {
  constructor() {
    try {
      const credentials = JSON.parse(
        fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8')
      );
      
      const auth = new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        ['https://www.googleapis.com/auth/calendar.readonly']
      );

      this.calendar = google.calendar({ version: 'v3', auth });
      
    } catch (error) {
      console.error('Error initialyzing CalendarAnalyzer:', error);
      throw error;
    }
  }

  async getFreeBusyIntervals(startTime, endTime) {
    try {
      const calendarId = process.env.GOOGLE_CALENDAR_ID;
      
      if (!calendarId || !startTime || !endTime) {
        throw new Error('Missing required parametes');
      }

      if (endTime <= startTime) {
        throw new Error('End time must be after start time');
      }

      const response = await this.calendar.freebusy.query({
        requestBody: {
          timeMin: startTime.toISOString(),
          timeMax: endTime.toISOString(),
          items: [{ id: calendarId }]
        }
      });

      const busyIntervals = response.data.calendars[calendarId].busy;
      const result = [];
      let currentTime = startTime;

      busyIntervals.forEach(busy => {
        const busyStart = parseISO(busy.start);
        const busyEnd = parseISO(busy.end);

        if (currentTime < busyStart) {
          result.push({
            start: currentTime,
            end: busyStart,
            status: 'free'
          });
        }

        result.push({
          start: busyStart,
          end: busyEnd,
          status: 'busy'
        });

        currentTime = busyEnd;
      });

      if (currentTime < endTime) {
        result.push({
          start: currentTime,
          end: endTime,
          status: 'free'
        });
      }
      return result;

    } catch (error) {
      console.error('Could not anlyze the calendar:', error);
      throw error;
    }
  }
}

export default CalendarAnalyzer;