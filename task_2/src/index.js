import CalendarAnalyzer from './calendarAnalyzer.js';

async function main() {
  try {
    const analyzer = new CalendarAnalyzer();
    const startTime = new Date('2024-12-12T00:00:00Z');
    const endTime = new Date('2024-12-12T23:59:59Z');

    const intervals = await analyzer.getFreeBusyIntervals(startTime, endTime);
    console.log('Calendar intervals:', intervals);
  } catch (error) {
    console.error('Failed to analyze calendar:', error);
  }
}

main();