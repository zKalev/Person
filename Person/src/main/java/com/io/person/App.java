package com.io.person;

import javax.annotation.Resource;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.convert.support.GenericConversionService;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ComponentScan(basePackages = { "com.io.person" })
@EnableJpaRepositories
@Import({ RestExporterRestConfig.class })
@EnableAutoConfiguration
@PropertySource("application.properties")
public class App {
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}

	@Resource(name = "defaultConversionService")
	private GenericConversionService genericConversionService;

	@Bean
	public String2PersonConverter string2PersonConverter() {
		String2PersonConverter string2PersonConverter = new String2PersonConverter();
		genericConversionService.addConverter(string2PersonConverter);
		return string2PersonConverter;
	}
}
