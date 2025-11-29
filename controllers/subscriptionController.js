import Subscription from '../models/Subscription.js';
import sendHelloEmail from '../utils/sendHelloEmail.js';

// ✅ Get all subscriptions for the logged-in user
export const getSubscriptions = async (req, res, next) => {
  try {
    // ✅ Use req.user._id (you wrote user._id which is undefined)
    const subs = await Subscription.find({ user: req.user._id }).sort({ renewalDate: 1 });
    res.json(subs);
  } catch (error) {
    next(error);
  }
};

// ✅ Create a new subscription
export const createSubscription = async (req, res, next) => {
  try {
    const { name, price, renewalDate, category, reminderDayBefore } = req.body;

    const sub = await Subscription.create({
      user: req.user._id,
      name,
      price,
      renewalDate: new Date(renewalDate),
      category,
      reminderDayBefore: Number(reminderDayBefore) || 3
    });

    // Send confirmation email
    await sendHelloEmail(
      req.user.email,
      'Your Subscription Created Successfully 🎉',
      {
        name: `${req.user.name}`,
        subscriptionName: `${name}`,
        renewalDate: `${renewalDate}`,
        manageLink: 'https://subtrack.com/manage',
      }
    );

    // await sendEmail(
    //   req.user.email,
    //   'Subscription Created Successfully 🎉',
    //   `Hi ${req.user.name}, your subscription "${name}" was added successfully.`
    // );


    res.status(201).json(sub);
  } catch (error) {
    next(error);
  }
};


// ✅ Update a subscription (only if it belongs to the user)
export const updateSubscription = async (req, res, next) => {
  const { id } = req.params;

  try {
    const sub = await Subscription.findOne({ _id: id, user: req.user._id });
    if (!sub) return res.status(404).json({ message: 'Subscription not found' });

    Object.assign(sub, req.body);
    await sub.save();

    res.json(sub);
  } catch (error) {
    next(error);
  }
};

// ✅ Delete a subscription (only if it belongs to the user)
export const deleteSubscription = async (req, res, next) => {
  const { id } = req.params;

  try {
    const sub = await Subscription.findOneAndDelete({ _id: id, user: req.user._id });
    if (!sub) return res.status(404).json({ message: 'Subscription not found' });

    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};
