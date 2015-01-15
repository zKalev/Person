package com.io.person.validators;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.io.person.entities.Person;

@Component(value = "beforeSavePersonValidator")
public class PersonValidator implements Validator {

	private static final String nameRegex = "[a-zA-Zа-яА-Я]+[\\s]{1}[a-zA-Zа-яА-Я]+[-]{0,1}[a-zA-Zа-яА-Я]+";
	private static final Pattern namePattern = Pattern.compile(nameRegex);
	private static final String pinRegex = "[0-9]{10,10}";
	private static final Pattern pinPattern = Pattern.compile(pinRegex);
	private static final String emailRegex = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
			+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
	private static final Pattern emailPattern = Pattern.compile(emailRegex);

	@Override
	public boolean supports(Class<?> clazz) {
		return Person.class.isAssignableFrom(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "fullName",
				"field.required");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "pin",
				"field.required");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "email",
				"field.required");
		String name = ((Person) target).getFullName();
		String pin = ((Person) target).getPin();
		String email = ((Person) target).getEmail();

		Matcher nameMatcher = namePattern.matcher(name);
		Matcher pinMatcher = pinPattern.matcher(pin);
		Matcher emailMatcher = emailPattern.matcher(email);

		if (!nameMatcher.matches()) {
			errors.rejectValue("fullName", "500", "Invalid name! ex: Zhivko Kalev");
		}
		if (!pinMatcher.matches()) {
			errors.rejectValue("pin", "500", "Invalid pin!");
		}
		if (!emailMatcher.matches()) {
			errors.rejectValue("email", "500", "Invalid email!");
		}
	}
}
