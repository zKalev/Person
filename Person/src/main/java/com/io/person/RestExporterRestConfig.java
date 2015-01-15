package com.io.person;

import org.springframework.beans.factory.ObjectFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.data.repository.support.Repositories;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.validation.Validator;

import com.io.person.validators.PersonValidator;

public class RestExporterRestConfig extends RepositoryRestMvcConfiguration {

	@Bean
	public Validator validator() {
		return new PersonValidator();
	}

	@Bean
	@Override
	public ValidatingRepositoryEventListener validatingRepositoryEventListener(
			ObjectFactory<Repositories> repositories) {
		ValidatingRepositoryEventListener listener = new ValidatingRepositoryEventListener(
				repositories);
		configureValidatingRepositoryEventListener(listener);
		listener.addValidator("afterCreate", validator());
		listener.addValidator("beforeCreate", validator());
		return listener;
	}
}
