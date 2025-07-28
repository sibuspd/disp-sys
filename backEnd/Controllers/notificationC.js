const NotificationModel = require('../Models/notification');

// Add a new notification
exports.addNotification = async (req, res) => {
    try{
        const {title} = req.body; // Extracting Event title from request body
        const notification = new NotificationModel({title, addedBy: req.user._id});
        await notification.save();
        res.status(201).json({
            message: 'Notification added successfully',
            notification: notification
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error',
            issue: err.message
        });
    }
}

// Display all notifications
exports.getNotifications = async(req, res) => {
    try{
        const notifications = await NotificationModel.find().sort({createdAt: -1});
        res.status(200).json({
            message: 'Notifications retrieved successfully',
            notifications: notifications
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error',
            issue: err.message
        });
    }
}

// Delete a notification by ID
exports.deleteNotificationById = async (req, res) => {
    try{
        const {id} = req.params;
        const notification = await NotificationModel.findByIdAndDelete(id);

        if(notification){
            return res.status(200).json({
                message: 'Notification deleted successfully'
            });
        }
        return res.status(404).json({
            error: 'Notification not found'
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error',
            issue: err.message
        });
    }
}