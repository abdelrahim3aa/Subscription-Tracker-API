import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  renewalDate: { type: Date, required: true },
  category: { type: String, default: 'general' },
  reminderDaysBefore: { type: Number, default: 3 },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
