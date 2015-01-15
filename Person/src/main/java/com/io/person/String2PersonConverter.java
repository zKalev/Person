package com.io.person;

import org.springframework.core.convert.converter.Converter;

import com.io.person.entities.Person;

public class String2PersonConverter implements Converter<String, Person> {

	@Override
	public Person convert(String source) {
		return null;
	}
}
