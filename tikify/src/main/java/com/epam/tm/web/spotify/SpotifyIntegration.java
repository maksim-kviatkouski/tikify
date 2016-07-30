package com.epam.tm.web.spotify;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpRequest;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.client.RequestCallback;
import org.springframework.web.client.ResponseExtractor;
import org.springframework.web.client.RestTemplate;

import com.epam.tm.spotify.SpotifyProvider;

@Controller
@RequestMapping("/spotify")
public class SpotifyIntegration {

    private final RestTemplate rest = new RestTemplate();
    @Autowired
    private SpotifyProvider provider;

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping("/auth")
    public @ResponseBody String echo(@RequestParam(required = true, value = "scope") String scope) {
        MultiValueMap<String, String> mvm = new LinkedMultiValueMap<String, String>();
        mvm.add("grant_type", "client_credentials");
        mvm.add("scope", scope);
        return rest.execute("https://accounts.spotify.com/api/token", HttpMethod.POST, new RequestCallback() {
            @Override
            public void doWithRequest(ClientHttpRequest request) throws IOException {
                String a = provider.getClientId() + ":" + provider.getClientSecret();
                String b = Base64.getEncoder().encodeToString(a.getBytes());
                request.getHeaders().setContentType(MediaType.APPLICATION_FORM_URLENCODED);
                request.getHeaders().add("Authorization", "Basic " + b);
                new FormHttpMessageConverter().write(mvm, MediaType.APPLICATION_FORM_URLENCODED, new HttpOutputMessage() {
                    @Override
                    public HttpHeaders getHeaders() {
                        return request.getHeaders();
                    }

                    @Override
                    public OutputStream getBody() throws IOException {
                        return request.getBody();
                    }
                });
            }
        }, new ResponseExtractor<String>() {
            @Override
            public String extractData(ClientHttpResponse response) throws IOException {
                return IOUtils.toString(response.getBody());
            }
        });
    }

}
