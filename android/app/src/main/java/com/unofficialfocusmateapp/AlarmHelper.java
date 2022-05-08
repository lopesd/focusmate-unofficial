package com.unofficialfocusmateapp;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.PowerManager;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.RequiresApi;

public class AlarmHelper extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        PowerManager pm = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
        PowerManager.WakeLock wl = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "focusmateunofficial:alarm");
        wl.acquire(10*60*1000L /*5 minutes*/);

        Log.i("FocusmateUnofficial", "UNOFFICIAL FOCUSMATE APP RECEIVED ALARM");
        Toast.makeText(context, "Focusmate coming up", Toast.LENGTH_SHORT).show();

        wl.release();
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    public static void registerAlarm(Context context, long time) {
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(context, AlarmHelper.class);
        PendingIntent alarmIntent = PendingIntent.getBroadcast(context, 0, intent, 0);
        alarmManager.setAlarmClock(new AlarmManager.AlarmClockInfo(time, alarmIntent), alarmIntent);
        Log.i("FocusmateUnofficial", "Successfully registered alarm for time " + time);
        //alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, Double.valueOf(time).longValue(), alarmIntent);
    }
}
