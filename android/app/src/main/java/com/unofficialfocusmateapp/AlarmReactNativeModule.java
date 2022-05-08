package com.unofficialfocusmateapp;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AlarmReactNativeModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext rac;

    AlarmReactNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.rac = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "AlarmModule";
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void registerAlarm(double time) {
        Log.d("FocusmateUnofficial", "Registering alarm at time: " + Double.toString(time));
        AlarmHelper.registerAlarm(rac, Double.valueOf(time).longValue());
    }

}
