import cron from 'node-cron';
import Subscription from '../models/Subscription.js';
import sendReminderEmail from '../utils/sendReminderEmail.js';
console.log('✅ Reminder cron job loaded');

cron.schedule('* * * * *', async () => {
    console.log('🕕 Cron job triggered at', new Date().toLocaleString());

  try {
    const today = new Date();

    // find active subscriptions
    const subs = await Subscription.find({ active: true }).populate('user', 'email name');

    for (const s of subs) {
      const renewal = new Date(s.renewalDate);
      const diffDays = Math.ceil((renewal - today) / (1000 * 60 * 60 * 24));

      if (diffDays > 0 && diffDays <= s.reminderDaysBefore) {
        const subject = `Reminder: ${s.name} renews on ${renewal.toDateString()}`;

        await sendReminderEmail(
          s.user.email,
          subject,
          {
            name: s.user.name,
            subscriptionName: s.name,
            renewalDate: renewal.toDateString(),
            diffDays,
            manageLink: 'https://subtrack.com/manage',
          }
        );
      }
    }
  } catch (error) {
    console.log('Cron job error', error);
  }
}, { timezone: process.env.CRON_TZ || 'UTC' });
