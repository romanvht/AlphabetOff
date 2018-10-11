package ru.romanvht.alphabetOff;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.text.TextUtils;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

    @Override
    public void onBackPressed() {
        new AlertDialog.Builder(this).setIcon(android.R.drawable.ic_dialog_alert).setTitle("Выход")
                .setMessage("Вы хотите выйти?")
                .setPositiveButton("Да", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        finish();
                    }
                }).setNegativeButton("Нет", null).show();
    }

    public static String getDeviceName() {
        String manufacturer = Build.MANUFACTURER;
        String model = Build.MODEL;
        if (model.startsWith(manufacturer)) {
            return capitalize(model);
        }
        return capitalize(manufacturer) + " " + model;
    }

    private static String capitalize(String str) {
        if (TextUtils.isEmpty(str)) {
            return str;
        }
        char[] arr = str.toCharArray();
        boolean capitalizeNext = true;

        StringBuilder phrase = new StringBuilder();
        for (char c : arr) {
            if (capitalizeNext && Character.isLetter(c)) {
                phrase.append(Character.toUpperCase(c));
                capitalizeNext = false;
                continue;
            } else if (Character.isWhitespace(c)) {
                capitalizeNext = true;
            }
            phrase.append(c);
        }

        return phrase.toString();
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        CookieSyncManager.createInstance(this);

        WebView mWebView = new WebView(this);

        mWebView.setWebViewClient(new AlphabetClient());

        setContentView(mWebView);

        mWebView.setBackgroundColor(Color.parseColor("#000000"));
        mWebView.getSettings().setTextSize(WebSettings.TextSize.NORMAL);
        mWebView.getSettings().setUserAgentString("AlphabetOfflineApp ("+getDeviceName()+")");
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.getSettings().setDatabaseEnabled(true);
        mWebView.getSettings().setDomStorageEnabled(true);

        mWebView.loadUrl("file:///android_asset/4.html");
    }

    final Activity activity = this;

    public class AlphabetClient extends WebViewClient
    {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            if(Uri.parse(url).getHost().length() == 0) {
                return false;
            }

            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            view.getContext().startActivity(intent);
            return true;
        }

        public void onPageFinished(WebView view, String url) {
            CookieSyncManager.getInstance().sync();
            CookieManager flush;
        }

        String NetError = "<html><body style='background: #000; color: #fff; font-size: 24px; font-weight: bold; padding-top: 40%;'>" +
                "<center>Упс, ошибочка :(</center>" +
                "</body></html>";

        public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
            view.loadDataWithBaseURL(null, NetError, "text/html", "utf-8", null);
        }
    }
}