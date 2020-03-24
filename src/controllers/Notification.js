import OneSignal from 'react-native-onesignal'
// dateandtime format "Thu Sep 24 2015 14:00:00 GMT+0530 (IST)"
export const Notification = (userId , dateandtime) =>{
    console.log(userId+dateandtime)
    var contents = {'en': 'Event in 15mins'};
    var data = {};
    var playerIds = [userId];
    var other = {"send_after":dateandtime , 'android_sound':'notification' , 'android_visibility':1 , 'large_icon':'ic_stat_onesignal_default'};
    OneSignal.postNotification(contents,data,playerIds,other)
}