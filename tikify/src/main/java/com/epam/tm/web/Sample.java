package com.epam.tm.web;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class Sample {

    @RequestMapping("/ping")
    @ResponseStatus(HttpStatus.OK)
    public void test() {
    }

    @RequestMapping(value = "/echo", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody List<String> echo(@RequestBody String arg) {
        return Arrays.asList(arg, arg, arg);
    }

    @RequestMapping(value = "/echo", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody List<String> echo1(@RequestParam(required = true, value = "word") String arg) {
        return Arrays.asList(arg, arg, arg);
    }

}
