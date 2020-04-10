import OneSignal from 'react-native-onesignal'
// dateandtime format "Thu Sep 24 2015 14:00:00 GMT+0530 (IST)"
// userId should be an array of Ids to whom notification is to be sent
// constents is content of the notification
export const Notification = (userId , dateandtime , contents) =>{
    console.log(userId+dateandtime)
    var contents = {'en': contents};
    var data = {};
    var playerIds = userId;
    var other = {"send_after":dateandtime , 'android_sound':'notification' , 'android_visibility':1 , 'large_icon':'ic_stat_onesignal_default'};
    OneSignal.postNotification(contents,data,playerIds,other)
}