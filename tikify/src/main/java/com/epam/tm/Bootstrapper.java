package com.epam.tm;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Bootstrapper {
    private static final Logger LOG = LoggerFactory.getLogger(Bootstrapper.class);

    public static void main(String[] args) {
        try {
            LOG.info("INIT PHASE START");

            ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext(
                    new String[] { "classpath:META-INF/spring/spring-root-context.xml" }, false);
            ctx.refresh();

            if (ctx.isActive() && ctx.isRunning()) {
                LOG.info("Spring context has successfully started {}", new Date(ctx.getStartupDate()));
            } else {
                LOG.error("Context is not active or running");
            }
            LOG.info("INIT PHASE END");
        } catch (Exception e) {
            LOG.error("Context creation failure", e);
        }
    }
}
