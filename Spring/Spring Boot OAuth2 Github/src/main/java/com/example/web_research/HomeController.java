package com.example.web_research;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class HomeController {

    @GetMapping("/")
    @ResponseBody
    public String homePage() {
        return "خوش آمدید! برای مشاهده پروفایل خود به /profile بروید.";
    }

    @GetMapping("/profile")
    @ResponseBody
    public String userProfile(OAuth2AuthenticationToken authentication) {
        if (authentication == null) {
            return "شما وارد نشده‌اید!";
        }

        Map<String, Object> userAttributes = authentication.getPrincipal().getAttributes();
        String username = (String) userAttributes.get("login"); // اطلاعات کاربر در پاسخ GitHub مثلاً شامل login, id و ...
        String html = "<h1>پروفایل کاربر</h1>" +
                "<p>نام کاربری گیت‌هاب شما: " + username + "</p>" +
                "<p><a href='/logout'>خروج</a></p>";
        return html;
    }
}